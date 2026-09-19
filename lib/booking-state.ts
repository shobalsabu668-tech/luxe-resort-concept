import { diffDays, isISODate, type ISODate } from "./dates";
import { extras, extraCost, type Extra } from "./extras";
import { getSuite, type Suite } from "./suites";
import { quote, TAX_RATE, type Quote } from "./rates";

/**
 * BOOKING STATE — everything the flow needs lives in the URL (except the
 * guest's personal details, which never leave component state). That makes
 * each step linkable, and Back/Forward move between steps naturally.
 */

export const STEPS = ["dates", "suite", "extras", "details", "review"] as const;
export type Step = (typeof STEPS)[number] | "done";

export type Selection = {
  step: Step;
  checkIn: ISODate | null;
  checkOut: ISODate | null;
  adults: number;
  children: number;
  suite: string | null;
  /** extra id → quantity (1 for per-stay/per-guest extras; 1–2 for transfers). */
  extras: Record<string, number>;
};

const clampInt = (v: string | null, min: number, max: number, fallback: number) => {
  const n = Number.parseInt(v ?? "", 10);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
};

export function parseSelection(params: URLSearchParams, today: ISODate): Selection {
  // An arrival on its own is kept (the guest is mid-selection); a departure
  // only counts if it follows a valid arrival within 30 nights.
  const rawIn = params.get("in");
  const rawOut = params.get("out");
  const checkIn = isISODate(rawIn) && diffDays(today, rawIn) >= 0 ? rawIn : null;
  const checkOut = checkIn && isISODate(rawOut) && diffDays(checkIn, rawOut) >= 1 && diffDays(checkIn, rawOut) <= 30 ? rawOut : null;
  const suite = params.get("suite");
  const chosen: Record<string, number> = {};
  for (const part of (params.get("x") ?? "").split(",")) {
    const [id, qty] = part.split(":");
    if (extras.some((e) => e.id === id)) chosen[id] = clampInt(qty ?? "1", 1, 2, 1);
  }
  const requested = params.get("step") as Step | null;
  const selection: Selection = {
    step: requested && [...STEPS, "done"].includes(requested) ? requested : "dates",
    checkIn,
    checkOut,
    adults: clampInt(params.get("adults"), 1, 6, 2),
    children: clampInt(params.get("children"), 0, 4, 0),
    suite: suite && getSuite(suite) ? suite : null,
    extras: chosen,
  };
  // Never land on a step whose prerequisites are missing.
  return { ...selection, step: reachable(selection) };
}

export function serializeSelection(s: Selection): string {
  const q = new URLSearchParams();
  if (s.step !== "dates") q.set("step", s.step);
  if (s.checkIn) q.set("in", s.checkIn);
  if (s.checkIn && s.checkOut) q.set("out", s.checkOut);
  q.set("adults", String(s.adults));
  if (s.children) q.set("children", String(s.children));
  if (s.suite) q.set("suite", s.suite);
  const x = Object.entries(s.extras)
    .map(([id, n]) => (n > 1 ? `${id}:${n}` : id))
    .join(",");
  if (x) q.set("x", x);
  return q.toString();
}

/** The furthest step the current selection allows. */
export function reachable(s: Selection): Step {
  const order: Step[] = [...STEPS, "done"];
  const want = order.indexOf(s.step);
  const hasDates = Boolean(s.checkIn && s.checkOut);
  const q = currentQuote(s);
  const hasSuite = Boolean(q?.available);
  let max = 0;
  if (hasDates) max = 1;
  if (hasDates && hasSuite) max = 3; // extras + details
  // review/done only reachable in-session (details are not in the URL)
  return order[Math.min(want, max)];
}

export function currentSuite(s: Selection): Suite | null {
  return s.suite ? (getSuite(s.suite) ?? null) : null;
}

export function currentQuote(s: Selection): Quote | null {
  const suite = currentSuite(s);
  if (!suite || !s.checkIn || !s.checkOut) return null;
  return quote(suite, s.checkIn, s.checkOut, s.adults, s.children);
}

export type Totals = {
  room: number;
  extras: { extra: Extra; qty: number; cost: number }[];
  extrasTotal: number;
  subtotal: number;
  taxes: number;
  total: number;
};

export function totals(s: Selection): Totals | null {
  const q = currentQuote(s);
  if (!q) return null;
  const guests = s.adults + s.children;
  const lines = Object.entries(s.extras)
    .map(([id, qty]) => {
      const extra = extras.find((e) => e.id === id);
      return extra ? { extra, qty, cost: extraCost(extra, guests, qty) } : null;
    })
    .filter((l): l is NonNullable<typeof l> => l !== null);
  const extrasTotal = lines.reduce((n, l) => n + l.cost, 0);
  const subtotal = q.subtotal + extrasTotal;
  const taxes = Math.round(subtotal * TAX_RATE);
  return { room: q.subtotal, extras: lines, extrasTotal, subtotal, taxes, total: subtotal + taxes };
}

/** Suites with a private pool can have breakfast served on the water. */
export const POOL_SUITES = ["tide-pool-suite", "garden-villa", "headland-residence"];

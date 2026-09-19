import { addDays, dayOfWeek, diffDays, nightsOf, type ISODate } from "./dates";
import { suites, type Suite } from "./suites";

/**
 * RATES & AVAILABILITY — a small, deterministic stand-in for a booking engine.
 *
 * Prices follow the coast's seasons and weekends. Availability is generated
 * from a hash of (suite, night), so the same date always shows the same
 * result for every visitor, without a server. Swap `roomsLeft` for a real
 * PMS/channel-manager call and nothing else has to change.
 */

export type Season = { id: "festive" | "high" | "shoulder" | "monsoon"; name: string; multiplier: number; minStay: number; demand: number };

const seasons: Record<Season["id"], Season> = {
  festive: { id: "festive", name: "Festive season", multiplier: 1.45, minStay: 3, demand: 1.05 },
  high: { id: "high", name: "High season", multiplier: 1.2, minStay: 1, demand: 0.75 },
  shoulder: { id: "shoulder", name: "Shoulder season", multiplier: 1, minStay: 1, demand: 0.5 },
  monsoon: { id: "monsoon", name: "Monsoon retreat", multiplier: 0.75, minStay: 1, demand: 0.28 },
};

export const TAX_RATE = 0.18;
const WEEKEND = 1.12;

export function seasonFor(night: ISODate): Season {
  const m = Number(night.slice(5, 7));
  const d = Number(night.slice(8, 10));
  if ((m === 12 && d >= 20) || (m === 1 && d <= 5)) return seasons.festive;
  if (m >= 6 && m <= 9) return seasons.monsoon;
  if (m >= 11 || m <= 2) return seasons.high;
  return seasons.shoulder;
}

const isWeekendNight = (night: ISODate) => {
  const dow = dayOfWeek(night);
  return dow === 5 || dow === 6;
};

/** FNV-1a → [0, 1). Stable across runtimes. */
function hash01(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0) / 4294967296;
}

export function nightlyRate(suite: Suite, night: ISODate): number {
  const raw = suite.baseRate * seasonFor(night).multiplier * (isWeekendNight(night) ? WEEKEND : 1);
  return Math.round(raw / 500) * 500;
}

export function roomsLeft(suite: Suite, night: ISODate): number {
  const demand = seasonFor(night).demand + (isWeekendNight(night) ? 0.15 : 0);
  const booked = Math.floor(hash01(`${suite.slug}:${night}`) * (suite.count + 1) * Math.min(1.3, demand * 1.25));
  return Math.max(0, suite.count - booked);
}

export type Quote = {
  suite: Suite;
  nights: { date: ISODate; rate: number; left: number }[];
  subtotal: number;
  taxes: number;
  total: number;
  soldOut: ISODate[];
  minStay: number;
  fitsGuests: boolean;
  available: boolean;
  /** Fewest rooms left on any night, for "only 1 left" messaging. */
  scarcity: number;
};

export function quote(suite: Suite, checkIn: ISODate, checkOut: ISODate, adults: number, children: number): Quote {
  const nights = nightsOf(checkIn, checkOut).map((date) => ({ date, rate: nightlyRate(suite, date), left: roomsLeft(suite, date) }));
  const subtotal = nights.reduce((n, x) => n + x.rate, 0);
  const soldOut = nights.filter((n) => n.left === 0).map((n) => n.date);
  const minStay = Math.max(1, ...nights.map((n) => seasonFor(n.date).minStay));
  const fitsGuests = adults <= suite.maxAdults && adults + children <= suite.maxGuests;
  return {
    suite,
    nights,
    subtotal,
    taxes: Math.round(subtotal * TAX_RATE),
    total: Math.round(subtotal * (1 + TAX_RATE)),
    soldOut,
    minStay,
    fitsGuests,
    available: nights.length >= minStay && soldOut.length === 0 && fitsGuests && nights.length > 0,
    scarcity: nights.length ? Math.min(...nights.map((n) => n.left)) : 0,
  };
}

/** Lowest nightly rate across suites with a room free that night, or null if full. */
export function lowestRate(night: ISODate): number | null {
  let best: number | null = null;
  for (const s of suites) {
    if (roomsLeft(s, night) === 0) continue;
    const r = nightlyRate(s, night);
    if (best === null || r < best) best = r;
  }
  return best;
}

/**
 * Nearest alternative: the first stay of the same length, starting within
 * `window` days either side, when this suite is free for every night.
 */
export function nearestOpening(suite: Suite, checkIn: ISODate, checkOut: ISODate, today: ISODate, window = 21): ISODate | null {
  const length = diffDays(checkIn, checkOut);
  for (let offset = 1; offset <= window; offset++) {
    for (const dir of [1, -1]) {
      const start = addDays(checkIn, offset * dir);
      if (diffDays(today, start) < 0) continue;
      const nights = nightsOf(start, addDays(start, length));
      if (nights.every((n) => roomsLeft(suite, n) > 0)) return start;
    }
  }
  return null;
}

/** The lowest nightly rate this suite ever sells at (monsoon, weekday). */
export function fromRate(suite: Suite): number {
  return Math.round((suite.baseRate * seasons.monsoon.multiplier) / 500) * 500;
}

export const seasonList = Object.values(seasons);

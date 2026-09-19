/**
 * DATES — calendar dates as "YYYY-MM-DD" strings.
 * A stay is a set of nights, not instants, so everything here is timezone-free:
 * strings are parsed as UTC midnight and never shifted by the visitor's zone.
 */

export type ISODate = string;

const DAY = 86_400_000;

export function toDate(iso: ISODate): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function toISO(date: Date): ISODate {
  return date.toISOString().slice(0, 10);
}

export function isISODate(value: unknown): value is ISODate {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  return toISO(toDate(value)) === value;
}

export function addDays(iso: ISODate, days: number): ISODate {
  return toISO(new Date(toDate(iso).getTime() + days * DAY));
}

export function diffDays(from: ISODate, to: ISODate): number {
  return Math.round((toDate(to).getTime() - toDate(from).getTime()) / DAY);
}

/** Today in India (the resort's clock), as a calendar date. */
export function todayISO(): ISODate {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return parts;
}

/** Every night of a stay: check-in up to (not including) check-out. */
export function nightsOf(checkIn: ISODate, checkOut: ISODate): ISODate[] {
  const n = diffDays(checkIn, checkOut);
  return Array.from({ length: Math.max(0, n) }, (_, i) => addDays(checkIn, i));
}

export function dayOfWeek(iso: ISODate): number {
  return toDate(iso).getUTCDay();
}

export function monthStart(iso: ISODate): ISODate {
  return iso.slice(0, 8) + "01";
}

export function addMonths(iso: ISODate, months: number): ISODate {
  const d = toDate(monthStart(iso));
  d.setUTCMonth(d.getUTCMonth() + months);
  return toISO(d);
}

export function daysInMonth(iso: ISODate): number {
  const d = toDate(monthStart(iso));
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
}

const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-IN", { timeZone: "UTC", ...opts });
const short = fmt({ weekday: "short", day: "numeric", month: "short" });
const long = fmt({ weekday: "long", day: "numeric", month: "long", year: "numeric" });
const monthYear = fmt({ month: "long", year: "numeric" });
const dayMonth = fmt({ day: "numeric", month: "short" });

/** "Fri, 14 Nov" */
export const formatShort = (iso: ISODate) => short.format(toDate(iso));
/** "Friday, 14 November 2026" */
export const formatLong = (iso: ISODate) => long.format(toDate(iso));
/** "November 2026" */
export const formatMonth = (iso: ISODate) => monthYear.format(toDate(iso));
/** "14 Nov" */
export const formatDayMonth = (iso: ISODate) => dayMonth.format(toDate(iso));

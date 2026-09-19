const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const compact = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 });

/** ₹38,000 · ₹1,20,000 (Indian digit grouping). */
export function formatINR(value: number): string {
  return inr.format(Math.round(value));
}

/** ₹38k · ₹1.2L — for tight spaces such as calendar cells. */
export function formatINRCompact(value: number): string {
  if (value >= 100_000) return `₹${compact.format(value / 100_000)}L`;
  return `₹${Math.round(value / 1000)}k`;
}

export function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

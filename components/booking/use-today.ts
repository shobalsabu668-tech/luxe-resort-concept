"use client";

import { useSyncExternalStore } from "react";
import { todayISO, type ISODate } from "@/lib/dates";

const noop = () => () => {};

/**
 * Today's date on the resort's clock — but only in the browser. Pages are
 * static, so rendering "today" on the server would bake in the build date.
 * Returns null during SSR and hydration, then the real date.
 */
export function useToday(): ISODate | null {
  return useSyncExternalStore(noop, todayISO, () => null);
}

/** ENHANCEMENTS — add-ons offered during booking. Prices in INR before tax. */

export type Extra = {
  id: string;
  name: string;
  detail: string;
  price: number;
  unit: "stay" | "guest" | "trip";
};

export const extras: Extra[] = [
  { id: "transfer", name: "Airport transfer", detail: "A driver meets you at arrivals. 45 minutes along the coast road.", price: 4500, unit: "trip" },
  { id: "ember", name: "Ember tasting menu", detail: "Seven courses cooked over coals, on your first evening.", price: 6800, unit: "guest" },
  { id: "salt-room", name: "Laterite stone ritual", detail: "Ninety minutes in the Salt Room: warm stones, coconut oil, steam.", price: 9000, unit: "guest" },
  { id: "dawn-boats", name: "Dawn boats", detail: "Out with the fishing boats at first light, then breakfast on the beach.", price: 3200, unit: "guest" },
  { id: "floating-breakfast", name: "Breakfast in the pool", detail: "For suites with a pool: breakfast served on the water.", price: 3500, unit: "stay" },
];

export function extraCost(extra: Extra, guests: number, qty = 1): number {
  if (extra.unit === "guest") return extra.price * guests;
  if (extra.unit === "trip") return extra.price * qty;
  return extra.price;
}

export const unitLabel: Record<Extra["unit"], string> = {
  stay: "per stay",
  guest: "per guest",
  trip: "each way",
};

import type { PhotoKey } from "./photos";

/** EXPERIENCES — the day at LUXE, and the Salt Room spa. */

export type Experience = {
  slug: string;
  name: string;
  when: string;
  duration: string;
  price: string;
  body: string;
  photo: PhotoKey;
};

export const experiences: Experience[] = [
  {
    slug: "dawn-boats",
    name: "Dawn boats",
    when: "Daily, 6:00 am",
    duration: "2 hours",
    price: "₹3,200 per guest",
    body: "Go out with the fishing boats from the village below the cliff, while the sea is still flat and silver. Back in time for breakfast on the beach.",
    photo: "dawnBoat",
  },
  {
    slug: "cliff-walk",
    name: "The cliff walk",
    when: "Daily, 4:30 pm",
    duration: "5 km · 2 hours",
    price: "Included",
    body: "A guided walk along the laterite cliffs to the old lighthouse, timed so you reach the top as the light turns gold.",
    photo: "cliffPalms",
  },
  {
    slug: "yoga",
    name: "Yoga on the headland",
    when: "Daily, 7:00 am and 6:00 pm",
    duration: "60 minutes",
    price: "Included",
    body: "A gentle practice on the timber deck at the tip of the headland, facing the sea. Mats, blocks and a teacher who never raises their voice.",
    photo: "yogaDusk",
  },
  {
    slug: "cook-with-ember",
    name: "Cook with Ember",
    when: "Tuesdays and Fridays",
    duration: "3 hours",
    price: "₹5,500 per guest",
    body: "Morning at the village market with the Ember chef, then an afternoon at the coals learning the recipes, ending with lunch.",
    photo: "pomfret",
  },
  {
    slug: "village-market",
    name: "The village market",
    when: "Wednesday mornings",
    duration: "90 minutes",
    price: "Included",
    body: "Eight minutes down the coast road: fish on ice, kokum drying on mats, cashews, mangoes in season, and the best chai on the coast.",
    photo: "fishingBoats",
  },
];

export const spa = {
  name: "The Salt Room",
  line: "A spa carved into the cliff.",
  body: "Three treatment rooms, a steam room and a dark, still pool, all cut into the laterite below the main terrace. The rituals use coconut oil pressed in the village, kokum butter and warm basalt stones from the beach.",
  photos: ["steamRoom", "spaPool", "hotStones"] as PhotoKey[],
  treatments: [
    { name: "Laterite stone ritual", duration: "90 min", price: 9000, detail: "Warm basalt stones, coconut oil and a long, slow massage." },
    { name: "Abhyanga", duration: "75 min", price: 7800, detail: "Traditional warm-oil massage, four hands." },
    { name: "Coconut and kokum polish", duration: "60 min", price: 6500, detail: "A body scrub of rice flour, coconut and kokum butter." },
    { name: "Steam and salt", duration: "45 min", price: 4000, detail: "The steam room, a sea-salt scrub and the cold plunge." },
  ],
};

export const seasonsCopy = [
  { name: "High season", months: "November – February", body: "Clear skies, calm seas and sunsets you can set a watch by. Book early for the festive weeks, when stays are three nights or more." },
  { name: "Shoulder", months: "March – May, October", body: "Warm, quiet and green at the edges. The best time for the cliff walk and the long lunches." },
  { name: "Monsoon retreat", months: "June – September", body: "The sea turns silver and the cliffs turn green. Rates fall by a quarter, and the Salt Room comes into its own." },
];

export const distances = [
  { value: "45 min", label: "from the airport, along the coast road" },
  { value: "12 min", label: "to the marina and the sunset sail" },
  { value: "8 min", label: "to the village market" },
  { value: "5 km", label: "cliff path to the old lighthouse" },
];

import type { PhotoKey } from "./photos";

/**
 * SUITES — twenty-two keys in five types, every one facing west.
 * `baseRate` is the shoulder-season nightly rate in INR before tax;
 * lib/rates.ts applies seasons, weekends and availability.
 */

export type Suite = {
  slug: string;
  name: string;
  /** How many of this type exist (the 22 add up across types). */
  count: number;
  size: number;
  view: string;
  bed: string;
  maxAdults: number;
  maxGuests: number;
  baseRate: number;
  summary: string;
  story: string[];
  features: string[];
  amenities: string[];
  photos: [PhotoKey, PhotoKey, PhotoKey];
  /** Floor plan proportions for the drawn plan (metres). */
  plan: { w: number; d: number; rooms: { label: string; x: number; y: number; w: number; d: number }[] };
};

const standard = [
  "Air conditioning and ceiling fans",
  "Handwoven cotton bedding",
  "Rain shower",
  "Espresso and loose-leaf tea",
  "Minibar of local cordials",
  "Wi-Fi, if you must",
];

export const suites: Suite[] = [
  {
    slug: "horizon-suite",
    name: "Horizon Suite",
    count: 8,
    size: 62,
    view: "Sea, west",
    bed: "King",
    maxAdults: 2,
    maxGuests: 3,
    baseRate: 38000,
    summary: "Floor-to-ceiling glass on the cliff edge, a private terrace, and the sunset framed from the bath.",
    story: [
      "The Horizon Suites sit on the upper shelf of the cliff, stepped so no terrace looks onto another. The whole west wall is glass; slide it open and the room becomes the terrace.",
      "The bath is set in the window, low enough that the water line meets the sea. Most guests time it for 6:20 pm.",
    ],
    features: ["Private terrace with a daybed", "Bath in the window", "Outdoor rain shower", "Sunset turndown"],
    amenities: standard,
    photos: ["horizonRoom", "horizonView", "bathLight"],
    plan: {
      w: 11,
      d: 7.4,
      rooms: [
        { label: "Bedroom", x: 0, y: 0, w: 6.2, d: 5 },
        { label: "Bath", x: 6.2, y: 0, w: 4.8, d: 3.2 },
        { label: "Dressing", x: 6.2, y: 3.2, w: 4.8, d: 1.8 },
        { label: "Terrace", x: 0, y: 5, w: 11, d: 2.4 },
      ],
    },
  },
  {
    slug: "cliff-loft",
    name: "Cliff Loft",
    count: 6,
    size: 54,
    view: "Open sea",
    bed: "King, on the mezzanine",
    maxAdults: 2,
    maxGuests: 2,
    baseRate: 32000,
    summary: "A mezzanine bed under the roofline and a reading nook that looks straight out to sea.",
    story: [
      "Two storeys in one room. Downstairs is for the day: a sofa, a writing desk and a window seat deep enough to sleep in. Upstairs, the bed sits under the timber roof with a single long window at pillow height.",
      "The Lofts are the quietest rooms at LUXE: no terrace, no pool, just the sea and the sound of it.",
    ],
    features: ["Mezzanine bedroom", "Window seat for reading", "Timber roof and cross-breeze", "The quietest wing"],
    amenities: standard,
    photos: ["loftRoom", "loftCalm", "balcony"],
    plan: {
      w: 9,
      d: 6,
      rooms: [
        { label: "Living", x: 0, y: 0, w: 5.6, d: 6 },
        { label: "Bath", x: 5.6, y: 0, w: 3.4, d: 3 },
        { label: "Stair", x: 5.6, y: 3, w: 3.4, d: 3 },
      ],
    },
  },
  {
    slug: "tide-pool-suite",
    name: "Tide Pool Suite",
    count: 4,
    size: 70,
    view: "Sea and headland",
    bed: "King",
    maxAdults: 2,
    maxGuests: 3,
    baseRate: 46000,
    summary: "A round plunge pool on the deck, set so the water line meets the horizon.",
    story: [
      "Each Tide Pool Suite has its own round pool on a timber deck, cut level with the view. In the morning it catches the shade of the headland; by evening the water is the colour of the sky.",
      "Inside, the bathroom is built from the same laterite as the cliff, with a copper tub and a shower open to the sky.",
    ],
    features: ["Private plunge pool", "Laterite stone bathroom", "Copper soaking tub", "Open-sky shower"],
    amenities: standard,
    photos: ["tidePool", "tideDusk", "bathStone"],
    plan: {
      w: 12,
      d: 8,
      rooms: [
        { label: "Bedroom", x: 0, y: 0, w: 6.5, d: 5 },
        { label: "Bath", x: 6.5, y: 0, w: 5.5, d: 5 },
        { label: "Deck + pool", x: 0, y: 5, w: 12, d: 3 },
      ],
    },
  },
  {
    slug: "garden-villa",
    name: "Garden Villa",
    count: 3,
    size: 88,
    view: "Garden and sea",
    bed: "King, plus a day bed",
    maxAdults: 3,
    maxGuests: 4,
    baseRate: 54000,
    summary: "A stone villa in the terraced garden, with its own pool and a morning-facing deck.",
    story: [
      "The three Garden Villas are set lower down, among the frangipani and the old cashew trees, where the garden steps towards the sea. Each has a walled pool, an outdoor day bed and a deck that catches the morning.",
      "They are the only keys at LUXE that suit a family: the day bed makes up for a child, and the garden is fenced from the cliff.",
    ],
    features: ["Private walled pool", "Outdoor day bed", "Morning deck", "Suits families"],
    amenities: standard,
    photos: ["villaTwilight", "villaCanopy", "cabana"],
    plan: {
      w: 13,
      d: 9,
      rooms: [
        { label: "Bedroom", x: 0, y: 0, w: 6, d: 5 },
        { label: "Living", x: 6, y: 0, w: 7, d: 5 },
        { label: "Bath", x: 0, y: 5, w: 4, d: 4 },
        { label: "Pool", x: 4, y: 5, w: 9, d: 4 },
      ],
    },
  },
  {
    slug: "headland-residence",
    name: "The Headland Residence",
    count: 1,
    size: 180,
    view: "Three sides of sea",
    bed: "Two kings",
    maxAdults: 4,
    maxGuests: 6,
    baseRate: 120000,
    summary: "Two bedroom pavilions and a living room open on three sides, alone on the tip of the headland.",
    story: [
      "There is one Residence, on the very end of the headland, reached by its own path through the garden. Two bedroom pavilions face each other across a long pool; between them, a living room with no walls on three sides.",
      "A butler, a private chef on request, and the only sunrise view at LUXE, from the east terrace.",
    ],
    features: ["Two bedroom pavilions", "Twenty-metre pool", "Butler and private chef", "East and west terraces"],
    amenities: [...standard, "Butler service", "Private chef on request"],
    photos: ["residenceAerial", "residenceBed", "poolCliff"],
    plan: {
      w: 20,
      d: 12,
      rooms: [
        { label: "Bedroom I", x: 0, y: 0, w: 6, d: 6 },
        { label: "Living", x: 6, y: 0, w: 8, d: 6 },
        { label: "Bedroom II", x: 14, y: 0, w: 6, d: 6 },
        { label: "Pool", x: 2, y: 6, w: 16, d: 3 },
        { label: "Terrace", x: 0, y: 9, w: 20, d: 3 },
      ],
    },
  },
];

export function getSuite(slug: string): Suite | undefined {
  return suites.find((s) => s.slug === slug);
}

export const totalKeys = suites.reduce((n, s) => n + s.count, 0);

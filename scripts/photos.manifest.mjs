/**
 * PHOTO MANIFEST
 * ────────────────────────────────────────────────────────────────────────────
 * Every photograph on the site, sourced from Unsplash under the Unsplash
 * License (free for commercial use; attribution given anyway on /credits).
 * LUXE is fictional, so these are stand-ins for a real property's own shoot.
 *
 *   key    name used in code: photos.<key>
 *   id     Unsplash photo id (https://unsplash.com/photos/<id>)
 *   width  longest edge to keep (px)
 *   alt    what the image shows, written for screen readers
 *
 * Run `npm run photos` to (re)download, resize and regenerate lib/photos.ts.
 */
export const manifest = [
  // Arrival, the pool, the cliffs
  { key: "heroDusk", id: "UA0p9yPn-QQ", width: 2600, alt: "Infinity pool at dusk, palms reflected in still water and the sea beyond" },
  { key: "poolCliff", id: "L6XwCOFpom4", width: 2000, alt: "Infinity pool on the cliff edge with sunlight scattered across the sea" },
  { key: "poolFrangipani", id: "x4zyRK-XUf0", width: 2000, alt: "Frangipani branches framing an infinity pool that meets the open sea" },
  { key: "cliffLaterite", id: "Un0s8OmOEr0", width: 2000, alt: "Red laterite cliffs and green headland above white surf" },
  { key: "cliffGolden", id: "CtqSoMZY7c8", width: 2000, alt: "Golden evening light over the cliffs and a long curve of beach" },
  { key: "aerialCoast", id: "VfXxCjkxew0", width: 2000, alt: "Aerial view of red rocks, jungle and turquoise water along the coast" },
  { key: "cliffPalms", id: "05fviXJJM0s", width: 2000, alt: "Coconut palms leaning over a cliff path above the surf" },
  { key: "dawnBoat", id: "vwMBUwR72UM", width: 2000, alt: "A fisherman standing in a narrow boat on still, misty water at dawn" },
  { key: "fishingBoats", id: "6P-66ETwwH0", width: 2000, alt: "Painted fishing boats drawn up on the beach in the morning" },
  { key: "sunsetSea", id: "rejH0f_UEYI", width: 2000, alt: "The sun setting into a hazy sea, its reflection a column of gold" },
  { key: "palmsDusk", id: "xghup-YtT5w", width: 2000, alt: "Silhouetted palms and parasols reflected in water after sunset" },

  // Suites
  { key: "horizonRoom", id: "nnaSYTDyUUo", width: 2000, alt: "Bedroom opening through sliding glass onto a terrace and the sea" },
  { key: "horizonView", id: "Jzufn5oVmUE", width: 1800, alt: "Turquoise sea seen through floor-length blue curtains" },
  { key: "loftRoom", id: "s2e8AiqYWOo", width: 2000, alt: "Timber loft bedroom with a staircase up to a mezzanine" },
  { key: "loftCalm", id: "fBdlytm6Hp8", width: 2000, alt: "Minimal white bedroom with polished concrete walls and soft light" },
  { key: "villaTwilight", id: "oVnKC7wiQjA", width: 2000, alt: "Thatched garden villa glowing at twilight behind its private pool" },
  { key: "villaCanopy", id: "3jZd5h4nJDE", width: 2000, alt: "Canopy bed beneath a steep timber roof with woven wall pieces" },
  { key: "tidePool", id: "TqUyvdsUAIQ", width: 2000, alt: "Round plunge pool on a timber deck overlooking the sea" },
  { key: "tideDusk", id: "KgybDitNR18", width: 2000, alt: "Pool villa at dusk with lanterns lit along the water" },
  { key: "residenceBed", id: "tpb71GRts8o", width: 2000, alt: "White canopy bed with patterned cushions under exposed beams" },
  { key: "residenceAerial", id: "3rZ2h3057wI", width: 2000, alt: "Aerial view of a villa roof and pool among dense tropical planting" },
  { key: "bathStone", id: "_EienJTUSWI", width: 2000, alt: "Copper bathtub in a bathroom of rough stone walls and stone floor" },
  { key: "bathLight", id: "JGfXR2a8RNg", width: 2000, alt: "Freestanding bath in soft morning light against pale stone" },
  { key: "balcony", id: "_sQ2nPVdZj0", width: 1800, alt: "Canvas chair on a balcony looking out to forested hills" },

  // Dining
  { key: "emberFire", id: "3_M4NxDo89A", width: 2000, alt: "Whole fish grilling over glowing coals" },
  { key: "pomfret", id: "6fmwFzYbLqk", width: 1800, alt: "Two masala-rubbed fried fish with lime slices and coriander" },
  { key: "bananaLeaf", id: "hVnClpnYUUk", width: 1800, alt: "Grilled fish served on a banana leaf" },
  { key: "emberNight", id: "lB6g-y-DIHs", width: 2000, alt: "Candlelit restaurant tables glowing in the dark" },
  { key: "longTable", id: "fb0_wj2MZk4", width: 2000, alt: "A long dinner table set with flowers and candles" },
  { key: "barLedge", id: "-rYsVUrJW0U", width: 1800, alt: "A red cocktail on a stone ledge above the sea, palms in the foreground" },
  { key: "sunsetDrink", id: "kq6vgUQQ3Xc", width: 1800, alt: "A glass held up against the sun setting over the sea" },
  { key: "floatingBreakfast", id: "URsvjWA7PLA", width: 1800, alt: "A floating breakfast tray of croissants and fruit on a pool" },

  // Spa & experiences
  { key: "steamRoom", id: "9qYFu1NzpS8", width: 2000, alt: "Steam room lit by a single candle and warm wall lights" },
  { key: "hotStones", id: "uWiQaLrQDMM", width: 1800, alt: "A line of warm basalt stones resting on a guest's back" },
  { key: "spaPool", id: "T4fuKGw1ijM", width: 2000, alt: "Loungers beside a dark indoor pool with a slate wall" },
  { key: "yogaDusk", id: "2hKNq2rX93g", width: 2000, alt: "A person in a yoga pose in shallow water at sunset" },
  { key: "cabana", id: "mXKmYN7QGsQ", width: 2000, alt: "Cushioned daybed in a timber cabana striped with sunlight" },
];

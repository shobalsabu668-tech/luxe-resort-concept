import type { PhotoKey } from "./photos";

/** DINING — three places to eat and drink, each built around a time of day. */

export type Menu = { title: string; note?: string; items: { name: string; detail: string }[] };

export type Venue = {
  slug: string;
  name: string;
  kind: string;
  hours: string;
  line: string;
  body: string;
  photo: PhotoKey;
  detail: PhotoKey;
  menus: Menu[];
};

export const venues: Venue[] = [
  {
    slug: "ember",
    name: "Ember",
    kind: "Dinner · fire-cooked coastal",
    hours: "7:00 – 11:00 pm",
    line: "Fire, salt, and whatever the boats bring in.",
    body: "Ember has no gas line. Everything is cooked over coconut-husk coals in an open kitchen at the back of the terrace: the morning's catch, vegetables from the village market, rice from the paddies inland. The menu is written at four o'clock, when the boats come back.",
    photo: "emberFire",
    detail: "emberNight",
    menus: [
      {
        title: "Tasting menu",
        note: "Seven courses · ₹6,800 per guest",
        items: [
          { name: "Sol kadhi", detail: "Kokum and coconut milk, served cold" },
          { name: "Rawa-fried mussels", detail: "Curry leaf, green chilli, lime" },
          { name: "Coal-roasted pomfret", detail: "Green masala, charred onion" },
          { name: "Crab sukka", detail: "Dry-roasted coconut, pao from the wood oven" },
          { name: "Kingfish over embers", detail: "Raw mango, smoked salt" },
          { name: "Red rice and kokum curry", detail: "From the paddies inland" },
          { name: "Burnt jaggery and coconut", detail: "Cashew praline, feni cream" },
        ],
      },
      {
        title: "From the coals",
        items: [
          { name: "Catch of the day", detail: "Grilled whole, for two" },
          { name: "Tiger prawns", detail: "Garlic, butter, pepper from the hills" },
          { name: "Coal-baked aubergine", detail: "Peanut, tamarind, crisp onion" },
        ],
      },
    ],
  },
  {
    slug: "salt-terrace",
    name: "Salt Terrace",
    kind: "Breakfast & lunch",
    hours: "7:00 am – 4:00 pm",
    line: "Breakfast in the shade of the frangipani.",
    body: "An open terrace under the frangipani trees, a few steps above the pool. Breakfast is unhurried and runs late; lunch is light: thalis, grilled fish, fruit from the market. Everything can be sent to your terrace, or served on the water for suites with a pool.",
    photo: "bananaLeaf",
    detail: "floatingBreakfast",
    menus: [
      {
        title: "Breakfast",
        note: "Until 11:00 am",
        items: [
          { name: "Neer dosa", detail: "Coconut chutney, jaggery" },
          { name: "Akuri on sourdough", detail: "Spiced scrambled eggs, fresh coriander" },
          { name: "Market fruit", detail: "Whatever is ripe: mango, jackfruit, chikoo" },
          { name: "Filter coffee", detail: "From the estates of Coorg" },
        ],
      },
      {
        title: "Lunch",
        items: [
          { name: "Prawn thali", detail: "Solkadhi, red rice, three curries" },
          { name: "Grilled catch", detail: "Kokum butter, charred greens" },
          { name: "Raw papaya salad", detail: "Peanut, chilli, lime" },
        ],
      },
    ],
  },
  {
    slug: "low-tide-bar",
    name: "The Low Tide Bar",
    kind: "Sunset & late",
    hours: "5:00 pm – late",
    line: "A bar built for one hour a day.",
    body: "A stone bar on the lowest ledge of the cliff, just above the waterline, with twelve stools that all face west. It opens an hour before sunset and stays open for as long as anyone wants to talk.",
    photo: "barLedge",
    detail: "sunsetDrink",
    menus: [
      {
        title: "At sunset",
        items: [
          { name: "Kokum spritz", detail: "Kokum, sparkling wine, soda" },
          { name: "Feni sour", detail: "Cashew feni, lime, egg white" },
          { name: "Smoked coconut old fashioned", detail: "Rum, jaggery, coconut smoke" },
          { name: "Sol kadhi, no alcohol", detail: "Kokum, coconut, green chilli" },
        ],
      },
    ],
  },
];

export const privateDining = {
  title: "Private dining",
  body: "On the headland at sunset, at a long table in the garden, or on your own terrace. Tell us the evening you have in mind and the Ember kitchen will cook it.",
  photo: "longTable" as PhotoKey,
};

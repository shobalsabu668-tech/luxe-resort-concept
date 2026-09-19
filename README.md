# LUXE — cliffside retreat (concept website)

> **A self-initiated concept by [Shobal Sabu](https://shobal-sabu-portfolio.vercel.app).**
> LUXE is a fictional resort. It isn't a real business or client work, and nothing on the site can be booked.

**Live site:** https://luxe-resort-concept.vercel.app · **Case study:** https://shobal-sabu-portfolio.vercel.app/work/luxe

LUXE is a complete, working website for an imaginary luxury resort on India's Konkan coast. It shows how a hospitality
brand can lead with atmosphere and still get a guest from first impression to a priced stay in a few seconds.

## What's in it

| Area | What was built |
| --- | --- |
| **Booking engine** | Five steps (dates → suite → enhancements → details → review) held in one URL. Every step is shareable and the browser's Back button works. Guest details stay in memory and never enter the URL. |
| **Rates & availability** | Seasonal and weekend pricing, a festive-season minimum stay, and availability per suite and night. The "nearest free dates" suggestion appears when a suite is full. Availability is deterministic: the same night gives the same answer for everyone, with no server. |
| **Date-range calendar** | Every night shows its lowest rate. Fully keyboard-operable (arrows, Page Up/Down, Home/End), and each date has a screen-reader label with its price. |
| **Suites** | Five suite types with a live quote panel (night-by-night rates, tax, total), a comparison table, and floor plans drawn in SVG from data. |
| **Motion** | Pinned horizontal suites rail, a paragraph that brightens as you read it, a pinned "day at LUXE" sequence, and clip-reveal photographs. All of it respects `prefers-reduced-motion`. |
| **Drawn map** | The coast map is hand-built SVG that draws itself in. No map embed and no third-party requests. |
| **Accessibility** | Focus-trapped dialogs, popovers and lightbox; a tabbed menu; labelled forms with inline validation; a skip link. axe-core reports 0 violations on every page at 1440 px and 390 px. |
| **Performance** | Static pages; AVIF/WebP images with blur placeholders; inlined CSS; no UI or animation libraries. |
| **Honesty** | Concept banner on every page; structured data describes a *CreativeWork*, not a Hotel; `noindex` so a fictional hotel never appears in search results. |

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · sharp (image pipeline)

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start
```

`npm run photos` re-downloads the photographs listed in `scripts/photos.manifest.mjs`, resizes them into
`public/photos/`, and regenerates `lib/photos.ts` (dimensions, blur placeholders, photographer credits).

Optional environment variables (see `.env.example`): `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_PORTFOLIO_URL`.
There are no secrets and no backend.

## Structure

```text
app/                 pages: home, suites, suites/[slug], dining, experiences, book, concept
components/
  home/              home-page sections
  booking/           calendar, popover, stepper, booking bar
  book/              the five-step booking flow
  suite/             quote panel, floor plan
  gallery/           editorial grid + lightbox
  layout/            header, footer, concept bar
lib/
  rates.ts           pricing, seasons, availability, quotes
  booking-state.ts   URL <-> booking selection
  suites.ts, dining.ts, experiences.ts, extras.ts   content
  photos.ts          generated photo catalogue
scripts/             photo pipeline
```

## What is simulated

- The resort, its location, prices and people are fictional.
- Availability is generated, not real inventory.
- Nothing entered on the site is stored or sent anywhere.
- Photographs are from [Unsplash](https://unsplash.com) and stand in for a property's own shoot. Every photographer is credited on the site at `/concept#credits`.

## Using this for a real hotel

Replace the content in `lib/`, swap `roomsLeft()` and `nightlyRate()` in `lib/rates.ts` for calls to the hotel's
booking engine or channel manager, hand the review step to the payment provider, and set `robots.index` to `true`
in `app/layout.tsx`.

---

Designed and built by **Shobal Sabu**, a creative web developer in Bengaluru. Available for freelance projects:
[shobalsabu668@gmail.com](mailto:shobalsabu668@gmail.com)

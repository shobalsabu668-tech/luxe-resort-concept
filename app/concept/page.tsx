import type { Metadata } from "next";
import { photos } from "@/lib/photos";
import { author, site } from "@/lib/site";
import { ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "About this concept",
  description: `LUXE is a self-initiated concept website by ${author.name}: what was built, how, and what is simulated.`,
  alternates: { canonical: "/concept" },
};

const built = [
  ["Art direction & design system", "Palette, type scale and components drawn from the place itself; light and dark sections that pace the scroll."],
  ["Booking engine", "Five steps, one URL: dates, suite, enhancements, details, review. Shareable at every step, and the browser's Back button works."],
  ["Rates & availability", "Seasonal and weekend pricing with deterministic availability per suite and night, minimum stays, and nearest-date suggestions when a suite is full."],
  ["Date-range calendar", "Every night shows its lowest rate. Fully keyboard-operable (arrows, Page Up/Down, Home/End) with screen-reader labels for each date."],
  ["Motion", "A pinned horizontal suites rail, a reading-along paragraph, a pinned day-in-the-life sequence, and clip reveals. All of it switches off under reduced motion."],
  ["Drawn, not embedded", "The coast map and every suite's floor plan are SVG generated from data. They load nothing and match the site."],
  ["Accessible components", "Dialogs and popovers with focus traps, a lightbox with keyboard and swipe, tabbed menus, and labelled forms with inline validation."],
  ["Image pipeline", "A script downloads each photograph, resizes it and generates a blur placeholder. next/image serves AVIF/WebP at the right size."],
];

const simulated = [
  "LUXE, its location, people and prices are fictional.",
  "Availability and rates are generated. The same date always gives the same answer, but no real inventory is behind it.",
  "Nothing you enter is stored or sent: not the booking, not the newsletter address.",
  "Photographs are licensed from Unsplash, standing in for a property's own shoot, and credited below.",
];

export default function ConceptPage() {
  const credits = Object.values(photos);
  return (
    <main id="main">
      <section className="theme-dark -mt-[var(--bar-h)] pb-20 pt-[calc(var(--header-h)+var(--bar-h)+5rem)] md:pb-28">
        <div className="shell">
          <p className="t-label text-sand">About this concept</p>
          <h1 className="t-display mt-5 max-w-[15ch]">A resort that doesn&rsquo;t exist, built as if it did.</h1>
          <p className="t-lead mt-8 max-w-2xl text-salt/85">
            {site.name} is a self-initiated concept by {author.name}, a creative web developer in Bengaluru. It was
            designed and built to show what a luxury hospitality website can be: atmosphere first, with the path to a
            booking always within reach. It is not a real business, and not client work.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={author.caseStudy} className="btn btn-sand">
              Read the case study <ArrowUpRight size={13} />
            </a>
            <a href={author.repo} className="btn btn-line">
              View the source code <ArrowUpRight size={13} />
            </a>
            <a href={author.portfolio} className="btn btn-line">
              Work with {author.name.split(" ")[0]} <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="built-title" className="theme-light section">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <h2 id="built-title" className="t-h2 !text-[clamp(2rem,3.4vw,3.25rem)]">
              What was built
            </h2>
            <p className="muted mt-6">
              Next.js 15, React 19, TypeScript and Tailwind CSS 4. No UI kit and no animation library: every component and
              every motion on the site was written for it.
            </p>
          </div>
          <dl className="grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:col-span-8">
            {built.map(([k, v]) => (
              <div key={k} className="bg-salt p-6">
                <dt className="text-[1.05rem] font-[520]">{k}</dt>
                <dd className="muted mt-2 text-[0.95rem]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="sim-title" className="theme-light border-t border-ink/10 section">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-6">
          <h2 id="sim-title" className="t-h2 !text-[clamp(2rem,3.4vw,3.25rem)] lg:col-span-4">
            What is simulated
          </h2>
          <ul className="space-y-4 lg:col-span-8">
            {simulated.map((s) => (
              <li key={s} className="flex gap-4 border-b border-ink/15 pb-4 text-[1.05rem]">
                <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-ember" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="credits" aria-labelledby="credits-title" className="theme-dark section scroll-mt-20">
        <div className="shell">
          <h2 id="credits-title" className="t-h2 !text-[clamp(2rem,3.4vw,3.25rem)]">
            Photography
          </h2>
          <p className="muted mt-6 max-w-2xl">
            All photographs are from Unsplash, used under the Unsplash License. Thank you to every photographer below.
          </p>
          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-3 text-[0.92rem] sm:grid-cols-2 lg:grid-cols-3">
            {credits.map((p) => (
              <li key={p.src} className="relative flex min-w-0 justify-between gap-4 border-b border-salt/10 py-2">
                <span className="min-w-0 truncate text-mist">{p.alt}</span>
                <a href={p.credit.url} target="_blank" rel="noreferrer" className="link-u shrink-0">
                  {p.credit.name}
                  <span className="sr-only"> on Unsplash (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import { author, nav, site } from "@/lib/site";
import { ArrowUpRight, Mark } from "@/components/icons";
import { Newsletter } from "./newsletter";

export function Footer() {
  return (
    <footer className="theme-dark relative overflow-hidden border-t border-salt/10">
      <div className="shell grid gap-14 pb-10 pt-20 md:grid-cols-12 md:pt-28">
        <div className="md:col-span-5">
          <Mark size={36} className="text-sand" />
          <p className="t-h3 mt-8 max-w-sm">{site.tagline}</p>
          <p className="muted mt-4 max-w-sm text-[0.95rem]">
            {site.address.join(", ")}. Check-in from {site.checkIn}, check-out by {site.checkOut}.
          </p>
          <a href={`mailto:${site.email}`} className="link-u mt-6 inline-block">
            {site.email}
          </a>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="t-label text-mist">Explore</p>
          <ul className="mt-5 space-y-2.5">
            {[...nav, { href: "/book", label: "Book a stay" }, { href: "/concept", label: "About this concept" }].map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="link-grow">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="t-label text-mist">Letters from the coast</p>
          <p className="muted mt-5 max-w-sm text-[0.95rem]">Four a year: the seasons, the menus, and the odd monsoon photograph.</p>
          <Newsletter />
        </div>
      </div>

      {/* Decorative wordmark, drawn as SVG so it is ignored by assistive tech. */}
      <svg aria-hidden="true" viewBox="0 0 1000 190" className="pointer-events-none mx-auto block w-full select-none px-[var(--gutter)]">
        <text x="500" y="170" textAnchor="middle" fontSize="210" fontWeight="260" letterSpacing="60" fill="currentColor" className="text-salt/[0.05] [font-stretch:125%]">
          {site.name}
        </text>
      </svg>

      <div className="shell flex flex-col gap-4 border-t border-salt/10 pb-24 pt-6 text-[0.82rem] text-mist sm:flex-row sm:items-center sm:justify-between md:pb-6">
        <p>
          A self-initiated concept. LUXE is fictional; photographs from{" "}
          <Link href="/concept#credits" className="link-u">
            Unsplash
          </Link>
          .
        </p>
        <p className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <span>
            Designed &amp; built by{" "}
            <a href={author.portfolio} className="link-u text-salt">
              {author.name}
            </a>
          </span>
          <a href={author.repo} className="inline-flex items-center gap-1 link-u">
            Source code <ArrowUpRight size={11} />
          </a>
        </p>
      </div>
    </footer>
  );
}

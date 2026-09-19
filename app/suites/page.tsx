import type { Metadata } from "next";
import Link from "next/link";
import { suites, totalKeys } from "@/lib/suites";
import { fromRate } from "@/lib/rates";
import { formatINR } from "@/lib/format";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { ArrowRight, Check } from "@/components/icons";

export const metadata: Metadata = {
  title: "Suites",
  description: `${totalKeys} west-facing suites in five types, from the Cliff Loft to the Headland Residence.`,
  alternates: { canonical: "/suites" },
};

const pool = (slug: string) => ["tide-pool-suite", "garden-villa", "headland-residence"].includes(slug);

export default function SuitesPage() {
  return (
    <main id="main">
      <PageHero
        photo="horizonRoom"
        eyebrow="Suites"
        title="Twenty-two rooms with one view."
        lead="Five ways to stay, all facing west. The differences are space, privacy, and whether the water is yours alone."
      />

      <section aria-label="All suites" className="theme-light section">
        <ol className="shell space-y-24 md:space-y-36">
          {suites.map((s, i) => (
            <li key={s.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
              <Link
                href={`/suites/${s.slug}`}
                className={`group block lg:col-span-7 ${i % 2 ? "lg:order-2 lg:col-start-6" : ""}`}
                tabIndex={-1}
                aria-hidden="true"
              >
                <Photo name={s.photos[0]} reveal sizes="(min-width: 1024px) 58vw, 100vw" className="photo-zoom aspect-[16/11]" />
              </Link>
              <div className={`lg:col-span-4 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`}>
                <p className="t-label muted" data-reveal>
                  0{i + 1} · {s.count} {s.count === 1 ? "key" : "keys"}
                </p>
                <h2 className="t-h2 mt-4 !text-[clamp(2rem,3.4vw,3.25rem)]" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
                  <Link href={`/suites/${s.slug}`} className="hover:text-ember">
                    {s.name}
                  </Link>
                </h2>
                <p className="t-lead muted mt-5" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
                  {s.summary}
                </p>
                <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-ink/15 py-5 text-[0.95rem]" data-reveal style={{ "--d": 3 } as React.CSSProperties}>
                  <div>
                    <dt className="t-label muted">Size</dt>
                    <dd className="t-num mt-1">{s.size} m²</dd>
                  </div>
                  <div>
                    <dt className="t-label muted">Sleeps</dt>
                    <dd className="mt-1">{s.maxGuests}</dd>
                  </div>
                  <div>
                    <dt className="t-label muted">From</dt>
                    <dd className="t-num mt-1">{formatINR(fromRate(s))}</dd>
                  </div>
                </dl>
                <Link href={`/suites/${s.slug}`} className="btn btn-line mt-8" data-reveal style={{ "--d": 4 } as React.CSSProperties}>
                  View the {s.name.replace("The ", "")} <ArrowRight size={14} />
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="compare-title" className="theme-dark section">
        <div className="shell">
          <p className="t-label text-sand">Side by side</p>
          <h2 id="compare-title" className="t-h2 mt-5">
            Compare the suites.
          </h2>
          <div className="mt-12 overflow-x-auto" tabIndex={0} role="region" aria-labelledby="compare-title">
            <table className="w-full min-w-[46rem] border-collapse text-left text-[0.95rem]">
              <caption className="sr-only">Suite comparison: size, guests, view, private pool and starting rate</caption>
              <thead>
                <tr className="border-b border-salt/20">
                  {["Suite", "Size", "Sleeps", "View", "Private pool", "From / night"].map((h) => (
                    <th key={h} scope="col" className="t-label py-4 pr-6 font-[520] text-mist">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {suites.map((s) => (
                  <tr key={s.slug} className="border-b border-salt/10">
                    <th scope="row" className="py-5 pr-6 font-[400]">
                      <Link href={`/suites/${s.slug}`} className="link-grow">
                        {s.name}
                      </Link>
                    </th>
                    <td className="t-num py-5 pr-6">{s.size} m²</td>
                    <td className="py-5 pr-6">{s.maxGuests}</td>
                    <td className="py-5 pr-6 text-mist">{s.view}</td>
                    <td className="py-5 pr-6">
                      {pool(s.slug) ? (
                        <>
                          <Check size={14} className="text-sand" />
                          <span className="sr-only">Yes</span>
                        </>
                      ) : (
                        <span className="text-mist">
                          <span aria-hidden="true">—</span>
                          <span className="sr-only">No</span>
                        </span>
                      )}
                    </td>
                    <td className="t-num py-5">{formatINR(fromRate(s))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-[0.85rem] text-mist">Starting rates are for monsoon weekdays, before 18% tax. The calendar shows every night&rsquo;s rate.</p>
        </div>
      </section>
    </main>
  );
}

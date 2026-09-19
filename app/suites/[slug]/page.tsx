import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSuite, suites } from "@/lib/suites";
import { photos } from "@/lib/photos";
import { PageHero } from "@/components/page-hero";
import { FloorPlan } from "@/components/suite/floor-plan";
import { SuiteCheck } from "@/components/suite/suite-check";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { Photo } from "@/components/photo";
import { ArrowRight } from "@/components/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return suites.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const suite = getSuite((await params).slug);
  if (!suite) return {};
  return {
    title: suite.name,
    description: `${suite.summary} ${suite.size} m², sleeps ${suite.maxGuests}.`,
    alternates: { canonical: `/suites/${suite.slug}` },
    openGraph: { images: [{ url: photos[suite.photos[0]].src }] },
  };
}

export default async function SuitePage({ params }: { params: Promise<{ slug: string }> }) {
  const suite = getSuite((await params).slug);
  if (!suite) notFound();
  const i = suites.indexOf(suite);
  const next = suites[(i + 1) % suites.length];

  return (
    <main id="main">
      <PageHero photo={suite.photos[0]} eyebrow={`Suite 0${i + 1} · ${suite.count} ${suite.count === 1 ? "key" : "keys"}`} title={suite.name} lead={suite.summary}>
        <dl className="intro-rise mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-salt/25 pt-6 text-[0.95rem]" style={{ "--d": 3 } as React.CSSProperties}>
          {[
            ["Size", `${suite.size} m²`],
            ["View", suite.view],
            ["Bed", suite.bed],
            ["Sleeps", `Up to ${suite.maxGuests}`],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="t-label text-sand">{k}</dt>
              <dd className="mt-1">{v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section aria-label={`About the ${suite.name}`} className="theme-light section">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6">
            {suite.story.map((p, k) => (
              <p key={k} className={k === 0 ? "t-h3 !font-[300]" : "t-lead muted mt-8"} data-reveal style={{ "--d": k } as React.CSSProperties}>
                {p}
              </p>
            ))}
            <ul className="mt-12 grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2">
              {suite.features.map((f) => (
                <li key={f} className="bg-salt p-5 text-[1rem]">
                  <span aria-hidden="true" className="mb-3 block h-px w-6 bg-ember" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="lg:sticky lg:top-28">
              <SuiteCheck suite={suite} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="suite-photos" className="theme-light pb-[var(--section)]">
        <div className="shell">
          <h2 id="suite-photos" className="t-label mb-8">
            Photographs
          </h2>
          <GalleryGrid
            tiles={[
              { key: suite.photos[1], className: "col-span-2 aspect-[16/10] md:col-span-7 md:aspect-auto md:min-h-[34rem]", sizes: "(min-width: 768px) 58vw, 100vw" },
              { key: suite.photos[2], className: "col-span-2 aspect-[4/5] md:col-span-5", sizes: "(min-width: 768px) 42vw, 100vw" },
            ]}
          />
        </div>
      </section>

      <section aria-labelledby="plan-title" className="theme-light border-t border-ink/10 section">
        <div className="shell grid items-start gap-14 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <h2 id="plan-title" className="t-h2 !text-[clamp(2rem,3.4vw,3.25rem)]">
              The plan
            </h2>
            <p className="muted mt-6">Every suite is laid out so the bed, the bath and the terrace all face the sea.</p>
            <h3 className="t-label mt-12">In every room</h3>
            <ul className="mt-5 space-y-2.5">
              {suite.amenities.map((a) => (
                <li key={a} className="flex gap-3 text-[0.95rem]">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-ink/40" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <FloorPlan suite={suite} />
          </div>
        </div>
      </section>

      <section aria-label="Next suite" className="theme-dark relative overflow-hidden">
        <Link href={`/suites/${next.slug}`} className="group relative block">
          <Photo name={next.photos[0]} sizes="100vw" className="photo-zoom absolute inset-0 opacity-60" alt="" />
          <div className="shell relative flex min-h-[60svh] flex-col justify-end py-16">
            <p className="t-label text-sand">Next suite</p>
            <p className="t-display mt-4 flex items-end gap-6">
              {next.name}
              <ArrowRight size={40} className="mb-3 hidden transition-transform duration-700 group-hover:translate-x-3 md:block" />
            </p>
          </div>
        </Link>
      </section>
    </main>
  );
}

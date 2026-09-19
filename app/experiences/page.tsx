import type { Metadata } from "next";
import Link from "next/link";
import { experiences, spa, seasonsCopy } from "@/lib/experiences";
import { formatINR } from "@/lib/format";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Experiences",
  description: "Dawn boats, the cliff walk, yoga on the headland and the Salt Room spa at LUXE.",
  alternates: { canonical: "/experiences" },
};

export default function ExperiencesPage() {
  return (
    <main id="main">
      <PageHero
        photo="cliffGolden"
        eyebrow="Experiences"
        title="Days shaped by the tide."
        lead="Nothing is scheduled unless you want it to be. These are the things guests come back for."
      />

      <section aria-label="Experiences" className="theme-light section">
        <ul className="shell grid gap-x-6 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((e, i) => (
            <li key={e.slug} id={e.slug} className={i === 0 ? "md:col-span-2 lg:col-span-2" : ""}>
              <Photo name={e.photo} reveal sizes={i === 0 ? "(min-width: 1024px) 64vw, 100vw" : "(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 100vw"} className={i === 0 ? "aspect-[16/10]" : "aspect-[4/5]"} />
              <div className="mt-6 flex items-baseline justify-between gap-4">
                <h2 className="t-h3">{e.name}</h2>
                <p className="t-num shrink-0 text-[0.9rem]">{e.price}</p>
              </div>
              <p className="t-label muted mt-2">
                {e.when} · {e.duration}
              </p>
              <p className="muted t-body mt-4 max-w-md">{e.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="salt-room" aria-labelledby="salt-title" className="theme-dark section scroll-mt-20">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <p className="t-label text-sand">The spa</p>
            <h2 id="salt-title" className="t-h2 mt-5">
              {spa.name}
            </h2>
            <p className="t-h3 mt-6 !font-[300]">{spa.line}</p>
            <p className="muted t-body mt-6">{spa.body}</p>
            <p className="muted mt-6 text-[0.9rem]">Open daily, 12:00 – 8:00 pm. Treatments can be added when you book.</p>
            <Link href="/book" className="btn btn-sand mt-10">
              Book a stay <ArrowRight size={14} />
            </Link>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-2 gap-4">
              <Photo name={spa.photos[0]} reveal sizes="(min-width: 1024px) 25vw, 50vw" className="col-span-2 aspect-[16/10]" />
              <Photo name={spa.photos[1]} reveal sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-square" />
              <Photo name={spa.photos[2]} reveal sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-square" />
            </div>
            <table className="mt-12 w-full border-collapse text-left">
              <caption className="t-label pb-4 text-left text-mist">Treatments</caption>
              <tbody>
                {spa.treatments.map((t) => (
                  <tr key={t.name} className="border-t border-salt/15">
                    <th scope="row" className="py-5 pr-4 align-top font-[400]">
                      {t.name}
                      <span className="mt-1 block text-[0.9rem] font-[380] text-mist">{t.detail}</span>
                    </th>
                    <td className="t-num py-5 pr-4 align-top text-mist">{t.duration}</td>
                    <td className="t-num py-5 text-right align-top">{formatINR(t.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="seasons-title" className="theme-light section">
        <div className="shell">
          <h2 id="seasons-title" className="t-h2 max-w-[18ch]">
            When to come.
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {seasonsCopy.map((s) => (
              <li key={s.name} className="border-t border-ink/20 pt-6">
                <h3 className="t-h3">{s.name}</h3>
                <p className="t-label muted mt-2">{s.months}</p>
                <p className="muted t-body mt-5">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}

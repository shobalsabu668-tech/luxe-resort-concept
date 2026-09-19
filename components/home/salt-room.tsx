import Link from "next/link";
import { spa } from "@/lib/experiences";
import { formatINR } from "@/lib/format";
import { Photo } from "@/components/photo";
import { ArrowRight } from "@/components/icons";

/** THE SALT ROOM — the spa, as a full-bleed dark room with a price list. */
export function SaltRoom() {
  return (
    <section aria-labelledby="spa-title" className="theme-dark relative overflow-hidden">
      <Photo name="steamRoom" sizes="100vw" className="absolute inset-0" alt="" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgb(15_23_22/0.94)_0%,rgb(15_23_22/0.82)_45%,rgb(15_23_22/0.35)_100%)]" />
      <div className="shell section relative grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="t-label text-sand" data-reveal>
            {spa.name}
          </p>
          <h2 id="spa-title" className="t-h2 mt-5" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
            {spa.line}
          </h2>
          <p className="t-lead muted mt-8" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
            {spa.body}
          </p>
          <Link href="/experiences#salt-room" className="btn btn-line mt-10" data-reveal style={{ "--d": 3 } as React.CSSProperties}>
            The Salt Room <ArrowRight size={14} />
          </Link>
        </div>

        <ul className="self-end border-t border-salt/20 lg:col-span-5 lg:col-start-8">
          {spa.treatments.map((t, i) => (
            <li key={t.name} className="flex items-baseline justify-between gap-6 border-b border-salt/20 py-5" data-reveal style={{ "--d": i } as React.CSSProperties}>
              <span>
                <span className="block text-[1.1rem]">{t.name}</span>
                <span className="muted text-[0.9rem]">{t.detail}</span>
              </span>
              <span className="t-num shrink-0 text-right text-[0.95rem]">
                {formatINR(t.price)}
                <span className="block text-[0.8rem] text-mist">{t.duration}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

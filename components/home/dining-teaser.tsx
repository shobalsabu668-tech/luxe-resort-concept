import Link from "next/link";
import { venues } from "@/lib/dining";
import { Photo } from "@/components/photo";
import { ArrowRight } from "@/components/icons";

/** DINING — Ember leads; the three venues follow as a timetable. */
export function DiningTeaser() {
  return (
    <section aria-labelledby="dining-title" className="theme-light section">
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="relative lg:col-span-6">
          <Photo name="emberFire" reveal sizes="(min-width: 1024px) 48vw, 100vw" className="aspect-[4/5]" />
          <Photo
            name="pomfret"
            reveal
            sizes="(min-width: 1024px) 20vw, 40vw"
            className="absolute -bottom-10 -right-4 hidden aspect-square w-[38%] border-[10px] border-salt md:block lg:-right-12"
          />
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <p className="t-label" data-reveal>
            Dining
          </p>
          <h2 id="dining-title" className="t-h2 mt-5" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
            Fire, salt, and whatever the boats bring in.
          </h2>
          <p className="t-lead muted mt-8" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
            No gas line, no set menu until four o&rsquo;clock. The kitchen cooks the coast the way it has always been
            cooked: over coals, with kokum and coconut, and fish that was in the sea this morning.
          </p>

          <ul className="mt-12 border-t border-ink/15">
            {venues.map((v, i) => (
              <li key={v.slug} data-reveal style={{ "--d": i + 2 } as React.CSSProperties}>
                <Link href={`/dining#${v.slug}`} className="group flex items-baseline justify-between gap-6 border-b border-ink/15 py-5">
                  <span>
                    <span className="t-h3 block text-[1.35rem] transition-colors group-hover:text-ember">{v.name}</span>
                    <span className="muted text-[0.9rem]">{v.kind}</span>
                  </span>
                  <span className="t-num muted shrink-0 text-[0.9rem]">{v.hours}</span>
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/dining" className="btn btn-line mt-10">
            Dining at LUXE <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

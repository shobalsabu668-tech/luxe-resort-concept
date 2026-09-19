import { distances } from "@/lib/experiences";
import { site } from "@/lib/site";
import { CoastMap } from "./coast-map";

/** LOCATION — distances framed as the things you'll do, beside a drawn map. */
export function Location() {
  return (
    <section id="location" aria-labelledby="location-title" className="theme-light section scroll-mt-0">
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <p className="t-label" data-reveal>
            Getting here
          </p>
          <h2 id="location-title" className="t-h2 mt-5" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
            On the headland, at the end of the coast road.
          </h2>
          <p className="t-lead muted mt-8 max-w-lg" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
            LUXE stands alone on a laterite headland, with the sea on three sides and the village a short drive inland.
            Most guests arrive by car from the airport; we will send one.
          </p>
          <dl className="mt-12 border-t border-ink/15">
            {distances.map((d, i) => (
              <div key={d.label} className="flex items-baseline gap-6 border-b border-ink/15 py-5" data-reveal style={{ "--d": i } as React.CSSProperties}>
                <dt className="t-num w-24 shrink-0 text-[1.6rem] font-[270] [font-stretch:115%]">{d.value}</dt>
                <dd className="muted">{d.label}</dd>
              </div>
            ))}
          </dl>
          <p className="muted mt-8 text-[0.9rem]">
            {site.address.join(", ")} · Check-in from {site.checkIn}, check-out by {site.checkOut}
          </p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <CoastMap />
        </div>
      </div>
    </section>
  );
}

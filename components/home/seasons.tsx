import { seasonsCopy } from "@/lib/experiences";

/** SEASONS — when to come, and what each season is for. */
export function Seasons() {
  return (
    <section aria-labelledby="seasons-title" className="theme-dark section">
      <div className="shell">
        <p className="t-label text-sand" data-reveal>
          When to come
        </p>
        <h2 id="seasons-title" className="t-h2 mt-5 max-w-[18ch]" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
          Three seasons, each worth the journey.
        </h2>
        <ol className="mt-16 grid gap-px bg-salt/15 md:grid-cols-3">
          {seasonsCopy.map((s, i) => (
            <li key={s.name} className="bg-tide p-0 md:p-8 md:first:pl-0" data-reveal style={{ "--d": i } as React.CSSProperties}>
              <div className="border-t border-salt/15 py-8 md:border-0 md:py-0">
                <p className="t-num text-[0.9rem] text-sand">0{i + 1}</p>
                <h3 className="t-h3 mt-6">{s.name}</h3>
                <p className="t-label mt-2 text-mist">{s.months}</p>
                <p className="muted t-body mt-6 max-w-sm">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import { currentSuite, totals, type Selection } from "@/lib/booking-state";
import { diffDays, formatShort } from "@/lib/dates";
import { formatINR, plural } from "@/lib/format";
import { unitLabel } from "@/lib/extras";
import { Photo } from "@/components/photo";

/** Running summary of the stay, beside every step. */
export function Summary({ s }: { s: Selection }) {
  const suite = currentSuite(s);
  const t = totals(s);
  const nights = s.checkIn && s.checkOut ? diffDays(s.checkIn, s.checkOut) : 0;

  return (
    <aside aria-labelledby="summary-title" className="border border-ink/15 bg-salt">
      {suite ? <Photo name={suite.photos[0]} sizes="(min-width: 1024px) 30vw, 100vw" className="aspect-[16/9]" alt="" /> : null}
      <div className="p-6">
        <h2 id="summary-title" className="t-label">
          Your stay
        </h2>
        <dl className="mt-5 space-y-3 text-[0.95rem]">
          <div className="flex justify-between gap-4">
            <dt className="muted">Dates</dt>
            <dd className="text-right">{s.checkIn && s.checkOut ? `${formatShort(s.checkIn)} → ${formatShort(s.checkOut)}` : "—"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="muted">Nights</dt>
            <dd>{nights || "—"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="muted">Guests</dt>
            <dd className="text-right">
              {plural(s.adults, "adult")}
              {s.children ? `, ${plural(s.children, "child", "children")}` : ""}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="muted">Suite</dt>
            <dd className="text-right">{suite?.name ?? "—"}</dd>
          </div>
        </dl>

        {t ? (
          <dl className="mt-6 space-y-2 border-t border-ink/15 pt-5 text-[0.92rem]">
            <div className="flex justify-between gap-4">
              <dt className="muted">Room, {plural(nights, "night")}</dt>
              <dd className="t-num">{formatINR(t.room)}</dd>
            </div>
            {t.extras.map((l) => (
              <div key={l.extra.id} className="flex justify-between gap-4">
                <dt className="muted">
                  {l.extra.name}
                  {l.extra.unit === "trip" && l.qty > 1 ? " ×2" : ""}
                  <span className="sr-only"> ({unitLabel[l.extra.unit]})</span>
                </dt>
                <dd className="t-num">{formatINR(l.cost)}</dd>
              </div>
            ))}
            <div className="flex justify-between gap-4">
              <dt className="muted">Taxes (18%)</dt>
              <dd className="t-num">{formatINR(t.taxes)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-ink/15 pt-4">
              <dt>Total</dt>
              <dd className="t-num text-[1.5rem] font-[300] [font-stretch:112%]">{formatINR(t.total)}</dd>
            </div>
          </dl>
        ) : null}

        <p className="muted mt-6 border-t border-ink/15 pt-5 text-[0.82rem] leading-relaxed">
          A concept booking engine. Nothing is reserved or charged, and nothing you enter leaves this page.
        </p>
      </div>
    </aside>
  );
}

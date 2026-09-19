"use client";

import { suites } from "@/lib/suites";
import { nearestOpening, quote } from "@/lib/rates";
import { addDays, diffDays, formatShort, type ISODate } from "@/lib/dates";
import { cn, formatINR, plural } from "@/lib/format";
import type { Selection } from "@/lib/booking-state";
import { Photo } from "@/components/photo";
import { ArrowRight } from "@/components/icons";

type Props = {
  s: Selection;
  today: ISODate;
  onChange: (patch: Partial<Selection>) => void;
  onPick: (slug: string) => void;
};

/**
 * Every suite for the chosen dates: bookable ones first, with the total and
 * the average per night. Unavailable suites say exactly why, and where
 * possible offer the nearest dates that work.
 */
export function StepSuite({ s, today, onChange, onPick }: Props) {
  const checkIn = s.checkIn!;
  const checkOut = s.checkOut!;
  const nights = diffDays(checkIn, checkOut);
  const rows = suites
    .map((suite) => ({ suite, q: quote(suite, checkIn, checkOut, s.adults, s.children) }))
    .sort((a, b) => Number(b.q.available) - Number(a.q.available) || a.q.total - b.q.total);
  const anyAvailable = rows.some((r) => r.q.available);

  return (
    <div>
      <p className="muted mb-8 text-[0.95rem]" aria-live="polite">
        {anyAvailable
          ? `${rows.filter((r) => r.q.available).length} of ${suites.length} suite types are free for all ${plural(nights, "night")}.`
          : "Nothing is free for every one of these nights. Try the suggested dates below, or choose new ones."}
      </p>

      <ul className="space-y-5">
        {rows.map(({ suite, q }) => {
          const opening = !q.available && q.fitsGuests && q.soldOut.length ? nearestOpening(suite, checkIn, checkOut, today) : null;
          const reason = !q.fitsGuests
            ? `Sleeps up to ${suite.maxGuests}, including ${suite.maxAdults} adults`
            : q.soldOut.length
              ? `Fully booked on ${q.soldOut.map(formatShort).join(", ")}`
              : nights < q.minStay
                ? `${q.minStay}-night minimum for these dates`
                : null;
          return (
            <li key={suite.slug} className={cn("grid border border-ink/15 sm:grid-cols-[14rem_1fr]", !q.available && "bg-salt-2/60")}>
              <Photo name={suite.photos[0]} sizes="(min-width: 640px) 14rem, 100vw" className={cn("aspect-[16/10] sm:aspect-auto", !q.available && "opacity-60 grayscale-[40%]")} alt="" />
              <div className="flex flex-col gap-5 p-5 md:flex-row md:items-end md:justify-between md:p-6">
                <div>
                  <h3 className="t-h3 !text-[1.4rem]">{suite.name}</h3>
                  <p className="muted mt-1 text-[0.9rem]">
                    {suite.size} m² · {suite.view} · Sleeps {suite.maxGuests}
                  </p>
                  {q.available && q.scarcity === 1 ? <p className="mt-3 text-[0.85rem] text-[#9a4b22]">Only one left for these dates</p> : null}
                  {reason ? <p className="mt-3 text-[0.9rem] text-[#9a4b22]">{reason}.</p> : null}
                  {opening ? (
                    <button
                      type="button"
                      className="link-u mt-2 text-[0.9rem]"
                      onClick={() => onChange({ checkIn: opening, checkOut: addDays(opening, nights) })}
                    >
                      Free from {formatShort(opening)} to {formatShort(addDays(opening, nights))}: use these dates
                    </button>
                  ) : null}
                </div>
                <div className="shrink-0 md:text-right">
                  {q.available ? (
                    <>
                      <p className="t-num text-[1.35rem] font-[300] [font-stretch:112%]">{formatINR(q.subtotal)}</p>
                      <p className="muted text-[0.85rem]">
                        {plural(nights, "night")} · avg {formatINR(q.subtotal / nights)} · before tax
                      </p>
                      <button type="button" className="btn btn-ink mt-4 w-full md:w-auto" onClick={() => onPick(suite.slug)}>
                        Select <span className="sr-only">the {suite.name}</span>
                        <ArrowRight size={14} />
                      </button>
                    </>
                  ) : (
                    <p className="t-label muted">Unavailable</p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

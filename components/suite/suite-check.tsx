"use client";

import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import type { Suite } from "@/lib/suites";
import { quote, fromRate } from "@/lib/rates";
import { formatShort } from "@/lib/dates";
import { cn, formatINR, plural } from "@/lib/format";
import { Calendar, type Range } from "@/components/booking/calendar";
import { Popover } from "@/components/booking/popover";
import { Stepper } from "@/components/booking/stepper";
import { useToday } from "@/components/booking/use-today";
import { bookingHref } from "@/components/booking/booking-bar";
import { ArrowRight } from "@/components/icons";

/**
 * SUITE CHECK — a live quote for this suite: pick dates and guests, see each
 * night's rate, taxes and the total, and whether every night is free.
 */
export function SuiteCheck({ suite }: { suite: Suite }) {
  const today = useToday();
  const [range, setRange] = useState<Range>({ checkIn: null, checkOut: null });
  const [adults, setAdults] = useState(Math.min(2, suite.maxAdults));
  const [children, setChildren] = useState(0);
  const [open, setOpen] = useState<"dates" | "guests" | null>(null);
  const datesBtn = useRef<HTMLButtonElement>(null);
  const guestsBtn = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(null), []);

  const q = useMemo(
    () => (range.checkIn && range.checkOut ? quote(suite, range.checkIn, range.checkOut, adults, children) : null),
    [suite, range, adults, children],
  );

  const problem = !q
    ? null
    : !q.fitsGuests
      ? `The ${suite.name} sleeps up to ${suite.maxGuests} (${suite.maxAdults} adults).`
      : q.soldOut.length
        ? `Fully booked on ${q.soldOut.map(formatShort).join(", ")}.`
        : q.nights.length < q.minStay
          ? `These dates need a stay of at least ${q.minStay} nights.`
          : null;

  return (
    <aside aria-labelledby="check-title" className="theme-terrace p-6 md:p-8">
      <p id="check-title" className="t-label text-sand">
        Check this suite
      </p>
      <p className="mt-3 text-[0.95rem] text-mist">
        From <span className="t-num text-salt">{formatINR(fromRate(suite))}</span> a night, before tax
      </p>

      <div className="mt-6 grid gap-px bg-salt/15">
        <div className="relative bg-terrace">
          <button
            ref={datesBtn}
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open === "dates"}
            onClick={() => setOpen(open === "dates" ? null : "dates")}
            className="flex w-full flex-col gap-1 py-4 text-left"
          >
            <span className="t-label text-mist">Dates</span>
            <span>
              {range.checkIn ? `${formatShort(range.checkIn)} → ${range.checkOut ? formatShort(range.checkOut) : "…"}` : "Add dates"}
            </span>
          </button>
          {today ? (
            <Popover open={open === "dates"} onClose={close} anchor={datesBtn} title={`Dates for the ${suite.name}`} align="end" className="md:w-[46rem]">
              <Calendar today={today} value={range} onChange={setRange} onComplete={() => setTimeout(close, 200)} />
            </Popover>
          ) : null}
        </div>
        <div className="relative bg-terrace">
          <button
            ref={guestsBtn}
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open === "guests"}
            onClick={() => setOpen(open === "guests" ? null : "guests")}
            className="flex w-full flex-col gap-1 py-4 text-left"
          >
            <span className="t-label text-mist">Guests</span>
            <span>
              {plural(adults, "adult")}
              {children ? `, ${plural(children, "child", "children")}` : ""}
            </span>
          </button>
          <Popover open={open === "guests"} onClose={close} anchor={guestsBtn} title="Guests" align="end" className="md:w-[22rem]">
            <div className="divide-y divide-ink/10">
              <Stepper
                label="Adults"
                value={adults}
                min={1}
                max={suite.maxAdults}
                onChange={(a) => {
                  setAdults(a);
                  setChildren((c) => Math.min(c, Math.max(0, suite.maxGuests - a)));
                }}
              />
              <Stepper label="Children" hint="Aged 2 to 12" value={children} min={0} max={Math.max(0, suite.maxGuests - adults)} onChange={setChildren} />
            </div>
            <button type="button" className="btn btn-ink mt-6 w-full" onClick={close}>
              Done
            </button>
          </Popover>
        </div>
      </div>

      <div aria-live="polite" className="mt-6">
        {q && !problem ? (
          <div className="page-in">
            <ul className="max-h-48 space-y-1.5 overflow-y-auto pr-1 text-[0.9rem]">
              {q.nights.map((n) => (
                <li key={n.date} className="flex justify-between gap-4">
                  <span className="text-mist">{formatShort(n.date)}</span>
                  <span className="t-num">{formatINR(n.rate)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-1.5 border-t border-salt/15 pt-4 text-[0.9rem]">
              <div className="flex justify-between">
                <dt className="text-mist">{plural(q.nights.length, "night")}</dt>
                <dd className="t-num">{formatINR(q.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-mist">Taxes (18%)</dt>
                <dd className="t-num">{formatINR(q.taxes)}</dd>
              </div>
              <div className="flex justify-between border-t border-salt/15 pt-3 text-[1.1rem]">
                <dt>Total</dt>
                <dd className="t-num">{formatINR(q.total)}</dd>
              </div>
            </dl>
            {q.scarcity === 1 ? <p className="mt-3 text-[0.85rem] text-ember">Only one {suite.name} left on at least one night.</p> : null}
          </div>
        ) : (
          <p className={cn("text-[0.9rem]", problem ? "text-[#f0a27a]" : "text-mist")}>
            {problem ?? "Choose dates to see each night's rate and the total."}
          </p>
        )}
      </div>

      <Link
        href={bookingHref(range, adults, children, suite.slug)}
        className={cn("btn btn-sand mt-6 w-full justify-between", problem && "pointer-events-none opacity-50")}
        aria-disabled={problem ? true : undefined}
      >
        {q && !problem ? "Continue to book" : "Check availability"}
        <ArrowRight size={14} />
      </Link>
    </aside>
  );
}

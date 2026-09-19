"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { diffDays, formatShort } from "@/lib/dates";
import { cn, plural } from "@/lib/format";
import { ArrowRight } from "@/components/icons";
import { Calendar, type Range } from "./calendar";
import { Popover } from "./popover";
import { Stepper } from "./stepper";
import { useToday } from "./use-today";

type Props = {
  tone?: "glass" | "light";
  placement?: "above" | "below";
  className?: string;
  /** Pre-select a suite on the booking page. */
  suite?: string;
};

export function bookingHref(range: Range, adults: number, children: number, suite?: string): string {
  const q = new URLSearchParams();
  if (range.checkIn && range.checkOut) {
    q.set("in", range.checkIn);
    q.set("out", range.checkOut);
  }
  q.set("adults", String(adults));
  if (children) q.set("children", String(children));
  if (suite) q.set("suite", suite);
  return `/book?${q.toString()}`;
}

/**
 * BOOKING BAR — dates and guests inline, no modal and no page jump until the
 * guest asks to see availability. The same calendar drives the booking page.
 */
export function BookingBar({ tone = "glass", placement = "above", className, suite }: Props) {
  const router = useRouter();
  const today = useToday();
  const [range, setRange] = useState<Range>({ checkIn: null, checkOut: null });
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [open, setOpen] = useState<"dates" | "guests" | null>(null);
  const datesBtn = useRef<HTMLButtonElement>(null);
  const guestsBtn = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(null), []);

  const nights = range.checkIn && range.checkOut ? diffDays(range.checkIn, range.checkOut) : 0;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    router.push(bookingHref(range, adults, children, suite));
  };

  const cell = "group relative flex min-h-[4.5rem] flex-1 flex-col justify-center gap-1 px-5 text-left transition-colors md:px-7";
  const glass = tone === "glass";

  return (
    <form
      onSubmit={submit}
      aria-label="Check availability"
      className={cn(
        "relative grid grid-cols-2 md:flex md:items-stretch",
        glass ? "border border-salt/20 bg-tide/55 text-salt backdrop-blur-md" : "border border-ink/15 bg-salt text-ink",
        className,
      )}
    >
      <div className="relative col-span-2 flex md:col-span-1 md:flex-[2]">
        <button
          ref={datesBtn}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open === "dates"}
          onClick={() => setOpen(open === "dates" ? null : "dates")}
          className={cn(cell, "border-b md:border-b-0 md:border-r", glass ? "border-salt/15 hover:bg-salt/5" : "border-ink/10 hover:bg-ink/[0.03]")}
        >
          <span className="t-label opacity-70">Arrive — Depart</span>
          <span className="text-[1.05rem]">
            {range.checkIn ? (
              <>
                {formatShort(range.checkIn)}
                <span className="mx-2 opacity-50" aria-hidden="true">→</span>
                {range.checkOut ? formatShort(range.checkOut) : <span className="opacity-60">Departure</span>}
              </>
            ) : (
              "Add dates"
            )}
          </span>
          {nights ? <span className="sr-only">, {plural(nights, "night")}</span> : null}
        </button>
        {today ? (
          <Popover open={open === "dates"} onClose={close} anchor={datesBtn} title="Choose your dates" placement={placement} className="md:w-[46rem]">
            <Calendar
              today={today}
              value={range}
              onChange={setRange}
              onComplete={() => setTimeout(() => setOpen("guests"), 250)}
            />
            <div className="mt-6 flex items-center justify-between gap-4 border-t border-ink/10 pt-5">
              <p className="text-[0.9rem]" aria-live="polite">
                {nights ? `${plural(nights, "night")} · ${formatShort(range.checkIn!)} → ${formatShort(range.checkOut!)}` : range.checkIn ? "Now choose a departure date" : "Choose an arrival date"}
              </p>
              <button type="button" className="btn btn-ink min-h-11" onClick={close}>
                Done
              </button>
            </div>
          </Popover>
        ) : null}
      </div>

      <div className="relative flex md:flex-1">
        <button
          ref={guestsBtn}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open === "guests"}
          onClick={() => setOpen(open === "guests" ? null : "guests")}
          className={cn(cell, "md:border-r", glass ? "border-salt/15 hover:bg-salt/5" : "border-ink/10 hover:bg-ink/[0.03]")}
        >
          <span className="t-label opacity-70">Guests</span>
          <span className="text-[1.05rem]">
            {plural(adults, "adult")}
            {children ? `, ${plural(children, "child", "children")}` : ""}
          </span>
        </button>
        <Popover open={open === "guests"} onClose={close} anchor={guestsBtn} title="Who's coming?" placement={placement} className="md:w-[24rem]">
          <div className="divide-y divide-ink/10">
            <Stepper label="Adults" value={adults} min={1} max={6} onChange={setAdults} />
            <Stepper label="Children" hint="Aged 2 to 12" value={children} min={0} max={4} onChange={setChildren} />
          </div>
          <p className="muted mt-4 text-[0.85rem]">Larger party? The Headland Residence sleeps six.</p>
          <button type="button" className="btn btn-ink mt-6 w-full" onClick={close}>
            Done
          </button>
        </Popover>
      </div>

      <button
        type="submit"
        className={cn("btn min-h-[4.5rem] justify-between border-0 px-6 md:min-w-[15rem] md:px-8", glass ? "btn-sand" : "btn-ink")}
      >
        <span className="md:hidden">Search</span>
        <span className="hidden md:inline">Check availability</span>
        <ArrowRight size={14} />
      </button>
    </form>
  );
}

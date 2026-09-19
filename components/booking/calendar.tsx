"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import {
  addDays,
  addMonths,
  dayOfWeek,
  daysInMonth,
  diffDays,
  formatLong,
  formatMonth,
  monthStart,
  type ISODate,
} from "@/lib/dates";
import { lowestRate, seasonFor } from "@/lib/rates";
import { cn, formatINR, formatINRCompact } from "@/lib/format";
import { ArrowLeft, ArrowRight } from "@/components/icons";

export type Range = { checkIn: ISODate | null; checkOut: ISODate | null };

type Props = {
  today: ISODate;
  value: Range;
  onChange: (next: Range) => void;
  /** Months shown side by side. */
  months?: 1 | 2;
  /** Furthest bookable night, in months from today. */
  horizon?: number;
  className?: string;
  /** Called once a complete range has been picked. */
  onComplete?: (range: { checkIn: ISODate; checkOut: ISODate }) => void;
};

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];
const WEEKDAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/**
 * DATE RANGE CALENDAR
 * Each night shows the lowest available rate that night, so guests can see
 * where the value is before choosing. Nights with nothing free can't start a
 * stay. Fully keyboard-operable: arrows move by day/week, PageUp/PageDown by
 * month, Home/End to week edges, Enter/Space to pick.
 */
export function Calendar({ today, value, onChange, months = 2, horizon = 18, className, onComplete }: Props) {
  const first = monthStart(today);
  const last = addMonths(first, horizon);
  const [view, setView] = useState<ISODate>(() => monthStart(value.checkIn ?? today));
  const [focus, setFocus] = useState<ISODate>(() => value.checkIn ?? today);
  const [hover, setHover] = useState<ISODate | null>(null);
  const grid = useRef<HTMLDivElement>(null);
  const wantsFocus = useRef(false);

  const selecting = value.checkIn && !value.checkOut;
  const end = value.checkOut ?? (selecting && hover && diffDays(value.checkIn!, hover) > 0 ? hover : null);

  const rates = useMemo(() => {
    const map = new Map<ISODate, number | null>();
    for (let m = 0; m < months; m++) {
      const start = addMonths(view, m);
      for (let d = 0; d < daysInMonth(start); d++) {
        const iso = addDays(start, d);
        map.set(iso, lowestRate(iso));
      }
    }
    return map;
  }, [view, months]);

  useEffect(() => {
    if (!wantsFocus.current) return;
    wantsFocus.current = false;
    grid.current?.querySelector<HTMLButtonElement>(`[data-date="${focus}"]`)?.focus();
  }, [focus, view]);

  const canPrev = diffDays(first, view) > 0;
  const canNext = diffDays(addMonths(view, months), last) >= 0;

  const isPast = (iso: ISODate) => diffDays(today, iso) < 0;
  const beyond = (iso: ISODate) => diffDays(last, iso) >= 0;
  const soldOut = (iso: ISODate) => rates.has(iso) ? rates.get(iso) === null : lowestRate(iso) === null;

  /** Can this date be clicked in the current state? */
  const selectable = (iso: ISODate) => {
    if (isPast(iso) || beyond(iso)) return false;
    if (selecting && diffDays(value.checkIn!, iso) > 0) return true; // any later date can be a departure
    return !soldOut(iso);
  };

  const pick = (iso: ISODate) => {
    if (!selectable(iso)) return;
    if (!value.checkIn || value.checkOut || diffDays(value.checkIn, iso) <= 0) {
      onChange({ checkIn: iso, checkOut: null });
      return;
    }
    onChange({ checkIn: value.checkIn, checkOut: iso });
    onComplete?.({ checkIn: value.checkIn, checkOut: iso });
  };

  const move = (to: ISODate) => {
    if (isPast(to) || beyond(to)) return;
    wantsFocus.current = true;
    setFocus(to);
    const shown = diffDays(view, to) >= 0 && diffDays(addMonths(view, months), to) < 0;
    if (!shown) setView(monthStart(to));
    if (selecting) setHover(to);
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, iso: ISODate) => {
    const dow = (dayOfWeek(iso) + 6) % 7; // Monday = 0
    const map: Record<string, () => ISODate> = {
      ArrowLeft: () => addDays(iso, -1),
      ArrowRight: () => addDays(iso, 1),
      ArrowUp: () => addDays(iso, -7),
      ArrowDown: () => addDays(iso, 7),
      Home: () => addDays(iso, -dow),
      End: () => addDays(iso, 6 - dow),
      PageUp: () => addMonths(iso, -1).slice(0, 8) + iso.slice(8),
      PageDown: () => addMonths(iso, 1).slice(0, 8) + iso.slice(8),
    };
    const next = map[e.key];
    if (!next) return;
    e.preventDefault();
    let to = next();
    // PageUp/Down onto a day that doesn't exist (31 Feb) clamps to month end.
    if (e.key.startsWith("Page") && to.slice(5, 7) !== addMonths(iso, e.key === "PageUp" ? -1 : 1).slice(5, 7)) {
      const m = addMonths(iso, e.key === "PageUp" ? -1 : 1);
      to = addDays(m, daysInMonth(m) - 1);
    }
    move(to);
  };

  const label = (iso: ISODate) => {
    const rate = rates.get(iso) ?? null;
    const parts = [formatLong(iso)];
    if (iso === value.checkIn) parts.push("check-in");
    if (iso === value.checkOut) parts.push("check-out");
    if (isPast(iso)) parts.push("unavailable, in the past");
    else if (rate === null) parts.push(selecting && diffDays(value.checkIn!, iso) > 0 ? "fully booked night, available as check-out" : "fully booked");
    else parts.push(`from ${formatINR(rate)} a night`);
    return parts.join(", ");
  };

  return (
    <div className={cn("select-none", className)}>
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setView(addMonths(view, -1))}
          disabled={!canPrev}
          aria-label="Previous month"
          className="grid size-10 place-items-center border border-current/25 transition-colors hover:border-current disabled:opacity-25"
        >
          <ArrowLeft size={14} />
        </button>
        <p className="t-label" aria-live="polite">
          {formatMonth(view)}
          {months === 2 ? <span className="hidden md:inline"> â€” {formatMonth(addMonths(view, 1))}</span> : null}
        </p>
        <button
          type="button"
          onClick={() => setView(addMonths(view, 1))}
          disabled={!canNext}
          aria-label="Next month"
          className="grid size-10 place-items-center border border-current/25 transition-colors hover:border-current disabled:opacity-25"
        >
          <ArrowRight size={14} />
        </button>
      </div>

      <div ref={grid} className={cn("grid gap-8", months === 2 && "md:grid-cols-2")} onMouseLeave={() => setHover(null)}>
        {Array.from({ length: months }, (_, m) => {
          const start = addMonths(view, m);
          const lead = (dayOfWeek(start) + 6) % 7;
          const count = daysInMonth(start);
          return (
            <div key={start} className={cn(m === 1 && "hidden md:block")}>
              <p className="t-label mb-3 opacity-80 md:block" id={`cal-${start}`}>
                {formatMonth(start)}
              </p>
              <div role="grid" aria-labelledby={`cal-${start}`} className="grid grid-cols-7 gap-y-1">
                <div role="row" className="contents">
                  {WEEKDAYS.map((d, i) => (
                    <span key={i} role="columnheader" aria-label={WEEKDAY_NAMES[i]} className="pb-2 text-center text-[0.7rem] opacity-75">
                      {d}
                    </span>
                  ))}
                </div>
                {Array.from({ length: Math.ceil((lead + count) / 7) }, (_, row) => (
                  <div role="row" key={row} className="contents">
                    {Array.from({ length: 7 }, (_, col) => {
                      const d = row * 7 + col - lead;
                      if (d < 0 || d >= count) return <span key={col} role="gridcell" aria-hidden="true" />;
                      const iso = addDays(start, d);
                      const rate = rates.get(iso) ?? null;
                      const past = isPast(iso) || beyond(iso);
                      const isStart = iso === value.checkIn;
                      const isEnd = iso === end;
                      const inRange = value.checkIn && end && diffDays(value.checkIn, iso) > 0 && diffDays(iso, end) > 0;
                      const peak = seasonFor(iso).id === "festive";
                      return (
                        <span key={col} role="gridcell" aria-selected={isStart || isEnd || Boolean(inRange)} className="relative">
                          {inRange || (isStart && end) || isEnd ? (
                            <span
                              aria-hidden="true"
                              className={cn(
                                "absolute inset-y-0 bg-current/10",
                                isStart ? "left-1/2 right-0" : isEnd ? "left-0 right-1/2" : "inset-x-0",
                              )}
                            />
                          ) : null}
                          <button
                            type="button"
                            data-date={iso}
                            tabIndex={iso === focus ? 0 : -1}
                            aria-label={label(iso)}
                            aria-disabled={!selectable(iso) || undefined}
                            onClick={() => pick(iso)}
                            onKeyDown={(e) => onKey(e, iso)}
                            onFocus={() => setFocus(iso)}
                            onMouseEnter={() => selecting && setHover(iso)}
                            className={cn(
                              "relative mx-auto grid h-14 w-full max-w-[3.4rem] place-items-center content-center gap-0.5 transition-colors",
                              past && "opacity-25",
                              !past && rate === null && "opacity-45",
                              selectable(iso) ? "cursor-pointer hover:outline hover:outline-1 hover:-outline-offset-1 hover:outline-current/40" : "cursor-default",
                              (isStart || isEnd) && "bg-sand text-tide",
                            )}
                          >
                            <span className={cn("t-num text-[0.95rem] leading-none", rate === null && !past && "line-through decoration-1")}>
                              {Number(iso.slice(8))}
                            </span>
                            {!past ? (
                              <span className={cn("t-num text-[0.62rem] leading-none", isStart || isEnd ? "opacity-85" : "opacity-75")}>
                                {rate === null ? "full" : formatINRCompact(rate)}
                              </span>
                            ) : null}
                            {peak && !past ? <span aria-hidden="true" className="absolute right-1 top-1 size-1 rounded-full bg-ember" /> : null}
                          </button>
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 text-[0.8rem] opacity-75">
        <span>Lowest nightly rate, before tax.</span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-ember" /> Festive season, 3-night minimum
        </span>
      </p>
    </div>
  );
}

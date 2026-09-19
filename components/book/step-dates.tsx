"use client";

import { diffDays, formatLong, nightsOf, type ISODate } from "@/lib/dates";
import { seasonFor } from "@/lib/rates";
import { plural } from "@/lib/format";
import type { Selection } from "@/lib/booking-state";
import { Calendar } from "@/components/booking/calendar";
import { Stepper } from "@/components/booking/stepper";
import { ArrowRight } from "@/components/icons";

type Props = {
  s: Selection;
  today: ISODate;
  onChange: (patch: Partial<Selection>) => void;
  onNext: () => void;
};

export function StepDates({ s, today, onChange, onNext }: Props) {
  const nights = s.checkIn && s.checkOut ? diffDays(s.checkIn, s.checkOut) : 0;
  const minStay = s.checkIn && s.checkOut ? Math.max(1, ...nightsOf(s.checkIn, s.checkOut).map((n) => seasonFor(n).minStay)) : 1;
  const tooShort = nights > 0 && nights < minStay;
  const tooLong = nights > 30;

  return (
    <div>
      <div className="border border-ink/15 p-5 md:p-8">
        <Calendar
          today={today}
          value={{ checkIn: s.checkIn, checkOut: s.checkOut }}
          onChange={(r) => onChange({ checkIn: r.checkIn, checkOut: r.checkOut, suite: null })}
        />
      </div>

      <p className="mt-5 min-h-6 text-[0.95rem]" aria-live="polite">
        {tooShort ? (
          <span className="field-error">Stays over the festive season are {minStay} nights or more.</span>
        ) : tooLong ? (
          <span className="field-error">For stays longer than 30 nights, please write to us.</span>
        ) : nights ? (
          <>
            <strong className="font-[560]">{plural(nights, "night")}</strong>
            <span className="muted">
              {" "}
              · {formatLong(s.checkIn!)} to {formatLong(s.checkOut!)}
            </span>
          </>
        ) : s.checkIn ? (
          <span className="muted">Now choose your departure date.</span>
        ) : (
          <span className="muted">Choose your arrival date.</span>
        )}
      </p>

      <div className="mt-8 grid gap-x-10 border-t border-ink/15 pt-4 sm:grid-cols-2">
        <Stepper label="Adults" value={s.adults} min={1} max={6} onChange={(adults) => onChange({ adults })} />
        <Stepper label="Children" hint="Aged 2 to 12" value={s.children} min={0} max={4} onChange={(children) => onChange({ children })} />
      </div>

      <div className="mt-10 flex justify-end">
        <button type="button" className="btn btn-ink" disabled={!nights || tooShort || tooLong} onClick={onNext}>
          See available suites <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

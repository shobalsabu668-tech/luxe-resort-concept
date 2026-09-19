"use client";

import { extras, extraCost, unitLabel } from "@/lib/extras";
import { POOL_SUITES, type Selection } from "@/lib/booking-state";
import { cn, formatINR } from "@/lib/format";
import { ArrowRight, Check } from "@/components/icons";

type Props = {
  s: Selection;
  onChange: (patch: Partial<Selection>) => void;
  onNext: () => void;
};

/** Optional enhancements. Everything is priced before it's added. */
export function StepExtras({ s, onChange, onNext }: Props) {
  const guests = s.adults + s.children;
  const offered = extras.filter((e) => e.id !== "floating-breakfast" || (s.suite && POOL_SUITES.includes(s.suite)));

  const set = (id: string, qty: number) => {
    const next = { ...s.extras };
    if (qty <= 0) delete next[id];
    else next[id] = qty;
    onChange({ extras: next });
  };

  return (
    <div>
      <ul className="grid gap-4">
        {offered.map((e) => {
          const qty = s.extras[e.id] ?? 0;
          const on = qty > 0;
          return (
            <li key={e.id} className={cn("border p-5 transition-colors md:p-6", on ? "border-ink bg-salt-2/60" : "border-ink/15")}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-[1.1rem] font-[480]">{e.name}</h3>
                  <p className="muted mt-1 max-w-md text-[0.92rem]">{e.detail}</p>
                  <p className="mt-2 text-[0.9rem]">
                    <span className="t-num">{formatINR(e.price)}</span> <span className="muted">{unitLabel[e.unit]}</span>
                    {e.unit === "guest" ? <span className="muted"> · {formatINR(extraCost(e, guests))} for {guests}</span> : null}
                  </p>
                </div>
                {e.unit === "trip" ? (
                  <fieldset className="shrink-0">
                    <legend className="sr-only">{e.name}</legend>
                    <div className="flex gap-2">
                      {[
                        { n: 0, label: "None" },
                        { n: 1, label: "One way" },
                        { n: 2, label: "Return" },
                      ].map((o) => (
                        <label
                          key={o.n}
                          className={cn(
                            "cursor-pointer border px-3 py-2 text-[0.85rem] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2",
                            qty === o.n ? "border-ink bg-ink text-salt" : "border-ink/25 hover:border-ink",
                          )}
                        >
                          <input type="radio" name={e.id} className="sr-only" checked={qty === o.n} onChange={() => set(e.id, o.n)} />
                          {o.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                ) : (
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => set(e.id, on ? 0 : 1)}
                    className={cn("btn min-h-11 shrink-0 px-5", on ? "btn-ink" : "btn-line")}
                  >
                    {on ? (
                      <>
                        <Check size={12} /> Added
                      </>
                    ) : (
                      "Add"
                    )}
                    <span className="sr-only"> {e.name}</span>
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <p className="muted text-[0.9rem]">Nothing here is required. You can add any of it later, too.</p>
        <button type="button" className="btn btn-ink" onClick={onNext}>
          {Object.keys(s.extras).length ? "Continue" : "Skip"} <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

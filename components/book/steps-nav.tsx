import { STEPS, type Step } from "@/lib/booking-state";
import { cn } from "@/lib/format";
import { Check } from "@/components/icons";

const labels: Record<(typeof STEPS)[number], string> = {
  dates: "Dates",
  suite: "Suite",
  extras: "Enhance",
  details: "Details",
  review: "Review",
};

/** Progress through the booking. Completed steps can be revisited. */
export function StepsNav({ step, furthest, onGo }: { step: Step; furthest: number; onGo: (s: Step) => void }) {
  const current = step === "done" ? STEPS.length : STEPS.indexOf(step);
  return (
    <nav aria-label="Booking steps">
      <ol className="flex gap-2 overflow-x-auto no-scrollbar md:gap-8">
        {STEPS.map((s, i) => {
          const done = i < current;
          const here = i === current;
          const can = i <= furthest && step !== "done" && !here;
          return (
            <li key={s} className="shrink-0">
              <button
                type="button"
                onClick={() => can && onGo(s)}
                disabled={!can}
                aria-current={here ? "step" : undefined}
                className={cn(
                  "flex items-center gap-2.5 py-2 text-[0.85rem] transition-colors disabled:cursor-default",
                  here ? "text-salt" : done ? "text-sand hover:text-salt" : "text-mist",
                )}
              >
                <span
                  className={cn(
                    "t-num grid size-7 place-items-center rounded-full border text-[0.75rem]",
                    here ? "border-sand bg-sand text-tide" : done ? "border-sand" : "border-salt/25",
                  )}
                >
                  {done ? <Check size={11} /> : i + 1}
                </span>
                <span className={cn(!here && "sr-only sm:not-sr-only")}>
                  {labels[s]}
                  {done ? <span className="sr-only"> (done)</span> : null}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

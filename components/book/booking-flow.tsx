"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  POOL_SUITES,
  STEPS,
  currentQuote,
  parseSelection,
  serializeSelection,
  type Selection,
  type Step,
} from "@/lib/booking-state";
import { useToday } from "@/components/booking/use-today";
import { StepsNav } from "./steps-nav";
import { Summary } from "./summary";
import { StepDates } from "./step-dates";
import { StepSuite } from "./step-suite";
import { StepExtras } from "./step-extras";
import { StepDetails, emptyDetails, validateDetails, type Details } from "./step-details";
import { StepReview } from "./step-review";
import { Confirmation } from "./confirmation";

const titles: Record<Step, { title: string; lead: string }> = {
  dates: { title: "When would you like to come?", lead: "Each night shows its lowest rate. Nights marked full have nothing free." },
  suite: { title: "Choose your suite.", lead: "Prices are for your whole stay, before tax." },
  extras: { title: "Anything to add?", lead: "Optional, and all priced up front." },
  details: { title: "Who's staying?", lead: "So we would know who to expect, if this were real." },
  review: { title: "Review your stay.", lead: "Check everything once more before you confirm." },
  done: { title: "", lead: "" },
};

/**
 * BOOKING FLOW — five steps, one URL. Dates, guests, suite and enhancements
 * are in the query string, so a half-finished booking can be shared or
 * reloaded, and the browser's Back button steps back through the flow.
 * Personal details live only in component state.
 */
export function BookingFlow() {
  const params = useSearchParams();
  const pathname = usePathname();
  const today = useToday();
  const [details, setDetails] = useState<Details>(emptyDetails);
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  const selection = useMemo<Selection | null>(() => (today ? parseSelection(new URLSearchParams(params.toString()), today) : null), [params, today]);

  // Review and confirmation need details, which the URL deliberately doesn't carry.
  const requested = params.get("step") as Step | null;
  const detailsOk = Object.keys(validateDetails(details)).length === 0;
  const step: Step =
    selection && (requested === "review" || requested === "done") && detailsOk && selection.step === "details" ? requested : (selection?.step ?? "dates");

  // Native history calls are synced into useSearchParams by Next.js without a
  // server round trip or a remount, so component state (the guest's details)
  // survives every step.
  const navigate = useCallback(
    (next: Selection, mode: "push" | "replace" = "replace") => {
      const url = `${pathname}?${serializeSelection(next)}`;
      if (mode === "push") window.history.pushState(null, "", url);
      else window.history.replaceState(null, "", url);
    },
    [pathname],
  );

  const patch = useCallback(
    (p: Partial<Selection>) => {
      if (!selection) return;
      navigate({ ...selection, ...p, step: p.step ?? step });
    },
    [selection, navigate, step],
  );

  const go = useCallback(
    (to: Step) => {
      if (!selection) return;
      navigate({ ...selection, step: to }, "push");
    },
    [selection, navigate],
  );

  // Move focus to the step's heading (and the page to the top of the flow)
  // whenever the step changes, so keyboard and screen-reader users follow.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }, [step]);

  if (!selection || !today) {
    return (
      <div className="shell grid gap-10 py-16 lg:grid-cols-12" aria-busy="true">
        <div className="h-[32rem] animate-pulse bg-ink/5 lg:col-span-7" />
        <div className="h-[24rem] animate-pulse bg-ink/5 lg:col-span-4 lg:col-start-9" />
      </div>
    );
  }

  const q = currentQuote(selection);
  const furthest = !selection.checkIn ? 0 : !q?.available ? 1 : detailsOk ? 4 : 3;
  const done = step === "done";

  return (
    <>
      <div className="theme-dark border-b border-salt/10">
        <div className="shell flex min-h-16 items-center">
          {!done ? <StepsNav step={step} furthest={furthest} onGo={go} /> : <p className="t-label text-sand">Request received</p>}
        </div>
      </div>

      <div className="shell grid gap-12 py-12 md:py-16 lg:grid-cols-12 lg:gap-6">
        <div className="min-w-0 lg:col-span-7">
          {!done ? (
            <header className="mb-10 scroll-mt-28">
              <p className="t-label muted">
                Step {STEPS.indexOf(step as (typeof STEPS)[number]) + 1} of {STEPS.length}
              </p>
              <h1 ref={heading} tabIndex={-1} className="t-h2 mt-4 !text-[clamp(2rem,3.6vw,3.4rem)] outline-none">
                {titles[step].title}
              </h1>
              <p className="muted mt-4">{titles[step].lead}</p>
            </header>
          ) : (
            <h1 ref={heading} tabIndex={-1} className="sr-only scroll-mt-28 outline-none">
              Request received
            </h1>
          )}

          <div key={step} className="page-in">
            {step === "dates" ? <StepDates s={selection} today={today} onChange={patch} onNext={() => go("suite")} /> : null}
            {step === "suite" ? (
              <StepSuite
                s={selection}
                today={today}
                onChange={patch}
                onPick={(slug) => {
                  const extras = { ...selection.extras };
                  if (!POOL_SUITES.includes(slug)) delete extras["floating-breakfast"];
                  navigate({ ...selection, suite: slug, extras, step: "extras" }, "push");
                }}
              />
            ) : null}
            {step === "extras" ? <StepExtras s={selection} onChange={patch} onNext={() => go("details")} /> : null}
            {step === "details" ? <StepDetails value={details} onChange={setDetails} onNext={() => go("review")} /> : null}
            {step === "review" ? <StepReview s={selection} details={details} onEdit={go} onConfirm={() => go("done")} /> : null}
            {done ? <Confirmation s={selection} details={details} /> : null}
          </div>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <div className="lg:sticky lg:top-28">
            <Summary s={selection} />
          </div>
        </div>
      </div>
    </>
  );
}

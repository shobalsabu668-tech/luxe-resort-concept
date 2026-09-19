"use client";

import { useState } from "react";
import { currentSuite, totals, type Selection, type Step } from "@/lib/booking-state";
import { diffDays, formatLong } from "@/lib/dates";
import { formatINR, plural } from "@/lib/format";
import type { Details } from "./step-details";
import { site } from "@/lib/site";

type Props = {
  s: Selection;
  details: Details;
  onEdit: (step: Step) => void;
  onConfirm: () => void;
};

export function StepReview({ s, details, onEdit, onConfirm }: Props) {
  const suite = currentSuite(s)!;
  const t = totals(s)!;
  const nights = diffDays(s.checkIn!, s.checkOut!);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState(false);

  const block = (title: string, step: Step, rows: [string, string][]) => (
    <section className="border-b border-ink/15 py-6" aria-label={title}>
      <div className="flex items-baseline justify-between">
        <h3 className="t-label">{title}</h3>
        <button type="button" className="link-u text-[0.9rem]" onClick={() => onEdit(step)}>
          Edit <span className="sr-only">{title.toLowerCase()}</span>
        </button>
      </div>
      <dl className="mt-4 grid gap-x-8 gap-y-2 text-[0.95rem] sm:grid-cols-[10rem_1fr]">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="muted">{k}</dt>
            <dd className="mb-2 sm:mb-0">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );

  return (
    <div>
      <div className="border-t border-ink/15">
        {block("Stay", "dates", [
          ["Arrive", `${formatLong(s.checkIn!)}, from ${site.checkIn}`],
          ["Depart", `${formatLong(s.checkOut!)}, by ${site.checkOut}`],
          ["Guests", `${plural(s.adults, "adult")}${s.children ? `, ${plural(s.children, "child", "children")}` : ""}`],
        ])}
        {block("Suite", "suite", [
          ["Suite", suite.name],
          ["Room rate", `${formatINR(t.room)} for ${plural(nights, "night")}`],
        ])}
        {block(
          "Enhancements",
          "extras",
          t.extras.length ? t.extras.map((l) => [l.extra.name, formatINR(l.cost)] as [string, string]) : [["Added", "None"]],
        )}
        {block("Guest", "details", [
          ["Name", `${details.firstName} ${details.lastName}`],
          ["Email", details.email],
          ...(details.phone ? ([["Phone", details.phone]] as [string, string][]) : []),
          ["Arriving", details.arrival],
          ...(details.occasion ? ([["Occasion", details.occasion]] as [string, string][]) : []),
          ...(details.requests ? ([["Requests", details.requests]] as [string, string][]) : []),
        ])}
      </div>

      <section className="mt-8 bg-salt-2/70 p-6 text-[0.92rem]" aria-label="Policies">
        <h3 className="t-label">Before you confirm</h3>
        <ul className="muted mt-4 list-disc space-y-1.5 pl-5">
          <li>Free cancellation until 14 days before arrival; after that, the first night is charged.</li>
          <li>Rates include breakfast, the cliff walk and daily yoga. Taxes are shown separately at 18%.</li>
          <li>Children under 2 stay free and don&rsquo;t count towards the number of guests.</li>
        </ul>
      </section>

      <div className="mt-8 flex items-baseline justify-between border-t border-ink pt-6">
        <p className="t-label">Total, including taxes</p>
        <p className="t-num text-[2rem] font-[270] [font-stretch:115%]">{formatINR(t.total)}</p>
      </div>

      <div className="mt-8">
        <label className="flex cursor-pointer items-start gap-3 text-[0.95rem]">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => {
              setAgreed(e.target.checked);
              setError(false);
            }}
            aria-describedby={error ? "agree-err" : undefined}
            aria-invalid={error || undefined}
            className="mt-1 size-4 shrink-0 accent-ink"
          />
          <span>I understand LUXE is a concept website: confirming won&rsquo;t reserve anything, and no payment is taken.</span>
        </label>
        {error ? (
          <p id="agree-err" className="field-error mt-2" role="alert">
            Please tick the box to continue.
          </p>
        ) : null}
        <button
          type="button"
          className="btn btn-ink mt-8 w-full sm:w-auto"
          onClick={() => (agreed ? onConfirm() : setError(true))}
        >
          Confirm request
        </button>
      </div>
    </div>
  );
}

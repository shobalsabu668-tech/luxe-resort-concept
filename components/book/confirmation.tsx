"use client";

import Link from "next/link";
import { useMemo } from "react";
import { currentSuite, totals, type Selection } from "@/lib/booking-state";
import { formatLong } from "@/lib/dates";
import { formatINR } from "@/lib/format";
import { author, site } from "@/lib/site";
import type { Details } from "./step-details";
import { Check } from "@/components/icons";

/** A readable reference, derived from the booking so it's stable on re-render. */
function reference(s: Selection, d: Details): string {
  const input = `${s.checkIn}${s.checkOut}${s.suite}${d.email}`;
  let h = 5381;
  for (let i = 0; i < input.length; i++) h = ((h << 5) + h + input.charCodeAt(i)) >>> 0;
  return `LX-${h.toString(36).toUpperCase().slice(0, 6).padStart(6, "0")}`;
}

/** Builds an .ics file in the browser, so the stay can go straight into a calendar. */
function icsHref(s: Selection, suiteName: string, ref: string): string {
  const d = (iso: string) => iso.replace(/-/g, "");
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//LUXE concept//EN",
    "BEGIN:VEVENT",
    `UID:${ref}@luxe-resort.example`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
    `DTSTART;VALUE=DATE:${d(s.checkIn!)}`,
    `DTEND;VALUE=DATE:${d(s.checkOut!)}`,
    `SUMMARY:${site.name} — ${suiteName} (concept, not a real booking)`,
    `DESCRIPTION:Reference ${ref}. LUXE is a concept website by ${author.name}; nothing was booked.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`;
}

export function Confirmation({ s, details }: { s: Selection; details: Details }) {
  const suite = currentSuite(s)!;
  const t = totals(s)!;
  const ref = useMemo(() => reference(s, details), [s, details]);

  return (
    <div className="page-in">
      <span className="grid size-14 place-items-center rounded-full bg-ink text-salt" aria-hidden="true">
        <Check size={18} />
      </span>
      <p className="t-label mt-8">Request received · {ref}</p>
      <h2 className="t-h2 mt-4 max-w-[18ch]">
        Thank you, {details.firstName}. The horizon is waiting.
      </h2>
      <p className="t-lead muted mt-6 max-w-xl">
        {suite.name}, {formatLong(s.checkIn!)} to {formatLong(s.checkOut!)}. Total {formatINR(t.total)} including taxes.
      </p>

      <div className="mt-10 border border-ink bg-salt-2/60 p-6">
        <p className="font-[560]">This was a demonstration.</p>
        <p className="muted mt-2 max-w-2xl text-[0.95rem]">
          LUXE is a self-initiated concept by {author.name}. No room was reserved, no payment was taken, and none of the
          details you entered were stored or sent anywhere: they existed only in this browser tab. In a real project, this
          step would hand over to the hotel&rsquo;s booking engine and payment provider.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <a href={icsHref(s, suite.name, ref)} download={`luxe-${ref}.ics`} className="btn btn-line">
          Add to calendar
        </a>
        <Link href="/" className="btn btn-ink">
          Back to LUXE
        </Link>
        <a href={author.caseStudy} className="btn btn-line">
          See the case study
        </a>
      </div>
    </div>
  );
}

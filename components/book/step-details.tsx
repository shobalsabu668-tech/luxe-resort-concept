"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/icons";

export type Details = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  arrival: string;
  occasion: string;
  requests: string;
};

export const emptyDetails: Details = { firstName: "", lastName: "", email: "", phone: "", arrival: "", occasion: "", requests: "" };

type Errors = Partial<Record<keyof Details, string>>;

export function validateDetails(d: Details): Errors {
  const e: Errors = {};
  if (!d.firstName.trim()) e.firstName = "Please add your first name.";
  if (!d.lastName.trim()) e.lastName = "Please add your last name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = "Please add an email address we could reply to.";
  if (d.phone.trim() && !/^\+?[\d\s()-]{7,18}$/.test(d.phone.trim())) e.phone = "That doesn't look like a phone number.";
  if (!d.arrival) e.arrival = "Please tell us roughly when you'll arrive.";
  return e;
}

const arrivals = ["Before 2:00 pm (early check-in, on request)", "2:00 – 5:00 pm", "5:00 – 8:00 pm", "After 8:00 pm"];
const occasions = ["Nothing in particular", "Honeymoon", "Anniversary", "Birthday", "A long rest"];

/**
 * Guest details. Validated on submit and then field by field once a field
 * has been touched. Nothing entered here is stored or sent anywhere.
 */
export function StepDetails({ value, onChange, onNext }: { value: Details; onChange: (d: Details) => void; onNext: () => void }) {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);

  const set = (k: keyof Details, v: string) => {
    const next = { ...value, [k]: v };
    onChange(next);
    if (touched) setErrors(validateDetails(next));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const found = validateDetails(value);
    setErrors(found);
    const first = Object.keys(found)[0] as keyof Details | undefined;
    if (first) {
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    onNext();
  };

  const field = (k: keyof Details, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}, optional = false) => (
    <div className="field">
      <label htmlFor={`${id}-${k}`} className="t-label">
        {label}
        {optional ? <span className="muted normal-case tracking-normal"> (optional)</span> : null}
      </label>
      <input
        id={`${id}-${k}`}
        value={value[k]}
        onChange={(e) => set(k, e.target.value)}
        aria-invalid={errors[k] ? true : undefined}
        aria-describedby={errors[k] ? `${id}-${k}-err` : undefined}
        className="field-input"
        {...props}
      />
      {errors[k] ? (
        <p id={`${id}-${k}-err`} className="field-error">
          {errors[k]}
        </p>
      ) : null}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate>
      <div className="grid gap-8 sm:grid-cols-2">
        {field("firstName", "First name", { autoComplete: "given-name" })}
        {field("lastName", "Last name", { autoComplete: "family-name" })}
        {field("email", "Email", { type: "email", autoComplete: "email", inputMode: "email" })}
        {field("phone", "Phone", { type: "tel", autoComplete: "tel", inputMode: "tel", placeholder: "+91" }, true)}

        <div className="field">
          <label htmlFor={`${id}-arrival`} className="t-label">
            Arriving
          </label>
          <select
            id={`${id}-arrival`}
            value={value.arrival}
            onChange={(e) => set("arrival", e.target.value)}
            aria-invalid={errors.arrival ? true : undefined}
            aria-describedby={errors.arrival ? `${id}-arrival-err` : undefined}
            className="field-input cursor-pointer"
          >
            <option value="">Choose a time</option>
            {arrivals.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
          {errors.arrival ? (
            <p id={`${id}-arrival-err`} className="field-error">
              {errors.arrival}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor={`${id}-occasion`} className="t-label">
            Occasion <span className="muted normal-case tracking-normal">(optional)</span>
          </label>
          <select id={`${id}-occasion`} value={value.occasion} onChange={(e) => set("occasion", e.target.value)} className="field-input cursor-pointer">
            <option value="">Choose one</option>
            {occasions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        <div className="field sm:col-span-2">
          <label htmlFor={`${id}-requests`} className="t-label">
            Anything we should know? <span className="muted normal-case tracking-normal">(optional)</span>
          </label>
          <textarea
            id={`${id}-requests`}
            rows={3}
            value={value.requests}
            onChange={(e) => set("requests", e.target.value)}
            placeholder="Allergies, a cot for the Garden Villa, a table at Ember on your first night…"
            className="field-input resize-y"
          />
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-6">
        <p className="muted max-w-sm text-[0.85rem]">This is a concept: what you type stays in this browser tab and is gone when you close it.</p>
        <button type="submit" className="btn btn-ink">
          Review your stay <ArrowRight size={14} />
        </button>
      </div>
    </form>
  );
}

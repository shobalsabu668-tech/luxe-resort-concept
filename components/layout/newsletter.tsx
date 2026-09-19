"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/icons";

/** Concept sign-up: validates, confirms, and stores nothing. */
export function Newsletter() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setState(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()) ? "done" : "error");
  };

  if (state === "done") {
    return (
      <p role="status" className="mt-6 border-t border-salt/15 pt-5 text-[0.95rem]">
        Thank you. (This is a concept, so your address wasn&rsquo;t stored or sent anywhere.)
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="mt-6">
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div className="flex items-end gap-3">
        <input
          id={id}
          type="email"
          autoComplete="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          aria-invalid={state === "error" || undefined}
          aria-describedby={state === "error" ? `${id}-err` : undefined}
          className="field-input border-salt/40"
        />
        <button type="submit" aria-label="Subscribe" className="grid size-12 shrink-0 place-items-center border border-salt/30 transition-colors hover:bg-salt hover:text-tide">
          <ArrowRight size={14} />
        </button>
      </div>
      {state === "error" ? (
        <p id={`${id}-err`} className="field-error mt-2">
          Please enter a valid email address.
        </p>
      ) : null}
    </form>
  );
}

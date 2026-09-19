"use client";

import { useId } from "react";
import { Minus, Plus } from "@/components/icons";

type Props = {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

/** Number stepper with an announced value. */
export function Stepper({ label, hint, value, min, max, onChange }: Props) {
  const id = useId();
  return (
    <div className="flex items-center justify-between gap-6 py-4">
      <div>
        <p id={id} className="text-[1rem]">
          {label}
        </p>
        {hint ? <p className="muted text-[0.85rem]">{hint}</p> : null}
      </div>
      <div role="group" aria-labelledby={id} className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Fewer ${label.toLowerCase()}`}
          className="grid size-10 place-items-center rounded-full border border-current/30 transition-colors hover:border-current disabled:opacity-25"
        >
          <Minus size={12} />
        </button>
        <output aria-live="polite" className="t-num w-5 text-center text-[1.1rem]">
          {value}
        </output>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`More ${label.toLowerCase()}`}
          className="grid size-10 place-items-center rounded-full border border-current/30 transition-colors hover:border-current disabled:opacity-25"
        >
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
}

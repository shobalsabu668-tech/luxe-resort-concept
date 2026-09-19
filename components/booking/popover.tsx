"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@/lib/format";
import { Close } from "@/components/icons";

type Props = {
  open: boolean;
  onClose: () => void;
  /** The element that opened it — focus returns here on close. */
  anchor: React.RefObject<HTMLElement | null>;
  title: string;
  children: ReactNode;
  className?: string;
  /** Where the panel sits relative to its anchor on desktop. */
  placement?: "above" | "below";
  align?: "start" | "end";
};

/**
 * POPOVER — a dialog panel anchored to a trigger on desktop, a bottom sheet
 * on phones. Escape or a click outside closes it; focus moves in on open and
 * returns to the trigger on close.
 */
export function Popover({ open, onClose, anchor, title, children, className, placement = "below", align = "start" }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const trigger = anchor.current;
    const el = panel.current;
    const focusable = () =>
      Array.from(el?.querySelectorAll<HTMLElement>("button:not([disabled]), [href], input, [tabindex='0']") ?? []).filter(
        (n) => n.offsetParent !== null,
      );
    requestAnimationFrame(() => (el?.querySelector<HTMLElement>("[data-autofocus]") ?? focusable()[1] ?? focusable()[0])?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const list = focusable();
      if (!list.length) return;
      const firstEl = list[0];
      const lastEl = list[list.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (el?.contains(t) || trigger?.contains(t)) return;
      onClose();
    };
    document.addEventListener("keydown", onKey, true);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.removeEventListener("pointerdown", onDown);
      if (trigger && (el?.contains(document.activeElement) || document.activeElement === document.body)) trigger.focus();
    };
  }, [open, onClose, anchor]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-tide/60 backdrop-blur-[2px] md:hidden" aria-hidden="true" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={id}
        className={cn(
          "theme-light page-in fixed inset-x-0 bottom-0 z-[70] max-h-[88svh] overflow-y-auto p-6 shadow-2xl",
          "md:absolute md:inset-x-auto md:bottom-auto md:max-h-none md:overflow-visible md:p-8",
          placement === "below" ? "md:top-[calc(100%+0.75rem)]" : "md:bottom-[calc(100%+0.75rem)]",
          align === "start" ? "md:left-0" : "md:right-0",
          className,
        )}
      >
        <div className="mb-6 flex items-center justify-between gap-6">
          <p id={id} className="t-label">
            {title}
          </p>
          <button type="button" onClick={onClose} className="grid size-9 place-items-center" aria-label="Close">
            <Close size={14} />
          </button>
        </div>
        {children}
      </div>
    </>
  );
}

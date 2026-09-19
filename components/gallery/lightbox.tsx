"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { photos, type PhotoKey } from "@/lib/photos";
import { ArrowLeft, ArrowRight, Close } from "@/components/icons";

type Props = {
  items: PhotoKey[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
};

/**
 * LIGHTBOX — a modal viewer. Arrow keys and swipes move between photographs,
 * Escape closes, focus is trapped inside and returned on close.
 */
export function Lightbox({ items, index, onClose, onIndex }: Props) {
  const dialog = useRef<HTMLDivElement>(null);
  const touch = useRef<number | null>(null);
  const open = index !== null;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onIndex((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  // Latest handlers in refs, so the open/close effect runs once per opening
  // (re-running it would steal focus back to Close on every photo change).
  const handlers = useRef({ go, onClose });
  useEffect(() => {
    handlers.current = { go, onClose };
  });

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    dialog.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handlers.current.onClose();
      else if (e.key === "ArrowRight") handlers.current.go(1);
      else if (e.key === "ArrowLeft") handlers.current.go(-1);
      else if (e.key === "Tab") {
        const f = Array.from(dialog.current?.querySelectorAll<HTMLElement>("button, a") ?? []);
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open]);

  if (index === null) return null;
  const p = photos[items[index]];

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label="Photograph viewer"
      className="page-in fixed inset-0 z-[90] flex flex-col bg-tide/97 text-salt"
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      <div className="shell flex h-16 shrink-0 items-center justify-between">
        <p className="t-num text-[0.85rem] text-mist" aria-live="polite">
          {index + 1} / {items.length}
        </p>
        <button type="button" onClick={onClose} data-autofocus className="t-label flex min-h-11 items-center gap-2 px-2">
          Close <Close size={14} />
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        <Image
          key={p.src}
          src={p.src}
          alt={p.alt}
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={p.blurDataURL}
          className="page-in object-contain"
        />
      </div>

      <div className="shell flex shrink-0 items-center justify-between gap-6 py-4">
        <button type="button" onClick={() => go(-1)} aria-label="Previous photograph" className="grid size-12 place-items-center border border-salt/25 hover:border-salt">
          <ArrowLeft size={14} />
        </button>
        <p className="min-w-0 flex-1 text-center text-[0.9rem]">
          <span className="block truncate">{p.alt}</span>
          <a href={p.credit.url} target="_blank" rel="noreferrer" className="link-u text-[0.8rem] text-mist">
            Photo: {p.credit.name} / Unsplash
          </a>
        </p>
        <button type="button" onClick={() => go(1)} aria-label="Next photograph" className="grid size-12 place-items-center border border-salt/25 hover:border-salt">
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

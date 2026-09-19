"use client";

import { useState } from "react";
import type { PhotoKey } from "@/lib/photos";
import { photos } from "@/lib/photos";
import { cn } from "@/lib/format";
import { Photo } from "@/components/photo";
import { Lightbox } from "./lightbox";

/** Editorial layout: each tile has a span and a shape; the grid does the rest. */
export type Tile = { key: PhotoKey; className: string; sizes: string };

export function GalleryGrid({ tiles, className }: { tiles: Tile[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const keys = tiles.map((t) => t.key);

  return (
    <>
      <ul className={cn("grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5", className)}>
        {tiles.map((t, i) => (
          <li key={t.key} className={t.className}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block size-full cursor-zoom-in"
              aria-label={`View larger: ${photos[t.key].alt}`}
            >
              <Photo name={t.key} alt="" sizes={t.sizes} reveal className="photo-zoom size-full" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-tide/0 transition-colors duration-500 group-hover:bg-tide/15" />
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={keys} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </>
  );
}

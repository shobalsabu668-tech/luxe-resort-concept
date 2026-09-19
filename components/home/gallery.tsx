import { GalleryGrid, type Tile } from "@/components/gallery/gallery-grid";

const tiles: Tile[] = [
  { key: "poolCliff", className: "col-span-2 aspect-[16/10] md:col-span-7 md:row-span-2 md:aspect-auto", sizes: "(min-width: 768px) 58vw, 100vw" },
  { key: "bathStone", className: "aspect-[4/5] md:col-span-5", sizes: "(min-width: 768px) 42vw, 50vw" },
  { key: "barLedge", className: "aspect-[4/5] md:col-span-5 md:aspect-[16/11]", sizes: "(min-width: 768px) 42vw, 50vw" },
  { key: "aerialCoast", className: "aspect-[4/5] md:col-span-4 md:aspect-[3/4]", sizes: "(min-width: 768px) 33vw, 50vw" },
  { key: "villaTwilight", className: "aspect-[4/5] md:col-span-4 md:aspect-[3/4]", sizes: "(min-width: 768px) 33vw, 50vw" },
  { key: "fishingBoats", className: "col-span-2 aspect-[16/10] md:col-span-4 md:aspect-[3/4]", sizes: "(min-width: 768px) 33vw, 100vw" },
  { key: "palmsDusk", className: "col-span-2 aspect-[21/9] md:col-span-12", sizes: "100vw" },
];

/** MOMENTS — an editorial grid; any photograph opens in the lightbox. */
export function Gallery() {
  return (
    <section aria-labelledby="gallery-title" className="theme-dark section">
      <div className="shell">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div>
            <p className="t-label text-sand" data-reveal>
              Moments
            </p>
            <h2 id="gallery-title" className="t-h2 mt-5" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
              The coast, unedited.
            </h2>
          </div>
          <p className="muted max-w-xs text-[0.95rem]" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
            Select any photograph to see it full size.
          </p>
        </div>
        <GalleryGrid tiles={tiles} />
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { PhotoKey } from "@/lib/photos";
import { cn } from "@/lib/format";
import { Photo } from "@/components/photo";

const moments: { time: string; title: string; body: string; photo: PhotoKey }[] = [
  { time: "06:10", title: "First light", body: "The fishing boats go out from the village below. If you want to go with them, someone will knock at a quarter to six.", photo: "dawnBoat" },
  { time: "09:00", title: "Breakfast, slowly", body: "Neer dosa and filter coffee under the frangipani, or on the water if your suite has a pool. Breakfast runs until eleven.", photo: "floatingBreakfast" },
  { time: "13:00", title: "The heat of the day", body: "The upper pool, a cabana, a book. The Salt Room opens its doors at noon, when the cliff is at its coolest.", photo: "cabana" },
  { time: "16:30", title: "The cliff walk", body: "Five kilometres of laterite path to the old lighthouse, timed so you reach the top as the light turns gold.", photo: "cliffGolden" },
  { time: "18:20", title: "The Low Tide Bar", body: "Twelve stools on the lowest ledge of the cliff, all facing west. A kokum spritz, and the sun going down into the sea.", photo: "sunsetDrink" },
  { time: "20:30", title: "Ember", body: "Dinner over coconut-husk coals: whatever the boats brought in this afternoon, cooked the way the coast has always cooked it.", photo: "emberFire" },
];

/**
 * A DAY AT LUXE — the photograph stays pinned while the day scrolls past
 * beside it, cross-fading at each hour. On phones each moment carries its
 * own photograph instead.
 */
export function Day() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="day-title" className="theme-terrace relative">
      <div className="shell grid lg:grid-cols-12 lg:gap-12">
        <div className="relative hidden lg:col-span-6 lg:block">
          <div className="sticky top-0 flex h-[100svh] items-center py-24">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              {moments.map((m, i) => (
                <Photo
                  key={m.photo}
                  name={m.photo}
                  alt={i === active ? undefined : ""}
                  sizes="45vw"
                  className={cn("absolute inset-0 transition-opacity duration-1000 ease-[var(--ease-out)]", i === active ? "opacity-100" : "opacity-0")}
                  imgClassName={cn("transition-transform duration-[2400ms] ease-[var(--ease-out)]", i === active ? "scale-100" : "scale-110")}
                />
              ))}
              <p aria-hidden="true" className="t-num absolute bottom-5 left-5 bg-tide/70 px-3 py-1.5 text-[0.8rem] backdrop-blur-sm">
                {moments[active].time}
              </p>
            </div>
          </div>
        </div>

        <div className="py-[var(--section)] lg:col-span-5 lg:col-start-8">
          <p className="t-label text-sand" data-reveal>
            A day at LUXE
          </p>
          <h2 id="day-title" className="t-h2 mt-5" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
            From first light to the last of the coals.
          </h2>
          <ol className="mt-16 lg:mt-[30vh]">
            {moments.map((m, i) => (
              <li
                key={m.time}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-i={i}
                className={cn(
                  "border-t border-salt/15 py-10 transition-opacity duration-700 lg:min-h-[62svh] lg:py-14",
                  i === active ? "lg:opacity-100" : "lg:opacity-75",
                )}
              >
                <Photo name={m.photo} sizes="100vw" className="mb-8 aspect-[4/3] lg:hidden" />
                <p className="t-num text-[0.95rem] text-sand">{m.time}</p>
                <h3 className="t-h3 mt-3">{m.title}</h3>
                <p className="muted t-body mt-4 max-w-md">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

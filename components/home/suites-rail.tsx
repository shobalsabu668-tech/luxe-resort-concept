"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { suites, totalKeys } from "@/lib/suites";
import { fromRate } from "@/lib/rates";
import { formatINR } from "@/lib/format";
import { Photo } from "@/components/photo";
import { ArrowRight } from "@/components/icons";

/**
 * SUITES RAIL — on wide screens the section pins and vertical scrolling
 * slides the suites sideways, one continuous gesture. On touch screens and
 * under reduced motion it is a plain swipeable row with scroll-snap.
 */
export function SuitesRail() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = section.current;
    const row = track.current;
    if (!el || !row) return;
    const mq = window.matchMedia("(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)");
    let raf = 0;
    let current = 0;
    let target = 0;
    let distance = 0;

    const measure = () => {
      if (!mq.matches) {
        el.style.height = "";
        row.style.transform = "";
        el.dataset.pinned = "false";
        return;
      }
      distance = Math.max(0, row.scrollWidth - window.innerWidth);
      el.style.height = `${window.innerHeight + distance}px`;
      el.dataset.pinned = "true";
    };

    const tick = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.3) current = target;
      row.style.transform = `translate3d(${-current}px, 0, 0)`;
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (!mq.matches) return;
      const top = el.getBoundingClientRect().top;
      target = Math.min(distance, Math.max(0, -top));
      if (!raf) raf = requestAnimationFrame(tick);
    };

    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={section} aria-labelledby="suites-title" className="theme-dark relative" data-pinned="false">
      <div className="flex flex-col justify-center overflow-hidden py-[var(--section)] lg:sticky lg:top-0 lg:h-[100svh] lg:py-8">
        <div className="shell flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="t-label text-sand" data-reveal>
              Suites
            </p>
            <h2 id="suites-title" className="t-h2 mt-5 max-w-[16ch]" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
              {totalKeys} suites. Five ways to stay.
            </h2>
          </div>
          <Link href="/suites" className="btn btn-line" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
            All suites <ArrowRight size={14} />
          </Link>
        </div>

        <ul
          ref={track}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-2 will-change-transform md:gap-6 lg:mt-10 lg:overflow-visible lg:pr-[20vw]"
        >
          {suites.map((s, i) => (
            <li key={s.slug} className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[min(27rem,calc(50svh*0.8))]">
              <Link href={`/suites/${s.slug}`} className="group block">
                <Photo name={s.photos[0]} sizes="(min-width: 1024px) 28vw, (min-width: 640px) 46vw, 78vw" className="photo-zoom aspect-[4/5]" />
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <span className="t-label text-mist">0{i + 1}</span>
                  <span className="text-[0.85rem] text-mist">
                    {s.count} {s.count === 1 ? "key" : "keys"}
                  </span>
                </div>
                <h3 className="t-h3 mt-2 transition-colors group-hover:text-sand">{s.name}</h3>
                <p className="muted mt-2 text-[0.95rem]">
                  {s.size} m² · {s.view} · Sleeps {s.maxGuests}
                </p>
                <p className="mt-4 flex items-center justify-between border-t border-salt/15 pt-4 text-[0.95rem]">
                  <span>
                    From <span className="t-num">{formatINR(fromRate(s))}</span>
                    <span className="text-mist"> / night</span>
                  </span>
                  <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";
import { Photo } from "@/components/photo";
import { BookingBar } from "@/components/booking/booking-bar";

/**
 * HERO — one photograph, one promise, and the booking bar within reach.
 * As the page scrolls, the image drifts slower than the page and darkens,
 * so the next section arrives out of the dusk.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / el.offsetHeight));
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} aria-labelledby="hero-title" className="theme-dark relative -mt-[var(--bar-h)] h-[100svh] min-h-[40rem] overflow-hidden">
      <div className="absolute inset-0 will-change-transform" style={{ transform: "translate3d(0, calc(var(--p, 0) * 22%), 0)" }}>
        <Photo name="heroDusk" sizes="100vw" priority quality={60} className="absolute inset-0 bg-tide" imgClassName="intro-settle" position="50% 60%" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(15_23_22/0.55)_0%,rgb(15_23_22/0)_28%,rgb(15_23_22/0)_45%,rgb(15_23_22/0.85)_88%,rgb(15_23_22)_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 bg-tide" style={{ opacity: "calc(var(--p, 0) * 0.7)" }} />

      <p
        aria-hidden="true"
        className="wordmark intro-fade pointer-events-none absolute inset-x-0 top-[31%] text-center text-[clamp(3.5rem,15vw,15rem)] leading-none text-salt/[0.1] [animation-name:letter]"
        style={{ "--d": 1 } as React.CSSProperties}
      >
        {site.name}
      </p>

      <div className="shell relative flex h-full flex-col justify-end pb-6 md:pb-10" style={{ opacity: "calc(1 - var(--p, 0) * 1.6)" }}>
        <p className="t-label intro-rise text-sand" style={{ "--d": 0 } as React.CSSProperties}>
          {site.descriptor}
        </p>
        <h1 id="hero-title" className="t-display intro-rise mt-5 max-w-[14ch]" style={{ "--d": 1 } as React.CSSProperties}>
          {site.tagline}
        </h1>
        <div className="intro-rise mt-10 md:mt-14" style={{ "--d": 3 } as React.CSSProperties}>
          <BookingBar placement="above" />
        </div>
      </div>
    </section>
  );
}

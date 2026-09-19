"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site, author } from "@/lib/site";
import { cn } from "@/lib/format";
import { Close } from "@/components/icons";

/**
 * HEADER — floats over each page's dark opening image, then settles into a
 * solid bar once the page scrolls. Below 1024px the links move into a
 * full-screen menu with a focus trap.
 */
export function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > 480 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  useEffect(() => {
    if (!menu) return;
    const trigger = menuBtn.current;
    document.documentElement.style.overflow = "hidden";
    const items = () => Array.from(panel.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    items()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
      if (e.key !== "Tab") return;
      const list = items();
      if (e.shiftKey && document.activeElement === list[0]) {
        e.preventDefault();
        list[list.length - 1].focus();
      } else if (!e.shiftKey && document.activeElement === list[list.length - 1]) {
        e.preventDefault();
        list[0].focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [menu]);

  // Pages that open on a light background need the solid bar from the start.
  const opaque = solid || pathname.startsWith("/book");

  const isActive = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-700 ease-[var(--ease-out)]",
          opaque ? "border-b border-salt/10 bg-tide/90 backdrop-blur-md" : "border-b border-transparent",
          hidden && !menu ? "-translate-y-full" : "translate-y-0",
        )}
        style={{ top: solid ? 0 : "var(--bar-h)" }}
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" className="wordmark text-[1.05rem] leading-none" aria-label={`${site.name}, home`}>
            {site.name}
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} aria-current={isActive(n.href) ? "page" : undefined} className="t-label link-grow">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/book" className="btn btn-sand min-h-11 px-5">
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book a stay</span>
            </Link>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setMenu(true)}
              aria-expanded={menu}
              aria-controls="site-menu"
              className="t-label grid min-h-11 place-items-center px-2 lg:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {menu ? (
        <div id="site-menu" ref={panel} role="dialog" aria-modal="true" aria-label="Menu" className="page-in fixed inset-0 z-[80] flex flex-col bg-tide">
          <div className="shell flex h-[var(--header-h)] items-center justify-between">
            <Link href="/" className="wordmark text-[1.05rem]">
              {site.name}
            </Link>
            <button type="button" onClick={() => setMenu(false)} className="t-label flex min-h-11 items-center gap-2 px-2">
              Close <Close size={14} />
            </button>
          </div>
          <nav aria-label="Menu" className="shell flex flex-1 flex-col justify-center">
            <ul className="space-y-3">
              {[{ href: "/", label: "Home" }, ...nav, { href: "/book", label: "Book a stay" }].map((n, i) => (
                <li key={n.href} className="intro-rise" style={{ "--d": i } as React.CSSProperties}>
                  <Link
                    href={n.href}
                    onClick={() => setMenu(false)}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className="t-h2 block py-1 aria-[current=page]:text-sand"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="shell pb-8 text-[0.85rem] text-mist">
            <p>{site.descriptor}</p>
            <p className="mt-1">
              A concept by{" "}
              <a href={author.portfolio} className="link-u text-salt">
                {author.name}
              </a>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}

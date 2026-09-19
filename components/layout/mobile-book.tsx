"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/format";
import { ArrowRight } from "@/components/icons";

/**
 * On phones, a booking control sits within thumb reach once the opening
 * image has scrolled away. Hidden on the booking page itself.
 */
export function MobileBook() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname.startsWith("/book")) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-salt/10 bg-tide/92 p-3 backdrop-blur-md transition-transform duration-500 ease-[var(--ease-out)] md:hidden",
        show ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!show}
      inert={!show}
    >
      <Link href="/book" className="btn btn-sand w-full justify-between">
        Check availability
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}

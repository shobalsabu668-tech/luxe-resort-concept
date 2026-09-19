import Link from "next/link";
import { author } from "@/lib/site";

/**
 * The honesty line. Every page says, before anything else, that LUXE is a
 * concept by a named developer and that nothing here can be booked.
 */
export function ConceptBar() {
  return (
    <div className="relative z-[55] bg-sand text-tide">
      <p className="shell flex h-[var(--bar-h)] items-center justify-center gap-x-3 whitespace-nowrap text-center text-[0.78rem]">
        <span className="md:hidden">
          <strong className="font-[620]">Concept</strong> by {author.name} · not a real resort
        </span>
        <span className="hidden md:inline">
          <strong className="font-[620]">Self-initiated concept</strong> by {author.name}. LUXE is fictional and nothing here can be booked.
        </span>
        <Link href="/concept" className="link-u hidden shrink-0 font-[560] lg:inline">
          About this concept
        </Link>
      </p>
    </div>
  );
}

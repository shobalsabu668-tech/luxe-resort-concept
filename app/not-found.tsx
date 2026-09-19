import Link from "next/link";
import { Photo } from "@/components/photo";

export default function NotFound() {
  return (
    <main id="main" className="theme-dark relative -mt-[var(--bar-h)] flex min-h-[100svh] items-end overflow-hidden">
      <Photo name="palmsDusk" sizes="100vw" className="absolute inset-0 opacity-70" alt="" />
      <div className="shell relative pb-20">
        <p className="t-label text-sand">404</p>
        <h1 className="t-display mt-5 max-w-[14ch]">This path ends at the cliff edge.</h1>
        <p className="t-lead mt-6 max-w-lg text-salt/85">The page you were looking for isn&rsquo;t here. The sea, however, still is.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-sand">
            Back to LUXE
          </Link>
          <Link href="/suites" className="btn btn-line">
            See the suites
          </Link>
        </div>
      </div>
    </main>
  );
}

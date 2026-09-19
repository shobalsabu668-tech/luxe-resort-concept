import { RevealObserver } from "@/components/reveal-observer";

/** Re-mounts per navigation: a soft fade-in, and reveals re-armed. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-in">
      {children}
      <RevealObserver />
    </div>
  );
}

import type { PhotoKey } from "@/lib/photos";
import { Photo } from "@/components/photo";

type Props = {
  photo: PhotoKey;
  eyebrow: string;
  title: string;
  lead?: string;
  position?: string;
  children?: React.ReactNode;
};

/** Opening band for inner pages: a photograph, a title, one sentence. */
export function PageHero({ photo, eyebrow, title, lead, position, children }: Props) {
  return (
    <section className="theme-dark relative -mt-[var(--bar-h)] flex min-h-[78svh] items-end overflow-hidden">
      <Photo name={photo} sizes="100vw" priority quality={60} className="absolute inset-0" imgClassName="intro-settle" position={position} />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(15_23_22/0.6)_0%,rgb(15_23_22/0.05)_35%,rgb(15_23_22/0.25)_60%,rgb(15_23_22/0.92)_100%)]" />
      <div className="shell relative pb-12 pt-48 md:pb-20">
        <p className="t-label intro-rise text-sand">{eyebrow}</p>
        <h1 className="t-display intro-rise mt-5 max-w-[16ch]" style={{ "--d": 1 } as React.CSSProperties}>
          {title}
        </h1>
        {lead ? (
          <p className="t-lead intro-rise mt-6 max-w-2xl text-salt/85" style={{ "--d": 2 } as React.CSSProperties}>
            {lead}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}

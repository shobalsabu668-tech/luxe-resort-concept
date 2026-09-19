import { Photo } from "@/components/photo";
import { totalKeys } from "@/lib/suites";
import { venues } from "@/lib/dining";
import { ReadingText } from "./reading-text";

const facts = [
  { value: String(totalKeys), label: "Suites, every one facing west" },
  { value: "40 m", label: "Above the Arabian Sea" },
  { value: String(venues.length), label: "Places to eat and drink" },
];

/** THE RETREAT — what LUXE is, in one paragraph, then the place itself. */
export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="theme-light section relative">
      <div className="shell grid gap-y-10 lg:grid-cols-12">
        <h2 id="intro-title" className="t-label lg:col-span-3" data-reveal>
          The retreat
        </h2>
        <div className="lg:col-span-9">
          <ReadingText
            className="t-h2 max-w-[22ch] !font-[270] lg:max-w-[20ch]"
            text="Twenty-two suites cut into the laterite cliffs above the Arabian Sea. Every one faces west, so every day here ends the same way: slowly, and in gold."
          />
          <dl className="mt-16 grid gap-8 border-t border-ink/15 pt-8 sm:grid-cols-3 md:mt-24">
            {facts.map((f, i) => (
              <div key={f.label} data-reveal style={{ "--d": i } as React.CSSProperties}>
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="t-num block text-[clamp(2.5rem,4.5vw,4rem)] font-[250] leading-none [font-stretch:118%]">{f.value}</span>
                  <span className="muted mt-3 block max-w-[16rem] text-[0.95rem]">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="shell mt-20 grid grid-cols-12 items-end gap-4 md:mt-32 md:gap-6">
        <div className="col-span-7 md:col-span-5 md:col-start-2">
          <Photo name="poolFrangipani" reveal sizes="(min-width: 768px) 40vw, 58vw" className="aspect-[4/5]" />
          <p className="muted mt-4 text-[0.85rem]">The upper pool, under the frangipani.</p>
        </div>
        <div className="col-span-5 mb-16 md:col-span-5 md:col-start-8 md:mb-40">
          <Photo name="cliffLaterite" reveal sizes="(min-width: 768px) 40vw, 42vw" className="aspect-[3/4] md:aspect-[4/3]" />
          <p className="muted mt-4 text-[0.85rem]">The laterite, the same red stone the suites are built from.</p>
        </div>
      </div>
    </section>
  );
}

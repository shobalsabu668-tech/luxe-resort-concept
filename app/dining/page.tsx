import type { Metadata } from "next";
import { privateDining, venues } from "@/lib/dining";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { MenuTabs } from "@/components/dining/menu-tabs";

export const metadata: Metadata = {
  title: "Dining",
  description: "Ember, Salt Terrace and the Low Tide Bar: fire-cooked coastal food, long breakfasts and a bar built for sunset.",
  alternates: { canonical: "/dining" },
};

export default function DiningPage() {
  return (
    <main id="main">
      <PageHero
        photo="emberNight"
        eyebrow="Dining"
        title="Three places, three times of day."
        lead="Breakfast under the frangipani, a bar on the lowest ledge of the cliff, and dinner over coconut-husk coals."
        position="50% 40%"
      />

      <nav aria-label="Restaurants" className="theme-dark border-b border-salt/10">
        <ul className="shell flex gap-8 overflow-x-auto py-5 no-scrollbar">
          {venues.map((v) => (
            <li key={v.slug} className="shrink-0">
              <a href={`#${v.slug}`} className="t-label link-grow">
                {v.name}
              </a>
            </li>
          ))}
          <li className="shrink-0">
            <a href="#private-dining" className="t-label link-grow">
              Private dining
            </a>
          </li>
        </ul>
      </nav>

      {venues.map((v, i) => (
        <section key={v.slug} id={v.slug} aria-labelledby={`${v.slug}-title`} className={`${i % 2 ? "theme-dark" : "theme-light"} section scroll-mt-20`}>
          <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-6">
            <div className={`lg:col-span-6 ${i % 2 ? "lg:order-2 lg:col-start-7" : ""}`}>
              <div className="grid grid-cols-5 gap-4">
                <Photo name={v.photo} reveal sizes="(min-width: 1024px) 30vw, 60vw" className="col-span-3 aspect-[3/4]" />
                <Photo name={v.detail} reveal sizes="(min-width: 1024px) 20vw, 40vw" className="col-span-2 mt-16 aspect-[3/4]" />
              </div>
            </div>
            <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : "lg:col-start-8"}`}>
              <p className={`t-label ${i % 2 ? "text-sand" : ""}`} data-reveal>
                {v.kind}
              </p>
              <h2 id={`${v.slug}-title`} className="t-h2 mt-5" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
                {v.name}
              </h2>
              <p className="t-h3 mt-6 !font-[300]" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
                {v.line}
              </p>
              <p className="muted t-body mt-6" data-reveal style={{ "--d": 3 } as React.CSSProperties}>
                {v.body}
              </p>
              <p className="t-num mt-6 text-[0.95rem]">
                <span className="muted">Open </span>
                {v.hours}
              </p>
              <MenuTabs menus={v.menus} id={v.slug} />
            </div>
          </div>
        </section>
      ))}

      <section id="private-dining" aria-labelledby="private-title" className="theme-dark relative flex min-h-[80svh] items-end overflow-hidden">
        <Photo name={privateDining.photo} sizes="100vw" className="absolute inset-0" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(15_23_22/0.1)_0%,rgb(15_23_22/0.9)_100%)]" />
        <div className="shell relative pb-16 pt-40">
          <p className="t-label text-sand">By arrangement</p>
          <h2 id="private-title" className="t-h2 mt-5">
            {privateDining.title}
          </h2>
          <p className="t-lead mt-6 max-w-xl text-salt/85">{privateDining.body}</p>
        </div>
      </section>
    </main>
  );
}

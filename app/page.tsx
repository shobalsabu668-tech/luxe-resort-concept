import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { SuitesRail } from "@/components/home/suites-rail";
import { Day } from "@/components/home/day";
import { DiningTeaser } from "@/components/home/dining-teaser";
import { SaltRoom } from "@/components/home/salt-room";
import { Gallery } from "@/components/home/gallery";
import { Location } from "@/components/home/location";
import { Seasons } from "@/components/home/seasons";
import { Closing } from "@/components/home/closing";
import { conceptJsonLd, jsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Intro />
      <SuitesRail />
      <Day />
      <DiningTeaser />
      <SaltRoom />
      <Gallery />
      <Location />
      <Seasons />
      <Closing />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(conceptJsonLd()) }} />
    </main>
  );
}

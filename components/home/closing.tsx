import { Photo } from "@/components/photo";
import { BookingBar } from "@/components/booking/booking-bar";

/** CLOSING — the sunset, and the booking bar once more. */
export function Closing() {
  return (
    <section aria-labelledby="closing-title" className="theme-dark relative flex min-h-[92svh] items-end overflow-hidden">
      <Photo name="sunsetSea" sizes="100vw" className="absolute inset-0" position="50% 58%" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(15_23_22/0.2)_0%,rgb(15_23_22/0.1)_40%,rgb(15_23_22/0.88)_100%)]" />
      <div className="shell relative pb-10 pt-40 md:pb-16">
        <p className="t-label text-sand" data-reveal>
          Your evening is waiting
        </p>
        <h2 id="closing-title" className="t-display mt-5 max-w-[12ch]" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
          Come for the sunset. Stay for the next one.
        </h2>
        <div className="mt-12" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
          <BookingBar placement="above" />
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingFlow } from "@/components/book/booking-flow";

export const metadata: Metadata = {
  title: "Book a stay",
  description: "Check availability and rates for every suite at LUXE. A concept booking engine: nothing is reserved or charged.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <main id="main" className="theme-light min-h-[100svh] pt-[calc(var(--header-h))]">
      <Suspense>
        <BookingFlow />
      </Suspense>
    </main>
  );
}

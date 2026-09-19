import type { Metadata, Viewport } from "next";
import { Mona_Sans } from "next/font/google";
import { getSiteUrl, site, author } from "@/lib/site";
import { ConceptBar } from "@/components/layout/concept-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBook } from "@/components/layout/mobile-book";
import "./globals.css";

const mona = Mona_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-mona",
  display: "swap",
});

const title = `${site.name} — ${site.descriptor} (concept)`;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: author.name, url: author.portfolio }],
  creator: author.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  // A fictional resort shouldn't turn up in hotel searches. Links still work
  // and every page is fully crawlable; it just isn't indexed.
  robots: { index: false, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0f1716",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={mona.variable} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <a
          href="#main"
          className="t-label fixed left-4 top-4 z-[100] -translate-y-24 bg-sand px-4 py-3 text-tide transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <ConceptBar />
        <Header />
        {children}
        <Footer />
        <MobileBook />
      </body>
    </html>
  );
}

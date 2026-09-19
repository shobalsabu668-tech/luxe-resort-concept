/**
 * SITE — the fictional resort, and the real person who built it.
 * LUXE does not exist. Everything that could be mistaken for a real contact
 * detail uses the reserved `.example` domain, and no phone number is given.
 */

export const site = {
  name: "LUXE",
  descriptor: "Cliffside retreat · Konkan coast",
  tagline: "Where the horizon slows down.",
  description:
    "LUXE is a concept website for a fictional cliffside retreat on India's Konkan coast: twenty-two west-facing suites, fire-cooked coastal dining and a spa carved into the laterite.",
  email: "stay@luxe-resort.example",
  address: ["Headland Road", "Konkan coast, India"],
  checkIn: "2:00 pm",
  checkOut: "11:00 am",
};

export const nav = [
  { href: "/suites", label: "Suites" },
  { href: "/dining", label: "Dining" },
  { href: "/experiences", label: "Experiences" },
  { href: "/#location", label: "Location" },
];

/** The real author. Links back to the portfolio from every page. */
export const author = {
  name: "Shobal Sabu",
  role: "Creative web developer",
  portfolio: process.env.NEXT_PUBLIC_PORTFOLIO_URL || "https://github.com/shobalsabu668-tech",
  /** The case study on the portfolio, once NEXT_PUBLIC_PORTFOLIO_URL is set. */
  caseStudy: process.env.NEXT_PUBLIC_PORTFOLIO_URL
    ? `${process.env.NEXT_PUBLIC_PORTFOLIO_URL.replace(/\/$/, "")}/work/luxe`
    : "https://github.com/shobalsabu668-tech",
  repo: "https://github.com/shobalsabu668-tech/luxe-resort-concept",
};

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

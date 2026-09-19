import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { suites } from "@/lib/suites";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl();
  const now = new Date();
  return [
    { url, lastModified: now, priority: 1 },
    { url: `${url}/suites`, lastModified: now, priority: 0.9 },
    ...suites.map((s) => ({ url: `${url}/suites/${s.slug}`, lastModified: now, priority: 0.8 })),
    { url: `${url}/dining`, lastModified: now, priority: 0.7 },
    { url: `${url}/experiences`, lastModified: now, priority: 0.7 },
    { url: `${url}/book`, lastModified: now, priority: 0.6 },
    { url: `${url}/concept`, lastModified: now, priority: 0.5 },
  ];
}

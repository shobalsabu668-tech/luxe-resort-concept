import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { site, author } from "@/lib/site";

/** Social card: the hero photograph, the wordmark, and an honest label. */
export const alt = `${site.name} — ${site.tagline} A concept website by ${author.name}.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TITLE = site.tagline;
const SMALL = `LUXE · ${site.descriptor.toUpperCase()} · CONCEPT BY ${author.name.toUpperCase()}`;

/** Mona Sans, subset to the characters used, fetched at build time. */
async function loadFont(axes: string, text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=Mona+Sans:wdth,wght@${axes}&text=${encodeURIComponent(text)}`, {
      headers: { "User-Agent": "Mozilla/4.0" },
      signal: AbortSignal.timeout(4000),
    }).then((r) => r.text());
    const url = /src: url\((.+?)\) format\('truetype'\)/.exec(css)?.[1];
    if (!url) return null;
    return await fetch(url, { signal: AbortSignal.timeout(4000) }).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const photo = await sharp(await readFile(path.join(process.cwd(), "public/photos/heroDusk.jpg")))
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .jpeg({ quality: 78 })
    .toBuffer();
  const [light, label] = await Promise.all([loadFont("118,300", TITLE), loadFont("112,500", SMALL)]);
  const branded = Boolean(light && label);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", color: "#f2eee6" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/jpeg;base64,${photo.toString("base64")}`} width={1200} height={630} alt="" style={{ position: "absolute", inset: 0 }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(15,23,22,0.35) 0%, rgba(15,23,22,0.1) 40%, rgba(15,23,22,0.92) 100%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 64, width: "100%", position: "relative" }}>
          <div style={{ fontSize: 17, letterSpacing: 4, color: "#d8c6a5", fontFamily: branded ? "Label" : "sans-serif" }}>{SMALL}</div>
          <div style={{ fontSize: 92, lineHeight: 1, marginTop: 22, letterSpacing: -2, fontFamily: branded ? "Light" : "sans-serif", maxWidth: 900 }}>
            {TITLE}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: branded
        ? [
            { name: "Light", data: light!, weight: 300, style: "normal" },
            { name: "Label", data: label!, weight: 500, style: "normal" },
          ]
        : undefined,
    },
  );
}

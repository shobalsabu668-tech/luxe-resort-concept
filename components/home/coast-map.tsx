/**
 * COAST MAP — a drawn map of the headland, not an embed: it loads nothing,
 * matches the site, and says only what a guest needs. The coastline draws
 * itself in when revealed (see .map-draw in globals.css).
 */

const COAST =
  "M322 0C312 58 334 108 302 158C282 192 242 218 192 248C152 270 140 300 170 318C204 338 250 330 275 362C300 394 292 430 264 468C246 494 214 518 224 548C234 576 268 592 280 640";

const markers = [
  { x: 172, y: 298, label: "LUXE", sub: "The headland", main: true, dx: 16, dy: -10 },
  { x: 296, y: 168, label: "Marina", sub: "12 min", dx: 14, dy: 4 },
  { x: 348, y: 428, label: "Village market", sub: "8 min", dx: 14, dy: 4 },
  { x: 226, y: 546, label: "Lighthouse", sub: "5 km cliff path", dx: 16, dy: 4 },
];

export function CoastMap() {
  return (
    <figure className="relative" data-reveal="fade">
      <svg viewBox="0 0 600 640" role="img" aria-labelledby="map-title map-desc" className="map-draw h-auto w-full">
        <title id="map-title">Map of the LUXE headland</title>
        <desc id="map-desc">
          LUXE sits on a headland on the west-facing Konkan coast. The marina is 12 minutes north, the village market 8
          minutes inland, and a 5 kilometre cliff path runs south to the lighthouse. The airport is 45 minutes to the
          north-east.
        </desc>

        <defs>
          <pattern id="sea-lines" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
            <path d="M0 5h10" stroke="#121a19" strokeOpacity="0.07" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Sea, with contour lines echoing the coast */}
        <rect width="600" height="640" fill="url(#sea-lines)" />
        {[26, 58, 96].map((o, i) => (
          <path key={o} d={COAST} transform={`translate(${-o} 0)`} fill="none" stroke="#121a19" strokeOpacity={0.12 - i * 0.03} strokeWidth="1" />
        ))}

        {/* Land */}
        <path d={`${COAST}L600 640L600 0Z`} fill="#e8e2d6" />
        <path d={COAST} fill="none" stroke="#121a19" strokeWidth="1.6" pathLength={1} className="map-line" />

        {/* Coast road and cliff path */}
        <path d="M296 168C360 206 372 300 348 428C336 492 322 560 330 640" fill="none" stroke="#121a19" strokeOpacity="0.45" strokeWidth="1.2" strokeDasharray="6 5" />
        <path
          d="M172 298C220 332 268 344 282 380C294 420 250 482 226 546"
          fill="none"
          stroke="#c9784a"
          strokeWidth="1.8"
          strokeDasharray="1.5 6"
          strokeLinecap="round"
        />

        {/* Airport, off the map */}
        <g transform="translate(520 60)">
          <path d="M-40 40 L10 -10 M-6 -10 H10 V6" fill="none" stroke="#121a19" strokeWidth="1.3" />
          <text x="-120" y="64" fontSize="13" fill="#121a19">
            Airport · 45 min
          </text>
        </g>

        {/* North arrow + scale */}
        <g transform="translate(552 560)" fill="#121a19">
          <path d="M0 -26 L7 0 L0 -6 L-7 0Z" />
          <text x="-4" y="18" fontSize="12">
            N
          </text>
        </g>
        <g transform="translate(400 604)">
          <path d="M0 0H80M0 -4V4M80 -4V4" stroke="#121a19" strokeWidth="1.2" />
          <text x="26" y="20" fontSize="11" fill="#4a524f">
            1 km
          </text>
        </g>

        <text x="40" y="330" fontSize="12" letterSpacing="4" fill="#4a524f">
          ARABIAN SEA
        </text>

        {markers.map((m) => (
          <g key={m.label} transform={`translate(${m.x} ${m.y})`}>
            {m.main ? <circle r="14" fill="#c9784a" fillOpacity="0.18" className="map-pulse" /> : null}
            <circle r={m.main ? 6 : 4.5} fill={m.main ? "#c9784a" : "#121a19"} />
            <text x={m.dx} y={m.dy} fontSize={m.main ? 15 : 13} fontWeight={m.main ? 600 : 500} letterSpacing={m.main ? 3 : 0} fill="#121a19">
              {m.label}
            </text>
            <text x={m.dx} y={m.dy + 16} fontSize="11.5" fill="#4a524f">
              {m.sub}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="muted mt-3 text-[0.8rem]">Not to scale. LUXE and its surroundings are fictional.</figcaption>
    </figure>
  );
}

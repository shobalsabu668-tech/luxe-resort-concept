import type { Suite } from "@/lib/suites";

/**
 * FLOOR PLAN — drawn from the suite's room data, so every plan shares one
 * drawing language and stays true to the size stated beside it.
 */
export function FloorPlan({ suite }: { suite: Suite }) {
  const { plan } = suite;
  const pad = 1.6;
  const unit = 40;
  const W = (plan.w + pad * 2) * unit;
  const H = (plan.d + pad * 2) * unit;
  const x = (m: number) => (m + pad) * unit;

  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`plan-${suite.slug}`} className="h-auto w-full">
        <title id={`plan-${suite.slug}`}>
          {`Floor plan of the ${suite.name}, ${suite.size} square metres: ${plan.rooms.map((r) => r.label.toLowerCase()).join(", ")}. The sea is to the west.`}
        </title>
        <defs>
          <pattern id={`hatch-${suite.slug}`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <path d="M0 4h8" stroke="#121a19" strokeOpacity="0.12" />
          </pattern>
        </defs>

        {plan.rooms.map((r) => {
          const outdoor = /terrace|deck|pool/i.test(r.label);
          return (
            <g key={r.label}>
              <rect
                x={x(r.x)}
                y={x(r.y)}
                width={r.w * unit}
                height={r.d * unit}
                fill={outdoor ? `url(#hatch-${suite.slug})` : "#e8e2d6"}
                stroke="#121a19"
                strokeWidth={outdoor ? 1 : 2.4}
                strokeDasharray={outdoor ? "5 4" : undefined}
              />
              <text x={x(r.x) + (r.w * unit) / 2} y={x(r.y) + (r.d * unit) / 2 + 5} textAnchor="middle" fontSize="15" fill="#121a19">
                {r.label}
              </text>
            </g>
          );
        })}

        {/* Dimension line along the top */}
        <g stroke="#4a524f" strokeWidth="1">
          <path d={`M${x(0)} ${pad * unit * 0.45}H${x(plan.w)}`} />
          <path d={`M${x(0)} ${pad * unit * 0.3}V${pad * unit * 0.6}M${x(plan.w)} ${pad * unit * 0.3}V${pad * unit * 0.6}`} />
        </g>
        <text x={W / 2} y={pad * unit * 0.45 - 8} textAnchor="middle" fontSize="13" fill="#4a524f">
          {plan.w} m
        </text>

        {/* Sea marker, west */}
        <text x={14} y={H / 2} fontSize="12" letterSpacing="3" fill="#4a524f" transform={`rotate(-90 14 ${H / 2})`} textAnchor="middle">
          SEA · WEST
        </text>
      </svg>
      <figcaption className="muted mt-3 flex justify-between text-[0.85rem]">
        <span>Indicative plan</span>
        <span className="t-num">{suite.size} m² inside</span>
      </figcaption>
    </figure>
  );
}

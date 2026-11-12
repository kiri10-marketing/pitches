import geo from "@/lib/mark.json";

// The BuildMap mark: contour lines, a brass route to the summit and a north tick.
// tone "ink" sits on paper; "paper" sits on ink green. `simple` uses three contours for small sizes.
export function Mark({ size = 40, tone = "ink", simple = false, className }: { size?: number; tone?: "ink" | "paper"; simple?: boolean; className?: string }) {
  const line = tone === "ink" ? "#14261F" : "#F3EEE2";
  const brass = tone === "ink" ? "#B08A4F" : "#C9A468";
  const paths = simple ? geo.simple : geo.paths;
  const id = `mk-${tone}-${simple ? "s" : "f"}`;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} aria-hidden="true">
      <clipPath id={id}>
        <circle cx="60" cy="60" r="50" />
      </clipPath>
      <g clipPath={`url(#${id})`} fill="none" stroke={line} strokeWidth={simple ? 4.2 : 2} strokeLinecap="round">
        {paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <circle cx="60" cy="60" r="54" fill="none" stroke={line} strokeWidth={simple ? 4.8 : 2.6} />
      <path d="M60 0.5L64.6 9.5H55.4Z" fill={brass} />
      <path d={geo.route} fill="none" stroke={brass} strokeWidth={simple ? 5.6 : 3.4} strokeLinecap="round" />
      <path d="M66 42.6L72 53H60Z" fill={brass} />
    </svg>
  );
}

export function Logo({ tone = "ink", size = 40 }: { tone?: "ink" | "paper"; size?: number }) {
  return (
    <span className="flex items-center gap-3">
      <Mark size={size} tone={tone} simple={size < 48} />
      <span className="font-[family-name:var(--font-head)] leading-none tracking-[0.02em]" style={{ fontSize: size * 0.72 }}>
        BuildMap
      </span>
    </span>
  );
}

// Faint contour field used behind dark sections.
export function Contours({ className }: { className?: string }) {
  return (
    <svg viewBox="-20 -30 170 170" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="0.35">
        {geo.paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
        {[1.5, 1.85, 2.25].map((s) => (
          <path key={s} d={geo.paths[4]} transform={`translate(${66 - 66 * s} ${50 - 50 * s}) scale(${s})`} strokeWidth={0.35 / s} />
        ))}
      </g>
    </svg>
  );
}

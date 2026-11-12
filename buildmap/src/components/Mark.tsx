import geo from "@/lib/mark.json";

// The BuildMap mark: contour lines, a blue route to the summit and a north tick.
// tone "ink" sits on light grounds; "paper" sits on navy or blue. `simple` uses three contours for small sizes.
export function Mark({ size = 40, tone = "ink", simple = false, className }: { size?: number; tone?: "ink" | "paper"; simple?: boolean; className?: string }) {
  const line = tone === "ink" ? "#0B1B33" : "#FFFFFF";
  const route = tone === "ink" ? "#1257D6" : "#7FB0FF";
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
      <path d="M60 0.5L64.6 9.5H55.4Z" fill={route} />
      <path d={geo.route} fill="none" stroke={route} strokeWidth={simple ? 5.6 : 3.4} strokeLinecap="round" />
      <path d="M66 42.6L72 53H60Z" fill={route} />
    </svg>
  );
}

export function Logo({ tone = "ink", size = 36 }: { tone?: "ink" | "paper"; size?: number }) {
  return (
    <span className="flex items-center gap-2.5">
      <Mark size={size} tone={tone} simple={size < 48} />
      <span className="font-semibold leading-none tracking-[-0.03em]" style={{ fontSize: size * 0.66 }}>
        BuildMap
      </span>
    </span>
  );
}

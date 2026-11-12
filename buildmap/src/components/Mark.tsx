import logo from "@/lib/logo.json";

// The BuildMap mark: three map layers (the three levels of report) under a two-shade roof
// that points up like an arrow tip (the finished project).
// tone "ink" sits on light grounds; "paper" sits on navy. `simple` is accepted for older call sites.
export function Mark({ size = 40, tone = "ink", className }: { size?: number; tone?: "ink" | "paper"; simple?: boolean; className?: string }) {
  const p = tone === "ink" ? logo.light : logo.dark;
  return (
    <svg width={size} height={size} viewBox={logo.vb} className={className} aria-hidden="true">
      <path d={logo.roofL} fill={p.deep} />
      <path d={logo.roofR} fill={p.sky} />
      <path d={logo.layers[0]} fill={p.l1} />
      <path d={logo.layers[1]} fill={p.l2} />
      <path d={logo.layers[2]} fill={p.l3} />
    </svg>
  );
}

export function Logo({ tone = "ink", size = 36 }: { tone?: "ink" | "paper"; size?: number }) {
  return (
    <span className="flex items-center gap-2">
      <Mark size={size} tone={tone} />
      <span className="font-semibold leading-none tracking-[-0.03em]" style={{ fontSize: size * 0.68 }}>
        Build<span className={tone === "ink" ? "text-blue" : "text-blue-light"}>Map</span>
      </span>
    </span>
  );
}

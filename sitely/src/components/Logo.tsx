import Link from "next/link";

export function Mark({ className = "h-8 w-8" }: { className?: string }) {
  // Simple site-boundary mark: a lot outline with a survey peg.
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="1" y="1" width="30" height="30" rx="8" fill="currentColor" />
      <path d="M9 22V12l7-4 7 4v10z" fill="none" stroke="#e3a72f" strokeWidth="2.4" strokeLinejoin="round" />
      <circle cx="16" cy="16.5" r="2.4" fill="#e3a72f" />
    </svg>
  );
}

export function Logo({ product, href, light = false }: { product?: string; href: string; light?: boolean }) {
  const sub = product?.replace(/^Sitely\s*/, "");
  return (
    <Link href={href} className={`flex items-center gap-2.5 ${light ? "text-white" : "text-green"}`}>
      <Mark className={`h-9 w-9 shrink-0 ${light ? "text-green-2" : "text-green"}`} />
      <span className="whitespace-nowrap font-[family-name:var(--font-head)] text-2xl font-extrabold tracking-tight">
        Sitely
        {sub && <span className={`ml-1.5 hidden text-base font-semibold min-[420px]:inline ${light ? "text-mint" : "text-gold-dark"}`}>{sub}</span>}
      </span>
    </Link>
  );
}

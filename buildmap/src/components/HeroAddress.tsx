"use client";

import { useEffect, useState } from "react";
import { copy } from "@/content/copy";
import { Mark } from "@/components/Mark";

// The header visual: a sample address types itself into a floating bar, then the site is found on the land behind.
const ADDRESS = copy.demo.address;

export function HeroAddress() {
  const [chars, setChars] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setChars(ADDRESS.length);
    if (chars >= ADDRESS.length) return;
    const t = window.setTimeout(() => setChars((c) => c + 1), chars === 0 ? 900 : 46 + (chars % 5 === 0 ? 40 : 0));
    return () => window.clearTimeout(t);
  }, [chars]);
  const typed = chars >= ADDRESS.length;

  return (
    <div className="relative flex flex-1 flex-col items-center">
      <p className="sr-only">{copy.demo.alt}</p>
      <a href="#start" aria-label={copy.hero.cta} className="mt-8 flex w-[min(92vw,38rem)] items-center gap-3 rounded-full bg-white/95 p-2 pl-4 text-left text-ink shadow-[0_30px_70px_-24px_rgba(11,27,51,.6)] ring-1 ring-ink/5 backdrop-blur transition-transform hover:scale-[1.015] sm:mt-10 sm:gap-4 sm:p-2.5 sm:pl-6">
        <Mark size={30} simple className="shrink-0" />
        <span className="min-w-0 flex-1 truncate text-[1.02rem] font-medium tracking-[-0.02em] sm:text-2xl" aria-hidden="true">
          {chars === 0 ? <span className="text-muted">{copy.demo.placeholder}</span> : ADDRESS.slice(0, chars)}
          {!typed && <span className="caret" />}
        </span>
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors sm:h-14 sm:w-14 ${typed ? "bg-blue" : "bg-blue/35"}`}>
          <svg viewBox="0 0 16 16" width="42%" height="42%" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M2 8h11M9 3.5L13.5 8 9 12.5" />
          </svg>
        </span>
      </a>

      {/* The site, found on the paddock */}
      <div className="pointer-events-none absolute left-1/2 top-[40%] w-[min(64vw,calc((100svh_-_26rem)*1.25),30rem)] -translate-x-1/2 sm:top-[34%]" aria-hidden="true">
        {typed && (
          <>
            <svg viewBox="0 0 200 100" className="block w-full overflow-visible">
              <path d="M52 34 L150 30 L186 88 L18 94 Z" fill="rgba(18,87,214,.2)" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" pathLength={1} className="draw" />
              <g className="pop" style={{ animationDelay: ".25s" }}>
                <ellipse cx="102" cy="64" rx="9" ry="3" fill="rgba(11,27,51,.35)" />
                <path d="M102 62 C90 44 86 38 86 30 a16 16 0 0 1 32 0 c0 8 -4 14 -16 32 Z" fill="#1257D6" stroke="#fff" strokeWidth="2" />
                <circle cx="102" cy="30" r="6" fill="#fff" />
              </g>
            </svg>
            <div className="pop mt-3 flex justify-center" style={{ animationDelay: ".9s" }}>
              <span className="flex items-center gap-2 rounded-full bg-ink/85 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-blue-light" />
                {copy.demo.screens.found}
              </span>
            </div>
          </>
        )}
      </div>

      <a href="#journey" className="group mt-auto mb-7 flex flex-col items-center gap-2 text-sm font-semibold tracking-[0.18em] text-white uppercase [text-shadow:0_1px_12px_rgba(11,27,51,.7)]">
        {copy.hero.scroll}
        <span className="cue flex h-11 w-7 justify-center rounded-full border border-white/80 pt-2">
          <span className="h-2 w-[3px] rounded-full bg-white" />
        </span>
      </a>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import geo from "@/lib/mark.json";
import { copy } from "@/content/copy";

// The header product demo: an address is typed into the box, then the route is drawn across the
// map through concept, consents, construction and completion. A sample address, never a real one.
const ADDRESS = copy.demo.address;
const SEGS = [
  "M40 236C76 233 112 224 150 202",
  "M150 202C181 185 206 188 246 166",
  "M246 166C281 148 301 143 331 121",
  "M331 121C353 107 376 105 399 95",
];
const STOPS = [
  [150, 202],
  [246, 166],
  [331, 121],
  [399, 95],
];
const TYPE_MS = 65;
const STAGE_MS = 3400;

export function HeroDemo() {
  const stages = copy.demo.stages;
  const [chars, setChars] = useState(0);
  const [stage, setStage] = useState(0); // 0 = typing, 1 to 4 = stages
  const [playing, setPlaying] = useState(true);

  // People who prefer reduced motion get the finished map, not the animation.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(false);
      setChars(ADDRESS.length);
      setStage(4);
    }
  }, []);

  useEffect(() => {
    if (!playing) return;
    let wait: number;
    let next: () => void;
    if (stage === 0 && chars < ADDRESS.length) {
      wait = chars === 0 ? 900 : TYPE_MS;
      next = () => setChars((c) => c + 1);
    } else if (stage === 0) {
      wait = 700;
      next = () => setStage(1);
    } else if (stage < 4) {
      wait = STAGE_MS;
      next = () => setStage((s) => s + 1);
    } else {
      wait = STAGE_MS + 1800;
      next = () => {
        setChars(0);
        setStage(0);
      };
    }
    const t = window.setTimeout(next, wait);
    return () => window.clearTimeout(t);
  }, [chars, stage, playing]);

  const jump = (n: number) => {
    setPlaying(false);
    setChars(ADDRESS.length);
    setStage(n);
  };
  const current = stage > 0 ? stages[stage - 1] : null;
  const typing = stage === 0;

  return (
    <div className="bg-paper text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,.6)]" style={{ outline: "1px solid rgba(243,238,226,.35)", outlineOffset: 6 }}>
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted">
        <span>{copy.demo.sheet}</span>
        <button
          type="button"
          onClick={() => {
            if (!playing && stage === 4) {
              setChars(0);
              setStage(0);
            }
            setPlaying((p) => !p);
          }}
          className="-my-2 flex min-h-11 items-center gap-2 px-1 uppercase tracking-[0.18em] hover:text-ink"
          aria-label={playing ? "Pause the demo" : "Play the demo"}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" fill="currentColor">
            {playing ? <path d="M1 0h3v10H1zM6 0h3v10H6z" /> : <path d="M1 0l9 5-9 5z" />}
          </svg>
          {playing ? "Pause" : "Play"}
        </button>
      </div>

      {/* The address box */}
      <div className="flex items-stretch gap-2 px-4 pt-4">
        <div className="flex min-h-12 min-w-0 flex-1 items-center gap-2.5 border border-ink/70 bg-card px-3 text-[0.9rem] sm:text-base" aria-hidden="true">
          <svg width="14" height="18" viewBox="0 0 14 18" className="shrink-0 text-brass-dark" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 17C7 17 13 11 13 7A6 6 0 0 0 1 7c0 4 6 10 6 10Z" />
            <circle cx="7" cy="7" r="2" />
          </svg>
          <span className="truncate">
            {chars === 0 ? <span className="text-muted">{copy.demo.placeholder}</span> : ADDRESS.slice(0, chars)}
            {typing && <span className="demo-caret" />}
          </span>
        </div>
        <span className={`flex items-center whitespace-nowrap px-3 font-mono text-[0.7rem] sm:px-4 uppercase tracking-[0.14em] transition-colors duration-300 ${typing && chars < ADDRESS.length ? "bg-ink/15 text-ink/60" : "bg-ink text-paper"}`} aria-hidden="true">
          <span className="hidden sm:inline">{copy.demo.button}</span>
          <svg width="16" height="10" viewBox="0 0 16 10" className="sm:hidden" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M0 5h14M10 1l4 4-4 4" /></svg>
        </span>
      </div>
      <p className="sr-only">{copy.demo.alt}</p>

      {/* The map */}
      <div className="px-4 pt-3">
        <svg viewBox="0 0 560 262" className="block w-full border border-line bg-card" aria-hidden="true">
          <defs>
            <clipPath id="demo-clip">
              <rect width="560" height="262" />
            </clipPath>
          </defs>
          <g clipPath="url(#demo-clip)">
            <g fill="none" stroke="#14261F" strokeOpacity=".2" strokeWidth="1" transform="translate(95.4 -135) scale(4.6)">
              {geo.paths.map((d, i) => (
                <path key={i} d={d} vectorEffect="non-scaling-stroke" />
              ))}
              <path d={geo.paths[4]} transform="translate(-19.8 -15) scale(1.3)" vectorEffect="non-scaling-stroke" />
              <path d={geo.paths[4]} transform="translate(-42.9 -32.5) scale(1.65)" vectorEffect="non-scaling-stroke" />
            </g>
          </g>
          {/* Sheet furniture: north arrow, scale bar */}
          <g fill="none" stroke="#55615A" strokeWidth="1">
            <path d="M530 40V18M530 18l-4 7M530 18l4 7" />
            <path d="M22 28h60M22 24v8M52 24v8M82 24v8" />
          </g>
          <text x="530" y="52" textAnchor="middle" fontSize="9" fill="#55615A" style={{ fontFamily: "var(--font-mono)" }}>N</text>
          <text x="22" y="18" fontSize="8" fill="#55615A" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.12em" }}>SAMPLE SITE</text>

          {/* Faint full route, then the drawn route */}
          {SEGS.map((d, i) => (
            <path key={`g${i}`} d={d} fill="none" stroke="#B08A4F" strokeOpacity=".35" strokeWidth="1.5" strokeDasharray="3 5" className={`demo-fade ${stage > 0 ? "on" : ""}`} />
          ))}
          {SEGS.map((d, i) => (
            <path key={i} d={d} pathLength={1} fill="none" stroke="#B08A4F" strokeWidth="4" strokeLinecap="round" className={`demo-seg ${stage > i ? "on" : ""}`} />
          ))}
          {/* The address pin drops where the journey starts */}
          <g className={`demo-fade ${stage > 0 || chars === ADDRESS.length ? "on" : ""}`}>
            <circle cx="40" cy="236" r="7" fill="#14261F" />
            <circle cx="40" cy="236" r="2.5" fill="#F3EEE2" />
          </g>
          {STOPS.map(([x, y], i) => {
            const reached = stage > i;
            const last = i === 3;
            return (
              <g key={i} style={{ transition: "opacity .5s ease 1.1s" }} opacity={reached ? 1 : stage > 0 ? 0.45 : 0}>
                {last ? (
                  <path d={`M${x} ${y - 15}l13 22h-26Z`} fill={reached ? "#B08A4F" : "#FBF8F1"} stroke="#B08A4F" strokeWidth="1.5" />
                ) : (
                  <circle cx={x} cy={y} r="11" fill={reached ? "#14261F" : "#FBF8F1"} stroke="#14261F" strokeWidth="1.5" />
                )}
                <text x={x} y={y + (last ? 3 : 3.5)} textAnchor="middle" fontSize="10" fill={reached ? "#F3EEE2" : "#14261F"} style={{ fontFamily: "var(--font-mono)" }}>
                  {i + 1}
                </text>
              </g>
            );
          })}
          {/* What stands at the summit, stage by stage */}
          <g transform="translate(436 150)">
            <g className={`demo-fade ${stage >= 1 ? "on" : ""}`} fill="none" stroke="#14261F" strokeWidth="1.3">
              <path d="M0 78h96" />
              <path d="M10 78V26l34-16 34 16v52" strokeDasharray={stage === 1 ? "4 4" : "0"} />
            </g>
            <g className={`demo-fade ${stage === 2 ? "on" : ""}`}>
              <circle cx="44" cy="46" r="15" fill="none" stroke="#7C5E2C" strokeWidth="1.5" />
              <path d="M37 46l5 5 9-10" fill="none" stroke="#7C5E2C" strokeWidth="2" />
            </g>
            <g fill="none" stroke="#14261F" strokeWidth="1.3">
              {[62, 46, 30].map((y, i) => (
                <path key={y} d={`M10 ${y}h68M27 ${y}v16M44 ${y}v16M61 ${y}v16`} className={`demo-fade ${stage >= 3 ? "on" : ""}`} style={{ transitionDelay: stage === 3 ? `${0.3 + i * 0.5}s` : "0s" }} />
              ))}
            </g>
            <g className={`demo-fade ${stage >= 4 ? "on" : ""}`}>
              <path d="M10 78V26l34-16 34 16v52Z" fill="#14261F" />
              {[32, 48, 64].map((y) => [18, 35, 52, 69].map((x) => <rect key={`${x}-${y}`} x={x - 3} y={y} width="8" height="9" fill="#C9A468" />))}
              <path d="M84 78V44M84 44h15l-4 5 4 5H84" fill="#B08A4F" stroke="#7C5E2C" strokeWidth="1" />
            </g>
          </g>
        </svg>
      </div>

      {/* Stage tabs */}
      <div className="grid grid-cols-4 gap-px px-4 pt-3">
        {stages.map((s, i) => {
          const on = stage === i + 1;
          return (
            <button key={s.name} type="button" onClick={() => jump(i + 1)} aria-pressed={on} className={`min-h-11 border-t-2 pt-2 text-left font-mono text-[0.56rem] uppercase tracking-[0.04em] transition-colors sm:text-[0.68rem] sm:tracking-[0.14em] ${on ? "border-brass text-ink" : stage > i + 1 ? "border-ink/60 text-ink/70" : "border-line text-muted"}`}>
              <span className="block text-brass-dark">0{i + 1}</span>
              {s.name}
            </button>
          );
        })}
      </div>

      {/* What you get at this stage */}
      <div className="min-h-[9.5rem] px-4 pb-5 pt-3" aria-live="off">
        {current ? (
          <div key={stage}>
            <p className="font-[family-name:var(--font-head)] text-[1.45rem] leading-tight">{current.title}</p>
            <ul className="mt-2 space-y-0.5 text-[0.95rem] text-ink/85">
              {current.lines.map((l, i) => (
                <DemoLine key={l} delay={300 + i * 550} still={!playing}>
                  {l}
                </DemoLine>
              ))}
            </ul>
            <p className="mt-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-brass-dark">{current.product}</p>
          </div>
        ) : (
          <p className="pt-1 text-[0.95rem] text-muted">{copy.demo.idle}</p>
        )}
      </div>
    </div>
  );
}

function DemoLine({ children, delay, still }: { children: React.ReactNode; delay: number; still: boolean }) {
  const [on, setOn] = useState(still);
  useEffect(() => {
    if (still) return;
    const t = window.setTimeout(() => setOn(true), delay);
    return () => window.clearTimeout(t);
  }, [delay, still]);
  return (
    <li className={`demo-line flex items-baseline gap-2 ${on ? "on" : ""}`}>
      <svg width="11" height="9" viewBox="0 0 11 9" className="shrink-0 text-brass-dark" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M1 4.5l3 3 6-6.5" />
      </svg>
      {children}
    </li>
  );
}

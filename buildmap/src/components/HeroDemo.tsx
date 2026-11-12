"use client";

import { useEffect, useRef, useState } from "react";
import geo from "@/lib/mark.json";
import { copy } from "@/content/copy";
import { Mark } from "@/components/Mark";

// The header product demo. A sample address is typed on a laptop; the laptop spins and a new screen
// arrives for each stage: concept, consents, construction, completion. The timeline runs along the bottom.
const ADDRESS = copy.demo.address;
const TYPE_MS = 42;
const STAGE_MS = 2500;
const SPIN_MS = 700;
const KEYS = 4 * 13;
const u = (n: number) => `${(n * 1.2).toFixed(2)}cqw`; // sizes scale with the laptop screen

export function HeroDemo() {
  const stages = copy.demo.stages;
  const [chars, setChars] = useState(0);
  const [stage, setStage] = useState(0); // where the timeline is: 0 = typing, 1 to 4 = stages
  const [shown, setShown] = useState(0); // what the screen shows (changes halfway through a spin)
  const [spin, setSpin] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [key, setKey] = useState(-1);
  const swap = useRef<number | undefined>(undefined);

  const go = (n: number, animate = true) => {
    window.clearTimeout(swap.current);
    setStage(n);
    if (!animate) return setShown(n);
    setSpin((s) => s + 1);
    swap.current = window.setTimeout(() => setShown(n), SPIN_MS / 2);
  };

  // People who prefer reduced motion get the finished screen, not the animation.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(false);
      setChars(ADDRESS.length);
      setStage(4);
      setShown(4);
    }
    return () => window.clearTimeout(swap.current);
  }, []);

  useEffect(() => {
    if (!playing) return;
    let wait: number;
    let next: () => void;
    if (stage === 0 && chars < ADDRESS.length) {
      wait = chars === 0 ? 700 : TYPE_MS + (chars % 5 === 0 ? 40 : 0);
      next = () => {
        setChars((c) => c + 1);
        setKey(Math.floor(Math.random() * KEYS));
      };
    } else if (stage === 0) {
      wait = 450;
      next = () => go(1);
    } else if (stage < 4) {
      wait = STAGE_MS;
      next = () => go(stage + 1);
    } else {
      wait = STAGE_MS + 1600;
      next = () => {
        setChars(0);
        go(0);
      };
    }
    const t = window.setTimeout(next, wait);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chars, stage, playing]);

  const jump = (n: number) => {
    setPlaying(false);
    setChars(ADDRESS.length);
    go(n);
  };

  return (
    <div>
      <p className="sr-only">{copy.demo.alt}</p>

      {/* The laptop */}
      <div className="stage3d mx-auto" style={{ width: "min(92vw, 760px, max(300px, calc((100svh - 30rem) * 1.6)))" }} aria-hidden="true">
        <div key={spin} className={`laptop relative ${spin ? "spin" : ""}`}>
          <div className="relative">
            <div className="lid rounded-[2.6%/4.2%] bg-ink p-[1.6%] shadow-[0_40px_80px_-30px_rgba(11,27,51,.45)]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.4%/2.2%] bg-white" style={{ containerType: "inline-size" }}>
                <Screen shown={shown} chars={chars} />
              </div>
            </div>
            <div className="lid-back flex items-center justify-center rounded-[2.6%/4.2%] bg-gradient-to-br from-[#dfe5ee] to-[#b9c3d2]">
              <Mark size={72} simple />
            </div>
          </div>
          {/* Keyboard deck */}
          <div className="absolute left-[-4%] top-full h-[52%] w-[108%] origin-top rounded-b-[3%/8%] bg-gradient-to-b from-[#e3e8f0] to-[#c9d1dd] p-[2.4%_7%_0]" style={{ transform: "rotateX(74deg)" }}>
            <div className="grid grid-cols-13 gap-[0.9%]" style={{ gridTemplateColumns: "repeat(13, 1fr)" }}>
              {Array.from({ length: KEYS }, (_, i) => (
                <span key={i === key ? `${i}-${chars}` : i} className={`aspect-[1.25] rounded-[18%] bg-[#cfd6e2] ${i === key && stage === 0 ? "key" : ""}`} />
              ))}
            </div>
            <div className="mx-auto mt-[2%] h-[26%] w-[34%] rounded-[6%] bg-[#d5dbe6]" />
          </div>
        </div>
      </div>

      {/* The timeline, along the bottom of the banner */}
      <div className="mx-auto mt-[clamp(3rem,9vw,5rem)] max-w-5xl px-4 sm:px-6">
        <ol className="grid grid-cols-4 gap-1.5 sm:gap-3">
          {stages.map((s, i) => {
            const n = i + 1;
            return (
              <li key={s.name}>
                <button type="button" onClick={() => jump(n)} aria-pressed={stage === n} className="group block w-full text-left">
                  <span className="block h-1 overflow-hidden rounded-full bg-line">
                    <span className="tl-fill block h-full rounded-full bg-blue" style={{ width: stage >= n ? "100%" : "0%" }} />
                  </span>
                  <span className={`mt-3 block text-[0.8rem] font-semibold leading-tight tracking-[-0.01em] transition-colors sm:text-lg ${stage >= n ? "text-ink" : "text-muted"} group-hover:text-blue`}>
                    <span className={`mr-1.5 hidden sm:inline ${stage >= n ? "text-blue" : ""}`}>0{n}</span>
                    {s.name}
                  </span>
                  <span className="mt-0.5 hidden text-sm text-muted sm:block">{s.time}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={() => {
              if (!playing && stage === 4) {
                setChars(0);
                go(0, false);
              }
              setPlaying((p) => !p);
            }}
            className="flex min-h-11 items-center gap-2 text-sm font-semibold text-muted hover:text-ink"
            aria-label={playing ? "Pause the demo" : "Play the demo"}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" fill="currentColor">
              {playing ? <path d="M1 0h3v10H1zM6 0h3v10H6z" /> : <path d="M1 0l9 5-9 5z" />}
            </svg>
            {playing ? "Pause" : "Play"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Tick({ size = 2.2 }: { size?: number }) {
  return (
    <span className="flex shrink-0 items-center justify-center rounded-full bg-blue text-white" style={{ width: u(size), height: u(size) }}>
      <svg viewBox="0 0 12 12" width="60%" height="60%" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2.5 6.2l2.4 2.4 4.6-5" />
      </svg>
    </span>
  );
}

function Screen({ shown, chars }: { shown: number; chars: number }) {
  const s = copy.demo.screens;
  const name = shown > 0 ? copy.demo.stages[shown - 1].name : null;
  return (
    <div className="absolute inset-0 flex flex-col text-ink">
      {/* App bar */}
      <div className="flex items-center justify-between border-b border-line" style={{ padding: `${u(1.3)} ${u(2.4)}`, fontSize: u(1.75) }}>
        <span className="flex items-center font-semibold tracking-[-0.03em]" style={{ gap: u(0.9) }}>
          <span style={{ width: u(3), height: u(3) }} className="block">
            <Mark size={24} simple className="h-full w-full" />
          </span>
          BuildMap
        </span>
        <span className="flex items-center text-muted" style={{ gap: u(1.2) }}>
          {name && <span className="truncate">{ADDRESS}</span>}
          <span className="rounded-full bg-blue-soft font-semibold text-blue" style={{ padding: `${u(0.3)} ${u(1.2)}` }}>{name ?? s.sample}</span>
        </span>
      </div>

      <div key={shown} className="relative flex-1" style={{ padding: u(3) }}>
        {shown === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="font-semibold tracking-[-0.035em]" style={{ fontSize: u(4.6), lineHeight: 1.05 }}>{s.ask}</p>
            <div className="flex w-[78%] items-center rounded-full bg-field" style={{ marginTop: u(3), padding: u(0.9), paddingLeft: u(2.6), fontSize: u(2.7) }}>
              <span className="flex-1 truncate text-left">
                {chars === 0 ? <span className="text-muted">{copy.demo.placeholder}</span> : ADDRESS.slice(0, chars)}
                <span className="caret" />
              </span>
              <span className={`flex items-center justify-center rounded-full text-white transition-colors ${chars < ADDRESS.length ? "bg-blue/35" : "bg-blue"}`} style={{ width: u(5.4), height: u(5.4) }}>
                <svg viewBox="0 0 16 16" width="45%" height="45%" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 8h11M9 3.5L13.5 8 9 12.5" />
                </svg>
              </span>
            </div>
          </div>
        )}

        {shown === 1 && (
          <div className="grid h-full grid-cols-[1.25fr_1fr]" style={{ gap: u(2.4) }}>
            <div className="pop relative overflow-hidden bg-paper-2" style={{ borderRadius: u(2) }}>
              <svg viewBox="0 0 120 96" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                <g fill="none" stroke="#0B1B33" strokeOpacity=".16" strokeWidth=".6" transform="translate(-6 -2)">
                  {geo.paths.map((d, i) => (
                    <path key={i} d={d} />
                  ))}
                </g>
                <path d="M48 34l30-6 8 26-31 9Z" fill="#1257D6" fillOpacity=".14" stroke="#1257D6" strokeWidth="1.2" pathLength={1} className="draw" />
                <circle cx="66" cy="46" r="3.2" fill="#1257D6" />
                <circle cx="66" cy="46" r="1.2" fill="#fff" />
              </svg>
            </div>
            <div className="flex flex-col justify-center" style={{ gap: u(1.5) }}>
              <p className="font-semibold tracking-[-0.03em]" style={{ fontSize: u(3.3), lineHeight: 1.1 }}>{s.concept.title}</p>
              {s.concept.cards.map((c, i) => (
                <div key={c.k} className="pop flex items-center bg-paper-2" style={{ animationDelay: `${0.25 + i * 0.3}s`, gap: u(1.4), padding: `${u(1.3)} ${u(1.6)}`, borderRadius: u(1.6) }}>
                  <Tick />
                  <span style={{ lineHeight: 1.2 }}>
                    <span className="block text-muted" style={{ fontSize: u(1.55) }}>{c.k}</span>
                    <span className="block font-semibold" style={{ fontSize: u(2.05) }}>{c.v}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {shown === 2 && (
          <div className="flex h-full flex-col justify-center">
            <div className="flex items-center justify-between">
              <p className="font-semibold tracking-[-0.03em]" style={{ fontSize: u(3.3) }}>{s.consents.title}</p>
              <span className="pop rounded-full bg-blue font-semibold text-white" style={{ animationDelay: "1.5s", fontSize: u(1.7), padding: `${u(0.6)} ${u(1.6)}` }}>{s.consents.result}</span>
            </div>
            <ul style={{ marginTop: u(1.8) }}>
              {s.consents.rules.map((r, i) => (
                <li key={r.k} className="pop flex items-center justify-between border-b border-line" style={{ animationDelay: `${0.15 + i * 0.25}s`, padding: `${u(1.25)} 0`, fontSize: u(2.05) }}>
                  <span className="flex items-center" style={{ gap: u(1.4) }}>
                    {r.ok ? <Tick /> : <span className="shrink-0 rounded-full border-2 border-ink" style={{ width: u(2.2), height: u(2.2) }} />}
                    {r.k}
                  </span>
                  <span className={r.ok ? "text-muted" : "font-semibold"}>{r.v}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {shown === 3 && (
          <div className="grid h-full grid-cols-[1.7fr_1fr] items-center" style={{ gap: u(2.6) }}>
            <div>
              <p className="font-semibold tracking-[-0.03em]" style={{ fontSize: u(3.3) }}>{s.construction.title}</p>
              <ul style={{ marginTop: u(1.6) }}>
                {s.construction.rows.map((r, i) => (
                  <li key={r.k} className="grid grid-cols-[30%_1fr] items-center" style={{ fontSize: u(1.8), padding: `${u(0.8)} 0` }}>
                    <span className="text-muted">{r.k}</span>
                    <span className="block bg-paper-2" style={{ height: u(2.2), borderRadius: u(1.1) }}>
                      <span className="grow block h-full bg-blue" style={{ marginLeft: `${r.from}%`, width: `${r.len}%`, borderRadius: u(1.1), animationDelay: `${0.15 + i * 0.22}s`, opacity: 1 - i * 0.12 }} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col" style={{ gap: u(1.5) }}>
              {s.construction.cards.map((c, i) => (
                <div key={c} className="pop flex items-center bg-paper-2 font-semibold" style={{ animationDelay: `${0.9 + i * 0.3}s`, gap: u(1.3), padding: `${u(1.5)} ${u(1.6)}`, borderRadius: u(1.6), fontSize: u(2) }}>
                  <Tick />
                  {c}
                </div>
              ))}
            </div>
          </div>
        )}

        {shown === 4 && (
          <div className="flex h-full flex-col justify-center">
            <p className="font-semibold tracking-[-0.03em]" style={{ fontSize: u(3.3) }}>{s.completion.title}</p>
            <div className="grid grid-cols-[1.5fr_1fr_1fr]" style={{ gap: u(2), marginTop: u(1.8) }}>
              {/* Website */}
              <div className="pop overflow-hidden border border-line bg-white" style={{ borderRadius: u(1.6), animationDelay: ".1s" }}>
                <div className="flex bg-paper-2" style={{ gap: u(0.6), padding: u(0.9) }}>
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="rounded-full bg-line" style={{ width: u(1), height: u(1) }} />
                  ))}
                </div>
                <div className="relative bg-ink" style={{ height: u(13) }}>
                  <svg viewBox="0 0 100 50" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMax slice">
                    <path d="M0 50V34l16-6v22ZM22 50V18l26-8 26 8v32ZM80 50V30l20-5v25Z" fill="#14294A" />
                    {[24, 32, 40].map((y) => [29, 38, 47, 56, 65].map((x) => <rect key={`${x}${y}`} x={x - 2} y={y} width="4" height="5" fill="#7FB0FF" />))}
                  </svg>
                </div>
                <div className="flex items-center justify-between" style={{ padding: u(1.2), fontSize: u(1.55) }}>
                  <span className="font-semibold">{s.completion.assets[0]}</span>
                  <span className="rounded-full bg-blue text-white" style={{ padding: `${u(0.3)} ${u(1.1)}` }}>{s.completion.cta}</span>
                </div>
              </div>
              {/* Brochure */}
              <div className="pop flex flex-col bg-paper-2" style={{ borderRadius: u(1.6), padding: u(1.4), animationDelay: ".4s" }}>
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-[18%] w-[62%] rotate-6 border border-line bg-white" style={{ borderRadius: u(0.6) }} />
                  <span className="absolute inset-y-0 left-[12%] flex w-[62%] -rotate-3 flex-col border border-line bg-white" style={{ borderRadius: u(0.6), padding: u(1), gap: u(0.7) }}>
                    <span className="block flex-1 bg-ink" style={{ borderRadius: u(0.4) }} />
                    <span className="block w-4/5 bg-line" style={{ height: u(0.7) }} />
                    <span className="block w-3/5 bg-line" style={{ height: u(0.7) }} />
                  </span>
                </div>
                <span className="font-semibold" style={{ fontSize: u(1.55), marginTop: u(1.2) }}>{s.completion.assets[1]}</span>
              </div>
              {/* Marketing assets */}
              <div className="pop flex flex-col bg-paper-2" style={{ borderRadius: u(1.6), padding: u(1.4), animationDelay: ".7s" }}>
                <div className="grid flex-1 grid-cols-2" style={{ gap: u(0.8) }}>
                  {["bg-blue", "bg-ink", "bg-blue-light", "bg-blue"].map((c, i) => (
                    <span key={i} className={`block ${c}`} style={{ borderRadius: u(0.8), opacity: i === 3 ? 0.35 : 1 }} />
                  ))}
                </div>
                <span className="font-semibold" style={{ fontSize: u(1.55), marginTop: u(1.2) }}>{s.completion.assets[2]}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

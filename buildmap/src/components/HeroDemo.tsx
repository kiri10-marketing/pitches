"use client";

import { useEffect, useRef, useState } from "react";
import { copy } from "@/content/copy";
import { Mark } from "@/components/Mark";

// The header product demo. A sample address is typed on a laptop; the laptop spins and a new screen
// arrives for each stage. Concept shows real concept plans arriving page by page; completion plays a
// recording of the real project website built from them. The timeline runs along the bottom.
const ADDRESS = copy.demo.address;
const TYPE_MS = 42;
// Completion has three beats: a short build timer, the website (the main event), then the marketing assets.
const BUILD_MS = 2600;
const SITE_MS = 17400; // the length of the website recording
const ASSETS_MS = 5200;
const PLAN_PAGES = [1, 3, 4, 6, 7].map((n) => `/demo/plan-${n}.webp`); // the most visual pages only
const PAGE_NO = [1, 5, 6, 14, 19]; // the page of the report each image is
const PAGE_MS = 1250;
const STAGE_MS = [0, PLAN_PAGES.length * PAGE_MS + 900, 2300, 2300, BUILD_MS + SITE_MS + ASSETS_MS]; // how long each stage stays up
const BROCHURE = [1, 2, 3].map((n) => `/demo/brochure-${n}.webp`);
const ADS = [1, 2, 3, 4].map((n) => `/demo/ad-${n}.webp`);
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
      wait = STAGE_MS[stage];
      next = () => go(stage + 1);
    } else {
      wait = STAGE_MS[4];
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
      <div className="stage3d mx-auto" style={{ width: "min(92vw, 760px, max(300px, calc((100svh - 32.5rem) * 1.6)))" }} aria-hidden="true">
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
      <div className="mx-auto mt-[clamp(3rem,9vw,5rem)] max-w-5xl px-3 sm:px-6">
        <ol className="grid grid-cols-4 gap-1.5 rounded-[22px] bg-white/90 p-3 shadow-[0_8px_30px_-12px_rgba(11,27,51,.35)] backdrop-blur sm:gap-3 sm:p-5">
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
            className="flex min-h-11 items-center gap-2 rounded-full bg-white/90 px-4 text-sm font-semibold text-ink shadow-[0_4px_16px_-8px_rgba(11,27,51,.4)] backdrop-blur hover:text-blue"
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

// The concept plans, arriving one page at a time like a report being opened.
function Plans() {
  const s = copy.demo.screens.plans;
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setPage((p) => Math.min(p + 1, PLAN_PAGES.length - 1)), PAGE_MS);
    return () => window.clearInterval(t);
  }, []);
  const last = page === PLAN_PAGES.length - 1;
  return (
    <div className="absolute inset-0 flex bg-field">
      {/* Page thumbnails */}
      <div className="flex flex-col overflow-hidden border-r border-line bg-white" style={{ width: "13%", padding: u(0.8), gap: u(0.6) }}>
        {PLAN_PAGES.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt="" className="block w-full border transition-opacity duration-200" style={{ borderColor: i === page ? "#1257D6" : "#E2E7EF", borderWidth: u(0.18), opacity: i <= page ? 1 : 0.15 }} />
        ))}
      </div>
      {/* The open page */}
      <div className="relative flex-1">
        <div className="flex items-center justify-between text-muted" style={{ padding: `${u(0.7)} ${u(1.6)}`, fontSize: u(1.45) }}>
          <span className="font-semibold text-ink">{s.file}</span>
          <span className="flex items-center" style={{ gap: u(1) }}>
            {last && <span className="pop rounded-full bg-blue font-semibold text-white" style={{ padding: `${u(0.25)} ${u(1.1)}` }}>{s.ready}</span>}
            {PAGE_NO[page]} {s.of} {s.pages}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center" style={{ top: u(3.6), padding: `0 ${u(1.6)} ${u(1.4)}` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={page} src={PLAN_PAGES[page]} alt="" className="page-in block max-h-full max-w-full bg-white shadow-[0_6px_24px_-8px_rgba(11,27,51,.35)]" />
        </div>
      </div>
    </div>
  );
}

function Screen({ shown, chars }: { shown: number; chars: number }) {
  const s = copy.demo.screens;
  const video = useRef<HTMLVideoElement>(null);
  const [beat, setBeat] = useState(1); // completion: 0 = build timer, 1 = website, 2 = marketing assets
  // The website recording stays loaded. It starts when the build timer finishes, then hands over to the assets.
  useEffect(() => {
    const v = video.current;
    if (shown !== 4 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v?.pause();
      setBeat(1);
      return;
    }
    setBeat(0);
    if (v) v.currentTime = 0;
    const a = window.setTimeout(() => {
      setBeat(1);
      v?.play().catch(() => {});
    }, BUILD_MS);
    const b = window.setTimeout(() => setBeat(2), BUILD_MS + SITE_MS);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [shown]);
  const name = shown > 0 ? copy.demo.stages[shown - 1].name : null;
  return (
    <div className="absolute inset-0 flex flex-col text-ink">
      {/* App bar */}
      <div className="flex items-center justify-between border-b border-line" style={{ padding: `${u(1.3)} ${u(2.4)}`, fontSize: u(1.75) }}>
        <span className="flex items-center font-semibold tracking-[-0.03em]" style={{ gap: u(0.9) }}>
          <span style={{ width: u(3), height: u(3) }} className="block">
            <Mark size={24} simple className="h-full w-full" />
          </span>
          <span>
            Build<span className="text-blue">Map</span>
          </span>
        </span>
        <span className="flex items-center text-muted" style={{ gap: u(1.2) }}>
          {name && <span className="truncate">{ADDRESS}</span>}
          <span className="rounded-full bg-blue-soft font-semibold text-blue" style={{ padding: `${u(0.3)} ${u(1.2)}` }}>{name ?? s.sample}</span>
        </span>
      </div>

      <div className="relative flex-1">
      <div key={shown} className="absolute inset-0" style={{ padding: u(3) }}>
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

        {shown === 1 && <Plans />}

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

      </div>
        {/* The real project website, recorded. Kept mounted so it plays the moment its turn comes. */}
        <div className={`absolute inset-0 bg-ink ${shown === 4 && beat === 1 ? "" : "invisible"}`}>
          <video ref={video} src="/demo/site.mp4" poster="/demo/site-poster.jpg" muted playsInline preload="auto" className="h-full w-full object-cover object-top" />
          <span className="absolute rounded-full bg-white/90 font-semibold text-ink" style={{ left: u(1.2), bottom: u(1.2), padding: `${u(0.35)} ${u(1.2)}`, fontSize: u(1.4) }}>{s.site.label}</span>
        </div>

        {/* A short timer while the plans become a website */}
        {shown === 4 && beat === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white text-center">
            <svg viewBox="0 0 44 44" style={{ width: u(13), height: u(13) }} className="-rotate-90">
              <circle cx="22" cy="22" r="19" fill="none" stroke="#E2E7EF" strokeWidth="3" />
              <circle cx="22" cy="22" r="19" fill="none" stroke="#1257D6" strokeWidth="3" strokeLinecap="round" pathLength={1} className="ring-fill" style={{ animationDuration: `${BUILD_MS - 250}ms` }} />
            </svg>
            <p className="font-semibold tracking-[-0.03em]" style={{ fontSize: u(3.3), marginTop: u(2) }}>{s.build.title}</p>
            <p className="flex text-muted" style={{ fontSize: u(1.7), marginTop: u(0.8), gap: u(1.6) }}>
              {s.build.steps.map((t, i) => (
                <span key={t} className="pop flex items-center" style={{ gap: u(0.6), animationDelay: `${0.3 + i * 0.6}s` }}>
                  <Tick size={1.7} />
                  {t}
                </span>
              ))}
            </p>
          </div>
        )}

        {/* The marketing assets that come with it: brochure pages and ads */}
        {shown === 4 && beat === 2 && (
          <div className="absolute inset-0 flex flex-col bg-paper-2" style={{ padding: `${u(1.8)} ${u(2.4)}` }}>
            <p className="font-semibold tracking-[-0.03em]" style={{ fontSize: u(2.7) }}>{s.assets.title}</p>
            <div className="grid min-h-0 flex-1 grid-cols-[1.25fr_1fr]" style={{ gap: u(2.2), marginTop: u(1.2) }}>
              <div className="relative min-h-0">
                <p className="text-muted" style={{ fontSize: u(1.45) }}>{s.assets.brochure}</p>
                {BROCHURE.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={src} src={src} alt="" className="pop absolute block bg-white shadow-[0_6px_20px_-8px_rgba(11,27,51,.4)]" style={{ width: "74%", left: `${i * 13}%`, top: `${14 + i * 15}%`, animationDelay: `${0.15 + i * 0.3}s` }} />
                ))}
              </div>
              <div className="flex min-h-0 flex-col">
                <p className="text-muted" style={{ fontSize: u(1.45) }}>{s.assets.ads}</p>
                <div className="grid min-h-0 flex-1 grid-cols-2 items-start" style={{ gap: u(1), marginTop: u(0.8) }}>
                  {ADS.map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={src} src={src} alt="" className="pop block max-h-full w-full object-cover object-top shadow-[0_4px_14px_-6px_rgba(11,27,51,.4)]" style={{ aspectRatio: "1", animationDelay: `${0.9 + i * 0.25}s` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Load the plan pages ahead of time so they appear instantly. */}
        <div hidden>
          {[...PLAN_PAGES, ...BROCHURE, ...ADS].map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt="" />
          ))}
        </div>
      </div>
    </div>
  );
}

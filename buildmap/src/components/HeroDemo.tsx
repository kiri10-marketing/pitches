"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { copy } from "@/content/copy";
import { Mark } from "@/components/Mark";

// The header product demo. It is not held in a device: a sample address is typed into a floating bar, the
// site is found on the land behind it, and each stage then flies out across the whole banner. Concept shows
// real concept plans; completion plays a recording of the real project website built from them, with the
// phone view, brochure and ads landing around it. The timeline runs along the bottom.
const ADDRESS = copy.demo.address;
const TYPE_MS = 42;
const FOUND_MS = 1500; // the site outline draws before the first stage
// Completion: a short build timer, then the website (the main event), with the marketing landing around it.
const BUILD_MS = 2600;
const SITE_MS = 17400; // the length of the website recording
const ASSETS_AT = 6500; // how far into the website the brochure and ads arrive
const PLAN_PAGES = [1, 3, 4, 6, 7].map((n) => `/demo/plan-${n}.webp`); // the most visual pages only
const PAGE_NO = [1, 5, 6, 14, 19]; // the page of the report each image is
const PAGE_MS = 1250;
const STAGE_MS = [0, PLAN_PAGES.length * PAGE_MS + 900, 3000, 3000, BUILD_MS + SITE_MS]; // how long each stage stays up
const BROCHURE = [1, 2, 3].map((n) => `/demo/brochure-${n}.webp`);
const ADS = [1, 2, 4].map((n) => `/demo/ad-${n}.webp`);
const s = (n: number) => `calc(var(--u) * ${n})`; // sizes that scale with the whole stage
const u = (n: number) => `${(n * 1.2).toFixed(2)}cqw`; // sizes that scale with the card they sit in
const SHADOW = "shadow-[0_30px_60px_-22px_rgba(11,27,51,.55)]";

export function HeroDemo() {
  const stages = copy.demo.stages;
  const [chars, setChars] = useState(0);
  const [stage, setStage] = useState(0); // 0 = typing, 1 to 4 = stages
  const [playing, setPlaying] = useState(true);

  // People who prefer reduced motion get the finished picture, not the animation.
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
      wait = chars === 0 ? 700 : TYPE_MS + (chars % 5 === 0 ? 40 : 0);
      next = () => setChars((c) => c + 1);
    } else if (stage === 0) {
      wait = FOUND_MS;
      next = () => setStage(1);
    } else if (stage < 4) {
      wait = STAGE_MS[stage];
      next = () => setStage(stage + 1);
    } else {
      wait = STAGE_MS[4];
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

  return (
    <div>
      <p className="sr-only">{copy.demo.alt}</p>

      <div className="hd-wrap mx-auto" aria-hidden="true">
        <div className="hd-stage relative">
          <Scenes stage={stage} chars={chars} />
        </div>
      </div>

      {/* The timeline, along the bottom of the banner */}
      <div className="mx-auto mt-3 max-w-5xl px-3 sm:mt-4 sm:px-6">
        <ol className="grid grid-cols-4 gap-1.5 rounded-[22px] bg-white/90 p-3 shadow-[0_8px_30px_-12px_rgba(11,27,51,.35)] backdrop-blur sm:gap-3 sm:p-5">
          {stages.map((st, i) => {
            const n = i + 1;
            return (
              <li key={st.name}>
                <button type="button" onClick={() => jump(n)} aria-pressed={stage === n} className="group block w-full text-left">
                  <span className="block h-1 overflow-hidden rounded-full bg-line">
                    <span className="tl-fill block h-full rounded-full bg-blue" style={{ width: stage >= n ? "100%" : "0%" }} />
                  </span>
                  <span className={`mt-3 block text-[0.8rem] font-semibold leading-tight tracking-[-0.01em] transition-colors sm:text-lg ${stage >= n ? "text-ink" : "text-muted"} group-hover:text-blue`}>
                    <span className={`mr-1.5 hidden sm:inline ${stage >= n ? "text-blue" : ""}`}>0{n}</span>
                    {st.name}
                  </span>
                  <span className="mt-0.5 hidden text-sm sm:block">
                    <span className="block text-muted line-through decoration-muted/60">{st.usual}</span>
                    <span className={`block font-semibold ${stage >= n ? "text-blue" : "text-ink"}`}>{st.time}</span>
                  </span>
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
                setStage(0);
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

function Tick({ size = 2.2, unit = u }: { size?: number; unit?: (n: number) => string }) {
  return (
    <span className="flex shrink-0 items-center justify-center rounded-full bg-blue text-white" style={{ width: unit(size), height: unit(size) }}>
      <svg viewBox="0 0 12 12" width="60%" height="60%" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2.5 6.2l2.4 2.4 4.6-5" />
      </svg>
    </span>
  );
}

// One free-floating piece: it flies in from a direction, settles at a tilt and then drifts gently.
function Float({ className = "", from = [0, 40], rot = 0, delay = 0, drift = 0, children }: { className?: string; from?: [number, number]; rot?: number; delay?: number; drift?: number; children: ReactNode }) {
  return (
    <div className={`bob absolute ${className}`} style={{ animationDelay: `${-drift}s` }}>
      <div className="fly" style={{ "--fx": `${from[0]}%`, "--fy": `${from[1]}%`, animationDelay: `${delay}s` } as CSSProperties}>
        <div style={{ transform: `rotate(${rot}deg)` }}>{children}</div>
      </div>
    </div>
  );
}

function Shot({ src, className = "" }: { src: string; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" className={`block w-full bg-white ${SHADOW} ${className}`} style={{ borderRadius: s(0.5) }} />;
}

function Chip({ children, tone = "white" }: { children: ReactNode; tone?: "white" | "blue" }) {
  return (
    <span className={`flex items-center whitespace-nowrap rounded-full font-semibold shadow-[0_8px_20px_-8px_rgba(11,27,51,.5)] ${tone === "blue" ? "bg-blue text-white" : "bg-white text-ink"}`} style={{ fontSize: s(1.25), padding: `${s(0.45)} ${s(1.2)}`, gap: s(0.5) }}>
      {children}
    </span>
  );
}

function Clock() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" style={{ width: s(1.2), height: s(1.2) }}>
      <circle cx="6" cy="6" r="4.6" />
      <path d="M6 3.4V6l1.8 1.2" />
    </svg>
  );
}

// A white card that holds a stage's working screen. Its contents scale with the card.
function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`relative aspect-[16/10] overflow-hidden bg-white text-ink ${SHADOW} ${className}`} style={{ containerType: "inline-size", borderRadius: s(1.4) }}>
      <div className="absolute inset-0 flex flex-col justify-center" style={{ padding: `${u(3)} ${u(4.5)}` }}>
        {children}
      </div>
    </div>
  );
}

// The concept plans: the open page turns through the report while other pages fan out beside it.
function Concept() {
  const p = copy.demo.screens.plans;
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setPage((n) => Math.min(n + 1, PLAN_PAGES.length - 1)), PAGE_MS);
    return () => window.clearInterval(t);
  }, []);
  const last = page === PLAN_PAGES.length - 1;
  return (
    <>
      <Float className="left-[1%] top-[64%] z-10 w-[40%] sm:left-[2%] sm:top-[26%] sm:z-0 sm:w-[27%]" from={[120, -20]} rot={-7} delay={0.35} drift={2}>
        <Shot src="/demo/teaser-render.webp" />
      </Float>
      <Float className="right-[2%] top-[58%] z-10 w-[30%] sm:right-[4%] sm:top-[18%] sm:z-0 sm:w-[21%]" from={[-120, -10]} rot={6} delay={0.55} drift={4}>
        <Shot src="/demo/teaser-section.webp" />
      </Float>
      <Float className="left-[9%] top-[15%] w-[82%] sm:left-[29%] sm:top-[15%] sm:w-[42%]" from={[0, 30]} rot={-1}>
        <div className={`relative bg-white ${SHADOW}`} style={{ borderRadius: s(0.6), aspectRatio: "1400 / 990" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={page} src={PLAN_PAGES[page]} alt="" className="page-in absolute inset-0 block h-full w-full" style={{ borderRadius: s(0.6) }} />
        </div>
      </Float>
      <Float className="left-[5%] top-[10%] z-20 sm:left-[24%] sm:top-[11%]" from={[-60, 0]} delay={0.5} drift={1}>
        <Chip>
          {p.file} <span className="font-normal text-muted">{PAGE_NO[page]} {p.of} {p.pages}</span>
        </Chip>
      </Float>
      {last && (
        <Float className="right-[5%] top-[10%] z-20 sm:right-[24%] sm:top-[11%]" from={[60, 0]} drift={3}>
          <Chip tone="blue">
            <Tick size={1.3} unit={s} />
            {p.ready}
          </Chip>
        </Float>
      )}
    </>
  );
}

function Scenes({ stage, chars }: { stage: number; chars: number }) {
  const sc = copy.demo.screens;
  const video = useRef<HTMLVideoElement>(null);
  const [beat, setBeat] = useState(2); // completion: 0 = build timer, 1 = website, 2 = website with the marketing around it
  // The website recording stays loaded. It starts when the build timer finishes; the marketing lands part way through.
  useEffect(() => {
    const v = video.current;
    if (stage !== 4 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v?.pause();
      setBeat(2);
      return;
    }
    setBeat(0);
    if (v) v.currentTime = 0;
    const a = window.setTimeout(() => {
      setBeat(1);
      v?.play().catch(() => {});
    }, BUILD_MS);
    const b = window.setTimeout(() => setBeat(2), BUILD_MS + ASSETS_AT);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [stage]);
  const typed = chars >= ADDRESS.length;
  const st = stage > 0 ? copy.demo.stages[stage - 1] : null;
  const site = stage === 4 && beat > 0;

  return (
    <>
      {/* The site, found on the land behind */}
      {stage === 0 && typed && (
        <div className="absolute left-1/2 top-[52%] w-[70%] -translate-x-1/2 sm:top-[50%] sm:w-[38%]">
          <svg viewBox="0 0 200 100" className="block w-full overflow-visible">
            <path d="M52 34 L150 30 L186 88 L18 94 Z" fill="rgba(18,87,214,.22)" stroke="#fff" strokeWidth="2" strokeLinejoin="round" pathLength={1} className="draw" />
            <g className="pop" style={{ animationDelay: ".15s" }}>
              <ellipse cx="102" cy="64" rx="9" ry="3" fill="rgba(11,27,51,.35)" />
              <path d="M102 62 C90 44 86 38 86 30 a16 16 0 0 1 32 0 c0 8 -4 14 -16 32 Z" fill="#1257D6" stroke="#fff" strokeWidth="2" />
              <circle cx="102" cy="30" r="6" fill="#fff" />
            </g>
          </svg>
          <div className="pop absolute inset-x-0 top-full flex justify-center" style={{ animationDelay: ".7s", marginTop: s(0.6) }}>
            <Chip tone="blue">
              <Tick size={1.3} unit={s} />
              {sc.found}
            </Chip>
          </div>
        </div>
      )}

      {/* The address bar: big while it is typed, then it tucks up to the top and names the stage */}
      <div
        className="hd-bar absolute left-1/2 z-30 w-[94%] sm:w-[58%]"
        style={{ top: stage === 0 ? "30%" : "5%", transform: `translate(-50%, -50%) scale(${stage === 0 ? 1 : "var(--bar)"})` }}
      >
        <div className="flex items-center rounded-full bg-white text-ink shadow-[0_24px_50px_-18px_rgba(11,27,51,.6)] ring-1 ring-ink/5" style={{ padding: s(0.7), paddingLeft: s(1.2), fontSize: s(2.1), gap: s(1) }}>
          <span className="block shrink-0" style={{ width: s(3.4), height: s(3.4) }}>
            <Mark size={24} simple className="h-full w-full" />
          </span>
          <span className="min-w-0 flex-1 truncate text-left font-medium tracking-[-0.02em]">
            {chars === 0 ? <span className="text-muted">{copy.demo.placeholder}</span> : ADDRESS.slice(0, chars)}
            {stage === 0 && <span className="caret" />}
          </span>
          {st ? (
            <span key={stage} className="pop flex shrink-0 items-center rounded-full bg-blue font-semibold text-white" style={{ height: s(4.4), padding: `0 ${s(1.6)}`, fontSize: s(1.7), gap: s(0.6) }}>
              {st.name}
            </span>
          ) : (
            <span className={`flex shrink-0 items-center justify-center rounded-full text-white transition-colors ${typed ? "bg-blue" : "bg-blue/35"}`} style={{ width: s(4.4), height: s(4.4) }}>
              <svg viewBox="0 0 16 16" width="45%" height="45%" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 8h11M9 3.5L13.5 8 9 12.5" />
              </svg>
            </span>
          )}
        </div>
      </div>

      {/* How fast this stage is */}
      {st && (
        <div key={`t${stage}`} className="pop absolute inset-x-0 z-30 flex justify-center" style={{ bottom: "1%", animationDelay: ".6s" }}>
          <Chip>
            <span className="text-blue"><Clock /></span>
            {st.name}: {st.time.toLowerCase()}
          </Chip>
        </div>
      )}

      {stage === 1 && <Concept />}

      {stage === 2 && (
        <>
          <Float className="left-[1%] top-[76%] z-10 w-[54%] sm:left-[1%] sm:top-[30%] sm:z-0 sm:w-[31%]" from={[110, -10]} rot={-5} delay={0.3} drift={2}>
            <Shot src="/demo/teaser-checks.webp" />
          </Float>
          <Float className="right-[1%] top-[70%] z-10 w-[50%] sm:right-[1%] sm:top-[55%] sm:z-0 sm:w-[31%]" from={[-110, -30]} rot={4} delay={0.5} drift={5}>
            <Shot src="/demo/teaser-schedule.webp" />
          </Float>
          <Float className="left-[5%] top-[14%] w-[90%] sm:left-[28%] sm:top-[15%] sm:w-[44%]" from={[0, 30]}>
            <Card>
              <div className="flex items-center justify-between">
                <p className="font-semibold tracking-[-0.03em]" style={{ fontSize: u(3.6) }}>{sc.consents.title}</p>
                <span className="pop rounded-full bg-blue font-semibold text-white" style={{ animationDelay: "1.6s", fontSize: u(1.9), padding: `${u(0.6)} ${u(1.6)}` }}>{sc.consents.result}</span>
              </div>
              <ul style={{ marginTop: u(1.8) }}>
                {sc.consents.rules.map((r, i) => (
                  <li key={r.k} className="pop flex items-center justify-between border-b border-line" style={{ animationDelay: `${0.4 + i * 0.25}s`, padding: `${u(1.5)} 0`, fontSize: u(2.4) }}>
                    <span className="flex items-center" style={{ gap: u(1.4) }}>
                      {r.ok ? <Tick size={2.5} /> : <span className="shrink-0 rounded-full border-2 border-ink" style={{ width: u(2.5), height: u(2.5) }} />}
                      {r.k}
                    </span>
                    <span className={r.ok ? "text-muted" : "font-semibold"}>{r.v}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Float>
        </>
      )}

      {stage === 3 && (
        <>
          <Float className="left-[3%] top-[62%] z-10 w-[28%] sm:left-[5%] sm:top-[20%] sm:z-0 sm:w-[19%]" from={[130, 0]} rot={-6} delay={0.3} drift={2}>
            <Shot src="/demo/plan-6.webp" />
            <div style={{ marginTop: s(-2) }} />
          </Float>
          {sc.construction.cards.map((c, i) => (
            <Float key={c} className={["right-[2%] top-[66%] sm:right-[8%] sm:top-[22%]", "right-[30%] top-[76%] sm:right-[3%] sm:top-[42%]", "right-[4%] top-[84%] sm:right-[10%] sm:top-[62%]"][i] + " z-10"} from={[-160, 0]} rot={[4, -3, 5][i]} delay={0.5 + i * 0.25} drift={i * 2 + 1}>
              <span className="flex items-center whitespace-nowrap bg-white font-semibold text-ink shadow-[0_18px_36px_-14px_rgba(11,27,51,.55)]" style={{ gap: s(0.8), padding: `${s(0.9)} ${s(1.5)}`, borderRadius: s(1.1), fontSize: s(1.6) }}>
                <Tick size={1.8} unit={s} />
                {c}
              </span>
            </Float>
          ))}
          <Float className="left-[5%] top-[14%] w-[90%] sm:left-[28%] sm:top-[15%] sm:w-[44%]" from={[0, 30]}>
            <Card>
              <p className="font-semibold tracking-[-0.03em]" style={{ fontSize: u(3.6) }}>{sc.construction.title}</p>
              <ul style={{ marginTop: u(1.8) }}>
                {sc.construction.rows.map((r, i) => (
                  <li key={r.k} className="grid grid-cols-[24%_1fr] items-center" style={{ fontSize: u(2.3), padding: `${u(1.3)} 0` }}>
                    <span className="text-muted">{r.k}</span>
                    <span className="block bg-paper-2" style={{ height: u(3), borderRadius: u(1.5) }}>
                      <span className="grow block h-full bg-blue" style={{ marginLeft: `${r.from}%`, width: `${r.len}%`, borderRadius: u(1.5), animationDelay: `${0.4 + i * 0.25}s`, opacity: 1 - i * 0.12 }} />
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Float>
        </>
      )}

      {/* A short timer while the plans become a website */}
      {stage === 4 && beat === 0 && (
        <Float className="left-[14%] top-[18%] w-[72%] sm:left-[34%] sm:top-[18%] sm:w-[32%]" from={[0, 20]}>
          <Card>
            <div className="flex flex-col items-center text-center">
              <svg viewBox="0 0 44 44" style={{ width: u(20), height: u(20) }} className="-rotate-90">
                <circle cx="22" cy="22" r="19" fill="none" stroke="#E2E7EF" strokeWidth="3" />
                <circle cx="22" cy="22" r="19" fill="none" stroke="#1257D6" strokeWidth="3" strokeLinecap="round" pathLength={1} className="ring-fill" style={{ animationDuration: `${BUILD_MS - 250}ms` }} />
              </svg>
              <p className="font-semibold tracking-[-0.03em]" style={{ fontSize: u(4.6), marginTop: u(2.4) }}>{sc.build.title}</p>
              <p className="flex text-muted" style={{ fontSize: u(2.5), marginTop: u(1), gap: u(2) }}>
                {sc.build.steps.map((t, i) => (
                  <span key={t} className="pop flex items-center" style={{ gap: u(0.8), animationDelay: `${0.3 + i * 0.6}s` }}>
                    <Tick size={2.4} />
                    {t}
                  </span>
                ))}
              </p>
            </div>
          </Card>
        </Float>
      )}

      {/* The real project website, recorded. Kept mounted so it plays the moment its turn comes. */}
      <div className={`absolute left-[2%] top-[13%] z-10 w-[96%] sm:left-[25%] sm:top-[13%] sm:w-[50%] ${site ? "bob" : "invisible"}`}>
        <div className={site ? "fly" : ""} style={{ "--fx": "0%", "--fy": "18%" } as CSSProperties}>
          <div className="overflow-hidden bg-ink shadow-[0_40px_80px_-24px_rgba(11,27,51,.7)] ring-1 ring-white/20" style={{ borderRadius: s(1.1) }}>
            <div className="flex items-center bg-[#E9EDF3]" style={{ height: s(2.2), padding: `0 ${s(1)}`, gap: s(0.45) }}>
              {["#F26B5E", "#F5BE4F", "#5FC454"].map((c) => (
                <span key={c} className="rounded-full" style={{ width: s(0.75), height: s(0.75), background: c }} />
              ))}
              <span className="mx-auto truncate rounded-full bg-white text-center text-muted" style={{ width: "46%", fontSize: s(1.05), padding: `${s(0.1)} ${s(1)}` }}>{sc.site.label}</span>
            </div>
            <video ref={video} src="/demo/site.mp4" poster="/demo/site-poster.jpg" muted playsInline preload="auto" className="block aspect-[16/10] w-full object-cover object-top" />
          </div>
        </div>
      </div>

      {site && (
        <Float className="right-[1%] top-[40%] z-20 w-[19%] sm:right-auto sm:left-[69.5%] sm:top-[27%] sm:w-[12.5%]" from={[120, 30]} rot={5} delay={0.9} drift={3}>
          <div className="bg-ink shadow-[0_30px_60px_-20px_rgba(11,27,51,.75)]" style={{ padding: s(0.35), borderRadius: s(1.5) }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/demo/site-phone.webp" alt="" className="block w-full" style={{ borderRadius: s(1.2) }} />
          </div>
        </Float>
      )}

      {/* The marketing that comes with it: brochure pages and ads, landing around the website */}
      {stage === 4 && beat === 2 && (
        <>
          {BROCHURE.map((src, i) => (
            <Float key={src} className={["left-[1%] top-[70%] w-[34%] sm:left-[1%] sm:top-[12%] sm:w-[20%]", "hidden sm:block sm:left-[5%] sm:top-[39%] sm:w-[20%]", "hidden sm:block sm:left-[2%] sm:top-[66%] sm:w-[20%]"][i] + " z-20 sm:z-0"} from={[-140, 20]} rot={[-6, 4, -3][i]} delay={i * 0.25} drift={i * 2}>
              <Shot src={src} />
            </Float>
          ))}
          {ADS.map((src, i) => (
            <Float key={src} className={["left-[38%] top-[73%] w-[17%] sm:left-[85%] sm:top-[9%] sm:w-[11%]", "left-[58%] top-[75%] w-[16%] sm:left-[88%] sm:top-[37%] sm:w-[10.5%]", "hidden sm:block sm:left-[83.5%] sm:top-[70%] sm:w-[10.5%]"][i] + " z-20 sm:z-0"} from={[140, 20]} rot={[5, -4, 3][i]} delay={0.7 + i * 0.25} drift={i * 2 + 1}>
              <Shot src={src} />
            </Float>
          ))}
          <Float className="left-[3%] top-[66%] z-30 sm:left-[4%] sm:top-[6%]" from={[-60, 0]} delay={0.5}>
            <Chip>{sc.assets.brochure}</Chip>
          </Float>
          <Float className="left-[44%] top-[66%] z-30 sm:left-auto sm:right-[3%] sm:top-[3%]" from={[60, 0]} delay={1.2}>
            <Chip>{sc.assets.ads}</Chip>
          </Float>
        </>
      )}

      {/* Load the images ahead of time so they appear instantly. */}
      <div hidden>
        {[...PLAN_PAGES, ...BROCHURE, ...ADS, "/demo/site-phone.webp", "/demo/teaser-render.webp", "/demo/teaser-section.webp", "/demo/teaser-checks.webp", "/demo/teaser-schedule.webp"].map((src) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt="" />
        ))}
      </div>
    </>
  );
}

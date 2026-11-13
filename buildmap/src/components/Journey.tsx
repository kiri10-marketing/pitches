"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { copy } from "@/content/copy";

// The vertical timeline. A line runs down the page and fills as you scroll; each milestone lights up as it
// arrives and shows what you get at that stage, using pages from a real BuildMap project (address changed).
const c = (n: number) => `${n}cqw`; // sizes that scale with the visual they sit in
const SHADOW = "shadow-[0_40px_90px_-30px_rgba(0,0,0,.75)]";

export function Journey() {
  const j = copy.journey;
  const list = useRef<HTMLOListElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [fill, setFill] = useState(0);
  const [seen, setSeen] = useState<boolean[]>(j.stages.map(() => false));

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSeen(j.stages.map(() => true));
      setFill(1);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        setFill(Math.min(1, Math.max(0, (window.innerHeight * 0.55 - r.top) / r.height)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const i = Number((e.target as HTMLElement).dataset.i);
          if (e.isIntersecting) setSeen((s) => (s[i] ? s : s.map((v, k) => v || k === i)));
          if (i === j.stages.length - 1) {
            if (e.isIntersecting) video.current?.play().catch(() => {});
            else video.current?.pause();
          }
        });
      },
      { threshold: 0.3 },
    );
    el.querySelectorAll("[data-i]").forEach((n) => io.observe(n));
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
    };
  }, [j.stages]);

  return (
    <section id="journey" className="jr relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70rem_40rem_at_85%_8%,rgba(18,87,214,.22),transparent_60%),radial-gradient(60rem_40rem_at_5%_55%,rgba(127,176,255,.10),transparent_60%),radial-gradient(70rem_40rem_at_90%_95%,rgba(18,87,214,.18),transparent_60%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl pb-10 pt-28 text-center sm:pt-40">
          <p className="jr-eyebrow">{j.eyebrow}</p>
          <h2 className="mt-5 text-[2.6rem] font-medium sm:text-7xl">{j.title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">{j.intro}</p>
        </div>

        <ol ref={list} className="relative">
          {/* The line, and how far along it you are */}
          <span className="absolute bottom-0 left-[11px] top-0 w-px bg-white/12 lg:left-1/2" aria-hidden="true" />
          <span className="absolute left-[11px] top-0 w-px origin-top bg-gradient-to-b from-blue-light via-blue-light to-white lg:left-1/2" style={{ height: `${fill * 100}%` }} aria-hidden="true">
            <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow-[0_0_0_6px_rgba(127,176,255,.18),0_0_30px_6px_rgba(127,176,255,.55)]" />
          </span>

          {j.stages.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={s.name} data-i={i} data-in={seen[i]} className="relative grid items-center gap-10 py-16 pl-11 lg:min-h-[100svh] lg:grid-cols-2 lg:gap-0 lg:py-24 lg:pl-0">
                {/* The milestone marker on the line */}
                <span className="jr-node absolute left-[11px] top-[4.6rem] lg:left-1/2 lg:top-1/2" aria-hidden="true" />

                <div className={`relative ${flip ? "lg:order-2 lg:pl-24" : "lg:pr-24"}`}>
                  <span className="jr-num" aria-hidden="true">0{i + 1}</span>
                  <p className="jr-eyebrow" data-r>{j.labels.milestone} 0{i + 1}</p>
                  <h3 className="mt-4 text-[2.7rem] font-medium leading-[0.98] sm:text-7xl" data-r style={{ "--d": ".08s" } as CSSProperties}>{s.name}</h3>
                  <p className="mt-8 text-sm font-semibold tracking-[0.18em] text-white/45 uppercase" data-r style={{ "--d": ".16s" } as CSSProperties}>{j.labels.get}</p>
                  <p className="mt-2 text-2xl font-medium tracking-[-0.02em] text-white sm:text-[2rem] sm:leading-tight" data-r style={{ "--d": ".2s" } as CSSProperties}>{s.get}</p>
                  <p className="mt-4 max-w-md text-lg text-white/60" data-r style={{ "--d": ".26s" } as CSSProperties}>{s.body}</p>
                  <ul className="mt-7 space-y-3">
                    {s.points.map((pt, k) => (
                      <li key={pt} className="flex items-center gap-3 text-base text-white/85 sm:text-lg" data-r style={{ "--d": `${0.5 + k * 0.32}s`, "--y": "14px" } as CSSProperties}>
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-light/15 text-blue-light ring-1 ring-blue-light/40">
                          <svg viewBox="0 0 12 12" width="60%" height="60%" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M2.5 6.2l2.4 2.4 4.6-5" />
                          </svg>
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <dl className="mt-9 grid max-w-md grid-cols-2 border-t border-white/12 pt-6" data-r style={{ "--d": "1.3s" } as CSSProperties}>
                    <div className="pr-5">
                      <dt className="text-xs font-semibold tracking-[0.16em] text-white/40 uppercase">{j.labels.usual}</dt>
                      <dd className="mt-2 text-base text-white/45 line-through decoration-white/30">{s.usual}</dd>
                    </div>
                    <div className="border-l border-white/12 pl-5">
                      <dt className="text-xs font-semibold tracking-[0.16em] text-blue-light uppercase">{j.labels.buildmap}</dt>
                      <dd className="mt-2 text-3xl font-medium tracking-[-0.03em]">
                        {s.price} {s.priceNote && <span className="block text-sm font-normal tracking-normal text-white/55">{s.priceNote}</span>}
                      </dd>
                      <dd className="mt-1 text-base font-semibold text-blue-light">{s.time}</dd>
                    </div>
                  </dl>
                </div>

                <div className={`relative ${flip ? "lg:order-1 lg:pr-24" : "lg:pl-24"}`} aria-hidden="true">
                  <div className="relative aspect-[5/4] w-full" style={{ containerType: "inline-size" }}>
                    {i === 0 && <Concept />}
                    {i === 1 && <Consent />}
                    {i === 2 && <Construction />}
                    {i === 3 && <Sales video={video} />}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mx-auto max-w-3xl pb-28 pt-16 text-center sm:pb-36">
          <h2 className="text-[2.4rem] font-medium sm:text-6xl">{j.end.title}</h2>
          <a href="#start" className="btn btn-blue mt-9 min-h-14 px-9 text-lg">{j.end.cta}</a>
          <p className="mt-8 text-sm text-white/45">{copy.conceptOnly.short}</p>
        </div>
      </div>
    </section>
  );
}

// One piece of a visual. It rises into place when its milestone arrives, then sits at a slight tilt.
function Piece({ className = "", rot = 0, d = 0, x = 0, children }: { className?: string; rot?: number; d?: number; x?: number; children: ReactNode }) {
  return (
    <div className={`absolute ${className}`} data-r style={{ "--d": `${d}s`, "--x": `${x}px`, "--y": "70px" } as CSSProperties}>
      <div style={{ transform: `rotate(${rot}deg)` }}>{children}</div>
    </div>
  );
}

function Shot({ src }: { src: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" loading="lazy" className={`block w-full bg-white ${SHADOW}`} style={{ borderRadius: c(0.8) }} />;
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center whitespace-nowrap rounded-full bg-white font-semibold text-ink shadow-[0_14px_30px_-10px_rgba(0,0,0,.6)]" style={{ fontSize: c(2.5), padding: `${c(1)} ${c(2.6)}`, gap: c(1.2) }}>
      <span className="rounded-full bg-blue" style={{ width: c(1.4), height: c(1.4) }} />
      {children}
    </span>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className={`bg-white text-ink ${SHADOW}`} style={{ borderRadius: c(3), padding: `${c(5)} ${c(5.5)}` }}>
      {children}
    </div>
  );
}

function Concept() {
  const p = copy.demo.screens.plans;
  return (
    <>
      <Piece className="right-[-2%] top-[0%] w-[34%]" rot={5} d={0.35} x={60}>
        <Shot src="/demo/teaser-section.webp" />
      </Piece>
      <Piece className="left-[4%] top-[10%] w-[80%]" rot={-2} d={0.1}>
        <Shot src="/demo/plan-3.webp" />
      </Piece>
      <Piece className="left-[-5%] top-[56%] w-[48%]" rot={-6} d={0.55} x={-60}>
        <Shot src="/demo/teaser-render.webp" />
      </Piece>
      <Piece className="right-[4%] top-[84%]" d={0.9}>
        <Chip>{p.ready}</Chip>
      </Piece>
    </>
  );
}

function Consent() {
  const s = copy.demo.screens.consents;
  return (
    <>
      <Piece className="left-[-4%] top-[66%] w-[72%]" rot={-4} d={0.5} x={-60}>
        <Shot src="/demo/teaser-checks.webp" />
      </Piece>
      <Piece className="left-[10%] top-[6%] w-[82%]" rot={1.5} d={0.1}>
        <Card>
          <p className="font-semibold tracking-[-0.03em]" style={{ fontSize: c(4.6) }}>{s.title}</p>
          <ul style={{ marginTop: c(2.4) }}>
            {s.rules.map((r, i) => (
              <li key={r.k} className="flex items-center justify-between border-b border-line" data-r style={{ "--d": `${0.5 + i * 0.28}s`, "--y": "10px", padding: `${c(2.1)} 0`, fontSize: c(3.1) } as CSSProperties}>
                <span className="flex items-center" style={{ gap: c(2) }}>
                  <span className={`flex shrink-0 items-center justify-center rounded-full ${r.ok ? "bg-blue text-white" : "border-2 border-ink"}`} style={{ width: c(3.6), height: c(3.6) }}>
                    {r.ok && (
                      <svg viewBox="0 0 12 12" width="60%" height="60%" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2.5 6.2l2.4 2.4 4.6-5" />
                      </svg>
                    )}
                  </span>
                  {r.k}
                </span>
                <span className={r.ok ? "text-muted" : "font-semibold"}>{r.v}</span>
              </li>
            ))}
          </ul>
        </Card>
      </Piece>
      <Piece className="right-[2%] top-[0%]" d={1.7}>
        <Chip>{s.result}</Chip>
      </Piece>
    </>
  );
}

function Construction() {
  const s = copy.demo.screens.construction;
  return (
    <>
      <Piece className="left-[-4%] top-[52%] w-[46%]" rot={-5} d={0.45} x={-60}>
        <Shot src="/demo/plan-6.webp" />
      </Piece>
      <Piece className="left-[12%] top-[4%] w-[84%]" rot={-1.5} d={0.1}>
        <Card>
          <p className="font-semibold tracking-[-0.03em]" style={{ fontSize: c(4.6) }}>{s.title}</p>
          <ul style={{ marginTop: c(2.6) }}>
            {s.rows.map((r, i) => (
              <li key={r.k} className="grid grid-cols-[24%_1fr] items-center" style={{ fontSize: c(3), padding: `${c(1.7)} 0` }}>
                <span className="text-muted">{r.k}</span>
                <span className="block bg-paper-2" style={{ height: c(3.8), borderRadius: c(1.9) }}>
                  <span className="jr-bar block h-full bg-blue" style={{ marginLeft: `${r.from}%`, width: `${r.len}%`, borderRadius: c(1.9), opacity: 1 - i * 0.12, "--d": `${0.6 + i * 0.25}s` } as CSSProperties} />
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </Piece>
      {s.cards.map((t, i) => (
        <Piece key={t} className={["right-[0%] top-[62%]", "right-[20%] top-[76%]", "right-[-2%] top-[88%]"][i]} rot={[3, -3, 2][i]} d={1.3 + i * 0.25} x={60}>
          <Chip>{t}</Chip>
        </Piece>
      ))}
    </>
  );
}

function Sales({ video }: { video: React.RefObject<HTMLVideoElement | null> }) {
  const s = copy.demo.screens;
  return (
    <>
      <Piece className="left-[-2%] top-[2%] w-[94%]" d={0.1}>
        <div className={`overflow-hidden bg-ink ring-1 ring-white/20 ${SHADOW}`} style={{ borderRadius: c(2) }}>
          <div className="flex items-center bg-[#E9EDF3]" style={{ height: c(4), padding: `0 ${c(1.8)}`, gap: c(0.8) }}>
            {["#F26B5E", "#F5BE4F", "#5FC454"].map((dot) => (
              <span key={dot} className="rounded-full" style={{ width: c(1.3), height: c(1.3), background: dot }} />
            ))}
            <span className="mx-auto truncate rounded-full bg-white text-center text-muted" style={{ width: "46%", fontSize: c(1.9), padding: `${c(0.2)} ${c(1.6)}` }}>{s.site.label}</span>
          </div>
          <video ref={video} src="/demo/site.mp4" poster="/demo/site-poster.jpg" muted loop playsInline preload="metadata" className="block aspect-[16/10] w-full object-cover object-top" />
        </div>
      </Piece>
      <Piece className="right-[-3%] top-[24%] w-[23%]" rot={5} d={0.6} x={60}>
        <div className={`bg-[#0a0f18] ${SHADOW}`} style={{ padding: c(0.7), borderRadius: c(3) }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/demo/site-phone.webp" alt="" loading="lazy" className="block w-full" style={{ borderRadius: c(2.4) }} />
        </div>
      </Piece>
      <Piece className="left-[-6%] top-[58%] w-[42%]" rot={-6} d={0.9} x={-60}>
        <Shot src="/demo/brochure-1.webp" />
      </Piece>
      <Piece className="left-[38%] top-[70%] w-[19%]" rot={4} d={1.15}>
        <Shot src="/demo/ad-1.webp" />
      </Piece>
      <Piece className="left-[59%] top-[74%] w-[18%]" rot={-3} d={1.35}>
        <Shot src="/demo/ad-4.webp" />
      </Piece>
    </>
  );
}

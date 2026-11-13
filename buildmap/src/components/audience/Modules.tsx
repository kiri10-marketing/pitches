"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { audiences } from "@/content/audiences";

// The interactive pieces on the audience pages. Each one lets the visitor try the idea rather than read about it.

const nzd = (n: number) => "$" + Math.round(n).toLocaleString("en-NZ");
const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Img({ src, alt = "", className }: { src: string; alt?: string; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" className={className} />;
}

function Tick({ dark = true }: { dark?: boolean }) {
  return (
    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1 ${dark ? "bg-blue-light/15 text-blue-light ring-blue-light/40" : "bg-blue-soft text-blue ring-blue/25"}`}>
      <svg viewBox="0 0 12 12" width="60%" height="60%" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M2.5 6.2l2.4 2.4 4.6-5" />
      </svg>
    </span>
  );
}

/** Marks its children as in view once, so anything inside with data-r rises into place. */
export function Reveal({ children, className = "", as: Tag = "div", id }: { children: ReactNode; className?: string; as?: "div" | "section" | "ul" | "ol"; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) return setSeen(true);
    const io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && setSeen(true), { threshold: 0.18 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const T = Tag as "div";
  return (
    <T ref={ref as React.Ref<HTMLDivElement>} id={id} data-in={seen} className={`rv ${className}`}>
      {children}
    </T>
  );
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => setInView(e[0].isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

function Slider({ label, value, min, max, step, onChange, show, dark = false }: { label: string; value: number; min: number; max: number; step: number; onChange: (n: number) => void; show: string; dark?: boolean }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4">
        <span className={`text-base ${dark ? "text-white/65" : "text-muted"}`}>{label}</span>
        <span className="text-xl font-semibold tracking-[-0.02em] tabular-nums">{show}</span>
      </span>
      <input type="range" className={`rng mt-3 ${dark ? "rng-dark" : ""}`} min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ "--p": `${pct}%` } as CSSProperties} />
    </label>
  );
}

function Tabs({ items, value, onChange, dark = true, label }: { items: readonly string[]; value: number; onChange: (i: number) => void; dark?: boolean; label: string }) {
  return (
    <div role="tablist" aria-label={label} className={`inline-flex max-w-full flex-wrap gap-1 rounded-[22px] p-1 ${dark ? "bg-white/10" : "bg-paper-2"}`}>
      {items.map((t, i) => (
        <button
          key={t}
          role="tab"
          type="button"
          aria-selected={i === value}
          onClick={() => onChange(i)}
          className={`min-h-11 rounded-full px-4 py-2 text-[0.95rem] font-semibold transition-colors ${
            i === value ? (dark ? "bg-white text-ink" : "bg-ink text-white") : dark ? "text-white/70 hover:text-white" : "text-muted hover:text-ink"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

const panel = "rounded-[28px] bg-white/[.06] p-4 ring-1 ring-white/12 backdrop-blur-sm sm:p-6";

/* ---------- Agents ---------- */

export function AgentPlays() {
  const p = audiences.agents.plays;
  const [tab, setTab] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto || reduced()) return;
    const t = setInterval(() => setTab((v) => (v + 1) % 2), 7000);
    return () => clearInterval(t);
  }, [auto]);
  const a = p.items[0];
  const b = p.items[1];
  const cur = p.items[tab];
  return (
    <div className={panel}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="jr-eyebrow">{p.label}</p>
        <Tabs label={p.label} items={p.items.map((i) => i.tab)} value={tab} onChange={(i) => { setTab(i); setAuto(false); }} />
      </div>

      <div key={tab} role="tabpanel" className="mt-5">
        {tab === 0 ? (
          <div className="relative mx-auto max-w-md pr-6">
            <div className="pop overflow-hidden rounded-3xl bg-white text-ink shadow-[0_40px_90px_-30px_rgba(0,0,0,.75)]">
              <div className="relative">
                <Img src="/demo/teaser-render.webp" className="h-44 w-full object-cover sm:h-52" />
                <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">For sale</span>
              </div>
              <div className="p-5">
                <p className="text-lg font-semibold tracking-[-0.02em]">123 The Terrace Street</p>
                <p className="mt-2 text-base text-muted">
                  <span className="strike">{a.before}</span>
                </p>
                <p className="pop mt-3 inline-flex items-center gap-2 rounded-full bg-blue px-3.5 py-1.5 text-[0.95rem] font-semibold text-white" style={{ animationDelay: "1.5s" }}>
                  <Tick />
                  {a.after}
                </p>
              </div>
            </div>
            <Img src="/demo/plan-7.webp" className="fly absolute right-0 top-8 w-[34%] rotate-[5deg] rounded-lg shadow-[0_20px_50px_-12px_rgba(0,0,0,.7)] ring-1 ring-black/10 [animation-delay:1.9s]" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="pop flex flex-col rounded-3xl bg-white/[.07] p-4 ring-1 ring-white/10">
              <p className="text-sm font-semibold text-white/55">{b.them.name}</p>
              <ul className="mt-3 flex-1 space-y-2.5" aria-label={b.them.item}>
                {[72, 58, 66].map((w) => (
                  <li key={w} className="rounded-xl bg-white/[.07] p-3">
                    <span className="block text-xs text-white/50">{b.them.item}</span>
                    <span className="mt-2 block h-2 rounded-full bg-white/20" style={{ width: `${w}%` }} />
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white/50">{b.them.count}</p>
            </div>
            <div className="pop flex flex-col rounded-3xl bg-white p-4 text-ink shadow-[0_40px_90px_-30px_rgba(0,0,0,.75)]" style={{ animationDelay: ".25s" }}>
              <p className="text-sm font-semibold text-blue">{b.you.name}</p>
              <div className="relative mt-3 flex-1">
                <Img src="/demo/plan-1.webp" className="w-full rounded-lg ring-1 ring-line" />
                <div className="mt-2 grid grid-cols-[1fr_.42fr] gap-2">
                  <Img src="/demo/brochure-1.webp" className="fly h-full w-full rounded-lg object-cover [animation-delay:.7s]" />
                  <Img src="/demo/site-phone.webp" className="fly w-full rounded-lg [animation-delay:1s]" />
                </div>
              </div>
              <p className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-blue">{b.you.count}</p>
            </div>
          </div>
        )}

        <h2 className="mt-6 text-2xl sm:text-[1.7rem]">{cur.title}</h2>
        <p className="mt-2 text-base text-white/65">{cur.body}</p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem] text-white/85">
          {cur.points.map((pt) => (
            <li key={pt} className="flex items-center gap-2">
              <Tick />
              {pt}
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t border-white/12 pt-4 text-sm font-semibold text-blue-light">{cur.tag}</p>
      </div>
    </div>
  );
}

export function CommissionCalc() {
  const c = audiences.agents.calc;
  const [land, setLand] = useState(900000);
  const [homes, setHomes] = useState(6);
  const [price, setPrice] = useState(750000);
  const [rate, setRate] = useState(2.5);
  const landOnly = (land * rate) / 100;
  const onSale = ((land + homes * price) * rate) / 100;
  const times = onSale / landOnly;
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
      <div className="space-y-7" data-r>
        <Slider dark label={c.land} value={land} min={300000} max={3000000} step={50000} onChange={setLand} show={nzd(land)} />
        <Slider dark label={c.homes} value={homes} min={2} max={12} step={1} onChange={setHomes} show={String(homes)} />
        <Slider dark label={c.price} value={price} min={400000} max={1500000} step={25000} onChange={setPrice} show={nzd(price)} />
        <Slider dark label={c.rate} value={rate} min={1} max={4} step={0.1} onChange={setRate} show={`${rate.toFixed(1)}%`} />
      </div>
      <div className={panel} data-r style={d(0.15)} aria-live="polite">
        <div>
          <p className="flex items-baseline justify-between gap-3 text-base text-white/55">
            <span>{c.landOnly}</span>
            <span>1 {c.listing}</span>
          </p>
          <p className="mt-1 text-3xl font-medium tracking-[-0.03em] tabular-nums text-white/60">{nzd(landOnly)}</p>
          <span className="mt-3 block h-3 rounded-full bg-white/25 transition-[width] duration-500" style={{ width: `${Math.max(4, (landOnly / onSale) * 100)}%` }} />
        </div>
        <div className="mt-8">
          <p className="flex items-baseline justify-between gap-3 text-base text-blue-light">
            <span>{c.onSale}</span>
            <span>
              {homes + 1} {c.listings}
            </span>
          </p>
          <p className="mt-1 text-5xl font-medium tracking-[-0.04em] tabular-nums sm:text-6xl">{nzd(onSale)}</p>
          <span className="mt-3 block h-3 w-full rounded-full bg-gradient-to-r from-blue to-blue-light" />
        </div>
        <p className="mt-8 border-t border-white/12 pt-5 text-lg">
          <span className="text-3xl font-semibold tracking-[-0.03em] text-blue-light tabular-nums">{times.toFixed(1)}×</span> <span className="text-white/75">{c.more}</span>
        </p>
      </div>
      <p className="text-sm text-white/45 lg:col-span-2">{c.note}</p>
    </div>
  );
}

/* ---------- Builders ---------- */

const SWATCHES = ["#0b1b33", "#1257d6", "#1f4d3a", "#8a3b22", "#2b2b2b"];

export function WhiteLabel() {
  const b = audiences.builders.brand;
  const [name, setName] = useState("");
  const [colour, setColour] = useState(SWATCHES[0]);
  const shown = name.trim() || b.placeholder;
  return (
    <div className={panel}>
      <p className="jr-eyebrow">{b.label}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <label className="block">
          <span className="text-sm text-white/60">{b.nameLabel}</span>
          <input value={name} onChange={(e) => setName(e.target.value.slice(0, 32))} placeholder={b.placeholder} autoComplete="organization" className="mt-1.5 block min-h-12 w-full rounded-2xl bg-white/10 px-4 text-lg text-white ring-1 ring-white/15 placeholder:text-white/35 focus:bg-white/15 focus:outline-2 focus:outline-blue-light" />
        </label>
        <fieldset>
          <legend className="text-sm text-white/60">{b.colourLabel}</legend>
          <div className="mt-1.5 flex gap-2">
            {SWATCHES.map((s) => (
              <button key={s} type="button" aria-label={`Colour ${s}`} aria-pressed={s === colour} onClick={() => setColour(s)} className={`h-12 w-9 rounded-xl ring-2 transition-transform ${s === colour ? "scale-110 ring-white" : "ring-white/25"}`} style={{ background: s }} />
            ))}
          </div>
        </fieldset>
      </div>

      <div className="relative mx-auto mt-7 w-[78%] max-w-sm pb-2" aria-live="polite">
        <Img src="/demo/plan-7.webp" className="absolute -right-[16%] top-[14%] w-[70%] rotate-[7deg] rounded-md opacity-90 shadow-[0_20px_50px_-12px_rgba(0,0,0,.7)]" />
        <div className="relative overflow-hidden rounded-lg bg-white text-ink shadow-[0_40px_90px_-30px_rgba(0,0,0,.8)]">
          <div className="flex items-center gap-3 px-5 py-4 text-white transition-colors duration-300" style={{ background: colour }}>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-lg font-semibold">{shown.charAt(0).toUpperCase()}</span>
            <span className="truncate text-lg font-semibold tracking-[-0.02em]">{shown}</span>
          </div>
          <div className="px-5 pb-5 pt-4">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: colour }}>{b.doc}</p>
            <p className="mt-1 text-xl font-semibold leading-tight tracking-[-0.02em]">{b.address}</p>
            <Img src="/demo/teaser-render.webp" className="mt-4 aspect-[3/2] w-full rounded-md object-cover" />
            <p className="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs text-muted">
              <span>
                {b.prepared} <strong className="text-ink">{shown}</strong>
              </span>
              <span>01</span>
            </p>
          </div>
        </div>
      </div>
      <p className="mt-5 text-sm text-white/45">{b.note}</p>
    </div>
  );
}

export function ConsentPath() {
  const p = audiences.builders.path;
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [ref, inView] = useInView<HTMLDivElement>();
  useEffect(() => {
    if (!auto || !inView || reduced()) return;
    const t = setInterval(() => setI((v) => (v + 1) % p.steps.length), 4200);
    return () => clearInterval(t);
  }, [auto, inView, p.steps.length]);
  const s = p.steps[i];
  return (
    <div ref={ref}>
      <ol className="relative grid grid-cols-5" role="tablist" aria-label={p.eyebrow}>
        <span className="absolute left-[10%] right-[10%] top-[21px] h-px bg-white/15" aria-hidden="true" />
        <span className="absolute left-[10%] top-[21px] h-px bg-blue-light transition-[width] duration-700" style={{ width: `${(i / (p.steps.length - 1)) * 80}%` }} aria-hidden="true" />
        {p.steps.map((st, k) => (
          <li key={st.name} className="relative text-center">
            <button type="button" role="tab" aria-selected={k === i} onClick={() => { setI(k); setAuto(false); }} className="group mx-auto flex flex-col items-center gap-2.5">
              <span className={`flex h-11 w-11 items-center justify-center rounded-full text-base font-semibold transition-all duration-500 ${k === i ? "scale-110 bg-white text-ink shadow-[0_0_0_7px_rgba(127,176,255,.16),0_0_34px_8px_rgba(127,176,255,.45)]" : k < i ? "bg-blue-light text-ink" : "bg-ink text-white/60 ring-1 ring-white/30 group-hover:ring-white"}`}>{k + 1}</span>
              <span className={`text-[0.8rem] leading-tight font-semibold sm:text-base ${k === i ? "text-white" : "text-white/50"}`}>{st.name}</span>
            </button>
          </li>
        ))}
      </ol>

      <div key={i} role="tabpanel" className="mt-10 grid items-center gap-8 lg:grid-cols-[.8fr_1fr] lg:gap-14">
        <div>
          <p className="pop text-3xl font-medium tracking-[-0.03em] sm:text-5xl">{s.name}</p>
          <p className="pop mt-4 max-w-md text-lg text-white/65" style={{ animationDelay: ".1s" }}>{s.body}</p>
          <ul className="mt-6 space-y-3">
            {s.points.map((pt, k) => (
              <li key={pt} className="pop flex items-center gap-3 text-lg text-white/90" style={{ animationDelay: `${0.3 + k * 0.25}s` }}>
                <Tick />
                {pt}
              </li>
            ))}
          </ul>
        </div>
        <div className="page-in overflow-hidden rounded-2xl bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,.75)]">
          <Img src={s.img} className="aspect-[14/9.9] w-full object-cover object-top" />
        </div>
      </div>
    </div>
  );
}

export function ServiceCalc() {
  const c = audiences.builders.calc;
  const [count, setCount] = useState(4);
  const [price, setPrice] = useState(1200);
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      <div className="space-y-7">
        <Slider label={c.count} value={count} min={1} max={20} step={1} onChange={setCount} show={String(count)} />
        <Slider label={c.price} value={price} min={500} max={3000} step={50} onChange={setPrice} show={nzd(price)} />
      </div>
      <div className="rounded-[28px] bg-ink p-7 text-white sm:p-9" aria-live="polite">
        <p className="text-base text-blue-light">{c.out}</p>
        <p className="mt-1 text-5xl font-medium tracking-[-0.04em] tabular-nums sm:text-7xl">{nzd(count * price * 12)}</p>
        <p className="mt-6 border-t border-white/12 pt-5 text-lg text-white/75">{c.also}</p>
      </div>
      <p className="text-sm text-muted lg:col-span-2">{c.note}</p>
    </div>
  );
}

/* ---------- Landowners ---------- */

export function AddressStart() {
  const a = audiences.landowners.address;
  const [v, setV] = useState("");
  function go(e: React.FormEvent) {
    e.preventDefault();
    const field = document.getElementById("address") as HTMLInputElement | null;
    if (field && v.trim()) field.value = v.trim();
    document.getElementById("start")?.scrollIntoView({ behavior: reduced() ? "auto" : "smooth" });
    setTimeout(() => (v.trim() ? document.getElementById("name") : field)?.focus({ preventScroll: true }), 700);
  }
  return (
    <form onSubmit={go} className="mt-8 max-w-xl">
      <div className="flex flex-col gap-2 rounded-[30px] bg-white p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,.7)] sm:flex-row sm:rounded-full">
        <label className="sr-only" htmlFor="hero-address">{a.label}</label>
        <input id="hero-address" value={v} onChange={(e) => setV(e.target.value)} placeholder={a.placeholder} autoComplete="street-address" className="min-h-13 flex-1 rounded-full bg-transparent px-5 text-lg text-ink placeholder:text-muted focus:outline-none" />
        <button type="submit" className="btn btn-blue">{a.button}</button>
      </div>
      <p className="mt-3 text-sm text-white/55">{a.hint}</p>
    </form>
  );
}

/** A section of land, drawn three ways: split into lots, with homes on it, or with a plan attached. */
function Parcel({ mode }: { mode: number }) {
  const lots = [
    { x: 40, w: 136, n: "Lot 1" },
    { x: 176, w: 136, n: "Lot 2" },
    { x: 312, w: 128, n: "Lot 3" },
  ];
  return (
    <svg viewBox="0 0 480 330" className="w-full" role="img" aria-label="A section of land shown from above">
      <rect x="0" y="262" width="480" height="68" fill="#e2e7ef" />
      <path d="M0 296h480" stroke="#fff" strokeWidth="3" strokeDasharray="22 16" />
      <rect x="40" y="30" width="400" height="220" rx="6" fill="#eaf1fe" />
      <path className="draw" pathLength={1} d="M40 30h400v220H40z" fill="none" stroke="#1257d6" strokeWidth="3" strokeLinejoin="round" />
      {mode === 0 && (
        <g>
          <path className="draw" pathLength={1} style={{ animationDelay: ".5s" }} d="M176 30v220M312 30v220" stroke="#1257d6" strokeWidth="2.5" strokeDasharray="0.03 0.02" fill="none" />
          {lots.map((l, k) => (
            <g key={l.n} className="pop" style={{ animationDelay: `${1 + k * 0.25}s` }}>
              <rect x={l.x + l.w / 2 - 34} y="124" width="68" height="32" rx="16" fill="#0b1b33" />
              <text x={l.x + l.w / 2} y="145" textAnchor="middle" fontSize="15" fontWeight="600" fill="#fff">{l.n}</text>
            </g>
          ))}
        </g>
      )}
      {mode === 1 && (
        <g>
          {[62, 158, 254, 350].map((x, k) => (
            <g key={x} className="pop" style={{ animationDelay: `${0.5 + k * 0.2}s` }}>
              <rect x={x} y="62" width="70" height="120" rx="5" fill="#0b1b33" />
              <path d={`M${x} 122h70`} stroke="#7fb0ff" strokeWidth="2" />
              <rect x={x + 22} y="186" width="26" height="46" rx="3" fill="#7fb0ff" opacity=".55" />
            </g>
          ))}
        </g>
      )}
      {mode === 2 && (
        <g>
          <path className="draw" pathLength={1} style={{ animationDelay: ".4s" }} d="M176 30v220M312 30v220" stroke="#1257d6" strokeWidth="2" strokeDasharray="0.03 0.02" fill="none" opacity=".5" />
          <g className="pop" style={{ animationDelay: ".8s" }}>
            <rect x="150" y="52" width="180" height="176" rx="10" fill="#fff" stroke="#e2e7ef" strokeWidth="2" />
            <rect x="170" y="74" width="92" height="12" rx="6" fill="#0b1b33" />
            <rect x="170" y="98" width="140" height="8" rx="4" fill="#e2e7ef" />
            <rect x="170" y="114" width="120" height="8" rx="4" fill="#e2e7ef" />
            <rect x="170" y="140" width="140" height="48" rx="6" fill="#eaf1fe" />
            <rect x="170" y="200" width="76" height="16" rx="8" fill="#1257d6" />
          </g>
          <g className="pop" style={{ animationDelay: "1.3s" }}>
            <rect x="318" y="34" width="112" height="34" rx="17" fill="#1257d6" />
            <text x="374" y="56" textAnchor="middle" fontSize="14" fontWeight="600" fill="#fff">Plan attached</text>
          </g>
        </g>
      )}
    </svg>
  );
}

export function LandTabs() {
  const t = audiences.landowners.tabs;
  const [i, setI] = useState(0);
  const s = t.items[i];
  return (
    <div>
      <div className="text-center">
        <Tabs dark={false} label={t.eyebrow} items={t.items.map((x) => x.tab)} value={i} onChange={setI} />
      </div>
      <div key={i} role="tabpanel" className="mt-10 grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="tile overflow-hidden p-5 sm:p-8">
          <Parcel mode={i} />
        </div>
        <div>
          <h3 className="pop text-4xl sm:text-5xl">{s.title}</h3>
          <p className="pop mt-4 max-w-md text-lg text-muted" style={{ animationDelay: ".1s" }}>{s.body}</p>
          <ul className="mt-6 space-y-3">
            {s.points.map((pt, k) => (
              <li key={pt} className="pop flex items-center gap-3 text-lg" style={{ animationDelay: `${0.3 + k * 0.2}s` }}>
                <Tick dark={false} />
                {pt}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function FlipCards() {
  const f = audiences.landowners.flips;
  const [open, setOpen] = useState<boolean[]>(f.items.map(() => false));
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {f.items.map((c, i) => (
        <li key={c.q} data-r style={d(i * 0.12)}>
          <button type="button" aria-pressed={open[i]} onClick={() => setOpen((o) => o.map((v, k) => (k === i ? !v : v)))} className="flip block h-56 w-full text-left sm:h-64">
            <span className="flip-in relative block h-full w-full">
              <span className="flip-f absolute inset-0 flex flex-col justify-between rounded-[28px] bg-ink p-7 text-white">
                <span className="text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">{c.q}</span>
                <span className="flex items-center gap-2 text-sm font-semibold text-blue-light">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-base">+</span> Tap to find out
                </span>
              </span>
              <span className="flip-b absolute inset-0 flex flex-col justify-between rounded-[28px] bg-blue p-7 text-white">
                <span className="text-xl font-medium leading-snug tracking-[-0.01em] sm:text-2xl">{c.a}</span>
                <span className="text-sm font-semibold text-white/75">{c.q}</span>
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Developers ---------- */

export function Pipeline() {
  const p = audiences.developers.pipeline;
  const [n, setN] = useState(8);
  const usual = n * 1500;
  const ours = n * 499;
  return (
    <div className={panel}>
      <p className="jr-eyebrow">{p.label}</p>
      <div className="mt-5">
        <Slider dark label={p.count} value={n} min={1} max={30} step={1} onChange={setN} show={String(n)} />
      </div>
      <div className="mt-8 space-y-6" aria-live="polite">
        <div>
          <p className="flex items-baseline justify-between gap-3">
            <span className="text-base text-white/55">{p.usual}</span>
            <span className="text-2xl font-medium tracking-[-0.03em] tabular-nums text-white/60">{nzd(usual)}+</span>
          </p>
          <span className="mt-2 block h-3 w-full rounded-full bg-white/25" />
          <p className="mt-2 text-sm text-white/45">{p.usualEach}</p>
        </div>
        <div>
          <p className="flex items-baseline justify-between gap-3">
            <span className="text-base text-blue-light">{p.buildmap}</span>
            <span className="text-2xl font-medium tracking-[-0.03em] tabular-nums">{nzd(ours)}</span>
          </p>
          <span className="mt-2 block h-3 rounded-full bg-gradient-to-r from-blue to-blue-light" style={{ width: `${(499 / 1500) * 100}%` }} />
          <p className="mt-2 text-sm text-white/65">{p.buildmapEach}</p>
        </div>
      </div>
      <p className="mt-7 border-t border-white/12 pt-5">
        <span className="block text-5xl font-medium tracking-[-0.04em] tabular-nums sm:text-6xl">{nzd(usual - ours)}</span>
        <span className="mt-1 block text-base text-white/70">{p.saved}</span>
      </p>
      <p className="mt-4 text-sm text-white/40">{p.note}</p>
    </div>
  );
}

export function DDClock() {
  const c = audiences.developers.clock;
  const options = [10, 15, 20];
  const [days, setDays] = useState(15);
  const cells = Array.from({ length: days }, (_, k) => k + 1);
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-4" data-r>
        <span className="text-base text-white/60">{c.pick}</span>
        <Tabs label={c.pick} items={options.map((o) => `${o} ${c.days}`)} value={options.indexOf(days)} onChange={(i) => setDays(options[i])} />
      </div>

      <div className="mt-12" data-r style={d(0.15)}>
        <div className="flex gap-[3px] sm:gap-1.5" key={days}>
          {cells.map((k) => (
            <span key={k} className={`pop flex h-14 flex-1 items-center justify-center rounded-md text-xs font-semibold sm:h-16 sm:rounded-xl sm:text-sm ${k === 1 ? "bg-white text-ink shadow-[0_0_34px_8px_rgba(127,176,255,.45)]" : k === 2 ? "bg-blue-light text-ink" : "bg-blue/35 text-white/70 ring-1 ring-blue-light/25"}`} style={{ animationDelay: `${k * 0.04}s` }}>
              {k}
            </span>
          ))}
        </div>
        <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-2 text-base">
          <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-white" />{c.day} 1: {c.report}</li>
          <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-blue-light" />{c.day} 2: {c.plan}</li>
        </ul>
        <div className="mt-8 h-14 rounded-md bg-[repeating-linear-gradient(135deg,rgba(255,255,255,.14)_0_8px,transparent_8px_16px)] ring-1 ring-white/12 sm:h-16 sm:rounded-xl" aria-hidden="true" />
        <p className="mt-4 text-base text-white/50">{c.usual}</p>
      </div>

      <p className="mt-12 text-center" data-r style={d(0.3)} aria-live="polite">
        <span className="block text-7xl font-medium tracking-[-0.05em] tabular-nums sm:text-9xl">{days - 1}</span>
        <span className="mx-auto mt-2 block max-w-sm text-lg text-white/70">{c.left}</span>
      </p>
    </div>
  );
}

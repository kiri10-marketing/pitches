import type { Metadata } from "next";
import { Logo, Mark } from "@/components/Mark";
import { brand } from "@/content/brand";

export const metadata: Metadata = { title: "BuildMap brand sheet", robots: { index: false, follow: false } };

function Head({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-line pb-3">
      <span className="font-mono text-[0.72rem] tracking-[0.16em] text-brass-dark">{n}</span>
      <h2 className="text-3xl">{title}</h2>
    </div>
  );
}

export default function BrandSheet() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow text-brass-dark">Brand sheet · v1 · November 2026</p>
          <h1 className="mt-4 text-5xl sm:text-6xl">BuildMap</h1>
          <p className="italic-serif mt-3 max-w-xl text-xl text-muted">{brand.idea}</p>
        </div>
        <a href="/" className="btn btn-line">Back to the site</a>
      </header>

      <section className="mt-16">
        <Head n="01" title="The logo" />
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="flex min-h-56 items-center justify-center border border-line bg-card p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/buildmap-logo.svg" alt="BuildMap logo on paper" className="w-full max-w-md" />
          </div>
          <div className="flex min-h-56 items-center justify-center bg-ink p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/buildmap-logo-reversed.svg" alt="BuildMap logo reversed on ink green" className="w-full max-w-md" />
          </div>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-[1fr_1.4fr]">
          <div className="flex items-center justify-around gap-4 border border-line bg-card p-8">
            <Mark size={150} />
            <div className="flex flex-col items-center gap-4">
              <Mark size={56} simple />
              <Mark size={32} simple />
              <span className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-ink">
                <Mark size={34} simple tone="paper" />
              </span>
            </div>
          </div>
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {brand.meaning.map((m) => (
              <li key={m.part} className="bg-card p-5">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-brass-dark">{m.part}</p>
                <p className="mt-1 text-base">{m.means}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-base text-muted">
          Files:{" "}
          {brand.files.map((f, i) => (
            <span key={f}>
              {i > 0 && ", "}
              <a className="underline decoration-brass underline-offset-4" href={`/brand/${f}`}>{f}</a>
            </span>
          ))}
          . Use the simplified mark below 48 px. Keep clear space of half the mark's width around the logo.
        </p>
      </section>

      <section className="mt-16">
        <Head n="02" title="Colour" />
        <ul className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-5">
          {brand.colours.map((c) => (
            <li key={c.hex}>
              <span className="block h-28 border border-line" style={{ background: c.hex }} />
              <p className="mt-2 font-[family-name:var(--font-head)] text-xl">{c.name}</p>
              <p className="font-mono text-[0.74rem] uppercase tracking-[0.1em] text-muted">{c.hex}</p>
              <p className="mt-1 text-sm text-muted">{c.use}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <Head n="03" title="Type" />
        <div className="mt-6 grid gap-px border border-line bg-line md:grid-cols-3">
          <div className="bg-card p-6">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-brass-dark">Headings · Libre Caslon Display</p>
            <p className="mt-4 font-[family-name:var(--font-head)] text-5xl leading-none">Aa</p>
            <p className="mt-4 font-[family-name:var(--font-head)] text-3xl leading-tight">Map out your journey to success.</p>
            <p className="italic-serif mt-2 text-xl text-brass-dark">Build your way to brilliance.</p>
          </div>
          <div className="bg-card p-6">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-brass-dark">Body · Hanken Grotesk</p>
            <p className="mt-4 text-5xl leading-none">Aa</p>
            <p className="mt-4 text-base">Plain words at a comfortable size. Never smaller than 16 px, so every report and page reads easily at any age.</p>
          </div>
          <div className="bg-card p-6">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-brass-dark">Labels · IBM Plex Mono</p>
            <p className="mt-4 font-mono text-5xl leading-none">Aa</p>
            <p className="mt-4 font-mono text-[0.78rem] uppercase tracking-[0.18em]">Level 02 · Within 24 hours</p>
            <p className="mt-2 text-base text-muted">Small capitals for labels, stages and figures, like the margin notes on a survey sheet.</p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <Head n="04" title="Voice" />
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {brand.voice.map((v) => (
            <div key={v.trait} className="border-t-2 border-brass pt-4">
              <h3 className="text-2xl">{v.trait}</h3>
              <p className="mt-2 text-base text-muted">{v.how}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="border border-line bg-card p-6">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-brass-dark">Lines we use</p>
            <ul className="mt-3 space-y-2 font-[family-name:var(--font-head)] text-2xl leading-snug">
              {brand.lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
          <div className="border border-line bg-card p-6">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-brass-dark">What we avoid</p>
            <ul className="mt-3 space-y-2 text-base">
              {brand.avoid.map((l) => (
                <li key={l} className="flex gap-3">
                  <span className="mt-[0.7em] h-px w-4 shrink-0 bg-ink" aria-hidden="true" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <Head n="05" title="In use" />
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="bg-ink p-8 text-paper">
            <Logo tone="paper" size={34} />
            <p className="eyebrow mt-8 text-brass-light">The future of property development is here</p>
            <p className="mt-3 font-[family-name:var(--font-head)] text-3xl">Map out your journey to success.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="btn btn-brass">Start with an address</span>
              <span className="btn btn-line">See how it works</span>
            </div>
          </div>
          <div className="sheet m-1.5 p-8">
            <Logo size={34} />
            <p className="eyebrow mt-8 text-brass-dark">Level 02 · Technical report</p>
            <p className="mt-3 font-[family-name:var(--font-head)] text-3xl">24 Example Street</p>
            <p className="mt-2 text-base text-muted">Report covers, letterheads and proposals use the paper ground, a double rule and one brass accent.</p>
            <span className="btn btn-ink mt-6">Open the report</span>
          </div>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import { landing, showcase, brand, type Audience } from "@/content/copy";
import { to } from "@/lib/links";
import { Logo } from "./Logo";
import LeadForm from "./LeadForm";

function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-5 w-5 shrink-0 ${className}`} aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path d="M5.5 10.5l3 3 6-6.5" stroke="#093b23" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BrowserFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-black/5 bg-sand px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#e46a5b]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e7b649]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#62b26f]" />
      </div>
      <Image src={src} alt={alt} width={1440} height={900} className="block h-auto w-full" priority />
    </div>
  );
}

function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[1.6rem] border-[6px] border-ink bg-ink shadow-2xl ${className}`}>
      <Image src={src} alt={alt} width={390} height={844} className="block h-auto w-full rounded-[1.1rem]" />
    </div>
  );
}

function VerdictCard() {
  const rows: [string, "green" | "amber" | "red", string][] = [
    ["Zone and yield", "green", "20 lots of about 385 m²"],
    ["Liquefaction", "amber", "TC2: standard foundations, check"],
    ["Wastewater", "amber", "Confirm capacity with council"],
    ["Access", "green", "New road plus two shared lanes"],
    ["Covenants", "green", "None on title"],
  ];
  const dot = { green: "bg-[#2f9e5b]", amber: "bg-gold", red: "bg-[#d0473a]" };
  return (
    <div className="rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <p className="font-[family-name:var(--font-head)] text-lg font-bold text-green">Site check</p>
        <span className="rounded-full bg-[#2f9e5b]/15 px-3 py-1 text-sm font-bold text-[#1f7a43]">Green: go</span>
      </div>
      <ul className="mt-3 space-y-2 text-[15px]">
        {rows.map(([k, c, v]) => (
          <li key={k} className="flex items-start gap-2.5">
            <span className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${dot[c]}`} />
            <span>
              <b className="text-ink">{k}</b> <span className="text-muted">· {v}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted">Sample verdict. Concept only, not consented.</p>
    </div>
  );
}

export default function Landing({ audience }: { audience: Audience }) {
  const c = landing[audience];
  const other: Audience = audience === "agents" ? "builders" : "agents";
  const portal = to(audience, "/portal");
  const start = to(audience, "/portal?next=new");

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Logo product={c.product} href={to(audience)} />
          <nav className="hidden items-center gap-6 font-semibold text-ink lg:flex">
            {c.nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-green">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href={portal} className="px-2 font-semibold text-green underline-offset-4 hover:underline sm:hidden">
              Sign in
            </Link>
            <Link href={portal} className="btn btn-line hidden px-4 py-2 text-green sm:inline-flex">
              Sign in
            </Link>
            <Link href={start} className="btn btn-gold px-4 py-2 text-[16px] sm:text-[18px]">
              {c.hero.primary}
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pb-24 lg:pt-20">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-gold-dark">{c.hero.eyebrow}</p>
              <h1 className="mt-4 text-[2.6rem] font-extrabold sm:text-6xl">
                {c.hero.title} <span className="text-gold-dark">{c.hero.highlight}</span> {c.hero.titleEnd}
              </h1>
              <p className="mt-6 max-w-xl text-xl text-muted">{c.hero.body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={start} className="btn btn-gold text-lg">
                  {c.hero.primary}
                </Link>
                <a href="#examples" className="btn btn-line text-lg text-green">
                  {c.hero.secondary}
                </a>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-semibold">
                {c.hero.points.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <Check className="text-mint" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative pb-10 lg:pb-0">
              {audience === "agents" ? (
                <>
                  <BrowserFrame src="/showcase/rise-desktop.jpg" alt="The Rise pitch website" />
                  <Phone src="/showcase/gardens-mobile.jpg" alt="The Gardens pitch website on a phone" className="absolute -bottom-2 -left-8 hidden w-[30%] sm:block lg:-bottom-10" />
                  <p className="mt-3 text-right text-sm text-muted">Real pitch sites: The Rise and The Gardens</p>
                </>
              ) : (
                <>
                  <div className="overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5">
                    <Image src="/media/scheme-plan.jpg" alt="Sitely concept scheme plan for a 20-lot subdivision" width={1800} height={1274} className="h-auto w-full" priority />
                  </div>
                  <div className="absolute -bottom-6 -left-3 w-[78%] sm:-left-8 sm:w-[58%] lg:-bottom-12">
                    <VerdictCard />
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Proof strip */}
        <section className="bg-green text-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-6 text-lg font-semibold sm:px-6">
            {c.proof.map((p) => (
              <span key={p} className="flex items-center gap-2">
                <Check className="text-mint" /> {p}
              </span>
            ))}
          </div>
        </section>

        {/* What you get */}
        <section id="what" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-extrabold sm:text-5xl">{c.whatTitle}</h2>
            <p className="mt-4 text-xl text-muted">{c.whatIntro}</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.what.map((w, i) => (
              <div key={w.title} className="rounded-2xl border border-line bg-white p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green font-[family-name:var(--font-head)] font-bold text-gold">{i + 1}</span>
                <h3 className="mt-5 text-2xl font-bold">{w.title}</h3>
                <p className="mt-2 text-muted">{w.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="scroll-mt-24 bg-sand">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
            <h2 className="text-4xl font-extrabold sm:text-5xl">{c.stepsTitle}</h2>
            <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {c.steps.map((s, i) => (
                <li key={s.title} className="relative">
                  <span className="font-[family-name:var(--font-head)] text-6xl font-extrabold text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-2xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-12">
              <Link href={start} className="btn btn-gold text-lg">
                {c.hero.primary}
              </Link>
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="bg-green text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-extrabold text-white sm:text-5xl">{c.whyTitle}</h2>
              {c.whyBody.map((p) => (
                <p key={p} className="mt-5 text-xl text-white/85">
                  {p}
                </p>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {c.whyStat.map((s) => (
                <div key={s.label} className="rounded-2xl bg-green-2 p-6">
                  <p className="font-[family-name:var(--font-head)] text-5xl font-extrabold text-mint">{s.value}</p>
                  <p className="mt-1 text-lg text-white/85">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Examples */}
        <section id="examples" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-extrabold sm:text-5xl">{c.examplesTitle}</h2>
            <p className="mt-4 text-xl text-muted">{c.examplesIntro}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {showcase.map((s) => (
              <a key={s.key} href={s.url} target="_blank" rel="noopener" className="group overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={s.image} alt={`${s.name} pitch website`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-top transition duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-green px-3 py-1 text-sm font-bold text-white">{s.style}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold">{s.name}</h3>
                  <p className="text-muted">{s.place}</p>
                  <p className="mt-3 font-bold text-gold-dark">Open the live pitch →</p>
                </div>
              </a>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">All images are artist&apos;s impressions of concepts that are not consented.</p>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-24 bg-sand">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-extrabold sm:text-5xl">{c.pricingTitle}</h2>
              <p className="mt-4 text-xl text-muted">{c.pricingIntro}</p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {c.tiers.map((t) => (
                <div key={t.name} className={`flex flex-col rounded-2xl p-8 ${t.featured ? "bg-green text-white ring-4 ring-gold" : "border border-line bg-white"}`}>
                  <h3 className={`text-xl font-bold ${t.featured ? "text-mint" : ""}`}>{t.name}</h3>
                  <p className={`mt-4 font-[family-name:var(--font-head)] text-4xl font-extrabold ${t.featured ? "text-white" : "text-green"}`}>{t.price}</p>
                  {t.unit && <p className={t.featured ? "text-white/75" : "text-muted"}>{t.unit}</p>}
                  {t.note && <p className={`mt-3 font-semibold ${t.featured ? "text-gold" : "text-gold-dark"}`}>{t.note}</p>}
                  <ul className="mt-6 flex-1 space-y-2.5">
                    {t.items.map((i) => (
                      <li key={i} className="flex gap-2.5">
                        <Check className="mt-1 text-mint" />
                        {i}
                      </li>
                    ))}
                  </ul>
                  {t.cta && (
                    <Link href={start} className={`btn mt-8 ${t.featured ? "btn-gold" : "btn-line text-green"}`}>
                      {t.cta}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-6 text-muted">{c.pricingNote}</p>
          </div>
        </section>

        {/* Trust */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <h2 className="max-w-3xl text-4xl font-extrabold sm:text-5xl">{c.trustTitle}</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {c.trust.map((t) => (
              <div key={t.title} className="flex gap-4 rounded-2xl border border-line bg-white p-7">
                <Check className="mt-1 h-7 w-7 text-mint" />
                <div>
                  <h3 className="text-2xl font-bold">{t.title}</h3>
                  <p className="mt-2 text-muted">{t.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-24 bg-sand">
          <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
            <h2 className="text-4xl font-extrabold sm:text-5xl">Questions</h2>
            <div className="mt-10 divide-y divide-line rounded-2xl border border-line bg-white">
              {c.faqs.map((f) => (
                <details key={f.q} className="group p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-bold text-green">
                    {f.q}
                    <span className="text-2xl text-gold-dark transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="bg-green text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="text-4xl font-extrabold text-white sm:text-5xl">{c.ctaTitle}</h2>
              <p className="mt-4 text-xl text-white/85">{c.ctaBody}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={start} className="btn btn-gold text-lg">
                  {c.hero.primary}
                </Link>
                <Link href={portal} className="btn btn-line text-lg text-white">
                  Sign in to your portal
                </Link>
              </div>
            </div>
            <LeadForm audience={audience} />
          </div>
        </section>
      </main>

      <footer className="bg-ink text-white/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Logo product={c.product} href={to(audience)} light />
            <p className="mt-2 text-sm">{brand.tagline} {brand.location}.</p>
          </div>
          <p>
            {c.crossLink.text}{" "}
            <Link href={to(other)} className="font-bold text-gold underline-offset-4 hover:underline">
              {c.crossLink.label} →
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}

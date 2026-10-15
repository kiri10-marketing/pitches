import Image from "next/image";
import {
  site, nav, hero, facts, intro, homes, community, lifestyle, sitePlan, location, buying, agents, form, faq, finalCta, footer,
} from "@/content/copy";
import EnquiryForm from "@/components/EnquiryForm";
import RegisterButton from "@/components/RegisterButton";
import StickyCta from "@/components/StickyCta";

const Tick = () => (
  <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="10" fill="var(--amber)" />
    <path d="M6 10.5l2.5 2.5L14 7.5" stroke="#1f1410" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function jsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Residence",
      name: site.name,
      description: site.description,
      url: site.url,
      image: `${site.url}${hero.poster}`,
      address: { "@type": "PostalAddress", streetAddress: site.street, addressLocality: site.suburb, addressCountry: "NZ" },
    },
    ...agents.people.map((a) => ({
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      name: `${a.name}, ${agents.brand}`,
      telephone: a.phone,
      email: a.email,
      areaServed: "Christchurch",
    })),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: buying.heading,
      step: buying.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text })),
    },
  ];
}

export default function Home() {
  const agent = agents.people[0];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />

      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 text-2xl font-black tracking-tight text-white" style={{ fontFamily: "var(--font-heading)" }}>
            <svg viewBox="0 0 32 20" className="h-5 w-8" aria-hidden="true"><ellipse cx="16" cy="10" rx="14" ry="8" fill="none" stroke="var(--amber)" strokeWidth="3.5" /></svg>
            {site.name}
          </a>
          <nav className="hidden items-center gap-7 text-base font-semibold text-white/90 lg:flex">
            {nav.links.map((l) => <a key={l.href} href={l.href} className="hover:text-white">{l.label}</a>)}
          </nav>
          <div className="flex items-center gap-3">
            <a href={nav.documents.href} className="inline-flex items-center rounded-full border-2 border-white/80 px-4 py-2 text-base font-bold text-white hover:bg-white/10">{nav.documents.label}</a>
            <a href="#register" className="hidden rounded-full bg-amber px-5 py-2.5 text-base font-bold text-[#1f1410] sm:inline-flex">{nav.cta}</a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section id="top" className="relative flex flex-col overflow-hidden bg-dusk md:min-h-[100svh] md:flex-row md:items-end">
          <div className="relative h-[46svh] min-h-[300px] w-full md:absolute md:inset-0 md:h-auto">
            <Image src={hero.poster} alt={hero.imageAlt} fill priority sizes="100vw" className="object-cover object-[55%_60%]" />
            <video className="hero-video absolute inset-0 h-full w-full object-cover object-[55%_60%]" src={hero.video} poster={hero.poster} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0e1c21]/50 via-transparent to-dusk md:bg-gradient-to-t md:from-[#0e1c21]/95 md:via-[#0e1c21]/55 md:to-[#0e1c21]/30" />
            <span className="render-tag !bottom-auto !left-auto right-3 top-16 md:right-4 md:top-24">{hero.renderNote}</span>
          </div>
          <div className="relative z-10 mx-auto -mt-10 w-full max-w-7xl px-4 pb-12 sm:px-6 md:mt-0 md:pb-20 md:pt-32">
            <p className="eyebrow !text-amber">{hero.eyebrow}</p>
            <h1 className="mt-3 max-w-4xl text-[2.25rem] !text-white sm:text-6xl lg:text-7xl">
              <span className="block text-amber">{hero.headlineName}</span>{hero.headlineLead} <span className="text-amber">{hero.headlineAccent}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg font-medium text-white/90 sm:text-xl">{hero.subheader}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {hero.tags.map((t) => (
                <li key={t} className="rounded-full border border-white/40 bg-white/10 px-3.5 py-1 text-base font-semibold text-white backdrop-blur">{t}</li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#register" className="btn-primary text-lg">{hero.cta}</a>
              <a href="#homes" className="btn-ghost hidden text-white sm:inline-flex">{hero.secondary}</a>
            </div>
            <ul className="mt-6 grid gap-2 sm:flex sm:flex-wrap sm:gap-6">
              {hero.ticks.map((t) => (
                <li key={t} className="flex items-center gap-2 text-base font-semibold text-white"><Tick />{t}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Facts strip */}
        <section aria-label="Key facts" className="border-b border-line bg-white">
          <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-4 py-8 sm:px-6 md:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="text-center">
                <dt className="sr-only">{f.label}</dt>
                <dd className="text-3xl font-black text-brick sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>{f.value}</dd>
                <dd className="mt-1 text-base font-semibold text-body">{f.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Vision */}
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2">
          <div>
            <p className="eyebrow">{intro.eyebrow}</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">{intro.heading}</h2>
            {intro.body.map((p) => <p key={p} className="mt-5 text-lg">{p}</p>)}
            <ul className="mt-8 grid gap-5">
              {intro.points.map((pt) => (
                <li key={pt.title} className="flex gap-3">
                  <Tick />
                  <div><p className="font-bold text-ink">{pt.title}</p><p className="text-base">{pt.text}</p></div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-xl">
            <Image src={intro.image.src} alt={intro.image.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            <span className="render-tag">{hero.renderNote}</span>
          </div>
        </section>

        {/* Homes */}
        <section id="homes" className="bg-brick-soft py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="eyebrow">{homes.eyebrow}</p>
            <h2 className="mt-3 max-w-2xl text-4xl sm:text-5xl">{homes.heading}</h2>
            <p className="mt-4 max-w-2xl text-lg">{homes.intro}</p>
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {homes.types.map((h) => (
                <article key={h.id} className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg">
                  <div className="relative aspect-[16/10]">
                    <Image src={h.image} alt={h.imageAlt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
                    <span className="absolute left-3 top-3 rounded-full bg-amber px-3 py-1 text-sm font-bold text-[#1f1410]">{h.count} homes</span>
                    <span className="render-tag">{hero.renderNote}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h3 className="text-3xl">{h.name}</h3>
                    <p className="mt-2 text-lg">{h.tagline}</p>
                    <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-line py-4">
                      {h.specs.map((s) => (
                        <div key={s.label}>
                          <dt className="text-sm font-semibold uppercase tracking-wide text-body/80">{s.label}</dt>
                          <dd className="font-bold text-ink">{s.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <ul className="mt-4 grid gap-2">
                      {h.features.map((f) => <li key={f} className="flex gap-2 text-base"><Tick />{f}</li>)}
                    </ul>
                    <div className="mt-auto pt-6">
                      <p className="font-bold text-brick">{h.price}</p>
                      <p className="text-sm font-semibold text-body">{h.planNote}</p>
                      <RegisterButton interest={form.interestOptions.find((o) => o.toLowerCase().startsWith(h.id))} className="btn-primary mt-4 w-full">
                        {homes.cardCta}
                      </RegisterButton>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Compare table */}
            <h3 className="mt-16 text-3xl">{homes.compare.heading}</h3>
            <p className="mt-2 text-base font-semibold md:hidden">{homes.compare.swipeHint}</p>
            <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow">
              <table className="w-full min-w-[520px] text-left text-base">
                <thead className="bg-dusk text-white">
                  <tr>
                    <th className="p-4" scope="col"><span className="sr-only">Feature</span></th>
                    {homes.types.map((h) => <th key={h.id} scope="col" className="p-4 font-bold">{h.name}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {homes.compare.rows.map((r) => (
                    <tr key={r.label} className="border-t border-line">
                      <th scope="row" className="p-4 font-semibold text-ink">{r.label}</th>
                      {r.values.map((v, i) => <td key={i} className="p-4">{v}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Family life: schools */}
        <section className="on-dark bg-dusk">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2">
            <div>
              <p className="eyebrow">{community.eyebrow}</p>
              <h2 className="mt-3 text-4xl sm:text-5xl">{community.heading}</h2>
              <p className="mt-5 text-lg text-white/90">{community.body}</p>
              <ul className="mt-8 grid gap-3">
                {community.schools.map((s) => (
                  <li key={s.name} className="flex items-center justify-between gap-4 rounded-2xl bg-dusk-2 p-4">
                    <div><p className="font-bold text-white">{s.name}</p><p className="text-base text-white/80">{s.detail}</p></div>
                    <p className="shrink-0 rounded-full bg-amber px-3 py-1 text-base font-bold text-[#1f1410]">{s.time}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-white/80">{community.note}</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src={community.image.src} alt={community.image.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              <span className="render-tag">{hero.renderNote}</span>
            </div>
          </div>
        </section>

        {/* Materials */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative order-last aspect-[16/10] overflow-hidden rounded-3xl shadow-xl lg:order-first">
              <Image src={lifestyle.image.src} alt={lifestyle.image.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              <span className="render-tag">{hero.renderNote}</span>
            </div>
            <div>
              <p className="eyebrow">{lifestyle.eyebrow}</p>
              <h2 className="mt-3 text-4xl sm:text-5xl">{lifestyle.heading}</h2>
              <p className="mt-5 text-lg">{lifestyle.body}</p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {lifestyle.materials.map((m) => (
                  <li key={m.title} className="rounded-2xl bg-white p-5 shadow">
                    <p className="font-bold text-ink">{m.title}</p>
                    <p className="mt-1 text-base">{m.text}</p>
                  </li>
                ))}
              </ul>
              <RegisterButton className="btn-primary mt-8">{hero.cta}</RegisterButton>
            </div>
          </div>
          <figure className="relative mt-12 overflow-hidden rounded-3xl bg-[#262626]">
            <Image src="/media/terrace-elevation.jpg" alt="Artist's impression elevation of the six dark brick terrace homes, T01 to T06" width={2400} height={281} sizes="100vw" className="h-auto w-full" />
            <figcaption className="px-5 py-3 text-sm font-semibold text-white/85">The six-home terrace row, T01 to T06. {hero.renderNote}.</figcaption>
          </figure>
        </section>

        {/* Site plan */}
        <section id="site-plan" className="bg-white py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <p className="eyebrow">{sitePlan.eyebrow}</p>
              <h2 className="mt-3 text-4xl sm:text-5xl">{sitePlan.heading}</h2>
              <p className="mt-5 text-lg">{sitePlan.body}</p>
              <ul className="mt-6 grid gap-3">
                {sitePlan.legend.map((l) => (
                  <li key={l.code} className="flex items-center gap-3 text-lg">
                    <span className={`grid h-9 w-9 place-items-center rounded-lg font-bold text-white ${l.code === "T" ? "bg-brick" : "bg-dusk"}`}>{l.code}</span>
                    <span className="font-semibold text-ink">{l.label}</span>
                    <span className="text-body">({l.count})</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-xl bg-brick-soft p-4 text-base font-semibold text-ink">{sitePlan.note}</p>
            </div>
            <figure className="overflow-hidden rounded-3xl border border-line bg-white p-3 shadow lg:col-span-3">
              <Image src={sitePlan.image.src} alt={sitePlan.image.alt} width={1600} height={1327} sizes="(min-width:1024px) 60vw, 100vw" className="h-auto w-full rounded-2xl" />
            </figure>
          </div>
        </section>

        {/* Location */}
        <section id="location" className="py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
            <div>
              <p className="eyebrow">{location.eyebrow}</p>
              <h2 className="mt-3 text-4xl sm:text-5xl">{location.heading}</h2>
              <p className="mt-5 text-lg">{location.body}</p>
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {location.places.map((p) => (
                  <li key={p.name} className="flex items-start justify-between gap-4 py-4">
                    <div><p className="font-bold text-ink">{p.name}</p><p className="text-base">{p.detail}</p></div>
                    <p className="shrink-0 text-right text-base font-semibold text-brick">{p.time}</p>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block min-h-[360px] overflow-hidden rounded-3xl"
            >
              <Image src="/media/aerial-cover.jpg" alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover object-right transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1c21]/85 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xl font-bold text-white">{site.address}</p>
                <span className="btn-primary mt-4">{location.mapCta}</span>
              </div>
              <span className="render-tag !bottom-auto top-3">{hero.renderNote}</span>
            </a>
          </div>
        </section>

        {/* Buying */}
        <section id="buying" className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="eyebrow">{buying.eyebrow}</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">{buying.heading}</h2>
            <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {buying.steps.map((s, i) => (
                <li key={s.title} className="rounded-3xl bg-cream p-6 shadow">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-brick text-lg font-black text-white">{i + 1}</span>
                  <h3 className="mt-4 text-xl">{s.title}</h3>
                  <p className="mt-2 text-base">{s.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-12 rounded-3xl bg-brick-soft p-6 sm:p-8">
              <h3 className="text-2xl">{buying.status.heading}</h3>
              <ol className="mt-6 grid gap-3 sm:grid-cols-5">
                {buying.status.stages.map((s) => (
                  <li key={s.label} className={`rounded-xl p-4 text-base font-bold ${s.state === "done" ? "bg-dusk text-white" : s.state === "next" ? "border-2 border-brick bg-white text-brick" : "bg-white text-body"}`}>
                    <span className="block text-xs font-semibold uppercase tracking-wider opacity-80">{s.state === "done" ? "Complete" : s.state === "next" ? "Next" : "Upcoming"}</span>
                    {s.label}
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-base font-semibold">{buying.status.note}</p>
            </div>
          </div>
        </section>

        {/* Agent */}
        <section id="agents" className="py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
            <div>
              <p className="eyebrow">{agents.eyebrow}</p>
              <h2 className="mt-3 text-4xl sm:text-5xl">{agents.heading}</h2>
              <p className="mt-5 text-lg">{agents.blurb}</p>
              <p className="mt-4 text-lg font-semibold text-ink">{agents.team}</p>
            </div>
            <article className="flex flex-col gap-5 rounded-3xl bg-brick-soft p-6 sm:flex-row sm:p-8">
              <Image src={agent.photo} alt={`${agent.name}, ${agents.brand}`} width={160} height={160} className="h-36 w-36 shrink-0 rounded-2xl object-cover sm:h-40 sm:w-40" />
              <div className="flex flex-col">
                <h3 className="text-2xl">{agent.name}</h3>
                <p className="font-semibold text-brick">{agent.role}, {agents.brand}</p>
                <p className="mt-3 text-base">{agent.bio}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={agent.phoneHref} className="btn-primary !min-h-[48px] !px-5 !py-2.5 text-base">{agents.callCta} {agent.phone}</a>
                  <a href={`mailto:${agent.email}`} className="btn-ghost !min-h-[48px] !px-5 !py-2.5 text-base text-ink">{agents.emailCta} {agent.name.split(" ")[0]}</a>
                </div>
                <p className="mt-5 text-sm">{agents.office}</p>
                <p className="mt-1 text-sm">{agents.licence}</p>
              </div>
            </article>
          </div>
        </section>

        {/* Register + agent */}
        <section id="register" className="on-dark bg-dusk py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <p className="eyebrow">{form.eyebrow}</p>
              <h2 className="mt-3 text-4xl sm:text-5xl">{form.heading}</h2>
              <p className="mt-4 text-lg text-white/90">{form.sub}</p>
              <ul className="mt-8 grid gap-4">
                {agents.people.map((a) => (
                  <li key={a.name} className="flex items-center gap-4 rounded-2xl bg-dusk-2 p-4">
                    <Image src={a.photo} alt={`${a.name}, ${agents.brand}`} width={64} height={64} className="h-16 w-16 rounded-full object-cover" />
                    <div className="min-w-0">
                      <p className="font-bold text-white">{a.name}, {agents.brand}</p>
                      <a href={a.phoneHref} className="block text-base font-semibold text-amber underline-offset-4 hover:underline">{a.phone}</a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-3"><EnquiryForm /></div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
          <p className="eyebrow">{faq.eyebrow}</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">{faq.heading}</h2>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {faq.items.map((i) => (
              <details key={i.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-ink">
                  {i.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brick-soft text-brick transition group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-lg">{i.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section id="final-cta" className="relative overflow-hidden">
          <Image src={finalCta.image} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[#0e1c21]/65" />
          <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
            <h2 className="text-4xl !text-white sm:text-5xl">{finalCta.heading}</h2>
            <p className="mt-4 text-lg text-white/90">{finalCta.sub}</p>
            <a href="#register" className="btn-primary mt-8 text-lg">{finalCta.cta}</a>
          </div>
        </section>
      </main>

      <footer className="bg-[#0e1c21] pb-28 pt-12 text-white/80 md:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-heading)" }}>{site.name}</p>
          <p className="mt-1 text-base">{site.address}</p>
          {agents.people.map((a, i) => (
            <p key={a.name} className={`text-base ${i === 0 ? "mt-6" : "mt-1"}`}>
              {a.name}, {a.role}, {agents.brand} · <a className="underline" href={a.phoneHref}>{a.phone}</a> · <a className="underline" href={`mailto:${a.email}`}>{a.email}</a>
            </p>
          ))}
          <p className="mt-6 text-sm">{agents.licence}</p>
          <p className="mt-1 text-sm">{footer.developer}</p>
          <p className="mt-6 max-w-4xl text-sm leading-relaxed">{footer.disclaimer}</p>
          <p className="mt-6 text-sm">© {new Date().getFullYear()} {footer.copyright} · <a className="underline" href={nav.brochure.href} target="_blank" rel="noopener">{nav.brochure.label}</a> · <a className="underline" href={nav.documents.href}>{nav.documents.label}</a> · <a className="underline" href="/marketing">{footer.marketingLink}</a></p>
        </div>
      </footer>

      <StickyCta />
    </>
  );
}

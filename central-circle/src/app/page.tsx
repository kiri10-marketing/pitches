import Image from "next/image";
import { site, hero, intro, facts, homes, garden, shared, design, steps, location, agent, form, footer } from "@/content/copy";
import SiteHeader from "@/components/SiteHeader";
import HomeTabs from "@/components/HomeTabs";
import EnquiryForm from "@/components/EnquiryForm";
import Reveal from "@/components/Reveal";
import LiveRender from "@/components/LiveRender";

function jsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Residence",
      name: site.name,
      description: site.description,
      url: site.url,
      image: `${site.url}${hero.image}`,
      address: { "@type": "PostalAddress", streetAddress: site.address, addressLocality: "Christchurch", addressRegion: "Canterbury", addressCountry: "NZ" },
    },
    { "@context": "https://schema.org", "@type": "Organization", name: "Circle Living", email: agent.email, url: agent.website, logo: `${site.url}${agent.logo}` },
  ];
}

const Centre = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-3xl px-6 text-center ${className}`}>{children}</div>
);

// A short vertical hairline between sections, as on The Rise.
const Stem = ({ dark = false }: { dark?: boolean }) => <div aria-hidden="true" className={`mx-auto h-20 w-px ${dark ? "bg-sage/30" : "bg-line"}`} />;

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
      <SiteHeader />
      <Reveal />

      <main>
        {/* Hero: drone film, rising from the street, day to night */}
        <section id="top" className="relative overflow-hidden bg-ink pt-[68px] sm:h-[100svh] sm:min-h-[560px] sm:pt-0">
          <div className="relative h-[100vw] max-h-[58svh] overflow-hidden sm:absolute sm:inset-0 sm:h-auto sm:max-h-none">
            <Image src={hero.filmPoster} alt={hero.imageAlt} fill priority sizes="100vw" className="object-cover" />
            <video className="hero-video absolute inset-0 h-full w-full object-cover" src={hero.video} poster={hero.filmPoster} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-[linear-gradient(to_bottom,rgba(29,38,32,0),#1d2620)] sm:hidden" />
            <span className="render-tag sm:hidden">{hero.renderNote}</span>
          </div>
          <div className="absolute inset-0 hidden sm:block bg-[linear-gradient(to_bottom,rgba(18,24,20,.55)_0%,rgba(18,24,20,0)_28%,rgba(18,24,20,0)_36%,rgba(18,24,20,.84)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-28 sm:hidden bg-[linear-gradient(to_bottom,rgba(18,24,20,.55),rgba(18,24,20,0))]" />
          <div className="relative z-10 px-6 pb-14 pt-8 text-center text-white sm:absolute sm:inset-x-0 sm:bottom-0 sm:pb-20 sm:pt-0">
            <p className="text-[0.8rem] uppercase tracking-[0.3em] text-white/90">{hero.eyebrow}</p>
            <h1 className="display h-xl mt-5 !text-white whitespace-pre-line">{hero.headline}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-[0.85rem] uppercase leading-relaxed tracking-[0.24em] text-white/90">{hero.status}</p>
            <div className="mt-8 flex justify-center gap-4">
              <a href="#register" className="btn btn-light">{hero.cta}</a>
              <a href="#homes" className="btn btn-ghost-light hidden sm:inline-flex">Explore</a>
            </div>
          </div>
          <span className="render-tag !left-auto right-3 !bottom-3 hidden sm:block">{hero.renderNote}</span>
        </section>

        {/* Intro */}
        <section className="pt-24 sm:pt-32">
          <Centre className="reveal">
            <div className="ring" aria-hidden="true" />
            <p className="eyebrow mt-8">{intro.eyebrow}</p>
            <h2 className="display h-lg mt-6">{intro.heading}</h2>
            <div className="mt-8 grid gap-5">{intro.body.map((p) => <p key={p} className="lede">{p}</p>)}</div>
          </Centre>
        </section>

        {/* Facts */}
        <section aria-label="At a glance" className="mx-auto max-w-[1400px] px-6 py-20 sm:px-8">
          <dl className="grid grid-cols-2 gap-px border-y border-line bg-line md:grid-cols-5">
            {facts.map((f) => (
              <div key={f.label} className="bg-stone px-4 py-8 text-center last:col-span-2 md:last:col-span-1">
                <dd className="font-[family-name:var(--font-display)] text-4xl text-ink sm:text-5xl">{f.value}</dd>
                <dt className="mt-2 text-[0.8rem] uppercase tracking-[0.18em]">{f.label}</dt>
              </div>
            ))}
          </dl>
        </section>

        {/* Homes */}
        <section id="homes" className="scroll-mt-20 bg-paper py-24 sm:py-32">
          <Centre className="reveal">
            <p className="eyebrow">{homes.eyebrow}</p>
            <h2 className="display h-lg mt-6">{homes.heading}</h2>
            <p className="lede mt-6">{homes.lede}</p>
          </Centre>
          <div className="reveal mx-auto mt-16 max-w-[1300px] px-4 sm:px-8"><HomeTabs /></div>
          <p className="mx-auto mt-12 max-w-3xl px-6 text-center text-sm text-body">{homes.areaNote}</p>
        </section>

        {/* The shared garden */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1400px] gap-10 px-6 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:items-end">
            <div className="reveal relative aspect-[3/2]">
              <Image src={garden.image} alt={garden.imageAlt} fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
              <LiveRender src={garden.film} poster={garden.image} />
              <span className="render-tag">Artist&apos;s impression</span>
            </div>
            <div className="reveal lg:pb-8">
              <p className="eyebrow">{garden.eyebrow}</p>
              <h2 className="display h-lg mt-6">{garden.heading}</h2>
              <p className="lede mt-6">{garden.body}</p>
              <div className="relative mt-10 aspect-[5/4] w-3/4">
                <Image src={garden.image2} alt={garden.image2Alt} fill sizes="30vw" className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Shared life, on Circle Living green */}
        <section id="shared" className="on-dark scroll-mt-20 bg-olive py-24 sm:py-32">
          <Centre className="reveal">
            <p className="eyebrow">{shared.eyebrow}</p>
            <h2 className="display h-lg mt-6">{shared.heading}</h2>
            <p className="lede mt-6">{shared.body}</p>
          </Centre>
          <Stem dark />
          <div className="reveal mx-auto grid max-w-[1400px] gap-4 sm:px-8 lg:grid-cols-[1.6fr_1fr]">
            <div className="relative aspect-[3/2]">
              <Image src={shared.image} alt={shared.imageAlt} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
              <LiveRender src={shared.film} poster={shared.image} />
              <span className="render-tag">Artist&apos;s impression</span>
            </div>
            <div className="relative hidden aspect-[3/2] lg:block lg:aspect-auto">
              <Image src={shared.image2} alt={shared.image2Alt} fill sizes="35vw" className="object-cover" />
            </div>
          </div>
          <ul className="mx-auto mt-14 grid max-w-[1400px] gap-px px-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
            {shared.features.map((f) => (
              <li key={f.name} className="reveal border-t border-sage/30 pt-6 pb-4 lg:px-4">
                <p className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.08em] text-white">{f.name}</p>
                <p className="mt-2 text-sage">{f.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Design and materials */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-6 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <div className="reveal">
              <p className="eyebrow">{design.eyebrow}</p>
              <h2 className="display h-lg mt-6">{design.heading}</h2>
              <p className="lede mt-6">{design.body}</p>
              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
                {design.materials.map((m) => (
                  <div key={m.name} className="border-t border-line pt-4">
                    <dt className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.08em] text-ink">{m.name}</dt>
                    <dd className="mt-1">{m.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="reveal relative aspect-[3/2]">
              <Image src={design.image} alt={design.imageAlt} fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
              <span className="render-tag">Indicative palette</span>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-paper py-24 sm:py-32">
          <Centre className="reveal">
            <p className="eyebrow">{steps.eyebrow}</p>
            <h2 className="display h-lg mt-6">{steps.heading}</h2>
            <p className="lede mt-6">{steps.body}</p>
          </Centre>
          <ol className="mx-auto mt-16 grid max-w-[1400px] gap-px px-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-5">
            {steps.items.map((s, i) => (
              <li key={s.name} className="reveal border-t border-line pt-6 pb-4 lg:px-4">
                <p className="font-[family-name:var(--font-display)] text-5xl text-bronze">{i + 1}</p>
                <p className="mt-3 font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.06em] text-ink">{s.name}</p>
                <p className="mt-2">{s.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Location */}
        <section id="location" className="scroll-mt-20 py-24 sm:py-32">
          <Centre className="reveal">
            <p className="eyebrow">{location.eyebrow}</p>
            <h2 className="display h-lg mt-6">{location.heading}</h2>
            <p className="lede mt-6">{location.body}</p>
          </Centre>
          <div className="mt-16 overflow-hidden border-y border-line py-8" aria-label="Nearby places">
            <ul className="marquee">
              {[...location.places, ...location.places].map((p, i) => (
                <li key={i} aria-hidden={i >= location.places.length} className="flex items-baseline gap-4 whitespace-nowrap px-10">
                  <span className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-[0.08em] text-ink">{p.name}</span>
                  <span className="text-sm uppercase tracking-[0.2em] text-bronze">{p.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-center text-sm">{location.note}</p>
        </section>

        {/* Selling agent (Circle Living) and register */}
        <section id="register" className="scroll-mt-20 bg-paper py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1300px] gap-16 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="reveal">
              <p className="eyebrow">{agent.eyebrow}</p>
              <Image src={agent.logo} alt="Circle Living" width={1352} height={267} className="mt-10 h-auto w-full max-w-[380px]" />
              <p className="mt-4 text-sm uppercase tracking-[0.16em] text-body">{agent.role}</p>
              <p className="mt-8">{agent.bio}</p>
              <dl className="mt-8 grid grid-cols-3 gap-px border border-line bg-line [&>div]:min-w-0">
                {agent.stats.map((s) => (
                  <div key={s.label} className="bg-paper px-2 py-4 text-center sm:p-4">
                    <dd className="font-[family-name:var(--font-display)] text-3xl text-ink">{s.value}</dd>
                    <dt className="mt-1 text-[0.68rem] uppercase leading-snug tracking-[0.1em] sm:tracking-[0.16em]">{s.label}</dt>
                  </div>
                ))}
              </dl>
              <div className="mt-8 grid gap-3 text-lg">
                <a href={`mailto:${agent.email}`} className="text-ink underline decoration-line underline-offset-8 hover:decoration-ink break-all">{agent.email}</a>
                <a href={agent.callHref} target="_blank" rel="noopener" className="text-ink underline decoration-line underline-offset-8 hover:decoration-ink">{agent.callLabel}</a>
                <a href={agent.website} target="_blank" rel="noopener" className="text-ink underline decoration-line underline-offset-8 hover:decoration-ink">{agent.websiteLabel}</a>
              </div>
              <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm uppercase tracking-[0.18em]">
                {agent.socials.map((s) => <a key={s.href} href={s.href} target="_blank" rel="noopener" className="hover:text-ink">{s.label}</a>)}
              </p>
              <p className="mt-6 text-sm">{agent.company}</p>
            </div>
            <div className="reveal">
              <p className="eyebrow">{form.eyebrow}</p>
              <h2 className="display h-lg mt-6">{form.heading}</h2>
              <p className="lede mt-6 mb-10">{form.lede}</p>
              <EnquiryForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="on-dark bg-olive py-16 text-sage">
        <div className="mx-auto max-w-[1300px] px-6 sm:px-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-[0.28em] pl-[0.28em] text-white">The Central Circle</p>
            <p className="font-[family-name:var(--font-display)] italic text-lg text-white/90">{site.by}</p>
            <p className="mt-2 text-[0.8rem] uppercase tracking-[0.28em]">{site.address} {site.address2} · {site.suburb}</p>
            <Image src={agent.logoReversed} alt="Circle Living" width={1352} height={267} className="mt-8 h-auto w-[220px]" />
            <p className="mt-2 text-[0.8rem] uppercase tracking-[0.22em]">Marketed by Circle Living · <a href={`mailto:${agent.email}`} className="underline underline-offset-4 hover:text-white normal-case tracking-normal">{agent.email}</a></p>
          </div>
          <div className="rule my-10" />
          <p className="text-sm leading-relaxed">{footer.disclaimer}</p>
          <p className="mt-6 text-sm">© {new Date().getFullYear()} The Central Circle · Circle Living</p>
        </div>
      </footer>
    </>
  );
}

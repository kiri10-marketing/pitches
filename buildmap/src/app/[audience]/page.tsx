import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { notFound } from "next/navigation";
import { copy } from "@/content/copy";
import { audiences, audienceOrder, audienceShared, type AudienceSlug, type Step } from "@/content/audiences";
import { Logo } from "@/components/Mark";
import { OrderForm } from "@/components/OrderForm";
import { AddressStart, AgentPlays, CommissionCalc, ConsentPath, DDClock, FlipCards, LandTabs, Pipeline, Reveal, ServiceCalc, WhiteLabel } from "@/components/audience/Modules";

// One page per audience: /agents, /builders, /landowners, /developers.
export const dynamicParams = false;
export function generateStaticParams() {
  return audienceOrder.map((audience) => ({ audience }));
}

type Props = { params: Promise<{ audience: string }> };
const isSlug = (s: string): s is AudienceSlug => (audienceOrder as readonly string[]).includes(s);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { audience } = await params;
  if (!isSlug(audience)) return {};
  return { title: audiences[audience].meta.title, description: audiences[audience].meta.description, alternates: { canonical: `/${audience}` } };
}

const GLOW = "bg-[radial-gradient(70rem_40rem_at_85%_8%,rgba(18,87,214,.26),transparent_60%),radial-gradient(60rem_40rem_at_0%_70%,rgba(127,176,255,.12),transparent_60%)]";
const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

function Dark({ id, eyebrow, title, intro, children }: { id?: string; eyebrow: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <Reveal as="section" id={id} className="relative scroll-mt-4 overflow-hidden bg-ink text-white">
      <div className={`pointer-events-none absolute inset-0 ${GLOW}`} aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="jr-eyebrow" data-r>{eyebrow}</p>
          <h2 className="mt-5 text-[2.4rem] font-medium sm:text-6xl" data-r style={d(0.08)}>{title}</h2>
          {intro && <p className="mx-auto mt-5 max-w-xl text-lg text-white/60" data-r style={d(0.16)}>{intro}</p>}
        </div>
        <div className="mt-14">{children}</div>
      </div>
    </Reveal>
  );
}

function Light({ id, eyebrow, title, children }: { id?: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <Reveal as="section" id={id} className="mx-auto max-w-6xl scroll-mt-4 px-4 py-24 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow" data-r>{eyebrow}</p>
        <h2 className="mt-3 text-4xl sm:text-6xl" data-r style={d(0.08)}>{title}</h2>
      </div>
      <div className="mt-12">{children}</div>
    </Reveal>
  );
}

function Steps({ title, steps }: { title: string; steps: readonly Step[] }) {
  return (
    <Light eyebrow={audienceShared.stepsEyebrow} title={title}>
      <ol className={`grid gap-4 sm:grid-cols-2 ${steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
        {steps.map((s, i) => (
          <li key={s.title} className="tile flex flex-col overflow-hidden" data-r style={d(0.1 + i * 0.14)}>
            <div className="overflow-hidden bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.img} alt={s.alt} loading="lazy" className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-base font-semibold text-white">{i + 1}</span>
              <h3 className="mt-4 text-2xl">{s.title}</h3>
              <p className="mt-2 flex-1 text-base text-muted">{s.body}</p>
              <p className="mt-5 text-sm font-semibold text-blue">{s.tag}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-center text-sm text-muted" data-r style={d(0.5)}>{audienceShared.sample}</p>
    </Light>
  );
}

function Member({ m }: { m: { title: string; body: string; cta: string } }) {
  return (
    <Reveal as="section" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <div className="flex flex-col items-start gap-6 rounded-[28px] bg-blue-soft p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between" data-r>
        <div className="max-w-2xl">
          <span className="tag">{audienceShared.soon}</span>
          <h2 className="mt-4 text-3xl sm:text-4xl">{m.title}</h2>
          <p className="mt-3 text-lg text-muted">{m.body}</p>
        </div>
        <a href="#start" className="btn btn-ink shrink-0">{m.cta}</a>
      </div>
    </Reveal>
  );
}

function HeroArt() {
  // Landowners: a picture of what the land could become, with what the report tells you floating over it.
  const chips = copy.demo.screens.concept.cards;
  return (
    <div className="relative mx-auto max-w-lg pb-8 pl-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/demo/teaser-render.webp" alt="A concept image of new homes on a section" fetchPriority="high" className="pop w-full rounded-[28px] shadow-[0_40px_90px_-30px_rgba(0,0,0,.8)]" />
      <span className="pop absolute -top-4 right-4 rounded-full bg-blue px-4 py-2 text-sm font-semibold text-white shadow-lg" style={{ animationDelay: ".5s" }}>First report free</span>
      <ul className="absolute bottom-0 left-0 space-y-2">
        {chips.map((c, i) => (
          <li key={c.k} className="pop flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5 text-ink shadow-[0_20px_50px_-15px_rgba(0,0,0,.6)]" style={{ animationDelay: `${0.8 + i * 0.3}s`, marginLeft: `${i * 1.25}rem` }}>
            <span className="text-sm text-muted">{c.k}</span>
            <span className="text-sm font-semibold text-blue">{c.v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function AudiencePage({ params }: Props) {
  const { audience } = await params;
  if (!isSlug(audience)) notFound();
  const a = audiences[audience];
  const { partners } = copy;
  const heroPiece = { agents: <AgentPlays />, builders: <WhiteLabel />, landowners: <HeroArt />, developers: <Pipeline /> }[audience];

  return (
    <main>
      <header className="relative isolate overflow-hidden bg-ink text-white">
        <div className={`pointer-events-none absolute inset-0 -z-10 ${GLOW}`} aria-hidden="true" />
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <a href="/" aria-label="BuildMap home">
            <Logo size={34} tone="paper" />
          </a>
          <ul className="hidden gap-7 text-base font-medium text-white/60 md:flex">
            {audienceOrder.map((s) => (
              <li key={s}>
                <a href={`/${s}`} aria-current={s === audience ? "page" : undefined} className={s === audience ? "text-white" : "hover:text-white"}>{audiences[s].nav}</a>
              </li>
            ))}
          </ul>
          <a href="#start" className="btn btn-blue min-h-11 whitespace-nowrap px-4 py-2 text-sm sm:px-5 sm:text-[0.95rem]">{a.cta}</a>
        </nav>

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-10 sm:px-6 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1fr_1.02fr] lg:gap-14 lg:pb-24 lg:pt-6">
          <div>
            <p className="jr-eyebrow pop">{a.eyebrow}</p>
            <h1 className="pop mt-5 text-[2.7rem] font-medium leading-[1] sm:text-7xl" style={{ animationDelay: ".1s" }}>
              <span className="block">{a.h1[0]}</span>
              <span className="block text-blue-light">{a.h1[1]}</span>
            </h1>
            <p className="pop mt-6 max-w-lg text-xl text-white/70" style={{ animationDelay: ".2s" }}>{a.sub}</p>
            {audience === "landowners" ? (
              <AddressStart />
            ) : (
              <div className="pop mt-9 flex flex-wrap gap-3" style={{ animationDelay: ".3s" }}>
                <a href="#start" className="btn btn-blue">{a.cta}</a>
                <a href={a.cta2Href} className="btn bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20">{a.cta2}</a>
              </div>
            )}
          </div>
          <div>{heroPiece}</div>
        </div>
      </header>

      {/* The pain, in one line */}
      <Reveal as="section" className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <p className="text-balance text-[2rem] font-semibold leading-[1.12] tracking-[-0.035em] sm:text-[3.4rem]" data-r>
          <span className="text-muted/70">{a.pain.quiet}</span> {a.pain.loud}
        </p>
      </Reveal>

      {audience === "agents" && (
        <>
          <Dark id="money" eyebrow={audiences.agents.calc.eyebrow} title={audiences.agents.calc.title} intro={audiences.agents.calc.intro}>
            <CommissionCalc />
          </Dark>
          <Steps title={a.stepsTitle} steps={a.steps} />
          <Member m={audiences.agents.member} />
        </>
      )}

      {audience === "builders" && (
        <>
          <Dark id="path" eyebrow={audiences.builders.path.eyebrow} title={audiences.builders.path.title}>
            <ConsentPath />
          </Dark>
          <Steps title={a.stepsTitle} steps={a.steps} />
          <Reveal as="section" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
            <div className="tile p-7 sm:p-12" data-r>
              <p className="eyebrow">{audiences.builders.calc.eyebrow}</p>
              <h2 className="mt-3 text-4xl sm:text-5xl">{audiences.builders.calc.title}</h2>
              <p className="mt-3 text-lg text-muted">{audiences.builders.calc.intro}</p>
              <div className="mt-10">
                <ServiceCalc />
              </div>
            </div>
          </Reveal>
        </>
      )}

      {audience === "landowners" && (
        <>
          <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">{audiences.landowners.tabs.eyebrow}</p>
              <h2 className="mt-3 text-4xl sm:text-6xl">{audiences.landowners.tabs.title}</h2>
            </div>
            <div className="mt-10">
              <LandTabs />
            </div>
          </section>
          <Reveal as="section" id="answers" className="mx-auto max-w-6xl scroll-mt-4 px-4 pb-8 sm:px-6">
            <p className="eyebrow" data-r>{audiences.landowners.flips.eyebrow}</p>
            <h2 className="mt-3 text-4xl sm:text-5xl" data-r style={d(0.08)}>{audiences.landowners.flips.title}</h2>
            <div className="mt-10">
              <FlipCards />
            </div>
          </Reveal>
          <Steps title={a.stepsTitle} steps={a.steps} />
        </>
      )}

      {audience === "developers" && (
        <>
          <Dark id="clock" eyebrow={audiences.developers.clock.eyebrow} title={audiences.developers.clock.title}>
            <DDClock />
          </Dark>
          <Steps title={a.stepsTitle} steps={a.steps} />
          <Member m={audiences.developers.member} />
        </>
      )}

      {/* Authority: the partners behind the reports */}
      <Reveal as="section" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <p className="eyebrow" data-r>{partners.eyebrow}</p>
        <h2 className="mt-3 max-w-3xl text-balance text-4xl sm:text-5xl" data-r style={d(0.08)}>{audienceShared.partners}</h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className="tile grid overflow-hidden sm:grid-cols-[.8fr_1fr]" data-r style={d(0.15)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/partners/fg-hereford.webp" alt={`${partners.architect.images[0].name}, a project by Figure & Ground`} loading="lazy" className="h-48 w-full object-cover sm:h-full" />
            <div className="p-7">
              <h3 className="text-2xl">{partners.architect.name}</h3>
              <p className="mt-2 text-base text-muted">{partners.architect.offer}</p>
              <p className="mt-4 text-xs text-muted">{partners.architect.credit}</p>
            </div>
          </div>
          <div className="rounded-[28px] bg-ink p-7 text-white sm:p-9" data-r style={d(0.25)}>
            <p className="jr-eyebrow">{partners.planner.role}</p>
            <h3 className="mt-3 text-2xl">{partners.planner.name}</h3>
            <p className="mt-2 text-base text-white/65">{partners.planner.body}</p>
            <p className="mt-4 text-base font-semibold text-blue-light">{partners.planner.offer}</p>
          </div>
        </div>
      </Reveal>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="rounded-[28px] border border-line p-6 sm:p-7" role="note">
          <p className="text-base font-semibold">{copy.conceptOnly.title}</p>
          <p className="mt-1 max-w-4xl text-base text-muted">{copy.conceptOnly.body}</p>
        </div>
      </section>

      <section id="start" className="bg-paper-2">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <div className="rounded-[28px] bg-white p-6 shadow-[0_2px_8px_rgba(11,27,51,.06),0_8px_40px_rgba(11,27,51,.05)] sm:p-10">
            <OrderForm clientType={a.form.clientType} level={a.form.level} title={a.form.title} intro={a.form.intro} />
          </div>
        </div>
      </section>

      {/* The other audiences */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="eyebrow">{audienceShared.others}</p>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {audienceOrder.filter((s) => s !== audience).map((s) => (
            <li key={s}>
              <a href={`/${s}`} className="tile group flex h-full flex-col p-7 transition-colors hover:bg-ink hover:text-white">
                <h3 className="text-2xl">{audiences[s].nav}</h3>
                <p className="mt-3 flex-1 text-base text-muted group-hover:text-white/70">{audiences[s].tile}</p>
                <span className="mt-6 text-base font-semibold text-blue group-hover:text-blue-light">{copy.who.more} <span aria-hidden="true">→</span></span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="px-4 pb-12 text-sm text-muted sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <a href="/" className="text-ink" aria-label="BuildMap home">
            <Logo size={30} />
          </a>
          <div className="max-w-2xl">
            <p className="font-semibold text-ink">{copy.conceptOnly.short}</p>
            <p className="mt-2">{copy.disclaimer}</p>
            <p className="mt-3">© {copy.brand}, New Zealand</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

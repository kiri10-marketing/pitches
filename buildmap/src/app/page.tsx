import { copy } from "@/content/copy";
import { OrderForm } from "@/components/OrderForm";
import { HeroDemo } from "@/components/HeroDemo";
import { Journey } from "@/components/Journey";
import { Logo, Mark } from "@/components/Mark";
import { audiences, audienceOrder } from "@/content/audiences";

export default function Home() {
  const { hero, proof, story, who, manifesto, pitch, partners } = copy;
  return (
    <main>
      {/* The banner: the product demo fills it, with the timeline along the bottom */}
      <header className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-paper">
        {/* A Canterbury Plains backdrop: an empty paddock under the Southern Alps. Washed pale at the top so the words stay easy to read. */}
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero-landscape.webp" alt="" fetchPriority="high" className="h-full w-full scale-[1.04] object-cover object-[50%_72%] blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-paper via-paper/60 via-[22%] to-paper/0 to-[46%]" />
          <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-ink/80 via-ink/35 to-transparent" />
        </div>
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#" aria-label="BuildMap home">
            <Logo size={34} />
          </a>
          <ul className="hidden gap-8 text-base font-medium text-muted lg:flex">
            {copy.nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-ink">{n.label}</a>
              </li>
            ))}
          </ul>
          <a href="#start" className="btn btn-blue min-h-11 px-5 py-2 text-[0.95rem]">
            {hero.cta}
          </a>
        </nav>

        <div className="flex flex-1 flex-col justify-center pt-1">
          <HeroDemo />
        </div>

        <div className="mx-auto max-w-5xl px-4 pb-7 text-center sm:-mt-9 sm:px-6 sm:pb-8">
          <h1 className="text-[1.9rem] leading-[1.02] text-white [text-shadow:0_2px_24px_rgba(11,27,51,.55)] sm:text-[2.5rem]">
            <span className="block">{hero.headline}</span>
            <span className="block text-blue-light">{hero.headline2}</span>
          </h1>
        </div>
      </header>

      {/* The promise */}
      <section className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <p className="text-[2rem] font-semibold leading-[1.12] tracking-[-0.035em] sm:text-[3.4rem]">
          <span className="text-muted/70">{pitch.line1}</span> {pitch.line2}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href="#start" className="btn btn-blue">{hero.cta}</a>
          <a href="#journey" className="btn btn-line">{hero.cta2}</a>
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-1 text-base text-muted">
          {hero.ticks.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">{copy.conceptOnly.short}</p>
      </section>

      {/* The vertical timeline: what you get at each milestone */}
      <Journey />

      {/* Partners: the architects behind the floor plans and the planners behind the reports */}
      <section id="partners" className="mx-auto max-w-6xl px-4 pt-24 sm:px-6 sm:pt-32">
        <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">{partners.eyebrow}</p>
            <h2 className="mt-3 text-4xl sm:text-6xl">{partners.architect.title}</h2>
          </div>
          <div>
            <p className="text-lg text-muted">{partners.architect.body}</p>
            <p className="mt-3 text-xl font-semibold tracking-[-0.02em]">{partners.architect.offer}</p>
            <a href={partners.architect.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-base font-semibold text-blue hover:text-blue-dark">{partners.architect.link} →</a>
          </div>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
          {partners.architect.images.map((im, i) => (
            <li key={im.file} className={`group relative overflow-hidden rounded-[22px] bg-paper-2 sm:rounded-[28px] ${["col-span-2 aspect-[3/2] lg:row-span-2 lg:aspect-auto", "aspect-[3/4] lg:row-span-2 lg:aspect-auto", "aspect-[3/4] lg:aspect-[3/2]", "col-span-2 aspect-[3/2] lg:col-span-1"][i]}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/partners/fg-${im.file}.webp`} alt={`${im.name}, a project by ${partners.architect.name}`} width={im.w} height={im.h} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4 pt-12 text-sm font-semibold text-white sm:p-5 sm:pt-14 sm:text-base">{im.name}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-muted">{partners.architect.credit}</p>

        <div className="mt-6 grid items-center gap-8 rounded-[28px] bg-ink p-8 text-white sm:p-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-blue-light uppercase">{partners.planner.role}</p>
            <p className="mt-4 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">{partners.planner.name}</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl">{partners.planner.title}</h3>
            <p className="mt-4 text-lg text-white/70">{partners.planner.body}</p>
            <p className="mt-3 text-xl font-semibold tracking-[-0.02em]">{partners.planner.offer}</p>
            <a href={partners.planner.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-base font-semibold text-blue-light hover:text-white">{partners.planner.link} →</a>
          </div>
        </div>
      </section>

      {/* Powered by data, guided by authority */}
      <section id="trust" className="mx-auto max-w-6xl px-4 pb-24 pt-24 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{proof.eyebrow}</p>
          <h2 className="mt-3 text-4xl sm:text-6xl">
            Powered by data. <span className="text-blue">Guided by authority.</span>
          </h2>
          <p className="mt-5 text-lg text-muted">{proof.intro}</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {proof.sides.map((side, i) => (
            <div key={side.name} className={i === 0 ? "tile p-8 sm:p-10" : "rounded-[28px] bg-ink p-8 text-white sm:p-10"}>
              <h3 className="text-3xl">{side.name}</h3>
              <ul className="mt-6 space-y-4">
                {side.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-lg">
                    <span className={`mt-[0.55em] h-2 w-2 shrink-0 rounded-full ${i === 0 ? "bg-blue" : "bg-blue-light"}`} aria-hidden="true" />
                    <span className={i === 0 ? "" : "text-white/90"}>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center text-xl text-muted">{proof.statement}</p>
      </section>

      {/* Why we built it */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className="eyebrow">{story.eyebrow}</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">{story.title}</h2>
          </div>
          <div className="space-y-5 text-xl leading-relaxed">
            {story.paras.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section id="who" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <p className="eyebrow">{who.eyebrow}</p>
        <h2 className="mt-3 max-w-3xl text-4xl sm:text-5xl">{who.title}</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audienceOrder.map((slug) => (
            <li key={slug}>
              <a href={`/${slug}`} className="tile group flex h-full flex-col p-7 transition-colors hover:bg-ink hover:text-white">
                <h3 className="text-2xl">{audiences[slug].nav}</h3>
                <p className="mt-3 flex-1 text-base text-muted group-hover:text-white/70">{audiences[slug].tile}</p>
                <span className="mt-6 text-base font-semibold text-blue group-hover:text-blue-light">{who.more} <span aria-hidden="true">→</span></span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Why BuildMap */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <figure className="rounded-[28px] bg-ink px-6 py-20 text-center text-white sm:px-16 sm:py-24">
          <Mark size={56} tone="paper" className="mx-auto" />
          <blockquote className="mx-auto mt-8 max-w-4xl text-[1.7rem] font-semibold leading-[1.18] tracking-[-0.03em] sm:text-[2.5rem]">“{manifesto.quote}”</blockquote>
          <figcaption className="mt-7 text-lg text-blue-light">{manifesto.sign}</figcaption>
          <p className="mx-auto mt-10 max-w-2xl border-t border-white/15 pt-8 text-lg text-white/75">{manifesto.follow}</p>
        </figure>
      </section>

      {/* Reports and prices */}
      <section id="compare" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{copy.compare.eyebrow}</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">{copy.compare.title}</h2>
          <p className="mt-5 text-lg text-muted">{copy.compare.intro}</p>
        </div>
        {/* Wide screens: a table */}
        <div className="tile mt-12 hidden overflow-hidden p-2 md:block">
          <table className="w-full border-separate border-spacing-0 text-left">
            <caption className="sr-only">{copy.compare.intro}</caption>
            <thead>
              <tr>
                <th scope="col" rowSpan={2} className="p-5 align-bottom text-base font-semibold text-muted">{copy.compare.cols.stage}</th>
                <th scope="colgroup" colSpan={2} className="p-5 pb-1 text-xl font-semibold text-muted">{copy.compare.cols.usual}</th>
                <th scope="colgroup" colSpan={2} className="rounded-t-[22px] bg-ink p-5 pb-1 text-xl font-semibold text-white">{copy.compare.cols.buildmap}</th>
              </tr>
              <tr className="text-sm font-semibold">
                <th scope="col" className="px-5 pb-4 text-muted">{copy.compare.cols.cost}</th>
                <th scope="col" className="px-5 pb-4 text-muted">{copy.compare.cols.time}</th>
                <th scope="col" className="bg-ink px-5 pb-4 text-blue-light">{copy.compare.cols.cost}</th>
                <th scope="col" className="bg-ink px-5 pb-4 text-blue-light">{copy.compare.cols.time}</th>
              </tr>
            </thead>
            <tbody>
              {copy.compare.rows.map((r, i, all) => {
                const last = i === all.length - 1;
                return (
                  <tr key={r.stage} className="text-lg">
                    <th scope="row" className="border-t border-line p-5 text-xl font-semibold">{r.stage}</th>
                    <td className="border-t border-line p-5 text-muted">{r.usual.cost}</td>
                    <td className="border-t border-line p-5 text-muted">{r.usual.time}</td>
                    <td className={`border-t border-white/15 whitespace-nowrap bg-ink p-5 font-semibold text-white ${last ? "rounded-bl-[22px]" : ""}`}>{r.buildmap.cost}</td>
                    <td className={`border-t border-white/15 whitespace-nowrap bg-ink p-5 font-semibold text-white ${last ? "rounded-br-[22px]" : ""}`}>{r.buildmap.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Phones: one card per stage */}
        <ul className="mt-10 grid gap-4 md:hidden">
          {copy.compare.rows.map((r) => (
            <li key={r.stage} className="tile p-5">
              <h3 className="text-xl">{r.stage}</h3>
              <dl className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white p-4">
                  <dt className="text-sm font-semibold text-muted">{copy.compare.cols.usual}</dt>
                  <dd className="mt-2 text-base text-muted">{r.usual.cost}</dd>
                  <dd className="mt-1 text-base text-muted">{r.usual.time}</dd>
                </div>
                <div className="rounded-2xl bg-ink p-4 text-white">
                  <dt className="text-sm font-semibold text-blue-light">{copy.compare.cols.buildmap}</dt>
                  <dd className="mt-2 text-base font-semibold">{r.buildmap.cost}</dd>
                  <dd className="mt-1 text-base font-semibold">{r.buildmap.time}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-5 max-w-3xl text-center text-sm text-muted">{copy.compare.note}</p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="rounded-[28px] border border-line p-6 sm:p-7" role="note">
          <p className="text-base font-semibold">{copy.conceptOnly.title}</p>
          <p className="mt-1 max-w-4xl text-base text-muted">{copy.conceptOnly.body}</p>
        </div>
      </section>

      <section id="start" className="bg-paper-2">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <div className="rounded-[28px] bg-white p-6 shadow-[0_2px_8px_rgba(11,27,51,.06),0_8px_40px_rgba(11,27,51,.05)] sm:p-10">
            <OrderForm />
          </div>
        </div>
      </section>

      <footer className="px-4 py-12 text-sm text-muted sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="text-ink">
            <Logo size={30} />
          </div>
          <div className="max-w-2xl">
            <p className="font-semibold text-ink">{copy.conceptOnly.short}</p>
            <p className="mt-2">{copy.disclaimer}</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-base font-semibold text-ink">
              {audienceOrder.map((slug) => (
                <li key={slug}>
                  <a href={`/${slug}`} className="hover:text-blue">For {audiences[slug].nav.toLowerCase()}</a>
                </li>
              ))}
            </ul>
            <p className="mt-3">© {copy.brand}, New Zealand</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

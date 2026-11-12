import { copy } from "@/content/copy";
import { OrderForm } from "@/components/OrderForm";
import { HeroDemo } from "@/components/HeroDemo";
import { Logo, Mark, Contours } from "@/components/Mark";

export default function Home() {
  const { hero, steps, proof, journey, who, manifesto, how } = copy;
  return (
    <main>
      <header className="relative overflow-hidden bg-ink text-paper">
        <Contours className="pointer-events-none absolute inset-0 h-full w-full text-paper opacity-[0.09]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="flex items-center justify-between border-b border-paper/15 py-5">
            <a href="#" aria-label="BuildMap home">
              <Logo tone="paper" size={38} />
            </a>
            <ul className="hidden gap-8 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-mist lg:flex">
              {copy.nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-paper">{n.label}</a>
                </li>
              ))}
            </ul>
            <a href="#start" className="btn btn-line hidden min-h-11 py-2 text-brass-light sm:inline-flex">
              {hero.cta}
            </a>
          </nav>

          <div className="grid items-center gap-12 pb-20 pt-12 lg:grid-cols-[1fr_1.02fr] lg:gap-14 lg:pb-24 lg:pt-16">
            <div className="min-w-0">
              <p className="eyebrow text-brass-light">{hero.eyebrow}</p>
              <h1 className="mt-6 text-[2.9rem] sm:text-6xl lg:text-[4.1rem]">
                {hero.headline}
                <span className="italic-serif mt-3 block text-[0.62em] leading-tight text-brass-light">{hero.headline2}</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg text-mist sm:text-xl">{hero.subheader}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#start" className="btn btn-brass">{hero.cta}</a>
                <a href="#journey" className="btn btn-line">{hero.cta2}</a>
              </div>
              <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist">
                {hero.ticks.map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rotate-45 bg-brass-light" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 px-1.5 sm:px-0">
              <HeroDemo />
            </div>
          </div>
        </div>
      </header>

      {/* Who is behind it */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow text-brass-dark">{proof.eyebrow}</p>
            <p className="mt-5 font-[family-name:var(--font-head)] text-[2rem] leading-[1.18] sm:text-[2.6rem]">{proof.statement}</p>
          </div>
          <dl className="divide-y divide-line border-y border-line self-center">
            {proof.points.map((p) => (
              <div key={p.big} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="font-[family-name:var(--font-head)] text-3xl">{p.big}</dt>
                <dd className="text-right font-mono text-[0.74rem] uppercase tracking-[0.14em] text-muted">{p.small}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* The journey */}
      <section id="journey" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="eyebrow text-brass-dark">{journey.eyebrow}</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">{journey.title}</h2>
          <p className="mt-5 text-lg text-muted">{journey.intro}</p>
        </div>
        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-8">
          <span className="absolute left-0 right-0 top-[1.35rem] hidden border-t border-dashed border-brass md:block" aria-hidden="true" />
          {journey.stages.map((s, i) => (
            <li key={s.name} className="relative">
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-ink bg-paper font-mono text-sm">
                {i === 3 ? <span className="h-0 w-0 border-x-[7px] border-b-[12px] border-x-transparent border-b-brass" aria-label="4" /> : i + 1}
              </span>
              <h3 className="mt-5 text-[1.75rem]">{s.name}</h3>
              <p className="mt-2 text-base text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Who it's for */}
      <section id="who" className="bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="eyebrow text-brass-dark">{who.eyebrow}</p>
          <h2 className="mt-4 max-w-3xl text-4xl sm:text-5xl">{who.title}</h2>
          <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {who.groups.map((g, i) => (
              <li key={g.name} className="bg-card p-7">
                <span className="font-mono text-[0.72rem] tracking-[0.16em] text-brass-dark">0{i + 1}</span>
                <h3 className="mt-3 text-2xl">{g.name}</h3>
                <p className="mt-3 text-base text-muted">{g.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why BuildMap */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <Contours className="pointer-events-none absolute inset-0 h-full w-full text-paper opacity-[0.07]" />
        <figure className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
          <Mark size={64} tone="paper" className="mx-auto" />
          <p className="eyebrow mt-8 text-brass-light">{manifesto.eyebrow}</p>
          <blockquote className="mt-6 font-[family-name:var(--font-head)] text-[1.8rem] leading-[1.25] sm:text-[2.4rem]">{manifesto.quote}</blockquote>
          <figcaption className="italic-serif mt-8 text-lg text-mist">{manifesto.sign}</figcaption>
        </figure>
      </section>

      {/* Reports and prices */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="eyebrow text-brass-dark">{how.eyebrow}</p>
        <h2 className="mt-4 text-4xl sm:text-5xl">{how.title}</h2>
        <ol className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="flex flex-col bg-card p-7">
              <span className="font-mono text-[0.72rem] tracking-[0.16em] text-brass-dark">Level 0{s.n}</span>
              <h3 className="mt-3 text-2xl">{s.title}</h3>
              <p className="mt-2 font-mono text-[0.74rem] uppercase tracking-[0.12em] text-brass-dark">{s.time}</p>
              <p className="mt-3 text-base text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <a href="#start" className="btn btn-ink">{hero.cta}</a>
        </div>
      </section>

      <section id="start" className="border-t border-line bg-paper-2">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <div className="sheet p-6 sm:p-10">
            <OrderForm />
          </div>
        </div>
      </section>

      <footer className="bg-ink px-4 py-12 text-sm text-mist sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-paper">
            <Logo tone="paper" size={34} />
            <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-mist">Address to completion</p>
          </div>
          <div className="max-w-2xl">
            <p>{copy.disclaimer}</p>
            <p className="mt-3">© {copy.brand}, New Zealand</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

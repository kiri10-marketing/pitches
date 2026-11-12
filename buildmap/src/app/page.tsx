import { copy } from "@/content/copy";
import { OrderForm } from "@/components/OrderForm";
import { HeroDemo } from "@/components/HeroDemo";
import { Logo, Mark } from "@/components/Mark";

export default function Home() {
  const { hero, steps, proof, who, manifesto, how, pitch, assets } = copy;
  return (
    <main>
      {/* The banner: the product demo fills it, with the timeline along the bottom */}
      <header className="flex min-h-[100svh] flex-col overflow-hidden bg-gradient-to-b from-paper via-paper to-blue-soft">
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

        <div className="mx-auto max-w-4xl px-4 pt-4 text-center sm:px-6 sm:pt-5">
          <h1 className="text-[2.2rem] sm:text-5xl lg:text-[3.4rem]">
            {hero.headline} <span className="text-blue sm:block">{hero.headline2}</span>
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-lg text-muted">{hero.subheader}</p>
        </div>

        <div className="flex flex-1 flex-col justify-end pb-2 pt-7">
          <HeroDemo />
        </div>
      </header>

      {/* The promise */}
      <section className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <p className="text-[2rem] font-semibold leading-[1.12] tracking-[-0.035em] sm:text-[3.4rem]">
          <span className="text-muted/70">{pitch.line1}</span> {pitch.line2}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href="#start" className="btn btn-blue">{hero.cta}</a>
          <a href="#assets" className="btn btn-line">{hero.cta2}</a>
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-1 text-base text-muted">
          {hero.ticks.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      {/* What you get */}
      <section id="assets" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{assets.eyebrow}</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">{assets.title}</h2>
          <p className="mt-5 text-lg text-muted">{assets.intro}</p>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {assets.items.map((a, i) => (
            <li key={a.name} className="tile flex flex-col p-7">
              <AssetArt i={i} />
              <h3 className="mt-6 text-2xl">{a.name}</h3>
              <p className="mt-2 text-base text-muted">{a.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Who is behind it */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="tile grid gap-10 p-8 sm:p-14 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">{proof.eyebrow}</p>
            <p className="mt-4 text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[2.6rem]">{proof.statement}</p>
          </div>
          <dl className="self-center divide-y divide-line">
            {proof.points.map((p) => (
              <div key={p.big} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-3xl font-semibold tracking-[-0.03em]">{p.big}</dt>
                <dd className="text-right text-base text-muted">{p.small}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Who it's for */}
      <section id="who" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <p className="eyebrow">{who.eyebrow}</p>
        <h2 className="mt-3 max-w-3xl text-4xl sm:text-5xl">{who.title}</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {who.groups.map((g) => (
            <li key={g.name} className="tile p-7">
              <h3 className="text-2xl">{g.name}</h3>
              <p className="mt-3 text-base text-muted">{g.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Why BuildMap */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <figure className="rounded-[28px] bg-ink px-6 py-20 text-center text-white sm:px-16 sm:py-24">
          <Mark size={56} tone="paper" className="mx-auto" />
          <blockquote className="mx-auto mt-8 max-w-4xl text-[1.7rem] font-semibold leading-[1.18] tracking-[-0.03em] sm:text-[2.5rem]">{manifesto.quote}</blockquote>
          <figcaption className="mt-7 text-lg text-blue-light">{manifesto.sign}</figcaption>
        </figure>
      </section>

      {/* Reports and prices */}
      <section id="how" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <p className="eyebrow">{how.eyebrow}</p>
        <h2 className="mt-3 text-4xl sm:text-5xl">{how.title}</h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="tile flex flex-col p-7">
              <span className="text-base font-semibold text-muted">Level {s.n}</span>
              <h3 className="mt-2 text-2xl">{s.title}</h3>
              <p className="mt-2 text-base font-semibold text-blue">{s.time}</p>
              <p className="mt-3 text-base text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
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
            <p>{copy.disclaimer}</p>
            <p className="mt-3">© {copy.brand}, New Zealand</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Small drawings for the three things you get: website, brochure, marketing assets.
function AssetArt({ i }: { i: number }) {
  if (i === 0)
    return (
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(11,27,51,.07)]" aria-hidden="true">
        <div className="flex gap-1.5 p-2.5">
          {[0, 1, 2].map((d) => (
            <span key={d} className="h-2 w-2 rounded-full bg-line" />
          ))}
        </div>
        <svg viewBox="0 0 100 46" className="block w-full bg-ink">
          <path d="M0 46V32l16-6v20ZM22 46V16l26-8 26 8v30ZM80 46V28l20-5v23Z" fill="#14294A" />
          {[22, 29, 36].map((y) => [29, 38, 47, 56, 65].map((x) => <rect key={`${x}${y}`} x={x - 2} y={y} width="4" height="4.5" fill="#7FB0FF" />))}
        </svg>
        <div className="flex items-center justify-between p-3">
          <span className="h-2 w-24 rounded-full bg-line" />
          <span className="h-6 w-20 rounded-full bg-blue" />
        </div>
      </div>
    );
  if (i === 1)
    return (
      <div className="relative h-[11.5rem]" aria-hidden="true">
        <span className="absolute inset-y-2 left-[30%] w-[44%] rotate-6 rounded-lg bg-white shadow-[0_2px_12px_rgba(11,27,51,.07)]" />
        <span className="absolute inset-y-2 left-[22%] flex w-[44%] -rotate-3 flex-col gap-2 rounded-lg bg-white p-3 shadow-[0_2px_12px_rgba(11,27,51,.1)]">
          <span className="block flex-1 rounded bg-ink" />
          <span className="block h-2 w-4/5 rounded-full bg-line" />
          <span className="block h-2 w-3/5 rounded-full bg-line" />
        </span>
      </div>
    );
  return (
    <div className="grid h-[11.5rem] grid-cols-3 grid-rows-2 gap-2.5" aria-hidden="true">
      <span className="row-span-2 rounded-xl bg-blue" />
      <span className="rounded-xl bg-ink" />
      <span className="rounded-xl bg-blue-light" />
      <span className="col-span-2 rounded-xl bg-white shadow-[0_2px_12px_rgba(11,27,51,.07)]" />
    </div>
  );
}

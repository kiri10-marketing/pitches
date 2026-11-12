import { copy } from "@/content/copy";
import { OrderForm } from "@/components/OrderForm";
import { HeroDemo } from "@/components/HeroDemo";
import { Logo, Mark } from "@/components/Mark";

export default function Home() {
  const { hero, steps, proof, story, who, manifesto, how, pitch, assets } = copy;
  return (
    <main>
      {/* The banner: the product demo fills it, with the timeline along the bottom */}
      <header className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-paper">
        {/* A Canterbury Plains backdrop: an empty paddock under the Southern Alps. Washed pale at the top so the words stay easy to read. */}
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero-landscape.webp" alt="" fetchPriority="high" className="h-full w-full object-cover object-[50%_72%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-paper via-paper/80 via-[38%] to-paper/0 to-[72%]" />
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

        <div className="mx-auto max-w-4xl px-4 pt-4 text-center sm:px-6 sm:pt-5">
          <h1 className="text-balance text-[2.2rem] sm:text-5xl lg:text-[3.4rem]">
            {hero.headline} <span className="mt-1 block text-[0.62em] text-blue">{hero.headline2}</span>
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
        <p className="mt-4 text-sm text-muted">{copy.conceptOnly.short}</p>
      </section>

      {/* What you get */}
      <section id="inside" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{copy.teaser.eyebrow}</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">{copy.teaser.title}</h2>
          <p className="mt-5 text-lg text-muted">{copy.teaser.intro}</p>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-6">
          {copy.teaser.items.map((t, i) => (
            <li key={t.img} className={`tile flex flex-col p-5 sm:p-6 ${i === 0 || i === 3 ? "md:col-span-4" : "md:col-span-2"}`}>
              <div className="flex flex-1 items-center justify-center overflow-hidden rounded-2xl border border-line bg-white p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/demo/teaser-${t.img}.webp`} alt={`Sample ${t.name.toLowerCase()} from a BuildMap report`} width={t.w} height={t.h} loading="lazy" className="h-auto max-h-80 w-full object-contain" />
              </div>
              <h3 className="mt-5 text-xl">{t.name}</h3>
              <p className="mt-1 text-base text-muted">{t.body}</p>
            </li>
          ))}
          <li className="tile relative overflow-hidden p-5 sm:p-6 md:col-span-6">
            <div className="grid items-center gap-6 md:grid-cols-[1.5fr_1fr]">
              <div className="relative max-h-56 overflow-hidden rounded-2xl border border-line bg-white p-3" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/demo/teaser-${copy.teaser.locked.img}.webp`} alt="" width={copy.teaser.locked.w} height={copy.teaser.locked.h} loading="lazy" className="h-auto w-full" />
                <span className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-white via-white/85 to-transparent" />
              </div>
              <div>
                <h3 className="text-xl">{copy.teaser.locked.name}</h3>
                <p className="mt-1 text-base text-muted">{copy.teaser.locked.body}</p>
                <p className="mt-4 text-base font-semibold">{copy.teaser.locked.more}</p>
                <a href="#start" className="btn btn-blue mt-4">{copy.teaser.locked.cta}</a>
              </div>
            </div>
          </li>
        </ul>
        <p className="mt-4 text-center text-sm text-muted">{copy.teaser.note}</p>
      </section>

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

      {/* Powered by data, guided by authority */}
      <section id="trust" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
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
        <div className="mt-4 rounded-[28px] border border-line p-6 sm:p-7" role="note">
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
            <p className="mt-3">© {copy.brand}, New Zealand</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Small drawings for the three things you get: website, brochure, marketing assets.
// Real examples from one BuildMap project (address changed): its website, brochure and ads.
function AssetArt({ i }: { i: number }) {
  /* eslint-disable @next/next/no-img-element */
  if (i === 0)
    return (
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(11,27,51,.07)]" aria-hidden="true">
        <div className="flex gap-1.5 p-2.5">
          {[0, 1, 2].map((d) => (
            <span key={d} className="h-2 w-2 rounded-full bg-line" />
          ))}
        </div>
        <img src="/demo/site-poster.jpg" alt="" width={1120} height={700} loading="lazy" className="block h-[9.6rem] w-full object-cover object-top" />
      </div>
    );
  if (i === 1)
    return (
      <div className="relative h-[11.5rem]" aria-hidden="true">
        <img src="/demo/brochure-2.webp" alt="" loading="lazy" className="absolute left-[18%] top-3 w-[72%] rotate-3 rounded-sm shadow-[0_2px_12px_rgba(11,27,51,.12)]" />
        <img src="/demo/brochure-1.webp" alt="" loading="lazy" className="absolute left-[8%] top-6 w-[72%] -rotate-2 rounded-sm shadow-[0_4px_16px_rgba(11,27,51,.18)]" />
      </div>
    );
  return (
    <div className="grid h-[11.5rem] grid-cols-3 gap-2.5" aria-hidden="true">
      {[2, 1, 3].map((n) => (
        <img key={n} src={`/demo/ad-${n}.webp`} alt="" loading="lazy" className="h-[11.5rem] w-full rounded-xl object-cover object-top" />
      ))}
    </div>
  );
  /* eslint-enable @next/next/no-img-element */
}

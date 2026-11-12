import { copy } from "@/content/copy";
import { OrderForm } from "@/components/OrderForm";

export default function Home() {
  const { hero, steps } = copy;
  return (
    <main>
      <header className="grid-bg bg-navy text-white">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-[family-name:var(--font-head)] text-2xl font-extrabold">
              <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
                <rect x="1" y="1" width="26" height="26" rx="6" fill="none" stroke="#f0a830" strokeWidth="2" />
                <path d="M6 20 L12 9 L16 15 L19 11 L23 20 Z" fill="#f0a830" />
              </svg>
              {copy.brand}
            </span>
            <a href="#start" className="btn btn-line hidden min-h-0 py-2 text-base sm:inline-flex">
              {hero.cta}
            </a>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-16">
          <p className="eyebrow text-amber">{hero.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-extrabold sm:text-6xl">{hero.headline}</h1>
          <p className="mt-6 max-w-2xl text-xl text-sky">{hero.subheader}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#start" className="btn btn-amber">
              {hero.cta}
            </a>
            <a href="#how" className="btn btn-line">
              How it works
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-base text-sky">
            {hero.ticks.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="text-amber" aria-hidden="true">✓</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section id="how" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="eyebrow text-blue">How it works</p>
        <h2 className="mt-3 text-4xl font-extrabold text-navy">One address, all the way to a site that sells.</h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-5">
          {steps.map((s) => (
            <li key={s.n} className="rounded-3xl border border-line bg-white p-6 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy font-[family-name:var(--font-head)] text-lg font-extrabold text-amber">
                {s.n}
              </span>
              <h3 className="mt-4 text-xl font-bold text-navy">{s.title}</h3>
              <p className="mt-2 text-base text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="start" className="border-t border-line bg-white">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <OrderForm />
        </div>
      </section>

      <footer className="bg-navy px-4 py-10 text-center text-sm text-sky sm:px-6">
        <p className="mx-auto max-w-3xl">{copy.disclaimer}</p>
        <p className="mt-3">© {copy.brand}</p>
      </footer>
    </main>
  );
}

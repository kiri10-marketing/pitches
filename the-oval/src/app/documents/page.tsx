import type { Metadata } from "next";
import { documents, site } from "@/content/copy";

export const metadata: Metadata = {
  title: `${site.name} | Development documents`,
  robots: { index: false, follow: false },
};

export default function DocumentsPage() {
  return (
    <main className="min-h-screen bg-cream">
      <header className="bg-dusk">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="/" className="flex items-center gap-2 text-2xl font-black tracking-tight text-white" style={{ fontFamily: "var(--font-heading)" }}>
            <svg viewBox="0 0 32 20" className="h-5 w-8" aria-hidden="true"><ellipse cx="16" cy="10" rx="14" ry="8" fill="none" stroke="var(--amber)" strokeWidth="3.5" /></svg>
            {site.name}
          </a>
          <a href="/" className="rounded-full border-2 border-white/80 px-4 py-2 text-base font-bold text-white hover:bg-white/10">Back to site</a>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="eyebrow">Confidential</p>
        <h1 className="mt-2 text-4xl sm:text-5xl">{documents.title}</h1>
        <p className="mt-4 max-w-3xl text-lg">{documents.intro}</p>

        <div className="mt-10 space-y-12">
          {documents.items.map((d) => (
            <section key={d.href} className="rounded-2xl border border-line bg-white p-5 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl">{d.title}</h2>
                  <p className="mt-2 text-lg">{d.detail}</p>
                </div>
                <div className="flex shrink-0 gap-3">
                  <a href={d.href} target="_blank" rel="noopener" className="rounded-full bg-amber px-5 py-3 text-base font-bold text-[#1f1410]">Open</a>
                  <a href={d.href} download className="rounded-full border-2 border-ink px-5 py-3 text-base font-bold text-ink">Download</a>
                </div>
              </div>
              <iframe src={`${d.href}#view=FitH`} title={d.title} className="mt-6 hidden h-[80vh] w-full rounded-xl border border-line md:block" />
            </section>
          ))}
        </div>

        <p className="mt-12 max-w-4xl text-sm leading-relaxed">
          Confidential. Provided to named recipients for evaluating this proposal only. Not to be shared with any other agency or party, copied or reproduced without written consent.
          All images are artist&apos;s impressions, concept only and not consented.
        </p>
      </div>
    </main>
  );
}

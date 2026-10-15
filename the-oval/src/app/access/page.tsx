import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Oval | Private preview",
  robots: { index: false, follow: false },
};

export default async function AccessPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const { next, error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-dusk px-4 py-16 text-white">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3">
          <svg width="40" height="24" viewBox="0 0 40 24" aria-hidden="true"><ellipse cx="20" cy="12" rx="17" ry="9" fill="none" stroke="#f4a93a" strokeWidth="4" /></svg>
          <span className="text-2xl font-extrabold" style={{ fontFamily: "var(--font-heading)" }}>The Oval</span>
        </div>
        <h1 className="mt-8 text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-heading)", color: "#fff" }}>Private preview</h1>
        <p className="mt-4 text-lg leading-relaxed text-white/85">
          This concept for 120 Main South Road, Sockburn, has been shared with you personally. Enter the access code you were sent to continue.
        </p>

        <form action="/api/access" method="post" className="mt-8">
          <input type="hidden" name="next" value={next ?? "/"} />
          <label htmlFor="code" className="block text-sm font-semibold uppercase tracking-wider text-amber">Access code</label>
          <input
            id="code"
            name="code"
            required
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            placeholder="OVAL-XXXX-XXXX"
            className="mt-2 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-4 text-xl tracking-wider text-white placeholder:text-white/40 focus:border-amber focus:outline-none"
          />
          {error && <p className="mt-3 text-base text-amber" role="alert">That code isn&apos;t recognised. Please check it, or ask Angela Webb for a new one.</p>}
          <button type="submit" className="mt-5 w-full rounded-full bg-amber px-6 py-4 text-lg font-bold text-ink hover:brightness-105">
            View The Oval
          </button>
        </form>

        <p className="mt-10 border-t border-white/20 pt-6 text-sm leading-relaxed text-white/70">
          Confidential. Concept only, not consented. Provided to the named recipient for discussion with Bayleys and must not be copied, forwarded or used without written consent.
          Enquiries: Angela Webb, Bayleys, +64 27 349 1997.
        </p>
      </div>
    </main>
  );
}

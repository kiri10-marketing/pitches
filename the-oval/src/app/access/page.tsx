import type { Metadata } from "next";
import { CLAUSE } from "@/lib/access";

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
          This concept for 120 Main South Road, Sockburn, has been shared with you personally. Enter your name and the access code you were sent, then agree to keep it confidential.
        </p>

        <form action="/api/access" method="post" className="mt-8">
          <input type="hidden" name="next" value={next ?? "/"} />
          <label htmlFor="name" className="block text-sm font-semibold uppercase tracking-wider text-amber">Your full name</label>
          <input id="name" name="name" required autoComplete="name" className="mt-2 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-4 text-xl text-white placeholder:text-white/40 focus:border-amber focus:outline-none" />
          {error === "name" && <p className="mt-2 text-base text-amber" role="alert">Please enter your name.</p>}

          <label htmlFor="code" className="mt-6 block text-sm font-semibold uppercase tracking-wider text-amber">Access code</label>
          <input
            id="code"
            name="code"
            required
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            placeholder="OVAL-XXXX-XXXX"
            className="mt-2 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-4 text-xl text-white placeholder:text-white/40 focus:border-amber focus:outline-none tracking-wider"
          />
          {error && error !== "name" && error !== "agree" && <p className="mt-2 text-base text-amber" role="alert">That code isn&apos;t recognised. Please check it, or ask Angela Webb for a new one.</p>}

          <div className="mt-8 rounded-xl border border-white/25 bg-white/5 p-5">
            <p className="text-sm font-semibold uppercase tracking-wider text-amber">Confidentiality</p>
            <p className="mt-2 text-base text-white/90">By ticking the box I agree that:</p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-base leading-relaxed text-white/85">
              {CLAUSE.map((c) => <li key={c}>{c}</li>)}
            </ul>
            <label className="mt-5 flex cursor-pointer items-start gap-3 text-lg font-semibold">
              <input type="checkbox" name="agree" value="yes" required className="mt-1 h-6 w-6 shrink-0 accent-[#f4a93a]" />
              I have read and agree to keep this information confidential.
            </label>
            {error === "agree" && <p className="mt-2 text-base text-amber" role="alert">Please tick the box to agree before continuing.</p>}
          </div>

          <button type="submit" className="mt-6 w-full rounded-full bg-amber px-6 py-4 text-lg font-bold text-ink hover:brightness-105">
            I agree, view The Oval
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

"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { landing, type Audience } from "@/content/copy";
import { getSession, signIn } from "@/lib/portal";
import { to } from "@/lib/links";
import { Logo } from "../Logo";
import { PreviewNote, word } from "./Shell";

// MOCK: a real magic link would email a one-time sign-in link. Here the "link" is a button on the next screen.
export function SignIn({ audience }: { audience: Audience }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") === "new" ? "/portal/new" : "/portal/dashboard";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const c = landing[audience];
  const w = word(audience);

  useEffect(() => {
    if (getSession(audience)) router.replace(to(audience, next));
  }, [audience, next, router]);

  function go(demo = false) {
    signIn({ email: demo ? "demo@sitely.co.nz" : email, name: demo ? "Demo" : name || email.split("@")[0], audience, demo });
    router.push(to(audience, next));
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <PreviewNote />
      <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6">
        <Logo product={c.product} href={to(audience)} />
      </div>
      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-2">
        <div className="hidden lg:block">
          <h1 className="text-5xl font-extrabold">Your {w.many}, all in one place.</h1>
          <p className="mt-4 text-xl text-muted">
            {audience === "agents"
              ? "Send a new site, follow each pitch from brief to live link, and approve it before the meeting."
              : "Send a site for a check, follow each stage from verdict to launch, and keep every document together."}
          </p>
        </div>

        <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-8 shadow-xl ring-1 ring-black/5">
          {!sent ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <h2 className="text-3xl font-extrabold">Sign in</h2>
              <p className="mt-2 text-muted">No password. We&apos;ll email you a sign-in link.</p>
              <label className="label mt-6" htmlFor="si-name">Your name</label>
              <input id="si-name" className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              <label className="label mt-4" htmlFor="si-email">Email</label>
              <input id="si-email" type="email" required className="field" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              <button className="btn btn-gold mt-6 w-full">Email me a sign-in link</button>
              <div className="my-6 flex items-center gap-3 text-sm text-muted">
                <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
              </div>
              <button type="button" onClick={() => go(true)} className="btn btn-line w-full text-green">
                Look around with sample {w.many}
              </button>
            </form>
          ) : (
            <div>
              <h2 className="text-3xl font-extrabold">Check your email</h2>
              <p className="mt-2 text-muted">
                We&apos;ve sent a sign-in link to <b className="text-ink">{email}</b>.
              </p>
              <div className="mt-6 rounded-2xl bg-gold/15 p-5 text-[16px]">
                <p className="font-bold">Preview only</p>
                <p className="mt-1 text-muted">Email isn&apos;t connected yet, so here is the link you would have received.</p>
                <button onClick={() => go(false)} className="btn btn-gold mt-4 w-full">
                  Open my portal
                </button>
              </div>
              <button onClick={() => setSent(false)} className="mt-4 text-sm font-semibold text-green underline">
                Use a different email
              </button>
            </div>
          )}
          <p className="mt-8 text-center text-sm text-muted">
            New to Sitely? <Link href={to(audience)} className="font-semibold text-green underline">See how it works</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { Audience } from "@/content/copy";

export default function LeadForm({ audience }: { audience: Audience }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "callback", audience, ...data }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl bg-white p-8 text-ink">
        <h3 className="text-2xl font-bold">Thanks, we&apos;ve got it.</h3>
        <p className="mt-2 text-muted">Kiri will be in touch within one working day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-2xl bg-white p-6 text-ink sm:grid-cols-2 sm:p-8">
      <div>
        <label className="label" htmlFor="lf-name">Name</label>
        <input id="lf-name" name="name" required className="field" autoComplete="name" />
      </div>
      <div>
        <label className="label" htmlFor="lf-phone">Phone</label>
        <input id="lf-phone" name="phone" className="field" autoComplete="tel" inputMode="tel" />
      </div>
      <div>
        <label className="label" htmlFor="lf-email">Email</label>
        <input id="lf-email" name="email" type="email" required className="field" autoComplete="email" />
      </div>
      <div>
        <label className="label" htmlFor="lf-org">{audience === "agents" ? "Agency" : "Company"}</label>
        <input id="lf-org" name="organisation" className="field" autoComplete="organization" />
      </div>
      <div className="sm:col-span-2">
        <label className="label" htmlFor="lf-msg">{audience === "agents" ? "The site you have in mind (optional)" : "The site or project you're weighing up (optional)"}</label>
        <textarea id="lf-msg" name="message" rows={3} className="field" />
      </div>
      <label className="flex items-start gap-3 text-sm text-muted sm:col-span-2">
        <input type="checkbox" name="consent" value="yes" required className="mt-1 h-5 w-5 accent-green" />
        <span>Sitely can contact me about this enquiry. We only use your details to reply, and you can ask us to delete them at any time.</span>
      </label>
      <div className="sm:col-span-2">
        <button className="btn btn-gold w-full sm:w-auto" disabled={state === "sending"}>
          {state === "sending" ? "Sending..." : "Request a call back"}
        </button>
        {state === "error" && <p className="mt-3 text-sm text-red-700">Something went wrong. Please email us instead.</p>}
      </div>
    </form>
  );
}

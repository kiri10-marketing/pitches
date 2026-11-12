"use client";

import { useState } from "react";
import { copy } from "@/content/copy";

type Job = { job: { id: string; address: string; levels_ordered: number[] } };

export function OrderForm() {
  const f = copy.form;
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<Job | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries([...fd.entries()].map(([k, v]) => [k, String(v)]));
    try {
      const r = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, account: data.account === "on" }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Something went wrong.");
      setDone(j.job);
      window.scrollTo({ top: (document.getElementById("start")?.offsetTop ?? 0) - 16, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    const blob = `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(done, null, 2))}`;
    return (
      <div role="status">
        <p className="eyebrow text-brass-dark">Job {done.job.id}</p>
        <h2 className="mt-3 text-4xl font-normal text-ink">{copy.done.title}</h2>
        <p className="mt-3 text-lg text-muted">{done.job.address}</p>
        <ol className="mt-8 space-y-4">
          {copy.done.next.map((t, i) => (
            <li key={t} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-brass-light">{i + 1}</span>
              <span className="pt-1">{t}</span>
            </li>
          ))}
        </ol>
        <a href={blob} download="buildmap.json" className="btn btn-line mt-8 text-ink">
          Download the job file
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate={false}>
      <h2 className="text-4xl font-normal text-ink">{f.title}</h2>
      <p className="mt-3 text-lg text-muted">{f.intro}</p>

      <fieldset className="mt-10">
        <legend className="legend">The site</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label" htmlFor="address">Site address</label>
            <input id="address" name="address" className="field" required autoComplete="street-address" placeholder="Street, suburb, city" />
            <p className="hint">Street, suburb, city. We look up the title, zone and hazards from this.</p>
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="legend">Choose your BuildMap</legend>
        <div className="mt-4 space-y-3">
          {f.levels.map((l, i) => (
            <label key={l.value} className="flex cursor-pointer gap-4 rounded-sm border border-line p-4 has-[:checked]:border-brass has-[:checked]:bg-paper-2">
              <input type="radio" name="levels" value={l.value} defaultChecked={i === 0} className="mt-1.5 h-5 w-5 shrink-0 accent-[#7C5E2C]" />
              <span className="flex-1">
                <span className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-semibold">{l.label}</span>
                  <span className="flex items-baseline gap-2 font-[family-name:var(--font-head)] font-normal text-ink">
                    {"badge" in l && <span className="tag">{l.badge}</span>}
                    {"was" in l && (
                      <s className="font-semibold text-muted">
                        <span className="sr-only">Usually </span>
                        {l.was}
                      </s>
                    )}
                    <span>{l.price}</span>
                  </span>
                </span>
                <span className="block text-base text-muted">{l.note}</span>
              </span>
            </label>
          ))}
          <label className="flex cursor-pointer gap-3 rounded-sm bg-paper-2 p-4">
            <input type="checkbox" name="account" defaultChecked className="mt-1 h-5 w-5 shrink-0 accent-[#7C5E2C]" />
            <span>
              <span className="block font-semibold">{f.account.label}</span>
              <span className="block text-base text-muted">{f.account.hint}</span>
            </span>
          </label>
          <p className="hint">{f.pricesNote}</p>
        </div>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="legend">About you</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="clientType">You are</label>
            <select id="clientType" name="clientType" className="field" required defaultValue="">
              <option value="" disabled>Choose one</option>
              {f.clientTypes.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="goal">What's the goal?</label>
            <select id="goal" name="goal" className="field" defaultValue="not-sure">
              {f.goals.map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="name">Your name</label>
            <input id="name" name="name" className="field" required autoComplete="name" />
          </div>
          <div>
            <label className="label" htmlFor="company">Company or agency</label>
            <input id="company" name="company" className="field" autoComplete="organization" />
          </div>
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className="field" required autoComplete="email" />
          </div>
          <div>
            <label className="label" htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" className="field" autoComplete="tel" />
          </div>
          <div className="sm:col-span-2">
            <label className="label" htmlFor="websiteUrl">{f.website.label}</label>
            <input id="websiteUrl" name="websiteUrl" className="field" inputMode="url" autoComplete="url" placeholder="e.g. youragency.co.nz" />
            <p className="hint">{f.website.hint}</p>
          </div>
          <div className="sm:col-span-2">
            <label className="label" htmlFor="brief">Anything we should know?</label>
            <textarea id="brief" name="brief" rows={4} className="field" placeholder="What you'd like to build or sell, timing, what worries you about the site." />
          </div>
        </div>
      </fieldset>

      {error && (
        <p role="alert" className="mt-6 rounded-sm bg-red-50 p-4 text-red-800">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-brass mt-8 w-full sm:w-auto" disabled={sending}>
        {sending ? "Sending…" : f.submit}
      </button>
      <p className="hint mt-4">{f.privacy}</p>
    </form>
  );
}

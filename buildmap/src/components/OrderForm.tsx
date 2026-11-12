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
        body: JSON.stringify({ ...data, website: data.website === "on" }),
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
        <p className="eyebrow text-blue">Job {done.job.id}</p>
        <h2 className="mt-3 text-4xl font-extrabold text-navy">{copy.done.title}</h2>
        <p className="mt-3 text-lg text-muted">{done.job.address}</p>
        <ol className="mt-8 space-y-4">
          {copy.done.next.map((t, i) => (
            <li key={t} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy font-bold text-amber">{i + 1}</span>
              <span className="pt-1">{t}</span>
            </li>
          ))}
        </ol>
        <a href={blob} download="buildmap.json" className="btn btn-line mt-8 text-navy">
          Download the job file
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate={false}>
      <h2 className="text-4xl font-extrabold text-navy">{f.title}</h2>
      <p className="mt-3 text-lg text-muted">{f.intro}</p>

      <fieldset className="mt-10">
        <legend className="text-xl font-bold text-navy">The site</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label" htmlFor="address">Site address</label>
            <input id="address" name="address" className="field" required autoComplete="street-address" placeholder="e.g. 275 Montreal Street, Central City, Christchurch" />
            <p className="hint">Street, suburb, city. We pull the title and zone from this.</p>
          </div>
          <div>
            <label className="label" htmlFor="landArea">Land area (m²), if known</label>
            <input id="landArea" name="landArea" className="field" inputMode="decimal" />
          </div>
          <div>
            <label className="label" htmlFor="zone">Zone, if known</label>
            <input id="zone" name="zone" className="field" placeholder="e.g. Medium Density Residential" />
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="text-xl font-bold text-navy">How far do you want to go?</legend>
        <div className="mt-4 space-y-3">
          {f.levels.map((l, i) => (
            <label key={l.value} className="flex cursor-pointer gap-4 rounded-2xl border border-line p-4 has-[:checked]:border-blue has-[:checked]:bg-sky/40">
              <input type="radio" name="levels" value={l.value} defaultChecked={i === 0} className="mt-1.5 h-5 w-5 accent-[#2f6db3]" />
              <span>
                <span className="block font-semibold">{l.label}</span>
                <span className="block text-base text-muted">{l.note}</span>
              </span>
            </label>
          ))}
          <label className="flex cursor-pointer items-center gap-3 pt-2">
            <input type="checkbox" name="website" defaultChecked className="h-5 w-5 accent-[#2f6db3]" />
            <span>Build the sale-ready website from the reports</span>
          </label>
        </div>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="text-xl font-bold text-navy">About you</legend>
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
            <label className="label" htmlFor="brief">Anything we should know?</label>
            <textarea id="brief" name="brief" rows={4} className="field" placeholder="What you'd like to build or sell, timing, what worries you about the site." />
          </div>
        </div>
      </fieldset>

      {error && (
        <p role="alert" className="mt-6 rounded-xl bg-red-50 p-4 text-red-800">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-amber mt-8 w-full sm:w-auto" disabled={sending}>
        {sending ? "Sending…" : f.submit}
      </button>
      <p className="hint mt-4">{f.privacy}</p>
    </form>
  );
}

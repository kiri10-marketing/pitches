"use client";
import { useEffect, useState } from "react";
import { form } from "@/content/copy";

type State = "idle" | "sending" | "done" | "error";

export default function EnquiryForm() {
  const [state, setState] = useState<State>("idle");
  const [interest, setInterest] = useState(form.interestOptions[0]);

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const v = (e as CustomEvent<string>).detail;
      if (form.interestOptions.includes(v)) setInterest(v);
    };
    window.addEventListener("prefill-interest", onPrefill);
    return () => window.removeEventListener("prefill-interest", onPrefill);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div role="status" className="rounded-2xl bg-white p-8 text-center shadow-lg">
        <p className="text-2xl font-bold text-ink" style={{ fontFamily: "var(--font-heading)" }}>{form.success}</p>
      </div>
    );
  }

  const input =
    "w-full rounded-xl border-2 border-line bg-white px-4 py-3.5 text-lg text-ink outline-none focus:border-brick min-h-[56px]";
  const label = "mb-1.5 block text-base font-semibold text-ink";

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl bg-white p-6 shadow-lg sm:p-8" noValidate={false}>
      {/* Spam trap: hidden from people, bots fill it in */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div>
        <label htmlFor="f-name" className={label}>{form.fields.name}</label>
        <input id="f-name" name="name" required autoComplete="name" className={input} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-email" className={label}>{form.fields.email}</label>
          <input id="f-email" name="email" type="email" required autoComplete="email" className={input} />
        </div>
        <div>
          <label htmlFor="f-phone" className={label}>{form.fields.phone}</label>
          <input id="f-phone" name="phone" type="tel" required autoComplete="tel" className={input} />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-interest" className={label}>{form.fields.interest}</label>
          <select id="f-interest" name="interest" value={interest} onChange={(e) => setInterest(e.target.value)} className={input}>
            {form.interestOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="f-buyer" className={label}>{form.fields.buyer}</label>
          <select id="f-buyer" name="buyer" className={input} defaultValue={form.buyerOptions[0]}>
            {form.buyerOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="f-message" className={label}>{form.fields.message}</label>
        <textarea id="f-message" name="message" rows={3} className={input} />
      </div>
      <button type="submit" className="btn-primary w-full text-lg" disabled={state === "sending"}>
        {state === "sending" ? form.sending : form.submit}
      </button>
      {state === "error" && <p role="alert" className="font-semibold text-brick">{form.error}</p>}
      <p className="text-base text-body">{form.privacy}</p>
    </form>
  );
}

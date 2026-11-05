"use client";
import { useState } from "react";
import { form } from "@/content/copy";

type State = "idle" | "sending" | "done" | "error";

export default function EnquiryForm() {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/enquire", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return <p role="status" className="display h-md py-16 text-center">{form.success}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-7">
      <div aria-hidden="true" className="absolute -left-[9999px]"><label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="grid gap-7 sm:grid-cols-2">
        <div className="field"><label htmlFor="f-first">{form.fields.first}</label><input id="f-first" name="first" required autoComplete="given-name" /></div>
        <div className="field"><label htmlFor="f-last">{form.fields.last}</label><input id="f-last" name="last" required autoComplete="family-name" /></div>
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <div className="field"><label htmlFor="f-email">{form.fields.email}</label><input id="f-email" name="email" type="email" required autoComplete="email" /></div>
        <div className="field"><label htmlFor="f-phone">{form.fields.phone}</label><input id="f-phone" name="phone" type="tel" required autoComplete="tel" /></div>
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <div className="field"><label htmlFor="f-interest">{form.fields.interest}</label>
          <select id="f-interest" name="interest" defaultValue="">{[<option key="" value="" disabled>Select</option>, ...form.interestOptions.map((o) => <option key={o}>{o}</option>)]}</select></div>
        <div className="field"><label htmlFor="f-budget">{form.fields.budget}</label>
          <select id="f-budget" name="budget" defaultValue="">{[<option key="" value="" disabled>Select</option>, ...form.budgetOptions.map((o) => <option key={o}>{o}</option>)]}</select></div>
      </div>
      <div className="field"><label htmlFor="f-heard">{form.fields.heard}</label>
        <select id="f-heard" name="heard" defaultValue="">{[<option key="" value="" disabled>Select</option>, ...form.heardOptions.map((o) => <option key={o}>{o}</option>)]}</select></div>
      <label className="flex items-start gap-3 text-base"><input type="checkbox" name="consent" className="mt-1.5 h-5 w-5 accent-[var(--ink)]" />{form.fields.consent}</label>
      <div><button type="submit" disabled={state === "sending"} className="btn btn-ink w-full sm:w-auto">{state === "sending" ? "Sending" : form.submit}</button></div>
      {state === "error" && <p role="alert" className="text-brick">{form.error}</p>}
    </form>
  );
}

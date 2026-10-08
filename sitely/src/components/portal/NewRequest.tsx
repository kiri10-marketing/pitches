"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Audience } from "@/content/copy";
import { addItem, newId, type Item } from "@/lib/portal";
import { to } from "@/lib/links";
import { PortalShell } from "./Shell";

type Field =
  | { name: string; label: string; type: "text" | "email" | "tel" | "date" | "number"; required?: boolean; hint?: string; half?: boolean }
  | { name: string; label: string; type: "textarea"; required?: boolean; hint?: string }
  | { name: string; label: string; type: "select"; options: string[]; required?: boolean; half?: boolean }
  | { name: string; label: string; type: "checks"; options: string[] };

const forms: Record<Audience, { title: string; intro: string; sections: { title: string; fields: Field[] }[]; uploadHint: string; submit: string }> = {
  agents: {
    title: "Start a new pitch",
    intro: "Tell us about the site and the vendor. The more you send, the sharper the concept. You can add more later.",
    sections: [
      {
        title: "The site",
        fields: [
          { name: "Address", label: "Site address", type: "text", required: true },
          { name: "Land area", label: "Land area (m²), if known", type: "text", half: true },
          { name: "Zone", label: "Zone, if known", type: "text", half: true, hint: "e.g. Medium Density Residential" },
          { name: "Existing buildings", label: "What's on the site now?", type: "text" },
        ],
      },
      {
        title: "The vendor and the meeting",
        fields: [
          { name: "Vendor goal", label: "What does the vendor want?", type: "select", options: ["Sell the land", "Joint venture", "Develop it themselves", "Not sure yet"], half: true },
          { name: "Pitch meeting", label: "Pitch meeting date", type: "date", half: true },
          { name: "Style", label: "Pitch style", type: "select", options: ["Standard build ($1,950)", "Luxury build ($3,500)", "Not sure, advise me"], half: true },
          { name: "Competing agents", label: "Competing agents, if known", type: "text", half: true },
        ],
      },
      {
        title: "Instructions",
        fields: [
          { name: "Instructions", label: "Anything we should know?", type: "textarea", hint: "The vendor's story, must-haves, what they're worried about, ideas you already have." },
        ],
      },
      {
        title: "Your details for the pitch",
        fields: [
          { name: "Agent name", label: "Name on the pitch", type: "text", required: true, half: true },
          { name: "Agency", label: "Agency and office", type: "text", required: true, half: true },
          { name: "Phone", label: "Phone", type: "tel", half: true },
          { name: "Licence line", label: "Agency licence wording", type: "text", half: true, hint: "e.g. Licensed REAA 2008" },
        ],
      },
    ],
    uploadHint: "Title, LIM, site photos, any plans or renders, your headshot.",
    submit: "Send the brief",
  },
  builders: {
    title: "Send a site",
    intro: "Tell us about the site, or what you're looking for if you don't have one yet. We'll start with a site check.",
    sections: [
      {
        title: "The site",
        fields: [
          { name: "Site status", label: "Where are you at?", type: "select", options: ["I own it", "Under contract", "Looking at it", "I need help finding a site"], required: true, half: true },
          { name: "Address", label: "Site address (or areas you're looking in)", type: "text", required: true, half: true },
          { name: "Land area", label: "Land area (m²), if known", type: "text", half: true },
          { name: "Price", label: "Price or valuation, if known", type: "text", half: true },
        ],
      },
      {
        title: "What you want to build",
        fields: [
          { name: "Thinking of", label: "What are you thinking of building?", type: "text", hint: "e.g. 6 townhouses, a 10-lot subdivision, not sure" },
          { name: "Budget and finance", label: "Budget and finance", type: "select", options: ["Self-funded", "Bank finance arranged", "Need finance", "Looking for investors", "Not sure yet"], half: true },
          { name: "Builds per year", label: "Homes you build a year", type: "select", options: ["1 to 5", "6 to 20", "21 to 50", "50+"], half: true },
          { name: "Help", label: "What do you want help with?", type: "checks", options: ["Site check", "Concept plan", "Feasibility", "Pre-sales launch", "Investor pack", "Development management"] },
        ],
      },
      {
        title: "Notes",
        fields: [{ name: "Notes", label: "Anything else?", type: "textarea", hint: "Timing, what worries you about the site, what you've already been told by council or the bank." }],
      },
      {
        title: "Your details",
        fields: [
          { name: "Contact name", label: "Your name", type: "text", required: true, half: true },
          { name: "Company", label: "Company", type: "text", half: true },
          { name: "Phone", label: "Phone", type: "tel", half: true },
        ],
      },
    ],
    uploadHint: "Title, LIM, survey, any plans, photos or existing quotes.",
    submit: "Send for a site check",
  },
};

export function NewRequest({ audience }: { audience: Audience }) {
  const router = useRouter();
  const [files, setFiles] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const f = forms[audience];

  async function submit(e: React.FormEvent<HTMLFormElement>, email: string) {
    e.preventDefault();
    setSending(true);
    const fd = new FormData(e.currentTarget);
    const details: Record<string, string> = {};
    for (const [k, v] of fd.entries()) {
      if (typeof v !== "string" || !v || k === "consent" || k === "files") continue;
      details[k] = details[k] ? `${details[k]}, ${v}` : v;
    }
    const address = details["Address"] || "Site to be confirmed";
    const item: Item = {
      id: newId(),
      audience,
      title: address.split(",")[0],
      address,
      createdAt: new Date().toISOString().slice(0, 10),
      stage: 0,
      details,
      files,
      updates: [{ at: new Date().toISOString().slice(0, 10), text: audience === "agents" ? "Brief received. Kiri and Paul will review the site next." : "Request received. Your site check is next." }],
    };
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: audience === "agents" ? "pitch-brief" : "builder-site", audience, email, id: item.id, details, files }),
      });
    } catch {
      /* the brief still shows in the portal; a real backend would retry */
    }
    addItem(item);
    router.push(to(audience, `/portal/status?id=${item.id}&new=1`));
  }

  return (
    <PortalShell audience={audience}>
      {(s) => (
        <form onSubmit={(e) => submit(e, s.email)} className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold">{f.title}</h1>
          <p className="mt-3 text-lg text-muted">{f.intro}</p>

          {f.sections.map((sec) => (
            <fieldset key={sec.title} className="mt-8 rounded-2xl border border-line bg-white p-6 sm:p-8">
              <legend className="px-2 font-[family-name:var(--font-head)] text-xl font-bold text-green">{sec.title}</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                {sec.fields.map((fl) => {
                  const id = `f-${fl.name.replace(/\W+/g, "-")}`;
                  const span = "half" in fl && fl.half ? "" : "sm:col-span-2";
                  if (fl.type === "checks")
                    return (
                      <div key={fl.name} className="sm:col-span-2">
                        <p className="label">{fl.label}</p>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {fl.options.map((o) => (
                            <label key={o} className="flex items-center gap-3 rounded-xl border border-line px-4 py-3">
                              <input type="checkbox" name={fl.name} value={o} defaultChecked={o === "Site check"} className="h-5 w-5 accent-green" />
                              {o}
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  return (
                    <div key={fl.name} className={span}>
                      <label className="label" htmlFor={id}>
                        {fl.label}
                        {fl.required && <span className="text-gold-dark"> *</span>}
                      </label>
                      {fl.type === "textarea" ? (
                        <textarea id={id} name={fl.name} rows={5} className="field" required={fl.required} />
                      ) : fl.type === "select" ? (
                        <select id={id} name={fl.name} className="field" required={fl.required} defaultValue="">
                          <option value="" disabled>
                            Choose one
                          </option>
                          {fl.options.map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                      ) : (
                        <input id={id} name={fl.name} type={fl.type} className="field" required={fl.required} defaultValue={fl.name === "Agent name" || fl.name === "Contact name" ? (s.demo ? "" : s.name) : undefined} />
                      )}
                      {"hint" in fl && fl.hint && <p className="mt-1 text-sm text-muted">{fl.hint}</p>}
                    </div>
                  );
                })}
              </div>
            </fieldset>
          ))}

          <fieldset className="mt-8 rounded-2xl border border-line bg-white p-6 sm:p-8">
            <legend className="px-2 font-[family-name:var(--font-head)] text-xl font-bold text-green">Plans and documents</legend>
            <label htmlFor="f-files" className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line bg-cream px-6 py-10 text-center hover:border-gold">
              <span className="text-lg font-bold text-green">Add files</span>
              <span className="mt-1 text-muted">{f.uploadHint}</span>
              <span className="mt-2 text-sm text-muted">Preview: we list the file names, but uploads aren&apos;t stored yet.</span>
            </label>
            <input id="f-files" name="files" type="file" multiple className="sr-only" onChange={(e) => setFiles(Array.from(e.target.files || []).map((x) => x.name))} />
            {files.length > 0 && (
              <ul className="mt-4 space-y-1">
                {files.map((n) => (
                  <li key={n} className="rounded-lg bg-sand px-3 py-2 text-[16px]">
                    📄 {n}
                  </li>
                ))}
              </ul>
            )}
          </fieldset>

          <label className="mt-8 flex items-start gap-3 text-[16px] text-muted">
            <input type="checkbox" name="consent" required className="mt-1 h-5 w-5 accent-green" />
            <span>
              I have permission to share these documents and images with Sitely. I understand concepts and feasibility figures are indicative, not a valuation, consent or QS estimate.
            </span>
          </label>

          <button className="btn btn-gold mt-8 w-full text-lg sm:w-auto" disabled={sending}>
            {sending ? "Sending..." : f.submit}
          </button>
        </form>
      )}
    </PortalShell>
  );
}

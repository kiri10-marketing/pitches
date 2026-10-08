"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Audience } from "@/content/copy";
import { listItems, resetSamples, stages, type Item } from "@/lib/portal";
import { to } from "@/lib/links";
import { PortalShell, verdictStyle, word } from "./Shell";

export function Dashboard({ audience }: { audience: Audience }) {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => setItems(listItems(audience)), [audience]);
  const w = word(audience);
  const st = stages[audience];

  return (
    <PortalShell audience={audience}>
      {(s) => (
        <>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-semibold text-gold-dark">Kia ora{s.name && s.name !== "Demo" ? `, ${s.name}` : ""}</p>
              <h1 className="mt-1 text-4xl font-extrabold">My {w.many}</h1>
            </div>
            <Link href={to(audience, "/portal/new")} className="btn btn-gold">
              + {audience === "agents" ? "Start a new pitch" : "Send a new site"}
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
            {[
              ["In progress", items.filter((i) => i.stage < st.length - 1).length],
              [audience === "agents" ? "Live pitches" : "At final stage", items.filter((i) => i.stage === st.length - 1).length],
              ["Total", items.length],
            ].map(([k, v]) => (
              <div key={k as string} className="rounded-2xl border border-line bg-white p-4 sm:p-5">
                <p className="text-sm text-muted sm:text-base">{k}</p>
                <p className="font-[family-name:var(--font-head)] text-4xl font-extrabold text-green">{v}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white">
            {items.length === 0 && <p className="p-8 text-muted">No {w.many} yet.</p>}
            <ul className="divide-y divide-line">
              {items.map((i) => {
                const v = i.verdict ? verdictStyle[i.verdict] : null;
                const pct = Math.round(((i.stage + 1) / st.length) * 100);
                return (
                  <li key={i.id}>
                    <Link href={to(audience, `/portal/status?id=${i.id}`)} className="grid gap-3 p-5 hover:bg-cream sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-2xl font-bold">{i.title}</h2>
                          {i.sample && <span className="rounded-full bg-sand px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-muted">Sample</span>}
                          {v && (
                            <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-bold ${v.bg} ${v.text}`}>
                              <span className={`h-2.5 w-2.5 rounded-full ${v.dot}`} /> {v.label}
                            </span>
                          )}
                        </div>
                        <p className="text-muted">{i.address}</p>
                      </div>
                      <div className="sm:w-64">
                        <p className="font-semibold">{st[i.stage].title}</p>
                        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-sand">
                          <div className="h-full rounded-full bg-green" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <button
            onClick={() => {
              resetSamples(audience);
              setItems(listItems(audience));
            }}
            className="mt-4 text-sm text-muted underline"
          >
            Reset to sample {w.many}
          </button>
        </>
      )}
    </PortalShell>
  );
}

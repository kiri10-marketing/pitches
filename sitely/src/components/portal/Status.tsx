"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Audience } from "@/content/copy";
import { getItem, stages, type Item } from "@/lib/portal";
import { to } from "@/lib/links";
import { PortalShell, verdictStyle, word } from "./Shell";

export function Status({ audience }: { audience: Audience }) {
  const params = useSearchParams();
  const id = params.get("id") || "";
  const isNew = params.get("new") === "1";
  const [item, setItem] = useState<Item | null | undefined>(undefined);
  useEffect(() => setItem(getItem(audience, id) ?? null), [audience, id]);
  const st = stages[audience];
  const w = word(audience);

  return (
    <PortalShell audience={audience}>
      {() =>
        item === undefined ? null : item === null ? (
          <div>
            <h1 className="text-3xl font-extrabold">We couldn&apos;t find that {w.one}</h1>
            <Link href={to(audience, "/portal/dashboard")} className="btn btn-gold mt-6">
              Back to my {w.many}
            </Link>
          </div>
        ) : (
          <>
            <Link href={to(audience, "/portal/dashboard")} className="font-semibold text-green">
              ← My {w.many}
            </Link>
            {isNew && (
              <div className="mt-4 rounded-2xl bg-green p-5 text-white">
                <p className="text-lg font-bold">Thanks, we&apos;ve got it.</p>
                <p className="text-white/85">
                  {audience === "agents"
                    ? "Kiri and Paul will review the site and send you a traffic-light verdict before any work starts."
                    : "We'll send you a traffic-light site check. Nothing is charged until you say go."}
                </p>
              </div>
            )}
            <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-4xl font-extrabold">{item.title}</h1>
                  {item.sample && <span className="rounded-full bg-sand px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-muted">Sample</span>}
                </div>
                <p className="text-lg text-muted">{item.address}</p>
              </div>
              {item.liveUrl && (
                <a href={item.liveUrl} target="_blank" rel="noopener" className="btn btn-gold">
                  Open the live {w.one} →
                </a>
              )}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
              {/* Stage tracker */}
              <section className="rounded-2xl border border-line bg-white p-6 sm:p-8">
                <h2 className="text-2xl font-bold">Progress</h2>
                <ol className="mt-6">
                  {st.map((s, i) => {
                    const done = i < item.stage;
                    const now = i === item.stage;
                    return (
                      <li key={s.title} className="relative flex gap-4 pb-6 last:pb-0">
                        {i < st.length - 1 && <span className={`absolute left-[15px] top-8 h-[calc(100%-2rem)] w-0.5 ${done ? "bg-green" : "bg-line"}`} />}
                        <span
                          className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                            done ? "bg-green text-white" : now ? "bg-gold text-ink ring-4 ring-gold/30" : "border-2 border-line bg-white text-muted"
                          }`}
                        >
                          {done ? "✓" : i + 1}
                        </span>
                        <div>
                          <p className={`font-bold ${now ? "text-green" : done ? "text-ink" : "text-muted"}`}>
                            {s.title} {now && <span className="ml-1 rounded-full bg-gold/25 px-2 py-0.5 text-xs uppercase tracking-wide">Now</span>}
                          </p>
                          <p className="text-[16px] text-muted">{s.body}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </section>

              <div className="space-y-6">
                {item.verdict && (
                  <section className={`rounded-2xl p-6 ${verdictStyle[item.verdict].bg}`}>
                    <p className="text-sm font-bold uppercase tracking-wide text-muted">Site verdict</p>
                    <p className={`mt-1 flex items-center gap-2 text-2xl font-extrabold ${verdictStyle[item.verdict].text}`}>
                      <span className={`h-4 w-4 rounded-full ${verdictStyle[item.verdict].dot}`} />
                      {verdictStyle[item.verdict].label}
                    </p>
                  </section>
                )}

                <section className="rounded-2xl border border-line bg-white p-6">
                  <h2 className="text-xl font-bold">Updates</h2>
                  <ul className="mt-4 space-y-3">
                    {item.updates.map((u, i) => (
                      <li key={i} className="text-[16px]">
                        <span className="text-sm text-muted">{u.at}</span>
                        <p>{u.text}</p>
                      </li>
                    ))}
                  </ul>
                </section>

                {audience === "agents" && item.liveUrl && (
                  <section className="rounded-2xl border border-dashed border-gold bg-white p-6">
                    <p className="text-sm font-bold uppercase tracking-wide text-gold-dark">Coming soon: viewing alerts</p>
                    <p className="mt-2 text-[16px] text-muted">
                      We&apos;ll tell you when the landowner opens the pitch and how long they spend on it, so you know when to call.
                    </p>
                  </section>
                )}

                <section className="rounded-2xl border border-line bg-white p-6">
                  <h2 className="text-xl font-bold">Brief</h2>
                  <dl className="mt-3 space-y-2 text-[16px]">
                    {Object.entries(item.details).map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-sm text-muted">{k}</dt>
                        <dd className="whitespace-pre-line">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  {item.files.length > 0 && (
                    <>
                      <h3 className="mt-5 text-lg font-bold">Files</h3>
                      <ul className="mt-2 space-y-1 text-[16px]">
                        {item.files.map((f) => (
                          <li key={f}>📄 {f}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </section>
              </div>
            </div>
          </>
        )
      }
    </PortalShell>
  );
}

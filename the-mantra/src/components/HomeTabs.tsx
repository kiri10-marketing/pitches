"use client";
import Image from "next/image";
import { useState } from "react";
import { homes } from "@/content/copy";

export default function HomeTabs() {
  const [active, setActive] = useState(homes.tabs[0].key);
  const tab = homes.tabs.find((t) => t.key === active)!;

  return (
    <div>
      <div role="tablist" aria-label="Home types" className="flex flex-wrap justify-center gap-x-8 gap-y-2 border-b border-line">
        {homes.tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            id={`tab-${t.key}`}
            aria-selected={t.key === active}
            aria-controls={`panel-${t.key}`}
            onClick={() => setActive(t.key)}
            className={`-mb-px min-h-[52px] border-b-2 px-1 text-[0.85rem] uppercase tracking-[0.22em] transition-colors ${t.key === active ? "border-ink text-ink" : "border-transparent text-body hover:text-ink"}`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab.key}`} aria-labelledby={`tab-${tab.key}`} className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-center">
        <div className="relative aspect-[3/2] w-full">
          <Image key={tab.image} src={tab.image} alt={tab.imageAlt} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
          <span className="render-tag">Artist&apos;s impression</span>
        </div>
        <div>
          <p className="eyebrow">{tab.count}</p>
          <h3 className="display h-md mt-3">{tab.name}</h3>
          <dl className="mt-8 grid grid-cols-2 gap-px border border-line bg-line">
            <div className="bg-stone p-4"><dt className="text-xs uppercase tracking-[0.2em]">Bedrooms</dt><dd className="mt-1 font-[family-name:var(--font-display)] text-3xl text-ink">{tab.beds}</dd></div>
            <div className="bg-stone p-4"><dt className="text-xs uppercase tracking-[0.2em]">Levels</dt><dd className="mt-1 font-[family-name:var(--font-display)] text-3xl text-ink">{tab.levels}</dd></div>
          </dl>
          <ul className="mt-8 grid gap-3">
            {tab.points.map((p) => (
              <li key={p} className="flex gap-4"><span aria-hidden="true" className="mt-[0.85em] h-px w-6 shrink-0 bg-bronze" /><span>{p}</span></li>
            ))}
          </ul>
          <p className="mt-8 text-sm uppercase tracking-[0.2em] text-ink">{homes.price}</p>
        </div>
      </div>
    </div>
  );
}

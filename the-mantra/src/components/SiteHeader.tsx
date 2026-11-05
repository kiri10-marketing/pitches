"use client";
import { useEffect, useState } from "react";
import { site, nav } from "@/content/copy";

// Transparent over the hero, stone once scrolled. Shows live Christchurch weather like Graya's Silk site.
export default function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [weather, setWeather] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const words: Record<number, string> = { 0: "Clear", 1: "Fine", 2: "Partly cloudy", 3: "Overcast", 45: "Fog", 48: "Fog", 51: "Drizzle", 53: "Drizzle", 55: "Drizzle", 61: "Rain", 63: "Rain", 65: "Rain", 71: "Snow", 80: "Showers", 81: "Showers", 82: "Showers", 95: "Thunder" };
    fetch("https://api.open-meteo.com/v1/forecast?latitude=-43.5196&longitude=172.6508&current=temperature_2m,weather_code&timezone=Pacific%2FAuckland")
      .then((r) => r.json())
      .then((d) => {
        const t = Math.round(d?.current?.temperature_2m);
        if (Number.isFinite(t)) setWeather(`${t}°C ${words[d.current.weather_code] ?? ""}`.trim());
      })
      .catch(() => {});
  }, []);

  const tone = solid || open ? "text-ink" : "text-white";
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${solid || open ? "bg-stone/95 backdrop-blur border-b border-line" : "bg-transparent"}`}>
      <div className={`mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-4 py-3 sm:px-8 ${tone}`}>
        <div className="flex items-center gap-6 text-[0.8rem] uppercase tracking-[0.22em]">
          <button className="lg:hidden min-h-[44px] pr-3 uppercase tracking-[0.22em]" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}>
            {open ? "Close" : "Menu"}
          </button>
          <span className="hidden lg:inline" aria-live="polite">{site.weatherLabel}{weather ? ` · ${weather}` : ""}</span>
          <nav className="hidden xl:flex gap-6" aria-label="Sections">
            {nav.links.slice(0, 3).map((l) => <a key={l.href} href={l.href} className="hover:opacity-70">{l.label}</a>)}
          </nav>
        </div>
        <a href="#top" className="text-center leading-none" aria-label="The Mantra, back to top">
          <span className="block font-[family-name:var(--font-display)] whitespace-nowrap text-[1.05rem] tracking-[0.12em] pl-[0.12em] sm:text-[2rem] sm:tracking-[0.32em] sm:pl-[0.32em] uppercase">The Mantra</span>
          <span className="mt-1 hidden sm:block text-[0.62rem] tracking-[0.34em] uppercase opacity-90">Whitmore St · Edgeware</span>
        </a>
        <div className="flex items-center justify-end gap-5 text-[0.8rem] uppercase tracking-[0.22em]">
          <a href={nav.brochure.href} target="_blank" rel="noopener" className="hidden md:inline hover:opacity-70">{nav.brochure.label}</a>
          <a href="#register" className={`btn !min-h-[44px] !px-4 sm:!px-5 ${solid || open ? "btn-ink" : "btn-ghost-light"}`}>
            <span className="hidden sm:inline">{nav.cta}</span><span className="sm:hidden">Register</span>
          </a>
        </div>
      </div>
      {open && (
        <nav id="mnav" className="lg:hidden border-t border-line bg-stone px-6 pb-8 pt-4" aria-label="Menu">
          <ul className="grid gap-1">
            {nav.links.concat([nav.brochure]).map((l) => (
              <li key={l.href}><a href={l.href} onClick={() => setOpen(false)} className="block py-3 font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.12em] text-ink">{l.label}</a></li>
            ))}
          </ul>
          {weather && <p className="mt-4 text-sm uppercase tracking-[0.2em] text-body">{site.weatherLabel} · {weather}</p>}
        </nav>
      )}
    </header>
  );
}

"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { dayNight } from "@/content/copy";

// Same camera, two renders. The blue-hour layer fades in as the frame travels up the screen,
// and a slider lets anyone (including keyboard users) set the time of day by hand.
export default function DayNight() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (manual) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the frame's top enters at 85% of the screen, 1 when its centre reaches 30%.
      const start = vh * 0.85, end = vh * 0.3 - r.height / 2;
      const p = (start - r.top) / (start - end);
      setT(Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [manual]);

  return (
    <div>
      <div ref={ref} className="relative aspect-[3/2] w-full overflow-hidden bg-olive" style={{ ["--dn" as string]: t }}>
        <Image src={dayNight.day} alt={dayNight.alt} fill sizes="(min-width:1400px) 1400px, 100vw" className="object-cover" />
        <Image src={dayNight.night} alt="" aria-hidden="true" fill sizes="(min-width:1400px) 1400px, 100vw" className="dn-night object-cover" />
        <span className="render-tag">Artist&apos;s impression</span>
        <span className="absolute right-3 top-3 z-[2] bg-[rgba(29,30,34,.55)] px-3 py-1 text-[0.7rem] uppercase tracking-[0.2em] text-white">{t < 0.5 ? dayNight.dayLabel : dayNight.nightLabel}</span>
      </div>
      <label className="mx-auto mt-6 flex max-w-xl items-center gap-4 px-6 text-[0.8rem] uppercase tracking-[0.2em] text-sage">
        <span>{dayNight.dayLabel}</span>
        <input
          type="range" min={0} max={100} value={Math.round(t * 100)}
          onChange={(e) => { setManual(true); setT(Number(e.target.value) / 100); }}
          className="h-11 flex-1 accent-[var(--bronze-soft)]"
          aria-label="Time of day, from morning to blue hour"
        />
        <span>{dayNight.nightLabel}</span>
      </label>
    </div>
  );
}

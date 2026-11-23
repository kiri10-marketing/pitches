"use client";
import { useEffect, useRef } from "react";

// A render that comes alive: the still shows first, then a short looped film of people moving
// through it plays only while it is on screen. Reduced-motion users keep the still.
export default function LiveRender({ src, poster, className = "" }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (v.preload !== "auto") { v.preload = "auto"; v.load(); }
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    }, { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={`live-render absolute inset-0 h-full w-full object-cover ${className}`}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
}

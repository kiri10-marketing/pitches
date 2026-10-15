"use client";
import { useEffect, useState } from "react";
import { sticky } from "@/content/copy";

// Mobile-only bar. Hidden while the hero, form or final CTA is on screen so two buttons never show at once.
export default function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const ids = ["top", "register", "final-cta"];
    const visible = new Set<string>();
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
      setShow(visible.size === 0);
    }, { threshold: 0.15 });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 p-3 backdrop-blur transition-transform duration-300 md:hidden ${show ? "translate-y-0" : "translate-y-full"}`}
      aria-hidden={!show}
    >
      <a href="#register" className="btn-primary w-full" tabIndex={show ? 0 : -1}>{sticky.label}</a>
    </div>
  );
}

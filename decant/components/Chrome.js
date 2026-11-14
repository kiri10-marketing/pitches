'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Mark({ size = 28, light = true }) {
  // Decant: a larger form pouring into a smaller one
  const s = light ? '#fff' : 'var(--ink)';
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="2.5" y="2.5" width="17" height="17" fill="none" stroke={s} strokeWidth="2" />
      <rect x="18" y="18" width="11.5" height="11.5" fill="var(--mint)" />
      <path d="M19.5 9 L25 9 L25 14.5" fill="none" stroke={s} strokeWidth="2" />
    </svg>
  );
}

export const Arrow = () => (
  <svg className="arr" width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
    <path d="M1 7 H16 M10.5 1.5 L16 7 L10.5 12.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export function QuizButton({ className = 'btn btn-ink', children = 'Start the quiz', href = '/quiz' }) {
  return (
    <Link className={className} href={href}>
      {children} <Arrow />
    </Link>
  );
}

export function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll('.rv:not(.in), .clip:not(.in)');
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

export function useParallax(selector, k = 0.12) {
  useEffect(() => {
    const els = [...document.querySelectorAll(selector)];
    if (!els.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        els.forEach((el) => {
          const r = el.parentElement.getBoundingClientRect();
          const c = r.top + r.height / 2 - window.innerHeight / 2;
          el.style.setProperty('--py', `${(-c * k).toFixed(1)}px`);
        });
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [selector, k]);
}

const LINKS = [
  ['/#how', 'How it works'],
  ['/#quiet', 'The quiet sale'],
  ['/#questions', 'Questions'],
];

export function Nav({ cta = true }) {
  const [tight, setTight] = useState(false);
  useEffect(() => {
    const on = () => setTight(window.scrollY > 30);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <div className={`nav-shell ${tight ? 'tight' : ''}`}>
      <div className="wrap">
        <nav className="nav" aria-label="Main">
          <Link href="/" className="brand" aria-label="Decant home">
            <Mark /> Decant
          </Link>
          <ul className="nav-links">
            {LINKS.map(([h, t]) => (
              <li key={h}><Link href={h}>{t}</Link></li>
            ))}
          </ul>
          {cta ? <QuizButton className="btn btn-white" /> : <span />}
        </nav>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-card">
          <div>
            <Link href="/" className="brand" style={{ color: 'var(--ink)' }}>
              <Mark light={false} /> Decant
            </Link>
            <p>Downsizing made clear and simple. A concierge service for Christchurch homeowners moving to their next, smaller home.</p>
          </div>
          <div>
            <h4>Decant</h4>
            <ul>
              <li><Link href="/#how">How it works</Link></li>
              <li><Link href="/#quiet">The quiet sale</Link></li>
              <li><Link href="/#questions">Questions</Link></li>
            </ul>
          </div>
          <div>
            <h4>More</h4>
            <ul>
              <li><Link href="/families">For families</Link></li>
              <li><Link href="/developers">For developers</Link></li>
              <li><Link href="/portfolios">Rental portfolios and businesses</Link></li>
            </ul>
          </div>
          <div>
            <h4>Talk to us</h4>
            <ul>
              <li><Link href="/quiz">Start the quiz</Link></li>
              <li style={{ color: 'var(--muted)', fontSize: 15.5 }}>We prefer to call you. Leave your number in the quiz and pick a time that suits.</li>
            </ul>
          </div>
        </div>
        <div className="legal">
          <span>Christchurch first, then New Zealand wide.</span>
          <span>Concept website. Homes, figures and photography are samples for discussion.</span>
        </div>
      </div>
      <div className="wordmark" aria-hidden="true">Decant</div>
    </footer>
  );
}

export function Sticky() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const f = () => {
      const j = document.getElementById('how');
      const r = j?.getBoundingClientRect();
      const inJourney = r && r.top < window.innerHeight && r.bottom > 0;
      const ft = document.querySelector('.foot')?.getBoundingClientRect();
      const inFoot = ft && ft.top < window.innerHeight - 40;
      setOn(window.scrollY > 600 && !inJourney && !inFoot);
    };
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <div className={`sticky ${on ? 'on' : ''}`}>
      <QuizButton className="btn btn-ink" />
    </div>
  );
}

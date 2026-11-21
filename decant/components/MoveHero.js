'use client';
import { useEffect, useRef, useState } from 'react';
import { QuizButton } from './Chrome';

/*
  The hero: one couple, two homes. The family home sits underneath and the next
  home is revealed over it from the right. It plays once on load, and the handle
  (or the arrow keys) lets a visitor move between the two for themselves.
  `pos` is how much of the family home is showing, from 0 to 100.
*/

const START = 100;
const REST = 26;
const DELAY = 1100;
const LENGTH = 2800;
const ease = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

export default function MoveHero({ children }) {
  const [pos, setPos] = useState(START);
  const raf = useRef(0);
  const hands = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPos(50); return undefined; }
    let t0;
    const tick = (now) => {
      if (hands.current) return;
      if (t0 === undefined) t0 = now;
      const k = Math.min(1, Math.max(0, (now - t0 - DELAY) / LENGTH));
      setPos(START + (REST - START) * ease(k));
      if (k < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const take = (e) => {
    hands.current = true;
    cancelAnimationFrame(raf.current);
    setPos(Number(e.target.value));
  };

  const where = pos > 88 ? 'old' : pos < 12 ? 'new' : 'both';
  // on a narrow screen there is only room for the label of the side that is mostly showing
  const lean = pos > 60 ? 'lean-old' : pos < 40 ? 'lean-new' : '';

  return (
    <section className="hero mh">
      <div className="wrap">
        <div className="mh-top">
          <div className="mh-copy">
            <span className="mh-offer">$3,000 towards your move</span>
            <h1>From the family home to the one that <em>fits you now</em>.</h1>
          </div>
          <div className="mh-side">
            <p className="mh-lede">
              Decant is a downsizing concierge for Christchurch. We find your next home first, sell yours quietly and coordinate the move, and every decision along the way stays yours.
            </p>
            <div className="hero-cta">
              <QuizButton className="btn btn-ink btn-lg" />
              <span>Takes about three minutes</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-media">
        <div className="wrap">
          <div className={`hero-img mh-compare is-${where} ${lean}`} style={{ '--p': `${pos}%` }}>
            <img className="mh-old" src="/img/hero-family-home.jpg" alt="A couple in their late sixties on the lawn of their two-storey family home in Christchurch, with packed boxes beside them and a moving truck in the driveway" />
            <div className="mh-new" aria-hidden={pos > 95}>
              <img src="/img/hero-next-home.jpg" alt="The same couple laughing on the front path of their new single-level brick and cedar home, carrying a moving box and a pot plant" />
            </div>
            <span className="mh-tag mh-tag-old">The family home</span>
            <span className="mh-tag mh-tag-new">The next home</span>
            <span className="mh-handle" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <input
              className="mh-range"
              type="range"
              min="0"
              max="100"
              step="1"
              value={Math.round(pos)}
              onChange={take}
              aria-label="Slide between the family home and the next home"
              aria-valuetext={where === 'old' ? 'Mostly the family home' : where === 'new' ? 'Mostly the next home' : 'Half and half'}
            />
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { WORD } from './logoPaths';
import { QuizButton } from './Chrome';

/*
  The header: one continuous piece of motion, played once on load.
  Left: the dictionary entry for "decant", typed out word by word.
  Right: the big A from the wordmark. As the definition reaches "bigger" the view
  pushes in, on "smaller" the green inner A fills up inside it like a pour, and on
  "carefully, so nothing of value is lost" it pulls back out and the rest of
  DECANT settles in around it.
*/

const TEXT = 'To pour from something bigger into something smaller, carefully, so nothing of value is lost.';
const KEY = 'smaller';

// Typing schedule: when each character appears (ms from start).
const START = 1100;
const CHAR = 52;
function schedule() {
  const at = [];
  let t = START;
  for (let i = 0; i < TEXT.length; i += 1) {
    at.push(t);
    const c = TEXT[i];
    t += CHAR + (c === ',' ? 300 : c === ' ' ? 35 : 0) + (i % 7 === 3 ? 18 : 0);
  }
  return { at, end: t };
}
const SCHED = schedule();
const idx = (w) => TEXT.indexOf(w);
const T_BIG0 = SCHED.at[idx('bigger')];
const T_BIG1 = SCHED.at[idx('bigger') + 6];
const T_SM0 = SCHED.at[idx('smaller')];
const T_SM1 = SCHED.at[idx('smaller') + 7];
const T_CARE = SCHED.at[idx('carefully')];
const T_END = SCHED.end;
const T_DONE = T_END + 900;

// Geometry from the wordmark (viewBox units).
const AX = 209.78;
const OUT = { cx: 181.35, cy: 50.7 }; // centre of the full word
const INNER_TOP = 50.72;
const BASE = 74;

const ease = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const span = (t, a, b) => clamp01((t - a) / (b - a));

function camera(t, ratio) {
  // vh = visible height in wordmark units. Smaller is closer.
  const fullVh = Math.max(64, 372 / ratio);
  const keys = [
    { t: 0, cx: AX, cy: 51.5, vh: 70 },
    { t: T_BIG0, cx: AX, cy: 52, vh: 62 },
    { t: T_SM0 - 120, cx: AX, cy: 61.5, vh: 33 },
    { t: T_CARE, cx: AX, cy: 62, vh: 31 },
    { t: T_END + 250, cx: OUT.cx, cy: OUT.cy, vh: fullVh },
  ];
  if (t <= keys[0].t) return keys[0];
  for (let i = 1; i < keys.length; i += 1) {
    const a = keys[i - 1], b = keys[i];
    if (t <= b.t) {
      const k = ease((t - a.t) / (b.t - a.t));
      return {
        cx: a.cx + (b.cx - a.cx) * k,
        cy: a.cy + (b.cy - a.cy) * k,
        vh: Math.exp(Math.log(a.vh) + (Math.log(b.vh) - Math.log(a.vh)) * k),
      };
    }
  }
  return keys[keys.length - 1];
}

// The rest of the word arrives from the A outwards.
const RING = { C: 0, N: 0, E: 1, T: 1, D: 2 };
const SIDE = { D: -1, E: -1, C: -1, N: 1, T: 1 };

export default function DefineHero() {
  const stage = useRef(null);
  const svg = useRef(null);
  const fill = useRef(null);
  const outer = useRef(null);
  const letters = useRef({});
  const ratio = useRef(1);
  const clock = useRef(0);
  const raf = useRef(0);
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  const [run, setRun] = useState(0);

  const paint = (t) => {
    const c = camera(t, ratio.current);
    const vw = c.vh * ratio.current;
    svg.current?.setAttribute('viewBox', `${(c.cx - vw / 2).toFixed(3)} ${(c.cy - c.vh / 2).toFixed(3)} ${vw.toFixed(3)} ${c.vh.toFixed(3)}`);
    // outer A arrives first
    const a = ease(span(t, 150, 1000));
    if (outer.current) outer.current.style.opacity = a;
    // the inner A fills from the base up, like a pour
    const f = ease(span(t, T_SM0 - 60, T_SM1 + 520));
    fill.current?.setAttribute('y', (BASE - (BASE - INNER_TOP + 0.5) * f).toFixed(3));
    // the other letters settle in during the pull back
    const zoomOut = T_END + 250 - T_CARE;
    Object.entries(letters.current).forEach(([k, el]) => {
      if (!el) return;
      const s0 = T_CARE + zoomOut * (0.34 + RING[k] * 0.12);
      const p = ease(span(t, s0, s0 + 900));
      el.style.opacity = p;
      el.setAttribute('transform', `translate(${(SIDE[k] * 14 * (1 - p)).toFixed(2)} 0)`);
    });
    let count = 0;
    while (count < TEXT.length && SCHED.at[count] <= t) count += 1;
    setN(count);
    setDone(t >= T_DONE);
  };

  useLayoutEffect(() => {
    const el = stage.current;
    const measure = () => {
      const r = el.getBoundingClientRect();
      ratio.current = r.width / Math.max(1, r.height);
      paint(clock.current);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { clock.current = T_DONE; paint(T_DONE); return; }
    clock.current = 0;
    let last;
    const tick = (now) => {
      // clamp each frame so a background tab does not skip the story
      const dt = last === undefined ? 0 : Math.min(50, now - last);
      last = now;
      clock.current += dt;
      paint(clock.current);
      if (clock.current < T_DONE) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [run]);

  // render the definition word by word so the key word can turn green
  const words = [];
  let i = 0;
  TEXT.split(' ').forEach((w, wi) => {
    const s = i;
    i += w.length + 1;
    const typed = Math.max(0, Math.min(w.length, n - s));
    const caretHere = n >= s && n <= s + w.length;
    words.push(
      <span key={wi} className={`dw ${w.startsWith(KEY) ? 'key' : ''} ${typed === w.length ? 'on' : ''}`}>
        <span className="t">{w.slice(0, typed)}</span>
        {caretHere && <i className={`dcaret ${done ? 'rest' : ''}`} />}
        <span className="g">{w.slice(typed)}</span>{' '}
      </span>
    );
  });

  return (
    <div className="wrap">
      <div className={`dh ${done ? 'done' : ''}`}>
        <div className="dh-copy">
          <span className="dh-offer">$3,000 towards your move</span>
          <div className="dh-head">
            <h1>
              <span aria-hidden="true">de·cant</span>
              <span className="sr">Decant. Downsizing made clear and simple.</span>
            </h1>
            <span className="dict-say">/dɪˈkænt/</span>
            <span className="dict-pos">verb</span>
          </div>
          <p className="dh-def" aria-label={TEXT}>
            <span aria-hidden="true">
              {words}
            </span>
          </p>
          <p className="dh-lede">
            Downsizing made <em className="hl">clear</em> and <em className="hl">simple</em>. We find your next home first, sell yours quietly, and coordinate the move. Every decision is yours.
          </p>
          <div className="hero-cta">
            <QuizButton className="btn btn-ink btn-lg" />
            <span>Takes about three minutes</span>
          </div>
        </div>

        <figure className="dh-stage" ref={stage}>
          <svg ref={svg} className="dh-svg" viewBox="175 18 70 70" preserveAspectRatio="xMidYMid meet" role="img" aria-label="The Decant logo: the A in DECANT holds a smaller green A inside it">
            <defs>
              <clipPath id="dh-pour"><rect ref={fill} x="180" y={BASE} width="60" height="40" /></clipPath>
            </defs>
            {['D', 'E', 'C', 'N', 'T'].map((k) => (
              <g key={k} ref={(el) => { letters.current[k] = el; }} style={{ opacity: 0 }}>
                <path d={WORD[k]} fill="var(--deep)" />
              </g>
            ))}
            {/* the empty space waiting for the smaller A */}
            <path d={WORD.a} fill="none" stroke="var(--line-2)" strokeWidth="0.18" strokeDasharray="0.7 0.7" className="dh-ghostA" />
            <path d={WORD.a} fill="var(--green)" clipPath="url(#dh-pour)" />
            <path ref={outer} d={WORD.A} fill="var(--deep)" style={{ opacity: 0 }} />
          </svg>
          <figcaption className="dh-cap">
            A smaller A, settled inside the A. <b>Bigger into smaller, nothing of value lost.</b>
          </figcaption>
          <button type="button" className="dh-replay" onClick={() => { cancelAnimationFrame(raf.current); setDone(false); setN(0); setRun((r) => r + 1); }} aria-label="Play the logo animation again">
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.5 8a5.5 5.5 0 1 1-1.8-4.1M13.5 2v3.5H10" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
            Play again
          </button>
        </figure>
      </div>
    </div>
  );
}

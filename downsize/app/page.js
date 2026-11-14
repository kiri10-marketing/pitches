'use client';
import { useEffect, useRef, useState } from 'react';
import Town from '../components/Town';

const NAME = 'Level';

const STEPS = [
  { n: '01', t: 'List your address', s: 'Tell us about your home', cap: 'Start with the home you have. Tell us what it is, what you need next and when. No obligation, no open homes.' },
  { n: '02', t: 'See homes that suit', s: 'Single level, close by', cap: 'We search new builds and listings for single-level, low-maintenance homes near you, then show you the ones worth seeing.' },
  { n: '03', t: 'Sell your way', s: 'A direct offer or a listing', cap: 'We can make you an offer on your home ourselves. If that is not right for you, a partner agency lists it, and the sale lines up with your purchase.' },
  { n: '04', t: 'Move once', s: 'Packed, moved, set up', cap: 'One moving day. Packing, movers and set-up are coordinated, so you go straight from one home to the next. No renting in between.' },
];
const DUR = 5200;

function Logo({ size = 30, light }) {
  const ink = light ? '#fff' : 'var(--ink)';
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M3 18 L16 11 L29 18 L16 25 Z" fill="var(--green)" stroke={ink} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M3 18 v4 L16 29 V25 M29 18 v4 L16 29" fill="none" stroke={ink} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M10 15 V9 l6 -4 l6 4 v6" fill="none" stroke={ink} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function Brand({ light }) {
  return (
    <a href="#top" className="brand" aria-label={`${NAME}, the downsizing exchange`} style={light ? { color: '#fff' } : undefined}>
      <Logo light={light} />
      <span>
        {NAME}
        <small style={light ? { color: '#9fb8a8' } : undefined}>Downsizing exchange</small>
      </span>
    </a>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv, .ms');
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Hero() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [vanT, setVanT] = useState(0);
  const [cycle, setCycle] = useState(0);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce.current) setPaused(true);
  }, []);

  // van drive on step 4
  useEffect(() => {
    if (step !== 3) { setVanT(0); return; }
    if (reduce.current) { setVanT(1); return; }
    let raf, t0;
    const dur = 2600;
    const tick = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / dur);
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      setVanT(e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const d = setTimeout(() => (raf = requestAnimationFrame(tick)), 900);
    return () => { clearTimeout(d); cancelAnimationFrame(raf); };
  }, [step, cycle]);

  const next = () => {
    setStep((s) => {
      const n = (s + 1) % STEPS.length;
      if (n === 0) setCycle((c) => c + 1);
      return n;
    });
  };

  return (
    <section className="hero" id="top">
      <div className="wrap">
        <span className="eyebrow rv in">New Zealand&rsquo;s downsizing exchange</span>
        <h1>Your next home is just around the corner.</h1>
        <p className="lede">
          List your address, see single-level homes near you, and move once. Every decision is yours. We do the leg work.
        </p>
        <div className="ctas">
          <a className="btn btn-solid" href="#start">List your address</a>
          <a className="btn btn-line" href="#how">See how it works</a>
        </div>
      </div>

      <div className="town-wrap">
        <Town step={step} vanT={vanT} />
      </div>

      <div className="steps">
        <div className="steps-card" role="tablist" aria-label="What a downsizing move looks like">
          {STEPS.map((st, i) => (
            <button
              key={st.n}
              role="tab"
              aria-selected={i === step}
              className={`step-btn ${i < step ? 'done' : ''}`}
              onClick={() => setStep(i)}
            >
              <span className="bar">
                {i === step && (
                  <i
                    key={`${step}-${cycle}`}
                    onAnimationEnd={next}
                    style={{ animation: `fill ${DUR}ms linear forwards`, animationPlayState: paused ? 'paused' : 'running' }}
                  />
                )}
              </span>
              <span className="n">{st.n}</span>
              <span className="t">{st.t}</span>
              <span className="s">{st.s}</span>
            </button>
          ))}
        </div>
        <div className="step-caption">
          <p aria-live="polite">{STEPS[step].cap}</p>
          <button className="pause" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Play the animation' : 'Pause the animation'}>
            {paused ? (
              <svg width="12" height="14" viewBox="0 0 12 14"><path d="M1 1 L11 7 L1 13Z" fill="currentColor" /></svg>
            ) : (
              <svg width="12" height="14" viewBox="0 0 12 14"><rect x="1" y="1" width="3.5" height="12" fill="currentColor" /><rect x="7.5" y="1" width="3.5" height="12" fill="currentColor" /></svg>
            )}
            {paused ? 'Play' : 'Pause'}
          </button>
        </div>
      </div>
      <style>{`@keyframes fill { from { width: 0 } to { width: 100% } }`}</style>
    </section>
  );
}

function Statement() {
  const ref = useRef(null);
  const text =
    'Nine in ten of us would consider downsizing. Fewer than one in five ever start. Not because we don’t want to, but because the path is hard. So we made it easy.';
  const words = text.split(' ');
  const [lit, setLit] = useState(0);
  useEffect(() => {
    const on = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      setLit(Math.round(p * words.length));
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [words.length]);
  return (
    <section className="statement">
      <div className="wrap">
        <h2 ref={ref} aria-label={text}>
          {words.map((w, i) => (
            <span key={i} className={`w ${i < lit ? 'lit' : ''}`} aria-hidden="true">
              {w}{' '}
            </span>
          ))}
        </h2>
        <p className="src">89% of New Zealand homeowners over 55 would consider downsizing. 19% are actively looking. Squirrel research, 2025.</p>
        <div className="ctas">
          <a className="btn btn-solid" href="#start">List your address</a>
          <a className="btn btn-line" href="#why">Why an exchange</a>
        </div>
      </div>
    </section>
  );
}

const PAINS = [
  { h: 'Nothing suitable nearby', p: 'Single-level homes are scarce in established suburbs. Too often the only option is a satellite town, away from friends, family and your GP.', f: 'We only show homes that suit, close to where you live now.' },
  { h: 'Timing the sale and the purchase', p: 'Sell first and risk having nowhere to go. Buy first and risk owning two homes. Many people end up renting in between and moving twice.', f: 'Your sale and purchase are lined up to settle together.' },
  { h: 'Decades of belongings', p: 'Decluttering, packing and moving take real physical and emotional energy. Research names it as one of the biggest reasons people stay put.', f: 'Declutter, pack, move and set up, all coordinated.' },
  { h: 'Open homes and negotiation', p: 'Strangers through your home every weekend, pressure on price, and fees that eat into what you have built up.', f: 'The option of a direct offer. No open homes.' },
  { h: 'Not knowing what is left over', p: 'Will you free up money for travel, family and peace of mind, or just break even? It is hard to know before you commit.', f: 'A clear picture of your numbers before you decide.' },
  { h: 'Feeling rushed or sold to', p: 'Nobody wants a sales pitch at this stage of life. Downsizing should happen on your timeline, not someone else’s.', f: 'No pressure. Every decision stays with you.' },
];

function Pains() {
  return (
    <section className="sec" id="why">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">What gets in the way</span>
          <h2>Wanting to downsize is easy. Doing it is not.</h2>
          <p>Research here and overseas, and years of conversations with people in their 60s, 70s and 80s, point to the same six things.</p>
        </div>
        <div className="pains">
          {PAINS.map((x, i) => (
            <div key={x.h} className={`pain rv d${i % 3}`}>
              <span className="num">0{i + 1}</span>
              <h3>{x.h}</h3>
              <p>{x.p}</p>
              <span className="fix">{x.f}</span>
            </div>
          ))}
        </div>
        <p className="cite">Sources: AHURI, International Longevity Centre UK, Building Better NZ, Squirrel.</p>
      </div>
    </section>
  );
}

const Tick = () => (
  <svg width="13" height="11" viewBox="0 0 13 11"><path d="M1 5.5 L4.8 9 L12 1.5" stroke="#fff" strokeWidth="2.4" fill="none" /></svg>
);

function HouseThumb({ v }) {
  return (
    <svg width="54" height="40" viewBox="0 0 54 40" aria-hidden="true">
      {v === 0 && <path d="M6 22 L27 12 L48 22 L27 32Z M6 22 v6 L27 38 V32 M48 22 v6 L27 38" fill="#fff" stroke="var(--ink)" strokeWidth="1.4" strokeLinejoin="round" />}
      {v === 0 && <path d="M10 22 L27 14 L44 22 L27 30Z" fill="var(--mint)" stroke="var(--ink)" strokeWidth="1.2" />}
      {v === 1 && <path d="M8 18 L26 9 L46 19 L28 28Z M8 18 v10 L28 38 V28 M46 19 v9 L28 38" fill="var(--mint)" stroke="var(--ink)" strokeWidth="1.4" strokeLinejoin="round" />}
      {v === 2 && <path d="M10 20 L27 6 L44 20 L27 30Z M10 20 v8 L27 38 V30 M44 20 v8 L27 38" fill="#fff" stroke="var(--ink)" strokeWidth="1.4" strokeLinejoin="round" />}
      {v === 2 && <path d="M27 6 L44 20 L27 30Z" fill="var(--mint)" stroke="var(--ink)" strokeWidth="1.2" />}
    </svg>
  );
}

const MILESTONES = [
  {
    t: 'List your address',
    p: 'Start with the home you have and the life you want next.',
    you: ['What you need in your next home', 'Where you want to be', 'When, if at all'],
    we: ['An honest appraisal of your home', 'A clear picture of what you could free up'],
    vis: (
      <div className="card-wrap">
        <div className="back-card" />
        <div className="card">
          <h5>Your home</h5>
          <div className="sub">14 Example Street · sample</div>
          <div className="row"><span>Bedrooms</span><b>4</b></div>
          <div className="row"><span>Storeys</span><b>2</b></div>
          <div className="row"><span>Section</span><b>820 m²</b></div>
          <div style={{ paddingTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15 }}><span className="sub" style={{ margin: 0 }}>Appraisal range</span><span className="tag">Indicative</span></div>
            <div className="meter"><i style={{ left: '28%', right: '30%' }} /></div>
          </div>
        </div>
        <div className="float-chip" style={{ right: -28, bottom: -18 }}>No obligation</div>
      </div>
    ),
  },
  {
    t: 'See homes that suit',
    p: 'Only single-level, low-maintenance homes close to the life you already have. Including new builds before they are advertised.',
    you: ['Which homes to see', 'Which one feels right', 'Whether to go ahead at all'],
    we: ['Search every new build and listing', 'Check access, warmth and upkeep', 'Book the viewings and drive you there'],
    vis: (
      <div className="card-wrap">
        <div className="card">
          <h5>Homes that suit you</h5>
          <div className="sub">Within 2 km of your address</div>
          {[
            ['New build · 3 bed, 2 bath', 'Single level · 650 m away', 'New'],
            ['Townhouse · 2 bed + study', 'Lift access · 1.2 km away', 'Off market'],
            ['Villa · 3 bed, 2 bath', 'Single level · 1.6 km away', 'Listed'],
          ].map(([a, b, c], i) => (
            <div className="match" key={a}>
              <div className="thumb"><HouseThumb v={i} /></div>
              <div><b>{a}</b><span>{b}</span></div>
              <span className={`tag ${i === 1 ? 'solid' : ''}`}>{c}</span>
            </div>
          ))}
        </div>
        <div className="float-chip" style={{ left: -28, top: -18 }}>Matched to you</div>
      </div>
    ),
  },
  {
    t: 'Sell your way',
    p: 'Two ways to sell, and you choose. Either way, the sale is timed to your purchase.',
    you: ['A direct offer or a listing', 'Your price and your timing', 'Settlement date'],
    we: ['Make you an offer on your home', 'Or list it with our partner agency', 'Line up both settlements'],
    vis: (
      <div className="card-wrap">
        <div className="card">
          <h5>How would you like to sell?</h5>
          <div className="opt sel"><span className="radio" /><div><b>A direct offer</b><span>We buy your home. No open homes, no agent fees.</span></div></div>
          <div className="opt"><span className="radio" /><div><b>List with our partner agency</b><span>A trusted local agent sells it, timed to your move.</span></div></div>
        </div>
        <div className="float-chip" style={{ right: -28, bottom: -18 }}>Settles the day you move</div>
      </div>
    ),
  },
  {
    t: 'Move once',
    p: 'One moving day, planned around you. Walk out of one home and into the next.',
    you: ['Your moving day', 'What comes with you', 'Where it all goes'],
    we: ['Declutter, sell or donate the rest', 'Packers, movers and set-up', 'Power, internet and redirections'],
    vis: (
      <div className="card-wrap">
        <div className="card">
          <h5>Moving day</h5>
          <div className="sub">Thursday · all arranged</div>
          {['Declutter and donate', 'Pack and label', 'Move and unpack', 'Beds made, kettle on', 'Keys handed over'].map((x) => (
            <div className="check-li" key={x}><span className="tick"><Tick /></span>{x}</div>
          ))}
        </div>
        <div className="float-chip" style={{ left: -28, bottom: -18 }}>No renting in between</div>
      </div>
    ),
  },
];

function Journey() {
  const ref = useRef(null);
  useEffect(() => {
    const on = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.55 - r.top) / r.height));
      el.style.setProperty('--p', `${(p * 100).toFixed(1)}%`);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <section className="sec journey" id="how">
      <div className="wrap" style={{ position: 'relative' }}>
        <div className="sec-head center rv">
          <span className="eyebrow">How it works</span>
          <h2>Four steps. One move.</h2>
          <p>Follow one downsizing move from first look to first night in your new home. Home details shown are a sample.</p>
        </div>
        <div className="tl" ref={ref}>
          <div className="tl-line"><i /></div>
          {MILESTONES.map((m, i) => (
            <div key={m.t} className={`ms ${i % 2 ? 'flip' : ''}`}>
              <span className="ms-dot" />
              <div className="ms-copy rv">
                <span className="ms-big" aria-hidden="true">0{i + 1}</span>
                <span className="eyebrow">Step 0{i + 1}</span>
                <h3>{m.t}</h3>
                <p>{m.p}</p>
                <div className="split">
                  <div>
                    <h4>You decide</h4>
                    <ul>{m.you.map((x) => <li key={x}>{x}</li>)}</ul>
                  </div>
                  <div>
                    <h4>We do</h4>
                    <ul>{m.we.map((x) => <li key={x}>{x}</li>)}</ul>
                  </div>
                </div>
              </div>
              <div className="ms-vis rv d2">{m.vis}</div>
            </div>
          ))}
        </div>
        <div className="journey-end rv">
          <h3>Full control. We do the leg work.</h3>
          <p>Nothing happens without your say-so. Change your mind at any step and nothing moves.</p>
          <div className="ctas">
            <a className="btn btn-light" href="#start">List your address</a>
          </div>
        </div>
      </div>
    </section>
  );
}

const CMP = [
  ['Scroll the portals for homes that might suit', 'Only single-level, low-maintenance homes near you'],
  ['Sell first and hope, or buy first and bridge', 'Sale and purchase lined up to settle together'],
  ['Open homes every weekend', 'The option of a direct offer, with no open homes'],
  ['Rent in between and move twice', 'Move once, straight into your new home'],
  ['Juggle agents, lawyers, movers and utilities', 'One person coordinating all of it'],
  ['Pressure to decide on someone else’s timeline', 'Every decision yours, in your own time'],
];

function Compare() {
  const X = () => <svg className="ico" viewBox="0 0 22 22"><path d="M6 6 L16 16 M16 6 L6 16" stroke="currentColor" strokeWidth="1.8" /></svg>;
  const V = () => <svg className="ico" viewBox="0 0 22 22"><rect x="1" y="1" width="20" height="20" fill="var(--green)" /><path d="M6 11 L9.5 14.5 L16 7.5" stroke="#fff" strokeWidth="2.2" fill="none" /></svg>;
  return (
    <section className="sec" style={{ paddingTop: 'clamp(80px, 11vw, 140px)' }}>
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">Why an exchange</span>
          <h2>Built for downsizing. Nothing else.</h2>
          <p>General property portals are made for everyone. An exchange made only for downsizers can match the right people to the right homes, and coordinate both sides of the move.</p>
        </div>
        <div className="compare rv">
          <div className="cmp-row head"><div>Doing it the usual way</div><div>With {NAME}</div></div>
          {CMP.map(([a, b]) => (
            <div className="cmp-row" key={a}>
              <div><X />{a}</div>
              <div><V />{b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ways() {
  return (
    <section className="sec control" id="sell">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">Selling your home</span>
          <h2>Two ways to sell. You choose.</h2>
          <p>Whichever you pick, the sale is timed to the purchase of your new home, so you are never stuck between the two.</p>
        </div>
        <div className="ways">
          <div className="way rv">
            <span className="eyebrow">Option one</span>
            <h3>A direct offer</h3>
            <p>We make you a fair offer to buy your home ourselves.</p>
            <ul>
              <li>No open homes or strangers through the house</li>
              <li>No agent fees</li>
              <li>A settlement date that suits you</li>
            </ul>
          </div>
          <div className="way rv d1">
            <span className="eyebrow">Option two</span>
            <h3>Listed with our partner agency</h3>
            <p>If a direct offer is not the right fit, a trusted local agency lists and sells your home.</p>
            <ul>
              <li>Marketed to the whole market</li>
              <li>Your price, your approval on every offer</li>
              <li>Sale and purchase coordinated by us</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Developers() {
  return (
    <section className="sec dev" id="developers">
      <div className="wrap dev-grid">
        <div className="sec-head rv">
          <span className="eyebrow">For developers</span>
          <h2>Building single-level homes? Meet buyers who are ready.</h2>
          <p>Downsizers on the exchange arrive with their home appraised, their area chosen and their sale in hand. List your stock and we introduce you to the people it suits.</p>
          <div style={{ marginTop: 34 }}><a className="btn btn-solid" href="#start">Register your stock</a></div>
        </div>
        <div className="stats rv d2">
          <div><b>Qualified buyers</b><span>Equity known, sale arranged, timing agreed.</span></div>
          <div><b>Matched by area</b><span>Introduced to buyers who already live near your site.</span></div>
          <div><b>Before launch</b><span>Sell off the plan or pre-completion to people who want exactly this.</span></div>
          <div><b>Sale of their home handled</b><span>No conditional offers left hanging on a sale.</span></div>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  ['Do I have to sell my home to you?', 'No. A direct offer is one option. If it is not right for you, our partner agency can list your home, or you can simply stop. Nothing happens without your say-so.'],
  ['What if I don’t find a home I like?', 'Then you don’t move. You can keep your address on the exchange and we will let you know when something suitable comes up near you.'],
  ['Can I stay in my own area?', 'That is the idea. Most people want to stay close to family, friends, their GP and their routines, so we search near you first.'],
  ['Which homes are on the exchange?', 'New single-level and low-maintenance homes from developers around New Zealand, plus suitable existing homes on the market. Some are only available through the exchange.'],
  ['Where in New Zealand do you work?', 'Nationwide. Put your address in and we will show you what is available near you.'],
  ['What does it cost me?', 'Signing up and seeing homes that suit you costs nothing. If you sell through our partner agency, standard agency fees apply, and we tell you upfront.'],
  ['Can my family be involved?', 'Of course. Bring whoever you like to viewings and meetings, and we can keep them copied in on every step.'],
];

function Faq() {
  return (
    <section className="sec" id="faq">
      <div className="wrap">
        <div className="sec-head center rv">
          <span className="eyebrow">Questions</span>
          <h2>Good questions to ask.</h2>
        </div>
        <div className="faq rv">
          {FAQS.map(([q, a]) => (
            <details key={q}>
              <summary>{q}<span className="pm" aria-hidden="true" /></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Start() {
  const [done, setDone] = useState(false);
  const [addr, setAddr] = useState('');
  return (
    <section className="sec start" id="start">
      <div className="wrap">
        <div className="sec-head center rv">
          <span className="eyebrow">Start here</span>
          <h2>Start with your address.</h2>
          <p>See what kind of homes suit you nearby. It takes a minute, and there is no obligation.</p>
        </div>
        <form
          className="form rv"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <div className="form-grid">
            <div className="field">
              <label htmlFor="addr">Your address</label>
              <input id="addr" autoComplete="street-address" placeholder="Start typing your address" value={addr} onChange={(e) => setAddr(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="when">When are you thinking of moving?</label>
              <select id="when" defaultValue="exploring">
                <option value="exploring">Just exploring</option>
                <option value="year">Within a year</option>
                <option value="six">Within six months</option>
                <option value="soon">As soon as possible</option>
              </select>
            </div>
          </div>
          <button className="btn btn-green" type="submit">Show me homes nearby</button>
          <p className="form-note">Concept preview. Nothing you type here is sent anywhere.</p>
          {done && (
            <div className="results" aria-live="polite">
              <span className="sample">Sample result</span>
              <h4 style={{ marginTop: 6 }}>3 single-level homes within 2 km{addr ? ` of ${addr}` : ''}</h4>
              <div>
                {[
                  ['New build · 3 bed, 2 bath', 'Single level · 650 m away'],
                  ['Townhouse · 2 bed + study', 'Lift access · 1.2 km away'],
                  ['Villa · 3 bed, 2 bath', 'Single level · 1.6 km away'],
                ].map(([a, b], i) => (
                  <div className="match" key={a}>
                    <div className="thumb"><HouseThumb v={i} /></div>
                    <div><b>{a}</b><span>{b}</span></div>
                    <span className="tag">View</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-in">
          <div>
            <Brand />
            <p style={{ marginTop: 14, maxWidth: '34ch' }}>New Zealand&rsquo;s exchange for downsizing. Full control. We do the leg work.</p>
          </div>
          <ul>
            <li><a href="#how">How it works</a></li>
            <li><a href="#why">Why an exchange</a></li>
            <li><a href="#sell">Selling</a></li>
            <li><a href="#developers">Developers</a></li>
            <li><a href="#faq">Questions</a></li>
          </ul>
        </div>
        <p className="legal">Concept website. Names, figures and homes shown are samples for discussion only.</p>
      </div>
    </footer>
  );
}

export default function Page() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 10);
      const start = document.getElementById('start');
      const nearForm = start && start.getBoundingClientRect().top < window.innerHeight;
      setSticky(window.scrollY > 700 && !nearForm);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="wrap nav-in">
          <Brand />
          <ul className="nav-links">
            <li><a href="#how">How it works</a></li>
            <li><a href="#why">Why an exchange</a></li>
            <li><a href="#sell">Selling</a></li>
            <li><a href="#developers">Developers</a></li>
            <li><a href="#faq">Questions</a></li>
          </ul>
          <a className="btn btn-line" href="#start">List your address</a>
        </div>
      </header>
      <main>
        <Hero />
        <Statement />
        <Pains />
        <Journey />
        <Compare />
        <Ways />
        <Developers />
        <Faq />
        <Start />
      </main>
      <Footer />
      <div className={`sticky ${sticky ? 'on' : ''}`}>
        <a className="btn btn-solid" href="#start">List your address</a>
      </div>
    </>
  );
}

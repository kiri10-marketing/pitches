'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Town from '../components/Town';
import { Nav, Footer, Sticky, QuizButton, Arrow, useReveal, useParallax } from '../components/Chrome';
import { HOMES, SUBURB_NAMES, BUDGETS, TIMELINES, fmtPrice } from '../lib/data';

/* ---------------- hero ---------------- */
function Hero() {
  const router = useRouter();
  const [who, setWho] = useState('me');
  const [suburb, setSuburb] = useState('');
  const [budget, setBudget] = useState('');
  const [when, setWhen] = useState('');
  const go = (e) => {
    e.preventDefault();
    const q = new URLSearchParams({ for: who, ...(suburb && { suburb }), ...(budget && { budget }), ...(when && { when }) });
    router.push(`/quiz?${q}`);
  };
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-top">
          <div>
            <span className="hero-eyebrow">$3,000 towards your move</span>
            <h1>
              <span className="line"><span>Downsizing</span></span>
              <span className="line"><span>made clear</span></span>
              <span className="line">
                <span>and simple.</span>
              </span>
            </h1>
            <p className="hero-lede">
              A concierge for your next move. We find your next home first, sell yours quietly, and coordinate the move. Every decision is yours. We do the leg work.
            </p>
            <div className="hero-cta">
              <QuizButton className="btn btn-ink btn-lg" />
              <span>Takes about three minutes</span>
            </div>
          </div>
          <div className="hero-side">
            <div className="offer-badge">
              <b>$3,000</b>
              <span>towards your move</span>
              <small>when you move with Decant</small>
            </div>
            <div className="stats">
              <div><b>1</b><span>move</span></div>
              <div><b>0</b><span>open homes</span></div>
              <div><b>0</b><span>signboards</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-media">
        <div className="wrap">
          <div className="hero-img">
            <img src="/img/deck.jpg" alt="A couple in their late sixties relaxing on the sunny deck of their new single-level home in Christchurch" className="px" />
          </div>
        </div>
        <form className="quizbar" onSubmit={go} aria-label="Start the quiz">
          <div className="qb-tabs" role="group" aria-label="Who is the move for">
            <button type="button" aria-pressed={who === 'me'} onClick={() => setWho('me')}>For me</button>
            <button type="button" aria-pressed={who === 'couple'} onClick={() => setWho('couple')}>For us</button>
            <button type="button" aria-pressed={who === 'parent'} onClick={() => setWho('parent')}>For a parent</button>
          </div>
          <div className="qb-body">
            <div className="field">
              <label htmlFor="qb-s">Where do you live now?</label>
              <select id="qb-s" value={suburb} onChange={(e) => setSuburb(e.target.value)}>
                <option value="">Choose your suburb</option>
                {SUBURB_NAMES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="qb-b">Budget for your next home</label>
              <select id="qb-b" value={budget} onChange={(e) => setBudget(e.target.value)}>
                <option value="">Choose a range</option>
                {BUDGETS.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="qb-w">When are you thinking?</label>
              <select id="qb-w" value={when} onChange={(e) => setWhen(e.target.value)}>
                <option value="">Choose a time</option>
                {TIMELINES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </div>
            <button className="btn btn-ink" type="submit">Start the quiz <Arrow /></button>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ---------------- statement ---------------- */
function About() {
  const ref = useRef(null);
  const text = 'Decant means to pour from something bigger into something smaller, carefully, so nothing of value is lost. That is how we move you.';
  const words = text.split(' ');
  const [lit, setLit] = useState(0);
  useEffect(() => {
    const on = () => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const vh = window.innerHeight;
      setLit(Math.round(Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.3))) * words.length));
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [words.length]);
  return (
    <section className="about">
      <div className="wrap">
        <div className="about-grid">
          <span className="label">Why Decant</span>
          <div>
            <h2 ref={ref} aria-label={text}>
              {words.map((w, i) => <span key={i} aria-hidden="true" className={`w ${i < lit ? 'lit' : ''}`}>{w} </span>)}
            </h2>
            <div className="about-sub">
              <p className="rv">
                Most people know it is time long before they move. The garden has become a job, the stairs are getting harder, and there is equity that could help the kids. What is missing is a clear path. Decant gives you one, with certainty at every step and a person to walk it with you.
              </p>
              <img className="clip" src="/img/oldhome.jpg" alt="A two-storey family home in Christchurch with a large lawn and garden" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- familiar ---------------- */
const I = {
  garden: <path d="M12 21V11M12 11c0-4 3-6 7-6 0 4-3 6-7 6zM12 14c0-3-2.5-5-6-5 0 3 2.5 5 6 5z" />,
  family: <><circle cx="8" cy="7" r="3" /><circle cx="17" cy="9" r="2.3" /><path d="M2.5 20c.5-4 2.6-6 5.5-6s5 2 5.5 6M13.5 20c.4-3 1.8-4.6 3.5-4.6S20.1 17 20.5 20" /></>,
  plane: <path d="M3 13l18-7-5 14-3.5-5.5L3 13zM12.5 14.5L21 6" />,
  heart: <path d="M12 20s-8-4.6-8-10.2C4 7 6 5 8.4 5c1.6 0 2.8.9 3.6 2 .8-1.1 2-2 3.6-2C18 5 20 7 20 9.8 20 15.4 12 20 12 20z" />,
  stairs: <path d="M3 20h5v-4h4v-4h4V8h5" />,
  tools: <path d="M14 6l4 4M5 19l7.5-7.5M15.5 3.5a4 4 0 00-5 5L4 15l5 5 6.5-6.5a4 4 0 005-5l-3 3-3-1-1-3 3-3z" />,
};
const FAMILIAR = [
  ['garden', 'The garden has become a job', 'Weekends spent mowing, pruning and raking leaves you never asked for.'],
  ['family', 'You want to help the kids', 'Freeing up equity could help a son or daughter onto the property ladder now, not later.'],
  ['plane', 'You want to travel more', 'A lock-up-and-leave home means you can go away without worrying about the place.'],
  ['heart', 'You want to be closer to family', 'Pop-in distance from the grandchildren, not a weekend drive.'],
  ['stairs', 'The stairs are getting harder', 'A main bedroom downstairs, for now and for later.'],
  ['tools', 'An older home needs constant care', 'Roofs, gutters, paint and power bills after decades in the same house.'],
];
function Familiar() {
  return (
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="head-row">
          <div className="rv">
            <span className="label">Sound familiar?</span>
            <h2 style={{ fontSize: 'clamp(38px, 5vw, 66px)', marginTop: 14, letterSpacing: '-0.04em' }}>You know it is time. The path just is not clear.</h2>
          </div>
          <p className="rv d1">These are the reasons we hear most from Christchurch homeowners in their 60s and 70s. If two or three ring true, the quiz takes a few minutes.</p>
        </div>
        <div className="cards">
          {FAMILIAR.map(([k, h, p], i) => (
            <div className={`c rv d${i % 3}`} key={h}>
              <div className="ico">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">{I[k]}</svg>
              </div>
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- journey (pinned, scroll-driven) ---------------- */
const STEPS = [
  {
    t: 'Start the quiz',
    h: 'Tell us what you need.',
    p: 'A friendly set of questions about your home now, your next one, and what you would rather avoid. Then we call you to talk it through.',
    you: ['Your budget and timing', 'Where you want to be', 'What you must have, and what you don’t'],
    we: ['Build your downsizing brief', 'Call you at a time that suits'],
  },
  {
    t: 'See homes that fit',
    h: 'Only homes that suit you.',
    p: 'Single-level and downstairs-bedroom homes from developers we work with, plus off-market homes that are not on public sale.',
    you: ['Which homes to see', 'Which one feels right'],
    we: ['Match homes to your brief', 'Book viewings and come with you'],
  },
  {
    t: 'Secure your next home',
    h: 'Your next home, secured first.',
    p: 'Nothing is sold until you know exactly where you are going. That is the certainty most downsizers are missing.',
    you: ['The home you want', 'The terms you are happy with'],
    we: ['Negotiate on your behalf', 'Line up dates with your sale'],
  },
  {
    t: 'The quiet sale',
    h: 'Sold quietly. No fuss.',
    p: 'Your home is offered privately to qualified buyers. No signboard, no open homes, no neighbours wondering.',
    you: ['Your price', 'Which offer to accept', 'Your settlement date'],
    we: ['Present your home to qualified buyers', 'Handle every viewing and negotiation'],
  },
  {
    t: 'The smooth move',
    h: 'One move, with $3,000 towards it.',
    p: 'We coordinate a trusted local removal company and put $3,000 towards the cost. You walk out of one home and into the next.',
    you: ['Your moving day', 'What comes with you'],
    we: ['Packing, moving and set-up', '$3,000 towards your move'],
  },
];
function Journey() {
  const track = useRef(null);
  const [step, setStep] = useState(0);
  const [vanT, setVanT] = useState(0);
  useEffect(() => {
    const on = () => {
      const el = track.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(0.999, Math.max(0, -r.top / total));
      setStep(Math.floor(p * STEPS.length));
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, []);
  useEffect(() => {
    if (step !== 4) { setVanT(0); return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVanT(1); return; }
    let raf, t0;
    const tick = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / 2600);
      setVanT(p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const d = setTimeout(() => (raf = requestAnimationFrame(tick)), 500);
    return () => { clearTimeout(d); cancelAnimationFrame(raf); };
  }, [step]);
  const jump = (i) => {
    const el = track.current;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + (total * (i + 0.5)) / STEPS.length, behavior: 'smooth' });
  };
  return (
    <section className="journey" id="how">
      <div className="j-track" ref={track} style={{ height: `${STEPS.length * 80 + 100}vh` }}>
        <div className="j-sticky">
          <div className="wrap" style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="j-head">
              <span className="label">How it works</span>
              <h2 style={{ marginTop: 10 }}>Certainty at every step.</h2>
            </div>
            <div className="j-steps" style={{ '--jp': step / (STEPS.length - 1) }}>
              <span className="fill" />
              {STEPS.map((s, i) => (
                <button key={s.t} className={`j-step ${i === step ? 'on' : ''} ${i < step ? 'done' : ''}`} onClick={() => jump(i)} aria-current={i === step ? 'step' : undefined}>
                  <span className="n">{i + 1}</span>
                  <span className="t">{s.t}</span>
                </button>
              ))}
            </div>
            <div className="j-stage">
              <div className="j-town"><Town step={step} vanT={vanT} /></div>
              <div className="j-card" aria-live="polite">
                {STEPS.map((s, i) => (
                  <div key={s.t} className={`j-panel ${i === step ? 'on' : ''}`} aria-hidden={i !== step}>
                    <span className="label">Step {i + 1} of 5</span>
                    <h3>{s.h}</h3>
                    <p>{s.p}</p>
                    <div className="split">
                      <div><h4>You decide</h4><ul>{s.you.map((x) => <li key={x}>{x}</li>)}</ul></div>
                      <div><h4>We do</h4><ul>{s.we.map((x) => <li key={x}>{x}</li>)}</ul></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- homes ---------------- */
const KINDS = [['all', 'All homes'], ['new', 'New builds'], ['offplan', 'Off the plan'], ['offmarket', 'Off-market']];
function Homes() {
  const [k, setK] = useState('all');
  const list = (k === 'all' ? HOMES : HOMES.filter((h) => h.kind === k)).slice(0, 6);
  return (
    <section className="sec homes">
      <div className="wrap">
        <div className="head-row">
          <div className="rv">
            <span className="label">The kind of homes we find</span>
            <h2 style={{ fontSize: 'clamp(38px, 5vw, 66px)', marginTop: 14, letterSpacing: '-0.04em' }}>The right size for your next step.</h2>
          </div>
          <p className="rv d1">Not a shoebox, and not a retirement village. Single-level and downstairs-bedroom homes with room for the grandchildren to stay, many of them never advertised.</p>
        </div>
        <div className="tabs" role="group" aria-label="Filter homes">
          {KINDS.map(([id, t]) => (
            <button key={id} className="tab" aria-pressed={k === id} onClick={() => setK(id)}>{t}</button>
          ))}
        </div>
        <div className="home-grid" key={k}>
          {list.map((h) => (
            <article className="home" key={h.id}>
              <div className="home-img">
                <img src={h.img} alt={`${h.title} in ${h.suburb}`} loading="lazy" />
                <span className={`tag ${h.kind === 'offmarket' ? 'dark' : ''}`}>{h.kindLabel}</span>
              </div>
              <div className="home-body">
                <div className="home-row">
                  <span className="price"><small>Guide </small>{fmtPrice(h.price)}</span>
                  <span className="tag green">{h.stairs === 'none' ? 'Single level' : h.stairs === 'lift' ? 'Lift access' : 'Main bedroom down'}</span>
                </div>
                <h3>{h.title}</h3>
                <div className="sub">{h.suburb}, Christchurch</div>
                <div className="specs">
                  <span>{h.beds} bedrooms</span>
                  <span>{h.baths} bathrooms</span>
                  <span>{h.garage === 2 ? 'Double garage' : 'Single garage'}</span>
                  {h.lockup && <span>Lock up and leave</span>}
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="note">Sample homes for illustration. Your matches come from your quiz answers.</p>
      </div>
    </section>
  );
}

/* ---------------- quiet sale ---------------- */
function Quiet() {
  const items = [
    ['No signboard', 'Nobody on the street knows your home is for sale until you choose to tell them.'],
    ['No open homes', 'No strangers through your house every weekend. Private viewings only, at times that suit you.'],
    ['Qualified buyers only', 'Your home is shown to registered buyers who have their finance and timing in order.'],
    ['Only after you have secured your next home', 'Unless you do not need to sell to buy, your sale waits until you know where you are going.'],
  ];
  return (
    <section className="quiet" id="quiet">
      <div className="quiet-grid">
        <div className="quiet-img">
          <img className="clip" src="/img/strowan.jpg" alt="A single-level brick home on a quiet Christchurch street" loading="lazy" />
          <div className="over"><span className="tag">Private</span><span className="tag">By appointment</span></div>
        </div>
        <div className="quiet-copy">
          <span className="label rv">The quiet sale</span>
          <h2 className="rv d1">Your home, sold quietly.</h2>
          <p className="rv d2">Every Decant sale runs through a licensed real estate agency as a quiet listing. It is discreet, calm and on your terms.</p>
          <div className="qlist">
            {items.map(([b, s], i) => (
              <div className={`qitem rv d${i + 1}`} key={b}>
                <span className="num">0{i + 1}</span>
                <div><b>{b}</b><span>{s}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- local ---------------- */
const Tick = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><rect width="20" height="20" fill="var(--green)" /><path d="M5 10.2 L8.4 13.5 L15 6.5" stroke="#fff" strokeWidth="2" fill="none" /></svg>
);
function Local() {
  return (
    <section className="sec">
      <div className="wrap local-grid">
        <div className="local-img clip">
          <img src="/img/street.jpg" alt="An older couple walking along a tree-lined Christchurch street towards a café" loading="lazy" />
          <div className="float"><b>Your neighbourhood first</b><span>We search close to the life you already have.</span></div>
        </div>
        <div>
          <span className="label rv">Stay local</span>
          <h2 className="rv d1" style={{ fontSize: 'clamp(38px, 5vw, 64px)', marginTop: 14, letterSpacing: '-0.04em' }}>Stay where the barista knows your name.</h2>
          <p className="rv d2" style={{ color: 'var(--ink-2)', marginTop: 20 }}>
            Downsizing should not mean moving out to a satellite town. Your GP, your supermarket, your friends and your routines matter as much as the house.
          </p>
          <ul className="ticks rv d3">
            <li><Tick />We look in your suburb and the ones next door first</li>
            <li><Tick />Homes sized for your next step, with room for family to stay</li>
            <li><Tick />Easy-care gardens, warm and dry, lock up and leave</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- concierge ---------------- */
function Concierge() {
  return (
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="wrap conc-grid">
        <div>
          <span className="label rv">A concierge, not a salesperson</span>
          <h2 className="rv d1" style={{ fontSize: 'clamp(38px, 5vw, 64px)', marginTop: 14, letterSpacing: '-0.04em' }}>One person, start to finish.</h2>
          <p className="rv d2" style={{ color: 'var(--ink-2)', marginTop: 20, maxWidth: '46ch' }}>
            Your Decant concierge listens first, then does the leg work: finding homes, booking viewings, coordinating your sale and organising the move. You are never rushed, and nothing happens without your say-so.
          </p>
          <div className="rv d3" style={{ marginTop: 34 }}><QuizButton /></div>
        </div>
        <div className="conc-img clip"><img src="/img/concierge.jpg" alt="A Decant concierge talking through a floor plan with a couple at their dining table" loading="lazy" /></div>
      </div>
    </section>
  );
}

/* ---------------- costs ---------------- */
function Costs() {
  return (
    <section className="sec costs" id="costs">
      <div className="wrap">
        <div className="head center rv">
          <span className="label">Costs</span>
          <h2>Simple, and fair.</h2>
          <p>You pay the usual agency commission when your home sells. That is it. And we put $3,000 towards your move.</p>
        </div>
        <div className="cost-grid rv d1">
          <div>
            <div className="big">$0</div>
            <h3>The quiz, the search and your concierge</h3>
            <p>Matching, viewings and coordination are included.</p>
          </div>
          <div>
            <div className="big">Standard</div>
            <h3>Agency commission on your sale</h3>
            <p>Charged only when your home sells. No surprises.</p>
          </div>
          <div className="hl">
            <div className="big">$3,000</div>
            <h3>Towards your move</h3>
            <p>With a trusted local removal company we coordinate for you.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- faq ---------------- */
const FAQS = [
  ['Do I have to sell before I buy?', 'No. We secure your next home first, then sell yours quietly. If you do not need to sell to buy, we skip straight to your new home.'],
  ['What is a quiet listing?', 'Your home is offered privately to qualified buyers through a licensed agency. No signboard, no open homes, and no public advertising unless you choose it.'],
  ['What does Decant cost?', 'The usual agency commission when your home sells. The quiz, matching, viewings and coordination are included, and we put $3,000 towards your move.'],
  ['Which homes will I see?', 'Single-level and downstairs-bedroom homes from developers we work with, plus off-market homes that are not on public sale.'],
  ['Can I stay in my own suburb?', 'That is where we look first. Most people want to stay close to family, friends, their GP and their routines.'],
  ['Can my family be involved?', 'Of course. Bring whoever you like to viewings and meetings, and we can keep them updated at every step.'],
  ['Where does Decant work?', 'We are starting in Christchurch and growing across New Zealand.'],
  ['What if I change my mind?', 'Then nothing moves. You decide at every step, and you can pause or stop at any time.'],
];
function Faq() {
  return (
    <section className="sec" id="questions">
      <div className="wrap">
        <div className="head center rv">
          <span className="label">Questions</span>
          <h2>Good questions to ask.</h2>
        </div>
        <div className="faq">
          {[0, 1].map((col) => (
            <div key={col} style={{ display: 'grid', gap: 14 }}>
              {FAQS.filter((_, i) => i % 2 === col).map(([q, a]) => (
                <details key={q} className="rv">
                  <summary>{q}<span className="pm" aria-hidden="true" /></summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- offer banner ---------------- */
function Offer() {
  return (
    <section className="offer">
      <img className="px" src="/img/movers.jpg" alt="" />
      <div>
        <span className="label">The Decant offer</span>
        <h2>$3,000 towards your move.</h2>
        <p>Start with a few friendly questions. We will call you to talk through what you need, with no obligation.</p>
        <QuizButton className="btn btn-white btn-lg" />
      </div>
    </section>
  );
}

export default function Home() {
  useReveal();
  useParallax('.px', 0.1);
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Familiar />
        <Journey />
        <Homes />
        <Quiet />
        <Local />
        <Concierge />
        <Costs />
        <Faq />
        <Offer />
      </main>
      <Footer />
      <Sticky />
    </>
  );
}

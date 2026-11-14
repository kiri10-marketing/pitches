'use client';
import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Mark, Arrow } from '../../components/Chrome';
import { SUBURB_NAMES, SUBURBS, BUDGETS, TIMELINES, match, fmtPrice, saveResponse } from '../../lib/data';
import './quiz.css';

const TRIGGERS = [
  'The garden is too big',
  'Help the kids onto the property ladder',
  'Travel more',
  'Be closer to family',
  'A downstairs bedroom',
  'Tired of maintaining an older home',
  'Lower running costs',
  'Health or mobility',
];
const DONTS = ['Apartment living', 'A retirement village', 'Body corporate fees', 'A shared driveway', 'A big garden', 'Moving out of town', 'Anything too small', 'Stairs to the bedroom'];

function Choice({ multi, options, value, onChange, cols = 2 }) {
  const has = (v) => (multi ? (value || []).includes(v) : value === v);
  const tog = (v) => {
    if (!multi) return onChange(v);
    const s = new Set(value || []);
    s.has(v) ? s.delete(v) : s.add(v);
    onChange([...s]);
  };
  return (
    <div className="choices" style={{ '--cols': cols }} role={multi ? 'group' : 'radiogroup'}>
      {options.map((o) => {
        const [v, l, sub] = Array.isArray(o) ? o : [o, o];
        return (
          <button type="button" key={v} className={`choice ${has(v) ? 'on' : ''}`} onClick={() => tog(v)} role={multi ? 'checkbox' : 'radio'} aria-checked={has(v)}>
            <span className={`box ${multi ? 'sq' : ''}`} aria-hidden="true" />
            <span><b>{l}</b>{sub && <small>{sub}</small>}</span>
          </button>
        );
      })}
    </div>
  );
}

function Mini({ label, children }) {
  return (
    <div className="mini">
      <div className="mini-l">{label}</div>
      {children}
    </div>
  );
}
function Seg({ options, value, onChange }) {
  return (
    <div className="seg">
      {options.map((o) => {
        const [v, l] = Array.isArray(o) ? o : [o, o];
        return (
          <button type="button" key={v} aria-pressed={value === v} onClick={() => onChange(v)}>{l}</button>
        );
      })}
    </div>
  );
}

function Quiz() {
  const sp = useSearchParams();
  const [a, setA] = useState({
    who: sp.get('for') || '',
    suburb: sp.get('suburb') || '',
    street: '',
    nowBeds: '',
    nowStoreys: '',
    nowSection: '',
    triggers: [],
    where: '',
    targetSuburb: '',
    budget: sp.get('budget') || '',
    beds: '',
    garage: '',
    garden: '',
    stairs: '',
    pets: '',
    lockup: '',
    donts: [],
    timeline: sp.get('when') || '',
    sellToBuy: '',
    name: '',
    phone: '',
    callTime: '',
    email: '',
  });
  const set = (k) => (v) => setA((p) => ({ ...p, [k]: v }));
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);

  const parent = a.who === 'parent';
  const you = parent ? 'your parent' : 'you';
  const your = parent ? 'their' : 'your';

  const steps = [
    {
      q: 'Who is the move for?',
      sub: 'We will tailor the questions to suit.',
      ok: !!a.who,
      body: <Choice value={a.who} onChange={set('who')} cols={3} options={[['me', 'Just me'], ['couple', 'Me and my partner'], ['parent', 'A parent', 'I am helping them']]} />,
    },
    {
      q: parent ? 'Where does your parent live now?' : 'Where do you live now?',
      sub: 'This is where we start looking. Your street address stays private.',
      ok: !!a.suburb,
      body: (
        <div className="fields">
          <div className="field">
            <label htmlFor="sub">Suburb</label>
            <select id="sub" value={a.suburb} onChange={(e) => set('suburb')(e.target.value)}>
              <option value="">Choose a suburb</option>
              {SUBURB_NAMES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="st">Street address <span className="opt">optional</span></label>
            <input id="st" autoComplete="street-address" value={a.street} onChange={(e) => set('street')(e.target.value)} placeholder="For example, 14 Example Street" />
          </div>
        </div>
      ),
    },
    {
      q: `Tell us about ${your} home now.`,
      sub: 'A rough picture is plenty.',
      ok: a.nowBeds && a.nowStoreys && a.nowSection,
      body: (
        <div className="minis">
          <Mini label="Bedrooms"><Seg value={a.nowBeds} onChange={set('nowBeds')} options={['2', '3', '4', '5+']} /></Mini>
          <Mini label="Storeys"><Seg value={a.nowStoreys} onChange={set('nowStoreys')} options={[['1', 'Single level'], ['2', 'Two or more']]} /></Mini>
          <Mini label="Section"><Seg value={a.nowSection} onChange={set('nowSection')} options={[['small', 'Small'], ['medium', 'Medium'], ['large', 'Large garden']]} /></Mini>
        </div>
      ),
    },
    {
      q: 'What is prompting the move?',
      sub: 'Choose as many as you like.',
      ok: a.triggers.length > 0,
      body: <Choice multi value={a.triggers} onChange={set('triggers')} options={TRIGGERS} />,
    },
    {
      q: `Where would ${you} like to be?`,
      sub: 'Most people stay close to the life they already have.',
      ok: !!a.where && (a.where !== 'family' || a.targetSuburb),
      body: (
        <>
          <Choice value={a.where} onChange={set('where')} options={[['same', `In ${a.suburb || 'my suburb'}`, 'Same neighbourhood'], ['near', 'Nearby suburbs', 'Within about 5 km'], ['family', 'Closer to family', 'Tell us where'], ['open', 'Open to ideas', 'Anywhere in Christchurch']]} />
          {a.where === 'family' && (
            <div className="field" style={{ marginTop: 18, maxWidth: 420 }}>
              <label htmlFor="ts">Which suburb?</label>
              <select id="ts" value={a.targetSuburb} onChange={(e) => set('targetSuburb')(e.target.value)}>
                <option value="">Choose a suburb</option>
                {SUBURB_NAMES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          )}
        </>
      ),
    },
    {
      q: 'What budget suits the next home?',
      sub: 'Roughly is fine. We will talk it through with you.',
      ok: !!a.budget,
      body: <Choice value={a.budget} onChange={set('budget')} options={BUDGETS.map((b) => [b.id, b.label])} />,
    },
    {
      q: 'What does the next home need?',
      sub: 'Pick what matters. Skip what does not.',
      ok: a.beds && a.stairs,
      body: (
        <div className="minis">
          <Mini label="Bedrooms"><Seg value={a.beds} onChange={set('beds')} options={['2', '3', '4']} /></Mini>
          <Mini label="Stairs"><Seg value={a.stairs} onChange={set('stairs')} options={[['none', 'No stairs at all'], ['downstairs', 'Main bedroom downstairs'], ['lift', 'A lift is fine']]} /></Mini>
          <Mini label="Garaging"><Seg value={a.garage} onChange={set('garage')} options={[['1', 'Single'], ['2', 'Double'], ['0', 'Not needed']]} /></Mini>
          <Mini label="Garden"><Seg value={a.garden} onChange={set('garden')} options={[['courtyard', 'Courtyard'], ['small', 'Small and easy'], ['potter', 'Room to potter']]} /></Mini>
          <Mini label="Pets"><Seg value={a.pets} onChange={set('pets')} options={[['yes', 'Yes, they come too'], ['no', 'No pets']]} /></Mini>
          <Mini label="Lock up and leave"><Seg value={a.lockup} onChange={set('lockup')} options={[['yes', 'Yes please'], ['no', 'Not important']]} /></Mini>
        </div>
      ),
    },
    {
      q: 'Anything you would rather avoid?',
      sub: 'Just as useful as what you want.',
      ok: true,
      body: <Choice multi value={a.donts} onChange={set('donts')} options={DONTS} />,
    },
    {
      q: 'And the timing?',
      sub: 'There is no wrong answer.',
      ok: a.timeline && a.sellToBuy,
      body: (
        <div className="minis">
          <Mini label="When"><Seg value={a.timeline} onChange={set('timeline')} options={TIMELINES.map((t) => [t.id, t.label])} /></Mini>
          <Mini label={`Do ${parent ? 'they' : 'you'} need to sell to buy?`}><Seg value={a.sellToBuy} onChange={set('sellToBuy')} options={[['yes', 'Yes'], ['no', 'No'], ['unsure', 'Not sure yet']]} /></Mini>
        </div>
      ),
    },
    {
      q: 'Who should we call?',
      sub: 'Your concierge will call to talk through your brief. No pressure, no obligation.',
      ok: a.name.trim() && a.phone.trim().length >= 7 && a.callTime,
      body: (
        <div className="fields">
          <div className="field"><label htmlFor="n">First name</label><input id="n" autoComplete="given-name" value={a.name} onChange={(e) => set('name')(e.target.value)} /></div>
          <div className="field"><label htmlFor="p">Phone</label><input id="p" type="tel" autoComplete="tel" value={a.phone} onChange={(e) => set('phone')(e.target.value)} /></div>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label>Best time to call</label>
            <Seg value={a.callTime} onChange={set('callTime')} options={[['morning', 'Morning'], ['afternoon', 'Afternoon'], ['evening', 'Early evening']]} />
          </div>
          <div className="field" style={{ gridColumn: '1 / -1' }}><label htmlFor="e">Email <span className="opt">optional</span></label><input id="e" type="email" autoComplete="email" value={a.email} onChange={(e) => set('email')(e.target.value)} /></div>
        </div>
      ),
    },
  ];

  const s = steps[i];
  const last = i === steps.length - 1;
  const next = () => {
    if (!s.ok) return;
    if (last) {
      const target = a.where === 'family' ? a.targetSuburb : a.suburb;
      const [la, lo] = SUBURBS[target] || SUBURBS.Merivale;
      const [fla, flo] = SUBURBS[a.suburb] || [la, lo];
      // contact details stay out of the demand data
      saveResponse({ id: `q${Date.now()}`, targetSuburb: target, lat: la + (Math.random() - 0.5) * 0.01, lng: lo + (Math.random() - 0.5) * 0.014, fromSuburb: a.suburb, sellLat: fla + (Math.random() - 0.5) * 0.01, sellLng: flo + (Math.random() - 0.5) * 0.014, budget: a.budget, timeline: a.timeline, beds: a.beds, garage: a.garage, stairs: a.stairs, pets: a.pets, lockup: a.lockup === 'yes', sellToBuy: a.sellToBuy, at: new Date().toISOString() });
      setDone(true);
      window.scrollTo(0, 0);
    } else {
      setI(i + 1);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const k = (e) => { if (e.key === 'Enter' && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'SELECT') next(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  });

  const brief = useMemo(() => ({ ...a, targetSuburb: a.where === 'family' ? a.targetSuburb : a.suburb, lockup: a.lockup === 'yes' }), [a]);
  const results = useMemo(() => (done ? match(brief).slice(0, 3) : []), [done, brief]);

  return (
    <div className="quiz">
      <header className="q-top">
        <Link href="/" className="brand"><Mark light={false} /> Decant</Link>
        <Link href="/" className="q-close">Close</Link>
      </header>
      {!done ? (
        <>
          <div className="q-prog" aria-hidden="true"><i style={{ width: `${((i + 1) / steps.length) * 100}%` }} /></div>
          <main className="q-main">
            <div className="q-step" key={i}>
              <div className="q-count">Question {i + 1} of {steps.length}</div>
              <h1>{s.q}</h1>
              <p className="q-sub">{s.sub}</p>
              <div className="q-body">{s.body}</div>
            </div>
          </main>
          <footer className="q-nav">
            <button type="button" className="btn btn-line" onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0}>Back</button>
            <button type="button" className="btn btn-ink" onClick={next} disabled={!s.ok}>{last ? 'See my matches' : 'Next'} <Arrow /></button>
          </footer>
        </>
      ) : (
        <main className="q-main q-done">
          <div className="q-step">
            <div className="q-count">Your downsizing brief</div>
            <h1>Thank you, {a.name.split(' ')[0]}. Here is what we heard.</h1>
            <div className="brief">
              <div><span>Starting from</span><b>{a.suburb}</b></div>
              <div><span>Looking in</span><b>{a.where === 'same' ? a.suburb : a.where === 'near' ? `Around ${a.suburb}` : a.where === 'family' ? a.targetSuburb : 'Open to ideas'}</b></div>
              <div><span>Budget</span><b>{BUDGETS.find((b) => b.id === a.budget)?.label}</b></div>
              <div><span>Needs</span><b>{a.beds} bedrooms{a.stairs === 'none' ? ', no stairs' : a.stairs === 'downstairs' ? ', main bedroom downstairs' : ''}{a.garage === '2' ? ', double garage' : ''}</b></div>
              <div><span>Timing</span><b>{TIMELINES.find((t) => t.id === a.timeline)?.label}</b></div>
              <div><span>We will call</span><b>{a.phone}, {a.callTime === 'evening' ? 'early evening' : `in the ${a.callTime}`}</b></div>
            </div>

            <h2 className="q-h2">Homes that fit your brief</h2>
            <p className="q-sub">A first look from our matching engine. Your concierge will refine these with you, including off-market homes.</p>
            <div className="matches">
              {results.map((h) => (
                <article className="mcard" key={h.id}>
                  <div className="mimg"><img src={h.img} alt="" /><span className="tag">{h.kindLabel}</span></div>
                  <div className="mbody">
                    <div className="mrow"><b>{h.title}</b><span className="score">{h.score}% fit</span></div>
                    <div className="msub">{h.suburb} · Guide {fmtPrice(h.price)} · {h.beds} bed · {h.garage === 2 ? 'double' : 'single'} garage</div>
                    <ul>{h.why.map((w) => <li key={w}>{w}</li>)}</ul>
                  </div>
                </article>
              ))}
            </div>
            <p className="q-note">Sample homes for this concept. In this preview your answers stay in this browser and appear on the demand map.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 30 }}>
              <Link href="/" className="btn btn-ink">Back to Decant <Arrow /></Link>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense>
      <Quiz />
    </Suspense>
  );
}

'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import 'leaflet/dist/leaflet.css';
import { Mark } from '../../components/Chrome';
import { SUBURBS, BUDGETS, TIMELINES, SELL_BANDS, sellBand, seedDemand, loadResponses, km } from '../../lib/data';
import './demand.css';

const ALL = 'all';
const BUY = '#2f6b4a';
const SELL = '#d9822b';
const MODES = [
  ['buy', 'Buying demand'],
  ['sell', 'Selling demand'],
  ['both', 'Both'],
];
const TL = Object.fromEntries(TIMELINES.map((t) => [t.id, t.label]));
const BL = Object.fromEntries(BUDGETS.map((b) => [b.id, b.label]));
const fmtK = (v) => (v >= 1000 ? `$${(v / 1000).toFixed(2).replace(/0$/, '')}m` : `$${v}k`);

const pinIcon = (L, colour) =>
  L.divIcon({
    className: 'd-pin',
    iconSize: [16, 22],
    iconAnchor: [8, 22],
    tooltipAnchor: [0, -20],
    html: `<svg width="16" height="22" viewBox="0 0 16 22"><path d="M1 1h14v14H10.5L8 21l-2.5-6H1z" fill="${colour}" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  });

function Bar({ parts, colour }) {
  const total = parts.reduce((a, p) => a + p.n, 0) || 1;
  return (
    <div className="dbar">
      {parts.map((p) => (
        <div key={p.l} className="dbar-row">
          <span>{p.l}</span>
          <div className="dbar-track"><i style={{ width: `${(p.n / total) * 100}%`, background: colour }} /></div>
          <b>{Math.round((p.n / total) * 100)}%</b>
        </div>
      ))}
    </div>
  );
}

function TopList({ title, rows, colour, focus, onPick }) {
  const max = rows[0]?.[1] || 1;
  return (
    <section>
      <h2><i className="d-key" style={{ background: colour }} />{title}</h2>
      <ol className="d-top8">
        {rows.map(([s, n]) => (
          <li key={s}>
            <button onClick={() => onPick(s)} aria-pressed={focus === s}>
              <span>{s}</span>
              <i style={{ width: `${(n / max) * 100}%`, background: colour }} />
              <b>{n}</b>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function Demand() {
  const mapEl = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const ringRef = useRef(null);
  const LRef = useRef(null);
  const [data, setData] = useState([]);
  const [live, setLive] = useState(0);
  const [mode, setMode] = useState('both');
  const [f, setF] = useState({ budget: ALL, timeline: ALL, beds: ALL, stairs: ALL, garage: ALL, value: ALL, sellBeds: ALL });
  const [view, setView] = useState('pins');
  const [focus, setFocus] = useState('Merivale');
  const [radius, setRadius] = useState(3);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mine = loadResponses();
    setLive(mine.length);
    setData([...seedDemand(), ...mine]);
  }, []);

  const showBuy = mode !== 'sell';
  const showSell = mode !== 'buy';

  // shared filters apply to the person; selling filters apply to the home they will sell
  const rows = useMemo(
    () => data.filter((d) =>
      (f.budget === ALL || d.budget === f.budget) &&
      (f.timeline === ALL || (f.timeline === 'soon' ? ['asap', '6m'].includes(d.timeline) : d.timeline === f.timeline)) &&
      (f.beds === ALL || d.beds === f.beds) &&
      (f.stairs === ALL || d.stairs === f.stairs) &&
      (f.garage === ALL || d.garage === f.garage)
    ),
    [data, f]
  );
  const buyers = rows;
  const sellers = useMemo(
    () => rows.filter((d) =>
      d.fromSuburb && d.sellLat != null &&
      (f.value === ALL || sellBand(d.sellValue) === f.value) &&
      (f.sellBeds === ALL || d.sellBeds === f.sellBeds)
    ),
    [rows, f.value, f.sellBeds]
  );

  // map setup
  useEffect(() => {
    let dead = false;
    (async () => {
      const L = (await import('leaflet')).default;
      if (dead || mapRef.current) return;
      LRef.current = L;
      const m = L.map(mapEl.current, { zoomControl: false, attributionControl: true, scrollWheelZoom: true }).setView([-43.535, 172.64], 12);
      L.control.zoom({ position: 'bottomright' }).addTo(m);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(m);
      mapRef.current = m;
      setReady(true);
    })();
    return () => { dead = true; };
  }, []);

  // draw layers
  useEffect(() => {
    const L = LRef.current, m = mapRef.current;
    if (!ready || !L || !m) return;
    layerRef.current?.remove();
    const g = L.layerGroup();
    if (view === 'pins') {
      const buyIcon = pinIcon(L, BUY), sellIcon = pinIcon(L, SELL);
      if (showSell) sellers.forEach((d) => {
        L.marker([d.sellLat, d.sellLng], { icon: sellIcon, keyboard: false })
          .bindTooltip(`<b>Home to sell in ${d.fromSuburb}</b><br>${d.sellBeds ? `${d.sellBeds} bed · ` : ''}${d.sellValue ? `est. ${fmtK(d.sellValue)} · ` : ''}${TL[d.timeline] || ''}`, { direction: 'top' })
          .on('click', () => setFocus(d.fromSuburb))
          .addTo(g);
      });
      if (showBuy) buyers.forEach((d) => {
        L.marker([d.lat, d.lng], { icon: buyIcon, keyboard: false })
          .bindTooltip(`<b>Wants to buy in ${d.targetSuburb}</b><br>${BL[d.budget] || ''} · ${d.beds} bed${d.stairs === 'none' ? ' · no stairs' : ''}<br>${TL[d.timeline] || ''}`, { direction: 'top' })
          .on('click', () => setFocus(d.targetSuburb))
          .addTo(g);
      });
    } else {
      const bubbles = (list, key, colour, dx) => {
        const by = {};
        list.forEach((d) => { by[d[key]] = (by[d[key]] || 0) + 1; });
        Object.entries(by).forEach(([s, n]) => {
          const [la, lo] = SUBURBS[s];
          L.circleMarker([la, lo + dx], { radius: 6 + Math.sqrt(n) * 4, color: '#17271e', weight: 1.5, fillColor: colour, fillOpacity: 0.6 })
            .bindTooltip(`<b>${s}</b><br>${n} ${key === 'targetSuburb' ? 'want to buy here' : 'homes to sell here'}`, { direction: 'top' })
            .on('click', () => setFocus(s))
            .addTo(g);
        });
      };
      const off = mode === 'both' ? 0.004 : 0;
      if (showBuy) bubbles(buyers, 'targetSuburb', BUY, -off);
      if (showSell) bubbles(sellers, 'fromSuburb', SELL, off);
    }
    layerRef.current = g.addTo(m);
  }, [buyers, sellers, view, mode, showBuy, showSell, ready]);

  // focus ring
  useEffect(() => {
    const L = LRef.current, m = mapRef.current;
    if (!ready || !L || !m || !SUBURBS[focus]) return;
    ringRef.current?.remove();
    ringRef.current = L.circle(SUBURBS[focus].slice(0, 2), { radius: radius * 1000, color: '#121612', weight: 1.5, dashArray: '6 6', fill: false }).addTo(m);
  }, [focus, radius, ready]);

  const flyTo = (s) => { setFocus(s); mapRef.current?.flyTo(SUBURBS[s].slice(0, 2), 13, { duration: 0.8 }); };

  const top = (list, key) => {
    const by = {};
    list.forEach((d) => { by[d[key]] = (by[d[key]] || 0) + 1; });
    return Object.entries(by).sort((a, b) => b[1] - a[1]).slice(0, 8);
  };
  const topBuy = useMemo(() => top(buyers, 'targetSuburb'), [buyers]);
  const topSell = useMemo(() => top(sellers, 'fromSuburb'), [sellers]);

  const area = useMemo(() => {
    const c = SUBURBS[focus];
    if (!c) return null;
    const b = buyers.filter((d) => km([d.lat, d.lng], c) <= radius);
    const s = sellers.filter((d) => km([d.sellLat, d.sellLng], c) <= radius);
    const soon = (l) => l.filter((d) => ['asap', '6m'].includes(d.timeline)).length;
    const cnt = (l, k, v) => l.filter((d) => d[k] === v).length;
    return {
      b, s,
      bSoon: soon(b), sSoon: soon(s),
      budgets: BUDGETS.map((x) => ({ l: x.label, n: cnt(b, 'budget', x.id) })),
      beds: ['2', '3', '4'].map((x) => ({ l: `${x} bed`, n: cnt(b, 'beds', x) })),
      values: SELL_BANDS.map((x) => ({ l: x.label, n: s.filter((d) => sellBand(d.sellValue) === x.id).length })),
      sellBeds: ['3', '4', '5'].map((x) => ({ l: `${x} bed`, n: cnt(s, 'sellBeds', x) })),
      noStairs: cnt(b, 'stairs', 'none'),
      dbl: cnt(b, 'garage', '2'),
      mustSell: cnt(s, 'sellToBuy', 'yes'),
    };
  }, [buyers, sellers, focus, radius]);

  const pct = (x, n) => (n ? `${Math.round((x / n) * 100)}%` : '0%');
  const sel = (k, opts) => (
    <select value={f[k]} onChange={(e) => setF((p) => ({ ...p, [k]: e.target.value }))}>
      {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  );
  const net = area ? area.b.length - area.s.length : 0;

  return (
    <div className="dmd">
      <header className="d-top">
        <Link href="/" className="brand"><Mark /> Decant</Link>
        <div className="d-title">Downsizer demand map <span>Christchurch</span></div>
        <span className="d-pill">Sample data{live ? ` + ${live} from this browser` : ''}</span>
      </header>
      <div className="d-body">
        <aside className="d-side">
          <section>
            <h2>Show</h2>
            <div className="d-mode" role="group" aria-label="Which demand to show">
              {MODES.map(([k, l]) => (
                <button key={k} aria-pressed={mode === k} onClick={() => setMode(k)}>
                  {k !== 'both' && <i className="d-key" style={{ background: k === 'buy' ? BUY : SELL }} />}
                  {k === 'both' && <><i className="d-key" style={{ background: BUY }} /><i className="d-key" style={{ background: SELL }} /></>}
                  {l}
                </button>
              ))}
            </div>
            <div className="d-legend">
              <div className={showBuy ? '' : 'off'}><i className="d-key" style={{ background: BUY }} /><div><b>{buyers.length}</b> buying<span>Where downsizers want to live. For developers.</span></div></div>
              <div className={showSell ? '' : 'off'}><i className="d-key" style={{ background: SELL }} /><div><b>{sellers.length}</b> selling<span>Homes that will come up for sale. For the agency.</span></div></div>
            </div>
            <div className="d-toggle" role="group" aria-label="Map view">
              <button aria-pressed={view === 'pins'} onClick={() => setView('pins')}>Pins</button>
              <button aria-pressed={view === 'dots'} onClick={() => setView('dots')}>Suburb totals</button>
            </div>
          </section>

          <section>
            <h2>Filter downsizers</h2>
            <div className="d-filters">
              <label>Timing{sel('timeline', [[ALL, 'Any time'], ['soon', 'Within six months'], ...TIMELINES.map((t) => [t.id, t.label])])}</label>
              {showBuy && <label>Budget to buy{sel('budget', [[ALL, 'Any budget'], ...BUDGETS.map((b) => [b.id, b.label])])}</label>}
              {showBuy && <label>Bedrooms wanted{sel('beds', [[ALL, 'Any'], ['2', '2'], ['3', '3'], ['4', '4']])}</label>}
              {showBuy && <label>Stairs{sel('stairs', [[ALL, 'Any'], ['none', 'No stairs'], ['downstairs', 'Main bedroom down'], ['lift', 'Lift is fine']])}</label>}
              {showBuy && <label>Garaging{sel('garage', [[ALL, 'Any'], ['2', 'Double'], ['1', 'Single']])}</label>}
              {showSell && <label>Home value{sel('value', [[ALL, 'Any value'], ...SELL_BANDS.map((b) => [b.id, b.label])])}</label>}
              {showSell && <label>Home size{sel('sellBeds', [[ALL, 'Any'], ['3', '3 bed'], ['4', '4 bed'], ['5', '5+ bed']])}</label>}
            </div>
          </section>

          {showBuy && <TopList title="Where they want to buy" rows={topBuy} colour={BUY} focus={focus} onPick={flyTo} />}
          {showSell && <TopList title="Where homes will come up for sale" rows={topSell} colour={SELL} focus={focus} onPick={flyTo} />}
        </aside>

        <div className="d-map">
          <div ref={mapEl} className="d-leaflet" />
          {area && (
            <div className="d-brief">
              <div className="d-brief-h">
                <div>
                  <span className="label">{mode === 'buy' ? 'Developer briefing' : mode === 'sell' ? 'Agency briefing' : 'Area briefing'}</span>
                  <h3>Within {radius} km of {focus}</h3>
                </div>
                <div className="d-rad">
                  {[2, 3, 5].map((r) => <button key={r} aria-pressed={radius === r} onClick={() => setRadius(r)}>{r} km</button>)}
                </div>
              </div>
              <div className="d-kpis">
                {showBuy && <div><b style={{ color: BUY }}>{area.b.length}</b><span>want to buy here</span></div>}
                {showBuy && <div><b>{area.bSoon}</b><span>buyers ready within six months</span></div>}
                {showSell && <div><b style={{ color: SELL }}>{area.s.length}</b><span>homes to sell here</span></div>}
                {showSell && <div><b>{area.sSoon}</b><span>listings likely within six months</span></div>}
              </div>
              {mode === 'both' && (
                <p className="d-net">
                  {net > 0 ? <><b>{net} more buyers than homes coming up.</b> A gap a developer could fill.</>
                    : net < 0 ? <><b>{-net} more homes than buyers.</b> Good for listings, less so for new builds.</>
                    : <><b>Buyers and sellers are even here.</b></>}
                </p>
              )}
              <div className="d-cols">
                {showBuy && <div><h4>Budget to buy</h4><Bar parts={area.budgets} colour={BUY} />{mode === 'buy' && <p className="d-mini">{pct(area.noStairs, area.b.length)} want no stairs · {pct(area.dbl, area.b.length)} want a double garage</p>}</div>}
                {showSell && <div><h4>Value of homes to sell</h4><Bar parts={area.values} colour={SELL} />{mode === 'sell' && <p className="d-mini">{pct(area.mustSell, area.s.length)} need to sell before they buy</p>}</div>}
                {mode === 'buy' && <div><h4>Bedrooms wanted</h4><Bar parts={area.beds} colour={BUY} /></div>}
                {mode === 'sell' && <div><h4>Size of homes to sell</h4><Bar parts={area.sellBeds} colour={SELL} /></div>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

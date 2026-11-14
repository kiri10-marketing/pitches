'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import 'leaflet/dist/leaflet.css';
import { Mark } from '../../components/Chrome';
import { SUBURBS, BUDGETS, TIMELINES, seedDemand, loadResponses, km } from '../../lib/data';
import './demand.css';

const ALL = 'all';

function Bar({ parts }) {
  const total = parts.reduce((a, p) => a + p.n, 0) || 1;
  return (
    <div className="dbar">
      {parts.map((p) => (
        <div key={p.l} className="dbar-row">
          <span>{p.l}</span>
          <div className="dbar-track"><i style={{ width: `${(p.n / total) * 100}%` }} /></div>
          <b>{Math.round((p.n / total) * 100)}%</b>
        </div>
      ))}
    </div>
  );
}

export default function Demand() {
  const mapEl = useRef(null);
  const mapRef = useRef(null);
  const heatRef = useRef(null);
  const dotsRef = useRef(null);
  const LRef = useRef(null);
  const [data, setData] = useState([]);
  const [live, setLive] = useState(0);
  const [f, setF] = useState({ budget: ALL, timeline: ALL, beds: ALL, stairs: ALL, garage: ALL });
  const [view, setView] = useState('heat');
  const [focus, setFocus] = useState('Merivale');
  const [radius, setRadius] = useState(3);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mine = loadResponses();
    setLive(mine.length);
    setData([...seedDemand(), ...mine]);
  }, []);

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

  // map setup
  useEffect(() => {
    let dead = false;
    (async () => {
      const L = (await import('leaflet')).default;
      window.L = L;
      await import('leaflet.heat');
      if (dead || mapRef.current) return;
      LRef.current = L;
      const m = L.map(mapEl.current, { zoomControl: false, attributionControl: true, scrollWheelZoom: true }).setView([-43.535, 172.66], 12);
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
    heatRef.current?.remove();
    dotsRef.current?.remove();
    if (view === 'heat') {
      heatRef.current = L.heatLayer(rows.map((d) => [d.lat, d.lng, 0.7]), {
        radius: 34, blur: 28, maxZoom: 14, minOpacity: 0.25,
        gradient: { 0.2: '#d4e9d9', 0.45: '#7fc39a', 0.7: '#2f8a57', 0.9: '#1b5a37', 1: '#0f3a22' },
      }).addTo(m);
    } else {
      const g = L.layerGroup();
      const by = {};
      rows.forEach((d) => { by[d.targetSuburb] = (by[d.targetSuburb] || 0) + 1; });
      Object.entries(by).forEach(([s, n]) => {
        const [la, lo] = SUBURBS[s];
        L.circleMarker([la, lo], { radius: 6 + Math.sqrt(n) * 4, color: '#17271e', weight: 1.5, fillColor: '#2f6b4a', fillOpacity: 0.55 })
          .bindTooltip(`<b>${s}</b><br>${n} downsizers`, { direction: 'top' })
          .on('click', () => setFocus(s))
          .addTo(g);
      });
      dotsRef.current = g.addTo(m);
    }
  }, [rows, view, ready]);

  // focus ring
  const ringRef = useRef(null);
  useEffect(() => {
    const L = LRef.current, m = mapRef.current;
    if (!ready || !L || !m || !SUBURBS[focus]) return;
    ringRef.current?.remove();
    ringRef.current = L.circle(SUBURBS[focus].slice(0, 2), { radius: radius * 1000, color: '#121612', weight: 1.5, dashArray: '6 6', fill: false }).addTo(m);
  }, [focus, radius, ready]);

  const flyTo = (s) => { setFocus(s); mapRef.current?.flyTo(SUBURBS[s].slice(0, 2), 13, { duration: 0.8 }); };

  const top = useMemo(() => {
    const by = {};
    rows.forEach((d) => { by[d.targetSuburb] = (by[d.targetSuburb] || 0) + 1; });
    return Object.entries(by).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [rows]);

  const area = useMemo(() => {
    const c = SUBURBS[focus];
    if (!c) return null;
    const near = rows.filter((d) => km([d.lat, d.lng], c) <= radius);
    const cnt = (k, v) => near.filter((d) => d[k] === v).length;
    return {
      n: near.length,
      soon: near.filter((d) => ['asap', '6m'].includes(d.timeline)).length,
      budgets: BUDGETS.map((b) => ({ l: b.label, n: cnt('budget', b.id) })),
      beds: ['2', '3', '4'].map((b) => ({ l: `${b} bed`, n: cnt('beds', b) })),
      noStairs: cnt('stairs', 'none'),
      dbl: cnt('garage', '2'),
      pets: cnt('pets', 'yes'),
      lockup: near.filter((d) => d.lockup).length,
    };
  }, [rows, focus, radius]);

  const pct = (x) => (area?.n ? `${Math.round((x / area.n) * 100)}%` : '0%');
  const sel = (k, opts) => (
    <select value={f[k]} onChange={(e) => setF((p) => ({ ...p, [k]: e.target.value }))}>
      {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  );

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
            <h2>Filter downsizers</h2>
            <div className="d-filters">
              <label>Budget{sel('budget', [[ALL, 'Any budget'], ...BUDGETS.map((b) => [b.id, b.label])])}</label>
              <label>Timing{sel('timeline', [[ALL, 'Any time'], ['soon', 'Within six months'], ...TIMELINES.map((t) => [t.id, t.label])])}</label>
              <label>Bedrooms{sel('beds', [[ALL, 'Any'], ['2', '2'], ['3', '3'], ['4', '4']])}</label>
              <label>Stairs{sel('stairs', [[ALL, 'Any'], ['none', 'No stairs'], ['downstairs', 'Main bedroom down'], ['lift', 'Lift is fine']])}</label>
              <label>Garaging{sel('garage', [[ALL, 'Any'], ['2', 'Double'], ['1', 'Single']])}</label>
            </div>
            <div className="d-big"><b>{rows.length}</b><span>downsizers match these filters</span></div>
            <div className="d-toggle" role="group" aria-label="Map view">
              <button aria-pressed={view === 'heat'} onClick={() => setView('heat')}>Heat map</button>
              <button aria-pressed={view === 'dots'} onClick={() => setView('dots')}>By suburb</button>
            </div>
          </section>

          <section>
            <h2>Where they want to live</h2>
            <ol className="d-top8">
              {top.map(([s, n]) => (
                <li key={s}>
                  <button onClick={() => flyTo(s)} aria-pressed={focus === s}>
                    <span>{s}</span>
                    <i style={{ width: `${(n / (top[0]?.[1] || 1)) * 100}%` }} />
                    <b>{n}</b>
                  </button>
                </li>
              ))}
            </ol>
          </section>
        </aside>

        <div className="d-map">
          <div ref={mapEl} className="d-leaflet" />
          {area && (
            <div className="d-brief">
              <div className="d-brief-h">
                <div>
                  <span className="label">Developer briefing</span>
                  <h3>Within {radius} km of {focus}</h3>
                </div>
                <div className="d-rad">
                  {[2, 3, 5].map((r) => <button key={r} aria-pressed={radius === r} onClick={() => setRadius(r)}>{r} km</button>)}
                </div>
              </div>
              <div className="d-kpis">
                <div><b>{area.n}</b><span>downsizers</span></div>
                <div><b>{area.soon}</b><span>ready within six months</span></div>
                <div><b>{pct(area.noStairs)}</b><span>want no stairs</span></div>
                <div><b>{pct(area.dbl)}</b><span>want a double garage</span></div>
              </div>
              <div className="d-cols">
                <div><h4>Budget</h4><Bar parts={area.budgets} /></div>
                <div><h4>Bedrooms</h4><Bar parts={area.beds} /><p className="d-mini">{pct(area.lockup)} want lock up and leave · {pct(area.pets)} have pets</p></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Shared concept data: Christchurch suburbs, sample homes, the matching engine
// and seeded demand. Everything here is illustrative sample data.

export const SUBURBS = {
  Fendalton: [-43.5165, 172.5955, 10],
  Merivale: [-43.5135, 172.6215, 10],
  Strowan: [-43.507, 172.613, 8],
  'St Albans': [-43.5085, 172.6365, 8],
  Bryndwr: [-43.5035, 172.5885, 6],
  Papanui: [-43.4955, 172.608, 7],
  Ilam: [-43.5225, 172.576, 7],
  Riccarton: [-43.531, 172.596, 4],
  Burnside: [-43.5025, 172.57, 6],
  Avonhead: [-43.5135, 172.555, 4],
  Cashmere: [-43.572, 172.625, 9],
  Huntsbury: [-43.568, 172.64, 5],
  Beckenham: [-43.559, 172.637, 5],
  Opawa: [-43.552, 172.66, 4],
  'St Martins': [-43.556, 172.651, 4],
  Sumner: [-43.569, 172.76, 7],
  Redcliffs: [-43.564, 172.739, 5],
  'Mt Pleasant': [-43.564, 172.718, 4],
  Halswell: [-43.585, 172.57, 4],
  'Hoon Hay': [-43.56, 172.602, 2],
  Addington: [-43.542, 172.618, 1],
  'Central City': [-43.532, 172.636, 3],
  Northwood: [-43.46, 172.62, 3],
  Casebrook: [-43.474, 172.598, 2],
  Harewood: [-43.48, 172.56, 2],
  Mairehau: [-43.497, 172.645, 2],
  Shirley: [-43.505, 172.66, 2],
  Parklands: [-43.474, 172.702, 1],
  'New Brighton': [-43.507, 172.727, 1],
  Wigram: [-43.553, 172.556, 1],
  Prebbleton: [-43.58, 172.513, 1],
  Rolleston: [-43.59, 172.38, 1],
  Lincoln: [-43.64, 172.485, 1],
  Rangiora: [-43.304, 172.596, 1],
  Kaiapoi: [-43.38, 172.655, 1],
};
export const SUBURB_NAMES = Object.keys(SUBURBS).sort();

export const BUDGETS = [
  { id: 'b1', label: '$700k to $900k', min: 700, max: 900 },
  { id: 'b2', label: '$900k to $1.2m', min: 900, max: 1200 },
  { id: 'b3', label: '$1.2m to $1.5m', min: 1200, max: 1500 },
  { id: 'b4', label: '$1.5m to $2m', min: 1500, max: 2000 },
  { id: 'b5', label: '$2m and above', min: 2000, max: 3200 },
];
export const TIMELINES = [
  { id: 'asap', label: 'As soon as possible' },
  { id: '6m', label: 'Within six months' },
  { id: '12m', label: 'Within a year' },
  { id: 'explore', label: 'Just exploring' },
];

// Sample homes (illustrative, not real listings)
export const HOMES = [
  { id: 'h1', img: '/img/home.jpg', title: 'Single-level brick and cedar', suburb: 'Fendalton', kind: 'new', kindLabel: 'New build', beds: 3, baths: 2, garage: 2, garden: 'small', stairs: 'none', price: 1650, lockup: true, pets: true },
  { id: 'h2', img: '/img/townhouse.jpg', title: 'Courtyard townhouse', suburb: 'Merivale', kind: 'offplan', kindLabel: 'Off the plan', beds: 3, baths: 2, garage: 1, garden: 'courtyard', stairs: 'downstairs', price: 1290, lockup: true, pets: true },
  { id: 'h3', img: '/img/offplan.jpg', title: 'Hillside pavilion with views', suburb: 'Cashmere', kind: 'offplan', kindLabel: 'Off the plan', beds: 3, baths: 2, garage: 2, garden: 'small', stairs: 'none', price: 1890, lockup: true, pets: true },
  { id: 'h4', img: '/img/strowan.jpg', title: 'Pale brick, double garage', suburb: 'Strowan', kind: 'offmarket', kindLabel: 'Off-market', beds: 3, baths: 2, garage: 2, garden: 'small', stairs: 'none', price: 1450, lockup: false, pets: true },
  { id: 'h5', img: '/img/living.jpg', title: 'Garden apartment, lift access', suburb: 'St Albans', kind: 'new', kindLabel: 'New build', beds: 2, baths: 2, garage: 1, garden: 'courtyard', stairs: 'lift', price: 1080, lockup: true, pets: false },
  { id: 'h6', img: '/img/home.jpg', title: 'Low-maintenance family home', suburb: 'Bryndwr', kind: 'offmarket', kindLabel: 'Off-market', beds: 4, baths: 2, garage: 2, garden: 'potter', stairs: 'none', price: 1350, lockup: false, pets: true },
  { id: 'h7', img: '/img/offplan.jpg', title: 'Seaside single level', suburb: 'Redcliffs', kind: 'new', kindLabel: 'New build', beds: 3, baths: 2, garage: 2, garden: 'small', stairs: 'none', price: 1580, lockup: true, pets: true },
  { id: 'h8', img: '/img/townhouse.jpg', title: 'Terrace with downstairs main', suburb: 'Papanui', kind: 'offplan', kindLabel: 'Off the plan', beds: 3, baths: 2, garage: 1, garden: 'courtyard', stairs: 'downstairs', price: 980, lockup: true, pets: true },
  { id: 'h9', img: '/img/strowan.jpg', title: 'Quiet street, north-facing', suburb: 'Ilam', kind: 'offmarket', kindLabel: 'Off-market', beds: 3, baths: 2, garage: 2, garden: 'small', stairs: 'none', price: 1240, lockup: false, pets: true },
];

export const fmtPrice = (k) => (k >= 1000 ? `$${(k / 1000).toFixed(k % 100 === 0 ? 1 : 2).replace(/\.?0+$/, '')}m` : `$${k}k`);

const rad = (d) => (d * Math.PI) / 180;
export function km(a, b) {
  const [la1, lo1] = a, [la2, lo2] = b;
  const R = 6371;
  const x = Math.sin(rad(la2 - la1) / 2) ** 2 + Math.cos(rad(la1)) * Math.cos(rad(la2)) * Math.sin(rad(lo2 - lo1) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

// The matching engine (concept). Scores each home against the brief and
// explains why, in plain words. A production version would use an AI model to
// read free-text answers too; the scoring shape stays the same.
export function match(brief, homes = HOMES) {
  const target = SUBURBS[brief.targetSuburb || brief.suburb] || SUBURBS.Merivale;
  const budget = BUDGETS.find((b) => b.id === brief.budget) || BUDGETS[2];
  const radius = brief.where === 'same' ? 3 : brief.where === 'near' ? 6 : 12;
  return homes
    .map((h) => {
      let score = 100;
      const why = [];
      const d = km(target, SUBURBS[h.suburb]);
      if (d <= radius) why.push(d < 1.5 ? `In ${h.suburb}` : `${d.toFixed(1)} km from ${brief.targetSuburb || brief.suburb || 'you'}`);
      score -= Math.max(0, d - radius) * 6 + d * 1.5;
      if (h.price >= budget.min && h.price <= budget.max) why.push('Within your budget');
      else score -= Math.min(40, Math.abs(h.price - (h.price > budget.max ? budget.max : budget.min)) / 15);
      if (brief.beds) {
        if (h.beds === Number(brief.beds)) why.push(`${h.beds} bedrooms`);
        else score -= Math.abs(h.beds - Number(brief.beds)) * 12;
      }
      if (brief.garage && h.garage >= Number(brief.garage)) why.push(h.garage === 2 ? 'Double garage' : 'Garage');
      else if (brief.garage) score -= 15;
      if (brief.stairs === 'none') { if (h.stairs === 'none') why.push('No stairs'); else score -= 25; }
      if (brief.stairs === 'downstairs') { if (h.stairs !== 'lift') why.push('Main bedroom downstairs'); }
      if (brief.pets === 'yes') { if (h.pets) why.push('Pet friendly'); else score -= 30; }
      if (brief.lockup && h.lockup) why.push('Lock up and leave');
      if (brief.garden && brief.garden === h.garden) why.push({ courtyard: 'Courtyard garden', small: 'Small, easy garden', potter: 'Room to potter' }[h.garden]);
      if (h.kind === 'offmarket') why.push('Not on public sale');
      return { ...h, score: Math.max(0, Math.min(99, Math.round(score))), why: why.slice(0, 4) };
    })
    .sort((a, b) => b.score - a.score);
}

// Seeded sample demand so the map has something to show.
function rng(seed) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}
export function seedDemand(n = 320) {
  const r = rng(42);
  const names = Object.keys(SUBURBS);
  const total = names.reduce((a, k) => a + SUBURBS[k][2], 0);
  const pick = () => {
    let x = r() * total;
    for (const k of names) { x -= SUBURBS[k][2]; if (x <= 0) return k; }
    return names[0];
  };
  const pickW = (arr, w) => { let x = r() * w.reduce((a, b) => a + b, 0); for (let i = 0; i < arr.length; i++) { x -= w[i]; if (x <= 0) return arr[i]; } return arr[0]; };
  const out = [];
  for (let i = 0; i < n; i++) {
    const s = pick();
    const [la, lo, w] = SUBURBS[s];
    const rich = w >= 7;
    out.push({
      id: `s${i}`,
      sample: true,
      targetSuburb: s,
      lat: la + (r() - 0.5) * 0.014,
      lng: lo + (r() - 0.5) * 0.02,
      budget: pickW(['b1', 'b2', 'b3', 'b4', 'b5'], rich ? [1, 3, 5, 4, 2] : [4, 5, 3, 1, 0.3]),
      timeline: pickW(['asap', '6m', '12m', 'explore'], [1, 2.4, 3, 3.2]),
      beds: pickW(['2', '3', '4'], [2.2, 5.5, 1.4]),
      garage: pickW(['1', '2'], [3, 5]),
      stairs: pickW(['none', 'downstairs', 'lift'], [5.5, 3.5, 1]),
      pets: r() < 0.38 ? 'yes' : 'no',
      lockup: r() < 0.62,
      sellToBuy: pickW(['yes', 'no', 'unsure'], [7, 1.6, 1.4]),
    });
  }
  return out;
}

export const STORE_KEY = 'decant-quiz-responses';
export function loadResponses() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || '[]'); } catch { return []; }
}
export function saveResponse(r) {
  try { const all = loadResponses(); all.push(r); localStorage.setItem(STORE_KEY, JSON.stringify(all)); } catch {}
}

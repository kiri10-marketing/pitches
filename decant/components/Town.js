'use client';
// Isometric line-art neighbourhood. Everything is drawn from simple boxes so
// the scene can change state as the hero steps advance.

const S = 140; // px per unit
const C = Math.cos(Math.PI / 6);
const OX = 200;
const OY = 196;

const P = (x, y, z = 0) => [(x - y) * C * S + OX, (x + y) * 0.5 * S - z * S + OY];
const pts = (...ps) => ps.map(([x, y, z]) => P(x, y, z).map((n) => n.toFixed(1)).join(',')).join(' ');

const INK = 'var(--ink)';
const SW = 1.6;

function Poly({ p, fill = '#fff', className, ...rest }) {
  return <polygon points={p} fill={fill} stroke={INK} strokeWidth={SW} strokeLinejoin="round" className={className} {...rest} />;
}

function Box({ x, y, z = 0, w, d, h, top = '#fff', left = '#fff', right = 'url(#shade)', topClass }) {
  const z1 = z + h;
  return (
    <g>
      <Poly fill={left} p={pts([x, y + d, z], [x + w, y + d, z], [x + w, y + d, z1], [x, y + d, z1])} />
      <Poly fill={right} p={pts([x + w, y, z], [x + w, y + d, z], [x + w, y + d, z1], [x + w, y, z1])} />
      <Poly fill={top} className={topClass} p={pts([x, y, z1], [x + w, y, z1], [x + w, y + d, z1], [x, y + d, z1])} />
    </g>
  );
}

// window on the +y face (left-facing wall)
function WinL({ x, y, z, w, h, fill = INK }) {
  return <polygon points={pts([x, y, z], [x + w, y, z], [x + w, y, z + h], [x, y, z + h])} fill={fill} stroke={INK} strokeWidth={1} />;
}
// window on the +x face (right-facing wall)
function WinR({ x, y, z, w, h, fill = '#fff' }) {
  return <polygon points={pts([x, y, z], [x, y + w, z], [x, y + w, z + h], [x, y, z + h])} fill={fill} stroke={INK} strokeWidth={1} />;
}

// Gable roof with ridge running along x
function Gable({ x, y, z, w, d, rh, roof = INK, roofClass }) {
  const m = y + d / 2;
  return (
    <g>
      <Poly fill={roof} className={roofClass} p={pts([x, y, z], [x + w, y, z], [x + w, m, z + rh], [x, m, z + rh])} />
      <Poly fill="#fff" p={pts([x + w, y, z], [x + w, y + d, z], [x + w, m, z + rh])} />
      <Poly fill={roof} className={roofClass} p={pts([x, y + d, z], [x + w, y + d, z], [x + w, m, z + rh], [x, m, z + rh])} />
    </g>
  );
}

function Tree({ x, y, z = 0.06, k = 1 }) {
  const [sx, sy] = P(x, y, z);
  const r = 11 * k;
  return (
    <g>
      <line x1={sx} y1={sy} x2={sx} y2={sy - 20 * k} stroke={INK} strokeWidth={SW} />
      <circle cx={sx - r * 0.7} cy={sy - 22 * k} r={r} fill="#fff" stroke={INK} strokeWidth={SW} />
      <circle cx={sx + r * 0.7} cy={sy - 22 * k} r={r} fill="#fff" stroke={INK} strokeWidth={SW} />
      <circle cx={sx} cy={sy - 33 * k} r={r * 1.05} fill="#fff" stroke={INK} strokeWidth={SW} />
    </g>
  );
}

function Tile({ x, y }) {
  const t = 0.06;
  const i = 0.1;
  return (
    <g>
      <Poly fill="#fff" p={pts([x, y + 1, 0], [x + 1, y + 1, 0], [x + 1, y + 1, t], [x, y + 1, t])} />
      <Poly fill="#fff" p={pts([x + 1, y, 0], [x + 1, y + 1, 0], [x + 1, y + 1, t], [x + 1, y, t])} />
      <Poly fill="#fff" p={pts([x, y, t], [x + 1, y, t], [x + 1, y + 1, t], [x, y + 1, t])} />
      <polygon
        points={pts([x + i, y + i, t], [x + 1 - i, y + i, t], [x + 1 - i, y + 1 - i, t], [x + i, y + 1 - i, t])}
        fill="url(#hatch)"
        stroke={INK}
        strokeWidth={1}
      />
    </g>
  );
}

// tile origins, zig-zag along the screen horizontal
const STEP = 1.2;
const T = Array.from({ length: 7 }, (_, i) =>
  i % 2 === 0 ? [i * STEP * 0.5, -i * STEP * 0.5] : [i * STEP * 0.5 + STEP * 0.5 + 0.0, -i * STEP * 0.5 + STEP * 0.5]
);

function Person({ cx, cy, hair = 'short', dark }) {
  // simple face inside a pin
  return (
    <g>
      <circle cx={cx} cy={cy + 3} r={7.5} fill="#fff" stroke={INK} strokeWidth={1.4} />
      {hair === 'short' && <path d={`M${cx - 7.5} ${cy + 1} q7.5 -11 15 0`} fill={INK} />}
      {hair === 'bun' && (
        <>
          <path d={`M${cx - 7.5} ${cy + 2} q7.5 -12 15 0`} fill={INK} />
          <circle cx={cx} cy={cy - 7} r={3.5} fill={INK} />
        </>
      )}
      {hair === 'grey' && <path d={`M${cx - 8} ${cy + 4} q0 -12 8 -11 q8 -1 8 11 q-3 -6 -8 -6 q-5 0 -8 6z`} fill="#fff" stroke={INK} strokeWidth={1.2} />}
      <circle cx={cx - 2.6} cy={cy + 3.5} r={0.9} fill={INK} />
      <circle cx={cx + 2.6} cy={cy + 3.5} r={0.9} fill={INK} />
      <path d={`M${cx - 2.5} ${cy + 6.5} q2.5 2 5 0`} fill="none" stroke={INK} strokeWidth={1} />
      <path d={`M${cx - 11} ${cy + 19} q11 -12 22 0`} fill={dark ? INK : '#fff'} stroke={INK} strokeWidth={1.4} />
    </g>
  );
}

function Pin({ x, y, children, stem = 46, className = '', style }) {
  return (
    <g className={className} style={{ ...style, transform: `translate(${x}px, ${y}px)` }}>
      <line x1={0} y1={-6} x2={0} y2={-stem} stroke={INK} strokeWidth={1.4} strokeDasharray="2 4" />
      <circle cx={0} cy={-4} r={3} fill={INK} />
      <g transform={`translate(0 ${-stem - 26})`}>
        <path d="M0 26 L-9 17 A20 20 0 1 1 9 17 Z" fill="#fff" stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
        <clipPath id={`pc-${x | 0}`}>
          <circle cx={0} cy={0} r={17} />
        </clipPath>
        <g clipPath={`url(#pc-${x | 0})`}>{children}</g>
      </g>
    </g>
  );
}

function Chip({ x, y, text, show, align = 'middle', strong }) {
  const w = text.length * 12.4 + 40;
  const x0 = align === 'middle' ? x - w / 2 : align === 'end' ? x - w : x;
  return (
    <g className={`chip ${show ? 'on' : ''}`}>
      <rect x={x0} y={y - 24} width={w} height={46} fill={strong ? 'var(--green)' : '#fff'} stroke={INK} strokeWidth={1.4} />
      <text x={x0 + w / 2} y={y + 6} textAnchor="middle" fontSize="21.5" fontWeight="600" fill={strong ? '#fff' : INK}>
        {text}
      </text>
    </g>
  );
}

// ---- buildings ----
function FamilyHome({ o, sold }) {
  const [x, y] = o;
  const bx = x + 0.2, by = y + 0.22, w = 0.62, d = 0.5, h = 0.52;
  return (
    <g>
      <Box x={bx} y={by} z={0.06} w={w} d={d} h={h} />
      {/* windows, two storeys */}
      {[0.12, 0.38].map((zz) => [0.06, 0.24, 0.42].map((xx) => <WinL key={zz + '' + xx} x={bx + xx} y={by + d} z={0.06 + zz} w={0.12} h={0.11} />))}
      <WinR x={bx + w} y={by + 0.12} z={0.24} w={0.12} h={0.12} />
      <WinR x={bx + w} y={by + 0.3} z={0.24} w={0.12} h={0.12} />
      <Gable x={bx - 0.03} y={by - 0.03} z={0.06 + h} w={w + 0.06} d={d + 0.06} rh={0.3} />
      {/* chimney */}
      <Box x={bx + 0.1} y={by + 0.08} z={0.06 + h + 0.12} w={0.08} d={0.08} h={0.26} right="#fff" />
      {/* quiet sale: a small lock badge, never a signboard */}
      <g className={`sign ${sold ? 'on' : ''}`}>
        {(() => {
          const [sx, sy] = P(bx + w, by + d * 0.5, 0.06 + h * 0.55);
          return (
            <g transform={`translate(${sx + 26} ${sy})`}>
              <rect x={-17} y={-17} width={34} height={34} fill="var(--green)" stroke={INK} strokeWidth={1.4} />
              <rect x={-7} y={-3} width={14} height={11} fill="#fff" />
              <path d="M-4.5 -3 v-4 a4.5 4.5 0 0 1 9 0 v4" stroke="#fff" strokeWidth={2} fill="none" />
            </g>
          );
        })()}
      </g>
    </g>
  );
}

function SingleLevel({ o, variant = 0, matched, chosen }) {
  const [x, y] = o;
  const roofCls = `roof ${matched ? 'match' : ''} ${chosen ? 'chosen' : ''}`;
  if (variant === 0) {
    // long low gable + attached garage
    const bx = x + 0.16, by = y + 0.3, w = 0.68, d = 0.4, h = 0.2;
    return (
      <g>
        <Box x={bx} y={by} z={0.06} w={w} d={d} h={h} />
        <WinL x={bx + 0.08} y={by + d} z={0.1} w={0.22} h={0.11} />
        <WinL x={bx + 0.4} y={by + d} z={0.1} w={0.1} h={0.11} fill="#fff" />
        <WinR x={bx + w} y={by + 0.1} z={0.1} w={0.2} h={0.1} />
        <Gable x={bx - 0.03} y={by - 0.03} z={0.06 + h} w={w + 0.06} d={d + 0.06} rh={0.18} roofClass={roofCls} roof="#fff" />
      </g>
    );
  }
  if (variant === 1) {
    // flat-roof modern, L shape
    const bx = x + 0.18, by = y + 0.2;
    return (
      <g>
        <Box x={bx} y={by} z={0.06} w={0.36} d={0.6} h={0.22} topClass={roofCls} />
        <Box x={bx + 0.36} y={by + 0.3} z={0.06} w={0.3} d={0.3} h={0.17} topClass={roofCls} />
        <WinL x={bx + 0.06} y={by + 0.6} z={0.1} w={0.24} h={0.12} />
        <WinL x={bx + 0.42} y={by + 0.6} z={0.1} w={0.18} h={0.09} fill="#fff" />
        <WinR x={bx + 0.66} y={by + 0.36} z={0.1} w={0.18} h={0.08} />
      </g>
    );
  }
  // variant 2: hip-ish pavilion
  const bx = x + 0.22, by = y + 0.22, w = 0.56, d = 0.56, h = 0.2;
  const z = 0.06 + h;
  const r = 0.16;
  const cxx = bx + w / 2, cyy = by + d / 2;
  return (
    <g>
      <Box x={bx} y={by} z={0.06} w={w} d={d} h={h} />
      <WinL x={bx + 0.08} y={by + d} z={0.1} w={0.16} h={0.11} />
      <WinL x={bx + 0.32} y={by + d} z={0.1} w={0.16} h={0.11} />
      <WinR x={bx + w} y={by + 0.2} z={0.1} w={0.18} h={0.1} />
      <Poly className={roofCls} fill="#fff" p={pts([bx - 0.03, by + d + 0.03, z], [bx + w + 0.03, by + d + 0.03, z], [cxx + 0.08, cyy, z + r], [cxx - 0.08, cyy, z + r])} />
      <Poly className={roofCls} fill="#fff" p={pts([bx + w + 0.03, by - 0.03, z], [bx + w + 0.03, by + d + 0.03, z], [cxx + 0.08, cyy, z + r])} />
    </g>
  );
}

function Park({ o }) {
  const [x, y] = o;
  const [cx, cy] = P(x + 0.5, y + 0.5, 0.06);
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={52} ry={26} fill="#fff" stroke={INK} strokeWidth={SW} />
      <ellipse cx={cx} cy={cy - 6} rx={52} ry={26} fill="#fff" stroke={INK} strokeWidth={SW} />
      <ellipse cx={cx} cy={cy - 6} rx={36} ry={18} fill="url(#water)" stroke={INK} strokeWidth={1.2} />
      <rect x={cx - 5} y={cy - 32} width={10} height={24} fill="#fff" stroke={INK} strokeWidth={SW} />
      <ellipse cx={cx} cy={cy - 32} rx={14} ry={6} fill="#fff" stroke={INK} strokeWidth={SW} />
      {/* bench */}
      {(() => {
        const [bx, by] = P(x + 0.18, y + 0.78, 0.06);
        return <path d={`M${bx} ${by} l26 -15 M${bx} ${by - 9} l26 -15 M${bx + 3} ${by} v6 M${bx + 23} ${by - 13} v6`} stroke={INK} strokeWidth={1.6} fill="none" />;
      })()}
    </g>
  );
}

function Cafe({ o }) {
  const [x, y] = o;
  const bx = x + 0.18, by = y + 0.22, w = 0.62, d = 0.52, h = 0.36;
  const [ax, ay] = P(bx, by + d, 0.06 + 0.2);
  const [bx2, by2] = P(bx + w, by + d, 0.06 + 0.2);
  return (
    <g>
      <Box x={bx} y={by} z={0.06} w={w} d={d} h={h} top={INK} />
      <WinL x={bx + 0.06} y={by + d} z={0.08} w={0.5} h={0.14} fill="#fff" />
      {/* striped awning */}
      <g>
        <polygon points={`${ax},${ay} ${bx2},${by2} ${bx2 - 10},${by2 + 16} ${ax - 10},${ay + 16}`} fill="url(#stripe)" stroke={INK} strokeWidth={1.4} />
      </g>
      <WinR x={bx + w} y={by + 0.1} z={0.12} w={0.32} h={0.14} />
      <text {...(() => { const [tx, ty] = P(bx + 0.24, by + d, 0.3); return { x: tx, y: ty }; })()} fontSize="11" fontWeight="700" textAnchor="middle" fill={INK} letterSpacing="1.5" transform="">
        CAFÉ
      </text>
    </g>
  );
}

function Clinic({ o }) {
  const [x, y] = o;
  const bx = x + 0.2, by = y + 0.2, w = 0.6, d = 0.56, h = 0.46;
  const [cx, cy] = P(bx + w, by + 0.28, 0.06 + 0.3);
  return (
    <g>
      <Box x={bx} y={by} z={0.06} w={w} d={d} h={h} />
      {[0.06, 0.22, 0.38].map((xx) => <WinL key={xx} x={bx + xx} y={by + d} z={0.12} w={0.12} h={0.22} />)}
      <Box x={bx + 0.1} y={by + 0.1} z={0.06 + h} w={0.3} d={0.3} h={0.06} />
      <g transform={`translate(${cx} ${cy})`}>
        <rect x={-14} y={-14} width={28} height={28} fill="#fff" stroke={INK} strokeWidth={1.4} />
        <path d="M-3 -9 h6 v6 h6 v6 h-6 v6 h-6 v-6 h-6 v-6 h6z" fill="var(--green)" />
      </g>
    </g>
  );
}

function Van({ x, y, flip }) {
  return (
    <g style={{ transform: `translate(${x}px, ${y}px) scaleX(${flip ? -1 : 1})` }}>
      <g transform="translate(-34 -38)">
        <rect x="0" y="6" width="46" height="26" fill="#fff" stroke={INK} strokeWidth={1.6} />
        <path d="M46 14 h12 l10 10 v8 h-22z" fill="#fff" stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
        <path d="M50 17 h7 l6 7 h-13z" fill={INK} />
        <rect x="6" y="12" width="34" height="9" fill="var(--green)" />
        <circle cx="13" cy="33" r="6" fill={INK} />
        <circle cx="54" cy="33" r="6" fill={INK} />
        <circle cx="13" cy="33" r="2" fill="#fff" />
        <circle cx="54" cy="33" r="2" fill="#fff" />
      </g>
    </g>
  );
}

// road runs along the screen horizontal in front of the tiles
const ROAD = 3.5; // x+y of road centre line
const roadPt = (sx) => {
  // screen x -> point on road centre line
  const xmy = (sx - OX) / (C * S);
  const x = (ROAD + xmy) / 2;
  const y = (ROAD - xmy) / 2;
  return P(x, y, 0);
};
const tileFront = (i) => P(T[i][0] + 1, T[i][1] + 1, 0);
const tileCentre = (i) => P(T[i][0] + 0.5, T[i][1] + 0.5, 0.06);

export const VIEW = { w: 1270, h: 530 };

export default function Town({ step = 0, vanT = 0 }) {
  const HOME = 1, CHOSEN = 5;
  const matches = [3, 5, 6];
  const matched = step >= 1;
  const secured = step >= 2;
  const moved = step >= 4;

  // road endpoints
  const [lx] = P(T[0][0], T[0][1] + 1, 0);
  const [rx] = P(T[6][0] + 1, T[6][1], 0);
  const L = roadPt(lx - 60);
  const R = roadPt(rx + 60);
  const halfW = 0.2;
  const band = (o) => {
    const a = (sx) => {
      const xmy = (sx - OX) / (C * S);
      return P((ROAD + o + xmy) / 2, (ROAD + o - xmy) / 2, 0);
    };
    return [a(lx - 60), a(rx + 60)];
  };
  const [b1a, b1b] = band(-halfW);
  const [b2a, b2b] = band(halfW);

  // van travels from front of home tile to front of chosen tile
  const startX = tileFront(HOME)[0] - 0;
  const endX = tileFront(CHOSEN)[0];
  const vx = startX + (endX - startX) * vanT;
  const [, vy] = roadPt(vx);

  const homePin = tileCentre(HOME);
  const chosenPin = tileCentre(CHOSEN);
  const pinT = moved ? 1 : 0;
  const pinX = homePin[0] + (chosenPin[0] - homePin[0]) * pinT;
  const pinY = homePin[1] - 175 + (chosenPin[1] - 92 - (homePin[1] - 175)) * pinT;

  const items = [
    { i: 0, el: <Clinic o={T[0]} /> },
    { i: 1, el: <FamilyHome o={T[1]} sold={step >= 3} /> },
    { i: 2, el: <Park o={T[2]} /> },
    { i: 3, el: <SingleLevel o={T[3]} variant={0} matched={matched && !secured} /> },
    { i: 4, el: <Cafe o={T[4]} /> },
    { i: 5, el: <SingleLevel o={T[5]} variant={1} matched={matched} chosen={secured} /> },
    { i: 6, el: <SingleLevel o={T[6]} variant={2} matched={matched && !secured} /> },
  ];
  // painter's order: back (small x+y) first
  const order = [...items].sort((a, b) => T[a.i][0] + T[a.i][1] - (T[b.i][0] + T[b.i][1]) || a.i - b.i);

  const trees = [
    [T[0][0] + 0.12, T[0][1] + 0.12], [T[1][0] + 0.88, T[1][1] + 0.12], [T[2][0] + 0.15, T[2][1] + 0.15],
    [T[2][0] + 0.85, T[2][1] + 0.85], [T[2][0] + 0.85, T[2][1] + 0.15], [T[3][0] + 0.12, T[3][1] + 0.14],
    [T[4][0] + 0.88, T[4][1] + 0.12], [T[5][0] + 0.88, T[5][1] + 0.1], [T[6][0] + 0.1, T[6][1] + 0.12],
    [T[6][0] + 0.88, T[6][1] + 0.88],
  ];

  const chipText = [
    { i: 3, t: '650 m away' },
    { i: 5, t: '1.2 km away' },
    { i: 6, t: '1.6 km away' },
  ];

  return (
    <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} className="town" role="img" aria-label="An illustrated Christchurch neighbourhood. Three nearby single-level homes are matched, one is secured, the family home is sold quietly, and a moving van takes the owners to their new home a few streets away.">
      <defs>
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <rect width="6" height="6" fill="var(--tile)" />
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--ink)" strokeWidth="0.6" opacity="0.45" />
        </pattern>
        <pattern id="water" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#fff" />
          <path d="M0 4 q2 -2 4 0 t4 0" stroke="var(--ink)" strokeWidth="0.7" fill="none" opacity="0.6" />
        </pattern>
        <pattern id="stripe" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
          <rect width="10" height="10" fill="#fff" />
          <rect width="5" height="10" fill="var(--green)" />
        </pattern>
        <linearGradient id="shade" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#c9d3cc" />
        </linearGradient>
      </defs>

      {/* soft ground band */}
      <polygon points={`${b1a.join(',')} ${b1b.join(',')} ${b2b.join(',')} ${b2a.join(',')}`} fill="var(--road)" />
      <line x1={L[0]} y1={L[1]} x2={R[0]} y2={R[1]} stroke={INK} strokeWidth={1.4} strokeDasharray="14 12" opacity="0.7" />
      <line x1={b1a[0]} y1={b1a[1]} x2={b1b[0]} y2={b1b[1]} stroke={INK} strokeWidth={1.2} opacity="0.5" />
      <line x1={b2a[0]} y1={b2a[1]} x2={b2b[0]} y2={b2b[1]} stroke={INK} strokeWidth={1.2} opacity="0.5" />

      {/* driveways */}
      {T.map((t, i) => {
        const [fx, fy] = tileFront(i);
        const [, ry] = roadPt(fx);
        return <line key={i} x1={fx} y1={fy} x2={fx} y2={ry - 16} stroke={INK} strokeWidth={1.2} strokeDasharray="3 5" opacity="0.6" />;
      })}

      {T.map((t, i) => (
        <Tile key={i} x={t[0]} y={t[1]} />
      ))}

      {order.map(({ i, el }) => (
        <g key={i} className={`bld ${moved && i === CHOSEN ? 'lift' : ''}`}>
          {el}
        </g>
      ))}
      {trees.map(([x, y], k) => (
        <Tree key={k} x={x} y={y} k={0.9} />
      ))}

      {/* match pins */}
      {matches.map((i) => {
        const [cx, cy] = tileCentre(i);
        return (
          <g key={i} className={`check ${matched && !(secured && i !== CHOSEN) ? 'on' : ''}`} style={{ transitionDelay: `${(i - 3) * 90}ms` }}>
            <g transform={`translate(${cx} ${cy - 120})`}>
              <rect x={-15} y={-15} width={30} height={30} fill="var(--green)" stroke={INK} strokeWidth={1.4} />
              <path d="M-7 0 l5 5 l9 -10" stroke="#fff" strokeWidth={2.6} fill="none" strokeLinecap="square" />
              <line x1={0} y1={15} x2={0} y2={58} stroke={INK} strokeWidth={1.4} strokeDasharray="2 4" />
            </g>
          </g>
        );
      })}

      {/* neighbours */}
      <Pin x={tileCentre(0)[0]} y={tileCentre(0)[1] - 40} stem={60}>
        <Person cx={0} cy={-6} hair="bun" />
      </Pin>
      <Pin x={tileCentre(4)[0] + 30} y={tileCentre(4)[1] - 30} stem={60}>
        <Person cx={0} cy={-6} hair="short" dark />
      </Pin>

      {/* the downsizers */}
      <g className="mover" style={{ transform: `translate(${pinX}px, ${pinY}px)` }}>
        <g className={step === 0 ? 'bob' : ''}>
          <path d="M0 34 L-12 22 A26 26 0 1 1 12 22 Z" fill="var(--green)" stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
          <clipPath id="moverclip">
            <circle cx={0} cy={4} r={21} />
          </clipPath>
          <g clipPath="url(#moverclip)">
            <circle cx={0} cy={4} r={21} fill="#fff" />
            <g transform="translate(-7 0)">
              <Person cx={0} cy={-2} hair="grey" />
            </g>
            <g transform="translate(9 3)">
              <Person cx={0} cy={-2} hair="short" />
            </g>
          </g>
        </g>
      </g>

      <Van x={vx} y={vy + 4} />

      {/* callouts */}
      <Chip x={tileCentre(HOME)[0] - 6} y={tileCentre(HOME)[1] - 238} text="4 bedrooms. Two storeys. Big garden." show={step === 0} />
      {chipText.map(({ i, t }, k) => (
        <Chip key={i} x={tileCentre(i)[0]} y={tileCentre(i)[1] - 166 - (k === 2 ? 58 : 0)} text={t} show={step === 1} />
      ))}
      <Chip x={tileCentre(CHOSEN)[0]} y={tileCentre(CHOSEN)[1] - 162} text="Secured first. It’s yours." show={step === 2} strong />
      <Chip x={tileCentre(HOME)[0]} y={tileCentre(HOME)[1] - 238} text="Sold quietly. No signs. No open homes." show={step === 3} strong />
      <Chip x={vx} y={vy - 62} text="$3,000 towards your move" show={step === 4 && vanT < 0.97} />
      <Chip x={tileCentre(CHOSEN)[0]} y={tileCentre(CHOSEN)[1] - 150} text="Home. Same neighbourhood." show={step === 4 && vanT > 0.97} strong />
    </svg>
  );
}

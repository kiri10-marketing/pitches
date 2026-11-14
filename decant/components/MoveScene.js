'use client';
// Isometric line-art neighbourhood. Everything is drawn from simple boxes so
// the scene can change state as the hero steps advance.

const S = 140; // px per unit
const C = Math.cos(Math.PI / 6);
const OX = 190;
const OY = 290;

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


// ---------- two-home move scene with a draggable truck ----------
const HOME = [0, 0];
const NEXT = [3.2, -3.2];
const RD = 2.75; // x+y of the road centre line
const onRoad = (sx) => {
  const xmy = (sx - OX) / (C * S);
  return P((RD + xmy) / 2, (RD - xmy) / 2, 0);
};
export const SCENE = { w: 1170, h: 575 };
const front = (o) => P(o[0] + 1, o[1] + 1, 0);
const centre = (o) => P(o[0] + 0.5, o[1] + 0.5, 0.06);
const X0 = front(HOME)[0] - 40;
const X1 = front(NEXT)[0] + 40;
export const truckX = (p) => X0 + (X1 - X0) * p;

function BigVan({ x, y, active, k = 1.55 }) {
  return (
    <g style={{ transform: `translate(${x}px, ${y}px)` }}>
      <g transform={`scale(${k}) translate(-34 -40)`}>
        <rect x="-6" y="-4" width="82" height="50" fill="transparent" />
        <rect x="0" y="6" width="46" height="26" fill="#fff" stroke={INK} strokeWidth={1.6} />
        <path d="M46 14 h12 l10 10 v8 h-22z" fill="#fff" stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
        <path d="M50 17 h7 l6 7 h-13z" fill={INK} />
        <rect x="6" y="12" width="34" height="9" fill="var(--green)" />
        <circle cx="13" cy="33" r="6" fill={INK} />
        <circle cx="54" cy="33" r="6" fill={INK} />
        <circle cx="13" cy="33" r="2" fill="#fff" />
        <circle cx="54" cy="33" r="2" fill="#fff" />
      </g>
      <g className={`grip ${active ? 'on' : ''}`}>
        <rect x="70" y="-36" width="128" height="36" fill={INK} />
        <text x="84" y="-12.5" fontSize="16" fontWeight="600" fill="#fff">Drag me</text>
        <path d="M172 -24 l10 6 l-10 6z" fill="#fff" />
      </g>
    </g>
  );
}

export default function MoveScene({ p = 0, step = 0, hint, svgRef, onDown, onKey, stops, big }) {
  const vx = truckX(p);
  const [, vy] = onRoad(vx);
  const [la, lay] = onRoad(X0 - 90);
  const [lb, lby] = onRoad(X1 + 90);
  const moved = step >= 3;
  const hc = centre(HOME), nc = centre(NEXT);
  const pin = moved ? [nc[0], nc[1] - 150] : [hc[0], hc[1] - 236];
  return (
    <svg ref={svgRef} viewBox={`0 0 ${SCENE.w} ${SCENE.h}`} className="mscene" role="img" aria-label="Two homes on a street: the family home on the left and a single-level home on the right, with a moving truck on the road between them.">
      <defs>
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <rect width="6" height="6" fill="var(--tile)" />
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--ink)" strokeWidth="0.6" opacity="0.45" />
        </pattern>
        <linearGradient id="shade" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#c9d3cc" />
        </linearGradient>
      </defs>

      {/* road = progress track */}
      <line x1={la} y1={lay} x2={lb} y2={lby} stroke="var(--road)" strokeWidth={44} />
      <line x1={la} y1={lay} x2={lb} y2={lby} stroke={INK} strokeWidth={1.4} strokeDasharray="14 12" opacity="0.5" />
      <line x1={X0} y1={onRoad(X0)[1]} x2={vx} y2={vy} stroke="var(--green)" strokeWidth={6} />

      {/* driveways */}
      {[HOME, NEXT].map((o, i) => {
        const [fx, fy] = front(o);
        return <line key={i} x1={fx} y1={fy} x2={fx} y2={onRoad(fx)[1] - 24} stroke={INK} strokeWidth={1.2} strokeDasharray="3 5" opacity="0.6" />;
      })}

      <Tile x={HOME[0]} y={HOME[1]} />
      <Tile x={NEXT[0]} y={NEXT[1]} />
      <Tree x={HOME[0] + 0.12} y={HOME[1] + 0.14} />
      <Tree x={HOME[0] + 0.88} y={HOME[1] + 0.12} />
      <Tree x={NEXT[0] + 0.88} y={NEXT[1] + 0.1} />
      <FamilyHome o={HOME} sold={step >= 2} />
      <SingleLevel o={NEXT} variant={1} matched={step >= 1} chosen={step >= 1} />
      <Tree x={HOME[0] + 0.1} y={HOME[1] + 0.9} k={0.85} />
      <Tree x={NEXT[0] + 0.12} y={NEXT[1] + 0.86} k={0.85} />

      {/* the downsizers */}
      <g className="mover" style={{ transform: `translate(${pin[0]}px, ${pin[1]}px)` }}>
        <g className={step === 0 ? 'bob' : ''}>
          <path d="M0 34 L-12 22 A26 26 0 1 1 12 22 Z" fill="var(--green)" stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
          <clipPath id="moverclip2"><circle cx={0} cy={4} r={21} /></clipPath>
          <g clipPath="url(#moverclip2)">
            <circle cx={0} cy={4} r={21} fill="#fff" />
            <g transform="translate(-7 0)"><Person cx={0} cy={-2} hair="grey" /></g>
            <g transform="translate(9 3)"><Person cx={0} cy={-2} hair="short" /></g>
          </g>
        </g>
      </g>

      {/* step stops on the road */}
      {stops.map((s, i) => {
        const x = truckX(s);
        const [, y] = onRoad(x);
        const done = step >= i;
        return (
          <g key={i} transform={`translate(${x} ${y + 52})`}>
            <rect x={-17} y={-17} width={34} height={34} fill={done ? 'var(--green)' : '#fff'} stroke={done ? 'var(--green)' : INK} strokeWidth={1.4} style={{ transition: 'fill .3s' }} />
            <text x={0} y={6} textAnchor="middle" fontSize="16" fontWeight="600" fill={done ? '#fff' : INK}>{i + 1}</text>
          </g>
        );
      })}

      <Chip x={hc[0]} y={hc[1] - 300} text="4 bedrooms. Two storeys. Big garden." show={step === 0} />
      <Chip x={nc[0]} y={nc[1] - 210} text="Your next home. Secured first." show={step === 1} strong />
      <Chip x={hc[0]} y={hc[1] - 300} text="Sold quietly. No signs, no open homes." show={step === 2} strong />
      <Chip x={nc[0]} y={nc[1] - 214} text="Home. $3,000 towards the move." show={step === 3} strong />

      <g
        className="truck"
        tabIndex={0}
        role="slider"
        aria-label="Move the truck to see each step"
        aria-valuemin={1}
        aria-valuemax={4}
        aria-valuenow={step + 1}
        aria-valuetext={`Step ${step + 1} of 4`}
        onPointerDown={onDown}
        onKeyDown={onKey}
      >
        <BigVan x={vx} y={vy + 6} active={hint} k={big ? 2.4 : 1.55} />
      </g>
    </svg>
  );
}

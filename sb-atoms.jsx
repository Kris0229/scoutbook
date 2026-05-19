/* sb-atoms.jsx — shared design atoms for ScoutBook
   ! No `const styles = ...` collisions. All locals named uniquely. */

// ─── Chip / pill / tag ──────────────────────────────────────
function Chip({ children, tone = 'ink', solid = false, style = {} }) {
  const toneMap = {
    ink:   { bg: 'var(--ink)',       fg: 'var(--paper)' },
    paper: { bg: 'var(--paper-deep)', fg: 'var(--ink)' },
    clay:  { bg: 'var(--clay)',      fg: '#fff' },
    grass: { bg: 'var(--grass)',     fg: '#fff' },
    strike:{ bg: 'var(--strike)',    fg: '#fff' },
    ball:  { bg: 'var(--ball)',      fg: '#fff' },
    warn:  { bg: 'var(--warn)',      fg: '#fff' },
    ghost: { bg: 'transparent',      fg: 'var(--ink)' },
    ghostDark:{ bg: 'rgba(255,255,255,0.08)', fg: 'rgba(255,255,255,0.85)' },
    hot:   { bg: 'var(--ball)',      fg: '#fff' },
  };
  const t = toneMap[tone] || toneMap.ink;
  return (
    <span className="sb-chip" style={{
      background: solid ? t.bg : (tone === 'ghost' ? 'transparent' : (tone === 'ghostDark' ? t.bg : `${t.bg}1A`)),
      color: solid ? t.fg : (tone === 'ghost' ? t.fg : (tone === 'ghostDark' ? t.fg : t.bg)),
      border: tone === 'ghost' ? '1px solid rgba(27,34,48,0.18)' : 'none',
      ...style,
    }}>{children}</span>
  );
}

// ─── Square jersey number watermark ─────────────────────────
function JerseyWatermark({ num, opacity = 0.08, color = '#fff', style }) {
  return (
    <div className="sb-display" style={{
      fontSize: 220, fontWeight: 700, lineHeight: 0.85, color,
      opacity, position: 'absolute', right: -10, bottom: -28,
      pointerEvents: 'none', userSelect: 'none', ...style,
    }}>#{num}</div>
  );
}

// ─── Big KPI value ─────────────────────────────────────────
function KPI({ label, value, sub, dark = false, align = 'left', valueSize = 28 }) {
  const muted = dark ? 'rgba(255,255,255,0.55)' : 'rgba(27,34,48,0.55)';
  const fg = dark ? '#fff' : 'var(--ink)';
  return (
    <div style={{ textAlign: align, lineHeight: 1 }}>
      <div className="sb-display" style={{ fontSize: 9, letterSpacing: '0.12em', color: muted, marginBottom: 4 }}>{label}</div>
      <div className="sb-num" style={{ fontSize: valueSize, color: fg, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: muted, marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

// ─── Tab bar ────────────────────────────────────────────────
function Tabs({ items, active, dark = false, onChange }) {
  const baseFg = dark ? 'rgba(255,255,255,0.5)' : 'rgba(27,34,48,0.55)';
  const activeFg = dark ? '#fff' : 'var(--ink)';
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(27,34,48,0.1)';
  return (
    <div style={{ display: 'flex', gap: 4, borderBottom: `1px solid ${border}` }}>
      {items.map((it, i) => {
        const isActive = (active ?? 0) === i;
        return (
          <button key={i} onClick={() => onChange && onChange(i)}
            style={{
              flex: 1, padding: '10px 4px', border: 'none', background: 'transparent',
              cursor: 'pointer', position: 'relative',
              fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 12,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: isActive ? activeFg : baseFg,
            }}>
            {it}
            {isActive && <div style={{ position: 'absolute', left: 8, right: 8, bottom: -1, height: 2, background: 'var(--clay)' }} />}
          </button>
        );
      })}
    </div>
  );
}

// ─── Bottom nav (App) ──────────────────────────────────────
function BottomNav({ items, active = 0 }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '8px 0 22px', background: '#fff',
      borderTop: '1px solid rgba(27,34,48,0.08)',
    }}>
      {items.map((it, i) => (
        <div key={i} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          color: i === active ? 'var(--clay-deep)' : 'rgba(27,34,48,0.4)',
        }}>
          <div style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{it.icon}</div>
          <div style={{ fontSize: 10, fontWeight: i === active ? 700 : 500 }}>{it.label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Stepper for wizards ───────────────────────────────────
function Stepper({ steps, active }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {steps.map((s, i) => {
        const done = i < active;
        const cur = i === active;
        return (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: '0 0 auto' }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: cur ? 'var(--clay-deep)' : (done ? 'var(--strike)' : 'rgba(27,34,48,0.1)'),
                color: (cur || done) ? '#fff' : 'rgba(27,34,48,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--f-display)', fontSize: 11, fontWeight: 700,
              }}>{done ? '✓' : i + 1}</div>
              <div style={{ fontSize: 9, fontWeight: cur ? 700 : 500,
                color: cur ? 'var(--ink)' : 'rgba(27,34,48,0.5)' }}>{s}</div>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 2, marginBottom: 12,
              background: i < active ? 'var(--strike)' : 'rgba(27,34,48,0.1)' }} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── 3×3 strike-zone heat (with optional 4-corner outside zones for 13-grid) ───
function StrikeZone3x3({ data, dark = false, size = 180, mode = 'avg' }) {
  // data: [[{v, n}, ...3], ...3]  v=AVG (0–1) or BAA
  const heat = (v) => {
    if (v == null) return dark ? '#1F2937' : '#E5E5E5';
    // 5-stop heat scale: cold blue → warn orange → hot red
    const stops = ['#3D6B8C', '#5B8CDB', '#7BB58F', '#C7912A', '#C24C2F', '#8B1A0F'];
    const idx = Math.min(stops.length - 1, Math.floor(v * stops.length));
    return stops[idx];
  };
  const cell = size / 3;
  const muted = dark ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.95)';
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* zone */}
      {data.map((row, r) => row.map((c, k) => (
        <g key={`${r}-${k}`}>
          <rect x={k * cell} y={r * cell} width={cell} height={cell}
            fill={heat(c?.v)} stroke={dark ? 'rgba(0,0,0,0.6)' : '#fff'} strokeWidth="2" />
          {c && (
            <>
              <text x={k * cell + cell / 2} y={r * cell + cell / 2 - 4}
                textAnchor="middle" fill={muted}
                fontFamily="var(--f-display)" fontWeight="700" fontSize={cell * 0.28}>
                {mode === 'pct' ? `${Math.round(c.v * 100)}%` : `.${String(Math.round(c.v * 1000)).padStart(3, '0').replace(/^0+/, '') || '000'}`}
              </text>
              <text x={k * cell + cell / 2} y={r * cell + cell / 2 + cell * 0.22}
                textAnchor="middle" fill={muted}
                fontFamily="var(--f-display)" fontSize={cell * 0.16} opacity="0.85">
                {c.n}球
              </text>
            </>
          )}
        </g>
      )))}
      {/* chalk strike-zone border */}
      <rect x="0.5" y="0.5" width={size - 1} height={size - 1}
        fill="none" stroke={dark ? 'rgba(255,255,255,0.5)' : 'var(--ink)'}
        strokeWidth="2" strokeDasharray="4 3" />
    </svg>
  );
}

// ─── 13-grid pitch-location chart (3x3 + outer ring) ─────
function Zone13({ data, dark = true, size = 180, mode = 'pct' }) {
  // data[0..8] = 3x3; data[9..12] = outer (high, low, in, out)
  const heat = (v) => {
    if (v == null) return dark ? '#1F2937' : '#E5E5E5';
    const stops = ['#3D6B8C', '#5B8CDB', '#7BB58F', '#C7912A', '#C24C2F', '#8B1A0F'];
    return stops[Math.min(stops.length - 1, Math.floor(v * stops.length))];
  };
  const inset = size * 0.18; // outer ring thickness
  const inner = size - 2 * inset;
  const cell = inner / 3;
  const text = dark ? '#fff' : '#fff';
  const fmt = (v) => mode === 'pct' ? `${Math.round(v * 100)}%`
    : `.${String(Math.round(v * 1000)).padStart(3, '0')}`.replace('.0', '.').replace(/\.0+/, '.');
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* outer 4 strips (high/low/in/out) */}
      <rect x="0" y="0" width={size} height={inset} fill={heat(data[9]?.v)} />
      <rect x="0" y={size - inset} width={size} height={inset} fill={heat(data[10]?.v)} />
      <rect x="0" y={inset} width={inset} height={inner} fill={heat(data[11]?.v)} />
      <rect x={size - inset} y={inset} width={inset} height={inner} fill={heat(data[12]?.v)} />
      {/* inner 3x3 */}
      {Array.from({ length: 9 }).map((_, i) => {
        const r = Math.floor(i / 3), c = i % 3;
        const d = data[i];
        return (
          <g key={i}>
            <rect x={inset + c * cell} y={inset + r * cell} width={cell} height={cell}
              fill={heat(d?.v)} stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />
            {d && (
              <>
                <text x={inset + c * cell + cell / 2} y={inset + r * cell + cell / 2 - 2}
                  textAnchor="middle" fill={text}
                  fontFamily="var(--f-display)" fontWeight="700" fontSize={cell * 0.26}>
                  {fmt(d.v)}
                </text>
                <text x={inset + c * cell + cell / 2} y={inset + r * cell + cell / 2 + cell * 0.22}
                  textAnchor="middle" fill={text}
                  fontFamily="var(--f-display)" fontSize={cell * 0.16} opacity="0.85">
                  {d.n}
                </text>
              </>
            )}
          </g>
        );
      })}
      {/* chalk lines for inner strike zone */}
      <rect x={inset + 0.5} y={inset + 0.5} width={inner - 1} height={inner - 1}
        fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="4 3" opacity="0.9" />
    </svg>
  );
}

// ─── Horizontal bar (pitch-type AVG) ───────────────────────
function HBar({ label, value, max = 0.4, color = 'var(--clay)', n, league, dark = false, mode = 'avg' }) {
  const fg = dark ? '#fff' : 'var(--ink)';
  const muted = dark ? 'rgba(255,255,255,0.55)' : 'rgba(27,34,48,0.55)';
  const pct = Math.min(1, value / max);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
        <span className="sb-display" style={{ fontWeight: 600, fontSize: 12, color: fg }}>{label}</span>
        <span style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span className="sb-num" style={{ fontSize: 18, color: fg }}>
            {mode === 'avg' ? `.${String(Math.round(value * 1000)).padStart(3, '0')}`.replace('.0', '.') : `${Math.round(value * 100)}%`}
          </span>
          {n != null && <span style={{ fontSize: 10, color: muted }}>{n}球</span>}
        </span>
      </div>
      <div style={{ position: 'relative', height: 8, background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(27,34,48,0.06)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct * 100}%`, background: color, borderRadius: 4 }} />
        {league != null && (
          <div style={{ position: 'absolute', left: `${(league / max) * 100}%`, top: -3, bottom: -3, width: 2,
            borderLeft: '2px dashed var(--warn)' }} title={`聯盟均值 ${league}`} />
        )}
      </div>
    </div>
  );
}

// ─── Diamond / field map (top-down) ────────────────────────
function FieldMap({ hits = [], width = 280, height = 240, dark = true, showLabels = true }) {
  const cx = width / 2;
  const home = { x: cx, y: height - 18 };
  const grass = dark ? '#3F6230' : '#7BA866';
  const grassDark = dark ? '#2A4220' : '#4D7B3A';
  const dirt = dark ? '#7A4F2B' : '#B97744';
  // arc warning track
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <radialGradient id="fmGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(194,76,47,0.55)" />
          <stop offset="100%" stopColor="rgba(194,76,47,0)" />
        </radialGradient>
      </defs>
      {/* outfield arc */}
      <path d={`M 20 ${home.y - 20} A ${cx - 20} ${cx - 20} 0 0 1 ${width - 20} ${home.y - 20} L ${home.x} ${home.y} Z`}
        fill={grass} />
      {/* inner grass */}
      <path d={`M ${cx - 80} ${home.y - 60} A 80 70 0 0 1 ${cx + 80} ${home.y - 60} L ${home.x} ${home.y} Z`}
        fill={grassDark} />
      {/* dirt diamond */}
      <polygon points={`${home.x},${home.y - 4}  ${home.x + 38},${home.y - 42}  ${home.x},${home.y - 80}  ${home.x - 38},${home.y - 42}`}
        fill={dirt} />
      {/* bases */}
      {[
        { x: home.x, y: home.y - 4 },         // home
        { x: home.x + 38, y: home.y - 42 },   // 1st
        { x: home.x, y: home.y - 80 },        // 2nd
        { x: home.x - 38, y: home.y - 42 },   // 3rd
      ].map((b, i) => (
        <rect key={i} x={b.x - 4} y={b.y - 4} width="8" height="8" fill="#fff"
          transform={`rotate(45 ${b.x} ${b.y})`} />
      ))}
      {/* foul lines */}
      <line x1={home.x} y1={home.y} x2="20" y2={home.y - 20} stroke="#fff" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
      <line x1={home.x} y1={home.y} x2={width - 20} y2={home.y - 20} stroke="#fff" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
      {/* hit points */}
      {hits.map((h, i) => {
        const color = { single: '#5B8CDB', double: '#4D7B3A', triple: '#C7912A', hr: '#C24C2F', out: 'rgba(180,180,180,0.6)' }[h.type] || '#888';
        return (
          <g key={i}>
            {h.type === 'hr' && <circle cx={h.x} cy={h.y} r="9" fill="url(#fmGlow)" />}
            <circle cx={h.x} cy={h.y} r={h.type === 'hr' ? 4 : 3.5} fill={color} stroke="rgba(0,0,0,0.4)" strokeWidth="0.5" />
          </g>
        );
      })}
      {showLabels && (
        <text x={cx} y={home.y + 12} textAnchor="middle" fill={dark ? 'rgba(255,255,255,0.4)' : 'rgba(27,34,48,0.5)'}
          fontFamily="var(--f-display)" fontSize="9">HOME</text>
      )}
    </svg>
  );
}

// ─── Donut chart (pitch usage %) ───────────────────────────
function Donut({ data, size = 140, thickness = 22, dark = true }) {
  // data: [{ label, value (0-1), color }]
  const r = size / 2 - thickness / 2;
  const cx = size / 2, cy = size / 2;
  let acc = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={dark ? 'rgba(255,255,255,0.05)' : 'rgba(27,34,48,0.05)'} strokeWidth={thickness} />
      {data.map((d, i) => {
        const start = acc;
        acc += d.value;
        const end = acc;
        const a0 = start * 2 * Math.PI - Math.PI / 2;
        const a1 = end * 2 * Math.PI - Math.PI / 2;
        const x0 = cx + Math.cos(a0) * r, y0 = cy + Math.sin(a0) * r;
        const x1 = cx + Math.cos(a1) * r, y1 = cy + Math.sin(a1) * r;
        const large = end - start > 0.5 ? 1 : 0;
        return (
          <path key={i} d={`M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`}
            fill="none" stroke={d.color} strokeWidth={thickness} strokeLinecap="butt" />
        );
      })}
    </svg>
  );
}

// ─── Sparkline ─────────────────────────────────────────────
function Sparkline({ data, width = 100, height = 28, color = 'var(--clay)', fill = true }) {
  const max = Math.max(...data), min = Math.min(...data);
  const range = (max - min) || 1;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * width,
    height - ((v - min) / range) * (height - 4) - 2,
  ]);
  const d = 'M ' + pts.map((p) => p.join(' ')).join(' L ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {fill && <path d={`${d} L ${width} ${height} L 0 ${height} Z`} fill={color} opacity="0.18" />}
      <path d={d} fill="none" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}

// ─── Mini line chart ───────────────────────────────────────
function MiniLine({ series, width = 380, height = 120, color = 'var(--clay)', dark = false, labels }) {
  const max = Math.max(...series), min = Math.min(...series);
  const range = (max - min) || 1;
  const padL = 28, padR = 8, padT = 8, padB = 18;
  const innerW = width - padL - padR, innerH = height - padT - padB;
  const pts = series.map((v, i) => [
    padL + (i / (series.length - 1)) * innerW,
    padT + innerH - ((v - min) / range) * innerH,
  ]);
  const stroke = dark ? 'rgba(255,255,255,0.08)' : 'rgba(27,34,48,0.1)';
  const fg = dark ? 'rgba(255,255,255,0.5)' : 'rgba(27,34,48,0.45)';
  const yticks = [max, (max + min) / 2, min];
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {yticks.map((v, i) => {
        const y = padT + (i / 2) * innerH;
        return (
          <g key={i}>
            <line x1={padL} y1={y} x2={width - padR} y2={y} stroke={stroke} strokeWidth="1" />
            <text x={padL - 4} y={y + 3} textAnchor="end" fontFamily="var(--f-display)" fontSize="9" fill={fg}>
              {Math.round(v * 1000) / 1000}
            </text>
          </g>
        );
      })}
      <path d={`M ${pts.map((p) => p.join(' ')).join(' L ')}`} fill="none" stroke={color} strokeWidth="2" />
      <path d={`M ${pts[0].join(' ')} L ${pts.map((p) => p.join(' ')).join(' L ')} L ${pts.at(-1)[0]} ${padT + innerH} L ${pts[0][0]} ${padT + innerH} Z`}
        fill={color} opacity="0.12" />
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="2.5" fill={color} />)}
      {labels && labels.map((l, i) => (
        <text key={i} x={pts[i][0]} y={height - 4} textAnchor="middle" fontFamily="var(--f-display)" fontSize="9" fill={fg}>{l}</text>
      ))}
    </svg>
  );
}

// ─── Section header for scout-report dark theme ────────────
function SectionHead({ num, label, sub, right, dark = true }) {
  const fg = dark ? '#fff' : 'var(--ink)';
  const muted = dark ? 'rgba(255,255,255,0.5)' : 'rgba(27,34,48,0.5)';
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      paddingBottom: 8, marginBottom: 12, borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(27,34,48,0.1)'}` }}>
      <div>
        <div className="sb-display" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--clay-soft)' }}>
          {num} · {label}
        </div>
        {sub && <div style={{ fontSize: 11, color: muted, marginTop: 4 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

// ─── Card ───────────────────────────────────────────────────
function Card({ children, dark = false, padding = 14, style = {} }) {
  return (
    <div style={{
      background: dark ? 'var(--night-2)' : 'var(--chalk)',
      border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(27,34,48,0.06)',
      borderRadius: 14,
      padding,
      ...style,
    }}>{children}</div>
  );
}

// ─── Player avatar / silhouette ────────────────────────────
function BatterSilhouette({ size = 60, color = 'rgba(255,255,255,0.2)', side = 'R' }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 60 84" style={{ transform: side === 'L' ? 'scaleX(-1)' : 'none' }}>
      <path d="M30 8 a6 6 0 0 1 6 6 v3 a6 6 0 0 1 -12 0 v-3 a6 6 0 0 1 6 -6 z" fill={color}/>
      <path d="M24 22 q-6 2 -8 10 l-2 22 q-1 6 4 7 l4 -22 l2 -12 z" fill={color}/>
      <path d="M36 22 l4 4 l14 -2 l-2 4 l-14 4 l-2 -8 z" fill={color}/>
      <path d="M24 24 h12 v18 l-2 30 l-4 1 l-3 -28 l-5 22 l-4 -1 l3 -30 z" fill={color}/>
      <path d="M40 28 l8 -4 l4 14 l-12 4 z" fill={color}/>
    </svg>
  );
}

// ─── Pitcher silhouette (windup) ───────────────────────────
function PitcherSilhouette({ size = 60, color = 'rgba(255,255,255,0.2)' }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 60 84">
      <circle cx="30" cy="14" r="6" fill={color}/>
      <path d="M22 22 h16 l-2 24 l-4 -2 l-4 4 l-2 -2 z" fill={color}/>
      <path d="M22 24 l-8 8 l4 4 l8 -6 z" fill={color}/>
      <path d="M38 24 l10 -2 l2 4 l-12 6 z" fill={color}/>
      <path d="M24 44 h4 v28 h-4 z M32 44 h4 v28 h-4 z" fill={color}/>
    </svg>
  );
}

// ─── Pitch type swatch ─────────────────────────────────────
const PITCH_COLORS = {
  FB: 'var(--pitch-fb)', SI: 'var(--pitch-si)', SL: 'var(--pitch-sl)',
  CB: 'var(--pitch-cb)', CH: 'var(--pitch-ch)', SF: 'var(--pitch-sf)', XX: 'var(--pitch-xx)',
};
const PITCH_NAMES = { FB: '快速球', SI: '伸卡', SL: '滑球', CB: '曲球', CH: '變速', SF: '指叉', XX: '其他' };

function PitchSwatch({ code, size = 10 }) {
  return <span style={{ display: 'inline-block', width: size, height: size, borderRadius: '50%', background: PITCH_COLORS[code] }} />;
}

// ─── Strike zone with pitch dots (recording) ───────────────
function ZoneInput({ pitches = [], dark = true, size = 200 }) {
  // 3x3 inner + 4 outer zones to make 13
  const inset = size * 0.16;
  const inner = size - 2 * inset;
  const cell = inner / 3;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* dirt background */}
      <rect width={size} height={size} fill={dark ? 'rgba(255,255,255,0.04)' : '#FBF7EE'} stroke={dark ? 'rgba(255,255,255,0.06)' : 'rgba(27,34,48,0.08)'}/>
      {/* outer corners shading */}
      {[0, 1, 2, 3].map((i) => {
        const positions = [
          { x: 0, y: 0, w: size, h: inset },
          { x: 0, y: size - inset, w: size, h: inset },
          { x: 0, y: inset, w: inset, h: inner },
          { x: size - inset, y: inset, w: inset, h: inner },
        ];
        return <rect key={i} {...positions[i]} fill={dark ? 'rgba(0,0,0,0.18)' : 'rgba(27,34,48,0.04)'} />;
      })}
      {/* 3x3 inner grid */}
      {Array.from({ length: 9 }).map((_, i) => {
        const r = Math.floor(i / 3), c = i % 3;
        return <rect key={i} x={inset + c * cell} y={inset + r * cell} width={cell} height={cell}
          fill="transparent" stroke={dark ? 'rgba(255,255,255,0.4)' : 'var(--ink)'} strokeWidth="1.2" strokeDasharray="3 2"/>;
      })}
      <rect x={inset} y={inset} width={inner} height={inner} fill="transparent"
        stroke="#fff" strokeWidth="2" strokeDasharray="6 3"/>
      {/* pitch dots */}
      {pitches.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="9" fill={PITCH_COLORS[p.type] || '#888'} stroke="#fff" strokeWidth="1.5" />
          <text x={p.x} y={p.y + 3} textAnchor="middle" fontFamily="var(--f-display)" fontWeight="700" fontSize="9" fill="#fff">{p.n}</text>
        </g>
      ))}
    </svg>
  );
}

Object.assign(window, {
  Chip, JerseyWatermark, KPI, Tabs, BottomNav, Stepper,
  StrikeZone3x3, Zone13, HBar, FieldMap, Donut, Sparkline, MiniLine,
  SectionHead, Card, BatterSilhouette, PitcherSilhouette, PitchSwatch,
  ZoneInput, PITCH_COLORS, PITCH_NAMES,
});

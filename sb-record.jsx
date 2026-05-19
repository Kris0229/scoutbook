/* sb-record.jsx — 比賽中 · 記錄畫面 5 種狀態
   A · 保守 Conservative 為基底
   1. 基底  2. 長按格子 → 球種圓盤  3. 點擊出 → 擊球類型  4. 長按落點 → 結果  5. ⋯ 操作選單
*/

// ─── 共用：頂部 Bar ────────────────────────────────────────
function RecTopBar() {
  return (
    <div style={{ paddingTop: 50, padding: '50px 14px 4px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
          background: 'var(--ball)', boxShadow: '0 0 8px var(--ball)' }}/>
        <span className="sb-display" style={{ fontSize: 14, color: '#fff', fontWeight: 600, letterSpacing: '0.06em' }}>
          5 <span style={{ color: 'rgba(255,255,255,0.55)' }}>上</span> · 1 OUT
        </span>
        <span className="sb-display" style={{ fontSize: 10, color: 'var(--clay-soft)', letterSpacing: '0.18em' }}>BATTER #23</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="sb-num" style={{ fontSize: 16, color: '#fff', fontWeight: 700 }}>2-1</span>
        <button style={{ border: 'none', background: 'rgba(255,255,255,0.08)',
          color: '#fff', width: 30, height: 30, borderRadius: 9, fontSize: 16 }}>⋯</button>
      </div>
    </div>
  );
}

// ─── 共用：球場視角 ──────────────────────────────────────
function RecFieldView({ height = 220, hits = [], runnerOnFirst = true, hint = '點擊標示落點 · 長按選結果' }) {
  return (
    <div style={{ margin: '6px 14px 0', height, borderRadius: 14, overflow: 'hidden', position: 'relative',
      background: '#3a5e2a', border: '1px solid rgba(0,0,0,0.2)' }}>
      <svg width="100%" height={height} viewBox={`0 0 360 ${height}`} preserveAspectRatio="none">
        <defs>
          <radialGradient id="grassFV" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#5e8f48"/>
            <stop offset="55%" stopColor="#4d7b3a"/>
            <stop offset="100%" stopColor="#345a26"/>
          </radialGradient>
          <radialGradient id="dirtFV" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#c08350"/>
            <stop offset="100%" stopColor="#8a5226"/>
          </radialGradient>
          <pattern id="grassTex" patternUnits="userSpaceOnUse" width="6" height="6">
            <rect width="6" height="6" fill="transparent"/>
            <circle cx="1" cy="1" r="0.3" fill="rgba(255,255,255,0.05)"/>
          </pattern>
        </defs>
        {/* outfield grass */}
        <rect x="0" y="0" width="360" height={height} fill="url(#grassFV)"/>
        <rect x="0" y="0" width="360" height={height} fill="url(#grassTex)"/>
        {/* outfield arc (warning track) */}
        <path d={`M 24 ${height - 18} A 170 ${height - 56} 0 0 1 336 ${height - 18}`}
          stroke="rgba(251,247,238,0.22)" strokeWidth="1.2" fill="none" strokeDasharray="3 3"/>
        {/* infield grass (rounded) */}
        <path d={`M 102 ${height - 22} Q 102 ${height - 116} 180 ${height - 138} Q 258 ${height - 116} 258 ${height - 22} Z`}
          fill="#4d7b3a"/>
        {/* dirt diamond */}
        <polygon points={`180,${height - 28} 234,${height - 76} 180,${height - 122} 126,${height - 76}`}
          fill="url(#dirtFV)" stroke="rgba(0,0,0,0.18)" strokeWidth="0.6"/>
        {/* pitcher's mound */}
        <circle cx="180" cy={height - 76} r="11" fill="#c08350" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5"/>
        <rect x="178" y={height - 78} width="4" height="2" fill="#fbf7ee" opacity="0.8"/>
        {/* batter's boxes */}
        <rect x="160" y={height - 36} width="11" height="16" fill="#c08350" stroke="#fbf7ee" strokeWidth="0.7"/>
        <rect x="189" y={height - 36} width="11" height="16" fill="#c08350" stroke="#fbf7ee" strokeWidth="0.7"/>
        {/* home plate */}
        <polygon points={`174,${height - 22} 186,${height - 22} 186,${height - 16} 180,${height - 10} 174,${height - 16}`}
          fill="#fbf7ee" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5"/>
        {/* foul lines */}
        <line x1="180" y1={height - 22} x2="24" y2={height - 108} stroke="#fbf7ee" strokeWidth="1.4" opacity="0.9"/>
        <line x1="180" y1={height - 22} x2="336" y2={height - 108} stroke="#fbf7ee" strokeWidth="1.4" opacity="0.9"/>
        {/* bases */}
        {[
          { x: 234, y: height - 76, b: '1' },
          { x: 180, y: height - 122, b: '2' },
          { x: 126, y: height - 76, b: '3' },
        ].map((b) => (
          <rect key={b.b} x={b.x - 5.5} y={b.y - 5.5} width="11" height="11" fill="#fbf7ee"
            stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" transform={`rotate(45 ${b.x} ${b.y})`}/>
        ))}
        {/* fielders */}
        {[
          { x: 232, y: height - 95 },   // 1B
          { x: 204, y: height - 110 },  // 2B
          { x: 128, y: height - 95 },   // 3B
          { x: 156, y: height - 110 },  // SS
          { x: 72, y: height - 140 },   // LF
          { x: 180, y: height - 156 },  // CF
          { x: 288, y: height - 140 },  // RF
        ].map((f, i) => (
          <circle key={i} cx={f.x} cy={f.y} r="3.5" fill="#fbf7ee" stroke="rgba(0,0,0,0.4)" strokeWidth="0.6"/>
        ))}
        {/* catcher */}
        <circle cx="180" cy={height - 18} r="3" fill="rgba(15,20,28,0.5)" stroke="#fbf7ee" strokeWidth="0.5"/>
        {/* runner on 1B */}
        {runnerOnFirst && (
          <g>
            <circle cx="240" cy={height - 84} r="5" fill="var(--ball)" stroke="#fff" strokeWidth="1.5"/>
            <text x="240" y={height - 81} textAnchor="middle" fontFamily="var(--f-display)"
              fontSize="7" fontWeight="700" fill="#fff">R</text>
          </g>
        )}
        {/* hits */}
        {hits.map((h, i) => {
          const color = { single: '#5B8CDB', double: '#4D7B3A', triple: '#C7912A', hr: '#C24C2F', out: 'rgba(220,220,220,0.6)' }[h.type] || '#888';
          return (
            <g key={i}>
              {h.type === 'hr' && <circle cx={h.x} cy={h.y} r="12" fill={color} opacity="0.3"/>}
              <circle cx={h.x} cy={h.y} r="4.5" fill={color} stroke="rgba(0,0,0,0.4)" strokeWidth="0.6"/>
            </g>
          );
        })}
      </svg>
      {/* hint pill */}
      <div style={{ position: 'absolute', top: 10, left: 10, padding: '4px 10px', borderRadius: 6,
        background: 'rgba(15,20,28,0.7)', backdropFilter: 'blur(4px)' }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.92)' }}>{hint}</span>
      </div>
    </div>
  );
}

// ─── 共用：3×3 好球帶 (clay 框 + B 角標) ────────────────
function RecZone3x3({ pitches = [], dim = false, count = 3 }) {
  // pitches: [{ cell: 0-8, kind: 'S'|'B'|'F'|'IP', n: pitch # }]
  const cells = Array.from({ length: 9 }, (_, i) => i + 1);
  const tones = {
    S:  { bg: '#2F7D4F', stroke: '#2F7D4F' },
    B:  { bg: '#C24C2F', stroke: '#C24C2F' },
    F:  { bg: '#C7912A', stroke: '#C7912A' },
    IP: { bg: '#B97744', stroke: '#B97744' },
  };
  return (
    <div style={{ position: 'relative', margin: '14px 14px 0', padding: '20px 18px 22px', borderRadius: 14,
      background: 'linear-gradient(180deg, #4a2f1a 0%, #3a2614 100%)',
      border: '1px solid rgba(0,0,0,0.3)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
      opacity: dim ? 0.35 : 1 }}>
      {/* corner B labels */}
      <div className="sb-display" style={{ position: 'absolute', top: 6, left: 10, fontSize: 11, fontWeight: 700, color: 'var(--ball-soft)', letterSpacing: '0.12em' }}>B</div>
      <div className="sb-display" style={{ position: 'absolute', top: 6, right: 10, fontSize: 11, fontWeight: 700, color: 'var(--ball-soft)', letterSpacing: '0.12em' }}>B</div>
      <div className="sb-display" style={{ position: 'absolute', bottom: 30, left: 10, fontSize: 11, fontWeight: 700, color: 'var(--ball-soft)', letterSpacing: '0.12em' }}>B</div>
      <div className="sb-display" style={{ position: 'absolute', bottom: 30, right: 10, fontSize: 11, fontWeight: 700, color: 'var(--ball-soft)', letterSpacing: '0.12em' }}>B</div>

      {/* zone grid */}
      <div style={{ position: 'relative', display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)',
        aspectRatio: '1 / 1', maxWidth: 240, margin: '0 auto',
        background: 'rgba(77,123,58,0.55)',
        border: '1.5px solid rgba(251,247,238,0.6)' }}>
        {cells.map((n, i) => (
          <div key={n} style={{ position: 'relative',
            borderRight: (i % 3) < 2 ? '1px solid rgba(251,247,238,0.35)' : 'none',
            borderBottom: i < 6 ? '1px solid rgba(251,247,238,0.35)' : 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="sb-display" style={{ fontSize: 22, fontWeight: 500, color: 'rgba(251,247,238,0.65)' }}>{n}</span>
          </div>
        ))}
        {/* pitch markers overlay */}
        {pitches.map((p) => {
          const col = p.cell % 3, row = Math.floor(p.cell / 3);
          const t = tones[p.kind] || tones.S;
          return (
            <div key={p.n} style={{ position: 'absolute',
              left: `${(col + 0.5) * 33.333}%`, top: `${(row + 0.5) * 33.333}%`,
              transform: 'translate(-50%, -50%)',
              width: 30, height: 30, borderRadius: '50%',
              background: t.bg, border: '2px solid rgba(251,247,238,0.9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 2px 8px rgba(0,0,0,0.4), 0 0 0 1px ${t.stroke}` }}>
              <span className="sb-num" style={{ fontSize: 14, color: '#fff', fontWeight: 700 }}>{p.n}</span>
            </div>
          );
        })}
      </div>

      {/* home plate beneath zone */}
      <svg width="32" height="14" viewBox="0 0 32 14" style={{ display: 'block', margin: '6px auto 0' }}>
        <polygon points="2,2 30,2 30,7 16,12 2,7" fill="rgba(251,247,238,0.85)" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5"/>
      </svg>

      {/* pitch count chip */}
      <div style={{ position: 'absolute', left: -6, bottom: -10, width: 36, height: 36, borderRadius: 18,
        background: '#16263A', border: '2px solid var(--night)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
        <span className="sb-num" style={{ fontSize: 16, color: '#fff', fontWeight: 700 }}>{count}</span>
      </div>
    </div>
  );
}

// ─── 共用：結果按鈕 2×3 ──────────────────────────────────
function RecResultButtons({ active = null }) {
  // Row 1: solid filled, bright signal colors
  // Row 2: muted dark fill, accent letter
  const r1 = [
    { code: 'S',  cn: '好球', en: 'STRIKE',        c: 'var(--strike)' },
    { code: 'B',  cn: '壞球', en: 'BALL',          c: 'var(--ball)' },
    { code: 'SM', cn: '揮棒落空', en: 'SWING & MISS', c: '#2A3242', text: '#fff', accent: 'var(--clay-soft)' },
  ];
  const r2 = [
    { code: 'IP', cn: '擊出', en: 'IN PLAY', c: '#3A2A1E', accent: 'var(--clay-soft)', text: '#fff' },
    { code: 'HB', cn: '觸身球', en: 'HBP',    c: '#3A2A1E', accent: 'var(--warn-soft)', text: '#fff' },
    { code: 'F',  cn: '界外', en: 'FOUL',     c: '#3A2A1E', accent: 'var(--clay-pale)', text: '#fff' },
  ];

  const Btn = ({ b, solid }) => {
    const isActive = active === b.code;
    return (
      <button style={{
        padding: '12px 4px', borderRadius: 10, border: 'none', cursor: 'pointer',
        background: solid ? b.c : b.c,
        boxShadow: solid ? '0 2px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.12)' : 'inset 0 1px 0 rgba(255,255,255,0.04)',
        outline: isActive ? '2px solid #fff' : 'none',
        outlineOffset: isActive ? '2px' : 0,
        fontFamily: 'var(--f-body)',
      }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{b.cn}</div>
        <div className="sb-display" style={{ fontSize: 9, marginTop: 3,
          color: solid ? 'rgba(255,255,255,0.85)' : (b.accent || 'rgba(255,255,255,0.55)'),
          letterSpacing: '0.14em', fontWeight: 600 }}>{b.en}</div>
      </button>
    );
  };

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {r1.map((b) => <Btn key={b.code} b={b} solid/>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {r2.map((b) => <Btn key={b.code} b={b} solid={false}/>)}
      </div>
    </div>
  );
}

// ─── 共用：底部 footer ────────────────────────────────
function RecFooter() {
  return (
    <div style={{ padding: '12px 14px 16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
      fontSize: 11, color: 'rgba(255,255,255,0.55)', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <span style={{ fontSize: 13 }}>↶</span> 撤回
      </div>
      <div>切換打者</div>
      <div>新打席</div>
    </div>
  );
}

// ─── 共用 shell ─────────────────────────────────────
function RecShell({ children, overlay = null }) {
  return (
    <div className="sb-root" style={{ position: 'absolute', inset: 0, background: 'var(--night)',
      color: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}><IOSStatusBar dark/></div>
      <RecTopBar/>
      {children}
      {overlay}
    </div>
  );
}

// ════════════════════════════════════════════════════════
// 1) 基底 — A · 保守
// ════════════════════════════════════════════════════════
function Screen_RecordA() {
  return (
    <RecShell>
      <RecFieldView/>
      <RecZone3x3 pitches={[
        { cell: 4, kind: 'S', n: 2 },
        { cell: 6, kind: 'B', n: 1 },
      ]} count={3}/>
      <div style={{ flex: 1 }}/>
      <div style={{ padding: '0 14px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
          <span className="sb-display" style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.18em' }}>
            此球結果 · PITCH RESULT
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>第 3 球</span>
        </div>
        <RecResultButtons/>
      </div>
      <RecFooter/>
    </RecShell>
  );
}

// ════════════════════════════════════════════════════════
// 2) 長按格子 → 球種圓盤
// ════════════════════════════════════════════════════════
function Screen_RecordA_Wheel() {
  const wheel = [
    { code: 'FB', name: '快速球' },
    { code: 'CH', name: '變速球' },
    { code: 'SI', name: '伸卡' },
    { code: 'SF', name: '指叉' },
    { code: 'CB', name: '曲球' },
    { code: 'SL', name: '滑球' },
    { code: 'XX', name: '其他' },
  ];
  const R = 108, cx = 130, cy = 130;
  const wedge = (i) => {
    const a0 = (i / wheel.length) * Math.PI * 2 - Math.PI / 2 - Math.PI / wheel.length;
    const a1 = a0 + (Math.PI * 2) / wheel.length;
    const x0 = cx + Math.cos(a0) * R, y0 = cy + Math.sin(a0) * R;
    const x1 = cx + Math.cos(a1) * R, y1 = cy + Math.sin(a1) * R;
    return `M ${cx} ${cy} L ${x0} ${y0} A ${R} ${R} 0 0 1 ${x1} ${y1} Z`;
  };
  const sel = 2; // 伸卡 SI
  const sa = (sel / wheel.length) * Math.PI * 2 - Math.PI / 2;

  const overlay = (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', background: 'rgba(15,20,28,0.5)', backdropFilter: 'blur(2px)' }}>
      <div style={{ marginBottom: 16, padding: '6px 14px', background: 'var(--clay-deep)',
        borderRadius: 999, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--clay-soft)' }}/>
        <span className="sb-display" style={{ fontSize: 11, color: '#fff', letterSpacing: '0.16em' }}>長按位置 · 選擇球種</span>
      </div>

      <div style={{ position: 'relative', width: 260, height: 260, filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.6))' }}>
        <svg width="260" height="260" viewBox="0 0 260 260">
          {wheel.map((w, i) => (
            <path key={i} d={wedge(i)} fill={PITCH_COLORS[w.code]}
              stroke={i === sel ? '#fff' : 'var(--night)'} strokeWidth={i === sel ? 3 : 2}
              opacity={i === sel ? 1 : 0.88}/>
          ))}
          {wheel.map((w, i) => {
            const a = (i / wheel.length) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(a) * 76;
            const y = cy + Math.sin(a) * 76;
            return (
              <g key={`l-${i}`}>
                <text x={x} y={y - 4} textAnchor="middle" fontFamily="var(--f-body)" fontWeight="700" fontSize="13" fill="#fff">{w.name}</text>
                <text x={x} y={y + 11} textAnchor="middle" fontFamily="var(--f-display)" fontWeight="700" fontSize="11" fill="rgba(255,255,255,0.9)" letterSpacing="0.06em">{w.code}</text>
              </g>
            );
          })}
          <circle cx={cx} cy={cy} r="30" fill="var(--night)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
          <text x={cx} y={cy - 2} textAnchor="middle" fontFamily="var(--f-display)" fontSize="9" fill="rgba(255,255,255,0.5)" letterSpacing="0.12em">PITCH</text>
          <text x={cx} y={cy + 12} textAnchor="middle" fontFamily="var(--f-display)" fontSize="11" fontWeight="700" fill="#fff" letterSpacing="0.06em">放開</text>
        </svg>
        <div style={{ position: 'absolute',
          top: cy + Math.sin(sa) * 76 - 22, left: cx + Math.cos(sa) * 76 - 22,
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)', border: '2px solid #fff',
          boxShadow: '0 0 28px rgba(255,255,255,0.5)' }}/>
      </div>

      <div style={{ marginTop: 18, padding: '10px 18px', background: 'var(--night-2)',
        border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
        <PitchSwatch code="SI" size={14}/>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>伸卡</span>
            <span className="sb-display" style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}>SINKER</span>
          </div>
          <div className="sb-display" style={{ fontSize: 10, color: 'var(--clay-soft)', marginTop: 2, letterSpacing: '0.08em' }}>
            EST. 140–145 km/h
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>放開手指確認 · 拖回中央取消</div>
    </div>
  );

  return (
    <RecShell overlay={overlay}>
      <RecFieldView/>
      <RecZone3x3 dim pitches={[{ cell: 4, kind: 'S', n: 2 }, { cell: 6, kind: 'B', n: 1 }]} count={3}/>
      <div style={{ flex: 1 }}/>
      <div style={{ padding: '0 14px', opacity: 0.25, pointerEvents: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
          <span className="sb-display" style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.18em' }}>
            此球結果 · PITCH RESULT
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>第 3 球</span>
        </div>
        <RecResultButtons/>
      </div>
      <div style={{ opacity: 0.25 }}><RecFooter/></div>
    </RecShell>
  );
}

// ════════════════════════════════════════════════════════
// 3) 點擊出 → 擊球類型 Sheet
// ════════════════════════════════════════════════════════
function Screen_RecordA_Batted() {
  const types = [
    { code: 'BUNT', cn: '短打', en: 'BUNT', icon: 'bunt' },
    { code: 'GO',   cn: '滾地', en: 'GROUNDER', icon: 'gnd' },
    { code: 'LD',   cn: '平飛', en: 'LINER', icon: 'line', selected: true },
    { code: 'FB',   cn: '高飛', en: 'FLY BALL', icon: 'fly' },
    { code: 'PU',   cn: '高飛球', en: 'POP UP', icon: 'pop' },
    { code: 'SH',   cn: '直擊', en: 'SHARP', icon: 'sharp' },
  ];
  const renderIcon = (icon) => {
    const stroke = 'rgba(255,255,255,0.85)';
    if (icon === 'bunt') return <path d="M5 24 Q15 18 25 24" stroke={stroke} strokeWidth="2" fill="none" strokeDasharray="2 2"/>;
    if (icon === 'gnd')  return <path d="M3 22 Q9 17 15 22 T 27 22" stroke={stroke} strokeWidth="2" fill="none"/>;
    if (icon === 'line') return <path d="M3 22 L 27 12" stroke={stroke} strokeWidth="2.5" fill="none"/>;
    if (icon === 'fly')  return <path d="M3 24 Q15 4 27 24" stroke={stroke} strokeWidth="2" fill="none"/>;
    if (icon === 'pop')  return <path d="M3 22 Q15 10 27 22" stroke={stroke} strokeWidth="2" fill="none"/>;
    return <g><path d="M3 22 L 27 10" stroke={stroke} strokeWidth="2.5" fill="none"/><path d="M22 10 L 27 10 L 27 15" stroke={stroke} strokeWidth="2" fill="none"/></g>;
  };

  const overlay = (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,20,28,0.55)', backdropFilter: 'blur(2px)' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0,
        background: 'var(--night-2)', borderTopLeftRadius: 22, borderTopRightRadius: 22,
        border: '1px solid rgba(255,255,255,0.08)', borderBottom: 'none',
        padding: '14px 16px 20px',
        boxShadow: '0 -20px 50px rgba(0,0,0,0.5)' }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.2)', margin: '0 auto 12px' }}/>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
          <div>
            <div className="sb-display" style={{ fontSize: 10, color: 'var(--clay-soft)', letterSpacing: '0.18em' }}>BATTED BALL TYPE</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginTop: 2 }}>擊球類型</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="sb-display" style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.14em' }}>本打席 · 擊出</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>下一步 · 標示落點</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10, marginBottom: 14 }}>
          <Chip tone="strike" solid>S · CALL B</Chip>
          <Chip tone="clay" solid><PitchSwatch code="FB" size={6}/> FB · 快速球</Chip>
          <Chip tone="ghostDark">148 km/h</Chip>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {types.map((t) => (
            <div key={t.code} style={{
              padding: 10, borderRadius: 12,
              background: t.selected ? 'rgba(194,76,47,0.18)' : 'rgba(255,255,255,0.03)',
              border: `1.5px solid ${t.selected ? 'var(--ball)' : 'rgba(255,255,255,0.08)'}`,
            }}>
              <svg width="30" height="28" viewBox="0 0 30 28">
                <line x1="0" y1="26" x2="30" y2="26" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                {renderIcon(t.icon)}
              </svg>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginTop: 4 }}>{t.cn}</div>
              <div className="sb-display" style={{ fontSize: 9, letterSpacing: '0.12em', marginTop: 2,
                color: t.selected ? 'var(--ball-soft)' : 'rgba(255,255,255,0.45)' }}>{t.en}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 8 }}>
          <button style={{ padding: '11px 0', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)',
            background: 'transparent', color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 600 }}>取消</button>
          <button style={{ padding: '11px 0', borderRadius: 12, border: 'none',
            background: 'var(--ball)', color: '#fff', fontSize: 13, fontWeight: 700,
            boxShadow: '0 4px 12px rgba(194,76,47,0.4)' }}>下一步 · 標示落點 →</button>
        </div>
      </div>
    </div>
  );

  return (
    <RecShell overlay={overlay}>
      <RecFieldView hits={[{ x: 220, y: 80, type: 'single' }]}/>
      <RecZone3x3 dim pitches={[{ cell: 4, kind: 'IP', n: 3 }]} count={3}/>
      <div style={{ flex: 1 }}/>
      <div style={{ padding: '0 14px', opacity: 0.2 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
          <span className="sb-display" style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.18em' }}>
            此球結果 · PITCH RESULT
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>第 3 球</span>
        </div>
        <RecResultButtons active="IP"/>
      </div>
      <div style={{ opacity: 0.2 }}><RecFooter/></div>
    </RecShell>
  );
}

// ════════════════════════════════════════════════════════
// 4) 長按落點 → 結果 popover
// ════════════════════════════════════════════════════════
function Screen_RecordA_Result() {
  const opts = [
    { code: '1B', cn: '一安', en: 'SINGLE',  c: '#5B8CDB' },
    { code: '2B', cn: '二安', en: 'DOUBLE',  c: 'var(--grass-soft)' },
    { code: '3B', cn: '三安', en: 'TRIPLE',  c: 'var(--warn)' },
    { code: 'HR', cn: '全壘打', en: 'HOMERUN', c: 'var(--ball)' },
    { code: 'OUT', cn: '出局', en: 'OUT',     c: 'rgba(180,180,180,0.7)' },
    { code: 'E',  cn: '失誤', en: 'ERROR',   c: 'var(--warn-soft)' },
  ];

  const overlay = (
    <div style={{ position: 'absolute', top: 96, left: 14, right: 14, height: 230, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', top: 20, left: 244, width: 36, height: 36, borderRadius: '50%',
        background: 'rgba(255,255,255,0.2)', border: '2px solid #fff',
        boxShadow: '0 0 24px rgba(255,255,255,0.4)' }}/>
      <div style={{ position: 'absolute', top: 36, left: 256, width: 8, height: 8, borderRadius: '50%',
        background: 'var(--ball)', boxShadow: '0 0 10px var(--ball)' }}/>

      <div style={{ position: 'absolute', top: 70, left: 40, width: 240,
        background: 'var(--night-2)', borderRadius: 14, padding: 12,
        border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.6)' }}>
        <div style={{ position: 'absolute', top: -8, left: 200, width: 14, height: 14, transform: 'rotate(45deg)',
          background: 'var(--night-2)', borderTop: '1px solid rgba(255,255,255,0.1)', borderLeft: '1px solid rgba(255,255,255,0.1)' }}/>
        <div className="sb-display" style={{ fontSize: 9, color: 'var(--clay-soft)', letterSpacing: '0.18em', marginBottom: 8 }}>
          選擇結果 · CHOOSE RESULT
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {opts.map((o) => (
            <button key={o.code} style={{
              padding: '8px 4px', borderRadius: 9, cursor: 'pointer',
              background: 'rgba(255,255,255,0.04)',
              border: `1.5px solid ${o.c}`,
              color: '#fff', fontFamily: 'var(--f-body)',
            }}>
              <div style={{ fontSize: 12, fontWeight: 700 }}>{o.cn}</div>
              <div className="sb-display" style={{ fontSize: 8, color: o.c, marginTop: 1, letterSpacing: '0.08em' }}>{o.en}</div>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 10, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.06)',
          fontSize: 10, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
          已標記落點 · 右外野
        </div>
      </div>
    </div>
  );

  return (
    <RecShell overlay={overlay}>
      <RecFieldView hits={[{ x: 260, y: 60, type: 'single' }]}/>
      <RecZone3x3 dim pitches={[{ cell: 4, kind: 'IP', n: 3 }]} count={3}/>
      <div style={{ flex: 1 }}/>
      <div style={{ padding: '0 14px', opacity: 0.3 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
          <span className="sb-display" style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.18em' }}>
            此球結果 · PITCH RESULT
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>第 3 球</span>
        </div>
        <RecResultButtons/>
      </div>
      <div style={{ opacity: 0.3 }}><RecFooter/></div>
    </RecShell>
  );
}

// ════════════════════════════════════════════════════════
// 5) ⋯ 本場操作選單
// ════════════════════════════════════════════════════════
function Screen_RecordA_Menu() {
  const items = [
    { icon: '⇄', cn: '更換代打', en: 'PINCH HITTER', desc: '上一個代打 / 取消打打', highlight: true },
    { icon: '◎', cn: '更換投手', en: 'PITCHING CHANGE', desc: '記錄前投手場上情況' },
    { icon: '⏹', cn: '比賽結束', en: 'END GAME', desc: '進入比賽結算頁面' },
  ];

  const overlay = (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,20,28,0.5)' }}>
      <div style={{ position: 'absolute', top: 84, right: 14, width: 250,
        background: 'var(--night-2)', borderRadius: 14, padding: 6,
        border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.6)' }}>
        <div style={{ position: 'absolute', top: -7, right: 14, width: 12, height: 12, transform: 'rotate(45deg)',
          background: 'var(--night-2)', borderTop: '1px solid rgba(255,255,255,0.1)', borderLeft: '1px solid rgba(255,255,255,0.1)' }}/>
        <div className="sb-display" style={{ fontSize: 9, color: 'var(--clay-soft)', letterSpacing: '0.18em',
          padding: '8px 10px 4px' }}>本場操作 · GAME ACTIONS</div>
        {items.map((it, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 10px', borderRadius: 10, cursor: 'pointer',
            background: it.highlight ? 'rgba(185,119,68,0.16)' : 'transparent',
            border: it.highlight ? '1px solid var(--clay)' : '1px solid transparent',
          }}>
            <div style={{ width: 30, height: 30, borderRadius: 8,
              background: it.highlight ? 'var(--clay)' : 'rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, color: '#fff' }}>{it.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{it.cn}</span>
                <span className="sb-display" style={{ fontSize: 9, color: 'var(--clay-soft)', letterSpacing: '0.12em' }}>{it.en}</span>
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>{it.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <RecShell overlay={overlay}>
      <RecFieldView/>
      <RecZone3x3 dim pitches={[{ cell: 4, kind: 'S', n: 2 }, { cell: 6, kind: 'B', n: 1 }]} count={3}/>
      <div style={{ flex: 1 }}/>
      <div style={{ padding: '0 14px', opacity: 0.2 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
          <span className="sb-display" style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.18em' }}>
            此球結果 · PITCH RESULT
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>第 3 球</span>
        </div>
        <RecResultButtons/>
      </div>
      <div style={{ opacity: 0.2 }}><RecFooter/></div>
    </RecShell>
  );
}

Object.assign(window, {
  Screen_RecordA,
  Screen_RecordA_Wheel,
  Screen_RecordA_Batted,
  Screen_RecordA_Result,
  Screen_RecordA_Menu,
});

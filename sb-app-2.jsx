/* sb-app-2.jsx — Game result screens (RecordA/B moved to sb-record.jsx) */

// (legacy — unused) 3A. 記錄畫面 · 保守 Conservative
function Screen_RecordA_LEGACY() {
  return (
    <div className="sb-root sb-chalk-bg" style={{ position: 'absolute', inset: 0, background: 'var(--night)', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}><IOSStatusBar dark /></div>

      {/* top scoreboard */}
      <div style={{ paddingTop: 56, padding: '56px 14px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <button style={{ border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff',
            width: 30, height: 30, borderRadius: 8 }}>✕</button>
          <div style={{ textAlign: 'center' }}>
            <div className="sb-display" style={{ fontSize: 9, color: 'var(--clay-soft)', letterSpacing: '0.18em' }}>● REC · LIVE</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>VS 台中神龍</div>
          </div>
          <button style={{ border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff',
            width: 30, height: 30, borderRadius: 8, fontSize: 18 }}>⋯</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px',
          background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>樹德</div>
            <div className="sb-num" style={{ fontSize: 28 }}>4</div>
          </div>
          <div style={{ textAlign: 'center', flex: 1.2 }}>
            <Chip tone="clay" solid>T 6局上</Chip>
            <div className="sb-display" style={{ fontSize: 11, marginTop: 4, color: 'rgba(255,255,255,0.7)' }}>2 OUT · 1B</div>
          </div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>神龍</div>
            <div className="sb-num" style={{ fontSize: 28 }}>2</div>
          </div>
        </div>
      </div>

      {/* current batter card */}
      <div style={{ padding: '0 14px' }}>
        <div style={{ padding: '10px 12px', background: 'var(--night-2)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="sb-display" style={{ fontSize: 26, fontWeight: 700, color: 'var(--clay-soft)', minWidth: 38 }}>#23</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>王立祥</span>
              <Chip tone="grass" solid>1B</Chip>
              <Chip tone="ghostDark">R</Chip>
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>本場 1-2 (1H, 1BB) · 季 .356 / 12HR</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="sb-display" style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>B-S</div>
            <div className="sb-num" style={{ fontSize: 18 }}>2-1</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        {/* strike zone */}
        <ZoneInput pitches={[
          { x: 100, y: 100, type: 'FB', n: 1 },
          { x: 145, y: 75, type: 'SL', n: 2 },
          { x: 60, y: 130, type: 'CH', n: 3 },
        ]} size={210} />

        {/* legend */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['FB', 'SI', 'SL', 'CB', 'CH', 'SF'].map((p) => (
            <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <PitchSwatch code={p} />
              <span className="sb-display" style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{p}</span>
            </div>
          ))}
        </div>

        {/* PA log strip */}
        <div style={{ alignSelf: 'stretch' }}>
          <div className="sb-display" style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.16em', marginBottom: 6 }}>本打席 PITCH LOG</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { n: 1, type: 'FB', sp: 148, r: 'B' },
              { n: 2, type: 'SL', sp: 137, r: 'S' },
              { n: 3, type: 'CH', sp: 128, r: 'B' },
            ].map((p) => (
              <div key={p.n} style={{ flex: 1, padding: '6px 4px', background: 'rgba(255,255,255,0.04)', borderRadius: 8, textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)' }}>P{p.n}</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 3, alignItems: 'center', marginTop: 2 }}>
                  <PitchSwatch code={p.type} size={8} />
                  <span className="sb-display" style={{ fontSize: 11, fontWeight: 700 }}>{p.type}</span>
                </div>
                <div className="sb-num" style={{ fontSize: 13, marginTop: 2 }}>{p.sp}</div>
                <Chip tone={p.r === 'S' ? 'strike' : 'ball'} solid style={{ fontSize: 9, padding: '1px 5px', marginTop: 2 }}>{p.r}</Chip>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* bottom action bar */}
      <div style={{ padding: '10px 12px 14px', background: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        {/* row 1: pitch speed */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div className="sb-display" style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', width: 32 }}>SPD</div>
          <button style={{ width: 30, height: 30, borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 16 }}>−5</button>
          <div style={{ flex: 1, padding: '6px 12px', background: 'rgba(255,255,255,0.06)', borderRadius: 10, textAlign: 'center' }}>
            <span className="sb-num" style={{ fontSize: 24 }}>147</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginLeft: 4 }}>km/h</span>
          </div>
          <button style={{ width: 30, height: 30, borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 16 }}>+5</button>
        </div>
        {/* row 2: result */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 5 }}>
          {[
            { l: '看球', t: 'S-L', c: 'var(--strike)' },
            { l: '揮空', t: 'S-S', c: 'var(--strike)' },
            { l: '界外', t: 'F',   c: 'var(--warn)' },
            { l: '壞球', t: 'B',   c: 'var(--ball)' },
            { l: '觸身', t: 'HBP', c: 'var(--warn)' },
            { l: '擊出', t: 'IP',  c: 'var(--clay)' },
          ].map((r) => (
            <button key={r.t} style={{ padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
              background: r.c, color: '#fff', fontFamily: 'var(--f-body)', fontSize: 12, fontWeight: 700 }}>
              <div className="sb-display" style={{ fontSize: 9, opacity: 0.7 }}>{r.t}</div>
              <div style={{ fontSize: 13, marginTop: 1 }}>{r.l}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// (legacy — unused) 3B. 記錄畫面 · 進階 Advanced
function Screen_RecordB_LEGACY() {
  // pitch wheel slice — 7 sections
  const wheel = [
    { code: 'FB', name: '快速球', sp: '145+' },
    { code: 'CH', name: '變速球', sp: '125-35' },
    { code: 'SI', name: '伸卡', sp: '140-45' },
    { code: 'SF', name: '指叉', sp: '130-40' },
    { code: 'CB', name: '曲球', sp: '115-25' },
    { code: 'SL', name: '滑球', sp: '130-40' },
    { code: 'XX', name: '其他', sp: '—' },
  ];
  const R = 110;
  const cx = 130, cy = 130;
  const wedge = (i) => {
    const a0 = (i / wheel.length) * Math.PI * 2 - Math.PI / 2 - Math.PI / wheel.length;
    const a1 = a0 + (Math.PI * 2) / wheel.length;
    const x0 = cx + Math.cos(a0) * R, y0 = cy + Math.sin(a0) * R;
    const x1 = cx + Math.cos(a1) * R, y1 = cy + Math.sin(a1) * R;
    return `M ${cx} ${cy} L ${x0} ${y0} A ${R} ${R} 0 0 1 ${x1} ${y1} Z`;
  };

  return (
    <div className="sb-root" style={{ position: 'absolute', inset: 0, background: 'var(--night)', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}><IOSStatusBar dark /></div>

      <div style={{ paddingTop: 56, padding: '56px 12px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button style={{ border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', width: 30, height: 30, borderRadius: 8 }}>‹</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Chip tone="ball" solid>● 進階</Chip>
          <Chip tone="ghostDark">T 6上 · 2 OUT</Chip>
        </div>
        <button style={{ border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', width: 30, height: 30, borderRadius: 8, fontSize: 18 }}>⋯</button>
      </div>

      {/* dim backdrop with strike zone */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.25 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
            <ZoneInput pitches={[]} size={200} />
          </div>
        </div>

        {/* pitch wheel */}
        <div style={{ position: 'relative', width: 260, height: 260, filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))' }}>
          <svg width="260" height="260" viewBox="0 0 260 260">
            {wheel.map((w, i) => (
              <g key={i}>
                <path d={wedge(i)} fill={PITCH_COLORS[w.code]} stroke="var(--night)" strokeWidth="2" opacity="0.95"/>
              </g>
            ))}
            {/* labels */}
            {wheel.map((w, i) => {
              const a = (i / wheel.length) * Math.PI * 2 - Math.PI / 2;
              const x = cx + Math.cos(a) * 76;
              const y = cy + Math.sin(a) * 76;
              return (
                <g key={`l-${i}`}>
                  <text x={x} y={y - 2} textAnchor="middle" fontFamily="var(--f-display)" fontWeight="700" fontSize="14" fill="#fff">{w.code}</text>
                  <text x={x} y={y + 11} textAnchor="middle" fontFamily="var(--f-body)" fontSize="9" fill="rgba(255,255,255,0.9)">{w.name}</text>
                </g>
              );
            })}
            {/* center hub */}
            <circle cx={cx} cy={cy} r="26" fill="var(--night)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
            <text x={cx} y={cy - 1} textAnchor="middle" fontFamily="var(--f-display)" fontSize="9" fill="rgba(255,255,255,0.5)" letterSpacing="0.1em">球種</text>
            <text x={cx} y={cy + 12} textAnchor="middle" fontFamily="var(--f-display)" fontWeight="700" fontSize="11" fill="#fff">放開</text>
          </svg>
          {/* indicator finger */}
          <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', border: '2px solid #fff', boxShadow: '0 0 24px rgba(255,255,255,0.6)' }}/>
        </div>
      </div>

      {/* hint */}
      <div style={{ textAlign: 'center', padding: '8px 24px', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
        長按好球帶後拖曳至球種,放開選擇
      </div>

      {/* compact action row */}
      <div style={{ padding: '12px 12px 18px', display: 'flex', gap: 6 }}>
        {['看球', '揮空', '界外', '壞球', '擊出'].map((l, i) => (
          <button key={i} style={{ flex: 1, padding: 12, border: 'none', borderRadius: 12, background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 13, fontWeight: 600 }}>{l}</button>
        ))}
      </div>
    </div>
  );
}

// ═══════════════ 4. 比賽結算 · 打者統計 ═══════════════
function Screen_Result() {
  return (
    <div className="sb-root" style={{ position: 'absolute', inset: 0, background: 'var(--night)', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}><IOSStatusBar dark /></div>

      {/* nav */}
      <div style={{ paddingTop: 56, padding: '56px 14px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button style={{ border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', width: 30, height: 30, borderRadius: 8 }}>‹</button>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>05/14 (二)</div>
        <button style={{ border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', width: 30, height: 30, borderRadius: 8 }}>⤴</button>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '8px 14px 28px' }}>
        {/* scoreboard banner */}
        <div style={{ position: 'relative', background: 'linear-gradient(135deg, #16263A 0%, #0F1922 100%)', borderRadius: 16, padding: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ position: 'absolute', top: 8, right: 12 }}>
            <div style={{ transform: 'rotate(8deg)', border: '2px solid var(--ball)', color: 'var(--ball)', padding: '3px 10px', borderRadius: 4, fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 13, letterSpacing: '0.12em' }}>FINAL</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <Chip tone="strike" solid>WIN</Chip>
              <div className="sb-display" style={{ fontSize: 18, fontWeight: 700, marginTop: 6 }}>樹德高中</div>
              <div className="sb-num" style={{ fontSize: 52, fontWeight: 700, color: '#fff', lineHeight: 1 }}>7</div>
            </div>
            <div className="sb-display" style={{ fontSize: 18, color: 'rgba(255,255,255,0.3)' }}>—</div>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <Chip tone="ghostDark">LOSS</Chip>
              <div className="sb-display" style={{ fontSize: 18, marginTop: 6, color: 'rgba(255,255,255,0.7)' }}>台南獅子</div>
              <div className="sb-num" style={{ fontSize: 52, fontWeight: 700, color: 'rgba(255,255,255,0.55)', lineHeight: 1 }}>3</div>
            </div>
          </div>
          <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '40px repeat(9, 1fr) 30px 30px 30px', gap: 0, fontSize: 10, fontFamily: 'var(--f-display)' }}>
            {['', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'R', 'H', 'E'].map((c, i) => (
              <div key={i} style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '4px 0' }}>{c}</div>
            ))}
            {['樹', 1, 0, 2, 0, 1, 3, 0, 0, 'X', 7, 9, 1].map((c, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '4px 0',
                background: i === 0 ? 'transparent' : i >= 10 ? 'rgba(255,255,255,0.04)' : 'transparent',
                fontWeight: i === 0 || i >= 10 ? 700 : 500, color: i === 0 ? 'var(--clay-soft)' : '#fff' }}>{c}</div>
            ))}
            {['獅', 0, 1, 0, 0, 0, 1, 1, 0, 0, 3, 6, 2].map((c, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '4px 0',
                background: i === 0 ? 'transparent' : i >= 10 ? 'rgba(255,255,255,0.04)' : 'transparent',
                fontWeight: i === 0 || i >= 10 ? 700 : 500, color: i === 0 ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.85)' }}>{c}</div>
            ))}
          </div>
        </div>

        {/* segmented team + sub-tab */}
        <div style={{ marginTop: 14, padding: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 10, display: 'flex' }}>
          {['我方 樹德', '對方 獅子'].map((t, i) => (
            <button key={i} style={{ flex: 1, padding: 8, border: 'none', borderRadius: 8,
              background: i === 0 ? 'var(--clay)' : 'transparent', color: '#fff', fontWeight: 700, fontSize: 12 }}>{t}</button>
          ))}
        </div>

        <div style={{ marginTop: 10 }}>
          <Tabs items={['打者統計', '投手統計']} active={0} dark />
        </div>

        {/* batter stats table */}
        <div style={{ marginTop: 12, background: 'var(--night-2)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(8, 28px)', padding: '8px 10px',
            fontSize: 10, fontFamily: 'var(--f-display)', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div>打者</div>
            {['AB', 'R', 'H', 'RBI', 'BB', 'K', 'AVG', 'OPS'].map((c, i) => <div key={i} style={{ textAlign: 'right' }}>{c}</div>)}
          </div>
          {[
            { n: 7, name: '陳俊安', stats: [4, 2, 2, 1, 1, 0, .342, .891] },
            { n: 11, name: '張庭瑋', stats: [4, 1, 1, 0, 0, 1, .298, .742] },
            { n: 23, name: '王立祥', stats: [3, 1, 2, 3, 1, 0, .356, .998], hot: true },
            { n: 9, name: '林志強', stats: [4, 1, 1, 2, 0, 1, .312, .823] },
            { n: 18, name: '吳浩然', stats: [3, 1, 1, 0, 1, 1, .275, .701] },
            { n: 4, name: '陳家豪', stats: [4, 0, 1, 0, 0, 2, .244, .622] },
            { n: 21, name: '林宇翔', stats: [3, 0, 0, 0, 0, 1, .268, .668] },
            { n: 6, name: '黃子昕', stats: [3, 0, 1, 1, 0, 0, .221, .598] },
            { n: 14, name: '蔡承恩', stats: [3, 1, 0, 0, 1, 1, .255, .642] },
          ].map((p, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr repeat(8, 28px)', padding: '8px 10px',
              fontSize: 11, alignItems: 'center', borderTop: i ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span className="sb-display" style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', width: 18 }}>#{p.n}</span>
                <span style={{ fontWeight: 600 }}>{p.name}</span>
                {p.hot && <span style={{ fontSize: 9, color: 'var(--ball)' }}>●</span>}
              </div>
              {p.stats.slice(0, 6).map((v, j) => (
                <div key={j} className="sb-num" style={{ textAlign: 'right', color: 'rgba(255,255,255,0.85)' }}>{v}</div>
              ))}
              <div className="sb-num" style={{ textAlign: 'right', color: '#fff', fontWeight: 700 }}>{p.stats[6].toFixed(3).slice(1)}</div>
              <div className="sb-num" style={{ textAlign: 'right', color: '#fff', fontWeight: 700 }}>{p.stats[7].toFixed(3).slice(1)}</div>
            </div>
          ))}
        </div>

        <button style={{ marginTop: 12, width: '100%', padding: 12, borderRadius: 12, border: 'none',
          background: 'var(--clay)', color: '#fff', fontWeight: 700, fontSize: 13 }}>查看球探報告 →</button>
      </div>
    </div>
  );
}

// ═══════════════ 4b. 比賽結算 · 投手統計 ═══════════════
function Screen_ResultPitcher() {
  const pitchers = [
    { role: 'SP', n: 18, name: '林建宏', ip: '6.1', bf: 26, np: 89, k: 8, bb: 2, h: 4, er: 1, era: 1.42 },
    { role: 'RP', n: 25, name: '吳明翰', ip: '1.2', bf: 7, np: 22, k: 2, bb: 0, h: 1, er: 0, era: 0.00 },
    { role: 'CP', n: 33, name: '張子凡', ip: '1.0', bf: 4, np: 14, k: 1, bb: 1, h: 1, er: 0, era: 2.84 },
  ];
  return (
    <div className="sb-root" style={{ position: 'absolute', inset: 0, background: 'var(--night)', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}><IOSStatusBar dark /></div>
      <div style={{ paddingTop: 56, padding: '56px 14px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button style={{ border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', width: 30, height: 30, borderRadius: 8 }}>‹</button>
        <div style={{ fontSize: 13, fontWeight: 700 }}>05/14 (二) · 投手</div>
        <div style={{ width: 30 }}/>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '6px 14px 28px' }}>
        {/* compact banner */}
        <div style={{ padding: 12, background: 'var(--night-2)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <Chip tone="strike" solid>WIN 7-3</Chip>
            <div style={{ marginTop: 4, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>VS 台南獅子 · 主場</div>
          </div>
          <div className="sb-num" style={{ fontSize: 28, color: '#fff' }}>9 IP</div>
        </div>

        <div style={{ marginTop: 12 }}>
          <Tabs items={['打者統計', '投手統計']} active={1} dark />
        </div>

        {/* pitcher table */}
        <div style={{ marginTop: 12, background: 'var(--night-2)', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 32px 30px 30px 24px 24px 24px 30px',
            padding: '8px 10px', fontSize: 10, fontFamily: 'var(--f-display)', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em',
            borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div>投手</div>
            {['IP', 'BF', 'NP', 'K', 'BB', 'H', 'ERA'].map((c, i) => <div key={i} style={{ textAlign: 'right' }}>{c}</div>)}
          </div>
          {pitchers.map((p, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 32px 30px 30px 24px 24px 24px 30px',
              padding: '10px 10px', fontSize: 11, alignItems: 'center',
              borderTop: i ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Chip tone={p.role === 'SP' ? 'clay' : p.role === 'CP' ? 'ball' : 'grass'} solid style={{ fontSize: 9 }}>{p.role}</Chip>
                <span className="sb-display" style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>#{p.n}</span>
                <span style={{ fontWeight: 600 }}>{p.name}</span>
              </div>
              <div className="sb-num" style={{ textAlign: 'right' }}>{p.ip}</div>
              <div className="sb-num" style={{ textAlign: 'right' }}>{p.bf}</div>
              <div className="sb-num" style={{ textAlign: 'right' }}>{p.np}</div>
              <div className="sb-num" style={{ textAlign: 'right', color: 'var(--strike-soft)', fontWeight: 700 }}>{p.k}</div>
              <div className="sb-num" style={{ textAlign: 'right' }}>{p.bb}</div>
              <div className="sb-num" style={{ textAlign: 'right' }}>{p.h}</div>
              <div className="sb-num" style={{ textAlign: 'right', fontWeight: 700 }}>{p.era.toFixed(2)}</div>
            </div>
          ))}
        </div>

        {/* drawer-style summary */}
        <div style={{ marginTop: 14, padding: 14, background: 'var(--night-2)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div>
              <div className="sb-display" style={{ fontSize: 9, color: 'var(--clay-soft)', letterSpacing: '0.16em' }}>SP · 林建宏</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>今日投球摘要</div>
            </div>
            <Chip tone="grass" solid>QS</Chip>
          </div>

          {/* pitch distribution */}
          <div style={{ marginBottom: 12 }}>
            <div className="sb-display" style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.14em', marginBottom: 4 }}>球種分佈</div>
            <div style={{ display: 'flex', height: 22, borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: '52%', background: 'var(--pitch-fb)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>FB 52%</div>
              <div style={{ width: '28%', background: 'var(--pitch-sl)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>SL 28%</div>
              <div style={{ width: '20%', background: 'var(--pitch-ch)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>CH 20%</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { l: '均速 FB', v: '148', s: 'km/h' },
              { l: '空振數', v: '14', s: '空振率 16%' },
              { l: '好球率', v: '64%', s: 'NP 89' },
            ].map((k, i) => (
              <div key={i} style={{ padding: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
                <div className="sb-display" style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em' }}>{k.l}</div>
                <div className="sb-num" style={{ fontSize: 22, marginTop: 2 }}>{k.v}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{k.s}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 10, fontSize: 11, color: 'rgba(255,255,255,0.7)', lineHeight: 1.55, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            被打 <b>5 支</b>(3 滾地 / 1 平飛 / 1 高飛) · BABIP <span className="sb-num">.227</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Screen_Result, Screen_ResultPitcher });

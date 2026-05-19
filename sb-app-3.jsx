/* sb-app-3.jsx — Players browse + Batter scout report (6 sections) */

// ═══════════════ 6. 球員資料庫 ═══════════════
function Screen_Players() {
  const teams = [
    {
      name: '樹德高中 · 我方', rank: '#2', count: 21, accent: 'var(--clay)',
      players: [
        { n: 23, pos: '1B', name: '王立祥', s: 'R', avg: '.356', ops: '.998', hot: true, note: '本季新高' },
        { n: 7,  pos: 'CF', name: '陳俊安', s: 'L', avg: '.342', ops: '.891', hot: false },
        { n: 18, pos: 'P/SP', name: '林建宏', s: 'R', avg: '—', ops: 'ERA 2.87', hot: false, isP: true },
        { n: 9,  pos: 'DH', name: '林志強', s: 'L', avg: '.312', ops: '.823', hot: false },
      ],
    },
    {
      name: '台南獅子', rank: '#5', count: 18, accent: 'var(--ink)',
      players: [
        { n: 21, pos: 'SS', name: '陳信宇', s: 'R', avg: '.288', ops: '.752', hot: false },
        { n: 11, pos: 'P/SP', name: '陳冠樺', s: 'R', avg: '—', ops: 'ERA 3.15', hot: false, isP: true, note: '對左 OPS .892' },
      ],
    },
    {
      name: '高雄海豚', rank: '#1', count: 22, accent: 'var(--grass)',
      players: [
        { n: 4, pos: 'CF', name: '黃柏睿', s: 'L', avg: '.378', ops: '1.022', hot: true },
      ],
    },
  ];
  return (
    <div className="sb-root sb-paper-bg" style={{ position: 'absolute', inset: 0, background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}><IOSStatusBar /></div>

      <div style={{ paddingTop: 56, padding: '56px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button style={{ border: 'none', background: 'transparent', fontSize: 14 }}>‹</button>
          <div style={{ fontSize: 13, fontWeight: 700 }}>球員資料庫</div>
          <button style={{ border: 'none', background: 'transparent', fontSize: 14 }}>⊕</button>
        </div>
        <div className="sb-display" style={{ fontSize: 28, fontWeight: 700, marginTop: 10 }}>球員</div>
        <div style={{ fontSize: 11, color: 'rgba(27,34,48,0.55)' }}>248 位球員 · 12 支隊伍</div>

        {/* search */}
        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
          background: 'var(--chalk)', borderRadius: 12, border: '1px solid rgba(27,34,48,0.08)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="6" cy="6" r="4.5" fill="none" stroke="rgba(27,34,48,0.5)" strokeWidth="1.5"/><path d="M10 10l3 3" stroke="rgba(27,34,48,0.5)" strokeWidth="1.5"/></svg>
          <input placeholder="搜尋姓名、背號、隊伍" style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: 'var(--ink)' }}/>
          <Chip tone="ghost">⌥ 篩選</Chip>
        </div>

        {/* team chips */}
        <div style={{ display: 'flex', gap: 6, marginTop: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {[
            { l: '全部 248', sel: true },
            { l: '⭐ 收藏 23' },
            { l: '我方 21' },
            { l: '台南獅子 18' },
            { l: '高雄海豚 22' },
            { l: '台中神龍 19' },
          ].map((c, i) => (
            <button key={i} style={{ flex: '0 0 auto', padding: '5px 10px', border: 'none', borderRadius: 999,
              background: c.sel ? 'var(--ink)' : 'var(--chalk)',
              color: c.sel ? '#fff' : 'var(--ink)',
              fontSize: 11, fontWeight: 600, border: c.sel ? 'none' : '1px solid rgba(27,34,48,0.1)' }}>
              {c.l}
            </button>
          ))}
        </div>
      </div>

      {/* team groups */}
      <div style={{ flex: 1, overflow: 'auto', padding: '12px 16px 100px' }}>
        {teams.map((t, ti) => (
          <div key={ti} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 4px' }}>
              <div style={{ width: 4, height: 18, borderRadius: 2, background: t.accent }}/>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{t.name}</div>
              <Chip tone="ghost">{t.rank}</Chip>
              <span style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(27,34,48,0.5)' }}>{t.count} 位</span>
            </div>
            <div style={{ background: 'var(--chalk)', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(27,34,48,0.06)' }}>
              {t.players.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '10px 12px',
                  borderTop: i ? '1px solid rgba(27,34,48,0.06)' : 'none', gap: 8 }}>
                  <div className="sb-display" style={{ width: 32, color: 'var(--clay-deep)', fontWeight: 700, fontSize: 16 }}>#{p.n}</div>
                  <Chip tone={p.isP ? 'ball' : 'ink'} solid={p.isP} style={{ width: 46, justifyContent: 'center' }}>{p.pos}</Chip>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</span>
                      {p.hot && <Chip tone="hot" solid style={{ fontSize: 9, padding: '1px 5px' }} className="sb-hot">HOT</Chip>}
                    </div>
                    {p.note && <div style={{ fontSize: 10, color: 'rgba(27,34,48,0.5)', marginTop: 1 }}>{p.note}</div>}
                  </div>
                  <div style={{ width: 18, height: 18, borderRadius: 4,
                    background: p.s === 'L' ? 'var(--pitch-sl)' : p.s === 'S' ? 'var(--warn)' : 'var(--clay-deep)',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 10 }}>{p.s}</div>
                  <div style={{ textAlign: 'right', minWidth: 60 }}>
                    <div className="sb-num" style={{ fontSize: 14 }}>{p.avg}</div>
                    <div style={{ fontSize: 10, color: 'rgba(27,34,48,0.55)' }}>{p.ops}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════ 7. 球員球探報告 · 打者版 (6 區塊) ═══════════════
function Screen_BatterReport() {
  return (
    <div className="sb-root" style={{ position: 'absolute', inset: 0, background: 'var(--night)', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}><IOSStatusBar dark /></div>

      {/* sticky-ish nav */}
      <div style={{ paddingTop: 56, padding: '56px 14px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button style={{ border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', width: 30, height: 30, borderRadius: 8 }}>‹</button>
        <div className="sb-display" style={{ fontSize: 10, color: 'var(--clay-soft)', letterSpacing: '0.2em' }}>SCOUT REPORT</div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button style={{ border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', width: 30, height: 30, borderRadius: 8 }}>☆</button>
          <button style={{ border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', width: 30, height: 30, borderRadius: 8, fontSize: 18 }}>⋯</button>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* player header card */}
        <div style={{ margin: '6px 14px 0', borderRadius: 16, padding: 16, position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(135deg, #1F2937 0%, #0F141C 100%)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <JerseyWatermark num={23} />
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span className="sb-display" style={{ fontSize: 18, color: 'var(--clay-soft)', fontWeight: 700 }}>#23</span>
            <span className="sb-display" style={{ fontSize: 28, fontWeight: 700 }}>王立祥</span>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
            <Chip tone="grass" solid>1B</Chip>
            <Chip tone="ghostDark">R 右打</Chip>
            <Chip tone="ghostDark">183cm · 82kg</Chip>
            <Chip tone="hot" solid className="sb-hot">HOT</Chip>
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 6 }}>樹德高中 · 高三 · 2026 春季賽</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginTop: 14, position: 'relative' }}>
            {[
              { l: 'AVG', v: '.356' },
              { l: 'OBP', v: '.432' },
              { l: 'SLG', v: '.566' },
              { l: 'OPS', v: '.998' },
              { l: 'HR', v: '12' },
              { l: 'SB', v: '8' },
            ].map((k, i) => (
              <div key={i}>
                <div className="sb-display" style={{ fontSize: 8, color: 'var(--clay-soft)', letterSpacing: '0.14em' }}>{k.l}</div>
                <div className="sb-num" style={{ fontSize: 18, marginTop: 2 }}>{k.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* sticky tabs */}
        <div style={{ padding: '12px 14px 0', position: 'sticky', top: 0, background: 'var(--night)', zIndex: 4 }}>
          <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 6 }}>
            {['全部', '九宮格', '球種', '左右投', '球數', '落點', 'AI 分析'].map((t, i) => (
              <button key={i} style={{ flex: '0 0 auto', padding: '6px 12px', borderRadius: 999, border: 'none', cursor: 'pointer',
                background: i === 0 ? 'var(--clay)' : 'rgba(255,255,255,0.06)',
                color: '#fff', fontSize: 11, fontWeight: 600 }}>{t}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: '6px 14px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* ① 九宮格打擊率 */}
          <Card dark padding={14}>
            <SectionHead num="01" label="九宮格打擊率" sub="不同進壘位置的打擊率 · 184 球" />
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <StrikeZone3x3 data={[
                [{ v: 0.31, n: 14 }, { v: 0.38, n: 22 }, { v: 0.22, n: 18 }],
                [{ v: 0.42, n: 18 }, { v: 0.51, n: 28 }, { v: 0.18, n: 20 }],
                [{ v: 0.28, n: 16 }, { v: 0.35, n: 22 }, { v: 0.12, n: 26 }],
              ]} dark size={170}/>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div className="sb-display" style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em' }}>圖例</div>
                {[
                  { c: '#3D6B8C', l: '冷 < .200' },
                  { c: '#7BB58F', l: '溫 .200–.300' },
                  { c: '#C7912A', l: '熱 .300–.400' },
                  { c: '#C24C2F', l: '燒 > .400' },
                ].map((g, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10 }}>
                    <span style={{ width: 12, height: 12, background: g.c, borderRadius: 2 }}/>
                    <span style={{ color: 'rgba(255,255,255,0.75)' }}>{g.l}</span>
                  </div>
                ))}
                <div style={{ marginTop: 6, padding: 8, background: 'rgba(194,76,47,0.15)', borderRadius: 8, fontSize: 11, color: 'rgba(255,255,255,0.85)' }}>
                  紅中區 <span className="sb-num">.510</span><br/>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>聯盟均值 .280</span>
                </div>
              </div>
            </div>
          </Card>

          {/* ② 對球種打擊率 */}
          <Card dark padding={14}>
            <SectionHead num="02" label="對球種打擊率" sub="按球種拆解 · 184 球" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { code: 'FB', avg: 0.388, n: 64, league: 0.265 },
                { code: 'SI', avg: 0.342, n: 38, league: 0.265 },
                { code: 'SL', avg: 0.214, n: 32, league: 0.265 },
                { code: 'CB', avg: 0.165, n: 28, league: 0.265 },
                { code: 'CH', avg: 0.298, n: 22, league: 0.265 },
              ].map((b) => (
                <div key={b.code}>
                  <HBar label={`${b.code} ${PITCH_NAMES[b.code]}`} value={b.avg} n={b.n} league={b.league}
                    color={PITCH_COLORS[b.code]} dark mode="avg" />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10, fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>
              <span style={{ display: 'inline-block', width: 16, height: 0, borderTop: '2px dashed var(--warn)', verticalAlign: 'middle', marginRight: 4 }}/>
              聯盟均值 .265 · AVG ≥ .300 高亮
            </div>
          </Card>

          {/* ③ 對左右投 */}
          <Card dark padding={14}>
            <SectionHead num="03" label="對左右投打擊率" />
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { l: 'vs LHP', avg: '.288', pa: 62, obp: '.350', slg: '.422', ops: '.772', hot: false },
                { l: 'vs RHP', avg: '.392', pa: 198, obp: '.461', slg: '.611', ops: '1.072', hot: true },
              ].map((c, i) => (
                <div key={i} style={{ flex: 1, padding: 12, borderRadius: 12, position: 'relative', overflow: 'hidden',
                  background: c.hot ? 'linear-gradient(135deg, rgba(194,76,47,0.25), rgba(194,76,47,0.05))' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${c.hot ? 'rgba(194,76,47,0.4)' : 'rgba(255,255,255,0.06)'}` }}>
                  <div style={{ position: 'absolute', right: -6, bottom: -6, opacity: 0.18 }}>
                    <BatterSilhouette size={50} side={i === 0 ? 'L' : 'R'} color="#fff" />
                  </div>
                  <div className="sb-display" style={{ fontSize: 10, color: c.hot ? 'var(--ball-soft)' : 'rgba(255,255,255,0.6)', letterSpacing: '0.14em' }}>{c.l}</div>
                  <div className="sb-num" style={{ fontSize: 32, marginTop: 2 }}>{c.avg}</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)' }}>{c.pa} 打席</div>
                  <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4, fontSize: 9 }}>
                    {[['OBP', c.obp], ['SLG', c.slg], ['OPS', c.ops]].map(([k, v], j) => (
                      <div key={j}>
                        <div className="sb-display" style={{ color: 'rgba(255,255,255,0.5)' }}>{k}</div>
                        <div className="sb-num" style={{ fontSize: 12 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* ④ 不同球數 */}
          <Card dark padding={14}>
            <SectionHead num="04" label="不同球數打擊率" sub="壞球 × 好球" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5 }}>
              {Array.from({ length: 12 }).map((_, i) => {
                const b = Math.floor(i / 3), s = i % 3;
                const data = [
                  [.265, .218, .144],
                  [.298, .264, .172],
                  [.388, .322, .218],
                  [.436, .402, .244], // 3-x (3-0 striped)
                ];
                const v = data[b][s];
                const heat = v >= 0.4 ? '#C24C2F' : v >= 0.32 ? '#C7912A' : v >= 0.22 ? '#7BB58F' : '#5B8CDB';
                const striped = b === 3 && s === 0;
                return (
                  <div key={i} style={{
                    position: 'relative', aspectRatio: '1.4', borderRadius: 8,
                    background: striped
                      ? `repeating-linear-gradient(45deg, ${heat}, ${heat} 4px, ${heat}88 4px, ${heat}88 8px)`
                      : heat,
                    padding: 6, color: '#fff', overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.2)',
                  }}>
                    <div className="sb-display" style={{ fontSize: 9, opacity: 0.9 }}>{b}-{s}</div>
                    <div className="sb-num" style={{ fontSize: 16, marginTop: 1 }}>{striped ? '送出' : `.${String(Math.round(v * 1000)).padStart(3, '0')}`.replace('.0', '.')}</div>
                    {!striped && <div style={{ fontSize: 9, opacity: 0.8 }}>n=24</div>}
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 10, padding: 10, background: 'rgba(76,175,80,0.08)', borderRadius: 8, fontSize: 11, color: 'rgba(255,255,255,0.8)', borderLeft: '3px solid var(--strike)' }}>
              主動出擊球數 (2-0 / 3-1) → <span className="sb-num">.436</span> · 投手必須避開紅中
            </div>
          </Card>

          {/* ⑤ 落點圖 */}
          <Card dark padding={14}>
            <SectionHead num="05" label="擊球落點圖" sub="拉打 64% · 全場噴射" />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <FieldMap width={280} height={220} hits={[
                { x: 80, y: 110, type: 'hr' },
                { x: 60, y: 130, type: 'double' },
                { x: 110, y: 90, type: 'single' },
                { x: 200, y: 100, type: 'single' },
                { x: 220, y: 80, type: 'hr' },
                { x: 90, y: 150, type: 'single' },
                { x: 170, y: 160, type: 'out' },
                { x: 130, y: 120, type: 'double' },
                { x: 240, y: 130, type: 'single' },
                { x: 50, y: 90, type: 'hr' },
                { x: 200, y: 170, type: 'out' },
                { x: 100, y: 170, type: 'triple' },
              ]}/>
            </div>
            <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4, fontSize: 10 }}>
              {[
                { c: '#5B8CDB', l: '一安 24' },
                { c: '#4D7B3A', l: '二安 8' },
                { c: '#C7912A', l: '三安 2' },
                { c: '#C24C2F', l: 'HR 12' },
                { c: 'rgba(180,180,180,0.6)', l: '出局 38' },
              ].map((g, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 4, background: g.c }}/>
                  <span style={{ color: 'rgba(255,255,255,0.75)' }}>{g.l}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* ⑥ AI 分析 */}
          <Card dark padding={14}>
            <SectionHead num="06" label="AI ANALYSIS" right={
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <Chip tone="warn" solid>✨ AI</Chip>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>信心 84%</span>
              </div>
            }/>

            {/* summary with left bar */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
              <div style={{ width: 4, borderRadius: 2, background: 'linear-gradient(180deg, var(--clay) 0%, var(--ball) 100%)' }}/>
              <div style={{ flex: 1, padding: '4px 0' }}>
                <div className="sb-display" style={{ fontSize: 9, color: 'var(--clay-soft)', letterSpacing: '0.18em' }}>SUMMARY</div>
                <div style={{ fontSize: 13, lineHeight: 1.55, marginTop: 3 }}>
                  右打強打型 1B、紅中區與低位內角極熱(.510 / .436),
                  對右投手 OPS 突破 <b>1.072</b>,惟對橫向變化球(SL/CB)辨識不足。
                </div>
              </div>
            </div>

            {/* strengths */}
            <div style={{ marginTop: 12, padding: 12, background: 'rgba(47,125,79,0.1)', borderRadius: 10, border: '1px solid rgba(47,125,79,0.3)' }}>
              <div className="sb-display" style={{ fontSize: 10, color: 'var(--strike-soft)', letterSpacing: '0.16em', marginBottom: 6 }}>● STRENGTHS</div>
              {[
                '紅中區打擊率高達 .510,任何進壘失誤都會被嚴懲',
                '對速球 (FB .388) 與下沉球 (SI .342) 反應迅速',
                '主動出擊 2-0 / 3-1 球數時表現極強 (.436)',
              ].map((s, i) => (
                <div key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', lineHeight: 1.55, paddingLeft: 12, position: 'relative', marginTop: i ? 4 : 0 }}>
                  <span style={{ position: 'absolute', left: 0, top: 6, width: 6, height: 6, borderRadius: '50%', background: 'var(--strike)' }}/>
                  {s}
                </div>
              ))}
            </div>

            {/* weaknesses */}
            <div style={{ marginTop: 10, padding: 12, background: 'rgba(194,76,47,0.1)', borderRadius: 10, border: '1px solid rgba(194,76,47,0.3)' }}>
              <div className="sb-display" style={{ fontSize: 10, color: 'var(--ball-soft)', letterSpacing: '0.16em', marginBottom: 6 }}>● WEAKNESSES</div>
              {[
                '對曲球辨識差 (.165),尤其外角低位曲球揮空率 38%',
                '滑球被釣魚率高,兩好球後追打外角滑球達 61%',
                '對左投手 OPS 僅 .772,對左偏弱',
              ].map((s, i) => (
                <div key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', lineHeight: 1.55, paddingLeft: 12, position: 'relative', marginTop: i ? 4 : 0 }}>
                  <span style={{ position: 'absolute', left: 0, top: 6, width: 6, height: 6, borderRadius: '50%', background: 'var(--ball)' }}/>
                  {s}
                </div>
              ))}
            </div>

            {/* game plan */}
            <div style={{ marginTop: 10, padding: 12, background: 'var(--night-3)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="sb-display" style={{ fontSize: 10, color: 'var(--clay-soft)', letterSpacing: '0.16em', marginBottom: 8 }}>● GAME PLAN · 投球建議</div>
              {[
                { n: 1, t: '搶第一好球', d: '低位內角速球占好球帶,避免紅中失投' },
                { n: 2, t: '中場混球種', d: '滑球誘揮外角,CB 製造視覺差' },
                { n: 3, t: '兩好球決勝', d: '低位外角 CB / SL 釣魚,他追打率 61%' },
              ].map((s) => (
                <div key={s.n} style={{ display: 'flex', gap: 10, padding: '6px 0', borderTop: s.n > 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--clay)', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 11, flexShrink: 0 }}>{s.n}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>{s.t}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', marginTop: 1 }}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>
                ScoutBook AI v2.4 · 184 球 · 26 場
              </div>
              <button style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#fff',
                fontSize: 10, padding: '4px 10px', borderRadius: 999, cursor: 'pointer' }}>↻ 重新生成</button>
            </div>
          </Card>

          {/* footer */}
          <div style={{ textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>
            上次更新 2026/05/14 21:32 · 自動同步
          </div>
          <button style={{ padding: 12, borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)',
            background: 'transparent', color: '#fff', fontWeight: 600, fontSize: 12 }}>↓ 輸出 PDF 報告</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Screen_Players, Screen_BatterReport });

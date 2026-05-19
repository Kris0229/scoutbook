/* sb-web-2.jsx — Web screens: Scout Report, Compare, Market, Listing Detail, Subscription, Earnings */

// ═══════════════ W5. Scout Report (Web) — left TOC + content ═══════════════
function Web_ScoutReport() {
  return (
    <div className="sb-root" style={{ display: 'flex', height: '100%', background: 'var(--paper)' }}>
      <WebSidebar active="players" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <WebTopBar title="王立祥 · 球探報告" breadcrumb="PLAYERS / 樹德高中 / #23 王立祥"
          right={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', background: 'var(--chalk)', borderRadius: 10, border: '1px solid rgba(27,34,48,0.1)', padding: 2 }}>
                {['近5場', '近10場', '本季', '自訂'].map((t, i) => (
                  <button key={t} style={{ padding: '6px 12px', border: 'none', borderRadius: 8,
                    background: i === 2 ? 'var(--ink)' : 'transparent',
                    color: i === 2 ? '#fff' : 'var(--ink)',
                    fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>{t}</button>
                ))}
              </div>
              <button style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid rgba(27,34,48,0.15)', background: 'transparent', fontSize: 11, fontWeight: 600 }}>⤴ 分享連結</button>
              <button style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid rgba(27,34,48,0.15)', background: 'transparent', fontSize: 11, fontWeight: 600 }}>↓ 輸出 PDF</button>
              <button style={{ padding: '8px 14px', borderRadius: 10, border: 'none', background: 'var(--clay)', color: '#fff', fontSize: 12, fontWeight: 700 }}>$ 上架至市集</button>
            </div>
          }/>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '180px 1fr 300px', minHeight: 0, overflow: 'hidden' }}>
          {/* TOC */}
          <div style={{ padding: '20px 12px', borderRight: '1px solid rgba(27,34,48,0.08)', overflow: 'auto' }}>
            <div className="sb-display" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'rgba(27,34,48,0.5)', padding: '0 6px 8px' }}>目錄</div>
            {[
              { n: '01', t: '九宮格打擊率', act: true },
              { n: '02', t: '對球種打擊率' },
              { n: '03', t: '對左右投' },
              { n: '04', t: '不同球數' },
              { n: '05', t: '擊球落點' },
              { n: '06', t: 'AI 分析 ✨' },
            ].map((s) => (
              <div key={s.n} style={{
                display: 'flex', alignItems: 'baseline', gap: 6,
                padding: '8px 8px', borderRadius: 6,
                background: s.act ? 'rgba(184,119,68,0.12)' : 'transparent',
                color: s.act ? 'var(--clay-deep)' : 'var(--ink)',
                fontSize: 12, fontWeight: s.act ? 600 : 500, cursor: 'pointer',
              }}>
                <span className="sb-display" style={{ fontSize: 9, color: 'rgba(27,34,48,0.5)' }}>{s.n}</span>
                <span>{s.t}</span>
              </div>
            ))}
            <div style={{ height: 1, background: 'rgba(27,34,48,0.06)', margin: '12px 6px' }}/>
            <div className="sb-display" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'rgba(27,34,48,0.5)', padding: '0 6px 8px' }}>比賽記錄</div>
            {['05/14 vs 獅子', '05/11 vs 神龍', '05/08 vs 勇者'].map((g) => (
              <div key={g} style={{ padding: '6px 8px', fontSize: 11, color: 'rgba(27,34,48,0.7)', cursor: 'pointer' }}>· {g}</div>
            ))}
          </div>

          {/* main content */}
          <div style={{ overflow: 'auto', padding: 24, background: 'var(--night)', color: '#fff' }}>
            {/* header card */}
            <div style={{ padding: 18, borderRadius: 16, background: 'linear-gradient(135deg, var(--night-2), var(--night))', border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
              <JerseyWatermark num={23} />
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 28 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                    <Chip tone="grass" solid>1B</Chip>
                    <Chip tone="ghostDark">R 右打</Chip>
                    <Chip tone="hot" solid className="sb-hot">HOT</Chip>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <span className="sb-display" style={{ fontSize: 20, color: 'var(--clay-soft)' }}>#23</span>
                    <span className="sb-display" style={{ fontSize: 32, fontWeight: 700 }}>王立祥</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>樹德高中 · 高三 · 183cm/82kg · 2026 春季賽</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
                  {[
                    ['AVG', '.356'], ['OBP', '.432'], ['SLG', '.566'],
                    ['OPS', '.998'], ['HR', '12'], ['SB', '8'],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <div className="sb-display" style={{ fontSize: 9, color: 'var(--clay-soft)', letterSpacing: '0.14em' }}>{l}</div>
                      <div className="sb-num" style={{ fontSize: 22 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 01 + 02 row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
              <Card dark padding={16}>
                <SectionHead num="01" label="九宮格打擊率" sub="進壘位置 × AVG"/>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <StrikeZone3x3 dark size={200} data={[
                    [{ v: 0.31, n: 14 }, { v: 0.38, n: 22 }, { v: 0.22, n: 18 }],
                    [{ v: 0.42, n: 18 }, { v: 0.51, n: 28 }, { v: 0.18, n: 20 }],
                    [{ v: 0.28, n: 16 }, { v: 0.35, n: 22 }, { v: 0.12, n: 26 }],
                  ]}/>
                  <div style={{ flex: 1, fontSize: 11, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
                    <div style={{ marginBottom: 8 }}>
                      <div className="sb-display" style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em' }}>HOT ZONE</div>
                      <div className="sb-num" style={{ fontSize: 28, color: 'var(--ball)' }}>.510</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>紅中區 (中-中) · 聯盟 .280</div>
                    </div>
                    <div>
                      <div className="sb-display" style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em' }}>COLD ZONE</div>
                      <div className="sb-num" style={{ fontSize: 22, color: 'var(--pitch-sl)' }}>.122</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>外角低 · 弱點</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card dark padding={16}>
                <SectionHead num="02" label="對球種打擊率"/>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {[
                    { code: 'FB', avg: 0.388, n: 64, league: 0.265 },
                    { code: 'SI', avg: 0.342, n: 38, league: 0.265 },
                    { code: 'SL', avg: 0.214, n: 32, league: 0.265 },
                    { code: 'CB', avg: 0.165, n: 28, league: 0.265 },
                    { code: 'CH', avg: 0.298, n: 22, league: 0.265 },
                  ].map((b) => (
                    <HBar key={b.code} label={`${b.code} ${PITCH_NAMES[b.code]}`} value={b.avg} n={b.n} league={b.league}
                      color={PITCH_COLORS[b.code]} dark />
                  ))}
                </div>
              </Card>
            </div>

            {/* Section 03 + 04 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
              <Card dark padding={16}>
                <SectionHead num="03" label="對左右投打擊率"/>
                <div style={{ display: 'flex', gap: 10 }}>
                  {[
                    { l: 'vs LHP', avg: '.288', pa: 62, obp: '.350', slg: '.422', ops: '.772', hot: false },
                    { l: 'vs RHP', avg: '.392', pa: 198, obp: '.461', slg: '.611', ops: '1.072', hot: true },
                  ].map((c, i) => (
                    <div key={i} style={{ flex: 1, padding: 14, borderRadius: 10, position: 'relative', overflow: 'hidden',
                      background: c.hot ? 'linear-gradient(135deg, rgba(194,76,47,0.25), rgba(194,76,47,0.05))' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${c.hot ? 'rgba(194,76,47,0.4)' : 'rgba(255,255,255,0.06)'}` }}>
                      <div className="sb-display" style={{ fontSize: 10, color: c.hot ? 'var(--ball-soft)' : 'rgba(255,255,255,0.6)', letterSpacing: '0.14em' }}>{c.l}</div>
                      <div className="sb-num" style={{ fontSize: 36, marginTop: 4 }}>{c.avg}</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)' }}>{c.pa} 打席</div>
                      <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4, fontSize: 10 }}>
                        {[['OBP', c.obp], ['SLG', c.slg], ['OPS', c.ops]].map(([k, v], j) => (
                          <div key={j}>
                            <div className="sb-display" style={{ color: 'rgba(255,255,255,0.5)' }}>{k}</div>
                            <div className="sb-num" style={{ fontSize: 13 }}>{v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card dark padding={16}>
                <SectionHead num="04" label="不同球數打擊率"/>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
                  {Array.from({ length: 12 }).map((_, i) => {
                    const b = Math.floor(i / 3), s = i % 3;
                    const data = [
                      [.265, .218, .144], [.298, .264, .172],
                      [.388, .322, .218], [.436, .402, .244],
                    ];
                    const v = data[b][s];
                    const heat = v >= 0.4 ? '#C24C2F' : v >= 0.32 ? '#C7912A' : v >= 0.22 ? '#7BB58F' : '#5B8CDB';
                    const striped = b === 3 && s === 0;
                    return (
                      <div key={i} style={{
                        aspectRatio: '1.5', borderRadius: 6, padding: 6, color: '#fff', overflow: 'hidden',
                        background: striped ? `repeating-linear-gradient(45deg, ${heat}, ${heat} 4px, ${heat}88 4px, ${heat}88 8px)` : heat,
                      }}>
                        <div className="sb-display" style={{ fontSize: 9 }}>{b}-{s}</div>
                        <div className="sb-num" style={{ fontSize: 16 }}>{striped ? '送出' : `.${String(Math.round(v * 1000)).padStart(3, '0')}`.replace('.0', '.')}</div>
                        {!striped && <div style={{ fontSize: 9, opacity: 0.8 }}>n=24</div>}
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Section 05 落點 */}
            <div style={{ marginTop: 14 }}>
              <Card dark padding={16}>
                <SectionHead num="05" label="擊球落點圖" sub="拉打 64% · 全場噴射" right={
                  <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', borderRadius: 999, padding: 2 }}>
                    <button style={{ padding: '4px 10px', borderRadius: 999, border: 'none', background: 'var(--clay)', color: '#fff', fontSize: 10, fontWeight: 600 }}>全季疊加</button>
                    <button style={{ padding: '4px 10px', borderRadius: 999, border: 'none', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 10 }}>單場</button>
                  </div>
                }/>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 16, alignItems: 'flex-start' }}>
                  <FieldMap width={520} height={340} hits={[
                    ...Array.from({ length: 24 }, () => ({ x: 80 + Math.random() * 360, y: 60 + Math.random() * 120, type: 'single' })),
                    ...Array.from({ length: 8 }, () => ({ x: 80 + Math.random() * 360, y: 80 + Math.random() * 100, type: 'double' })),
                    ...Array.from({ length: 12 }, () => ({ x: 60 + Math.random() * 400, y: 60 + Math.random() * 80, type: 'hr' })),
                    ...Array.from({ length: 38 }, () => ({ x: 80 + Math.random() * 360, y: 80 + Math.random() * 160, type: 'out' })),
                  ]}/>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 11 }}>
                    {[
                      { c: '#5B8CDB', l: '一安', n: 24 },
                      { c: '#4D7B3A', l: '二安', n: 8 },
                      { c: '#C7912A', l: '三安', n: 2 },
                      { c: '#C24C2F', l: 'HR',  n: 12 },
                      { c: 'rgba(180,180,180,0.6)', l: '出局', n: 38 },
                    ].map((g, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
                        <span style={{ width: 10, height: 10, borderRadius: 5, background: g.c }}/>
                        <span style={{ flex: 1 }}>{g.l}</span>
                        <span className="sb-num">{g.n}</span>
                      </div>
                    ))}
                    <div style={{ padding: 10, background: 'rgba(194,76,47,0.1)', borderRadius: 8, marginTop: 4 }}>
                      <div className="sb-display" style={{ fontSize: 9, color: 'var(--ball-soft)', letterSpacing: '0.14em' }}>BABIP · ISO</div>
                      <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                        <div><div className="sb-num" style={{ fontSize: 18 }}>.342</div></div>
                        <div><div className="sb-num" style={{ fontSize: 18 }}>.210</div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Section 06 AI */}
            <div style={{ marginTop: 14 }}>
              <Card dark padding={16}>
                <SectionHead num="06" label="AI ANALYSIS" right={
                  <div style={{ display: 'flex', gap: 6 }}>
                    <Chip tone="warn" solid>✨ AI</Chip>
                    <Chip tone="ghostDark">信心 84%</Chip>
                  </div>
                }/>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div style={{ padding: 14, background: 'rgba(47,125,79,0.1)', borderRadius: 10, border: '1px solid rgba(47,125,79,0.3)' }}>
                    <div className="sb-display" style={{ fontSize: 10, color: 'var(--strike-soft)', letterSpacing: '0.16em', marginBottom: 8 }}>● STRENGTHS</div>
                    {['紅中區 .510, 任何失投嚴懲', '對 FB (.388) / SI (.342) 反應快', '主動出擊球數 .436'].map((s, i) => (
                      <div key={i} style={{ fontSize: 12, paddingLeft: 14, position: 'relative', marginTop: i ? 4 : 0, lineHeight: 1.55 }}>
                        <span style={{ position: 'absolute', left: 0, top: 6, width: 6, height: 6, borderRadius: 3, background: 'var(--strike)' }}/>
                        {s}
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: 14, background: 'rgba(194,76,47,0.1)', borderRadius: 10, border: '1px solid rgba(194,76,47,0.3)' }}>
                    <div className="sb-display" style={{ fontSize: 10, color: 'var(--ball-soft)', letterSpacing: '0.16em', marginBottom: 8 }}>● WEAKNESSES</div>
                    {['對曲球 .165, 外角揮空 38%', '兩好球追打外角 SL 61%', '對左投 OPS .772 偏弱'].map((s, i) => (
                      <div key={i} style={{ fontSize: 12, paddingLeft: 14, position: 'relative', marginTop: i ? 4 : 0, lineHeight: 1.55 }}>
                        <span style={{ position: 'absolute', left: 0, top: 6, width: 6, height: 6, borderRadius: 3, background: 'var(--ball)' }}/>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: 14, padding: 14, background: 'var(--night-3)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="sb-display" style={{ fontSize: 10, color: 'var(--clay-soft)', letterSpacing: '0.16em', marginBottom: 8 }}>● GAME PLAN · 投球建議</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                    {[
                      { n: 1, t: '搶第一好球', d: '低位內角速球占好球帶' },
                      { n: 2, t: '中場混球種', d: '滑球誘揮外角, CB 視覺差' },
                      { n: 3, t: '兩好球決勝', d: '低位外角 CB / SL 釣魚 .61' },
                    ].map((s) => (
                      <div key={s.n} style={{ padding: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--clay)', color: '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 11 }}>{s.n}</div>
                          <div style={{ fontSize: 12, fontWeight: 700 }}>{s.t}</div>
                        </div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{s.d}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* right rail — PA log on zone click */}
          <div style={{ borderLeft: '1px solid rgba(27,34,48,0.08)', overflow: 'auto', background: 'var(--chalk)' }}>
            <div style={{ padding: 16 }}>
              <div className="sb-display" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'rgba(27,34,48,0.55)' }}>PA LOG · 紅中區</div>
              <div style={{ fontSize: 12, color: 'rgba(27,34,48,0.5)', marginTop: 2 }}>點擊九宮格查看打席</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                {[
                  { g: '05/14 獅子', inn: '3↑', r: 'HR', sp: 'FB 148', tone: 'ball' },
                  { g: '05/14 獅子', inn: '6↑', r: '2B', sp: 'SI 142', tone: 'grass' },
                  { g: '05/11 神龍', inn: '1↑', r: '1B', sp: 'FB 145', tone: 'pitch-sl' },
                  { g: '05/11 神龍', inn: '4↑', r: 'K', sp: 'CB 118', tone: 'ghost' },
                  { g: '05/08 勇者', inn: '2↑', r: 'HR', sp: 'FB 146', tone: 'ball' },
                  { g: '05/08 勇者', inn: '5↑', r: '1B', sp: 'CH 128', tone: 'pitch-sl' },
                  { g: '05/05 雷霆', inn: '7↑', r: 'BB', sp: '—', tone: 'ghost' },
                ].map((pa, i) => (
                  <div key={i} style={{ padding: 10, background: 'var(--paper)', borderRadius: 8, border: '1px solid rgba(27,34,48,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: 'rgba(27,34,48,0.6)' }}>{pa.g} · {pa.inn}</span>
                      <Chip tone={pa.tone}>{pa.r}</Chip>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--ink-2)', marginTop: 4 }}>致勝球 {pa.sp}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════ W6. Player Compare ═══════════════
function Web_Compare() {
  const cmp = [
    {
      n: 23, name: '王立祥', team: '樹德高中', pos: '1B', s: 'R',
      stats: { AVG: '.356', OPS: '.998', HR: 12, SB: 8, BB: 28, K: 31 },
      hot: 'HR 紅中區 .510', cold: '外角低位 .122',
      pitchAvg: { FB: 0.388, SI: 0.342, SL: 0.214, CB: 0.165, CH: 0.298 },
    },
    {
      n: 4, name: '黃柏睿', team: '高雄海豚', pos: 'CF', s: 'L',
      stats: { AVG: '.378', OPS: '1.022', HR: 11, SB: 14, BB: 22, K: 28 },
      hot: '對 FB .422', cold: '對 SL .188',
      pitchAvg: { FB: 0.422, SI: 0.298, SL: 0.188, CB: 0.214, CH: 0.272 },
    },
  ];
  return (
    <div className="sb-root" style={{ display: 'flex', height: '100%', background: 'var(--night)', color: '#fff' }}>
      <WebSidebar active="compare" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '14px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>PLAYERS / COMPARE</div>
            <div className="sb-display" style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>球員對比</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Chip tone="ghostDark">本季 ▾</Chip>
            <button style={{ padding: '8px 14px', borderRadius: 10, border: 'none', background: 'var(--clay)', color: '#fff', fontSize: 12, fontWeight: 700 }}>+ 加入第三位</button>
          </div>
        </div>

        <div style={{ flex: 1, padding: 24, overflow: 'auto' }}>
          {/* header cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', gap: 16, alignItems: 'center' }}>
            {[0, null, 1].map((idx, ci) => idx === null ? (
              <div key="vs" style={{ textAlign: 'center' }}>
                <div className="sb-display" style={{ fontSize: 48, color: 'var(--clay-soft)', fontWeight: 700 }}>VS</div>
              </div>
            ) : (() => {
              const p = cmp[idx];
              return (
                <div key={p.n} style={{ padding: 18, borderRadius: 14, background: 'var(--night-2)', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <JerseyWatermark num={p.n} />
                  <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                    <Chip tone={idx === 0 ? 'clay' : 'grass'} solid>{p.pos}</Chip>
                    <Chip tone="ghostDark">{p.s}</Chip>
                  </div>
                  <div className="sb-display" style={{ fontSize: 26, fontWeight: 700 }}>#{p.n} {p.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{p.team}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 14 }}>
                    {Object.entries(p.stats).slice(0, 4).map(([k, v]) => (
                      <div key={k}>
                        <div className="sb-display" style={{ fontSize: 9, color: 'var(--clay-soft)' }}>{k}</div>
                        <div className="sb-num" style={{ fontSize: 20 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })())}
          </div>

          {/* zone compare */}
          <Card dark padding={16} style={{ marginTop: 16 }}>
            <SectionHead num="A" label="九宮格 · 並排對比" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'center', justifyItems: 'center' }}>
              <StrikeZone3x3 dark size={220} data={[
                [{ v: 0.31, n: 14 }, { v: 0.38, n: 22 }, { v: 0.22, n: 18 }],
                [{ v: 0.42, n: 18 }, { v: 0.51, n: 28 }, { v: 0.18, n: 20 }],
                [{ v: 0.28, n: 16 }, { v: 0.35, n: 22 }, { v: 0.12, n: 26 }],
              ]}/>
              <StrikeZone3x3 dark size={220} data={[
                [{ v: 0.42, n: 16 }, { v: 0.48, n: 24 }, { v: 0.32, n: 16 }],
                [{ v: 0.38, n: 22 }, { v: 0.44, n: 30 }, { v: 0.18, n: 18 }],
                [{ v: 0.22, n: 14 }, { v: 0.31, n: 20 }, { v: 0.14, n: 22 }],
              ]}/>
            </div>
          </Card>

          {/* pitch type compare */}
          <Card dark padding={16} style={{ marginTop: 14 }}>
            <SectionHead num="B" label="對球種打擊率 · 對比" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['FB', 'SI', 'SL', 'CB', 'CH'].map((code) => {
                const v0 = cmp[0].pitchAvg[code];
                const v1 = cmp[1].pitchAvg[code];
                return (
                  <div key={code} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', gap: 12, alignItems: 'center' }}>
                    <div style={{ direction: 'rtl' }}>
                      <HBar label={`${code} ${PITCH_NAMES[code]}`} value={v0} color={PITCH_COLORS[code]} dark/>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <PitchSwatch code={code} size={12}/>
                      <div className="sb-display" style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{code}</div>
                    </div>
                    <HBar label="" value={v1} color={PITCH_COLORS[code]} dark/>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* AI synthesis */}
          <Card dark padding={16} style={{ marginTop: 14 }}>
            <SectionHead num="C" label="AI 綜合對比 ✨"/>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {cmp.map((p, i) => (
                <div key={i} style={{ padding: 14, borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="sb-display" style={{ fontSize: 11, color: 'var(--clay-soft)', letterSpacing: '0.14em' }}>{p.name} · 風格</div>
                  <div style={{ marginTop: 6, fontSize: 12, lineHeight: 1.55, color: 'rgba(255,255,255,0.85)' }}>
                    {i === 0
                      ? '紅中型強打,主動出擊球數極強,但對橫向變化辨識不足。'
                      : '速球破壞型外野手,Cover 範圍廣,但對 SL 揮空率高。'}
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                    <Chip tone="strike" solid>強:{p.hot}</Chip>
                    <Chip tone="ball" solid>弱:{p.cold}</Chip>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, padding: 14, background: 'linear-gradient(135deg, rgba(184,119,68,0.15), transparent)', borderRadius: 10, border: '1px solid rgba(184,119,68,0.3)' }}>
              <div className="sb-display" style={{ fontSize: 10, color: 'var(--clay-soft)', letterSpacing: '0.16em', marginBottom: 4 }}>戰術建議</div>
              <div style={{ fontSize: 12, lineHeight: 1.55, color: 'rgba(255,255,255,0.85)' }}>
                若同場面對兩人,先針對 #4 黃柏睿用 SL 壓制,後對 #23 王立祥需避開紅中,
                CB 為兩人共通弱點,但 #4 對 SL 弱點更顯著。
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Web_ScoutReport, Web_Compare });

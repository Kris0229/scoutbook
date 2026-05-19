/* sb-app-4.jsx — Pitcher scout report + Market */

// ═══════════════ 7P. 球員球探報告 · 投手版 (6 區塊) ═══════════════
function Screen_PitcherReport() {
  return (
    <div className="sb-root" style={{ position: 'absolute', inset: 0, background: 'var(--night)', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}><IOSStatusBar dark /></div>

      <div style={{ paddingTop: 56, padding: '56px 14px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button style={{ border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', width: 30, height: 30, borderRadius: 8 }}>‹</button>
        <div className="sb-display" style={{ fontSize: 10, color: 'var(--clay-soft)', letterSpacing: '0.2em' }}>SCOUT · PITCHER</div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button style={{ border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', width: 30, height: 30, borderRadius: 8 }}>☆</button>
          <button style={{ border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', width: 30, height: 30, borderRadius: 8, fontSize: 18 }}>⋯</button>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* pitcher header */}
        <div style={{ margin: '6px 14px 0', borderRadius: 16, padding: 16, position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(135deg, #1B2230 0%, #0F141C 100%)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <JerseyWatermark num={18} />
          {/* dual-role toggle (兩刀流) */}
          <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 0, background: 'rgba(255,255,255,0.06)', borderRadius: 999, padding: 2 }}>
            <button style={{ padding: '4px 8px', borderRadius: 999, border: 'none', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 9, fontWeight: 600 }}>打者</button>
            <button style={{ padding: '4px 10px', borderRadius: 999, border: 'none', background: 'var(--clay)', color: '#fff', fontSize: 9, fontWeight: 700 }}>投手 ●</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span className="sb-display" style={{ fontSize: 18, color: 'var(--clay-soft)', fontWeight: 700 }}>#18</span>
            <span className="sb-display" style={{ fontSize: 28, fontWeight: 700 }}>林建宏</span>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
            <Chip tone="clay" solid>SP</Chip>
            <Chip tone="ghostDark">R 右投</Chip>
            <Chip tone="ghostDark">高壓投法</Chip>
            <Chip tone="ghostDark">186cm</Chip>
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 6 }}>樹德高中 · 甲組隊 · 2026 春季賽</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 14, position: 'relative' }}>
            {[
              { l: 'ERA',  v: '2.87' },
              { l: 'IP',   v: '64.1' },
              { l: 'K',    v: '78' },
              { l: 'BB',   v: '24' },
              { l: 'WHIP', v: '1.18' },
              { l: 'K/9',  v: '10.9' },
              { l: 'BB/9', v: '3.4' },
              { l: 'HR/9', v: '0.8' },
            ].map((k, i) => (
              <div key={i}>
                <div className="sb-display" style={{ fontSize: 8, color: 'var(--clay-soft)', letterSpacing: '0.14em' }}>{k.l}</div>
                <div className="sb-num" style={{ fontSize: 18, marginTop: 2 }}>{k.v}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
            <Chip tone="clay" solid>速球派</Chip>
            <Chip tone="strike" solid>高三振</Chip>
            <Chip tone="grass" solid>控球穩定</Chip>
          </div>
        </div>

        {/* tabs */}
        <div style={{ padding: '12px 14px 0', position: 'sticky', top: 0, background: 'var(--night)', zIndex: 4 }}>
          <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 6 }}>
            {['全部', '進壘分佈', '球種', '左右打', '球數', '被擊落點', 'AI 分析'].map((t, i) => (
              <button key={i} style={{ flex: '0 0 auto', padding: '6px 12px', borderRadius: 999, border: 'none',
                background: i === 0 ? 'var(--clay)' : 'rgba(255,255,255,0.06)',
                color: '#fff', fontSize: 11, fontWeight: 600 }}>{t}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: '6px 14px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* ① 進壘分佈 (13-grid) */}
          <Card dark padding={14}>
            <SectionHead num="01" label="進壘分佈圖" right={
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', borderRadius: 999, padding: 2 }}>
                <button style={{ padding: '4px 10px', borderRadius: 999, border: 'none', background: 'var(--clay)', color: '#fff', fontSize: 9, fontWeight: 700 }}>投球分佈</button>
                <button style={{ padding: '4px 10px', borderRadius: 999, border: 'none', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 9, fontWeight: 600 }}>被打擊率</button>
              </div>
            }/>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <Zone13 dark size={180} mode="pct" data={[
                { v: 0.04, n: 16 }, { v: 0.08, n: 28 }, { v: 0.05, n: 18 },
                { v: 0.07, n: 25 }, { v: 0.16, n: 56 }, { v: 0.06, n: 21 },
                { v: 0.10, n: 36 }, { v: 0.12, n: 42 }, { v: 0.08, n: 28 },
                { v: 0.05, n: 18 },  // outer high
                { v: 0.09, n: 32 },  // outer low
                { v: 0.05, n: 18 },  // outer in
                { v: 0.05, n: 19 },  // outer out
              ]} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11 }}>
                {[
                  { l: '好球帶內外比', v: '62 : 38', acc: 'var(--strike-soft)' },
                  { l: '高低區比', v: '34 : 66', acc: 'var(--clay-soft)' },
                  { l: '內外角比', v: '48 : 52', acc: 'rgba(255,255,255,0.7)' },
                ].map((r, i) => (
                  <div key={i} style={{ padding: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
                    <div className="sb-display" style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em' }}>{r.l}</div>
                    <div className="sb-num" style={{ fontSize: 16, color: r.acc, marginTop: 2 }}>{r.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* ② 球種使用 */}
          <Card dark padding={14}>
            <SectionHead num="02" label="球種使用分析" />
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <Donut size={140} thickness={20} data={[
                  { value: 0.52, color: 'var(--pitch-fb)' },
                  { value: 0.18, color: 'var(--pitch-sl)' },
                  { value: 0.14, color: 'var(--pitch-ch)' },
                  { value: 0.10, color: 'var(--pitch-cb)' },
                  { value: 0.06, color: 'var(--pitch-si)' },
                ]} dark/>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="sb-num" style={{ fontSize: 26 }}>1,142</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>NP 本季</div>
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { code: 'FB', use: '52%', avg: 148, ws: '18%' },
                  { code: 'SL', use: '18%', avg: 137, ws: '32%' },
                  { code: 'CH', use: '14%', avg: 127, ws: '28%' },
                  { code: 'CB', use: '10%', avg: 118, ws: '22%' },
                  { code: 'SI', use:  '6%', avg: 142, ws:  '8%' },
                ].map((p) => (
                  <div key={p.code} style={{ display: 'grid', gridTemplateColumns: '14px 32px 1fr 32px', gap: 6, fontSize: 11, alignItems: 'center' }}>
                    <PitchSwatch code={p.code} size={10}/>
                    <span className="sb-display" style={{ fontWeight: 700 }}>{p.code}</span>
                    <span style={{ color: 'rgba(255,255,255,0.65)' }}>{p.avg} · 空 {p.ws}</span>
                    <span className="sb-num" style={{ textAlign: 'right' }}>{p.use}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* speed boxplot */}
            <div style={{ marginTop: 12 }}>
              <div className="sb-display" style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em', marginBottom: 6 }}>球速分佈 (km/h)</div>
              <svg width="100%" height="80" viewBox="0 0 280 80">
                {/* axis */}
                {[110, 120, 130, 140, 150, 160].map((v, i) => {
                  const x = ((v - 110) / 50) * 260 + 10;
                  return <g key={i}>
                    <line x1={x} y1="0" x2={x} y2="60" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                    <text x={x} y="75" textAnchor="middle" fontSize="9" fontFamily="var(--f-display)" fill="rgba(255,255,255,0.5)">{v}</text>
                  </g>;
                })}
                {/* boxes */}
                {[
                  { code: 'FB', y: 4,  min: 143, q1: 146, med: 148, q3: 150, max: 153 },
                  { code: 'SI', y: 14, min: 138, q1: 141, med: 142, q3: 144, max: 146 },
                  { code: 'SL', y: 24, min: 133, q1: 135, med: 137, q3: 139, max: 142 },
                  { code: 'CH', y: 34, min: 123, q1: 125, med: 127, q3: 130, max: 132 },
                  { code: 'CB', y: 44, min: 114, q1: 116, med: 118, q3: 120, max: 122 },
                ].map((p) => {
                  const X = (v) => ((v - 110) / 50) * 260 + 10;
                  return (
                    <g key={p.code}>
                      <line x1={X(p.min)} y1={p.y + 4} x2={X(p.max)} y2={p.y + 4} stroke={PITCH_COLORS[p.code]} strokeWidth="1.5" opacity="0.6"/>
                      <rect x={X(p.q1)} y={p.y} width={X(p.q3) - X(p.q1)} height="8" fill={PITCH_COLORS[p.code]} opacity="0.9" rx="1"/>
                      <line x1={X(p.med)} y1={p.y} x2={X(p.med)} y2={p.y + 8} stroke="#fff" strokeWidth="1.5"/>
                      <text x="0" y={p.y + 6} fontSize="9" fontFamily="var(--f-display)" fontWeight="700" fill="#fff">{p.code}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </Card>

          {/* ③ 對左右打 */}
          <Card dark padding={14}>
            <SectionHead num="03" label="對左右打者成績" />
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { l: 'vs LHB', era: '2.12', k: '28%', bb: '6%', baa: '.214', pa: 142, win: true },
                { l: 'vs RHB', era: '3.45', k: '24%', bb: '9%', baa: '.262', pa: 168, win: false },
              ].map((c, i) => (
                <div key={i} style={{ flex: 1, padding: 12, borderRadius: 12, position: 'relative', overflow: 'hidden',
                  background: c.win ? 'linear-gradient(135deg, rgba(47,125,79,0.25), rgba(47,125,79,0.05))' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${c.win ? 'rgba(47,125,79,0.4)' : 'rgba(255,255,255,0.06)'}` }}>
                  <div style={{ position: 'absolute', right: -6, bottom: -6, opacity: 0.15 }}>
                    <BatterSilhouette size={50} side={i === 0 ? 'L' : 'R'} color="#fff"/>
                  </div>
                  <div className="sb-display" style={{ fontSize: 10, color: c.win ? 'var(--strike-soft)' : 'rgba(255,255,255,0.6)', letterSpacing: '0.14em' }}>{c.l}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span className="sb-num" style={{ fontSize: 28 }}>{c.era}</span>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>ERA</span>
                  </div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)' }}>{c.pa} 打席</div>
                  <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4, fontSize: 9 }}>
                    {[['K%', c.k], ['BB%', c.bb], ['BAA', c.baa]].map(([k, v], j) => (
                      <div key={j}>
                        <div className="sb-display" style={{ color: 'rgba(255,255,255,0.5)' }}>{k}</div>
                        <div className="sb-num" style={{ fontSize: 12 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: 'rgba(255,255,255,0.6)', padding: 8, background: 'rgba(47,125,79,0.08)', borderRadius: 8 }}>
              ⚐ 對左打 ERA 低 <b>1.33</b> · 對右打需強化外角武器
            </div>
          </Card>

          {/* ④ 球數策略 */}
          <Card dark padding={14}>
            <SectionHead num="04" label="不同球數投球策略" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5 }}>
              {Array.from({ length: 12 }).map((_, i) => {
                const b = Math.floor(i / 3), s = i % 3;
                const data = [
                  [{ p: 'FB', ws: 18, gf: '52/48' }, { p: 'SL', ws: 28, gf: '60/40' }, { p: 'CB', ws: 38, gf: '70/30' }],
                  [{ p: 'FB', ws: 16, gf: '55/45' }, { p: 'SL', ws: 30, gf: '58/42' }, { p: 'CB', ws: 36, gf: '68/32' }],
                  [{ p: 'CH', ws: 22, gf: '60/40' }, { p: 'SL', ws: 25, gf: '55/45' }, { p: 'CB', ws: 32, gf: '64/36' }],
                  [{ p: 'FB', ws: 12, gf: '45/55' }, { p: 'FB', ws: 14, gf: '50/50' }, { p: 'SL', ws: 28, gf: '60/40' }],
                ];
                const d = data[b][s];
                const pitcherAdv = (b === 0 && s === 2) || (b === 1 && s === 2);
                const batterAdv = (b === 2 && s === 0) || (b === 3 && s === 1);
                return (
                  <div key={i} style={{ position: 'relative', padding: 6, borderRadius: 8,
                    background: pitcherAdv ? 'rgba(47,125,79,0.18)' : batterAdv ? 'rgba(194,76,47,0.18)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${pitcherAdv ? 'rgba(47,125,79,0.4)' : batterAdv ? 'rgba(194,76,47,0.4)' : 'rgba(255,255,255,0.06)'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="sb-display" style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>{b}-{s}</span>
                      {pitcherAdv && <Chip tone="strike" solid style={{ fontSize: 7, padding: '1px 4px' }}>投優</Chip>}
                      {batterAdv && <Chip tone="ball" solid style={{ fontSize: 7, padding: '1px 4px' }}>打優</Chip>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 3 }}>
                      <PitchSwatch code={d.p} size={8}/>
                      <span className="sb-display" style={{ fontSize: 11, fontWeight: 700 }}>{d.p}</span>
                    </div>
                    <div className="sb-num" style={{ fontSize: 11, color: 'var(--strike-soft)' }}>{d.ws}%</div>
                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)' }}>GO/FO {d.gf}</div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* ⑤ 被擊落點 */}
          <Card dark padding={14}>
            <SectionHead num="05" label="被擊落點圖" sub="GO/FO 1.42 · 滾飛比偏滾" right={
              <Chip tone="ghostDark">全部 ▾</Chip>
            }/>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <FieldMap width={180} height={150} hits={[
                { x: 60, y: 90, type: 'out' }, { x: 70, y: 100, type: 'out' },
                { x: 90, y: 70, type: 'single' }, { x: 120, y: 110, type: 'out' },
                { x: 130, y: 90, type: 'double' }, { x: 150, y: 105, type: 'out' },
                { x: 110, y: 80, type: 'hr' },
                { x: 100, y: 120, type: 'out' }, { x: 80, y: 115, type: 'out' },
              ]}/>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11 }}>
                <div style={{ padding: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
                  <div className="sb-display" style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em' }}>擊球類型</div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 4, fontSize: 10 }}>
                    <span><b className="sb-num">42%</b> GO</span>
                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>|</span>
                    <span><b className="sb-num">30%</b> FO</span>
                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>|</span>
                    <span><b className="sb-num">18%</b> LD</span>
                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>|</span>
                    <span><b className="sb-num">10%</b> PU</span>
                  </div>
                </div>
                <div style={{ padding: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
                  <div className="sb-display" style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em' }}>被擊方向</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 6, alignItems: 'center', fontSize: 10 }}>
                    <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden', display: 'flex' }}>
                      <div style={{ width: '42%', background: 'var(--ball)' }}/>
                      <div style={{ width: '32%', background: 'var(--clay-soft)' }}/>
                      <div style={{ width: '26%', background: 'var(--strike)' }}/>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 4, fontSize: 9, marginTop: 4 }}>
                    <span>拉 42%</span><span style={{ color: 'rgba(255,255,255,0.4)' }}>中 32%</span><span>反 26%</span>
                  </div>
                </div>
                <div style={{ padding: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
                  <div className="sb-display" style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em' }}>BABIP</div>
                  <div className="sb-num" style={{ fontSize: 18 }}>.273</div>
                </div>
              </div>
            </div>
          </Card>

          {/* ⑥ AI 分析 (投手版) */}
          <Card dark padding={14}>
            <SectionHead num="06" label="AI ANALYSIS" right={
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <Chip tone="warn" solid>✨ AI</Chip>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>信心 88%</span>
              </div>
            }/>

            <div style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
              <div style={{ width: 4, borderRadius: 2, background: 'linear-gradient(180deg, var(--strike) 0%, var(--clay) 100%)' }}/>
              <div style={{ flex: 1, padding: '4px 0' }}>
                <div className="sb-display" style={{ fontSize: 9, color: 'var(--clay-soft)', letterSpacing: '0.18em' }}>SUMMARY</div>
                <div style={{ fontSize: 13, lineHeight: 1.55, marginTop: 3 }}>
                  右投速球派 SP,FB 均速 148 km/h、配 SL/CH 製造空振,K/9 10.9。
                  對左打壓制力強,對右打低位 SL 偶有失投。
                </div>
              </div>
            </div>

            {/* strengths */}
            <div style={{ marginTop: 12, padding: 12, background: 'rgba(47,125,79,0.1)', borderRadius: 10, border: '1px solid rgba(47,125,79,0.3)' }}>
              <div className="sb-display" style={{ fontSize: 10, color: 'var(--strike-soft)', letterSpacing: '0.16em', marginBottom: 6 }}>● STRENGTHS</div>
              {[
                'FB / SL combo 致死,SL 空振率 32% 居全聯盟前段',
                '對左打 ERA 1.33 / BAA .214,左打殺手',
                '兩好球後 CB 釣魚成功率 38%',
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
                '對右打外角 SL 失投率 14% (高聯盟均值)',
                '球數落後 (3-1, 2-0) 後使用率回退 FB 達 88%,容易被搶打',
                '七局以後 FB 均速掉至 145,長中繼吃力',
              ].map((s, i) => (
                <div key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', lineHeight: 1.55, paddingLeft: 12, position: 'relative', marginTop: i ? 4 : 0 }}>
                  <span style={{ position: 'absolute', left: 0, top: 6, width: 6, height: 6, borderRadius: '50%', background: 'var(--ball)' }}/>
                  {s}
                </div>
              ))}
            </div>

            {/* game plan = 打擊建議 */}
            <div style={{ marginTop: 10, padding: 12, background: 'var(--night-3)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="sb-display" style={{ fontSize: 10, color: 'var(--clay-soft)', letterSpacing: '0.16em', marginBottom: 8 }}>● GAME PLAN · 打擊建議</div>
              {[
                { n: 1, t: '搶第一球 FB', d: '52% 機率投 FB,鎖定低位內角速球' },
                { n: 2, t: '兩好球前不追', d: '避免追打外角 SL,等失投' },
                { n: 3, t: '球數領先強攻', d: '2-0 / 3-1 他回 FB 88%,鎖定打' },
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

            {/* pitch sequence (new) */}
            <div style={{ marginTop: 10, padding: 12, background: 'linear-gradient(135deg, rgba(184,119,68,0.15), transparent)', borderRadius: 10, border: '1px solid rgba(184,119,68,0.3)' }}>
              <div className="sb-display" style={{ fontSize: 10, color: 'var(--clay-soft)', letterSpacing: '0.16em', marginBottom: 8 }}>● PITCH SEQUENCE · 打席策略</div>
              {[
                { t: '首打席', d: '看球計時,放掉 FB 第一球,試 SL' },
                { t: '第二打席', d: '鎖定球數領先 FB 強攻' },
                { t: '第三打席', d: '六局後均速下滑,推打反方向' },
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, fontSize: 11, padding: '4px 0' }}>
                  <Chip tone="clay" solid style={{ fontSize: 9, width: 56, justifyContent: 'center' }}>{p.t}</Chip>
                  <span style={{ color: 'rgba(255,255,255,0.85)', flex: 1 }}>{p.d}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ═══════════════ 8.1 內容市集 首頁 ═══════════════
function Screen_Market() {
  const listings = [
    { n: 18, pos: 'SP', side: 'R', name: '林建宏', tags: ['對右失投', '球速八局後下滑'], pa: 176, np: 221, days: 90, rating: 4.8, reviews: 32, price: 199, isNew: true, isP: true },
    { n: 4, pos: 'CF', side: 'L', name: '黃柏睿', tags: ['外角低位極弱', '曲球辨識差'], pa: 142, np: 0, days: 90, rating: 4.6, reviews: 19, price: 249, isNew: false, isP: false },
    { n: 11, pos: 'SP', side: 'R', name: '陳冠樺', tags: ['對左 OPS .892', '球數落後 FB%'], pa: 188, np: 252, days: 90, rating: 4.9, reviews: 41, price: 299, isNew: true, isP: true },
  ];
  return (
    <div className="sb-root sb-paper-bg" style={{ position: 'absolute', inset: 0, background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}><IOSStatusBar /></div>

      <div style={{ paddingTop: 56, padding: '56px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button style={{ border: 'none', background: 'transparent', fontSize: 14 }}>‹</button>
          <Chip tone="clay" solid>SCOUT MARKET</Chip>
          <button style={{ border: 'none', background: 'transparent', fontSize: 18 }}>⚙</button>
        </div>
        <div className="sb-display" style={{ fontSize: 28, fontWeight: 700, marginTop: 10 }}>球探報告 市集</div>
        <div style={{ fontSize: 11, color: 'rgba(27,34,48,0.55)', marginTop: 2 }}>
          已上架 <b>284 份</b> 報告 · 本週新增 <b>23 份</b>
        </div>

        {/* search */}
        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
          background: 'var(--chalk)', borderRadius: 12, border: '1px solid rgba(27,34,48,0.08)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="6" cy="6" r="4.5" fill="none" stroke="rgba(27,34,48,0.5)" strokeWidth="1.5"/><path d="M10 10l3 3" stroke="rgba(27,34,48,0.5)" strokeWidth="1.5"/></svg>
          <input placeholder="搜尋對手球員..." style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 13 }}/>
        </div>

        {/* filter chips */}
        <div style={{ display: 'flex', gap: 6, marginTop: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {[
            { l: '🔥 熱門', sel: true },
            { l: '⊕ 投手' }, { l: '⊕ 外角弱' }, { l: '⊕ 曲球差' }, { l: '⊕ 高中' }, { l: '$100-300' },
          ].map((c, i) => (
            <button key={i} style={{ flex: '0 0 auto', padding: '5px 10px', borderRadius: 999,
              background: c.sel ? 'var(--ink)' : 'var(--chalk)',
              color: c.sel ? '#fff' : 'var(--ink)',
              fontSize: 11, fontWeight: 600, border: c.sel ? 'none' : '1px solid rgba(27,34,48,0.1)' }}>
              {c.l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '12px 16px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {listings.map((l, i) => (
          <div key={i} style={{ padding: 14, background: 'var(--chalk)', borderRadius: 16, border: '1px solid rgba(27,34,48,0.08)', position: 'relative', overflow: 'hidden' }}>
            {l.isNew && <Chip tone="clay" solid style={{ position: 'absolute', top: 12, right: 12 }}>NEW</Chip>}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <Chip tone={l.isP ? 'ball' : 'ink'} solid={l.isP}>#{l.n} {l.pos}</Chip>
              <Chip tone="ghost">{l.side === 'L' ? '左' : '右'}{l.isP ? '投' : '打'}</Chip>
            </div>
            <div className="sb-display" style={{ fontSize: 22, fontWeight: 700, marginTop: 4, letterSpacing: '0.04em' }}>
              {l.name.split('').join(' ')}
            </div>
            <div className="sb-stitch" style={{ marginTop: 8 }}/>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              {l.tags.map((t, ti) => (
                <Chip key={ti} tone="ball" style={{ background: 'rgba(194,76,47,0.12)', color: 'var(--ball)' }}>{t}</Chip>
              ))}
            </div>
            <div className="sb-stitch" style={{ marginTop: 10 }}/>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, fontSize: 11, color: 'rgba(27,34,48,0.6)' }}>
              <span>{l.isP ? `28場 · ${l.np}球` : `${l.pa}打席`}</span>
              <span>·</span>
              <Chip tone="ghost">📊 圖表</Chip>
              <span>· 有效 {l.days} 天</span>
            </div>

            <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(27,34,48,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 11, color: 'rgba(27,34,48,0.55)' }}>
                賣家 ⭐ <b className="sb-num">{l.rating}</b> · {l.reviews} 評
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10,
                background: 'var(--ink)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 13 }}>
                <span className="sb-num">${l.price}</span>
                <span style={{ fontSize: 11, opacity: 0.8 }}>購買 →</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════ 8.2 報告詳情 (模糊遮罩) ═══════════════
function Screen_ListingDetail() {
  return (
    <div className="sb-root" style={{ position: 'absolute', inset: 0, background: 'var(--night)', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}><IOSStatusBar dark /></div>

      <div style={{ paddingTop: 56, padding: '56px 14px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button style={{ border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', width: 30, height: 30, borderRadius: 8 }}>‹</button>
        <Chip tone="warn" solid>🔒 預覽</Chip>
        <button style={{ border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', width: 30, height: 30, borderRadius: 8 }}>⤴</button>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '6px 14px 110px' }}>
        {/* unlocked: summary + tags + 1 數字誘餌 */}
        <div style={{ padding: 14, background: 'var(--night-2)', borderRadius: 14, position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
          <JerseyWatermark num={18} />
          <Chip tone="ball" solid>#18 SP</Chip>
          <div className="sb-display" style={{ fontSize: 24, fontWeight: 700, marginTop: 6 }}>林 建 宏</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>R · 高壓 · 樹德高中</div>

          {/* summary */}
          <div style={{ marginTop: 10, padding: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 10, borderLeft: '3px solid var(--clay)' }}>
            <div className="sb-display" style={{ fontSize: 9, color: 'var(--clay-soft)', letterSpacing: '0.16em', marginBottom: 4 }}>SUMMARY</div>
            <div style={{ fontSize: 12, lineHeight: 1.55 }}>
              右投速球派 SP,FB 均速 <span className="sb-num" style={{ color: 'var(--clay-soft)' }}>148 km/h</span>,
              對左打 ERA 極低、對右打外角 SL 偶有失投。八局後球速下滑明顯。
            </div>
          </div>

          {/* tags */}
          <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <Chip tone="ball" solid>對右失投</Chip>
            <Chip tone="ball" solid>球速八局後下滑</Chip>
            <Chip tone="ball" solid>球數落後 FB%</Chip>
          </div>
        </div>

        {/* blurred charts */}
        <div style={{ marginTop: 14, padding: 14, background: 'var(--night-2)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
          <div className="sb-display" style={{ fontSize: 9, color: 'var(--clay-soft)', letterSpacing: '0.16em', marginBottom: 8 }}>● 完整報告預覽</div>

          <div style={{ position: 'relative', filter: 'blur(8px)', pointerEvents: 'none', userSelect: 'none' }}>
            <Zone13 dark size={140} mode="pct" data={Array.from({length: 13}, () => ({ v: Math.random() * 0.2 + 0.05, n: Math.floor(Math.random() * 40 + 10) }))}/>
            <div style={{ marginTop: 8 }}>
              {[0.388, 0.342, 0.214, 0.165, 0.298].map((v, i) => (
                <div key={i} style={{ marginTop: 6 }}><HBar label={`P${i}`} value={v} color="#888" dark/></div>
              ))}
            </div>
          </div>

          {/* lock overlay */}
          <div style={{ position: 'absolute', inset: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🔒</div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>九宮格 + 球種 + 落點圖</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>購買後立即解鎖完整 6 大區塊</div>
          </div>
        </div>

        {/* what's included */}
        <div style={{ marginTop: 14, padding: 14, background: 'var(--night-2)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="sb-display" style={{ fontSize: 10, color: 'var(--clay-soft)', letterSpacing: '0.16em', marginBottom: 10 }}>● 包含內容</div>
          {[
            '九宮格進壘分佈圖 + 被打擊率',
            '5 種球種使用、球速分佈 box plot',
            '對左右打、不同球數策略矩陣',
            '被擊落點圖 + 滾飛比',
            'AI 完整分析 + 打擊建議 + 打席策略',
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, fontSize: 12, padding: '6px 0', borderTop: i ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <span style={{ color: 'var(--strike-soft)' }}>✓</span>
              <span style={{ color: 'rgba(255,255,255,0.8)' }}>{s}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 10, fontSize: 10, color: 'rgba(255,255,255,0.5)', padding: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
          ⚐ 賣家匿名 · ⭐ 4.8 (32 評) · 報告自動更新 90 天 · 不含原始 pitches 資料
        </div>
      </div>

      {/* sticky CTA */}
      <div style={{ padding: '12px 14px 28px', background: 'rgba(0,0,0,0.5)', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>含 20% 平台費</div>
          <div className="sb-num" style={{ fontSize: 26, color: '#fff' }}>$199</div>
        </div>
        <button style={{ flex: 2, padding: 14, borderRadius: 12, border: 'none', background: 'var(--clay)', color: '#fff', fontSize: 14, fontWeight: 700 }}>
          立即購買 · 解鎖完整報告 →
        </button>
      </div>
    </div>
  );
}

// ═══════════════ 8.5 賣家收益儀表板 ═══════════════
function Screen_Earnings() {
  return (
    <div className="sb-root sb-paper-bg" style={{ position: 'absolute', inset: 0, background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}><IOSStatusBar /></div>

      <div style={{ paddingTop: 56, padding: '56px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button style={{ border: 'none', background: 'transparent', fontSize: 14 }}>‹</button>
          <div style={{ fontSize: 13, fontWeight: 700 }}>賣家收益</div>
          <button style={{ border: 'none', background: 'transparent', fontSize: 14 }}>⤴</button>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '10px 16px 28px' }}>
        {/* big number */}
        <div style={{ padding: 18, background: 'linear-gradient(135deg, var(--ink), var(--ink-2))', borderRadius: 16, color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.08 }}>
            <svg width="120" height="120" viewBox="0 0 120 120"><text x="0" y="100" fontFamily="var(--f-display)" fontSize="110" fontWeight="700" fill="#fff">$</text></svg>
          </div>
          <div className="sb-display" style={{ fontSize: 10, color: 'var(--clay-soft)', letterSpacing: '0.16em' }}>本月總收益 · MAY 2026</div>
          <div className="sb-num" style={{ fontSize: 44, fontWeight: 700, marginTop: 4 }}>$ 4,392</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: 'var(--strike-soft)' }}>▲ +$1,180</span>
            較上月 <b className="sb-num">+36.8%</b>
          </div>
          <div style={{ marginTop: 12 }}>
            <MiniLine series={[1400, 1820, 1650, 2100, 2480, 3212, 4392]} width={300} height={70} dark color="var(--clay-soft)"
              labels={['W44', 'W45', 'W46', 'W47', 'W48', 'W49', 'W50']} />
          </div>
        </div>

        {/* settlement */}
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          <Card padding={12}>
            <div className="sb-display" style={{ fontSize: 9, color: 'rgba(27,34,48,0.5)', letterSpacing: '0.14em' }}>待結算</div>
            <div className="sb-num" style={{ fontSize: 24, marginTop: 4 }}>$ 2,180</div>
            <div style={{ fontSize: 10, color: 'rgba(27,34,48,0.5)', marginTop: 2 }}>下次 6/15 撥款</div>
          </Card>
          <Card padding={12}>
            <div className="sb-display" style={{ fontSize: 9, color: 'rgba(27,34,48,0.5)', letterSpacing: '0.14em' }}>累計已結算</div>
            <div className="sb-num" style={{ fontSize: 24, marginTop: 4, color: 'var(--strike)' }}>$ 11,840</div>
            <div style={{ fontSize: 10, color: 'rgba(27,34,48,0.5)', marginTop: 2 }}>10 月起 · 抵 39 個月訂閱</div>
          </Card>
        </div>

        {/* listings */}
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div className="sb-display" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'rgba(27,34,48,0.55)' }}>我的上架 · 6</div>
            <Chip tone="ghost">⊕ 上架報告</Chip>
          </div>
          <div style={{ background: 'var(--chalk)', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(27,34,48,0.06)' }}>
            {[
              { name: '林建宏 SP', sold: 12, view: 184, rev: '$1,990', status: '上架中', tone: 'strike' },
              { name: '陳冠樺 SP', sold: 18, view: 256, rev: '$3,580', status: '上架中', tone: 'strike' },
              { name: '黃柏睿 CF', sold: 6, view: 92, rev: '$1,194', status: '上架中', tone: 'strike' },
              { name: '王立祥 1B', sold: 4, view: 71, rev: '$596', status: '已下架', tone: 'ghost' },
            ].map((l, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', gap: 10,
                borderTop: i ? '1px solid rgba(27,34,48,0.06)' : 'none' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{l.name}</div>
                  <div style={{ fontSize: 10, color: 'rgba(27,34,48,0.55)', marginTop: 1 }}>
                    {l.sold} 售出 · {l.view} 查看
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="sb-num" style={{ fontSize: 15, color: 'var(--ink)' }}>{l.rev}</div>
                  <Chip tone={l.tone}>{l.status}</Chip>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* rating */}
        <div style={{ marginTop: 14, padding: 14, background: 'var(--chalk)', borderRadius: 14, border: '1px solid rgba(27,34,48,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div>
              <div className="sb-num" style={{ fontSize: 32, color: 'var(--clay-deep)' }}>4.8</div>
              <div style={{ color: 'var(--clay)', fontSize: 14 }}>★★★★★</div>
            </div>
            <div style={{ flex: 1 }}>
              {[5, 4, 3, 2, 1].map((s) => {
                const pct = [82, 14, 3, 1, 0][5 - s];
                return (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, marginTop: 2 }}>
                    <span style={{ width: 8 }}>{s}</span>
                    <div style={{ flex: 1, height: 4, background: 'rgba(27,34,48,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: 'var(--clay)' }}/>
                    </div>
                    <span style={{ width: 22, textAlign: 'right', color: 'rgba(27,34,48,0.5)' }}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ marginTop: 10, padding: 10, background: 'var(--paper)', borderRadius: 8, fontSize: 11, color: 'var(--ink-2)' }}>
            "對左打部分非常精準,實戰當天三振 4 次。" — 林教練 · 5/12
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Screen_PitcherReport, Screen_Market, Screen_ListingDetail, Screen_Earnings });

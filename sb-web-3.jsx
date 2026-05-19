/* sb-web-3.jsx — Web: Market, Listing Detail, Earnings, Subscription, Roster Import, Games */

// ═══════════════ W7. Market (Web) ═══════════════
function Web_Market() {
  return (
    <div className="sb-root" style={{ display: 'flex', height: '100%', background: 'var(--paper)' }}>
      <WebSidebar active="market" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <WebTopBar title="內容市集" breadcrumb="MARKETPLACE"
          right={
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <input placeholder="搜尋對手球員、隊伍..." style={{ width: 300, padding: '9px 14px 9px 36px', borderRadius: 10, border: '1px solid rgba(27,34,48,0.15)', fontSize: 13 }}/>
                <svg width="14" height="14" viewBox="0 0 14 14" style={{ position: 'absolute', top: 11, left: 12 }}><circle cx="6" cy="6" r="4.5" fill="none" stroke="rgba(27,34,48,0.5)" strokeWidth="1.5"/><path d="M10 10l3 3" stroke="rgba(27,34,48,0.5)" strokeWidth="1.5"/></svg>
              </div>
              <Chip tone="ghost">排序: 熱門 ▾</Chip>
              <button style={{ padding: '8px 14px', borderRadius: 10, border: 'none', background: 'var(--clay)', color: '#fff', fontSize: 12, fontWeight: 700 }}>+ 上架我的報告</button>
            </div>
          }/>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: 0, overflow: 'hidden' }}>
          {/* filter sidebar */}
          <div style={{ padding: '18px 14px', borderRight: '1px solid rgba(27,34,48,0.08)', overflow: 'auto' }}>
            {[
              { l: '守備位置', open: true, opts: [['投手', 84], ['捕手', 22], ['一壘', 31], ['二壘', 28], ['三壘', 24], ['游擊', 26], ['外野', 69]] },
              { l: '弱點標籤', open: true, opts: [['外角弱', 64], ['內角弱', 48], ['曲球差', 56], ['變速差', 38], ['速球弱', 12], ['兩好球差', 72]] },
              { l: '比賽層級', open: false, opts: [['少棒', 8], ['青少棒', 22], ['高中', 168], ['大學', 52], ['社會', 18], ['職棒', 16]] },
              { l: '報告類型', open: false, opts: [['球員報告', 248], ['比賽報告', 24], ['球員訂閱', 12]] },
              { l: '價格區間', open: true, opts: [['$100 以下', 68], ['$100–300', 142], ['$300 以上', 74]] },
            ].map((g, gi) => (
              <div key={g.l} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 4px', cursor: 'pointer' }}>
                  <div className="sb-display" style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: '0.06em' }}>{g.l}</div>
                  <span style={{ fontSize: 10, color: 'rgba(27,34,48,0.45)' }}>{g.open ? '−' : '+'}</span>
                </div>
                {g.open && g.opts.map(([t, n], i) => (
                  <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 4px', fontSize: 12, cursor: 'pointer' }}>
                    <input type="checkbox" checked={(gi === 1 && i < 2)} onChange={() => {}} style={{ accentColor: 'var(--clay)' }}/>
                    <span style={{ flex: 1, color: 'var(--ink-2)' }}>{t}</span>
                    <span style={{ fontSize: 10, color: 'rgba(27,34,48,0.5)' }}>{n}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>

          {/* listings grid */}
          <div style={{ overflow: 'auto', padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ fontSize: 13, color: 'rgba(27,34,48,0.7)' }}>
                共 <b className="sb-num">28</b> 份報告 · 套用 <Chip tone="clay">外角弱</Chip> <Chip tone="clay">曲球差</Chip>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {[
                { n: 18, pos: 'SP', s: 'R', name: '林建宏', tags: ['對右失投', '八局後球速下滑'], stat: '28場 · 221球', rating: 4.8, reviews: 32, price: 199, isNew: true, isP: true },
                { n: 11, pos: 'SP', s: 'R', name: '陳冠樺', tags: ['對左 OPS .892', '球數落後 FB%'], stat: '32場 · 252球', rating: 4.9, reviews: 41, price: 299, isNew: true, isP: true },
                { n: 4,  pos: 'CF', s: 'L', name: '黃柏睿', tags: ['對 SL .188', '外角低位差'], stat: '142打席', rating: 4.6, reviews: 19, price: 249, isNew: false },
                { n: 8,  pos: '3B', s: 'R', name: '王韋翔', tags: ['曲球差', '內角弱'], stat: '128打席', rating: 4.4, reviews: 12, price: 179, isNew: false },
                { n: 33, pos: '2B', s: 'S', name: '吳信安', tags: ['雙能·變速差'], stat: '156打席', rating: 4.7, reviews: 28, price: 229, isNew: false },
                { n: 25, pos: 'C',  s: 'R', name: '張承恩', tags: ['兩好球追打 64%'], stat: '98打席', rating: 4.3, reviews: 8, price: 149, isNew: false },
              ].map((l, i) => (
                <div key={i} style={{ padding: 16, background: 'var(--chalk)', borderRadius: 14, border: '1px solid rgba(27,34,48,0.06)', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
                  {l.isNew && <Chip tone="clay" solid style={{ position: 'absolute', top: 12, right: 12 }}>NEW</Chip>}
                  <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                    <Chip tone={l.isP ? 'ball' : 'ink'} solid={l.isP}>#{l.n} {l.pos}</Chip>
                    <Chip tone="ghost">{l.s}{l.isP ? '投' : '打'}</Chip>
                  </div>
                  <div className="sb-display" style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.06em' }}>
                    {l.name.split('').join(' ')}
                  </div>
                  <div className="sb-stitch" style={{ marginTop: 8 }}/>
                  <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                    {l.tags.map((t, ti) => (
                      <Chip key={ti} tone="ball" style={{ background: 'rgba(194,76,47,0.12)', color: 'var(--ball)' }}>{t}</Chip>
                    ))}
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(27,34,48,0.55)', marginTop: 8 }}>{l.stat} · 有效 90 天</div>

                  {/* tiny preview */}
                  <div style={{ marginTop: 10, display: 'flex', gap: 6, alignItems: 'center', filter: 'blur(2px)', opacity: 0.5 }}>
                    <StrikeZone3x3 size={50} dark={false} data={Array.from({length: 3}, () => Array.from({length: 3}, () => ({ v: Math.random(), n: 10 })))}/>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {[0.4, 0.3, 0.2].map((v, j) => <div key={j} style={{ height: 4, width: `${v * 100}%`, background: 'var(--clay)', borderRadius: 2 }}/>)}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(27,34,48,0.06)' }}>
                    <div style={{ fontSize: 10, color: 'rgba(27,34,48,0.55)' }}>⭐ <b className="sb-num">{l.rating}</b> · {l.reviews} 評</div>
                    <div className="sb-num" style={{ fontSize: 18, color: 'var(--ink)', fontWeight: 700 }}>${l.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════ W8. Listing Detail (Web) — sticky purchase ═══════════════
function Web_ListingDetail() {
  return (
    <div className="sb-root" style={{ display: 'flex', height: '100%', background: 'var(--paper)' }}>
      <WebSidebar active="market" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <WebTopBar title="林建宏 · 投手球探報告" breadcrumb="MARKET / #18 SP 林建宏"
          right={<Chip tone="warn" solid>🔒 預覽模式</Chip>}/>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '180px 1fr 320px', minHeight: 0, overflow: 'hidden' }}>
          {/* TOC */}
          <div style={{ padding: '20px 12px', borderRight: '1px solid rgba(27,34,48,0.08)', overflow: 'auto' }}>
            <div className="sb-display" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'rgba(27,34,48,0.5)', padding: '0 6px 8px' }}>目錄</div>
            {[
              { l: '基本資料', open: true },
              { l: '進壘分佈', lock: true },
              { l: '球種使用', lock: true },
              { l: '對左右打', lock: true },
              { l: '球數策略', lock: true },
              { l: '被擊落點', lock: true },
              { l: 'AI 分析', lock: true, partial: true },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 8px', fontSize: 12, borderRadius: 6,
                color: s.open ? 'var(--clay-deep)' : 'var(--ink-3)',
                background: s.open ? 'rgba(184,119,68,0.12)' : 'transparent' }}>
                <span>{s.l}</span>
                {s.lock && <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(27,34,48,0.4)' }}>{s.partial ? '◐' : '🔒'}</span>}
              </div>
            ))}
          </div>

          {/* center content (mostly blurred) */}
          <div style={{ overflow: 'auto', padding: 24, background: 'var(--night)', color: '#fff' }}>
            {/* unlocked summary */}
            <div style={{ padding: 18, borderRadius: 16, background: 'linear-gradient(135deg, var(--night-2), var(--night))', border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
              <JerseyWatermark num={18} />
              <div style={{ display: 'flex', gap: 6 }}>
                <Chip tone="ball" solid>SP</Chip>
                <Chip tone="ghostDark">R 高壓</Chip>
                <Chip tone="ghostDark">186cm</Chip>
              </div>
              <div className="sb-display" style={{ fontSize: 32, fontWeight: 700, marginTop: 6 }}>#18 林建宏</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>樹德高中 · 甲組隊 · 2026 春</div>
              <div style={{ marginTop: 12, padding: 12, borderLeft: '3px solid var(--clay)', background: 'rgba(184,119,68,0.08)', borderRadius: '0 8px 8px 0' }}>
                <div className="sb-display" style={{ fontSize: 10, color: 'var(--clay-soft)', letterSpacing: '0.16em' }}>SUMMARY · 免費預覽</div>
                <div style={{ fontSize: 13, marginTop: 4, lineHeight: 1.55 }}>
                  右投速球派 SP,FB 均速 <span className="sb-num" style={{ color: 'var(--clay-soft)' }}>148 km/h</span>,
                  對左打 ERA 極低、對右打外角 SL 偶有失投。八局後球速明顯下滑。
                </div>
              </div>
              <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <Chip tone="ball" solid>對右失投</Chip>
                <Chip tone="ball" solid>球速八局後下滑</Chip>
                <Chip tone="ball" solid>球數落後 FB%</Chip>
              </div>
            </div>

            {/* blurred sections grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 16, position: 'relative' }}>
              {['進壘分佈', '球種使用', '對左右打', '球數策略'].map((s, i) => (
                <div key={i} style={{ position: 'relative', padding: 16, borderRadius: 14, background: 'var(--night-2)', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <div style={{ filter: 'blur(8px)', pointerEvents: 'none', userSelect: 'none' }}>
                    <SectionHead num={`0${i + 1}`} label={s}/>
                    {i % 2 === 0 ? (
                      <Zone13 size={140} mode="pct" data={Array.from({length: 13}, () => ({ v: Math.random() * 0.2, n: Math.floor(Math.random() * 40) }))}/>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {[0.4, 0.3, 0.2, 0.5].map((v, j) => <HBar key={j} label={`X${j}`} value={v} color="#888" dark/>)}
                      </div>
                    )}
                  </div>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 4 }}>
                    <div style={{ fontSize: 22 }}>🔒</div>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>{s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* sticky purchase card */}
          <div style={{ borderLeft: '1px solid rgba(27,34,48,0.08)', overflow: 'auto', background: 'var(--paper)' }}>
            <div style={{ padding: 16, position: 'sticky', top: 0 }}>
              <Card padding={16}>
                <div className="sb-display" style={{ fontSize: 10, color: 'var(--clay-deep)', letterSpacing: '0.16em' }}>BUY · UNLOCK</div>
                <div className="sb-num" style={{ fontSize: 38, marginTop: 4, color: 'var(--ink)' }}>$199</div>
                <div style={{ fontSize: 10, color: 'rgba(27,34,48,0.55)', marginTop: 2 }}>一次購買 · 90 天存取</div>

                <button style={{ width: '100%', marginTop: 14, padding: 14, borderRadius: 12, border: 'none', background: 'var(--ink)', color: '#fff', fontSize: 14, fontWeight: 700 }}>立即購買 · 解鎖完整報告</button>
                <button style={{ width: '100%', marginTop: 8, padding: 12, borderRadius: 12, border: '1px solid rgba(27,34,48,0.15)', background: 'transparent', fontSize: 12, fontWeight: 600 }}>訂閱 (含未來更新) · $399</button>

                <div className="sb-stitch" style={{ marginTop: 14 }}/>

                <div style={{ marginTop: 12 }}>
                  <div className="sb-display" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'rgba(27,34,48,0.55)', marginBottom: 6 }}>包含內容</div>
                  {[
                    '進壘分佈 + 13 格熱區',
                    '5 種球種使用 + box plot',
                    '對左右打 + 球數策略',
                    '被擊落點 + 滾飛比',
                    'AI 完整分析 + 打席策略',
                  ].map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: 6, fontSize: 11, padding: '4px 0', color: 'var(--ink-2)' }}>
                      <span style={{ color: 'var(--strike)' }}>✓</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 12, padding: 10, background: 'var(--paper-deep)', borderRadius: 8, fontSize: 11, color: 'var(--ink-2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <div className="sb-num" style={{ fontSize: 16, color: 'var(--clay-deep)' }}>4.8</div>
                    <div style={{ color: 'var(--clay)' }}>★★★★★</div>
                    <div style={{ color: 'rgba(27,34,48,0.5)' }}>32 評</div>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--ink-2)' }}>
                    "對左打部分非常精準,實戰當天三振 4 次。"
                  </div>
                </div>

                <div style={{ marginTop: 10, fontSize: 9, color: 'rgba(27,34,48,0.5)' }}>
                  賣家匿名 · 含 20% 平台費 · 不含原始 pitches 資料 · 自動更新 90 天
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════ W10. Earnings (Web) ═══════════════
function Web_Earnings() {
  return (
    <div className="sb-root" style={{ display: 'flex', height: '100%', background: 'var(--paper)' }}>
      <WebSidebar active="earnings" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <WebTopBar title="賣家收益" breadcrumb="WORKSPACE / EARNINGS"
          right={
            <div style={{ display: 'flex', gap: 8 }}>
              <Chip tone="ghost">2026 May ▾</Chip>
              <button style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid rgba(27,34,48,0.15)', background: 'transparent', fontSize: 12, fontWeight: 600 }}>↓ 明細 CSV</button>
            </div>
          }/>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, padding: 24, overflow: 'auto', minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* big revenue card */}
            <div style={{ padding: 24, borderRadius: 16, background: 'linear-gradient(135deg, var(--ink), var(--ink-2))', color: '#fff', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -30, right: -10, fontSize: 200, fontFamily: 'var(--f-display)', fontWeight: 700, color: 'rgba(255,255,255,0.04)', lineHeight: 0.8 }}>$</div>
              <div className="sb-display" style={{ fontSize: 11, color: 'var(--clay-soft)', letterSpacing: '0.16em' }}>本月總收益 · MAY 2026</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 28, marginTop: 6 }}>
                <div className="sb-num" style={{ fontSize: 64, fontWeight: 700, lineHeight: 1 }}>$ 4,392</div>
                <div style={{ paddingBottom: 12 }}>
                  <Chip tone="strike" solid>▲ +36.8%</Chip>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>較上月 +$1,180</div>
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <MiniLine series={[820, 1240, 1620, 1820, 2480, 3212, 4392]} width={760} height={120} dark color="var(--clay-soft)"
                  labels={['W44', 'W45', 'W46', 'W47', 'W48', 'W49', 'W50']} />
              </div>
            </div>

            {/* settlement strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {[
                { l: '待結算', v: '$ 2,180', s: '下次撥款 6/15' },
                { l: '已結算', v: '$ 11,840', s: '累計 10 個月', acc: 'var(--strike)' },
                { l: '平台抽成', v: '$ 1,098', s: '本月 20%', acc: 'var(--warn)' },
                { l: '退款率', v: '0.8%', s: '聯盟 2.1%', acc: 'var(--strike)' },
              ].map((k, i) => (
                <Card key={i} padding={14}>
                  <div className="sb-display" style={{ fontSize: 10, color: 'rgba(27,34,48,0.5)', letterSpacing: '0.14em' }}>{k.l}</div>
                  <div className="sb-num" style={{ fontSize: 24, marginTop: 4, color: k.acc || 'var(--ink)' }}>{k.v}</div>
                  <div style={{ fontSize: 10, color: 'rgba(27,34,48,0.55)', marginTop: 2 }}>{k.s}</div>
                </Card>
              ))}
            </div>

            {/* details table */}
            <div style={{ background: 'var(--chalk)', borderRadius: 14, border: '1px solid rgba(27,34,48,0.06)', overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="sb-display" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'rgba(27,34,48,0.55)' }}>明細 · 本月 28 筆</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['全部', '銷售', '訂閱', '退款'].map((t, i) => (
                    <Chip key={t} tone={i === 0 ? 'ink' : 'ghost'} solid={i === 0}>{t}</Chip>
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 100px 80px 80px 80px',
                padding: '8px 18px', fontSize: 10, fontFamily: 'var(--f-display)', color: 'rgba(27,34,48,0.5)',
                borderTop: '1px solid rgba(27,34,48,0.06)', borderBottom: '1px solid rgba(27,34,48,0.06)', letterSpacing: '0.04em' }}>
                <div>日期</div><div>內容</div><div>類型</div>
                <div style={{ textAlign: 'right' }}>售價</div>
                <div style={{ textAlign: 'right' }}>抽成</div>
                <div style={{ textAlign: 'right' }}>淨入帳</div>
              </div>
              {[
                { d: '05/14', t: '林建宏 SP', y: '單份', p: '$199', f: '$40', n: '$159' },
                { d: '05/13', t: '陳冠樺 SP', y: '訂閱',  p: '$399', f: '$80', n: '$319' },
                { d: '05/13', t: '林建宏 SP', y: '單份', p: '$199', f: '$40', n: '$159' },
                { d: '05/12', t: '黃柏睿 CF', y: '單份', p: '$249', f: '$50', n: '$199' },
                { d: '05/11', t: '陳冠樺 SP', y: '單份', p: '$299', f: '$60', n: '$239' },
                { d: '05/10', t: '林建宏 SP', y: '訂閱',  p: '$399', f: '$80', n: '$319' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 100px 80px 80px 80px',
                  padding: '10px 18px', fontSize: 12, alignItems: 'center',
                  borderTop: i ? '1px solid rgba(27,34,48,0.04)' : 'none' }}>
                  <div style={{ color: 'rgba(27,34,48,0.6)' }}>{r.d}</div>
                  <div style={{ fontWeight: 600 }}>{r.t}</div>
                  <div><Chip tone={r.y === '訂閱' ? 'clay' : 'ghost'}>{r.y}</Chip></div>
                  <div className="sb-num" style={{ textAlign: 'right' }}>{r.p}</div>
                  <div className="sb-num" style={{ textAlign: 'right', color: 'rgba(27,34,48,0.5)' }}>−{r.f}</div>
                  <div className="sb-num" style={{ textAlign: 'right', color: 'var(--strike)', fontWeight: 700 }}>{r.n}</div>
                </div>
              ))}
            </div>
          </div>

          {/* right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Card padding={14}>
              <div className="sb-display" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'rgba(27,34,48,0.55)', marginBottom: 8 }}>我的上架 · 6</div>
              {[
                { name: '林建宏 SP', sold: 12, view: 184, rev: '$1,990', stat: 'live' },
                { name: '陳冠樺 SP', sold: 18, view: 256, rev: '$3,580', stat: 'live' },
                { name: '黃柏睿 CF', sold: 6,  view:  92, rev: '$1,194', stat: 'live' },
                { name: '王立祥 1B', sold: 4,  view:  71, rev:   '$596', stat: 'off' },
              ].map((l, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '8px 0', gap: 8, borderTop: i ? '1px solid rgba(27,34,48,0.06)' : 'none' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{l.name}</div>
                    <div style={{ fontSize: 10, color: 'rgba(27,34,48,0.55)' }}>{l.sold} 售 · {l.view} 查看</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="sb-num" style={{ fontSize: 13 }}>{l.rev}</div>
                    <Chip tone={l.stat === 'live' ? 'strike' : 'ghost'}>{l.stat === 'live' ? '上架中' : '已下架'}</Chip>
                  </div>
                </div>
              ))}
              <button style={{ width: '100%', marginTop: 10, padding: 10, borderRadius: 8, border: '1px dashed rgba(27,34,48,0.2)', background: 'transparent', fontSize: 12, fontWeight: 600, color: 'var(--ink-2)' }}>+ 上架新報告</button>
            </Card>

            <Card padding={14}>
              <div className="sb-display" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'rgba(27,34,48,0.55)', marginBottom: 10 }}>買家評價</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
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
                        <div style={{ flex: 1, height: 4, background: 'rgba(27,34,48,0.06)', borderRadius: 2 }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: 'var(--clay)', borderRadius: 2 }}/>
                        </div>
                        <span style={{ width: 24, textAlign: 'right', color: 'rgba(27,34,48,0.5)' }}>{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {[
                { r: 5, t: '對左打部分非常精準,實戰當天三振 4 次。', a: '林教練 · 5/12' },
                { r: 5, t: '球種圖很清楚,GamePlan 直接複製使用。', a: '王助教 · 5/10' },
              ].map((r, i) => (
                <div key={i} style={{ padding: 8, background: 'var(--paper)', borderRadius: 8, fontSize: 11, marginTop: i ? 6 : 0, color: 'var(--ink-2)' }}>
                  <div style={{ color: 'var(--clay)' }}>{'★'.repeat(r.r)}</div>
                  <div style={{ marginTop: 2 }}>{r.t}</div>
                  <div style={{ fontSize: 10, color: 'rgba(27,34,48,0.5)', marginTop: 2 }}>— {r.a}</div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════ W12. Subscription Settings ═══════════════
function Web_Subscription() {
  return (
    <div className="sb-root" style={{ display: 'flex', height: '100%', background: 'var(--paper)' }}>
      <WebSidebar active="subscription" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <WebTopBar title="訂閱方案" breadcrumb="SETTINGS / SUBSCRIPTION" />

        <div style={{ flex: 1, overflow: 'auto', padding: 28 }}>
          {/* current plan */}
          <Card padding={20} style={{ background: 'linear-gradient(135deg, var(--ink), var(--ink-2))', color: '#fff', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div className="sb-display" style={{ fontSize: 10, color: 'var(--clay-soft)', letterSpacing: '0.16em' }}>當前方案</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 4 }}>
                  <span className="sb-display" style={{ fontSize: 30, fontWeight: 700 }}>COACH</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>每月 $299 · 下次扣款 6/15</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Chip tone="strike" solid>有效中</Chip>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>自 2025/08/15</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginTop: 18, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {[
                { l: 'AI 報告用量', v: '14 / 20', sub: '本月剩 6 次', pct: 70 },
                { l: '比賽記錄', v: '18 / ∞', sub: '本月' },
                { l: '可上架報告', v: '6', sub: '上架中 5' },
                { l: 'PDF 匯出', v: '∞', sub: '無限' },
              ].map((k, i) => (
                <div key={i}>
                  <div className="sb-display" style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em' }}>{k.l}</div>
                  <div className="sb-num" style={{ fontSize: 24, marginTop: 2 }}>{k.v}</div>
                  {k.pct && (
                    <div style={{ marginTop: 6, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ width: `${k.pct}%`, height: '100%', background: k.pct >= 80 ? 'var(--ball)' : 'var(--clay-soft)' }}/>
                    </div>
                  )}
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>{k.sub}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* plans compare */}
          <div className="sb-display" style={{ fontSize: 11, color: 'rgba(27,34,48,0.55)', letterSpacing: '0.14em', marginTop: 28, marginBottom: 10 }}>方案比較</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { name: 'Free', price: '$0', sub: '永久免費', features: [['每月比賽記錄', '3 場'], ['AI 球探分析', '無'], ['可上架販售', '✗'], ['PDF 匯出', '基本'], ['席位', '1']], cta: '保留 Free', solid: false },
              { name: 'COACH', price: '$299', sub: '每月 · 當前', features: [['每月比賽記錄', '無限'], ['AI 球探分析', '20 次/月'], ['可上架販售', '✓ 抽 20%'], ['PDF 匯出', '精美'], ['席位', '1']], cta: '當前方案', current: true },
              { name: 'CLUB', price: '$999', sub: '每月 · 5 席位', features: [['每月比賽記錄', '無限'], ['AI 球探分析', '無限'], ['組織內共享', '✓'], ['多隊管理', '✓'], ['席位', '5 (+$149/位)']], cta: '升級至 Club', solid: true, accent: 'var(--clay)' },
            ].map((p, i) => (
              <div key={i} style={{ padding: 22, borderRadius: 14, background: 'var(--chalk)',
                border: p.current ? '2px solid var(--clay)' : '1px solid rgba(27,34,48,0.08)',
                position: 'relative' }}>
                {p.current && <Chip tone="clay" solid style={{ position: 'absolute', top: -10, left: 16 }}>當前方案</Chip>}
                <div className="sb-display" style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.06em', color: p.name === 'CLUB' ? 'var(--clay-deep)' : 'var(--ink)' }}>{p.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 6 }}>
                  <span className="sb-num" style={{ fontSize: 38 }}>{p.price}</span>
                  {p.price !== '$0' && <span style={{ fontSize: 11, color: 'rgba(27,34,48,0.55)' }}>/月</span>}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(27,34,48,0.55)' }}>{p.sub}</div>
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(27,34,48,0.06)' }}>
                  {p.features.map(([k, v], j) => (
                    <div key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 12, borderTop: j ? '1px solid rgba(27,34,48,0.04)' : 'none' }}>
                      <span style={{ color: 'rgba(27,34,48,0.65)' }}>{k}</span>
                      <span style={{ fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <button style={{ width: '100%', marginTop: 14, padding: 12, borderRadius: 10,
                  border: p.solid ? 'none' : '1px solid rgba(27,34,48,0.15)',
                  background: p.solid ? p.accent : (p.current ? 'rgba(27,34,48,0.06)' : 'transparent'),
                  color: p.solid ? '#fff' : 'var(--ink)',
                  fontSize: 13, fontWeight: 700,
                  cursor: p.current ? 'default' : 'pointer' }}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>

          {/* add-ons */}
          <div className="sb-display" style={{ fontSize: 11, color: 'rgba(27,34,48,0.55)', letterSpacing: '0.14em', marginTop: 28, marginBottom: 10 }}>附加項目</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { l: 'AI 報告加購', p: '$99', s: '10 次' },
              { l: '市集置頂推廣', p: '$149', s: '7 天' },
              { l: '聯盟授權', p: '議價', s: '年費制' },
            ].map((a, i) => (
              <Card key={i} padding={14}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{a.l}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
                  <span className="sb-num" style={{ fontSize: 20 }}>{a.p}</span>
                  <span style={{ fontSize: 10, color: 'rgba(27,34,48,0.5)' }}>/{a.s}</span>
                </div>
                <button style={{ marginTop: 10, padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(27,34,48,0.15)', background: 'transparent', fontSize: 11, fontWeight: 600 }}>加購 →</button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Web_Market, Web_ListingDetail, Web_Earnings, Web_Subscription });

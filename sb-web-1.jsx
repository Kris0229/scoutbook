/* sb-web-1.jsx — Web screens: Dashboard, Players Browse, Scout Report, Compare */

// ── Shared sidebar ─────────────────────────────────────
function WebSidebar({ active = 'dashboard' }) {
  const items = [
    { k: 'dashboard', l: '主控台', i: 'M3 12L12 3l9 9v9a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1z' },
    { k: 'games',     l: '比賽列表', i: 'M5 6h14M5 12h14M5 18h10' },
    { k: 'players',   l: '球員資料庫', i: 'M12 8a4 4 0 100-8 4 4 0 000 8zM4 20c0-4 4-7 8-7s8 3 8 7' },
    { k: 'compare',   l: '球員對比', i: 'M12 4v16M4 8h8M12 16h8' },
    { k: 'market',    l: '內容市集', i: 'M3 7h18l-1.5 11a2 2 0 01-2 1.7H6.5a2 2 0 01-2-1.7L3 7zM8 7V5a4 4 0 018 0v2' },
    { k: 'purchases', l: '我的購買', i: 'M5 6h14l-1 11H6L5 6zM9 6V4a3 3 0 016 0v2' },
    { k: 'earnings',  l: '賣家收益', i: 'M3 17l6-6 4 4 8-8' },
  ];
  const settings = [
    { k: 'roster',       l: '名單管理' },
    { k: 'subscription', l: '訂閱方案' },
  ];
  return (
    <div style={{ width: 200, background: 'var(--ink)', color: '#fff', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ padding: '18px 18px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="22" height="22" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="20" fill="#F4ECDA"/>
          <path d="M8 14 Q22 24 36 14" fill="none" stroke="#C24C2F" strokeWidth="2"/>
          <path d="M8 30 Q22 20 36 30" fill="none" stroke="#C24C2F" strokeWidth="2"/>
        </svg>
        <div className="sb-display" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.14em' }}>SCOUTBOOK</div>
      </div>
      <div style={{ padding: '0 8px' }}>
        <div className="sb-display" style={{ fontSize: 9, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.35)', padding: '12px 12px 6px' }}>WORKSPACE</div>
        {items.map((it) => (
          <div key={it.k} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 8, marginBottom: 1,
            background: active === it.k ? 'rgba(184,119,68,0.18)' : 'transparent',
            color: active === it.k ? 'var(--clay-soft)' : 'rgba(255,255,255,0.7)',
            fontSize: 12.5, fontWeight: active === it.k ? 600 : 500, cursor: 'pointer',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d={it.i} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>{it.l}</span>
            {active === it.k && <span style={{ marginLeft: 'auto', width: 4, height: 4, borderRadius: 2, background: 'var(--clay-soft)' }}/>}
          </div>
        ))}
        <div className="sb-display" style={{ fontSize: 9, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.35)', padding: '14px 12px 6px' }}>設定</div>
        {settings.map((it) => (
          <div key={it.k} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 8,
            color: active === it.k ? 'var(--clay-soft)' : 'rgba(255,255,255,0.6)',
            background: active === it.k ? 'rgba(184,119,68,0.18)' : 'transparent',
            fontSize: 12, cursor: 'pointer',
          }}>{it.l}</div>
        ))}
      </div>

      <div style={{ marginTop: 'auto', padding: 12 }}>
        <div style={{ padding: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 10 }}>
          <div className="sb-display" style={{ fontSize: 9, color: 'var(--clay-soft)', letterSpacing: '0.14em' }}>COACH 方案</div>
          <div style={{ fontSize: 11, color: '#fff', marginTop: 2 }}>AI 報告 14 / 20</div>
          <div style={{ marginTop: 4, height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: '70%', height: '100%', background: 'var(--clay-soft)' }}/>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--clay)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>李</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: '#fff', fontWeight: 600 }}>李教練</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>樹德高中</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WebTopBar({ title, breadcrumb, right }) {
  return (
    <div style={{
      padding: '14px 28px', borderBottom: '1px solid rgba(27,34,48,0.08)',
      background: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div>
        {breadcrumb && <div style={{ fontSize: 10, color: 'rgba(27,34,48,0.5)', marginBottom: 2, letterSpacing: '0.04em' }}>{breadcrumb}</div>}
        <div className="sb-display" style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>{title}</div>
      </div>
      {right}
    </div>
  );
}

// ═══════════════ W1. Dashboard ═══════════════
function Web_Dashboard() {
  return (
    <div className="sb-root" style={{ display: 'flex', height: '100%', background: 'var(--paper)' }}>
      <WebSidebar active="dashboard" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <WebTopBar title="主控台" breadcrumb="WORKSPACE / DASHBOARD"
          right={
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button style={{ padding: '8px 14px', borderRadius: 10, border: '1px solid rgba(27,34,48,0.15)', background: 'transparent', fontSize: 13, fontWeight: 600 }}>2026 春季賽 ▾</button>
              <button style={{ padding: '8px 14px', borderRadius: 10, border: 'none', background: 'var(--ink)', color: '#fff', fontSize: 13, fontWeight: 700 }}>+ 新增比賽</button>
            </div>
          }/>

        <div style={{ flex: 1, padding: 24, display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, overflow: 'auto', minHeight: 0 }}>
          {/* center column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* season banner */}
            <div style={{ padding: 22, borderRadius: 16, background: 'linear-gradient(135deg, var(--ink), var(--ink-2))', color: '#fff', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', right: -20, top: -20, opacity: 0.06 }}>
                <svg width="220" height="220" viewBox="0 0 220 220"><circle cx="110" cy="110" r="100" fill="none" stroke="#fff" strokeWidth="10"/><path d="M30 70 Q110 130 190 70 M30 150 Q110 90 190 150" stroke="#C24C2F" strokeWidth="6" fill="none"/></svg>
              </div>
              <div className="sb-display" style={{ fontSize: 11, color: 'var(--clay-soft)', letterSpacing: '0.16em' }}>2026 春季賽 · WEEK 07</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 28, marginTop: 8 }}>
                <div>
                  <div className="sb-display" style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em' }}>W-L · 名次</div>
                  <div className="sb-num" style={{ fontSize: 48 }}>14-6</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>聯盟 #2 · 上週 #3</div>
                </div>
                <div>
                  <div className="sb-display" style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em' }}>TEAM AVG</div>
                  <div className="sb-num" style={{ fontSize: 32 }}>.298</div>
                  <div style={{ fontSize: 11, color: 'var(--strike-soft)' }}>▲ +.012</div>
                </div>
                <div>
                  <div className="sb-display" style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em' }}>TEAM ERA</div>
                  <div className="sb-num" style={{ fontSize: 32 }}>3.42</div>
                  <div style={{ fontSize: 11, color: 'var(--ball-soft)' }}>▲ +0.18</div>
                </div>
                <div>
                  <div className="sb-display" style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em' }}>OPS</div>
                  <div className="sb-num" style={{ fontSize: 32 }}>.762</div>
                  <div style={{ fontSize: 11, color: 'var(--strike-soft)' }}>▲ +.022</div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <Sparkline data={[4, 5, 4, 6, 5, 7, 8, 7, 9, 10, 12, 14]} width={140} height={50} color="var(--clay-soft)"/>
                </div>
              </div>
            </div>

            {/* 8-week trend */}
            <div style={{ padding: 18, background: 'var(--chalk)', borderRadius: 16, border: '1px solid rgba(27,34,48,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div>
                  <div className="sb-display" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'rgba(27,34,48,0.55)' }}>8 週趨勢</div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginTop: 2 }}>Team AVG / OPS</div>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {['AVG', 'OPS', 'ERA'].map((t, i) => (
                    <Chip key={t} tone={i === 0 ? 'ink' : 'ghost'} solid={i === 0}>{t}</Chip>
                  ))}
                </div>
              </div>
              <MiniLine series={[.262, .268, .274, .281, .272, .288, .294, .298]} width={680} height={140}
                labels={['W43', 'W44', 'W45', 'W46', 'W47', 'W48', 'W49', 'W50']} color="var(--clay)" />
            </div>

            {/* recent games */}
            <div style={{ background: 'var(--chalk)', borderRadius: 16, border: '1px solid rgba(27,34,48,0.06)' }}>
              <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(27,34,48,0.06)' }}>
                <div className="sb-display" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'rgba(27,34,48,0.55)' }}>最近比賽 · 6</div>
                <span style={{ fontSize: 11, color: 'var(--clay-deep)', cursor: 'pointer' }}>查看全部 ›</span>
              </div>
              <div>
                {[
                  { date: '05/14', opp: '台南獅子', score: '7-3', res: 'W', sp: '林建宏', np: 89, k: 8, recorder: '李教練' },
                  { date: '05/11', opp: '台中神龍', score: '4-5', res: 'L', sp: '張子凡', np: 96, k: 6, recorder: '李教練' },
                  { date: '05/08', opp: '新竹勇者', score: '12-2', res: 'W', sp: '林建宏', np: 78, k: 11, recorder: '王助教' },
                  { date: '05/05', opp: '彰化雷霆', score: '6-6', res: 'T', sp: '吳明翰', np: 102, k: 7, recorder: '李教練' },
                ].map((g, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '36px 60px 1fr 80px 80px 80px 100px',
                    gap: 12, padding: '10px 18px', alignItems: 'center', borderTop: i ? '1px solid rgba(27,34,48,0.05)' : 'none', fontSize: 12 }}>
                    <Chip tone={g.res === 'W' ? 'strike' : g.res === 'L' ? 'ball' : 'warn'} solid style={{ width: 28, justifyContent: 'center' }}>{g.res}</Chip>
                    <span style={{ color: 'rgba(27,34,48,0.55)' }}>{g.date}</span>
                    <span style={{ fontWeight: 600 }}>VS {g.opp}</span>
                    <span className="sb-num" style={{ fontSize: 15 }}>{g.score}</span>
                    <span style={{ color: 'rgba(27,34,48,0.65)' }}>先發 {g.sp}</span>
                    <span style={{ color: 'rgba(27,34,48,0.65)' }}>{g.np}球 · {g.k}K</span>
                    <span style={{ color: 'rgba(27,34,48,0.4)', fontSize: 11 }}>{g.recorder} →</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* next game */}
            <Card padding={14}>
              <div className="sb-display" style={{ fontSize: 10, color: 'var(--clay-deep)', letterSpacing: '0.16em' }}>下一場 · 明日 14:00</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>樹德高中</div>
                  <div style={{ fontSize: 10, color: 'rgba(27,34,48,0.55)' }}>客場</div>
                </div>
                <div className="sb-display" style={{ color: 'var(--clay)', fontSize: 18 }}>VS</div>
                <div style={{ flex: 1, textAlign: 'right' }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>高雄海豚</div>
                  <div style={{ fontSize: 10, color: 'rgba(27,34,48,0.55)' }}>主場</div>
                </div>
              </div>
              <div style={{ marginTop: 10, padding: 10, background: 'var(--clay-pale)', borderRadius: 8, border: '1px dashed var(--clay)', fontSize: 11, color: 'var(--ink-2)', lineHeight: 1.5 }}>
                <b>賽前提醒：</b> 先發 陳冠樺(R) 對左 OPS .892,建議左打先上。
              </div>
            </Card>

            {/* player alerts */}
            <Card padding={14}>
              <div className="sb-display" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'rgba(27,34,48,0.55)', marginBottom: 8 }}>球員狀態</div>
              {[
                { tone: 'strike', t: '王立祥', s: '連 7 場上壘,OPS .998 ▲' },
                { tone: 'ball',  t: '張庭瑋', s: '近 5 場 .175,內角弱點待修' },
                { tone: 'warn',  t: '吳浩然', s: '對曲球揮空率 41% ▲' },
              ].map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, padding: '8px 0', borderTop: i ? '1px solid rgba(27,34,48,0.06)' : 'none', fontSize: 12 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: `var(--${a.tone})`, marginTop: 6 }}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{a.t}</div>
                    <div style={{ color: 'rgba(27,34,48,0.55)', fontSize: 11 }}>{a.s}</div>
                  </div>
                </div>
              ))}
            </Card>

            {/* market */}
            <Card padding={14}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div className="sb-display" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'rgba(27,34,48,0.55)' }}>市集 · 新上架</div>
                <span style={{ fontSize: 10, color: 'var(--clay-deep)' }}>更多 ›</span>
              </div>
              {[
                { name: '陳冠樺 SP', tags: '對左 .892', p: '$299' },
                { name: '黃柏睿 CF', tags: '曲球差', p: '$249' },
              ].map((l, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderTop: i ? '1px solid rgba(27,34,48,0.06)' : 'none' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--paper-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>◆</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{l.name}</div>
                    <div style={{ fontSize: 10, color: 'rgba(27,34,48,0.55)' }}>{l.tags}</div>
                  </div>
                  <div className="sb-num" style={{ fontSize: 13, color: 'var(--clay-deep)' }}>{l.p}</div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════ W4. Players Browse + Drawer ═══════════════
function Web_Players() {
  return (
    <div className="sb-root" style={{ display: 'flex', height: '100%', background: 'var(--paper)' }}>
      <WebSidebar active="players" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <WebTopBar title="球員資料庫" breadcrumb="WORKSPACE / PLAYERS"
          right={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ position: 'relative' }}>
                <input placeholder="搜尋姓名、背號..." style={{ width: 240, padding: '8px 12px 8px 32px', borderRadius: 10, border: '1px solid rgba(27,34,48,0.15)', fontSize: 12 }}/>
                <svg width="14" height="14" viewBox="0 0 14 14" style={{ position: 'absolute', top: 10, left: 10 }}><circle cx="6" cy="6" r="4.5" fill="none" stroke="rgba(27,34,48,0.5)" strokeWidth="1.5"/><path d="M10 10l3 3" stroke="rgba(27,34,48,0.5)" strokeWidth="1.5"/></svg>
              </div>
              <button style={{ padding: '8px 14px', borderRadius: 10, border: 'none', background: 'var(--ink)', color: '#fff', fontSize: 12, fontWeight: 700 }}>+ 匯入名單</button>
            </div>
          }/>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '200px 1fr 460px', minHeight: 0, overflow: 'hidden' }}>
          {/* team filter rail */}
          <div style={{ padding: '16px 12px', borderRight: '1px solid rgba(27,34,48,0.08)', overflow: 'auto' }}>
            <div className="sb-display" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'rgba(27,34,48,0.5)', padding: '0 6px 8px' }}>篩選</div>
            {[
              { l: '全部隊伍', n: 248, sel: true },
              { l: '⭐ 收藏', n: 23 },
              { l: '─', sep: true },
              { l: '樹德高中 (我方)', n: 21 },
              { l: '台南獅子', n: 18 },
              { l: '台中神龍', n: 19 },
              { l: '高雄海豚', n: 22 },
              { l: '新竹勇者', n: 20 },
              { l: '彰化雷霆', n: 17 },
              { l: '宜蘭蘭陽', n: 19 },
              { l: '─', sep: true },
              { l: '右打', n: 168 },
              { l: '左打', n: 64 },
              { l: '雙能', n: 16 },
              { l: '─', sep: true },
              { l: '投手', n: 52 },
              { l: '捕手', n: 24 },
              { l: '內野手', n: 84 },
              { l: '外野手', n: 88 },
            ].map((t, i) => t.sep
              ? <div key={i} style={{ height: 1, background: 'rgba(27,34,48,0.08)', margin: '8px 6px' }}/>
              : (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '6px 8px', borderRadius: 6,
                  background: t.sel ? 'rgba(184,119,68,0.12)' : 'transparent',
                  color: t.sel ? 'var(--clay-deep)' : 'var(--ink)',
                  fontSize: 12, fontWeight: t.sel ? 600 : 500, cursor: 'pointer' }}>
                  <span>{t.l}</span>
                  <span style={{ fontSize: 10, color: 'rgba(27,34,48,0.45)' }}>{t.n}</span>
                </div>
              )
            )}
          </div>

          {/* table */}
          <div style={{ overflow: 'auto', padding: 16 }}>
            <div style={{ background: 'var(--chalk)', borderRadius: 14, border: '1px solid rgba(27,34,48,0.06)', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '40px 50px 80px 1fr 30px 50px 50px 60px 60px',
                padding: '10px 16px', fontSize: 10, letterSpacing: '0.06em', fontFamily: 'var(--f-display)',
                color: 'rgba(27,34,48,0.5)', textTransform: 'uppercase', borderBottom: '1px solid rgba(27,34,48,0.08)' }}>
                <div></div>
                <div>背號</div>
                <div>守位</div>
                <div>姓名 · 隊伍</div>
                <div>L/R</div>
                <div style={{ textAlign: 'right' }}>AVG</div>
                <div style={{ textAlign: 'right' }}>OPS</div>
                <div style={{ textAlign: 'right' }}>HR</div>
                <div style={{ textAlign: 'right' }}>狀態</div>
              </div>
              {[
                { sel: true, n: 23, pos: '1B', name: '王立祥', team: '樹德高中', s: 'R', avg: '.356', ops: '.998', hr: 12, hot: true },
                { n: 7,  pos: 'CF', name: '陳俊安', team: '樹德高中', s: 'L', avg: '.342', ops: '.891', hr: 4 },
                { n: 18, pos: 'SP', name: '林建宏', team: '樹德高中', s: 'R', avg: '—', ops: 'ERA 2.87', hr: 0, isP: true },
                { n: 9,  pos: 'DH', name: '林志強', team: '樹德高中', s: 'L', avg: '.312', ops: '.823', hr: 8 },
                { n: 4,  pos: 'CF', name: '黃柏睿', team: '高雄海豚', s: 'L', avg: '.378', ops: '1.022', hr: 11, hot: true },
                { n: 11, pos: 'SP', name: '陳冠樺', team: '台南獅子', s: 'R', avg: '—', ops: 'ERA 3.15', hr: 0, isP: true },
                { n: 21, pos: 'SS', name: '陳信宇', team: '台南獅子', s: 'R', avg: '.288', ops: '.752', hr: 5 },
                { n: 33, pos: '2B', name: '吳信安', team: '台中神龍', s: 'S', avg: '.302', ops: '.798', hr: 6 },
                { n: 16, pos: 'CF', name: '蔡智凱', team: '新竹勇者', s: 'L', avg: '.272', ops: '.715', hr: 3 },
                { n: 8,  pos: '3B', name: '王韋翔', team: '彰化雷霆', s: 'R', avg: '.331', ops: '.872', hr: 9, hot: true },
              ].map((p, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '40px 50px 80px 1fr 30px 50px 50px 60px 60px',
                  padding: '10px 16px', fontSize: 12, alignItems: 'center',
                  borderTop: i ? '1px solid rgba(27,34,48,0.05)' : 'none',
                  background: p.sel ? 'rgba(184,119,68,0.08)' : 'transparent',
                  cursor: 'pointer',
                }}>
                  <div><input type="checkbox" checked={p.sel} onChange={() => {}} style={{ accentColor: 'var(--clay)' }}/></div>
                  <div className="sb-display" style={{ color: 'var(--clay-deep)', fontWeight: 700 }}>#{p.n}</div>
                  <div><Chip tone={p.isP ? 'ball' : 'ink'} solid={p.isP}>{p.pos}</Chip></div>
                  <div>
                    <span style={{ fontWeight: 600 }}>{p.name}</span>
                    {p.hot && <span style={{ marginLeft: 6, fontSize: 10, color: 'var(--ball)' }}>● HOT</span>}
                    <div style={{ fontSize: 10, color: 'rgba(27,34,48,0.5)' }}>{p.team}</div>
                  </div>
                  <div style={{ width: 18, height: 18, borderRadius: 4,
                    background: p.s === 'L' ? 'var(--pitch-sl)' : p.s === 'S' ? 'var(--warn)' : 'var(--clay-deep)',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 10 }}>{p.s}</div>
                  <div className="sb-num" style={{ textAlign: 'right' }}>{p.avg}</div>
                  <div className="sb-num" style={{ textAlign: 'right', fontWeight: 700 }}>{p.ops}</div>
                  <div className="sb-num" style={{ textAlign: 'right', color: 'rgba(27,34,48,0.65)' }}>{p.hr}</div>
                  <div style={{ textAlign: 'right', fontSize: 11, color: 'rgba(27,34,48,0.45)' }}>›</div>
                </div>
              ))}
            </div>

            {/* compare floating bar */}
            <div style={{ position: 'sticky', bottom: 16, marginTop: 16, padding: '10px 14px',
              background: 'var(--ink)', color: '#fff', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow-md)' }}>
              <div style={{ fontSize: 12, fontWeight: 600 }}>已選 1 位</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <Chip tone="clay" solid>#23 王立祥 ✕</Chip>
              </div>
              <span style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>選 2 位以對比</span>
              <button style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: 'var(--clay)', color: '#fff', fontSize: 12, fontWeight: 700 }}>對比 →</button>
            </div>
          </div>

          {/* drawer */}
          <div style={{ borderLeft: '1px solid rgba(27,34,48,0.08)', overflow: 'auto', background: 'var(--chalk)' }}>
            <div style={{ padding: 18, background: 'linear-gradient(135deg, var(--ink), var(--ink-2))', color: '#fff', position: 'relative', overflow: 'hidden' }}>
              <JerseyWatermark num={23} />
              <Chip tone="grass" solid>1B</Chip>
              <div className="sb-display" style={{ fontSize: 24, fontWeight: 700, marginTop: 6 }}>#23 王立祥</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>樹德高中 · R 右打 · 183cm</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 12, position: 'relative' }}>
                {[['AVG', '.356'], ['OPS', '.998'], ['HR', '12'], ['SB', '8']].map(([l, v], i) => (
                  <div key={i}>
                    <div className="sb-display" style={{ fontSize: 8, color: 'var(--clay-soft)', letterSpacing: '0.14em' }}>{l}</div>
                    <div className="sb-num" style={{ fontSize: 20, marginTop: 2 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: 16 }}>
              <div className="sb-display" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'rgba(27,34,48,0.55)', marginBottom: 8 }}>九宮格 · 近 30 天</div>
              <StrikeZone3x3 data={[
                [{ v: 0.31, n: 14 }, { v: 0.38, n: 22 }, { v: 0.22, n: 18 }],
                [{ v: 0.42, n: 18 }, { v: 0.51, n: 28 }, { v: 0.18, n: 20 }],
                [{ v: 0.28, n: 16 }, { v: 0.35, n: 22 }, { v: 0.12, n: 26 }],
              ]} size={180}/>

              <div style={{ marginTop: 14 }}>
                <div className="sb-display" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'rgba(27,34,48,0.55)', marginBottom: 8 }}>球種 TOP 3</div>
                {[
                  { code: 'FB', avg: 0.388, n: 64, league: 0.265 },
                  { code: 'SI', avg: 0.342, n: 38, league: 0.265 },
                  { code: 'CB', avg: 0.165, n: 28, league: 0.265 },
                ].map((b) => (
                  <div key={b.code} style={{ marginBottom: 8 }}>
                    <HBar label={`${b.code} ${PITCH_NAMES[b.code]}`} value={b.avg} n={b.n} league={b.league}
                      color={PITCH_COLORS[b.code]} mode="avg" />
                  </div>
                ))}
              </div>

              <button style={{ width: '100%', marginTop: 14, padding: 12, borderRadius: 10, border: 'none',
                background: 'var(--ink)', color: '#fff', fontWeight: 700, fontSize: 13 }}>查看完整球探報告 →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { WebSidebar, WebTopBar, Web_Dashboard, Web_Players });

/* sb-app-1.jsx — App screens: Login, Dashboard, Setup Wizard */

// ═══════════════ 0. 登入 · Google SSO ═══════════════
function Screen_Login() {
  return (
    <div className="sb-root" style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse at 50% 80%, #1B3D55 0%, #0E1B28 50%, #0A1118 100%)',
      overflow: 'hidden', color: '#fff',
    }}>
      {/* outfield grass */}
      <svg viewBox="0 0 393 852" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="lg-grass" cx="50%" cy="100%" r="80%">
            <stop offset="0%" stopColor="#2D4F1F" />
            <stop offset="50%" stopColor="#1A2F12" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="196" cy="900" rx="380" ry="180" fill="url(#lg-grass)"/>
        {/* chalk diamond */}
        <g opacity="0.5">
          <line x1="196" y1="780" x2="80" y2="660" stroke="#FBF7EE" strokeWidth="2" strokeDasharray="6 4"/>
          <line x1="196" y1="780" x2="312" y2="660" stroke="#FBF7EE" strokeWidth="2" strokeDasharray="6 4"/>
        </g>
        {/* tiny stadium lights */}
        {[60, 140, 220, 300].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy="120" r="1.5" fill="#FBF7EE"/>
            <circle cx={x} cy="120" r="8" fill="#FBF7EE" opacity="0.15"/>
          </g>
        ))}
      </svg>

      {/* status bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <IOSStatusBar dark={true} />
      </div>

      {/* logo + tagline */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 180, textAlign: 'center', zIndex: 2 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <svg width="44" height="44" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="20" fill="#F4ECDA"/>
            <path d="M8 14 Q22 24 36 14" fill="none" stroke="#C24C2F" strokeWidth="2"/>
            <path d="M8 30 Q22 20 36 30" fill="none" stroke="#C24C2F" strokeWidth="2"/>
            <path d="M11 14 m-1 0 v3 M14 14 v3 M17 14 v3 M20 14 v3 M23 14 v3 M26 14 v3 M29 14 v3 M32 14 v3"
              stroke="#C24C2F" strokeWidth="1"/>
          </svg>
        </div>
        <div className="sb-display" style={{ fontSize: 42, fontWeight: 700, letterSpacing: '0.14em' }}>
          SCOUTBOOK
        </div>
        <div style={{ marginTop: 6, fontSize: 13, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.2em' }}>
          球 探 筆 記
        </div>
        <div style={{ marginTop: 32, fontSize: 14, color: 'rgba(255,255,255,0.55)', maxWidth: 240, margin: '32px auto 0', lineHeight: 1.6 }}>
          記錄每一顆球。<br/>讓 AI 替你解讀對手。
        </div>
      </div>

      {/* CTA stack */}
      <div style={{ position: 'absolute', left: 24, right: 24, bottom: 90, zIndex: 2,
        display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button style={{
          height: 52, borderRadius: 14, border: 'none', cursor: 'pointer',
          background: '#fff', color: '#1B2230',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          fontFamily: 'var(--f-body)', fontSize: 15, fontWeight: 700,
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path d="M19.6 10.2c0-.7-.1-1.4-.2-2H10v3.8h5.4c-.2 1.3-.9 2.3-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" fill="#4285F4"/>
            <path d="M10 20c2.7 0 5-.9 6.7-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H1.2v2.6C2.9 17.9 6.2 20 10 20z" fill="#34A853"/>
            <path d="M4.4 11.9c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V5.5H1.2C.4 7 0 8.4 0 10s.4 3 1.2 4.5l3.2-2.6z" fill="#FBBC05"/>
            <path d="M10 4c1.5 0 2.8.5 3.8 1.5l2.9-2.9C15 1.2 12.7 0 10 0 6.2 0 2.9 2.1 1.2 5.5l3.2 2.6c.8-2.4 3-4.1 5.6-4.1z" fill="#EA4335"/>
          </svg>
          使用 Google 帳號繼續
        </button>
        <button style={{
          height: 44, borderRadius: 14, border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer',
          background: 'transparent', color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 500,
        }}>以訪客身份試用</button>
        <div style={{ textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
          繼續即代表同意 <u>服務條款</u> 與 <u>隱私政策</u>
        </div>
      </div>
    </div>
  );
}

// ═══════════════ 1. 主控台 Dashboard ═══════════════
function Screen_Dashboard() {
  return (
    <div className="sb-root sb-paper-bg" style={{ position: 'absolute', inset: 0, background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <IOSStatusBar />
      </div>

      {/* top bar */}
      <div style={{ paddingTop: 56, padding: '56px 18px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="28" height="28" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="20" fill="var(--ink)"/>
            <path d="M8 14 Q22 24 36 14" fill="none" stroke="#C24C2F" strokeWidth="2"/>
            <path d="M8 30 Q22 20 36 30" fill="none" stroke="#C24C2F" strokeWidth="2"/>
          </svg>
          <div className="sb-display" style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.12em' }}>SCOUTBOOK</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 2a6 6 0 016 6c0 5 3 6 3 6H3s3-1 3-6a6 6 0 016-6zm-2 18a2 2 0 004 0" stroke="var(--ink)" strokeWidth="1.6" fill="none" strokeLinecap="round"/></svg>
            <span style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderRadius: '50%', background: 'var(--ball)', border: '1.5px solid var(--paper)' }}/>
          </div>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--clay)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>李</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '14px 18px 100px' }}>
        {/* greeting */}
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 14, color: 'rgba(27,34,48,0.6)', marginBottom: 2 }}>2026 春季賽 · 第 7 週</div>
          <div className="sb-display" style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2 }}>
            李教練,<br/>今天賽前準備了嗎?
          </div>
        </div>

        {/* next game banner */}
        <div style={{
          marginTop: 14, padding: 14, borderRadius: 14,
          background: 'linear-gradient(135deg, var(--ink) 0%, var(--ink-2) 100%)',
          color: '#fff', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.08 }}>
            <svg width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="55" fill="none" stroke="#fff" strokeWidth="6"/><path d="M16 38 Q60 70 104 38 M16 82 Q60 50 104 82" stroke="#C24C2F" strokeWidth="3" fill="none"/></svg>
          </div>
          <div style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--clay-soft)', fontFamily: 'var(--f-display)' }}>下一場 · TOMORROW 14:00</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
            <div>
              <div className="sb-display" style={{ fontSize: 20, fontWeight: 700 }}>VS 高雄海豚</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>客場 · 高雄澄清湖棒球場</div>
            </div>
            <Chip tone="clay" solid>賽前準備 ▸</Chip>
          </div>
        </div>

        {/* stats strip */}
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          {[
            { label: 'W-L', value: '14-6', sub: '名次 #2' },
            { label: 'TEAM AVG', value: '.298', sub: '聯盟 .265' },
            { label: 'TEAM ERA', value: '3.42', sub: 'WHIP 1.21' },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: 10, background: 'var(--chalk)', borderRadius: 12, border: '1px solid rgba(27,34,48,0.06)' }}>
              <KPI {...s} valueSize={20} />
            </div>
          ))}
        </div>

        {/* three tiles */}
        <div style={{ marginTop: 18 }}>
          <div className="sb-display" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'rgba(27,34,48,0.55)', marginBottom: 8 }}>主要工具</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { num: '01', title: '新增比賽', sub: '開始新一場記錄', accent: 'var(--clay)', icon: '⊕' },
              { num: '02', title: '球探報告', sub: '查看歷史比賽分析', accent: 'var(--grass)', icon: '◆' },
              { num: '03', title: '球員資料庫', sub: '搜尋 248 位球員', accent: 'var(--ink)', icon: '☰' },
            ].map((t) => (
              <div key={t.num} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: 14,
                background: 'var(--chalk)', borderRadius: 14, border: '1px solid rgba(27,34,48,0.06)',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: t.accent, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700 }}>{t.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span className="sb-display" style={{ fontSize: 10, color: 'rgba(27,34,48,0.45)' }}>{t.num}</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{t.title}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(27,34,48,0.55)', marginTop: 2 }}>{t.sub}</div>
                </div>
                <span style={{ color: 'rgba(27,34,48,0.3)' }}>›</span>
              </div>
            ))}
          </div>
        </div>

        {/* recent games */}
        <div style={{ marginTop: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div className="sb-display" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'rgba(27,34,48,0.55)' }}>最近比賽</div>
            <span style={{ fontSize: 11, color: 'var(--clay-deep)' }}>查看全部 ›</span>
          </div>
          <div style={{ background: 'var(--chalk)', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(27,34,48,0.06)' }}>
            {[
              { date: '05/14', opp: '台南獅子', score: '7-3', result: 'W', sp: '林建宏' },
              { date: '05/11', opp: '台中神龍', score: '4-5', result: 'L', sp: '張子凡' },
              { date: '05/08', opp: '新竹勇者', score: '12-2', result: 'W', sp: '林建宏' },
              { date: '05/05', opp: '彰化雷霆', score: '6-6', result: 'T', sp: '吳明翰' },
            ].map((g, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '10px 12px',
                borderTop: i ? '1px solid rgba(27,34,48,0.06)' : 'none' }}>
                <div style={{ width: 28, height: 28, borderRadius: 6,
                  background: g.result === 'W' ? 'var(--strike)' : g.result === 'L' ? 'var(--ball)' : 'var(--warn)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 13 }}>{g.result}</div>
                <div style={{ marginLeft: 10, flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>VS {g.opp}</div>
                  <div style={{ fontSize: 10, color: 'rgba(27,34,48,0.5)' }}>{g.date} · 先發 {g.sp}</div>
                </div>
                <div className="sb-num" style={{ fontSize: 17, color: 'var(--ink)' }}>{g.score}</div>
              </div>
            ))}
          </div>
        </div>

        {/* pre-game tip */}
        <div style={{ marginTop: 14, padding: 12, background: 'var(--clay-pale)', borderRadius: 12, border: '1px dashed var(--clay)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span className="sb-display" style={{ fontSize: 10, color: 'var(--clay-deep)', letterSpacing: '0.14em', fontWeight: 700 }}>✦ 賽前提醒</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.55 }}>
            明日先發投手 <b>陳冠樺</b>(R) 對左打 OPS 達 .892,建議陳俊安、林志強(L) 提前上場。
          </div>
        </div>
      </div>

      <BottomNav active={0} items={[
        { label: '首頁', icon: <svg viewBox="0 0 24 24" width="22"><path d="M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1z" fill="currentColor"/></svg> },
        { label: '比賽', icon: <svg viewBox="0 0 24 24" width="22"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M5 7 Q12 13 19 7 M5 17 Q12 11 19 17" stroke="currentColor" strokeWidth="1.6" fill="none"/></svg> },
        { label: '球員', icon: <svg viewBox="0 0 24 24" width="22"><circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M4 20c0-4 4-7 8-7s8 3 8 7" fill="none" stroke="currentColor" strokeWidth="1.6"/></svg> },
        { label: '市集', icon: <svg viewBox="0 0 24 24" width="22"><path d="M3 7h18l-1.5 11a2 2 0 01-2 1.7H6.5a2 2 0 01-2-1.7L3 7zM8 7V5a4 4 0 018 0v2" fill="none" stroke="currentColor" strokeWidth="1.6"/></svg> },
      ]} />
    </div>
  );
}

// ═══════════════ 2. Setup Wizard (4 steps shown collapsed) ═══════════════
function Screen_Wizard() {
  return (
    <div className="sb-root sb-paper-bg" style={{ position: 'absolute', inset: 0, background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}><IOSStatusBar /></div>

      {/* nav */}
      <div style={{ paddingTop: 56, padding: '56px 16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button style={{ border: 'none', background: 'transparent', fontSize: 14, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2l-5 5 5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          取消
        </button>
        <div style={{ fontSize: 13, fontWeight: 700 }}>新增比賽</div>
        <div style={{ width: 30 }}/>
      </div>

      {/* stepper */}
      <div style={{ padding: '16px 24px 8px' }}>
        <Stepper steps={['隊伍', '打序', '投手', '資訊']} active={1} />
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '8px 16px 100px' }}>
        {/* Step 2 · 打序 */}
        <div className="sb-display" style={{ fontSize: 11, color: 'rgba(27,34,48,0.55)', letterSpacing: '0.14em', marginTop: 6 }}>STEP 02 · 打序</div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 6 }}>
          <div className="sb-display" style={{ fontSize: 22, fontWeight: 700 }}>我方打序</div>
          <div style={{ fontSize: 11, color: 'rgba(27,34,48,0.5)' }}>高中 · 建議 9 棒</div>
        </div>

        {/* segmented */}
        <div style={{ marginTop: 10, padding: 3, background: 'var(--chalk)', borderRadius: 10, border: '1px solid rgba(27,34,48,0.06)', display: 'flex' }}>
          {['我方 樹德高中', '對方 高雄海豚'].map((t, i) => (
            <button key={i} style={{
              flex: 1, padding: '8px', border: 'none', borderRadius: 8,
              background: i === 0 ? 'var(--ink)' : 'transparent',
              color: i === 0 ? '#fff' : 'var(--ink)',
              fontSize: 12, fontWeight: 600,
            }}>{t}</button>
          ))}
        </div>

        {/* lineup list */}
        <div style={{ marginTop: 12, background: 'var(--chalk)', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(27,34,48,0.06)' }}>
          {[
            { o: 1, pos: 'CF', n: 7, name: '陳俊安', s: 'L', avg: '.342' },
            { o: 2, pos: '2B', n: 11, name: '張庭瑋', s: 'R', avg: '.298' },
            { o: 3, pos: '1B', n: 23, name: '王立祥', s: 'R', avg: '.356', hot: true },
            { o: 4, pos: 'DH', n: 9, name: '林志強', s: 'L', avg: '.312' },
            { o: 5, pos: 'C', n: 18, name: '吳浩然', s: 'R', avg: '.275' },
            { o: 6, pos: 'LF', n: 4, name: '陳家豪', s: 'S', avg: '.244' },
            { o: 7, pos: 'RF', n: 21, name: '林宇翔', s: 'R', avg: '.268' },
            { o: 8, pos: '3B', n: 6, name: '黃子昕', s: 'R', avg: '.221' },
            { o: 9, pos: 'SS', n: 14, name: '蔡承恩', s: 'L', avg: '.255' },
          ].map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '8px 12px',
              borderTop: i ? '1px solid rgba(27,34,48,0.06)' : 'none' }}>
              <div className="sb-display" style={{ width: 22, color: 'var(--clay-deep)', fontWeight: 700, fontSize: 16 }}>{p.o}</div>
              <Chip tone="ink" style={{ width: 38, justifyContent: 'center' }}>{p.pos}</Chip>
              <div style={{ width: 36, textAlign: 'center', fontFamily: 'var(--f-display)', fontWeight: 700, color: 'var(--ink)' }}>#{p.n}</div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</span>
                {p.hot && <Chip tone="hot" solid style={{ padding: '2px 5px', fontSize: 9 }}>HOT</Chip>}
              </div>
              <div style={{ width: 22, height: 22, borderRadius: 6,
                background: p.s === 'L' ? 'var(--pitch-sl)' : p.s === 'S' ? 'var(--warn)' : 'var(--clay-deep)',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 11 }}>{p.s}</div>
              <div className="sb-num" style={{ width: 44, textAlign: 'right', fontSize: 13, color: 'var(--ink)' }}>{p.avg}</div>
            </div>
          ))}
        </div>

        <button style={{ width: '100%', marginTop: 12, padding: 12, background: 'transparent',
          border: '1.5px dashed rgba(27,34,48,0.2)', borderRadius: 12, color: 'var(--ink-3)',
          fontSize: 13, fontWeight: 600 }}>+ 新增打者</button>

        {/* preview card */}
        <div style={{ marginTop: 16, padding: 14, background: 'var(--ink)', borderRadius: 14, color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <div className="sb-display" style={{ fontSize: 9, color: 'var(--clay-soft)', letterSpacing: '0.16em' }}>VS · 對戰預覽</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
            <div style={{ flex: 1 }}>
              <div className="sb-display" style={{ fontSize: 18, fontWeight: 700 }}>樹德高中</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)' }}>主場 · W14-L6</div>
            </div>
            <div className="sb-display" style={{ fontSize: 22, color: 'var(--clay-soft)' }}>VS</div>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <div className="sb-display" style={{ fontSize: 18, fontWeight: 700 }}>高雄海豚</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)' }}>客場 · W10-L9</div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom nav buttons */}
      <div style={{ padding: '12px 16px 28px', display: 'flex', gap: 10, background: 'var(--paper)', borderTop: '1px solid rgba(27,34,48,0.06)' }}>
        <button style={{ flex: 1, padding: 14, borderRadius: 12, border: '1px solid rgba(27,34,48,0.2)',
          background: 'transparent', color: 'var(--ink)', fontSize: 14, fontWeight: 600 }}>← 上一步</button>
        <button style={{ flex: 2, padding: 14, borderRadius: 12, border: 'none',
          background: 'var(--ink)', color: '#fff', fontSize: 14, fontWeight: 700 }}>下一步 →</button>
      </div>
    </div>
  );
}

Object.assign(window, { Screen_Login, Screen_Dashboard, Screen_Wizard });

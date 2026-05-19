/* proto-screens.jsx — Login, Dashboard, Wizard, Result
   All wired to state via useGame(). Atoms come from sb-atoms.jsx.
*/

// ═════════════ shared atoms ═════════════
function NavBar({ title, onBack, right, dark = false }) {
  const fg = dark ? '#fff' : 'var(--ink)';
  const bg = dark ? 'rgba(255,255,255,0.08)' : 'rgba(27,34,48,0.05)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 16px 8px', minHeight: 44 }}>
      {onBack ? (
        <button onClick={onBack} style={{ border: 'none', background: bg, color: fg,
          width: 36, height: 36, borderRadius: 10, fontSize: 18, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 16 16"><path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      ) : <div style={{ width: 36 }}/>}
      <div style={{ fontSize: 14, fontWeight: 700, color: fg }}>{title}</div>
      <div style={{ width: 36, display: 'flex', justifyContent: 'flex-end' }}>{right}</div>
    </div>
  );
}

function PressableTile({ children, onClick, style = {} }) {
  const [pressed, setPressed] = React.useState(false);
  return (
    <button
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onClick={onClick}
      style={{
        all: 'unset', cursor: 'pointer', display: 'block', width: '100%',
        transform: pressed ? 'scale(0.98)' : 'scale(1)',
        transition: 'transform 120ms ease, opacity 120ms ease',
        opacity: pressed ? 0.92 : 1,
        boxSizing: 'border-box',
        ...style,
      }}>{children}</button>
  );
}

// ═════════════ 0. Login ═════════════
function ProtoLogin() {
  const [, dispatch] = useGame();
  const [busy, setBusy] = React.useState(false);
  const handleLogin = (name) => {
    setBusy(true);
    setTimeout(() => dispatch({ type: 'LOGIN', name }), 480);
  };
  return (
    <div className="sb-root" style={{ position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse at 50% 80%, #1B3D55 0%, #0E1B28 50%, #0A1118 100%)',
      overflow: 'hidden', color: '#fff' }}>
      <svg viewBox="0 0 393 852" preserveAspectRatio="xMidYMax slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="lg-grass-p" cx="50%" cy="100%" r="80%">
            <stop offset="0%" stopColor="#2D4F1F" />
            <stop offset="50%" stopColor="#1A2F12" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="196" cy="900" rx="380" ry="180" fill="url(#lg-grass-p)"/>
        <g opacity="0.5">
          <line x1="196" y1="780" x2="80" y2="660" stroke="#FBF7EE" strokeWidth="2" strokeDasharray="6 4"/>
          <line x1="196" y1="780" x2="312" y2="660" stroke="#FBF7EE" strokeWidth="2" strokeDasharray="6 4"/>
        </g>
        {[60, 140, 220, 300].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy="120" r="1.5" fill="#FBF7EE"/>
            <circle cx={x} cy="120" r="8" fill="#FBF7EE" opacity="0.15"/>
          </g>
        ))}
      </svg>

      <div style={{ position: 'absolute', left: 0, right: 0, top: '22%', textAlign: 'center', zIndex: 2 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <svg width="56" height="56" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="20" fill="#F4ECDA"/>
            <path d="M8 14 Q22 24 36 14" fill="none" stroke="#C24C2F" strokeWidth="2"/>
            <path d="M8 30 Q22 20 36 30" fill="none" stroke="#C24C2F" strokeWidth="2"/>
            <path d="M11 14 m-1 0 v3 M14 14 v3 M17 14 v3 M20 14 v3 M23 14 v3 M26 14 v3 M29 14 v3 M32 14 v3"
              stroke="#C24C2F" strokeWidth="1"/>
          </svg>
        </div>
        <div className="sb-display" style={{ fontSize: 46, fontWeight: 700, letterSpacing: '0.14em' }}>SCOUTBOOK</div>
        <div style={{ marginTop: 6, fontSize: 13, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.2em' }}>球 探 筆 記</div>
        <div style={{ marginTop: 32, fontSize: 14, color: 'rgba(255,255,255,0.55)', maxWidth: 260, margin: '32px auto 0', lineHeight: 1.6 }}>
          記錄每一顆球。<br/>讓 AI 替你解讀對手。
        </div>
      </div>

      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        bottom: 'max(60px, env(safe-area-inset-bottom))', zIndex: 2,
        width: 'min(360px, calc(100% - 40px))',
        display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button disabled={busy} onClick={() => handleLogin('李教練')}
          style={{
            height: 54, borderRadius: 14, border: 'none', cursor: busy ? 'wait' : 'pointer',
            background: '#fff', color: '#1B2230',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            fontFamily: 'var(--f-body)', fontSize: 15, fontWeight: 700,
            opacity: busy ? 0.6 : 1, transition: 'opacity 150ms',
          }}>
          {busy ? (
            <span className="sb-display" style={{ fontSize: 13, letterSpacing: '0.18em' }}>登入中…</span>
          ) : (<>
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M19.6 10.2c0-.7-.1-1.4-.2-2H10v3.8h5.4c-.2 1.3-.9 2.3-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" fill="#4285F4"/>
              <path d="M10 20c2.7 0 5-.9 6.7-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H1.2v2.6C2.9 17.9 6.2 20 10 20z" fill="#34A853"/>
              <path d="M4.4 11.9c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V5.5H1.2C.4 7 0 8.4 0 10s.4 3 1.2 4.5l3.2-2.6z" fill="#FBBC05"/>
              <path d="M10 4c1.5 0 2.8.5 3.8 1.5l2.9-2.9C15 1.2 12.7 0 10 0 6.2 0 2.9 2.1 1.2 5.5l3.2 2.6c.8-2.4 3-4.1 5.6-4.1z" fill="#EA4335"/>
            </svg>
            使用 Google 帳號繼續
          </>)}
        </button>
        <button onClick={() => handleLogin('訪客')}
          style={{ height: 46, borderRadius: 14, border: '1px solid rgba(255,255,255,0.2)',
            cursor: 'pointer', background: 'transparent', color: 'rgba(255,255,255,0.85)',
            fontSize: 13, fontWeight: 500 }}>以訪客身份試用</button>
        <div style={{ textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
          繼續即代表同意 <u>服務條款</u> 與 <u>隱私政策</u>
        </div>
      </div>
    </div>
  );
}

// ═════════════ 1. Dashboard ═════════════
function ProtoDashboard() {
  const [state, dispatch] = useGame();
  const user = state.auth.user || { avatar: '李', name: '李教練' };
  return (
    <div className="sb-root sb-paper-bg" style={{ position: 'absolute', inset: 0, background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      {/* top bar */}
      <div style={{ padding: '16px 18px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--clay)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{user.avatar}</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '14px 18px 24px' }}>
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 14, color: 'rgba(27,34,48,0.6)', marginBottom: 2 }}>2026 春季賽 · 第 7 週</div>
          <div className="sb-display" style={{ fontSize: 28, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2 }}>
            {user.name},<br/>今天賽前準備了嗎?
          </div>
        </div>

        <PressableTile onClick={() => dispatch({ type: 'NAV', screen: 'wizard' })}
          style={{ marginTop: 16, padding: 16, borderRadius: 14,
            background: 'linear-gradient(135deg, var(--ink) 0%, var(--ink-2) 100%)',
            color: '#fff', position: 'relative', overflow: 'hidden', textAlign: 'left' }}>
          <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.08 }}>
            <svg width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="55" fill="none" stroke="#fff" strokeWidth="6"/><path d="M16 38 Q60 70 104 38 M16 82 Q60 50 104 82" stroke="#C24C2F" strokeWidth="3" fill="none"/></svg>
          </div>
          <div style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--clay-soft)', fontFamily: 'var(--f-display)' }}>下一場 · TOMORROW 14:00</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
            <div>
              <div className="sb-display" style={{ fontSize: 22, fontWeight: 700 }}>VS 高雄海豚</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>主場 · 樹德棒球場</div>
            </div>
            <Chip tone="clay" solid>賽前準備 ▸</Chip>
          </div>
        </PressableTile>

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

        <div style={{ marginTop: 20 }}>
          <div className="sb-display" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'rgba(27,34,48,0.55)', marginBottom: 8 }}>主要工具</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { num: '01', title: '新增比賽', sub: '開始新一場記錄', accent: 'var(--clay)', icon: '⊕', action: () => dispatch({ type: 'NAV', screen: 'wizard' }) },
              { num: '02', title: '球探報告', sub: '查看歷史比賽分析', accent: 'var(--grass)', icon: '◆', action: () => alert('原型示範:聚焦於場邊記錄流程,此處未實作') },
              { num: '03', title: '球員資料庫', sub: '搜尋 248 位球員', accent: 'var(--ink)', icon: '☰', action: () => alert('原型示範:聚焦於場邊記錄流程,此處未實作') },
            ].map((t) => (
              <PressableTile key={t.num} onClick={t.action}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14,
                  background: 'var(--chalk)', borderRadius: 14, border: '1px solid rgba(27,34,48,0.06)',
                  boxShadow: 'var(--shadow-sm)', textAlign: 'left' }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: t.accent, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, flexShrink: 0 }}>{t.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span className="sb-display" style={{ fontSize: 10, color: 'rgba(27,34,48,0.45)' }}>{t.num}</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{t.title}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(27,34,48,0.55)', marginTop: 2 }}>{t.sub}</div>
                </div>
                <span style={{ color: 'rgba(27,34,48,0.3)', fontSize: 20 }}>›</span>
              </PressableTile>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <div className="sb-display" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'rgba(27,34,48,0.55)', marginBottom: 8 }}>最近比賽</div>
          <div style={{ background: 'var(--chalk)', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(27,34,48,0.06)' }}>
            {[
              { date: '05/14', opp: '台南獅子', score: '7-3', result: 'W', sp: '林建宏' },
              { date: '05/11', opp: '台中神龍', score: '4-5', result: 'L', sp: '張子凡' },
              { date: '05/08', opp: '新竹勇者', score: '12-2', result: 'W', sp: '林建宏' },
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

        <div style={{ marginTop: 14, padding: 12, background: 'var(--clay-pale)', borderRadius: 12, border: '1px dashed var(--clay)' }}>
          <div className="sb-display" style={{ fontSize: 10, color: 'var(--clay-deep)', letterSpacing: '0.14em', fontWeight: 700, marginBottom: 4 }}>✦ 賽前提醒</div>
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

// ═════════════ 2. Wizard ═════════════
const WIZARD_STEPS = ['隊伍', '打序', '投手', '資訊'];

function ProtoWizard() {
  const [state, dispatch] = useGame();
  const { step } = state.setup;

  return (
    <div className="sb-root sb-paper-bg" style={{ position: 'absolute', inset: 0, background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <NavBar
        title="新增比賽"
        onBack={() => step === 0 ? dispatch({ type: 'NAV_BACK' }) : dispatch({ type: 'WIZARD_PREV' })}
        right={<button onClick={() => dispatch({ type: 'NAV_BACK' })}
          style={{ border: 'none', background: 'transparent', color: 'var(--clay-deep)', fontSize: 13, cursor: 'pointer', padding: 8 }}>取消</button>}
      />
      <div style={{ padding: '6px 24px 8px' }}>
        <Stepper steps={WIZARD_STEPS} active={step}/>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '8px 16px 16px' }}>
        {step === 0 && <WizardStepTeams/>}
        {step === 1 && <WizardStepLineup/>}
        {step === 2 && <WizardStepPitcher/>}
        {step === 3 && <WizardStepInfo/>}
      </div>

      <div style={{ padding: '12px 16px max(20px, env(safe-area-inset-bottom))',
        display: 'flex', gap: 10, background: 'var(--paper)', borderTop: '1px solid rgba(27,34,48,0.06)' }}>
        {step > 0 && (
          <button onClick={() => dispatch({ type: 'WIZARD_PREV' })}
            style={{ flex: 1, padding: 14, borderRadius: 12, border: '1px solid rgba(27,34,48,0.2)',
              background: 'transparent', color: 'var(--ink)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>← 上一步</button>
        )}
        <button onClick={() => dispatch({ type: 'WIZARD_NEXT' })}
          style={{ flex: 2, padding: 14, borderRadius: 12, border: 'none',
            background: 'var(--ink)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
          {step >= 3 ? '開始比賽 ●' : '下一步 →'}
        </button>
      </div>
    </div>
  );
}

function WizardStepTeams() {
  const [state, dispatch] = useGame();
  const { setup } = state;
  const [side, setSide] = React.useState('home');
  return (
    <div>
      <div className="sb-display" style={{ fontSize: 11, color: 'rgba(27,34,48,0.55)', letterSpacing: '0.14em', marginTop: 6 }}>STEP 01 · 隊伍</div>
      <div className="sb-display" style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>選擇對戰隊伍</div>

      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <FieldInput label="我方隊伍" value={setup.ourTeam}
          onChange={(v) => dispatch({ type: 'WIZARD_UPDATE', patch: { ourTeam: v } })}/>
        <FieldInput label="對方隊伍" value={setup.oppTeam}
          onChange={(v) => dispatch({ type: 'WIZARD_UPDATE', patch: { oppTeam: v } })}/>
      </div>

      <div className="sb-display" style={{ fontSize: 11, color: 'rgba(27,34,48,0.55)', letterSpacing: '0.14em', marginTop: 20, marginBottom: 8 }}>主客場</div>
      <div style={{ display: 'flex', gap: 8 }}>
        {[
          { code: 'home', label: '主場', sub: '樹德棒球場' },
          { code: 'away', label: '客場', sub: '澄清湖' },
        ].map((s) => (
          <PressableTile key={s.code} onClick={() => { setSide(s.code); dispatch({ type: 'WIZARD_UPDATE', patch: { venue: (s.code === 'home' ? '主場 · 樹德棒球場' : '客場 · 澄清湖') } }); }}
            style={{ flex: 1, padding: 14, borderRadius: 12, textAlign: 'left',
              background: side === s.code ? 'var(--ink)' : 'var(--chalk)',
              color: side === s.code ? '#fff' : 'var(--ink)',
              border: side === s.code ? '1px solid var(--ink)' : '1px solid rgba(27,34,48,0.08)' }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{s.label}</div>
            <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{s.sub}</div>
          </PressableTile>
        ))}
      </div>

      <div style={{ marginTop: 18, padding: 14, background: 'var(--ink)', borderRadius: 14, color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div className="sb-display" style={{ fontSize: 9, color: 'var(--clay-soft)', letterSpacing: '0.16em' }}>VS · 對戰預覽</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
          <div style={{ flex: 1 }}>
            <div className="sb-display" style={{ fontSize: 18, fontWeight: 700 }}>{setup.ourTeam}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)' }}>{setup.venue}</div>
          </div>
          <div className="sb-display" style={{ fontSize: 22, color: 'var(--clay-soft)' }}>VS</div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <div className="sb-display" style={{ fontSize: 18, fontWeight: 700 }}>{setup.oppTeam}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)' }}>客隊 · W10-L9</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldInput({ label, value, onChange }) {
  return (
    <label style={{ display: 'block' }}>
      <div className="sb-display" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'rgba(27,34,48,0.5)', marginBottom: 4 }}>{label}</div>
      <input value={value} onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%', padding: '12px 14px', fontSize: 15, fontWeight: 600, color: 'var(--ink)',
          background: 'var(--chalk)', border: '1px solid rgba(27,34,48,0.1)', borderRadius: 12, outline: 'none',
          fontFamily: 'var(--f-body)' }}/>
    </label>
  );
}

function WizardStepLineup() {
  const [state, dispatch] = useGame();
  const lineup = state.setup.lineup;
  const [dragIdx, setDragIdx] = React.useState(null);
  return (
    <div>
      <div className="sb-display" style={{ fontSize: 11, color: 'rgba(27,34,48,0.55)', letterSpacing: '0.14em', marginTop: 6 }}>STEP 02 · 打序</div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 6 }}>
        <div className="sb-display" style={{ fontSize: 22, fontWeight: 700 }}>我方打序</div>
        <div style={{ fontSize: 11, color: 'rgba(27,34,48,0.5)' }}>長按拖曳調整</div>
      </div>

      <div style={{ marginTop: 12, background: 'var(--chalk)', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(27,34,48,0.06)' }}>
        {lineup.map((p, i) => (
          <div key={p.n} draggable
            onDragStart={() => setDragIdx(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => { if (dragIdx != null && dragIdx !== i) dispatch({ type: 'WIZARD_REORDER_LINEUP', from: dragIdx, to: i }); setDragIdx(null); }}
            onDragEnd={() => setDragIdx(null)}
            style={{ display: 'flex', alignItems: 'center', padding: '10px 12px',
              borderTop: i ? '1px solid rgba(27,34,48,0.06)' : 'none', cursor: 'grab',
              background: dragIdx === i ? 'rgba(185,119,68,0.1)' : 'transparent',
              opacity: dragIdx === i ? 0.7 : 1 }}>
            <div style={{ color: 'rgba(27,34,48,0.3)', fontSize: 14, marginRight: 8, cursor: 'grab' }}>⋮⋮</div>
            <div className="sb-display" style={{ width: 22, color: 'var(--clay-deep)', fontWeight: 700, fontSize: 16 }}>{i + 1}</div>
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
    </div>
  );
}

function WizardStepPitcher() {
  const [state, dispatch] = useGame();
  const p = state.setup.pitcher;
  const options = [
    { n: 31, name: '陳冠樺', s: 'R', era: '2.84', vsL: '.298', vsR: '.221', tag: 'SP' },
    { n: 28, name: '黃柏霖', s: 'L', era: '3.65', vsL: '.180', vsR: '.310', tag: 'SP' },
    { n: 45, name: '王宇晨', s: 'R', era: '4.12', vsL: '.295', vsR: '.255', tag: 'RP' },
  ];
  return (
    <div>
      <div className="sb-display" style={{ fontSize: 11, color: 'rgba(27,34,48,0.55)', letterSpacing: '0.14em', marginTop: 6 }}>STEP 03 · 投手</div>
      <div className="sb-display" style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>對方先發投手</div>
      <div style={{ fontSize: 12, color: 'rgba(27,34,48,0.55)', marginTop: 4 }}>選擇對手投手以載入歷史對戰資料</div>

      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {options.map((opt) => {
          const sel = p.n === opt.n;
          return (
            <PressableTile key={opt.n} onClick={() => dispatch({ type: 'WIZARD_UPDATE', patch: { pitcher: opt } })}
              style={{ padding: 14, borderRadius: 14, textAlign: 'left',
                background: sel ? 'var(--ink)' : 'var(--chalk)',
                color: sel ? '#fff' : 'var(--ink)',
                border: sel ? '1px solid var(--ink)' : '1px solid rgba(27,34,48,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="sb-display" style={{ fontSize: 22, fontWeight: 700, opacity: 0.7, width: 38 }}>#{opt.n}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>{opt.name}</span>
                    <Chip tone={sel ? 'paper' : 'clay'} solid style={{ fontSize: 9 }}>{opt.tag}</Chip>
                    <Chip tone={sel ? 'paper' : 'ink'} style={{ fontSize: 9 }}>{opt.s}HP</Chip>
                  </div>
                  <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>ERA {opt.era} · vs L {opt.vsL} / vs R {opt.vsR}</div>
                </div>
                <div style={{ width: 22, height: 22, borderRadius: '50%',
                  border: '2px solid currentColor', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {sel && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--clay-soft)' }}/>}
                </div>
              </div>
            </PressableTile>
          );
        })}
      </div>
    </div>
  );
}

function WizardStepInfo() {
  const [state] = useGame();
  const { setup } = state;
  return (
    <div>
      <div className="sb-display" style={{ fontSize: 11, color: 'rgba(27,34,48,0.55)', letterSpacing: '0.14em', marginTop: 6 }}>STEP 04 · 資訊</div>
      <div className="sb-display" style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>確認資訊 · 開始記錄</div>

      <div style={{ marginTop: 14, padding: 16, background: 'var(--ink)', borderRadius: 14, color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.06 }}>
          <svg width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="55" fill="none" stroke="#fff" strokeWidth="6"/></svg>
        </div>
        <div className="sb-display" style={{ fontSize: 10, color: 'var(--clay-soft)', letterSpacing: '0.18em' }}>READY · GAME ON</div>
        <div className="sb-display" style={{ fontSize: 28, fontWeight: 700, marginTop: 6 }}>{setup.ourTeam}</div>
        <div className="sb-display" style={{ fontSize: 13, color: 'var(--clay-soft)' }}>VS {setup.oppTeam}</div>
        <div style={{ marginTop: 10, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{setup.venue}</div>
        <div className="sb-stitch" style={{ marginTop: 14, marginBottom: 12, background: 'repeating-linear-gradient(90deg, var(--clay-soft) 0 8px, transparent 8px 14px)' }}></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div className="sb-display" style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em' }}>對方先發</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>#{setup.pitcher.n} {setup.pitcher.name} ({setup.pitcher.s}HP)</div>
          </div>
          <div className="sb-num" style={{ fontSize: 22 }}>ERA {setup.pitcher.era}</div>
        </div>
      </div>

      <div style={{ marginTop: 14, padding: 14, background: 'var(--chalk)', borderRadius: 12, border: '1px solid rgba(27,34,48,0.06)' }}>
        <div className="sb-display" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'rgba(27,34,48,0.5)', marginBottom: 6 }}>打序</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {setup.lineup.map((p, i) => (
            <span key={p.n} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 8px',
              background: 'var(--paper-deep)', borderRadius: 8, fontSize: 11 }}>
              <span className="sb-display" style={{ color: 'var(--clay-deep)', fontWeight: 700 }}>{i + 1}.</span>
              <span style={{ fontWeight: 600 }}>{p.name}</span>
            </span>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 14, padding: 12, background: 'var(--clay-pale)', borderRadius: 12, border: '1px dashed var(--clay)' }}>
        <div style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.55 }}>
          <b className="sb-display" style={{ color: 'var(--clay-deep)' }}>✦ 提示:</b> 點擊「開始比賽」進入場邊記錄畫面。輕觸好球帶格子記錄落點 · 長按 800ms 開啟球種選擇圓盤。
        </div>
      </div>
    </div>
  );
}

// ═════════════ 4. Result ═════════════
function ProtoResult() {
  const [state, dispatch] = useGame();
  const { game, setup } = state;
  const stats = computeBatterStats(setup.lineup, game.completedPAs);
  const totalRuns = game.lineScore.us.reduce((a, b) => a + (b || 0), 0);
  const isWin = totalRuns > game.scores.them;

  return (
    <div className="sb-root" style={{ position: 'absolute', inset: 0, background: 'var(--night)', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <NavBar dark title={`${setup.ourTeam} vs ${setup.oppTeam}`}
        onBack={() => dispatch({ type: 'NAV_BACK' })}
        right={<button onClick={() => dispatch({ type: 'RESET' })}
          style={{ border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff',
            width: 36, height: 36, borderRadius: 10, fontSize: 14, cursor: 'pointer' }}>↺</button>}/>

      <div style={{ flex: 1, overflow: 'auto', padding: '6px 14px 28px' }}>
        <div style={{ position: 'relative', background: 'linear-gradient(135deg, #16263A 0%, #0F1922 100%)', borderRadius: 16, padding: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ position: 'absolute', top: 8, right: 12 }}>
            <div style={{ transform: 'rotate(8deg)', border: `2px solid ${isWin ? 'var(--strike)' : 'var(--ball)'}`,
              color: isWin ? 'var(--strike)' : 'var(--ball)',
              padding: '3px 10px', borderRadius: 4, fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 13, letterSpacing: '0.12em' }}>FINAL</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <Chip tone={isWin ? 'strike' : 'ball'} solid>{isWin ? 'WIN' : 'LOSS'}</Chip>
              <div className="sb-display" style={{ fontSize: 16, fontWeight: 700, marginTop: 6 }}>{setup.ourTeam}</div>
              <div className="sb-num" style={{ fontSize: 56, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{totalRuns}</div>
            </div>
            <div className="sb-display" style={{ fontSize: 18, color: 'rgba(255,255,255,0.3)' }}>—</div>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <Chip tone="ghostDark">{isWin ? 'LOSS' : 'WIN'}</Chip>
              <div className="sb-display" style={{ fontSize: 16, marginTop: 6, color: 'rgba(255,255,255,0.7)' }}>{setup.oppTeam}</div>
              <div className="sb-num" style={{ fontSize: 56, fontWeight: 700, color: 'rgba(255,255,255,0.55)', lineHeight: 1 }}>{game.scores.them}</div>
            </div>
          </div>

          <div style={{ marginTop: 12, overflowX: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '38px repeat(9, 1fr) 28px 28px',
              gap: 0, fontSize: 10, fontFamily: 'var(--f-display)', minWidth: 320 }}>
              {['', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'R', 'H'].map((c, i) => (
                <div key={i} style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '4px 0' }}>{c}</div>
              ))}
              {['我', ...game.lineScore.us, totalRuns, stats.reduce((a, p) => a + p.h, 0)].map((c, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '5px 0',
                  background: i === 0 ? 'transparent' : i >= 10 ? 'rgba(255,255,255,0.04)' : 'transparent',
                  fontWeight: i === 0 || i >= 10 ? 700 : 500, color: i === 0 ? 'var(--clay-soft)' : '#fff' }}>{c == null ? '·' : c}</div>
              ))}
              {['敵', ...game.lineScore.them, game.scores.them, 6].map((c, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '5px 0',
                  background: i === 0 ? 'transparent' : i >= 10 ? 'rgba(255,255,255,0.04)' : 'transparent',
                  fontWeight: i === 0 || i >= 10 ? 700 : 500, color: i === 0 ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.85)' }}>{c == null ? '·' : c}</div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <div className="sb-display" style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em', marginBottom: 8 }}>本場打者數據 · MY TEAM</div>
        </div>

        <div style={{ background: 'var(--night-2)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 28px 28px 28px 28px 28px',
            padding: '8px 10px', fontSize: 10, fontFamily: 'var(--f-display)',
            color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div>打者</div>
            {['AB', 'H', 'HR', 'BB', 'K'].map((c, i) => <div key={i} style={{ textAlign: 'right' }}>{c}</div>)}
          </div>
          {stats.map((p, i) => (
            <div key={p.n} style={{ display: 'grid', gridTemplateColumns: '1fr 28px 28px 28px 28px 28px',
              padding: '8px 10px', fontSize: 11, alignItems: 'center',
              borderTop: i ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="sb-display" style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', width: 22 }}>#{p.n}</span>
                <span style={{ fontWeight: 600 }}>{p.name}</span>
                {p.hot && <span style={{ fontSize: 9, color: 'var(--ball)' }}>●</span>}
              </div>
              {[p.ab, p.h, p.hr, p.bb, p.k].map((v, j) => (
                <div key={j} className="sb-num" style={{ textAlign: 'right', color: v > 0 && j === 1 ? 'var(--clay-soft)' : 'rgba(255,255,255,0.85)' }}>{v}</div>
              ))}
            </div>
          ))}
        </div>

        {game.completedPAs.length === 0 && (
          <div style={{ marginTop: 12, padding: 14, border: '1px dashed rgba(255,255,255,0.15)', borderRadius: 12,
            fontSize: 12, color: 'rgba(255,255,255,0.55)', textAlign: 'center' }}>
            這場還沒有完成任何打席。回到記錄畫面繼續吧。
          </div>
        )}

        <PressableTile onClick={() => dispatch({ type: 'RESET' })}
          style={{ marginTop: 14, width: '100%', padding: 14, borderRadius: 12, border: 'none',
            background: 'var(--clay)', color: '#fff', fontWeight: 700, fontSize: 13, textAlign: 'center' }}>
          開始新比賽 →
        </PressableTile>
      </div>
    </div>
  );
}

Object.assign(window, { ProtoLogin, ProtoDashboard, ProtoWizard, ProtoResult, NavBar, PressableTile });

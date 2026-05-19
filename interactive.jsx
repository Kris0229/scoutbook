/* ─────────────────────────────────────────────────────────
   ScoutBook — Interactive Prototype
   Stack-based navigation, iOS-style slide transitions,
   transparent hotspot overlays over original design components.
───────────────────────────────────────────────────────── */

const { useState, useEffect, useCallback, useRef } = React;

/* ─── CSS ────────────────────────────────────────────── */
if (!document.getElementById('ia-styles')) {
  const s = document.createElement('style'); s.id = 'ia-styles';
  s.textContent = `
    @keyframes ia-push { from { transform:translateX(100%) } to { transform:translateX(0) } }
    @keyframes ia-pop  { from { transform:translateX(-26%) } to { transform:translateX(0) } }
    .ia-push { animation: ia-push 0.32s cubic-bezier(0.25,0.82,0.25,1) both }
    .ia-pop  { animation: ia-pop  0.28s cubic-bezier(0.25,0.82,0.25,1) both }
    .ia-hs {
      position:absolute; cursor:pointer; z-index:100; border-radius:8px;
      transition: background 0.1s;
    }
    .ia-hs:hover  { background:rgba(255,255,255,0.06) !important; }
    .ia-hs:active { background:rgba(255,255,255,0.13) !important; }
    .ia-overlay {
      position:absolute; inset:0; z-index:90;
      background: transparent; cursor:pointer;
    }
    .ia-hs-dark:hover  { background:rgba(0,0,0,0.06) !important; }
    .ia-hs-dark:active { background:rgba(0,0,0,0.13) !important; }
  `;
  document.head.appendChild(s);
}

/* ─── Navigation core ─────────────────────────────────── */
function InteractiveApp() {
  const [stack, setStack] = useState([{ screen: 'signin' }]);
  const [dir, setDir] = useState('push');
  const [animKey, setAnimKey] = useState(0);

  const cur = stack[stack.length - 1];

  const push = useCallback((screen, params = {}) => {
    setDir('push'); setAnimKey(k => k + 1);
    setStack(s => [...s, { screen, ...params }]);
  }, []);

  const pop = useCallback(() => {
    if (stack.length <= 1) return;
    setDir('pop'); setAnimKey(k => k + 1);
    setStack(s => s.slice(0, -1));
  }, [stack.length]);

  const replace = useCallback((screen, params = {}) => {
    setDir('push'); setAnimKey(k => k + 1);
    setStack(s => [...s.slice(0, -1), { screen, ...params }]);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'ArrowLeft' && stack.length > 1) pop(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pop, stack.length]);

  const renderScreen = () => {
    const { screen, ...p } = cur;
    switch (screen) {
      case 'signin':       return <NavSignIn push={push} />;
      case 'dashboard':    return <NavDashboard push={push} pop={pop} />;
      case 'player-browse': return <NavPlayerBrowse push={push} pop={pop} />;
      case 'scout-report': return <NavScoutReport push={push} pop={pop} initTab={p.tab || 'ai'} />;
      case 'setup':        return <NavSetup push={push} pop={pop} step={p.step || 0} replace={replace} />;
      case 'record':       return <NavRecord push={push} pop={pop} />;
      case 'stats':        return <NavStats push={push} pop={pop} />;
      case 'heat':         return <NavHeat push={push} pop={pop} />;
      default:             return <NavDashboard push={push} pop={pop} />;
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', background: 'var(--paper)' }}>
      <div key={animKey} className={`ia-${dir}`}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {renderScreen()}
      </div>
    </div>
  );
}

/* ─── Hotspot helper ──────────────────────────────────── */
function HS({ t, l, r, b, w, h, onClick, dark, title }) {
  return (
    <div className={`ia-hs ${dark ? 'ia-hs-dark' : ''}`}
      title={title}
      onClick={onClick}
      style={{ top: t, left: l, right: r, bottom: b, width: w, height: h }}
    />
  );
}

/* Fixed bottom phantom nav for wizard steps */
function PhantomNav({ onBack, onNext, nextLabel = '下一步 →', showBack = true, nextPrimary = false }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 90, zIndex: 200,
      background: 'linear-gradient(to top, var(--paper) 65%, transparent)',
      display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      padding: '0 20px 18px', gap: 10,
      pointerEvents: 'none',
    }}>
      {showBack && (
        <button onClick={onBack} style={{
          flex: 1, maxWidth: 120, height: 48, borderRadius: 12,
          background: 'var(--chalk)', border: '1.5px solid rgba(27,34,48,0.15)',
          fontSize: 14, fontWeight: 600, color: 'var(--ink-soft)',
          cursor: 'pointer', pointerEvents: 'all', fontFamily: 'var(--f-body)',
          boxShadow: 'var(--shadow-sm)',
        }}>上一步</button>
      )}
      <button onClick={onNext} style={{
        flex: 2, maxWidth: 200, height: 48, borderRadius: 12,
        background: nextPrimary ? 'var(--clay-deep)' : 'var(--ink)',
        border: 'none', color: '#F4ECDA',
        fontSize: 15, fontWeight: 700, cursor: 'pointer',
        pointerEvents: 'all', fontFamily: 'var(--f-body)',
        boxShadow: 'var(--shadow-md)',
      }}>{nextLabel}</button>
    </div>
  );
}

/* ─── 0. SignIn ───────────────────────────────────────── */
function NavSignIn({ push }) {
  const [loading, setLoading] = useState(false);

  const handleGoogle = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => push('dashboard'), 1600);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <SignIn loading={loading} />
      {!loading && (
        <>
          {/* Google button hotspot — approx bottom-zone */}
          <HS t={616} l={28} w={346} h={50} onClick={handleGoogle} title="使用 Google 帳號繼續" />
          {/* Guest button */}
          <HS t={724} l={28} w={346} h={46} onClick={() => push('dashboard')} title="以訪客身份試用" />
        </>
      )}
    </div>
  );
}

/* ─── 1. Dashboard ─────────────────────────────────────── */
function NavDashboard({ push }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Dashboard />
      {/* 新增比賽 tile */}
      <HS t={289} l={16} w={370} h={96} onClick={() => push('setup', { step: 0 })} dark title="新增比賽" />
      {/* 球探報告 tile */}
      <HS t={395} l={16} w={370} h={96} onClick={() => push('scout-report', { tab: 'ai' })} dark title="球探報告" />
      {/* 球員資料庫 tile */}
      <HS t={501} l={16} w={370} h={96} onClick={() => push('player-browse')} dark title="球員資料庫" />
      {/* Recent game rows */}
      <HS t={647} l={0} w={402} h={44} onClick={() => push('stats')} dark title="5/10 比賽結果" />
      <HS t={691} l={0} w={402} h={44} onClick={() => push('stats')} dark title="5/03 比賽結果" />
      <HS t={735} l={0} w={402} h={44} onClick={() => push('stats')} dark title="4/27 比賽結果" />
    </div>
  );
}

/* ─── 2. Player Browse ──────────────────────────────────── */
function NavPlayerBrowse({ push, pop }) {
  const [mode, setMode] = useState('default');

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <PlayerBrowse
        mode={mode}
        searchValue={mode === 'search' ? '陳' : undefined}
        focusedTeam={mode === 'team' ? 'aegis' : undefined}
        selectedPlayer={mode === 'team' ? { team: 'aegis', num: '08' } : undefined}
      />

      {/* Back button area */}
      <HS t={60} l={14} w={60} h={38} onClick={pop} dark title="← 返回" />

      {/* Team chip: 全部 */}
      <HS t={148} l={14} w={52} h={36} onClick={() => setMode('default')} dark title="全部" />
      {/* Team chip: 桃園神盾 */}
      <HS t={148} l={160} w={84} h={36} onClick={() => setMode('team')} dark title="桃園神盾" />

      {/* Search bar tap → search mode */}
      <HS t={104} l={14} w={374} h={42} onClick={() => setMode('search')} dark title="搜尋球員" />

      {/* Player rows → scout report */}
      {[0, 1, 2, 3, 4].map(i => (
        <HS key={i} t={282 + i * 46} l={0} w={402} h={44}
          onClick={() => push('scout-report', { tab: 'ai' })} dark title="查看球探報告" />
      ))}
    </div>
  );
}

/* ─── 3. Scout Report ──────────────────────────────────── */
const SR_TAB_DEFS = [
  { id: 'ai',    label: 'AI 分析' },
  { id: 'zone',  label: '九宮格' },
  { id: 'pitch', label: '球種' },
  { id: 'hand',  label: '左右投' },
  { id: 'count', label: '球數' },
  { id: 'spray', label: '落點' },
];

function NavScoutReport({ pop, initTab }) {
  const [tab, setTab] = useState(initTab || 'ai');

  const renderContent = () => {
    switch (tab) {
      case 'ai':    return <AIAnalysis />;
      case 'zone':  return <ZoneGrid />;
      case 'pitch': return <PitchTypeChart />;
      case 'hand':  return <VsHandChart />;
      case 'count': return <CountGrid />;
      case 'spray': return <SprayMap />;
      default:      return <AIAnalysis />;
    }
  };

  return (
    <div style={{
      width: '100%', height: '100%', background: '#0F141C',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--f-body)', color: '#F4ECDA', overflow: 'hidden',
    }}>
      <div style={{ height: 54 }} />
      <SR_TopBar />
      <SR_PlayerHeader p={SCOUT_PLAYER} />

      {/* Interactive tab strip */}
      <div style={{ display: 'flex', gap: 6, padding: '0 14px 10px', overflowX: 'auto', flexShrink: 0 }}>
        {SR_TAB_DEFS.map(t => {
          const on = t.id === tab;
          return (
            <div key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '5px 12px', borderRadius: 99, whiteSpace: 'nowrap',
              cursor: 'pointer', flexShrink: 0,
              background: on ? 'var(--clay-soft)' : 'transparent',
              border: on ? 'none' : '1px solid rgba(244,236,218,0.18)',
              color: on ? 'var(--ink)' : 'rgba(244,236,218,0.7)',
              fontFamily: 'var(--f-body)', fontSize: 11, fontWeight: on ? 700 : 600,
            }}>{t.label}</div>
          );
        })}
      </div>

      {/* Section content — scrollable */}
      <div style={{ flex: 1, overflow: 'auto', padding: '4px 14px 20px' }}>
        {renderContent()}
      </div>

      {/* Back button hotspot */}
      <HS t={60} l={14} w={56} h={34} onClick={pop} title="← 球員" />
    </div>
  );
}

/* ─── 4. Setup Wizard ──────────────────────────────────── */
const SETUP_SCREENS = [
  () => <SetupTeams />,
  () => <SetupOrder size={9} level="高中" emptyHint={false} />,
  () => <SetupPitcher />,
  () => <SetupMeta />,
];

function NavSetup({ push, pop, step, replace }) {
  const Screen = SETUP_SCREENS[step];
  const isLast = step === 3;

  const goNext = () => {
    if (isLast) {
      push('record');
    } else {
      replace('setup', { step: step + 1 });
    }
  };

  const goBack = () => {
    if (step === 0) {
      pop();
    } else {
      replace('setup', { step: step - 1 });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Screen />
      <PhantomNav
        onBack={goBack}
        onNext={goNext}
        nextLabel={isLast ? '開始記錄 ▶' : '下一步 →'}
        showBack={true}
        nextPrimary={isLast}
      />
    </div>
  );
}

/* ─── 5. Record Screen ──────────────────────────────────── */
const OVERLAYS = {
  base: null,
  wheel: { showPitchWheel: true, wheelCell: 5, wheelHover: 2 },
  batted: { showBattedBall: true, battedBallIndex: 2 },
  location: { showFieldLocation: true },
  memo: { showMemo: true },
  menu: { showGameMenu: true, gameMenuIndex: 0 },
};

function NavRecord({ push, pop }) {
  const [overlay, setOverlay] = useState('base');
  const props = OVERLAYS[overlay] || {};
  const setO = setOverlay;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <RecordA {...props} />

      {overlay === 'base' && (
        <>
          {/* Strike zone grid — click → pitch wheel */}
          <HS t={170} l={16} w={370} h={295} onClick={() => setO('wheel')} title="點格子 = 進壘位置" />
          {/* ⋯ menu button */}
          <HS t={54} l={340} w={62} h={52} onClick={() => setO('menu')} title="操作選單" />
          {/* 擊出 button (Row 2, col 1) */}
          <HS t={592} l={16} w={118} h={52} onClick={() => setO('batted')} title="擊出" />
          {/* 好球 button (Row 1, col 1) */}
          <HS t={530} l={16} w={118} h={52} onClick={() => setO('base')} title="好球" dark />
          {/* 壞球 button (Row 1, col 2) */}
          <HS t={530} l={142} w={118} h={52} onClick={() => setO('base')} title="壞球" dark />
          {/* 揮棒落空 (Row 1, col 3) */}
          <HS t={530} l={268} w={118} h={52} onClick={() => setO('base')} title="揮棒落空" dark />
          {/* FAB Memo */}
          <HS t={696} l={328} w={58} h={58} onClick={() => setO('memo')} title="加入備註" />
        </>
      )}

      {/* Pitch wheel: tap centre or anywhere to dismiss */}
      {overlay === 'wheel' && (
        <>
          {/* Confirm slice area (slices in outer ring) */}
          <HS t={138} l={50} w={302} h={302} onClick={() => setO('base')} title="確認球種 (放開手指)" />
          {/* Centre cancel */}
          <HS t={222} l={160} w={82} h={82} onClick={() => setO('base')} title="取消" />
        </>
      )}

      {/* Batted ball: "下一步" button at bottom of sheet */}
      {overlay === 'batted' && (
        <>
          <div className="ia-overlay" onClick={() => setO('base')} />
          <HS t={815} l={16} w={370} h={52} onClick={() => setO('location')} title="下一步 · 標示落點" dark />
        </>
      )}

      {/* Field location: "完成" button */}
      {overlay === 'location' && (
        <>
          <div className="ia-overlay" onClick={() => setO('base')} />
          <HS t={820} l={16} w={370} h={50} onClick={() => setO('base')} title="完成 · 寫入紀錄 ✓" dark />
        </>
      )}

      {/* Memo: "儲存備註" button, and backdrop close */}
      {overlay === 'memo' && (
        <>
          <div className="ia-overlay" onClick={() => setO('base')} />
          <HS t={820} l={16} w={370} h={50} onClick={() => setO('base')} title="儲存備註" dark />
        </>
      )}

      {/* Game menu items */}
      {overlay === 'menu' && (
        <>
          {/* Close backdrop */}
          <HS t={54} l={0} w={402} h={40} onClick={() => setO('base')} title="關閉選單" />
          {/* 更換代打 */}
          <HS t={104} l={70} w={315} h={56} onClick={() => setO('base')} title="更換代打" />
          {/* 更換投手 */}
          <HS t={162} l={70} w={315} h={56} onClick={() => setO('base')} title="更換投手" />
          {/* 比賽結束 → Stats */}
          <HS t={220} l={70} w={315} h={56} onClick={() => push('stats')} title="比賽結束" />
        </>
      )}
    </div>
  );
}

/* ─── 6. Stats Summary ──────────────────────────────────── */
function NavStats({ push, pop }) {
  const [tab, setTab] = useState(0);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <StatsSummary activeTab={tab} selectedRow={tab === 0 ? 2 : null} />

      {/* Back → dashboard */}
      <HS t={60} l={14} w={70} h={34} onClick={pop} title="← 返回" />

      {/* Team tabs — horizontal row ~ y=195 */}
      <HS t={190} l={16} w={180} h={38} onClick={() => setTab(0)} dark title="我方隊伍" />
      <HS t={190} l={200} w={186} h={38} onClick={() => setTab(1)} dark title="對方隊伍" />

      {/* Player rows → scout report */}
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <HS key={i} t={295 + i * 44} l={0} w={402} h={42}
          onClick={() => push('scout-report', { tab: 'ai' })} dark title="查看球探報告" />
      ))}
    </div>
  );
}

/* ─── 7. Player Heat Zone ───────────────────────────────── */
function NavHeat({ pop }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <PlayerHeatZone />
      {/* Back */}
      <HS t={60} l={14} w={60} h={34} onClick={pop} title="← 返回" />
    </div>
  );
}

/* Export */
Object.assign(window, { InteractiveApp });

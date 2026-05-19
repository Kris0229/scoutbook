/* proto-record.jsx — Interactive recording screen
   Long-press zone cell → pitch wheel · Tap zone cell → set location ·
   Tap result button → commits pitch + advances count · IP → batted type → field tap → result popover
*/

// ── PITCH wheel data ───────────────────────────────────
const WHEEL = [
  { code: 'FB', name: '快速球', est: '145-150' },
  { code: 'CH', name: '變速球', est: '125-135' },
  { code: 'SI', name: '伸卡',   est: '140-145' },
  { code: 'SF', name: '指叉',   est: '130-140' },
  { code: 'CB', name: '曲球',   est: '115-125' },
  { code: 'SL', name: '滑球',   est: '130-140' },
  { code: 'XX', name: '其他',   est: '—' },
];
const DEFAULT_SPEED = { FB: 148, CH: 130, SI: 142, SF: 135, CB: 120, SL: 135, XX: 130 };

const BATTED_TYPES = [
  { code: 'GO', cn: '滾地',   en: 'GROUNDER', icon: 'gnd' },
  { code: 'LD', cn: '平飛',   en: 'LINER',    icon: 'line' },
  { code: 'FB', cn: '高飛',   en: 'FLY BALL', icon: 'fly' },
  { code: 'PU', cn: '高飛球', en: 'POP UP',   icon: 'pop' },
  { code: 'BUNT', cn: '短打', en: 'BUNT',     icon: 'bunt' },
  { code: 'SH', cn: '直擊',   en: 'SHARP',    icon: 'sharp' },
];

const RESULT_OPTS = [
  { code: '1B', cn: '一安',   en: 'SINGLE',  c: '#5B8CDB' },
  { code: '2B', cn: '二安',   en: 'DOUBLE',  c: 'var(--grass-soft)' },
  { code: '3B', cn: '三安',   en: 'TRIPLE',  c: 'var(--warn)' },
  { code: 'HR', cn: '全壘打', en: 'HOMERUN', c: 'var(--ball)' },
  { code: 'OUT', cn: '出局',  en: 'OUT',     c: 'rgba(180,180,180,0.7)' },
  { code: 'E',  cn: '失誤',   en: 'ERROR',   c: 'var(--warn-soft)' },
];

// ════════════════════════════════════════════════════════
// Main recording screen
// ════════════════════════════════════════════════════════
function ProtoRecord() {
  const [state, dispatch] = useGame();
  const { game, setup } = state;
  const pa = game.currentPA;

  // pending pitch state
  const [pendingCell, setPendingCell] = React.useState(4);     // 0-8 grid cell
  const [pendingType, setPendingType] = React.useState('FB');  // pitch type
  const [pendingSpeed, setPendingSpeed] = React.useState(DEFAULT_SPEED.FB);

  // overlays
  const [wheelOpen, setWheelOpen] = React.useState(false);
  const [wheelHover, setWheelHover] = React.useState(null);
  const [battedPhase, setBattedPhase] = React.useState(null);  // null | 'type' | 'location' | 'result'
  const [battedType, setBattedType] = React.useState(null);
  const [battedLoc, setBattedLoc] = React.useState(null);
  const [endMenuOpen, setEndMenuOpen] = React.useState(false);

  // toast for PA end
  const [toast, setToast] = React.useState(null);

  // listen for last event → toast
  React.useEffect(() => {
    const e = game.lastEvent;
    if (!e) return;
    if (e.kind === 'pa_end') {
      const lbl = e.outcome.label;
      setToast({ label: lbl, code: e.outcome.result });
      const t = setTimeout(() => setToast(null), 1800);
      return () => clearTimeout(t);
    }
  }, [game.eventSeq]);

  const commitPitch = (resultCode) => {
    if (resultCode === 'IP') {
      // first, log the pitch with IP marker — but actually we wait until batted type chosen
      setBattedPhase('type');
      return;
    }
    dispatch({
      type: 'PITCH',
      result: resultCode,
      pitchType: pendingType,
      cell: pendingCell,
      speed: pendingSpeed,
    });
    // reset pending for next pitch
    setPendingCell(4);
    setPendingType('FB');
    setPendingSpeed(DEFAULT_SPEED.FB);
  };

  const handleBattedTypeChosen = (type) => {
    setBattedType(type);
    // log the IP pitch
    dispatch({
      type: 'IN_PLAY',
      pitchType: pendingType,
      cell: pendingCell,
      speed: pendingSpeed,
      battedType: type.code,
    });
    setBattedPhase('location');
  };

  const handleLocationChosen = (loc) => {
    setBattedLoc(loc);
    setBattedPhase('result');
  };

  const handleResultChosen = (resultCode) => {
    dispatch({ type: 'BATTED_RESULT', resultCode, loc: battedLoc });
    setBattedPhase(null);
    setBattedType(null);
    setBattedLoc(null);
    setPendingCell(4);
    setPendingType('FB');
    setPendingSpeed(DEFAULT_SPEED.FB);
  };

  const dimMain = wheelOpen || battedPhase || endMenuOpen;

  return (
    <div className="sb-root" style={{ position: 'absolute', inset: 0, background: 'var(--night)',
      color: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* ── top scoreboard bar ───────────────────────── */}
      <RecTopBarLive
        onExit={() => dispatch({ type: 'NAV_BACK' })}
        onMenu={() => setEndMenuOpen(true)}
      />

      {/* ── batter card ─────────────────────────────── */}
      <RecBatterCard/>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column',
        opacity: dimMain ? 0.3 : 1, transition: 'opacity 180ms', pointerEvents: dimMain ? 'none' : 'auto' }}>

        {/* ── field view (compact) ───────────────────── */}
        <RecFieldLive runners={game.runners}
          onPick={battedPhase === 'location' ? handleLocationChosen : null}/>

        {/* ── strike zone (interactive) ──────────────── */}
        <RecZoneLive
          pitches={pa.pitches}
          pendingCell={pendingCell}
          pendingType={pendingType}
          onTap={(cell) => setPendingCell(cell)}
          onLongPress={(cell) => { setPendingCell(cell); setWheelOpen(true); }}
        />

        {/* ── pending pitch indicator ─────────────────── */}
        <div style={{ padding: '4px 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
          <PitchSwatch code={pendingType} size={12}/>
          <span className="sb-display" style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.08em' }}>
            下一球 · {WHEEL.find((w) => w.code === pendingType)?.name} · {pendingSpeed} km/h
          </span>
          <span style={{ flex: 1 }}/>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>長按格子 ↑ 換球種</span>
        </div>

        <div style={{ flex: 1 }}/>

        {/* ── result buttons ─────────────────────────── */}
        <div style={{ padding: '12px 14px 0' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
            <span className="sb-display" style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.18em' }}>
              此球結果 · PITCH RESULT
            </span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>第 {pa.pitches.length + 1} 球</span>
          </div>
          <RecResultButtonsLive onCommit={commitPitch}/>
        </div>

        <RecFooterLive
          onUndo={() => dispatch({ type: 'UNDO_LAST_PITCH' })}
          canUndo={pa.pitches.length > 0}
          onEnd={() => dispatch({ type: 'END_GAME' })}
        />
      </div>

      {/* ── overlays ──────────────────────────────────── */}
      {wheelOpen && (
        <PitchWheelOverlay
          selected={pendingType}
          hover={wheelHover}
          onHover={setWheelHover}
          onPick={(code) => {
            setPendingType(code);
            setPendingSpeed(DEFAULT_SPEED[code]);
            setWheelOpen(false);
            setWheelHover(null);
          }}
          onCancel={() => { setWheelOpen(false); setWheelHover(null); }}
        />
      )}
      {battedPhase === 'type' && (
        <BattedTypeSheet
          onPick={handleBattedTypeChosen}
          onCancel={() => setBattedPhase(null)}
          pendingType={pendingType}
          pendingSpeed={pendingSpeed}
        />
      )}
      {battedPhase === 'location' && (
        <LocationPromptBanner battedType={battedType}/>
      )}
      {battedPhase === 'result' && (
        <ResultPopover loc={battedLoc} onPick={handleResultChosen} onCancel={() => setBattedPhase(null)}/>
      )}
      {endMenuOpen && (
        <EndMenuOverlay
          onClose={() => setEndMenuOpen(false)}
          onEndGame={() => { setEndMenuOpen(false); dispatch({ type: 'END_GAME' }); }}
        />
      )}

      {/* ── PA end toast ───────────────────────────── */}
      {toast && <PAEndToast toast={toast}/>}
    </div>
  );
}

// ── top bar (live state) ─────────────────────────────
function RecTopBarLive({ onExit, onMenu }) {
  const [state] = useGame();
  const { game, setup } = state;
  const pa = game.currentPA;
  return (
    <div style={{ padding: '12px 12px 6px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <button onClick={onExit}
          style={{ border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff',
            width: 30, height: 30, borderRadius: 8, cursor: 'pointer' }}>✕</button>
        <div style={{ textAlign: 'center' }}>
          <div className="sb-display" style={{ fontSize: 9, color: 'var(--ball)', letterSpacing: '0.18em',
            display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
              background: 'var(--ball)', boxShadow: '0 0 8px var(--ball)' }}/>
            REC · LIVE
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>VS {setup.oppTeam}</div>
        </div>
        <button onClick={onMenu}
          style={{ border: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff',
            width: 30, height: 30, borderRadius: 8, fontSize: 18, cursor: 'pointer' }}>⋯</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px',
        background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>{setup.ourTeam.slice(0, 2)}</div>
          <div className="sb-num" style={{ fontSize: 24 }}>{game.scores.us}</div>
        </div>
        <div style={{ textAlign: 'center', flex: 1.4 }}>
          <Chip tone="clay" solid>
            {game.half === 'top' ? 'T' : 'B'} {game.inning} 局{game.half === 'top' ? '上' : '下'}
          </Chip>
          <div className="sb-display" style={{ fontSize: 10, marginTop: 4, color: 'rgba(255,255,255,0.75)' }}>
            {game.outs} OUT · {pa.balls}-{pa.strikes}
            {(game.runners[0] || game.runners[1] || game.runners[2]) && (
              <span style={{ marginLeft: 6 }}>·
                {' '}{game.runners[0] ? '1B' : ''}{game.runners[1] ? ' 2B' : ''}{game.runners[2] ? ' 3B' : ''}
              </span>
            )}
          </div>
        </div>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>{setup.oppTeam.slice(0, 2)}</div>
          <div className="sb-num" style={{ fontSize: 24 }}>{game.scores.them}</div>
        </div>
      </div>
    </div>
  );
}

// ── current batter card ──────────────────────────────
function RecBatterCard() {
  const [state] = useGame();
  const pa = state.game.currentPA;
  const b = pa.batter;
  // count of THIS player's hits, ABs in this game so far
  const myPAs = state.game.completedPAs.filter((p) => p.batter.n === b.n);
  const h = myPAs.filter((p) => ['1B', '2B', '3B', 'HR'].includes(p.result)).length;
  return (
    <div style={{ padding: '4px 12px 0' }}>
      <div style={{ padding: '10px 12px', background: 'var(--night-2)', borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div className="sb-display" style={{ fontSize: 26, fontWeight: 700, color: 'var(--clay-soft)', minWidth: 42 }}>#{b.n}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 16, fontWeight: 700 }}>{b.name}</span>
            <Chip tone="grass" solid>{b.pos}</Chip>
            <Chip tone="ghostDark">{b.s}HB</Chip>
            {b.hot && <Chip tone="hot" solid className="sb-hot" style={{ fontSize: 9 }}>HOT</Chip>}
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>
            本場 {h}-{myPAs.length}{h > 0 && ` (${h}H)`} · 季 {b.avg}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="sb-display" style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em' }}>B-S</div>
          <div className="sb-num" style={{ fontSize: 22,
            color: pa.strikes >= 2 ? 'var(--ball)' : pa.balls >= 3 ? 'var(--strike-soft)' : '#fff',
            transition: 'color 200ms' }}>
            {pa.balls}-{pa.strikes}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── compact field view (live) ────────────────────────
function RecFieldLive({ runners, onPick }) {
  const height = 152;
  const [tappedAt, setTappedAt] = React.useState(null);
  const handleClick = (e) => {
    if (!onPick) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 360;
    const y = (e.clientY - rect.top) / rect.height * height;
    setTappedAt({ x, y });
    setTimeout(() => onPick({ x, y }), 150);
  };
  return (
    <div onClick={handleClick} style={{ margin: '6px 12px 0', height, borderRadius: 12,
      overflow: 'hidden', position: 'relative', background: '#3a5e2a',
      border: '1px solid rgba(0,0,0,0.2)', cursor: onPick ? 'crosshair' : 'default',
      boxShadow: onPick ? '0 0 0 2px var(--ball), 0 8px 24px rgba(194,76,47,0.3)' : 'none',
      transition: 'box-shadow 200ms' }}>
      <svg width="100%" height={height} viewBox={`0 0 360 ${height}`} preserveAspectRatio="none">
        <defs>
          <radialGradient id="grassFV2" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#5e8f48"/>
            <stop offset="55%" stopColor="#4d7b3a"/>
            <stop offset="100%" stopColor="#345a26"/>
          </radialGradient>
          <radialGradient id="dirtFV2" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#c08350"/>
            <stop offset="100%" stopColor="#8a5226"/>
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="360" height={height} fill="url(#grassFV2)"/>
        <path d={`M 24 ${height - 14} A 170 ${height - 36} 0 0 1 336 ${height - 14}`}
          stroke="rgba(251,247,238,0.22)" strokeWidth="1.2" fill="none" strokeDasharray="3 3"/>
        <path d={`M 102 ${height - 18} Q 102 ${height - 96} 180 ${height - 116} Q 258 ${height - 96} 258 ${height - 18} Z`}
          fill="#4d7b3a"/>
        <polygon points={`180,${height - 22} 234,${height - 64} 180,${height - 106} 126,${height - 64}`}
          fill="url(#dirtFV2)" stroke="rgba(0,0,0,0.18)" strokeWidth="0.6"/>
        <circle cx="180" cy={height - 64} r="9" fill="#c08350" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5"/>
        <polygon points={`174,${height - 18} 186,${height - 18} 186,${height - 12} 180,${height - 6} 174,${height - 12}`}
          fill="#fbf7ee" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5"/>
        <line x1="180" y1={height - 18} x2="24" y2={height - 92} stroke="#fbf7ee" strokeWidth="1.4" opacity="0.9"/>
        <line x1="180" y1={height - 18} x2="336" y2={height - 92} stroke="#fbf7ee" strokeWidth="1.4" opacity="0.9"/>
        {[
          { x: 234, y: height - 64, b: '1' },
          { x: 180, y: height - 106, b: '2' },
          { x: 126, y: height - 64, b: '3' },
        ].map((b, i) => (
          <rect key={b.b} x={b.x - 5.5} y={b.y - 5.5} width="11" height="11"
            fill={runners[i] ? 'var(--ball)' : '#fbf7ee'} stroke={runners[i] ? '#fff' : 'rgba(0,0,0,0.3)'}
            strokeWidth={runners[i] ? 1.5 : 0.5}
            transform={`rotate(45 ${b.x} ${b.y})`}/>
        ))}
        {/* runners */}
        {runners.map((r, i) => r && (
          <g key={i}>
            {(() => {
              const positions = [{ x: 240, y: height - 72 }, { x: 180, y: height - 116 }, { x: 120, y: height - 72 }];
              const p = positions[i];
              return <>
                <circle cx={p.x} cy={p.y} r="6" fill="var(--ball)" stroke="#fff" strokeWidth="1.5"/>
                <text x={p.x} y={p.y + 3} textAnchor="middle" fontFamily="var(--f-display)"
                  fontSize="8" fontWeight="700" fill="#fff">#{r.n}</text>
              </>;
            })()}
          </g>
        ))}
        {tappedAt && (
          <circle cx={tappedAt.x} cy={tappedAt.y} r="9" fill="var(--clay)" stroke="#fff" strokeWidth="2"
            style={{ filter: 'drop-shadow(0 0 6px var(--clay))' }}/>
        )}
      </svg>
      <div style={{ position: 'absolute', top: 8, left: 10, padding: '3px 8px', borderRadius: 6,
        background: 'rgba(15,20,28,0.7)', backdropFilter: 'blur(4px)' }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.92)' }}>
          {onPick ? '點擊球場標示落點' : '球場視角'}
        </span>
      </div>
    </div>
  );
}

// ── strike zone (interactive) ────────────────────────
function RecZoneLive({ pitches, pendingCell, pendingType, onTap, onLongPress }) {
  const cells = Array.from({ length: 9 }, (_, i) => i);
  const tones = {
    S:  { bg: '#2F7D4F' },
    B:  { bg: '#C24C2F' },
    F:  { bg: '#C7912A' },
    IP: { bg: '#B97744' },
  };

  // long press helper
  const usePress = (i) => {
    const tRef = React.useRef(null);
    const longRef = React.useRef(false);
    const handleDown = (e) => {
      longRef.current = false;
      tRef.current = setTimeout(() => {
        longRef.current = true;
        onLongPress(i);
        if (navigator.vibrate) navigator.vibrate(15);
      }, 420);
    };
    const handleUp = () => {
      if (tRef.current) clearTimeout(tRef.current);
      if (!longRef.current) onTap(i);
    };
    const handleCancel = () => {
      if (tRef.current) clearTimeout(tRef.current);
    };
    return { onPointerDown: handleDown, onPointerUp: handleUp, onPointerCancel: handleCancel, onPointerLeave: handleCancel };
  };

  return (
    <div style={{ padding: '10px 14px 0' }}>
      <div style={{ position: 'relative', padding: '16px 14px 18px', borderRadius: 14,
        background: 'linear-gradient(180deg, #4a2f1a 0%, #3a2614 100%)',
        border: '1px solid rgba(0,0,0,0.3)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}>

        {/* corner B labels */}
        {['tl', 'tr', 'bl', 'br'].map((p) => (
          <div key={p} className="sb-display" style={{
            position: 'absolute', fontSize: 10, fontWeight: 700, color: 'var(--ball-soft)', letterSpacing: '0.12em',
            ...(p === 'tl' ? { top: 4, left: 8 }
              : p === 'tr' ? { top: 4, right: 8 }
              : p === 'bl' ? { bottom: 26, left: 8 }
              : { bottom: 26, right: 8 }),
          }}>B</div>
        ))}

        <ZoneGrid cells={cells} pendingCell={pendingCell} pitches={pitches} tones={tones} usePress={usePress}/>

        <svg width="32" height="14" viewBox="0 0 32 14" style={{ display: 'block', margin: '6px auto 0' }}>
          <polygon points="2,2 30,2 30,7 16,12 2,7" fill="rgba(251,247,238,0.85)" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5"/>
        </svg>

        {/* pitch count badge */}
        <div style={{ position: 'absolute', left: -6, bottom: -10, width: 36, height: 36, borderRadius: 18,
          background: '#16263A', border: '2px solid var(--night)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
          <span className="sb-num" style={{ fontSize: 16, color: '#fff', fontWeight: 700 }}>{pitches.length + 1}</span>
        </div>
      </div>
    </div>
  );
}

function ZoneGrid({ cells, pendingCell, pitches, tones, usePress }) {
  return (
    <div style={{ position: 'relative', display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)',
      aspectRatio: '1 / 1', maxWidth: 220, margin: '0 auto',
      background: 'rgba(77,123,58,0.55)',
      border: '1.5px solid rgba(251,247,238,0.6)' }}>
      {cells.map((i) => {
        const press = usePress(i);
        const sel = pendingCell === i;
        return (
          <div key={i} {...press}
            style={{ position: 'relative',
              borderRight: (i % 3) < 2 ? '1px solid rgba(251,247,238,0.35)' : 'none',
              borderBottom: i < 6 ? '1px solid rgba(251,247,238,0.35)' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: sel ? 'rgba(255,255,255,0.14)' : 'transparent',
              cursor: 'pointer',
              transition: 'background 150ms',
              touchAction: 'none',
              WebkitUserSelect: 'none', userSelect: 'none' }}>
            <span className="sb-display" style={{ fontSize: 22, fontWeight: 500,
              color: sel ? '#fff' : 'rgba(251,247,238,0.55)', pointerEvents: 'none' }}>{i + 1}</span>
            {sel && (
              <div style={{ position: 'absolute', top: 4, right: 4, width: 6, height: 6, borderRadius: '50%',
                background: 'var(--clay-soft)', boxShadow: '0 0 6px var(--clay-soft)' }}/>
            )}
          </div>
        );
      })}
      {/* pitch markers */}
      {pitches.map((p) => {
        const col = p.cell % 3, row = Math.floor(p.cell / 3);
        const t = tones[p.kind] || tones.S;
        return (
          <div key={p.n} style={{ position: 'absolute',
            left: `${(col + 0.5) * 33.333}%`, top: `${(row + 0.5) * 33.333}%`,
            transform: 'translate(-50%, -50%)',
            width: 28, height: 28, borderRadius: '50%',
            background: t.bg, border: '2px solid rgba(251,247,238,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 2px 8px rgba(0,0,0,0.4)`,
            animation: 'sb-pop 240ms ease-out',
            pointerEvents: 'none' }}>
            <span className="sb-num" style={{ fontSize: 13, color: '#fff', fontWeight: 700 }}>{p.n}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── result buttons (live) ────────────────────────────
function RecResultButtonsLive({ onCommit }) {
  const r1 = [
    { code: 'B',   cn: '看球',     en: 'BALL',          c: 'var(--ball)' },
    { code: 'S-L', cn: '好球',     en: 'STRIKE',        c: 'var(--strike)' },
    { code: 'S-S', cn: '揮棒落空', en: 'SWING & MISS',  c: '#2A3242', accent: 'var(--clay-soft)' },
  ];
  const r2 = [
    { code: 'IP',  cn: '擊出',     en: 'IN PLAY', c: '#3A2A1E', accent: 'var(--clay-soft)' },
    { code: 'HBP', cn: '觸身球',   en: 'HBP',     c: '#3A2A1E', accent: 'var(--warn-soft)' },
    { code: 'F',   cn: '界外',     en: 'FOUL',    c: '#3A2A1E', accent: 'var(--clay-pale)' },
  ];
  const renderBtn = (b) => {
    const isSolid = ['B', 'S-L'].includes(b.code);
    return (
      <button key={b.code} onClick={() => onCommit(b.code)}
        style={{
          padding: '12px 4px', borderRadius: 10, border: 'none', cursor: 'pointer',
          background: b.c,
          boxShadow: isSolid ? '0 2px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.12)' : 'inset 0 1px 0 rgba(255,255,255,0.04)',
          fontFamily: 'var(--f-body)',
          transition: 'transform 80ms',
          WebkitTapHighlightColor: 'transparent',
        }}
        onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.96)'}
        onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        onPointerCancel={(e) => e.currentTarget.style.transform = 'scale(1)'}
        onPointerLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{b.cn}</div>
        <div className="sb-display" style={{ fontSize: 9, marginTop: 3,
          color: isSolid ? 'rgba(255,255,255,0.85)' : (b.accent || 'rgba(255,255,255,0.55)'),
          letterSpacing: '0.14em', fontWeight: 600 }}>{b.en}</div>
      </button>
    );
  };
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>{r1.map(renderBtn)}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>{r2.map(renderBtn)}</div>
    </div>
  );
}

// ── footer ───────────────────────────────────────────
function RecFooterLive({ onUndo, canUndo, onEnd }) {
  return (
    <div style={{ padding: '12px 14px max(16px, env(safe-area-inset-bottom))',
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
      fontSize: 11, color: 'rgba(255,255,255,0.55)', textAlign: 'center', gap: 8 }}>
      <button onClick={onUndo} disabled={!canUndo}
        style={{ background: 'transparent', border: 'none', color: canUndo ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.3)',
          fontSize: 11, cursor: canUndo ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <span style={{ fontSize: 14 }}>↶</span> 撤回上一球
      </button>
      <button style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.55)', fontSize: 11, cursor: 'pointer' }}>
        切換打者
      </button>
      <button onClick={onEnd}
        style={{ background: 'transparent', border: 'none', color: 'var(--ball-soft)', fontSize: 11, cursor: 'pointer', fontWeight: 700 }}>
        結束比賽 ▸
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════
// Overlays
// ════════════════════════════════════════════════════════

function PitchWheelOverlay({ selected, hover, onHover, onPick, onCancel }) {
  const R = 108, cx = 130, cy = 130;
  const wedge = (i) => {
    const a0 = (i / WHEEL.length) * Math.PI * 2 - Math.PI / 2 - Math.PI / WHEEL.length;
    const a1 = a0 + (Math.PI * 2) / WHEEL.length;
    const x0 = cx + Math.cos(a0) * R, y0 = cy + Math.sin(a0) * R;
    const x1 = cx + Math.cos(a1) * R, y1 = cy + Math.sin(a1) * R;
    return `M ${cx} ${cy} L ${x0} ${y0} A ${R} ${R} 0 0 1 ${x1} ${y1} Z`;
  };
  return (
    <div onClick={onCancel}
      style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'rgba(15,20,28,0.55)', backdropFilter: 'blur(3px)', zIndex: 50,
        animation: 'sb-fadein 200ms ease-out' }}>
      <div style={{ marginBottom: 16, padding: '6px 14px', background: 'var(--clay-deep)',
        borderRadius: 999, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--clay-soft)' }}/>
        <span className="sb-display" style={{ fontSize: 11, color: '#fff', letterSpacing: '0.16em' }}>
          選擇球種 · CHOOSE PITCH
        </span>
      </div>

      <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', width: 260, height: 260,
        filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.6))', animation: 'sb-pop 240ms ease-out' }}>
        <svg width="260" height="260" viewBox="0 0 260 260">
          {WHEEL.map((w, i) => {
            const isSel = w.code === (hover || selected);
            return (
              <path key={i} d={wedge(i)} fill={PITCH_COLORS[w.code]}
                stroke={isSel ? '#fff' : 'var(--night)'} strokeWidth={isSel ? 3 : 2}
                opacity={isSel ? 1 : 0.88}
                style={{ cursor: 'pointer', transition: 'opacity 120ms' }}
                onPointerEnter={() => onHover(w.code)}
                onPointerLeave={() => onHover(null)}
                onClick={() => onPick(w.code)}/>
            );
          })}
          {WHEEL.map((w, i) => {
            const a = (i / WHEEL.length) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(a) * 76;
            const y = cy + Math.sin(a) * 76;
            return (
              <g key={`l-${i}`} style={{ pointerEvents: 'none' }}>
                <text x={x} y={y - 4} textAnchor="middle" fontFamily="var(--f-body)" fontWeight="700" fontSize="13" fill="#fff">{w.name}</text>
                <text x={x} y={y + 11} textAnchor="middle" fontFamily="var(--f-display)" fontWeight="700" fontSize="11" fill="rgba(255,255,255,0.9)" letterSpacing="0.06em">{w.code}</text>
              </g>
            );
          })}
          <circle cx={cx} cy={cy} r="30" fill="var(--night)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"
            style={{ cursor: 'pointer' }} onClick={onCancel}/>
          <text x={cx} y={cy - 2} textAnchor="middle" fontFamily="var(--f-display)" fontSize="9"
            fill="rgba(255,255,255,0.5)" letterSpacing="0.12em" style={{ pointerEvents: 'none' }}>CANCEL</text>
          <text x={cx} y={cy + 12} textAnchor="middle" fontFamily="var(--f-display)" fontSize="11" fontWeight="700"
            fill="#fff" letterSpacing="0.06em" style={{ pointerEvents: 'none' }}>取消</text>
        </svg>
      </div>

      {hover && (
        <div style={{ marginTop: 18, padding: '10px 18px', background: 'var(--night-2)',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
          display: 'flex', alignItems: 'center', gap: 12,
          animation: 'sb-fadein 150ms' }}>
          <PitchSwatch code={hover} size={14}/>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{WHEEL.find((w) => w.code === hover)?.name}</span>
              <span className="sb-display" style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}>{hover}</span>
            </div>
            <div className="sb-display" style={{ fontSize: 10, color: 'var(--clay-soft)', marginTop: 2, letterSpacing: '0.08em' }}>
              EST. {WHEEL.find((w) => w.code === hover)?.est} km/h
            </div>
          </div>
        </div>
      )}
      <div style={{ marginTop: 12, fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>點擊扇形確認 · 中心取消</div>
    </div>
  );
}

function BattedTypeSheet({ onPick, onCancel, pendingType, pendingSpeed }) {
  const renderIcon = (icon) => {
    const stroke = 'rgba(255,255,255,0.85)';
    if (icon === 'bunt') return <path d="M5 24 Q15 18 25 24" stroke={stroke} strokeWidth="2" fill="none" strokeDasharray="2 2"/>;
    if (icon === 'gnd')  return <path d="M3 22 Q9 17 15 22 T 27 22" stroke={stroke} strokeWidth="2" fill="none"/>;
    if (icon === 'line') return <path d="M3 22 L 27 12" stroke={stroke} strokeWidth="2.5" fill="none"/>;
    if (icon === 'fly')  return <path d="M3 24 Q15 4 27 24" stroke={stroke} strokeWidth="2" fill="none"/>;
    if (icon === 'pop')  return <path d="M3 22 Q15 10 27 22" stroke={stroke} strokeWidth="2" fill="none"/>;
    return <g><path d="M3 22 L 27 10" stroke={stroke} strokeWidth="2.5" fill="none"/><path d="M22 10 L 27 10 L 27 15" stroke={stroke} strokeWidth="2" fill="none"/></g>;
  };
  return (
    <div onClick={onCancel} style={{ position: 'absolute', inset: 0, background: 'rgba(15,20,28,0.55)',
      backdropFilter: 'blur(3px)', zIndex: 50, animation: 'sb-fadein 180ms' }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0,
          background: 'var(--night-2)', borderTopLeftRadius: 22, borderTopRightRadius: 22,
          border: '1px solid rgba(255,255,255,0.08)', borderBottom: 'none',
          padding: '14px 16px max(20px, env(safe-area-inset-bottom))',
          boxShadow: '0 -20px 50px rgba(0,0,0,0.5)',
          animation: 'sb-slideup 280ms ease-out' }}>
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
        <div style={{ display: 'flex', gap: 6, marginTop: 10, marginBottom: 14, flexWrap: 'wrap' }}>
          <Chip tone="clay" solid><PitchSwatch code={pendingType} size={6}/> {pendingType} · {WHEEL.find(w => w.code === pendingType)?.name}</Chip>
          <Chip tone="ghostDark">{pendingSpeed} km/h</Chip>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {BATTED_TYPES.map((t) => (
            <button key={t.code} onClick={() => onPick(t)}
              style={{ padding: 10, borderRadius: 12, cursor: 'pointer',
                background: 'rgba(255,255,255,0.03)',
                border: '1.5px solid rgba(255,255,255,0.08)',
                textAlign: 'left',
                transition: 'transform 100ms, background 150ms',
              }}
              onPointerDown={(e) => { e.currentTarget.style.background = 'rgba(194,76,47,0.18)'; e.currentTarget.style.borderColor = 'var(--ball)'; e.currentTarget.style.transform = 'scale(0.97)'; }}
            >
              <svg width="30" height="28" viewBox="0 0 30 28">
                <line x1="0" y1="26" x2="30" y2="26" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                {renderIcon(t.icon)}
              </svg>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginTop: 4 }}>{t.cn}</div>
              <div className="sb-display" style={{ fontSize: 9, letterSpacing: '0.12em', marginTop: 2,
                color: 'rgba(255,255,255,0.45)' }}>{t.en}</div>
            </button>
          ))}
        </div>
        <button onClick={onCancel} style={{ marginTop: 14, width: '100%', padding: '11px 0', borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.12)', background: 'transparent',
          color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>取消</button>
      </div>
    </div>
  );
}

function LocationPromptBanner({ battedType }) {
  return (
    <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
      background: 'var(--ball)', color: '#fff', padding: '12px 20px', borderRadius: 14,
      boxShadow: '0 8px 32px rgba(194,76,47,0.5)',
      animation: 'sb-pulse 1.8s ease-in-out infinite',
      pointerEvents: 'none', textAlign: 'center', zIndex: 30 }}>
      <div className="sb-display" style={{ fontSize: 10, letterSpacing: '0.18em', opacity: 0.9 }}>STEP 2 / 3</div>
      <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>點擊球場 · 標示落點</div>
      <div style={{ fontSize: 11, marginTop: 2, opacity: 0.9 }}>擊球類型: {battedType?.cn}</div>
    </div>
  );
}

function ResultPopover({ loc, onPick, onCancel }) {
  return (
    <div onClick={onCancel} style={{ position: 'absolute', inset: 0, background: 'rgba(15,20,28,0.55)',
      backdropFilter: 'blur(2px)', zIndex: 50, animation: 'sb-fadein 180ms' }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 'min(280px, calc(100% - 40px))',
          background: 'var(--night-2)', borderRadius: 14, padding: 14,
          border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          animation: 'sb-pop 240ms ease-out' }}>
        <div className="sb-display" style={{ fontSize: 10, color: 'var(--clay-soft)', letterSpacing: '0.18em', marginBottom: 8 }}>
          選擇結果 · CHOOSE RESULT
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {RESULT_OPTS.map((o) => (
            <button key={o.code} onClick={() => onPick(o.code)}
              style={{ padding: '9px 4px', borderRadius: 9, cursor: 'pointer',
                background: 'rgba(255,255,255,0.04)',
                border: `1.5px solid ${o.c}`,
                color: '#fff', fontFamily: 'var(--f-body)',
                transition: 'transform 80ms, background 100ms',
              }}
              onPointerDown={(e) => { e.currentTarget.style.background = o.c; e.currentTarget.style.transform = 'scale(0.95)'; }}
            >
              <div style={{ fontSize: 13, fontWeight: 700 }}>{o.cn}</div>
              <div className="sb-display" style={{ fontSize: 8, color: o.c, marginTop: 1, letterSpacing: '0.08em' }}>{o.en}</div>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 10, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.06)',
          fontSize: 10, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
          已標記落點 · ({Math.round(loc?.x || 0)}, {Math.round(loc?.y || 0)})
        </div>
      </div>
    </div>
  );
}

function EndMenuOverlay({ onClose, onEndGame }) {
  const items = [
    { icon: '⇄', cn: '更換代打', en: 'PINCH HITTER', desc: '上一個代打 / 取消打打' },
    { icon: '◎', cn: '更換投手', en: 'PITCHING CHANGE', desc: '記錄前投手場上情況' },
    { icon: '⏹', cn: '比賽結束', en: 'END GAME', desc: '進入比賽結算頁面', highlight: true, action: onEndGame },
  ];
  return (
    <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(15,20,28,0.5)',
      zIndex: 50, animation: 'sb-fadein 180ms' }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ position: 'absolute', top: 56, right: 12, width: 'min(280px, calc(100% - 40px))',
          background: 'var(--night-2)', borderRadius: 14, padding: 6,
          border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          animation: 'sb-pop 220ms ease-out' }}>
        <div style={{ position: 'absolute', top: -7, right: 14, width: 12, height: 12, transform: 'rotate(45deg)',
          background: 'var(--night-2)', borderTop: '1px solid rgba(255,255,255,0.1)', borderLeft: '1px solid rgba(255,255,255,0.1)' }}/>
        <div className="sb-display" style={{ fontSize: 9, color: 'var(--clay-soft)', letterSpacing: '0.18em',
          padding: '8px 10px 4px' }}>本場操作 · GAME ACTIONS</div>
        {items.map((it, i) => (
          <button key={i} onClick={it.action}
            style={{ all: 'unset', display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px', borderRadius: 10, cursor: 'pointer', width: 'calc(100% - 20px)',
              background: it.highlight ? 'rgba(185,119,68,0.16)' : 'transparent',
              border: it.highlight ? '1px solid var(--clay)' : '1px solid transparent',
              transition: 'background 150ms',
            }}>
            <div style={{ width: 30, height: 30, borderRadius: 8,
              background: it.highlight ? 'var(--clay)' : 'rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, color: '#fff', flexShrink: 0 }}>{it.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{it.cn}</span>
                <span className="sb-display" style={{ fontSize: 9, color: 'var(--clay-soft)', letterSpacing: '0.12em' }}>{it.en}</span>
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>{it.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function PAEndToast({ toast }) {
  const big = { '1B': '一安', '2B': '二安', '3B': '三安', HR: '全壘打!', K: '三振', BB: '保送', OUT: '出局', HBP: '觸身', E: '失誤' };
  const color = { HR: 'var(--ball)', '1B': 'var(--grass-soft)', '2B': 'var(--grass-soft)', '3B': 'var(--warn)',
    K: 'var(--clay)', BB: 'var(--strike)', OUT: 'rgba(120,120,120,0.9)', HBP: 'var(--warn)', E: 'var(--warn)' };
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none', zIndex: 100 }}>
      <div style={{ padding: '18px 32px', background: color[toast.code] || 'var(--ink)',
        borderRadius: 16, color: '#fff', textAlign: 'center',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        animation: 'sb-toast 1800ms ease-out forwards' }}>
        <div className="sb-display" style={{ fontSize: 10, letterSpacing: '0.18em', opacity: 0.85 }}>PA RESULT</div>
        <div className="sb-display" style={{ fontSize: 32, fontWeight: 700, marginTop: 4 }}>{big[toast.code] || toast.label}</div>
      </div>
    </div>
  );
}

Object.assign(window, { ProtoRecord });

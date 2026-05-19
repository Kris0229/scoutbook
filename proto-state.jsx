/* proto-state.jsx — ScoutBook prototype state + reducer
   Game state machine: count, outs, base runners, completed PAs.
   Exposes window.useGame() hook + window.GameProvider component.
*/

const DEFAULT_LINEUP = [
  { o: 1, pos: 'CF', n: 7,  name: '陳俊安', s: 'L', avg: '.342' },
  { o: 2, pos: '2B', n: 11, name: '張庭瑋', s: 'R', avg: '.298' },
  { o: 3, pos: '1B', n: 23, name: '王立祥', s: 'R', avg: '.356', hot: true },
  { o: 4, pos: 'DH', n: 9,  name: '林志強', s: 'L', avg: '.312' },
  { o: 5, pos: 'C',  n: 18, name: '吳浩然', s: 'R', avg: '.275' },
  { o: 6, pos: 'LF', n: 4,  name: '陳家豪', s: 'S', avg: '.244' },
  { o: 7, pos: 'RF', n: 21, name: '林宇翔', s: 'R', avg: '.268' },
  { o: 8, pos: '3B', n: 6,  name: '黃子昕', s: 'R', avg: '.221' },
  { o: 9, pos: 'SS', n: 14, name: '蔡承恩', s: 'L', avg: '.255' },
];

const DEFAULT_PITCHER = { n: 31, name: '陳冠樺', s: 'R', era: '2.84', vsL: '.298', vsR: '.221' };

// ── Initial state ─────────────────────────────────────────
function makeInitialState() {
  return {
    screen: 'login',         // login | dashboard | wizard | record | result
    nav: { history: [] },    // for back transitions
    transition: null,        // 'forward' | 'back' | null
    auth: { user: null },
    setup: {
      step: 0,               // 0 隊伍, 1 打序, 2 投手, 3 資訊
      ourTeam: '樹德高中',
      oppTeam: '高雄海豚',
      venue: '主場 · 樹德棒球場',
      lineup: DEFAULT_LINEUP,
      pitcher: DEFAULT_PITCHER,
    },
    game: {
      status: 'idle',        // idle | live | final
      inning: 1, half: 'top',// top = 客方打 (我們守) ; bottom = 我們打
      outs: 0,
      runners: [null, null, null],   // 1B, 2B, 3B
      scores: { us: 0, them: 0 },
      lineScore: { us: Array(9).fill(null), them: Array(9).fill(null) },
      batterIdx: 0,
      currentPA: makePA(DEFAULT_LINEUP[0]),
      completedPAs: [],
      lastEvent: null,       // for toast / animation
      eventSeq: 0,
    },
  };
}

function makePA(batter) {
  return {
    batter,
    pitches: [],
    balls: 0,
    strikes: 0,
    result: null,
    timestamp: Date.now(),
  };
}

// ── Action helpers ────────────────────────────────────────
function advanceRunners(runners, batter, hitType) {
  // returns { runners, runsScored }
  const r = [...runners];
  let runs = 0;
  const move = (n) => {
    // move all existing runners forward n bases
    for (let i = 2; i >= 0; i--) {
      if (r[i]) {
        const dest = i + n;
        if (dest >= 3) { runs++; r[i] = null; }
        else { r[dest] = r[i]; r[i] = null; }
      }
    }
  };
  if (hitType === '1B' || hitType === 'BB' || hitType === 'HBP' || hitType === 'E') {
    // force advance only if needed for BB/HBP
    if (hitType === 'BB' || hitType === 'HBP') {
      if (r[0] && r[1] && r[2]) { runs++; r[2] = null; }
      if (r[0] && r[1]) { r[2] = r[1]; r[1] = null; }
      if (r[0]) { r[1] = r[0]; r[0] = null; }
      r[0] = batter;
    } else {
      // single: lead runner scores from 2B+, others advance 1
      if (r[2]) { runs++; r[2] = null; }
      if (r[1]) { r[2] = r[1]; r[1] = null; }
      if (r[0]) { r[1] = r[0]; r[0] = null; }
      r[0] = batter;
    }
  } else if (hitType === '2B') {
    move(2);
    r[1] = batter;
  } else if (hitType === '3B') {
    move(3);
    r[2] = batter;
  } else if (hitType === 'HR') {
    move(3);
    runs++;  // batter scores
  }
  return { runners: r, runsScored: runs };
}

// ── Reducer ───────────────────────────────────────────────
function gameReducer(state, action) {
  switch (action.type) {
    // ─── Navigation ───
    case 'NAV': {
      return {
        ...state,
        screen: action.screen,
        nav: { history: [...state.nav.history, state.screen] },
        transition: action.dir || 'forward',
      };
    }
    case 'NAV_BACK': {
      const h = [...state.nav.history];
      const prev = h.pop() || 'dashboard';
      return { ...state, screen: prev, nav: { history: h }, transition: 'back' };
    }
    case 'CLEAR_TRANSITION':
      return { ...state, transition: null };

    // ─── Auth ───
    case 'LOGIN':
      return {
        ...state,
        auth: { user: { name: action.name || '李教練', avatar: '李' } },
        screen: 'dashboard',
        transition: 'forward',
      };

    // ─── Setup wizard ───
    case 'WIZARD_NEXT':
      if (state.setup.step >= 3) {
        return {
          ...state,
          screen: 'record',
          transition: 'forward',
          game: { ...state.game, status: 'live' },
        };
      }
      return { ...state, setup: { ...state.setup, step: state.setup.step + 1 } };
    case 'WIZARD_PREV':
      if (state.setup.step === 0) return state;
      return { ...state, setup: { ...state.setup, step: state.setup.step - 1 } };
    case 'WIZARD_SET_STEP':
      return { ...state, setup: { ...state.setup, step: action.step } };
    case 'WIZARD_UPDATE':
      return { ...state, setup: { ...state.setup, ...action.patch } };
    case 'WIZARD_REORDER_LINEUP': {
      const ln = [...state.setup.lineup];
      const [moved] = ln.splice(action.from, 1);
      ln.splice(action.to, 0, moved);
      const reordered = ln.map((p, i) => ({ ...p, o: i + 1 }));
      return { ...state, setup: { ...state.setup, lineup: reordered } };
    }

    // ─── Recording ───
    case 'PITCH': {
      // action: { result: 'B'|'S-L'|'S-S'|'F'|'HBP', pitchType, cell, speed }
      const g = state.game;
      const pa = g.currentPA;
      let balls = pa.balls, strikes = pa.strikes;
      const r = action.result;
      if (r === 'B') balls = Math.min(4, balls + 1);
      else if (r === 'S-L' || r === 'S-S') strikes = Math.min(3, strikes + 1);
      else if (r === 'F') strikes = Math.min(2, strikes + 1); // foul, can't strike out on
      // HBP handled as PA end

      const pitch = {
        n: pa.pitches.length + 1,
        type: action.pitchType || 'FB',
        cell: action.cell ?? 4,
        kind: r === 'B' ? 'B' : r === 'F' ? 'F' : 'S',
        result: r,
        speed: action.speed || (action.pitchType === 'FB' ? 148 : 132),
      };
      const newPA = { ...pa, balls, strikes, pitches: [...pa.pitches, pitch] };

      // PA outcome?
      if (r === 'HBP') {
        return endPA(state, newPA, { result: 'HBP', label: '觸身' });
      }
      if (balls >= 4) {
        return endPA(state, newPA, { result: 'BB', label: '保送' });
      }
      if (strikes >= 3 && r !== 'F') {
        return endPA(state, newPA, { result: 'K', label: '三振' });
      }
      return { ...state, game: { ...g, currentPA: newPA, lastEvent: { kind: 'pitch', pitch }, eventSeq: g.eventSeq + 1 } };
    }

    case 'IN_PLAY': {
      // action: { pitchType, cell, speed, battedType }
      const g = state.game;
      const pa = g.currentPA;
      const pitch = {
        n: pa.pitches.length + 1,
        type: action.pitchType || 'FB',
        cell: action.cell ?? 4,
        kind: 'IP',
        result: 'IP',
        speed: action.speed || 148,
        battedType: action.battedType,
      };
      const newPA = { ...pa, pitches: [...pa.pitches, pitch] };
      return {
        ...state,
        game: { ...g, currentPA: newPA, lastEvent: { kind: 'in_play' }, eventSeq: g.eventSeq + 1 },
      };
    }

    case 'BATTED_RESULT': {
      // action: { resultCode: '1B'|'2B'|'3B'|'HR'|'OUT'|'E', loc: {x,y} }
      const g = state.game;
      const pa = g.currentPA;
      const code = action.resultCode;
      const label = ({ '1B': '一安', '2B': '二安', '3B': '三安', HR: '全壘打', OUT: '出局', E: '失誤' })[code] || code;
      const lastPitch = pa.pitches[pa.pitches.length - 1];
      if (lastPitch) lastPitch.loc = action.loc;
      return endPA(state, pa, { result: code, label, loc: action.loc });
    }

    case 'NEXT_BATTER': {
      const g = state.game;
      const nextIdx = (g.batterIdx + 1) % state.setup.lineup.length;
      return {
        ...state,
        game: {
          ...g,
          batterIdx: nextIdx,
          currentPA: makePA(state.setup.lineup[nextIdx]),
          lastEvent: null,
        },
      };
    }

    case 'UNDO_LAST_PITCH': {
      const g = state.game;
      const pa = g.currentPA;
      if (!pa.pitches.length) return state;
      const dropped = pa.pitches[pa.pitches.length - 1];
      let balls = pa.balls, strikes = pa.strikes;
      if (dropped.kind === 'B') balls = Math.max(0, balls - 1);
      else if (dropped.kind === 'S') strikes = Math.max(0, strikes - 1);
      else if (dropped.kind === 'F') strikes = Math.max(0, strikes - 1);
      const newPA = { ...pa, pitches: pa.pitches.slice(0, -1), balls, strikes };
      return { ...state, game: { ...g, currentPA: newPA, lastEvent: { kind: 'undo' }, eventSeq: g.eventSeq + 1 } };
    }

    case 'END_GAME': {
      return {
        ...state,
        screen: 'result',
        transition: 'forward',
        game: { ...state.game, status: 'final' },
      };
    }

    case 'RESET':
      return makeInitialState();

    default:
      return state;
  }
}

// finish current PA: advance runners/outs, push to log, advance batter
function endPA(state, paWithPitches, outcome) {
  const g = state.game;
  const isOut = outcome.result === 'K' || outcome.result === 'OUT';
  let outs = g.outs;
  let runners = g.runners;
  let scoresUs = g.scores.us;
  const batterRef = { name: paWithPitches.batter.name, n: paWithPitches.batter.n };

  if (isOut) {
    outs = outs + 1;
  } else {
    const adv = advanceRunners(g.runners, batterRef, outcome.result);
    runners = adv.runners;
    scoresUs += adv.runsScored;
  }

  // half-inning over?
  let inning = g.inning, half = g.half, scores = { us: scoresUs, them: g.scores.them };
  const lineScore = {
    us: [...g.lineScore.us],
    them: [...g.lineScore.them],
  };
  // record run for current half (we're on offense — half === 'bottom')
  if (outcome.result !== 'K' && outcome.result !== 'OUT') {
    const idx = inning - 1;
    const prev = lineScore.us[idx] || 0;
    const adv = advanceRunners(g.runners, batterRef, outcome.result);
    lineScore.us[idx] = prev + adv.runsScored;
  }
  if (outs >= 3) {
    // inning advances
    if (half === 'bottom') { inning++; half = 'top'; }
    else half = 'bottom';
    outs = 0;
    runners = [null, null, null];
  }

  const completedPA = {
    ...paWithPitches,
    result: outcome.result,
    label: outcome.label,
    loc: outcome.loc,
  };

  // batter advances
  const nextIdx = (g.batterIdx + 1) % state.setup.lineup.length;

  return {
    ...state,
    game: {
      ...g,
      currentPA: makePA(state.setup.lineup[nextIdx]),
      completedPAs: [...g.completedPAs, completedPA],
      batterIdx: nextIdx,
      outs,
      runners,
      scores,
      lineScore,
      inning,
      half,
      lastEvent: { kind: 'pa_end', outcome, completedPA },
      eventSeq: g.eventSeq + 1,
    },
  };
}

// ── Context + hook ────────────────────────────────────────
const GameCtx = React.createContext(null);

function GameProvider({ children }) {
  const [state, dispatch] = React.useReducer(gameReducer, null, makeInitialState);

  // clear transition flag after animation completes
  React.useEffect(() => {
    if (!state.transition) return;
    const t = setTimeout(() => dispatch({ type: 'CLEAR_TRANSITION' }), 380);
    return () => clearTimeout(t);
  }, [state.transition, state.screen]);

  return (
    <GameCtx.Provider value={[state, dispatch]}>
      {children}
    </GameCtx.Provider>
  );
}

function useGame() {
  const v = React.useContext(GameCtx);
  if (!v) throw new Error('useGame must be inside <GameProvider>');
  return v;
}

// ── Stats compute ─────────────────────────────────────────
function computeBatterStats(lineup, completedPAs) {
  return lineup.map((p) => {
    const pas = completedPAs.filter((pa) => pa.batter.n === p.n);
    let ab = 0, h = 0, bb = 0, k = 0, hr = 0, rbi = 0;
    pas.forEach((pa) => {
      const r = pa.result;
      if (r === 'BB' || r === 'HBP') bb++;
      else { ab++; }
      if (r === '1B' || r === '2B' || r === '3B' || r === 'HR') h++;
      if (r === 'HR') hr++;
      if (r === 'K') k++;
    });
    return { ...p, ab, h, bb, k, hr, rbi, pas };
  });
}

Object.assign(window, {
  DEFAULT_LINEUP, DEFAULT_PITCHER,
  GameProvider, useGame, GameCtx,
  computeBatterStats, advanceRunners, makePA,
});

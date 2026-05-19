/* ─────────────────────────────────────────────────────────
   ScoutBook — Interactive Showcase Wrapper
   Shows the interactive phone prototype with a minimal
   context sidebar and flow breadcrumb.
───────────────────────────────────────────────────────── */

// Polyfill: setup-screens.jsx defines BaseballMark globally, but auth-screens
// exports BigBaseballMark separately — alias in case dashboard/record loads first.
if (!window.BaseballMark && window.BigBaseballMark) window.BaseballMark = window.BigBaseballMark;

const { useState, useEffect } = React;

/* ─── Showcase-level CSS ───────────────────────────────── */
if (!document.getElementById('sc-styles')) {
  const s = document.createElement('style'); s.id = 'sc-styles';
  s.textContent = `
    * { box-sizing: border-box; }
    ::-webkit-scrollbar { width: 4px }
    ::-webkit-scrollbar-thumb { background: rgba(244,236,218,0.18); border-radius: 2px }
    .sc-btn { transition: background 0.12s, transform 0.1s }
    .sc-btn:hover { background: rgba(244,236,218,0.1) !important }
    .sc-btn:active { transform: scale(0.96) }
  `;
  document.head.appendChild(s);
}

/* ─── Flow steps definition ────────────────────────────── */
const FLOW = [
  { label: '登入',          icon: '●', hint: 'Google SSO · 訪客試用',        screen: 'signin' },
  { label: '主控台',        icon: '●', hint: '三大入口 · 戰績 · 最近比賽',     screen: 'dashboard' },
  { label: '球員資料庫',    icon: '●', hint: '搜尋 · 隊伍篩選 · 點選查報告',  screen: 'player-browse' },
  { label: '球探報告',      icon: '●', hint: 'AI 分析 · 九宮格 · 落點圖',     screen: 'scout-report' },
  { label: '設定 Wizard',   icon: '●', hint: '4 步驟：隊伍→打序→投手→資訊',  screen: 'setup' },
  { label: '比賽記錄',      icon: '●', hint: '好球帶 · 球種圓盤 · 擊球落點',  screen: 'record' },
  { label: '賽後結算',      icon: '●', hint: '雙隊戰績 · 點打者看熱區',        screen: 'stats' },
];

/* ─── Main showcase layout ──────────────────────────────── */
function App() {
  // Phone dimensions for the IOSDevice frame
  const PHONE_W = 402, PHONE_H = 874;
  // Compute scale so phone fits within viewport (minus header)
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const sideW = 200;
  const availH = vp.h - 52;  // minus header bar
  const availW = vp.w - sideW - 48;
  const scale = Math.min(1, availH / PHONE_H, availW / PHONE_W);

  return (
    <div style={{
      width: '100vw', height: '100vh', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      background: '#0A0D13', fontFamily: 'var(--f-body)', color: '#F4ECDA',
    }}>
      {/* ── Header ── */}
      <ShowcaseHeader />

      {/* ── Body ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* ── Left sidebar ── */}
        <ShowcaseSidebar />

        {/* ── Phone + ambient ── */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Radial ambient glow */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(27,34,48,0.7) 0%, transparent 100%)',
          }} />
          {/* Subtle grid */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04,
            backgroundImage: `linear-gradient(rgba(244,236,218,1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(244,236,218,1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} />

          {/* Phone frame */}
          <div style={{
            position: 'relative', zIndex: 1,
            width: PHONE_W * scale, height: PHONE_H * scale,
            filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.55))',
          }}>
            <div style={{
              width: PHONE_W, height: PHONE_H,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}>
              <IOSDevice width={PHONE_W} height={PHONE_H}>
                <InteractiveApp />
              </IOSDevice>
            </div>
          </div>
        </div>

        {/* ── Right usage hint ── */}
        <UsageHint />
      </div>
    </div>
  );
}

/* ─── Header ───────────────────────────────────────────── */
function ShowcaseHeader() {
  return (
    <div style={{
      height: 52, flexShrink: 0,
      display: 'flex', alignItems: 'center', padding: '0 18px', gap: 14,
      background: 'rgba(10,13,19,0.97)',
      borderBottom: '1px solid rgba(244,236,218,0.07)',
    }}>
      <BaseballMark size={22} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <div style={{
          fontFamily: 'var(--f-display)', fontSize: 15, fontWeight: 700,
          letterSpacing: 3, color: '#F4ECDA',
        }}>SCOUTBOOK</div>
        <div style={{
          fontFamily: 'var(--f-display)', fontSize: 8, letterSpacing: 2,
          color: 'rgba(244,236,218,0.4)',
        }}>球探筆記 · 場邊紀錄</div>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{
        padding: '5px 12px', borderRadius: 99,
        background: 'rgba(185,119,68,0.15)',
        border: '1px solid rgba(185,119,68,0.3)',
        fontFamily: 'var(--f-display)', fontSize: 9, fontWeight: 600,
        letterSpacing: 2, color: 'var(--clay-soft)',
      }}>INTERACTIVE PROTOTYPE · 2026</div>
    </div>
  );
}

/* ─── Left sidebar ─────────────────────────────────────── */
const SECTION_DOTS = {
  signin: '#4285F4',
  dashboard: '#4D7B3A',
  'player-browse': '#B97744',
  'scout-report': '#C7912A',
  setup: '#8E5832',
  record: '#2F7D4F',
  stats: '#C24C2F',
};

function ShowcaseSidebar() {
  return (
    <div style={{
      width: 200, flexShrink: 0,
      background: 'rgba(10,13,19,0.9)',
      borderRight: '1px solid rgba(244,236,218,0.07)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '14px 16px 10px',
        fontFamily: 'var(--f-display)', fontSize: 8, fontWeight: 600,
        letterSpacing: 2, color: 'rgba(244,236,218,0.35)',
        borderBottom: '1px solid rgba(244,236,218,0.05)',
      }}>APP FLOW · 互動原型</div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 0 16px' }}>
        {FLOW.map((f, i) => (
          <div key={f.screen} style={{
            padding: '8px 16px',
            display: 'flex', alignItems: 'flex-start', gap: 10,
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: 99, flexShrink: 0,
              marginTop: 5,
              background: SECTION_DOTS[f.screen] || 'rgba(244,236,218,0.3)',
            }} />
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontSize: 12, fontWeight: 600,
                color: 'rgba(244,236,218,0.8)', letterSpacing: -0.2,
              }}>{f.label}</div>
              <div style={{
                fontSize: 9, color: 'rgba(244,236,218,0.35)',
                marginTop: 2, lineHeight: 1.4, letterSpacing: 0.2,
              }}>{f.hint}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{
        padding: '10px 16px 16px',
        borderTop: '1px solid rgba(244,236,218,0.06)',
        fontSize: 9, color: 'rgba(244,236,218,0.28)', lineHeight: 1.6,
        letterSpacing: 0.2,
      }}>
        點擊手機畫面內的<br/>按鈕或元素即可<br/>導覽至下一個畫面
      </div>
    </div>
  );
}

/* ─── Right usage hint ──────────────────────────────────── */
function UsageHint() {
  return (
    <div style={{
      width: 180, flexShrink: 0,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '0 20px', gap: 20,
    }}>
      {[
        { icon: '👆', title: '點擊互動', body: '手機畫面內的按鈕和元素均可點擊' },
        { icon: '↩', title: '返回上頁', body: '點擊畫面左上角「← 返回」' },
        { icon: '🔄', title: '完整流程', body: '從登入 → 記錄 → 結算 → 報告' },
      ].map((h, i) => (
        <div key={i}>
          <div style={{ fontSize: 18, marginBottom: 4 }}>{h.icon}</div>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'rgba(244,236,218,0.7)',
            letterSpacing: -0.1, marginBottom: 3,
          }}>{h.title}</div>
          <div style={{
            fontSize: 10, color: 'rgba(244,236,218,0.35)', lineHeight: 1.5,
          }}>{h.body}</div>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

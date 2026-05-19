/* ────────────────────────────────────────────────
   BattedBallSheet — bottom sheet that appears after
   tapping the "擊出" result button.
   Lets the user mark the batted-ball type:
     • 短打 (Bunt)
     • 滾地 (Ground ball)
     • 平飛 (Line drive)
     • 高飛 (Fly ball)
──────────────────────────────────────────────── */

const BATTED_BALL_TYPES = [
  {
    code: "BUNT",
    ko:   "短打",
    en:   "BUNT",
    desc: "點向內野的觸擊",
    color: "#475569",
    icon: ({ active }) => (
      <svg viewBox="0 0 60 36" width="56" height="36">
        {/* horizontal bat */}
        <rect x="10" y="16" width="32" height="4" rx="2" fill="#8E5832"/>
        <rect x="38" y="14.5" width="6" height="7" rx="1.5" fill="#5a4427"/>
        {/* tiny dribbling ball + dotted path */}
        <circle cx="48" cy="26" r="3" fill="#FBF7EE" stroke="#1B2230" strokeWidth="0.6"/>
        <path d="M 44 30 Q 50 32 53 28" fill="none" stroke={active ? "#FBF7EE" : "#1B2230"} strokeWidth="0.8" strokeDasharray="1.5 1.5"/>
      </svg>
    ),
  },
  {
    code: "GB",
    ko:   "滾地",
    en:   "GROUNDER",
    desc: "球在地面滾動",
    color: "#8E5832",
    icon: ({ active }) => (
      <svg viewBox="0 0 60 36" width="56" height="36">
        {/* ground line */}
        <line x1="4" y1="28" x2="56" y2="28" stroke={active ? "#FBF7EE" : "#1B2230"} strokeWidth="0.8"/>
        {/* bouncing path */}
        <path d="M 8 28 Q 16 18 22 28 Q 30 22 36 28 Q 44 24 50 28"
              fill="none" stroke={active ? "#FBF7EE" : "#1B2230"} strokeWidth="1" strokeDasharray="2 2"/>
        {/* ball */}
        <circle cx="50" cy="28" r="3.3" fill="#FBF7EE" stroke="#1B2230" strokeWidth="0.7"/>
        <path d="M 47.5 26 Q 50 28 47.5 30" fill="none" stroke="#C24C2F" strokeWidth="0.4"/>
        <path d="M 52.5 26 Q 50 28 52.5 30" fill="none" stroke="#C24C2F" strokeWidth="0.4"/>
      </svg>
    ),
  },
  {
    code: "LD",
    ko:   "平飛",
    en:   "LINER",
    desc: "平直穿出內野",
    color: "#C24C2F",
    icon: ({ active }) => (
      <svg viewBox="0 0 60 36" width="56" height="36">
        <line x1="4" y1="32" x2="56" y2="32" stroke={active ? "rgba(251,247,238,0.4)" : "rgba(27,34,48,0.3)"} strokeWidth="0.5"/>
        {/* arrow path - mostly flat */}
        <path d="M 6 22 L 50 22" fill="none" stroke={active ? "#FBF7EE" : "#1B2230"} strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M 50 22 L 46 19 M 50 22 L 46 25" fill="none" stroke={active ? "#FBF7EE" : "#1B2230"} strokeWidth="1.6" strokeLinecap="round"/>
        {/* ball at end */}
        <circle cx="50" cy="22" r="3" fill="#FBF7EE" stroke="#1B2230" strokeWidth="0.6"/>
      </svg>
    ),
  },
  {
    code: "FB",
    ko:   "高飛",
    en:   "FLY BALL",
    desc: "高拋向外野",
    color: "#2F7D4F",
    icon: ({ active }) => (
      <svg viewBox="0 0 60 36" width="56" height="36">
        <line x1="4" y1="32" x2="56" y2="32" stroke={active ? "rgba(251,247,238,0.4)" : "rgba(27,34,48,0.3)"} strokeWidth="0.5"/>
        {/* high arc */}
        <path d="M 6 30 Q 30 -2 54 30"
              fill="none" stroke={active ? "#FBF7EE" : "#1B2230"} strokeWidth="1.4" strokeDasharray="2 2"/>
        <circle cx="30" cy="6" r="3.4" fill="#FBF7EE" stroke="#1B2230" strokeWidth="0.7"/>
        <path d="M 28 4 Q 30 6 28 8" fill="none" stroke="#C24C2F" strokeWidth="0.4"/>
        <path d="M 32 4 Q 30 6 32 8" fill="none" stroke="#C24C2F" strokeWidth="0.4"/>
      </svg>
    ),
  },
];

function BattedBallSheet({ activeIndex = 1 }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "rgba(27,34,48,0.55)",
      backdropFilter: "blur(2px)",
      WebkitBackdropFilter: "blur(2px)",
      display: "flex", flexDirection: "column",
      justifyContent: "flex-end",
      zIndex: 10,
    }}>
      <div style={{
        background: "var(--paper)",
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
        boxShadow: "0 -10px 30px rgba(0,0,0,0.25)",
        padding: "10px 14px 26px",
        position: "relative",
      }}>
        {/* drag handle */}
        <div style={{
          width: 40, height: 4, borderRadius: 2,
          background: "rgba(27,34,48,0.18)",
          margin: "0 auto 10px",
        }}/>

        {/* sheet header */}
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          padding: "0 2px 8px",
        }}>
          <div>
            <div style={{
              fontFamily: "var(--f-display)", fontSize: 10, letterSpacing: 2,
              color: "var(--clay)", fontWeight: 600,
            }}>BATTED BALL TYPE</div>
            <div style={{
              fontFamily: "var(--f-body)", fontSize: 17, fontWeight: 800,
              color: "var(--ink)", letterSpacing: -0.3, marginTop: 2,
            }}>擊球類型</div>
          </div>
          <div style={{
            fontSize: 11, color: "var(--ink-soft)", paddingBottom: 2,
          }}>
            <span style={{ color: "var(--ink-mute)" }}>本打席 ▸ </span>
            <span style={{ fontWeight: 600 }}>擊出</span>
          </div>
        </div>

        {/* mini breadcrumb of what was already recorded */}
        <div style={{
          display: "flex", gap: 4, alignItems: "center",
          padding: "6px 8px",
          background: "rgba(27,34,48,0.04)",
          borderRadius: 8,
          marginBottom: 10,
          fontSize: 10, color: "var(--ink-soft)",
        }}>
          <span style={{
            background: "var(--strike)", color: "#F4ECDA",
            padding: "1px 5px", borderRadius: 3,
            fontFamily: "var(--f-display)", fontWeight: 700, letterSpacing: 0.5,
          }}>S</span>
          <span>·</span>
          <span style={{ fontFamily: "var(--f-display)", fontWeight: 600 }}>CELL 5</span>
          <span>·</span>
          <span style={{
            background: "var(--clay-deep)", color: "#F4ECDA",
            padding: "1px 5px", borderRadius: 3,
            fontFamily: "var(--f-display)", fontWeight: 700, letterSpacing: 0.5,
          }}>FB</span>
          <span style={{ fontWeight: 600, color: "var(--ink)" }}>快速球</span>
          <span style={{ marginLeft: "auto", color: "var(--ink-mute)" }}>下一步：擊球類型</span>
        </div>

        {/* 2×2 grid of batted-ball types */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 8,
        }}>
          {BATTED_BALL_TYPES.map((t, i) => {
            const active = i === activeIndex;
            return (
              <div key={t.code} style={{
                position: "relative",
                background: active ? t.color : "var(--chalk)",
                color: active ? "#F4ECDA" : "var(--ink)",
                borderRadius: 12,
                border: active ? "none" : "1px solid rgba(27,34,48,0.1)",
                padding: "10px 12px 12px",
                boxShadow: active
                  ? "0 6px 18px rgba(27,34,48,0.22), inset 0 1px 0 rgba(255,255,255,0.12)"
                  : "var(--shadow-sm)",
                display: "flex", flexDirection: "column", gap: 6,
                cursor: "pointer", overflow: "hidden",
              }}>
                {/* icon row */}
                <div style={{
                  height: 40,
                  display: "flex", alignItems: "center", justifyContent: "flex-start",
                  background: active ? "rgba(0,0,0,0.18)" : "var(--paper-2)",
                  borderRadius: 8,
                  padding: "0 6px",
                  marginBottom: 2,
                }}>
                  <t.icon active={active}/>
                </div>
                <div style={{
                  display: "flex", alignItems: "baseline", justifyContent: "space-between",
                }}>
                  <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: -0.3 }}>{t.ko}</div>
                  {active && (
                    <div style={{
                      width: 16, height: 16, borderRadius: 8,
                      background: "rgba(244,236,218,0.95)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: t.color, fontWeight: 800, fontSize: 10,
                    }}>✓</div>
                  )}
                </div>
                <div style={{
                  fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 1.5,
                  fontWeight: 600,
                  color: active ? "rgba(244,236,218,0.7)" : "var(--ink-mute)",
                  marginTop: -3,
                }}>{t.en}</div>
                <div style={{
                  fontSize: 10, lineHeight: 1.4,
                  color: active ? "rgba(244,236,218,0.85)" : "var(--ink-soft)",
                }}>{t.desc}</div>
              </div>
            );
          })}
        </div>

        {/* action row */}
        <div style={{
          display: "flex", gap: 8, marginTop: 12,
        }}>
          <button className="btn" style={{
            flex: 1, height: 44, borderRadius: 11,
            background: "transparent",
            border: "1.5px solid rgba(27,34,48,0.15)",
            fontSize: 13, fontWeight: 600, color: "var(--ink-soft)",
          }}>取消</button>
          <button className="btn" style={{
            flex: 2, height: 44, borderRadius: 11,
            background: BATTED_BALL_TYPES[activeIndex].color,
            border: "none", color: "#F4ECDA",
            fontSize: 14, fontWeight: 700, letterSpacing: 0.5,
            boxShadow: "0 4px 10px rgba(27,34,48,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}>
            下一步 · 標示落點
            <span style={{ fontSize: 14, opacity: 0.85 }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BattedBallSheet, BATTED_BALL_TYPES });

/* ────────────────────────────────────────────────
   GameMenu — popup menu triggered by the ⋯ button
   in the record screen top bar.

   Options:
     • 更換代打 → AddBatter / SetupOrder
     • 更換投手 → SetupPitcher
     • 比賽結束 → end-game confirmation
──────────────────────────────────────────────── */

const GAME_ACTIONS = [
  {
    code: "pinch_hitter",
    ko:   "更換代打",
    en:   "PINCH HITTER",
    desc: "上一位代打／替換打者",
    color: "var(--clay-deep)",
    glyph: ({ active }) => (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <circle cx="9"  cy="7" r="2.6" fill={active ? "#F4ECDA" : "var(--clay-deep)"}/>
        <rect x="7.2" y="10" width="3.6" height="7" rx="1" fill={active ? "#F4ECDA" : "var(--clay-deep)"}/>
        <rect x="6.8" y="17" width="1.6" height="5" fill={active ? "#F4ECDA" : "var(--clay-deep)"}/>
        <rect x="9.6" y="17" width="1.6" height="5" fill={active ? "#F4ECDA" : "var(--clay-deep)"}/>
        {/* arrow / replacement */}
        <path d="M 14 12 L 20 12 M 18 10 L 20 12 L 18 14"
              fill="none" stroke={active ? "#F4ECDA" : "var(--clay-deep)"} strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    code: "pitcher_change",
    ko:   "更換投手",
    en:   "PITCHING CHANGE",
    desc: "對方換投，記錄新投手",
    color: "var(--ink)",
    glyph: ({ active }) => (
      <svg viewBox="0 0 24 24" width="22" height="22">
        {/* mound */}
        <ellipse cx="12" cy="20" rx="9" ry="1.5"
                 fill={active ? "rgba(244,236,218,0.25)" : "rgba(27,34,48,0.15)"}/>
        {/* baseball */}
        <circle cx="12" cy="6" r="3.4" fill={active ? "#F4ECDA" : "#FBF7EE"}
                stroke={active ? "#F4ECDA" : "var(--ink)"} strokeWidth="0.8"/>
        <path d="M 10 4 Q 12 6 10 8" fill="none"
              stroke={active ? "var(--ball)" : "var(--ball)"} strokeWidth="0.5"/>
        <path d="M 14 4 Q 12 6 14 8" fill="none"
              stroke={active ? "var(--ball)" : "var(--ball)"} strokeWidth="0.5"/>
        {/* swap arrows */}
        <path d="M 6 14 L 10 14 M 8 12 L 6 14 L 8 16"
              fill="none" stroke={active ? "#F4ECDA" : "var(--ink)"} strokeWidth="1.3"
              strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M 18 18 L 14 18 M 16 16 L 18 18 L 16 20"
              fill="none" stroke={active ? "#F4ECDA" : "var(--ink)"} strokeWidth="1.3"
              strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    code: "end_game",
    ko:   "比賽結束",
    en:   "END GAME",
    desc: "結算本場記錄並送出",
    color: "var(--ball)",
    glyph: ({ active }) => (
      <svg viewBox="0 0 24 24" width="22" height="22">
        {/* checkered flag */}
        <line x1="6" y1="3" x2="6" y2="22" stroke={active ? "#F4ECDA" : "var(--ball)"} strokeWidth="1.6"/>
        <rect x="7" y="4"  width="3" height="3" fill={active ? "#F4ECDA" : "var(--ball)"}/>
        <rect x="13" y="4" width="3" height="3" fill={active ? "#F4ECDA" : "var(--ball)"}/>
        <rect x="10" y="7"  width="3" height="3" fill={active ? "#F4ECDA" : "var(--ball)"}/>
        <rect x="16" y="7"  width="3" height="3" fill={active ? "#F4ECDA" : "var(--ball)"}/>
        <rect x="7" y="10"  width="3" height="3" fill={active ? "#F4ECDA" : "var(--ball)"}/>
        <rect x="13" y="10" width="3" height="3" fill={active ? "#F4ECDA" : "var(--ball)"}/>
        <rect x="10" y="13" width="3" height="3" fill={active ? "#F4ECDA" : "var(--ball)"}/>
        <rect x="16" y="13" width="3" height="3" fill={active ? "#F4ECDA" : "var(--ball)"}/>
      </svg>
    ),
  },
];

function GameMenu({ activeIndex = null }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "rgba(27,34,48,0.55)",
      backdropFilter: "blur(2px)",
      WebkitBackdropFilter: "blur(2px)",
      display: "flex", flexDirection: "column",
      justifyContent: "flex-start",
      zIndex: 10,
    }}>
      {/* status bar spacer */}
      <div style={{ height: 54 }}/>

      {/* tap-area to close (above the menu) */}
      <div style={{ flex: 1 }}/>

      {/* menu card — anchored near where the ⋯ button would be (top-right). */}
      <div style={{
        position: "absolute", top: 90, right: 14,
        width: 240,
        background: "var(--paper)",
        borderRadius: 14,
        boxShadow: "0 18px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(27,34,48,0.08)",
        padding: 6,
        overflow: "hidden",
      }}>
        {/* arrow notch pointing up-right toward the menu button */}
        <div style={{
          position: "absolute", top: -6, right: 18,
          width: 12, height: 12,
          background: "var(--paper)",
          transform: "rotate(45deg)",
          borderTop: "1px solid rgba(27,34,48,0.05)",
          borderLeft: "1px solid rgba(27,34,48,0.05)",
        }}/>

        <div style={{
          padding: "8px 10px 6px",
          fontFamily: "var(--f-display)", fontSize: 9, fontWeight: 600,
          letterSpacing: 1.5, color: "var(--ink-mute)",
        }}>本場操作 · GAME ACTIONS</div>

        {GAME_ACTIONS.map((a, i) => {
          const active = i === activeIndex;
          return (
            <div key={a.code} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 10px",
              borderRadius: 10,
              background: active ? a.color : "transparent",
              color: active ? "#F4ECDA" : "var(--ink)",
              marginBottom: i < GAME_ACTIONS.length - 1 ? 2 : 0,
              cursor: "pointer",
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 8,
                background: active ? "rgba(0,0,0,0.18)" : "var(--chalk)",
                border: active ? "none" : "1px solid rgba(27,34,48,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <a.glyph active={active}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 6,
                }}>
                  <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.2 }}>{a.ko}</span>
                  <span style={{
                    fontFamily: "var(--f-display)", fontSize: 8, fontWeight: 600,
                    letterSpacing: 1, opacity: active ? 0.7 : 0.55,
                  }}>{a.en}</span>
                </div>
                <div style={{
                  fontSize: 10, marginTop: 1,
                  color: active ? "rgba(244,236,218,0.8)" : "var(--ink-soft)",
                  lineHeight: 1.3,
                }}>{a.desc}</div>
              </div>
              <div style={{
                fontSize: 13, opacity: active ? 0.85 : 0.4,
                color: active ? "#F4ECDA" : "var(--ink-mute)",
              }}>→</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { GameMenu, GAME_ACTIONS });

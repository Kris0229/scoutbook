/* ────────────────────────────────────────────────
   MemoSheet — bottom-sheet memo input, triggered
   by the floating "MEMO" button on the recording
   screen. Lets the scout jot a quick note attached
   to the current PA.
──────────────────────────────────────────────── */

const MEMO_TAGS = [
  { k: "球種補充",  color: "var(--clay-deep)" },
  { k: "球速 km/h", color: "var(--ball)" },
  { k: "走位",      color: "var(--strike)" },
  { k: "情緒",      color: "var(--warn)" },
  { k: "傷停",      color: "#475569" },
  { k: "建議",      color: "#3E6FA0" },
];

const MEMO_HISTORY = [
  { time: "5上 · 1OUT", text: "陳柏宇前段速球控制不穩，1-1 球數常逃到外角下沉。" },
  { time: "3上 · 2OUT", text: "31 王俊偉看到曲球反應變慢，可繼續攻擊。" },
];

function MemoSheet({ value = "對方換投時投手暖身較久 · 投球節奏會慢一拍，可主動破壞。", tagIndex = 0 }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "rgba(27,34,48,0.55)",
      backdropFilter: "blur(2px)",
      WebkitBackdropFilter: "blur(2px)",
      display: "flex", flexDirection: "column",
      justifyContent: "flex-end",
      zIndex: 11,
    }}>
      <div style={{
        background: "var(--paper)",
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
        boxShadow: "0 -10px 30px rgba(0,0,0,0.25)",
        padding: "10px 14px 24px",
        display: "flex", flexDirection: "column", gap: 10,
      }}>
        <div style={{
          width: 40, height: 4, borderRadius: 2,
          background: "rgba(27,34,48,0.18)",
          margin: "0 auto 4px",
        }}/>

        {/* header */}
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          padding: "0 2px",
        }}>
          <div>
            <div style={{
              fontFamily: "var(--f-display)", fontSize: 10, letterSpacing: 2,
              color: "var(--clay)", fontWeight: 600,
            }}>QUICK MEMO</div>
            <div style={{
              fontFamily: "var(--f-body)", fontSize: 17, fontWeight: 800,
              color: "var(--ink)", letterSpacing: -0.3, marginTop: 2,
            }}>加入備註</div>
          </div>
          <div style={{
            fontSize: 11, color: "var(--ink-soft)", paddingBottom: 2,
            display: "flex", alignItems: "center", gap: 5,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: 3, background: "var(--ball)",
            }}/>
            <span>5上 · 1OUT · 第 3 棒 王俊偉</span>
          </div>
        </div>

        {/* tags */}
        <div>
          <div style={{
            fontFamily: "var(--f-display)", fontSize: 9, fontWeight: 600,
            letterSpacing: 1.5, color: "var(--ink-mute)", marginBottom: 6,
          }}>TAG · 分類</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {MEMO_TAGS.map((t, i) => {
              const on = i === tagIndex;
              return (
                <div key={i} style={{
                  padding: "4px 10px", borderRadius: 99,
                  background: on ? t.color : "var(--chalk)",
                  color: on ? "#FBF7EE" : "var(--ink-soft)",
                  border: on ? "none" : "1px solid rgba(27,34,48,0.12)",
                  fontSize: 11, fontWeight: 600, letterSpacing: 0.3,
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  {on && <span style={{ fontSize: 9 }}>●</span>}
                  {t.k}
                </div>
              );
            })}
          </div>
        </div>

        {/* textarea */}
        <div style={{
          background: "var(--chalk)",
          border: "1.5px solid var(--clay-deep)",
          borderRadius: 12, padding: "10px 12px",
          minHeight: 96,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 0 0 0 4px rgba(185,119,68,0.08)",
          position: "relative",
        }}>
          <div style={{
            fontSize: 13.5, color: "var(--ink)", lineHeight: 1.55, fontWeight: 500,
          }}>
            {value}
            <span style={{
              display: "inline-block",
              width: 1.5, height: 16,
              background: "var(--clay-deep)",
              marginLeft: 2, verticalAlign: "middle",
              animation: "blink 1s step-end infinite",
            }}/>
          </div>
          <div style={{
            position: "absolute", right: 10, bottom: 6,
            fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 0.5,
            color: "var(--ink-mute)",
          }}>{value.length} / 300</div>
        </div>

        {/* meta options row */}
        <div style={{ display: "flex", gap: 6 }}>
          <MetaToggle icon="🔊" label="語音輸入"/>
          <MetaToggle icon="📷" label="附加照片"/>
          <MetaToggle icon="📌" label="標記重點" active/>
        </div>

        {/* memo log preview */}
        <div>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "baseline",
            marginBottom: 4,
          }}>
            <div style={{
              fontFamily: "var(--f-display)", fontSize: 9, fontWeight: 600,
              letterSpacing: 1.5, color: "var(--ink-mute)",
            }}>本場備註 · MEMOS</div>
            <div style={{ fontSize: 10, color: "var(--clay-deep)", fontWeight: 600 }}>{MEMO_HISTORY.length} 則</div>
          </div>
          <div style={{
            background: "rgba(27,34,48,0.04)", borderRadius: 8,
            border: "1px solid rgba(27,34,48,0.06)",
          }}>
            {MEMO_HISTORY.map((m, i) => (
              <div key={i} style={{
                display: "flex", gap: 8,
                padding: "8px 10px",
                borderBottom: i < MEMO_HISTORY.length - 1 ? "1px solid rgba(27,34,48,0.06)" : "none",
              }}>
                <div style={{
                  fontFamily: "var(--f-display)", fontSize: 9, fontWeight: 700,
                  letterSpacing: 0.6, color: "var(--clay-deep)",
                  width: 60, flexShrink: 0, paddingTop: 1,
                }}>{m.time}</div>
                <div style={{ fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.45 }}>{m.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* actions */}
        <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
          <button className="btn" style={{
            flex: 1, height: 44, borderRadius: 11,
            background: "transparent",
            border: "1.5px solid rgba(27,34,48,0.15)",
            fontSize: 13, fontWeight: 600, color: "var(--ink-soft)",
          }}>取消</button>
          <button className="btn" style={{
            flex: 2, height: 44, borderRadius: 11,
            background: "var(--clay-deep)", border: "none", color: "#F4ECDA",
            fontSize: 14, fontWeight: 700, letterSpacing: 0.5,
            boxShadow: "0 4px 10px rgba(27,34,48,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}>
            儲存備註
            <span style={{ fontSize: 14, opacity: 0.85 }}>✓</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function MetaToggle({ icon, label, active = false }) {
  return (
    <div style={{
      flex: 1,
      padding: "8px 0",
      borderRadius: 10,
      background: active ? "rgba(185,119,68,0.14)" : "var(--chalk)",
      border: active ? "1px solid var(--clay-deep)" : "1px solid rgba(27,34,48,0.1)",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
    }}>
      <div style={{ fontSize: 16 }}>{icon}</div>
      <div style={{
        fontSize: 10, fontWeight: 600,
        color: active ? "var(--clay-deep)" : "var(--ink-soft)",
        letterSpacing: 0.3,
      }}>{label}</div>
    </div>
  );
}

Object.assign(window, { MemoSheet });

/* ────────────────────────────────────────────────
   FieldLocationSheet — full-screen field overlay
   shown after the user picks a 擊球類型 (batted-ball
   type). User taps anywhere on the field to mark
   where the ball landed.
──────────────────────────────────────────────── */

const FIELD_ZONES = [
  // x, y normalized (0..1) of viewBox
  { code: "P",  ko: "投手前",   x: 0.50, y: 0.65 },
  { code: "1B", ko: "一壘前",   x: 0.62, y: 0.65 },
  { code: "2B", ko: "二壘前",   x: 0.50, y: 0.50 },
  { code: "3B", ko: "三壘前",   x: 0.38, y: 0.65 },
  { code: "SS", ko: "游擊區",   x: 0.42, y: 0.55 },
  { code: "LF", ko: "左外野",   x: 0.25, y: 0.30 },
  { code: "LC", ko: "左中外",   x: 0.38, y: 0.20 },
  { code: "CF", ko: "中外野",   x: 0.50, y: 0.16 },
  { code: "RC", ko: "右中外",   x: 0.62, y: 0.20 },
  { code: "RF", ko: "右外野",   x: 0.75, y: 0.30 },
];

function FieldLocationSheet({ selectedDot = null /* {x,y,zone?} */ }) {
  const dot = selectedDot || { x: 0.62, y: 0.32, zone: "RF" };

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
        {/* drag handle */}
        <div style={{
          width: 40, height: 4, borderRadius: 2,
          background: "rgba(27,34,48,0.18)",
          margin: "0 auto 4px",
        }}/>

        {/* sheet header */}
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          padding: "0 2px",
        }}>
          <div>
            <div style={{
              fontFamily: "var(--f-display)", fontSize: 10, letterSpacing: 2,
              color: "var(--clay)", fontWeight: 600,
            }}>BALL LOCATION</div>
            <div style={{
              fontFamily: "var(--f-body)", fontSize: 17, fontWeight: 800,
              color: "var(--ink)", letterSpacing: -0.3, marginTop: 2,
            }}>擊球落點</div>
          </div>
          <div style={{
            fontSize: 11, color: "var(--ink-soft)", paddingBottom: 2,
          }}>
            <span style={{ color: "var(--ink-mute)" }}>本打席 ▸ </span>
            <span style={{ fontWeight: 600 }}>擊出 · 平飛</span>
          </div>
        </div>

        {/* breadcrumb chips */}
        <div style={{
          display: "flex", gap: 4, alignItems: "center",
          padding: "6px 8px",
          background: "rgba(27,34,48,0.04)",
          borderRadius: 8,
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
          <span>·</span>
          <span style={{
            background: "var(--ball)", color: "#FBF7EE",
            padding: "1px 5px", borderRadius: 3,
            fontFamily: "var(--f-display)", fontWeight: 700, letterSpacing: 0.5,
          }}>LD</span>
          <span style={{ fontWeight: 600, color: "var(--ink)" }}>平飛</span>
          <span style={{ marginLeft: "auto", color: "var(--ink-mute)" }}>步驟 3 / 3</span>
        </div>

        {/* big field map */}
        <div style={{
          position: "relative",
          aspectRatio: "4 / 3.2",
          background: "linear-gradient(180deg, #5b8e44 0%, #4D7B3A 100%)",
          borderRadius: 14, overflow: "hidden",
          border: "1px solid rgba(27,34,48,0.1)",
          boxShadow: "var(--shadow-sm)",
        }}>
          <div className="grit" style={{ position: "absolute", inset: 0, opacity: 0.18 }}/>
          <svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMid meet"
               style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <defs>
              <linearGradient id="fldDirt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C68852"/>
                <stop offset="100%" stopColor="#A4683A"/>
              </linearGradient>
              <linearGradient id="fldWarn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C99063"/>
                <stop offset="100%" stopColor="#A47147"/>
              </linearGradient>
            </defs>

            {/* warning track band */}
            <path d="M 8 70 L 8 38 A 42 42 0 0 1 92 38 L 92 70 Z"
                  fill="url(#fldWarn)" opacity="0.45"/>
            {/* outfield wall arc */}
            <path d="M 12 38 A 38 38 0 0 1 88 38"
                  fill="none" stroke="#F4ECDA" strokeWidth="0.6" opacity="0.85"/>
            {/* foul lines */}
            <line x1="50" y1="74" x2="8"  y2="32" stroke="#F4ECDA" strokeWidth="0.7"/>
            <line x1="50" y1="74" x2="92" y2="32" stroke="#F4ECDA" strokeWidth="0.7"/>
            {/* infield dirt diamond */}
            <path d="M 50 48 L 72 64 L 50 78 L 28 64 Z" fill="url(#fldDirt)"/>
            {/* infield grass cutout */}
            <path d="M 50 54 L 66 64 L 50 74 L 34 64 Z" fill="#4D7B3A"/>
            {/* pitcher's mound */}
            <circle cx="50" cy="62" r="2.2" fill="#B97744"/>
            <rect x="49" y="61.2" width="2" height="1.4" fill="#F4ECDA"/>
            {/* bases */}
            {[[50,48],[72,64],[50,78],[34,64]].map(([cx,cy],i) => (
              <rect key={i} x={cx-1.6} y={cy-1.6} width="3.2" height="3.2"
                    transform={`rotate(45 ${cx} ${cy})`}
                    fill="#FBF7EE" stroke="#1B2230" strokeWidth="0.3"/>
            ))}
            {/* zone hints */}
            {FIELD_ZONES.map(z => {
              const isSel = dot.zone === z.code;
              return (
                <g key={z.code} opacity={isSel ? 1 : 0.35}>
                  <circle
                    cx={z.x * 100} cy={z.y * 80}
                    r="4.5"
                    fill="none"
                    stroke="#F4ECDA"
                    strokeWidth={isSel ? 0.9 : 0.4}
                    strokeDasharray={isSel ? "" : "1 1"}
                  />
                  <text x={z.x * 100} y={z.y * 80 + 1.4} textAnchor="middle"
                        fontSize="2.6" fontFamily="Oswald, sans-serif" fontWeight="700"
                        fill="#FBF7EE">{z.code}</text>
                </g>
              );
            })}

            {/* hit-path: from home plate to the chosen dot */}
            <line x1="50" y1="74"
                  x2={dot.x * 100} y2={dot.y * 80}
                  stroke="#FBF7EE" strokeWidth="0.5" strokeDasharray="1.5 1"
                  opacity="0.8"/>

            {/* the chosen drop point — pulsing dot */}
            <circle cx={dot.x * 100} cy={dot.y * 80} r="3.6"
                    fill="#C24C2F" stroke="#FBF7EE" strokeWidth="0.9"/>
            <circle cx={dot.x * 100} cy={dot.y * 80} r="6"
                    fill="none" stroke="#C24C2F" strokeWidth="0.5" opacity="0.5"/>
            <circle cx={dot.x * 100} cy={dot.y * 80} r="9"
                    fill="none" stroke="#C24C2F" strokeWidth="0.3" opacity="0.3"/>
          </svg>

          {/* corner label */}
          <div style={{
            position: "absolute", top: 8, left: 10,
            background: "rgba(244,236,218,0.92)", color: "var(--ink)",
            padding: "3px 9px", borderRadius: 6,
            fontFamily: "var(--f-display)", fontSize: 9, fontWeight: 700,
            letterSpacing: 0.6,
          }}>FIELD · 點選或拖曳標示落點</div>

          {/* selected zone readout — bottom-right pill */}
          <div style={{
            position: "absolute", right: 10, bottom: 10,
            background: "rgba(27,34,48,0.9)",
            color: "#F4ECDA",
            padding: "6px 10px",
            borderRadius: 10,
            display: "flex", alignItems: "center", gap: 8,
            border: "1px solid rgba(244,236,218,0.18)",
            boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: 4,
              background: "var(--ball)", color: "#FBF7EE",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--f-display)", fontSize: 10, fontWeight: 700, letterSpacing: 0.4,
            }}>{dot.zone || "—"}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700 }}>
                {FIELD_ZONES.find(z => z.code === dot.zone)?.ko || "未指定"}
              </div>
              <div style={{
                fontFamily: "var(--f-display)", fontSize: 8, letterSpacing: 0.8,
                color: "rgba(244,236,218,0.55)",
              }}>LOCATION</div>
            </div>
          </div>
        </div>

        {/* result hint */}
        <div style={{
          padding: "8px 12px",
          background: "rgba(199,145,42,0.10)",
          border: "1px dashed rgba(199,145,42,0.4)",
          borderRadius: 8,
          fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.45,
        }}>
          建議結果：<strong style={{ color: "var(--clay-deep)" }}>右外野安打</strong> · 系統依照「平飛 + 右外野」推測，可在下一步調整。
        </div>

        {/* action buttons */}
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" style={{
            flex: 1, height: 44, borderRadius: 11,
            background: "transparent",
            border: "1.5px solid rgba(27,34,48,0.15)",
            fontSize: 13, fontWeight: 600, color: "var(--ink-soft)",
          }}>上一步</button>
          <button className="btn" style={{
            flex: 2, height: 44, borderRadius: 11,
            background: "var(--clay-deep)", border: "none", color: "#F4ECDA",
            fontSize: 14, fontWeight: 700, letterSpacing: 0.5,
            boxShadow: "0 4px 10px rgba(27,34,48,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}>
            完成 · 寫入紀錄
            <span style={{ fontSize: 14, opacity: 0.85 }}>✓</span>
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { FieldLocationSheet, FIELD_ZONES });

/* ────────────────────────────────────────────────
   Add-Batter screen — full-page form invoked from
   the batting-order setup when tapping "+ 新增打者".
──────────────────────────────────────────────── */

/* defensive position catalogue with diamond coords for the mini field */
const POSITIONS = [
  { code: "P",  name: "投手",   x: 50, y: 60 },
  { code: "C",  name: "捕手",   x: 50, y: 92 },
  { code: "1B", name: "一壘",   x: 76, y: 60 },
  { code: "2B", name: "二壘",   x: 64, y: 38 },
  { code: "3B", name: "三壘",   x: 24, y: 60 },
  { code: "SS", name: "游擊",   x: 36, y: 38 },
  { code: "LF", name: "左外野", x: 14, y: 18 },
  { code: "CF", name: "中外野", x: 50, y: 8  },
  { code: "RF", name: "右外野", x: 86, y: 18 },
];

const ROLE_POSITIONS = [
  { code: "DH", name: "指定打擊"   },
  { code: "EH", name: "額外打者"   },
  { code: "PH", name: "代打"      },
  { code: "PR", name: "代跑"      },
];

function AddBatter({
  order = 10,
  selectedPos = "1B",
  selectedHand = "S",
  jersey = "31",
  name = "王俊偉",
}) {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "var(--paper)",
      display: "flex", flexDirection: "column",
      fontFamily: "var(--f-body)", color: "var(--ink)",
    }}>
      {/* status bar spacer */}
      <div style={{ height: 54 }}/>

      {/* sheet header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "6px 14px 12px",
      }}>
        <div style={{
          fontFamily: "var(--f-body)", fontSize: 14, fontWeight: 600,
          color: "var(--ink-soft)",
        }}>取消</div>
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "var(--f-display)", fontSize: 10, letterSpacing: 2,
            color: "var(--clay)", fontWeight: 600,
          }}>NEW BATTER · 新增打者</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", marginTop: 1 }}>
            第 {order} 棒
          </div>
        </div>
        <div style={{
          fontFamily: "var(--f-body)", fontSize: 14, fontWeight: 700,
          color: "var(--clay-deep)",
        }}>儲存</div>
      </div>

      <div style={{ height: 1, background: "rgba(27,34,48,0.08)" }}/>

      {/* form body */}
      <div style={{ flex: 1, overflow: "auto", padding: "14px 14px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Jersey + Name row */}
          <div style={{ display: "grid", gridTemplateColumns: "92px 1fr", gap: 10 }}>
            <FieldRow label="背號" hint="01-99">
              <JerseyDisplay value={jersey}/>
            </FieldRow>
            <FieldRow label="姓名" hint="必填">
              <Input value={name}/>
            </FieldRow>
          </div>

          {/* Hand selector — visual, three big options */}
          <FieldRow label="打席" hint="LEFT / RIGHT / SWITCH">
            <HandSelector value={selectedHand}/>
          </FieldRow>

          {/* Position picker — diamond + chips */}
          <FieldRow label="守備位置" hint="DEFENSE">
            <PositionPicker selected={selectedPos}/>
          </FieldRow>

          {/* Role positions (DH/EH/PH/PR) */}
          <FieldRow label="打者角色" hint="僅打／替補">
            <RolePicker selected={null}/>
          </FieldRow>

          <div style={{ height: 90 }}/>
        </div>
      </div>

      {/* bottom keypad — visible jersey-num keypad */}
      <Keypad/>
    </div>
  );
}

/* ── Jersey display — bold number plate ─── */
function JerseyDisplay({ value }) {
  return (
    <div style={{
      height: 56, borderRadius: 10,
      background: "linear-gradient(180deg, #1B2230 0%, #2A3142 100%)",
      color: "#F4ECDA",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "var(--f-display)", fontSize: 32, fontWeight: 700,
      letterSpacing: 2,
      boxShadow: "var(--shadow-md), inset 0 1px 0 rgba(244,236,218,0.1)",
      position: "relative",
    }}>
      <div style={{
        position: "absolute", top: 4, left: 6,
        fontFamily: "var(--f-display)", fontSize: 8, letterSpacing: 1,
        color: "rgba(244,236,218,0.4)",
      }}>#</div>
      {value}
      <div style={{
        position: "absolute", bottom: 3, right: 6,
        width: 5, height: 5, borderRadius: 3, background: "var(--clay-soft)",
      }}/>
    </div>
  );
}

/* ── Hand selector — three big options with batter silhouettes ─── */
function HandSelector({ value }) {
  const opts = [
    { code: "L", label: "左打",      en: "LEFT",   bg: "rgba(47,125,79,0.12)",  border: "var(--strike)" },
    { code: "R", label: "右打",      en: "RIGHT",  bg: "rgba(194,76,47,0.10)",  border: "var(--ball)" },
    { code: "S", label: "左右開弓",  en: "SWITCH", bg: "linear-gradient(90deg, rgba(47,125,79,0.12) 0 50%, rgba(194,76,47,0.10) 50% 100%)", border: "var(--clay-deep)" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
      {opts.map(o => {
        const active = o.code === value;
        return (
          <div key={o.code} style={{
            position: "relative",
            padding: "10px 8px 12px",
            borderRadius: 10,
            background: active ? o.bg : "var(--chalk)",
            border: active ? `2px solid ${o.border}` : "1px solid rgba(27,34,48,0.12)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            cursor: "pointer",
            boxShadow: active ? "0 4px 12px rgba(27,34,48,0.10)" : "none",
          }}>
            <MiniBatter hand={o.code}/>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{o.label}</div>
            <div style={{
              fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 1.2,
              color: active ? o.border : "var(--ink-mute)", fontWeight: 600,
            }}>{o.en}</div>
            {active && (
              <div style={{
                position: "absolute", top: 6, right: 6,
                width: 14, height: 14, borderRadius: 7,
                background: o.border, color: "#F4ECDA",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9, fontWeight: 700,
              }}>✓</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MiniBatter({ hand }) {
  // visual: stick figure at home plate with bat orientation
  const flip = hand === "L";
  return (
    <svg viewBox="0 0 60 40" width="46" height="32">
      {/* home plate */}
      <path d="M 22 36 L 38 36 L 36 39 L 24 39 Z" fill="#FBF7EE" stroke="#1B2230" strokeWidth="0.4"/>

      {hand === "S" ? (
        <>
          {/* two ghost batters facing each other */}
          <g transform="translate(8 0)" opacity="0.55">
            <BatterSil/>
          </g>
          <g transform="translate(52 0) scale(-1 1)" opacity="0.55">
            <BatterSil/>
          </g>
        </>
      ) : (
        <g transform={flip ? "translate(60 0) scale(-1 1)" : ""}>
          {/* single batter on the appropriate side of plate */}
          <g transform="translate(36 0)">
            <BatterSil/>
          </g>
        </g>
      )}
    </svg>
  );
}

function BatterSil() {
  return (
    <g fill="#1B2230">
      <circle cx="6" cy="8" r="3"/>
      <rect x="4" y="11" width="4" height="14" rx="1"/>
      <rect x="3.5" y="25" width="2" height="11"/>
      <rect x="6.5" y="25" width="2" height="11"/>
      {/* bat */}
      <rect x="8" y="4" width="11" height="1.6" rx="0.8" transform="rotate(-32 13 4.8)"/>
    </g>
  );
}

/* ── Position picker — mini diamond + position chips ─── */
function PositionPicker({ selected }) {
  return (
    <div style={{
      background: "var(--chalk)", borderRadius: 12,
      border: "1px solid rgba(27,34,48,0.1)",
      padding: 10,
      display: "grid", gridTemplateColumns: "120px 1fr", gap: 12,
    }}>
      {/* mini field */}
      <div style={{
        position: "relative", aspectRatio: "1 / 1",
        borderRadius: 10, overflow: "hidden",
        background: "linear-gradient(180deg, #5b8e44 0%, #4D7B3A 100%)",
      }}>
        <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {/* infield */}
          <path d="M 50 58 L 76 68 L 50 80 L 24 68 Z" fill="#B97744"/>
          <path d="M 50 64 L 70 70 L 50 76 L 30 70 Z" fill="#4D7B3A"/>
          {/* outfield arc */}
          <path d="M 12 50 A 38 38 0 0 1 88 50" fill="none" stroke="#F4ECDA" strokeWidth="0.6"/>
          {/* foul lines */}
          <line x1="50" y1="74" x2="14" y2="38" stroke="#F4ECDA" strokeWidth="0.5"/>
          <line x1="50" y1="74" x2="86" y2="38" stroke="#F4ECDA" strokeWidth="0.5"/>
          {/* mound */}
          <circle cx="50" cy="68" r="2" fill="#B97744"/>
          {/* position dots */}
          {POSITIONS.map(p => {
            const active = p.code === selected;
            return (
              <g key={p.code}>
                <circle cx={p.x} cy={p.y} r={active ? 4 : 2.4}
                        fill={active ? "var(--clay)" : "#FBF7EE"}
                        stroke="#1B2230" strokeWidth="0.5"/>
                {active && (
                  <text x={p.x} y={p.y + 1.2} textAnchor="middle"
                        fontSize="3.2" fontWeight="700" fontFamily="Oswald" fill="#1B2230">
                    {p.code}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* chip grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
          {POSITIONS.map(p => {
            const active = p.code === selected;
            return (
              <div key={p.code} style={{
                padding: "5px 4px", borderRadius: 6,
                background: active ? "var(--clay-deep)" : "transparent",
                color: active ? "#F4ECDA" : "var(--ink)",
                border: active ? "none" : "1px solid rgba(27,34,48,0.14)",
                textAlign: "center",
                fontFamily: "var(--f-display)", fontSize: 11, fontWeight: 700,
                letterSpacing: 0.5,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 0,
              }}>
                <div style={{ lineHeight: 1.1 }}>{p.code}</div>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 8, fontWeight: 500,
                              opacity: active ? 0.7 : 0.45, lineHeight: 1.1, marginTop: 1 }}>{p.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function RolePicker({ selected }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
      {ROLE_POSITIONS.map(r => {
        const active = r.code === selected;
        return (
          <div key={r.code} style={{
            padding: "8px 4px", borderRadius: 8,
            background: active ? "var(--grass-deep)" : "var(--chalk)",
            color: active ? "#F4ECDA" : "var(--ink)",
            border: active ? "none" : "1px solid rgba(27,34,48,0.12)",
            textAlign: "center",
          }}>
            <div style={{ fontFamily: "var(--f-display)", fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>{r.code}</div>
            <div style={{ fontSize: 9, opacity: 0.7, marginTop: 1 }}>{r.name}</div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Number keypad (jersey input) ─── */
function Keypad() {
  const keys = ["1","2","3","4","5","6","7","8","9","清除","0","✓"];
  return (
    <div style={{
      background: "var(--paper-2)",
      borderTop: "1px solid rgba(27,34,48,0.1)",
      padding: "8px 10px 26px",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "2px 4px 6px",
      }}>
        <div style={{
          fontFamily: "var(--f-display)", fontSize: 10, fontWeight: 600,
          letterSpacing: 1.5, color: "var(--ink-soft)",
        }}>背號鍵盤 · JERSEY</div>
        <div style={{ fontSize: 10, color: "var(--ink-mute)" }}>按 ✓ 確認</div>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6,
      }}>
        {keys.map(k => {
          const isAction = k === "清除" || k === "✓";
          const isOk = k === "✓";
          return (
            <div key={k} style={{
              height: 42, borderRadius: 9,
              background: isOk ? "var(--clay-deep)"
                              : isAction ? "transparent"
                              : "var(--chalk)",
              border: isOk ? "none"
                          : isAction ? "1px dashed rgba(27,34,48,0.2)"
                          : "1px solid rgba(27,34,48,0.1)",
              color: isOk ? "#F4ECDA"
                          : isAction ? "var(--ink-soft)"
                          : "var(--ink)",
              fontFamily: isAction ? "var(--f-body)" : "var(--f-display)",
              fontSize: isAction ? 12 : 18, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
              letterSpacing: 0.5,
              boxShadow: isAction ? "none" : "0 1px 0 rgba(27,34,48,0.05)",
            }}>{k}</div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { AddBatter });

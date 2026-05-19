/* ────────────────────────────────────────────────
   Setup Wizard — 4 steps
   1. 隊伍   2. 打序   3. 投手   4. 比賽資訊
──────────────────────────────────────────────── */

const STEP_LABELS = ["隊伍", "打序", "投手", "比賽"];

function ScreenShell({ children, step }) {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "var(--paper)",
      display: "flex", flexDirection: "column",
      fontFamily: "var(--f-body)",
      color: "var(--ink)",
    }}>
      {/* status bar spacer */}
      <div style={{ height: 54 }}/>
      {/* compact top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "6px 16px 12px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <BaseballMark size={22}/>
          <div>
            <div style={{ fontFamily: "var(--f-display)", fontSize: 14, fontWeight: 700, letterSpacing: 2, color: "var(--ink)" }}>SCOUTBOOK</div>
            <div style={{ fontSize: 9, color: "var(--ink-mute)", letterSpacing: 1, marginTop: -2 }}>NEW GAME · 新增比賽</div>
          </div>
        </div>
        <div style={{
          fontFamily: "var(--f-display)", fontSize: 11, color: "var(--ink-mute)",
          letterSpacing: 1,
        }}>STEP {step+1}/4</div>
      </div>
      {/* stepper */}
      <div style={{ padding: "0 16px 14px" }}>
        <Stepper step={step} total={4} labels={STEP_LABELS}/>
      </div>
      <div style={{ height: 1, background: "rgba(27,34,48,0.08)" }}/>
      {/* content */}
      <div style={{ flex: 1, overflow: "auto", padding: "16px 16px 0" }}>
        {children}
      </div>
    </div>
  );
}

function BaseballMark({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="#FBF7EE" stroke="#1B2230" strokeWidth="1"/>
      <path d="M 4.5 7 Q 8 12 4.5 17" fill="none" stroke="#C24C2F" strokeWidth="0.8"/>
      <path d="M 19.5 7 Q 16 12 19.5 17" fill="none" stroke="#C24C2F" strokeWidth="0.8"/>
      {[[5.5,8.5],[5.5,11],[5.5,13.5],[5.5,16], [18.5,8.5],[18.5,11],[18.5,13.5],[18.5,16]].map(([x,y],i)=>(
        <line key={i} x1={x-0.6} y1={y-0.6} x2={x+0.6} y2={y+0.6} stroke="#C24C2F" strokeWidth="0.6"/>
      ))}
    </svg>
  );
}

/* ── STEP 1 · 隊伍 ───────────────────────────── */
function SetupTeams() {
  return (
    <ScreenShell step={0}>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <StepHeader
          overline="STEP 1"
          title="今天的對戰組合"
          subtitle="先確認雙方隊伍與主客場"/>

        <div style={{ display: "grid", gap: 14 }}>
          <FieldRow label="客隊 (Away)" hint="客場">
            <Input value="新北獵鷹"/>
          </FieldRow>
          <FieldRow label="主隊 (Home)" hint="主場">
            <Input value="桃園神盾"/>
          </FieldRow>
          <FieldRow label="我方">
            <Segmented options={["客隊", "主隊"]} value="客隊"/>
          </FieldRow>
        </div>

        {/* matchup card */}
        <div style={{
          marginTop: 4, padding: 16,
          background: "var(--chalk)", borderRadius: 14,
          border: "1px solid rgba(27,34,48,0.08)",
          boxShadow: "var(--shadow-sm)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 10, color: "var(--ink-mute)", letterSpacing: 1.5, marginBottom: 4 }}>AWAY · 客</div>
              <div style={{ fontFamily: "var(--f-body)", fontSize: 18, fontWeight: 800 }}>新北獵鷹</div>
              <div style={{ fontFamily: "var(--f-display)", fontSize: 11, color: "var(--clay)", marginTop: 2, letterSpacing: 1 }}>FALCONS</div>
            </div>
            <div style={{
              fontFamily: "var(--f-display)", fontSize: 18, fontWeight: 700,
              color: "var(--ink-mute)", padding: "0 8px",
            }}>VS</div>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 10, color: "var(--ink-mute)", letterSpacing: 1.5, marginBottom: 4 }}>HOME · 主</div>
              <div style={{ fontFamily: "var(--f-body)", fontSize: 18, fontWeight: 800 }}>桃園神盾</div>
              <div style={{ fontFamily: "var(--f-display)", fontSize: 11, color: "var(--clay)", marginTop: 2, letterSpacing: 1 }}>AEGIS</div>
            </div>
          </div>
        </div>

        <StepNav hideBack/>
        <div style={{ height: 60 }}/>
      </div>
    </ScreenShell>
  );
}

/* ── STEP 2 · 打序 ───────────────────────────── */
/* Roster pool — extra spots beyond 9 are filled from here in order.
   Beyond the pool we render empty "+ 新增" rows so the user can extend
   to any size their league uses. */
const BATTING_POOL = [
  { num: "07", pos: "CF", name: "陳冠霖",  hand: "L" },
  { num: "22", pos: "SS", name: "林昱辰",  hand: "R" },
  { num: "31", pos: "1B", name: "王俊偉",  hand: "L" },
  { num: "09", pos: "C",  name: "黃柏翰",  hand: "R" },
  { num: "44", pos: "LF", name: "張子豪",  hand: "S" },  // 左右開弓
  { num: "16", pos: "3B", name: "吳承軒",  hand: "R" },
  { num: "55", pos: "RF", name: "李冠霆",  hand: "L" },
  { num: "13", pos: "2B", name: "蔡明杰",  hand: "R" },
  { num: "02", pos: "DH", name: "高承翰",  hand: "S" },  // 9
  { num: "27", pos: "P",  name: "鄭名軒",  hand: "L" },  // 10
  { num: "37", pos: "EH", name: "周睿翔",  hand: "R" },  // 11
  { num: "41", pos: "EH", name: "許凱傑",  hand: "L" },  // 12
];

/* Common competition-level presets — used by the Tweaks panel.
   keys map to the `lineupLevel` tweak value. */
const LINEUP_PRESETS = {
  "少棒":   { size: 12, hint: "Little League · 全員輪打 12 棒" },
  "青少棒": { size: 10, hint: "青少棒 · 9 名+DH" },
  "高中":   { size: 9,  hint: "高中／業餘成棒 · 9 棒" },
  "職棒DH": { size: 9,  hint: "含 DH 的職棒 9 棒" },
  "慢壘":   { size: 10, hint: "慢速壘球 · 10 守備" },
  "壘球EH": { size: 11, hint: "壘球 EH 制 · 10 守備+1 額外打者" },
  "自訂":   { size: null, hint: "依聯盟規則自由設定" },
};

function SetupOrder({ size = 9, level = "高中", emptyHint = true }) {
  const preset = LINEUP_PRESETS[level] || LINEUP_PRESETS["自訂"];
  // Cap the visible empty markers — beyond 9, every extra spot is "additional"
  const rows = Array.from({ length: size }).map((_, i) => {
    const src = BATTING_POOL[i];
    // Show one empty trailing slot when hint flag is on (any size).
    if (i === size - 1 && emptyHint) {
      return { num: "", pos: "", name: "", hand: "" };
    }
    return src || { num: "", pos: "", name: "", hand: "" };
  });

  return (
    <ScreenShell step={1}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <StepHeader
          overline="STEP 2"
          title="先發打序"
          subtitle={`${level} · ${size} 棒制 — 點擊任一列即可編輯`}/>

        {/* level chip strip — a quick visual signal of what mode you're in */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "8px 12px",
          background: "rgba(185,119,68,0.08)",
          border: "1px solid rgba(185,119,68,0.2)",
          borderRadius: 10,
        }}>
          <div style={{
            fontFamily: "var(--f-display)", fontSize: 10, fontWeight: 700,
            color: "var(--clay-deep)", letterSpacing: 1,
            background: "rgba(185,119,68,0.2)", padding: "2px 7px", borderRadius: 4,
          }}>{level.toUpperCase()}</div>
          <div style={{ fontSize: 11, color: "var(--ink-soft)", flex: 1 }}>
            {preset.hint}
          </div>
          <div style={{
            fontFamily: "var(--f-display)", fontSize: 16, fontWeight: 700,
            color: "var(--clay-deep)",
          }}>{size}<span style={{ fontSize: 10, color: "var(--ink-mute)", marginLeft: 2 }}>棒</span></div>
        </div>

        <div style={{
          background: "var(--chalk)", borderRadius: 12,
          border: "1px solid rgba(27,34,48,0.08)",
          overflow: "hidden",
        }}>
          {/* header */}
          <div style={{
            display: "grid", gridTemplateColumns: "32px 44px 44px 1fr 36px",
            padding: "8px 12px", gap: 8,
            fontSize: 10, color: "var(--ink-mute)", letterSpacing: 1, fontWeight: 600,
            background: "var(--paper-2)",
            borderBottom: "1px solid rgba(27,34,48,0.08)",
          }}>
            <div>棒次</div><div>背號</div><div>守備</div><div>姓名</div><div style={{textAlign:"center"}}>打席</div>
          </div>
          {rows.map((b, i) => (
            <BatterRow key={i} idx={i+1} batter={b} empty={!b.num} extra={i >= 9}/>
          ))}
          {/* trailing "extend lineup" affordance — only when size <= 12 */}
          {size < 15 && (
            <div style={{
              padding: "10px 12px",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              fontSize: 11, color: "var(--ink-mute)",
              borderTop: "1px dashed rgba(27,34,48,0.1)",
              fontWeight: 500,
            }}>
              <span style={{
                width: 14, height: 14, borderRadius: 7,
                border: "1px solid rgba(27,34,48,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, lineHeight: 1,
              }}>+</span>
              加入第 {size + 1} 棒（依聯盟規則）
            </div>
          )}
        </div>

        <StepNav/>
        <div style={{ height: 60 }}/>
      </div>
    </ScreenShell>
  );
}

function BatterRow({ idx, batter, empty, extra = false }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "32px 44px 44px 1fr 36px",
      padding: "10px 12px", gap: 8,
      borderBottom: "1px solid rgba(27,34,48,0.06)",
      alignItems: "center",
      background: empty
        ? "rgba(194,76,47,0.04)"
        : extra
          ? "rgba(77,123,58,0.05)"
          : "transparent",
    }}>
      <div style={{
        fontFamily: "var(--f-display)", fontSize: 16, fontWeight: 600,
        color: extra ? "var(--grass-deep)" : "var(--clay-deep)",
        display: "flex", alignItems: "center", gap: 3,
      }}>
        {idx}
        {extra && <span style={{
          fontSize: 7, fontWeight: 700, letterSpacing: 0.5,
          background: "rgba(77,123,58,0.2)", color: "var(--grass-deep)",
          padding: "1px 3px", borderRadius: 2,
        }}>+</span>}
      </div>
      {empty ? (
        <div style={{
          gridColumn: "2 / span 4",
          fontSize: 12, color: "var(--ball)", fontWeight: 600,
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <span style={{
            width: 18, height: 18, borderRadius: 9,
            border: "1.5px dashed var(--ball)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
          }}>+</span>
          新增第 {idx} 棒
        </div>
      ) : (
        <>
          <div style={{ fontFamily: "var(--f-display)", fontSize: 15, fontWeight: 700 }}>{batter.num}</div>
          <div style={{
            fontFamily: "var(--f-display)", fontSize: 11, fontWeight: 600,
            padding: "2px 6px", borderRadius: 4, textAlign: "center",
            background: "rgba(77,123,58,0.15)", color: "var(--grass-deep)",
            letterSpacing: 0.5, width: "fit-content",
          }}>{batter.pos}</div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{batter.name}</div>
          <HandChip hand={batter.hand}/>
        </>
      )}
    </div>
  );
}

/* Hand chip — visually distinct for 左打 / 右打 / 左右開弓
   L = 左 (blue-ish ink), R = 右 (clay), S = 雙 (split badge w/ both colors) */
function HandChip({ hand }) {
  if (hand === "S") {
    return (
      <div title="左右開弓 · Switch hitter" style={{
        fontFamily: "var(--f-display)", fontSize: 10, fontWeight: 700,
        textAlign: "center", letterSpacing: 0.5,
        borderRadius: 4, overflow: "hidden",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        border: "1px solid rgba(27,34,48,0.15)",
        lineHeight: "16px",
      }}>
        <div style={{ background: "rgba(47,125,79,0.18)", color: "var(--strike)" }}>左</div>
        <div style={{ background: "rgba(194,76,47,0.18)", color: "var(--ball)" }}>右</div>
      </div>
    );
  }
  const isLeft = hand === "L";
  const label = isLeft ? "左" : hand === "R" ? "右" : "—";
  return (
    <div title={isLeft ? "左打" : hand === "R" ? "右打" : ""} style={{
      fontFamily: "var(--f-display)", fontSize: 11, fontWeight: 700,
      textAlign: "center", letterSpacing: 0.5,
      borderRadius: 4, padding: "1px 0",
      border: "1px solid",
      background: isLeft ? "rgba(47,125,79,0.12)"
                          : hand === "R" ? "rgba(194,76,47,0.10)"
                          : "transparent",
      color:      isLeft ? "var(--strike)"
                          : hand === "R" ? "var(--ball)"
                          : "var(--ink-mute)",
      borderColor: isLeft ? "rgba(47,125,79,0.35)"
                          : hand === "R" ? "rgba(194,76,47,0.30)"
                          : "rgba(27,34,48,0.15)",
    }}>{label}</div>
  );
}

/* ── STEP 3 · 投手 ───────────────────────────── */
function SetupPitcher() {
  return (
    <ScreenShell step={2}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <StepHeader
          overline="STEP 3"
          title="先發投手"
          subtitle="記下對方今天派出的右投上勾型大物"/>

        {/* big pitcher card */}
        <div style={{
          position: "relative",
          background: "linear-gradient(180deg, #1B2230 0%, #2A3142 100%)",
          borderRadius: 16, padding: 18,
          color: "#F4ECDA", overflow: "hidden",
          boxShadow: "var(--shadow-md)",
        }}>
          <div className="grit" style={{ position: "absolute", inset: 0, opacity: 0.06 }}/>
          {/* big number watermark */}
          <div style={{
            position: "absolute", right: -8, top: -16,
            fontFamily: "var(--f-display)", fontSize: 140, fontWeight: 700,
            color: "rgba(244,236,218,0.06)", lineHeight: 1, letterSpacing: -6,
          }}>18</div>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 10, color: "var(--clay-soft)", letterSpacing: 2 }}>STARTING PITCHER</div>
            <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>陳柏宇</div>
            <div style={{
              display: "flex", gap: 6, marginTop: 6,
            }}>
              <Pill>#18</Pill>
              <Pill>右投 RHP</Pill>
              <Pill>上勾 Overhand</Pill>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr" }}>
          <FieldRow label="背號"><Input value="18"/></FieldRow>
          <FieldRow label="姓名"><Input value="陳柏宇"/></FieldRow>
          <FieldRow label="慣用手" span={2}>
            <Segmented options={["右投", "左投", "雙能"]} value="右投"/>
          </FieldRow>
          <FieldRow label="投球姿勢" span={2}>
            <Segmented options={["高壓", "側投", "下勾"]} value="高壓"/>
          </FieldRow>
        </div>

        <StepNav/>
        <div style={{ height: 60 }}/>
      </div>
    </ScreenShell>
  );
}

function Pill({ children }) {
  return (
    <div style={{
      padding: "3px 10px", borderRadius: 99,
      background: "rgba(244,236,218,0.12)",
      border: "1px solid rgba(244,236,218,0.18)",
      fontSize: 11, fontWeight: 600, letterSpacing: 0.3,
    }}>{children}</div>
  );
}

/* ── STEP 4 · 比賽資訊 ────────────────────────── */
function SetupMeta() {
  return (
    <ScreenShell step={3}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <StepHeader
          overline="STEP 4"
          title="比賽現場資訊"
          subtitle="場地、天氣、賽事種類 — 收尾就開賽"/>

        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr" }}>
          <FieldRow label="比賽種類" span={2}>
            <Segmented options={["熱身賽", "預賽", "季後賽", "業餘"]} value="預賽"/>
          </FieldRow>
          <FieldRow label="場地" span={2}>
            <Input value="桃園棒球場 · 主球場"/>
          </FieldRow>
          <FieldRow label="日期"><Input value="2026/05/14" suffix="週四"/></FieldRow>
          <FieldRow label="開賽時間"><Input value="18:30" suffix="夜"/></FieldRow>
          <FieldRow label="天氣" span={2}>
            <Segmented options={["晴", "多雲", "小雨", "風大"]} value="多雲"/>
          </FieldRow>
          <FieldRow label="氣溫" hint="℃"><Input value="27"/></FieldRow>
          <FieldRow label="風向" hint="m/s"><Input value="東北 1.8"/></FieldRow>
        </div>

        {/* summary */}
        <div style={{
          padding: 14, borderRadius: 12,
          background: "var(--chalk)",
          border: "1px solid rgba(27,34,48,0.08)",
          display: "flex", flexDirection: "column", gap: 8,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: "var(--ink-mute)", fontWeight: 600 }}>READY TO START · 開賽前確認</div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
            <span style={{ color: "var(--ink-soft)" }}>對戰</span>
            <span style={{ fontWeight: 600 }}>新北獵鷹 @ 桃園神盾</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
            <span style={{ color: "var(--ink-soft)" }}>對方投手</span>
            <span style={{ fontWeight: 600 }}>#18 陳柏宇 · 右投上勾</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
            <span style={{ color: "var(--ink-soft)" }}>記錄打席數</span>
            <span style={{ fontWeight: 600 }}>8 / 9 棒</span>
          </div>
        </div>

        <StepNav next="開始記錄 ▶" primary/>
        <div style={{ height: 60 }}/>
      </div>
    </ScreenShell>
  );
}

Object.assign(window, { SetupTeams, SetupOrder, SetupPitcher, SetupMeta, LINEUP_PRESETS });

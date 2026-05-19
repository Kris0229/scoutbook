/* ────────────────────────────────────────────────
   Scout Report — 5 section charts
   1. ZoneGrid       九宮格打擊率
   2. PitchTypeChart 各球種打擊率
   3. VsHandChart    左右投打擊率
   4. CountGrid      不同球數打擊率（12 cells）
   5. SprayMap       擊球落點圖
──────────────────────────────────────────────── */

/* shared color scale — same heatColor() lives in player-heat.jsx
   we re-use it but fall back if not loaded */
function srHeat(t) {
  if (typeof heatColor === "function") return heatColor(t);
  return `rgba(199,145,42,${0.3 + t * 0.6})`;
}

/* ── 1 · ZONE GRID ─────────────────────────── */
const ZONE_DATA = [
  { id:1, avg:".143", n:7,  heat:0.16 },
  { id:2, avg:".286", n:7,  heat:0.42 },
  { id:3, avg:".250", n:8,  heat:0.34 },
  { id:4, avg:".385", n:13, heat:0.62 },
  { id:5, avg:".471", n:17, heat:0.96 },
  { id:6, avg:".333", n:12, heat:0.55 },
  { id:7, avg:".100", n:10, heat:0.10 },
  { id:8, avg:".222", n:9,  heat:0.28 },
  { id:9, avg:".167", n:6,  heat:0.18 },
];

function ZoneGrid() {
  return (
    <SR_Card>
      <SR_SectionTitle
        kicker="01 · STRIKE ZONE AVG"
        title="九宮格打擊率"
        hint="89 球 · 投手視角"
      />
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 110px", gap: 12,
      }}>
        <div style={{
          position: "relative",
          aspectRatio: "1 / 1",
          borderRadius: 8, overflow: "hidden",
          background: "#1B2230",
          border: "1.5px solid rgba(244,236,218,0.7)",
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr 1fr",
        }}>
          {ZONE_DATA.map(z => {
            const hot = z.heat > 0.5;
            return (
              <div key={z.id} style={{
                position: "relative",
                background: srHeat(z.heat),
                border: "0.5px solid rgba(244,236,218,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
              }}>
                <div style={{
                  fontFamily: "var(--f-display)", fontSize: 17, fontWeight: 700,
                  color: hot ? "#1B2230" : "#F4ECDA",
                  fontVariantNumeric: "tabular-nums", lineHeight: 1,
                }}>{z.avg}</div>
                <div style={{
                  fontFamily: "var(--f-display)", fontSize: 9, fontWeight: 600,
                  color: hot ? "rgba(27,34,48,0.7)" : "rgba(244,236,218,0.55)",
                  marginTop: 2, letterSpacing: 0.4,
                }}>{z.n} 球</div>
              </div>
            );
          })}
          {/* plate hint */}
          <div style={{
            position: "absolute", left: "50%", bottom: "-12%",
            transform: "translate(-50%, 0)", pointerEvents: "none",
          }}>
            <svg viewBox="0 0 60 14" width="40" height="9">
              <path d="M 4 2 L 56 2 L 50 12 L 10 12 Z" fill="rgba(244,236,218,0.4)"/>
            </svg>
          </div>
        </div>
        {/* legend column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{
            fontSize: 11, color: "rgba(244,236,218,0.92)", fontWeight: 600, lineHeight: 1.4,
          }}>正中紅心<br/>是<span style={{ color: "var(--ball)" }}>燒燙區</span></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 4 }}>
            {[
              { l: "冷 < .200", h: 0.10 },
              { l: "溫 .2-.3",  h: 0.42 },
              { l: "熱 .3-.4",  h: 0.78 },
              { l: "燒 > .400", h: 1.0  },
            ].map((r,i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 9.5 }}>
                <span style={{
                  width: 14, height: 9, borderRadius: 2,
                  background: srHeat(r.h),
                  border: "0.5px solid rgba(244,236,218,0.25)",
                }}/>
                <span style={{ color: "rgba(244,236,218,0.7)" }}>{r.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SR_Card>
  );
}

/* ── 2 · PITCH TYPE ─────────────────────────── */
const PITCH_TYPES = [
  { code:"FB", name:"四縫線速球", avg:".356", n:42, pct:0.47, color:"var(--ball)" },
  { code:"SI", name:"二縫線伸卡", avg:".308", n:18, pct:0.20, color:"#D9783A" },
  { code:"SL", name:"滑球",       avg:".185", n:14, pct:0.16, color:"var(--strike)" },
  { code:"CB", name:"曲球",       avg:".143", n:9,  pct:0.10, color:"#3E6FA0" },
  { code:"CH", name:"變速球",     avg:".429", n:7,  pct:0.08, color:"var(--clay-soft)" },
];
const PITCH_MAX_AVG = 0.500;

function PitchTypeChart() {
  return (
    <SR_Card>
      <SR_SectionTitle
        kicker="02 · vs PITCH TYPES"
        title="對不同球種的打擊率"
        hint="本季 · 球種分類"
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {PITCH_TYPES.map(pt => {
          const w = (parseFloat(pt.avg) / PITCH_MAX_AVG) * 100;
          const hot = parseFloat(pt.avg) >= 0.300;
          return (
            <div key={pt.code} style={{
              display: "grid",
              gridTemplateColumns: "44px 1fr 56px 36px",
              alignItems: "center", gap: 8,
            }}>
              <div style={{
                fontFamily: "var(--f-display)", fontSize: 11, fontWeight: 700,
                padding: "3px 0", textAlign: "center", borderRadius: 4,
                background: pt.color, color: "#FBF7EE",
                letterSpacing: 0.6,
              }}>{pt.code}</div>
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: "#F4ECDA", marginBottom: 4 }}>
                  {pt.name}
                </div>
                <div style={{
                  position: "relative", height: 10, borderRadius: 5,
                  background: "rgba(244,236,218,0.08)",
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%", width: `${w}%`,
                    background: hot ? "var(--clay-soft)" : "rgba(244,236,218,0.55)",
                    borderRadius: 5,
                  }}/>
                  {/* league avg marker */}
                  <div style={{
                    position: "absolute", top: -2, bottom: -2,
                    left: `${(0.265 / PITCH_MAX_AVG) * 100}%`,
                    width: 1, background: "rgba(244,236,218,0.55)",
                  }}/>
                </div>
              </div>
              <div style={{
                fontFamily: "var(--f-display)", fontSize: 14, fontWeight: 700,
                color: hot ? "var(--clay-soft)" : "#F4ECDA",
                fontVariantNumeric: "tabular-nums", textAlign: "right", letterSpacing: -0.3,
              }}>{pt.avg}</div>
              <div style={{
                fontFamily: "var(--f-display)", fontSize: 10, color: "rgba(244,236,218,0.5)",
                textAlign: "right",
              }}>{pt.n}球</div>
            </div>
          );
        })}
      </div>
      <div style={{
        marginTop: 10, fontSize: 10, color: "rgba(244,236,218,0.5)",
        letterSpacing: 0.3, display: "flex", alignItems: "center", gap: 6,
      }}>
        <span style={{ display: "inline-block", width: 8, height: 1, background: "rgba(244,236,218,0.55)" }}/>
        聯盟均值 .265
      </div>
    </SR_Card>
  );
}

/* ── 3 · vs LHP / RHP ─────────────────────── */
const HAND_DATA = [
  {
    side: "vs LHP", label: "對左投", avg: ".381", n: 42,
    obp: ".458", slg: ".571", ops: "1.029",
    hot: true,
    flag: "拿手",
  },
  {
    side: "vs RHP", label: "對右投", avg: ".302", n: 134,
    obp: ".381", slg: ".448", ops:  ".829",
    hot: false,
    flag: "平均水準",
  },
];

function VsHandChart() {
  return (
    <SR_Card>
      <SR_SectionTitle
        kicker="03 · vs PITCHER HAND"
        title="對左右投打擊率"
        hint="176 打席"
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {HAND_DATA.map((h, i) => {
          const isL = i === 0;
          return (
            <div key={i} style={{
              position: "relative",
              padding: 12, borderRadius: 10,
              background: h.hot
                ? "linear-gradient(180deg, rgba(194,76,47,0.28) 0%, rgba(194,76,47,0.08) 100%)"
                : "rgba(244,236,218,0.06)",
              border: h.hot ? "1px solid rgba(194,76,47,0.4)" : "1px solid rgba(244,236,218,0.10)",
              overflow: "hidden",
            }}>
              {/* batter silhouette in corner */}
              <svg viewBox="0 0 40 50" width="34" height="42" style={{
                position: "absolute", right: 6, top: 6, opacity: 0.18,
              }}>
                <circle cx={isL ? 14 : 26} cy="8" r="4" fill="#F4ECDA"/>
                <rect x={isL ? 11 : 23} y="13" width="6" height="14" rx="1" fill="#F4ECDA"/>
                <line x1={isL ? 17 : 23} y1="16"
                      x2={isL ? 36 : 4}  y2="6"
                      stroke="#F4ECDA" strokeWidth="2" strokeLinecap="round"/>
                <line x1={isL ? 14 : 26} y1="27"
                      x2={isL ? 10 : 30} y2="42"
                      stroke="#F4ECDA" strokeWidth="2" strokeLinecap="round"/>
                <line x1={isL ? 14 : 26} y1="27"
                      x2={isL ? 18 : 22} y2="42"
                      stroke="#F4ECDA" strokeWidth="2" strokeLinecap="round"/>
              </svg>

              <div style={{
                fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 1.5,
                color: h.hot ? "#FBF7EE" : "rgba(244,236,218,0.55)", fontWeight: 700,
              }}>{h.side}</div>
              <div style={{
                fontSize: 13, fontWeight: 700, color: "#F4ECDA", letterSpacing: -0.2, marginTop: 1,
              }}>{h.label}</div>
              <div style={{
                fontFamily: "var(--f-display)", fontSize: 32, fontWeight: 700,
                color: h.hot ? "var(--clay-soft)" : "#F4ECDA",
                letterSpacing: -1.2, marginTop: 8, fontVariantNumeric: "tabular-nums", lineHeight: 1,
              }}>{h.avg}</div>
              <div style={{
                fontFamily: "var(--f-display)", fontSize: 10, color: "rgba(244,236,218,0.5)",
                letterSpacing: 0.5, marginTop: 2,
              }}>{h.n} 打席</div>

              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4,
                marginTop: 10, paddingTop: 8,
                borderTop: "1px solid rgba(244,236,218,0.15)",
              }}>
                {[["OBP",h.obp],["SLG",h.slg],["OPS",h.ops]].map(([l,v],ix) => (
                  <div key={ix}>
                    <div style={{
                      fontFamily: "var(--f-display)", fontSize: 8, letterSpacing: 1,
                      color: "rgba(244,236,218,0.5)", fontWeight: 600,
                    }}>{l}</div>
                    <div style={{
                      fontFamily: "var(--f-display)", fontSize: 12, fontWeight: 700,
                      color: "#F4ECDA", fontVariantNumeric: "tabular-nums", marginTop: 1,
                    }}>{v}</div>
                  </div>
                ))}
              </div>

              <div style={{
                position: "absolute", left: 12, bottom: 8,
                fontFamily: "var(--f-display)", fontSize: 8, fontWeight: 700,
                letterSpacing: 1, color: h.hot ? "var(--clay-soft)" : "rgba(244,236,218,0.45)",
              }}>{h.flag.toUpperCase()} · {h.flag}</div>
            </div>
          );
        })}
      </div>
    </SR_Card>
  );
}

/* ── 4 · COUNT GRID ────────────────────────── */
/* 12 cells: balls 0..3 × strikes 0..2 */
const COUNT_DATA = {
  "0-0": { avg:".288", n:35, heat:0.45 },
  "0-1": { avg:".220", n:24, heat:0.26 },
  "0-2": { avg:".118", n:18, heat:0.08 },
  "1-0": { avg:".381", n:21, heat:0.70 },
  "1-1": { avg:".275", n:20, heat:0.40 },
  "1-2": { avg:".158", n:19, heat:0.18 },
  "2-0": { avg:".429", n:14, heat:0.82 },
  "2-1": { avg:".333", n:15, heat:0.58 },
  "2-2": { avg:".200", n:15, heat:0.24 },
  "3-0": { avg:"—",    n:8,  heat:0,    pass: true },
  "3-1": { avg:".444", n:9,  heat:0.88 },
  "3-2": { avg:".261", n:23, heat:0.38 },
};

function CountGrid() {
  return (
    <SR_Card>
      <SR_SectionTitle
        kicker="04 · vs BALL-STRIKE COUNT"
        title="不同球數打擊率"
        hint="221 球 · B–S"
      />
      <div style={{ display: "grid", gridTemplateColumns: "22px 1fr", gap: 4, alignItems: "stretch" }}>
        {/* left axis labels */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", paddingTop: 16 }}>
          {["0", "1", "2", "3"].map(b => (
            <div key={b} style={{
              fontFamily: "var(--f-display)", fontSize: 12, fontWeight: 700,
              color: "rgba(244,236,218,0.55)", textAlign: "center",
            }}>{b}</div>
          ))}
        </div>
        {/* grid */}
        <div>
          {/* column headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3, marginBottom: 3 }}>
            {["0", "1", "2"].map(s => (
              <div key={s} style={{
                fontFamily: "var(--f-display)", fontSize: 11, fontWeight: 700,
                color: "rgba(244,236,218,0.55)", textAlign: "center", padding: "2px 0",
              }}>{s}</div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}>
            {[0,1,2,3].flatMap(b => [0,1,2].map(s => {
              const c = COUNT_DATA[`${b}-${s}`];
              const hot = c.heat > 0.5;
              return (
                <div key={`${b}-${s}`} style={{
                  position: "relative",
                  height: 44, borderRadius: 5,
                  background: c.pass
                    ? "repeating-linear-gradient(45deg, rgba(244,236,218,0.06) 0 4px, rgba(244,236,218,0.02) 4px 8px)"
                    : srHeat(c.heat),
                  border: c.pass ? "1px dashed rgba(244,236,218,0.25)" : "0.5px solid rgba(244,236,218,0.18)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
                }}>
                  <div style={{
                    fontFamily: "var(--f-display)", fontSize: 12.5, fontWeight: 700,
                    color: c.pass ? "rgba(244,236,218,0.45)" : (hot ? "#1B2230" : "#F4ECDA"),
                    fontVariantNumeric: "tabular-nums", lineHeight: 1,
                  }}>{c.avg}</div>
                  <div style={{
                    fontFamily: "var(--f-display)", fontSize: 8, fontWeight: 600,
                    color: c.pass ? "rgba(244,236,218,0.45)" : (hot ? "rgba(27,34,48,0.7)" : "rgba(244,236,218,0.55)"),
                    marginTop: 1, letterSpacing: 0.3,
                  }}>{c.pass ? "送出" : `${c.n}球`}</div>
                  {/* tiny count label top-left */}
                  <div style={{
                    position: "absolute", top: 2, left: 4,
                    fontFamily: "var(--f-display)", fontSize: 8, fontWeight: 600,
                    color: c.pass ? "rgba(244,236,218,0.35)" : (hot ? "rgba(27,34,48,0.5)" : "rgba(244,236,218,0.4)"),
                    letterSpacing: 0.3,
                  }}>{b}-{s}</div>
                </div>
              );
            }))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <span style={{ fontFamily: "var(--f-display)", fontSize: 9, color: "rgba(244,236,218,0.5)", letterSpacing: 0.8 }}>
              ← 球數 · BALLS / STRIKES →
            </span>
            <span style={{ fontFamily: "var(--f-display)", fontSize: 9, color: "var(--clay-soft)", letterSpacing: 0.8 }}>
              主動出擊  2-0 / 3-1 → .436
            </span>
          </div>
        </div>
      </div>
    </SR_Card>
  );
}

/* ── 5 · SPRAY MAP ─────────────────────────── */
const SPRAY_HITS = [
  // type: 1B/2B/3B/HR/OUT, x,y normalized field
  { x: 0.30, y: 0.42, type: "1B" },
  { x: 0.22, y: 0.30, type: "2B" },
  { x: 0.18, y: 0.20, type: "HR" },
  { x: 0.36, y: 0.48, type: "1B" },
  { x: 0.40, y: 0.34, type: "2B" },
  { x: 0.26, y: 0.26, type: "HR" },
  { x: 0.42, y: 0.22, type: "HR" },
  { x: 0.55, y: 0.40, type: "1B" },
  { x: 0.50, y: 0.50, type: "OUT" },
  { x: 0.60, y: 0.55, type: "OUT" },
  { x: 0.45, y: 0.62, type: "OUT" },
  { x: 0.62, y: 0.30, type: "1B" },
  { x: 0.72, y: 0.42, type: "1B" },
  { x: 0.78, y: 0.36, type: "OUT" },
  { x: 0.34, y: 0.55, type: "OUT" },
  { x: 0.30, y: 0.62, type: "OUT" },
  { x: 0.48, y: 0.36, type: "1B" },
];
const SPRAY_COLORS = {
  "1B": "#F4ECDA",
  "2B": "var(--clay-soft)",
  "3B": "#3E6FA0",
  "HR": "var(--ball)",
  "OUT": "rgba(244,236,218,0.32)",
};

function SprayMap() {
  // counts
  const tally = SPRAY_HITS.reduce((m,h) => (m[h.type] = (m[h.type]||0) + 1, m), {});

  return (
    <SR_Card padding={0}>
      <div style={{ padding: "12px 12px 0" }}>
        <SR_SectionTitle
          kicker="05 · BATTED-BALL SPRAY"
          title="擊球落點圖"
          hint="本季 · 56 顆擊球"
        />
      </div>
      <div style={{
        position: "relative",
        margin: "0 12px 0",
        aspectRatio: "4 / 3",
        background: "linear-gradient(180deg, #4f7d3d 0%, #355E27 100%)",
        borderRadius: 10, overflow: "hidden",
        border: "1px solid rgba(244,236,218,0.1)",
      }}>
        <svg viewBox="0 0 100 75" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {/* outfield arc */}
          <path d="M 8 60 A 50 50 0 0 1 92 60" fill="rgba(0,0,0,0.06)" stroke="#F4ECDA" strokeOpacity="0.45" strokeWidth="0.5"/>
          {/* outfield warning track */}
          <path d="M 8 60 A 50 50 0 0 1 92 60 L 88 60 A 46 46 0 0 0 12 60 Z" fill="rgba(185,119,68,0.35)"/>
          {/* foul lines */}
          <line x1="50" y1="68" x2="8"  y2="26" stroke="#F4ECDA" strokeOpacity="0.65" strokeWidth="0.5"/>
          <line x1="50" y1="68" x2="92" y2="26" stroke="#F4ECDA" strokeOpacity="0.65" strokeWidth="0.5"/>
          {/* infield diamond */}
          <path d="M 50 56 L 70 64 L 50 72 L 30 64 Z" fill="rgba(185,119,68,0.55)"/>
          {/* infield grass */}
          <path d="M 50 60 L 64 66 L 50 70 L 36 66 Z" fill="#4D7B3A"/>
          {/* bases */}
          {[[50,56],[70,64],[50,72],[30,64]].map(([x,y],i) => (
            <rect key={i} x={x-1.2} y={y-1.2} width="2.4" height="2.4" fill="#F4ECDA" transform={`rotate(45 ${x} ${y})`}/>
          ))}
          {/* pitcher mound */}
          <circle cx="50" cy="60" r="1.6" fill="#B97744" stroke="#F4ECDA" strokeOpacity="0.4" strokeWidth="0.2"/>
          {/* batter mark at home */}
          <circle cx="50" cy="71.5" r="1.4" fill="#1B2230"/>

          {/* range arcs — pull % marker for RHB */}
          <path d="M 50 68 L 80 28" stroke="#F4ECDA" strokeOpacity="0.16" strokeWidth="0.4" strokeDasharray="1 1"/>
          <path d="M 50 68 L 20 28" stroke="#F4ECDA" strokeOpacity="0.16" strokeWidth="0.4" strokeDasharray="1 1"/>

          {/* hits */}
          {SPRAY_HITS.map((h, i) => {
            const cx = h.x * 100;
            const cy = h.y * 75;
            const isHR = h.type === "HR";
            const isOut = h.type === "OUT";
            return (
              <g key={i}>
                <circle cx={cx} cy={cy}
                  r={isHR ? 2.2 : isOut ? 1.5 : 1.8}
                  fill={SPRAY_COLORS[h.type]}
                  stroke={isOut ? "#F4ECDA" : "#1B2230"}
                  strokeWidth={isHR ? 0.6 : 0.4}
                  strokeOpacity={isOut ? 0.45 : 1}
                />
                {isHR && (
                  <circle cx={cx} cy={cy} r="3.6" fill="none"
                    stroke="var(--ball)" strokeWidth="0.4" strokeOpacity="0.45"/>
                )}
              </g>
            );
          })}

          {/* zone labels */}
          <text x="20" y="36" fontFamily="Oswald" fontSize="3" fill="#F4ECDA" fillOpacity="0.55" letterSpacing="0.4">LF</text>
          <text x="48" y="22" fontFamily="Oswald" fontSize="3" fill="#F4ECDA" fillOpacity="0.55" letterSpacing="0.4">CF</text>
          <text x="76" y="36" fontFamily="Oswald" fontSize="3" fill="#F4ECDA" fillOpacity="0.55" letterSpacing="0.4">RF</text>
        </svg>
        {/* corner labels */}
        <div style={{
          position: "absolute", top: 8, left: 10,
          fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 1.2,
          color: "rgba(244,236,218,0.75)", fontWeight: 700,
        }}>SPRAY · 落點</div>
        <div style={{
          position: "absolute", top: 8, right: 10,
          fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 0.6,
          color: "rgba(244,236,218,0.55)",
        }}>RHB · 拉打 64%</div>
      </div>

      {/* legend + tally */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
        padding: "10px 12px 12px", gap: 4,
      }}>
        {[
          { code:"1B", label:"一安" },
          { code:"2B", label:"二安" },
          { code:"HR", label:"全壘打" },
          { code:"OUT",label:"出局" },
          { code:"TOT",label:"總計" },
        ].map(s => {
          const isTotal = s.code === "TOT";
          const n = isTotal ? SPRAY_HITS.length : (tally[s.code] || 0);
          return (
            <div key={s.code} style={{ textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 3 }}>
                {!isTotal && (
                  <span style={{
                    width: 12, height: 12, borderRadius: 6,
                    background: SPRAY_COLORS[s.code],
                    border: s.code === "OUT" ? "0.5px solid #F4ECDA" : "0.5px solid #1B2230",
                    display: "inline-block",
                  }}/>
                )}
                {isTotal && <span style={{ fontSize: 10, color: "rgba(244,236,218,0.5)" }}>Σ</span>}
              </div>
              <div style={{
                fontFamily: "var(--f-display)", fontSize: 14, fontWeight: 700,
                color: s.code === "HR" ? "var(--ball)" : "#F4ECDA",
                fontVariantNumeric: "tabular-nums",
              }}>{n}</div>
              <div style={{
                fontFamily: "var(--f-display)", fontSize: 8, letterSpacing: 0.8,
                color: "rgba(244,236,218,0.5)", fontWeight: 600,
              }}>{s.label}</div>
            </div>
          );
        })}
      </div>
    </SR_Card>
  );
}

/* ── 6 · AI ANALYSIS ───────────────────────── */
const AI_DATA = {
  generatedAt: "2026/05/14 18:42",
  model: "ScoutBook AI · v2.4",
  confidence: 0.84,
  basis: { pitches: 221, pa: 176, games: 28 },
  summary: "拉打型強打者，對左投火燙、對好球帶內角極具威脅；但對外角低位變化球的判斷仍是明顯弱點，可作為被攻擊重點。",
  strengths: [
    { tag: "對左投", title: "對 LHP 火燙",
      detail: "AVG .381 / OPS 1.029 — 全聯盟前 8%。建議避免左投在關鍵局面對決。" },
    { tag: "球種偏好", title: "變速與速球皆能掌握",
      detail: "速球 .356、變速 .429。中央偏內速球進入 5 號區域時打擊率達 .471。" },
    { tag: "球數", title: "投手球數 (2-0 / 3-1) 把握度高",
      detail: "投打數順位下 AVG .436，對失投球幾乎不放過。" },
  ],
  weaknesses: [
    { tag: "外角低位", title: "對 7 / 9 號區極弱",
      detail: "AVG .100 與 .167，揮空率 38%。外角下沉球與滑球可有效誘騙。" },
    { tag: "變化球", title: "曲球辨識不佳",
      detail: "CB AVG .143、揮空率 41%。連續曲球後再投速球可能形成節奏陷阱。" },
    { tag: "兩好球後", title: "0-2 / 1-2 收尾差",
      detail: "0-2 AVG 僅 .118；可在兩好球後直接 chase 外角滑球或高位 4 縫線。" },
  ],
  plan: [
    "首球：滑球外角低位 (Cell 9) 取得好球",
    "1-1 之後：曲球誘揮，避免內角速球",
    "兩好球後：高位四縫線 + 外角下沉滑球收尾",
  ],
};

function AIBadge() {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "3px 8px", borderRadius: 99,
      background: "linear-gradient(90deg, rgba(199,145,42,0.35) 0%, rgba(194,76,47,0.35) 100%)",
      border: "1px solid rgba(199,145,42,0.5)",
      fontFamily: "var(--f-display)", fontSize: 9, fontWeight: 700, letterSpacing: 1.2,
      color: "#F4ECDA",
    }}>
      <svg viewBox="0 0 10 10" width="9" height="9">
        <path d="M 5 0 L 6 4 L 10 5 L 6 6 L 5 10 L 4 6 L 0 5 L 4 4 Z" fill="#F4ECDA"/>
      </svg>
      AI
    </span>
  );
}

function PointBlock({ pos, items }) {
  /* pos: 'strength' | 'weakness' */
  const isStrength = pos === "strength";
  const accent = isStrength ? "var(--strike)" : "var(--ball)";
  return (
    <div style={{
      background: isStrength
        ? "linear-gradient(180deg, rgba(47,125,79,0.14) 0%, rgba(47,125,79,0.04) 100%)"
        : "linear-gradient(180deg, rgba(194,76,47,0.16) 0%, rgba(194,76,47,0.04) 100%)",
      border: `1px solid ${isStrength ? "rgba(47,125,79,0.32)" : "rgba(194,76,47,0.32)"}`,
      borderRadius: 10, padding: "10px 12px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <div style={{
          width: 22, height: 22, borderRadius: 11,
          background: accent, color: "#FBF7EE",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700,
        }}>{isStrength ? "↑" : "↓"}</div>
        <div style={{
          fontFamily: "var(--f-display)", fontSize: 11, fontWeight: 700,
          color: accent, letterSpacing: 1,
        }}>{isStrength ? "STRENGTHS · 優點" : "WEAKNESSES · 弱點"}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {items.map((it, i) => (
          <div key={i} style={{
            paddingLeft: 8,
            borderLeft: `2px solid ${accent}`,
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 2 }}>
              <span style={{
                fontFamily: "var(--f-display)", fontSize: 9, fontWeight: 700,
                padding: "1px 5px", borderRadius: 3, letterSpacing: 0.5,
                background: "rgba(244,236,218,0.10)", color: "rgba(244,236,218,0.7)",
              }}>{it.tag}</span>
              <span style={{
                fontSize: 12, fontWeight: 700, color: "#F4ECDA", letterSpacing: -0.2,
              }}>{it.title}</span>
            </div>
            <div style={{
              fontSize: 10.5, color: "rgba(244,236,218,0.7)", lineHeight: 1.55,
            }}>{it.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIAnalysis() {
  const a = AI_DATA;
  return (
    <SR_Card>
      {/* title row with AI badge */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 1.5,
              color: "var(--clay-soft)", fontWeight: 700,
            }}>06 · AI ANALYSIS</div>
            <AIBadge/>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#F4ECDA", letterSpacing: -0.2, marginTop: 2 }}>
            AI 球員優缺點分析
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "var(--f-display)", fontSize: 9, color: "rgba(244,236,218,0.5)", letterSpacing: 0.5 }}>
            CONF.
          </div>
          <div style={{
            fontFamily: "var(--f-display)", fontSize: 14, fontWeight: 700,
            color: "var(--clay-soft)", fontVariantNumeric: "tabular-nums",
          }}>{Math.round(a.confidence * 100)}<span style={{ fontSize: 10, color: "rgba(244,236,218,0.5)" }}>%</span></div>
        </div>
      </div>

      {/* one-line summary */}
      <div style={{
        position: "relative",
        padding: "10px 12px 10px 14px",
        background: "rgba(244,236,218,0.06)",
        border: "1px solid rgba(244,236,218,0.10)",
        borderRadius: 10,
        marginBottom: 10,
      }}>
        <div style={{
          position: "absolute", left: 0, top: 8, bottom: 8, width: 3,
          background: "linear-gradient(180deg, var(--clay-soft) 0%, var(--ball) 100%)",
          borderRadius: 2,
        }}/>
        <div style={{
          fontFamily: "var(--f-display)", fontSize: 9, fontWeight: 600, letterSpacing: 1.2,
          color: "rgba(244,236,218,0.5)", marginBottom: 3,
        }}>SUMMARY · 一句話總評</div>
        <div style={{
          fontSize: 12.5, color: "#F4ECDA", lineHeight: 1.55, letterSpacing: -0.1,
        }}>{a.summary}</div>
      </div>

      {/* strengths + weaknesses stacked */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <PointBlock pos="strength" items={a.strengths}/>
        <PointBlock pos="weakness" items={a.weaknesses}/>
      </div>

      {/* game plan */}
      <div style={{
        marginTop: 10,
        padding: "10px 12px",
        background: "linear-gradient(180deg, rgba(27,34,48,0.65) 0%, rgba(27,34,48,0.3) 100%)",
        border: "1px solid rgba(244,236,218,0.12)",
        borderRadius: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <svg viewBox="0 0 14 14" width="13" height="13">
            <path d="M 7 1 L 7 13 M 1 7 L 13 7" stroke="var(--clay-soft)" strokeWidth="1.6" strokeLinecap="round"/>
            <circle cx="7" cy="7" r="2" fill="var(--ball)" stroke="#FBF7EE" strokeWidth="0.6"/>
          </svg>
          <div style={{
            fontFamily: "var(--f-display)", fontSize: 10, fontWeight: 700,
            letterSpacing: 1, color: "var(--clay-soft)",
          }}>GAME PLAN · 投球建議</div>
        </div>
        <ol style={{
          margin: 0, padding: "0 0 0 4px", listStyle: "none",
          display: "flex", flexDirection: "column", gap: 5,
        }}>
          {a.plan.map((p, i) => (
            <li key={i} style={{
              display: "flex", gap: 8, alignItems: "flex-start",
              fontSize: 11.5, color: "rgba(244,236,218,0.88)", lineHeight: 1.5,
            }}>
              <span style={{
                flexShrink: 0,
                width: 18, height: 18, borderRadius: 4,
                background: "rgba(244,236,218,0.08)", color: "var(--clay-soft)",
                fontFamily: "var(--f-display)", fontSize: 11, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{i + 1}</span>
              <span>{p}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* footer — meta + regenerate */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginTop: 10, paddingTop: 8,
        borderTop: "1px dashed rgba(244,236,218,0.12)",
      }}>
        <div style={{
          fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 0.5,
          color: "rgba(244,236,218,0.45)", lineHeight: 1.45,
        }}>
          <div>{a.model}</div>
          <div>基於 {a.basis.pitches} 球 · {a.basis.pa} 打席 · {a.basis.games} 場</div>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 5,
          padding: "5px 10px", borderRadius: 99,
          background: "rgba(244,236,218,0.08)",
          border: "1px solid rgba(244,236,218,0.18)",
          fontSize: 11, color: "#F4ECDA", fontWeight: 600,
        }}>
          <svg viewBox="0 0 12 12" width="10" height="10">
            <path d="M 2 6 A 4 4 0 1 1 4 9.5" fill="none" stroke="#F4ECDA" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M 1.5 8.5 L 2 5.5 L 5 6" fill="none" stroke="#F4ECDA" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round"/>
          </svg>
          重新生成
        </div>
      </div>
    </SR_Card>
  );
}

Object.assign(window, {
  ZoneGrid, PitchTypeChart, VsHandChart, CountGrid, SprayMap, AIAnalysis,
});

/* ────────────────────────────────────────────────
   PlayerHeatZone — shown when tapping a batter row
   on the StatsSummary screen.

   • Player header (uniform num, name, hand, position)
   • Today's line + season stats
   • 3×3 strike-zone HEAT MAP coloured by AVG per cell
   • Spray chart on a mini field
   • Plate-appearance log
──────────────────────────────────────────────── */

const HEAT_DATA = {
  // 1..9 = strike zone cells, each with hit-rate intensity 0..1 + count
  player: {
    num: "31", pos: "1B", name: "王俊偉", hand: "L",
    todayLine: "2-3 · 2 安打 · 2 打點 · 1 BB",
    season:    ".342 / .951 OPS · 季中 18 場",
  },
  zones: {
    1: { avg: ".143", n: 7, heat: 0.18 },
    2: { avg: ".286", n: 7, heat: 0.42 },
    3: { avg: ".250", n: 8, heat: 0.36 },
    4: { avg: ".385", n: 13,heat: 0.62 },
    5: { avg: ".471", n: 17,heat: 0.95 }, // hot
    6: { avg: ".333", n: 12,heat: 0.55 },
    7: { avg: ".100", n: 10,heat: 0.12 },
    8: { avg: ".222", n: 9, heat: 0.30 },
    9: { avg: ".167", n: 6, heat: 0.20 },
  },
  hits: [
    // x,y normalized inside the field svg viewBox (0..1)
    { x: 0.36, y: 0.40, type: "hit",   pa: 1, desc: "中外野安打" },
    { x: 0.62, y: 0.52, type: "hit",   pa: 3, desc: "右外野安打" },
    { x: 0.50, y: 0.62, type: "out",   pa: 2, desc: "二壘滾地出局" },
  ],
  pas: [
    { pa: 1, inning: "1上",  result: "一安",  pitches: "2-1 FB",  loc: 5 },
    { pa: 2, inning: "3上",  result: "出局",  pitches: "0-2 SL",  loc: 8 },
    { pa: 3, inning: "5上",  result: "一安",  pitches: "1-1 SI",  loc: 4 },
    { pa: 4, inning: "7上",  result: "保送",  pitches: "3-1 CB",  loc: "BB" },
  ],
};

function PlayerHeatZone() {
  const p = HEAT_DATA.player;

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#0F141C",
      display: "flex", flexDirection: "column",
      fontFamily: "var(--f-body)", color: "#F4ECDA",
      overflow: "hidden",
    }}>
      <div style={{ height: 54 }}/>

      {/* top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "6px 14px 10px",
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(244,236,218,0.7)" }}>← 統計</div>
        <div style={{
          fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 2,
          color: "var(--clay-soft)", fontWeight: 600,
        }}>BATTER · 打者熱區</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--clay-soft)" }}>分享</div>
      </div>

      {/* player header card */}
      <div style={{
        margin: "0 14px 10px", padding: "14px",
        background: "linear-gradient(180deg, #1B2230 0%, #0F141C 100%)",
        borderRadius: 14, border: "1px solid rgba(244,236,218,0.08)",
        display: "flex", alignItems: "center", gap: 12,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", right: -10, top: -16,
          fontFamily: "var(--f-display)", fontSize: 110, fontWeight: 700,
          color: "rgba(244,236,218,0.05)", lineHeight: 1, letterSpacing: -4,
        }}>{p.num}</div>
        <div style={{
          width: 56, height: 56, borderRadius: 28,
          background: "var(--clay-deep)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--f-display)", fontSize: 22, fontWeight: 700,
          border: "1.5px solid rgba(244,236,218,0.25)",
          position: "relative", zIndex: 1,
        }}>{p.num}</div>
        <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.3 }}>{p.name}</span>
            <span style={{
              fontFamily: "var(--f-display)", fontSize: 10, fontWeight: 700,
              padding: "2px 6px", borderRadius: 3,
              background: "rgba(77,123,58,0.35)", color: "#FBF7EE",
            }}>{p.pos}</span>
            <span style={{
              fontFamily: "var(--f-display)", fontSize: 10, fontWeight: 700,
              padding: "2px 6px", borderRadius: 3,
              background: "rgba(47,125,79,0.25)", color: "var(--strike)",
            }}>{p.hand}打</span>
          </div>
          <div style={{ fontSize: 12, color: "rgba(244,236,218,0.85)", marginTop: 4 }}>
            今日 {p.todayLine}
          </div>
          <div style={{ fontSize: 10, color: "rgba(244,236,218,0.5)", marginTop: 1, letterSpacing: 0.3 }}>
            賽季 {p.season}
          </div>
        </div>
      </div>

      {/* segmented tab */}
      <div style={{
        display: "flex", padding: "0 14px 10px",
        gap: 6,
      }}>
        {["熱區圖", "落點圖", "球種", "打席"].map((t, i) => {
          const active = i === 0;
          return (
            <div key={t} style={{
              padding: "5px 12px", borderRadius: 99,
              background: active ? "var(--clay-soft)" : "transparent",
              border: active ? "none" : "1px solid rgba(244,236,218,0.18)",
              color: active ? "var(--ink)" : "rgba(244,236,218,0.7)",
              fontFamily: "var(--f-display)", fontSize: 11, fontWeight: 700,
              letterSpacing: 0.5,
            }}>{t}</div>
          );
        })}
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "0 14px 30px" }}>
        {/* heat zone */}
        <div style={{
          background: "rgba(244,236,218,0.04)",
          border: "1px solid rgba(244,236,218,0.08)",
          borderRadius: 14,
          padding: 14,
          display: "grid",
          gridTemplateColumns: "1fr 130px",
          gap: 14,
        }}>
          <HeatGrid zones={HEAT_DATA.zones} hand={p.hand}/>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div>
              <div style={{
                fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 1.5,
                color: "rgba(244,236,218,0.5)", fontWeight: 600,
              }}>HOT ZONE · 熱區</div>
              <div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>
                中間紅中最強
              </div>
            </div>
            {/* legend */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10 }}>
                <Swatch heat={0.1}/><span style={{ color: "rgba(244,236,218,0.7)" }}>冷  &lt;.200</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10 }}>
                <Swatch heat={0.45}/><span style={{ color: "rgba(244,236,218,0.7)" }}>溫  .200-.300</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10 }}>
                <Swatch heat={0.78}/><span style={{ color: "rgba(244,236,218,0.7)" }}>熱  .300-.400</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10 }}>
                <Swatch heat={1.0}/><span style={{ color: "rgba(244,236,218,0.7)" }}>燒  &gt;.400</span>
              </div>
            </div>
            <div style={{
              borderTop: "1px solid rgba(244,236,218,0.1)",
              paddingTop: 6, marginTop: "auto",
              fontSize: 10, color: "rgba(244,236,218,0.5)", letterSpacing: 0.3,
            }}>
              基於 89 球 · 投手視角
            </div>
          </div>
        </div>

        {/* spray chart + key stats */}
        <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "150px 1fr", gap: 10 }}>
          <SprayChart hits={HEAT_DATA.hits}/>
          <div style={{
            background: "rgba(244,236,218,0.04)",
            border: "1px solid rgba(244,236,218,0.08)",
            borderRadius: 12,
            padding: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6,
          }}>
            {[
              { l: "AVG",  v: ".342", a: true },
              { l: "OPS",  v: ".951", a: true },
              { l: "Hard%",v: "48%" },
              { l: "BB/K", v: "1.2"  },
              { l: "Pitch",v: "89"   },
              { l: "Pull%",v: "62%"  },
            ].map((s, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 1.2,
                  color: "rgba(244,236,218,0.5)", fontWeight: 600,
                }}>{s.l}</div>
                <div style={{
                  fontFamily: "var(--f-display)", fontSize: 16, fontWeight: 700,
                  color: s.a ? "var(--clay-soft)" : "#F4ECDA",
                  fontVariantNumeric: "tabular-nums", marginTop: 1,
                }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PA log */}
        <div style={{ marginTop: 10 }}>
          <div style={{
            fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 1.5,
            color: "rgba(244,236,218,0.5)", fontWeight: 600, marginBottom: 6,
          }}>今日打席 · PLATE APPEARANCES</div>
          <div style={{
            background: "rgba(244,236,218,0.04)",
            border: "1px solid rgba(244,236,218,0.08)",
            borderRadius: 12, overflow: "hidden",
          }}>
            {HEAT_DATA.pas.map((pa, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "30px 44px 1fr 60px",
                padding: "8px 12px", gap: 8, alignItems: "center",
                borderBottom: i < HEAT_DATA.pas.length-1 ? "1px solid rgba(244,236,218,0.06)" : "none",
                fontSize: 12,
              }}>
                <div style={{ fontFamily: "var(--f-display)", fontSize: 13, fontWeight: 700, color: "var(--clay-soft)" }}>{pa.pa}</div>
                <div style={{ fontFamily: "var(--f-display)", fontSize: 11, fontWeight: 600, color: "rgba(244,236,218,0.6)", letterSpacing: 0.5 }}>{pa.inning}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <PAResult r={pa.result}/>
                  <span style={{ fontSize: 10, color: "rgba(244,236,218,0.5)", fontFamily: "var(--f-display)", letterSpacing: 0.5 }}>{pa.pitches}</span>
                </div>
                <div style={{ textAlign: "right", fontFamily: "var(--f-display)", fontSize: 10, color: "rgba(244,236,218,0.5)" }}>
                  CELL {pa.loc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 3×3 heat-coloured grid using zone data ──── */
function HeatGrid({ zones, hand }) {
  // Catcher view; for L batter the batter side is shown on right of zone.
  return (
    <div style={{
      position: "relative",
      aspectRatio: "1 / 1",
      borderRadius: 8,
      overflow: "hidden",
      background: "#1B2230",
      border: "1.5px solid rgba(244,236,218,0.7)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "1fr 1fr 1fr",
    }}>
      {Array.from({ length: 9 }).map((_, i) => {
        const z = zones[i+1] || {};
        return (
          <div key={i} style={{
            position: "relative",
            background: heatColor(z.heat || 0),
            border: "0.5px solid rgba(244,236,218,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column",
          }}>
            <div style={{
              fontFamily: "var(--f-display)", fontSize: 16, fontWeight: 700,
              color: z.heat > 0.5 ? "#1B2230" : "#F4ECDA",
              lineHeight: 1, fontVariantNumeric: "tabular-nums",
            }}>{z.avg || "—"}</div>
            <div style={{
              fontFamily: "var(--f-display)", fontSize: 9, fontWeight: 600,
              color: z.heat > 0.5 ? "rgba(27,34,48,0.7)" : "rgba(244,236,218,0.55)",
              marginTop: 2, letterSpacing: 0.5,
            }}>{z.n || 0} 球</div>
          </div>
        );
      })}
      {/* plate hint at bottom */}
      <div style={{
        position: "absolute", left: "50%", bottom: "-12%",
        transform: "translate(-50%, 0)",
        pointerEvents: "none",
      }}>
        <svg viewBox="0 0 60 14" width="40" height="9">
          <path d="M 4 2 L 56 2 L 50 12 L 10 12 Z" fill="rgba(244,236,218,0.4)"/>
        </svg>
      </div>
    </div>
  );
}

function Swatch({ heat }) {
  return (
    <span style={{
      display: "inline-block",
      width: 18, height: 12, borderRadius: 3,
      background: heatColor(heat),
      border: "0.5px solid rgba(244,236,218,0.25)",
    }}/>
  );
}

/* heat color: cold (slate) → warm (gold) → hot (clay) → blazing (red) */
function heatColor(t) {
  // 4-stop interpolation; t in 0..1
  const stops = [
    [0,    [70, 90, 110]],     // cold slate
    [0.35, [199, 145, 42]],    // gold
    [0.7,  [194, 76, 47]],     // clay-red
    [1,    [240, 60, 30]],     // hot red
  ];
  let i = 0;
  while (i < stops.length - 1 && t > stops[i+1][0]) i++;
  const [t1, c1] = stops[i];
  const [t2, c2] = stops[Math.min(i+1, stops.length-1)];
  const k = t2 === t1 ? 0 : (t - t1) / (t2 - t1);
  const rgb = c1.map((c, j) => Math.round(c + (c2[j] - c) * k));
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.85)`;
}

function PAResult({ r }) {
  const colors = {
    "一安":  "var(--strike)",
    "二安":  "var(--strike)",
    "出局":  "rgba(244,236,218,0.4)",
    "保送":  "var(--clay-soft)",
    "三振":  "var(--ball)",
  };
  return (
    <span style={{
      fontFamily: "var(--f-body)", fontSize: 12, fontWeight: 700,
      color: colors[r] || "#F4ECDA",
    }}>{r}</span>
  );
}

/* ── small spray chart ──── */
function SprayChart({ hits }) {
  return (
    <div style={{
      position: "relative",
      aspectRatio: "1 / 0.9",
      background: "linear-gradient(180deg, #5b8e44 0%, #4D7B3A 100%)",
      borderRadius: 10, overflow: "hidden",
      border: "1px solid rgba(244,236,218,0.1)",
    }}>
      <svg viewBox="0 0 100 90" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {/* outfield arc */}
        <path d="M 12 50 A 38 38 0 0 1 88 50" fill="none" stroke="#F4ECDA" strokeWidth="0.6"/>
        {/* foul lines */}
        <line x1="50" y1="74" x2="14" y2="38" stroke="#F4ECDA" strokeWidth="0.4"/>
        <line x1="50" y1="74" x2="86" y2="38" stroke="#F4ECDA" strokeWidth="0.4"/>
        {/* infield */}
        <path d="M 50 58 L 76 68 L 50 80 L 24 68 Z" fill="#B97744"/>
        <path d="M 50 64 L 70 70 L 50 76 L 30 70 Z" fill="#4D7B3A"/>
        {/* hits */}
        {hits.map((h, i) => (
          <g key={i}>
            <circle
              cx={h.x * 100} cy={h.y * 90}
              r="3"
              fill={h.type === "hit" ? "#F4ECDA" : "#1B2230"}
              stroke={h.type === "hit" ? "#1B2230" : "#F4ECDA"}
              strokeWidth="0.8"
            />
            <text x={h.x * 100} y={h.y * 90 + 1.2} textAnchor="middle"
                  fontSize="3" fontFamily="Oswald" fontWeight="700"
                  fill={h.type === "hit" ? "#1B2230" : "#F4ECDA"}>{h.pa}</text>
          </g>
        ))}
      </svg>
      <div style={{
        position: "absolute", top: 5, left: 7,
        fontFamily: "var(--f-display)", fontSize: 8, fontWeight: 600,
        letterSpacing: 1, color: "rgba(244,236,218,0.85)",
      }}>SPRAY</div>
    </div>
  );
}

Object.assign(window, { PlayerHeatZone, HEAT_DATA });

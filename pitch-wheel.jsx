/* ────────────────────────────────────────────────
   PitchWheel — radial 7-slice pitch-type selector.
   Triggered by long-pressing a cell in the strike zone.

   Order (clockwise from top):
     ① 快速球  FB   Fastball
     ② 變速球  CH   Changeup
     ③ 伸卡    SI   Sinker
     ④ 指叉    SF   Splitter
     ⑤ 曲球    CB   Curveball
     ⑥ 滑球    SL   Slider
     ⑦ 其他    ??   Other         ← 雜項：卡特、噴射、不明球種
──────────────────────────────────────────────── */

const PITCHES = [
  { ko: "快速球", abbr: "FB", en: "Fastball",  color: "#C24C2F", speed: "145+" },
  { ko: "變速球", abbr: "CH", en: "Changeup",  color: "#C7912A", speed: "125-135" },
  { ko: "伸卡",   abbr: "SI", en: "Sinker",    color: "#8E5832", speed: "140-145" },
  { ko: "指叉",   abbr: "SF", en: "Splitter",  color: "#1B2230", speed: "130-140" },
  { ko: "曲球",   abbr: "CB", en: "Curveball", color: "#2F7D4F", speed: "115-125" },
  { ko: "滑球",   abbr: "SL", en: "Slider",    color: "#475569", speed: "130-140" },
  { ko: "其他",   abbr: "??", en: "Other",     color: "#7A6E5C", speed: "未分類" },
];

function PitchWheel({ activeCell = 5, hoveredIndex = 0 }) {
  const R = 100;    // outer radius
  const Ri = 30;    // inner radius (donut hole)
  const Rlbl = (R + Ri) / 2 + 5;  // label radius

  // helper to convert polar (deg from +x axis, CW since SVG y is down) to (x,y)
  const p2c = (angleDeg, radius) => {
    const a = angleDeg * Math.PI / 180;
    return [Math.cos(a) * radius, Math.sin(a) * radius];
  };

  const SLICE = 360 / PITCHES.length;     // 7 slices ≈ 51.43°
  const HALF  = SLICE / 2;

  const slicePath = (centerDeg) => {
    const a1 = centerDeg - HALF;
    const a2 = centerDeg + HALF;
    const [x1, y1] = p2c(a1, Ri);
    const [x2, y2] = p2c(a1, R);
    const [x3, y3] = p2c(a2, R);
    const [x4, y4] = p2c(a2, Ri);
    return `M ${x1} ${y1}
            L ${x2} ${y2}
            A ${R} ${R} 0 0 1 ${x3} ${y3}
            L ${x4} ${y4}
            A ${Ri} ${Ri} 0 0 0 ${x1} ${y1}
            Z`;
  };

  // angles: slice i is centered at -90 + i*SLICE (deg). -90 = top, going CW.
  const centers = PITCHES.map((_, i) => -90 + i * SLICE);

  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(27,34,48,0.55)",
      backdropFilter: "blur(2px)",
      WebkitBackdropFilter: "blur(2px)",
      zIndex: 10,
    }}>
      <div style={{
        width: 260,
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 10,
      }}>
        {/* prompt text */}
        <div style={{
          padding: "6px 12px",
          background: "rgba(244,236,218,0.95)",
          borderRadius: 999,
          fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 600,
          color: "var(--ink)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <span style={{
            fontFamily: "var(--f-display)", fontSize: 10, letterSpacing: 1,
            color: "var(--clay-deep)",
          }}>長按位置 ▸ 選擇球種</span>
        </div>

        {/* wheel */}
        <div style={{ position: "relative" }}>
          <svg viewBox="-110 -110 220 220" width="240" height="240">
            <defs>
              <filter id="pwShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="3" stdDeviation="6" floodOpacity="0.35"/>
              </filter>
            </defs>

            {/* ring backdrop */}
            <circle cx="0" cy="0" r={R + 2} fill="#FBF7EE" filter="url(#pwShadow)"/>

            {/* slices */}
            {PITCHES.map((p, i) => {
              const active = i === hoveredIndex;
              const [lx, ly] = p2c(centers[i], Rlbl);
              return (
                <g key={i}>
                  <path
                    d={slicePath(centers[i])}
                    fill={p.color}
                    opacity={active ? 1 : 0.86}
                    stroke="#FBF7EE"
                    strokeWidth="1.5"
                  />
                  {active && (
                    <path
                      d={slicePath(centers[i])}
                      fill="none"
                      stroke="#FBF7EE"
                      strokeWidth="2.5"
                      opacity="0.5"
                    />
                  )}
                  {/* label group — rotate-aware so 7 narrow slices stay legible */}
                  <g transform={`translate(${lx} ${ly})`}>
                    <text
                      x="0" y="-3"
                      textAnchor="middle"
                      fontFamily="Noto Sans TC, sans-serif"
                      fontSize="12"
                      fontWeight="700"
                      fill="#FBF7EE"
                    >{p.ko}</text>
                    <text
                      x="0" y="8"
                      textAnchor="middle"
                      fontFamily="Oswald, sans-serif"
                      fontSize="8.5"
                      fontWeight="600"
                      letterSpacing="1.2"
                      fill="rgba(251,247,238,0.7)"
                    >{p.abbr}</text>
                  </g>
                </g>
              );
            })}

            {/* center hole — shows the pressed cell */}
            <circle cx="0" cy="0" r={Ri - 1} fill="#1B2230" stroke="#FBF7EE" strokeWidth="1.5"/>
            <text x="0" y="-4" textAnchor="middle"
                  fontFamily="Oswald" fontSize="7.5" fontWeight="600"
                  letterSpacing="1.5" fill="rgba(244,236,218,0.55)">CELL</text>
            <text x="0" y="9" textAnchor="middle"
                  fontFamily="Oswald" fontSize="14" fontWeight="700"
                  fill="#F4ECDA">{activeCell}</text>

            {/* clockwise direction arrow hint */}
            <g transform="translate(0 -85)" opacity="0.4">
              <path d="M -7 0 A 10 10 0 0 1 7 0" fill="none" stroke="#FBF7EE" strokeWidth="0.8"/>
              <path d="M 7 0 L 5 -2 M 7 0 L 5 2" stroke="#FBF7EE" strokeWidth="0.8" fill="none"/>
            </g>
          </svg>
        </div>

        {/* readout — pitch + estimated speed */}
        <div style={{
          background: "rgba(27,34,48,0.92)",
          color: "#F4ECDA",
          borderRadius: 12,
          padding: "8px 14px",
          display: "flex", alignItems: "center", gap: 10,
          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
          minWidth: 200, justifyContent: "center",
        }}>
          <div style={{
            width: 10, height: 10, borderRadius: 5,
            background: PITCHES[hoveredIndex].color,
            boxShadow: `0 0 0 2px ${PITCHES[hoveredIndex].color}33`,
          }}/>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 800 }}>{PITCHES[hoveredIndex].ko}</span>
              <span style={{
                fontFamily: "var(--f-display)", fontSize: 10, letterSpacing: 1.5,
                color: "rgba(244,236,218,0.65)",
              }}>{PITCHES[hoveredIndex].en.toUpperCase()}</span>
            </div>
            <div style={{
              fontFamily: "var(--f-display)", fontSize: 10, color: "var(--clay-soft)",
              letterSpacing: 0.5, marginTop: 1,
            }}>{PITCHES[hoveredIndex].abbr === "??"
                  ? "未分類 · 後台手動標註"
                  : `EST. ${PITCHES[hoveredIndex].speed} km/h`}</div>
          </div>
        </div>

        {/* dismiss hint */}
        <div style={{
          fontSize: 10, color: "rgba(244,236,218,0.7)",
          letterSpacing: 0.5, marginTop: 4,
        }}>放開手指確認 · 滑回中央取消</div>
      </div>
    </div>
  );
}

Object.assign(window, { PitchWheel, PITCHES });

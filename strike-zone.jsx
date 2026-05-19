/* ────────────────────────────────────────────────
   StrikeZone — 13-cell pitch location grid.

   New structure (matches the user's sketch):
     • Outer 2×2 grid = 4 large corner BALL zones (full quadrant each)
     • Inner 3×3 strike zone is overlaid in the center, smaller,
       so its corners "bite into" each of the 4 outer quadrants.
     • Strike zone fill = grass green @ 50% opacity.
     • Ball corner fill = soft clay tan (complementary to grass).

   Catcher view → for a LEFT-handed batter the batter stands on
   the RIGHT (col 5 in old grid; right side here).

   Cell IDs:
     1..9  = strike zone (3×3, row-major)
     11    = ball TL,   12 = ball TR,   13 = ball BL,   14 = ball BR
──────────────────────────────────────────────── */

const CELL_POS = {
  // strike — inner 3×3 spans 16%..84% (68% wide), so step is 22.67%
  1:  { x: 27.3, y: 27.3 },  2:  { x: 50,   y: 27.3 },  3:  { x: 72.7, y: 27.3 },
  4:  { x: 27.3, y: 50   },  5:  { x: 50,   y: 50   },  6:  { x: 72.7, y: 50   },
  7:  { x: 27.3, y: 72.7 },  8:  { x: 50,   y: 72.7 },  9:  { x: 72.7, y: 72.7 },
  // ball corners — pushed into the outer corner area, away from strike zone
  11: { x: 9,  y: 9  },  12: { x: 91, y: 9  },
  13: { x: 9,  y: 91 },  14: { x: 91, y: 91 },
};

function StrikeZone({ pitches = [], batterHand = "L", compact = false }) {
  return (
    <div style={{
      position: "relative",
      width: "100%", height: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: compact ? 10 : 14,
      background: "linear-gradient(180deg, #F4ECDA 0%, #EADFC6 100%)",
      borderTop: "1px solid rgba(27,34,48,0.08)",
      borderBottom: "1px solid rgba(27,34,48,0.08)",
      boxSizing: "border-box",
    }}>
      {/* scorebook horizontal rules */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.5,
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent 0 23px, rgba(27,34,48,0.06) 23px 24px)",
        pointerEvents: "none",
      }}/>

      <div style={{
        position: "relative",
        aspectRatio: "1 / 1",
        height: "100%", maxWidth: "100%",
      }}>
        {/* ── OUTER 2×2: four corner BALL zones ── */}
        <div style={{
          position: "absolute", inset: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          border: "1.5px solid rgba(27,34,48,0.55)",
          borderRadius: 4,
          overflow: "hidden",
          background: "#FBF7EE",
        }}>
          {[
            { code: 11, pos: "TL" },
            { code: 12, pos: "TR" },
            { code: 13, pos: "BL" },
            { code: 14, pos: "BR" },
          ].map(c => (
            <BallQuadrant key={c.code} pos={c.pos}/>
          ))}
        </div>

        {/* ── INNER 3×3: strike zone, centered overlay ── */}
        <div style={{
          position: "absolute",
          left: "16%", right: "16%", top: "16%", bottom: "16%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr 1fr",
          background: "rgba(77,123,58,0.5)",       // grass green @ 50%
          border: "1.5px solid #1B2230",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(27,34,48,0.18)",
          zIndex: 1,
        }}>
          {Array.from({length:9}).map((_, i) => (
            <div key={i} style={{
              border: "0.5px solid rgba(27,34,48,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--f-display)", fontSize: compact ? 11 : 13,
              color: "rgba(255,255,255,0.55)", fontWeight: 600,
              userSelect: "none",
            }}>{i+1}</div>
          ))}
        </div>

        {/* batter silhouette outside the strike zone, in the proper corner */}
        <BatterSilhouette hand={batterHand}/>

        {/* home plate hint at the bottom */}
        <PlateHint/>

        {/* pitch dots, absolutely positioned by cell id */}
        {pitches.map((p, i) => (
          <PitchDot key={i} index={i+1} pitch={p}/>
        ))}
      </div>
    </div>
  );
}

/* ── one of the four outer ball quadrants ── */
function BallQuadrant({ pos }) {
  // Each quadrant is half the box. Subtle clay tan, complementary to grass.
  // Diagonal hatching at low alpha keeps it readable as "non-strike".
  return (
    <div style={{
      position: "relative",
      background: "rgba(185,119,68,0.16)",   // soft clay tan
      borderRight:  pos === "TL" || pos === "BL" ? "1px dashed rgba(27,34,48,0.18)" : "none",
      borderBottom: pos === "TL" || pos === "TR" ? "1px dashed rgba(27,34,48,0.18)" : "none",
    }}>
      {/* tiny "B" hint in the far corner, opposite from the strike zone */}
      <div style={{
        position: "absolute",
        top:    pos === "TL" || pos === "TR" ? 5 : "auto",
        bottom: pos === "BL" || pos === "BR" ? 5 : "auto",
        left:   pos === "TL" || pos === "BL" ? 6 : "auto",
        right:  pos === "TR" || pos === "BR" ? 6 : "auto",
        fontFamily: "var(--f-display)", fontSize: 10, fontWeight: 700,
        letterSpacing: 1, color: "rgba(194,76,47,0.5)",
      }}>B</div>
    </div>
  );
}

/* ── plate hint ── */
function PlateHint() {
  return (
    <div style={{
      position: "absolute",
      left: "50%", bottom: "-4%", transform: "translate(-50%, 0)",
      pointerEvents: "none", zIndex: 2,
    }}>
      <svg viewBox="0 0 60 14" width="56" height="13">
        <path d="M 4 2 L 56 2 L 50 12 L 10 12 Z"
              fill="#FBF7EE" stroke="#1B2230" strokeWidth="0.8"/>
      </svg>
    </div>
  );
}

/* ── batter silhouette, on the outside-of-zone side ── */
function BatterSilhouette({ hand }) {
  // L-handed batter → stands on catcher's right (right of container)
  // R-handed batter → stands on catcher's left  (left of container)
  const isLeft = hand === "L";
  return (
    <div style={{
      position: "absolute",
      top: "20%", bottom: "20%",
      [isLeft ? "right" : "left"]: "-2%",
      width: "12%",
      pointerEvents: "none", zIndex: 2,
      opacity: 0.28,
    }}>
      <svg viewBox="0 0 30 80" preserveAspectRatio="xMidYMid meet"
           style={{ width: "100%", height: "100%" }}>
        <g fill="#1B2230" transform={isLeft ? "translate(30 0) scale(-1 1)" : ""}>
          <circle cx="9" cy="10" r="4.5"/>
          <rect x="6.5" y="14" width="5" height="22" rx="1.5"/>
          <rect x="6" y="36" width="2.5" height="22"/>
          <rect x="9.5" y="36" width="2.5" height="22"/>
          <rect x="12" y="6" width="14" height="2.4" rx="1.2" transform="rotate(-30 19 7)"/>
        </g>
      </svg>
    </div>
  );
}

/* ── plotted pitch dot (numbered) ── */
function PitchDot({ index, pitch }) {
  const colors = {
    strike:    "#2F7D4F",
    ball:      "#C24C2F",
    foul:      "#C7912A",
    swingmiss: "#1B2230",
    hit:       "#F4ECDA",
    hbp:       "#C7912A",
  };
  const c = colors[pitch.result] || "#1B2230";
  const textOnDark = ["strike","ball","swingmiss","hbp"].includes(pitch.result);

  const p = CELL_POS[pitch.cell];
  if (!p) return null;

  return (
    <div style={{
      position: "absolute",
      left: `${p.x}%`, top: `${p.y}%`,
      transform: "translate(-50%, -50%)",
      pointerEvents: "none",
      zIndex: 3,
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: 12,
        background: c,
        border: "1.5px solid #FBF7EE",
        boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--f-display)", fontWeight: 600, fontSize: 12,
        color: textOnDark ? "#FBF7EE" : "#1B2230",
      }}>{index}</div>
    </div>
  );
}

Object.assign(window, { StrikeZone });

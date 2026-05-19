/* ────────────────────────────────────────────────
   FieldMap — top 1/3 of the recording screen.
   Catcher view (home plate at the BOTTOM, infield
   diamond pointing up). Foul lines extend out at
   45°, outfield arc closes the fair territory.

   - `hits` is an array of { x, y, type } in 0..1
     normalized coords (0,0 = top-left of the SVG).
   - `selectedHit` index can show a popup menu.
──────────────────────────────────────────────── */

function FieldMap({ hits = [], selectedHit = null, onMenuClose }) {
  // viewBox is 200 wide × 180 tall
  const W = 200, H = 180;

  return (
    <div style={{
      position: "relative",
      width: "100%", height: "100%",
      overflow: "hidden",
      background: "linear-gradient(180deg, #5b8e44 0%, #4D7B3A 100%)",
    }}>
      {/* mowing stripes */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 14px, rgba(0,0,0,0.04) 14px 28px)",
        pointerEvents: "none",
      }} />
      {/* clay grit */}
      <div className="grit" style={{ position: "absolute", inset: 0 }} />

      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet"
           style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="dirt" cx="50%" cy="50%" r="60%">
            <stop offset="0%"  stopColor="#C68852" />
            <stop offset="100%" stopColor="#A4683A" />
          </radialGradient>
          <linearGradient id="warning" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"  stopColor="#C99063" />
            <stop offset="100%" stopColor="#A47147" />
          </linearGradient>
        </defs>

        {/* warning track — outer arc band */}
        <path d={`
          M 20 160
          L 20 100
          A 90 90 0 0 1 180 100
          L 180 160
          Z
        `} fill="url(#warning)" opacity="0.45" />

        {/* outfield wall (arc) */}
        <path d="M 26 100 A 80 80 0 0 1 174 100"
              fill="none" stroke="#F4ECDA" strokeWidth="1.2" opacity="0.85" />

        {/* foul lines (45°) — from home plate up to outfield wall */}
        <line x1="100" y1="148" x2="38"  y2="86" stroke="#F4ECDA" strokeWidth="1.2" />
        <line x1="100" y1="148" x2="162" y2="86" stroke="#F4ECDA" strokeWidth="1.2" />

        {/* infield dirt (skinned diamond) */}
        <path d="M 100 90 L 138 128 L 100 165 L 62 128 Z" fill="url(#dirt)" />

        {/* infield grass cutout */}
        <path d="M 100 102 L 128 128 L 100 155 L 72 128 Z" fill="#4D7B3A" />

        {/* pitcher's mound */}
        <circle cx="100" cy="126" r="6" fill="#B97744" />
        <rect x="98.5" y="125" width="3" height="2" fill="#F4ECDA" />

        {/* bases */}
        {[
          [100, 102], // 2nd
          [128, 128], // 1st (catcher view: 1B on right)
          [100, 155], // home
          [72, 128],  // 3rd
        ].map(([cx, cy], i) => (
          <rect key={i} x={cx-3} y={cy-3} width="6" height="6"
                transform={`rotate(45 ${cx} ${cy})`}
                fill={i === 2 ? "#F4ECDA" : "#FBF7EE"}
                stroke="#1B2230" strokeWidth="0.4" />
        ))}

        {/* batter's box hint */}
        <rect x="90" y="159" width="4.5" height="8" fill="#FBF7EE" opacity="0.7" />
        <rect x="105.5" y="159" width="4.5" height="8" fill="#FBF7EE" opacity="0.7" />

        {/* hit markers */}
        {hits.map((h, i) => (
          <HitMarker key={i} x={h.x * W} y={h.y * H} type={h.type} index={i+1} active={i === selectedHit}/>
        ))}
      </svg>

      {/* long-press popup demo */}
      {selectedHit !== null && hits[selectedHit] && (
        <HitMenu hit={hits[selectedHit]} onClose={onMenuClose}/>
      )}
    </div>
  );
}

function HitMarker({ x, y, type = "hit", index, active }) {
  const colors = {
    hit:    "#F4ECDA",
    out:    "#1B2230",
    hr:     "#C24C2F",
    error:  "#C7912A",
  };
  return (
    <g>
      {active && <circle cx={x} cy={y} r="7" fill="none" stroke="#FBF7EE" strokeWidth="1" opacity="0.9"/>}
      <circle cx={x} cy={y} r="3.4" fill={colors[type] || colors.hit}
              stroke="#1B2230" strokeWidth="0.6" />
      <text x={x} y={y+1.2} textAnchor="middle" fontSize="3"
            fontFamily="Oswald, sans-serif" fontWeight="600"
            fill={type === "out" ? "#FBF7EE" : "#1B2230"}>{index}</text>
    </g>
  );
}

function HitMenu({ hit, onClose }) {
  const opts = [
    { k: "一安",  c: "#F4ECDA" },
    { k: "二安",  c: "#F4ECDA" },
    { k: "三安",  c: "#F4ECDA" },
    { k: "全壘打", c: "#C24C2F" },
    { k: "出局",  c: "#1B2230" },
    { k: "失誤",  c: "#C7912A" },
  ];
  // place menu near the hit point
  const left = hit.x > 0.55 ? "8%" : "auto";
  const right = hit.x > 0.55 ? "auto" : "8%";
  const top = `${Math.min(Math.max(hit.y * 100, 8), 55)}%`;

  return (
    <div style={{
      position: "absolute", left, right, top,
      background: "rgba(27,34,48,0.95)",
      border: "1px solid rgba(244,236,218,0.2)",
      borderRadius: 10,
      padding: 6,
      boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
      backdropFilter: "blur(8px)",
      zIndex: 5,
      minWidth: 96,
    }}>
      <div style={{
        fontFamily: "var(--f-body)", fontSize: 9, color: "#8A8E99",
        padding: "2px 6px 4px", letterSpacing: 0.5,
      }}>選擇結果</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
        {opts.map(o => (
          <button key={o.k} onClick={onClose} style={{
            background: "transparent", border: "none", cursor: "pointer",
            padding: "5px 6px", textAlign: "left",
            color: "#F4ECDA", fontFamily: "var(--f-body)", fontSize: 11,
            borderRadius: 6, display: "flex", alignItems: "center", gap: 5,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: 3, background: o.c,
              border: "0.5px solid rgba(244,236,218,0.4)",
            }}/>{o.k}
          </button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { FieldMap });

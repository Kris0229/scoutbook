/* ────────────────────────────────────────────────
   Scout Report — Shell + Player Header + section bits
   • Reused dark theme to match player-heat.jsx
──────────────────────────────────────────────── */

const SCOUT_PLAYER = {
  num: "08", pos: "RF", name: "周柏勳", hand: "R",
  team: "桃園神盾", teamEn: "AEGIS",
  age: 24, height: 182, weight: 84,
  season: { avg: ".325", obp: ".402", slg: ".493", ops: ".895", hr: 7, sb: 9, gp: 28 },
  tags: ["主砲", "拉打型", "對左投火燙"],
};

function SR_TopBar() {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "6px 14px 8px",
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(244,236,218,0.7)" }}>← 球員</div>
      <div style={{
        fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 2,
        color: "var(--clay-soft)", fontWeight: 600,
      }}>SCOUT REPORT · 球探報告</div>
      <div style={{ display: "flex", gap: 12, fontSize: 16, color: "var(--clay-soft)" }}>
        <span>☆</span><span>⋯</span>
      </div>
    </div>
  );
}

function SR_PlayerHeader({ p }) {
  return (
    <div style={{
      margin: "0 14px 8px", padding: "14px",
      background: "linear-gradient(180deg, #1B2230 0%, #0F141C 100%)",
      borderRadius: 14, border: "1px solid rgba(244,236,218,0.08)",
      position: "relative", overflow: "hidden",
    }}>
      <div className="grit" style={{ position: "absolute", inset: 0, opacity: 0.05 }}/>
      <div style={{
        position: "absolute", right: -10, top: -22,
        fontFamily: "var(--f-display)", fontSize: 130, fontWeight: 700,
        color: "rgba(244,236,218,0.05)", lineHeight: 1, letterSpacing: -5,
      }}>{p.num}</div>
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 60, height: 60, borderRadius: 30,
          background: "var(--ink)", color: "#F4ECDA",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--f-display)", fontSize: 24, fontWeight: 700,
          border: "1.5px solid rgba(244,236,218,0.25)",
        }}>{p.num}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4, color: "#F4ECDA" }}>{p.name}</span>
            <span style={{
              fontFamily: "var(--f-display)", fontSize: 10, fontWeight: 700,
              padding: "2px 6px", borderRadius: 3,
              background: "rgba(77,123,58,0.35)", color: "#FBF7EE",
            }}>{p.pos}</span>
            <span style={{
              fontFamily: "var(--f-display)", fontSize: 10, fontWeight: 700,
              padding: "2px 6px", borderRadius: 3,
              background: "rgba(194,76,47,0.25)", color: "var(--ball)",
            }}>{p.hand}打</span>
          </div>
          <div style={{ fontSize: 12, color: "rgba(244,236,218,0.85)", marginTop: 3 }}>
            {p.team} <span style={{ fontFamily: "var(--f-display)", color: "var(--clay-soft)", fontSize: 10, letterSpacing: 0.8 }}>{p.teamEn}</span>
          </div>
          <div style={{ fontSize: 10, color: "rgba(244,236,218,0.5)", marginTop: 2, letterSpacing: 0.3 }}>
            {p.age} 歲 · {p.height}cm / {p.weight}kg · 出賽 {p.season.gp}
          </div>
        </div>
      </div>
      {/* season strip */}
      <div style={{
        position: "relative",
        display: "flex", marginTop: 12,
        background: "rgba(0,0,0,0.25)", borderRadius: 10, padding: "8px 4px",
      }}>
        {[
          { l: "AVG", v: p.season.avg, hi: true },
          { l: "OBP", v: p.season.obp },
          { l: "SLG", v: p.season.slg },
          { l: "OPS", v: p.season.ops, hi: true },
          { l: "HR",  v: p.season.hr },
          { l: "SB",  v: p.season.sb },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center" }}>
            <div style={{
              fontFamily: "var(--f-display)", fontSize: 14, fontWeight: 700,
              color: s.hi ? "var(--clay-soft)" : "#F4ECDA",
              letterSpacing: -0.3, fontVariantNumeric: "tabular-nums",
            }}>{s.v}</div>
            <div style={{
              fontFamily: "var(--f-display)", fontSize: 8, fontWeight: 600,
              letterSpacing: 1, color: "rgba(244,236,218,0.45)", marginTop: 1,
            }}>{s.l}</div>
          </div>
        ))}
      </div>
      {/* tags */}
      <div style={{ position: "relative", display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
        {p.tags.map((t, i) => (
          <span key={i} style={{
            fontSize: 10, fontWeight: 600, letterSpacing: 0.3,
            padding: "3px 8px", borderRadius: 99,
            background: "rgba(244,236,218,0.08)", color: "rgba(244,236,218,0.85)",
            border: "1px solid rgba(244,236,218,0.12)",
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function SR_SectionTitle({ kicker, title, hint }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
      <div>
        <div style={{
          fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 1.5,
          color: "var(--clay-soft)", fontWeight: 700,
        }}>{kicker}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#F4ECDA", letterSpacing: -0.2, marginTop: 1 }}>{title}</div>
      </div>
      {hint && (
        <div style={{ fontSize: 10, color: "rgba(244,236,218,0.45)", fontFamily: "var(--f-display)", letterSpacing: 0.5 }}>{hint}</div>
      )}
    </div>
  );
}

function SR_Card({ children, padding = 12 }) {
  return (
    <div style={{
      background: "rgba(244,236,218,0.04)",
      border: "1px solid rgba(244,236,218,0.08)",
      borderRadius: 12, padding,
    }}>
      {children}
    </div>
  );
}

/* report-wide section tab strip */
function SR_Tabs({ active = "all" }) {
  const tabs = [
    { id: "all",    label: "全部" },
    { id: "ai",     label: "AI 分析" },
    { id: "zone",   label: "九宮格" },
    { id: "pitch",  label: "球種" },
    { id: "hand",   label: "左右投" },
    { id: "count",  label: "球數" },
    { id: "spray",  label: "落點" },
  ];
  return (
    <div style={{
      display: "flex", gap: 6, padding: "0 14px 10px",
      overflowX: "auto",
    }}>
      {tabs.map(t => {
        const on = t.id === active;
        return (
          <div key={t.id} style={{
            padding: "5px 12px", borderRadius: 99, whiteSpace: "nowrap",
            background: on ? "var(--clay-soft)" : "transparent",
            border: on ? "none" : "1px solid rgba(244,236,218,0.18)",
            color: on ? "var(--ink)" : "rgba(244,236,218,0.7)",
            fontFamily: "var(--f-body)", fontSize: 11, fontWeight: on ? 700 : 600,
          }}>{t.label}</div>
        );
      })}
    </div>
  );
}

Object.assign(window, {
  SCOUT_PLAYER, SR_TopBar, SR_PlayerHeader, SR_SectionTitle, SR_Card, SR_Tabs,
});

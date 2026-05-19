/* ────────────────────────────────────────────────
   StatsScreen — game-summary tables shown after
   the user picks "比賽結束" from the ⋯ game menu.

   • Two team tabs (我方 / 對方)
   • Batter stat table — AB R H RBI BB K AVG OPS
   • Tap a player row → PlayerHeatZone (next file)
──────────────────────────────────────────────── */

const TEAM_STATS = {
  falcons: {
    name: "新北獵鷹",
    en:   "FALCONS",
    side: "客",
    runs: 4,
    hits: 9,
    err:  1,
    batters: [
      { num:"07", pos:"CF", name:"陳冠霖", hand:"L", ab:4, r:1, h:2, rbi:1, bb:0, k:0, avg:".316", ops:".812" },
      { num:"22", pos:"SS", name:"林昱辰", hand:"R", ab:4, r:0, h:1, rbi:0, bb:0, k:1, avg:".275", ops:".702" },
      { num:"31", pos:"1B", name:"王俊偉", hand:"L", ab:3, r:1, h:2, rbi:2, bb:1, k:0, avg:".342", ops:".951" },
      { num:"09", pos:"C",  name:"黃柏翰", hand:"R", ab:3, r:0, h:0, rbi:0, bb:1, k:1, avg:".248", ops:".618" },
      { num:"44", pos:"LF", name:"張子豪", hand:"S", ab:4, r:1, h:1, rbi:1, bb:0, k:0, avg:".288", ops:".741" },
      { num:"16", pos:"3B", name:"吳承軒", hand:"R", ab:4, r:0, h:1, rbi:0, bb:0, k:2, avg:".251", ops:".629" },
      { num:"55", pos:"RF", name:"李冠霆", hand:"L", ab:3, r:1, h:1, rbi:0, bb:1, k:0, avg:".301", ops:".779" },
      { num:"13", pos:"2B", name:"蔡明杰", hand:"R", ab:3, r:0, h:0, rbi:0, bb:0, k:1, avg:".232", ops:".562" },
      { num:"02", pos:"DH", name:"高承翰", hand:"S", ab:3, r:0, h:1, rbi:0, bb:0, k:1, avg:".267", ops:".688" },
    ],
  },
  aegis: {
    name: "桃園神盾",
    en:   "AEGIS",
    side: "主",
    runs: 2,
    hits: 6,
    err:  0,
    batters: [
      { num:"12", pos:"2B", name:"邱柏翰", hand:"R", ab:4, r:1, h:1, rbi:0, bb:0, k:1, avg:".284", ops:".720" },
      { num:"01", pos:"CF", name:"林冠廷", hand:"L", ab:4, r:0, h:1, rbi:0, bb:0, k:0, avg:".302", ops:".781" },
      { num:"08", pos:"RF", name:"周柏勳", hand:"R", ab:3, r:1, h:2, rbi:1, bb:1, k:0, avg:".325", ops:".895" },
    ],
  },
};

function StatsSummary({ activeTab = 0, selectedRow = 2 }) {
  const teamKey = activeTab === 0 ? "falcons" : "aegis";
  const team = TEAM_STATS[teamKey];
  const oppKey = activeTab === 0 ? "aegis" : "falcons";
  const opp = TEAM_STATS[oppKey];

  // totals
  const sum = (k) => team.batters.reduce((s, b) => s + b[k], 0);
  const totals = {
    ab: sum("ab"), r: sum("r"), h: sum("h"),
    rbi: sum("rbi"), bb: sum("bb"), k: sum("k"),
  };

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#0F141C",
      display: "flex", flexDirection: "column",
      fontFamily: "var(--f-body)", color: "#F4ECDA",
    }}>
      {/* status bar spacer */}
      <div style={{ height: 54 }}/>

      {/* compact top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "6px 14px 10px",
      }}>
        <div style={{
          fontSize: 13, fontWeight: 600, color: "rgba(244,236,218,0.6)",
        }}>← 返回</div>
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 2,
            color: "var(--clay-soft)", fontWeight: 600,
          }}>FINAL · 比賽結束</div>
        </div>
        <div style={{
          fontFamily: "var(--f-body)", fontSize: 13, fontWeight: 700,
          color: "var(--clay-soft)",
        }}>分享</div>
      </div>

      {/* scoreboard banner */}
      <div style={{
        margin: "0 14px 12px", padding: "12px 14px",
        background: "linear-gradient(180deg, #1B2230 0%, #0F141C 100%)",
        borderRadius: 14,
        border: "1px solid rgba(244,236,218,0.08)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", left: -6, top: -10,
          fontFamily: "var(--f-display)", fontSize: 110, fontWeight: 700,
          color: "rgba(244,236,218,0.04)", lineHeight: 1, letterSpacing: -4,
        }}>WIN</div>
        <div style={{ flex: 1, position: "relative" }}>
          <div style={{ fontSize: 9, color: "rgba(244,236,218,0.55)", letterSpacing: 1.5, fontWeight: 600 }}>
            AWAY · 客
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, marginTop: 2, letterSpacing: -0.3 }}>
            {TEAM_STATS.falcons.name}
          </div>
          <div style={{ fontFamily: "var(--f-display)", fontSize: 38, fontWeight: 700, color: "#F4ECDA", lineHeight: 1, marginTop: 4 }}>
            {TEAM_STATS.falcons.runs}
          </div>
        </div>
        <div style={{
          padding: "4px 10px", borderRadius: 999,
          background: "rgba(47,125,79,0.25)", color: "var(--strike)",
          fontFamily: "var(--f-display)", fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
          alignSelf: "flex-start", marginTop: 4,
        }}>FINAL</div>
        <div style={{ flex: 1, textAlign: "right", position: "relative" }}>
          <div style={{ fontSize: 9, color: "rgba(244,236,218,0.55)", letterSpacing: 1.5, fontWeight: 600 }}>
            HOME · 主
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, marginTop: 2, color: "rgba(244,236,218,0.7)", letterSpacing: -0.3 }}>
            {TEAM_STATS.aegis.name}
          </div>
          <div style={{ fontFamily: "var(--f-display)", fontSize: 38, fontWeight: 600, color: "rgba(244,236,218,0.5)", lineHeight: 1, marginTop: 4 }}>
            {TEAM_STATS.aegis.runs}
          </div>
        </div>
      </div>

      {/* team tabs — Giants/Dodgers style */}
      <div style={{
        display: "flex", gap: 24, padding: "0 18px",
        borderBottom: "1px solid rgba(244,236,218,0.1)",
      }}>
        {[
          { label: TEAM_STATS.falcons.name, en: "FALCONS" },
          { label: TEAM_STATS.aegis.name,   en: "AEGIS" },
        ].map((t, i) => {
          const active = i === activeTab;
          return (
            <div key={i} style={{
              padding: "10px 0",
              borderBottom: active ? "2px solid var(--clay-soft)" : "2px solid transparent",
              marginBottom: -1,
            }}>
              <div style={{
                fontSize: 17, fontWeight: 800, letterSpacing: -0.3,
                color: active ? "#F4ECDA" : "rgba(244,236,218,0.4)",
              }}>{t.label}</div>
            </div>
          );
        })}
      </div>

      {/* table */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {/* column header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 0.55fr 0.45fr 0.45fr 0.65fr 0.5fr 0.45fr 0.7fr 0.75fr",
          padding: "10px 14px 6px",
          fontFamily: "var(--f-display)", fontSize: 11, fontWeight: 700,
          letterSpacing: 0.8, color: "rgba(244,236,218,0.55)",
        }}>
          <div>打者 · {team.en.slice(0,3)}</div>
          <div style={{ textAlign: "center" }}>AB</div>
          <div style={{ textAlign: "center" }}>R</div>
          <div style={{ textAlign: "center" }}>H</div>
          <div style={{ textAlign: "center" }}>RBI</div>
          <div style={{ textAlign: "center" }}>BB</div>
          <div style={{ textAlign: "center" }}>K</div>
          <div style={{ textAlign: "right" }}>AVG</div>
          <div style={{ textAlign: "right" }}>OPS</div>
        </div>

        {/* rows */}
        {team.batters.map((b, i) => {
          const sel = i === selectedRow;
          return (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 0.55fr 0.45fr 0.45fr 0.65fr 0.5fr 0.45fr 0.7fr 0.75fr",
              padding: "11px 14px",
              alignItems: "center",
              fontSize: 13,
              background: sel ? "rgba(244,236,218,0.06)" : "transparent",
              borderLeft: sel ? "2px solid var(--clay-soft)" : "2px solid transparent",
              cursor: "pointer",
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontWeight: 700, color: sel ? "#F4ECDA" : "rgba(244,236,218,0.92)" }}>{b.name}</span>
                <span style={{
                  fontFamily: "var(--f-display)", fontSize: 9, fontWeight: 600,
                  color: "rgba(244,236,218,0.5)", letterSpacing: 0.8,
                }}>{b.pos}</span>
              </div>
              <StatCell n={b.ab}/>
              <StatCell n={b.r}/>
              <StatCell n={b.h} hi={b.h > 0}/>
              <StatCell n={b.rbi} hi={b.rbi > 0}/>
              <StatCell n={b.bb} hi={b.bb > 0} color="var(--strike)"/>
              <StatCell n={b.k}  hi={b.k > 0}  color="var(--ball)"/>
              <div style={{
                textAlign: "right", fontFamily: "var(--f-display)",
                fontSize: 13, fontWeight: 600,
                color: "rgba(244,236,218,0.95)", fontVariantNumeric: "tabular-nums",
              }}>{b.avg}</div>
              <div style={{
                textAlign: "right", fontFamily: "var(--f-display)",
                fontSize: 13, fontWeight: 700,
                color: parseFloat(b.ops) >= .800 ? "var(--clay-soft)" : "rgba(244,236,218,0.95)",
                fontVariantNumeric: "tabular-nums",
              }}>{b.ops}</div>
            </div>
          );
        })}

        {/* totals row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 0.55fr 0.45fr 0.45fr 0.65fr 0.5fr 0.45fr 0.7fr 0.75fr",
          padding: "12px 14px",
          alignItems: "center",
          marginTop: 4,
          borderTop: "1px solid rgba(244,236,218,0.15)",
          fontFamily: "var(--f-body)",
          fontSize: 13, fontWeight: 800, color: "#F4ECDA",
        }}>
          <div>Totals</div>
          {[totals.ab, totals.r, totals.h, totals.rbi, totals.bb, totals.k].map((n, i) => (
            <div key={i} style={{ textAlign: "center", fontFamily: "var(--f-display)", fontVariantNumeric: "tabular-nums" }}>{n}</div>
          ))}
          <div style={{ textAlign: "right", fontFamily: "var(--f-display)", color: "rgba(244,236,218,0.55)" }}>—</div>
          <div style={{ textAlign: "right", fontFamily: "var(--f-display)", color: "rgba(244,236,218,0.55)" }}>—</div>
        </div>

        {/* hint */}
        <div style={{
          padding: "12px 14px 20px",
          fontSize: 10, color: "rgba(244,236,218,0.4)", letterSpacing: 0.5,
          textAlign: "center",
        }}>
          點任一打者列查看打擊熱區圖 · TAP A BATTER FOR HEAT MAP
        </div>
      </div>
    </div>
  );
}

function StatCell({ n, hi = false, color }) {
  return (
    <div style={{
      textAlign: "center",
      fontFamily: "var(--f-display)", fontSize: 13, fontWeight: hi ? 700 : 500,
      color: hi ? (color || "#F4ECDA") : "rgba(244,236,218,0.55)",
      fontVariantNumeric: "tabular-nums",
    }}>{n}</div>
  );
}

Object.assign(window, { StatsSummary, TEAM_STATS });

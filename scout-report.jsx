/* ────────────────────────────────────────────────
   Scout Report — top-level component
   AI 分析預設置頂，其他類別在後。
   `scroll` 值可選擇捲動到某一段：
     top  → AI（預設第一段）
     zone / pitch / hand / count / spray → 各分析區
──────────────────────────────────────────────── */

function ScoutReport({ scroll = "top", tab = "ai" }) {
  /* AI is the lead section now — top is AI; others come after */
  const offsets = {
    top:   0,        // AI Analysis
    ai:    0,
    zone:  470,
    pitch: 830,
    hand:  1190,
    count: 1480,
    spray: 1800,
  };
  const off = offsets[scroll] || 0;

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#0F141C",
      display: "flex", flexDirection: "column",
      fontFamily: "var(--f-body)", color: "#F4ECDA",
      overflow: "hidden",
    }}>
      <div style={{ height: 54 }}/>
      <SR_TopBar/>
      <SR_PlayerHeader p={SCOUT_PLAYER}/>
      <SR_Tabs active={tab}/>

      <div style={{ flex: 1, overflow: "hidden", padding: "0 14px 0" }}>
        <div style={{
          transform: `translateY(${-off}px)`,
          transition: "transform 0.2s ease",
          display: "flex", flexDirection: "column", gap: 12,
        }}>
          {/* AI lead */}
          <AIAnalysis/>

          {/* divider with section break */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 4px 2px",
          }}>
            <div style={{ flex: 1, height: 1, background: "rgba(244,236,218,0.12)" }}/>
            <div style={{
              fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 2,
              color: "rgba(244,236,218,0.5)", fontWeight: 700,
            }}>DETAILED BREAKDOWN · 詳細數據</div>
            <div style={{ flex: 1, height: 1, background: "rgba(244,236,218,0.12)" }}/>
          </div>

          <ZoneGrid/>
          <PitchTypeChart/>
          <VsHandChart/>
          <CountGrid/>
          <SprayMap/>

          {/* footer */}
          <div style={{
            padding: "16px 4px 30px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            borderTop: "1px solid rgba(244,236,218,0.08)",
            marginTop: 6,
          }}>
            <div>
              <div style={{
                fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 1.2,
                color: "rgba(244,236,218,0.4)",
              }}>LAST UPDATED</div>
              <div style={{ fontSize: 11, color: "rgba(244,236,218,0.7)" }}>
                2026/05/14 18:42 · 自動同步
              </div>
            </div>
            <div style={{
              fontFamily: "var(--f-display)", fontSize: 10, fontWeight: 700,
              padding: "5px 10px", borderRadius: 6,
              background: "var(--clay-deep)", color: "#FBF7EE", letterSpacing: 0.8,
            }}>輸出 PDF</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScoutReport });

/* ────────────────────────────────────────────────
   Dashboard — 登入後的主管理介面
   • 三大入口：新增比賽 / 球探報告 / 球員資料庫
   • 最近比賽
   • 季度概覽
──────────────────────────────────────────────── */

function DashTopBar({ user = { name: "李柏宇", role: "總教練 · 新北獵鷹", letter: "李" } }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "6px 16px 14px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <BaseballMark size={22}/>
        <div>
          <div style={{ fontFamily: "var(--f-display)", fontSize: 14, fontWeight: 700, letterSpacing: 2, color: "var(--ink)" }}>SCOUTBOOK</div>
          <div style={{ fontSize: 9, color: "var(--ink-mute)", letterSpacing: 1, marginTop: -2 }}>HOME · 主控台</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 16,
          border: "1px solid rgba(27,34,48,0.12)",
          background: "var(--chalk)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--f-display)", fontSize: 13, color: "var(--ink-soft)",
        }}>🔔</div>
        <div style={{
          width: 34, height: 34, borderRadius: 17,
          background: "var(--grass-deep)", color: "#FBF7EE",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 14,
          border: "2px solid var(--chalk)",
          boxShadow: "var(--shadow-sm)",
        }}>{user.letter}</div>
      </div>
    </div>
  );
}

function DashTile({ accent, icon, kicker, title, subtitle, count, primary }) {
  return (
    <div style={{
      position: "relative", overflow: "hidden",
      background: primary ? "var(--ink)" : "var(--chalk)",
      color: primary ? "#F4ECDA" : "var(--ink)",
      borderRadius: 16,
      border: primary ? "none" : "1px solid rgba(27,34,48,0.08)",
      padding: 16, minHeight: 92,
      boxShadow: primary ? "var(--shadow-md)" : "var(--shadow-sm)",
      display: "flex", alignItems: "stretch", gap: 14,
    }}>
      {/* big number watermark when primary */}
      {primary && (
        <div style={{
          position: "absolute", right: -10, top: -22,
          fontFamily: "var(--f-display)", fontSize: 110, fontWeight: 700,
          color: "rgba(244,236,218,0.06)", lineHeight: 1, letterSpacing: -4,
        }}>NEW</div>
      )}
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: primary ? "rgba(244,236,218,0.1)" : accent,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, position: "relative", zIndex: 1,
      }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0, position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{
          fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 2, fontWeight: 600,
          color: primary ? "var(--clay-soft)" : "var(--ink-mute)",
        }}>{kicker}</div>
        <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: -0.2, marginTop: 2 }}>{title}</div>
        <div style={{ fontSize: 11, color: primary ? "rgba(244,236,218,0.7)" : "var(--ink-soft)", marginTop: 2 }}>{subtitle}</div>
      </div>
      {count != null && (
        <div style={{
          alignSelf: "center", position: "relative", zIndex: 1,
          fontFamily: "var(--f-display)", fontSize: 28, fontWeight: 700,
          color: primary ? "#F4ECDA" : "var(--clay-deep)",
          fontVariantNumeric: "tabular-nums",
        }}>{count}</div>
      )}
    </div>
  );
}

/* ─── Glyphs for tiles ─────────────────────── */
const IconNewGame = ({ dark }) => (
  <svg viewBox="0 0 28 28" width="26" height="26">
    <circle cx="14" cy="14" r="11" fill={dark ? "#F4ECDA" : "#FBF7EE"} stroke={dark ? "#F4ECDA" : "#1B2230"} strokeWidth="0.8"/>
    <path d="M 6 8 Q 11 14 6 20" fill="none" stroke="#C24C2F" strokeWidth="0.9"/>
    <path d="M 22 8 Q 17 14 22 20" fill="none" stroke="#C24C2F" strokeWidth="0.9"/>
    <circle cx="14" cy="14" r="6" fill={dark ? "rgba(27,34,48,0.9)" : "var(--clay)"}/>
    <path d="M 14 11.5 L 14 16.5 M 11.5 14 L 16.5 14" stroke={dark ? "#F4ECDA" : "#FBF7EE"} strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const IconReports = () => (
  <svg viewBox="0 0 28 28" width="26" height="26">
    <rect x="5" y="4" width="18" height="22" rx="2" fill="#FBF7EE" stroke="#1B2230" strokeWidth="0.7"/>
    <rect x="9" y="3" width="10" height="3" rx="0.5" fill="#1B2230"/>
    {/* mini heat zone */}
    <g transform="translate(8 11)">
      {[[0,0,"#4D7B3A"],[1,0,"#C7912A"],[2,0,"#7AA15F"],
        [0,1,"#7AA15F"],[1,1,"#C24C2F"],[2,1,"#C7912A"],
        [0,2,"#9DB5A0"],[1,2,"#7AA15F"],[2,2,"#9DB5A0"]].map(([x,y,c],i) => (
        <rect key={i} x={x*4} y={y*4} width="3.4" height="3.4" rx="0.4" fill={c}/>
      ))}
    </g>
    <line x1="8" y1="24" x2="20" y2="24" stroke="#1B2230" strokeOpacity="0.4" strokeWidth="0.6"/>
  </svg>
);

const IconPlayers = () => (
  <svg viewBox="0 0 28 28" width="26" height="26">
    {/* helmet 1 */}
    <circle cx="10" cy="12" r="4" fill="#1B2230"/>
    <rect x="6" y="11" width="8" height="2.4" fill="#1B2230"/>
    <rect x="6" y="11.4" width="3.6" height="2" fill="#C24C2F"/>
    {/* helmet 2 */}
    <circle cx="18" cy="14" r="4.4" fill="#4D7B3A"/>
    <rect x="13.5" y="13" width="9" height="2.6" fill="#4D7B3A"/>
    <rect x="13.5" y="13.4" width="4" height="2.2" fill="#FBF7EE"/>
    {/* bat */}
    <rect x="3" y="22" width="20" height="2" rx="1" fill="#B97744" transform="rotate(-18 13 23)"/>
    <circle cx="22" cy="20" r="1" fill="#1B2230"/>
  </svg>
);

/* ─── Recent game row ─────────────────────────── */
function RecentGameRow({ date, weekday, us, ko, our, their, result, status = "FINAL" }) {
  const win = result === "W";
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "44px 1fr 70px 38px",
      alignItems: "center", gap: 10,
      padding: "11px 12px",
      borderBottom: "1px solid rgba(27,34,48,0.06)",
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          fontFamily: "var(--f-display)", fontSize: 18, fontWeight: 700,
          color: "var(--ink)", lineHeight: 1,
        }}>{date}</div>
        <div style={{ fontSize: 9, color: "var(--ink-mute)", letterSpacing: 0.5 }}>{weekday}</div>
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", letterSpacing: -0.2 }}>
          {us} <span style={{ color: "var(--ink-mute)", fontWeight: 500 }}>vs</span> {ko}
        </div>
        <div style={{
          fontFamily: "var(--f-display)", fontSize: 9, color: "var(--ink-mute)",
          letterSpacing: 1, marginTop: 1,
        }}>{status}</div>
      </div>
      <div style={{
        fontFamily: "var(--f-display)", fontSize: 16, fontWeight: 700,
        textAlign: "right", color: "var(--ink)",
        fontVariantNumeric: "tabular-nums", letterSpacing: -0.5,
      }}>{our}<span style={{ color: "var(--ink-mute)", margin: "0 4px", fontWeight: 500 }}>–</span>{their}</div>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: 26, height: 26, borderRadius: 13,
          background: win ? "rgba(47,125,79,0.15)" : "rgba(194,76,47,0.12)",
          color: win ? "var(--strike)" : "var(--ball)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--f-display)", fontSize: 12, fontWeight: 700,
          margin: "0 auto",
        }}>{result}</div>
      </div>
    </div>
  );
}

/* ─── Stat strip on the season banner ─── */
function SeasonStat({ label, value, accent }) {
  return (
    <div style={{ flex: 1, textAlign: "center" }}>
      <div style={{
        fontFamily: "var(--f-display)", fontSize: 22, fontWeight: 700,
        color: accent ? "var(--clay-soft)" : "#F4ECDA", letterSpacing: -0.5,
        fontVariantNumeric: "tabular-nums",
      }}>{value}</div>
      <div style={{
        fontFamily: "var(--f-display)", fontSize: 9, fontWeight: 600,
        letterSpacing: 1.5, color: "rgba(244,236,218,0.55)", marginTop: 1,
      }}>{label}</div>
    </div>
  );
}

function Dashboard() {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "var(--paper)",
      display: "flex", flexDirection: "column",
      fontFamily: "var(--f-body)", color: "var(--ink)",
    }}>
      <div style={{ height: 54 }}/>
      <DashTopBar/>

      <div style={{ flex: 1, overflow: "auto", padding: "0 16px 30px" }}>
        {/* greeting */}
        <div style={{ padding: "0 4px 16px" }}>
          <div style={{
            fontFamily: "var(--f-display)", fontSize: 10, fontWeight: 600, letterSpacing: 2,
            color: "var(--clay)",
          }}>WELCOME BACK</div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4, marginTop: 4 }}>
            李教練，今天<span style={{ color: "var(--clay-deep)" }}>賽前準備</span>了嗎？
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4 }}>
            下一場 · <strong>5 / 17（六）18:30 vs 桃園神盾</strong>
          </div>
        </div>

        {/* season banner */}
        <div style={{
          position: "relative", overflow: "hidden",
          background: "linear-gradient(180deg, #1B2230 0%, #0F141C 100%)",
          borderRadius: 14, padding: "14px 16px",
          color: "#F4ECDA",
          boxShadow: "var(--shadow-md)",
          marginBottom: 16,
        }}>
          <div className="grit" style={{ position: "absolute", inset: 0, opacity: 0.08 }}/>
          <div style={{
            position: "absolute", right: -8, top: -18,
            fontFamily: "var(--f-display)", fontSize: 90, fontWeight: 700,
            color: "rgba(244,236,218,0.05)", lineHeight: 1, letterSpacing: -3,
          }}>26</div>
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <div style={{ fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 2, color: "var(--clay-soft)" }}>SEASON 2026 · 春季聯賽</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>新北獵鷹 <span style={{ color: "var(--clay-soft)", fontFamily: "var(--f-display)" }}>FALCONS</span></div>
            </div>
            <div style={{
              fontFamily: "var(--f-display)", fontSize: 10, color: "var(--clay-soft)",
              letterSpacing: 1.2, fontWeight: 600,
            }}>第 8 週</div>
          </div>
          <div style={{ display: "flex", marginTop: 12, position: "relative" }}>
            <SeasonStat label="W–L" value="9–3" accent/>
            <div style={{ width: 1, background: "rgba(244,236,218,0.12)" }}/>
            <SeasonStat label="TEAM AVG" value=".286"/>
            <div style={{ width: 1, background: "rgba(244,236,218,0.12)" }}/>
            <SeasonStat label="ERA" value="3.42"/>
            <div style={{ width: 1, background: "rgba(244,236,218,0.12)" }}/>
            <SeasonStat label="名次" value="2nd"/>
          </div>
        </div>

        {/* three big entry tiles */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <DashTile
            primary
            icon={<IconNewGame dark/>}
            kicker="01 · NEW GAME"
            title="新增比賽"
            subtitle="開賽前設定打序、投手與場地"
          />
          <DashTile
            accent="rgba(47,125,79,0.16)"
            icon={<IconReports/>}
            kicker="02 · SCOUT REPORTS"
            title="球探報告"
            subtitle="查看已記錄比賽與球員打擊熱區"
            count={42}
          />
          <DashTile
            accent="rgba(185,119,68,0.18)"
            icon={<IconPlayers/>}
            kicker="03 · PLAYER DATABASE"
            title="球員資料庫"
            subtitle="按隊伍查找 · 頂部可直接搜尋姓名"
            count={208}
          />
        </div>

        {/* recent games */}
        <div style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "0 4px 8px" }}>
            <div style={{
              fontFamily: "var(--f-display)", fontSize: 10, fontWeight: 700, letterSpacing: 2,
              color: "var(--ink-soft)",
            }}>RECENT GAMES · 最近比賽</div>
            <div style={{ fontSize: 11, color: "var(--clay-deep)", fontWeight: 600 }}>全部 →</div>
          </div>
          <div style={{
            background: "var(--chalk)", borderRadius: 12,
            border: "1px solid rgba(27,34,48,0.08)",
            overflow: "hidden",
          }}>
            <RecentGameRow date="5/10" weekday="週六" us="新北獵鷹" ko="台中野獸" our={6} their={3} result="W"/>
            <RecentGameRow date="5/03" weekday="週六" us="新北獵鷹" ko="高雄海象" our={2} their={5} result="L"/>
            <RecentGameRow date="4/27" weekday="週日" us="新北獵鷹" ko="新竹快線" our={8} their={1} result="W"/>
            <RecentGameRow date="4/20" weekday="週日" us="新北獵鷹" ko="台南火鳥" our={4} their={4} result="T" status="FINAL · 延長"/>
          </div>
        </div>

        {/* footer hint */}
        <div style={{
          marginTop: 18, padding: "10px 12px",
          background: "rgba(185,119,68,0.08)",
          border: "1px dashed rgba(185,119,68,0.3)",
          borderRadius: 10,
          fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.5,
        }}>
          💡 <strong style={{ color: "var(--clay-deep)" }}>賽前小提醒</strong> · 對手桃園神盾今日先發 #18 陳柏宇對左打 OPS 僅 .612，可考慮排出左打優先打序。
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Dashboard });

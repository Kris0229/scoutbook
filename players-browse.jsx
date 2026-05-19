/* ────────────────────────────────────────────────
   PlayerBrowse — 球員資料庫
   • 頂部姓名搜尋欄
   • 隊伍 chips
   • 隊伍分組列出球員 → 點擊進入球探報告
   States:
     - default  : 全部隊伍展開
     - search   : 已輸入「陳」的搜尋結果
     - team     : 只顯示某一隊
──────────────────────────────────────────────── */

const TEAMS_ROSTER = [
  {
    id: "aegis", name: "桃園神盾", en: "AEGIS",
    color: "var(--ink)", accent: "rgba(255,255,255,0.6)",
    div: "南區 · 甲組",  rank: "1st",
    players: [
      { num: "18", pos: "P",  name: "陳柏宇", hand: "R", avg: ".000", role: "先發投手", note: "右投上勾 · ERA 2.34", flag: "hot" },
      { num: "08", pos: "RF", name: "周柏勳", hand: "R", avg: ".325", ops: ".895", role: "主砲" },
      { num: "12", pos: "2B", name: "邱柏翰", hand: "R", avg: ".284", ops: ".720" },
      { num: "01", pos: "CF", name: "林冠廷", hand: "L", avg: ".302", ops: ".781", role: "速度型" },
      { num: "25", pos: "SS", name: "陳俊偉", hand: "R", avg: ".268", ops: ".695" },
      { num: "33", pos: "1B", name: "黃國豪", hand: "L", avg: ".291", ops: ".812" },
    ],
  },
  {
    id: "beasts", name: "台中野獸", en: "BEASTS",
    color: "var(--grass-deep)", accent: "var(--grass-soft)",
    div: "中區 · 甲組", rank: "3rd",
    players: [
      { num: "07", pos: "LF", name: "陳奕安", hand: "L", avg: ".311", ops: ".845", role: "開路先鋒" },
      { num: "21", pos: "C",  name: "蘇柏宇", hand: "R", avg: ".272", ops: ".688" },
      { num: "11", pos: "P",  name: "張育成", hand: "L", avg: ".000", role: "先發投手", note: "左投 · ERA 3.12" },
      { num: "44", pos: "3B", name: "陳偉殷", hand: "R", avg: ".299", ops: ".801", flag: "hot" },
    ],
  },
  {
    id: "marlins", name: "高雄海象", en: "WALRUS",
    color: "#2A6FA8", accent: "#7FB6E5",
    div: "南區 · 甲組", rank: "2nd",
    players: [
      { num: "03", pos: "SS", name: "陳威廷", hand: "S", avg: ".305", ops: ".830", role: "全能游擊" },
      { num: "15", pos: "CF", name: "林大鈞", hand: "R", avg: ".265", ops: ".670" },
      { num: "29", pos: "P",  name: "黃柏融", hand: "R", avg: ".000", role: "終結者", note: "右投 · 12 S" },
    ],
  },
];

/* ── small bits ─────────────────────────────── */
function SearchField({ value = "", placeholder = "搜尋球員姓名 · 隊伍 · 背號…", focused = false }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      background: "var(--chalk)",
      border: focused ? "1.5px solid var(--clay-deep)" : "1px solid rgba(27,34,48,0.12)",
      borderRadius: 12, padding: "0 12px", height: 42,
      boxShadow: focused ? "0 0 0 4px rgba(185,119,68,0.10)" : "inset 0 1px 0 rgba(255,255,255,0.7)",
    }}>
      <svg viewBox="0 0 16 16" width="16" height="16" style={{ flexShrink: 0 }}>
        <circle cx="7" cy="7" r="4.5" fill="none" stroke="var(--ink-soft)" strokeWidth="1.4"/>
        <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="var(--ink-soft)" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
      <div style={{
        flex: 1, fontSize: 14, fontFamily: "var(--f-body)",
        color: value ? "var(--ink)" : "var(--ink-mute)",
        fontWeight: value ? 600 : 400,
      }}>{value || placeholder}</div>
      {value && (
        <div style={{
          width: 18, height: 18, borderRadius: 9,
          background: "rgba(27,34,48,0.12)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--ink-soft)", fontSize: 12,
        }}>×</div>
      )}
      {focused && (
        <div style={{
          width: 1, height: 18, background: "var(--clay-deep)",
          animation: "blink 1s step-end infinite",
        }}/>
      )}
    </div>
  );
}

function TeamChip({ label, en, active }) {
  return (
    <div style={{
      padding: "5px 11px", borderRadius: 99,
      background: active ? "var(--ink)" : "var(--chalk)",
      color: active ? "#F4ECDA" : "var(--ink-soft)",
      border: active ? "none" : "1px solid rgba(27,34,48,0.12)",
      display: "flex", alignItems: "center", gap: 5,
      whiteSpace: "nowrap", flexShrink: 0,
    }}>
      <span style={{ fontSize: 12, fontWeight: 700 }}>{label}</span>
      {en && <span style={{
        fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 0.8,
        color: active ? "var(--clay-soft)" : "var(--ink-mute)",
      }}>{en}</span>}
    </div>
  );
}

function TeamHeader({ team, count }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "12px 4px 8px",
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 6,
        background: team.color, color: team.accent,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--f-display)", fontSize: 12, fontWeight: 700, letterSpacing: 0.5,
        boxShadow: "var(--shadow-sm)",
      }}>{team.en.slice(0, 2)}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: -0.2 }}>{team.name}</span>
          <span style={{
            fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 1, color: "var(--ink-mute)",
          }}>{team.en}</span>
        </div>
        <div style={{ fontSize: 10, color: "var(--ink-mute)", marginTop: 1 }}>
          {team.div} · 戰績 {team.rank} · {count} 名球員
        </div>
      </div>
      <div style={{ fontSize: 11, color: "var(--clay-deep)", fontWeight: 600 }}>查看全隊 →</div>
    </div>
  );
}

function HandMini({ hand }) {
  if (hand === "S") return (
    <div style={{
      fontFamily: "var(--f-display)", fontSize: 9, fontWeight: 700,
      borderRadius: 3, overflow: "hidden", display: "grid",
      gridTemplateColumns: "1fr 1fr", border: "1px solid rgba(27,34,48,0.15)",
      width: 28, lineHeight: "14px", textAlign: "center",
    }}>
      <span style={{ background: "rgba(47,125,79,0.18)", color: "var(--strike)" }}>L</span>
      <span style={{ background: "rgba(194,76,47,0.18)", color: "var(--ball)" }}>R</span>
    </div>
  );
  const isL = hand === "L";
  return (
    <div style={{
      fontFamily: "var(--f-display)", fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
      width: 28, textAlign: "center", borderRadius: 3, padding: "1px 0",
      border: "1px solid",
      background: isL ? "rgba(47,125,79,0.12)" : "rgba(194,76,47,0.10)",
      color: isL ? "var(--strike)" : "var(--ball)",
      borderColor: isL ? "rgba(47,125,79,0.35)" : "rgba(194,76,47,0.30)",
    }}>{hand}</div>
  );
}

function PlayerRow({ p, highlight, selected }) {
  /* highlight: span of name to highlight (search match) */
  const renderName = () => {
    if (!highlight) return p.name;
    const parts = p.name.split(new RegExp(`(${highlight})`));
    return parts.map((s, i) =>
      s === highlight
        ? <span key={i} style={{ background: "rgba(255,210,90,0.5)", borderRadius: 3, padding: "0 2px" }}>{s}</span>
        : <span key={i}>{s}</span>
    );
  };
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "34px 32px 1fr 80px 28px 14px",
      alignItems: "center", gap: 8,
      padding: "10px 12px",
      borderBottom: "1px solid rgba(27,34,48,0.06)",
      background: selected ? "rgba(185,119,68,0.10)" : "transparent",
    }}>
      <div style={{
        fontFamily: "var(--f-display)", fontSize: 15, fontWeight: 700, color: "var(--ink)",
        textAlign: "center", letterSpacing: -0.3,
      }}>{p.num}</div>
      <div style={{
        fontFamily: "var(--f-display)", fontSize: 10, fontWeight: 700,
        padding: "2px 0", borderRadius: 3, textAlign: "center",
        background: p.pos === "P" ? "rgba(27,34,48,0.85)" : "rgba(77,123,58,0.15)",
        color: p.pos === "P" ? "#F4ECDA" : "var(--grass-deep)",
        letterSpacing: 0.4,
      }}>{p.pos}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)" }}>{renderName()}</span>
          {p.flag === "hot" && (
            <span style={{
              fontFamily: "var(--f-display)", fontSize: 8, fontWeight: 700, letterSpacing: 0.8,
              background: "var(--ball)", color: "#FBF7EE",
              padding: "1px 4px", borderRadius: 2,
            }}>HOT</span>
          )}
        </div>
        <div style={{ fontSize: 10, color: "var(--ink-mute)", marginTop: 1, lineHeight: 1.3 }}>
          {p.note || p.role || "—"}
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{
          fontFamily: "var(--f-display)", fontSize: 14, fontWeight: 700,
          color: parseFloat(p.avg) > 0.3 ? "var(--clay-deep)" : "var(--ink)",
          fontVariantNumeric: "tabular-nums", letterSpacing: -0.2,
        }}>{p.avg}</div>
        <div style={{ fontSize: 9, color: "var(--ink-mute)", fontFamily: "var(--f-display)", letterSpacing: 0.6, marginTop: -1 }}>
          {p.ops ? `OPS ${p.ops}` : (p.pos === "P" ? "PITCHER" : "AVG")}
        </div>
      </div>
      <HandMini hand={p.hand}/>
      <div style={{ color: "var(--ink-mute)", fontSize: 14 }}>›</div>
    </div>
  );
}

function PlayerBrowse({ mode = "default", searchValue = "", focusedTeam = null, selectedPlayer = null }) {
  const isSearch = mode === "search";
  const isTeam = mode === "team";

  /* derive visible teams + match info */
  let teams = TEAMS_ROSTER;
  let activeChip = "全部";
  if (isTeam && focusedTeam) {
    teams = TEAMS_ROSTER.filter(t => t.id === focusedTeam);
    activeChip = teams[0]?.name;
  }
  /* search filter */
  if (isSearch && searchValue) {
    teams = TEAMS_ROSTER.map(t => ({
      ...t,
      players: t.players.filter(p => p.name.includes(searchValue) || p.num.includes(searchValue))
    })).filter(t => t.players.length > 0);
  }

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "var(--paper)",
      display: "flex", flexDirection: "column",
      fontFamily: "var(--f-body)", color: "var(--ink)",
    }}>
      <div style={{ height: 54 }}/>

      {/* top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "6px 16px 10px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            fontSize: 18, color: "var(--ink-soft)",
            width: 28, height: 28, display: "flex", alignItems: "center",
          }}>‹</div>
          <div>
            <div style={{ fontFamily: "var(--f-display)", fontSize: 13, fontWeight: 700, letterSpacing: 1.6, color: "var(--ink)" }}>PLAYER DB</div>
            <div style={{ fontSize: 10, color: "var(--ink-mute)", letterSpacing: 0.5, marginTop: -2 }}>球員資料庫 · 208 人</div>
          </div>
        </div>
        <div style={{
          fontFamily: "var(--f-display)", fontSize: 11, color: "var(--clay-deep)",
          fontWeight: 700, letterSpacing: 0.8,
        }}>篩選</div>
      </div>

      {/* search bar */}
      <div style={{ padding: "0 16px 10px" }}>
        <SearchField value={searchValue} focused={isSearch}/>
      </div>

      {/* team chips */}
      <div style={{
        display: "flex", gap: 6, padding: "0 16px 10px",
        overflowX: "auto",
      }}>
        <TeamChip label="全部" en="ALL" active={!isTeam}/>
        <TeamChip label="我方" en="HOME" active={false}/>
        {TEAMS_ROSTER.map(t => (
          <TeamChip key={t.id} label={t.name} en={t.en} active={isTeam && t.id === focusedTeam}/>
        ))}
      </div>

      {/* search summary */}
      {isSearch && (
        <div style={{
          margin: "0 16px 6px", padding: "8px 12px",
          background: "rgba(185,119,68,0.10)",
          border: "1px solid rgba(185,119,68,0.25)",
          borderRadius: 8,
          fontSize: 11, color: "var(--ink-soft)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span>找到 <strong style={{ color: "var(--clay-deep)", fontFamily: "var(--f-display)" }}>{teams.reduce((s, t) => s + t.players.length, 0)}</strong> 位包含「<strong>{searchValue}</strong>」的球員</span>
          <span style={{ color: "var(--clay-deep)", fontWeight: 600 }}>清除</span>
        </div>
      )}

      <div style={{ height: 1, background: "rgba(27,34,48,0.08)" }}/>

      {/* body */}
      <div style={{ flex: 1, overflow: "auto", padding: "0 16px 30px" }}>
        {teams.length === 0 && (
          <div style={{ padding: "40px 0", textAlign: "center", color: "var(--ink-mute)", fontSize: 13 }}>
            找不到符合的球員
          </div>
        )}
        {teams.map(team => (
          <div key={team.id}>
            <TeamHeader team={team} count={team.players.length}/>
            <div style={{
              background: "var(--chalk)", borderRadius: 12,
              border: "1px solid rgba(27,34,48,0.08)",
              overflow: "hidden",
            }}>
              {team.players.map((p, i) => (
                <PlayerRow
                  key={i}
                  p={p}
                  highlight={isSearch ? searchValue : null}
                  selected={selectedPlayer && team.id === selectedPlayer.team && p.num === selectedPlayer.num}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { PlayerBrowse, TEAMS_ROSTER });

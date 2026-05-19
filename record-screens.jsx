/* ────────────────────────────────────────────────
   Recording Screen — 2 variants
   A · 2-段式 (Conservative)  — 13 宮格好球帶 + 此球結果
   B · 進階 (Advanced)        — packed info, log, batter card

   FAB: 浮動「筆」按鈕 → MemoSheet
──────────────────────────────────────────────── */

/* ── shared bits ─────────────────────────────── */

function BSO({ balls = 1, strikes = 2, outs = 1, compact = false }) {
  const Dot = ({ on, color }) => (
    <div style={{
      width: compact ? 7 : 9, height: compact ? 7 : 9, borderRadius: 99,
      background: on ? color : "transparent",
      border: `1.2px solid ${on ? color : "rgba(27,34,48,0.25)"}`,
    }}/>
  );
  const Row = ({ label, n, max, color }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{
        fontFamily: "var(--f-display)", fontSize: compact ? 10 : 11,
        fontWeight: 700, width: 10, color: "var(--ink-soft)",
      }}>{label}</div>
      <div style={{ display: "flex", gap: 3 }}>
        {Array.from({length: max}).map((_, i) => <Dot key={i} on={i < n} color={color}/>)}
      </div>
    </div>
  );
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Row label="B" n={balls} max={3} color="var(--ball)"/>
      <Row label="S" n={strikes} max={2} color="var(--strike)"/>
      <Row label="O" n={outs} max={2} color="var(--ink)"/>
    </div>
  );
}

function ResultButton({ label, sub, color, dark = false, big = false, accent }) {
  return (
    <button className="btn" style={{
      flex: 1, padding: big ? "12px 8px" : "10px 6px",
      borderRadius: 12,
      background: color || "var(--chalk)",
      border: dark ? "none" : "1px solid rgba(27,34,48,0.14)",
      boxShadow: dark ? "0 2px 6px rgba(0,0,0,0.18)" : "var(--shadow-sm)",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
      color: dark ? "#F4ECDA" : "var(--ink)",
      position: "relative", overflow: "hidden",
    }}>
      {accent && (
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
          background: accent,
        }}/>
      )}
      <div style={{ fontFamily: "var(--f-body)", fontSize: big ? 14 : 13, fontWeight: 700, letterSpacing: 0.3 }}>{label}</div>
      {sub && <div style={{
        fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 1,
        color: dark ? "rgba(244,236,218,0.6)" : "var(--ink-mute)",
        textTransform: "uppercase",
      }}>{sub}</div>}
    </button>
  );
}

function RecordTopBar({ inning = "5上", outs = 1, score = "2-1", menuActive = false }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "8px 12px 8px 14px",
      background: "var(--ink)", color: "#F4ECDA",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <BaseballMark size={18}/>
        <div>
          <div style={{ fontFamily: "var(--f-display)", fontSize: 13, fontWeight: 600, letterSpacing: 1.5 }}>{inning} · {outs}OUT</div>
          <div style={{ fontSize: 9, color: "rgba(244,236,218,0.5)", letterSpacing: 1.5 }}>NEW BATTER · 3 棒 王俊偉</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "var(--f-display)", fontSize: 14, fontWeight: 700, letterSpacing: 1 }}>{score}</div>
          <div style={{ fontSize: 9, color: "rgba(244,236,218,0.5)", letterSpacing: 1 }}>FALCONS · AEGIS</div>
        </div>
        {/* ⋯ game-menu trigger */}
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: menuActive ? "var(--clay-deep)" : "rgba(244,236,218,0.1)",
          border: menuActive ? "none" : "1px solid rgba(244,236,218,0.18)",
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 2,
          cursor: "pointer",
        }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: 3, height: 3, borderRadius: 2,
              background: "#F4ECDA",
            }}/>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   VARIANT A · 2-段式 — 13 宮格好球帶 + 此球結果
───────────────────────────────────────────── */
function RecordA({
  showMenu = false,            /* legacy field popup (no-op now) */
  batterHand = "L",
  showPitchWheel = false, wheelCell = 5, wheelHover = 0,
  showBattedBall = false, battedBallIndex = 1,
  showFieldLocation = false, fieldLocationDot = null,
  showMemo = false,
  showGameMenu = false, gameMenuIndex = null,
}) {
  const pitches = [
    { cell: 7,  result: "ball" },
    { cell: 5,  result: "strike" },
    { cell: 13, result: "swingmiss" },
  ];

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "var(--paper)",
      display: "flex", flexDirection: "column",
      fontFamily: "var(--f-body)", color: "var(--ink)",
      position: "relative",
    }}>
      <div style={{ height: 54 }}/>
      <RecordTopBar menuActive={showGameMenu}/>

      {/* TOP HALF — 13-cell strike zone */}
      <div style={{
        flex: "1 1 50%", position: "relative",
        borderBottom: "1px solid rgba(27,34,48,0.1)",
      }}>
        <div style={{
          position: "absolute", top: 10, left: 14, zIndex: 1,
          fontFamily: "var(--f-display)", fontSize: 11, fontWeight: 600,
          letterSpacing: 1.5, color: "var(--ink-soft)",
        }}>STRIKE ZONE · 13 CELL</div>
        <div style={{
          position: "absolute", top: 10, right: 14, zIndex: 1,
        }}>
          <BSO balls={1} strikes={2} outs={1} compact/>
        </div>
        <div style={{
          position: "absolute", left: 14, bottom: 8, zIndex: 1,
          fontSize: 10, color: "var(--ink-mute)", letterSpacing: 0.3,
        }}>點格子 = 進壘位置 · 長按 = 選球種</div>
        <StrikeZone pitches={pitches} batterHand={batterHand}/>
      </div>

      {/* BOTTOM HALF — result buttons */}
      <div style={{
        flex: "1 1 50%",
        padding: "14px 12px 30px",
        display: "flex", flexDirection: "column", gap: 10,
        background: "var(--paper-2)",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 4px 2px",
        }}>
          <div style={{
            fontFamily: "var(--f-display)", fontSize: 11, fontWeight: 600,
            letterSpacing: 1.5, color: "var(--ink-soft)",
          }}>此球結果 · PITCH RESULT</div>
          <div style={{ fontSize: 10, color: "var(--ink-mute)" }}>第 3 球</div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <ResultButton label="好球"   sub="Strike"        color="var(--strike)" dark big/>
          <ResultButton label="壞球"   sub="Ball"          color="var(--ball)"   dark big/>
          <ResultButton label="揮棒落空" sub="Swing & Miss" color="#1B2230"       dark big/>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <ResultButton label="擊出"   sub="In Play" accent="var(--clay)" big/>
          <ResultButton label="觸身球" sub="HBP"     accent="var(--warn)" big/>
          <ResultButton label="界外"   sub="Foul"    accent="var(--warn)" big/>
        </div>
        <div style={{
          display: "flex", gap: 8, marginTop: 2,
          fontFamily: "var(--f-body)", fontSize: 11,
        }}>
          <Util label="↶ 撤回"/>
          <Util label="切換打者"/>
          <Util label="新打席"/>
        </div>
      </div>

      {/* FAB — Memo */}
      {!showMemo && !showFieldLocation && !showBattedBall && !showPitchWheel && !showGameMenu && (
        <button className="btn" style={{
          position: "absolute",
          right: 16, bottom: 120,
          width: 54, height: 54, borderRadius: 27,
          background: "linear-gradient(180deg, #C7912A 0%, #A36F1E 100%)",
          border: "2px solid #FBF7EE",
          color: "#FBF7EE",
          boxShadow: "0 8px 22px rgba(27,34,48,0.32), 0 2px 4px rgba(27,34,48,0.18)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 0, padding: 0, zIndex: 6,
          cursor: "pointer",
        }}>
          <svg viewBox="0 0 20 20" width="20" height="20">
            <path d="M 13 3 L 17 7 L 7 17 L 3 17 L 3 13 Z" fill="none" stroke="#FBF7EE" strokeWidth="1.6" strokeLinejoin="round"/>
            <line x1="12" y1="4" x2="16" y2="8" stroke="#FBF7EE" strokeWidth="1.6"/>
          </svg>
          <span style={{
            fontFamily: "var(--f-body)", fontSize: 8, fontWeight: 700,
            letterSpacing: 0.5, marginTop: 1,
          }}>MEMO</span>
        </button>
      )}

      {showPitchWheel    && <PitchWheel activeCell={wheelCell} hoveredIndex={wheelHover}/>}
      {showBattedBall    && <BattedBallSheet activeIndex={battedBallIndex}/>}
      {showFieldLocation && <FieldLocationSheet selectedDot={fieldLocationDot}/>}
      {showMemo          && <MemoSheet/>}
      {showGameMenu      && <GameMenu activeIndex={gameMenuIndex}/>}
    </div>
  );
}

function Util({ label }) {
  return (
    <div style={{
      flex: 1, height: 30, borderRadius: 8,
      background: "transparent",
      border: "1px dashed rgba(27,34,48,0.18)",
      color: "var(--ink-soft)", fontWeight: 500,
      display: "flex", alignItems: "center", justifyContent: "center",
      letterSpacing: 0.5,
    }}>{label}</div>
  );
}

/* ─────────────────────────────────────────────
   VARIANT B · 進階 — packed: batter card, pitch log
───────────────────────────────────────────── */
function RecordB({ batterHand = "L" }) {
  const hits = [
    { x: 0.42, y: 0.48, type: "hit" },
    { x: 0.66, y: 0.38, type: "out" },
  ];
  const pitches = [
    { cell: 11, result: "ball" },
    { cell: 5,  result: "strike" },
    { cell: 8,  result: "foul" },
  ];

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "var(--paper)",
      display: "flex", flexDirection: "column",
      fontFamily: "var(--f-body)", color: "var(--ink)",
    }}>
      <div style={{ height: 54 }}/>

      {/* compact batter card header */}
      <div style={{
        background: "var(--ink)", color: "#F4ECDA",
        padding: "10px 14px 12px",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--f-display)", fontSize: 11, letterSpacing: 1.5 }}>
            <span style={{ color: "var(--clay-soft)" }}>5上</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>第 3 棒</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>1 OUT</span>
          </div>
          <div style={{ fontFamily: "var(--f-display)", fontSize: 12, letterSpacing: 1 }}>FAL 2 — 1 AEG</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* batter big */}
          <div style={{
            width: 42, height: 42, borderRadius: 21,
            background: "var(--clay-deep)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--f-display)", fontSize: 17, fontWeight: 700,
            border: "1.5px solid rgba(244,236,218,0.2)",
          }}>31</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: -0.3 }}>王俊偉</div>
              <div style={{
                fontFamily: "var(--f-display)", fontSize: 10, fontWeight: 600,
                background: "rgba(77,123,58,0.4)", padding: "1px 5px", borderRadius: 3,
                letterSpacing: 0.5,
              }}>1B</div>
              <div style={{
                fontFamily: "var(--f-display)", fontSize: 10, fontWeight: 600,
                background: "rgba(244,236,218,0.12)", padding: "1px 5px", borderRadius: 3,
              }}>L打</div>
            </div>
            <div style={{ fontSize: 10, color: "rgba(244,236,218,0.55)", letterSpacing: 0.5, marginTop: 1 }}>
              今日 1-2 · 一安、一K · 對 RHP .312
            </div>
          </div>
          {/* vs pitcher mini */}
          <div style={{
            paddingLeft: 10, borderLeft: "1px solid rgba(244,236,218,0.15)",
            fontSize: 9, color: "rgba(244,236,218,0.6)",
            display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1,
          }}>
            <div style={{ letterSpacing: 1 }}>VS #18 陳柏宇</div>
            <div style={{ fontFamily: "var(--f-display)", fontSize: 11, color: "#F4ECDA", fontWeight: 600 }}>RHP · OVR</div>
            <div style={{ fontFamily: "var(--f-display)", fontSize: 10, letterSpacing: 0.5, color: "var(--clay-soft)" }}>42 PIT · 3 K</div>
          </div>
        </div>
      </div>

      {/* TOP 1/3 — field */}
      <div style={{ position: "relative", flex: "0 0 27%", borderBottom: "1px solid rgba(27,34,48,0.1)" }}>
        <FieldMap hits={hits}/>
        <div style={{
          position: "absolute", top: 6, left: 8,
          background: "rgba(244,236,218,0.92)", color: "var(--ink)",
          padding: "3px 7px", borderRadius: 6,
          fontSize: 9, fontWeight: 600, letterSpacing: 0.5,
          fontFamily: "var(--f-display)",
        }}>SPRAY CHART · 落點</div>
        {/* hit-type legend */}
        <div style={{
          position: "absolute", bottom: 6, right: 8, display: "flex", gap: 6,
          background: "rgba(27,34,48,0.7)", padding: "3px 6px", borderRadius: 99,
          backdropFilter: "blur(6px)",
        }}>
          {[
            ["#F4ECDA","安打"],["#1B2230","出局"],["#C24C2F","全壘打"],
          ].map(([c, l], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 8, color: "#F4ECDA" }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: c, border: "0.5px solid #F4ECDA" }}/>{l}
            </div>
          ))}
        </div>
      </div>

      {/* MIDDLE — strike zone + pitch log side-by-side */}
      <div style={{ flex: "0 0 32%", display: "flex", borderBottom: "1px solid rgba(27,34,48,0.1)" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <div style={{
            position: "absolute", top: 6, left: 10,
            fontFamily: "var(--f-display)", fontSize: 9, fontWeight: 600,
            letterSpacing: 1.5, color: "var(--ink-soft)", zIndex: 1,
          }}>PITCH MAP</div>
          <StrikeZone pitches={pitches} batterHand={batterHand} compact/>
        </div>
        {/* sequence panel */}
        <div style={{
          flex: "0 0 100px",
          padding: "8px 8px 8px 10px",
          borderLeft: "1px solid rgba(27,34,48,0.1)",
          background: "var(--paper-2)",
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          <div style={{ fontFamily: "var(--f-display)", fontSize: 9, fontWeight: 600,
                        letterSpacing: 1.5, color: "var(--ink-soft)", marginBottom: 2 }}>SEQUENCE</div>
          <div style={{
            display: "flex", gap: 4, marginBottom: 4,
          }}>
            <BSO balls={1} strikes={2} compact outs={0}/>
          </div>
          <PitchLogRow n={1} type="壞球" loc="角落" speed="142"/>
          <PitchLogRow n={2} type="好球" loc="紅中" speed="139"/>
          <PitchLogRow n={3} type="界外" loc="低外" speed="146"/>
          <div style={{
            fontSize: 9, color: "var(--ink-mute)", marginTop: "auto",
            paddingTop: 6, borderTop: "1px dashed rgba(27,34,48,0.15)",
          }}>本打席 3 球 · 1B 1S</div>
        </div>
      </div>

      {/* BOTTOM — result buttons (denser grid 2×3) */}
      <div style={{
        flex: 1,
        padding: "10px 10px 26px",
        display: "flex", flexDirection: "column", gap: 7,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 4px" }}>
          <div style={{
            fontFamily: "var(--f-display)", fontSize: 10, fontWeight: 600,
            letterSpacing: 1.5, color: "var(--ink-soft)",
          }}>記錄此球結果</div>
          <div style={{ fontSize: 9, color: "var(--ink-mute)", letterSpacing: 0.5 }}>長按可加註球種 · 速度</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          <ResultButton label="好球" sub="STRIKE" color="var(--strike)" dark/>
          <ResultButton label="壞球" sub="BALL"   color="var(--ball)"   dark/>
          <ResultButton label="揮棒落空" sub="SWG MISS" color="#1B2230" dark/>
          <ResultButton label="擊出"   sub="IN PLAY" accent="var(--clay)"/>
          <ResultButton label="觸身球" sub="HBP"     accent="var(--warn)"/>
          <ResultButton label="界外"   sub="FOUL"    accent="var(--warn)"/>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6,
          marginTop: 2,
        }}>
          <MiniUtil label="↶" sub="撤回"/>
          <MiniUtil label="球種" sub="FB"/>
          <MiniUtil label="速度" sub="km/h"/>
          <MiniUtil label="筆記" sub="NOTE"/>
        </div>
      </div>
    </div>
  );
}

function PitchLogRow({ n, type, loc, speed }) {
  const colors = {
    "好球": "var(--strike)",
    "壞球": "var(--ball)",
    "界外": "var(--warn)",
    "揮棒落空": "var(--ink)",
  };
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 5,
      fontSize: 10,
    }}>
      <div style={{
        width: 14, height: 14, borderRadius: 7,
        background: colors[type], color: "#F4ECDA",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--f-display)", fontWeight: 700, fontSize: 9,
      }}>{n}</div>
      <div style={{ flex: 1, color: "var(--ink)" }}>
        <div style={{ fontWeight: 600, fontSize: 10 }}>{type}</div>
        <div style={{ fontSize: 8.5, color: "var(--ink-mute)", letterSpacing: 0.2 }}>{loc} · {speed}</div>
      </div>
    </div>
  );
}

function MiniUtil({ label, sub }) {
  return (
    <div style={{
      height: 36, borderRadius: 8,
      background: "var(--chalk)",
      border: "1px solid rgba(27,34,48,0.1)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 1,
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)" }}>{label}</div>
      <div style={{ fontSize: 8, color: "var(--ink-mute)", letterSpacing: 1, fontFamily: "var(--f-display)" }}>{sub}</div>
    </div>
  );
}

Object.assign(window, { RecordA, RecordB });

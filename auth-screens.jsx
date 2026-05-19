/* ────────────────────────────────────────────────
   Auth — Login screen with Google SSO
   • SignIn        : 初始登入頁
   • SignInLoading : 點 Google 後驗證中
   • AccountChooser: Google 帳號選擇器（彈出）
──────────────────────────────────────────────── */

function StadiumBackdrop() {
  /* dark stadium-night look: navy sky + clay arc + chalk lines */
  return (
    <>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(120% 80% at 50% 0%, #232B3D 0%, #0F141C 60%, #07090E 100%)",
      }}/>
      {/* outfield arc bottom */}
      <svg viewBox="0 0 360 320" preserveAspectRatio="none" style={{
        position: "absolute", left: 0, right: 0, bottom: 0, width: "100%", height: 320,
        opacity: 0.95,
      }}>
        <defs>
          <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3a5e2c" stopOpacity="0.0"/>
            <stop offset="0.4" stopColor="#3a5e2c" stopOpacity="0.55"/>
            <stop offset="1" stopColor="#284321" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="clayGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#B97744" stopOpacity="0.0"/>
            <stop offset="1" stopColor="#7A4A26" stopOpacity="0.75"/>
          </linearGradient>
        </defs>
        {/* grass */}
        <path d="M -20 200 Q 180 100 380 200 L 380 320 L -20 320 Z" fill="url(#grassGrad)"/>
        {/* clay infield */}
        <ellipse cx="180" cy="320" rx="170" ry="80" fill="url(#clayGrad)"/>
        {/* foul lines */}
        <line x1="180" y1="320" x2="40"  y2="195" stroke="#F4ECDA" strokeOpacity="0.35" strokeWidth="1"/>
        <line x1="180" y1="320" x2="320" y2="195" stroke="#F4ECDA" strokeOpacity="0.35" strokeWidth="1"/>
        {/* outfield arc */}
        <path d="M 40 195 Q 180 130 320 195" fill="none" stroke="#F4ECDA" strokeOpacity="0.22" strokeWidth="0.8"/>
        {/* home plate */}
        <path d="M 172 312 L 188 312 L 186 318 L 174 318 Z" fill="#F4ECDA" fillOpacity="0.55"/>
      </svg>
      {/* stadium light flares top */}
      <div style={{
        position: "absolute", top: -40, left: -40, width: 260, height: 260,
        background: "radial-gradient(circle, rgba(255,240,200,0.10) 0%, transparent 60%)",
        pointerEvents: "none",
      }}/>
      <div style={{
        position: "absolute", top: -60, right: -60, width: 300, height: 300,
        background: "radial-gradient(circle, rgba(255,230,180,0.08) 0%, transparent 60%)",
        pointerEvents: "none",
      }}/>
      {/* fine chalk grain */}
      <div className="grit" style={{ position: "absolute", inset: 0, opacity: 0.10 }}/>
    </>
  );
}

function BigBaseballMark({ size = 76 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80">
      <defs>
        <radialGradient id="ballGloss" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff"/>
          <stop offset="0.5" stopColor="#FBF7EE"/>
          <stop offset="1" stopColor="#D9CFB8"/>
        </radialGradient>
      </defs>
      <circle cx="40" cy="40" r="34" fill="url(#ballGloss)" stroke="#1B2230" strokeWidth="1.4"/>
      <path d="M 12 22 Q 25 40 12 58" fill="none" stroke="#C24C2F" strokeWidth="1.6"/>
      <path d="M 68 22 Q 55 40 68 58" fill="none" stroke="#C24C2F" strokeWidth="1.6"/>
      {[16,22,28,34,40,46,52].map((y,i)=>(
        <g key={i}>
          <line x1="14.5" y1={y-1.4} x2="17" y2={y+1.4} stroke="#C24C2F" strokeWidth="1.1" strokeLinecap="round"/>
          <line x1="63" y1={y-1.4} x2="65.5" y2={y+1.4} stroke="#C24C2F" strokeWidth="1.1" strokeLinecap="round"/>
        </g>
      ))}
    </svg>
  );
}

function GoogleGlyph({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.12-.84 2.07-1.79 2.71v2.26h2.9c1.7-1.57 2.69-3.88 2.69-6.61z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.81 5.96-2.19l-2.9-2.26c-.81.54-1.83.86-3.06.86-2.36 0-4.36-1.59-5.07-3.74H.96v2.34A8.997 8.997 0 0 0 9 18z"/>
      <path fill="#FBBC05" d="M3.93 10.67A5.4 5.4 0 0 1 3.64 9c0-.58.1-1.15.29-1.67V4.99H.96A8.997 8.997 0 0 0 0 9c0 1.45.35 2.83.96 4.01l2.97-2.34z"/>
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.34l2.58-2.58C13.46.89 11.43 0 9 0A8.997 8.997 0 0 0 .96 4.99l2.97 2.34C4.64 5.17 6.64 3.58 9 3.58z"/>
    </svg>
  );
}

function GoogleButton({ loading = false }) {
  return (
    <button className="btn" style={{
      width: "100%", height: 50, borderRadius: 12,
      background: "#FFFFFF", border: "none",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
      fontFamily: "var(--f-body)", fontSize: 15, fontWeight: 600,
      color: "#1F1F1F", letterSpacing: 0.2,
      boxShadow: "0 4px 14px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.6) inset",
      cursor: "pointer",
    }}>
      {loading ? (
        <>
          <span style={{
            width: 18, height: 18, borderRadius: 9,
            border: "2px solid rgba(31,31,31,0.18)",
            borderTopColor: "#4285F4",
            display: "inline-block",
          }}/>
          <span style={{ color: "#5F6368" }}>驗證中…</span>
        </>
      ) : (
        <>
          <GoogleGlyph/>
          <span>使用 Google 帳號繼續</span>
        </>
      )}
    </button>
  );
}

function AuthShell({ children }) {
  return (
    <div style={{
      width: "100%", height: "100%",
      position: "relative", overflow: "hidden",
      fontFamily: "var(--f-body)", color: "#F4ECDA",
    }}>
      <StadiumBackdrop/>
      <div style={{
        position: "relative", height: "100%",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ height: 54 }}/>
        {children}
      </div>
    </div>
  );
}

function SignIn({ loading = false }) {
  return (
    <AuthShell>
      {/* brand block */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: "0 28px",
      }}>
        <BigBaseballMark size={84}/>
        <div style={{
          fontFamily: "var(--f-display)", fontSize: 38, fontWeight: 700,
          letterSpacing: 4, marginTop: 22, color: "#F4ECDA",
        }}>SCOUTBOOK</div>
        <div style={{
          fontSize: 13, color: "rgba(244,236,218,0.65)",
          marginTop: 6, letterSpacing: 2, fontWeight: 500,
        }}>球探筆記 · 場邊紀錄</div>

        {/* chalk-stencil tagline */}
        <div style={{
          marginTop: 28, padding: "10px 18px",
          border: "1px dashed rgba(244,236,218,0.28)",
          borderRadius: 99,
          fontFamily: "var(--f-display)", fontSize: 10, fontWeight: 600,
          letterSpacing: 3, color: "rgba(244,236,218,0.55)",
        }}>FOR COACHES &middot; SCOUTS &middot; 2026</div>
      </div>

      {/* sign-in panel */}
      <div style={{
        padding: "0 28px 0", display: "flex", flexDirection: "column", gap: 14,
      }}>
        <GoogleButton loading={loading}/>

        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          color: "rgba(244,236,218,0.4)", fontSize: 10, letterSpacing: 1.2,
        }}>
          <div style={{ flex: 1, height: 1, background: "rgba(244,236,218,0.14)" }}/>
          <span>或</span>
          <div style={{ flex: 1, height: 1, background: "rgba(244,236,218,0.14)" }}/>
        </div>

        <button className="btn" style={{
          height: 46, borderRadius: 12,
          background: "transparent",
          border: "1.5px solid rgba(244,236,218,0.22)",
          fontSize: 13, fontWeight: 600, color: "rgba(244,236,218,0.8)",
        }}>以訪客身份試用</button>

        <div style={{
          fontSize: 10, color: "rgba(244,236,218,0.4)",
          textAlign: "center", marginTop: 6, lineHeight: 1.6,
        }}>
          登入即表示同意 <span style={{ color: "var(--clay-soft)" }}>服務條款</span> 與 <span style={{ color: "var(--clay-soft)" }}>隱私權政策</span>
        </div>
      </div>

      {/* footer */}
      <div style={{
        padding: "18px 28px 26px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        fontFamily: "var(--f-display)", fontSize: 9, letterSpacing: 1.5,
        color: "rgba(244,236,218,0.35)",
      }}>
        <span>v2.4.1</span>
        <span>需要協助？</span>
      </div>
    </AuthShell>
  );
}

/* Google account chooser sheet — slides up from bottom */
function SignInChooser() {
  const accounts = [
    { name: "李柏宇 教練", email: "coach.lee@falcons.tw", color: "#3F8E5C", letter: "李" },
    { name: "Bryan Lee",   email: "bryan@gmail.com",       color: "#C57A3A", letter: "B" },
  ];
  return (
    <AuthShell>
      {/* dimmed brand area */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: "0 28px",
        opacity: 0.4,
      }}>
        <BigBaseballMark size={76}/>
        <div style={{
          fontFamily: "var(--f-display)", fontSize: 32, fontWeight: 700,
          letterSpacing: 4, marginTop: 18, color: "#F4ECDA",
        }}>SCOUTBOOK</div>
      </div>

      {/* sheet */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        background: "#FBF7EE",
        borderRadius: "20px 20px 0 0",
        padding: "18px 22px 28px",
        color: "#1F1F1F", boxShadow: "0 -10px 30px rgba(0,0,0,0.4)",
      }}>
        <div style={{
          width: 38, height: 4, borderRadius: 2,
          background: "rgba(0,0,0,0.16)",
          margin: "-4px auto 14px",
        }}/>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <GoogleGlyph size={20}/>
          <span style={{ fontFamily: "var(--f-body)", fontSize: 17, fontWeight: 600 }}>選擇帳號</span>
        </div>
        <div style={{ fontSize: 12, color: "#5F6368", marginBottom: 14, lineHeight: 1.5 }}>
          選擇要用來登入 <strong style={{ color: "#1F1F1F" }}>SCOUTBOOK</strong> 的 Google 帳號
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {accounts.map((a, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "11px 4px",
              borderBottom: i < accounts.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 18,
                background: a.color, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--f-body)", fontSize: 15, fontWeight: 600,
              }}>{a.letter}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#1F1F1F" }}>{a.name}</div>
                <div style={{ fontSize: 12, color: "#5F6368", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.email}</div>
              </div>
            </div>
          ))}
          <div style={{
            display: "flex", alignItems: "center", gap: 12, padding: "11px 4px",
            color: "#1A73E8", fontSize: 14, fontWeight: 500,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 18,
              background: "rgba(26,115,232,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, color: "#1A73E8",
            }}>+</div>
            使用其他帳號
          </div>
        </div>
      </div>
    </AuthShell>
  );
}

Object.assign(window, { SignIn, SignInChooser, BigBaseballMark, GoogleGlyph });

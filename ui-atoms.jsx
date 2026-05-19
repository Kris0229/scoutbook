/* ────────────────────────────────────────────────
   Shared UI atoms for Baseball Scout
──────────────────────────────────────────────── */

function Stepper({ step, total = 4, labels = [] }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 4px" }}>
      {Array.from({length: total}).map((_, i) => {
        const active = i === step;
        const done = i < step;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, flex: i === total-1 ? 0 : 1 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              minWidth: 0,
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 11,
                background: active ? "var(--ink)" : done ? "var(--clay)" : "transparent",
                border: active || done ? "none" : "1.5px solid rgba(27,34,48,0.18)",
                color: active ? "#F4ECDA" : done ? "#F4ECDA" : "var(--ink-mute)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--f-display)", fontWeight: 600, fontSize: 12,
              }}>
                {done ? "✓" : i+1}
              </div>
              <div style={{
                fontSize: 11, fontFamily: "var(--f-body)", fontWeight: 500,
                color: active ? "var(--ink)" : "var(--ink-mute)",
                whiteSpace: "nowrap",
              }}>{labels[i]}</div>
            </div>
            {i < total - 1 && (
              <div style={{ flex: 1, height: 1, background: "rgba(27,34,48,0.12)" }}/>
            )}
          </div>
        );
      })}
    </div>
  );
}

function StepHeader({ overline, title, subtitle }) {
  return (
    <div style={{ padding: "0 4px" }}>
      {overline && (
        <div style={{
          fontFamily: "var(--f-display)", fontSize: 11, fontWeight: 500,
          letterSpacing: 2, color: "var(--clay)", textTransform: "uppercase",
          marginBottom: 6,
        }}>{overline}</div>
      )}
      <div style={{
        fontFamily: "var(--f-body)", fontSize: 24, fontWeight: 700,
        color: "var(--ink)", lineHeight: 1.2, letterSpacing: -0.3,
      }}>{title}</div>
      {subtitle && (
        <div style={{
          fontFamily: "var(--f-body)", fontSize: 13, color: "var(--ink-soft)",
          marginTop: 4, lineHeight: 1.4,
        }}>{subtitle}</div>
      )}
    </div>
  );
}

function FieldRow({ label, hint, children, span = 1 }) {
  return (
    <div style={{ gridColumn: `span ${span}`, display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{
        display: "flex", justifyContent: "space-between",
        fontSize: 11, fontFamily: "var(--f-body)", color: "var(--ink-soft)",
        letterSpacing: 0.3, fontWeight: 500,
      }}>
        <span>{label}</span>
        {hint && <span style={{ color: "var(--ink-mute)" }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Input({ value, placeholder, suffix }) {
  return (
    <div style={{
      display: "flex", alignItems: "center",
      background: "var(--chalk)", borderRadius: 8,
      border: "1px solid rgba(27,34,48,0.12)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
      padding: "0 10px", height: 38,
    }}>
      <div style={{
        flex: 1, fontFamily: "var(--f-body)", fontSize: 14,
        color: value ? "var(--ink)" : "var(--ink-mute)",
      }}>{value || placeholder}</div>
      {suffix && (
        <div style={{ fontFamily: "var(--f-display)", fontSize: 11, color: "var(--ink-mute)", letterSpacing: 0.5 }}>
          {suffix}
        </div>
      )}
    </div>
  );
}

function Segmented({ options, value }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${options.length}, 1fr)`,
      background: "rgba(27,34,48,0.06)",
      borderRadius: 9, padding: 3, gap: 2,
    }}>
      {options.map(o => {
        const active = o === value;
        return (
          <div key={o} style={{
            padding: "6px 0", borderRadius: 7, textAlign: "center",
            fontFamily: "var(--f-body)", fontSize: 12, fontWeight: 600,
            background: active ? "var(--chalk)" : "transparent",
            color: active ? "var(--ink)" : "var(--ink-soft)",
            boxShadow: active ? "0 1px 3px rgba(27,34,48,0.12)" : "none",
          }}>{o}</div>
        );
      })}
    </div>
  );
}

function StepNav({ back = "上一步", next = "下一步", primary = false, hideBack = false }) {
  return (
    <div style={{
      display: "flex", gap: 8, padding: "0 4px",
    }}>
      {!hideBack && (
        <button className="btn" style={{
          flex: 1, height: 48, borderRadius: 12,
          background: "transparent",
          border: "1.5px solid rgba(27,34,48,0.15)",
          fontSize: 14, fontWeight: 600, color: "var(--ink-soft)",
        }}>{back}</button>
      )}
      <button className="btn" style={{
        flex: 2, height: 48, borderRadius: 12,
        background: primary ? "var(--clay-deep)" : "var(--ink)",
        border: "none", color: "#F4ECDA",
        fontSize: 15, fontWeight: 700,
        boxShadow: "var(--shadow-md)",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
      }}>{next}
        {!primary && <span style={{ fontSize: 16, opacity: 0.8 }}>→</span>}
      </button>
    </div>
  );
}

/* a textured ribbon used as the screen "header" backdrop */
function ClayRibbon({ children, height = 92 }) {
  return (
    <div style={{
      position: "relative",
      height, width: "100%",
      background: "linear-gradient(180deg, #B97744 0%, #A4683A 100%)",
      overflow: "hidden",
    }}>
      <div className="grit" style={{ position: "absolute", inset: 0 }}/>
      {/* chalk lines stenciled */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        height: 2, background: "var(--foul-line)", opacity: 0.7,
      }}/>
      <div style={{ position: "relative", height: "100%", display: "flex",
                    alignItems: "flex-end", padding: "0 16px 12px" }}>
        {children}
      </div>
    </div>
  );
}

Object.assign(window, {
  Stepper, StepHeader, FieldRow, Input, Segmented, StepNav, ClayRibbon,
});

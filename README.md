# ScoutBook · 球探筆記

Side-of-field baseball scouting app. Record every pitch, let AI help read the opposing lineup.

## What's in this repo

Two HTML entry points, both built with React 18 + Babel-standalone (no build step, just open the file):

| File | What it is |
|---|---|
| **`Prototype.html`** | Fullscreen interactive prototype — login → dashboard → game-setup wizard → pitch-by-pitch recording → live result. State management via `useReducer`. The recording screen has long-press pitch-type wheel, tap-to-mark strike-zone location, batted-ball flow with field tap targeting, and PA outcomes that advance count/runners correctly. |
| **`Baseball Scout.html`** | Static design canvas — 18 screens (10 App, 8 Web) laid out side-by-side for design review. Pan/zoom, drag to reorder, double-click to fullscreen any artboard. |

## Run locally

No build needed. Just open in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/Prototype.html
```

## File layout

```
Prototype.html              ← interactive prototype entry
Baseball Scout.html         ← static design canvas entry
styles.css                  ← design tokens (clay + grass + chalk palette)

# Prototype source
proto-state.jsx             ← game state reducer
proto-screens.jsx           ← login, dashboard, wizard, result
proto-record.jsx            ← interactive recording screen

# Design canvas screens
sb-atoms.jsx                ← shared visual atoms (Chip, KPI, FieldMap, etc.)
sb-app-1.jsx … sb-app-4.jsx ← App screens (static)
sb-record.jsx               ← Recording variants (static)
sb-web-1.jsx … sb-web-3.jsx ← Web screens (static)

# Frames
ios-frame.jsx               ← iPhone bezel
browser-window.jsx          ← Browser chrome
design-canvas.jsx           ← Pan/zoom canvas component
```

## Design language

- **Palette** — paper (#F4ECDA) · chalk · clay (#B97744) · grass (#4D7B3A) · ink (#1B2230)
- **Signals** — strike (green) · ball (red) · warn (gold)
- **Type** — Oswald display (numerics) · Noto Sans TC (body) · JetBrains Mono (code)
- **Pitch colors** — FB clay · SI clay-soft · SL blue · CB purple · CH grass · SF gold · XX gray

All tokens are CSS custom properties defined in `styles.css`.

## Interactive prototype — what works

- Login (Google SSO mock)
- Dashboard with next-game banner → launches wizard
- 4-step wizard (teams · lineup with drag-to-reorder · pitcher select · review)
- **Recording screen** with:
  - Live count, outs, base runners, inning
  - Tap zone cell → mark next pitch location
  - **Long-press zone cell (~420ms)** → open pitch-type wheel
  - Result buttons (B / S-L / S-S / F / HBP / IP) advance count
  - Strikeouts, walks, hit-by-pitch end the PA
  - "擊出" (IP) → batted-ball type sheet → field tap to mark hit location → result popover (1B / 2B / 3B / HR / OUT / E)
  - Undo last pitch
  - End-game menu
- Result screen reads from `completedPAs`, computes per-batter AB/H/HR/BB/K

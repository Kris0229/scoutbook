# SCOUTBOOK · 球探筆記 完整產品規格

> 場邊紀錄／球員資料庫／AI 球探報告／內容市集
> 設計風格：球場紋理（土壤色 + 草綠 + 粉筆線）
> 平台：iOS／Android App（主要輸入）＋ Web（瀏覽／分析／市集）

---

## 🗺️ 整體流程地圖

### App 流程

```
[0] 登入頁 (Google SSO)
        │
        ▼
[1] 主控台 (Dashboard)
        │
        ├──▶ [2] 新增比賽 → 設定 Wizard (4 步驟)
        │           │
        │           └──▶ [3] 比賽中記錄畫面
        │                       │
        │                       └──▶ [4] 比賽結束結算
        │                                   │
        │                                   └──▶ [4b] 投手統計 Sub-tab（新增）
        │
        ├──▶ [5] 球探報告（按比賽列出）
        │
        ├──▶ [6] 球員資料庫
        │           │
        │           └──▶ [7] 球員球探報告 (6 大區塊)
        │                       │
        │                       ├── 野手 → 打者版 6 大區塊
        │                       └── 投手 → 投手版 6 大區塊 [P]
        │
        └──▶ [8] 內容市集
                    │
                    ├──▶ [8.1] 市集首頁
                    ├──▶ [8.2] 報告詳情
                    ├──▶ [8.3] 購買流程
                    ├──▶ [8.4] 上架設定
                    ├──▶ [8.5] 賣家收益儀表板
                    └──▶ [8.6] 我的購買
```

### Web 流程

```
/                        → 登入頁
/dashboard               → 主控台
/games                   → 比賽列表
/games/:id               → 單場結算（唯讀）
/players                 → 球員資料庫
/players/:id             → 球員球探報告
/players/compare         → 球員對比頁
/market                  → 內容市集首頁
/market/:listingId       → 報告詳情 + 購買
/purchases               → 我的購買
/earnings                → 賣家收益儀表板
/settings/roster         → 球員名單管理
/settings/subscription   → 訂閱方案管理
```

---

## 0. 登入頁 · Google SSO

**目的**：身份驗證、區分教練／球探角色。

**視覺**：球場夜景（深藍漸層 + 草綠底 + 粉筆線壘包）。

**畫面狀態**：

| # | 狀態 | 說明 |
|---|---|---|
| ① | 初始登入 | SCOUTBOOK 大標 + 標準 Google 登入按鈕 + 訪客試用 |
| ② | 驗證中 | Google 按鈕變為旋轉 loading + 「驗證中…」 |
| ③ | 帳號選擇器 | 由下滑出的 Google 風格 sheet，列出已登入的多組 Google 帳號 |

**互動**：
- 點「使用 Google 帳號繼續」→ Google OAuth → 進入主控台
- 點「以訪客身份試用」→ 唯讀示範資料模式

---

## 1. 主控台 · Home Dashboard

**目的**：登入後的第一個畫面，三大入口 + 季度概覽。

**結構**：
1. **頂部 Bar** — SCOUTBOOK logo · 通知鈴 · 使用者頭像
2. **歡迎語** — 「李教練，今天賽前準備了嗎？」 + 下一場比賽提示
3. **季度戰績條** — W–L / TEAM AVG / ERA / 名次
4. **三大入口（Tile 卡片）**
5. **最近比賽列表** — 4 場含日期、對手、比分、勝負章
6. **賽前小提醒** — 系統依對手投手特性給出戰術提示

**三大入口**：

| 編號 | 名稱 | 動作 |
|---|---|---|
| 01 | **新增比賽** | 進入 4 步驟設定 Wizard |
| 02 | **球探報告** | 進入比賽列表 → 點選比賽查看 |
| 03 | **球員資料庫** | 進入球員瀏覽頁（可搜尋） |

---

## 2. 新增比賽 · 設定 Wizard

4 個步驟、頂部固定 Stepper、底部 nav（上一步／下一步）。

### Step 1 · 隊伍
- 我方隊伍 / 對方隊伍（必填）
- 主客場切換
- VS 對戰卡預覽

### Step 2 · 打序
- 依「比賽層級」自動建議人數：
  - 少棒 12 棒 · 高中 9 棒 · 職棒 DH · 壘球 EH 11 棒
- 每位打者：棒次／背號／守備位置／姓名／打席（左 L／右 R／雙 S）
- 點任一列 → 進入「新增 / 編輯打者」全頁

### Step 3 · 投手
- 大型投手資訊卡（背號水印）
- 背號 / 姓名 / 慣用手（右投／左投／雙能）/ 投球姿勢（高壓／側投／下勾）

### Step 4 · 比賽資訊
- 比賽種類 · 場地 · 日期時間 · 天氣（接 Open-Meteo 自動帶入）· 氣溫 · 風向
- 開賽前確認摘要卡
- 「開始記錄 ▶」CTA

---

## 3. 比賽中 · 記錄畫面

兩種資訊密度可切換：**A · 保守 (Conservative)** 與 **B · 進階 (Advanced)**。

> 每顆球 = 一筆記錄，同時歸屬打者與投手。
> 記錄一次，打者報告與投手報告自動更新，不需切換模式。

### 主要互動約定

| 動作 | 結果 |
|---|---|
| **點**好球帶 13 格 | 記錄此球進壘位置 |
| **長按**好球帶格子 | 彈出 **球種圓盤**（7 片） |
| **點**落點 | 記錄為當下打席結果 |
| **長按**落點 | 彈出結果選單（安打／二安／全壘打／出局…） |
| 點「擊出」 | 彈出**擊球類型**選單（滾地／平飛／高飛…） |
| 點 `⋯` | 開啟**本場操作選單** |

### 底部輸入列（新增球速欄）

記錄畫面底部固定三欄輸入：

| 欄位 | 說明 |
|---|---|
| 球種圓盤 | 長按好球帶觸發，7 片選擇 |
| 球速 | 可選填，顯示上球球速 ± 5km/h 快速調整；無測速設備可跳過 |
| 投球結果 | 好球 Looking / Swinging / 界外 / 壞球 / 觸身球 / 進場擊出 |

### 🎯 球種圓盤（7 片）

順時針方向：
1. **快速球** FB · ~145+ km/h
2. **變速球** CH · 125–135
3. **伸卡** SI · 140–145
4. **指叉** SF · 130–140
5. **曲球** CB · 115–125
6. **滑球** SL · 130–140
7. **其他** XX · 未分類，後台手動標註（卡特、噴射等）

### 本場操作選單（⋯）
- 更換代打（Pinch Hitter）
- 更換投手（Pitching Change）→ 彈出半頁 sheet 選擇替換投手，記錄前投手離場時壘上情況
- 比賽結束（End Game）

---

## 4. 比賽結束 · 結算頁面

從 ⋯ 點「比賽結束」後進入。

- 大型計分版 banner（含 FINAL 章 / 勝利反白）
- 雙隊 Tab（我方 / 對方）
- **Sub-tab：[打者統計] [投手統計]**（投手統計為新增）

### 打者統計表
欄位：AB · R · H · RBI · BB · K · AVG · OPS

點任一打者列 → 開啟該打者**今日打擊熱區**（含 3×3 zone + 落點 + PA log）

### 投手統計表（新增）
欄位：姓名 / IP / BF / NP / K / BB / H / ER / ERA / 角色（先發／中繼／終結）

點投手列 → 滑出今日投球摘要 Drawer：
```
球種分佈  FB 52%  SL 28%  CH 20%
均速      FB 148  SL 137  CH 127 km/h
空振數    14（空振率 16%）
好球率    64%
被打安打  5（3 滾地 / 1 平飛 / 1 高飛）
```

---

## 5. 球探報告（比賽列表）

> 由主控台「02 · 球探報告」進入。
> 列出已記錄比賽，點選後可重看當日數據。
> 與 4. 結算頁面共用相同元件。

---

## 6. 球員資料庫 · Player Browse

### 結構
1. **頂部姓名搜尋欄** — 全文搜尋（姓名／背號／隊伍）
2. **隊伍 Chips** — 全部 / 我方 / 各隊伍快速篩選
3. **隊伍分組列表** — 每隊一個 header（隊徽 + 名次 + 球員數）
4. **球員列** — 背號／守位／姓名／註記／本季 AVG·OPS／打席 chip／HOT 標籤

### 三種狀態

| 狀態 | 說明 |
|---|---|
| ① 全部隊伍 | 預設展開所有隊伍 roster |
| ② 搜尋中 | 輸入「陳」即時過濾 + 高亮命中字 |
| ③ 單隊聚焦 | Chips 選定某隊，其他隊隱藏 |

點任一球員 → 進入該球員球探報告。

---

## 7. 球員球探報告 · 打者版 6 大區塊

> 深色主題（`#0F141C`）長頁面，頂部頁籤快速跳段。
> `players.position ≠ 'P'` 時顯示此版本。

### 頂部
- **返回鍵** · SCOUT REPORT 標籤 · ☆ 收藏 · ⋯ 更多（含「上架至市集」）
- **球員 Header 卡** — 背號水印、姓名、守位 chip、打席 chip、隊伍、體型、賽季 AVG/OBP/SLG/OPS/HR/SB、標籤
- **頁籤** — 全部 · 九宮格 · 球種 · 左右投 · 球數 · 落點 · AI 分析

### 區塊 ① 九宮格打擊率
- 3×3 strike-zone 熱區圖
- 每格顯示 AVG + 球數
- 右側圖例：冷 / 溫 / 熱 / 燒

### 區塊 ② 對球種打擊率
- 5 條球種橫向長條（FB / SI / SL / CB / CH）
- 每條顯示 AVG 數值 + 球數 + 聯盟均值參考線（.265）
- AVG ≥ .300 為高亮色

### 區塊 ③ 對左右投打擊率
- 雙卡並排比較：vs LHP / vs RHP
- 各卡顯示大型 AVG 數字、打席數、OBP / SLG / OPS、打者剪影
- 「火燙」一側用紅色漸層強調

### 區塊 ④ 不同球數打擊率
- 12 格網格（壞球 0–3 × 好球 0–2）
- 各格顯示 AVG + 球數 + B-S 標籤
- 「3-0 送出」格為斜線紋路
- 註腳：主動出擊球數 (2-0 / 3-1) → .436

### 區塊 ⑤ 擊球落點圖
- 球場俯視圖（草地 + 內野土壤 + 壘包 + 打擊區 + 警戒區）
- 散點：一安（藍）/ 二安（綠）/ 三安（橙）/ 全壘打（紅+光暈）/ 出局（灰）
- 拉打 % 標示
- 底部圖例 + 各類擊球數統計

### 區塊 ⑥ AI 分析 ✨

組成：
1. **標題列** — 「06 · AI ANALYSIS」+ AI 徽章 + 信心度（84%）
2. **SUMMARY** — 一句話總評，帶左側漸層色條
3. **STRENGTHS** — 綠色卡，3 個 bullet
4. **WEAKNESSES** — 紅色卡，3 個 bullet
5. **GAME PLAN · 投球建議** — 深色卡，3 步流程
6. **頁尾** — 模型版本（ScoutBook AI v2.4）+ 資料量 + 「重新生成」

### 頁尾
- 上次更新時間 · 自動同步
- 「輸出 PDF」按鈕

---

## 7P. 球員球探報告 · 投手版 6 大區塊

> `players.position = 'P'`（SP / RP / CP）時自動切換此版本。
> 雙刀流球員：Header 卡顯示「打者視角 ⇄ 投手視角」Toggle。

### 投手 Header 卡

```
#18  林建宏
SP · 右投 · 高壓投法  甲組隊

ERA   IP    K    BB   WHIP  K/9  BB/9  HR/9
2.87  64.1  78   24   1.18  10.9  3.4   0.8

標籤：[速球派] [高三振] [控球穩定]
```

**投手統計欄位計算來源**：

| 欄位 | 計算來源 |
|---|---|
| ERA | `er / ip_outs × 27` |
| IP | `ip_outs / 3`，顯示 6.1 格式 |
| K | `pitches.result = 'S-S'` 且第三好球 |
| BB | `at_bats.result = 'BB'` |
| WHIP | `(H + BB) / IP` |
| K/9 | `K / IP × 9` |

**投手標籤系統**（自動生成，最多 3 個）：

| 標籤 | 觸發條件 |
|---|---|
| 速球派 | FB 使用率 ≥ 55% |
| 軟投派 | CH + CB 使用率 ≥ 50% |
| 高三振 | K/9 ≥ 9.0 |
| 控球型 | BB/9 ≤ 3.0 |
| 耐力型 | 平均每場投球數 ≥ 85 |
| 短局數 | 平均每場投球局數 ≤ 2.0 |
| 被長打弱 | HR/9 ≥ 1.5 |

### 頁籤（投手版）
```
全部 · 進壘分佈 · 球種 · 左右打 · 球數 · 被擊落點 · AI 分析
```

### 區塊 ① 進壘分佈圖
- 13 格好球帶，雙模式切換：**[投球分佈] [被打擊率]**
- 投球分佈：每格顯示投球佔比（%）+ 球數，暖色系
- 被打擊率：每格顯示 BAA + 球數，紅綠熱區

右側資訊欄：好球帶內外比 / 高低區比 / 內外角比

### 區塊 ② 球種使用分析
- 左欄：球種使用佔比甜甜圈圖（D3 donut）
- 右欄：各球種效果橫向長條（空振率 / 被打率 / 使用率 / 均速）
- 底部：各球種球速分佈 box plot

空振率 ≥ 30% 高亮綠；被打率 ≥ .280 高亮紅。

### 區塊 ③ 對左右打者成績
- 雙卡並排：vs LHB / vs RHB
- 各卡顯示：ERA / K% / BB% / BAA / 打席數
- ERA 差距 ≥ 1.00 或 BAA 差距 ≥ .050 觸發強弱標示

### 區塊 ④ 不同球數投球策略
- 12 格網格（壞球 0–3 × 好球 0–2）
- 每格顯示：最常用球種 chip + 空振率 + 滾飛比
- 底部提示打者優勢球數（2-0 / 3-1）與投手優勢球數（0-2 / 1-2）

### 區塊 ⑤ 被擊落點圖
- 球場俯視圖，散點顏色同打者版
- 右側附加：擊球類型分佈（GO/FO/LD/PU）+ 滾飛比 + 被擊方向（Pull/Center/Oppo）
- 右上角 Toggle：全部擊球 / 僅安打 / 依球種篩選

### 區塊 ⑥ AI 分析（投手版）✨

| 區塊 | 內容 |
|---|---|
| SUMMARY | 投手風格定位 |
| STRENGTHS | 武器球種 / 優勢球數 |
| WEAKNESSES | 被攻擊弱點 |
| GAME PLAN | **打擊建議**（從對手角度） |
| PITCH SEQUENCE（新增）| 建議打席策略（首打席 / 第二打席 / 第三打席）|

### P3. 投手比賽 Log（子頁）
從 Header 卡點「查看完整比賽記錄」進入。
列表欄位：日期 / 對手 / IP / NP / K / BB / H / ER / 結果
點任一場 → 進入 `/games/:id` 並展開投手統計 Tab。

---

## 8. 內容市集 · Scout Market

> 教練可將自己的球員報告公開販售。
> 資料所有權為教練個人，預設不與其他隊伍共享。
> 販售後買家限時存取，原始 `pitches` 資料永不開放。

### 8.0 市集導覽

```
[8.1] 市集首頁
    ├──▶ [8.2] 報告詳情
    │           └──▶ [8.3] 購買流程
    ├──▶ [8.4] 上架設定（從球探報告 ⋯ 選單進入）
    ├──▶ [8.5] 賣家收益儀表板
    └──▶ [8.6] 我的購買
```

---

### 8.1 市集首頁

**篩選維度**（Chip 群組，多選 AND 條件）：

| 群組 | 選項 |
|---|---|
| 守備位置 | 全部 / 投手 / 捕手 / 一壘 / 二壘 / 三壘 / 游擊 / 外野 |
| 弱點標籤 | 外角弱 / 內角弱 / 曲球差 / 變速差 / 速球弱 / 兩好球差 |
| 比賽層級 | 少棒 / 青少棒 / 高中 / 大學 / 社會 / 職棒 |
| 報告類型 | 球員報告 / 比賽報告 / 球員訂閱 |
| 價格區間 | $100 以下 / $100–300 / $300 以上 |

**Listing Card 組成**：

```
#18  SP  右投                           NEW
林 建 宏
─────────────────────────────────────────
外角低位極弱  曲球辨識差
─────────────────────────────────────────
28場・176打席・221球  📊 圖表
有效期：購買後 90 天
─────────────────────────────────────────
賣家：⭐ 4.8 · 32筆（匿名，不顯示真實姓名）
                                  $199 購買
```

---

### 8.2 報告詳情

**模糊遮罩規則**：

| 區塊 | 未購買 | 已購買 |
|---|---|---|
| SUMMARY 總評 | ✅ 完整顯示 | ✅ |
| 弱點標籤 | ✅ 完整顯示 | ✅ |
| 1 個誘餌數字 | ✅ 顯示 | ✅ |
| 九宮格 / 球種 / 落點圖 | 🔒 blur(8px) | ✅ |
| AI 完整分析 | 🔒 blur(4px) | ✅ |

底部固定 CTA bar：「$199 立即購買」

---

### 8.3 購買流程

```
① 訂單確認 Sheet → ② 付款方式 → ③ 處理中 → ④ 購買成功
```

付款方式：Apple Pay / Google Pay / 信用卡 / 點數折抵

購買成功後顯示到期日：「有效至 YYYY/MM/DD」

---

### 8.4 上架設定 Wizard（4 步驟）

**入口**：球探報告頁 ⋯ 選單 → 「上架至市集」

| 步驟 | 內容 |
|---|---|
| Step 1 · 選擇內容 | 上架對象（球員報告／比賽報告／球員訂閱）+ 開放範圍 + 有效期 |
| Step 2 · 定價 | 售價設定 + 收益預覽（你的收益 80% / 平台抽成 20%）+ 建議區間 |
| Step 3 · 預覽設定 | 一句話總評（可編輯）+ 弱點標籤（最多 3 個）+ 誘餌數字（選 1）|
| Step 4 · 確認上架 | 預覽 Listing Card + 上架注意事項 + 「確認上架」CTA |

**三種販售單位**：

| listing_type | 有效期 | 定價建議 |
|---|---|---|
| `player_report` 單一球員報告 | 90 天 | $99–299 |
| `game_report` 單場比賽報告 | 90 天 | $199–499 |
| `player_sub` 球員訂閱（含未來更新）| 180 天，可續訂 | $399–799 |

---

### 8.5 賣家收益儀表板

- 本月總收益大型數字 + 較上月比較
- 待結算 / 已結算 / 結算週期（每月 15 日）
- 我的上架報告列表（售出次數 / 被查看次數 / 收益 / 上架狀態）
- 買家評價（平均分 + 最新 3 則）

---

### 8.6 我的購買

三個 Tab：有效中 / 即將到期 / 已到期

**有效期提醒規則**：

| 剩餘天數 | 顯示 |
|---|---|
| > 30 天 | 正常顯示到期日 |
| 8–30 天 | 橙色警示「剩 N 天」 |
| 1–7 天 | 紅色警示 ⚠️ + 推播通知 |
| 0 天 | 移入「已到期」，顯示「重新購買」 |

---

## 💰 獲利模式

### SaaS 訂閱（基礎收入）

| 方案 | 月費 | 內容 |
|---|---|---|
| **Free** | $0 | 3場/月、無AI分析、不可上架 |
| **Coach** | $299 | 無限場次、AI報告20次/月、可上架販售 |
| **Club** | $999 | 5席位起、多隊管理、無限AI、組織內資料共享 |

**Club 方案核心差異**：組織協作（多席位）、跨隊球員追蹤、管理者儀表板、聯盟授權橋接。超過 5 席每席 +$149/月。

### 市集交易抽成（成長收入）

每筆交易平台抽 20%，賣家得 80%。賣家最佳策略：勤於記錄 → 上架報告 → 市集收益抵消訂閱費。

### 附加收費

| 項目 | 費用 |
|---|---|
| AI 報告加購 | $99 / 10次 |
| PDF 精美匯出 | $49 / 份（Coach 方案內含）|
| 市集置頂推廣 | $149 / 7天 |
| 聯盟授權 | 年費制，議價 |

---

## Web 端頁面規格

> 定位：瀏覽／分析／市集為主，不做現場記錄。
> 最小支援寬度：768px。

### 響應式斷點

| 斷點 | 寬度 | 佈局 |
|---|---|---|
| `mobile` | < 768px | 單欄，同 App |
| `tablet` | 768–1279px | 二欄，側欄可收合 |
| `desktop` | 1280–1919px | 三欄完整 |
| `wide` | ≥ 1920px | 三欄，最大寬 1440px 置中 |

### W0. 登入頁 `/`
左半球場夜景插圖 + 右半登入表單。額外提供「記住此裝置 30 天」。

### W1. 主控台 `/dashboard`
三欄 Grid（左側欄 160px + 中央 flex-grow + 右側欄 280px）。
中央：季度戰績 Banner + 8 週趨勢折線圖 + 球員狀態提醒。

### W2. 比賽列表 `/games`
Table 欄位：日期 / 主客場 / 對手 / 比分 / 勝負 / 先發投手 / 記錄者 / 動作。

### W3. 單場比賽結算 `/games/:id`
計分版 Banner + 打者統計 / 投手統計 Sub-tab + 右側 Drawer（寬 360px）+ 下載 CSV。

### W4. 球員資料庫 `/players`
左側隊伍篩選欄 + 右側 Table。點球員列 → 右側 Drawer 滑入摘要（寬 40%，最大 480px）。
底部浮現對比列（最多選 2 人）→ 跳至 `/players/compare`。

### W5. 球員球探報告 `/players/:id`
左側 TOC + 右側捲動內容。
Web 專屬：時間範圍切換（近5/10場/本季/自訂）/ hover tooltip / 分享連結 / 匯出 PDF。
九宮格點格 → 右側滑出 PA log；落點圖 Toggle：單場 ⇄ 全季疊加。

### W6. 球員對比頁 `/players/compare`
URL：`/players/compare?a=uuid&b=uuid`。左右並排各球員的六大區塊圖表，底部 AI 綜合對比分析。

### W7. 內容市集 `/market`（Web 版）
左側篩選側欄（Accordion 多選）+ 右側 3 欄 Grid（tablet 降為 2 欄）。

### W8. 報告詳情 `/market/:listingId`（Web 版）
左側 TOC + 中央內容 + 右側 sticky 購買卡（`position: sticky`）。768px 以下購買卡移至底部 CTA bar。

### W9. 我的購買 `/purchases`
Table 欄位：名稱 / 類型 / 到期日 / 動作（查看 / 續訂 / 重新購買）。

### W10. 賣家收益儀表板 `/earnings`（Web 版）
左側欄 + 中央收益總覽（折線圖 + 明細 Table）+ 右側上架報告列表。支援匯出明細 CSV。

### W11. 名單管理 `/settings/roster`
CSV 匯入五步驟流程：下載範本 → 拖曳上傳 → 欄位對應 → 重複偵測 → 預覽確認。

### W12. 訂閱管理 `/settings/subscription`
目前方案卡（含 AI 報告用量）+ 三方案比較表 + 升級 / 取消訂閱 CTA。

---

## 🎨 設計系統

### 字型

| Token | 字型 | 用途 |
|---|---|---|
| `--f-display` | Oswald + Noto Sans TC | 數字、標題、Logo、英文標籤 |
| `--f-body` | Noto Sans TC | 一般中文文字 |
| `--f-mono` | JetBrains Mono | 等寬數字（保留）|

Web 額外載入：
```css
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600&family=Noto+Sans+TC:wght@400;500&display=swap');
```

### 色票

| Token | 色號 | 用途 |
|---|---|---|
| `--paper` | `#F4ECDA` | 主背景（紙感）|
| `--ink` | `#1B2230` | 主文字色 / 深底 |
| `--chalk` | `#FBF7EE` | 卡片底色 / 球縫線 |
| `--clay` | `#B97744` | 內野土壤（強調色）|
| `--clay-deep` | `#8E5832` | 強調色加深 |
| `--clay-soft` | `#D69869` | 強調色淺版 |
| `--grass` | `#4D7B3A` | 草地 |
| `--strike` | `#2F7D4F` | 好球綠 |
| `--ball` | `#C24C2F` | 壞球紅 / HR |
| `--warn` | `#C7912A` | 界外 / HBP |

### 球種色票（全站統一）

| 球種 | Token | 色號 |
|---|---|---|
| FB 快速球 | `--pitch-fb` | `#B97744` |
| SI 伸卡 | `--pitch-si` | `#D69869` |
| SL 滑球 | `--pitch-sl` | `#5B8CDB` |
| CB 曲球 | `--pitch-cb` | `#7B5EA7` |
| CH 變速 | `--pitch-ch` | `#4D7B3A` |
| SF 指叉 | `--pitch-sf` | `#C4A35A` |
| XX 其他 | `--pitch-xx` | `#888888` |

### 數值警示色規則（全站統一）

| 情況 | 顏色 |
|---|---|
| 正面數據（空振率高、BAA 低）| `--strike` 綠 |
| 危險數據（BAA 高、ERA 高、打者 AVG 低區）| `--ball` 紅 |
| 聯盟均值參考線 | `--warn` 橙色虛線 |

### 設計約定
- 深色頁面（球探報告、結算）= `#0F141C` 球場夜色
- 淺色頁面（主控台、Wizard、瀏覽）= `var(--paper)` 紙感
- 大數字一律用 Oswald + `font-variant-numeric: tabular-nums`
- 卡片：圓角 12–16px、`var(--shadow-sm)` 或 `--shadow-md`
- 強調動作（CTA）：深底 `--ink` 或 `--clay-deep`，文字 `#F4ECDA`

### 圖表函式庫分工（Web）

| 圖表類型 | 函式庫 |
|---|---|
| 折線圖（趨勢）| Recharts `LineChart` |
| 長條圖（球種）| Recharts `BarChart` |
| 九宮格熱區 | D3 + SVG |
| 落點散點圖 | D3 `scatterplot` |
| 球速 box plot | D3 |
| 球種佔比 | D3 donut chart |

---

## 🗃️ 資料庫 Schema 摘要

### 核心設計原則

**一顆球 = 一筆 `pitches` 記錄，雙向查詢**：
```
pitches.pitcher_id → 投手統計
pitches.batter_id  → 打者統計
```

**資料所有權**：`players.owner_id → users`（教練個人所有），`team_id` 僅為分類標籤。

### 主要資料表

| 表名 | 說明 |
|---|---|
| `users` | Google SSO 登入，role: coach / scout |
| `teams` | 隊伍，level 控制打序建議人數 |
| `team_members` | 多對多，支援教練跨隊 |
| `players` | 掛在 owner_id（教練）下，visibility: private / for_sale |
| `games` | 比賽記錄，recorded_by 追蹤記錄者 |
| `game_lineups` | 每場出賽名單快照 |
| `at_bats` | 每個打席一筆，runners 用 3 bit 字串 |
| `pitches` | 每顆球一筆，含 zone_id / pitch_type / pitch_speed / batted_x / batted_y |
| `player_season_stats` | 預計算彙總，投打兩用 |
| `ai_reports` | AI 結果快取，jsonb 儲存 strengths / weaknesses / game_plan |
| `scout_listings` | 上架清單，listing_type: player_report / game_report / player_sub |
| `scout_purchases` | 購買記錄，expires_at 控制限時存取，is_active generated column |
| `platform_revenue` | 平台抽成記錄，20% 抽成 |
| `report_access_log` | 存取稽核，提供賣家查看次數 |
| `subscription_notices` | 訂閱到期提醒（7天前 / 1天前 / 到期） |

### 關鍵索引

```sql
CREATE INDEX idx_pitches_pitcher ON pitches(pitcher_id, created_at);
CREATE INDEX idx_pitches_batter  ON pitches(batter_id, created_at);
CREATE INDEX idx_at_bats_game    ON at_bats(game_id, inning, half);
CREATE INDEX idx_ai_reports_player ON ai_reports(player_id, scope, generated_at DESC);
CREATE INDEX idx_purchases_active  ON scout_purchases(buyer_id, is_active, expires_at);
```

---

## 🧩 完整元件清單

### App 元件

```
Baseball Scout.html         主入口
styles.css                  設計 tokens + 球種色票

auth-screens.jsx            0. 登入頁
dashboard.jsx               1. 主控台
players-browse.jsx          6. 球員資料庫
scout-shell.jsx             7. 球探報告 shell（打者版）
scout-charts.jsx            7. 打者版 6 大區塊
scout-report.jsx            7. 報告組合元件

pitcher-report-shell.jsx    7P. 投手版球探報告 Shell
pitch-zone-chart.jsx        7P. 區塊① 進壘分佈圖（雙模式）
pitch-type-analysis.jsx     7P. 區塊② 球種使用分析
pitch-speed-boxplot.jsx     7P. 區塊② 球速分佈 box plot
pitcher-vs-handedness.jsx   7P. 區塊③ 對左右打者
pitch-count-grid.jsx        7P. 區塊④ 球數投球策略
batted-ball-pitcher.jsx     7P. 區塊⑤ 被擊落點圖
ai-analysis-pitcher.jsx     7P. 區塊⑥ AI 分析（投手版）
pitcher-game-log.jsx        7P. 投手比賽 Log
pitcher-stats-drawer.jsx    7P. 今日投球摘要 Drawer
handedness-toggle.jsx       7P. 雙刀流視角切換 Toggle

setup-screens.jsx           2. Setup Wizard
add-batter.jsx              2. 新增打者全頁
record-screens.jsx          3. 記錄畫面 A / B
pitch-wheel.jsx             3. 球種圓盤（7 片）
pitch-speed-input.jsx       3. 球速輸入元件
batted-ball-sheet.jsx       3. 擊球類型選單
field-map.jsx               3. 落點地圖
strike-zone.jsx             3. 13 格好球帶
game-menu.jsx               3. ⋯ 操作選單

stats-screen.jsx            4. 比賽結算
pitcher-stats-tab.jsx       4. 投手統計 Sub-tab
player-heat.jsx             4. 打擊熱區

market-home.jsx             8.1 市集首頁
listing-detail.jsx          8.2 報告詳情（含模糊遮罩）
purchase-flow.jsx           8.3 購買流程 Sheet
list-wizard.jsx             8.4 上架設定 Wizard
earnings-screen.jsx         8.5 賣家收益儀表板
my-purchases.jsx            8.6 我的購買
listing-card.jsx            共用：市集列表卡片
blur-gate.jsx               共用：模糊遮罩解鎖元件
price-input.jsx             共用：定價輸入 + 收益預覽

ui-atoms.jsx                共用：Stepper / Input / Segmented / StepNav…
ios-frame.jsx               iOS 26 裝置外框
design-canvas.jsx           Hi-fi 多 artboard 畫布
app.jsx                     主畫布組裝
```

### Web 元件

```
web-layout.tsx              全站 Nav Bar + 左側欄 + 主區容器
web-sidebar.tsx             左側導覽欄
dashboard-web.tsx           W1 主控台
games-list.tsx              W2 比賽列表 Table
game-detail-web.tsx         W3 單場結算
players-browse-web.tsx      W4 球員資料庫
scout-report-web.tsx        W5 球探報告 Web 版
player-compare.tsx          W6 球員對比頁
market-web.tsx              W7 市集首頁
listing-detail-web.tsx      W8 報告詳情（sticky 購買卡）
purchases-web.tsx           W9 我的購買
earnings-web.tsx            W10 收益儀表板
roster-import.tsx           W11 CSV 匯入流程
subscription-settings.tsx   W12 訂閱管理
player-drawer.tsx           共用：球員側邊 Drawer
sticky-purchase-card.tsx    共用：市集 sticky 購買卡
time-range-selector.tsx     共用：時間範圍切換元件
```

---

*Last updated: 2026/05/17*

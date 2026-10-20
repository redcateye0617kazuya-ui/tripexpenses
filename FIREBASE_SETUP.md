# Firebase 設定（登入 + 私人行程）

依家每個 trip 只有被加入嘅 email 先睇到。要喺 Firebase console 做以下設定，**要跟次序做**。

## 1. 開 Google 登入
1. 去 https://console.firebase.google.com → 揀 `trip-planner-813fe`
2. 左邊 **Build → Authentication** → 撳 **Get started**
3. **Sign-in method** → 揀 **Google** → 開 **Enable** → 揀 support email → **Save**
4. **Settings → Authorized domains** → **Add domain** → 加你開呢個網嘅 domain
   （例如 GitHub Pages 就係 `redcateye0617kazuya-ui.github.io`）

## 2. Merge PR，打開個網
1. 用 Google 登入
2. 撳 **IMPORT TRIPS FROM THE OLD VERSION**，將舊資料搬入你個帳戶（**一個人做一次就夠**）
3. 每個 trip 撳 **👥 Share**，加朋友嘅 Gmail
4. 叫朋友用嗰個 Gmail 登入，確認佢哋睇到啱嘅 trip

## 3. 鎖住資料庫（最重要）
1. **Build → Realtime Database → Rules**
2. 將 `database.rules.json` 成個檔嘅內容貼入去，撳 **Publish**

未做呢步之前，資料庫仍然同以前一樣係公開嘅。

## 4. （確認冇問題之後）刪除舊資料
**Realtime Database → Data** → 喺 `tripLedgerData` 撳 **⋮ → Delete**。
未刪之前，任何用 Google 登入嘅人都仲讀到舊資料（為咗畀你 import）。

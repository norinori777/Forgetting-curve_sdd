# Quickstart: ヘッダーメニュー（タイトル左寄せ + デザイン画像指定）

**Feature**: [spec.md](./spec.md)

## Prerequisites

- Node.js（本リポジトリ既定の開発環境）
- 依存関係が `npm install` 済み

## Run (Frontend)

- リポジトリルートで `npm --prefix frontend run dev`
- 表示されたURL（例: `http://localhost:5173`）をブラウザで開く

## Build (Frontend)

- リポジトリルートで `npm --prefix frontend run build`

## Manual Checks (Acceptance)

### 常時表示

- 主要ページ（少なくとも `/review`, `/stats`, `/presets` を含む）を開き、常にヘッダーが表示されること

### 左端ブランド

- 左端に `FC` と `Forgetting-curve` が表示されること
- 左端の `FC` / `Forgetting-curve` をクリックしても画面遷移しないこと

### メニュー遷移とアクティブ

- 「復習」「集計」「設定（プリセット）」をクリックし、1回の操作で該当画面へ遷移できること
- 現在ページのメニュー項目がアクティブ表示で判別できること

### レスポンシブ（代表条件）

- 表示幅 1280px 程度: メニュー3項目が横並び・等間隔であること
- 表示幅 375px 程度: 2段表示になり、
  - 1段目に左端ブランド（`FC` + `Forgetting-curve`）
  - 2段目にメニュー3項目
  が表示され、メニューが欠落せず操作可能であること

## Reference

- デザイン参照画像: [header.png](./header.png)

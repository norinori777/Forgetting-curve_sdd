# Quickstart: ヘッダーメニュー追加

## 前提

- Node.js が利用できること

## 起動

リポジトリルート（`C:\work\Forgetting-curve_sdd\Forgetting_curve`）で実行:

1. `npm --prefix shared run build`
2. `npm --prefix frontend run dev`

ブラウザで Vite の表示URL（通常 `http://localhost:5173`）を開く。

## 動作確認（手動）

- 全画面（全ルート）でヘッダーメニューが表示される
- メニュー順が `復習 → 集計 → 設定（プリセット）`
- 各メニューをクリックすると対応ページへ遷移し、該当メニューがアクティブ表示になる
- 画面幅を狭くすると2段に折り返す（1段目メニュー / 2段目アイコン+アプリ名）
- デスクトップ相当幅で、メニューが等間隔に見える
- アイコンが出ないケースでも、アプリ名とメニュー操作が維持される

## ビルド

- `npm --prefix frontend run build`

# Quickstart: ヘッダーメニュー（文字列化 + 学習項目追加）

## 前提

- Node.js が利用可能であること

## 手順（開発）

1) 依存関係のインストール（未実施の場合）
- リポジトリルートで `npm install`

2) フロント起動
- `npm --prefix shared run build`
- `npm --prefix frontend run dev`

3) 手動確認（受け入れ）

- 任意ページでヘッダーに 4 項目が表示される: 「学習項目」「復習」「集計」「設定（プリセット）」
- クリックでそれぞれ遷移できる
  - 学習項目 → `/`
  - 復習 → `/review`
  - 集計 → `/stats`
  - 設定（プリセット） → `/presets`
- 見た目
  - 背景/枠/角丸がなく、ボタン形状に見えない
  - hover は文字色変化のみ
  - active は太字のみ
- 狭幅でも 4 項目が欠落しない（折り返しは許容）

## ビルド

- `npm --prefix shared run build`
- `npm --prefix frontend run build`

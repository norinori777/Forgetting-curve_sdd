# UI Contract: Header Menu (Text-only)

## Scope

この契約は、全ルート常設のヘッダーメニュー表示と、項目/順序/遷移先/状態表現を定義する。

## Menu Items

表示順（固定）:
1. 学習項目
2. 復習
3. 集計
4. 設定（プリセット）

遷移先:
- 学習項目 → `/`
- 復習 → `/review`
- 集計 → `/stats`
- 設定（プリセット） → `/presets`

## Visual Rules

- 各項目は「文字列」として表示する
  - 背景塗り、枠線、角丸などのボタン様表現を使用しない
- hover: 文字色の変化のみ
- active: 太字のみ

## Responsive Rules

- 狭い画面でも 4 項目が欠落しないこと（折り返しは許容）

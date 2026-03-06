# Data Model: ヘッダーメニュー（文字列化 + 学習項目追加）

この機能は UI ナビゲーションの変更であり、DB/Prisma スキーマや API コントラクトの変更はありません。

## UI Data Structures

### MenuItem
- Fields:
  - `label: string` — 表示文言（例: 「学習項目」）
  - `to: string` — 遷移先パス（例: `/review`）

## Menu Items (contracted)

順序は以下で固定:
1. 学習項目 → `/`
2. 復習 → `/review`
3. 集計 → `/stats`
4. 設定（プリセット） → `/presets`

## Validation Rules

- 常に 4 項目が表示されること
- 狭い画面で折り返しても欠落しないこと
- active は太字のみで判別できること
- hover は文字色変化のみであること

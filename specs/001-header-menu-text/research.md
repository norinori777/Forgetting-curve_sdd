# Research: ヘッダーメニュー（文字列化 + 学習項目追加）

## Decisions

### 1) メニューの見た目（文字列のみ）
- Decision: hover は文字色の変化のみ、active は太字のみ（下線/背景/枠/角丸は使用しない）
- Rationale: 「ボタンに見えない」ことを仕様として担保しつつ、現在地の判別を最小の視覚差分で実現できる
- Alternatives considered:
  - 太字+下線: 強調は強いが、下線が不要という判断
  - 文字色のみでactive表現: 判別性が弱くなる可能性

### 2) 「学習項目」の遷移先
- Decision: 「学習項目」は `/`（トップ/ItemsPage）へ遷移
- Rationale: 既存ルーティング（index ルート）をそのまま使え、最小変更で導線追加できる
- Alternatives considered:
  - `/items` を新設: ルート追加が必要になりスコープが増える
  - 表示のみ: FR-004（1回操作で遷移）に反する

### 3) 「設定」ラベル
- Decision: 表示文言は「設定（プリセット）」
- Rationale: 機能の指し示し（プリセット管理）を誤解なく伝えられる
- Alternatives considered:
  - 「設定」: 意味が広くなりやすい
  - 「プリセット」: 設定メニューという意図が薄れる

## Implementation Notes

- `frontend/src/uiParts/AppHeader.tsx` のメニューを `NavLink` のまま維持し、既存のボタン系クラス（例: `app-button-*`）を除去してテキスト用ユーティリティに置き換える。
- メニュー順: 学習項目 → 復習 → 集計 → 設定（プリセット）。
- 狭幅では折り返しを許容し、欠落しないことを優先する。

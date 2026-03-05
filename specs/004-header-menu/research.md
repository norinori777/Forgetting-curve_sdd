# Research: ヘッダーメニュー追加

## 背景

本リポジトリのフロントエンドは React + React Router（`createBrowserRouter`）でページ遷移を管理し、スタイルは Tailwind（`index.css` の `app-*` クラス群）で統一されている。
本機能は「全画面に常時表示されるヘッダーメニュー」を追加し、3ページ（復習/集計/設定(プリセット)）への導線を固定化する。

## 決定事項

### 1) ヘッダーの適用方法
- Decision: ルーティングにレイアウト（共通ラッパー）を導入し、その中でヘッダーを1回だけ描画する
- Rationale: すべてのルートで常時表示（FR-001）を担保しやすく、ページごとの重複実装を避けられる
- Alternatives considered:
  - 各ページコンポーネントにヘッダーを個別実装：重複が増え、修正漏れが起きやすい

### 2) アクティブ表示（現在ページの強調）
- Decision: React Router の `NavLink` を利用し、アクティブ状態をスタイルに反映する
- Rationale: ルート判定とUI状態が一体で管理でき、仕様（FR-009/SC-005）を満たしやすい
- Alternatives considered:
  - `useLocation` で手動判定：分岐が増えやすい

### 3) レスポンシブ（狭い画面では2段）
- Decision: Tailwind のレスポンシブユーティリティで、狭幅は縦積み（2段）、広幅は横並び（1段）を切り替える
- Rationale: 追加依存なく実現でき、仕様で確定した挙動（FR-008）を明確に実装できる
- Alternatives considered:
  - ハンバーガー等に折りたたむ：Clarifications で不採用
  - 横スクロール：Clarifications で不採用

### 4) 横並びメニューの「等間隔」
- Decision: メニュー領域を `justify-evenly` 相当の分布で配置し、隣接間隔が等しい状態を作る
- Rationale: 仕様の可測要件（±2px）に対して、CSSの分配アルゴリズムに寄せる方が安定する
- Alternatives considered:
  - 固定 `gap`：コンテナ幅により「等間隔」ではなくなりやすい

### 5) 右端アイコンの扱い（資産が無い前提）
- Decision: 画像ファイルを追加せず、文字モノグラム（例: “FC”）を角丸の枠内に表示して「アイコン」とみなす
- Rationale: 既存リポジトリに画像資産が存在せず、外部依存や新規アセット追加を避けつつ要件（FR-002）を満たす
- Alternatives considered:
  - SVG/PNG を新規追加：デザイン資産の追加が必要

## 影響範囲（想定）

- フロントエンドルーティング（レイアウト導入）
- 共通UI（ヘッダー部品の追加）

## 未解決事項

- なし（Clarifications は spec に反映済み）

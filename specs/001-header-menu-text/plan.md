# Implementation Plan: ヘッダーメニュー（文字列化 + 学習項目追加）

**Branch**: `001-header-menu-text` | **Date**: 2026-03-06 | **Spec**: ./spec.md
**Input**: Feature specification from `/specs/001-header-menu-text/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

- ヘッダーのメニューを「文字列のみ」の見た目に変更し、項目を 4 つ（学習項目/復習/集計/設定（プリセット））に統一する。
- 並び順は「学習項目 → 復習 → 集計 → 設定（プリセット）」とし、各項目は 1 回の操作で該当画面に遷移する。
- 実装は `frontend/src/uiParts/AppHeader.tsx` の `NavLink` スタイルをボタン系クラスからテキスト用ユーティリティへ置き換える。

Related research: ./research.md

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x（frontend/backend/shared）  
**Primary Dependencies**: React 18.3, react-router-dom 6.28, Vite 5.4, Tailwind CSS 3.4  
**Storage**: N/A（本featureはフロントのナビ表示変更のみ）  
**Testing**: 自動テスト基盤は未整備（package scripts に test が無い）。`npm --prefix frontend run build` と手動受け入れで検証  
**Target Platform**: Web（ブラウザ）
**Project Type**: モノレポ構成の Web アプリ（backend: Express / frontend: Vite React / shared: TS library）  
**Performance Goals**: N/A（軽量な静的ナビの変更）  
**Constraints**: 仕様どおり「文字列のみ」（背景/枠/角丸なし）、hover は文字色のみ、active は太字のみ。狭幅でも 4 項目欠落なし（折り返し許容）  
**Scale/Scope**: 既存 4 ルート（`/`, `/review`, `/stats`, `/presets`）に対するヘッダー UI のみ

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- ✅ I. 仕様駆動（Spec-First）: ./spec.md が受け入れ条件まで確定済み（Clarifications 反映済み）
- ✅ II. 独立テスト: P1 で 4 画面遷移を単独検証可能
- ✅ III. MVP優先: P1→P2→P3 の優先度が明記され、段階的に検証可能
- ✅ IV. トレーサビリティ: spec → research → plan → tasks → 実装の流れを維持
- ✅ V. シンプルさ: 既存 `NavLink` を活かしたスタイル変更で完結（新規ページ/新規APIなし）

**Re-check (post Phase 1 design)**: ✅ PASS（research/data-model/contracts/quickstart が揃い、追加の複雑性なし）

## Project Structure

### Documentation (this feature)

```text
specs/001-header-menu-text/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── ui.md
├── checklists/
│   └── requirements.md
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
backend/
├── prisma/
└── src/
  ├── api/
  ├── config/
  ├── db/
  ├── lib/
  └── services/

frontend/
└── src/
  ├── pages/
  │   ├── AppLayout.tsx
  │   └── routes.tsx
  ├── uiParts/
  │   └── AppHeader.tsx
  ├── uniqueParts/
  ├── services/
  └── domain/

shared/
└── src/

specs/
└── 001-header-menu-text/
```

**Structure Decision**: モノレポの Web アプリ構成（backend/frontend/shared）を採用しており、本featureは `frontend/src/uiParts/AppHeader.tsx` を中心に UI のみ変更する。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

N/A（Constitution Check に違反なし）

## Execution Plan

### Phase 0: Research

- Clarifications の確定事項（hover/active、遷移先、文言）を「決定」として記録する
- 実装で禁止する見た目（背景/枠/角丸/下線）を明文化し、レビュー観点を固定する

**Output**: ./research.md

### Phase 1: Design & Contracts

- データモデル変更が無いことを明文化する
- ヘッダーUIの契約（項目/順序/遷移先/状態表現/レスポンシブ）を固定する
- 手動検証手順を quickstart にまとめる

**Outputs**:
- ./data-model.md
- ./contracts/ui.md
- ./quickstart.md

### Phase 2: Task Planning (for `/speckit.tasks`)

`tasks.md` は本 plan を根拠に `/speckit.tasks` で作成する（本コマンドでは生成しない）。

タスク分解の指針:

- `frontend/src/uiParts/AppHeader.tsx` のメニュー項目を 4 つにし、順序/文言/遷移先を更新
- ボタン系クラス（例: `app-button-*`）を除去し、「文字列のみ」ルール（hover=文字色のみ、active=太字のみ）に置き換え
- 狭幅でも欠落しない（折り返し許容）レイアウトを維持/確認
- ビルド確認（`npm --prefix frontend run build`）
- quickstart に基づく手動確認

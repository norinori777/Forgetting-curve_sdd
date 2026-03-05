# Implementation Plan: ヘッダーメニュー（タイトル左寄せ + デザイン画像指定）

**Branch**: `005-header-menu-design` | **Date**: 2026-03-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-header-menu-design/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

- ヘッダー左端に「FC + Forgetting-curve」を表示し、右端のブランド表示を廃止する。
- 参照画像を判断基準としつつ、Clarifications を優先してレイアウト/挙動を確定する。
- 既存の共通ヘッダー実装を更新し、全ルート常設・メニュー遷移・アクティブ表示・狭幅2段表示を満たす。

関連: [research.md](./research.md)

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: React 18.3, react-router-dom 6.28, Vite 5.4, Tailwind CSS 3.4（frontend） / Express 4.19, Prisma 5.20（backend）  
**Storage**: PostgreSQL（Prisma）  
**Testing**: 自動テスト基盤なし（現状は手動確認 + `npm --prefix frontend run build`）  
**Target Platform**: ブラウザ（SPA） + Node.js（API）
**Project Type**: Web application（frontend + backend + shared）  
**Performance Goals**: N/A（本featureはヘッダーUI変更）  
**Constraints**: 既存デザイン/依存関係を維持し、追加のページ/機能を増やさない（参照画像 + spec 準拠）  
**Scale/Scope**: 既存ヘッダーのデザイン・文言・レスポンシブの更新（データモデル変更なし）

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- ✅ I. 仕様駆動（Spec-First）: [spec.md](./spec.md) が受け入れ条件まで確定済み
- ✅ II. 独立テスト: 各User StoryにIndependent Test/Acceptance Scenariosあり
- ✅ III. MVP優先: P1→P2→P3 の優先度が明記され、検証可能
- ✅ IV. トレーサビリティ: 本 plan は spec/research/contract/quickstart を参照し、後続 tasks へ接続可能
- ✅ V. シンプルさ: 既存ヘッダーの更新で対応（新規抽象化/新規依存追加なし）

**Re-check (post Phase 1 design)**: ✅ PASS（research/data-model/contracts/quickstart が揃い、追加の複雑性なし）

## Project Structure

### Documentation (this feature)

```text
specs/005-header-menu-design/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── ui.md
├── checklists/
│   └── requirements.md
├── header.png
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
  ├── uiParts/
  ├── uniqueParts/
  ├── services/
  └── domain/

shared/
└── src/

specs/
└── 005-header-menu-design/
```

**Structure Decision**: Web application 構成（`frontend/` の共通ヘッダーを更新）。

## Complexity Tracking

N/A（憲法チェックの違反なし）

## Execution Plan

### Phase 0: Research

- 参照画像と spec の矛盾がないかを整理し、仕様上の判断基準を固定する
- 決定事項（右端空/タイトル文言/アイコン/クリック挙動/狭幅段構成）を記録する

**Output**: [research.md](./research.md)

### Phase 1: Design & Contracts

- データモデル変更が無いことを明文化する
- ヘッダーUIの契約（表示/振る舞い/レスポンシブ/フォールバック）を固定する
- 手動検証手順を quickstart にまとめる

**Outputs**:
- [data-model.md](./data-model.md)
- [contracts/ui.md](./contracts/ui.md)
- [quickstart.md](./quickstart.md)

### Phase 2: Task Planning (for `/speckit.tasks`)

`tasks.md` は本 plan を根拠に `/speckit.tasks` で作成する（本コマンドでは生成しない）。

タスク分解の指針:

- `frontend/src/uiParts/AppHeader.tsx` のレイアウト/文言/右端空/狭幅2段の更新
- 既存の共通表示（レイアウト/ルーティング）が維持されていることの確認
- ビルド確認（`npm --prefix frontend run build`）
- quickstart に基づく手動確認

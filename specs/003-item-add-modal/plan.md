# Implementation Plan: 学習項目追加モーダル化

**Branch**: `003-item-add-modal` | **Date**: 2026-03-02 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-item-add-modal/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

学習項目の追加UIを「ページ内の常設フォーム」から「一覧右上の『新規』ボタンで開くモーダル」へ変更する。
モーダル下部に「キャンセル」「追加」ボタンを配置し、キャンセル/背景クリック/ESC で閉じる場合は入力をクリアする。
実装は依存追加なしで最小のモーダルコンポーネントを用意し、既存 `ItemForm` を流用して表示場所のみを移す（詳細: [research.md](./research.md)）。

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript（frontend: React + Vite）  
**Primary Dependencies**: React, Vite, Tailwind CSS, @tanstack/react-query, react-hook-form, zod  
**Storage**: N/A（本featureはフロントの表示/導線変更のみ）  
**Testing**: 自動テストは必須要件に含まれない（検証は quickstart の手動チェックで担保）  
**Target Platform**: Web browser（ローカル開発サーバで検証）
**Project Type**: Web application（frontend + backend + shared）  
**Performance Goals**: N/A（通常操作で体感遅延が増えないこと）  
**Constraints**: 依存追加を最小化し、既存の追加処理/一覧挙動を変えない（FR-009）  
**Scale/Scope**: 学習項目ページ（Items）に対する追加導線の変更

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

以下の憲法ゲートを満たすこと。

- Spec-First: `spec.md` が曖昧でない状態で計画化する（PASS）
- 独立テスト: US1/US2 に Independent Test があり単独検証可能（PASS）
- MVP優先: P1（US1）で価値が成立し、P2は追加体験改善（PASS）
- トレーサビリティ: plan → tasks → 実装で参照関係を維持（PASS）
- シンプルさ: 依存追加なし・最小のUI変更（PASS）

再チェック: Phase 1 の設計（contracts/quickstart/data-model）生成後も PASS を維持する（PASS）。

## Project Structure

### Documentation (this feature)

```text
specs/003-item-add-modal/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
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
├── src/
│   ├── models/
│   ├── services/
│   └── api/

frontend/
├── src/
│   ├── pages/
│   ├── uniqueParts/
│   └── services/

shared/
└── src/

specs/
└── 003-item-add-modal/
```

**Structure Decision**: Web application（`frontend/` + `backend/` + `shared/`）の既存構造を維持し、変更は主に `frontend/src/pages/ItemsPage.tsx` とモーダル/共通UI部品（必要なら `frontend/src/uiParts/`）に限定する。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

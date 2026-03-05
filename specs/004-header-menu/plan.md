# Implementation Plan: ヘッダーメニュー追加

**Branch**: `004-header-menu` | **Date**: 2026-03-03 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/004-header-menu/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

全画面に常時表示されるヘッダーメニューを追加し、「復習」「集計」「設定（プリセット）」へ1操作で遷移できるようにする。
ヘッダー右端にアイコンとアプリ名を表示し、現在ページはアクティブ表示で判別可能にする。
狭い画面では2段に折り返し（1段目=メニュー、2段目=アイコン+アプリ名）、デスクトップ相当幅ではメニューを等間隔で横並びにする。

技術方針の根拠は [research.md](research.md) を参照。

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x（frontend/backend ともに `type: module`）  
**Primary Dependencies**: React 18.3, react-router-dom 6.28, @tanstack/react-query 5.66, Tailwind CSS 3.4, axios, zod, react-hook-form  
**Storage**: N/A（UIナビゲーション追加のみ。DB/API変更なし）  
**Testing**: N/A（現状、frontend/backend ともに自動テストランナーのスクリプトが未整備）  
**Target Platform**: ブラウザ（Viteで提供されるSPA）
**Project Type**: Web application（workspaces: `backend/`, `frontend/`, `shared/`）  
**Performance Goals**: 体感遅延のない画面遷移/ヘッダー描画（追加DOMは最小）  
**Constraints**: 仕様どおりのUXのみ実装、既存Tailwindトークンを優先（新しい色・テーマは追加しない）、追加依存は原則不要  
**Scale/Scope**: 既存ルート（`/`, `/review`, `/stats`, `/presets`）に対する共通ヘッダー追加

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Spec-First: **PASS**（[spec.md](spec.md) に要件・受け入れ条件・Clarifications が確定済み）
- 独立テスト可能: **PASS**（P1 はヘッダーからの遷移とアクティブ表示で単独検証可能）
- MVP優先: **PASS**（P1=遷移、P2=右端表示、P3=等間隔/見た目）
- トレーサビリティ: **PASS**（本 plan は spec と research を参照し、成果物を同ディレクトリに配置）
- シンプルさ: **PASS**（追加レイヤ/新規プロジェクトなし。共通レイアウト導入で重複を減らす）

Re-check after Phase 1 design: **PASS**（[research.md](research.md), [data-model.md](data-model.md), [contracts/ui.md](contracts/ui.md), [quickstart.md](quickstart.md) を生成済み）

## Project Structure

### Documentation (this feature)

```text
specs/004-header-menu/
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

shared/
└── src/

frontend/
├── src/
│   ├── pages/
│   ├── uiParts/
│   └── services/
```

**Structure Decision**: Web application 構成を採用し、変更は主に `frontend/src/` に閉じる（backend/shared は変更なし想定）。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

憲法チェックに抵触する複雑性は発生していないため、このセクションは該当なし。

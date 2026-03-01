# Implementation Plan: パステルテーマ適用（MUI不使用）

**Branch**: `002-mui-pastel-theme` | **Date**: 2026-02-26 | **Spec**: specs/002-mui-pastel-theme/spec.md
**Input**: Feature specification from `/specs/002-mui-pastel-theme/spec.md`

## Summary

フロントエンドの全ページ（将来増えるページも含む）を対象に、Tailwind を用いてUIコンポーネントと配色を統一し、全体テーマをパステルカラー基調で一貫適用する。
既存の主要機能（学習項目の追加/一覧/削除）やAPI挙動は変更しない。パステル基調でもエラー/重要状態は高コントラストで判別可能にし、重要テキストはWCAG AAの目安（通常文字 4.5:1、太字/大文字 3:1）を満たす。

## Technical Context

**Language/Version**: TypeScript（frontend/backend）, Node.js（LTS想定）  
**Primary Dependencies**: React 18 + Vite, react-router-dom, @tanstack/react-query, axios, react-hook-form, zod, Tailwind CSS  
**Storage**: 既存は PostgreSQL（Prisma）だが、本featureはデータ/DB変更なし  
**Testing**: 既存は手動検証（quickstart）+ TypeScriptビルド/型チェック中心  
**Target Platform**: ローカル開発（Windows想定）+ ブラウザUI  
**Project Type**: Web application（frontend + backend + shared）  
**Performance Goals**: UIテーマ変更による体感劣化を起こさない（通常操作で支障がない）  
**Constraints**:
- 主要画面の操作性を維持（追加/一覧/削除）
- パステル基調でも重要情報（エラー/期限切れ等）の判別性を落とさない
- 追加の外部UIコンポーネントライブラリは導入しない（Material UI（MUI）は使用しない）
**Scale/Scope**: フロントエンドの全ページにテーマ/コンポーネント統一を適用

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Spec-First: PASS（spec.md にユーザーストーリー/Independent Test/受け入れ条件を記載）
- 独立テスト可能: PASS（P1のみで価値成立。トップ/一覧の操作とテーマ統一を単独検証可能）
- MVP優先: PASS（P1=主要画面での統一を先に達成）
- トレーサビリティ: PASS（spec → plan → tasks → 実装パスを明記する方針）
- シンプルさ: PASS（既存構造維持。UI層の依存追加に留め、不要な抽象化を追加しない）

再チェック（Phase 1設計後）: PASS（research.md/data-model.md/contracts/ui.md/quickstart.md を作成し、仕様前提と整合）

## Project Structure

### Documentation (this feature)

```text
specs/002-mui-pastel-theme/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/
│   └── ui.md            # UI theme/component usage contract
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
frontend/
└── src/
    ├── main.tsx
    ├── app.tsx
    ├── pages/
    │   ├── ItemsPage.tsx        # 既存の主要ページ（トップ/一覧）
    │   └── routes.tsx
    ├── uniqueParts/
    │   └── items/
    │       ├── ItemForm.tsx
    │       └── ItemsTable.tsx
    ├── services/
    │   └── api/
    │       └── http.ts
    └── index.css                # Tailwind / 共通スタイル（@layerなど）

frontend/tailwind.config.ts       # Tailwindテーマ設定（既存）

backend/                          # 本featureでは原則変更なし
shared/                           # 本featureでは原則変更なし
```

**Structure Decision**: 既存の monorepo 構造（frontend/backend/shared）を維持し、テーマ適用と見た目の統一はフロントエンド側（Tailwind設定 + 共通スタイル）に集約する。外部UIコンポーネントライブラリは導入せず、既存コードのクラス整理/共通化（必要最小限）で統一する。

## Complexity Tracking

（現時点で憲法違反に該当する複雑性の正当化は不要）

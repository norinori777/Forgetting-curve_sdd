# Implementation Plan: 忘却曲線管理（Forgetting Curve Manager）

**Branch**: `001-forgetting-curve-manager` | **Date**: 2026-02-24 | **Spec**: specs/001-forgetting-curve-manager/spec.md
**Input**: Feature specification from `/specs/001-forgetting-curve-manager/spec.md`

## Summary

単一ユーザー（ログインなし）向けに、学習項目の登録・復習の記録・復習予定日の更新・期間集計（期限内/遅延/成功率）を提供する。
UIはWeb（React）で、BEはExpress + Prisma + PostgreSQL。日付は `YYYY-MM-DD` の date として扱い、期限内判定は「予定日と同日」。
主要画面（一覧/復習/プリセット/集計）はスマホ/タブレット/PCで操作可能なレスポンシブ（FR-009）。

## Technical Context

**Language/Version**: TypeScript（frontend/backend）, Node.js（LTS想定）  
**Primary Dependencies**: React + Vite, Tailwind, react-router-dom, axios, @tanstack/react-query, react-hook-form, zod / Express, Prisma, pino, zod  
**Storage**: PostgreSQL（Prismaでマイグレーション管理）  
**Testing**: Frontend=vitest / Backend=jest + supertest  
**Target Platform**: ローカル開発（Windows想定）+ ブラウザUI  
**Project Type**: Web application（frontend + backend + shared）  
**Performance Goals**: 単一ユーザーのローカル運用想定。明示的なスループット目標は置かず、操作に支障のない応答を優先。  
**Constraints**:
- 認証なし（単一ユーザー）
- 日付ベースの予定/判定（時刻を扱わない）
- プリセット編集が以後の予定更新に反映される
- レスポンシブ（スマホ/タブレット/PCで操作不能にならない）
**Scale/Scope**: 個人利用の小規模データ（数百〜数千件を想定）

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Spec-First: PASS（spec.md にユーザーストーリー/Independent Test/Given-When-Then を明記）
- 独立テスト可能: PASS（US1〜US3 が独立して価値成立）
- MVP優先: PASS（P1=US1 を先に完了・検証）
- トレーサビリティ: PASS（spec → plan → tasks → 実装パスを明示）
- シンプルさ: PASS（FE/BE/shared の3パッケージ。追加抽象化は必要最小限）

再チェック（Phase 1設計後）: PASS（research.md/data-model.md/contracts/api.md/quickstart.md を作成し、仕様前提と整合）

## Project Structure

### Documentation (this feature)

```text
specs/001-forgetting-curve-manager/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── api.md
└── tasks.md
```

### Source Code (repository root)

```text
backend/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── src/
    ├── api/
    │   ├── middleware/
    │   │   ├── errorHandler.ts
    │   │   └── validate.ts
    │   ├── routes/
    │   │   ├── health.ts
    │   │   ├── items.ts
    │   │   ├── reviews.ts
    │   │   ├── presets.ts
    │   │   └── stats.ts
    │   └── router.ts
    ├── config/
    │   └── env.ts
    ├── db/
    │   └── prisma.ts
    ├── lib/
    │   └── logger.ts
    ├── services/
    │   ├── items/
    │   ├── reviews/
    │   └── stats/
    ├── app.ts
    └── server.ts

frontend/
└── src/
    ├── pages/
    │   ├── ItemsPage.tsx
    │   ├── ReviewPage.tsx
    │   ├── PresetsPage.tsx
    │   ├── StatsPage.tsx
    │   └── routes.tsx
    ├── uniqueParts/
    │   ├── items/
    │   ├── review/
    │   ├── presets/
    │   └── stats/
    ├── uiParts/
    ├── services/
    │   └── api/
    │       ├── http.ts
    │       ├── items.ts
    │       ├── reviews.ts
    │       ├── presets.ts
    │       └── stats.ts
    ├── hooks/
    │   └── queryClient.ts
    ├── domain/
    │   └── types/
    ├── app.tsx
    └── main.tsx

shared/
└── src/
    ├── contracts/
    │   ├── error.ts
    │   ├── items.ts
    │   ├── presets.ts
    │   ├── reviews.ts
    │   └── stats.ts
    ├── lib/
    │   └── date.ts
    └── index.ts
```

**Structure Decision**: 既存スタック（React/Vite + Express/Prisma/Postgres）前提のWebアプリとして、frontend/backend を分離し、共有契約を shared に集約する。
フロントエンドは pages（画面）/ uniqueParts（画面固有部品）/ uiParts（汎用UI）/ services/api（API呼び出し）/ hooks（横断）/ domain/types（型）に分け、実装開始時の責務ブレを抑える。

## Complexity Tracking

（現時点で憲法違反に該当する複雑性の正当化は不要）

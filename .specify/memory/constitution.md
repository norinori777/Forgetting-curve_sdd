<!--
Sync Impact Report

- Version change: N/A (template) → 1.0.0
- Modified principles: N/A (initial adoption)
- Added sections: Core Principles, 追加制約, 開発ワークフロー, Governance
- Removed sections: N/A
- Templates requiring updates:
  - ✅ reviewed (no change): .specify/templates/plan-template.md
  - ✅ reviewed (no change): .specify/templates/spec-template.md
  - ✅ reviewed (no change): .specify/templates/tasks-template.md
  - ✅ reviewed (no change): .specify/templates/checklist-template.md
  - ⚠ pending: .specify/templates/commands/*.md (directory not present in this repo)
- Follow-up TODOs: N/A
-->

# Forgetting_curve 憲法

## Core Principles

### I. 仕様駆動（Spec-First）

すべての変更は、先に仕様（`spec.md`）で「ユーザー価値」「受け入れ条件（Given/When/Then）」を
確定させること。仕様が曖昧なまま `tasks.md` 生成や実装を開始してはならない（MUST NOT）。

### II. ユーザーストーリーは独立して検証可能

`spec.md` の各ユーザーストーリーは、他ストーリー未実装でも価値が成立し、独立テストが可能であること
（MUST）。各ストーリーには優先度（P1/P2/P3…）と「Independent Test」を明記する。

### III. MVP（P1）優先と段階的デリバリー

P2/P3 に着手する前に、P1 を単独で動作確認し、受け入れシナリオを満たすこと（MUST）。
追加要件・スコープ変更は `spec.md` の改訂として扱い、理由と影響範囲を記録する（MUST）。

### IV. トレーサビリティ（仕様→計画→タスク→実装）

`plan.md` は `spec.md` を参照し、`tasks.md` は `plan.md` と `spec.md` を根拠に作成する（MUST）。
タスク記述には可能な限り具体的な対象（ファイルパス、エンドポイント、エンティティ名）を含める（MUST）。

### V. シンプルさを守り、複雑性は明示的に正当化

設計・実装は最小の構成から始め、不要な抽象化や過度な一般化を避ける（MUST）。
憲法チェックに抵触する複雑性（例: プロジェクト分割の増加、冗長なレイヤ追加）が必要な場合は、
`plan.md` の Complexity Tracking に違反内容・必要性・代替案を記載して正当化する（MUST）。

## 追加制約

- 本リポジトリでは、`.specify/templates/*` のテンプレートに従い、生成物（`spec.md`/`plan.md`/`tasks.md`/
  `checklist.md` 等）の構造を崩さない（MUST）。
- ドキュメントは「真実のソース（source of truth）」として扱い、実装はドキュメントに従う（MUST）。
- 資格情報・APIキー等の機密情報をリポジトリへコミットしてはならない（MUST NOT）。

## 開発ワークフロー

- 仕様作成: `/speckit.specify` で `specs/<feature>/spec.md` を作成・更新する。
- 計画作成: `/speckit.plan` で `plan.md`（必要なら `research.md` 等）を作成・更新する。
- タスク化: `/speckit.tasks` で `tasks.md` を作成し、ユーザーストーリー単位で独立実装できる粒度に分解する。
- 実装: `/speckit.implement`（または手動）で `tasks.md` に従って実装する。
- レビュー: 変更は憲法に適合していることをレビューで確認し、乖離がある場合はドキュメント改訂または
  正当化（Complexity Tracking）を行う（MUST）。

## Governance

- 憲法は本リポジトリの最上位ルールであり、他ドキュメントや慣習より優先する（MUST）。
- 憲法の改訂は PR で行い、影響範囲（テンプレート・既存仕様・運用）と移行方針を必ず記載する（MUST）。
- バージョニングはセマンティックバージョニング（MAJOR.MINOR.PATCH）に従う（MUST）。
  - MAJOR: 原則の削除/再定義など、互換性のないガバナンス変更
  - MINOR: 原則やセクションの追加、または運用ルールの実質的拡張
  - PATCH: 文言の明確化、誤字修正など意味的変更のない改善
- すべてのレビューは、憲法への適合（Spec-First、独立テスト、MVP優先、トレーサビリティ、シンプルさ）を
  明示的に確認する（MUST）。

**Version**: 1.0.0 | **Ratified**: 2026-02-24 | **Last Amended**: 2026-02-24

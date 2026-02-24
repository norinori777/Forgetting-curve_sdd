# Research: 忘却曲線管理（Forgetting Curve Manager）

**Branch**: 001-forgetting-curve-manager  
**Date**: 2026-02-24  
**Source**: specs/001-forgetting-curve-manager/spec.md

本ドキュメントは、計画（plan.md）と設計（data-model.md / contracts / quickstart）に必要な「未確定事項」を決定し、代替案と理由を記録する。

---

## Decision 1: 提供形態（UI/アプリ形態）

- Decision: 既存のWebアプリ構成（FE: React + Vite + TypeScript、BE: Node.js + Express + TypeScript）で提供する
- Rationale: ユーザー指定の既存スタックに合わせ、一覧/復習/プリセット編集/集計をブラウザUIで自然に提供できる。FE/BE分離によりドメインロジックとUIを切り離し、段階的に実装・テストできる。
- Alternatives considered:
  - CLIアプリ: UI要件（一覧/操作性）に不向き、既存スタックと不一致
  - デスクトップGUI: 配布・環境差の考慮が増える

## Decision 2: ユーザー/認証

- Decision: 単一ユーザー（ログインなし）
- Rationale: Clarificationsで確定。データ分離・認証が不要になり設計が単純になる。
- Alternatives considered:
  - 複数ユーザー（ログインあり）: 認証/権限/同期の課題が増え、MVPから逸れる

## Decision 3: 永続化と保存場所

- Decision: ローカル永続化（単一端末内）
- Rationale: Clarificationsで確定。クラウド同期は行わず、開発・運用はローカル環境で完結させる（DBもローカルで動かす前提）。
- Alternatives considered:
  - クラウド保存: ログイン・同期・バックアップ設計が必須になる
  - エクスポート/インポート: 将来拡張としては有効だがMVP必須ではない

## Decision 4: スケジューリング単位（日時 vs 日付）

- Decision: 次回復習は「予定日（date）」で扱う（期限内判定も日付基準）
- Rationale: Clarificationsで「期限内=予定日と同日実施（時刻は見ない）」が確定したため、日単位の方が仕様と実装の整合が取りやすい。
- Alternatives considered:
  - 予定日時（datetime）: 期限内判定と整合させるための例外や丸め処理が増える

## Decision 5: 復習結果の必須入力

- Decision: 必須は成功/失敗のみ（難易度・メモは任意）
- Rationale: Clarificationsで確定。入力負荷を下げ、履歴の継続性を優先する。
- Alternatives considered:
  - 難易度必須: 入力負荷が増え、継続の阻害要因になりうる

## Decision 6: 次回復習予定の更新ルール

- Decision: ユーザー編集可能な「復習間隔プリセット」を採用し、予定更新に反映する（FR-008）
- Rationale: Clarificationsで確定。数式モデル固定を避けつつ、ユーザーが自分に合う間隔を設定できる。
- Alternatives considered:
  - 忘却曲線の数式モデルを仕様で固定: モデル選定が仕様の複雑性を押し上げる
  - 固定プリセットのみ: ユーザー要求（プリセット編集）を満たさない

## Decision 7: 技術スタック（言語/依存）

- Decision: FE=React + Vite + TypeScript（React Query / react-hook-form / zod / axios / Tailwind）、BE=Express + TypeScript（Prisma / zod / pino）、DB=PostgreSQL、テストはFE=vitest / BE=jest + supertest
- Rationale: ユーザー指定の既存スタックに合わせる。サーバ状態はReact Queryで標準化し、フォーム/バリデーションはzod中心でFE/BEの契約を揃える。PrismaによりDBスキーマとマイグレーションを一元管理できる。
- Alternatives considered:
  - Python + SQLite + CLI: 既存スタックと不一致
  - SQLite: ローカル用途には合うが、指定スタック（PostgreSQL）と不一致

## Decision 8: 外部インタフェース（API契約）

- Decision: REST APIを契約として定義し、リクエスト/レスポンスをzodで検証する（可能な範囲でFE/BE共有）
- Rationale: 仕様の中心は「復習の記録」と「予定更新」であり、APIの互換性が品質に直結する。zodによりランタイム検証と型推論を両立しやすい。
- Alternatives considered:
  - OpenAPI先行: 可能だが、まずはzod中心で実装・テストを優先する
  - GraphQL: 過剰で導入コストが高い

---

## Open / Deferred（次フェーズで必要になれば確定）

- データ移行（スキーマ更新）方針の詳細
- 端末変更時の移行手段（エクスポート/インポート）
- 期限切れの表示優先順位（件数が多い場合の運用）

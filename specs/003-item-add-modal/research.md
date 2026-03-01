# Research: 学習項目追加モーダル化

**Branch**: 003-item-add-modal  
**Date**: 2026-03-02  
**Spec**: [spec.md](./spec.md)

## Decisions

### Decision 1: モーダル実装は依存追加なしの自前コンポーネント

- **Decision**: 外部UIライブラリを追加せず、React + Tailwind（既存の `app-*` 共通クラス方針）で最小のモーダルUIを実装する。
- **Rationale**: 既存プロジェクトは Tailwind による共通クラス運用が存在し、追加依存はスコープ/保守コストを増やす。今回の要件は「追加フォームをモーダルに移す」ことであり、最小実装で十分。
- **Alternatives considered**:
  - Headless UI / Radix 等の導入: アクセシビリティは強いが、依存追加と導入範囲が増える。
  - Material UI 等の導入: 本リポジトリ方針と不一致。

### Decision 2: 閉じる操作はキャンセルと同等（入力クリア）

- **Decision**: 「キャンセル」「背景クリック」「ESC」でモーダルを閉じる場合は、すべて入力を破棄（クリア）する。
- **Rationale**: spec の FR-004/FR-010 と整合し、ユーザーが再オープンした際に入力が残って混乱するのを防ぐ。
- **Alternatives considered**:
  - 入力を保持する: 再開はできるが、キャンセルの意味が曖昧になり誤登録を誘発しやすい。

### Decision 3: 既存 `ItemForm` を流用し、表示場所だけをモーダルへ移す

- **Decision**: `ItemForm` のバリデーション/送信ロジックは維持し、`ItemsPage` 上の常設フォームをモーダルに移動する。
- **Rationale**: FR-009（既存の挙動を変えない）に沿い、変更範囲を最小化できる。
- **Alternatives considered**:
  - モーダル専用フォームを新規作成: 実装は明快だが重複が増える。

## Open Questions

- なし（clarify で主要な曖昧点は解消済み）

---

description: "Task list for feature implementation"

---

# Tasks: パステルテーマ適用（MUI不使用）

**Input**: Design documents from `/specs/002-mui-pastel-theme/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: 本featureはテスト実装を明示要求していないため、タスクには自動テストを含めない（必要なら後続で追加）。

**Organization**: タスクはユーザーストーリー単位で完結実装・独立検証できるように整理する。

## フォーマット

- すべてのタスクは次の形式に統一する:
  - `- [ ] T### [P?] [US?] 説明 ... path/to/file`

---

## Phase 1: Setup（Shared Infrastructure）

**Purpose**: 開発着手に必要な前提確認（既存プロジェクトのため最小）

- [X] T001 フロントが起動できることを確認する specs/002-mui-pastel-theme/quickstart.md
- [X] T002 Material UI（MUI）が導入されていないことを確認し、もし入っていれば依存を削除する frontend/package.json

---

## Phase 2: Foundational（Blocking Prerequisites）

**Purpose**: どのページでも使える「パステルテーマ + 主要UIの見た目統一」の基盤を先に作る（以降の各ストーリー作業をブロック）

- [X] T003 パステル基調のベース（背景/本文色/リンク/フォーカス等）を定義する frontend/src/index.css
- [X] T004 主要UIの共通クラス（カード/見出し/補助テキスト/入力/ボタン/テーブル/タグ/エラー表示）を `@layer components` で定義する frontend/src/index.css
- [X] T005 重要状態（エラー/期限切れ等）が高コントラストで判別できるクラスを用意する（WCAG AA目安を満たす前提）frontend/src/index.css

**Checkpoint**: Foundation ready - 以降のユーザーストーリー実装に着手できる

---

## Phase 3: User Story 1 - パステル基調のUIで迷わず操作できる (Priority: P1) 🎯 MVP

**Goal**: 主要操作（追加/一覧確認/削除）が、パステル基調で統一されたUIで迷わず実行できる。

**Independent Test**: 一覧画面を開き、学習項目を1件追加し、一覧に表示され、削除できることを確認できる。あわせて、ボタン/入力/表/見出しがパステル基調で統一されていることを目視確認できる。

### Implementation

- [X] T006 [P] [US1] ページ全体/ヘッダー/セクションの見た目を共通クラスへ寄せる frontend/src/pages/ItemsPage.tsx
- [X] T007 [P] [US1] 追加フォーム（ラベル/入力/テキストエリア/送信ボタン）の見た目を共通クラスへ寄せる frontend/src/uniqueParts/items/ItemForm.tsx
- [X] T008 [P] [US1] 一覧テーブル（見出し/セル/タグ/期限切れ表示）の見た目を共通クラスへ寄せる frontend/src/uniqueParts/items/ItemsTable.tsx
- [X] T009 [US1] 削除操作（一覧から削除できるUIとAPI呼び出し）を追加する frontend/src/pages/ItemsPage.tsx
- [X] T010 [US1] 一覧行に「削除」ボタンと状態表示（disabled/失敗表示）を追加する frontend/src/uniqueParts/items/ItemsTable.tsx
- [X] T011 [US1] エラー表示（追加失敗/取得失敗/バリデーション/削除失敗）を「通常表示と区別できる」共通スタイルに統一する frontend/src/pages/ItemsPage.tsx
- [ ] T012 [US1] 手動検証で US1 の Independent Test（追加/一覧/削除 + 見た目統一）を満たすことを確認する specs/002-mui-pastel-theme/spec.md

**Checkpoint**: User Story 1 が独立に動作し、見た目が統一されている

---

## Phase 4: User Story 2 - 端末サイズが変わっても視認性を維持できる (Priority: P2)

**Goal**: スマホ/タブレット/PC 幅でも、読めて操作できる状態を維持する。

**Independent Test**: 主要画面をスマホ幅・タブレット幅・PC幅で表示し、入力と一覧の操作が行えることを確認できる。

### Implementation

- [X] T013 [P] [US2] スマホ幅でもフォームが操作しやすい余白/文字サイズ/タップ領域になるよう調整する frontend/src/uniqueParts/items/ItemForm.tsx
- [X] T014 [P] [US2] スマホ幅でも一覧が操作不能にならないよう調整する（折返し/列の優先度/表示切替等の最小対応）frontend/src/uniqueParts/items/ItemsTable.tsx
- [X] T015 [US2] ページレイアウトをブレークポイントで最小調整し、はみ出しで操作不能にならないようにする frontend/src/pages/ItemsPage.tsx
- [ ] T016 [US2] 手動検証で US2 の Independent Test を満たすことを確認する specs/002-mui-pastel-theme/quickstart.md


**Checkpoint**: 3つの幅（スマホ/タブレット/PC）で主要操作が完了できる

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: 複数ストーリーに跨る仕上げ（機能挙動は変えない）

- [X] T017 [P] 生の色ユーティリティ（例: `bg-black`）が残っていないか確認し、共通クラスへ寄せる frontend/src/pages/ItemsPage.tsx
- [X] T018 [P] 生の色ユーティリティ（例: `text-red-600`）が残っていないか確認し、共通クラスへ寄せる frontend/src/uniqueParts/items/ItemsTable.tsx
- [X] T019 フロントのビルドが通ることを確認する（`npm --prefix frontend run build`）frontend/package.json
- [ ] T020 quickstart.md の検証項目が満たせることを最終確認する specs/002-mui-pastel-theme/quickstart.md

---

## Dependencies & Execution Order

### User Story Completion Order

- US1（P1）→ US2（P2）

### Phase Dependencies

- Phase 1（Setup）完了 → Phase 2（Foundational）
- Phase 2 完了 → US1/US2 に着手可能
- Polish は US1/US2 の完了後

### Dependency Graph（ストーリー順）

- Setup → Foundational → US1 → US2 → Polish

---

## Parallel Execution Examples

### User Story 1

- 並列候補（Foundational完了後）:
  - T006（ItemsPage）
  - T007（ItemForm）
  - T008（ItemsTable）

### User Story 2

- 並列候補（Foundational完了後）:
  - T013（ItemForm）
  - T014（ItemsTable）

---

## Implementation Strategy

### MVP First（US1のみ）

1. Phase 1 → Phase 2 を完了
2. US1（T006〜T012）を完了
3. quickstart/spec の Independent Test で独立検証してから次へ

### Incremental Delivery

- US1 を固めてから、US2 のレスポンシブを追加する（見た目・操作性のリグレッションを最小化）

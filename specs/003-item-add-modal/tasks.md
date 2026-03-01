---

description: "Task list for feature implementation"

---

# Tasks: 学習項目追加モーダル化

**Input**: Design documents from `/specs/003-item-add-modal/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: 本featureは自動テスト実装を明示要求していないため、タスクには自動テストを含めない（必要なら後続で追加）。

**Organization**: タスクはユーザーストーリー単位で完結実装・独立検証できるように整理する。

## フォーマット

- すべてのタスクは次の形式に統一する:
  - `- [ ] T### [P?] [US?] 説明 ... path/to/file`

---

## Phase 1: Setup（Shared Infrastructure）

**Purpose**: 実装着手に必要な前提確認（既存プロジェクトのため最小）

- [ ] T001 バックエンド/フロントが起動できることを確認する specs/003-item-add-modal/quickstart.md
- [x] T002 外部UIライブラリを追加しない方針を確認する（依存追加がないこと）specs/003-item-add-modal/research.md

---

## Phase 2: Foundational（Blocking Prerequisites）

**Purpose**: US1/US2 の両方で使う「モーダル基盤」を先に作る

- [x] T003 [P] モーダル用の共通スタイル（オーバーレイ/パネル/ヘッダー/フッター/レイアウト）を `app-*` クラスで追加する frontend/src/index.css
- [x] T004 [P] 依存追加なしのモーダルUI部品を作成する（背景クリック/ESCでonClose発火、role/aria）frontend/src/uiParts/Modal.tsx

**Checkpoint**: Foundation ready - 以降のユーザーストーリー実装に着手できる

---

## Phase 3: User Story 1 - 一覧から追加モーダルで登録できる (Priority: P1) 🎯 MVP

**Goal**: 一覧右上の「新規」ボタンからモーダルを開いて入力し、追加できる。

**Independent Test**: 一覧画面を開き、右上「新規」→モーダル表示→入力→「追加」→成功で閉じて一覧に反映、を確認できる。

### Implementation

- [x] T005 [US1] 一覧セクションの右上に「新規」ボタンを配置し、クリックでモーダルを開く frontend/src/pages/ItemsPage.tsx
- [x] T006 [P] [US1] モーダル下部に「キャンセル」「追加」ボタンを表示する（フォームのUIをモーダルへ移行）frontend/src/uniqueParts/items/ItemForm.tsx
- [x] T007 [US1] 追加成功でモーダルを閉じ、一覧が更新されることを担保する（既存のinvalidate挙動を維持）frontend/src/pages/ItemsPage.tsx
- [x] T008 [US1] 追加失敗時の表示をモーダル内に出し、モーダルを閉じない frontend/src/pages/ItemsPage.tsx
- [ ] T009 [US1] 手動検証で US1 の Verification Checklist を満たすことを確認する specs/003-item-add-modal/quickstart.md

**Checkpoint**: US1 が独立に動作し、MVPとしてデモできる

---

## Phase 4: User Story 2 - キャンセルで閉じて入力を破棄できる (Priority: P2)

**Goal**: キャンセル/背景クリック/ESC で閉じた場合に、入力が破棄（クリア）される。

**Independent Test**: モーダルを開いて入力→キャンセル（またはESC/背景クリック）→閉じる→再度開く→入力が空、を確認できる。

### Implementation

- [x] T010 [US2] 「キャンセル」ボタン押下でモーダルを閉じる frontend/src/pages/ItemsPage.tsx
- [x] T011 [US2] 背景クリック/ESC でもモーダルを閉じられるようにする（キャンセルと同じ扱い）frontend/src/uiParts/Modal.tsx
- [x] T012 [US2] 閉じた後に再度開いたとき入力が空であることを担保する（unmount等でクリア）frontend/src/pages/ItemsPage.tsx
- [ ] T013 [US2] 手動検証で US2 の Verification Checklist を満たすことを確認する specs/003-item-add-modal/quickstart.md

**Checkpoint**: US2 が独立に確認でき、誤入力の残存がない

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: 複数ストーリーに跨る仕上げ（機能挙動は変えない）

- [x] T014 [P] モーダルのアクセシビリティ属性（`role=dialog`/`aria-modal`/ラベル付け）を確認し、最低限の配慮を入れる frontend/src/uiParts/Modal.tsx
- [x] T015 [P] 追加処理中の重複送信防止（追加ボタンdisabled）と状態が分かる表示を確認する frontend/src/uniqueParts/items/ItemForm.tsx
- [x] T016 フロントのビルドが通ることを確認する（`npm --prefix frontend run build`）frontend/package.json
- [ ] T017 quickstart.md の全検証項目が満たせることを最終確認する specs/003-item-add-modal/quickstart.md

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

### Foundational

- 並列候補:
  - T003（index.css）
  - T004（Modal.tsx）

### User Story 1

- 並列候補（Foundational完了後）:
  - T005/T007/T008（ItemsPage）
  - T006（ItemForm）

---

## Implementation Strategy

### MVP First（US1のみ）

1. Phase 1 → Phase 2 を完了
2. US1（T005〜T009）を完了
3. quickstart の Verification Checklist で独立検証してから次へ

### Incremental Delivery

- US1 を固めてから、US2 のクローズ/クリア体験を追加する（回帰を最小化）

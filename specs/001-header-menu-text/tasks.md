# Tasks: ヘッダーメニュー（文字列化 + 学習項目追加）

**Input**: Design documents from `/specs/001-header-menu-text/`

- Required: [plan.md](./plan.md), [spec.md](./spec.md)
- Optional (available): [research.md](./research.md), [data-model.md](./data-model.md), [contracts/ui.md](./contracts/ui.md), [quickstart.md](./quickstart.md)

**Tests**: 本featureの `spec.md` に自動テスト要件はないため、テストタスクは作成しない（検証は `quickstart.md` の手動チェック + `npm --prefix frontend run build` で担保）。

**Organization**: User Story単位でタスクを分割し、各ストーリーが独立に実装・検証できる形にする。

## Phase 1: Setup（準備）

- [x] T001 [P] 現状ヘッダー実装を把握するため `frontend/src/uiParts/AppHeader.tsx` を確認する
- [x] T002 [P] 主要ルートを確認するため `frontend/src/pages/routes.tsx` を確認する（`/`, `/review`, `/stats`, `/presets`）
- [x] T003 [P] 共通ヘッダーが全ルートで描画されることを確認するため `frontend/src/pages/AppLayout.tsx` を確認する（`AppHeader` + `Outlet`）

---

## Phase 2: Foundational（全ストーリー共通の前提）

- [x] T004 [P] 仕様と契約の整合を確認し、差分があれば修正する（`specs/001-header-menu-text/contracts/ui.md`）
- [x] T005 [P] 手動受け入れ観点が揃っていることを確認し、差分があれば修正する（`specs/001-header-menu-text/quickstart.md`）

**Checkpoint**: Setup/Foundational 完了。以降、User Storyの実装に着手できる。

---

## Phase 3: User Story 1 - 4項目メニューで主要画面へ移動できる（Priority: P1）🎯 MVP

**Goal**: ヘッダーに4項目（学習項目/復習/集計/設定（プリセット））を表示し、1回の操作で対応画面へ遷移できるようにする。

**Independent Test**: 任意の画面でヘッダーメニューが表示され、メニュー操作だけで4画面（`/`, `/review`, `/stats`, `/presets`）に到達できる。

### Implementation（US1）

- [x] T006 [US1] メニュー項目を4つにし、順序と文言を仕様どおりに更新する（`frontend/src/uiParts/AppHeader.tsx`）
- [x] T007 [US1] 「学習項目」の遷移先を `/` にし、`NavLink` が他ページでも誤って active にならないよう `end` を付与する（`frontend/src/uiParts/AppHeader.tsx`）
- [ ] T008 [US1] クリックでの遷移が成立することを手動確認し、要点を記録する（`specs/001-header-menu-text/quickstart.md`）

**Checkpoint**: US1 単独で「4項目表示 + 4画面遷移」が成立している。

---

## Phase 4: User Story 2 - メニューが文字列のみで軽量に見える（Priority: P2）

**Goal**: メニュー項目をボタン形状に見せず、文字列として軽量に表示する（hover/active の表現を固定）。

**Independent Test**: 背景/枠/角丸がなくボタン形状に見えないこと、hover は文字色変化のみ、active は太字のみであることを目視確認できる。

### Implementation（US2）

- [x] T009 [US2] ヘッダーメニューの `app-button-*` などボタン見た目になり得るクラスを除去する（`frontend/src/uiParts/AppHeader.tsx`）
- [x] T010 [US2] hover は「文字色の変化のみ」になるようクラスを適用する（下線/背景/枠/角丸を使わない）（`frontend/src/uiParts/AppHeader.tsx`）
- [x] T011 [US2] active 表現を「太字のみ」にする（色変更/下線/背景/枠を追加しない）（`frontend/src/uiParts/AppHeader.tsx`）
- [ ] T012 [US2] 目視受け入れ（文字列のみ・active判別）を実施し、要点を記録する（`specs/001-header-menu-text/quickstart.md`）

**Checkpoint**: US2 単独で「文字列のみ」要件（FR-006/008/009）を満たす。

---

## Phase 5: User Story 3 - 狭い画面でもメニューが欠落しない（Priority: P3）

**Goal**: 画面幅が狭い場合でも4項目が欠落せず、操作可能な状態を維持する（折り返しは許容）。

**Independent Test**: 表示幅を狭くしても4項目が常に表示され、クリック可能であることを確認できる。

### Implementation（US3）

- [x] T013 [US3] メニューコンテナを折り返し可能にし、狭幅でも項目が欠落しないように調整する（`frontend/src/uiParts/AppHeader.tsx`）
- [ ] T014 [US3] 狭幅での表示を手動確認し、欠落が無いことを記録する（`specs/001-header-menu-text/quickstart.md`）

**Checkpoint**: US3 単独で狭幅時の欠落なし（FR-007）を満たす。

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T015 [P] 変更がビルドを壊していないことを確認する（`specs/001-header-menu-text/quickstart.md` のビルド手順に従い `npm --prefix frontend run build`）
- [ ] T016 [P] 既存ページに重複ナビ等が復活していないことを目視確認する（`frontend/src/pages/`）

---

## Dependencies & Execution Order

### User Story completion order

- US1（P1）→ US2（P2）→ US3（P3）
  - いずれも同一UI（ヘッダーメニュー）を変更するため、競合回避の観点で優先度順の逐次実装を基本とする。

### Dependency graph（簡易）

- Phase 1（Setup）→ Phase 2（Foundational）→ US1 → US2 → US3 → Polish

---

## Parallel Execution Examples（ストーリー別）

> このfeatureは `frontend/src/uiParts/AppHeader.tsx` への変更が中心で、同一ファイルを触るタスクが多いため、並列化余地は限定的。

### US1

- 例（並列化しづらい）:
  - T006（メニュー項目更新）と T007（`end` 付与）は同一ファイルのため原則逐次

### US2

- 例（並列化しづらい）:
  - T009〜T011 は同一ファイルのため原則逐次

### US3

- 例（並列化しづらい）:
  - T013 は同一ファイルのため原則逐次

---

## Implementation Strategy

### MVP First（US1のみ）

1. Phase 1〜2 を完了
2. US1（T006〜T008）を完了
3. **STOP & VALIDATE**: `quickstart.md` に従い「4項目表示 + 4画面遷移」を確認

### Incremental Delivery

- US1 → US2 → US3 の順で、各ストーリーの checkpoint で必ず手動確認を挟む

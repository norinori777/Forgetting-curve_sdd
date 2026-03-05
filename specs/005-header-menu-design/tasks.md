# Tasks: ヘッダーメニュー（タイトル左寄せ + デザイン画像指定）

**Input**: Design documents from `/specs/005-header-menu-design/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: 本featureでは自動テストは要求されていないため、テストタスクは作成しない（手動確認 + build を採用）。

**Organization**: タスクはユーザーストーリー単位で整理し、各ストーリーが独立に実装・検証できるようにする。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 並列実行可能（別ファイルで依存なし）
- **[Story]**: 対応ユーザーストーリー（[US1], [US2], [US3]）
- すべてのタスク説明に対象ファイルパスを含める

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 実装・検証を開始できる状態にする

- [X] T001 依存関係が揃っていることを確認し、必要なら `npm install` を実行する（package.json, frontend/package.json）
- [X] T002 受け入れ確認の手順を確認し、ローカルでの検証方法を把握する（specs/005-header-menu-design/quickstart.md）

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: すべてのユーザーストーリーに共通で必要な前提（共通ヘッダー常設）を確認する

- [X] T003 [P] 共通レイアウトが全ルートでヘッダーを1回だけ描画していることを確認し、必要なら修正する（frontend/src/pages/AppLayout.tsx）
- [X] T004 [P] ルーティングが `AppLayout` 配下にネストされ、全ルートでヘッダーが表示されることを確認し、必要なら修正する（frontend/src/pages/routes.tsx）

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - 左端のアプリタイトルで迷わない (Priority: P1) 🎯 MVP

**Goal**: 全画面でヘッダー左端に「FC + Forgetting-curve」を常時表示し、タイトルは表示のみ（クリックしても遷移しない）。

**Independent Test**: 任意の画面を開き、ヘッダー左端に `FC` と `Forgetting-curve` が常に表示され、クリックしても画面遷移しないことを確認する（specs/005-header-menu-design/spec.md）。

### Implementation for User Story 1

- [X] T005 [US1] アプリタイトル表示文字列を "Forgetting-curve" に更新する（frontend/src/uiParts/AppHeader.tsx）
- [X] T006 [US1] 左端にモノグラム "FC" を表示し、視覚的にタイトルとセットで読める配置にする（frontend/src/uiParts/AppHeader.tsx）
- [X] T007 [US1] 左端の「アイコン+アプリタイトル」はリンクにせず、クリックしても画面遷移しないことを保証する（frontend/src/uiParts/AppHeader.tsx）
- [X] T008 [US1] タイトルが長い場合に完全欠落しないよう省略表示（例: 1行省略）を適用する（frontend/src/uiParts/AppHeader.tsx）

**Checkpoint**: US1 should be fully functional and independently verifiable

---

## Phase 4: User Story 2 - ヘッダーメニューを参照画像どおりに利用できる (Priority: P2)

**Goal**: 「復習」「集計」「設定（プリセット）」が表示され、1操作で遷移でき、アクティブ表示で現在地が判別できる。参照画像に沿った見た目に整える。

**Independent Test**: 参照画像と見比べ、(1) メニュー3項目が表示される、(2) クリックで `/review` `/stats` `/presets` に遷移できる、(3) 現在ページがアクティブ表示で判別できる（specs/005-header-menu-design/spec.md, specs/005-header-menu-design/header.png）。

### Implementation for User Story 2

- [X] T009 [US2] メニュー3項目のラベル/順序/遷移先が契約どおりであることを確認し、必要なら修正する（frontend/src/uiParts/AppHeader.tsx, specs/005-header-menu-design/contracts/ui.md）
- [X] T010 [US2] アクティブ表示が他項目と区別できることを確認し、参照画像の意図に沿うよう調整する（frontend/src/uiParts/AppHeader.tsx）
- [X] T011 [US2] 右端にブランド要素を表示しない（右端は空）ことを満たすよう構造を整理する（frontend/src/uiParts/AppHeader.tsx）

**Checkpoint**: US2 should be independently verifiable without relying on US3

---

## Phase 5: User Story 3 - 画面幅が変わってもヘッダーが崩れない (Priority: P3)

**Goal**: 幅 1280px 相当ではメニュー等間隔の横並び、幅 375px 相当では2段（1段目=左端ブランド、2段目=メニュー）で、メニューが欠落せず操作可能。

**Independent Test**: 表示幅 1280px 程度と 375px 程度で、(1) 3メニューが常に操作可能、(2) 375px では2段で段構成が仕様どおり、(3) 左端タイトルが維持される（specs/005-header-menu-design/spec.md）。

### Implementation for User Story 3

- [X] T012 [US3] 狭幅（375px相当）で2段表示になり、1段目に左端ブランド、2段目にメニューが来るようDOM順/レイアウトを調整する（frontend/src/uiParts/AppHeader.tsx）
- [X] T013 [US3] 広幅（1280px相当）で左端ブランド + メニューが横並びで成立し、メニュー3項目が等間隔になるよう調整する（frontend/src/uiParts/AppHeader.tsx）
- [X] T014 [US3] 狭幅でもメニューが欠落せず操作可能であることを確認し、必要なら折返し/余白を調整する（frontend/src/uiParts/AppHeader.tsx）

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 品質の最終確認と、実行可能な状態の担保

- [X] T015 フロントのビルドが通ることを確認する（frontend/package.json）
- [ ] T016 quickstart の手順に沿って手動受け入れ確認を実施し、差分があれば仕様に追記する（specs/005-header-menu-design/quickstart.md, specs/005-header-menu-design/spec.md）

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** → **Foundational (Phase 2)** → **US1 (Phase 3)** → **US2 (Phase 4)** → **US3 (Phase 5)** → **Polish (Phase 6)**

### User Story Dependencies

- **US1 (P1)**: Phase 2 完了後に開始。ほかストーリーへの依存なし
- **US2 (P2)**: Phase 2 完了後に開始。US1の左端ブランドと同一ヘッダーを触るが、受け入れ観点は独立
- **US3 (P3)**: Phase 2 完了後に開始。レスポンシブ調整のため同一ヘッダーを触るが、受け入れ観点は独立

---

## Parallel Opportunities

- Phase 2 の確認タスク（T003, T004）は別ファイルのため並列実行可能
- それ以降は `frontend/src/uiParts/AppHeader.tsx` への集中変更が中心のため、原則は直列推奨

---

## Parallel Execution Examples

### US1

- 並列実行の想定なし（同一ファイル: frontend/src/uiParts/AppHeader.tsx）

### US2

- 並列実行の想定なし（同一ファイル: frontend/src/uiParts/AppHeader.tsx）

### US3

- 並列実行の想定なし（同一ファイル: frontend/src/uiParts/AppHeader.tsx）

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1 → Phase 2 を完了
2. US1（左端ブランド常時表示 + 表示のみ）を実装
3. quickstart の該当項目で手動確認し、P1が満たされることを確認する（specs/005-header-menu-design/quickstart.md）

### Incremental Delivery

- US1 → US2 → US3 の順に、各段階で quickstart による手動確認と `npm --prefix frontend run build` を通す

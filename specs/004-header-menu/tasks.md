# Tasks: ヘッダーメニュー追加

**Input**: Design documents from `/specs/004-header-menu/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: 自動テストは本featureでは必須要件として明記されていないため、タスクには含めない（手動確認は quickstart.md に記載）。

**Organization**: タスクはユーザーストーリー単位（P1→P2→P3）で独立実装・独立検証できるように分割する。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 並列実行可能（別ファイル・未完了タスクへの依存なし）
- **[Story]**: [US1], [US2], [US3]
- 各タスクの説明には **必ずファイルパス** を含める

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 既存プロジェクトに対する最小限の準備と検証手順の確立

- [X] T001 現行の手動確認手順を点検し、不足があれば追記する in specs/004-header-menu/quickstart.md
- [X] T002 [P] UIコントラクトと仕様の整合を確認し、差分があれば修正する in specs/004-header-menu/contracts/ui.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 全ユーザーストーリーで共通利用する「共通レイアウト（ヘッダー常設）」の土台を作る

- [X] T003 AppHeader の骨組み（空のメニュー領域＋右端ブランド領域の枠）を作成する in frontend/src/uiParts/AppHeader.tsx
- [X] T004 AppLayout（共通レイアウト）を作成し、AppHeader と Outlet を配置する in frontend/src/pages/AppLayout.tsx
- [X] T005 ルーティングに AppLayout を導入して全ルートへ適用する（ネストルート化） in frontend/src/pages/routes.tsx

**Checkpoint**: どのルートでも AppLayout が適用され、ヘッダー領域が表示される

---

## Phase 3: User Story 1 - ヘッダーから主要ページへ移動できる (Priority: P1) 🎯 MVP

**Goal**: 全画面のヘッダーから「復習」「集計」「設定（プリセット）」へ1操作で遷移でき、遷移後は該当メニューがアクティブ表示になる

**Independent Test**: 任意の画面からヘッダーの各メニューをクリックし、`/review`・`/stats`・`/presets` に遷移でき、該当項目がアクティブ表示になることを確認する（手順は specs/004-header-menu/quickstart.md）

### Implementation for User Story 1

- [X] T006 [US1] ヘッダーメニュー項目（復習/集計/設定（プリセット））を実装し、クリックで遷移できるようにする in frontend/src/uiParts/AppHeader.tsx
- [X] T007 [US1] 現在ページに対応するメニュー項目をアクティブ表示にする（NavLink などで判定） in frontend/src/uiParts/AppHeader.tsx
- [X] T008 [P] [US1] 既存ページ内の重複ナビ（Linkボタン群）を削除し、ページ見出しは維持する in frontend/src/pages/ItemsPage.tsx
- [X] T009 [P] [US1] 既存ページ内の重複ナビ（Linkボタン群）を削除し、ページ見出しは維持する in frontend/src/pages/ReviewPage.tsx
- [X] T010 [P] [US1] 既存ページ内の重複ナビ（Linkボタン群）を削除し、ページ見出しは維持する in frontend/src/pages/StatsPage.tsx
- [X] T011 [P] [US1] 既存ページ内の重複ナビ（Linkボタン群）を削除し、ページ見出しは維持する in frontend/src/pages/PresetsPage.tsx
- [X] T012 [US1] US1 の手動確認手順（遷移 + アクティブ表示 + 全ルート表示）を更新/確定する in specs/004-header-menu/quickstart.md

**Checkpoint**: US1 の受け入れ条件（遷移 + アクティブ表示）が満たせる

---

## Phase 4: User Story 2 - ヘッダー右端にアイコンとアプリ名が表示される (Priority: P2)

**Goal**: ヘッダー右端にアイコンとアプリ名を表示し、アイコンが表示できない場合でもアプリ名とメニュー操作を維持する

**Independent Test**: 主要ページを表示し、右端にアイコン+アプリ名が表示され続けることを確認する。アイコン非表示相当（CSSで隠す等）でもアプリ名とメニューが残ることを確認する（手順は specs/004-header-menu/quickstart.md）

### Implementation for User Story 2

- [X] T013 [US2] アプリ名表示を追加する（表示文言は frontend/index.html の title を根拠にする） in frontend/src/uiParts/AppHeader.tsx
- [X] T014 [US2] 右端アイコンを追加する（画像資産追加はせず、モノグラム“FC”を角丸枠で表現） in frontend/src/uiParts/AppHeader.tsx
- [X] T015 [US2] 右端（アイコン+アプリ名）を右寄せで表示し、メニューはその左側に配置されるよう整える in frontend/src/uiParts/AppHeader.tsx
- [X] T016 [US2] US2 の手動確認手順（右端表示/フォールバック）を更新/確定する in specs/004-header-menu/quickstart.md

**Checkpoint**: FR-002/FR-006 が満たせる

---

## Phase 5: User Story 3 - メニューが横並びで等間隔に配置される (Priority: P3)

**Goal**: デスクトップ相当幅ではメニューが横並びかつ等間隔、狭い画面では2段（1段目=メニュー、2段目=右寄せブランド）で表示される

**Independent Test**: 画面幅を変更して、(1) デスクトップ相当幅で等間隔に見える、(2) 狭い幅で2段になる、(3) 狭い幅でもアクティブ表示が判別できる、を確認する（手順は specs/004-header-menu/quickstart.md）

### Implementation for User Story 3

- [X] T017 [US3] デスクトップ相当幅でメニュー3項目を等間隔配置にする（justify-evenly 相当） in frontend/src/uiParts/AppHeader.tsx
- [X] T018 [US3] 狭い画面では2段に折り返す（1段目=メニュー、2段目=右寄せのアイコン+アプリ名） in frontend/src/uiParts/AppHeader.tsx
- [X] T019 [US3] 狭い画面（2段表示）でもアクティブ表示が判別できるようにする in frontend/src/uiParts/AppHeader.tsx
- [X] T020 [US3] スタイルは既存 Tailwind トークンのみで実装し、不要なら CSS クラス追加を行わない（追加する場合は最小にする） in frontend/src/index.css
- [X] T021 [US3] US3 の手動確認手順（等間隔/2段/アクティブ判別）を更新/確定する in specs/004-header-menu/quickstart.md

**Checkpoint**: FR-004/FR-008 が満たせる

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: 仕上げ・ドキュメント整合・ビルド確認

- [X] T022 [P] 実装結果が UI 契約に一致していることを最終確認し、必要なら更新する in specs/004-header-menu/contracts/ui.md
- [X] T023 フロントエンドビルドを実行し、型エラー等があれば修正する（scripts 根拠: frontend/package.json） in frontend/package.json
- [ ] T024 Quickstart の手動確認を通しで実行し、差分があれば手順を更新する in specs/004-header-menu/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: すぐ開始可能
- **Foundational (Phase 2)**: Setup 完了後（ヘッダー常設の土台）
- **User Stories (Phase 3+)**: Foundational 完了後、P1→P2→P3 の順を基本とする
- **Polish (Final Phase)**: 必要な User Story 完了後

### Dependency Graph

```mermaid
flowchart TD
	P1[Phase 1: Setup] --> P2[Phase 2: Foundational]
	P2 --> US1[US1 (P1): ヘッダー遷移 + アクティブ]
	US1 --> US2[US2 (P2): 右端アイコン + アプリ名]
	US2 --> US3[US3 (P3): 等間隔 + 狭幅2段]
	US3 --> POLISH[Phase N: Polish]
```

### User Story Dependencies

- **US1 (P1)**: Phase 2 完了後に開始（MVP）
- **US2 (P2)**: US1 のヘッダー実装に追記（同一コンポーネント中心）
- **US3 (P3)**: US1/US2 の表示を調整（同一コンポーネント中心）

### Parallel Opportunities

- Phase 2 以降、ページ側の「重複ナビ削除」（T008〜T011）はファイルが分かれるため並列化可能
- US2/US3 は `frontend/src/uiParts/AppHeader.tsx` 競合が起きやすいので、同時並行よりは短いバッチで順番に実施

---

## Parallel Example: User Story 1

以下は US1 の並列例（T006/T007 完了後を前提）:

- Task: "T008 重複ナビ削除 in frontend/src/pages/ItemsPage.tsx"
- Task: "T009 重複ナビ削除 in frontend/src/pages/ReviewPage.tsx"
- Task: "T010 重複ナビ削除 in frontend/src/pages/StatsPage.tsx"
- Task: "T011 重複ナビ削除 in frontend/src/pages/PresetsPage.tsx"

---

## Parallel Example: User Story 2

US2 は実装対象が `frontend/src/uiParts/AppHeader.tsx` に集中するため、安全な並列実行は基本的にない（競合しやすい）。

```bash
# Sequential batch (recommended):
Task: "T013 アプリ名表示 in frontend/src/uiParts/AppHeader.tsx"
Task: "T014 右端アイコン（モノグラム） in frontend/src/uiParts/AppHeader.tsx"
Task: "T015 右端配置の整形 in frontend/src/uiParts/AppHeader.tsx"
Task: "T016 US2 手動確認手順更新 in specs/004-header-menu/quickstart.md"
```

---

## Parallel Example: User Story 3

US3 も `frontend/src/uiParts/AppHeader.tsx` が中心のため並列は推奨しない（競合しやすい）。

```bash
# Sequential batch (recommended):
Task: "T017 等間隔配置 in frontend/src/uiParts/AppHeader.tsx"
Task: "T018 狭幅2段レイアウト in frontend/src/uiParts/AppHeader.tsx"
Task: "T019 狭幅でもアクティブ判別 in frontend/src/uiParts/AppHeader.tsx"
Task: "T020 スタイル方針確認/必要最小のCSS in frontend/src/index.css"
Task: "T021 US3 手動確認手順更新 in specs/004-header-menu/quickstart.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 2（AppLayout + ヘッダー枠）を完了
2. US1（遷移 + アクティブ表示）を完了
3. **STOP and VALIDATE**: specs/004-header-menu/quickstart.md に従って US1 を独立検証

### Incremental Delivery

- US1 → US2 → US3 の順に追加し、各ストーリーごとに quickstart の手順で検証する

# Feature Specification: ヘッダーメニュー（文字列化 + 学習項目追加）

**Feature Branch**: `001-header-menu-text`  
**Created**: 2026-03-06  
**Status**: Draft  
**Input**: User description: "ヘッダーメニューですが、ボタンではなく文字列のみに変更してください。メニューに学習項目を追加してください。メニューの並び順は、学習項目→復習→集計→設定にすること。"

## Clarifications

### Session 2026-03-06

- Q: 「文字列のみ」のhover/active表現はどれにする？ → A: Option B（hover: 文字色のみ変化 / active: 太字のみ。背景なし・枠なし・角丸なし）
- Q: 「学習項目」はどのルートに遷移する？ → A: Option A（`/`（トップ/ItemsPage）へ遷移）
- Q: 「設定」メニューの表示文言はどれにする？ → A: Option A（「設定（プリセット）」）

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - 4項目メニューで主要画面へ移動できる (Priority: P1)

ユーザーは、ヘッダーに表示されたメニューを使って、主要画面（学習項目/復習/集計/設定（プリセット））へ迷わず移動できる。

**Why this priority**: 主要導線の改善が直接ユーザー価値に直結し、最小の実装で確認できる。

**Independent Test**: 任意の画面でヘッダーメニューが表示され、メニュー操作だけで4画面に到達できることを確認する。

**Acceptance Scenarios**:

1. **Given** ユーザーがアプリ内の任意の画面を表示している, **When** ヘッダーメニューを見る, **Then** 「学習項目」「復習」「集計」「設定（プリセット）」が表示されている
2. **Given** ユーザーがアプリ内の任意の画面を表示している, **When** 各メニュー項目を選択する, **Then** 1回の操作で対応画面へ遷移できる（学習項目は `/` へ遷移する）

---

### User Story 2 - メニューが文字列のみで軽量に見える (Priority: P2)

ユーザーは、ヘッダーメニューが「ボタン」ではなく「文字列」として表示されていることで、画面の主目的（学習/復習）を邪魔しない軽量なナビゲーションとして利用できる。

**Why this priority**: 表示スタイルの変更は誤解（ボタンに見える/押下感が強すぎる）を減らし、デザインの意図に合わせるために必要。

**Independent Test**: ヘッダーメニューの項目が「文字列」として表示され、ボタン形状（塗り/枠/ボタンの見た目）になっていないことを目視で確認する。

**Acceptance Scenarios**:

1. **Given** ユーザーが任意の画面を表示している, **When** ヘッダーメニューを見る, **Then** メニュー項目は文字列として表示され、背景/枠/角丸のない見た目でボタン形状として認識されない
2. **Given** ユーザーが任意の画面を表示している, **When** 現在ページに対応するメニュー項目を見る, **Then** アクティブ状態が「太字」のみで判別できる（下線や背景は不要）

---

### User Story 3 - 狭い画面でもメニューが欠落しない (Priority: P3)

ユーザーは、画面幅が狭い場合でもヘッダーメニューの全項目が欠落せず、操作可能な状態を維持できる。

**Why this priority**: モバイル相当の利用でも主要導線が崩れないことは、利用継続に必要。

**Independent Test**: 表示幅を狭くしても、4メニュー項目が常に表示され操作できることを確認する。

**Acceptance Scenarios**:

1. **Given** 画面幅が狭い状態で主要ページを表示している, **When** ヘッダーメニューを見る, **Then** 4メニュー項目が欠落せず表示され、操作可能である

---

### Edge Cases

- 表示幅が非常に狭い場合でも、メニュー項目が欠落しないこと（折り返しは許容）
- 現在ページのアクティブ状態が判別できない状態にならないこと
- メニュー項目の文言が長くても、操作対象が不明瞭にならないこと
- 先頭ページ（学習項目）を表示中でも、対応するメニュー項目がアクティブとして判別できること

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: システムはアプリ内の全画面でヘッダーメニューを表示しなければならない
- **FR-002**: システムはヘッダーメニューに「学習項目」「復習」「集計」「設定（プリセット）」の4項目を表示しなければならない
- **FR-003**: メニューの並び順は「学習項目 → 復習 → 集計 → 設定（プリセット）」でなければならない
- **FR-004**: ユーザーは各メニュー項目を1回の操作で対応画面へ遷移できなければならない
- **FR-010**: 「学習項目」を選択した場合、システムは `/`（トップ/ItemsPage）へ遷移させなければならない
- **FR-005**: 現在表示中ページに対応するメニュー項目は、他項目と区別できるアクティブ表示でなければならない
- **FR-006**: ヘッダーメニューの各項目は「文字列」として表示されなければならない（背景で塗られたり枠で囲われたり角丸になったりするボタン様の見た目にならない）
- **FR-008**: hover時は文字色の変化のみでフィードバックしなければならない（下線/背景/枠は使用しない）
- **FR-009**: アクティブ表示は太字のみで判別できなければならない（下線/背景/枠は使用しない）
- **FR-007**: 画面幅が狭い場合でも、4項目すべてが欠落せず表示され、操作可能でなければならない

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 主要ページでヘッダーメニューに4項目（学習項目/復習/集計/設定（プリセット））が正しい順序で表示されることを、表示試験で100%確認できる
- **SC-002**: ユーザーは任意の主要ページから、ヘッダーメニューの1回の操作で4画面のいずれにも到達できる
- **SC-003**: アクティブ表示が、主要ページで常に判別できることを表示試験で100%確認できる
- **SC-004**: ヘッダーメニューが「文字列のみ」である（ボタン形状として認識されない）ことを、レビュー参加者2名以上の合意で記録できる

## Assumptions

- 「学習項目」は、既存の学習項目一覧（トップ/`/` 相当）を指す
- 「設定（プリセット）」は、既存のプリセット管理画面を指す

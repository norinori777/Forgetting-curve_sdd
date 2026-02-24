# Data Model: 忘却曲線管理（Forgetting Curve Manager）

**Branch**: 001-forgetting-curve-manager  
**Date**: 2026-02-24  
**Source**: specs/001-forgetting-curve-manager/spec.md

本ドキュメントは、仕様の Key Entities / Requirements をデータ視点で具体化する（特定DB製品のDDLは含めない）。

注: 実装は PostgreSQL + Prisma を想定するが、ここでは概念モデルとして表現する。

---

## Entities

### 1) User (ローカルプロファイル)

単一ユーザー前提の設定と集計の単位。

- Fields
  - id: id（UUIDなどの安定ID）
  - display_name: string（任意）
  - active_review_preset_id: id（必須）
  - created_at: datetime
  - updated_at: datetime

- Notes
  - ログイン/認証は行わないため、実体としては「設定（singleton）」に近い（DB上は1行でも良い）。

### 2) Learning Item（学習項目）

学習対象（覚えたい内容）。

- Fields
  - id: id（UUIDなど）
  - title: string（必須）
  - content: string（任意）
  - tags: string[]（任意）
  - status: enum（active/archived を想定、MVPでは active のみでも可）
  - created_at: datetime
  - updated_at: datetime

- Validation rules
  - title は空不可
  - tags は任意。空文字タグは不可

### 3) Review Event（復習イベント）

復習の実施記録。

- Fields
  - id: id（UUIDなど）
  - learning_item_id: id（必須）
  - reviewed_on: date（必須）
  - result: enum（success/failure、必須）
  - difficulty: int（任意、1〜5）
  - memo: string（任意）
  - scheduled_due_on: date（必須、復習実施時点での予定日スナップショット）
  - scheduled_stage: int（必須、復習実施時点でのstageスナップショット）
  - created_at: datetime

- Validation rules
  - reviewed_on は未来日不可
  - difficulty を入れる場合は 1〜5

### 4) Review Schedule（復習予定）

学習項目ごとの次回復習予定。

- Fields
  - learning_item_id: id（必須、学習項目と1:1）
  - due_on: date（必須）
  - stage: int（必須、0以上）
  - last_reviewed_on: date（任意、初回は空）
  - updated_at: datetime

- Invariants
  - learning_item_id ごとに1件
  - due_on は date（期限内判定が日単位のため）

### 5) Review Preset（復習間隔プリセット）

復習間隔（日数）の配列を持つ設定。ユーザーが編集できる（FR-008）。

- Fields
  - id: id
  - name: string（必須）
  - intervals_days: int[]（必須、要素数>=1、各要素>=0）
  - created_at: datetime
  - updated_at: datetime

- Validation rules
  - intervals_days は空不可
  - 各要素は 0 以上（0 は「同日復習」などを表現可能）

---

## Relationships

- User 1 --- N Review Preset（ローカルで複数プリセットを保持可能）
- Learning Item 1 --- N Review Event
- Learning Item 1 --- 1 Review Schedule
- User 1 --- 1 Active Review Preset（active_review_preset_id）

---

## Derived Rules / State Transitions

### Schedule 更新（FR-006, FR-008）

復習イベントを記録したら、該当学習項目の Review Schedule を更新する。

- Inputs
  - review_event.reviewed_on（date）
  - review_event.result（success/failure）
  - active preset.intervals_days

- State transition（MVPの既定ルール）
  - on success:
    - stage を +1（ただし最大は intervals_days の最終インデックス）
  - on failure:
    - stage を 0 に戻す

- due_on の算出
  - new_stage = 遷移後の stage（successなら+1、failureなら0）
  - new_stage が intervals_days の範囲外なら最終インデックスにクランプ
  - due_on = reviewed_on + intervals_days[new_stage]

- スナップショット
  - Review Event の作成時に、その時点の `Review Schedule.due_on` と `stage` を `scheduled_due_on` / `scheduled_stage` として保存する。
  - これにより、後からプリセットが編集されても「当時の予定日」基準の集計が可能になる。

### 期限内/遅延の定義（FR-007）

- 期限内: Review Schedule の due_on と同じ日（date）に復習イベントが記録される
- 遅延: due_on より後の日に復習イベントが記録される

---

## Reporting / Aggregations

指定期間（例: 直近7日）に対して以下を算出する。

- 復習成功率: period内の Review Event について success / (success+failure)
- 遅延数: period内の Review Event のうち、due_on より後に実施された件数
- 期限内実施率: period内の Review Event のうち、due_on と同日実施の割合

注: due_on は「当時の予定日」を参照できる必要があるため、rationale_snapshot に当時の due_on / stage / preset 情報を保存する、または履歴参照可能な形で保持する（実装で選択）。

MVPでは `Review Event.scheduled_due_on` を用いて、期限内/遅延の判定と集計を行う。

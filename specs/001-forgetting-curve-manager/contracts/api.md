# Contracts: REST API（Forgetting Curve Manager）

**Branch**: 001-forgetting-curve-manager  
**Date**: 2026-02-24  
**Source**: specs/001-forgetting-curve-manager/spec.md

このドキュメントは、フロントエンド/バックエンド間の契約（エンドポイントと入出力）を定義する。
実装では zod を一次ソースとして入出力を検証し、可能な範囲でFE/BEで共有する。

---

## Conventions

- Base path: `/api`
- Date: `YYYY-MM-DD`（日付のみ。時刻は扱わない）
- ID: `string`（UUIDを想定）

### Error format

- Status: `4xx/5xx`
- Body:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "details": {}
  }
}
```

---

## Schemas（概念）

（zodで表現する想定の概念スキーマ。ここでは構造のみを固定する）

### LearningItem

```ts
type LearningItem = {
  id: string
  title: string
  content?: string | null
  tags: string[]
  createdAt: string
  updatedAt: string
}
```

### ReviewSchedule

```ts
type ReviewSchedule = {
  learningItemId: string
  dueOn: string // YYYY-MM-DD
  stage: number
  lastReviewedOn?: string | null
  updatedAt: string
}
```

### ReviewEvent

```ts
type ReviewEvent = {
  id: string
  learningItemId: string
  reviewedOn: string // YYYY-MM-DD
  result: "success" | "failure"
  difficulty?: number | null // 1..5
  memo?: string | null
  scheduledDueOn: string // YYYY-MM-DD（実施時点の予定日）
  scheduledStage: number // 実施時点のstage
  createdAt: string
}
```

### ReviewPreset

```ts
type ReviewPreset = {
  id: string
  name: string
  intervalsDays: number[]
  createdAt: string
  updatedAt: string
}
```

### Settings（単一ユーザー）

```ts
type Settings = {
  displayName?: string | null
  activeReviewPresetId: string
}
```

---

## Endpoints

### 学習項目（FR-001）

#### POST `/api/items`

- Request

```json
{ "title": "英単語: apple", "content": "りんご", "tags": ["english"] }
```

- Response `201`

```json
{ "item": { /* LearningItem */ }, "schedule": { /* ReviewSchedule */ } }
```

#### GET `/api/items`

- Purpose: 一覧表示（FR-002, FR-003）
- Response `200`

```json
{
  "items": [
    { "item": { /* LearningItem */ }, "schedule": { /* ReviewSchedule */ } }
  ]
}
```

並び順は `schedule.dueOn` の昇順を基本とする。期限切れ表示はフロント側で `dueOn < today`（日付比較）で識別する。

#### GET `/api/items/:id`

- Purpose: 詳細表示（学習項目 + 予定 + 直近の履歴）
- Response `200`

```json
{
  "item": { /* LearningItem */ },
  "schedule": { /* ReviewSchedule */ },
  "recentEvents": [ /* ReviewEvent */ ]
}
```

#### PATCH `/api/items/:id`

- Request（部分更新）

```json
{ "title": "...", "content": "...", "tags": ["..."] }
```

- Response `200`

```json
{ "item": { /* LearningItem */ } }
```

#### DELETE `/api/items/:id`

- Purpose: 削除（FR-001）
- Response `204`（bodyなし）

---

### 復習（FR-004, FR-005, FR-006）

#### POST `/api/items/:id/reviews`

- Request

```json
{ "reviewedOn": "2026-02-24", "result": "success", "difficulty": 3, "memo": "..." }
```

- Response `201`

```json
{ "event": { /* ReviewEvent */ }, "schedule": { /* ReviewSchedule */ } }
```

サーバは、復習記録時点の `schedule.dueOn` / `schedule.stage` を `event.scheduledDueOn` / `event.scheduledStage` に保存し、
その後に次回予定（schedule）を更新する。

---

### プリセット（FR-008）

#### GET `/api/presets`

- Response `200`

```json
{ "presets": [ /* ReviewPreset */ ], "activeReviewPresetId": "..." }
```

#### PATCH `/api/presets/:id`

- Request

```json
{ "name": "default", "intervalsDays": [0, 1, 3, 7] }
```

- Response `200`

```json
{ "preset": { /* ReviewPreset */ } }
```

#### PUT `/api/presets/active`

- Request

```json
{ "activeReviewPresetId": "..." }
```

- Response `200`

```json
{ "settings": { /* Settings */ } }
```

---

### 集計（FR-007）

#### GET `/api/stats`

- Query
  - `from=YYYY-MM-DD`（必須）
  - `to=YYYY-MM-DD`（必須、from以上）

- Response `200`

```json
{
  "from": "2026-02-18",
  "to": "2026-02-24",
  "totalReviews": 10,
  "successCount": 7,
  "failureCount": 3,
  "onTimeCount": 4,
  "lateCount": 6,
  "successRate": 0.7,
  "onTimeRate": 0.4
}
```

期限内/遅延は `ReviewEvent.reviewedOn` と `ReviewEvent.scheduledDueOn` の日付比較で判定する（期限内=同日）。

# Quickstart: 忘却曲線管理（Forgetting Curve Manager）

**Branch**: 001-forgetting-curve-manager  
**Date**: 2026-02-24

このドキュメントは、実装完了後にローカルでMVPを動かして検証するための手順をまとめる。

---

## Prerequisites

- Node.js（LTS推奨）
- npm（またはpnpm/yarn）
- PostgreSQL（ローカルで起動できること）

（注）本リポジトリは現時点でソースコード未配置のため、ここに記載するコマンド名/構成は plan.md と contracts/api.md に基づく想定。

---

## Setup（実装後）

### Backend Setup

- 依存関係インストール（例）
  - `cd backend`
  - `npm install`

- 環境変数（例）
  - `DATABASE_URL=postgresql://...`

- Prismaセットアップ（例）
  - `npx prisma migrate dev`
  - `npx prisma generate`

### Frontend Setup

- 依存関係インストール（例）
  - `cd frontend`
  - `npm install`

---

## Run（実装後）

### Backend Run

- 開発サーバ起動（例）
  - `cd backend`
  - `npm run dev`

### Frontend Run

- 開発サーバ起動（例）
  - `cd frontend`
  - `npm run dev`

### APIの手動検証（例）

- 学習項目を追加
  - `POST /api/items` （body: title/content/tags）
- 復習結果を記録
  - `POST /api/items/:id/reviews` （body: reviewedOn/result/difficulty?/memo?）
- 集計
  - `GET /api/stats?from=YYYY-MM-DD&to=YYYY-MM-DD`

---

## Verification Checklist（実装後）

- P1: 追加した学習項目が一覧に出て、次回復習予定日が表示される
- P2: success/failure を記録すると、次回復習予定日が更新される
- P3: 期間指定で、期限内実施率・遅延数・成功率が表示される（期限内=予定日同日実施）
- FR-008: プリセット編集後、以後の予定更新に反映される
- FR-009: スマホ/タブレット/PC それぞれで主要画面が操作でき、レイアウト崩れで操作不能にならない

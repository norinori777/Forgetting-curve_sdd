# Forgetting_curve Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-02-24

## Active Technologies
- TypeScript（frontend/backend）, Node.js（LTS想定） + React + Vite, Tailwind, react-router-dom, axios, @tanstack/react-query, react-hook-form, zod / Express, Prisma, pino, zod (001-forgetting-curve-manager)
- PostgreSQL（Prismaでマイグレーション管理） (001-forgetting-curve-manager)
- TypeScript（frontend/backend）, Node.js（LTS想定） + React 18 + Vite, react-router-dom, @tanstack/react-query, axios, react-hook-form, zod, Tailwind CSS, Material UI（@mui/material）+ Emotion（@emotion/react, @emotion/styled） (002-mui-pastel-theme)
- 既存は PostgreSQL（Prisma）だが、本featureはデータ/DB変更なし (002-mui-pastel-theme)
- TypeScript（frontend: React + Vite） + React, Vite, Tailwind CSS, @tanstack/react-query, react-hook-form, zod (003-item-add-modal)
- N/A（本featureはフロントの表示/導線変更のみ） (003-item-add-modal)

## Project Structure

```text
backend/
frontend/
shared/
```

## Commands

cd backend; npm run dev
cd backend; npm test
cd backend; npx prisma migrate dev
cd frontend; npm run dev
cd frontend; npm test

## Code Style

TypeScript: Follow existing lint/format rules in the repo

## Recent Changes
- 003-item-add-modal: Added TypeScript（frontend: React + Vite） + React, Vite, Tailwind CSS, @tanstack/react-query, react-hook-form, zod
- 002-mui-pastel-theme: Added TypeScript（frontend/backend）, Node.js（LTS想定） + React 18 + Vite, react-router-dom, @tanstack/react-query, axios, react-hook-form, zod, Tailwind CSS
- 002-mui-pastel-theme: Added TypeScript（frontend/backend）, Node.js（LTS想定） + React 18 + Vite, react-router-dom, @tanstack/react-query, axios, react-hook-form, zod, Tailwind CSS, Material UI（@mui/material）+ Emotion（@emotion/react, @emotion/styled）


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->

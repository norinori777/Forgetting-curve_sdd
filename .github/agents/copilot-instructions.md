# Forgetting_curve Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-02-24

## Active Technologies
- TypeScript（frontend/backend）, Node.js（LTS想定） + React + Vite, Tailwind, react-router-dom, axios, @tanstack/react-query, react-hook-form, zod / Express, Prisma, pino, zod (001-forgetting-curve-manager)
- PostgreSQL（Prismaでマイグレーション管理） (001-forgetting-curve-manager)

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
- 001-forgetting-curve-manager: Added TypeScript（frontend/backend）, Node.js（LTS想定） + React + Vite, Tailwind, react-router-dom, axios, @tanstack/react-query, react-hook-form, zod / Express, Prisma, pino, zod


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->

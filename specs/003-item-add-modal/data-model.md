# Data Model: 学習項目追加モーダル化

**Branch**: 003-item-add-modal  
**Date**: 2026-03-02  
**Spec**: [spec.md](./spec.md)

## Summary

本featureは UI 導線（追加フォームの表示方法）を変更するものであり、データモデルの追加/変更は行わない。

## Entities

### 学習項目（既存）

- **Fields**:
  - `title`（必須）
  - `content`（任意）
  - `tags`（任意）

## Relationships

- 変更なし

## Validation Rules

- `title` は必須（既存のフォームバリデーションに従う）

## State Transitions

- 変更なし

import { z } from "zod";

import { IdSchema } from "./items";

export const ReviewPresetSchema = z.object({
  id: IdSchema,
  name: z.string(),
  intervalsDays: z.array(z.number().int().min(0)),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ReviewPreset = z.infer<typeof ReviewPresetSchema>;

export const SettingsSchema = z.object({
  displayName: z.string().nullable().optional(),
  activeReviewPresetId: IdSchema,
});

export type Settings = z.infer<typeof SettingsSchema>;

export const GetPresetsResponseSchema = z.object({
  presets: z.array(ReviewPresetSchema),
  activeReviewPresetId: IdSchema,
});

export type GetPresetsResponse = z.infer<typeof GetPresetsResponseSchema>;

export const PatchPresetBodySchema = z
  .object({
    name: z.string().min(1).optional(),
    intervalsDays: z.array(z.number().int().min(0)).min(1).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided",
  });

export type PatchPresetBody = z.infer<typeof PatchPresetBodySchema>;

export const PatchPresetResponseSchema = z.object({
  preset: ReviewPresetSchema,
});

export type PatchPresetResponse = z.infer<typeof PatchPresetResponseSchema>;

export const PutActivePresetBodySchema = z.object({
  activeReviewPresetId: IdSchema,
});

export type PutActivePresetBody = z.infer<typeof PutActivePresetBodySchema>;

export const PutActivePresetResponseSchema = z.object({
  settings: SettingsSchema,
});

export type PutActivePresetResponse = z.infer<typeof PutActivePresetResponseSchema>;

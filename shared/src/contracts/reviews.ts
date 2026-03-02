import { z } from "zod";

import { IsoDateSchema, ReviewEventSchema, ReviewScheduleSchema } from "./items";

export const ReviewResultSchema = z.enum(["success", "failure"]);
export type ReviewResult = z.infer<typeof ReviewResultSchema>;

export const PostReviewBodySchema = z.object({
  reviewedOn: IsoDateSchema,
  result: ReviewResultSchema,
  difficulty: z.number().int().min(1).max(5).optional(),
  memo: z.string().optional(),
});

export type PostReviewBody = z.infer<typeof PostReviewBodySchema>;

export const PostReviewResponseSchema = z.object({
  event: ReviewEventSchema,
  schedule: ReviewScheduleSchema,
});

export type PostReviewResponse = z.infer<typeof PostReviewResponseSchema>;

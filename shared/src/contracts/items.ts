import { z } from "zod";

export const IdSchema = z.string();
export type Id = z.infer<typeof IdSchema>;

export const IsoDateSchema = z.string();
export type IsoDateString = z.infer<typeof IsoDateSchema>;

export const LearningItemSchema = z.object({
  id: IdSchema,
  title: z.string(),
  content: z.string().nullable().optional(),
  tags: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type LearningItem = z.infer<typeof LearningItemSchema>;

export const ReviewScheduleSchema = z.object({
  learningItemId: IdSchema,
  dueOn: IsoDateSchema,
  stage: z.number().int(),
  lastReviewedOn: IsoDateSchema.nullable().optional(),
  updatedAt: z.string(),
});

export type ReviewSchedule = z.infer<typeof ReviewScheduleSchema>;

export const ReviewEventSchema = z.object({
  id: IdSchema,
  learningItemId: IdSchema,
  reviewedOn: IsoDateSchema,
  result: z.enum(["success", "failure"]),
  difficulty: z.number().int().min(1).max(5).nullable().optional(),
  memo: z.string().nullable().optional(),
  scheduledDueOn: IsoDateSchema,
  scheduledStage: z.number().int(),
  createdAt: z.string(),
});

export type ReviewEvent = z.infer<typeof ReviewEventSchema>;

export const CreateItemBodySchema = z.object({
  title: z.string().min(1),
  content: z.string().optional(),
  tags: z.array(z.string().min(1)).optional(),
});

export type CreateItemBody = z.infer<typeof CreateItemBodySchema>;

export const UpdateItemBodySchema = z
  .object({
    title: z.string().min(1).optional(),
    content: z.string().nullable().optional(),
    tags: z.array(z.string().min(1)).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided",
  });

export type UpdateItemBody = z.infer<typeof UpdateItemBodySchema>;

export const ItemWithScheduleSchema = z.object({
  item: LearningItemSchema,
  schedule: ReviewScheduleSchema,
});

export type ItemWithSchedule = z.infer<typeof ItemWithScheduleSchema>;

export const PostItemResponseSchema = z.object({
  item: LearningItemSchema,
  schedule: ReviewScheduleSchema,
});

export type PostItemResponse = z.infer<typeof PostItemResponseSchema>;

export const GetItemsResponseSchema = z.object({
  items: z.array(ItemWithScheduleSchema),
});

export type GetItemsResponse = z.infer<typeof GetItemsResponseSchema>;

export const GetItemDetailResponseSchema = z.object({
  item: LearningItemSchema,
  schedule: ReviewScheduleSchema,
  recentEvents: z.array(ReviewEventSchema),
});

export type GetItemDetailResponse = z.infer<typeof GetItemDetailResponseSchema>;

export const PatchItemResponseSchema = z.object({
  item: LearningItemSchema,
});

export type PatchItemResponse = z.infer<typeof PatchItemResponseSchema>;

import { z } from "zod";
export const IdSchema = z.string();
export const IsoDateSchema = z.string();
export const LearningItemSchema = z.object({
    id: IdSchema,
    title: z.string(),
    content: z.string().nullable().optional(),
    tags: z.array(z.string()),
    createdAt: z.string(),
    updatedAt: z.string(),
});
export const ReviewScheduleSchema = z.object({
    learningItemId: IdSchema,
    dueOn: IsoDateSchema,
    stage: z.number().int(),
    lastReviewedOn: IsoDateSchema.nullable().optional(),
    updatedAt: z.string(),
});
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
export const CreateItemBodySchema = z.object({
    title: z.string().min(1),
    content: z.string().optional(),
    tags: z.array(z.string().min(1)).optional(),
});
export const UpdateItemBodySchema = z
    .object({
    title: z.string().min(1).optional(),
    content: z.string().nullable().optional(),
    tags: z.array(z.string().min(1)).optional(),
})
    .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided",
});
export const ItemWithScheduleSchema = z.object({
    item: LearningItemSchema,
    schedule: ReviewScheduleSchema,
});
export const PostItemResponseSchema = z.object({
    item: LearningItemSchema,
    schedule: ReviewScheduleSchema,
});
export const GetItemsResponseSchema = z.object({
    items: z.array(ItemWithScheduleSchema),
});
export const GetItemDetailResponseSchema = z.object({
    item: LearningItemSchema,
    schedule: ReviewScheduleSchema,
    recentEvents: z.array(ReviewEventSchema),
});
export const PatchItemResponseSchema = z.object({
    item: LearningItemSchema,
});
//# sourceMappingURL=items.js.map
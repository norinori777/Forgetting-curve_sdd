import { z } from "zod";
export declare const IdSchema: z.ZodString;
export type Id = z.infer<typeof IdSchema>;
export declare const IsoDateSchema: z.ZodString;
export type IsoDateString = z.infer<typeof IsoDateSchema>;
export declare const LearningItemSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    content: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    tags: z.ZodArray<z.ZodString, "many">;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    content?: string | null | undefined;
}, {
    id: string;
    title: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    content?: string | null | undefined;
}>;
export type LearningItem = z.infer<typeof LearningItemSchema>;
export declare const ReviewScheduleSchema: z.ZodObject<{
    learningItemId: z.ZodString;
    dueOn: z.ZodString;
    stage: z.ZodNumber;
    lastReviewedOn: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    updatedAt: string;
    learningItemId: string;
    dueOn: string;
    stage: number;
    lastReviewedOn?: string | null | undefined;
}, {
    updatedAt: string;
    learningItemId: string;
    dueOn: string;
    stage: number;
    lastReviewedOn?: string | null | undefined;
}>;
export type ReviewSchedule = z.infer<typeof ReviewScheduleSchema>;
export declare const ReviewEventSchema: z.ZodObject<{
    id: z.ZodString;
    learningItemId: z.ZodString;
    reviewedOn: z.ZodString;
    result: z.ZodEnum<["success", "failure"]>;
    difficulty: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    memo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    scheduledDueOn: z.ZodString;
    scheduledStage: z.ZodNumber;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    learningItemId: string;
    reviewedOn: string;
    result: "success" | "failure";
    scheduledDueOn: string;
    scheduledStage: number;
    difficulty?: number | null | undefined;
    memo?: string | null | undefined;
}, {
    id: string;
    createdAt: string;
    learningItemId: string;
    reviewedOn: string;
    result: "success" | "failure";
    scheduledDueOn: string;
    scheduledStage: number;
    difficulty?: number | null | undefined;
    memo?: string | null | undefined;
}>;
export type ReviewEvent = z.infer<typeof ReviewEventSchema>;
export declare const CreateItemBodySchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    title: string;
    content?: string | undefined;
    tags?: string[] | undefined;
}, {
    title: string;
    content?: string | undefined;
    tags?: string[] | undefined;
}>;
export type CreateItemBody = z.infer<typeof CreateItemBodySchema>;
export declare const UpdateItemBodySchema: z.ZodEffects<z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    content?: string | null | undefined;
    tags?: string[] | undefined;
}, {
    title?: string | undefined;
    content?: string | null | undefined;
    tags?: string[] | undefined;
}>, {
    title?: string | undefined;
    content?: string | null | undefined;
    tags?: string[] | undefined;
}, {
    title?: string | undefined;
    content?: string | null | undefined;
    tags?: string[] | undefined;
}>;
export type UpdateItemBody = z.infer<typeof UpdateItemBodySchema>;
export declare const ItemWithScheduleSchema: z.ZodObject<{
    item: z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        content: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tags: z.ZodArray<z.ZodString, "many">;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        title: string;
        tags: string[];
        createdAt: string;
        updatedAt: string;
        content?: string | null | undefined;
    }, {
        id: string;
        title: string;
        tags: string[];
        createdAt: string;
        updatedAt: string;
        content?: string | null | undefined;
    }>;
    schedule: z.ZodObject<{
        learningItemId: z.ZodString;
        dueOn: z.ZodString;
        stage: z.ZodNumber;
        lastReviewedOn: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        updatedAt: string;
        learningItemId: string;
        dueOn: string;
        stage: number;
        lastReviewedOn?: string | null | undefined;
    }, {
        updatedAt: string;
        learningItemId: string;
        dueOn: string;
        stage: number;
        lastReviewedOn?: string | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    item: {
        id: string;
        title: string;
        tags: string[];
        createdAt: string;
        updatedAt: string;
        content?: string | null | undefined;
    };
    schedule: {
        updatedAt: string;
        learningItemId: string;
        dueOn: string;
        stage: number;
        lastReviewedOn?: string | null | undefined;
    };
}, {
    item: {
        id: string;
        title: string;
        tags: string[];
        createdAt: string;
        updatedAt: string;
        content?: string | null | undefined;
    };
    schedule: {
        updatedAt: string;
        learningItemId: string;
        dueOn: string;
        stage: number;
        lastReviewedOn?: string | null | undefined;
    };
}>;
export type ItemWithSchedule = z.infer<typeof ItemWithScheduleSchema>;
export declare const PostItemResponseSchema: z.ZodObject<{
    item: z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        content: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tags: z.ZodArray<z.ZodString, "many">;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        title: string;
        tags: string[];
        createdAt: string;
        updatedAt: string;
        content?: string | null | undefined;
    }, {
        id: string;
        title: string;
        tags: string[];
        createdAt: string;
        updatedAt: string;
        content?: string | null | undefined;
    }>;
    schedule: z.ZodObject<{
        learningItemId: z.ZodString;
        dueOn: z.ZodString;
        stage: z.ZodNumber;
        lastReviewedOn: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        updatedAt: string;
        learningItemId: string;
        dueOn: string;
        stage: number;
        lastReviewedOn?: string | null | undefined;
    }, {
        updatedAt: string;
        learningItemId: string;
        dueOn: string;
        stage: number;
        lastReviewedOn?: string | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    item: {
        id: string;
        title: string;
        tags: string[];
        createdAt: string;
        updatedAt: string;
        content?: string | null | undefined;
    };
    schedule: {
        updatedAt: string;
        learningItemId: string;
        dueOn: string;
        stage: number;
        lastReviewedOn?: string | null | undefined;
    };
}, {
    item: {
        id: string;
        title: string;
        tags: string[];
        createdAt: string;
        updatedAt: string;
        content?: string | null | undefined;
    };
    schedule: {
        updatedAt: string;
        learningItemId: string;
        dueOn: string;
        stage: number;
        lastReviewedOn?: string | null | undefined;
    };
}>;
export type PostItemResponse = z.infer<typeof PostItemResponseSchema>;
export declare const GetItemsResponseSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        item: z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            content: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            tags: z.ZodArray<z.ZodString, "many">;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            title: string;
            tags: string[];
            createdAt: string;
            updatedAt: string;
            content?: string | null | undefined;
        }, {
            id: string;
            title: string;
            tags: string[];
            createdAt: string;
            updatedAt: string;
            content?: string | null | undefined;
        }>;
        schedule: z.ZodObject<{
            learningItemId: z.ZodString;
            dueOn: z.ZodString;
            stage: z.ZodNumber;
            lastReviewedOn: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            updatedAt: string;
            learningItemId: string;
            dueOn: string;
            stage: number;
            lastReviewedOn?: string | null | undefined;
        }, {
            updatedAt: string;
            learningItemId: string;
            dueOn: string;
            stage: number;
            lastReviewedOn?: string | null | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        item: {
            id: string;
            title: string;
            tags: string[];
            createdAt: string;
            updatedAt: string;
            content?: string | null | undefined;
        };
        schedule: {
            updatedAt: string;
            learningItemId: string;
            dueOn: string;
            stage: number;
            lastReviewedOn?: string | null | undefined;
        };
    }, {
        item: {
            id: string;
            title: string;
            tags: string[];
            createdAt: string;
            updatedAt: string;
            content?: string | null | undefined;
        };
        schedule: {
            updatedAt: string;
            learningItemId: string;
            dueOn: string;
            stage: number;
            lastReviewedOn?: string | null | undefined;
        };
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    items: {
        item: {
            id: string;
            title: string;
            tags: string[];
            createdAt: string;
            updatedAt: string;
            content?: string | null | undefined;
        };
        schedule: {
            updatedAt: string;
            learningItemId: string;
            dueOn: string;
            stage: number;
            lastReviewedOn?: string | null | undefined;
        };
    }[];
}, {
    items: {
        item: {
            id: string;
            title: string;
            tags: string[];
            createdAt: string;
            updatedAt: string;
            content?: string | null | undefined;
        };
        schedule: {
            updatedAt: string;
            learningItemId: string;
            dueOn: string;
            stage: number;
            lastReviewedOn?: string | null | undefined;
        };
    }[];
}>;
export type GetItemsResponse = z.infer<typeof GetItemsResponseSchema>;
export declare const GetItemDetailResponseSchema: z.ZodObject<{
    item: z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        content: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tags: z.ZodArray<z.ZodString, "many">;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        title: string;
        tags: string[];
        createdAt: string;
        updatedAt: string;
        content?: string | null | undefined;
    }, {
        id: string;
        title: string;
        tags: string[];
        createdAt: string;
        updatedAt: string;
        content?: string | null | undefined;
    }>;
    schedule: z.ZodObject<{
        learningItemId: z.ZodString;
        dueOn: z.ZodString;
        stage: z.ZodNumber;
        lastReviewedOn: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        updatedAt: string;
        learningItemId: string;
        dueOn: string;
        stage: number;
        lastReviewedOn?: string | null | undefined;
    }, {
        updatedAt: string;
        learningItemId: string;
        dueOn: string;
        stage: number;
        lastReviewedOn?: string | null | undefined;
    }>;
    recentEvents: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        learningItemId: z.ZodString;
        reviewedOn: z.ZodString;
        result: z.ZodEnum<["success", "failure"]>;
        difficulty: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        memo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        scheduledDueOn: z.ZodString;
        scheduledStage: z.ZodNumber;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        learningItemId: string;
        reviewedOn: string;
        result: "success" | "failure";
        scheduledDueOn: string;
        scheduledStage: number;
        difficulty?: number | null | undefined;
        memo?: string | null | undefined;
    }, {
        id: string;
        createdAt: string;
        learningItemId: string;
        reviewedOn: string;
        result: "success" | "failure";
        scheduledDueOn: string;
        scheduledStage: number;
        difficulty?: number | null | undefined;
        memo?: string | null | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    item: {
        id: string;
        title: string;
        tags: string[];
        createdAt: string;
        updatedAt: string;
        content?: string | null | undefined;
    };
    schedule: {
        updatedAt: string;
        learningItemId: string;
        dueOn: string;
        stage: number;
        lastReviewedOn?: string | null | undefined;
    };
    recentEvents: {
        id: string;
        createdAt: string;
        learningItemId: string;
        reviewedOn: string;
        result: "success" | "failure";
        scheduledDueOn: string;
        scheduledStage: number;
        difficulty?: number | null | undefined;
        memo?: string | null | undefined;
    }[];
}, {
    item: {
        id: string;
        title: string;
        tags: string[];
        createdAt: string;
        updatedAt: string;
        content?: string | null | undefined;
    };
    schedule: {
        updatedAt: string;
        learningItemId: string;
        dueOn: string;
        stage: number;
        lastReviewedOn?: string | null | undefined;
    };
    recentEvents: {
        id: string;
        createdAt: string;
        learningItemId: string;
        reviewedOn: string;
        result: "success" | "failure";
        scheduledDueOn: string;
        scheduledStage: number;
        difficulty?: number | null | undefined;
        memo?: string | null | undefined;
    }[];
}>;
export type GetItemDetailResponse = z.infer<typeof GetItemDetailResponseSchema>;
export declare const PatchItemResponseSchema: z.ZodObject<{
    item: z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        content: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tags: z.ZodArray<z.ZodString, "many">;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        title: string;
        tags: string[];
        createdAt: string;
        updatedAt: string;
        content?: string | null | undefined;
    }, {
        id: string;
        title: string;
        tags: string[];
        createdAt: string;
        updatedAt: string;
        content?: string | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    item: {
        id: string;
        title: string;
        tags: string[];
        createdAt: string;
        updatedAt: string;
        content?: string | null | undefined;
    };
}, {
    item: {
        id: string;
        title: string;
        tags: string[];
        createdAt: string;
        updatedAt: string;
        content?: string | null | undefined;
    };
}>;
export type PatchItemResponse = z.infer<typeof PatchItemResponseSchema>;
//# sourceMappingURL=items.d.ts.map
import { z } from "zod";
export const ApiErrorCodeSchema = z.enum([
    "VALIDATION_ERROR",
    "NOT_FOUND",
    "INTERNAL_ERROR",
]);
export const ApiErrorSchema = z.object({
    error: z.object({
        code: ApiErrorCodeSchema,
        message: z.string(),
        details: z.unknown().optional(),
    }),
});
export function toApiError(params) {
    return {
        error: {
            code: params.code,
            message: params.message,
            details: params.details,
        },
    };
}
//# sourceMappingURL=error.js.map
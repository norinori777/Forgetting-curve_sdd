import { z } from "zod";
export declare const ApiErrorCodeSchema: z.ZodEnum<["VALIDATION_ERROR", "NOT_FOUND", "INTERNAL_ERROR"]>;
export type ApiErrorCode = z.infer<typeof ApiErrorCodeSchema>;
export declare const ApiErrorSchema: z.ZodObject<{
    error: z.ZodObject<{
        code: z.ZodEnum<["VALIDATION_ERROR", "NOT_FOUND", "INTERNAL_ERROR"]>;
        message: z.ZodString;
        details: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        code: "VALIDATION_ERROR" | "NOT_FOUND" | "INTERNAL_ERROR";
        message: string;
        details?: unknown;
    }, {
        code: "VALIDATION_ERROR" | "NOT_FOUND" | "INTERNAL_ERROR";
        message: string;
        details?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    error: {
        code: "VALIDATION_ERROR" | "NOT_FOUND" | "INTERNAL_ERROR";
        message: string;
        details?: unknown;
    };
}, {
    error: {
        code: "VALIDATION_ERROR" | "NOT_FOUND" | "INTERNAL_ERROR";
        message: string;
        details?: unknown;
    };
}>;
export type ApiError = z.infer<typeof ApiErrorSchema>;
export declare function toApiError(params: {
    code: ApiErrorCode;
    message: string;
    details?: unknown;
}): ApiError;
//# sourceMappingURL=error.d.ts.map
import { z } from "zod";

export const ApiErrorCodeSchema = z.enum([
  "VALIDATION_ERROR",
  "NOT_FOUND",
  "INTERNAL_ERROR",
]);

export type ApiErrorCode = z.infer<typeof ApiErrorCodeSchema>;

export const ApiErrorSchema = z.object({
  error: z.object({
    code: ApiErrorCodeSchema,
    message: z.string(),
    details: z.unknown().optional(),
  }),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

export function toApiError(params: {
  code: ApiErrorCode;
  message: string;
  details?: unknown;
}): ApiError {
  return {
    error: {
      code: params.code,
      message: params.message,
      details: params.details,
    },
  };
}

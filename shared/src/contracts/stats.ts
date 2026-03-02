import { z } from "zod";

import { IsoDateSchema } from "./items";

export const GetStatsQuerySchema = z
  .object({
    from: IsoDateSchema,
    to: IsoDateSchema,
  })
  .refine((value) => value.from <= value.to, {
    message: "from must be <= to",
  });

export type GetStatsQuery = z.infer<typeof GetStatsQuerySchema>;

export const GetStatsResponseSchema = z.object({
  from: IsoDateSchema,
  to: IsoDateSchema,
  totalReviews: z.number().int().min(0),
  successCount: z.number().int().min(0),
  failureCount: z.number().int().min(0),
  onTimeCount: z.number().int().min(0),
  lateCount: z.number().int().min(0),
  successRate: z.number().min(0).max(1),
  onTimeRate: z.number().min(0).max(1),
});

export type GetStatsResponse = z.infer<typeof GetStatsResponseSchema>;

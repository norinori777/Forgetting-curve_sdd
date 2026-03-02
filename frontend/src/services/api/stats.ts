import {
  GetStatsQuerySchema,
  GetStatsResponseSchema,
  type GetStatsQuery,
  type GetStatsResponse,
} from "@fc/shared";

import { http } from "./http";

export async function getStats(query: GetStatsQuery): Promise<GetStatsResponse> {
  const parsedQuery = GetStatsQuerySchema.parse(query);
  const res = await http.get("/stats", { params: parsedQuery });
  return GetStatsResponseSchema.parse(res.data);
}

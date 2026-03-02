import axios from "axios";

import { ApiErrorSchema } from "@fc/shared";

export function getApiErrorMessage(err: unknown): string | null {
  if (!axios.isAxiosError(err)) return null;
  if (!err.response?.data) return null;

  const parsed = ApiErrorSchema.safeParse(err.response.data);
  if (!parsed.success) return null;

  return parsed.data.error.message;
}

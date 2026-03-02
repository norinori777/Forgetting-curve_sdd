import {
  PostReviewBodySchema,
  PostReviewResponseSchema,
  type PostReviewBody,
  type PostReviewResponse,
} from "@fc/shared";

import { http } from "./http";

export async function postReview(
  itemId: string,
  body: PostReviewBody
): Promise<PostReviewResponse> {
  const parsedBody = PostReviewBodySchema.parse(body);
  const res = await http.post(`/items/${itemId}/reviews`, parsedBody);
  return PostReviewResponseSchema.parse(res.data);
}

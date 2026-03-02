import { Router } from "express";
import { z } from "zod";

import { PostReviewBodySchema, type PostReviewBody } from "@fc/shared";

import { createReview } from "../../services/reviews/reviewService";
import { validate } from "../middleware/validate";

export const reviewsRouter = Router();

const ItemIdParamsSchema = z.object({
  id: z.string(),
});

reviewsRouter.post(
  "/items/:id/reviews",
  validate({ params: ItemIdParamsSchema, body: PostReviewBodySchema }),
  async (req, res, next) => {
    try {
      const body = req.body as PostReviewBody;
      const result = await createReview(req.params.id, body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

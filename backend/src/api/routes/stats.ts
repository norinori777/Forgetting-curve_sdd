import { Router } from "express";

import { GetStatsQuerySchema, type GetStatsQuery } from "@fc/shared";

import { getStats } from "../../services/stats/statsService";
import { validate } from "../middleware/validate";

export const statsRouter = Router();

statsRouter.get(
  "/stats",
  validate({ query: GetStatsQuerySchema }),
  async (req, res, next) => {
    try {
      const query = req.query as unknown as GetStatsQuery;
      const result = await getStats({ from: query.from, to: query.to });
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

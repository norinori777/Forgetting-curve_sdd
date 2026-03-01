import cors from "cors";
import express from "express";

import { apiRouter } from "./api/router";
import { errorHandler } from "./api/middleware/errorHandler";
import { logger } from "./lib/logger";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use((req, _res, next) => {
    logger.info({ method: req.method, path: req.path }, "request");
    next();
  });

  app.use("/api", apiRouter);
  app.use(errorHandler);

  return app;
}

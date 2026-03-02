import { Router } from "express";

import { healthRouter } from "./routes/health";
import { itemsRouter } from "./routes/items";
import { presetsRouter } from "./routes/presets";
import { statsRouter } from "./routes/stats";

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(itemsRouter);
apiRouter.use(presetsRouter);
apiRouter.use(statsRouter);

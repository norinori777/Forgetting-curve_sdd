import { Router } from "express";

import { healthRouter } from "./routes/health";
import { itemsRouter } from "./routes/items";

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(itemsRouter);

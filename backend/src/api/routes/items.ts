import { Router } from "express";
import { z } from "zod";

import {
  CreateItemBodySchema,
  UpdateItemBodySchema,
  type CreateItemBody,
  type UpdateItemBody,
} from "@fc/shared";

import { validate } from "../middleware/validate";
import { reviewsRouter } from "./reviews";
import {
  createItem,
  deleteItem,
  getItemDetail,
  listItems,
  updateItem,
} from "../../services/items/itemsService";

export const itemsRouter = Router();

itemsRouter.use(reviewsRouter);

const ItemIdParamsSchema = z.object({
  id: z.string(),
});

itemsRouter.post(
  "/items",
  validate({ body: CreateItemBodySchema }),
  async (req, res, next) => {
    try {
      const body = req.body as CreateItemBody;
      const result = await createItem(body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

itemsRouter.get("/items", async (_req, res, next) => {
  try {
    const result = await listItems();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

itemsRouter.get(
  "/items/:id",
  validate({ params: ItemIdParamsSchema }),
  async (req, res, next) => {
    try {
      const result = await getItemDetail(req.params.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

itemsRouter.patch(
  "/items/:id",
  validate({ params: ItemIdParamsSchema, body: UpdateItemBodySchema }),
  async (req, res, next) => {
    try {
      const body = req.body as UpdateItemBody;
      const result = await updateItem(req.params.id, body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

itemsRouter.delete(
  "/items/:id",
  validate({ params: ItemIdParamsSchema }),
  async (req, res, next) => {
    try {
      await deleteItem(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

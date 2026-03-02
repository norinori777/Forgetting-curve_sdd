import { Prisma } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";

import {
  PatchPresetBodySchema,
  PutActivePresetBodySchema,
  type PatchPresetBody,
  type PutActivePresetBody,
  type ReviewPreset,
  type Settings,
} from "@fc/shared";

import { HttpError } from "../middleware/errorHandler";
import { validate } from "../middleware/validate";
import { prisma } from "../../db/prisma";

export const presetsRouter = Router();

const PresetIdParamsSchema = z.object({
  id: z.string(),
});

function mapPreset(row: {
  id: string;
  name: string;
  intervalsDays: number[];
  createdAt: Date;
  updatedAt: Date;
}): ReviewPreset {
  return {
    id: row.id,
    name: row.name,
    intervalsDays: row.intervalsDays,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function mapSettings(row: {
  activeReviewPresetId: string;
}): Settings {
  return {
    activeReviewPresetId: row.activeReviewPresetId,
  };
}

presetsRouter.get("/presets", async (_req, res, next) => {
  try {
    const [presets, settings] = await prisma.$transaction([
      prisma.reviewPreset.findMany({ orderBy: { name: "asc" } }),
      prisma.settings.findUnique({ where: { id: 1 } }),
    ]);

    if (!settings) {
      throw new HttpError({
        status: 500,
        code: "INTERNAL_ERROR",
        message: "Settings not initialized",
      });
    }

    res.json({
      presets: presets.map(mapPreset),
      activeReviewPresetId: settings.activeReviewPresetId,
    });
  } catch (err) {
    next(err);
  }
});

presetsRouter.patch(
  "/presets/:id",
  validate({ params: PresetIdParamsSchema, body: PatchPresetBodySchema }),
  async (req, res, next) => {
    try {
      const body = req.body as PatchPresetBody;

      const updated = await prisma.reviewPreset.update({
        where: { id: req.params.id },
        data: {
          name: body.name,
          intervalsDays: body.intervalsDays,
        },
      });

      res.json({ preset: mapPreset(updated) });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
          next(
            new HttpError({
              status: 404,
              code: "NOT_FOUND",
              message: "Preset not found",
            })
          );
          return;
        }

        if (err.code === "P2002") {
          next(
            new HttpError({
              status: 400,
              code: "VALIDATION_ERROR",
              message: "Preset name must be unique",
            })
          );
          return;
        }
      }

      next(err);
    }
  }
);

presetsRouter.put(
  "/presets/active",
  validate({ body: PutActivePresetBodySchema }),
  async (req, res, next) => {
    try {
      const body = req.body as PutActivePresetBody;

      const preset = await prisma.reviewPreset.findUnique({
        where: { id: body.activeReviewPresetId },
        select: { id: true },
      });

      if (!preset) {
        throw new HttpError({
          status: 404,
          code: "NOT_FOUND",
          message: "Preset not found",
        });
      }

      const settings = await prisma.settings.update({
        where: { id: 1 },
        data: { activeReviewPresetId: body.activeReviewPresetId },
      });

      res.json({ settings: mapSettings(settings) });
    } catch (err) {
      next(err);
    }
  }
);

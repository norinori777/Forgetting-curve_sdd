import type { ReviewEvent, ReviewSchedule } from "@fc/shared";
import {
  addDays,
  compareIsoDate,
  isoDateToUtcDate,
  todayIsoDate,
  utcDateToIsoDate,
} from "@fc/shared";

import { HttpError } from "../../api/middleware/errorHandler";
import { prisma } from "../../db/prisma";

type CreateReviewInput = {
  reviewedOn: string;
  result: "success" | "failure";
  difficulty?: number;
  memo?: string;
};

function clampStage(stage: number, intervalsDays: number[]): number {
  if (intervalsDays.length === 0) return 0;
  return Math.min(Math.max(stage, 0), intervalsDays.length - 1);
}

function mapSchedule(row: {
  learningItemId: string;
  dueOn: Date;
  stage: number;
  lastReviewedOn: Date | null;
  updatedAt: Date;
}): ReviewSchedule {
  return {
    learningItemId: row.learningItemId,
    dueOn: utcDateToIsoDate(row.dueOn),
    stage: row.stage,
    lastReviewedOn: row.lastReviewedOn ? utcDateToIsoDate(row.lastReviewedOn) : null,
    updatedAt: row.updatedAt.toISOString(),
  };
}

function mapEvent(row: {
  id: string;
  learningItemId: string;
  reviewedOn: Date;
  result: "success" | "failure";
  difficulty: number | null;
  memo: string | null;
  scheduledDueOn: Date;
  scheduledStage: number;
  createdAt: Date;
}): ReviewEvent {
  return {
    id: row.id,
    learningItemId: row.learningItemId,
    reviewedOn: utcDateToIsoDate(row.reviewedOn),
    result: row.result,
    difficulty: row.difficulty,
    memo: row.memo,
    scheduledDueOn: utcDateToIsoDate(row.scheduledDueOn),
    scheduledStage: row.scheduledStage,
    createdAt: row.createdAt.toISOString(),
  };
}

async function getActiveIntervalsDays(): Promise<number[]> {
  const settings = await prisma.settings.findUnique({
    where: { id: 1 },
    include: { activeReviewPreset: true },
  });

  if (!settings) {
    throw new HttpError({
      status: 500,
      code: "INTERNAL_ERROR",
      message: "Settings not initialized",
    });
  }

  return settings.activeReviewPreset.intervalsDays;
}

export async function createReview(learningItemId: string, input: CreateReviewInput) {
  const today = todayIsoDate();
  if (compareIsoDate(input.reviewedOn, today) > 0) {
    throw new HttpError({
      status: 400,
      code: "VALIDATION_ERROR",
      message: "reviewedOn must not be in the future",
    });
  }

  const intervalsDays = await getActiveIntervalsDays();

  const existingSchedule = await prisma.reviewSchedule.findUnique({
    where: { learningItemId },
  });

  if (!existingSchedule) {
    throw new HttpError({
      status: 404,
      code: "NOT_FOUND",
      message: "Item not found",
    });
  }

  const nextStageRaw = input.result === "success" ? existingSchedule.stage + 1 : 0;
  const nextStage = clampStage(nextStageRaw, intervalsDays);
  const nextDueOnIso = addDays(input.reviewedOn, intervalsDays[nextStage] ?? 0);

  const [event, schedule] = await prisma.$transaction(async (tx) => {
    const createdEvent = await tx.reviewEvent.create({
      data: {
        learningItemId,
        reviewedOn: isoDateToUtcDate(input.reviewedOn),
        result: input.result,
        difficulty: input.difficulty ?? null,
        memo: input.memo ?? null,
        scheduledDueOn: existingSchedule.dueOn,
        scheduledStage: existingSchedule.stage,
      },
    });

    const updatedSchedule = await tx.reviewSchedule.update({
      where: { learningItemId },
      data: {
        dueOn: isoDateToUtcDate(nextDueOnIso),
        stage: nextStage,
        lastReviewedOn: isoDateToUtcDate(input.reviewedOn),
      },
    });

    return [createdEvent, updatedSchedule] as const;
  });

  return {
    event: mapEvent(event),
    schedule: mapSchedule(schedule),
  };
}

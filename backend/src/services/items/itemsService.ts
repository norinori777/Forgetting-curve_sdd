import type { LearningItem, ReviewEvent, ReviewSchedule } from "@fc/shared";
import { isoDateToUtcDate, todayIsoDate, utcDateToIsoDate } from "@fc/shared";

import { HttpError } from "../../api/middleware/errorHandler";
import { prisma } from "../../db/prisma";
import { calcDueOn } from "../scheduler/calcDueOn";

type LearningItemRow = {
  id: string;
  title: string;
  content: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  schedule: {
    learningItemId: string;
    dueOn: Date;
    stage: number;
    lastReviewedOn: Date | null;
    updatedAt: Date;
  } | null;
};

type LearningItemDetailRow = LearningItemRow & {
  events: Array<{
    id: string;
    learningItemId: string;
    reviewedOn: Date;
    result: "success" | "failure";
    difficulty: number | null;
    memo: string | null;
    scheduledDueOn: Date;
    scheduledStage: number;
    createdAt: Date;
  }>;
};

type CreateItemInput = {
  title: string;
  content?: string;
  tags?: string[];
};

type UpdateItemInput = {
  title?: string;
  content?: string | null;
  tags?: string[];
};

function mapItem(row: {
  id: string;
  title: string;
  content: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}): LearningItem {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    tags: row.tags,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
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

export async function createItem(input: CreateItemInput) {
  const intervalsDays = await getActiveIntervalsDays();
  const baseOn = todayIsoDate();
  const dueOnIso = calcDueOn({ baseOn, stage: 0, intervalsDays });

  const [item, schedule] = await prisma.$transaction(
    async (tx: any) => {
    const createdItem = await tx.learningItem.create({
      data: {
        title: input.title,
        content: input.content ?? null,
        tags: input.tags ?? [],
      },
    });

    const createdSchedule = await tx.reviewSchedule.create({
      data: {
        learningItemId: createdItem.id,
        dueOn: isoDateToUtcDate(dueOnIso),
        stage: 0,
        lastReviewedOn: null,
      },
    });

      return [createdItem, createdSchedule] as const;
    }
  );

  return {
    item: mapItem(item),
    schedule: mapSchedule(schedule),
  };
}

export async function listItems() {
  const rows = (await prisma.learningItem.findMany({
    include: { schedule: true },
    orderBy: { schedule: { dueOn: "asc" } },
  })) as LearningItemRow[];

  return {
    items: rows
      .filter((r) => r.schedule)
      .map((r) => ({ item: mapItem(r), schedule: mapSchedule(r.schedule!) })),
  };
}

export async function getItemDetail(id: string) {
  const row = (await prisma.learningItem.findUnique({
    where: { id },
    include: {
      schedule: true,
      events: {
        orderBy: [{ reviewedOn: "desc" }, { createdAt: "desc" }],
        take: 10,
      },
    },
  })) as LearningItemDetailRow | null;

  if (!row || !row.schedule) {
    throw new HttpError({
      status: 404,
      code: "NOT_FOUND",
      message: "Item not found",
    });
  }

  return {
    item: mapItem(row),
    schedule: mapSchedule(row.schedule),
    recentEvents: row.events.map(mapEvent),
  };
}

export async function updateItem(id: string, patch: UpdateItemInput) {
  try {
    const updated = await prisma.learningItem.update({
      where: { id },
      data: {
        title: patch.title,
        content: patch.content,
        tags: patch.tags,
      },
    });

    return { item: mapItem(updated) };
  } catch {
    throw new HttpError({
      status: 404,
      code: "NOT_FOUND",
      message: "Item not found",
    });
  }
}

export async function deleteItem(id: string) {
  try {
    await prisma.learningItem.delete({ where: { id } });
  } catch {
    throw new HttpError({
      status: 404,
      code: "NOT_FOUND",
      message: "Item not found",
    });
  }
}

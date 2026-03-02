import { compareIsoDate, isoDateToUtcDate, utcDateToIsoDate } from "@fc/shared";

import { prisma } from "../../db/prisma";

export async function getStats(params: { from: string; to: string }) {
  if (compareIsoDate(params.from, params.to) > 0) {
    return {
      from: params.from,
      to: params.to,
      totalReviews: 0,
      successCount: 0,
      failureCount: 0,
      onTimeCount: 0,
      lateCount: 0,
      successRate: 0,
      onTimeRate: 0,
    };
  }

  const fromDate = isoDateToUtcDate(params.from);
  const toDate = isoDateToUtcDate(params.to);

  const events = await prisma.reviewEvent.findMany({
    where: {
      reviewedOn: {
        gte: fromDate,
        lte: toDate,
      },
    },
    select: {
      result: true,
      reviewedOn: true,
      scheduledDueOn: true,
    },
  });

  const totalReviews = events.length;
  let successCount = 0;
  let failureCount = 0;
  let onTimeCount = 0;
  let lateCount = 0;

  for (const ev of events) {
    if (ev.result === "success") successCount += 1;
    if (ev.result === "failure") failureCount += 1;

    const reviewedOnIso = utcDateToIsoDate(ev.reviewedOn);
    const scheduledDueOnIso = utcDateToIsoDate(ev.scheduledDueOn);

    if (reviewedOnIso === scheduledDueOnIso) {
      onTimeCount += 1;
    } else if (compareIsoDate(reviewedOnIso, scheduledDueOnIso) > 0) {
      lateCount += 1;
    }
  }

  const successRate = totalReviews === 0 ? 0 : successCount / totalReviews;
  const onTimeRate = totalReviews === 0 ? 0 : onTimeCount / totalReviews;

  return {
    from: params.from,
    to: params.to,
    totalReviews,
    successCount,
    failureCount,
    onTimeCount,
    lateCount,
    successRate,
    onTimeRate,
  };
}

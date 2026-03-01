import { addDays, type IsoDate } from "@fc/shared";

export function calcDueOn(params: {
  baseOn: IsoDate;
  stage: number;
  intervalsDays: number[];
}): IsoDate {
  const lastIndex = Math.max(params.intervalsDays.length - 1, 0);
  const clampedStage = Math.min(Math.max(params.stage, 0), lastIndex);
  const intervalDays = params.intervalsDays[clampedStage] ?? 0;
  return addDays(params.baseOn, intervalDays);
}

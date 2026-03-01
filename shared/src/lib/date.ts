export type IsoDate = string; // YYYY-MM-DD

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

export function formatIsoDate(date: Date): IsoDate {
  const yyyy = date.getFullYear();
  const mm = pad2(date.getMonth() + 1);
  const dd = pad2(date.getDate());
  return `${yyyy}-${mm}-${dd}`;
}

export function todayIsoDate(): IsoDate {
  return formatIsoDate(new Date());
}

export function utcDateToIsoDate(date: Date): IsoDate {
  return date.toISOString().slice(0, 10);
}

export function isoDateToUtcDate(isoDate: IsoDate): Date {
  const [yyyy, mm, dd] = isoDate.split("-").map((s) => Number(s));
  return new Date(Date.UTC(yyyy, mm - 1, dd));
}

export function addDays(isoDate: IsoDate, days: number): IsoDate {
  const date = isoDateToUtcDate(isoDate);
  date.setUTCDate(date.getUTCDate() + days);
  return utcDateToIsoDate(date);
}

export function compareIsoDate(a: IsoDate, b: IsoDate): number {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

export function isBefore(a: IsoDate, b: IsoDate): boolean {
  return compareIsoDate(a, b) < 0;
}

export function isAfter(a: IsoDate, b: IsoDate): boolean {
  return compareIsoDate(a, b) > 0;
}

export function isSame(a: IsoDate, b: IsoDate): boolean {
  return a === b;
}

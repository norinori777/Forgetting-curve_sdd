export type IsoDate = string;
export declare function formatIsoDate(date: Date): IsoDate;
export declare function todayIsoDate(): IsoDate;
export declare function utcDateToIsoDate(date: Date): IsoDate;
export declare function isoDateToUtcDate(isoDate: IsoDate): Date;
export declare function addDays(isoDate: IsoDate, days: number): IsoDate;
export declare function compareIsoDate(a: IsoDate, b: IsoDate): number;
export declare function isBefore(a: IsoDate, b: IsoDate): boolean;
export declare function isAfter(a: IsoDate, b: IsoDate): boolean;
export declare function isSame(a: IsoDate, b: IsoDate): boolean;
//# sourceMappingURL=date.d.ts.map
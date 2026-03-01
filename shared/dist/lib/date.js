function pad2(value) {
    return String(value).padStart(2, "0");
}
export function formatIsoDate(date) {
    const yyyy = date.getFullYear();
    const mm = pad2(date.getMonth() + 1);
    const dd = pad2(date.getDate());
    return `${yyyy}-${mm}-${dd}`;
}
export function todayIsoDate() {
    return formatIsoDate(new Date());
}
export function utcDateToIsoDate(date) {
    return date.toISOString().slice(0, 10);
}
export function isoDateToUtcDate(isoDate) {
    const [yyyy, mm, dd] = isoDate.split("-").map((s) => Number(s));
    return new Date(Date.UTC(yyyy, mm - 1, dd));
}
export function addDays(isoDate, days) {
    const date = isoDateToUtcDate(isoDate);
    date.setUTCDate(date.getUTCDate() + days);
    return utcDateToIsoDate(date);
}
export function compareIsoDate(a, b) {
    if (a === b)
        return 0;
    return a < b ? -1 : 1;
}
export function isBefore(a, b) {
    return compareIsoDate(a, b) < 0;
}
export function isAfter(a, b) {
    return compareIsoDate(a, b) > 0;
}
export function isSame(a, b) {
    return a === b;
}
//# sourceMappingURL=date.js.map
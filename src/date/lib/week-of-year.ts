import type { FirstWeekContainsDate, MaybeDateInput, WeekStartsOn } from "./types";
import { addDays } from "./add-days";
import { dayOfWeek } from "./day-of-week";
import { diffInDays } from "./diff-in-days";
import { startOfWeek } from "./start-of-week";
import { toDate } from "./to-date";

/**
 * 日期在当年的第几周
 *
 * @param input - 日期输入，`null` 时默认当前
 * @param weekStartsOn - 一周的起始日，0 为周日，1 为周一，默认为 0
 * @param firstWeekContainsDate
 *
 * @returns 当年的第几周
 */
export function weekOfYear(
  input: MaybeDateInput,
  weekStartsOn: WeekStartsOn = 0,
  firstWeekContainsDate: FirstWeekContainsDate = 4,
): number {
  const date = toDate(input);

  const decidingDay = addDays(date, 7 - firstWeekContainsDate - dayOfWeek(date, weekStartsOn));
  const firstWeekStart = startOfWeek(
    new Date(decidingDay.getFullYear(), 0, firstWeekContainsDate),
    weekStartsOn,
  );

  const weekStart = startOfWeek(date, weekStartsOn);

  return Math.floor(diffInDays(weekStart, firstWeekStart) / 7) + 1;
}

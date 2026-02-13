import { type DateValue, type DayOfWeek, isSameDay, startOfWeek } from "@internationalized/date";

export type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const daysOfTheWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

export function normalizeWeekStartsOn(weekStartsOn?: WeekStartsOn): DayOfWeek | undefined {
  return weekStartsOn != null ? daysOfTheWeek[weekStartsOn] : undefined;
}

/**
 * 获取给定日期所在月份的天数
 *
 * @param date - 日期
 * @returns 给定日期所在月份的天数
 */
export function getDaysInMonth(date: DateValue): number {
  return date.set({ day: 100 }).day;
}

/**
 * 获取两个日期之间的所有日期（不包含起始日期和结束日期）
 *
 * @param start 起始日期（不包含）
 * @param end 结束日期（不包含）
 * @returns 介于 start 和 end 之间的日期数组
 */
export function getDatesBetween(start: DateValue, end: DateValue): DateValue[] {
  const dates: DateValue[] = [];

  let current = start.add({ days: 1 });

  while (current.compare(end) < 0) {
    dates.push(current);
    current = current.add({ days: 1 });
  }

  return dates;
}

/**
 * 获取指定日期所在周的日期数组
 *
 * @param weeks 偏移周数（0 = 当前周, 1 = 下周, -1 = 上周）
 * @param date 指定日期
 * @param locale locale 字符串，例如 "en-US" 或 "zh-CN"
 * @param weekStartsOn 周起始日
 * @returns 所在周的日期数组
 */
export function getDatesInWeek(
  weeks: number,
  date: DateValue,
  locale: string,
  weekStartsOn?: WeekStartsOn,
): DateValue[] {
  const dates: DateValue[] = [];

  let weekDate = startOfWeek(date.add({ weeks }), locale, normalizeWeekStartsOn(weekStartsOn));

  while (dates.length < 7) {
    dates.push(weekDate);

    const nextDate = weekDate.add({ days: 1 });

    /* istanbul ignore if -- @preserve */
    if (isSameDay(weekDate, nextDate)) {
      break;
    }

    weekDate = nextDate;
  }

  return dates;
}

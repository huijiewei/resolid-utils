import { type DateValue, type DayOfWeek, startOfWeek } from "@internationalized/date";

export type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * 标准化周起始日
 *
 * @param weekStartsOn 一周的起始日，使用数字表示
 * @returns 对应的星期枚举值（'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'），
 *          如果传入 undefined 则返回 undefined
 */
export function normalizeWeekStartsOn(weekStartsOn?: WeekStartsOn): DayOfWeek | undefined {
  return weekStartsOn != null
    ? (["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const)[weekStartsOn]
    : undefined;
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

export type ShiftDateOptions = {
  /**
   * 时间单位
   * @default "day"
   */
  unit?: "day" | "week" | "month" | "year";

  /**
   * 偏移步长
   * @default 1
   */
  step?: number;
};

/**
 * 沿时间轴对日期进行偏移
 *
 * @param date 原日期
 * @param options 偏移设置
 * @returns 返回新日期
 */
export function shiftDate(date: DateValue, options?: ShiftDateOptions): DateValue {
  const unit = options?.unit ?? "day";
  const step = options?.step ?? 1;

  if (step === 0) {
    return date;
  }

  switch (unit) {
    case "day":
      return date.add({ days: step });
    case "week":
      return date.add({ weeks: step });
    case "month":
      return date.add({ months: step });
    case "year":
      return date.add({ years: step });
  }
}

export type EnumerateDatesOptions = {
  /**
   * 区间边界策略
   * '[]' → 包含起始日期和结束日期
   * '[)' → 只包含起始日期
   * '(]' → 只包含结束日期
   * '()' → 不包含起始日期和结束日期
   * @default "[]"
   */
  boundary?: "[]" | "[)" | "(]" | "()";
} & ShiftDateOptions;

/**
 * 枚举两个日期之间的所有日期
 *
 * @param start 起始日期
 * @param end 结束日期
 * @param options
 * @returns 介于 start 和 end 之间的日期数组
 */
export function enumerateDates(
  start: DateValue,
  end: DateValue,
  options?: EnumerateDatesOptions,
): DateValue[] {
  const boundary = options?.boundary ?? "[]";
  const unit = options?.unit ?? "day";
  const step = options?.step ?? 1;

  if (step <= 0) {
    throw new Error("enumerateDates: step must be greater than 0");
  }

  const forward = start.compare(end) <= 0;
  const dirStep = forward ? step : -step;

  const dates: DateValue[] = [];

  let current = boundary[0] === "(" ? shiftDate(start, { unit, step: dirStep }) : start;

  while (
    forward
      ? boundary[1] === "]"
        ? current.compare(end) <= 0
        : current.compare(end) < 0
      : boundary[1] === "]"
        ? current.compare(end) >= 0
        : current.compare(end) > 0
  ) {
    dates.push(current);
    current = shiftDate(current, { unit, step: dirStep });
  }

  return dates;
}

/**
 * 获取指定日期所在周的日期数组
 *
 * @param date 指定日期
 * @param weeks 偏移周数（0 = 当前周, 1 = 下周, -1 = 上周）
 * @param locale 区域代码
 * @param weekStartsOn 周起始日
 * @returns 所在周的日期数组
 */
export function getDatesInWeek(
  date: DateValue,
  weeks: number,
  locale: string,
  weekStartsOn?: WeekStartsOn,
): DateValue[] {
  const weekStart = startOfWeek(date.add({ weeks }), locale, normalizeWeekStartsOn(weekStartsOn));

  return Array.from({ length: 7 }, (_, i) => weekStart.add({ days: i }));
}

export type DateRange = {
  start?: DateValue | null;
  end?: DateValue | null;
};

/**
 * 判断指定日期是否在日期区间
 *
 * @param date 指定日期
 * @param range 日期区间
 * @returns 是否在区间
 */
export function isDateInRange(date: DateValue, range: DateRange): boolean {
  if (!range.start || !range.end) {
    return false;
  }

  return range.start.compare(date) <= 0 && range.end.compare(date) >= 0;
}

/**
 * 日期列表排序
 *
 * @param dates 日期列表
 * @param order 排序方向，'asc' 升序（默认），'desc' 降序
 * @returns 排序后的日期
 */
export function sortDates(
  dates: (DateValue | null | undefined)[],
  order: "asc" | "desc" = "asc",
): DateValue[] {
  return dates
    .slice()
    .filter((date): date is DateValue => date != null)
    .sort((a, b) => (order == "asc" ? a.compare(b) : b.compare(a)));
}

/**
 * 调整日期区间的开始和结束日期
 * 若 start 晚于 end，则自动交换，确保 start <= end
 *
 * @param range 日期区间
 * @returns 调整后的日期区间
 */
export function adjustDateRange(range: DateRange): DateRange {
  if (!range.start || !range.end) {
    return range;
  }

  return range.start.compare(range.end) <= 0 ? range : { start: range.end, end: range.start };
}

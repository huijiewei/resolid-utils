import { addDay, addMonth, addYear, type DateInput, isAfter, isBefore } from "@formkit/tempo";

/**
 * 将一个日期限制在指定范围内。
 *
 * @param date 要限制的日期
 * @param min 最小值（可选）
 * @param max 最大值（可选）
 * @returns 被 clamp 后的日期（新对象）
 */
export function clampDate(
  date: DateInput,
  min?: DateInput | null,
  max?: DateInput | null,
): DateInput {
  if (max != null && min != null && isBefore(max, min)) {
    throw new Error("clampDate: invalid clamp range");
  }

  if (min != null && isBefore(date, min)) {
    return min;
  }

  if (max != null && isAfter(date, max)) {
    return max;
  }

  return date;
}

export type DateRange = {
  start: DateInput | null;
  end: DateInput | null;
};

/**
 * 判断指定日期是否在日期区间
 *
 * @param date 指定日期
 * @param range 日期区间
 * @param range.start 开始
 * @param range.end 结束
 * @returns 是否在区间
 */
export function isDateInRange(date: DateInput, range: DateRange): boolean {
  if (!range.start || !range.end) {
    return false;
  }

  return !isBefore(date, range.start) && !isAfter(date, range.end);
}

/**
 * 日期列表排序
 *
 * @param dates 日期列表
 * @param order 排序方向，'asc' 升序（默认），'desc' 降序
 * @returns 排序后的日期
 */
export function sortDates(
  dates: (DateInput | null | undefined)[],
  order: "asc" | "desc" = "asc",
): DateInput[] {
  return dates
    .slice()
    .filter((date): date is DateInput => date != null)
    .sort((a, b) => {
      if (isBefore(a, b)) {
        return order === "asc" ? -1 : 1;
      }

      if (isBefore(b, a)) {
        return order === "asc" ? 1 : -1;
      }

      return 0;
    });
}

/**
 * 调整日期区间的开始和结束日期
 * 若 start 晚于 end，则自动交换，确保 start <= end
 *
 * @param range 日期区间
 * @param range.start 开始
 * @param range.end 结束
 * @returns 调整后的日期区间
 */
export function adjustDateRange(range: DateRange): DateRange {
  if (!range.start || !range.end) {
    return range;
  }

  return isAfter(range.start, range.end) ? { start: range.end, end: range.start } : range;
}

type GetDatesInRangeOptions = {
  /**
   * 时间单位
   * @default "day"
   */
  unit?: "day" | "month" | "year";

  /**
   * 偏移步长
   * @default 1
   */
  step?: number;
};

/**
 * 枚举两个日期之间的所有日期
 *
 * @param start 起始日期
 * @param end 结束日期
 * @param options 选项
 * @param options.unit - 单位: `"day"` | `"month"` | `"year"`. 默认 `"day"`
 * @param options.step - 步长: 必须大于 0. 默认 `1`
 *
 * @returns 介于 start 和 end 之间的日期数组
 */
export function getDatesInRange(
  start: DateInput,
  end: DateInput,
  options?: GetDatesInRangeOptions,
): DateInput[] {
  const unit = options?.unit ?? "day";
  const step = options?.step ?? 1;

  if (step <= 0) {
    throw new Error("getDatesInRange: step must be greater than 0");
  }

  const add = {
    day: addDay,
    month: addMonth,
    year: addYear,
  }[unit];

  const dates: DateInput[] = [];

  let current = start;

  while (!isAfter(current, end)) {
    dates.push(current);

    current = add(current, step);
  }

  return dates;
}

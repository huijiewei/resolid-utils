import type { DateInput, MaybeDateInput } from "./types";
import { isAfter } from "./is-after";
import { isBefore } from "./is-before";

/**
 * 将一个日期限制在指定范围内
 *
 * @param date 要限制的日期
 * @param min 最小值（可选）
 * @param max 最大值（可选）
 *
 * @returns 被 clamp 后的日期（新对象）
 */
export function clampDate(date: DateInput, min?: MaybeDateInput, max?: MaybeDateInput): DateInput {
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

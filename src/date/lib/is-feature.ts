import type { DateInput } from "./types";
import { isAfter } from "./is-after";

/**
 * 判断日期是否晚于当前时间
 *
 * @param input - 日期输入
 *
 * @returns 晚于当前返回 `true`，否则返回 `false`
 */
export function isFuture(input: DateInput): boolean {
  return isAfter(input, null);
}

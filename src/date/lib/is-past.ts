import type { DateInput } from "./types";
import { isBefore } from "./is-before";

/**
 * 判断日期是否早于当前时间
 *
 * @param input - 要判断的日期
 *
 * @returns 早于当前返回 `true`，否则返回 `false`
 */
export function isPast(input: DateInput): boolean {
  return isBefore(input, null);
}

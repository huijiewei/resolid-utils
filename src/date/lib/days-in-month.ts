import type { MaybeDateInput } from "./types";
import { endOfMonth } from "./end-of-month";

/**
 * 获取指定日期所在月的总天数
 *
 * @param input - 日期输入，`null` 时默认当前
 *
 * @returns 所在月的总天数
 */
export function daysInMonth(input: MaybeDateInput): number {
  return endOfMonth(input).getDate();
}

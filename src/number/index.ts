/**
 * 将一个数值限制在指定范围内。
 *
 * @param value - 要限制的数值
 * @param range - 一个二元组 [min, max]，表示允许的最小值和最大值
 * @returns 如果 value 小于 min，则返回 min；如果大于 max，则返回 max；否则返回 value 本身
 */
export function clamp(value: number, [min, max]: [number, number]): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * 生成一个从 start 到 end（包含 end）的整数数组。
 *
 * @param start - 起始值（包含）
 * @param end - 结束值（包含）
 * @returns 包含从 start 到 end 的整数数组，如果 start > end，则返回空数组
 */
export function range(start: number, end: number): number[] {
  if (start > end) {
    return [];
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * 将一个数值限制在指定范围内（支持 number 与 bigint）。
 *
 * @param value 要限制的数值
 * @param min 最小值（可选）
 * @param max 最大值（可选）
 * @returns 如果 value 小于 min，则返回 min；如果大于 max，则返回 max；否则返回 value 本身
 */
export function clamp<T extends number | bigint>(value: T, min?: T | null, max?: T | null): T {
  if (max != null && min != null && min > max) {
    throw new Error("invalid clamp range");
  }

  if (max != null && value > max) {
    return max;
  }

  if (min != null && value < min) {
    return min;
  }

  return value;
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

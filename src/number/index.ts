/**
 * 将数值限制在指定的最小值和最大值之间。
 *
 * @param {number} value - 需要进行限制的数值。
 * @param {[number, number]} range - 包含最小值和最大值的元组 [min, max]。
 * @returns {number} - 限制后的数值。
 */
export const clamp = (value: number, [min, max]: [number, number]): number => {
  return Math.min(max, Math.max(min, value));
};

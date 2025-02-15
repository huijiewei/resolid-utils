/**
 * 从对象中省略指定的键，返回一个新的对象，不影响原始对象。
 */
export const omit = <T extends object, K extends keyof T>(
  object: T,
  keys: K[],
): Omit<T, K> => {
  return keys.reduce(
    (acc, key) => {
      delete acc[key];
      return acc;
    },
    { ...object },
  );
};

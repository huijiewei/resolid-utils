// eslint-disable-next-line n/prefer-global/process
export const __DEV__ = process.env.NODE_ENV !== "production";

export const isBrowser = typeof window !== "undefined";

/**
 * 检查给定的值是否为布尔值。
 */
export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === "boolean";
};

/**
 * 检查给定的值是否为数字。
 */
export const isNumber = (value: unknown): value is number => {
  return typeof value === "number";
};

/**
 * 检查给定的值是否为字符串。
 */
export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

/**
 * 检查给定的值是否为对象。
 */
export const isObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === "object";
};

/**
 * 检查给定的值是否为 `undefined`。
 */
export const isUndefined = (value: unknown): value is undefined => {
  return typeof value === "undefined";
};

/**
 * 检查给定的值是否为 `null` 或 `undefined`。
 */
export const isNullish = (value: unknown): value is null | undefined => {
  return value === null || value === undefined;
};

/**
 * 检查给定的值是否为函数。
 */
export const isFunction = <T extends (...args: unknown[]) => unknown>(
  value: unknown,
): value is T => {
  return typeof value === "function";
};

/**
 * 检查给定的值是否为日期类型
 */
export const isDate = (value: unknown): value is Date => {
  return (
    value instanceof Date ||
    Object.prototype.toString.call(value) === "[object Date]"
  );
};

/**
 * 检查给定的值是否为空值。
 */
export const isEmpty = (value: unknown): boolean => {
  if (isNullish(value)) {
    return true;
  }

  if (isNumber(value)) {
    return value === 0;
  }

  if (isString(value)) {
    return value.trim() == "";
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }

  return false;
};

/**
 * 检查给定的值是否为 `Promise`。
 */
export const isPromise = (value: unknown): value is Promise<unknown> => {
  return value instanceof Promise;
};

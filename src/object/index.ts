/**
 * 创建一个省略指定键的新对象。
 */
export const omit = <T extends object, K extends keyof T>(
  object: T,
  keys: readonly K[],
): Omit<T, K> => {
  return keys.reduce(
    (acc, key) => {
      delete acc[key];
      return acc;
    },
    { ...object },
  );
};

/**
 * 创建一个新对象，该对象由不满足条件的属性组成。
 */
export const omitBy = <T extends object>(
  object: T,
  shouldOmit: (value: T[keyof T], key: keyof T) => boolean,
): Partial<T> => {
  const result: Partial<T> = {};

  for (const key of Object.keys(object) as Array<keyof T>) {
    const value = object[key];

    if (!shouldOmit(value, key)) {
      result[key] = value;
    }
  }

  return result;
};

/**
 * 创建一个由指定属性组成的新对象。
 */
export const pick = <T extends object, K extends keyof T>(
  object: T,
  keys: readonly K[],
): Pick<T, K> => {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    if (Object.hasOwn(object, key)) {
      result[key] = object[key];
    }
  }

  return result;
};

/**
 * 创建一个新对象，该对象由满足条件的属性组成。
 */
export const pickBy = <T extends object>(
  object: T,
  shouldPick: (value: T[keyof T], key: keyof T) => boolean,
): Partial<T> => {
  const result: Partial<T> = {};

  for (const key of Object.keys(object) as Array<keyof T>) {
    const value = object[key];

    if (shouldPick(value, key)) {
      result[key] = value;
    }
  }

  return result;
};

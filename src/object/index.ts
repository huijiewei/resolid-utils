/**
 * 创建一个新对象，排除指定的键。
 *
 * @template T - 原始对象类型
 * @template K - 要排除的键的联合类型
 * @param object - 原始对象
 * @param keys - 要排除的键数组
 * @returns 一个新对象，包含原对象的所有属性，除了 keys 中指定的属性
 */
export function omit<T extends object, K extends keyof T>(
  object: T,
  keys: readonly K[],
): Omit<T, K> {
  return keys.reduce(
    (acc, key) => {
      delete acc[key];
      return acc;
    },
    { ...object },
  );
}

/**
 * 根据回调函数过滤对象属性，返回一个新对象，只保留回调返回 false 的属性。
 *
 * @template T - 原始对象类型
 * @param object - 要处理的对象
 * @param should - 回调函数，接收 value 和 key：
 *                     - 返回 true → 忽略该属性
 *                     - 返回 false → 保留该属性
 * @returns 一个新对象，包含原对象中未被 omit 的属性
 */
export function omitBy<T extends object>(
  object: T,
  should: (value: T[keyof T], key: keyof T) => boolean,
): Partial<T> {
  const result: Partial<T> = {};

  for (const key of Object.keys(object) as Array<keyof T>) {
    const value = object[key];

    if (!should(value, key)) {
      result[key] = value;
    }
  }

  return result;
}

/**
 * 从对象中挑选指定的键，返回一个新对象。
 *
 * @template T - 原始对象类型
 * @template K - 要挑选的键的联合类型
 * @param object - 原始对象
 * @param keys - 要挑选的键数组
 * @returns 一个新对象，只包含 keys 中指定的属性
 */
export function pick<T extends object, K extends keyof T>(
  object: T,
  keys: readonly K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    if (Object.hasOwn(object, key)) {
      result[key] = object[key];
    }
  }

  return result;
}

/**
 * 根据回调函数过滤对象属性，返回一个新对象，只保留回调返回 true 的属性。
 *
 * @template T - 原始对象类型
 * @param object - 要处理的对象
 * @param should - 回调函数，接收 value 和 key：
 *                     - 返回 true → 保留该属性
 *                     - 返回 false → 忽略该属性
 * @returns 一个新对象，包含原对象中被 pick 的属性
 */
export function pickBy<T extends object>(
  object: T,
  should: (value: T[keyof T], key: keyof T) => boolean,
): Partial<T> {
  const result: Partial<T> = {};

  for (const key of Object.keys(object) as Array<keyof T>) {
    const value = object[key];

    if (should(value, key)) {
      result[key] = value;
    }
  }

  return result;
}

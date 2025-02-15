export type ThrottleOptions = {
  /**
   * 在第一次调用时立即执行
   */
  start?: boolean;
  /**
   * 当等待时间（wait）结束后立即执行
   */
  middle?: boolean;
  /**
   * 在第一次成功调用后取消
   */
  once?: boolean;
};

export type Throttler<T extends unknown[]> = {
  (...args: T): void;
  cancel: () => void;
};

/**
 * 节流函数，用于限制函数的执行频率。
 *
 * @param callback - 需要节流的回调函数
 * @param wait - 等待时间（毫秒）
 * @param options - 配置选项
 * @returns - 返回一个带有 `cancel` 方法的节流函数
 */
export const throttle = <T extends unknown[]>(
  callback: (...args: T) => unknown,
  wait = 0,
  { start = true, middle = true, once = false }: ThrottleOptions = {},
): Throttler<T> => {
  let innerStart = start;
  let last = 0;
  let timer: ReturnType<typeof setTimeout>;
  let cancelled = false;

  const fn = function (this: unknown, ...args: T) {
    if (cancelled) {
      return;
    }

    const delta = Date.now() - last;
    last = Date.now();

    if (start && middle && delta >= wait) {
      innerStart = true;
    }

    if (innerStart) {
      innerStart = false;
      callback.apply(this, args);

      if (once) {
        fn.cancel();
      }
    } else if ((middle && delta < wait) || !middle) {
      clearTimeout(timer);

      timer = setTimeout(
        () => {
          last = Date.now();
          callback.apply(this, args);
          if (once) fn.cancel();
        },
        !middle ? wait : wait - delta,
      );
    }
  };

  fn.cancel = () => {
    clearTimeout(timer);
    cancelled = true;
  };

  return fn;
};

/**
 * 防抖函数，执行延迟后的回调，避免频繁触发。
 *
 * @param callback - 需要防抖的回调函数
 * @param wait - 等待时间（毫秒）
 * @param options - 配置选项
 * @returns - 返回一个带有 `cancel` 方法的防抖函数
 */
export const debounce = <T extends unknown[]>(
  callback: (...args: T) => unknown,
  wait = 0,
  { start = false, middle = false, once = false }: ThrottleOptions = {},
): Throttler<T> => throttle(callback, wait, { start, middle, once });

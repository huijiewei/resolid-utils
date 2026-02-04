import { isFunction } from "../is";
import type { ValueOrFunction } from "../types";

/**
 * 空函数（no operation）。
 *
 * 什么也不做，通常用于占位、默认回调或避免 undefined 调用。
 */
export function noop(): void {}

/**
 * 异步等待指定毫秒数。
 *
 * @param ms - 要等待的毫秒数
 * @returns 一个在指定时间后 resolve 的 Promise
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 创建一个始终返回固定值的函数。
 *
 * @param value - 要固定返回的值
 * @returns 一个无参数函数，每次调用都会返回该值
 */
export function always<T>(value: T): () => T {
  return () => value;
}

/**
 * 将一个 Promise 转换为 [error, data] 的形式，便于 async/await 异常处理。
 *
 * 作用类似 try/catch，但可以用解构直接获取结果和错误：
 *
 * @param promise - 要处理的 Promise 对象
 * @returns 一个 Promise，resolve 为一个长度为 2 的元组：
 *          - 成功时：[null, data]
 *          - 失败时：[error, undefined]
 */
export async function to<T, E = Error>(promise: Promise<T>): Promise<[E, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data) => [null, data])
    .catch<[E, undefined]>((error: E) => [error, undefined]);
}

/**
 * 如果传入的是函数，则执行它并返回结果；否则直接返回该值。
 *
 * 常用于允许参数既可以是静态值，也可以是动态函数的场景。
 *
 * @template T - 返回值类型
 * @template A - 函数参数类型
 * @param value - 值或函数
 * @param args - 如果 value 是函数，传递给它的参数
 * @returns 如果 value 是函数，则返回函数执行结果，否则直接返回 value
 */
export function runIf<T, A extends unknown[]>(value: ValueOrFunction<T, A>, ...args: A): T {
  if (isFunction(value)) {
    return value(...args);
  }

  return value;
}

/**
 * 将多个函数组合成一个函数，同时调用所有非空函数。
 *
 * 常用于事件处理器、回调组合，避免手动逐个调用。
 *
 * @template T - 函数类型
 * @param fns - 要组合的函数数组，允许 null 或 undefined
 * @returns 一个新函数，调用时会依次调用 fns 中所有非空函数
 */
export function callAll<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends (...args: any[]) => void,
>(...fns: (T | null | undefined)[]) {
  return (...args: Parameters<T>): void => {
    fns.forEach(function (fn) {
      fn?.(...args);
    });
  };
}

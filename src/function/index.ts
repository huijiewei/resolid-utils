import { isFunction } from "../is";
import type { ValueOrFunction } from "../types";

/**
 * 空函数，什么也不做。
 */
export const noop = (): void => {};

/**
 * 使程序在指定的毫秒数内暂停。
 */
export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * 返回一个始终返回相同值的函数。
 */
export const always = <T>(value: T): (() => T) => {
  return () => value;
};

/**
 * 统一处理成功和失败的返回结果。
 */
export const to = <T, E = Error>(
  promise: Promise<T>,
): Promise<[E, undefined] | [null, T]> => {
  return promise
    .then<[null, T]>((data) => [null, data])
    .catch<[E, undefined]>((error: E) => [error, undefined]);
};

/**
 * 如果传入的是函数，则调用它并返回结果。如果不是函数，则直接返回传入的值。
 */
export function runIf<T, A extends unknown[]>(
  value: ValueOrFunction<T, A>,
  ...args: A
): T {
  if (isFunction(value)) {
    return value(...args);
  }

  return value;
}

export const callAll =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T extends (...a: any[]) => void>(...fns: (T | null | undefined)[]) =>
    (...a: Parameters<T>) => {
      fns.forEach(function (fn) {
        fn?.(...a);
      });
    };

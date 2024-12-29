import type { AnyFunction } from "../types";

export const isBoolean = (test: unknown): test is boolean => typeof test === "boolean";

export const isNumber = (test: unknown): test is number => typeof test === "number";

export const isString = (test: unknown): test is string => typeof test === "string";

export const isObject = (test: unknown): test is Record<string, unknown> => test !== null && typeof test === "object";

export const isFunction = <T = AnyFunction>(test: unknown): test is T => typeof test === "function";

export const isUndefined = (test: unknown): test is undefined => typeof test === "undefined";

export const isNullish = (test: unknown): test is void => test == null;

export const isArray = (test: unknown): test is unknown[] => !!test && Array.isArray(test);

export const isEmpty = (test: unknown): boolean => {
  switch (true) {
    case isNullish(test):
      return true;
    case isString(test):
      return test.trim() === "";
    case isArray(test):
      return test.length === 0;
    case isObject(test):
      return Object.keys(test).length === 0;
  }

  return false;
};

import { describe, expect, test } from "vitest";
import {
  isBoolean,
  isEmpty,
  isFunction,
  isNullish,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from "./index";

describe("isBoolean", () => {
  test("test", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean("true")).toBe(false);
    expect(isBoolean("false")).toBe(false);
    expect(isBoolean(32)).toBe(false);
    expect(isBoolean("not a boolean")).toBe(false);
    expect(isBoolean({ key: "value" })).toBe(false);
  });
});

describe("isNumber", () => {
  test("test", () => {
    expect(isNumber(32)).toBe(true);
    expect(isNumber("not a number")).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber({ key: "value" })).toBe(false);
  });
});

describe("isString", () => {
  test("test", () => {
    expect(isString("Hello, world!")).toBe(true);
    expect(isString(32)).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString({ key: "value" })).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
  });
});

describe("isObject", () => {
  test("test", () => {
    expect(isObject({ key: "value" })).toBe(true);
    expect(isObject({})).toBe(true);
    expect(isObject(new Date())).toBe(true);
    expect(isObject(null)).toBe(false);
    expect(isObject("not an object")).toBe(false);
    expect(isObject(32)).toBe(false);
    expect(isObject(true)).toBe(false);
  });

  test("test type guard", () => {
    const obj = { a: 5, b: 3 };

    if (isObject(obj)) {
      expect(obj.a).toBe(5);
    }
  });
});

describe("isFunction", () => {
  test("test", () => {
    expect(isFunction(() => "Hello")).toBe(true);
    expect(isFunction("not a function")).toBe(false);
  });
});

describe("isUndefined", () => {
  test("test", () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined("test")).toBe(false);
  });
});

describe("isNullish", () => {
  test("test", () => {
    expect(isNullish(undefined)).toBe(true);
    expect(isNullish(null)).toBe(true);
    expect(isNullish("")).toBe(false);
    expect(isNullish([])).toBe(false);
    expect(isNullish({})).toBe(false);
    expect(isNullish(1)).toBe(false);
  });
});

describe("isEmpty", () => {
  test("test", () => {
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty("")).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty("   ")).toBe(true);
    expect(isEmpty("\t\n")).toBe(true);
    expect(isEmpty({ a: 5 })).toBe(false);
    expect(isEmpty(5)).toBe(false);
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty("t")).toBe(false);
  });
});

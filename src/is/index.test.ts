import { describe, expect, it } from "vitest";
import {
  isBoolean,
  isDate,
  isDefined,
  isEmpty,
  isFunction,
  isNullish,
  isNumber,
  isObject,
  isPromise,
  isString,
  isTruthy,
  isUndefined,
} from "./index";

describe("Type Checking Utilities", () => {
  describe("isTruthy", () => {
    it("should return true for truthy values", () => {
      expect(isTruthy(1)).toBe(true);
      expect(isTruthy("hello")).toBe(true);
      expect(isTruthy({})).toBe(true);
      expect(isTruthy([])).toBe(true);
    });

    it("should return false for falsy values", () => {
      expect(isTruthy(false)).toBe(false);
      expect(isTruthy(0)).toBe(false);
      expect(isTruthy("")).toBe(false);
      expect(isTruthy(null)).toBe(false);
      expect(isTruthy(undefined)).toBe(false);
      expect(isTruthy(NaN)).toBe(false);
    });
  });

  describe("isUndefined", () => {
    it("should return true for undefined", () => {
      expect(isUndefined(undefined)).toBe(true);
    });

    it("should return false for other values", () => {
      expect(isUndefined(null)).toBe(false);
      expect(isUndefined(0)).toBe(false);
      expect(isUndefined("")).toBe(false);
    });
  });

  describe("isDefined", () => {
    it("should return true for non-null/non-undefined values", () => {
      expect(isDefined(0)).toBe(true);
      expect(isDefined("hello")).toBe(true);
      expect(isDefined(false)).toBe(true);
    });

    it("should return false for null or undefined", () => {
      expect(isDefined(null)).toBe(false);
      expect(isDefined(undefined)).toBe(false);
    });
  });

  describe("isBoolean", () => {
    it("should return true for boolean values", () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
    });

    it("should return false for non-boolean values", () => {
      expect(isBoolean(0)).toBe(false);
      expect(isBoolean("")).toBe(false);
      expect(isBoolean(null)).toBe(false);
    });
  });

  describe("isNumber", () => {
    it("should return true for numbers", () => {
      expect(isNumber(0)).toBe(true);
      expect(isNumber(42)).toBe(true);
      expect(isNumber(NaN)).toBe(true);
    });

    it("should return false for non-numbers", () => {
      expect(isNumber("42")).toBe(false);
      expect(isNumber(null)).toBe(false);
    });
  });

  describe("isString", () => {
    it("should return true for strings", () => {
      expect(isString("")).toBe(true);
      expect(isString("hello")).toBe(true);
    });

    it("should return false for non-strings", () => {
      expect(isString(0)).toBe(false);
      expect(isString(null)).toBe(false);
    });
  });

  describe("isObject", () => {
    it("should return true for objects (excluding null)", () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ a: 1 })).toBe(true);
      expect(isObject([])).toBe(true);
    });

    it("should return false for null and non-objects", () => {
      expect(isObject(null)).toBe(false);
      expect(isObject(42)).toBe(false);
      expect(isObject("obj")).toBe(false);
    });
  });

  describe("isNullish", () => {
    it("should return true for null or undefined", () => {
      expect(isNullish(null)).toBe(true);
      expect(isNullish(undefined)).toBe(true);
    });

    it("should return false for other values", () => {
      expect(isNullish(0)).toBe(false);
      expect(isNullish("")).toBe(false);
    });
  });

  describe("isFunction", () => {
    it("should return true for functions", () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(function () {})).toBe(true);
    });

    it("should return false for non-functions", () => {
      expect(isFunction({})).toBe(false);
      expect(isFunction(42)).toBe(false);
    });
  });

  describe("isDate", () => {
    it("should return true for Date instances", () => {
      expect(isDate(new Date())).toBe(true);
      expect(isDate(Object.prototype.toString.call(new Date()))).toBe(false); // 非对象
    });

    it("should return false for non-Date values", () => {
      expect(isDate("2023-01-01")).toBe(false);
      expect(isDate({})).toBe(false);
    });
  });

  describe("isEmpty", () => {
    it("should return true for empty values", () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty(0)).toBe(true);
      expect(isEmpty("")).toBe(true);
      expect(isEmpty("   ")).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
    });

    it("should return false for non-empty values", () => {
      expect(isEmpty(1)).toBe(false);
      expect(isEmpty("a")).toBe(false);
      expect(isEmpty([1])).toBe(false);
      expect(isEmpty({ a: 1 })).toBe(false);
    });
  });

  describe("isPromise", () => {
    it("should return true for Promise instances", () => {
      expect(isPromise(Promise.resolve())).toBe(true);
      expect(isPromise(new Promise(() => {}))).toBe(true);
    });

    it("should return false for non-Promise values", () => {
      expect(isPromise(42)).toBe(false);
      expect(isPromise({ then: () => {} })).toBe(false); // 不考虑 thenable
    });
  });
});

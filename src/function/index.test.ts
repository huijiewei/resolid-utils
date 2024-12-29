import { describe, expect, test } from "vitest";
import type { AnyFunction } from "../types";
import { runIfFunction } from "./index";

describe("runIfFunction", () => {
  test("should run the function and return the result", () => {
    const fn: AnyFunction<number, number> = (x) => x * 2;
    const result = runIfFunction(fn, 5);
    expect(result).toBe(10);
  });

  test("should return the value if it is not a function", () => {
    const value = "not a function";
    const result = runIfFunction(value);
    expect(result).toBe(value);
  });
});

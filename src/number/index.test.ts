import { describe, expect, test } from "vitest";
import { clamp } from "./index";

describe("clamp", () => {
  test("should clamp the value within the specified range", () => {
    const value = 5;
    const min = 0;
    const max = 10;

    const clampedValue = clamp(value, [min, max]);

    expect(clampedValue).toBe(value);
  });

  test("should clamp the value to the minimum value if it is below the range", () => {
    const value = -5;
    const min = 0;
    const max = 10;

    const clampedValue = clamp(value, [min, max]);

    expect(clampedValue).toBe(min);
  });

  test("should clamp the value to the maximum value if it is above the range", () => {
    const value = 15;
    const min = 0;
    const max = 10;

    const clampedValue = clamp(value, [min, max]);

    expect(clampedValue).toBe(max);
  });
});

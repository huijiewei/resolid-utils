import { describe, expect, it } from "vitest";
import { clamp, range } from "./index";

describe("clamp", () => {
  it("should return the value itself if it is within the range", () => {
    expect(clamp(5, [0, 10])).toBe(5);
    expect(clamp(0, [0, 10])).toBe(0);
    expect(clamp(10, [0, 10])).toBe(10);
  });

  it("should return min if value is less than min", () => {
    expect(clamp(-5, [0, 10])).toBe(0);
    expect(clamp(-1, [0, 10])).toBe(0);
  });

  it("should return max if value is greater than max", () => {
    expect(clamp(15, [0, 10])).toBe(10);
    expect(clamp(100, [0, 10])).toBe(10);
  });

  it("should handle min equal to max", () => {
    expect(clamp(5, [5, 5])).toBe(5);
    expect(clamp(0, [5, 5])).toBe(5);
    expect(clamp(10, [5, 5])).toBe(5);
  });
});

describe("range", () => {
  it("should generate a range from start to end inclusive", () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(range(0, 0)).toEqual([0]);
  });

  it("should return an empty array if start > end", () => {
    expect(range(5, 1)).toEqual([]);
    expect(range(10, 0)).toEqual([]);
  });

  it("should work with negative numbers", () => {
    expect(range(-2, 2)).toEqual([-2, -1, 0, 1, 2]);
  });
});

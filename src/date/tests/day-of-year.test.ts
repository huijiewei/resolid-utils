import { describe, expect, it } from "vitest";
import { dayOfYear } from "../lib/day-of-year";
import { diffInDays } from "../lib/diff-in-days";
import { startOfYear } from "../lib/start-of-year";

describe("dayOfYear", () => {
  it("can find the number of days in a year", () => {
    expect(dayOfYear("2023-08-01")).toBe(213);
  });

  it("can find the number of days in a year", () => {
    expect(dayOfYear("2020-08-01")).toBe(214);
  });

  it("can find the number of days of the current day", () => {
    const start = startOfYear(null);
    expect(dayOfYear(null)).toBe(diffInDays(null, start) + 1);
  });
});

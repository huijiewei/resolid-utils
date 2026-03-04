import { describe, expect, it } from "vitest";
import { adjustDateRange, clampDate, getDatesInRange, isDateInRange, sortDates } from "./index";

describe("clampDate", () => {
  const d = (s: string) => new Date(s);

  it("returns min when date is before min", () => {
    expect(clampDate(d("2023-06-01"), d("2024-01-01"), d("2024-12-31"))).toEqual(d("2024-01-01"));
  });

  it("returns max when date is after max", () => {
    expect(clampDate(d("2025-06-01"), d("2024-01-01"), d("2024-12-31"))).toEqual(d("2024-12-31"));
  });

  it("returns the original reference when date is within range", () => {
    const input = d("2024-07-04");
    expect(clampDate(input, d("2024-01-01"), d("2024-12-31"))).toBe(input);
  });

  it("returns the original reference when date equals min", () => {
    const input = d("2024-01-01");
    expect(clampDate(input, d("2024-01-01"), d("2024-12-31"))).toBe(input);
  });

  it("returns the original reference when date equals max", () => {
    const input = d("2024-12-31");
    expect(clampDate(input, d("2024-01-01"), d("2024-12-31"))).toBe(input);
  });

  it("returns the original reference when min equals max and date matches", () => {
    const input = d("2024-06-15");
    expect(clampDate(input, d("2024-06-15"), d("2024-06-15"))).toBe(input);
  });

  it("clamps to min when only min is provided and date is before it", () => {
    expect(clampDate(d("2023-01-01"), d("2024-01-01"))).toEqual(d("2024-01-01"));
  });

  it("returns the original reference when only min is provided and date is after it", () => {
    const input = d("2025-01-01");
    expect(clampDate(input, d("2024-01-01"))).toBe(input);
  });

  it("clamps to max when only max is provided and date is after it", () => {
    expect(clampDate(d("2025-01-01"), null, d("2024-12-31"))).toEqual(d("2024-12-31"));
  });

  it("returns the original reference when only max is provided and date is before it", () => {
    const input = d("2023-01-01");
    expect(clampDate(input, null, d("2024-12-31"))).toBe(input);
  });

  it("returns the original reference when neither min nor max is provided", () => {
    const input = d("2024-07-04");
    expect(clampDate(input)).toBe(input);
  });

  it("throws when max is before min", () => {
    expect(() => clampDate(d("2024-07-04"), d("2024-12-31"), d("2024-01-01"))).toThrow(
      "invalid clamp range",
    );
  });
});

describe("isDateInRange", () => {
  const d = (s: string) => new Date(s);

  const range = {
    start: d("2024-01-01"),
    end: d("2024-12-31"),
  };

  it("returns false when range.start is missing", () => {
    expect(isDateInRange(d("2024-06-15"), { start: null, end: range.end })).toBe(false);
  });

  it("returns false when range.end is missing", () => {
    expect(isDateInRange(d("2024-06-15"), { start: range.start, end: null })).toBe(false);
  });

  it("returns false when both range bounds are missing", () => {
    expect(isDateInRange(d("2024-06-15"), { start: null, end: null })).toBe(false);
  });

  it("returns true when date is within range", () => {
    expect(isDateInRange(d("2024-06-15"), range)).toBe(true);
  });

  it("returns true when date equals start", () => {
    expect(isDateInRange(d("2024-01-01"), range)).toBe(true);
  });

  it("returns true when date equals end", () => {
    expect(isDateInRange(d("2024-12-31"), range)).toBe(true);
  });

  it("returns true when start equals end and date matches", () => {
    const point = { start: d("2024-06-15"), end: d("2024-06-15") };
    expect(isDateInRange(d("2024-06-15"), point)).toBe(true);
  });

  it("returns false when date is before start", () => {
    expect(isDateInRange(d("2023-12-31"), range)).toBe(false);
  });

  it("returns false when date is after end", () => {
    expect(isDateInRange(d("2025-01-01"), range)).toBe(false);
  });
});

describe("sortDates", () => {
  const d1 = new Date("2024-01-01");
  const d2 = new Date("2024-06-15");
  const d3 = new Date("2024-12-31");

  it("should sort dates in ascending order by default", () => {
    expect(sortDates([d3, d1, d2])).toEqual([d1, d2, d3]);
  });

  it('should sort dates in ascending order when order is "asc"', () => {
    expect(sortDates([d3, d1, d2], "asc")).toEqual([d1, d2, d3]);
  });

  it('should sort dates in descending order when order is "desc"', () => {
    expect(sortDates([d1, d3, d2], "desc")).toEqual([d3, d2, d1]);
  });

  it("should filter out null and undefined values", () => {
    expect(sortDates([null, d3, undefined, d1])).toEqual([d1, d3]);
  });

  it("should return an empty array when all values are null or undefined", () => {
    expect(sortDates([null, undefined])).toEqual([]);
  });

  it("should return an empty array for an empty input", () => {
    expect(sortDates([])).toEqual([]);
  });

  it("should return a single date as-is", () => {
    expect(sortDates([d2])).toEqual([d2]);
  });

  it("should not mutate the original array", () => {
    const input = [d3, d1, d2];
    sortDates(input);
    expect(input).toEqual([d3, d1, d2]);
  });

  it("should handle duplicate dates", () => {
    expect(sortDates([d2, d1, d2])).toEqual([d1, d2, d2]);
  });
});

describe("adjustDateRange", () => {
  const earlier = new Date("2024-01-01");
  const later = new Date("2024-12-31");

  it("should return the range as-is when start is before end", () => {
    const range = { start: earlier, end: later };
    expect(adjustDateRange(range)).toEqual({ start: earlier, end: later });
  });

  it("should swap start and end when start is after end", () => {
    const range = { start: later, end: earlier };
    expect(adjustDateRange(range)).toEqual({ start: earlier, end: later });
  });

  it("should return the range as-is when start equals end", () => {
    const range = { start: earlier, end: earlier };
    expect(adjustDateRange(range)).toEqual({ start: earlier, end: earlier });
  });

  it("should return the range as-is when start is null", () => {
    const range = { start: null, end: later };
    expect(adjustDateRange(range)).toBe(range);
  });

  it("should return the range as-is when end is null", () => {
    const range = { start: earlier, end: null };
    expect(adjustDateRange(range)).toBe(range);
  });

  it("should return the range as-is when both are null", () => {
    const range = { start: null, end: null };
    expect(adjustDateRange(range)).toBe(range);
  });
});

describe("getDatesInRange", () => {
  const d = (s: string) => new Date(s);

  it("returns all days between two dates (inclusive)", () => {
    expect(getDatesInRange(d("2024-01-01"), d("2024-01-05"))).toEqual([
      d("2024-01-01"),
      d("2024-01-02"),
      d("2024-01-03"),
      d("2024-01-04"),
      d("2024-01-05"),
    ]);
  });

  it("returns a single date when start equals end", () => {
    expect(getDatesInRange(d("2024-06-15"), d("2024-06-15"))).toEqual([d("2024-06-15")]);
  });

  it("returns every 2 days when step is 2", () => {
    expect(getDatesInRange(d("2024-01-01"), d("2024-01-07"), { step: 2 })).toEqual([
      d("2024-01-01"),
      d("2024-01-03"),
      d("2024-01-05"),
      d("2024-01-07"),
    ]);
  });

  it("excludes end date when it does not align with step", () => {
    expect(getDatesInRange(d("2024-01-01"), d("2024-01-06"), { step: 2 })).toEqual([
      d("2024-01-01"),
      d("2024-01-03"),
      d("2024-01-05"),
    ]);
  });

  it("returns every month between two dates", () => {
    expect(getDatesInRange(d("2024-01-01"), d("2024-04-01"), { unit: "month" })).toEqual([
      d("2024-01-01"),
      d("2024-02-01"),
      d("2024-03-01"),
      d("2024-04-01"),
    ]);
  });

  it("returns every 3 months when step is 3", () => {
    expect(getDatesInRange(d("2024-01-01"), d("2024-12-01"), { unit: "month", step: 3 })).toEqual([
      d("2024-01-01"),
      d("2024-04-01"),
      d("2024-07-01"),
      d("2024-10-01"),
    ]);
  });

  it("returns every year between two dates", () => {
    expect(getDatesInRange(d("2021-01-01"), d("2024-01-01"), { unit: "year" })).toEqual([
      d("2021-01-01"),
      d("2022-01-01"),
      d("2023-01-01"),
      d("2024-01-01"),
    ]);
  });

  it("returns every 2 years when step is 2", () => {
    expect(getDatesInRange(d("2020-01-01"), d("2026-01-01"), { unit: "year", step: 2 })).toEqual([
      d("2020-01-01"),
      d("2022-01-01"),
      d("2024-01-01"),
      d("2026-01-01"),
    ]);
  });

  it("throws when step is 0", () => {
    expect(() => getDatesInRange(d("2024-01-01"), d("2024-12-31"), { step: 0 })).toThrow(
      "step must be greater than 0",
    );
  });

  it("throws when step is negative", () => {
    expect(() => getDatesInRange(d("2024-01-01"), d("2024-12-31"), { step: -1 })).toThrow(
      "step must be greater than 0",
    );
  });
});

import { CalendarDate, parseDate } from "@internationalized/date";
import { describe, expect, it } from "vitest";
import {
  adjustDateRange,
  enumerateDates,
  getDatesInWeek,
  getDaysInMonth,
  isDateInRange,
  shiftDate,
  sortDates,
} from "./index";

describe("getDaysInMonth", () => {
  it("should return 31 for January", () => {
    const date = new CalendarDate(2025, 1, 1);
    expect(getDaysInMonth(date)).toBe(31);
  });

  it("should return 28 for Feb in non-leap year", () => {
    const date = new CalendarDate(2025, 2, 1);
    expect(getDaysInMonth(date)).toBe(28);
  });

  it("should return 29 for Feb in leap year", () => {
    const date = new CalendarDate(2024, 2, 1);
    expect(getDaysInMonth(date)).toBe(29);
  });
});

describe("shiftDate", () => {
  it("should default to +1 day when no options provided", () => {
    const date = new CalendarDate(2024, 1, 1);
    const result = shiftDate(date);

    expect(result.day).toBe(2);
    expect(result.month).toBe(1);
    expect(result.year).toBe(2024);
  });

  it("should shift forward by given days", () => {
    const date = new CalendarDate(2024, 1, 1);
    const result = shiftDate(date, { unit: "day", step: 5 });

    expect(result.day).toBe(6);
  });

  it("should shift backward by negative days", () => {
    const date = new CalendarDate(2024, 1, 10);
    const result = shiftDate(date, { unit: "day", step: -5 });

    expect(result.day).toBe(5);
  });

  it("should shift by weeks", () => {
    const date = new CalendarDate(2024, 1, 1);
    const result = shiftDate(date, { unit: "week", step: 2 });

    expect(result.day).toBe(15);
  });

  it("should shift by months", () => {
    const date = new CalendarDate(2024, 1, 15);
    const result = shiftDate(date, { unit: "month", step: 1 });

    expect(result.month).toBe(2);
    expect(result.day).toBe(15);
  });

  it("should shift by years", () => {
    const date = new CalendarDate(2024, 1, 15);
    const result = shiftDate(date, { unit: "year", step: 1 });

    expect(result.year).toBe(2025);
  });

  it("should return original date when step is 0", () => {
    const date = new CalendarDate(2024, 1, 15);
    const result = shiftDate(date, { step: 0 });

    expect(result).toBe(date);
  });

  it("should handle negative month shift", () => {
    const date = new CalendarDate(2024, 5, 15);
    const result = shiftDate(date, { unit: "month", step: -2 });

    expect(result.month).toBe(3);
  });

  it("should handle negative year shift", () => {
    const date = new CalendarDate(2024, 5, 15);
    const result = shiftDate(date, { unit: "year", step: -1 });

    expect(result.year).toBe(2023);
  });
});

describe("enumerateDates", () => {
  const d = (y: number, m: number, day: number) => new CalendarDate(y, m, day);

  it("should enumerate forward inclusive range", () => {
    const result = enumerateDates(d(2024, 1, 1), d(2024, 1, 3), { boundary: "[]" });

    expect(result.map((r) => r.day)).toEqual([1, 2, 3]);
  });

  it("should enumerate forward exclusive range", () => {
    const result = enumerateDates(d(2024, 1, 1), d(2024, 1, 3), { boundary: "()" });

    expect(result.map((r) => r.day)).toEqual([2]);
  });

  it("should enumerate backward inclusive range", () => {
    const result = enumerateDates(d(2024, 1, 3), d(2024, 1, 1), { boundary: "[]" });

    expect(result.map((r) => r.day)).toEqual([3, 2, 1]);
  });

  it("should enumerate backward exclusive range", () => {
    const result = enumerateDates(d(2024, 1, 3), d(2024, 1, 1), { boundary: "()" });

    expect(result.map((r) => r.day)).toEqual([2]);
  });

  it("should respect step > 1", () => {
    const result = enumerateDates(d(2024, 1, 1), d(2024, 1, 7), { step: 2 });

    expect(result.map((r) => r.day)).toEqual([1, 3, 5, 7]);
  });

  it("should throw if step is 0", () => {
    expect(() => enumerateDates(d(2024, 1, 1), d(2024, 1, 5), { step: 0 })).toThrow();
  });

  it("should return single element if start equals end with inclusive boundary", () => {
    const result = enumerateDates(d(2024, 1, 1), d(2024, 1, 1), { boundary: "[]" });

    expect(result.length).toBe(1);
    expect(result[0].day).toBe(1);
  });

  it("should return empty array if start equals end with exclusive boundary", () => {
    const result = enumerateDates(d(2024, 1, 1), d(2024, 1, 1), { boundary: "()" });

    expect(result.length).toBe(0);
  });

  it("should enumerate by month", () => {
    const result = enumerateDates(d(2024, 1, 1), d(2024, 3, 1), { unit: "month" });

    expect(result.map((r) => r.month)).toEqual([1, 2, 3]);
  });

  it("should enumerate by week", () => {
    const result = enumerateDates(d(2024, 1, 1), d(2024, 1, 15), { unit: "week" });

    expect(result.map((r) => r.day)).toEqual([1, 8, 15]);
  });
});

describe("getDatesInWeek", () => {
  it("should return 7 days for the current week starting Sunday", () => {
    const date = new CalendarDate(2026, 2, 13);
    const days = getDatesInWeek(date, 0, "en-US", 0);

    expect(days).toHaveLength(7);
    expect(days[0].toString()).toBe("2026-02-08"); // Sunday
    expect(days[6].toString()).toBe("2026-02-14"); // Saturday
  });

  it("should return 7 days for the next week", () => {
    const date = new CalendarDate(2026, 2, 13);
    const days = getDatesInWeek(date, 1, "en-US", 0);

    expect(days).toHaveLength(7);
    expect(days[0].toString()).toBe("2026-02-15"); // Sunday
    expect(days[6].toString()).toBe("2026-02-21"); // Saturday
  });

  it("should work with week starting Monday", () => {
    const date = new CalendarDate(2026, 2, 13);
    const days = getDatesInWeek(date, 0, "en-US", 1);

    expect(days[0].toString()).toBe("2026-02-09"); // Monday
    expect(days[6].toString()).toBe("2026-02-15"); // Sunday
  });

  it("should return 7 days when weekStartsOn is undefined (default)", () => {
    const date = new CalendarDate(2026, 2, 13);
    const days = getDatesInWeek(date, 0, "en-US");

    expect(days).toHaveLength(7);
    expect(days[0].toString()).toBe("2026-02-08");
    expect(days[6].toString()).toBe("2026-02-14");
  });

  describe("isDateWithinRange", () => {
    const start = new CalendarDate(2025, 2, 10);
    const end = new CalendarDate(2025, 2, 20);

    const range = { start, end };

    it("returns false when range.start is missing", () => {
      const date = new CalendarDate(2025, 2, 15);
      expect(isDateInRange(date, { end })).toBe(false);
    });

    it("returns false when range.end is missing", () => {
      const date = new CalendarDate(2025, 2, 15);
      expect(isDateInRange(date, { start })).toBe(false);
    });

    it("returns true when date is strictly inside the range", () => {
      const date = new CalendarDate(2025, 2, 15);
      expect(isDateInRange(date, range)).toBe(true);
    });

    it("returns true when date equals range.start (inclusive)", () => {
      expect(isDateInRange(start, range)).toBe(true);
    });

    it("returns true when date equals range.end (inclusive)", () => {
      expect(isDateInRange(end, range)).toBe(true);
    });

    it("returns false when date is before range.start", () => {
      const date = new CalendarDate(2025, 2, 5);
      expect(isDateInRange(date, range)).toBe(false);
    });

    it("returns false when date is after range.end", () => {
      const date = new CalendarDate(2025, 2, 25);
      expect(isDateInRange(date, range)).toBe(false);
    });
  });

  describe("sortDates", () => {
    const d1 = parseDate("2024-01-01");
    const d2 = parseDate("2024-06-15");
    const d3 = parseDate("2024-12-31");

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
    const earlier = parseDate("2024-01-01");
    const later = parseDate("2024-12-31");

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
});

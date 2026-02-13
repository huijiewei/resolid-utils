import { CalendarDate } from "@internationalized/date";
import { describe, expect, it } from "vitest";
import { getDatesBetween, getDatesInWeek, getDaysInMonth } from "./index";

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

describe("getDatesBetween", () => {
  it("returns all dates between start and end (exclusive)", () => {
    const start = new CalendarDate(2026, 2, 1);
    const end = new CalendarDate(2026, 2, 5);

    const result = getDatesBetween(start, end);

    expect(result).toHaveLength(3);
    expect(result[0].toString()).toBe("2026-02-02");
    expect(result[1].toString()).toBe("2026-02-03");
    expect(result[2].toString()).toBe("2026-02-04");
  });

  it("returns empty array when dates are adjacent", () => {
    const start = new CalendarDate(2026, 2, 1);
    const end = new CalendarDate(2026, 2, 2);

    const result = getDatesBetween(start, end);

    expect(result).toEqual([]);
  });

  it("returns empty array when start equals end", () => {
    const date = new CalendarDate(2026, 2, 1);

    const result = getDatesBetween(date, date);

    expect(result).toEqual([]);
  });

  it("returns empty array when start is after end", () => {
    const start = new CalendarDate(2026, 2, 5);
    const end = new CalendarDate(2026, 2, 1);

    const result = getDatesBetween(start, end);

    expect(result).toEqual([]);
  });

  it("does not mutate the original dates", () => {
    const start = new CalendarDate(2026, 2, 1);
    const end = new CalendarDate(2026, 2, 5);

    getDatesBetween(start, end);

    expect(start.toString()).toBe("2026-02-01");
    expect(end.toString()).toBe("2026-02-05");
  });
});

describe("getDatesInWeek", () => {
  it("should return 7 days for the current week starting Sunday", () => {
    const date = new CalendarDate(2026, 2, 13);
    const days = getDatesInWeek(0, date, "en-US", 0);

    expect(days).toHaveLength(7);
    expect(days[0].toString()).toBe("2026-02-08"); // Sunday
    expect(days[6].toString()).toBe("2026-02-14"); // Saturday
  });

  it("should return 7 days for the next week", () => {
    const date = new CalendarDate(2026, 2, 13);
    const days = getDatesInWeek(1, date, "en-US", 0);

    expect(days).toHaveLength(7);
    expect(days[0].toString()).toBe("2026-02-15"); // Sunday
    expect(days[6].toString()).toBe("2026-02-21"); // Saturday
  });

  it("should work with week starting Monday", () => {
    const date = new CalendarDate(2026, 2, 13);
    const days = getDatesInWeek(0, date, "en-US", 1);

    expect(days[0].toString()).toBe("2026-02-09"); // Monday
    expect(days[6].toString()).toBe("2026-02-15"); // Sunday
  });

  it("should return 7 days when weekStartsOn is undefined (default)", () => {
    const date = new CalendarDate(2026, 2, 13);
    const days = getDatesInWeek(0, date, "en-US");

    expect(days).toHaveLength(7);
    expect(days[0].toString()).toBe("2026-02-08");
    expect(days[6].toString()).toBe("2026-02-14");
  });
});

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { debounce, throttle } from "./index";

describe("Throttle & Debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("throttle", () => {
    it("should execute immediately if start=true", () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 100, { start: true, middle: true });
      throttled();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it("should delay execution if called within wait interval when middle=true", () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 100, { start: true, middle: true });

      throttled();
      expect(fn).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(50);
      throttled();
      expect(fn).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(50);
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it("should reset timer if called multiple times within wait interval", () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 100, { start: true, middle: true });

      throttled();
      vi.advanceTimersByTime(50);
      throttled();
      vi.advanceTimersByTime(30);
      throttled();

      vi.advanceTimersByTime(50);
      expect(fn).toHaveBeenCalledTimes(1);
      vi.advanceTimersByTime(50);
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it("should execute once and cancel if once=true", () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 50, {
        start: true,
        middle: true,
        once: true,
      });

      throttled();
      expect(fn).toHaveBeenCalledTimes(1);

      throttled();
      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it("should cancel pending execution", () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 100, { start: false, middle: true });

      throttled();
      throttled.cancel();
      vi.advanceTimersByTime(200);
      expect(fn).toHaveBeenCalledTimes(0);
    });

    it("should handle middle=false branch", () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 100, { start: false, middle: false });

      throttled();
      throttled();
      expect(fn).toHaveBeenCalledTimes(0);

      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe("debounce", () => {
    it("should delay execution until stop calling", () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);

      debounced();
      debounced();
      debounced();
      expect(fn).toHaveBeenCalledTimes(0);

      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it("should execute immediately if start=true", () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100, { start: true });
      debounced();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it("should cancel pending execution", () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);
      debounced();
      debounced.cancel();
      vi.advanceTimersByTime(200);
      expect(fn).toHaveBeenCalledTimes(0);
    });

    it("should respect once option", () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 50, { once: true });
      debounced();
      debounced();
      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });
});

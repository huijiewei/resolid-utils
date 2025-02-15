import { describe, expect, it, vi } from "vitest";
import { noop } from "./index";

describe("noop", () => {
  it("should return nothing (void)", () => {
    const result = noop();

    expect(result).toBeUndefined();
  });

  it("should be called without errors", () => {
    const spy = vi.fn();
    spy();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

import { describe, expect, it } from "vitest";
import { addSeconds } from "../lib/add-seconds";
import { diffInSeconds } from "../lib/diff-in-seconds";

describe("diffInSeconds", () => {
  it("difference is 28 seconds", () => {
    expect(diffInSeconds("2024-04-07T09:10:28.900Z", "2024-04-07T09:10:00.000Z")).toBe(28);
  });

  it("different should be 50 seconds compared to the current time", () => {
    const compare = addSeconds(null, 50);

    expect(diffInSeconds(compare, null)).toBe(50);
  });
});

import { describe, expect, test } from "vitest";
import { omit } from "./index";

describe("omit function", () => {
  test("should omit specified keys from an object", () => {
    const originalObject = { a: 1, b: 2, c: 3 };

    const resultObject = omit(originalObject, ["b"]);

    expect(resultObject).toEqual({ a: 1, c: 3 });
  });
});

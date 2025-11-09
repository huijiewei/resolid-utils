import { describe, expect, it } from "vitest";
import { capitalize, endsWith, startsWith, trimEnd, trimStart } from "./index";

describe("String Utilities", () => {
  describe("capitalize", () => {
    it("should capitalize the first letter of a string", () => {
      expect(capitalize("hello")).toBe("Hello");
      expect(capitalize("world")).toBe("World");
    });

    it("should return empty string for empty or falsy values", () => {
      expect(capitalize("")).toBe("");
      // @ts-expect-error Argument of type null
      expect(capitalize(null)).toBe("");
    });

    it("should keep the rest of the string unchanged", () => {
      expect(capitalize("hELLO")).toBe("HELLO");
    });
  });

  describe("startsWith", () => {
    it("should detect prefix correctly (ignore case by default)", () => {
      expect(startsWith("HelloWorld", "hello")).toBe(true);
      expect(startsWith("HelloWorld", "HELLO")).toBe(true);
    });

    it("should respect case when ignoreCase is false", () => {
      expect(startsWith("HelloWorld", "hello", false)).toBe(false);
      expect(startsWith("HelloWorld", "Hello", false)).toBe(true);
    });

    it("should return false if prefix is longer than text", () => {
      expect(startsWith("Hi", "Hello")).toBe(false);
    });
  });

  describe("endsWith", () => {
    it("should detect suffix correctly (ignore case by default)", () => {
      expect(endsWith("HelloWorld", "world")).toBe(true);
      expect(endsWith("HelloWorld", "WORLD")).toBe(true);
    });

    it("should respect case when ignoreCase is false", () => {
      expect(endsWith("HelloWorld", "world", false)).toBe(false);
      expect(endsWith("HelloWorld", "World", false)).toBe(true);
    });

    it("should return false if suffix is longer than text", () => {
      expect(endsWith("Hi", "Hello")).toBe(false);
    });
  });

  describe("trimStart", () => {
    it("should remove the prefix if it exists (ignore case by default)", () => {
      expect(trimStart("HelloWorld", "hello")).toBe("World");
      expect(trimStart("HelloWorld", "HELLO")).toBe("World");
    });

    it("should not change the string if prefix does not exist", () => {
      expect(trimStart("HelloWorld", "Hi")).toBe("HelloWorld");
    });

    it("should respect case when ignoreCase is false", () => {
      expect(trimStart("HelloWorld", "hello", false)).toBe("HelloWorld");
      expect(trimStart("HelloWorld", "Hello", false)).toBe("World");
    });
  });

  describe("trimEnd", () => {
    it("should remove the suffix if it exists (ignore case by default)", () => {
      expect(trimEnd("HelloWorld", "world")).toBe("Hello");
      expect(trimEnd("HelloWorld", "WORLD")).toBe("Hello");
    });

    it("should not change the string if suffix does not exist", () => {
      expect(trimEnd("HelloWorld", "Hi")).toBe("HelloWorld");
    });

    it("should respect case when ignoreCase is false", () => {
      expect(trimEnd("HelloWorld", "world", false)).toBe("HelloWorld");
      expect(trimEnd("HelloWorld", "World", false)).toBe("Hello");
    });
  });
});

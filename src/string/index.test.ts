import { describe, expect, test } from "vitest";
import { endsWith, startsWith, trimEnd, trimStart } from "./index";

describe("startWith function", () => {
  test("should return true if the string starts with the prefix", () => {
    expect(startsWith("hello world", "hello")).toBe(true);
    expect(startsWith("JavaScript", "Java")).toBe(true);
    expect(startsWith("prefix string", "prefix")).toBe(true);
  });

  test("should return false if the string does not start with the prefix", () => {
    expect(startsWith("hello world", "world")).toBe(false);
    expect(startsWith("JavaScript", "C#")).toBe(false);
    expect(startsWith("not prefixed", "prefix")).toBe(false);
  });

  test("should return false if the prefix is longer than the string", () => {
    expect(startsWith("short", "longer prefix")).toBe(false);
  });

  test("should handle empty strings or prefixes correctly", () => {
    expect(startsWith("", "")).toBe(true);
    expect(startsWith("some string", "")).toBe(true);
    expect(startsWith("", "prefix")).toBe(false);
  });

  test("should support case-insensitivity by default", () => {
    expect(startsWith("Hello world", "hello")).toBe(true);
    expect(startsWith("JavaScript", "java")).toBe(true);
  });

  test("should be case-sensitive if specified", () => {
    expect(startsWith("Hello world", "hello", false)).toBe(false);
    expect(startsWith("JavaScript", "java", false)).toBe(false);
  });
});

describe("trimStart function", () => {
  test("should remove the given prefix from the beginning of the string if it exists", () => {
    expect(trimStart("hello world", "hello")).toBe(" world");
    expect(trimStart("JavaScript", "Java")).toBe("Script");
    expect(trimStart("not prefixed", "prefix")).toBe("not prefixed");
  });

  test("should not modify the string if the prefix is not present", () => {
    expect(trimStart("world", "hello")).toBe("world");
    expect(trimStart("not prefixed", "Java")).toBe("not prefixed");
  });

  test("should handle empty strings or prefixes correctly", () => {
    expect(trimStart("", "prefix")).toBe("");
    expect(trimStart("some string", "")).toBe("some string");
  });

  test("should return the original string if it is shorter than the prefix", () => {
    expect(trimStart("short", "longer prefix")).toBe("short");
  });

  test("should support case-insensitive trimming if specified", () => {
    expect(trimStart("Hello world", "hello", true)).toBe(" world");
    expect(trimStart("JavaScript", "java", true)).toBe("Script");
  });

  test("should maintain case-sensitivity by default even if the prefix contains uppercase letters", () => {
    expect(trimStart("Hello world", "Hello", true)).toBe(" world");
  });
});

describe("endWith function", () => {
  test("should return true if the string ends with the suffix", () => {
    expect(endsWith("hello world", "world")).toBe(true);
    expect(endsWith("JavaScript", "Script")).toBe(true);
    expect(endsWith("file.txt", ".txt")).toBe(true);
  });

  test("should return false if the string does not end with the suffix", () => {
    expect(endsWith("hello world", "hello")).toBe(false);
    expect(endsWith("JavaScript", "Java")).toBe(false);
    expect(endsWith("not suffixed", "suffix")).toBe(false);
  });

  test("should handle strings shorter than the suffix", () => {
    expect(endsWith("short", "suffix")).toBe(false);
  });

  test("should handle empty strings or suffixes correctly", () => {
    expect(endsWith("", "")).toBe(true); // Empty string ends with anything
    expect(endsWith("some string", "")).toBe(true); // Suffix is empty
    expect(endsWith("", "suffix")).toBe(false); // String is empty, suffix isn't
  });

  test("should be case-sensitive by default", () => {
    expect(endsWith("hello World", "world")).toBe(true);
    expect(endsWith("JavaScript", "script")).toBe(true);
  });

  test("should support case-insensitivity if specified", () => {
    expect(endsWith("hello World", "world", false)).toBe(false);
    expect(endsWith("JavaScript", "script", false)).toBe(false);
  });
});

describe("trimEnd", () => {
  test("should remove the given suffix from the end of the string if it exists", () => {
    expect(trimEnd("hello world", "world")).toBe("hello ");
    expect(trimEnd("JavaScript", "Script")).toBe("Java");
    expect(trimEnd("not suffixed", "suffix")).toBe("not suffixed");
  });

  test("should not modify the string if the suffix is not present", () => {
    expect(trimEnd("hello", "world")).toBe("hello");
    expect(trimEnd("not suffixed", "Java")).toBe("not suffixed");
  });

  test("should handle empty strings or suffixes correctly", () => {
    expect(trimEnd("", "suffix")).toBe("");
    expect(trimEnd("some string", "")).toBe("some string");
    expect(trimEnd("", "")).toBe("");
  });

  test("should return the original string if it is shorter than the suffix", () => {
    expect(trimEnd("short", "longer suffix")).toBe("short");
  });

  test("should support case-insensitive trimming if specified", () => {
    expect(trimEnd("hello World", "world", false)).toBe("hello World");
    expect(trimEnd("JavaScript", "script", false)).toBe("JavaScript");
  });

  test("should handle newlines and other special characters in the suffix (if relevant to your use case)", () => {
    expect(trimEnd("hello\nworld", "\nworld")).toBe("hello");
    expect(trimEnd("hello\tworld", "\tworld")).toBe("hello");
  });
});

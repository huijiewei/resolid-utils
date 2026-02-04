import { describe, expect, it } from "vitest";
import {
  camelCase,
  capitalize,
  endsWith,
  kebabCase,
  pascalCase,
  snakeCase,
  startsWith,
  trimEnd,
  trimStart,
} from "./index";

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

  describe("camelCase", () => {
    it("should convert hyphen-separated string to camelCase", () => {
      expect(camelCase("hello-world")).toBe("helloWorld");
      expect(camelCase("foo-bar-baz")).toBe("fooBarBaz");
    });

    it("should convert underscore-separated string to camelCase", () => {
      expect(camelCase("hello_world")).toBe("helloWorld");
      expect(camelCase("foo_bar_baz")).toBe("fooBarBaz");
    });

    it("should convert space-separated string to camelCase", () => {
      expect(camelCase("hello world")).toBe("helloWorld");
      expect(camelCase("foo bar baz")).toBe("fooBarBaz");
    });

    it("should handle mixed separators", () => {
      expect(camelCase("hello-world_foo bar")).toBe("helloWorldFooBar");
      expect(camelCase("foo_bar-baz qux")).toBe("fooBarBazQux");
    });

    it("should handle multiple consecutive separators", () => {
      expect(camelCase("hello---world")).toBe("helloWorld");
      expect(camelCase("foo___bar")).toBe("fooBar");
      expect(camelCase("hello   world")).toBe("helloWorld");
    });

    it("should trim leading and trailing whitespace", () => {
      expect(camelCase("  hello-world  ")).toBe("helloWorld");
      expect(camelCase("\thello-world\n")).toBe("helloWorld");
    });

    it("should handle empty string", () => {
      expect(camelCase("")).toBe("");
      expect(camelCase("   ")).toBe("");
    });

    it("should handle single word", () => {
      expect(camelCase("hello")).toBe("hello");
      expect(camelCase("HELLO")).toBe("HELLO");
    });

    it("should handle string ending with separator", () => {
      expect(camelCase("hello-world-")).toBe("helloWorld");
      expect(camelCase("foo_bar_")).toBe("fooBar");
    });

    it("should handle already camelCased string without separators", () => {
      expect(camelCase("helloWorld")).toBe("helloWorld");
      expect(camelCase("fooBarBaz")).toBe("fooBarBaz");
    });

    it("should handle special characters at the end", () => {
      expect(camelCase("hello-")).toBe("hello");
      expect(camelCase("hello-world-")).toBe("helloWorld");
    });
  });

  describe("pascalCase", () => {
    it("should convert kebab-case to PascalCase", () => {
      expect(pascalCase("hello-world")).toBe("HelloWorld");
      expect(pascalCase("foo-bar-baz")).toBe("FooBarBaz");
    });

    it("should convert snake_case to PascalCase", () => {
      expect(pascalCase("hello_world")).toBe("HelloWorld");
      expect(pascalCase("foo_bar_baz")).toBe("FooBarBaz");
    });

    it("should convert space-separated words to PascalCase", () => {
      expect(pascalCase("hello world")).toBe("HelloWorld");
      expect(pascalCase("foo bar baz")).toBe("FooBarBaz");
    });

    it("should handle mixed separators", () => {
      expect(pascalCase("hello-world_foo bar")).toBe("HelloWorldFooBar");
      expect(pascalCase("foo_bar-baz qux")).toBe("FooBarBazQux");
    });

    it("should handle consecutive uppercase letters", () => {
      expect(pascalCase("HELLO-WORLD")).toBe("HelloWorld");
      expect(pascalCase("FOO_BAR")).toBe("FooBar");
      expect(pascalCase("XMLHttpRequest")).toBe("XmlHttpRequest");
    });

    it("should handle strings with numbers", () => {
      expect(pascalCase("hello-world-123")).toBe("HelloWorld123");
      expect(pascalCase("foo2bar")).toBe("Foo2Bar");
      expect(pascalCase("test-123-abc")).toBe("Test123Abc");
    });

    it("should trim leading and trailing whitespace", () => {
      expect(pascalCase("  hello-world  ")).toBe("HelloWorld");
      expect(pascalCase("\thello-world\n")).toBe("HelloWorld");
    });

    it("should handle empty string", () => {
      expect(pascalCase("")).toBe("");
    });

    it("should handle single word", () => {
      expect(pascalCase("hello")).toBe("Hello");
      expect(pascalCase("HELLO")).toBe("Hello");
    });

    it("should handle already PascalCase strings", () => {
      expect(pascalCase("HelloWorld")).toBe("HelloWorld");
      expect(pascalCase("FooBarBaz")).toBe("FooBarBaz");
    });

    it("should handle special characters", () => {
      expect(pascalCase("hello@world")).toBe("HelloWorld");
      expect(pascalCase("foo#bar$baz")).toBe("FooBarBaz");
      expect(pascalCase("test.case.name")).toBe("TestCaseName");
    });

    it("should handle consecutive separators", () => {
      expect(pascalCase("hello---world")).toBe("HelloWorld");
      expect(pascalCase("foo___bar")).toBe("FooBar");
      expect(pascalCase("test   case")).toBe("TestCase");
    });

    it("should handle camelCase to PascalCase", () => {
      expect(pascalCase("helloWorld")).toBe("HelloWorld");
      expect(pascalCase("fooBarBaz")).toBe("FooBarBaz");
    });
  });

  describe("kebabCase", () => {
    it("handles camelCase", () => {
      expect(kebabCase("fooBar")).toBe("foo-bar");
      expect(kebabCase("helloWorldAgain")).toBe("hello-world-again");
    });

    it("handles PascalCase", () => {
      expect(kebabCase("FooBar")).toBe("foo-bar");
      expect(kebabCase("HelloWorld")).toBe("hello-world");
    });

    it("handles consecutive uppercase words", () => {
      expect(kebabCase("XMLHttpRequest")).toBe("xml-http-request");
      expect(kebabCase("NASAProject")).toBe("nasa-project");
    });

    it("handles numbers correctly", () => {
      expect(kebabCase("userID2FA")).toBe("user-id-2-fa");
      expect(kebabCase("version10Beta")).toBe("version-10-beta");
    });

    it("handles separators", () => {
      expect(kebabCase("user_name.id")).toBe("user-name-id");
      expect(kebabCase("user-name test")).toBe("user-name-test");
    });

    it("handles single words", () => {
      expect(kebabCase("foo")).toBe("foo");
      expect(kebabCase("FOO")).toBe("foo");
    });

    it("returns empty string for empty input", () => {
      expect(kebabCase("")).toBe("");
    });
  });

  describe("snakeCase", () => {
    it("handles camelCase", () => {
      expect(snakeCase("fooBar")).toBe("foo_bar");
      expect(snakeCase("helloWorldAgain")).toBe("hello_world_again");
    });

    it("handles PascalCase", () => {
      expect(snakeCase("FooBar")).toBe("foo_bar");
      expect(snakeCase("HelloWorld")).toBe("hello_world");
    });

    it("handles consecutive uppercase words", () => {
      expect(snakeCase("XMLHttpRequest")).toBe("xml_http_request");
      expect(snakeCase("NASAProject")).toBe("nasa_project");
    });

    it("handles numbers correctly", () => {
      expect(snakeCase("userID2FA")).toBe("user_id_2_fa");
      expect(snakeCase("version10Beta")).toBe("version_10_beta");
    });

    it("handles separators", () => {
      expect(snakeCase("user_name.id")).toBe("user_name_id");
      expect(snakeCase("user_name test")).toBe("user_name_test");
    });

    it("handles single words", () => {
      expect(snakeCase("foo")).toBe("foo");
      expect(snakeCase("FOO")).toBe("foo");
    });

    it("returns empty string for empty input", () => {
      expect(snakeCase("")).toBe("");
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

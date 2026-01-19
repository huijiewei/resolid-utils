import { describe, expect, it } from "vitest";
import { get, omit, omitBy, pick, pickBy } from "./index";

describe("Object Utilities", () => {
  const obj = { a: 1, b: 2, c: 3 };

  describe("omit", () => {
    it("should omit specified keys", () => {
      expect(omit(obj, ["a", "b"])).toEqual({ c: 3 });
      // @ts-expect-error Type
      expect(omit(obj, ["x"])).toEqual(obj);
    });

    it("should not mutate the original object", () => {
      const copy = { ...obj };
      omit(obj, ["a"]);
      expect(obj).toEqual(copy);
    });
  });

  describe("omitBy", () => {
    it("should omit keys based on predicate", () => {
      const result = omitBy(obj, (value) => value % 2 === 0); // 去掉偶数
      expect(result).toEqual({ a: 1, c: 3 });
    });

    it("should keep all keys if predicate always returns false", () => {
      expect(omitBy(obj, () => false)).toEqual(obj);
    });

    it("should return empty object if predicate always returns true", () => {
      expect(omitBy(obj, () => true)).toEqual({});
    });
  });

  describe("pick", () => {
    it("should pick only specified keys", () => {
      expect(pick(obj, ["a", "c"])).toEqual({ a: 1, c: 3 });
      // @ts-expect-error Type
      expect(pick(obj, ["x"])).toEqual({});
    });

    it("should not mutate the original object", () => {
      const copy = { ...obj };
      pick(obj, ["a"]);
      expect(obj).toEqual(copy);
    });
  });

  describe("pickBy", () => {
    it("should pick keys based on predicate", () => {
      const result = pickBy(obj, (value) => value % 2 !== 0); // 保留奇数
      expect(result).toEqual({ a: 1, c: 3 });
    });

    it("should return empty object if predicate always returns false", () => {
      expect(pickBy(obj, () => false)).toEqual({});
    });

    it("should keep all keys if predicate always returns true", () => {
      expect(pickBy(obj, () => true)).toEqual(obj);
    });
  });

  describe("get", () => {
    type Person = {
      name: string;
      age: number;
      friends?: Person[];
    };
    const jay: Person = {
      name: "jay",
      age: 17,
      friends: [
        {
          name: "carl",
          age: 17,
          friends: [
            {
              name: "sara",
              age: 17,
            },
          ],
        },
      ],
    };
    it("handles null and undefined input", () => {
      expect(get(null, "name")).toBeUndefined();
      expect(get(undefined, "name")).toBeUndefined();
    });
    it("respects undefined as default value", () => {
      expect(get({}, "a.b.c", undefined)).toBeUndefined();
    });
    it("returns specified value or default using path", () => {
      expect(get({ age: undefined }, "age", 22)).toBe(22);
      expect(get(jay, "friends[0].age")).toBe(17);
      expect(get(jay, 'friends["0"].age')).toBe(17);
      expect(get(jay, "friends.0.age")).toBe(17);
      expect(get(jay, "friends.1.age")).toBeUndefined();
      expect(get(jay, "friends.0.friends[0].name")).toBe("sara");
      expect(get(jay, "name")).toBe("jay");
      expect(get(jay, "[name]")).toBe("jay");
      expect(get(jay, '["name"]')).toBe("jay");
      expect(get(jay, "friends[0][name]")).toBe("carl");
      expect(get(jay, "friends[0].friends[0].friends[0].age", 22)).toBe(22);
    });
  });
});

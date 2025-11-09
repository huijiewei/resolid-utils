import { describe, expect, it } from "vitest";
import { asArray, insert, partition, remove } from "./index";

describe("asArray", () => {
  it("should wrap a single value into an array", () => {
    expect(asArray(5)).toEqual([5]);
    expect(asArray("hello")).toEqual(["hello"]);
  });

  it("should return the original array if input is already an array", () => {
    const arr = [1, 2, 3];
    expect(asArray(arr)).toBe(arr);
  });
});

describe("insert", () => {
  it("should insert element at specified index", () => {
    const arr = [1, 2, 3];
    expect(insert(arr, 1, 10)).toEqual([1, 10, 2, 3]);
    expect(insert(arr, 0, 0)).toEqual([0, 1, 2, 3]);
    expect(insert(arr, 3, 4)).toEqual([1, 2, 3, 4]);
  });

  it("should not modify the original array", () => {
    const arr = [1, 2, 3];
    insert(arr, 1, 10);
    expect(arr).toEqual([1, 2, 3]);
  });
});

describe("remove", () => {
  it("should remove an existing item from the array", () => {
    const arr = [1, 2, 3];
    const result = remove(arr, 2);
    expect(result).toBe(true);
    expect(arr).toEqual([1, 3]);
  });

  it("should return false if the item does not exist", () => {
    const arr = [1, 2, 3];
    const result = remove(arr, 4);
    expect(result).toBe(false);
    expect(arr).toEqual([1, 2, 3]);
  });

  it("should remove only the first occurrence", () => {
    const arr = [1, 2, 2, 3];
    const result = remove(arr, 2);
    expect(result).toBe(true);
    expect(arr).toEqual([1, 2, 3]);
  });

  it("should handle an empty array", () => {
    const arr: number[] = [];
    const result = remove(arr, 1);
    expect(result).toBe(false);
    expect(arr).toEqual([]);
  });
});

describe("partition", () => {
  it("should split array based on predicate", () => {
    const arr = [1, 2, 3, 4, 5];
    const [even, odd] = partition(arr, (n) => n % 2 === 0);

    expect(even).toEqual([2, 4]);
    expect(odd).toEqual([1, 3, 5]);
  });

  it("should return empty arrays when no elements match", () => {
    const arr = [1, 3, 5];
    const [matches, nonMatches] = partition(arr, (n) => n % 2 === 0);

    expect(matches).toEqual([]);
    expect(nonMatches).toEqual([1, 3, 5]);
  });

  it("should return two arrays when all elements match", () => {
    const arr = [2, 4, 6];
    const [matches, nonMatches] = partition(arr, (n) => n % 2 === 0);

    expect(matches).toEqual([2, 4, 6]);
    expect(nonMatches).toEqual([]);
  });
});

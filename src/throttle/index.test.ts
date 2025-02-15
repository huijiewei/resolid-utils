import { beforeEach, describe, expect, test } from "vitest";
import { sleep } from "../function";
import { debounce, throttle, type Throttler } from "./index";

let calls: unknown[] = [];
let throttled: Throttler<unknown[]>;

beforeEach(() => {
  if (throttled && throttled.cancel) {
    throttled.cancel();
  }
  calls = [];
});

describe("throttle", () => {
  beforeEach(() => {
    throttled = throttle((...xs) => calls.push(xs), 100);
  });

  test("fires callback immediately", async () => {
    throttled();
    expect(calls).toHaveLength(1);
  });

  test("calls callback with given arguments", async () => {
    throttled(1, 2, 3);
    expect(calls).toEqual([[1, 2, 3]]);
  });

  test("fires once `wait` ms have passed", async () => {
    throttled(1);
    await sleep(50);
    throttled(2);
    await sleep(50);
    throttled(3);
    await sleep(50);
    throttled(4);
    expect(calls).toEqual([[1], [2]]);
  });

  test("will fire last call after `wait` ms have passed", async () => {
    throttled(1);
    throttled(2);
    throttled(3);
    await sleep(100);
    expect(calls).toEqual([[1], [3]]);
  });

  test("will fire even the passed time greater than `wait` ms", async () => {
    throttled(1);
    await sleep(200);
    throttled(2);
    throttled(3);
    throttled(4);
    await sleep(1000);
    throttled(5);
    expect(calls).toEqual([[1], [2], [4], [5]]);
  });

  test("calls callback with given arguments (middle)", async () => {
    throttled(1, 2, 3);
    throttled(4, 5, 6);
    throttled(7, 8, 9);
    throttled(10, 11, 12);
    await sleep(100);
    expect(calls).toEqual([
      [1, 2, 3],
      [10, 11, 12],
    ]);
  });

  test("can be cancelled with cancel()", async () => {
    throttled.cancel();
    throttled(1, 2, 3);
    throttled(4, 5, 6);
    throttled(7, 8, 9);
    throttled(10, 11, 12);
    await sleep(100);
    expect(calls).toEqual([]);
  });

  test("exposes `this`", async () => {
    throttled = throttle(function (this: unknown) {
      calls.push(this);
    }, 100);
    const receiver = {};
    throttled.call(receiver, 1);
    expect(calls).toEqual([receiver]);
  });
});

describe("throttle {start:false}", () => {
  beforeEach(() => {
    throttled = throttle((...xs) => calls.push(xs), 100, { start: false });
  });

  test("does not fire callback immediately", async () => {
    throttled();
    expect(calls).toHaveLength(0);
  });
});

describe("throttle {middle:false}", () => {
  beforeEach(() => {
    throttled = throttle((...xs) => calls.push(xs), 100, { middle: false });
  });

  test("fires first callback", async () => {
    throttled(1);
    expect(calls).toEqual([[1]]);
  });

  test("does not fire if `wait` ms have passed", async () => {
    throttled(1);
    await sleep(50);
    throttled(2);
    await sleep(50);
    throttled(3);
    await sleep(50);
    throttled(4);
    expect(calls).toEqual([[1]]);
  });
});

describe("debounce (throttle with {start: false, middle: false})", () => {
  beforeEach(() => {
    throttled = debounce((...xs) => calls.push(xs), 100);
  });

  test("does not fire callback immediately", async () => {
    throttled();
    expect(calls).toHaveLength(0);
  });

  test("only fires once `wait` ms have passed without any calls", async () => {
    throttled(1);
    throttled(2);
    throttled(3);
    await sleep(100);
    expect(calls).toEqual([[3]]);
  });

  test("will fire even the passed time greater than `wait` ms", async () => {
    throttled(1);
    await sleep(200);
    throttled(2);
    throttled(3);
    throttled(4);
    await sleep(1000);
    throttled(5);
    expect(calls).toEqual([[1], [4]]);
  });

  test("exposes `this`", async () => {
    throttled = debounce(function (this: unknown) {
      calls.push(this);
    }, 100);
    const receiver = {};
    throttled.call(receiver, 1);
    await sleep(100);
    expect(calls).toEqual([receiver]);
  });
});

describe("marbles", () => {
  const loop = async (cb: (n: number) => void) => {
    for (let i = 1; i <= 10; ++i) {
      cb(i);
      await sleep(50);
    }
    await sleep(100);
  };

  test("fn", async () => {
    await loop((x: number) => calls.push(x));
    expect(calls).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  test("throttle(fn, 100)", async () => {
    await loop(throttle((x) => calls.push(x), 100));
    expect(calls).toEqual([1, 2, 4, 6, 8, 10]);
  });

  test("throttle(fn, 100, {start:false})", async () => {
    await loop(throttle((x) => calls.push(x), 100, { start: false }));
    expect(calls).toEqual([2, 4, 6, 8, 10]);
  });

  test("throttle(fn, 100, {middle:false})", async () => {
    await loop(throttle((x) => calls.push(x), 100, { middle: false }));
    expect(calls).toEqual([1, 10]);
  });

  test("debounce(fn, 100)", async () => {
    await loop(debounce((x) => calls.push(x), 100));
    expect(calls).toEqual([10]);
  });
});

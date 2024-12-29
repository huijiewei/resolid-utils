export type Booleanish = boolean | "true" | "false";
export type AnyFunction<Arg = unknown, ReturnValue = unknown> = (...args: Arg[]) => ReturnValue;

export type Assign<T, U> = Omit<T, keyof U> & U;
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};

export type IsAny<T> = 0 extends 1 & T ? true : false;

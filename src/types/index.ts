export type Booleanish = boolean | "true" | "false";

export type Simplify<T> = { [K in keyof T]: T[K] } & {};

export type ValueOrFunction<T, A extends unknown[] = []> = T | ((...args: A) => T);

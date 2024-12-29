import { isFunction } from "../is";
import type { AnyFunction } from "../types";

export const runIfFunction = <MaybeReturnValue, FunctionArgs>(
  valueOrFn: MaybeReturnValue | ((...fnArgs: FunctionArgs[]) => MaybeReturnValue),
  ...args: FunctionArgs[]
) =>
  isFunction<AnyFunction<FunctionArgs, MaybeReturnValue>>(valueOrFn)
    ? valueOrFn(...args)
    : (valueOrFn as unknown as MaybeReturnValue);

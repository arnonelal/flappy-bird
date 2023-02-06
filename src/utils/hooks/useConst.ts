import { useMemo } from "react";

export function useConst<T>(value: Exclude<T, Function> | (() => T)): T {
  const initCallback = (typeof value === 'function') ? (value as () => T) : () => value;
  const memo = useMemo(initCallback, []);
  return memo;
}
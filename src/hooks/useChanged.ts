import { useEffect, useRef } from "react";

export function useChanged<T extends Array<any>>(
  effect: (prevDeps: T) => void,
  dependencies: T,
) {
  const ref = useRef(dependencies);
  useEffect(() => {
    if (ref.current === dependencies) return;
    effect(ref.current);
    console.log(ref.current, dependencies);
    ref.current = dependencies;
  }, dependencies);
}
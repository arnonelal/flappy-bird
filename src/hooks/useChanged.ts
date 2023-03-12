import { useEffect, useRef } from "react";

export function useChanged<T extends {}>(
  effect: (prevDeps: T) => void,
  dependencies: T,
) {
  const ref = useRef(dependencies);
  useEffect(() => {
    if (ref.current === dependencies) return;
    effect(ref.current);
    console.log(ref.current, dependencies);
    ref.current = dependencies;
  }, Object.values(dependencies));
}
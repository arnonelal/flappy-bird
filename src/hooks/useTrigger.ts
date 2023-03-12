import { useEffect, useState } from "react";

export function useTrigger(): { counter: number, trigger: () => void } {

  const [state, setState] = useState(0);

  return {
    counter: state,
    trigger: () => { setState(state + 1) },
  };
}


export function useTriggerEffect(effect: () => void, counter: number) {
  useEffect(() => {
    if (counter === 0) return;
    effect();
  }, [counter]);
}
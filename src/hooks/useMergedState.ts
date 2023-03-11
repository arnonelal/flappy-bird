import { useState } from "react";

export function useMergedState<T extends {}>(initialState: T): [
  state: T,
  setState: (state: Partial<T>) => void,
] {
  const [state, setState] = useState(initialState);
  const setMergedState = (newState: Partial<T>) => setState({ ...state, ...newState });
  return [state, setMergedState];
}
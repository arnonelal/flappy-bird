import { useRef } from "react";


const none = {};

export function useLazyRef<T>(init: () => T) {
  const ref = useRef<{} | T>(none);
  if (ref.current === none) {
    ref.current = init();
  }

  return ref as React.MutableRefObject<T>;
}



//taken from https://blog.thoughtspile.tech/2021/11/30/lazy-useref/
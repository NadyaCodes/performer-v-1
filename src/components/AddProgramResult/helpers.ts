import {useEffect, useRef} from "react";

export function useEffectOnce(fn: () => void) {
  const ref = useRef(true);
  useEffect(() => {
    if (ref.current) {
      fn();
    }
    return () => {
      ref.current = false;
    };
  }, [fn]);
}
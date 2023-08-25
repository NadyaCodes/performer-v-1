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

export function useEffectOnceVoidReturn(fn: () => Promise<void>) {
  const ref = useRef(true);
  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      fn();
    }
  }, [fn]);
}
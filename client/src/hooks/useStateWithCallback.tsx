import { useState, useRef, useEffect, useCallback } from "react";
// @ts-ignore
export const useStateWithCallback = (intialState) => {
  const [state, setState] = useState(intialState);
  const cbRef = useRef(null);
  // @ts-ignore
  const updateState = useCallback((newState, cb) => {
    cbRef.current = cb;
    // @ts-ignore
    setState((prev) =>
      typeof newState === "function" ? newState(prev) : newState
    );
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      // @ts-ignore
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]);

  return [state, updateState];
};

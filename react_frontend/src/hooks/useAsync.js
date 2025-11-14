import { useCallback, useEffect, useRef, useState } from 'react';

// PUBLIC_INTERFACE
export default function useAsync(asyncFn, deps = []) {
  /** Runs an async function with isLoading/value/error state and cancellation */
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  const run = useCallback(async (...args) => {
    setLoading(true); setError(null);
    try {
      const v = await asyncFn(...args);
      if (mounted.current) setValue(v);
      return v;
    } catch (e) {
      if (mounted.current) setError(e);
      throw e;
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  return { isLoading, value, error, run, setValue, setError };
}

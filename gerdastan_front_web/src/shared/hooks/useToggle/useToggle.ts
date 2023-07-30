import { useCallback, useState } from 'react';

export const useToggle = (defaultValue = false) => {
  const [active, setActive] = useState<boolean>(defaultValue);

  const toggle = useCallback(() => {
    setActive((i) => !i);
  }, []);

  const setTrue = useCallback(() => {
    setActive(true);
  }, []);

  const setFalse = useCallback(() => {
    setActive(false);
  }, []);

  return {
    active,
    setActive,
    toggle,
    setFalse,
    setTrue,
  };
};

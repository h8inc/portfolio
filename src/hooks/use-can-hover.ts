import { useEffect, useState } from 'react';

/** True when the device supports persistent hover (e.g. mouse). False on touch devices. */
export function useCanHover(): boolean {
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia('(hover: hover)');
    const onChange = () => setCanHover(mql.matches);
    setCanHover(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return canHover;
}

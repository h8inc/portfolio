import { useEffect, useState } from 'react';

type CountUpProps = {
  /** Stat as displayed, e.g. "$40M+", "8+", "x4". The first number in it is animated. */
  value: string;
  /** Milliseconds; matches the count-up on naskoterziev.com/strike */
  duration?: number;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Counts a stat up from 0 to its value on mount, with no start delay (an ease-out cubic, so it
 * spends most of its time near the final number). Screen readers get the final value only.
 */
export function CountUp({ value, duration = 1600 }: CountUpProps) {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const [display, setDisplay] = useState(() =>
    match && !prefersReducedMotion() ? `${match[1]}0${match[3]}` : value
  );

  useEffect(() => {
    if (!match || prefersReducedMotion()) {
      setDisplay(value);
      return;
    }
    const [, prefix, num, suffix] = match;
    const target = parseFloat(num);
    let frame = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(`${prefix}${Math.round(target * eased)}${suffix}`);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{value}</span>
    </>
  );
}

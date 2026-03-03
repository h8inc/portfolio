/**
 * Shadow design tokens. Use the class for Tailwind (e.g. on screen mocks);
 * use the value for inline styles or non-Tailwind contexts.
 */
export const shadows = {
  /** Backdrop shadow for screen mocks and phone frames (Tide, Blockstream, etc.) */
  mock: {
    /** Tailwind class: use as className="shadow-mock" */
    class: 'shadow-mock' as const,
    /** Raw CSS value for inline style or custom use */
    value: '0 12px 32px rgba(10, 8, 23, 0.12)',
  },
} as const;

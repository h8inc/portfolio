import type { ReactElement } from 'react';

/**
 * Spot illustrations for the Admin evolution mock.
 * Flat geometric set ("Periwinkle" palette from the Figma exploration):
 * paper documents, ledgers, cards, a calendar, bars, seals and the pound sign.
 * Drawn on a 120×120 grid so they scale cleanly to any slot.
 */

export const ILLO = {
  base: '#3B4BD8',
  mid: '#9AA5F0',
  light: '#E6E8FF',
  paper: '#FFFFFF',
  accent: '#F2B84B',
  ink: '#1C1F3A',
  plate: '#C9D0F5',
};

export type IlloName =
  | 'taxes'
  | 'payroll'
  | 'insights'
  | 'bookkeeping'
  | 'invoices'
  | 'bills'
  | 'expenses'
  | 'accounting'
  | 'growth';

const C = ILLO;
/** White paper shapes get a hairline edge so they hold up on white cards. */
const paperEdge = { stroke: C.plate, strokeWidth: 1 };

const drawings: Record<IlloName, ReactElement> = {
  taxes: (
    <>
      <rect x="30" y="22" width="60" height="76" rx="6" fill={C.paper} {...paperEdge} />
      <rect x="40" y="34" width="40" height="4" rx="2" fill={C.light} />
      <rect x="40" y="44" width="28" height="4" rx="2" fill={C.light} />
      <rect x="40" y="54" width="34" height="4" rx="2" fill={C.light} />
      <rect x="40" y="64" width="22" height="4" rx="2" fill={C.light} />
      <circle cx="76" cy="80" r="18" fill={C.base} />
      <circle cx="76" cy="80" r="12" fill={C.paper} />
      <path d="M70 80 L75 85 L83 75" fill="none" stroke={C.base} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="20" y="86" width="26" height="6" rx="3" fill={C.mid} />
      <rect x="18" y="92" width="30" height="6" rx="3" fill={C.base} />
    </>
  ),
  payroll: (
    <>
      <rect x="26" y="30" width="68" height="64" rx="8" fill={C.paper} {...paperEdge} />
      <path d="M26 38a8 8 0 0 1 8-8h52a8 8 0 0 1 8 8v10H26z" fill={C.base} />
      <rect x="40" y="22" width="6" height="14" rx="3" fill={C.mid} />
      <rect x="74" y="22" width="6" height="14" rx="3" fill={C.mid} />
      {[0, 1, 2].map((i) =>
        [0, 1, 2, 3].map((j) => (
          <rect
            key={`${i}-${j}`}
            x={36 + j * 14}
            y={56 + i * 12}
            width="8"
            height="6"
            rx="2"
            fill={i === 2 && j === 3 ? C.accent : C.light}
          />
        )),
      )}
      <rect x="56" y="78" width="50" height="26" rx="4" fill={C.mid} />
      <rect x="62" y="86" width="24" height="3" rx="1" fill={C.paper} />
      <rect x="62" y="93" width="16" height="3" rx="1" fill={C.paper} />
    </>
  ),
  insights: (
    <>
      <rect x="24" y="70" width="14" height="28" rx="3" fill={C.light} />
      <rect x="44" y="56" width="14" height="42" rx="3" fill={C.mid} />
      <rect x="64" y="64" width="14" height="34" rx="3" fill={C.light} />
      <rect x="84" y="40" width="14" height="58" rx="3" fill={C.base} />
      <path d="M24 62 L48 48 L70 54 L94 28" fill="none" stroke={C.ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="94" cy="28" r="5" fill={C.accent} />
    </>
  ),
  bookkeeping: (
    <>
      <rect x="28" y="24" width="64" height="76" rx="8" fill={C.base} />
      <rect x="36" y="24" width="56" height="76" rx="6" fill={C.paper} {...paperEdge} />
      <rect x="36" y="24" width="8" height="76" fill={C.mid} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="52" y={38 + i * 11} width={i % 2 ? 22 : 30} height="4" rx="2" fill={C.light} />
      ))}
      <path d="M76 24h8v30l-4-4-4 4z" fill={C.accent} />
    </>
  ),
  invoices: (
    <>
      <rect x="32" y="20" width="56" height="80" rx="6" fill={C.paper} {...paperEdge} />
      <rect x="42" y="32" width="22" height="5" rx="2" fill={C.base} />
      <rect x="42" y="44" width="36" height="4" rx="2" fill={C.light} />
      <rect x="42" y="54" width="36" height="4" rx="2" fill={C.light} />
      <rect x="42" y="64" width="24" height="4" rx="2" fill={C.light} />
      <rect x="42" y="80" width="36" height="8" rx="2" fill={C.mid} />
      <circle cx="82" cy="86" r="16" fill={C.accent} />
      <circle cx="82" cy="86" r="10" fill={C.paper} />
      <rect x="78" y="83" width="8" height="6" rx="1" fill={C.accent} />
    </>
  ),
  bills: (
    <>
      <path
        d="M34 20h52v72l-6-6-6 6-6-6-6 6-6-6-6 6-6-6-6 6-4-6z"
        fill={C.paper}
        {...paperEdge}
      />
      <rect x="44" y="32" width="32" height="5" rx="2" fill={C.base} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="44" y={46 + i * 10} width="18" height="4" rx="2" fill={C.light} />
          <rect x="68" y={46 + i * 10} width="8" height="4" rx="2" fill={C.mid} />
        </g>
      ))}
      <rect x="44" y="78" width="32" height="1.5" fill={C.mid} />
      <rect x="20" y="60" width="24" height="36" rx="4" fill={C.base} />
      <rect x="20" y="68" width="24" height="6" fill={C.ink} />
    </>
  ),
  expenses: (
    <>
      <rect x="20" y="44" width="76" height="48" rx="8" fill={C.mid} />
      <rect x="26" y="34" width="76" height="48" rx="8" fill={C.base} />
      <rect x="32" y="24" width="76" height="48" rx="8" fill={C.ink} />
      <rect x="32" y="36" width="76" height="10" fill={C.base} />
      <rect x="40" y="56" width="14" height="10" rx="2" fill={C.accent} />
      <rect x="60" y="60" width="36" height="4" rx="2" fill={C.light} />
    </>
  ),
  accounting: (
    <>
      <rect x="18" y="38" width="36" height="44" rx="8" fill={C.base} />
      <rect x="66" y="38" width="36" height="44" rx="8" fill={C.paper} {...paperEdge} />
      <path d="M54 60h12" stroke={C.ink} strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="60" r="8" fill={C.accent} />
      <rect x="26" y="50" width="20" height="4" rx="2" fill={C.light} />
      <rect x="26" y="60" width="14" height="4" rx="2" fill={C.light} />
      <rect x="74" y="50" width="20" height="4" rx="2" fill={C.light} />
      <rect x="74" y="60" width="14" height="4" rx="2" fill={C.light} />
    </>
  ),
  growth: (
    <>
      <circle cx="60" cy="60" r="30" fill={C.base} />
      <circle cx="60" cy="60" r="22" fill={C.light} />
      <text x="60" y="70" textAnchor="middle" fontSize="28" fontWeight="700" fill={C.ink} fontFamily="'Geist', system-ui">
        £
      </text>
      <path d="M22 92C4 76 4 44 22 28" fill="none" stroke={C.accent} strokeWidth="4" strokeLinecap="round" />
    </>
  ),
};

export function Illo({
  name,
  size = 72,
  plate = false,
  className,
}: {
  name: IlloName;
  size?: number;
  /** Soft circular plate behind the drawing, for use on white cards. */
  plate?: boolean;
  className?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} aria-hidden="true">
      {plate && <circle cx="60" cy="60" r="60" fill={C.plate} fillOpacity={0.55} />}
      <g transform={plate ? 'translate(6 6) scale(0.9)' : undefined}>{drawings[name]}</g>
    </svg>
  );
}

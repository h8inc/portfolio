import type { ReactNode } from 'react';
import { ChevronRight, MoreVertical, Plus } from 'lucide-react';
import { Tap } from './proto';

/* ------------------------------------------------------------------ */
/* Design tokens: row E of the Figma exploration ("Periwinkle")        */
/* ------------------------------------------------------------------ */

export const T = {
  canvas: '#F4F5FD',
  card: '#FFFFFF',
  border: '#E4E6F5',
  border2: '#CDD1EC',
  primary: '#3B4BD8',
  deep: '#1E2A78',
  light: '#9AA5F0',
  tint: '#E6E8FF',
  ink: '#1C1F3A',
  muted: '#666A85',
  icon: '#8E92B0',
  gold: '#F2B84B',
  green: '#1E9E6A',
  danger: '#D7385E',
  dangerTint: '#FBE3EA',
};
export const HEAD = "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif";
export const BODY = "'Geist', ui-sans-serif, system-ui, sans-serif";

/* ------------------------------------------------------------------ */
/* Layout primitives                                                   */
/* ------------------------------------------------------------------ */

export function SectionTitle({ children, more, action, onAction }: { children: ReactNode; more?: boolean; action?: string; onAction?: () => void }) {
  return (
    <div className="mb-3 flex items-center justify-between px-4">
      <h2 className="text-[22px] font-bold tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
        {children}
      </h2>
      {more && <MoreVertical size={18} style={{ color: T.muted }} />}
      {action && (
        <Tap onTap={onAction} className="text-[15px] font-semibold" style={{ fontFamily: HEAD, color: T.primary }}>
          {action}
        </Tap>
      )}
    </div>
  );
}

export function Card({ children, className = '', pad = true, onTap }: { children: ReactNode; className?: string; pad?: boolean; onTap?: () => void }) {
  const cls = `mx-4 rounded-[20px] border bg-white ${pad ? 'p-4' : ''} ${className}`;
  if (onTap) {
    return (
      <Tap onTap={onTap} block className={`${cls} text-left`} style={{ borderColor: T.border }}>
        {children}
      </Tap>
    );
  }
  return (
    <div className={cls} style={{ borderColor: T.border }}>
      {children}
    </div>
  );
}

export function CardTitle({ children, action, onAction, right }: { children: ReactNode; action?: string; onAction?: () => void; right?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-[17px] font-semibold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
        {children}
      </h3>
      {action && (
        <Tap onTap={onAction} className="text-[13px] font-medium" style={{ color: T.primary }}>
          {action}
        </Tap>
      )}
      {right}
    </div>
  );
}

export function OutlineButton({ children, icon, onTap }: { children: ReactNode; icon?: ReactNode; onTap?: () => void }) {
  return (
    <Tap
      onTap={onTap}
      block
      className="flex h-9 w-full items-center justify-center gap-1.5 rounded-full border text-[13px] font-medium"
      style={{ borderColor: T.border2, color: T.primary }}
    >
      {icon}
      {children}
    </Tap>
  );
}

export function PrimaryButton({ children, icon, onTap, className = '' }: { children: ReactNode; icon?: ReactNode; onTap?: () => void; className?: string }) {
  return (
    <Tap
      onTap={onTap}
      block
      className={`flex h-10 w-full items-center justify-center gap-2 rounded-full text-[14px] font-semibold text-white ${className}`}
      style={{ background: T.primary }}
    >
      {icon}
      {children}
    </Tap>
  );
}

export function ListRow({ title, sub, icon, right, onTap, first }: { title: ReactNode; sub?: ReactNode; icon?: ReactNode; right?: ReactNode; onTap?: () => void; first?: boolean }) {
  return (
    <Tap onTap={onTap} block className={`flex w-full items-center gap-3 px-4 py-3.5 text-left ${first ? '' : 'border-t'}`} style={{ borderColor: T.border }}>
      {icon && (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: T.tint, color: T.primary }}>
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-[14px] font-medium leading-snug" style={{ color: T.ink }}>
          {title}
        </span>
        {sub && (
          <span className="block text-[12px] leading-snug" style={{ color: T.muted }}>
            {sub}
          </span>
        )}
      </span>
      {right ?? <ChevronRight size={18} style={{ color: T.icon }} />}
    </Tap>
  );
}

export function Pill({ children, tone = 'tint' }: { children: ReactNode; tone?: 'tint' | 'danger' | 'green' | 'gold' }) {
  const map = {
    tint: { bg: T.tint, fg: T.deep },
    danger: { bg: T.dangerTint, fg: T.danger },
    green: { bg: '#E3F5EC', fg: T.green },
    gold: { bg: '#FBF0D6', fg: '#8A6111' },
  }[tone];
  return (
    <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.06em]" style={{ background: map.bg, color: map.fg }}>
      {children}
    </span>
  );
}

export function SegmentTabs({ items, active, onChange }: { items: string[]; active: string; onChange?: (v: string) => void }) {
  return (
    <div className="mx-4 flex rounded-full border p-0.5" style={{ borderColor: T.border2, background: '#fff' }}>
      {items.map((it) => {
        const on = it === active;
        return (
          <Tap
            key={it}
            onTap={() => onChange?.(it)}
            block
            className="flex-1 rounded-full py-1.5 text-center text-[13px] font-medium"
            style={{ background: on ? T.tint : 'transparent', color: on ? T.deep : T.muted }}
          >
            {it}
          </Tap>
        );
      })}
    </div>
  );
}

/** Horizontal top tabs used inside "Tide Accounting". */
export function TopTabs({ items, active, onChange }: { items: string[]; active: string; onChange?: (v: string) => void }) {
  return (
    <div className="flex gap-5 overflow-x-auto border-b px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ borderColor: T.border }}>
      {items.map((it) => {
        const on = it === active;
        return (
          <Tap
            key={it}
            onTap={() => onChange?.(it)}
            className="-mb-px shrink-0 whitespace-nowrap border-b-2 pb-2.5 pt-1 text-[13px] font-medium"
            style={{ borderColor: on ? T.primary : 'transparent', color: on ? T.primary : T.muted }}
          >
            {it}
          </Tap>
        );
      })}
    </div>
  );
}

export function LockBanner({ title, sub, onTap }: { title: string; sub: string; onTap?: () => void }) {
  return (
    <Card onTap={onTap} className="flex items-center gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: T.tint }}>
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="12" width="7" height="8" rx="2" fill={T.light} />
          <rect x="9" y="4" width="7" height="16" rx="2" fill={T.primary} />
          <circle cx="18" cy="9" r="3.5" fill={T.gold} />
        </svg>
      </span>
      <span className="flex-1">
        <span className="block text-[14px] font-medium" style={{ color: T.ink }}>
          {title}
        </span>
        <span className="flex items-center gap-0.5 text-[13px] font-medium" style={{ color: T.primary }}>
          {sub} <ChevronRight size={14} />
        </span>
      </span>
    </Card>
  );
}

export function KeyValue({ rows, total }: { rows: [string, string, string?][]; total?: [string, string] }) {
  return (
    <dl className="space-y-2.5 text-[13px]" style={{ color: T.ink }}>
      {rows.map(([k, v, tone]) => (
        <div key={k} className="flex justify-between">
          <dt style={{ color: T.muted }}>{k}</dt>
          <dd className={tone ? 'font-medium' : ''} style={tone === 'danger' ? { color: T.danger } : tone === 'green' ? { color: T.green } : undefined}>
            {v}
          </dd>
        </div>
      ))}
      {total && (
        <div className="flex justify-between border-t pt-3 font-semibold" style={{ borderColor: T.border }}>
          <dt>{total[0]}</dt>
          <dd className="text-[15px]" style={{ fontFamily: HEAD }}>
            {total[1]}
          </dd>
        </div>
      )}
    </dl>
  );
}

export const PlusIcon = () => <Plus size={14} />;

/* ------------------------------------------------------------------ */
/* Charts (decorative, static)                                         */
/* ------------------------------------------------------------------ */

export function ScoreDial({ value, size = 200 }: { value: number; size?: number }) {
  const r = 70;
  const len = Math.PI * r;
  return (
    <svg viewBox="0 0 180 100" className="mx-auto block" style={{ width: size }} aria-hidden="true">
      <defs>
        <linearGradient id="dial" x1="0" x2="1">
          <stop offset="0" stopColor={T.light} />
          <stop offset="1" stopColor={T.primary} />
        </linearGradient>
      </defs>
      <path d={`M20 90 A${r} ${r} 0 0 1 160 90`} fill="none" stroke={T.tint} strokeWidth="12" strokeLinecap="round" />
      <path d={`M20 90 A${r} ${r} 0 0 1 160 90`} fill="none" stroke="url(#dial)" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${(value / 100) * len} ${len}`} />
      <text x="90" y="86" textAnchor="middle" fontSize="40" fontWeight="800" fill={T.ink} fontFamily={HEAD} letterSpacing="-1.5">
        {value}%
      </text>
    </svg>
  );
}

/** Grouped bars for net profit / revenue / expenses, plus month labels. */
export function GroupedBars({ months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'], blur = false }: { months?: string[]; blur?: boolean }) {
  const data = [
    [22, 40, 30],
    [38, 52, 36],
    [46, 60, 40],
    [12, 28, 30],
    [30, 44, 34],
    [40, 56, 38],
  ];
  return (
    <svg viewBox="0 0 320 120" className="block w-full" style={{ filter: blur ? 'blur(3px)' : undefined }} aria-hidden="true">
      {[0, 30, 60, 90].map((y) => (
        <line key={y} x1="0" x2="320" y1={100 - y} y2={100 - y} stroke={T.border} strokeWidth="1" />
      ))}
      {data.map((g, i) => {
        const x0 = 14 + i * 52;
        return (
          <g key={i}>
            <rect x={x0} y={100 - g[0] * 1.6} width="9" height={g[0] * 1.6} rx="2" fill={T.primary} />
            <rect x={x0 + 12} y={100 - g[1] * 1.6} width="9" height={g[1] * 1.6} rx="2" fill={T.light} />
            <rect x={x0 + 24} y={100 - g[2] * 1.6} width="9" height={g[2] * 1.6} rx="2" fill={T.gold} />
            <text x={x0 + 16} y="114" textAnchor="middle" fontSize="9" fill={T.muted} fontFamily={BODY}>
              {months[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function Legend({ items }: { items: [string, string][] }) {
  return (
    <div className="mt-1 flex justify-center gap-4 text-[11px]" style={{ color: T.muted }}>
      {items.map(([label, color]) => (
        <span key={label} className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full" style={{ background: color }} /> {label}
        </span>
      ))}
    </div>
  );
}

/** Smooth line with soft area, for insight cards. */
export function LineChart({ tone = T.primary, height = 64, blur = false, trend = 'up' }: { tone?: string; height?: number; blur?: boolean; trend?: 'up' | 'down' | 'flat' }) {
  const pts = trend === 'up' ? [40, 36, 42, 30, 28, 20, 14, 10] : trend === 'down' ? [12, 18, 16, 26, 30, 28, 36, 40] : [26, 24, 27, 25, 26, 24, 26, 25];
  const w = 300;
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${(i / (pts.length - 1)) * w} ${p}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} 48`} className="block w-full" style={{ height, filter: blur ? 'blur(3px)' : undefined }} preserveAspectRatio="none" aria-hidden="true">
      <path d={`${d} L${w} 48 L0 48 Z`} fill={tone} fillOpacity="0.12" />
      <path d={d} fill="none" stroke={tone} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

/** Donut with centre label, slices as [percent, colour]. */
export function Donut({ slices, label, sub, size = 132 }: { slices: [number, string][]; label: string; sub?: string; size?: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg viewBox="0 0 120 120" style={{ width: size, height: size }} className="shrink-0" aria-hidden="true">
      <circle cx="60" cy="60" r={r} fill="none" stroke={T.tint} strokeWidth="14" />
      {slices.map(([pct, color], i) => {
        const len = (pct / 100) * c;
        const el = (
          <circle key={i} cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="14" strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-acc} transform="rotate(-90 60 60)" />
        );
        acc += len;
        return el;
      })}
      <text x="60" y="58" textAnchor="middle" fontSize="12" fontWeight="700" fill={T.ink} fontFamily={HEAD}>
        {label}
      </text>
      {sub && (
        <text x="60" y="72" textAnchor="middle" fontSize="8" fill={T.muted} fontFamily={BODY}>
          {sub}
        </text>
      )}
    </svg>
  );
}

/** Two smooth areas, current period solid and previous dashed, as in the 2023 Insights tab. */
export function AreaPair({ tone = 'teal', months = ['Apr', 'Jun', 'Aug', 'Oct', 'Dec', 'Feb', 'Mar'] }: { tone?: 'teal' | 'indigo' | 'gold'; months?: string[] }) {
  const color = { teal: '#2BB5A0', indigo: T.primary, gold: T.gold }[tone];
  const cur = [70, 62, 66, 48, 44, 40, 30];
  const prev = [78, 72, 60, 58, 52, 50, 46];
  const w = 300;
  const path = (pts: number[]) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${(i / (pts.length - 1)) * w} ${p}`).join(' ');
  return (
    <div>
      <svg viewBox={`0 0 ${w} 100`} className="block h-[110px] w-full" preserveAspectRatio="none" aria-hidden="true">
        {[25, 50, 75].map((y) => (
          <line key={y} x1="0" x2={w} y1={y} y2={y} stroke={T.border} />
        ))}
        <path d={`${path(cur)} L${w} 100 L0 100 Z`} fill={color} fillOpacity="0.18" />
        <path d={path(cur)} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
        <path d={path(prev)} fill="none" stroke={T.ink} strokeWidth="1.5" strokeDasharray="4 4" strokeLinejoin="round" />
      </svg>
      <div className="flex justify-between text-[10px]" style={{ color: T.muted }}>
        {months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
      <Legend
        items={[
          ['Current period', color],
          ['Previous period', T.ink],
        ]}
      />
    </div>
  );
}

/** Up-and-down bars around a zero line (net profit drill-down). */
export function DivergingBars({ height = 110 }: { height?: number }) {
  const vals = [2.2, -1.1, 2.0, -1.4, 3.2, -4.4];
  return (
    <svg viewBox="0 0 320 110" className="block w-full" style={{ height }} aria-hidden="true">
      {[-10, -5, 0, 5, 10].map((v, i) => (
        <g key={v}>
          <line x1="0" x2="280" y1={55 - v * 4.5} y2={55 - v * 4.5} stroke={T.border} />
          <text x="300" y={58 - v * 4.5} fontSize="9" fill={T.muted} textAnchor="middle" fontFamily={BODY}>
            {i === 2 ? '0' : `${v > 0 ? '' : '-'}${Math.abs(v)}K`}
          </text>
        </g>
      ))}
      {vals.map((v, i) => {
        const h = Math.abs(v) * 4.5;
        const y = v > 0 ? 55 - h : 55;
        const last = i === vals.length - 1;
        return (
          <g key={i}>
            {last && <rect x={18 + i * 46 - 8} y="4" width="44" height="100" rx="6" fill={T.tint} />}
            <rect x={18 + i * 46} y={y} width="28" height={h} rx="3" fill={last ? T.primary : T.light} />
          </g>
        );
      })}
    </svg>
  );
}

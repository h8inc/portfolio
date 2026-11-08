/**
 * Tide layer over the shared prototype engine: Tide's theme and chrome
 * (status bar, nav bar, tab bar). Behaviour lives in src/prototype/engine.
 */
import { useMemo, type ReactNode } from 'react';
import { ArrowLeft, Folder, LayoutGrid, MessageSquare, Sprout, Wallet } from 'lucide-react';
import { ProtoPhone, Tap, useNav, type Nav, type PhoneTheme, type ScreenMap } from '../../prototype/engine';

export { Tap, useNav };
export type { Nav, ScreenMap };

const INK = '#1C1F3A';
const PRIMARY = '#3B4BD8';
const MUTED = '#666A85';
const BORDER = '#E4E6F5';

export const TIDE_THEME: Partial<PhoneTheme> = {
  canvas: '#F4F5FD',
  frame: '#14162B',
  fontFamily: "'Geist', ui-sans-serif, system-ui, sans-serif",
  scrim: 'rgba(28,31,58,0.45)',
  handle: '#CDD1EC',
  toastBg: INK,
  shadow: '0 30px 80px -24px rgba(19,15,37,0.35)',
};

/* ------------------------------------------------------------------ */
/* Chrome                                                              */
/* ------------------------------------------------------------------ */

export function StatusBar({ ios }: { ios?: boolean }) {
  return (
    <div className="relative flex items-center justify-between px-6 pt-3 pb-1 text-[13px] font-semibold" style={{ color: INK }}>
      <span>{ios ? '9:41' : '12:30'}</span>
      {ios && <span className="absolute left-1/2 top-2.5 -translate-x-1/2 h-[26px] w-[96px] rounded-full bg-black" />}
      <span className="flex items-center gap-1.5" aria-hidden="true">
        <span className="flex items-end gap-[2px]">
          {[4, 6, 8, 10].map((h) => (
            <span key={h} className="w-[3px] rounded-sm" style={{ height: h, background: INK }} />
          ))}
        </span>
        <span className="ml-1 inline-flex h-[11px] w-[22px] items-center rounded-[3px] border px-[1.5px]" style={{ borderColor: INK }}>
          <span className="h-[6px] w-[14px] rounded-[1px]" style={{ background: INK }} />
        </span>
      </span>
    </div>
  );
}

/** Sub-screen header with a back arrow. */
export function NavBar({ title, right, big, onBack }: { title: string; right?: ReactNode; big?: boolean; onBack?: () => void }) {
  const nav = useNav();
  return (
    <div className="flex items-center gap-3 px-4 pb-3 pt-2">
      <Tap onTap={onBack ?? nav.back} label="Back" className="-ml-1 grid h-9 w-9 place-items-center rounded-full" style={{ color: INK }}>
        <ArrowLeft size={20} />
      </Tap>
      <h1 className={`flex-1 font-bold tracking-[-0.02em] ${big ? 'text-[24px]' : 'text-[18px]'}`} style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif", color: INK }}>
        {title}
      </h1>
      {right}
    </div>
  );
}

export type TabName = 'Payments' | 'Admin' | 'Finance' | 'Support' | 'More';
const TAB_ICONS: Record<TabName, ReactNode> = {
  Payments: <Wallet size={20} />,
  Admin: <Folder size={20} />,
  Finance: <Sprout size={20} />,
  Support: <MessageSquare size={20} />,
  More: <LayoutGrid size={20} />,
};

export function TabBar({ tabs }: { tabs: TabName[] }) {
  const nav = useNav();
  return (
    <nav className="absolute inset-x-0 bottom-0 z-10 border-t bg-white/95 pb-5 pt-2 backdrop-blur" style={{ borderColor: BORDER }}>
      <ul className="flex justify-around">
        {tabs.map((t) => (
          <li key={t}>
            <Tap
              onTap={t === 'Admin' ? nav.home : () => nav.toast(`${t} tab is outside this prototype`)}
              className="flex w-16 flex-col items-center gap-1 text-[11px]"
              style={{ color: t === 'Admin' ? PRIMARY : MUTED, fontWeight: t === 'Admin' ? 600 : 400 }}
            >
              {TAB_ICONS[t]}
              {t}
            </Tap>
          </li>
        ))}
      </ul>
      <span className="mx-auto mt-2 block h-1 w-32 rounded-full" style={{ background: INK }} />
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Tide phone                                                          */
/* ------------------------------------------------------------------ */

export type StageProto = {
  screens: ScreenMap;
  sheets?: ScreenMap;
  tabs: TabName[];
};

export function TidePhone({
  stageKey,
  proto,
  onState,
  initialFlags,
}: {
  stageKey: string | number;
  proto: StageProto;
  onState?: (s: { depth: number; sheet: boolean; current: string }) => void;
  initialFlags?: Record<string, boolean>;
}) {
  const engineProto = useMemo(
    () => ({ screens: proto.screens, sheets: proto.sheets, chrome: () => <TabBar tabs={proto.tabs} /> }),
    [proto],
  );
  return <ProtoPhone stageKey={stageKey} proto={engineProto} theme={TIDE_THEME} onState={onState} initialFlags={initialFlags} />;
}

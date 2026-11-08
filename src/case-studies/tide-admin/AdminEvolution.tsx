import { useCallback, useEffect, useRef, useState, type ReactElement, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeftRight,
  Camera,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  FileText,
  Folder,
  Landmark,
  LayoutGrid,
  Lock,
  MessageSquare,
  MoreVertical,
  Plus,
  Receipt,
  RotateCcw,
  Sprout,
  Upload,
  UserRound,
  Wallet,
  X,
} from 'lucide-react';
import { Illo, type IlloName } from './illustrations';
import { buttonStyles, buttonFontFamily } from '../../lib/button-styles';

/* ------------------------------------------------------------------ */
/* Design tokens: row E of the Figma exploration ("Periwinkle")        */
/* ------------------------------------------------------------------ */

const T = {
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
  danger: '#D7385E',
  dangerTint: '#FBE3EA',
};
/** Website tokens for everything outside the phone. */
const SITE = {
  ink: '#130F25',
  text: '#3F3A2F',
  tile: '#EDEAE4',
  line: '#D9D3C7',
  orange: '#FF6B35',
  head: "'Aeonik Extended', ui-sans-serif, system-ui, sans-serif",
  body: "'Aeonik', ui-sans-serif, system-ui, sans-serif",
};
const HEAD = "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif";
const BODY = "'Geist', ui-sans-serif, system-ui, sans-serif";

/** Loads the two Google fonts once, on first mount. */
function useFonts() {
  useEffect(() => {
    const id = 'admin-evolution-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Geist:wght@400;500;600&display=swap';
    document.head.appendChild(link);
  }, []);
}

/* ------------------------------------------------------------------ */
/* Stages                                                              */
/* ------------------------------------------------------------------ */

export type Stage = {
  year: string;
  title: string;
  summary: string;
  /** Accounting sign-up rate and Accounting ARR, same series as the /growth page. */
  signUp?: string;
  arr: string;
  screen: () => ReactElement;
};

export const STAGES: Stage[] = [
  {
    year: '2023',
    title: 'Paywalled accounting',
    summary:
      'Accounting sat behind a paywall. Admin opened on locked cards and a trial CTA, with invoices, bills and expenses as empty states.',
    signUp: '0.95%',
    arr: '£0',
    screen: () => <Screen2023 />,
  },
  {
    year: 'Q2 2024',
    title: 'First freemium release',
    summary:
      'A free bookkeeping score replaced the locked carousel. It shows owners what is missing and turns accounting into a short task list.',
    signUp: '1.6%',
    arr: '£900K',
    screen: () => <ScreenEarly2024 />,
  },
  {
    year: 'Q3 2024',
    title: 'Insights and tax for everyone',
    summary:
      'Insights and tax estimates were decoupled and opened to all 1.5M users. Revenue and net profit moved to the top of Admin.',
    signUp: '3.8%',
    arr: '£2M',
    screen: () => <ScreenLate2024 />,
  },
  {
    year: 'Q2 2025',
    title: 'Admin IA redesign',
    summary:
      'Quick actions and live invoice and bill totals replaced the empty states. Overdue, due and paid sit side by side.',
    signUp: '22.2%',
    arr: '£8M',
    screen: () => <Screen2025 />,
  },
  {
    year: '2026',
    title: 'One admin hub',
    summary:
      'Every product sits in one row, tasks guide setup, and connections live in one list. Admin becomes the place to run the back office.',
    arr: '£12M',
    screen: () => <Screen2026 />,
  },
];

/* ------------------------------------------------------------------ */
/* Shared primitives                                                   */
/* ------------------------------------------------------------------ */

function StatusBar({ ios }: { ios?: boolean }) {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[13px] font-semibold" style={{ color: T.ink }}>
      <span>{ios ? '9:41' : '12:30'}</span>
      {ios && <span className="absolute left-1/2 top-2.5 -translate-x-1/2 h-[26px] w-[96px] rounded-full bg-black" />}
      <span className="flex items-center gap-1.5" aria-hidden="true">
        <span className="flex items-end gap-[2px]">
          {[4, 6, 8, 10].map((h) => (
            <span key={h} className="w-[3px] rounded-sm" style={{ height: h, background: T.ink }} />
          ))}
        </span>
        <span className="ml-1 inline-flex h-[11px] w-[22px] items-center rounded-[3px] border px-[1.5px]" style={{ borderColor: T.ink }}>
          <span className="h-[6px] w-[14px] rounded-[1px]" style={{ background: T.ink }} />
        </span>
      </span>
    </div>
  );
}

function Header({ business }: { business: 'switcher' | 'avatar' }) {
  return (
    <div className="flex items-center justify-between px-4 pt-3 pb-4">
      <h1 className="text-[28px] font-bold leading-none tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
        Admin
      </h1>
      {business === 'switcher' ? (
        <span
          className="flex items-center gap-1.5 rounded-full border bg-white py-1 pl-3 pr-1 text-[11px] font-medium"
          style={{ borderColor: T.border, color: T.ink }}
        >
          Feel Good Inc.
          <ChevronDown size={12} />
          <span className="grid h-7 w-7 place-items-center rounded-full text-[9px] font-bold text-white" style={{ background: '#EC5C31' }}>
            FG
          </span>
        </span>
      ) : (
        <span
          className="grid h-9 w-9 place-items-center rounded-full border-4 bg-white text-[12px] font-semibold"
          style={{ borderColor: T.tint, color: T.deep }}
        >
          JB
        </span>
      )}
    </div>
  );
}

function SectionTitle({ children, more, action }: { children: ReactNode; more?: boolean; action?: string }) {
  return (
    <div className="mb-3 flex items-center justify-between px-4">
      <h2 className="text-[22px] font-bold tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
        {children}
      </h2>
      {more && <MoreVertical size={18} style={{ color: T.muted }} />}
      {action && (
        <span className="text-[15px] font-semibold" style={{ fontFamily: HEAD, color: T.primary }}>
          {action}
        </span>
      )}
    </div>
  );
}

function Card({ children, className = '', pad = true }: { children: ReactNode; className?: string; pad?: boolean }) {
  return (
    <div
      className={`mx-4 rounded-[20px] border bg-white ${pad ? 'p-4' : ''} ${className}`}
      style={{ borderColor: T.border }}
    >
      {children}
    </div>
  );
}

function CardTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-[17px] font-semibold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
        {children}
      </h3>
      {action}
    </div>
  );
}

function OutlineButton({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <span
      className="flex h-9 w-full items-center justify-center gap-1.5 rounded-full border text-[13px] font-medium"
      style={{ borderColor: T.border2, color: T.primary }}
    >
      {icon}
      {children}
    </span>
  );
}

function EmptyState({ title, illo, text, cta, more }: { title: string; illo: IlloName; text: string; cta: string; more?: boolean }) {
  return (
    <Card>
      <CardTitle action={more ? <MoreVertical size={16} style={{ color: T.muted }} /> : undefined}>{title}</CardTitle>
      <div className="flex flex-col items-center gap-3">
        <Illo name={illo} size={84} plate />
        <p className="text-center text-[13px]" style={{ color: T.muted }}>
          {text}
        </p>
        <OutlineButton icon={<Plus size={14} />}>{cta}</OutlineButton>
      </div>
    </Card>
  );
}

function PromoCard({ title, text, link, illo }: { title: string; text: string; link?: string; illo: IlloName }) {
  return (
    <Card>
      <div className="flex gap-3">
        <div className="flex-1">
          <h3 className="mb-1 text-[16px] font-semibold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
            {title}
          </h3>
          <p className="text-[12px] leading-snug" style={{ color: T.muted }}>
            {text}
          </p>
          {link && (
            <span className="mt-3 inline-flex items-center gap-0.5 text-[12px] font-medium" style={{ color: T.primary }}>
              {link} <ChevronRight size={12} />
            </span>
          )}
        </div>
        <div className="flex flex-col items-end">
          <X size={16} style={{ color: T.muted }} />
          <Illo name={illo} size={76} plate />
        </div>
      </div>
    </Card>
  );
}

function ExploreMore() {
  return (
    <section className="mt-7">
      <p className="mb-3 px-4 text-[13px] font-semibold" style={{ color: T.ink }}>
        Explore more
      </p>
      <div className="mx-4 flex overflow-hidden rounded-[20px] border bg-white" style={{ borderColor: T.border }}>
        <div className="grid w-[110px] shrink-0 place-items-center" style={{ background: T.tint }}>
          <Illo name="accounting" size={84} />
        </div>
        <div className="relative flex-1 p-4 pr-8">
          <X size={16} className="absolute right-3 top-3" style={{ color: T.muted }} />
          <h3 className="mb-1 text-[16px] font-semibold leading-tight tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
            Connect your accounting software
          </h3>
          <p className="text-[12px] leading-snug" style={{ color: T.muted }}>
            Sync your Tide transactions to your accounting software for accurate bookkeeping
          </p>
        </div>
      </div>
    </section>
  );
}

function TeamExpenses() {
  return (
    <section className="mt-7">
      <SectionTitle more>Team expenses</SectionTitle>
      <span
        className="mx-4 mb-3 inline-flex items-center gap-1.5 rounded-lg border bg-white px-3 py-1.5 text-[13px]"
        style={{ borderColor: T.border, color: T.ink }}
      >
        Main business account <ChevronDown size={14} />
      </span>
      <div className="mx-4 flex overflow-hidden rounded-[20px] border bg-white" style={{ borderColor: T.border }}>
        <div className="grid w-[120px] shrink-0 place-items-center py-3" style={{ background: T.tint }}>
          <Illo name="expenses" size={96} />
        </div>
        <div className="flex-1 p-4">
          <h3 className="mb-1 text-[16px] font-semibold leading-tight tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
            Give your team Expense Cards
          </h3>
          <p className="text-[12px] leading-snug" style={{ color: T.muted }}>
            Empower your staff and simplify how you manage your business expenses
          </p>
        </div>
      </div>
    </section>
  );
}

function MoneySummary({ title, cta }: { title: string; cta: string }) {
  const rows: [string, string][] = [
    ['Overdue', '£688.90'],
    ['Due', '£10,000.00'],
    ['Paid', '£0.00'],
  ];
  return (
    <Card>
      <CardTitle
        action={
          <span className="text-[13px] font-medium" style={{ color: T.primary }}>
            View all
          </span>
        }
      >
        {title}
      </CardTitle>
      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.08em]" style={{ color: T.icon }}>
        Last 30 days
      </p>
      <dl className="space-y-2.5 text-[13px]" style={{ color: T.ink }}>
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between">
            <dt>{k}</dt>
            <dd className={k === 'Overdue' ? 'font-medium' : ''} style={k === 'Overdue' ? { color: T.danger } : undefined}>
              {v}
            </dd>
          </div>
        ))}
        <div className="flex justify-between border-t pt-3 font-semibold" style={{ borderColor: T.border }}>
          <dt>Total</dt>
          <dd className="text-[15px]" style={{ fontFamily: HEAD }}>
            £10,688.90
          </dd>
        </div>
      </dl>
      <div className="mt-4">
        <OutlineButton icon={<Plus size={14} />}>{cta}</OutlineButton>
      </div>
    </Card>
  );
}

function InsightsCard() {
  const Stat = ({ label, tone }: { label: string; tone: string }) => (
    <div className="flex items-end justify-between rounded-2xl border p-3" style={{ borderColor: T.border }}>
      <div>
        <p className="text-[18px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
          £7,100
        </p>
        <p className="text-[12px]" style={{ color: T.muted }}>
          {label}
        </p>
        <span className="mt-2 inline-block rounded border px-1 text-[9px] font-medium" style={{ borderColor: T.border2, color: T.muted }}>
          OCT
        </span>
      </div>
      <div className="flex h-[52px] items-end gap-1.5" aria-hidden="true">
        <span className="w-3 rounded-sm" style={{ height: 50, background: '#D9DCEC' }} />
        <span className="w-3 rounded-sm" style={{ height: 42, background: '#D9DCEC' }} />
        <span className="w-3 rounded-sm" style={{ height: 30, background: tone }} />
      </div>
    </div>
  );
  return (
    <Card>
      <CardTitle
        action={
          <span className="text-[13px] font-medium" style={{ color: T.primary }}>
            View all
          </span>
        }
      >
        Insights
      </CardTitle>
      <div className="space-y-2.5">
        <Stat label="Revenue" tone={T.primary} />
        <Stat label="Net Profit" tone={T.light} />
      </div>
      <div className="mt-3">
        <OutlineButton icon={<FileText size={14} />}>Open Accounting</OutlineButton>
      </div>
    </Card>
  );
}

function QuickActions({ items }: { items: { label: string; icon: ReactNode }[] }) {
  return (
    <div className="mt-6 grid grid-cols-4 px-2">
      {items.map((it) => (
        <div key={it.label} className="flex flex-col items-center gap-2">
          <span className="grid h-14 w-14 place-items-center rounded-full text-white" style={{ background: T.primary }}>
            {it.icon}
          </span>
          <span className="text-[11px] leading-tight" style={{ color: T.ink }}>
            {it.label}
          </span>
        </div>
      ))}
    </div>
  );
}

type TabName = 'Payments' | 'Admin' | 'Finance' | 'Support' | 'More';
const TAB_ICONS: Record<TabName, ReactNode> = {
  Payments: <Wallet size={20} />,
  Admin: <Folder size={20} />,
  Finance: <Sprout size={20} />,
  Support: <MessageSquare size={20} />,
  More: <LayoutGrid size={20} />,
};

function TabBar({ tabs }: { tabs: TabName[] }) {
  return (
    <nav className="absolute inset-x-0 bottom-0 border-t bg-white/95 pb-5 pt-2 backdrop-blur" style={{ borderColor: T.border }}>
      <ul className="flex justify-around">
        {tabs.map((t) => (
          <li
            key={t}
            className="flex w-16 flex-col items-center gap-1 text-[11px]"
            style={{ color: t === 'Admin' ? T.primary : T.muted, fontWeight: t === 'Admin' ? 600 : 400 }}
          >
            {TAB_ICONS[t]}
            {t}
          </li>
        ))}
      </ul>
      <span className="mx-auto mt-2 block h-1 w-32 rounded-full" style={{ background: T.ink }} />
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Screens                                                             */
/* ------------------------------------------------------------------ */

function Screen2023() {
  const locked: { illo: IlloName; text: ReactNode }[] = [
    {
      illo: 'taxes',
      text: (
        <>
          Submit your Self Assessment in <span style={{ color: T.primary }}>364 days</span>
        </>
      ),
    },
    { illo: 'insights', text: 'Track your business’ performance' },
    { illo: 'bookkeeping', text: 'Complete your bookkeeping on the go' },
  ];
  return (
    <>
      <StatusBar />
      <Header business="switcher" />
      <section className="mt-2">
        <SectionTitle more>Accounting</SectionTitle>
        <div className="flex gap-3 overflow-hidden px-4">
          {locked.map((c, i) => (
            <div
              key={i}
              className="relative flex h-[150px] w-[140px] shrink-0 flex-col items-center justify-end gap-2 rounded-[20px] border bg-white p-3 text-center"
              style={{ borderColor: T.border }}
            >
              <Lock size={14} className="absolute right-3 top-3" style={{ color: T.muted }} />
              <Illo name={c.illo} size={64} plate />
              <p className="text-[12px] leading-snug" style={{ color: T.ink }}>
                {c.text}
              </p>
            </div>
          ))}
        </div>
        <div className="mx-4 mt-4 flex h-12 items-center justify-center rounded-full text-[15px] font-semibold text-white" style={{ background: T.primary }}>
          Explore Accounting
        </div>
        <p className="mt-3 text-center text-[14px] font-semibold" style={{ fontFamily: HEAD, color: T.primary }}>
          30 days to activate your free trial
        </p>
      </section>
      <ExploreMore />
      <section className="mt-7 space-y-3">
        <SectionTitle more>Invoices &amp; Bills</SectionTitle>
        <EmptyState title="Invoices" illo="invoices" text="Create your first invoice to start getting paid" cta="Create an invoice" />
        <PromoCard
          title="Invoice Assistant"
          text="Unlock automatic invoice chasing and matching with Invoice Assistant"
          link="Learn more"
          illo="invoices"
        />
        <EmptyState title="Bills" illo="bills" text="Add a bill to keep track of what you owe" cta="Pay a bill" />
      </section>
      <TeamExpenses />
    </>
  );
}

function ScoreDial({ value }: { value: number }) {
  const r = 70;
  const len = Math.PI * r;
  return (
    <svg viewBox="0 0 180 100" className="mx-auto block w-[200px]" aria-hidden="true">
      <defs>
        <linearGradient id="dial" x1="0" x2="1">
          <stop offset="0" stopColor={T.light} />
          <stop offset="1" stopColor={T.primary} />
        </linearGradient>
      </defs>
      <path d={`M20 90 A${r} ${r} 0 0 1 160 90`} fill="none" stroke={T.tint} strokeWidth="12" strokeLinecap="round" />
      <path
        d={`M20 90 A${r} ${r} 0 0 1 160 90`}
        fill="none"
        stroke="url(#dial)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={`${(value / 100) * len} ${len}`}
      />
      <text x="90" y="86" textAnchor="middle" fontSize="40" fontWeight="800" fill={T.ink} fontFamily={HEAD} letterSpacing="-1.5">
        {value}%
      </text>
    </svg>
  );
}

function ScreenEarly2024() {
  return (
    <>
      <StatusBar />
      <Header business="switcher" />
      <section className="mt-2">
        <SectionTitle more>Accounting</SectionTitle>
        <Card>
          <CardTitle action={<CircleHelp size={18} style={{ color: T.muted }} />}>Bookkeeping score</CardTitle>
          <ScoreDial value={40} />
          <div className="mt-1 text-center">
            <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.06em]" style={{ background: T.dangerTint, color: T.danger }}>
              NEEDS WORK
            </span>
            <p className="mt-1.5 text-[11px]" style={{ color: T.muted }}>
              Complete tasks to increase your score
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-[14px] font-medium" style={{ color: T.ink }}>
                19 transactions are missing details
              </p>
              <p className="text-[12px]" style={{ color: T.muted }}>
                Add details to ensure your reports are accurate
              </p>
            </div>
            <ChevronRight size={18} style={{ color: T.ink }} />
          </div>
          <div className="mt-4">
            <OutlineButton>Open Accounting</OutlineButton>
          </div>
        </Card>
      </section>
      <ExploreMore />
      <section className="mt-7 space-y-3">
        <SectionTitle more>Invoices &amp; Bills</SectionTitle>
        <EmptyState title="Invoices" illo="invoices" text="Create your first invoice to start getting paid" cta="Create an invoice" />
        <PromoCard
          title="Invoice Assistant"
          text="Unlock automatic invoice chasing and matching with Invoice Assistant"
          link="Learn more"
          illo="invoices"
        />
        <EmptyState title="Bills" illo="bills" text="Add a bill to keep track of what you owe" cta="Pay a bill" />
      </section>
      <TeamExpenses />
    </>
  );
}

function ScreenLate2024() {
  return (
    <>
      <StatusBar />
      <Header business="switcher" />
      <section className="mt-2">
        <InsightsCard />
      </section>
      <ExploreMore />
      <section className="mt-7 space-y-3">
        <SectionTitle more>Invoices &amp; Bills</SectionTitle>
        <EmptyState title="Invoices" illo="invoices" text="Create your first invoice to start getting paid" cta="Create an invoice" />
        <PromoCard
          title="Invoice Assistant"
          text="Unlock automatic invoice chasing and matching with Invoice Assistant"
          link="Learn more"
          illo="invoices"
        />
        <EmptyState title="Bills" illo="bills" text="Add a bill to keep track of what you owe" cta="Pay a bill" />
      </section>
      <TeamExpenses />
    </>
  );
}

function Screen2025() {
  return (
    <>
      <StatusBar />
      <Header business="switcher" />
      <section className="mt-2">
        <InsightsCard />
      </section>
      <QuickActions
        items={[
          { label: 'Create invoice', icon: <FileText size={20} /> },
          { label: 'Import receipt', icon: <Upload size={20} /> },
          { label: 'Create bill', icon: <Receipt size={20} /> },
          { label: 'All actions', icon: <LayoutGrid size={20} /> },
        ]}
      />
      <section className="mt-6 space-y-3">
        <MoneySummary title="Invoices" cta="Create an invoice" />
        <MoneySummary title="Bills" cta="Create a bill" />
      </section>
      <TeamExpenses />
    </>
  );
}

const PRODUCTS: { label: string; illo: IlloName; tone: string }[] = [
  { label: 'Taxes', illo: 'taxes', tone: '#F1EADB' },
  { label: 'Payroll', illo: 'payroll', tone: '#DCE6F4' },
  { label: 'Insights', illo: 'insights', tone: '#DDEDE4' },
  { label: 'Bookkeeping', illo: 'bookkeeping', tone: '#E7E1F3' },
  { label: 'Invoices & Bills', illo: 'invoices', tone: '#F0E4DC' },
  { label: 'Team cards', illo: 'expenses', tone: '#E2E7F6' },
];

function Screen2026() {
  const tasks = [
    { title: 'Tell us how you do accounting', sub: 'So we know how to help best', bar: T.light },
    { title: 'Send an invoice', sub: 'Create your first invoice', bar: '#D7C9F5' },
    { title: 'Track your upcoming taxes', sub: 'Estimate, save, and submit on time', bar: T.gold },
  ];
  const links = [
    { label: 'Synced bank accounts', icon: <Landmark size={20} /> },
    { label: 'Manage integrations', icon: <ArrowLeftRight size={20} /> },
    { label: 'Invite your accountant', icon: <UserRound size={20} /> },
  ];
  return (
    <>
      <StatusBar ios />
      <Header business="avatar" />
      <section className="border-t pt-4" style={{ borderColor: T.border }}>
        <SectionTitle action="View all">Products</SectionTitle>
        <div className="flex gap-2.5 overflow-hidden px-4">
          {PRODUCTS.map((p) => (
            <div key={p.label} className="w-[96px] shrink-0 overflow-hidden rounded-2xl border bg-white" style={{ borderColor: T.border }}>
              <div className="grid h-[66px] place-items-center" style={{ background: p.tone }}>
                <Illo name={p.illo} size={60} />
              </div>
              <p className="truncate px-1 py-2.5 text-center text-[10px] font-medium uppercase tracking-[0.06em]" style={{ color: T.ink }}>
                {p.label}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-1" aria-hidden="true">
          <span className="h-1 w-3 rounded-full" style={{ background: T.deep }} />
          <span className="h-1 w-10 rounded-full" style={{ background: T.tint }} />
        </div>
      </section>
      <div className="mx-4 mt-5 flex items-center overflow-hidden rounded-[20px] border bg-white" style={{ borderColor: T.border }}>
        <div className="grid h-[72px] w-[72px] shrink-0 place-items-center" style={{ background: T.tint }}>
          <Illo name="accounting" size={60} />
        </div>
        <div className="flex-1 px-3">
          <p className="text-[14px] font-medium" style={{ color: T.ink }}>
            Get the best experience
          </p>
          <p className="text-[13px] font-medium" style={{ color: T.primary }}>
            Activate accounting free trial ›
          </p>
        </div>
        <X size={16} className="mr-3" style={{ color: T.muted }} />
      </div>
      <Card className="mt-5">
        <CardTitle
          action={
            <span className="text-[15px] font-semibold" style={{ fontFamily: HEAD, color: T.primary }}>
              View all
            </span>
          }
        >
          Your tasks
        </CardTitle>
        <ul className="space-y-1">
          {tasks.map((t) => (
            <li key={t.title} className="flex items-center gap-3 py-2">
              <span className="h-11 w-1 rounded-full" style={{ background: t.bar }} />
              <div className="flex-1">
                <p className="text-[14px] font-medium" style={{ color: T.ink }}>
                  {t.title}
                </p>
                <p className="text-[12px]" style={{ color: T.muted }}>
                  {t.sub}
                </p>
              </div>
              <ChevronRight size={18} style={{ color: T.icon }} />
            </li>
          ))}
        </ul>
      </Card>
      <QuickActions
        items={[
          { label: 'Create invoice', icon: <FileText size={20} /> },
          { label: 'Upload bill', icon: <Receipt size={20} /> },
          { label: 'Snap receipt', icon: <Camera size={20} /> },
          { label: 'More actions', icon: <LayoutGrid size={20} /> },
        ]}
      />
      <Card className="mt-6" pad={false}>
        <ul>
          {links.map((l, i) => (
            <li
              key={l.label}
              className={`mx-4 flex items-center gap-3 py-4 ${i ? 'border-t' : ''}`}
              style={{ borderColor: T.border, color: T.ink }}
            >
              <span style={{ color: T.primary }}>{l.icon}</span>
              <span className="flex-1 text-[14px] font-medium">{l.label}</span>
              <ChevronRight size={18} style={{ color: T.icon }} />
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

const TABS_BY_STAGE: TabName[][] = [
  ['Payments', 'Admin', 'Support', 'More'],
  ['Payments', 'Admin', 'Finance', 'Support'],
  ['Payments', 'Admin', 'Finance', 'Support'],
  ['Payments', 'Admin', 'Finance', 'Support'],
  ['Payments', 'Admin', 'Finance', 'Support'],
];

/* ------------------------------------------------------------------ */
/* Device + controls                                                   */
/* ------------------------------------------------------------------ */

/** Phone frame. Content scrolls inside; the tab bar stays pinned. */
function Phone({ stage }: { stage: number }) {
  const reduce = useReducedMotion();
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [stage]);
  const S = STAGES[stage];
  return (
    <div
      className="relative h-[812px] w-[375px] overflow-hidden rounded-[52px] border-[10px] shadow-[0_30px_80px_-24px_rgba(19,15,37,0.35)]"
      style={{ borderColor: '#14162B', background: T.canvas, fontFamily: BODY }}
    >
      <div
        ref={scroller}
        className="h-full overflow-y-auto pb-28 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        tabIndex={0}
        aria-label={`Admin screen, ${S.year}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stage}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {S.screen()}
          </motion.div>
        </AnimatePresence>
      </div>
      <TabBar tabs={TABS_BY_STAGE[stage]} />
    </div>
  );
}

/** Scales the phone down to fit short viewports without reflowing the content. */
function useFitScale(height = 812, reserve = 48) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => setScale(Math.min(1, (window.innerHeight - reserve) / height, (window.innerWidth - 32) / 375));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [height, reserve]);
  return scale;
}

export function AdminEvolution({ initialStage = 0 }: { initialStage?: number }) {
  useFonts();
  const [stage, setStage] = useState(initialStage);
  const scale = useFitScale();
  const go = useCallback((n: number) => setStage(Math.max(0, Math.min(STAGES.length - 1, n))), []);

  const step = useCallback(
    (d: number) => setStage((s) => Math.max(0, Math.min(STAGES.length - 1, s + d))),
    [],
  );
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step]);

  const S = STAGES[stage];
  const last = stage === STAGES.length - 1;
  const pct = (stage / (STAGES.length - 1)) * 100;
  return (
    <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-center md:gap-20" style={{ fontFamily: SITE.body }}>
      <div style={{ width: 375 * scale, height: 812 * scale }}>
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <Phone stage={stage} />
        </div>
      </div>

      <div className="w-full max-w-[420px] px-4 md:px-0">
        <p className="text-sm sm:text-base" style={{ color: SITE.text }}>
          Tide · Admin, 2023 → 2026
        </p>
        <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl" style={{ fontFamily: SITE.head, color: SITE.ink }}>
          How Admin grew up
        </h2>

        {/* Timeline */}
        <div className="relative mt-8" role="tablist" aria-label="Admin iterations by year">
          <div className="absolute left-[11px] right-[11px] top-[10px] h-[2px] rounded-full" style={{ background: SITE.line }} />
          <motion.div
            className="absolute left-[11px] top-[10px] h-[2px] rounded-full"
            style={{ background: SITE.ink }}
            animate={{ width: `calc(${pct}% - ${(pct / 100) * 22}px)` }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
          <ol className="relative flex justify-between">
            {STAGES.map((s, i) => {
              const active = i === stage;
              const done = i < stage;
              return (
                <li key={s.year} className="flex w-0 flex-col items-center">
                  <button
                    role="tab"
                    aria-selected={active}
                    onClick={() => go(i)}
                    className="flex flex-col items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                  >
                    <span
                      className="block h-[22px] w-[22px] rounded-full border-2 border-black transition-all"
                      style={{
                        background: active ? SITE.orange : done ? SITE.ink : '#fff',
                        boxShadow: active ? '2px 2px 0 0 #000' : 'none',
                      }}
                    />
                    <span
                      className="whitespace-nowrap text-xs sm:text-sm transition-colors"
                      style={{ color: active ? SITE.ink : SITE.text, fontWeight: active ? 700 : 400 }}
                    >
                      {s.year}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Caption: open text with the real figures for that step */}
        <div className="mt-8 min-h-[230px]" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm" style={{ color: SITE.text }}>
                {S.year}
              </p>
              <h3 className="mt-1 text-xl font-bold leading-snug sm:text-2xl" style={{ fontFamily: SITE.head, color: SITE.ink }}>
                {S.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed" style={{ color: SITE.text }}>
                {S.summary}
              </p>
              <dl className="mt-5 flex gap-10">
                {S.signUp && (
                  <div className="flex flex-col-reverse">
                    <dt className="mt-1 text-sm" style={{ color: SITE.text }}>
                      accounting sign-up rate
                    </dt>
                    <dd className="text-2xl font-bold sm:text-3xl" style={{ fontFamily: SITE.head, color: SITE.ink }}>
                      {S.signUp}
                    </dd>
                  </div>
                )}
                <div className="flex flex-col-reverse">
                  <dt className="mt-1 text-sm" style={{ color: SITE.text }}>
                    Accounting ARR
                  </dt>
                  <dd className="text-2xl font-bold sm:text-3xl" style={{ fontFamily: SITE.head, color: SITE.ink }}>
                    {S.arr}
                  </dd>
                </div>
              </dl>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prev / next */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => go(stage - 1)}
            disabled={stage === 0}
            className="grid h-11 w-11 place-items-center rounded-full border-[2px] sm:border-[3px] border-black bg-white text-[#130F25] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:pointer-events-none disabled:opacity-40"
            aria-label="Previous year"
          >
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => go(last ? 0 : stage + 1)} className={buttonStyles.primary} style={buttonFontFamily.primary}>
            {last ? 'Start again' : 'Next iteration'}
            {last ? <RotateCcw size={16} /> : <ChevronRight size={18} />}
          </button>
          <span className="ml-auto text-sm" style={{ color: SITE.text }}>
            {stage + 1} / {STAGES.length}
          </span>
        </div>
        <p className="mt-4 hidden text-sm md:block" style={{ color: SITE.text }}>
          Use ← → to step through the years.
        </p>
      </div>
    </div>
  );
}

export default AdminEvolution;

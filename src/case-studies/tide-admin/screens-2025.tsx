/**
 * Q2 2025: Admin IA redesign.
 * Quick actions, live totals, full Tide Accounting tabs, and insight drill-downs
 * with cash/accrual and VAT toggles. Subscribing flips Admin to the richer home.
 */
import { useState, type ReactNode } from 'react';
import { ChevronRight, Download, FileText, LayoutGrid, Lock, Plus, Receipt, Settings, Upload, Users } from 'lucide-react';
import { BIZ, DRILL_BREAKDOWN, DRILL_ROWS, HOME_2025_SUBSCRIBED, INSIGHTS_2025, WHAT_IS, type Basis, type MetricKey } from './data';
import { Illo } from './illustrations';
import { NavBar, StatusBar, Tap, type Nav, type StageProto } from './proto';
import { AdminHeader, TeamExpenses } from './screens-2023';
import { InsightsCardHome } from './screens-2024';
import {
  AccountingHeader,
  AdminPlansScreen,
  CategoryScreen,
  ConfirmDetailsScreen,
  ExpensesBreakdownScreen,
  InsufficientFundsScreen,
  OverviewFreeScreen,
  PaywallScreen,
  ProcessingScreen,
  SelfAssessmentScreen,
  TransactionsScreen,
  TxActionsSheet,
  VatRateScreen,
  categoryDone,
  vatDone,
} from './screens-shared';
import { Card, CardTitle, DivergingBars, GroupedBars, HEAD, KeyValue, Legend, LineChart, ListRow, OutlineButton, Pill, SectionTitle, SegmentTabs, T } from './ui';

/* ------------------------------------------------------------------ */
/* Blocks                                                              */
/* ------------------------------------------------------------------ */

export function QuickActions({ items }: { items: { label: string; icon: ReactNode; onTap?: () => void }[] }) {
  return (
    <div className="mt-6 grid grid-cols-4 px-2">
      {items.map((it) => (
        <Tap key={it.label} onTap={it.onTap} className="flex flex-col items-center gap-2 py-1">
          <span className="grid h-14 w-14 place-items-center rounded-full text-white" style={{ background: T.primary }}>
            {it.icon}
          </span>
          <span className="text-center text-[11px] leading-tight" style={{ color: T.ink }}>
            {it.label}
          </span>
        </Tap>
      ))}
    </div>
  );
}

export function MoneySummary({ nav, title, cta, onAll }: { nav: Nav; title: string; cta: string; onAll?: () => void }) {
  return (
    <Card>
      <CardTitle action="View all" onAction={onAll ?? (() => nav.toast(`${title} list is not in this prototype`))}>
        {title}
      </CardTitle>
      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.08em]" style={{ color: T.icon }}>
        Last 30 days
      </p>
      <KeyValue
        rows={[
          ['Overdue', '£688.90', 'danger'],
          ['Due', '£10,000.00'],
          ['Paid', '£0.00'],
        ]}
        total={['Total', '£10,688.90']}
      />
      <div className="mt-4">
        <OutlineButton icon={<Plus size={14} />} onTap={() => nav.toast(`${cta} editor is not in this prototype`)}>
          {cta}
        </OutlineButton>
      </div>
    </Card>
  );
}

const TONE = { teal: '#2BB5A0', indigo: T.primary, lilac: '#B18CFF', gold: T.gold };

/** Admin home once the user has subscribed: four live metrics, task nudges, overdue invoices. */
function SubscribedInsights({ nav }: { nav: Nav }) {
  const h = HOME_2025_SUBSCRIBED;
  return (
    <>
      <Card>
        <CardTitle action="View all" onAction={() => nav.go('insights')}>
          Insights
        </CardTitle>
        <div className="grid grid-cols-2 gap-2.5">
          {h.metrics.map(([label, value, tone]) => (
            <Tap key={label} onTap={() => nav.go(label === 'Cash Flow' ? 'insights' : label === 'Revenue' ? 'revenue' : label === 'Expenses' ? 'expenses' : 'netProfit')} className="flex-col items-start rounded-2xl border p-3 text-left" style={{ borderColor: T.border }}>
              <span className="flex w-full items-end justify-between">
                <span>
                  <span className="block text-[16px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
                    {value}
                  </span>
                  <span className="block text-[11px]" style={{ color: T.muted }}>
                    {label}
                  </span>
                </span>
                <span className="flex h-[40px] items-end gap-1" aria-hidden="true">
                  <span className="w-2 rounded-sm" style={{ height: 36, background: '#D9DCEC' }} />
                  <span className="w-2 rounded-sm" style={{ height: 28, background: '#D9DCEC' }} />
                  <span className="w-2 rounded-sm" style={{ height: 22, background: TONE[tone] }} />
                </span>
              </span>
              <span className="mt-2 inline-block rounded border px-1 text-[9px] font-medium" style={{ borderColor: T.border2, color: T.muted }}>
                OCT
              </span>
            </Tap>
          ))}
        </div>
        <div className="mt-3">
          <OutlineButton icon={<FileText size={14} />} onTap={() => nav.go('overview')}>
            Open Accounting
          </OutlineButton>
        </div>
      </Card>
      <div className="mt-3 flex gap-3 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {h.tasks.map((t) => (
          <Tap key={t.title} onTap={() => (t.go ? nav.go(t.go) : nav.toast('Tide Credit is outside this prototype'))} className="w-[240px] shrink-0 flex-col items-start rounded-[20px] border bg-white p-4 text-left" style={{ borderColor: T.border }}>
            <span className="block text-[14px] font-semibold tracking-[-0.01em]" style={{ fontFamily: HEAD, color: T.ink }}>
              {t.title}
            </span>
            <span className="mt-1 block text-[12px] leading-snug" style={{ color: T.muted }}>
              {t.sub}
            </span>
          </Tap>
        ))}
      </div>
    </>
  );
}

function InvoicesLive({ nav }: { nav: Nav }) {
  const o = HOME_2025_SUBSCRIBED.overdue;
  return (
    <Card pad={false}>
      <div className="flex items-center justify-between px-4 pt-4">
        <h3 className="text-[17px] font-semibold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
          Invoices
        </h3>
        <Tap onTap={() => nav.go('invoices')} className="text-[13px] font-medium" style={{ color: T.primary }}>
          View all
        </Tap>
      </div>
      <div className="mt-2 flex items-center gap-3 px-4 pb-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: T.tint, color: T.primary }}>
          <FileText size={16} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[14px] font-medium" style={{ color: T.ink }}>
            {o.customer}
          </span>
          <span className="block text-[12px]" style={{ color: T.muted }}>
            {o.ref} · <span style={{ color: T.danger }}>{o.status}</span>
          </span>
        </span>
        <span className="text-right">
          <span className="block text-[14px] font-semibold" style={{ fontFamily: HEAD, color: T.green }}>
            {o.amount}
          </span>
          <Tap onTap={() => nav.toast(`Reminder sent to ${o.customer}`)} className="mt-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white" style={{ background: T.primary }}>
            Chase
          </Tap>
        </span>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Screens                                                             */
/* ------------------------------------------------------------------ */

function Home(nav: Nav) {
  const subscribed = !!nav.flags.trial;
  return (
    <>
      <StatusBar />
      <AdminHeader />
      <section className="mt-2">{subscribed ? <SubscribedInsights nav={nav} /> : <InsightsCardHome nav={nav} />}</section>
      <QuickActions
        items={[
          { label: 'Create invoice', icon: <FileText size={20} />, onTap: () => nav.toast('Invoice editor is not in this prototype') },
          { label: 'Import receipt', icon: <Upload size={20} />, onTap: () => nav.toast('Receipt import is not in this prototype') },
          { label: 'Create bill', icon: <Receipt size={20} />, onTap: () => nav.toast('Bill editor is not in this prototype') },
          { label: 'All actions', icon: <LayoutGrid size={20} />, onTap: () => nav.sheet('quick') },
        ]}
      />
      <section className="mt-6 space-y-3">
        {subscribed ? <InvoicesLive nav={nav} /> : <MoneySummary nav={nav} title="Invoices" cta="Create an invoice" onAll={() => nav.go('invoices')} />}
        <MoneySummary nav={nav} title="Bills" cta="Create a bill" />
      </section>
      <TeamExpenses nav={nav} />
    </>
  );
}

const TABS = ['Overview', 'Insights', 'Bookkeeping tasks', 'Self Assessment'];
const ROUTES = { Overview: 'overview', Insights: 'insights', 'Bookkeeping tasks': 'transactions', 'Self Assessment': 'selfAssessment' };

/** Toggle row shared by Insights and the drill-downs. */
function BasisToggle({ basis, vat, onBasis, onVat }: { basis: Basis; vat: boolean; onBasis: (b: Basis) => void; onVat: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4">
      <div className="flex flex-1 rounded-full border p-0.5" style={{ borderColor: T.border2, background: '#fff' }}>
        {(['Cash', 'Accrual'] as Basis[]).map((b) => (
          <Tap key={b} onTap={() => onBasis(b)} block className="flex-1 rounded-full py-1 text-center text-[12px] font-medium" style={{ background: basis === b ? T.tint : 'transparent', color: basis === b ? T.deep : T.muted }}>
            {b}
          </Tap>
        ))}
      </div>
      <Tap onTap={onVat} className="gap-2 text-[12px] font-medium" style={{ color: T.ink }}>
        incl. VAT
        <span className="relative h-5 w-9 rounded-full transition-colors" style={{ background: vat ? T.primary : T.border2 }}>
          <span className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all" style={{ left: vat ? 18 : 2 }} />
        </span>
      </Tap>
    </div>
  );
}

function useBasis(nav: Nav) {
  const basis: Basis = nav.flags.accrual ? 'Accrual' : 'Cash';
  const vat = !!nav.flags.vat;
  return { basis, vat, setBasis: (b: Basis) => nav.setFlag('accrual', b === 'Accrual'), toggleVat: () => nav.setFlag('vat', !vat) };
}

function Metric({ nav, k, basis, vat, chart }: { nav: Nav; k: MetricKey; basis: Basis; vat: boolean; chart: ReactNode }) {
  const m = INSIGHTS_2025[k];
  const value = m.values[`${basis}-${vat ? 'vat' : 'net'}`];
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px]" style={{ color: T.muted }}>
            {m.title}
          </p>
          <p className="text-[20px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: value.startsWith('-') ? T.danger : T.ink }}>
            {value}{' '}
            <span className="text-[12px] font-normal" style={{ color: T.muted }}>
              {m.period}
            </span>
          </p>
        </div>
        <Tap onTap={() => nav.go(k)} className="text-[13px] font-medium" style={{ color: T.primary }}>
          View details
        </Tap>
      </div>
      <div className="mt-3">{chart}</div>
      <Tap onTap={() => nav.sheet(`what:${k}`)} className="mt-2 text-[12px] font-medium" style={{ color: T.primary }}>
        {WHAT_IS[k].title}
      </Tap>
    </Card>
  );
}

function Insights(nav: Nav) {
  const { basis, vat, setBasis, toggleVat } = useBasis(nav);
  return (
    <>
      <AccountingHeader nav={nav} active="Insights" routes={ROUTES} tabs={TABS} />
      <div className="mt-4">
        <BasisToggle basis={basis} vat={vat} onBasis={setBasis} onVat={toggleVat} />
      </div>
      <div className="mt-4 space-y-3">
        <Card>
          <CardTitle action="View details" onAction={() => nav.go('netProfit')}>
            Profitability insights
          </CardTitle>
          <GroupedBars months={['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']} />
          <Legend
            items={[
              ['Net profit', T.primary],
              ['Revenue', T.light],
              ['Expenses', T.gold],
            ]}
          />
        </Card>
        <Metric nav={nav} k="netProfit" basis={basis} vat={vat} chart={<DivergingBars />} />
        <Metric nav={nav} k="revenue" basis={basis} vat={vat} chart={<LineChart tone={T.green} trend="up" />} />
        <Metric nav={nav} k="expenses" basis={basis} vat={vat} chart={<LineChart tone={T.danger} trend="down" />} />
      </div>
    </>
  );
}

/** Drill-down for one metric: chart with a this-month / month-on-month switch, breakdown, transactions, definition. */
function DrillDown({ nav, k }: { nav: Nav; k: MetricKey }) {
  const { basis, vat, setBasis, toggleVat } = useBasis(nav);
  const [view, setView] = useState('This month');
  const m = INSIGHTS_2025[k];
  const value = m.values[`${basis}-${vat ? 'vat' : 'net'}`];
  const negative = value.startsWith('-');
  const total: [string, string] = [m.title, value.includes('.') ? value : `${value}.00`];
  return (
    <>
      <StatusBar />
      <NavBar
        title={m.title}
        big
        right={
          <span className="grid h-9 w-9 place-items-center rounded-full border-4 bg-white text-[12px] font-semibold" style={{ borderColor: T.tint, color: T.deep }}>
            {BIZ.owner}
          </span>
        }
      />
      <div className="space-y-3">
        <div className="mx-4 overflow-hidden rounded-[20px] border bg-white" style={{ borderColor: T.border }}>
          <ListRow first icon={<Download size={18} />} title="Download Profit & Loss report" sub="Get an overview of your revenue and expenses" onTap={() => nav.toast('Report emailed to you')} />
        </div>
        <BasisToggle basis={basis} vat={vat} onBasis={setBasis} onVat={toggleVat} />
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13px]" style={{ color: T.muted }}>
                {view === 'This month' ? m.title : 'Month-on-Month'}
              </p>
              <p className="text-[22px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: negative ? T.danger : T.ink }}>
                {value}{' '}
                <span className="text-[12px] font-normal" style={{ color: T.muted }}>
                  {m.period}
                </span>
              </p>
              <p className="text-[11px]" style={{ color: m.delta.startsWith('-') ? T.danger : T.green }}>
                {m.delta}
              </p>
            </div>
            <Pill tone={basis === 'Cash' ? 'tint' : 'gold'}>{basis.toUpperCase()}</Pill>
          </div>
          <div className="mt-3">
            <SegmentTabs items={['This month', 'Month-on-Month']} active={view} onChange={setView} />
          </div>
          <div className="mt-3">
            {view === 'This month' ? (
              k === 'netProfit' ? (
                <DivergingBars height={130} />
              ) : (
                <GroupedBars months={['1', '6', '11', '16', '21', '26']} />
              )
            ) : (
              <>
                <GroupedBars months={['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']} />
                <Legend
                  items={[
                    ['This year', T.primary],
                    ['Last year', T.light],
                    ['Budget', T.gold],
                  ]}
                />
              </>
            )}
          </div>
        </Card>
        <Card>
          <p className="mb-3 text-[14px] font-medium" style={{ color: T.ink }}>
            Breakdown · {m.period.split(' ')[0]}
          </p>
          <KeyValue rows={DRILL_BREAKDOWN[k]} total={total} />
        </Card>
        <Card pad={false}>
          <div className="flex items-center justify-between px-4 pt-4">
            <p className="text-[14px] font-medium" style={{ color: T.ink }}>
              {k === 'netProfit' ? 'Revenue & Expenses' : m.title}
            </p>
            <Tap onTap={() => nav.go('transactions')} className="text-[13px] font-medium" style={{ color: T.primary }}>
              View All
            </Tap>
          </div>
          <div className="mt-2">
            {DRILL_ROWS[k].map((r, i) => (
              <ListRow key={r.name + i} first={i === 0} icon={<Receipt size={16} />} title={r.name} sub={r.cat} right={<span className="text-[14px] font-semibold" style={{ fontFamily: HEAD, color: r.amount.startsWith('+') ? T.green : T.ink }}>{r.amount}</span>} onTap={() => nav.toast('Transaction detail is not in this prototype')} />
            ))}
          </div>
        </Card>
        <Card onTap={() => nav.sheet(`what:${k}`)}>
          <span className="flex items-center justify-between">
            <span className="text-[14px] font-medium" style={{ color: T.ink }}>
              {WHAT_IS[k].title}
            </span>
            <ChevronRight size={18} style={{ color: T.icon }} />
          </span>
          <p className="mt-2 text-[13px] leading-relaxed" style={{ color: T.muted }}>
            {WHAT_IS[k].body[0]}
          </p>
        </Card>
      </div>
    </>
  );
}

/** Invoices list (View all from Admin). */
function Invoices(nav: Nav) {
  const rows = [
    { c: 'Bob Baxter', ref: 'Inv. 1123', s: 'Overdue by 3 days', a: '+£500.00', tone: 'danger' as const },
    { c: 'Influitive', ref: 'Inv. 1122', s: 'Due in 12 days', a: '+£2,400.00', tone: 'tint' as const },
    { c: 'Mori', ref: 'Inv. 1120', s: 'Paid 30 Apr', a: '+£500.00', tone: 'green' as const },
  ];
  return (
    <>
      <StatusBar />
      <NavBar title="Invoices" big />
      <div className="mt-1">
        <SegmentTabs items={['Outstanding', 'Paid']} active="Outstanding" onChange={(v) => v === 'Paid' && nav.toast('Paid invoices are not in this prototype')} />
      </div>
      <Card className="mt-4" pad={false}>
        {rows.map((r, i) => (
          <ListRow key={r.ref} first={i === 0} icon={<FileText size={16} />} title={r.c} sub={`${r.ref} · ${r.s}`} right={<span className="text-right"><span className="block text-[14px] font-semibold" style={{ fontFamily: HEAD, color: T.green }}>{r.a}</span><Pill tone={r.tone}>{r.s.split(' ')[0].toUpperCase()}</Pill></span>} onTap={() => nav.toast(r.tone === 'danger' ? `Reminder sent to ${r.c}` : 'Invoice detail is not in this prototype')} />
        ))}
      </Card>
      <div className="mx-4 mt-5">
        <OutlineButton icon={<Plus size={14} />} onTap={() => nav.toast('Invoice editor is not in this prototype')}>
          Create an invoice
        </OutlineButton>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Sheets                                                              */
/* ------------------------------------------------------------------ */

function QuickSheet(nav: Nav) {
  const group = (title: string, items: { l: string; i: ReactNode; lock?: boolean; go?: string }[]) => (
    <div className="mb-5">
      <p className="mb-3 px-4 text-[16px] font-semibold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
        {title}
      </p>
      <div className="grid grid-cols-4 gap-y-4 px-2">
        {items.map((it) => (
          <Tap key={it.l} onTap={() => (it.go ? nav.go(it.go) : nav.toast(it.lock && !nav.flags.trial ? `${it.l} needs a subscription` : `${it.l} is not in this prototype`))} className="flex flex-col items-center gap-2">
            <span className="relative grid h-12 w-12 place-items-center rounded-full text-white" style={{ background: T.primary }}>
              {it.i}
              {it.lock && !nav.flags.trial && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-white" style={{ color: T.primary }}>
                  <Lock size={9} />
                </span>
              )}
            </span>
            <span className="text-center text-[10px] leading-tight" style={{ color: T.ink }}>
              {it.l}
            </span>
          </Tap>
        ))}
      </div>
    </div>
  );
  return (
    <>
      {group('Accounting', [
        { l: 'Add manual transaction', i: <Plus size={18} />, go: 'transactions' },
        { l: 'Profit & Loss report', i: <FileText size={18} />, lock: true },
        { l: 'Balance sheet statement', i: <FileText size={18} />, lock: true },
        { l: 'Receipt importer', i: <Upload size={18} /> },
      ])}
      {group('Invoicing & Bills', [
        { l: 'Add a new customer', i: <Plus size={18} /> },
        { l: 'Manage customers', i: <Users size={18} /> },
        { l: 'Invoice template', i: <FileText size={18} /> },
        { l: 'Payment options', i: <Download size={18} /> },
      ])}
      {group('Settings', [
        { l: 'Accounting Settings', i: <Settings size={18} /> },
        { l: 'Log in on your computer', i: <LayoutGrid size={18} /> },
        { l: 'Accounting integrations', i: <ChevronRight size={18} /> },
      ])}
    </>
  );
}

const whatSheet = (k: MetricKey) => (nav: Nav) => (
  <div className="px-4">
    <h3 className="text-[20px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
      {WHAT_IS[k].title}
    </h3>
    {WHAT_IS[k].body.map((p) => (
      <p key={p} className="mt-3 text-[13px] leading-relaxed" style={{ color: T.ink }}>
        {p}
      </p>
    ))}
    <div className="mt-5 flex items-center gap-3 rounded-2xl p-3" style={{ background: T.canvas }}>
      <Illo name="bookkeeping" size={40} />
      <span className="text-[12px]" style={{ color: T.muted }}>
        Switch between cash and accrual at the top of Insights. VAT can be included or excluded.
      </span>
    </div>
    <Tap onTap={() => nav.sheet(null)} block className="mt-5 w-full py-2 text-center text-[14px] font-semibold" style={{ color: T.primary }}>
      Close
    </Tap>
  </div>
);

/* ------------------------------------------------------------------ */

export const PROTO_2025: StageProto = {
  tabs: ['Payments', 'Admin', 'Finance', 'Support'],
  screens: {
    home: Home,
    insights: Insights,
    netProfit: (nav) => <DrillDown nav={nav} k="netProfit" />,
    revenue: (nav) => <DrillDown nav={nav} k="revenue" />,
    expenses: (nav) => <DrillDown nav={nav} k="expenses" />,
    invoices: Invoices,
    overview: (nav) => <OverviewFreeScreen nav={nav} routes={ROUTES} tabs={TABS} />,
    selfAssessment: (nav) => <SelfAssessmentScreen nav={nav} routes={ROUTES} tabs={TABS} />,
    transactions: (nav) => <TransactionsScreen nav={nav} />,
    txSelect: (nav) => <TransactionsScreen nav={nav} mode="category" />,
    txVatSelect: (nav) => <TransactionsScreen nav={nav} mode="vat" />,
    category: (nav) => <CategoryScreen nav={nav} onSaved={() => categoryDone(nav)} />,
    vatRate: (nav) => <VatRateScreen nav={nav} onSaved={() => vatDone(nav)} />,
    expensesBreakdown: (nav) => <ExpensesBreakdownScreen nav={nav} />,
    paywall: (nav) => <PaywallScreen nav={nav} />,
    adminPlans: (nav) => <AdminPlansScreen nav={nav} />,
    insufficientFunds: (nav) => <InsufficientFundsScreen nav={nav} />,
    processing: (nav) => <ProcessingScreen nav={nav} backTo="overview" />,
    confirmDetails: (nav) => <ConfirmDetailsScreen nav={nav} />,
  },
  sheets: {
    quick: QuickSheet,
    txActions: (nav) => <TxActionsSheet nav={nav} />,
    'what:netProfit': whatSheet('netProfit'),
    'what:revenue': whatSheet('revenue'),
    'what:expenses': whatSheet('expenses'),
  },
};

export { SectionTitle };

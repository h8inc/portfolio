/** Q2 2025: Admin IA redesign. Quick actions, live totals, and insight drill-downs. */
import { ChevronRight, Download, FileText, LayoutGrid, Lock, Plus, Receipt, Settings, Upload, Users } from 'lucide-react';
import { NavBar, StatusBar, Tap, type Nav, type StageProto } from './proto';
import { AdminHeader, TeamExpenses } from './screens-2023';
import { InsightsCardHome } from './screens-2024';
import { AccountingHeader } from './screens-shared';
import { Card, CardTitle, DivergingBars, GroupedBars, HEAD, KeyValue, Legend, LineChart, ListRow, OutlineButton, T } from './ui';

export function QuickActions({ items }: { items: { label: string; icon: React.ReactNode; onTap?: () => void }[] }) {
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

export function MoneySummary({ nav, title, cta }: { nav: Nav; title: string; cta: string }) {
  return (
    <Card>
      <CardTitle action="View all" onAction={() => nav.toast(`${title} list is not in this prototype`)}>
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

function Home(nav: Nav) {
  return (
    <>
      <StatusBar />
      <AdminHeader />
      <section className="mt-2">
        <InsightsCardHome nav={nav} />
      </section>
      <QuickActions
        items={[
          { label: 'Create invoice', icon: <FileText size={20} />, onTap: () => nav.toast('Invoice editor is not in this prototype') },
          { label: 'Import receipt', icon: <Upload size={20} />, onTap: () => nav.toast('Receipt import is not in this prototype') },
          { label: 'Create bill', icon: <Receipt size={20} />, onTap: () => nav.toast('Bill editor is not in this prototype') },
          { label: 'All actions', icon: <LayoutGrid size={20} />, onTap: () => nav.sheet('quick') },
        ]}
      />
      <section className="mt-6 space-y-3">
        <MoneySummary nav={nav} title="Invoices" cta="Create an invoice" />
        <MoneySummary nav={nav} title="Bills" cta="Create a bill" />
      </section>
      <TeamExpenses nav={nav} />
    </>
  );
}

const TABS = ['Overview', 'Insights', 'Bookkeeping tasks', 'Self Assessment'];
const ROUTES = { Insights: 'insights' };

function Metric({ nav, title, value, period, chart, onDetails }: { nav: Nav; title: string; value: string; period: string; chart: React.ReactNode; onDetails?: () => void }) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px]" style={{ color: T.muted }}>
            {title}
          </p>
          <p className="text-[20px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: value.startsWith('-') ? T.danger : T.ink }}>
            {value} <span className="text-[12px] font-normal" style={{ color: T.muted }}>{period}</span>
          </p>
        </div>
        <Tap onTap={onDetails ?? (() => nav.toast('Drill-down is not in this prototype'))} className="text-[13px] font-medium" style={{ color: T.primary }}>
          View details
        </Tap>
      </div>
      <div className="mt-3">{chart}</div>
    </Card>
  );
}

function Insights(nav: Nav) {
  return (
    <>
      <AccountingHeader nav={nav} active="Insights" routes={ROUTES} tabs={TABS} />
      <div className="mt-4 space-y-3">
        <Card>
          <CardTitle action="View details" onAction={() => nav.toast('Profitability detail is not in this prototype')}>
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
        <Metric nav={nav} title="Net Profit" value="-£4,400" period="November 2024" chart={<DivergingBars />} onDetails={() => nav.go('netProfit')} />
        <Metric nav={nav} title="Revenue" value="£9,400" period="October 2024" chart={<LineChart tone={T.green} trend="up" />} />
        <Metric nav={nav} title="Expenses" value="£9,400" period="November 2024" chart={<LineChart tone={T.danger} trend="down" />} />
      </div>
    </>
  );
}

function NetProfit(nav: Nav) {
  return (
    <>
      <StatusBar />
      <NavBar
        title="Net profit"
        big
        right={
          <span className="grid h-9 w-9 place-items-center rounded-full border-4 bg-white text-[12px] font-semibold" style={{ borderColor: T.tint, color: T.deep }}>
            JB
          </span>
        }
      />
      <div className="space-y-3">
        <div className="mx-4 overflow-hidden rounded-[20px] border bg-white" style={{ borderColor: T.border }}>
          <ListRow first icon={<Download size={18} />} title="Download Profit & Loss report" sub="Get an overview of your revenue and expenses" onTap={() => nav.toast('Report emailed to you')} />
        </div>
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13px]" style={{ color: T.muted }}>
                Net Profit
              </p>
              <p className="text-[22px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.danger }}>
                -£4,400 <span className="text-[12px] font-normal" style={{ color: T.muted }}>November 2024</span>
              </p>
            </div>
            <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: T.tint, color: T.primary }}>
              <LineIcon />
            </span>
          </div>
          <div className="mt-3">
            <DivergingBars height={130} />
          </div>
        </Card>
        <Card>
          <p className="mb-3 text-[14px] font-medium" style={{ color: T.ink }}>
            Breakdown · November
          </p>
          <KeyValue
            rows={[
              ['Revenue', '£3,842.00'],
              ['Expenses', '£8,242.00'],
            ]}
            total={['Net profit', '-£4,400.00']}
          />
        </Card>
        <Card pad={false}>
          <div className="flex items-center justify-between px-4 pt-4">
            <p className="text-[14px] font-medium" style={{ color: T.ink }}>
              Revenue &amp; Expenses
            </p>
            <Tap onTap={() => nav.toast('Transaction list is not in this prototype')} className="text-[13px] font-medium" style={{ color: T.primary }}>
              View All
            </Tap>
          </div>
          <div className="mt-2">
            {[
              ['Facebook for Business', 'Marketing', '£50.00'],
              ['AMZ LTD', 'Stock', '£1,000.40'],
              ['Amazon', 'Office supplies', '£124.40'],
            ].map(([n, c, a], i) => (
              <ListRow key={n} first={i === 0} icon={<Receipt size={16} />} title={n} sub={c} right={<span className="text-[14px] font-semibold" style={{ fontFamily: HEAD, color: T.ink }}>{a}</span>} onTap={() => nav.toast('Transaction detail is not in this prototype')} />
            ))}
          </div>
        </Card>
        <Card>
          <p className="text-[14px] font-medium" style={{ color: T.ink }}>
            What is Net Profit?
          </p>
          <p className="mt-2 text-[13px] leading-relaxed" style={{ color: T.muted }}>
            Net profit is what’s left after all expenses are taken from revenue in a period. A negative month isn’t a crisis, but a run of them is a signal to act.
          </p>
        </Card>
      </div>
    </>
  );
}

const LineIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M2 11 L6 7 L9 9 L14 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function QuickSheet(nav: Nav) {
  const group = (title: string, items: { l: string; i: React.ReactNode; lock?: boolean }[]) => (
    <div className="mb-5">
      <p className="mb-3 px-4 text-[16px] font-semibold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
        {title}
      </p>
      <div className="grid grid-cols-4 gap-y-4 px-2">
        {items.map((it) => (
          <Tap key={it.l} onTap={() => nav.toast(it.lock ? `${it.l} needs a trial` : `${it.l} is not in this prototype`)} className="flex flex-col items-center gap-2">
            <span className="relative grid h-12 w-12 place-items-center rounded-full text-white" style={{ background: T.primary }}>
              {it.i}
              {it.lock && (
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
        { l: 'Add manual transaction', i: <Plus size={18} /> },
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

export const PROTO_2025: StageProto = {
  tabs: ['Payments', 'Admin', 'Finance', 'Support'],
  screens: { home: Home, insights: Insights, netProfit: NetProfit },
  sheets: { quick: QuickSheet },
};

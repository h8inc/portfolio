/**
 * 2023: paywalled accounting, old IA.
 * Admin → trial wall → Tide Accounting with Overview, Insights, Bookkeeping,
 * Taxes (→ VAT manager, Self Assessment) and Settings, plus reports.
 */
import { useState, type ReactNode } from 'react';
import { Check, ChevronDown, ChevronRight, CircleHelp, Download, FileText, Landmark, Lock, Mail, MoreVertical, Plus, Receipt, Share2, UserRound, X } from 'lucide-react';
import { Illo, type IlloName } from './illustrations';
import { NavBar, StatusBar, Tap, type Nav, type StageProto } from './proto';
import { BIZ, BK_TASKS, INSIGHTS_2023, KEY_DATES, PNL_PREVIEW, REPORTS, SELF_ASSESSMENT_2023, SETTINGS_2023, TAXES_2023, VAT_PERIODS } from './data';
import {
  AccountingHeader,
  AdminPlansScreen,
  CategoryScreen,
  ExpensesBreakdownScreen,
  InsufficientFundsScreen,
  PaywallScreen,
  ProcessingScreen,
  ScoreCard,
  TransactionsScreen,
  TxActionsSheet,
  VatRateScreen,
  categoryDone,
  vatDone,
} from './screens-shared';
import { AreaPair, Card, CardTitle, GroupedBars, HEAD, KeyValue, Legend, ListRow, OutlineButton, Pill, PrimaryButton, SectionTitle, SegmentTabs, T } from './ui';

/* ------------------------------------------------------------------ */
/* Blocks shared with the 2024 Admin home                              */
/* ------------------------------------------------------------------ */

export function AdminHeader() {
  return (
    <div className="flex items-center justify-between px-4 pt-3 pb-4">
      <h1 className="text-[28px] font-bold leading-none tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
        Admin
      </h1>
      <span className="flex items-center gap-1.5 rounded-full border bg-white py-1 pl-3 pr-1 text-[11px] font-medium" style={{ borderColor: T.border, color: T.ink }}>
        {BIZ.name}
        <ChevronDown size={12} />
        <span className="grid h-7 w-7 place-items-center rounded-full text-[9px] font-bold text-white" style={{ background: '#EC5C31' }}>
          {BIZ.initials}
        </span>
      </span>
    </div>
  );
}

export function EmptyState({ nav, title, illo, text, cta, more }: { nav: Nav; title: string; illo: IlloName; text: string; cta: string; more?: boolean }) {
  return (
    <Card>
      <CardTitle right={more ? <MoreVertical size={16} style={{ color: T.muted }} /> : undefined}>{title}</CardTitle>
      <div className="flex flex-col items-center gap-3">
        <Illo name={illo} size={84} plate />
        <p className="text-center text-[13px]" style={{ color: T.muted }}>
          {text}
        </p>
        <OutlineButton icon={<Plus size={14} />} onTap={() => nav.toast(`${cta} lives in the Invoices tab in this version`)}>
          {cta}
        </OutlineButton>
      </div>
    </Card>
  );
}

export function PromoCard({ nav, title, text, link, illo }: { nav: Nav; title: string; text: string; link?: string; illo: IlloName }) {
  return (
    <Card onTap={() => nav.toast('Invoice Assistant is a paid add-on in this version')}>
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

export function ExploreMore({ nav }: { nav: Nav }) {
  return (
    <section className="mt-7">
      <p className="mb-3 px-4 text-[13px] font-semibold" style={{ color: T.ink }}>
        Explore more
      </p>
      <Tap onTap={() => nav.toast('Accounting integrations are not in this prototype')} block className="mx-4 flex w-[calc(100%-32px)] overflow-hidden rounded-[20px] border bg-white text-left" style={{ borderColor: T.border }}>
        <span className="grid w-[110px] shrink-0 place-items-center" style={{ background: T.tint }}>
          <Illo name="accounting" size={84} />
        </span>
        <span className="relative flex-1 p-4 pr-8">
          <X size={16} className="absolute right-3 top-3" style={{ color: T.muted }} />
          <span className="mb-1 block text-[16px] font-semibold leading-tight tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
            Connect your accounting software
          </span>
          <span className="block text-[12px] leading-snug" style={{ color: T.muted }}>
            Sync your Tide transactions to your accounting software for accurate bookkeeping
          </span>
        </span>
      </Tap>
    </section>
  );
}

export function InvoicesBillsEmpty({ nav }: { nav: Nav }) {
  return (
    <section className="mt-7 space-y-3">
      <SectionTitle more>Invoices &amp; Bills</SectionTitle>
      <EmptyState nav={nav} title="Invoices" illo="invoices" text="Create your first invoice to start getting paid" cta="Create an invoice" />
      <PromoCard nav={nav} title="Invoice Assistant" text="Unlock automatic invoice chasing and matching with Invoice Assistant" link="Learn more" illo="invoices" />
      <EmptyState nav={nav} title="Bills" illo="bills" text="Add a bill to keep track of what you owe" cta="Pay a bill" />
    </section>
  );
}

export function TeamExpenses({ nav }: { nav: Nav }) {
  return (
    <section className="mt-7">
      <SectionTitle more>Team expenses</SectionTitle>
      <span className="mx-4 mb-3 inline-flex items-center gap-1.5 rounded-lg border bg-white px-3 py-1.5 text-[13px]" style={{ borderColor: T.border, color: T.ink }}>
        Main business account <ChevronDown size={14} />
      </span>
      <Tap onTap={() => nav.toast('Expense cards are not in this prototype')} block className="mx-4 flex w-[calc(100%-32px)] overflow-hidden rounded-[20px] border bg-white text-left" style={{ borderColor: T.border }}>
        <span className="grid w-[120px] shrink-0 place-items-center py-3" style={{ background: T.tint }}>
          <Illo name="expenses" size={96} />
        </span>
        <span className="flex-1 p-4">
          <span className="mb-1 block text-[16px] font-semibold leading-tight tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
            Give your team Expense Cards
          </span>
          <span className="block text-[12px] leading-snug" style={{ color: T.muted }}>
            Empower your staff and simplify how you manage your business expenses
          </span>
        </span>
      </Tap>
    </section>
  );
}

export function Accounting101() {
  return (
    <section className="mt-7 px-4">
      <h3 className="text-[20px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
        Accounting 101
      </h3>
      <p className="mb-3 text-[13px]" style={{ color: T.muted }}>
        As a VAT-registered Sole Trader, here are some guides you may find useful
      </p>
      <div className="flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {(
          [
            ['GUIDE', 'Completing your Self Assessment', 'taxes'],
            ['TRENDING', 'Sole Trader: Accounting basics', 'bookkeeping'],
          ] as [string, string, IlloName][]
        ).map(([tag, title, illo]) => (
          <div key={title} className="w-[180px] shrink-0 overflow-hidden rounded-2xl border bg-white" style={{ borderColor: T.border }}>
            <div className="grid h-[96px] place-items-center" style={{ background: T.tint }}>
              <Illo name={illo} size={72} />
            </div>
            <div className="p-3">
              <Pill>{tag}</Pill>
              <p className="mt-1.5 text-[12px] font-medium leading-snug" style={{ color: T.ink }}>
                {title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FySelector({ right }: { right?: ReactNode }) {
  return (
    <div className="flex items-end justify-between px-4 pt-4">
      <div>
        <p className="text-[12px]" style={{ color: T.muted }}>
          Current financial year
        </p>
        <span className="mt-1 inline-flex items-center gap-1 rounded-lg border bg-white px-2.5 py-1 text-[13px] font-medium" style={{ borderColor: T.border2, color: T.ink }}>
          {BIZ.fy} <ChevronDown size={14} />
        </span>
      </div>
      {right}
    </div>
  );
}

export function ReportTiles({ nav, onPick }: { nav: Nav; onPick?: (r: string) => void }) {
  return (
    <section className="mt-5">
      <h3 className="px-4 text-[20px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
        Reports
      </h3>
      <p className="mb-3 px-4 text-[13px]" style={{ color: T.muted }}>
        Select which report you want to download. Your report will be emailed to you.
      </p>
      <div className="flex gap-2.5 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {REPORTS.map((t) => (
          <Tap
            key={t}
            onTap={() => (onPick ? onPick(t) : nav.toast(`${t} report emailed to you`))}
            className="flex h-[84px] w-[88px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-2xl border bg-white text-center text-[12px] font-medium"
            style={{ borderColor: T.border, color: T.ink }}
          >
            <FileText size={18} style={{ color: T.primary }} />
            {t}
          </Tap>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Admin home                                                          */
/* ------------------------------------------------------------------ */

function Home(nav: Nav) {
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
      <AdminHeader />
      <section className="mt-2">
        <SectionTitle more>Accounting</SectionTitle>
        <div className="flex gap-3 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {locked.map((c, i) => (
            <Tap
              key={i}
              onTap={() => nav.toast('Locked until you start a trial')}
              className="relative flex h-[150px] w-[140px] shrink-0 flex-col items-center justify-end gap-2 rounded-[20px] border bg-white p-3 text-center"
              style={{ borderColor: T.border }}
            >
              <Lock size={14} className="absolute right-3 top-3" style={{ color: T.muted }} />
              <Illo name={c.illo} size={64} plate />
              <span className="text-[12px] leading-snug" style={{ color: T.ink }}>
                {c.text}
              </span>
            </Tap>
          ))}
        </div>
        <div className="mx-4 mt-4">
          <PrimaryButton onTap={() => nav.go(nav.flags.trial ? 'overview' : 'trialWall')}>{nav.flags.trial ? 'Open Accounting' : 'Explore Accounting'}</PrimaryButton>
        </div>
        {!nav.flags.trial && (
          <p className="mt-3 text-center text-[14px] font-semibold" style={{ fontFamily: HEAD, color: T.primary }}>
            30 days to activate your free trial
          </p>
        )}
      </section>
      <ExploreMore nav={nav} />
      <InvoicesBillsEmpty nav={nav} />
      <TeamExpenses nav={nav} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Trial wall: six onboarding steps                                    */
/* ------------------------------------------------------------------ */

const STEPS = ['Business details', 'VAT registration', 'Accounting period', 'Connect to HMRC', 'Import past transactions', 'Choose a plan'];

function TrialWall(nav: Nav) {
  const [step, setStep] = useState(0);
  return (
    <>
      <StatusBar />
      <NavBar title="Tide Accounting" />
      <div className="px-4 pt-2">
        <p className="text-[12px] font-medium uppercase tracking-[0.08em]" style={{ color: T.muted }}>
          Step {Math.min(step + 1, STEPS.length)} of {STEPS.length}
        </p>
        <h2 className="mt-1 text-[24px] font-bold leading-tight tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
          Set up your free trial
        </h2>
        <p className="mt-2 text-[13px]" style={{ color: T.muted }}>
          We need a few details before you can see your accounts.
        </p>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full" style={{ background: T.tint }}>
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${(step / STEPS.length) * 100}%`, background: T.primary }} />
        </div>
      </div>
      <div className="mx-4 mt-5 overflow-hidden rounded-[20px] border bg-white" style={{ borderColor: T.border }}>
        {STEPS.map((s, i) => (
          <ListRow
            key={s}
            first={i === 0}
            title={s}
            sub={i < step ? 'Done' : i === step ? 'Fill in now' : 'Up next'}
            icon={i < step ? <Check size={16} style={{ color: T.green }} /> : <span className="text-[12px] font-semibold">{i + 1}</span>}
            right={<span />}
            onTap={() => nav.toast(i < step ? 'Already completed' : 'Use Continue to move through the steps')}
          />
        ))}
      </div>
      <div className="mx-4 mt-5">
        <PrimaryButton
          onTap={() => {
            if (step + 1 >= STEPS.length) {
              nav.setFlag('trial', true);
              nav.toast('Trial started after 6 steps');
              nav.replace('overview');
            } else setStep(step + 1);
          }}
        >
          {step + 1 >= STEPS.length ? 'Start trial' : 'Continue'}
        </PrimaryButton>
        <Tap onTap={nav.home} block className="mt-3 w-full py-2 text-center text-[14px] font-medium" style={{ color: T.muted }}>
          Not now
        </Tap>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Tide Accounting tabs                                                */
/* ------------------------------------------------------------------ */

const TABS = ['Overview', 'Insights', 'Bookkeeping', 'Taxes', 'Settings'];
/** Insights was its own paid add-on in the old IA: locked until Admin Extra is bought,
 *  independent of the base "Explore Accounting" trial that unlocks the rest of the tabs. */
const routesFor = (nav: Nav) => ({ Overview: 'overview', Insights: nav.flags.adminExtra ? 'insights' : 'paywall', Bookkeeping: 'bookkeeping', Taxes: 'taxes', Settings: 'settings' });

function Overview(nav: Nav) {
  return (
    <>
      <AccountingHeader nav={nav} active="Overview" routes={routesFor(nav)} tabs={TABS} />
      <div className="mt-4 space-y-3">
        <ScoreCard nav={nav} extra onTransactions={() => nav.go('transactions')} />
        <Card>
          <CardTitle action="Explore" onAction={() => (nav.flags.adminExtra ? nav.replace('insights') : nav.go('paywall'))}>
            Profitability Insights
          </CardTitle>
          <GroupedBars />
          <Legend
            items={[
              ['Net profit', T.primary],
              ['Revenue', T.light],
              ['Expenses', T.gold],
            ]}
          />
        </Card>
        <Card>
          <CardTitle action="View all" onAction={() => nav.toast('Key dates list is not in this prototype')}>
            Key dates
          </CardTitle>
          <div className="-mx-4">
            {KEY_DATES.map((d, i) => (
              <ListRow
                key={i}
                first={i === 0}
                title={d.title}
                sub={<span style={{ color: d.urgent ? T.danger : T.muted }}>{d.sub}</span>}
                icon={
                  <span className="text-center text-[10px] font-semibold leading-tight">
                    {d.month}
                    <br />
                    {d.day}
                  </span>
                }
                onTap={() => nav.toast('Key date detail is not in this prototype')}
              />
            ))}
          </div>
          <div className="mt-3">
            <OutlineButton icon={<Plus size={14} />} onTap={() => nav.toast('Adding key dates is not in this prototype')}>
              Add a key date
            </OutlineButton>
          </div>
        </Card>
      </div>
      <Accounting101 />
      <ReportTiles nav={nav} onPick={(r) => (r === 'Profit & Loss' ? nav.go('reportDates') : nav.toast(`${r} report emailed to you`))} />
    </>
  );
}

function Insights(nav: Nav) {
  return (
    <>
      <AccountingHeader nav={nav} active="Insights" routes={routesFor(nav)} tabs={TABS} />
      <div className="mt-4 space-y-3">
        {INSIGHTS_2023.map((m) => (
          <Card key={m.key}>
            <div className="flex items-start justify-between">
              <p className="text-[14px] font-medium" style={{ color: T.ink }}>
                {m.title}
              </p>
              <CircleHelp size={16} style={{ color: T.muted }} />
            </div>
            <div className="mt-0.5 flex items-baseline justify-between">
              <p className="text-[20px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
                {m.value}
              </p>
              <p className="text-[11px]" style={{ color: m.delta.startsWith('-') ? T.danger : T.green }}>
                {m.delta}
              </p>
            </div>
            <div className="mt-2">
              <AreaPair tone={m.tone} />
            </div>
            <div className="mt-3">
              <OutlineButton onTap={() => nav.toast(`${m.title} detail arrives in the 2025 redesign`)}>Explore</OutlineButton>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function TaskGroup({ nav, title, count, items, cta, onCta }: { nav: Nav; title: string; count: number; items: typeof BK_TASKS.transactions.items; cta: string; onCta: () => void }) {
  return (
    <Card pad={false}>
      <div className="flex items-center justify-between px-4 pt-4">
        <h3 className="text-[17px] font-semibold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
          {title}
        </h3>
        <span className="text-[12px]" style={{ color: T.muted }}>
          {count} need attention
        </span>
      </div>
      <div className="mt-2">
        {items.map((it, i) => (
          <ListRow
            key={i}
            first={i === 0}
            icon={<Receipt size={16} />}
            title={it.name}
            sub={it.task}
            right={
              <span className="text-right">
                <span className="block text-[14px] font-semibold" style={{ fontFamily: HEAD, color: it.amount.startsWith('+') ? T.green : T.ink }}>
                  {it.amount}
                </span>
                {it.tag && <Pill>{it.tag}</Pill>}
              </span>
            }
            onTap={() => nav.toast('Single item editing is not in this prototype')}
          />
        ))}
      </div>
      <div className="px-4 pb-4">
        <OutlineButton onTap={onCta}>{cta}</OutlineButton>
      </div>
    </Card>
  );
}

function Bookkeeping(nav: Nav) {
  return (
    <>
      <AccountingHeader nav={nav} active="Bookkeeping" routes={routesFor(nav)} tabs={TABS} />
      <FySelector
        right={
          <Tap onTap={() => nav.toast('Manual transactions are not in this prototype')} className="gap-1 text-[13px] font-medium" style={{ color: T.primary }}>
            <Plus size={14} /> Add transaction
          </Tap>
        }
      />
      <div className="mt-5 space-y-3">
        <TaskGroup nav={nav} title="Transactions" count={BK_TASKS.transactions.count} items={BK_TASKS.transactions.items} cta="View all transaction tasks" onCta={() => nav.go('transactions')} />
        <TaskGroup nav={nav} title="Invoices" count={BK_TASKS.invoices.count} items={BK_TASKS.invoices.items} cta="View all invoice tasks" onCta={() => nav.toast('Invoice tasks are not in this prototype')} />
      </div>
    </>
  );
}

function TaxCard({ nav, title, est, due, period, cta, onCta, onAll }: { nav: Nav; title: string; est: string; due: string; period: string; cta: string; onCta: () => void; onAll: () => void }) {
  void nav;
  return (
    <Card>
      <CardTitle action="View all" onAction={onAll}>
        {title}
      </CardTitle>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: T.dangerTint, color: T.danger }}>
          <Landmark size={18} />
        </span>
        <span className="flex-1 text-[14px]" style={{ color: T.ink }}>
          Upcoming estimate
        </span>
        <span className="text-[22px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
          {est}
        </span>
      </div>
      <div className="mt-4 rounded-xl p-3" style={{ background: T.canvas }}>
        <KeyValue
          rows={[
            ['Due before', due],
            ['Period', period],
          ]}
        />
      </div>
      <div className="mt-4">
        <OutlineButton onTap={onCta}>{cta}</OutlineButton>
      </div>
    </Card>
  );
}

function Taxes(nav: Nav) {
  return (
    <>
      <AccountingHeader nav={nav} active="Taxes" routes={routesFor(nav)} tabs={TABS} />
      <div className="mt-4 space-y-3">
        <TaxCard nav={nav} title="Corporation tax" {...TAXES_2023.corporation} est={TAXES_2023.corporation.estimate} cta="View breakdown" onCta={() => nav.go('selfAssessment')} onAll={() => nav.go('selfAssessment')} />
        <TaxCard nav={nav} title="VAT returns" {...TAXES_2023.vat} est={TAXES_2023.vat.estimate} cta="Submit on desktop" onCta={() => nav.toast('Submission runs on desktop in this version')} onAll={() => nav.go('vat')} />
        <Card className="flex items-center gap-3">
          <span className="flex-1">
            <span className="block text-[15px] font-semibold leading-snug tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
              Save for tax season with your dedicated tax account
            </span>
            <span className="mt-1 block text-[12px]" style={{ color: T.muted }}>
              Set money aside, track goals and pay HMRC directly.
            </span>
            <span className="mt-3 block">
              <OutlineButton onTap={() => nav.toast('Tax account is not in this prototype')}>Open tax account</OutlineButton>
            </span>
          </span>
          <Illo name="growth" size={72} />
        </Card>
      </div>
    </>
  );
}

function VatManager(nav: Nav) {
  return (
    <>
      <StatusBar />
      <NavBar title="VAT Manager" />
      <div className="space-y-3">
        {VAT_PERIODS.map((p) => (
          <Card key={p.title}>
            <div className="flex items-start justify-between">
              <h3 className="text-[16px] font-semibold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
                {p.title}
              </h3>
              <span className="text-[11px]" style={{ color: T.muted }}>
                {p.when}
              </span>
            </div>
            <div className="mt-3 flex flex-col items-center gap-2">
              <Illo name="bookkeeping" size={72} plate />
              <Pill tone={p.tone}>{p.status.toUpperCase()}</Pill>
              <p className="text-[14px] font-medium" style={{ color: T.ink }}>
                Estimated VAT to pay: {p.estimate}
              </p>
              <p className="text-[12px]" style={{ color: T.muted }}>
                VAT period: {p.period}
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              {p.disabled ? (
                <span className="flex h-10 flex-1 items-center justify-center rounded-full text-[13px] font-medium" style={{ background: T.border, color: T.muted }}>
                  {p.cta}
                </span>
              ) : (
                <PrimaryButton className="!h-10 !text-[13px]" onTap={() => nav.toast(p.cta === 'Update 12 items' ? 'Opens the bookkeeping tasks' : 'Submission runs on desktop in this version')}>
                  {p.cta}
                </PrimaryButton>
              )}
            </div>
          </Card>
        ))}
        <p className="px-6 pb-2 text-center text-[12px]" style={{ color: T.muted }}>
          Generate your next VAT Report at the end of the current period.
        </p>
      </div>
    </>
  );
}

export function SelfAssessmentDetail({ nav, due, period, paid, title = 'Self Assessment' }: { nav: Nav; due: string; period: string; paid?: { title: string; sub: string; month: string; day: string }; title?: string }) {
  const [tab, setTab] = useState<'Income' | 'Expenses'>('Income');
  const sa = SELF_ASSESSMENT_2023;
  return (
    <>
      <StatusBar />
      <NavBar title={title} />
      <div className="space-y-3">
        <Card onTap={() => nav.go(nav.flags.trial ? 'transactions' : 'bookkeeping')} className="flex items-center gap-3">
          <span className="flex-1">
            <span className="block text-[14px] font-medium" style={{ color: T.ink }}>
              You have bookkeeping tasks to complete
            </span>
            <span className="block text-[12px]" style={{ color: T.muted }}>
              Add required details to your invoices and transactions to avoid penalties from HMRC
            </span>
          </span>
          <ChevronRight size={18} style={{ color: T.primary }} />
        </Card>
        <div className="flex items-start justify-between px-4">
          <div>
            <p className="text-[14px]" style={{ color: T.muted }}>
              {paid ? 'Payment due date for selected year' : 'Next Self Assessment due'}
            </p>
            <p className="text-[26px] font-bold tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
              {due}
            </p>
            <span className="mt-1 inline-flex items-center gap-1 rounded-lg border bg-white px-2.5 py-1 text-[13px] font-medium" style={{ borderColor: T.border2, color: T.ink }}>
              {period} <ChevronDown size={14} />
            </span>
          </div>
          <CircleHelp size={18} style={{ color: T.muted }} />
        </div>
        {paid && (
          <Card pad={false}>
            <ListRow
              first
              icon={
                <span className="text-center text-[10px] font-semibold leading-tight">
                  {paid.month}
                  <br />
                  {paid.day}
                </span>
              }
              title={paid.title}
              sub={paid.sub}
              right={<ChevronDown size={18} style={{ color: T.icon }} />}
              onTap={() => nav.toast('Payment history is not in this prototype')}
            />
          </Card>
        )}
        <SegmentTabs items={['Income', 'Expenses']} active={tab} onChange={(v) => setTab(v as 'Income' | 'Expenses')} />
        <h3 className="px-4 pt-2 text-[20px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
          Your {tab.toLowerCase()}
        </h3>
        <Card className="flex items-center justify-between" pad>
          <span className="text-[14px] font-medium" style={{ color: T.ink }}>
            Total
          </span>
          <span className="text-[16px] font-semibold" style={{ fontFamily: HEAD, color: T.ink }}>
            {tab === 'Income' ? sa.income.total : sa.expenses.total}
          </span>
        </Card>
        {tab === 'Income'
          ? sa.income.rows.map((r) => (
              <Card key={r.title} onTap={() => nav.toast('Line detail is not in this prototype')}>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[14px] font-medium" style={{ color: T.ink }}>
                    {r.title}
                  </span>
                  <span className="text-[15px] font-semibold" style={{ fontFamily: HEAD, color: T.ink }}>
                    {r.amount}
                  </span>
                </div>
                <span className="mt-2 inline-block">
                  <Pill>{r.tag}</Pill>
                </span>
              </Card>
            ))
          : sa.expenses.rows.map((r) => (
              <Card key={r.title} onTap={() => nav.toast('Line detail is not in this prototype')}>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[14px] font-medium leading-snug" style={{ color: T.ink }}>
                    {r.title}
                  </span>
                  <span className="shrink-0 text-[15px] font-semibold" style={{ fontFamily: HEAD, color: T.ink }}>
                    {r.amount}
                  </span>
                </div>
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {r.tags.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </span>
              </Card>
            ))}
      </div>
    </>
  );
}

function Settings(nav: Nav) {
  const icons = [<UserRound size={18} key="u" />, <Landmark size={18} key="l" />, <FileText size={18} key="f" />, <Landmark size={18} key="h" />, <Share2 size={18} key="s" />, <Download size={18} key="d" />];
  return (
    <>
      <AccountingHeader nav={nav} active="Settings" routes={routesFor(nav)} tabs={TABS} />
      <Card className="mt-4" pad={false}>
        {SETTINGS_2023.map((s, i) => (
          <ListRow key={s} first={i === 0} icon={icons[i]} title={s} onTap={() => nav.toast(`${s} is not in this prototype`)} />
        ))}
      </Card>
      <p className="mt-4 px-6 text-center text-[12px]" style={{ color: T.muted }}>
        Trial ends in 30 days · Manage plan on desktop
      </p>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Reports: date picker → PDF preview → share sheet                    */
/* ------------------------------------------------------------------ */

function ReportDates(nav: Nav) {
  const [mode, setMode] = useState('Financial year');
  const [pick, setPick] = useState(0);
  return (
    <>
      <StatusBar />
      <NavBar title="Accounting Overview" />
      <div className="px-4">
        <h2 className="text-[22px] font-bold tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
          Profit &amp; Loss report
        </h2>
        <p className="mt-1 text-[13px]" style={{ color: T.muted }}>
          Select a financial year or a custom range for your report. Add a category and VAT rate to applicable transactions and invoices for an accurate report.
        </p>
      </div>
      <div className="mt-4">
        <SegmentTabs items={['Financial year', 'Custom range']} active={mode} onChange={(v) => (v === 'Custom range' ? nav.toast('Custom ranges are not in this prototype') : setMode(v))} />
      </div>
      <Card className="mt-3" pad={false}>
        {BIZ.fyOptions.map((fy, i) => (
          <ListRow key={fy} first={i === 0} title={fy} right={pick === i ? <Check size={18} style={{ color: T.primary }} /> : <span className="h-[18px] w-[18px]" />} onTap={() => setPick(i)} />
        ))}
      </Card>
      <div className="mx-4 mt-6">
        <PrimaryButton onTap={() => nav.go('reportPdf')}>Next</PrimaryButton>
      </div>
    </>
  );
}

function ReportPdf(nav: Nav) {
  return (
    <>
      <StatusBar />
      <NavBar
        title="Profit & Loss report"
        right={
          <Tap onTap={() => nav.sheet('share')} label="Share" className="grid h-9 w-9 place-items-center rounded-full" style={{ color: T.primary }}>
            <Share2 size={18} />
          </Tap>
        }
      />
      <div className="mx-4 rounded-2xl border bg-white p-5 shadow-sm" style={{ borderColor: T.border }}>
        <p className="text-[10px] font-medium uppercase tracking-[0.1em]" style={{ color: T.muted }}>
          Profit &amp; Loss · {BIZ.name}
        </p>
        <p className="mt-1 text-[12px]" style={{ color: T.muted }}>
          {PNL_PREVIEW.period}
        </p>
        <div className="mt-4 space-y-2 text-[13px]" style={{ color: T.ink }}>
          {PNL_PREVIEW.rows.map(([k, v], i) => (
            <div key={k} className={`flex justify-between ${i === 2 || i === 4 ? 'border-t pt-2 font-semibold' : ''}`} style={{ borderColor: T.border }}>
              <span>{k}</span>
              <span style={{ fontFamily: HEAD, color: v.startsWith('-') ? T.danger : T.ink }}>{v}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 h-24 rounded-lg" style={{ background: T.canvas }} />
        <div className="mt-2 h-3 w-2/3 rounded" style={{ background: T.tint }} />
        <div className="mt-1.5 h-3 w-1/2 rounded" style={{ background: T.tint }} />
      </div>
      <p className="mt-3 text-center text-[12px]" style={{ color: T.muted }}>
        Page 1 of 3
      </p>
      <div className="mx-4 mt-6">
        <PrimaryButton
          onTap={() => {
            nav.toast('Report emailed to you');
            nav.home();
          }}
        >
          Done
        </PrimaryButton>
      </div>
    </>
  );
}

function ShareSheet(nav: Nav) {
  const items = [
    { t: 'Email report', s: 'Send the PDF to your inbox', i: <Mail size={18} /> },
    { t: 'Send to accountant', s: 'Share with the accountant on your account', i: <UserRound size={18} /> },
    { t: 'Download PDF', s: 'Save to your phone', i: <Download size={18} /> },
  ];
  return (
    <div className="px-4">
      <h3 className="mb-3 text-[20px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
        Share your report
      </h3>
      <div className="overflow-hidden rounded-[20px] border" style={{ borderColor: T.border }}>
        {items.map((it, i) => (
          <ListRow
            key={it.t}
            first={i === 0}
            icon={it.i}
            title={it.t}
            sub={it.s}
            onTap={() => {
              nav.sheet(null);
              nav.toast(`${it.t}: done`);
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const category = (nav: Nav) => <CategoryScreen nav={nav} onSaved={() => categoryDone(nav)} />;

export const PROTO_2023: StageProto = {
  tabs: ['Payments', 'Admin', 'Support', 'More'],
  screens: {
    home: Home,
    trialWall: TrialWall,
    overview: Overview,
    insights: Insights,
    bookkeeping: Bookkeeping,
    taxes: Taxes,
    vat: VatManager,
    selfAssessment: (nav) => <SelfAssessmentDetail nav={nav} due={SELF_ASSESSMENT_2023.due} period={SELF_ASSESSMENT_2023.period} />,
    settings: Settings,
    transactions: (nav) => <TransactionsScreen nav={nav} />,
    txSelect: (nav) => <TransactionsScreen nav={nav} mode="category" />,
    txVatSelect: (nav) => <TransactionsScreen nav={nav} mode="vat" />,
    category,
    vatRate: (nav) => <VatRateScreen nav={nav} onSaved={() => vatDone(nav)} />,
    expenses: (nav) => <ExpensesBreakdownScreen nav={nav} />,
    reportDates: ReportDates,
    reportPdf: ReportPdf,
    paywall: (nav) => <PaywallScreen nav={nav} flag="adminExtra" />,
    adminPlans: (nav) => <AdminPlansScreen nav={nav} flag="adminExtra" />,
    insufficientFunds: (nav) => <InsufficientFundsScreen nav={nav} />,
    processing: (nav) => <ProcessingScreen nav={nav} backTo="insights" />,
  },
  sheets: {
    txActions: (nav) => <TxActionsSheet nav={nav} />,
    share: ShareSheet,
  },
};

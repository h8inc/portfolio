/**
 * Screens that appear in more than one year: Tide Accounting, transactions,
 * the Admin Extra paywall and the processing screen.
 */
import { useState } from 'react';
import { Check, ChevronRight, CircleHelp, Download, FileText, Landmark, Receipt, Search, Tag, X } from 'lucide-react';
import { CATEGORIES, TX_1, TX_2, TX_DAY_1, TX_DAY_2, type Tx } from './data';
import { Illo } from './illustrations';
import { NavBar, StatusBar, Tap, type Nav } from './proto';
import {
  BODY,
  Card,
  CardTitle,
  GroupedBars,
  HEAD,
  KeyValue,
  Legend,
  ListRow,
  LineChart,
  LockBanner,
  OutlineButton,
  Pill,
  PrimaryButton,
  ScoreDial,
  T,
  TopTabs,
} from './ui';

/* ------------------------------------------------------------------ */
/* Tide Accounting: shared header                                      */
/* ------------------------------------------------------------------ */

export const ACC_TABS = ['Overview', 'Insights', 'Bookkeeping', 'Self Assessment', 'VAT Manager'];

/** Maps a top-tab label to the screen id that shows it. Stages may override. */
export type TabRoutes = Partial<Record<string, string>>;

export function AccountingHeader({ nav, active, routes, tabs = ACC_TABS }: { nav: Nav; active: string; routes: TabRoutes; tabs?: string[] }) {
  return (
    <>
      <StatusBar />
      <NavBar title="Tide Accounting" />
      <TopTabs
        items={tabs}
        active={active}
        onChange={(t) => {
          const id = routes[t];
          if (!id) return nav.toast(`${t} isn't in this prototype`);
          if (id !== nav.current) nav.replace(id);
        }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Bookkeeping score card                                              */
/* ------------------------------------------------------------------ */

export function ScoreCard({ nav, onTransactions, extra }: { nav: Nav; onTransactions: () => void; extra?: boolean }) {
  return (
    <Card>
      <CardTitle right={<CircleHelp size={18} style={{ color: T.muted }} />}>Bookkeeping score</CardTitle>
      <ScoreDial value={40} />
      <div className="mt-1 text-center">
        <Pill tone="danger">NEEDS WORK</Pill>
        <p className="mt-1.5 text-[11px]" style={{ color: T.muted }}>
          Complete tasks to improve
        </p>
      </div>
      <div className="-mx-4 mt-4 border-t" style={{ borderColor: T.border }}>
        <ListRow first title="19 transactions are missing details" sub="Add details to ensure your reports are accurate" onTap={onTransactions} />
        {extra && (
          <>
            <ListRow title="10 invoices are missing details" sub="Add details to ensure your reports are accurate" onTap={() => nav.toast('Invoice details are not in this prototype')} />
            <ListRow title="Connect to HMRC" sub="Required to submit VAT Reports from your Tide account" onTap={() => nav.toast('HMRC connection is not in this prototype')} />
          </>
        )}
      </div>
      <div className="mt-3">
        <OutlineButton onTap={onTransactions}>View all outstanding tasks</OutlineButton>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Transactions, bulk actions, category picker                         */
/* ------------------------------------------------------------------ */

function TxRow({ tx, selected, selectable, onTap }: { tx: Tx; selected?: boolean; selectable?: boolean; onTap?: () => void }) {
  const income = tx.amount.startsWith('+');
  return (
    <Tap onTap={onTap} block className="flex w-full items-center gap-3 border-t px-4 py-3 text-left" style={{ borderColor: T.border }}>
      {selectable ? (
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md border-2" style={{ borderColor: selected ? T.primary : T.border2, background: selected ? T.primary : '#fff' }}>
          {selected && <Check size={12} color="#fff" strokeWidth={3} />}
        </span>
      ) : (
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style={{ background: T.tint, color: T.primary }}>
          <Receipt size={16} />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-[14px] font-medium" style={{ color: T.ink }}>
          {tx.name}
        </span>
        <span className="block text-[12px]" style={{ color: T.muted }}>
          {tx.missing}
        </span>
      </span>
      <span className="text-right">
        <span className="block text-[15px] font-semibold" style={{ fontFamily: HEAD, color: income ? T.green : T.ink }}>
          {tx.amount}
        </span>
        {tx.tag && (
          <span className="mt-0.5 block">
            <Pill tone={tx.tagTone ?? 'tint'}>{tx.tag}</Pill>
          </span>
        )}
      </span>
    </Tap>
  );
}

/** Transactions with "details missing" filter; "More actions" opens the bulk sheet. */
export function TransactionsScreen({ nav, select }: { nav: Nav; select?: boolean }) {
  const [picked, setPicked] = useState<number[]>(select ? [0, 1, 2, 3] : []);
  const done = nav.flags.categorised;
  const toggle = (i: number) => setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
  return (
    <>
      <StatusBar />
      <NavBar title="Transactions" />
      <div className="flex gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {['Date range', 'Details missing · 2', 'Transaction type'].map((f, i) => (
          <span
            key={f}
            className="shrink-0 rounded-full border px-3 py-1 text-[12px] font-medium"
            style={i === 1 ? { background: T.tint, borderColor: T.tint, color: T.deep } : { borderColor: T.border2, color: T.ink }}
          >
            {f}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between px-4 pb-2">
        <span className="text-[12px]" style={{ color: T.muted }}>
          {select ? `${picked.length} selected` : done ? '15 transactions need details' : '19 transactions need details'}
        </span>
        <Tap onTap={() => (select ? nav.go('category') : nav.sheet('txActions'))} className="text-[14px] font-semibold" style={{ color: T.primary }}>
          {select ? 'Select category' : 'More actions'}
        </Tap>
      </div>
      <div className="mx-4 overflow-hidden rounded-[20px] border bg-white" style={{ borderColor: T.border }}>
        <div className="flex justify-between px-4 py-2 text-[12px]" style={{ background: T.canvas, color: T.muted }}>
          <span>{TX_DAY_1.date}</span>
          <span>{TX_DAY_1.total}</span>
        </div>
        {TX_1.map((tx, i) => (
          <TxRow
            key={i}
            tx={done && i < 4 ? { ...tx, missing: 'Fuel · categorised', tag: undefined } : tx}
            selectable={select}
            selected={picked.includes(i)}
            onTap={() => (select ? toggle(i) : nav.toast('Single transaction editing is not in this prototype'))}
          />
        ))}
        <div className="flex justify-between px-4 py-2 text-[12px]" style={{ background: T.canvas, color: T.muted }}>
          <span>{TX_DAY_2.date}</span>
          <span>{TX_DAY_2.total}</span>
        </div>
        {TX_2.map((tx, i) => (
          <TxRow key={i} tx={tx} selectable={select} selected={picked.includes(4 + i)} onTap={() => (select ? toggle(4 + i) : nav.toast('Single transaction editing is not in this prototype'))} />
        ))}
      </div>
    </>
  );
}

export function TxActionsSheet({ nav }: { nav: Nav }) {
  const items = [
    { t: 'Add category', s: 'Categories help ensure reports and tax returns are accurate', i: <Tag size={18} />, go: 'txSelect' },
    { t: 'Add VAT rate', s: 'VAT rates help ensure reports and VAT Returns are accurate', i: <Landmark size={18} /> },
    { t: 'Add a transaction', s: 'Include external transactions within Tide Accounting', i: <FileText size={18} /> },
    { t: 'Add receipt', s: 'Capture a photo or upload a receipt from your gallery', i: <Receipt size={18} /> },
    { t: 'Download CSV', s: 'Download all your transactions', i: <Download size={18} /> },
  ];
  return (
    <div className="px-4">
      <h3 className="text-[20px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
        Transaction actions
      </h3>
      <p className="mb-3 mt-1 text-[14px] font-medium" style={{ color: T.ink }}>
        Bulk actions
      </p>
      <div className="overflow-hidden rounded-[20px] border" style={{ borderColor: T.border }}>
        {items.map((it, i) => (
          <ListRow key={it.t} first={i === 0} icon={it.i} title={it.t} sub={it.s} onTap={() => (it.go ? nav.go(it.go) : nav.toast(`${it.t} is not in this prototype`))} />
        ))}
      </div>
    </div>
  );
}

const CAT_TONES = ['#FBF0D6', '#E3F5EC', '#FBE3EA', '#E6E8FF', '#EAE6FF', '#E3F5EC', '#FBE3EA', '#E6E8FF', '#FBF0D6', '#FBE3EA', '#E6E8FF', '#EAE6FF'];

export function CategoryScreen({ nav, onSaved }: { nav: Nav; onSaved: () => void }) {
  const [pick, setPick] = useState<string | null>(null);
  return (
    <>
      <StatusBar />
      <NavBar title="Select category" right={<X size={20} style={{ color: T.muted }} />} />
      <div className="mx-4 mb-3 flex items-center gap-2 rounded-xl border bg-white px-3 py-2.5 text-[14px]" style={{ borderColor: T.border2, color: T.muted }}>
        <Search size={16} /> Search
      </div>
      <div className="mx-4 overflow-hidden rounded-[20px] border bg-white" style={{ borderColor: T.border }}>
        {CATEGORIES.map((c, i) => (
          <ListRow
            key={c}
            first={i === 0}
            icon={<span className="h-5 w-5 rounded-md" style={{ background: CAT_TONES[i] }} />}
            title={c}
            right={pick === c ? <Check size={18} style={{ color: T.primary }} /> : <span className="h-[18px] w-[18px]" />}
            onTap={() => setPick(c)}
          />
        ))}
      </div>
      <div className="sticky bottom-28 mx-4 mt-4">
        <PrimaryButton
          onTap={() => {
            if (!pick) return nav.toast('Pick a category first');
            onSaved();
          }}
          className={pick ? '' : 'opacity-50'}
        >
          Save
        </PrimaryButton>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Freemium Tide Accounting overview (2024)                            */
/* ------------------------------------------------------------------ */

function ReportTiles({ nav, locked }: { nav: Nav; locked?: boolean }) {
  const tiles = ['Profit & Loss', 'Cash flow', 'Balance Sheet', 'Trial Balance'];
  return (
    <section className="mt-4">
      <h3 className="px-4 text-[20px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
        Reports
      </h3>
      <p className="mb-3 px-4 text-[13px]" style={{ color: T.muted }}>
        Select which report you want to download. Your report will be emailed to you.
      </p>
      <div className="flex gap-2.5 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tiles.map((t) => (
          <Tap
            key={t}
            onTap={() => nav.toast(locked ? 'Reports unlock with a trial' : `${t} report emailed to you`)}
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

function LockedInsight({ title, text, cta, illo, onTap }: { title: string; text: string; cta: string; illo: 'insights' | 'payroll' | 'taxes'; onTap: () => void }) {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <div className="flex flex-col items-center gap-3">
        <Illo name={illo} size={84} plate />
        <p className="text-center text-[13px]" style={{ color: T.muted }}>
          {text}
        </p>
        <OutlineButton onTap={onTap}>{cta}</OutlineButton>
      </div>
    </Card>
  );
}

/** Tide Accounting overview as shipped in the first freemium release. Unlocks when `flags.trial` is set. */
export function OverviewFreeScreen({ nav, routes, tabs }: { nav: Nav; routes: TabRoutes; tabs?: string[] }) {
  const trial = !!nav.flags.trial;
  return (
    <>
      <AccountingHeader nav={nav} active="Overview" routes={routes} tabs={tabs} />
      <div className="px-4 pt-4">
        <p className="text-[12px]" style={{ color: T.muted }}>
          Current financial year
        </p>
        <span className="mt-1 inline-flex items-center gap-1 rounded-lg border bg-white px-2.5 py-1 text-[13px] font-medium" style={{ borderColor: T.border2, color: T.ink }}>
          May 2022 – May 2023 <ChevronRight size={14} className="rotate-90" />
        </span>
      </div>
      <ReportTiles nav={nav} locked={!trial} />
      <div className="mt-5 space-y-3">
        <ScoreCard nav={nav} onTransactions={() => nav.go('transactions')} />
        {trial ? (
          <Card>
            <CardTitle action="Explore" onAction={() => nav.toast('Full insights open in the Insights tab')}>
              Profitability insights
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
        ) : (
          <LockedInsight title="Profitability insights" text="Sign up for a trial to unlock insights" cta="Start a trial" illo="insights" onTap={() => nav.go('paywall')} />
        )}
        {trial ? (
          <Card>
            <CardTitle action="View all" onAction={() => nav.toast('Key dates list is not in this prototype')}>
              Key dates
            </CardTitle>
            <div className="-mx-4 -mb-4">
              <ListRow first title="Automatic invoice payments" sub={<span style={{ color: T.danger }}>Due in 3 days</span>} icon={<span className="text-center text-[10px] font-semibold leading-tight">AUG<br />09</span>} />
              <ListRow title="Automatic invoice payments" sub="Due in 34 days" icon={<span className="text-center text-[10px] font-semibold leading-tight">AUG<br />09</span>} />
            </div>
          </Card>
        ) : (
          <LockedInsight title="Key dates" text="Sign up for a trial to see important dates and get reminders" cta="Start a trial" illo="payroll" onTap={() => nav.go('paywall')} />
        )}
      </div>
      <section className="mt-7 px-4">
        <h3 className="text-[20px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
          Accounting 101
        </h3>
        <p className="mb-3 text-[13px]" style={{ color: T.muted }}>
          As a VAT-registered Sole Trader, here are some guides you may find useful
        </p>
        <div className="flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            ['GUIDE', 'Completing your Self Assessment', 'taxes'],
            ['TRENDING', 'Sole Trader: Accounting basics', 'bookkeeping'],
          ].map(([tag, title, illo]) => (
            <div key={title} className="w-[180px] shrink-0 overflow-hidden rounded-2xl border bg-white" style={{ borderColor: T.border }}>
              <div className="grid h-[96px] place-items-center" style={{ background: T.tint }}>
                <Illo name={illo as 'taxes' | 'bookkeeping'} size={72} />
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
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Admin Extra paywall + processing                                    */
/* ------------------------------------------------------------------ */

export function PaywallScreen({ nav }: { nav: Nav }) {
  const [agree, setAgree] = useState(true);
  const [period, setPeriod] = useState<'Monthly' | 'Annual'>('Monthly');
  const features = [
    'Prepare for self assessment (sole traders only), submit VAT Returns, and set money aside with a separate tax account',
    'Grow your business with profitability insights, interactive charts, and reports',
    'Invite your accountant for extra support',
    'Keep track of your expenses with our smart bookkeeping tools',
  ];
  return (
    <>
      <StatusBar />
      <NavBar title="Admin Extra bundle" />
      <div className="px-4">
        <h2 className="text-[20px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
          Admin Extra
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {[
            ['Accounting Extra', 'bookkeeping'],
            ['Invoice Assistant', 'invoices'],
          ].map(([t, i]) => (
            <div key={t} className="flex flex-col items-center gap-2 rounded-2xl p-4" style={{ background: T.tint }}>
              <Illo name={i as 'bookkeeping' | 'invoices'} size={64} />
              <span className="text-[12px] font-medium" style={{ color: T.ink }}>
                {t}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-[13px]" style={{ color: T.muted }}>
          Powerful accounting and invoicing tools to handle all of your financial admin
        </p>
        <p className="mt-4 text-center text-[26px] font-bold tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
          £0<span className="text-[14px] font-medium" style={{ color: T.muted }}>/month until</span>
        </p>
        <p className="text-center">
          <Pill tone="green">3 MONTHS FREE</Pill>
        </p>
        <p className="mt-2 text-center text-[13px]" style={{ color: T.muted }}>
          £22.99/month after free trial
        </p>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between px-4">
          <h3 className="text-[17px] font-semibold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
            Key features
          </h3>
          <span className="text-[13px] font-medium" style={{ color: T.primary }}>
            View all
          </span>
        </div>
        <Card>
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex gap-3 text-[13px] leading-snug" style={{ color: T.ink }}>
                <Check size={16} className="mt-0.5 shrink-0" style={{ color: T.green }} /> {f}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="mt-3 flex gap-3">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold" style={{ background: T.dangerTint, color: T.danger }}>
            !
          </span>
          <span>
            <span className="block text-[14px] font-medium" style={{ color: T.ink }}>
              CIS &amp; VAT Flat Rate Scheme
            </span>
            <span className="block text-[12px]" style={{ color: T.muted }}>
              Admin Extra isn’t available to CIS or VAT Flat Rate Scheme-registered businesses
            </span>
          </span>
        </Card>
        <Card className="mt-3" onTap={() => nav.toast('FAQ is not in this prototype')}>
          <span className="flex items-center justify-between text-[14px] font-medium" style={{ color: T.ink }}>
            Frequently asked questions <ChevronRight size={18} style={{ color: T.icon }} />
          </span>
        </Card>
      </div>

      <div className="mt-6 px-4">
        <div className="flex rounded-full border p-0.5" style={{ borderColor: T.border2, background: '#fff' }}>
          {(['Monthly', 'Annual'] as const).map((p) => (
            <Tap key={p} onTap={() => setPeriod(p)} className="flex-1 rounded-full py-1.5 text-center text-[13px] font-medium" style={{ background: period === p ? T.tint : 'transparent', color: period === p ? T.deep : T.muted }}>
              {p}
            </Tap>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[14px] font-medium" style={{ color: T.ink }}>
            What you’ll pay
          </span>
          <Pill tone="green">3 MONTHS FREE</Pill>
        </div>
        <div className="mt-2">
          <KeyValue
            rows={[
              ['Monthly fee until Jun 23 2024', '£0'],
              ['Monthly fee from July 23 2024', period === 'Monthly' ? '£22.99 + VAT' : '£229.90 + VAT /yr'],
            ]}
          />
        </div>
        <Tap onTap={() => setAgree((a) => !a)} className="mt-5 flex items-center gap-3 text-[14px]" style={{ color: T.ink }}>
          <span className="grid h-5 w-5 place-items-center rounded-md border-2" style={{ borderColor: agree ? T.primary : T.border2, background: agree ? T.primary : '#fff' }}>
            {agree && <Check size={12} color="#fff" strokeWidth={3} />}
          </span>
          I agree to the terms &amp; conditions
        </Tap>
        <div className="mt-4">
          <PrimaryButton
            onTap={() => {
              if (!agree) return nav.toast('Accept the terms to continue');
              nav.setFlag('trial', true);
              nav.go('processing');
            }}
          >
            Subscribe to Admin Extra
          </PrimaryButton>
        </div>
        <Tap onTap={() => nav.toast('Plan comparison is not in this prototype')} block className="mt-3 w-full py-2 text-center text-[14px] font-medium" style={{ color: T.primary }}>
          Explore other options
        </Tap>
      </div>
    </>
  );
}

/** "We're taking care of your accounts". Back returns to the (now unlocked) overview. */
export function ProcessingScreen({ nav, backTo }: { nav: Nav; backTo: string }) {
  return (
    <>
      <StatusBar />
      <div className="flex items-center gap-3 px-4 pb-3 pt-2">
        <Tap onTap={() => nav.home()} label="Back" className="-ml-1 grid h-9 w-9 place-items-center rounded-full" style={{ color: T.ink }}>
          <ChevronRight size={20} className="rotate-180" />
        </Tap>
        <span className="text-[15px] font-medium" style={{ color: T.ink }}>
          Go back to Tide Accounting
        </span>
      </div>
      <div className="flex flex-col items-center px-8 pt-16 text-center">
        <Illo name="accounting" size={160} plate />
        <h2 className="mt-8 text-[24px] font-bold leading-tight tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
          We’re taking care of your accounts
        </h2>
        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full" style={{ background: T.tint }}>
          <div className="h-full w-[62%] rounded-full" style={{ background: T.primary }} />
        </div>
        <p className="mt-2 text-[13px] font-medium" style={{ color: T.ink }}>
          62% complete
        </p>
        <p className="mt-4 text-[13px] leading-relaxed" style={{ color: T.muted }}>
          Sorry, this is taking longer than usual. We appreciate your patience. We’ll send you an email when everything is ready for you.
        </p>
        <div className="mt-8 w-full">
          <OutlineButton
            onTap={() => {
              nav.toast('Insights and key dates are now unlocked');
              nav.replace(backTo);
            }}
          >
            Open Tide Accounting
          </OutlineButton>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Insights (free, Q3 2024): charts visible, detail behind premium     */
/* ------------------------------------------------------------------ */

export function InsightsFreeScreen({ nav, routes, tabs }: { nav: Nav; routes: TabRoutes; tabs?: string[] }) {
  const metric = (title: string, value: string, delta: string, tone: string, trend: 'up' | 'down') => (
    <Card>
      <p className="text-[14px] font-medium" style={{ color: T.ink }}>
        {title}
      </p>
      <div className="flex items-baseline justify-between">
        <p className="text-[22px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
          {value}
        </p>
        <p className="text-[12px]" style={{ color: T.muted }}>
          {delta}
        </p>
      </div>
      <div className="relative mt-2">
        <LineChart tone={tone} trend={trend} blur />
        <Tap
          onTap={() => nav.go('paywall')}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-semibold shadow"
          style={{ color: T.primary }}
        >
          <span className="h-2 w-2 rounded-full" style={{ background: T.gold }} /> Subscribe to Premium <ChevronRight size={12} />
        </Tap>
      </div>
      <div className="mt-1 flex justify-between text-[10px]" style={{ color: T.muted }}>
        {['Apr', 'Jun', 'Aug', 'Oct', 'Dec', 'Feb', 'Mar'].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </Card>
  );
  return (
    <>
      <AccountingHeader nav={nav} active="Insights" routes={routes} tabs={tabs} />
      <div className="px-4 pt-4">
        <p className="text-[26px] font-bold tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
          £7,320
        </p>
        <p className="text-[12px]" style={{ color: T.muted }}>
          Cash balance
        </p>
      </div>
      <div className="mt-4 space-y-3">
        {metric('Net profit', '£50,320', '+4% vs previous period', T.primary, 'up')}
        {metric('Expenses', '£50,320', '+4% vs previous period', T.danger, 'down')}
        {metric('Revenue', '£50,320', '+4% vs previous period', T.green, 'up')}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Self Assessment estimate (free, Q3 2024)                            */
/* ------------------------------------------------------------------ */

export function SelfAssessmentScreen({ nav, routes, tabs }: { nav: Nav; routes: TabRoutes; tabs?: string[] }) {
  const trial = !!nav.flags.trial;
  return (
    <>
      <AccountingHeader nav={nav} active="Self Assessment" routes={routes} tabs={tabs} />
      <div className="mt-4 space-y-3">
        {!trial && <LockBanner title="Tax calculations and breakdowns" sub="Start free trial to unlock" onTap={() => nav.go('paywall')} />}
        <Card>
          <CardTitle action="View details" onAction={() => (trial ? nav.toast('Full breakdown is not in this prototype') : nav.go('paywall'))}>
            Self-assessment
          </CardTitle>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: T.dangerTint, color: T.danger }}>
              <Landmark size={18} />
            </span>
            <span className="flex-1 text-[14px]" style={{ color: T.ink }}>
              Upcoming estimate
            </span>
            <span className="text-[22px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
              £12,000
            </span>
          </div>
          <div className="mt-4 rounded-xl p-3" style={{ background: T.canvas }}>
            <KeyValue
              rows={[
                ['Submit before', '31 Dec 2026'],
                ['Tax period', '2025/2026'],
              ]}
            />
          </div>
          <div className="mt-4">
            {trial ? (
              <div className="rounded-xl p-3" style={{ background: T.canvas }}>
                <KeyValue
                  rows={[
                    ['Income', '£58,400'],
                    ['Allowable expenses', '£14,192'],
                    ['Taxable income', '£42,735'],
                    ['Tax due', '£12,000', 'danger'],
                  ]}
                />
              </div>
            ) : (
              <PrimaryButton onTap={() => nav.go('paywall')} icon={<span className="h-2 w-2 rounded-full" style={{ background: T.gold }} />}>
                Start free trial to view breakdown
              </PrimaryButton>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}

export { BODY };

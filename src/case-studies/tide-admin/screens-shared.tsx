/**
 * Screens that appear in more than one year: Tide Accounting overview,
 * transactions and bulk actions, the Admin Extra paywall and its edge cases,
 * processing and confirm-details, and the free insights / self assessment.
 */
import { useState } from 'react';
import { AlertTriangle, Check, ChevronDown, ChevronRight, CircleHelp, Download, FileText, Landmark, Receipt, Search, Tag, X } from 'lucide-react';
import { BIZ, CATEGORIES, CONFIRM_FIELDS, EXPENSES_BREAKDOWN, KEY_DATES, PLANS, REPORTS, SCORE, TX_1, TX_2, TX_DAY_1, TX_DAY_2, VAT_RATES, type Tx } from './data';
import { Illo } from './illustrations';
import { NavBar, StatusBar, Tap, type Nav } from './proto';
import { Card, CardTitle, Donut, GroupedBars, HEAD, KeyValue, Legend, LineChart, ListRow, LockBanner, OutlineButton, Pill, PrimaryButton, ScoreDial, T, TopTabs } from './ui';

/* ------------------------------------------------------------------ */
/* Tide Accounting header                                              */
/* ------------------------------------------------------------------ */

export const ACC_TABS = ['Overview', 'Insights', 'Bookkeeping', 'Self Assessment', 'VAT Manager'];
export type TabRoutes = Partial<Record<string, string>>;

export function AccountingHeader({ nav, active, routes, tabs = ACC_TABS }: { nav: Nav; active: string; routes: TabRoutes; tabs?: string[] }) {
  return (
    <>
      <StatusBar />
      <NavBar title="Tide Accounting" onBack={nav.home} />
      <TopTabs
        items={tabs}
        active={active}
        onChange={(t) => {
          const id = routes[t];
          if (!id) return nav.toast(`${t} isn't in this release yet`);
          if (id !== nav.current) nav.replace(id);
        }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Bookkeeping score                                                   */
/* ------------------------------------------------------------------ */

export function ScoreCard({ nav, onTransactions, extra }: { nav: Nav; onTransactions: () => void; extra?: boolean }) {
  const done = nav.flags.categorised && nav.flags.vatDone;
  const value = done ? 80 : nav.flags.categorised ? 55 : SCORE.value;
  return (
    <Card>
      <CardTitle right={<CircleHelp size={18} style={{ color: T.muted }} />}>Bookkeeping score</CardTitle>
      <ScoreDial value={value} />
      <div className="mt-1 text-center">
        <Pill tone={done ? 'green' : 'danger'}>{done ? 'ALMOST THERE' : SCORE.label}</Pill>
        <p className="mt-1.5 text-[11px]" style={{ color: T.muted }}>
          {done ? 'Complete your remaining tasks to reach 100%' : 'Complete tasks to improve'}
        </p>
      </div>
      <div className="-mx-4 mt-4 border-t" style={{ borderColor: T.border }}>
        <ListRow
          first
          title={done ? '14 items require your attention' : `${nav.flags.categorised ? SCORE.txMissingAfterFix : SCORE.txMissing} transactions are missing details`}
          sub="Add details to ensure your reports are accurate"
          onTap={onTransactions}
        />
        {extra && (
          <>
            <ListRow title={`${SCORE.invMissing} invoices are missing details`} sub="Add details to ensure your reports are accurate" onTap={() => nav.toast('Invoice details are not in this prototype')} />
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
/* Transactions, bulk actions, category and VAT pickers                */
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

type TxMode = 'browse' | 'category' | 'vat';

/** Resolves what a row shows after the bulk fixes the user has applied. */
function applyFixes(tx: Tx, i: number, flags: Record<string, boolean>): Tx {
  const cat = flags.categorised && i < 4;
  const vat = flags.vatDone;
  if (cat && vat) return { ...tx, missing: 'Fuel · 20% VAT', tag: undefined };
  if (cat) return { ...tx, missing: tx.missing.includes('VAT') ? 'Fuel · VAT missing' : 'Fuel · categorised', tag: tx.tag === 'Needs VAT' ? tx.tag : undefined };
  if (vat) return { ...tx, missing: tx.missing.replace('Category & VAT missing', 'Category missing · 20% VAT').replace('VAT missing', '20% VAT'), tag: tx.tag === 'Needs VAT' ? undefined : tx.tag };
  return tx;
}

/** Transactions filtered to "details missing". Bulk category and VAT fixes come from the sheet. */
export function TransactionsScreen({ nav, mode = 'browse' }: { nav: Nav; mode?: TxMode }) {
  const all = [...TX_1, ...TX_2];
  const [picked, setPicked] = useState<number[]>(mode === 'category' ? [0, 1, 2, 3] : mode === 'vat' ? [2, 4, 5, 7] : []);
  const select = mode !== 'browse';
  const done = nav.flags.categorised && nav.flags.vatDone;
  const toggle = (i: number) => setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
  const remaining = done ? 0 : nav.flags.categorised ? SCORE.txMissingAfterFix : SCORE.txMissing;

  const header = (
    <>
      <StatusBar />
      <NavBar title="Transactions" />
      <div className="flex gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {['Date range', 'Details missing · 2', 'Transaction type'].map((f, i) => (
          <span key={f} className="shrink-0 rounded-full border px-3 py-1 text-[12px] font-medium" style={i === 1 ? { background: T.tint, borderColor: T.tint, color: T.deep } : { borderColor: T.border2, color: T.ink }}>
            {f}
          </span>
        ))}
      </div>
    </>
  );

  if (done && !select) {
    return (
      <>
        {header}
        <div className="flex justify-end px-4 pb-2">
          <Tap onTap={() => nav.sheet('txActions')} className="text-[14px] font-semibold" style={{ color: T.primary }}>
            More actions
          </Tap>
        </div>
        <div className="flex flex-col items-center px-8 pt-10 text-center">
          <Illo name="taxes" size={150} plate />
          <h3 className="mt-6 text-[22px] font-bold tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
            Good job!
          </h3>
          <p className="mt-1 text-[13px]" style={{ color: T.muted }}>
            All of your items are managed.
          </p>
        </div>
        <Card className="mt-8" pad={false}>
          <ListRow first icon={<Landmark size={16} />} title="VAT payment or refund" sub="3 Nov 2021 · Vat payment or refund" right={<span className="text-[14px] font-semibold" style={{ fontFamily: HEAD, color: T.ink }}>£40.00</span>} onTap={() => nav.toast('Transaction detail is not in this prototype')} />
        </Card>
        <div className="mx-4 mt-8">
          <PrimaryButton onTap={() => nav.go('expenses')}>View Expense breakdown</PrimaryButton>
        </div>
      </>
    );
  }

  return (
    <>
      {header}
      <div className="flex items-center justify-between px-4 pb-2">
        <span className="text-[12px]" style={{ color: T.muted }}>
          {select ? `${picked.length} selected` : `${remaining} transactions need details`}
        </span>
        <Tap onTap={() => (mode === 'category' ? nav.go('category') : mode === 'vat' ? nav.go('vatRate') : nav.sheet('txActions'))} className="text-[14px] font-semibold" style={{ color: T.primary }}>
          {mode === 'category' ? 'Select category' : mode === 'vat' ? 'Select VAT rate' : 'More actions'}
        </Tap>
      </div>
      <div className="mx-4 overflow-hidden rounded-[20px] border bg-white" style={{ borderColor: T.border }}>
        <div className="flex justify-between px-4 py-2 text-[12px]" style={{ background: T.canvas, color: T.muted }}>
          <span>{TX_DAY_1.date}</span>
          <span>{TX_DAY_1.total}</span>
        </div>
        {all.slice(0, 4).map((tx, i) => (
          <TxRow key={i} tx={applyFixes(tx, i, nav.flags)} selectable={select} selected={picked.includes(i)} onTap={() => (select ? toggle(i) : nav.toast('Single transaction editing is not in this prototype'))} />
        ))}
        <div className="flex justify-between px-4 py-2 text-[12px]" style={{ background: T.canvas, color: T.muted }}>
          <span>{TX_DAY_2.date}</span>
          <span>{TX_DAY_2.total}</span>
        </div>
        {all.slice(4).map((tx, j) => {
          const i = 4 + j;
          return <TxRow key={i} tx={applyFixes(tx, i, nav.flags)} selectable={select} selected={picked.includes(i)} onTap={() => (select ? toggle(i) : nav.toast('Single transaction editing is not in this prototype'))} />;
        })}
      </div>
    </>
  );
}

export function TxActionsSheet({ nav }: { nav: Nav }) {
  const items = [
    { t: 'Add category', s: 'Categories help ensure reports and tax returns are accurate', i: <Tag size={18} />, go: 'txSelect' },
    { t: 'Add VAT rate', s: 'VAT rates help ensure reports and VAT Returns are accurate', i: <Landmark size={18} />, go: 'txVatSelect' },
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
          <ListRow key={c} first={i === 0} icon={<span className="h-5 w-5 rounded-md" style={{ background: CAT_TONES[i] }} />} title={c} right={pick === c ? <Check size={18} style={{ color: T.primary }} /> : <span className="h-[18px] w-[18px]" />} onTap={() => setPick(c)} />
        ))}
      </div>
      <div className="sticky bottom-28 mx-4 mt-4">
        <PrimaryButton onTap={() => (pick ? onSaved() : nav.toast('Pick a category first'))} className={pick ? '' : 'opacity-50'}>
          Save
        </PrimaryButton>
      </div>
    </>
  );
}

export function VatRateScreen({ nav, onSaved }: { nav: Nav; onSaved: () => void }) {
  const [pick, setPick] = useState<string | null>('20%');
  return (
    <>
      <StatusBar />
      <NavBar title="Select VAT rate" right={<X size={20} style={{ color: T.muted }} />} />
      <Card pad={false}>
        {VAT_RATES.map((r, i) => (
          <ListRow key={r.rate} first={i === 0} title={r.rate} sub={r.note} right={pick === r.rate ? <Check size={18} style={{ color: T.primary }} /> : <span className="h-[18px] w-[18px]" />} onTap={() => setPick(r.rate)} />
        ))}
      </Card>
      <p className="mt-3 px-6 text-center text-[12px]" style={{ color: T.muted }}>
        The rate applies to the 4 selected transactions.
      </p>
      <div className="mx-4 mt-6">
        <PrimaryButton onTap={onSaved}>Save</PrimaryButton>
      </div>
    </>
  );
}

/** Bulk-fix completion handlers, reused by every year. */
export const categoryDone = (nav: Nav) => {
  nav.setFlag('categorised', true);
  nav.back();
  nav.back();
  nav.toast('Category updated for 4 transactions');
};
export const vatDone = (nav: Nav) => {
  nav.setFlag('vatDone', true);
  nav.back();
  nav.back();
  nav.toast('VAT rate added to 4 transactions');
};

/* ------------------------------------------------------------------ */
/* Expenses breakdown (donut)                                          */
/* ------------------------------------------------------------------ */

export function ExpensesCard({ nav }: { nav: Nav }) {
  const e = EXPENSES_BREAKDOWN;
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <CardTitle>Expenses</CardTitle>
          <p className="-mt-2 text-[13px]" style={{ color: T.muted }}>
            You spent {e.total}
          </p>
        </div>
        <span className="text-[11px]" style={{ color: T.muted }}>
          {e.month}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-4">
        <Donut slices={e.cats.map((c) => [c.pct, c.color] as [number, string])} label={e.total} sub={e.month} />
        <ul className="space-y-1.5 text-[12px]" style={{ color: T.ink }}>
          {e.cats.map((c) => (
            <li key={c.name} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} /> {c.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <OutlineButton onTap={() => nav.go('expenses')}>View breakdown</OutlineButton>
      </div>
    </Card>
  );
}

export function ExpensesBreakdownScreen({ nav }: { nav: Nav }) {
  const e = EXPENSES_BREAKDOWN;
  return (
    <>
      <StatusBar />
      <NavBar title="Expenses" big />
      <div className="px-4">
        <p className="text-[13px]" style={{ color: T.muted }}>
          {e.month}
        </p>
        <p className="text-[28px] font-bold tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
          {e.total}
        </p>
        <p className="text-[12px]" style={{ color: T.danger }}>
          -4% vs previous period
        </p>
      </div>
      <div className="mt-4 flex justify-center">
        <Donut slices={e.cats.map((c) => [c.pct, c.color] as [number, string])} label={e.total} sub={e.month} size={180} />
      </div>
      <Card className="mt-4" pad={false}>
        {e.cats.map((c, i) => (
          <ListRow
            key={c.name}
            first={i === 0}
            icon={<span className="h-3 w-3 rounded-full" style={{ background: c.color }} />}
            title={c.name}
            sub={`${c.pct}% of spend`}
            right={<span className="text-[14px] font-semibold" style={{ fontFamily: HEAD, color: T.ink }}>{c.amount}</span>}
            onTap={() => nav.toast(c.name === 'Uncategorised' ? 'Categorise these in Bookkeeping tasks' : `${c.name} transactions are not in this prototype`)}
          />
        ))}
      </Card>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Freemium Tide Accounting overview (2024)                            */
/* ------------------------------------------------------------------ */

function ReportTiles({ nav, locked }: { nav: Nav; locked?: boolean }) {
  return (
    <section className="mt-4">
      <h3 className="px-4 text-[20px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
        Reports
      </h3>
      <p className="mb-3 px-4 text-[13px]" style={{ color: T.muted }}>
        Select which report you want to download. Your report will be emailed to you.
      </p>
      <div className="flex gap-2.5 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {REPORTS.map((t) => (
          <Tap key={t} onTap={() => nav.toast(locked ? 'Reports unlock with a trial' : `${t} report emailed to you`)} className="flex h-[84px] w-[88px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-2xl border bg-white text-center text-[12px] font-medium" style={{ borderColor: T.border, color: T.ink }}>
            <FileText size={18} style={{ color: T.primary }} />
            {t}
          </Tap>
        ))}
      </div>
    </section>
  );
}

function LockedInsight({ title, text, cta, illo, onTap }: { title: string; text: string; cta: string; illo: 'insights' | 'payroll'; onTap: () => void }) {
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

/**
 * Tide Accounting overview as shipped in the freemium releases.
 * States: locked (no trial) → pending (trial, details unconfirmed) → unlocked.
 */
export function OverviewFreeScreen({ nav, routes, tabs }: { nav: Nav; routes: TabRoutes; tabs?: string[] }) {
  const trial = !!nav.flags.trial;
  const confirmed = !!nav.flags.confirmed;
  const pending = trial && !confirmed;
  const unlocked = trial && confirmed;
  return (
    <>
      <AccountingHeader nav={nav} active="Overview" routes={routes} tabs={tabs} />
      {pending && (
        <Card className="mt-4 flex gap-3" onTap={() => nav.go('confirmDetails')}>
          <AlertTriangle size={18} className="mt-0.5 shrink-0" style={{ color: T.gold }} />
          <span>
            <span className="block text-[14px] font-medium" style={{ color: T.ink }}>
              Confirm your business details
            </span>
            <span className="block text-[12px]" style={{ color: T.muted }}>
              Please check these details so we can make sure your reports are accurate and you stay compliant
            </span>
            <span className="mt-1 block text-[13px] font-medium" style={{ color: T.primary }}>
              Confirm details
            </span>
          </span>
        </Card>
      )}
      <div className="px-4 pt-4">
        <p className="text-[12px]" style={{ color: T.muted }}>
          Current financial year
        </p>
        <span className="mt-1 inline-flex items-center gap-1 rounded-lg border bg-white px-2.5 py-1 text-[13px] font-medium" style={{ borderColor: T.border2, color: T.ink }}>
          {BIZ.fy} <ChevronDown size={14} />
        </span>
      </div>
      <ReportTiles nav={nav} locked={!unlocked} />
      <div className="mt-5 space-y-3">
        <ScoreCard nav={nav} onTransactions={() => nav.go('transactions')} />
        {unlocked ? (
          <Card>
            <CardTitle
              action="View"
              onAction={() => {
                // routes.Insights can point at the hard paywall in releases (Q2 2024) that
                // don't have a dedicated unlocked screen yet; don't send an already-paying
                // user back into it.
                if (routes.Insights && routes.Insights !== 'paywall') nav.replace(routes.Insights);
                else nav.toast('The full Insights page arrives in the next release');
              }}
            >
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
          <LockedInsight
            title="Profitability insights"
            text={pending ? 'Confirm your business details so we can generate accurate insights' : 'Sign up for a trial to unlock insights'}
            cta={pending ? 'Confirm details' : 'Start a trial'}
            illo="insights"
            onTap={() => nav.go(pending ? 'confirmDetails' : 'paywall')}
          />
        )}
        <ExpensesCard nav={nav} />
        {unlocked ? (
          <Card>
            <CardTitle action="View all" onAction={() => nav.toast('Key dates list is not in this prototype')}>
              Key dates
            </CardTitle>
            <div className="-mx-4 -mb-4">
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
                />
              ))}
            </div>
          </Card>
        ) : (
          <LockedInsight
            title="Key dates"
            text={pending ? 'We are pulling the key dates for your business. Confirm your details to speed this up.' : 'Sign up for a trial to see important dates and get reminders'}
            cta={pending ? 'Confirm details' : 'Start a trial'}
            illo="payroll"
            onTap={() => nav.go(pending ? 'confirmDetails' : 'paywall')}
          />
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
          {(
            [
              ['GUIDE', 'Completing your Self Assessment', 'taxes'],
              ['TRENDING', 'Sole Trader: Accounting basics', 'bookkeeping'],
            ] as const
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
    </>
  );
}

/** Short form that moves a trial from "processing" to "onboarded". */
export function ConfirmDetailsScreen({ nav }: { nav: Nav }) {
  const [vat, setVat] = useState(true);
  return (
    <>
      <StatusBar />
      <NavBar title="Confirm your details" />
      <p className="px-4 text-[13px]" style={{ color: T.muted }}>
        We use these to generate accurate reports and insights for {BIZ.name}.
      </p>
      <Card className="mt-4" pad={false}>
        {CONFIRM_FIELDS.map(([label, value], i) => (
          <ListRow key={label} first={i === 0} title={label} sub={value} right={<span className="text-[12px] font-medium" style={{ color: T.primary }}>Edit</span>} onTap={() => nav.toast(`${label} editing is not in this prototype`)} />
        ))}
        <Tap onTap={() => setVat((v) => !v)} block className="flex w-full items-center gap-3 border-t px-4 py-3.5 text-left" style={{ borderColor: T.border }}>
          <span className="flex-1">
            <span className="block text-[14px] font-medium" style={{ color: T.ink }}>
              VAT registered
            </span>
            <span className="block text-[12px]" style={{ color: T.muted }}>
              Needed for VAT returns and the VAT manager
            </span>
          </span>
          <span className="relative h-6 w-11 rounded-full transition-colors" style={{ background: vat ? T.primary : T.border2 }}>
            <span className="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all" style={{ left: vat ? 22 : 2 }} />
          </span>
        </Tap>
      </Card>
      <div className="mx-4 mt-6">
        <PrimaryButton
          onTap={() => {
            nav.setFlag('confirmed', true);
            nav.back();
            nav.toast('Details confirmed. Insights are ready.');
          }}
        >
          Confirm details
        </PrimaryButton>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Admin Extra paywall, plans, errors, processing                      */
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
          {(
            [
              ['Accounting Extra', 'bookkeeping'],
              ['Invoice Assistant', 'invoices'],
            ] as const
          ).map(([t, i]) => (
            <div key={t} className="flex flex-col items-center gap-2 rounded-2xl p-4" style={{ background: T.tint }}>
              <Illo name={i} size={64} />
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
          £0
          <span className="text-[14px] font-medium" style={{ color: T.muted }}>
            /month until
          </span>
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
          <Tap onTap={() => nav.toast('Full feature list is not in this prototype')} className="text-[13px] font-medium" style={{ color: T.primary }}>
            View all
          </Tap>
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
            <Tap key={p} onTap={() => setPeriod(p)} block className="flex-1 rounded-full py-1.5 text-center text-[13px] font-medium" style={{ background: period === p ? T.tint : 'transparent', color: period === p ? T.deep : T.muted }}>
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
        <Tap onTap={() => nav.go('adminPlans')} block className="mt-3 w-full py-2 text-center text-[14px] font-medium" style={{ color: T.primary }}>
          Explore other options
        </Tap>
      </div>
    </>
  );
}

/** Plan picker. Paying from the Tide balance fails on purpose, to show the error state. */
export function AdminPlansScreen({ nav }: { nav: Nav }) {
  const [plan, setPlan] = useState(PLANS[0].name);
  const [pay, setPay] = useState<'card' | 'balance'>('balance');
  return (
    <>
      <StatusBar />
      <NavBar title="Admin plans" />
      <Card pad={false}>
        {PLANS.map((p, i) => (
          <ListRow
            key={p.name}
            first={i === 0}
            title={p.name}
            sub={p.desc}
            right={
              <span className="text-right">
                <span className="block text-[14px] font-semibold" style={{ fontFamily: HEAD, color: T.ink }}>
                  {p.price}
                </span>
                <span className="mt-1 inline-block h-4 w-4 rounded-full border-2" style={{ borderColor: plan === p.name ? T.primary : T.border2, background: plan === p.name ? T.primary : '#fff' }} />
              </span>
            }
            onTap={() => setPlan(p.name)}
          />
        ))}
      </Card>
      <p className="mt-5 px-4 text-[14px] font-medium" style={{ color: T.ink }}>
        Pay with
      </p>
      <Card className="mt-2" pad={false}>
        <ListRow first title="Tide balance" sub="£12.40 available" right={<span className="inline-block h-4 w-4 rounded-full border-2" style={{ borderColor: pay === 'balance' ? T.primary : T.border2, background: pay === 'balance' ? T.primary : '#fff' }} />} onTap={() => setPay('balance')} />
        <ListRow title="Card ending 4421" sub="Visa · expires 09/27" right={<span className="inline-block h-4 w-4 rounded-full border-2" style={{ borderColor: pay === 'card' ? T.primary : T.border2, background: pay === 'card' ? T.primary : '#fff' }} />} onTap={() => setPay('card')} />
      </Card>
      <div className="mx-4 mt-6">
        <PrimaryButton
          onTap={() => {
            if (pay === 'balance') return nav.go('insufficientFunds');
            nav.setFlag('trial', true);
            nav.go('processing');
          }}
        >
          Continue with {plan}
        </PrimaryButton>
      </div>
    </>
  );
}

export function InsufficientFundsScreen({ nav }: { nav: Nav }) {
  return (
    <>
      <StatusBar />
      <NavBar title="Admin plans" />
      <div className="flex flex-col items-center px-8 pt-20 text-center">
        <div className="relative">
          <Illo name="invoices" size={150} plate />
          <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full border-4 border-white text-[16px] font-bold text-white" style={{ background: T.danger }}>
            !
          </span>
        </div>
        <p className="mt-8 text-[14px] leading-relaxed" style={{ color: T.ink }}>
          We couldn’t upgrade your plan as you don’t have sufficient funds in your account. Please add funds to your account.
        </p>
      </div>
      <div className="absolute inset-x-4 bottom-32">
        <PrimaryButton
          onTap={() => {
            nav.toast('Opens Payments to add funds');
            nav.back();
          }}
        >
          Add funds
        </PrimaryButton>
      </div>
    </>
  );
}

/** "We're taking care of your accounts". Leads back into the pending overview. */
export function ProcessingScreen({ nav, backTo }: { nav: Nav; backTo: string }) {
  return (
    <>
      <StatusBar />
      <div className="flex items-center gap-3 px-4 pb-3 pt-2">
        <Tap onTap={() => nav.replace(backTo)} label="Back" className="-ml-1 grid h-9 w-9 place-items-center rounded-full" style={{ color: T.ink }}>
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
          <OutlineButton onTap={() => nav.replace(backTo)}>Open Tide Accounting</OutlineButton>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Insights (free, Q3 2024)                                            */
/* ------------------------------------------------------------------ */

export function InsightsFreeScreen({ nav, routes, tabs }: { nav: Nav; routes: TabRoutes; tabs?: string[] }) {
  const unlocked = !!nav.flags.trial && !!nav.flags.confirmed;
  const metric = (title: string, value: string, delta: string, tone: string, trend: 'up' | 'down') => (
    <Card>
      <div className="flex items-start justify-between">
        <p className="text-[14px] font-medium" style={{ color: T.ink }}>
          {title}
        </p>
        {unlocked && (
          <Tap onTap={() => nav.toast('Drill-downs arrive in the 2025 redesign')} className="text-[13px] font-medium" style={{ color: T.primary }}>
            View details
          </Tap>
        )}
      </div>
      <div className="flex items-baseline justify-between">
        <p className="text-[22px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
          {value}
        </p>
        <p className="text-[12px]" style={{ color: T.muted }}>
          {delta}
        </p>
      </div>
      <div className="relative mt-2">
        <LineChart tone={tone} trend={trend} blur={!unlocked} />
        {!unlocked && (
          <Tap onTap={() => nav.go('paywall')} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-semibold shadow" style={{ color: T.primary }}>
            <span className="h-2 w-2 rounded-full" style={{ background: T.gold }} /> Subscribe to Premium <ChevronRight size={12} />
          </Tap>
        )}
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
          {BIZ.cash}
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
          <CardTitle action="View details" onAction={() => (trial ? nav.go('saDetails') : nav.go('paywall'))}>
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

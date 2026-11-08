/**
 * 2026: one Admin hub. Two personas share the screens:
 * a new member (free tier, trial prompts) and an established user (subscribed,
 * paying tax, tasks in flight). The persona arrives as initial flags.
 */
import { useState, type ReactNode } from 'react';
import { ArrowLeftRight, Camera, Check, ChevronRight, CreditCard, FileText, Landmark, LayoutGrid, Pencil, Plus, Receipt, Search, Send, UserRound, Wallet, X } from 'lucide-react';
import { BIZ, CARDS, CASHFLOW_2026, CUSTOMERS, INSIGHTS_2026, NET_PROFIT_6M, PAYMENTS_RECS, PAYROLL, SOFTWARE_OPTIONS, TASKS_2026, TAXES_PAYING } from './data';
import { Illo, type IlloName } from './illustrations';
import { NavBar, StatusBar, Tap, type Nav, type StageProto } from './proto';
import { QuickActions } from './screens-2025';
import { CategoryScreen, TransactionsScreen, TxActionsSheet, VatRateScreen, categoryDone, vatDone } from './screens-shared';
import { BODY, Card, CardTitle, DivergingBars, HEAD, KeyValue, LineChart, ListRow, LockBanner, OutlineButton, Pill, PrimaryButton, SectionTitle, SegmentTabs, T, TopTabs } from './ui';

export const PRODUCTS: { label: string; illo: IlloName; tone: string; go: string }[] = [
  { label: 'Taxes', illo: 'taxes', tone: '#F1EADB', go: 'taxes' },
  { label: 'Payroll', illo: 'payroll', tone: '#DCE6F4', go: 'payroll' },
  { label: 'Insights', illo: 'insights', tone: '#DDEDE4', go: 'insights' },
  { label: 'Bookkeeping', illo: 'bookkeeping', tone: '#E7E1F3', go: 'bookkeeping' },
  { label: 'Invoices & Bills', illo: 'invoices', tone: '#F0E4DC', go: 'invoices' },
  { label: 'Team cards', illo: 'expenses', tone: '#E2E7F6', go: 'teamCards' },
];

const isEst = (nav: Nav) => !!nav.flags.established;

/* ------------------------------------------------------------------ */
/* Admin home                                                          */
/* ------------------------------------------------------------------ */

function Home(nav: Nav) {
  const est = isEst(nav);
  const trial = !!nav.flags.trial;
  const answered = !!nav.flags.software;
  const tasks: [string, string, string, string][] = answered
    ? [
        ['Track your upcoming taxes', 'Estimate, save and submit on time', T.gold, 'taxes'],
        ['Send a professional invoice', 'Create, chase and get paid', '#D7C9F5', 'invoices'],
      ]
    : est
      ? [
          ['Tell us how you do accounting', 'So we know how to help best', T.light, 'accountingSoftware'],
          ['Upcoming £950 corporation tax', 'Estimate, save, and submit on time', T.gold, 'taxes'],
          ['Send an invoice', 'Create your first invoice', '#D7C9F5', 'invoices'],
        ]
      : [
          ['Tell us how you do accounting', 'So we know how to help best', T.light, 'accountingSoftware'],
          ['Send an invoice', 'Create your first invoice', '#D7C9F5', 'invoices'],
          ['Track your upcoming taxes', 'Estimate, save, and submit on time', T.gold, 'taxes'],
        ];
  const links = [
    { label: 'Synced bank accounts', icon: <Landmark size={20} />, go: 'payments' },
    { label: 'Manage integrations', icon: <ArrowLeftRight size={20} />, go: 'bookkeeping' },
    { label: 'Invite your accountant', icon: <UserRound size={20} />, go: '' },
  ];
  return (
    <>
      <StatusBar ios />
      <div className="flex items-center justify-between px-4 pt-3 pb-4">
        <h1 className="text-[28px] font-bold leading-none tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
          Admin
        </h1>
        <Tap onTap={() => nav.toast('Profile is outside this prototype')} className="grid h-9 w-9 place-items-center rounded-full border-4 bg-white text-[12px] font-semibold" style={{ borderColor: T.tint, color: T.deep }}>
          {BIZ.owner}
        </Tap>
      </div>
      <section className="border-t pt-4" style={{ borderColor: T.border }}>
        <SectionTitle action="View all" onAction={() => nav.sheet('products')}>
          {answered ? 'Tools' : 'Products'}
        </SectionTitle>
        <div className="flex gap-2.5 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {PRODUCTS.map((p) => (
            <Tap key={p.label} onTap={() => nav.go(p.go)} className="w-[96px] shrink-0 flex-col overflow-hidden rounded-2xl border bg-white" style={{ borderColor: T.border }}>
              <span className="grid h-[66px] w-full place-items-center" style={{ background: p.tone }}>
                <Illo name={p.illo} size={60} />
              </span>
              <span className="block w-full truncate px-1 py-2.5 text-center text-[10px] font-medium uppercase tracking-[0.06em]" style={{ color: T.ink }}>
                {p.label}
              </span>
            </Tap>
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-1" aria-hidden="true">
          <span className="h-1 w-3 rounded-full" style={{ background: T.deep }} />
          <span className="h-1 w-10 rounded-full" style={{ background: T.tint }} />
        </div>
      </section>

      {!trial && !est && (
        <Tap onTap={() => nav.go('toolkit')} block className="mx-4 mt-5 flex w-[calc(100%-32px)] items-center overflow-hidden rounded-[20px] border bg-white text-left" style={{ borderColor: T.border }}>
          <span className="grid h-[72px] w-[72px] shrink-0 place-items-center" style={{ background: T.tint }}>
            <Illo name="accounting" size={60} />
          </span>
          <span className="flex-1 px-3">
            <span className="block text-[14px] font-medium" style={{ color: T.ink }}>
              Get the best experience
            </span>
            <span className="block text-[13px] font-medium" style={{ color: T.primary }}>
              Activate accounting free trial ›
            </span>
          </span>
          <X size={16} className="mr-3" style={{ color: T.muted }} />
        </Tap>
      )}

      {answered && (
        <Tap onTap={() => nav.go('payroll')} block className="mx-4 mt-5 flex w-[calc(100%-32px)] overflow-hidden rounded-[20px] border bg-white text-left" style={{ borderColor: T.border }}>
          <span className="grid w-[110px] shrink-0 place-items-center" style={{ background: '#DCE6F4' }}>
            <Illo name="payroll" size={84} />
          </span>
          <span className="relative flex-1 p-4 pr-8">
            <Pill tone="green">NEW</Pill>
            <span className="mt-1.5 block text-[15px] font-semibold leading-tight tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
              Automate and run your own payroll
            </span>
            <span className="block text-[12px] leading-snug" style={{ color: T.muted }}>
              No accountant or extra software needed.
            </span>
            <span className="mt-2 block text-[12px] font-medium" style={{ color: T.primary }}>
              Learn more ›
            </span>
          </span>
        </Tap>
      )}

      <Card className="mt-5">
        <CardTitle action="View all" onAction={() => nav.go('tasks')}>
          {answered ? 'Upcoming tasks' : 'Your tasks'}
        </CardTitle>
        <ul>
          {tasks.map(([title, sub, bar, go]) => (
            <li key={title}>
              <Tap onTap={() => nav.go(go)} block className="flex w-full items-center gap-3 py-2 text-left">
                <span className="h-11 w-1 shrink-0 rounded-full" style={{ background: bar }} />
                <span className="flex-1">
                  <span className="block text-[14px] font-medium" style={{ color: T.ink }}>
                    {title}
                  </span>
                  <span className="block text-[12px]" style={{ color: T.muted }}>
                    {sub}
                  </span>
                </span>
                <ChevronRight size={18} style={{ color: T.icon }} />
              </Tap>
            </li>
          ))}
        </ul>
      </Card>
      <QuickActions
        items={[
          { label: 'Create invoice', icon: <FileText size={20} />, onTap: () => nav.go('selectCustomer') },
          { label: 'Upload bill', icon: <Receipt size={20} />, onTap: () => nav.toast('Bill upload is not in this prototype') },
          { label: 'Snap receipt', icon: <Camera size={20} />, onTap: () => nav.toast('Camera is not in this prototype') },
          { label: 'More actions', icon: <LayoutGrid size={20} />, onTap: () => nav.sheet('products') },
        ]}
      />
      <Card className="mt-6" pad={false}>
        {links.map((l, i) => (
          <ListRow key={l.label} first={i === 0} icon={l.icon} title={l.label} onTap={() => (l.go ? nav.go(l.go) : nav.toast('Accountant invites are not in this prototype'))} />
        ))}
      </Card>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Accounting software question                                        */
/* ------------------------------------------------------------------ */

function AccountingSoftware(nav: Nav) {
  const [pick, setPick] = useState(SOFTWARE_OPTIONS[0]);
  const logos = ['tide', 'X', 'F', 'S', '…'];
  return (
    <>
      <StatusBar ios />
      <NavBar title="Accounting software" />
      <div className="px-4">
        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
          Tell us how you do accounting, are you using any software?
        </h2>
        <p className="mt-2 text-[13px]" style={{ color: T.muted }}>
          If you’re not using one we can help you get the hang of the basics without an accountant.
        </p>
      </div>
      <Card className="mt-4" pad={false}>
        {SOFTWARE_OPTIONS.map((o, i) => (
          <ListRow
            key={o}
            first={i === 0}
            icon={<span className="text-[11px] font-bold" style={{ color: T.primary }}>{logos[i]}</span>}
            title={o}
            right={<span className="grid h-5 w-5 place-items-center rounded-full border-2" style={{ borderColor: pick === o ? T.primary : T.border2 }}>{pick === o && <span className="h-2.5 w-2.5 rounded-full" style={{ background: T.primary }} />}</span>}
            onTap={() => setPick(o)}
          />
        ))}
      </Card>
      <div className="mx-4 mt-8">
        <PrimaryButton
          onTap={() => {
            nav.setFlag('software', true);
            nav.back();
            nav.toast(pick === SOFTWARE_OPTIONS[0] ? 'We’ll start you on the basics' : `We’ll connect ${pick} next`);
          }}
        >
          Next
        </PrimaryButton>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Taxes: free → trial, or paying (established)                        */
/* ------------------------------------------------------------------ */

function Taxes(nav: Nav) {
  if (isEst(nav)) return <TaxesPaying nav={nav} />;
  if (nav.flags.trial) return <TaxesTrial nav={nav} />;
  return (
    <>
      <StatusBar ios />
      <NavBar title="Taxes" big />
      <div className="space-y-3">
        <TaxAccountPromo nav={nav} />
        <LockBanner title="Tax calculations and breakdowns" sub="Start free trial to unlock" onTap={() => nav.go('toolkit')} />
        <Card>
          <CardTitle action="View all" onAction={() => nav.toast('Corporation tax history is not in this prototype')}>
            Corporation tax
          </CardTitle>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: T.dangerTint, color: T.danger }}>
              <Landmark size={18} />
            </span>
            <span className="flex-1 text-[14px]" style={{ color: T.ink }}>
              Upcoming estimate
            </span>
            <span className="text-[22px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
              £0.00
            </span>
          </div>
          <div className="mt-4 rounded-xl p-3" style={{ background: T.canvas }}>
            <KeyValue
              rows={[
                ['Submit before', '31 Dec 2025'],
                ['Tax period', '2024/2025'],
              ]}
            />
          </div>
          <div className="mt-4">
            <PrimaryButton onTap={() => nav.go('toolkit')} icon={<span className="h-2 w-2 rounded-full" style={{ background: T.gold }} />}>
              Start free trial to view breakdown
            </PrimaryButton>
          </div>
        </Card>
        <Card>
          <CardTitle action="View all" onAction={() => nav.toast('VAT history is not in this prototype')}>
            VAT returns
          </CardTitle>
          <div className="flex flex-col items-center gap-3">
            <Illo name="bookkeeping" size={88} plate />
            <p className="text-center text-[13px]" style={{ color: T.muted }}>
              Track your VAT return amounts, due dates and file all your submissions directly to HMRC.
            </p>
            <OutlineButton onTap={() => nav.toast('HMRC connection is not in this prototype')}>Connect to HMRC</OutlineButton>
          </div>
        </Card>
      </div>
    </>
  );
}

/** Warm gold treatment: distinct from the periwinkle cards around it, and keeps the
 *  growth illustration's dark ink marks legible (a dark card would swallow them). */
function TaxAccountPromo({ nav }: { nav: Nav }) {
  return (
    <div
      className="mx-4 flex items-center gap-3 rounded-[20px] border p-4"
      style={{ background: 'linear-gradient(135deg, #FDF1D6 0%, #FBE3B4 100%)', borderColor: '#F2DBA2' }}
    >
      <div className="flex-1">
        <p className="text-[15px] font-semibold leading-snug tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
          Save for tax season with your dedicated tax account
        </p>
        <p className="mt-1 text-[12px]" style={{ color: '#8A6B2E' }}>
          Set money aside, track goals, and pay HMRC directly.
        </p>
        <Tap
          onTap={() => nav.toast('Tax account is not in this prototype')}
          block
          className="mt-3 flex h-9 items-center justify-center rounded-full bg-white px-4 text-[13px] font-semibold"
          style={{ color: T.ink, width: 'fit-content' }}
        >
          Open tax account
        </Tap>
      </div>
      <Illo name="growth" size={76} />
    </div>
  );
}

function TaxesTrial({ nav }: { nav: Nav }) {
  return (
    <>
      <StatusBar ios />
      <NavBar title="Taxes" big />
      <div className="space-y-3">
        <TaxAccountPromo nav={nav} />
        <div className="mx-4 overflow-hidden rounded-[20px] border bg-white" style={{ borderColor: T.border }}>
          <ListRow first icon={<span className="text-center text-[10px] font-semibold leading-tight">JAN<br />09</span>} title="Corporate tax £9,500 for 24/25" sub="Due in 5 months" onTap={() => nav.toast('Payment plan is not in this prototype')} />
        </div>
        <Card>
          <div className="flex items-baseline justify-between">
            <p className="text-[18px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
              Net profit/loss
            </p>
            <p className="text-[18px] font-bold" style={{ fontFamily: HEAD, color: T.green }}>
              £50,000
            </p>
          </div>
          <Tap onTap={() => nav.go('insights')} className="mt-1 gap-0.5 text-[13px] font-medium" style={{ color: T.primary }}>
            See Profit &amp; Loss report <ChevronRight size={14} />
          </Tap>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-[14px] font-medium" style={{ color: T.ink }}>
              Adjustments
            </p>
            <Tap onTap={() => nav.toast('Editing adjustments is not in this prototype')} className="gap-1 text-[13px] font-medium" style={{ color: T.primary }}>
              <Pencil size={13} /> Edit
            </Tap>
          </div>
          <div className="mt-2">
            <KeyValue
              rows={[
                ['Capital Allowances', '£0'],
                ['Depreciation', '£0'],
              ]}
            />
          </div>
          <div className="mt-4 flex items-baseline justify-between border-t pt-4" style={{ borderColor: T.border }}>
            <p className="text-[18px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
              Taxable income
            </p>
            <p className="text-[18px] font-bold" style={{ fontFamily: HEAD, color: T.green }}>
              £50,000
            </p>
          </div>
          <div className="mt-4 flex justify-between text-[12px]" style={{ color: T.muted }}>
            <span>Tax bands</span>
            <span>Tax to pay</span>
          </div>
          <div className="mt-2">
            <KeyValue
              rows={[
                ['Small (19%) up to £50,000', '£9,500'],
                ['Marginal (26.5%) to £250,000', '£0'],
              ]}
            />
          </div>
          <p className="mt-3 rounded-xl p-3 text-[12px] leading-snug" style={{ background: T.canvas, color: T.muted }}>
            If you reach a profit of over £250,000, the full amount gets taxed at 25%
          </p>
          <div className="mt-4 flex items-baseline justify-between border-t pt-4" style={{ borderColor: T.border }}>
            <div>
              <p className="text-[18px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
                Tax due to date
              </p>
              <p className="text-[12px]" style={{ color: T.muted }}>
                Avg. rate 19%
              </p>
            </div>
            <p className="text-[18px] font-bold" style={{ fontFamily: HEAD, color: T.danger }}>
              £9,500
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}

function TaxesPaying({ nav }: { nav: Nav }) {
  return (
    <>
      <StatusBar ios />
      <NavBar title="Taxes" big />
      <div className="space-y-3">
        {TAXES_PAYING.map((t) => (
          <Card key={t.title}>
            <CardTitle action="View all" onAction={() => nav.toast(`${t.title} history is not in this prototype`)}>
              {t.title}
            </CardTitle>
            <div className="-mx-4">
              <ListRow first icon={<Landmark size={16} />} title="Upcoming return" sub={t.when} right={<span className="text-[14px] font-semibold" style={{ fontFamily: HEAD, color: T.danger }}>{t.due}</span>} onTap={() => nav.toast('Return detail is not in this prototype')} />
              <ListRow icon={<span className="grid h-7 w-7 place-items-center rounded-full text-[8px] font-bold text-white" style={{ background: t.tone }}>{t.title.startsWith('VAT') ? 'VAT' : 'TAX'}</span>} title={t.account} sub={t.rules} right={<span className="text-[14px] font-semibold" style={{ fontFamily: HEAD, color: T.ink }}>{t.saved}</span>} onTap={() => nav.toast('Saving rules are not in this prototype')} />
            </div>
            <div className="mt-3 rounded-xl p-3" style={{ background: T.canvas }}>
              <div className="flex justify-between text-[11px] font-medium" style={{ color: T.ink }}>
                <span>{t.saved} saved</span>
                <span style={{ color: T.muted }}>{t.left}</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full" style={{ background: T.tint }}>
                <div className="h-full rounded-full" style={{ width: `${t.pct}%`, background: t.tone }} />
              </div>
            </div>
            <div className="mt-3">
              <OutlineButton onTap={() => nav.toast('Submission runs through HMRC in this version')}>Review and submit</OutlineButton>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Tide Tools: toolkit / subscription page                             */
/* ------------------------------------------------------------------ */

function Toolkit(nav: Nav) {
  const est = isEst(nav);
  const feats = ['Keep a bookkeeping score and task list', 'Smart categorisation and extract data', 'Real-time cash flow & profitability insights'];
  return (
    <>
      <StatusBar ios />
      <NavBar title="Tide Tools" />
      <div className="px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[24px] font-bold tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
            {est ? 'Bookkeeping, Insights & Tax' : 'Accounting'}
          </h2>
          <Pill tone="green">{est ? '2 MONTHS FREE' : '3 MONTHS FREE'}</Pill>
        </div>
        <p className="mt-1 text-[14px]" style={{ color: T.muted }}>
          <span className="font-semibold" style={{ color: T.ink }}>
            {est ? '£5.99/month' : '£21.99/month'}
          </span>{' '}
          after the trial
        </p>
      </div>
      <div className="mt-4 space-y-3">
        <Card pad={false}>
          {feats.map((f, i) => (
            <ListRow key={f} first={i === 0} icon={<Check size={16} style={{ color: T.green }} />} title={f} right={<span />} />
          ))}
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <CardTitle>You’ll love this</CardTitle>
            <Pill tone="green">Active</Pill>
          </div>
          <p className="-mt-2 text-[13px]" style={{ color: T.muted }}>
            Save time by leaving your bookkeeping to us. We’ll keep your score up to date.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              ['20%', 'of your transactions have all required details'],
              ['80%', 'is your current bookkeeping score'],
            ].map(([v, l]) => (
              <div key={v} className="rounded-xl p-3" style={{ background: T.canvas }}>
                <p className="text-[24px] font-bold tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
                  {v}
                </p>
                <p className="text-[11px] leading-snug" style={{ color: T.muted }}>
                  {l}
                </p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardTitle action="View all" onAction={() => nav.toast('Insights unlock with the trial')}>
            Tool insights
          </CardTitle>
          <div className="relative overflow-hidden rounded-xl" style={{ background: T.canvas }}>
            <div className="p-4 blur-sm">
              <Illo name="insights" size={120} className="mx-auto block" />
            </div>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold shadow" style={{ color: T.primary }}>
              Start trial to view
            </span>
          </div>
        </Card>
      </div>
      <div className="mx-4 mt-5">
        <PrimaryButton
          onTap={() => {
            nav.setFlag('trial', true);
            nav.toast('You have successfully started your trial');
            nav.replace(nav.flags.from === undefined ? 'taxes' : 'taxes');
          }}
        >
          Start 2-month free trial
        </PrimaryButton>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Insights: empty concept → subscribed, cash flow, 6-month net profit */
/* ------------------------------------------------------------------ */

function ReportTiles3({ nav }: { nav: Nav }) {
  return (
    <div className="grid grid-cols-3 gap-2.5 px-4">
      {['Profit & Loss', 'Balance Sheet', 'Trial Balance'].map((t) => (
        <Tap key={t} onTap={() => nav.toast(`${t} report emailed to you`)} className="flex-col items-center justify-center gap-1.5 rounded-2xl border bg-white py-4 text-center text-[12px] font-medium" style={{ borderColor: T.border, color: T.ink }}>
          <FileText size={18} style={{ color: T.primary }} />
          {t}
        </Tap>
      ))}
    </div>
  );
}

function Insights(nav: Nav) {
  const unlocked = !!nav.flags.trial || isEst(nav);
  return (
    <>
      <StatusBar ios />
      <NavBar title="Insights" big />
      <div className="space-y-3">
        {!unlocked && <LockBanner title="Financial insights and reports" sub="Start free trial to unlock breakdowns" onTap={() => nav.go('toolkit')} />}
        <ReportTiles3 nav={nav} />
        {unlocked ? (
          <>
            <Card>
              <CardTitle action="View details" onAction={() => nav.go(INSIGHTS_2026.cash.go)}>
                {INSIGHTS_2026.cash.title}
              </CardTitle>
              <div className="flex items-end justify-between gap-4">
                <p className="text-[26px] font-bold tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
                  {INSIGHTS_2026.cash.value}
                </p>
                <div className="w-[140px]">
                  <LineChart tone={T.primary} trend="up" height={44} />
                </div>
              </div>
            </Card>
            {INSIGHTS_2026.rows.map((r) => (
              <Card key={r.title}>
                <CardTitle action="View details" onAction={() => nav.go(r.go)}>
                  {r.title}
                </CardTitle>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="-mt-2 text-[11px]" style={{ color: T.danger }}>
                      {r.delta}
                    </p>
                    <p className="text-[24px] font-bold tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
                      {r.value}
                    </p>
                  </div>
                  <span className="flex h-[44px] items-end gap-1.5" aria-hidden="true">
                    {[30, 38, 26, 34, 44].map((h, i) => (
                      <span key={i} className="w-2.5 rounded-sm" style={{ height: h, background: i === 4 ? r.tone : '#D9DCEC' }} />
                    ))}
                  </span>
                </div>
              </Card>
            ))}
          </>
        ) : (
          INSIGHTS_2026.empty.map((t) => (
            <Card key={t}>
              <div className="flex items-center justify-between">
                <p className="text-[14px] font-medium" style={{ color: T.ink }}>
                  {t}
                </p>
                <span className="h-2 w-2 rounded-full" style={{ background: T.gold }} />
              </div>
              <div className="mt-2 flex flex-col items-center gap-2">
                <span className="flex h-[70px] items-end gap-2" aria-hidden="true">
                  {[18, 34, 50, 66].map((h, i) => (
                    <span key={i} className="w-6 rounded-sm" style={{ height: h, background: ['#9AA5F0', '#2BB5A0', '#7ACEC5', T.deep][i] }} />
                  ))}
                </span>
                <p className="text-center text-[12px]" style={{ color: T.muted }}>
                  You’ll see your insights here after you make some transactions
                </p>
                <OutlineButton onTap={() => nav.go('payments')}>Explore</OutlineButton>
              </div>
            </Card>
          ))
        )}
        <Card onTap={() => nav.toast('Data sources are not in this prototype')}>
          <span className="flex items-center justify-between text-[14px] font-medium" style={{ color: T.ink }}>
            Data sources &amp; access <ChevronRight size={18} style={{ color: T.icon }} />
          </span>
        </Card>
      </div>
    </>
  );
}

function CashBars() {
  const c = CASHFLOW_2026;
  return (
    <svg viewBox="0 0 320 130" className="block w-full" aria-hidden="true">
      {[0, 30, 60, 90].map((y) => (
        <line key={y} x1="0" x2="290" y1={110 - y} y2={110 - y} stroke={T.border} />
      ))}
      {['£0', '£2K', '£6K', '£10K'].map((l, i) => (
        <text key={l} x="305" y={114 - i * 30} fontSize="8" fill={T.muted} textAnchor="middle" fontFamily={BODY}>
          {l}
        </text>
      ))}
      {c.series.map(([inn, out], i) => {
        const x0 = 14 + i * 48;
        return (
          <g key={i}>
            {i === c.series.length - 1 && <rect x={x0 - 8} y="8" width="46" height="112" rx="6" fill={T.tint} />}
            <rect x={x0} y={110 - inn * 1.5} width="12" height={inn * 1.5} rx="2" fill="#2BB5A0" />
            <rect x={x0 + 16} y={110 - out * 1.5} width="12" height={out * 1.5} rx="2" fill="#F8B985" />
            <text x={x0 + 14} y="126" fontSize="8" fill={T.muted} textAnchor="middle" fontFamily={BODY}>
              {c.months[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function CashFlow(nav: Nav) {
  const c = CASHFLOW_2026;
  return (
    <>
      <StatusBar ios />
      <NavBar title="Cash Flow" big />
      <div className="flex gap-2 px-4">
        {['All Accounts', '6M', 'Balance'].map((f) => (
          <Tap key={f} onTap={() => nav.toast(`${f} filter is not in this prototype`)} className="gap-1 rounded-full border bg-white px-3 py-1 text-[12px] font-medium" style={{ borderColor: T.border2, color: T.ink }}>
            {f} <ChevronRight size={12} className="rotate-90" />
          </Tap>
        ))}
      </div>
      <div className="mt-4 px-4">
        <p className="text-[28px] font-bold tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
          {c.balance}
        </p>
        <p className="text-[12px]" style={{ color: T.muted }}>
          {c.label}
        </p>
        <div className="mt-2 flex gap-4 text-[12px]" style={{ color: T.ink }}>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#2BB5A0' }} /> {c.incomings}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#F8B985' }} /> {c.outgoings}
          </span>
        </div>
      </div>
      <Card className="mt-3">
        <CashBars />
      </Card>
      <Card className="mt-3 flex items-center gap-3">
        <Illo name="bookkeeping" size={56} plate />
        <span className="flex-1">
          <span className="block text-[14px] font-semibold" style={{ fontFamily: HEAD, color: T.ink }}>
            {c.tasks}
          </span>
          <span className="block text-[12px]" style={{ color: T.muted }}>
            Complete tasks to increase accuracy of your reports
          </span>
          <span className="mt-2 block">
            <OutlineButton onTap={() => nav.go('tasks')}>Complete tasks</OutlineButton>
          </span>
        </span>
      </Card>
      <Card className="mt-3" pad={false}>
        <div className="flex items-center justify-between px-4 pt-4">
          <p className="text-[14px] font-medium" style={{ color: T.ink }}>
            Transactions
          </p>
          <Tap onTap={() => nav.go('transactions')} className="text-[13px] font-medium" style={{ color: T.primary }}>
            View All
          </Tap>
        </div>
        <div className="mt-2">
          {[
            ['Facebook for Business', 'Marketing', '£50.00'],
            ['AMZ LTD', 'Stock', '£1,000.40'],
            ['Amazon', 'Office supplies', '£124.40'],
          ].map(([n, cat, a], i) => (
            <ListRow key={n} first={i === 0} icon={<Receipt size={16} />} title={n} sub={cat} right={<span className="text-[14px] font-semibold" style={{ fontFamily: HEAD, color: T.ink }}>{a}</span>} onTap={() => nav.toast('Transaction detail is not in this prototype')} />
          ))}
        </div>
      </Card>
      <Card className="mt-3">
        <p className="text-[14px] font-medium" style={{ color: T.ink }}>
          About Cash Flow
        </p>
        <p className="mt-2 text-[13px] leading-relaxed" style={{ color: T.muted }}>
          Cash Flow is the net amount of money going in and out of your business during a specific period. Positive cash flow means you can afford to meet your obligations, like paying bills and salaries.
        </p>
      </Card>
    </>
  );
}

function NetProfit6m(nav: Nav) {
  const [range, setRange] = useState('6M');
  return (
    <>
      <StatusBar ios />
      <NavBar title="Net Profit" big />
      <div className="flex gap-2 px-4">
        {['All Accounts', range, 'Balance'].map((f) => (
          <Tap key={f} onTap={() => nav.toast(`${f} filter is not in this prototype`)} className="gap-1 rounded-full border bg-white px-3 py-1 text-[12px] font-medium" style={{ borderColor: T.border2, color: T.ink }}>
            {f} <ChevronRight size={12} className="rotate-90" />
          </Tap>
        ))}
      </div>
      <div className="mt-4 px-4">
        <p className="text-[18px] font-bold leading-snug tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
          {NET_PROFIT_6M.headline}
        </p>
        <p className="mt-1 text-[12px]" style={{ color: T.green }}>
          {NET_PROFIT_6M.sub}
        </p>
      </div>
      <Card className="mt-3">
        <DivergingBars height={150} />
        <div className="mt-3">
          <SegmentTabs items={['1W', '1M', '6M', '1Y']} active={range} onChange={setRange} />
        </div>
      </Card>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Invoices, customers, Invoice Assistant                              */
/* ------------------------------------------------------------------ */

function Invoices(nav: Nav) {
  const [tab, setTab] = useState('Invoices');
  const ia = !!nav.flags.ia;
  const est = isEst(nav);
  const sent = !!nav.flags.invoiced;
  return (
    <>
      <StatusBar ios />
      <NavBar title="Invoices & Bills" big />
      <TopTabs items={['Invoices', 'Bills', 'Manage']} active={tab} onChange={(t) => (t === 'Invoices' ? setTab(t) : nav.toast(`${t} tab is not in this prototype`))} />
      <div className="mt-4 space-y-3">
        {est && !nav.flags.vatNumber && (
          <Card className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style={{ background: T.tint, color: T.primary }}>
              <Landmark size={16} />
            </span>
            <span className="flex-1">
              <span className="block text-[14px] font-medium" style={{ color: T.ink }}>
                Add your VAT number
              </span>
              <span className="block text-[12px]" style={{ color: T.muted }}>
                Update your VAT number (if applicable) in the Template page
              </span>
              <span className="mt-2 flex gap-4">
                <Tap onTap={() => { nav.setFlag('vatNumber', true); nav.toast('VAT number added to your template'); }} className="text-[12px] font-semibold" style={{ color: T.primary }}>
                  Add now
                </Tap>
                <Tap onTap={() => nav.setFlag('vatNumber', true)} className="text-[12px] font-medium" style={{ color: T.muted }}>
                  Dismiss
                </Tap>
              </span>
            </span>
          </Card>
        )}
        {ia ? (
          <Card className="flex items-center gap-3">
            <Illo name="invoices" size={44} />
            <span className="flex-1 text-[14px] font-medium" style={{ color: T.ink }}>
              Invoice Assistant is on. Unlimited invoices, automatic chasing.
            </span>
          </Card>
        ) : (
          <LockBanner title={`${sent ? 1 : 0}/3 free invoices or quotes used`} sub="Upgrade to get unlimited invoices" onTap={() => nav.go('invoiceAssistant')} />
        )}
        <SegmentTabs items={['Invoices', 'Quotes']} active="Invoices" onChange={(v) => v !== 'Invoices' && nav.toast('Quotes are not in this prototype')} />
        <Card pad={false}>
          <ListRow first icon={<Plus size={18} />} title="Create new invoice" onTap={() => nav.go('selectCustomer')} />
        </Card>
        {sent ? (
          <Card pad={false}>
            <div className="flex items-center justify-between px-4 pt-4">
              <p className="text-[14px] font-medium" style={{ color: T.ink }}>
                Outstanding
              </p>
              <Tap onTap={() => nav.toast('Full list is not in this prototype')} className="text-[13px] font-medium" style={{ color: T.primary }}>
                View all
              </Tap>
            </div>
            <div className="mt-2">
              <ListRow first icon={<FileText size={16} />} title={nav.flags.customer ? 'Joe Bloggs' : 'New customer'} sub="Inv. 1001 · Sent today" right={<span className="text-[14px] font-semibold" style={{ fontFamily: HEAD, color: T.green }}>+£2,000.00</span>} onTap={() => nav.toast('Invoice detail is not in this prototype')} />
            </div>
          </Card>
        ) : (
          <div className="flex flex-col items-center px-8 pt-8 text-center">
            <Illo name="invoices" size={140} plate />
            <h3 className="mt-5 text-[20px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
              {est ? 'You’re all up to date' : 'Create your first invoice'}
            </h3>
            <p className="mt-1 text-[13px]" style={{ color: T.muted }}>
              {est ? 'No outstanding invoices' : 'Looks like you haven’t created any invoices yet'}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

function SelectCustomer(nav: Nav) {
  return (
    <>
      <StatusBar ios />
      <NavBar title="Create new invoice" />
      <div className="mx-4 mb-3 flex items-center gap-2 rounded-xl border bg-white px-3 py-2.5 text-[14px]" style={{ borderColor: T.border2, color: T.muted }}>
        <Search size={16} /> Search
      </div>
      <Card pad={false}>
        <ListRow first icon={<Plus size={18} />} title="Add new customer" onTap={() => nav.toast('Customer form is not in this prototype')} />
      </Card>
      <p className="mt-5 px-4 text-[14px] font-medium" style={{ color: T.ink }}>
        Recent customers
      </p>
      <Card className="mt-2" pad={false}>
        {CUSTOMERS.map(([n, e], i) => (
          <ListRow
            key={n}
            first={i === 0}
            icon={<span className="text-[11px] font-bold">{n[0]}</span>}
            title={n}
            sub={e}
            right={<Pill>CUSTOMER</Pill>}
            onTap={() => {
              nav.setFlag('invoiced', true);
              nav.setFlag('customer', true);
              nav.replace('invoices');
              nav.toast(`Invoice for £2,000 sent to ${n}`);
            }}
          />
        ))}
      </Card>
    </>
  );
}

function InvoiceAssistant(nav: Nav) {
  const rows: [string, string, string][] = [
    ['No. of invoices or quotes per month', 'Unlimited', '3 free per month'],
    ['Invoice templates', 'Premium templates', '1 simple default'],
    ['Chasing payments', 'Automatic', 'Manual'],
    ['Payment matching', 'Automatic', 'Manual'],
    ['Receipts for customers', 'Available', 'Not available'],
    ['Invoice creation', 'One-click with cloning', 'From scratch every time'],
  ];
  return (
    <>
      <StatusBar ios />
      <NavBar title="Invoice Assistant" />
      <div className="flex flex-col items-center px-6 text-center">
        <Illo name="invoices" size={120} plate />
        <h2 className="mt-4 text-[22px] font-bold leading-tight tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
          Unlock Invoice Assistant for just £5.99/month
        </h2>
        <p className="mt-2 text-[13px]" style={{ color: T.muted }}>
          Send unlimited invoices or quotes, get paid faster and save time through automation
        </p>
      </div>
      <p className="mt-6 px-4 text-[14px] font-medium" style={{ color: T.ink }}>
        Key features
      </p>
      <Card className="mt-2" pad={false}>
        <div className="grid grid-cols-[1.3fr_1fr_1fr] gap-2 border-b px-4 py-2.5 text-[11px] font-medium" style={{ borderColor: T.border, color: T.muted }}>
          <span>Features</span>
          <span style={{ color: T.primary }}>Invoice Assistant</span>
          <span>Free plan</span>
        </div>
        {rows.map(([f, a, b]) => (
          <div key={f} className="grid grid-cols-[1.3fr_1fr_1fr] gap-2 border-b px-4 py-3 text-[11px] leading-snug last:border-b-0" style={{ borderColor: T.border, color: T.ink }}>
            <span className="font-medium">{f}</span>
            <span style={{ color: T.primary }}>{a}</span>
            <span style={{ color: T.muted }}>{b}</span>
          </div>
        ))}
      </Card>
      <Card className="mt-3" onTap={() => nav.toast('FAQ is not in this prototype')}>
        <span className="flex items-center justify-between text-[14px] font-medium" style={{ color: T.ink }}>
          Frequently asked questions <ChevronRight size={18} style={{ color: T.icon }} />
        </span>
      </Card>
      <div className="mx-4 mt-5">
        <PrimaryButton
          onTap={() => {
            nav.setFlag('ia', true);
            nav.back();
            nav.toast('Invoice Assistant activated');
          }}
        >
          Subscribe to Invoice Assistant
        </PrimaryButton>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Payroll, Team cards, Bookkeeping                                    */
/* ------------------------------------------------------------------ */

function Payroll(nav: Nav) {
  return (
    <>
      <StatusBar ios />
      <NavBar title="Payroll" big />
      <div className="space-y-3">
        <Card>
          <div className="flex items-center justify-between">
            <CardTitle>Tide Payroll</CardTitle>
            <Pill tone="green">{PAYROLL.price}</Pill>
          </div>
          <div className="-mt-1 flex flex-col items-center gap-3">
            <Illo name="payroll" size={120} plate />
            <p className="text-center text-[13px]" style={{ color: T.muted }}>
              {PAYROLL.blurb}
            </p>
            <OutlineButton onTap={() => nav.toast('Payroll pricing page is not in this prototype')}>Learn more</OutlineButton>
          </div>
        </Card>
        {PAYROLL.groups.map((g) => (
          <Card key={g.title} pad={false}>
            <div className="flex items-center justify-between px-4 pt-4">
              <p className="text-[16px] font-semibold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
                {g.title}
              </p>
              <Pill>{g.steps.length} STEPS</Pill>
            </div>
            <div className="mt-2">
              {g.steps.map(([t, s], i) => (
                <ListRow key={t} first={i === 0} icon={<span className="h-5 w-1 rounded-full" style={{ background: i ? '#D7C9F5' : T.light }} />} title={t} sub={s} onTap={() => nav.toast(`${t} is not in this prototype`)} />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function TeamCards(nav: Nav) {
  return (
    <>
      <StatusBar ios />
      <NavBar title="Expense cards" big />
      <div className="space-y-3">
        <Card pad={false}>
          <p className="px-4 pt-4 text-[16px] font-semibold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
            My cards
          </p>
          <div className="mt-2">
            {CARDS.map((c, i) => (
              <ListRow key={c.number} first={i === 0} icon={<CreditCard size={16} />} title={c.name} sub={<span>{c.number} · <Pill tone="green">{c.status}</Pill></span>} onTap={() => nav.toast('Card controls are not in this prototype')} />
            ))}
          </div>
          <div className="px-4 pb-4">
            <OutlineButton icon={<Plus size={14} />} onTap={() => nav.toast('Card ordering is not in this prototype')}>
              Order a new card
            </OutlineButton>
          </div>
        </Card>
        <p className="px-4 pt-2 text-[16px] font-semibold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
          Team Expense Cards
        </p>
        <Tap onTap={() => nav.toast('Team cards onboarding is not in this prototype')} block className="mx-4 flex w-[calc(100%-32px)] overflow-hidden rounded-[20px] border bg-white text-left" style={{ borderColor: T.border }}>
          <span className="grid w-[120px] shrink-0 place-items-center py-3" style={{ background: T.tint }}>
            <Illo name="expenses" size={96} />
          </span>
          <span className="relative flex-1 p-4 pr-8">
            <X size={16} className="absolute right-3 top-3" style={{ color: T.muted }} />
            <Pill tone="green">NEW</Pill>
            <span className="mt-1.5 block text-[15px] font-semibold leading-tight tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
              Give your team Expense Cards
            </span>
            <span className="block text-[12px] leading-snug" style={{ color: T.muted }}>
              Empower your staff and simplify how you manage your business expenses
            </span>
            <span className="mt-2 block text-[12px] font-medium" style={{ color: T.primary }}>
              Explore now ›
            </span>
          </span>
        </Tap>
      </div>
    </>
  );
}

function Bookkeeping(nav: Nav) {
  const fixed = nav.flags.categorised && nav.flags.vatDone;
  return (
    <>
      <StatusBar ios />
      <NavBar title="Bookkeeping" big />
      <div className="space-y-3">
        <Card>
          <CardTitle>Auto categorised</CardTitle>
          <div className="flex flex-col items-center gap-3">
            <Illo name="bookkeeping" size={88} plate />
            <p className="text-center text-[13px]" style={{ color: T.muted }}>
              {fixed ? '4 transactions were categorised automatically from your fixes' : 'You’ll see automatically categorised transactions here after you make some'}
            </p>
            <OutlineButton onTap={() => nav.toast(fixed ? 'All approved' : 'Nothing to approve yet')}>Review and approve</OutlineButton>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <CardTitle>Missing details</CardTitle>
            <span className="text-[12px]" style={{ color: T.muted }}>
              {fixed ? '8 transactions' : '12 transactions'}
            </span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Illo name="taxes" size={88} plate />
            <p className="text-center text-[13px]" style={{ color: T.muted }}>
              Add categories and VAT so your reports and tax estimates stay accurate
            </p>
            <OutlineButton onTap={() => nav.go('transactions')}>Add missing details</OutlineButton>
          </div>
        </Card>
        <Card pad={false}>
          <ListRow first icon={<ArrowLeftRight size={16} />} title="Manage accounting connecter" sub="1 team member onboard" onTap={() => nav.toast('Connector settings are not in this prototype')} />
          <ListRow icon={<Wallet size={16} />} title="Bookkeeping settings" sub="Settings and integrations" onTap={() => nav.toast('Settings are not in this prototype')} />
        </Card>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Tasks                                                               */
/* ------------------------------------------------------------------ */

function Tasks(nav: Nav) {
  const [tab, setTab] = useState('Urgent');
  const set = isEst(nav) ? TASKS_2026.established : TASKS_2026.fresh;
  const list = (set as Record<string, string[][]>)[tab] ?? [];
  const tones = [T.light, '#D7C9F5', T.gold, T.green, T.danger, T.primary];
  return (
    <>
      <StatusBar ios />
      <NavBar title="Tasks" big />
      <SegmentTabs items={['Urgent', 'Upcoming', 'Completed']} active={tab} onChange={setTab} />
      {list.length ? (
        <Card className="mt-4" pad={false}>
          {list.map(([t, s, go], i) => (
            <ListRow
              key={t}
              first={i === 0}
              icon={tab === 'Completed' ? <Check size={16} style={{ color: T.green }} /> : <span className="h-5 w-1 rounded-full" style={{ background: tones[i % tones.length] }} />}
              title={t}
              sub={<span style={{ color: /Due in 1 day|Due in 3 days/.test(s) ? T.danger : T.muted }}>{s}</span>}
              onTap={() => (go ? nav.go(go) : nav.toast('This task opens outside Admin'))}
            />
          ))}
        </Card>
      ) : (
        <div className="flex flex-col items-center px-8 pt-12 text-center">
          <Illo name="taxes" size={110} plate />
          <p className="mt-4 text-[13px]" style={{ color: T.muted }}>
            Nothing here yet.
          </p>
        </div>
      )}
      <div className="absolute bottom-32 right-5">
        <Tap onTap={() => nav.toast('Custom tasks are not in this prototype')} className="gap-2 rounded-full px-5 py-3 text-[14px] font-semibold text-white shadow-lg" style={{ background: T.primary }}>
          <Plus size={16} /> Add task
        </Tap>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Payments tab (empty state) and products sheet                       */
/* ------------------------------------------------------------------ */

function Payments(nav: Nav) {
  return (
    <>
      <StatusBar ios />
      <div className="flex items-center justify-between px-4 pt-3 pb-4">
        <h1 className="text-[28px] font-bold leading-none tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
          Payments
        </h1>
        <span className="grid h-9 w-9 place-items-center rounded-full border-4 bg-white text-[12px] font-semibold" style={{ borderColor: T.tint, color: T.deep }}>
          {BIZ.owner}
        </span>
      </div>
      <SegmentTabs items={['Accounts', 'Cards']} active="Accounts" onChange={(v) => v === 'Cards' && nav.go('teamCards')} />
      <Card className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-[13px]" style={{ color: T.muted }}>
            Main business account
          </p>
          <Tap onTap={() => nav.toast('Account details are not in this prototype')} className="text-[12px] font-medium" style={{ color: T.primary }}>
            Details
          </Tap>
        </div>
        <p className="mt-1 text-[32px] font-bold tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
          £0.00
        </p>
      </Card>
      <QuickActions
        items={[
          { label: 'Send', icon: <Send size={20} />, onTap: () => nav.toast('Payments flow is outside Admin') },
          { label: 'Get paid', icon: <Wallet size={20} />, onTap: () => nav.go('invoices') },
          { label: 'Card Reader', icon: <CreditCard size={20} />, onTap: () => nav.toast('Card reader is outside Admin') },
          { label: 'Cards', icon: <CreditCard size={20} />, onTap: () => nav.go('teamCards') },
        ]}
      />
      <Card className="mt-6 flex items-center gap-3">
        <span className="flex-1">
          <span className="block text-[15px] font-semibold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
            Add money to use your account
          </span>
          <span className="block text-[12px]" style={{ color: T.muted }}>
            Transfer funds from your other accounts to Tide
          </span>
          <span className="mt-3 block">
            <OutlineButton onTap={() => nav.toast('Top-up is outside Admin')}>Add money</OutlineButton>
          </span>
        </span>
        <Illo name="growth" size={64} />
      </Card>
      <p className="mt-6 px-4 text-[16px] font-semibold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
        Recommended to you
      </p>
      <div className="mt-3 flex gap-3 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PAYMENTS_RECS.map((r) => (
          <Tap key={r.title} onTap={() => (r.go ? nav.go(r.go) : nav.toast('Outside Admin'))} className="w-[160px] shrink-0 flex-col items-start overflow-hidden rounded-2xl border bg-white text-left" style={{ borderColor: T.border }}>
            <span className="grid h-[80px] w-full place-items-center" style={{ background: T.tint }}>
              <Illo name={r.illo as IlloName} size={56} />
            </span>
            <span className="block p-3">
              <span className="block text-[13px] font-medium leading-snug" style={{ color: T.ink }}>
                {r.title}
              </span>
              <span className="block text-[11px]" style={{ color: T.muted }}>
                {r.sub}
              </span>
            </span>
          </Tap>
        ))}
      </div>
      <Card className="mt-5" onTap={() => nav.go('toolkit')}>
        <span className="block text-[16px] font-bold leading-tight tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
          Get 2 months of Tide Accounting for free
        </span>
        <span className="mt-1 block text-[13px]" style={{ color: T.muted }}>
          Everything you need to run your business. On us.
        </span>
        <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold" style={{ color: T.primary }}>
          Get started for free <ChevronRight size={14} />
        </span>
      </Card>
    </>
  );
}

function ProductsSheet(nav: Nav) {
  const all = [...PRODUCTS, { label: 'CO2 tracker', illo: 'growth' as IlloName, tone: '#E0ECE8', go: 'co2' }];
  return (
    <div className="px-4">
      <h3 className="mb-3 text-[20px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
        Admin products
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {all.map((p) => (
          <Tap key={p.label} onTap={() => nav.go(p.go)} className="flex-col overflow-hidden rounded-2xl border bg-white" style={{ borderColor: T.border }}>
            <span className="grid h-[66px] w-full place-items-center" style={{ background: p.tone }}>
              <Illo name={p.illo} size={56} />
            </span>
            <span className="block w-full truncate px-1 py-2 text-center text-[11px] font-medium" style={{ color: T.ink }}>
              {p.label}
            </span>
          </Tap>
        ))}
      </div>
    </div>
  );
}

function Co2(nav: Nav) {
  return (
    <>
      <StatusBar ios />
      <NavBar title="CO2 tracker" big />
      <Card>
        <div className="flex flex-col items-center gap-3 py-2">
          <Illo name="growth" size={120} plate />
          <p className="text-center text-[13px]" style={{ color: T.muted }}>
            Estimated emissions from your spending, by category. Free with your account.
          </p>
          <OutlineButton onTap={() => nav.toast('Footprint report is not in this prototype')}>See your footprint</OutlineButton>
        </div>
      </Card>
    </>
  );
}

/* ------------------------------------------------------------------ */

export const PROTO_2026: StageProto = {
  tabs: ['Payments', 'Admin', 'Finance', 'Support'],
  screens: {
    home: Home,
    accountingSoftware: AccountingSoftware,
    taxes: Taxes,
    toolkit: Toolkit,
    insights: Insights,
    cashFlow: CashFlow,
    netProfit6m: NetProfit6m,
    invoices: Invoices,
    selectCustomer: SelectCustomer,
    invoiceAssistant: InvoiceAssistant,
    payroll: Payroll,
    teamCards: TeamCards,
    bookkeeping: Bookkeeping,
    tasks: Tasks,
    payments: Payments,
    co2: Co2,
    transactions: (nav) => <TransactionsScreen nav={nav} />,
    txSelect: (nav) => <TransactionsScreen nav={nav} mode="category" />,
    txVatSelect: (nav) => <TransactionsScreen nav={nav} mode="vat" />,
    category: (nav) => <CategoryScreen nav={nav} onSaved={() => categoryDone(nav)} />,
    vatRate: (nav) => <VatRateScreen nav={nav} onSaved={() => vatDone(nav)} />,
    expenses: CashFlow,
  },
  sheets: { products: ProductsSheet, txActions: (nav) => <TxActionsSheet nav={nav} /> },
};

export type { ReactNode };

/** 2026: one Admin hub. Every product reachable free, with a clear upgrade path. */
import { useState } from 'react';
import { ArrowLeftRight, Camera, Check, ChevronRight, FileText, Landmark, LayoutGrid, Pencil, Plus, Receipt, UserRound, X } from 'lucide-react';
import { Illo, type IlloName } from './illustrations';
import { NavBar, StatusBar, Tap, type Nav, type StageProto } from './proto';
import { QuickActions } from './screens-2025';
import { Card, CardTitle, HEAD, KeyValue, ListRow, LockBanner, OutlineButton, Pill, PrimaryButton, SectionTitle, SegmentTabs, T, TopTabs } from './ui';

export const PRODUCTS: { label: string; illo: IlloName; tone: string; go: string }[] = [
  { label: 'Taxes', illo: 'taxes', tone: '#F1EADB', go: 'taxes' },
  { label: 'Payroll', illo: 'payroll', tone: '#DCE6F4', go: 'payroll' },
  { label: 'Insights', illo: 'insights', tone: '#DDEDE4', go: 'insights' },
  { label: 'Bookkeeping', illo: 'bookkeeping', tone: '#E7E1F3', go: 'bookkeeping' },
  { label: 'Invoices & Bills', illo: 'invoices', tone: '#F0E4DC', go: 'invoices' },
  { label: 'Team cards', illo: 'expenses', tone: '#E2E7F6', go: 'teamCards' },
];

function Home(nav: Nav) {
  const tasks = [
    { title: 'Tell us how you do accounting', sub: 'So we know how to help best', bar: T.light, go: 'toolkit' },
    { title: 'Send an invoice', sub: 'Create your first invoice', bar: '#D7C9F5', go: 'invoices' },
    { title: 'Track your upcoming taxes', sub: 'Estimate, save, and submit on time', bar: T.gold, go: 'taxes' },
  ];
  const links = [
    { label: 'Synced bank accounts', icon: <Landmark size={20} /> },
    { label: 'Manage integrations', icon: <ArrowLeftRight size={20} /> },
    { label: 'Invite your accountant', icon: <UserRound size={20} /> },
  ];
  const trial = !!nav.flags.trial;
  return (
    <>
      <StatusBar ios />
      <div className="flex items-center justify-between px-4 pt-3 pb-4">
        <h1 className="text-[28px] font-bold leading-none tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
          Admin
        </h1>
        <span className="grid h-9 w-9 place-items-center rounded-full border-4 bg-white text-[12px] font-semibold" style={{ borderColor: T.tint, color: T.deep }}>
          JB
        </span>
      </div>
      <section className="border-t pt-4" style={{ borderColor: T.border }}>
        <SectionTitle action="View all" onAction={() => nav.sheet('products')}>
          Products
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
      {!trial && (
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
      <Card className="mt-5">
        <CardTitle action="View all" onAction={() => nav.go('tasks')}>
          Your tasks
        </CardTitle>
        <ul>
          {tasks.map((t) => (
            <li key={t.title}>
              <Tap onTap={() => nav.go(t.go)} block className="flex w-full items-center gap-3 py-2 text-left">
                <span className="h-11 w-1 shrink-0 rounded-full" style={{ background: t.bar }} />
                <span className="flex-1">
                  <span className="block text-[14px] font-medium" style={{ color: T.ink }}>
                    {t.title}
                  </span>
                  <span className="block text-[12px]" style={{ color: T.muted }}>
                    {t.sub}
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
          { label: 'Create invoice', icon: <FileText size={20} />, onTap: () => nav.go('invoices') },
          { label: 'Upload bill', icon: <Receipt size={20} />, onTap: () => nav.toast('Bill upload is not in this prototype') },
          { label: 'Snap receipt', icon: <Camera size={20} />, onTap: () => nav.toast('Camera is not in this prototype') },
          { label: 'More actions', icon: <LayoutGrid size={20} />, onTap: () => nav.sheet('products') },
        ]}
      />
      <Card className="mt-6" pad={false}>
        {links.map((l, i) => (
          <ListRow key={l.label} first={i === 0} icon={l.icon} title={l.label} onTap={() => nav.toast(`${l.label} is not in this prototype`)} />
        ))}
      </Card>
    </>
  );
}

/* ---------- Taxes ---------- */

function Taxes(nav: Nav) {
  const trial = !!nav.flags.trial;
  if (trial) return <TaxesTrial nav={nav} />;
  return (
    <>
      <StatusBar ios />
      <NavBar title="Taxes" big />
      <div className="space-y-3">
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
        <Card className="flex items-center gap-3">
          <span className="flex-1">
            <span className="block text-[15px] font-semibold leading-snug tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
              Save for tax season with your dedicated tax account
            </span>
            <span className="mt-1 block text-[12px]" style={{ color: T.muted }}>
              Set money aside, track goals, and pay HMRC directly.
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

function TaxesTrial({ nav }: { nav: Nav }) {
  return (
    <>
      <StatusBar ios />
      <NavBar title="Taxes" big />
      <div className="space-y-3">
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
          <Tap onTap={() => nav.toast('P&L report is not in this prototype')} className="mt-1 gap-0.5 text-[13px] font-medium" style={{ color: T.primary }}>
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

/* ---------- Tide Tools: Accounting toolkit page ---------- */

function Toolkit(nav: Nav) {
  const feats = ['Keep a bookkeeping score and task list', 'Smart categorisation and extract data', 'Real-time cash flow & profitability insights'];
  return (
    <>
      <StatusBar ios />
      <NavBar title="Tide Tools" />
      <div className="px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[26px] font-bold tracking-[-0.03em]" style={{ fontFamily: HEAD, color: T.ink }}>
            Accounting
          </h2>
          <Pill tone="green">3 MONTHS FREE</Pill>
        </div>
        <p className="mt-1 text-[14px]" style={{ color: T.muted }}>
          <span className="font-semibold" style={{ color: T.ink }}>
            £21.99/month
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
            nav.replace('taxes');
          }}
        >
          Start 2-month free trial
        </PrimaryButton>
      </div>
    </>
  );
}

/* ---------- Invoices & Bills (free) + Invoice Assistant ---------- */

function Invoices(nav: Nav) {
  const [tab, setTab] = useState('Invoices');
  const ia = !!nav.flags.ia;
  return (
    <>
      <StatusBar ios />
      <NavBar title="Invoices & Bills" big />
      <TopTabs items={['Invoices', 'Bills', 'Manage']} active={tab} onChange={(t) => (t === 'Invoices' ? setTab(t) : nav.toast(`${t} tab is not in this prototype`))} />
      <div className="mt-4 space-y-3">
        {ia ? (
          <Card className="flex items-center gap-3">
            <Illo name="invoices" size={44} />
            <span className="flex-1 text-[14px] font-medium" style={{ color: T.ink }}>
              Invoice Assistant is on. Unlimited invoices, automatic chasing.
            </span>
          </Card>
        ) : (
          <LockBanner title="0/3 free invoices or quotes" sub="Upgrade to get unlimited invoices" onTap={() => nav.go('invoiceAssistant')} />
        )}
        <SegmentTabs items={['Invoices', 'Quotes']} active="Invoices" onChange={(v) => v !== 'Invoices' && nav.toast('Quotes are not in this prototype')} />
        <Card pad={false}>
          <ListRow first icon={<Plus size={18} />} title="Create new invoice" onTap={() => nav.toast('Invoice editor is not in this prototype')} />
        </Card>
        <div className="flex flex-col items-center px-8 pt-8 text-center">
          <Illo name="invoices" size={140} plate />
          <h3 className="mt-5 text-[20px] font-bold tracking-[-0.02em]" style={{ fontFamily: HEAD, color: T.ink }}>
            Create your first invoice
          </h3>
          <p className="mt-1 text-[13px]" style={{ color: T.muted }}>
            Looks like you haven’t created any invoices yet
          </p>
        </div>
      </div>
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

/* ---------- Tasks ---------- */

function Tasks(nav: Nav) {
  const [tab, setTab] = useState('Urgent');
  const urgent = [
    ['Send an invoice', 'Create, chase and get paid', 'invoices'],
    ['Tell us how you do accounting', 'So we know how to help best', 'toolkit'],
    ['Track your upcoming taxes', 'Estimate, save and submit on time', 'taxes'],
  ];
  const upcoming = [
    ['Submit VAT return', 'Due 7 Aug', 'taxes'],
    ['Review payroll', 'Runs on the 25th', 'payroll'],
  ];
  const list = tab === 'Urgent' ? urgent : upcoming;
  return (
    <>
      <StatusBar ios />
      <NavBar title="Tasks" big />
      <SegmentTabs items={['Urgent', 'Upcoming']} active={tab} onChange={setTab} />
      <Card className="mt-4" pad={false}>
        {list.map(([t, s, go], i) => (
          <ListRow key={t} first={i === 0} icon={<span className="h-5 w-1 rounded-full" style={{ background: [T.light, '#D7C9F5', T.gold][i % 3] }} />} title={t} sub={s} onTap={() => nav.go(go)} />
        ))}
      </Card>
      <div className="absolute bottom-32 right-5">
        <Tap onTap={() => nav.toast('Custom tasks are not in this prototype')} className="gap-2 rounded-full px-5 py-3 text-[14px] font-semibold text-white shadow-lg" style={{ background: T.primary }}>
          <Plus size={16} /> Add task
        </Tap>
      </div>
    </>
  );
}

/* ---------- Generic free-tier product page ---------- */

function ProductFree({ nav, title, illo, lock, lockSub, blurb, cta }: { nav: Nav; title: string; illo: IlloName; lock: string; lockSub: string; blurb: string; cta: string }) {
  return (
    <>
      <StatusBar ios />
      <NavBar title={title} big />
      <div className="space-y-3">
        <LockBanner title={lock} sub={lockSub} onTap={() => nav.go('toolkit')} />
        <Card>
          <div className="flex flex-col items-center gap-3 py-2">
            <Illo name={illo} size={120} plate />
            <p className="text-center text-[13px]" style={{ color: T.muted }}>
              {blurb}
            </p>
            <OutlineButton onTap={() => nav.toast(`${cta} is not in this prototype`)}>{cta}</OutlineButton>
          </div>
        </Card>
      </div>
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

export const PROTO_2026: StageProto = {
  tabs: ['Payments', 'Admin', 'Finance', 'Support'],
  screens: {
    home: Home,
    taxes: Taxes,
    toolkit: Toolkit,
    invoices: Invoices,
    invoiceAssistant: InvoiceAssistant,
    tasks: Tasks,
    payroll: (nav) => <ProductFree nav={nav} title="Payroll" illo="payroll" lock="Run payroll for your team" lockSub="Start free trial to unlock" blurb="Pay your team, file RTI with HMRC and keep payslips in one place." cta="Add your first employee" />,
    insights: (nav) => <ProductFree nav={nav} title="Insights" illo="insights" lock="Financial insights and reports" lockSub="Start free trial to unlock" blurb="Live revenue, expenses and net profit, with drill-downs by month." cta="See demo insights" />,
    bookkeeping: (nav) => <ProductFree nav={nav} title="Bookkeeping" illo="bookkeeping" lock="Keep your books in order" lockSub="Start free trial to unlock" blurb="Smart categorisation, receipt matching and a bookkeeping score." cta="Categorise 19 transactions" />,
    teamCards: (nav) => <ProductFree nav={nav} title="Team cards" illo="expenses" lock="Expense cards for your team" lockSub="Order cards for free" blurb="Give staff their own cards with limits, and see spend as it happens." cta="Order a card" />,
    co2: (nav) => <ProductFree nav={nav} title="CO2 tracker" illo="growth" lock="Track your carbon footprint" lockSub="Free with your account" blurb="Estimated emissions from your spending, by category." cta="See your footprint" />,
  },
  sheets: { products: ProductsSheet },
};

export { Landmark, Receipt };

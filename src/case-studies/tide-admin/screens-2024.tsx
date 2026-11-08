/** 2024: freemium. Q2 gives the score away and sells insights; Q3 gives insights and the tax estimate away too. */
import { ChevronRight, CircleHelp, FileText } from 'lucide-react';
import { StatusBar, type Nav, type StageProto } from './proto';
import { AdminHeader, ExploreMore, InvoicesBillsEmpty, TeamExpenses } from './screens-2023';
import {
  CategoryScreen,
  InsightsFreeScreen,
  OverviewFreeScreen,
  PaywallScreen,
  ProcessingScreen,
  SelfAssessmentScreen,
  TransactionsScreen,
  TxActionsSheet,
} from './screens-shared';
import { Card, CardTitle, HEAD, ListRow, OutlineButton, Pill, ScoreDial, SectionTitle, T, Tap as _Tap } from './ui-tap';

void _Tap;

/* ---------- Q2 2024: first freemium release ---------- */

const TABS_Q2 = ['Overview', 'Insights', 'Bookkeeping tasks', 'Self Assessment'];
const ROUTES_Q2 = { Overview: 'overview', 'Bookkeeping tasks': 'transactions' };

function HomeQ2(nav: Nav) {
  return (
    <>
      <StatusBar />
      <AdminHeader />
      <section className="mt-2">
        <SectionTitle more>Accounting</SectionTitle>
        <Card>
          <CardTitle right={<CircleHelp size={18} style={{ color: T.muted }} />}>Bookkeeping score</CardTitle>
          <ScoreDial value={40} />
          <div className="mt-1 text-center">
            <Pill tone="danger">NEEDS WORK</Pill>
            <p className="mt-1.5 text-[11px]" style={{ color: T.muted }}>
              Complete tasks to increase your score
            </p>
          </div>
          <div className="-mx-4 mt-4 border-t" style={{ borderColor: T.border }}>
            <ListRow first title="19 transactions are missing details" sub="Add details to ensure your reports are accurate" onTap={() => nav.go('transactions')} />
          </div>
          <div className="mt-3">
            <OutlineButton onTap={() => nav.go('overview')}>Open Accounting</OutlineButton>
          </div>
        </Card>
      </section>
      <ExploreMore nav={nav} />
      <InvoicesBillsEmpty nav={nav} />
      <TeamExpenses nav={nav} />
    </>
  );
}

const category = (nav: Nav) => (
  <CategoryScreen
    nav={nav}
    onSaved={() => {
      nav.setFlag('categorised', true);
      nav.back();
      nav.back();
      nav.toast('Category updated for 4 transactions');
    }}
  />
);

export const PROTO_Q2_2024: StageProto = {
  tabs: ['Payments', 'Admin', 'Finance', 'Support'],
  screens: {
    home: HomeQ2,
    overview: (nav) => <OverviewFreeScreen nav={nav} routes={ROUTES_Q2} tabs={TABS_Q2} />,
    transactions: (nav) => <TransactionsScreen nav={nav} />,
    txSelect: (nav) => <TransactionsScreen nav={nav} select />,
    category,
    paywall: (nav) => <PaywallScreen nav={nav} />,
    processing: (nav) => <ProcessingScreen nav={nav} backTo="overview" />,
  },
  sheets: { txActions: (nav) => <TxActionsSheet nav={nav} /> },
};

/* ---------- Q3 2024: insights and tax estimate for everyone ---------- */

const TABS_Q3 = ['Overview', 'Insights', 'Bookkeeping', 'Self Assessment'];
const ROUTES_Q3 = { Overview: 'overview', Insights: 'insights', Bookkeeping: 'transactions', 'Self Assessment': 'selfAssessment' };

function InsightsCardHome({ nav }: { nav: Nav }) {
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
      <CardTitle action="View all" onAction={() => nav.go('insights')}>
        Insights
      </CardTitle>
      <div className="space-y-2.5">
        <Stat label="Revenue" tone={T.primary} />
        <Stat label="Net Profit" tone={T.light} />
      </div>
      <div className="mt-3">
        <OutlineButton icon={<FileText size={14} />} onTap={() => nav.go('overview')}>
          Open Accounting
        </OutlineButton>
      </div>
    </Card>
  );
}

export { InsightsCardHome };

function HomeQ3(nav: Nav) {
  return (
    <>
      <StatusBar />
      <AdminHeader />
      <section className="mt-2">
        <InsightsCardHome nav={nav} />
      </section>
      <ExploreMore nav={nav} />
      <InvoicesBillsEmpty nav={nav} />
      <TeamExpenses nav={nav} />
    </>
  );
}

export const PROTO_Q3_2024: StageProto = {
  tabs: ['Payments', 'Admin', 'Finance', 'Support'],
  screens: {
    home: HomeQ3,
    insights: (nav) => <InsightsFreeScreen nav={nav} routes={ROUTES_Q3} tabs={TABS_Q3} />,
    selfAssessment: (nav) => <SelfAssessmentScreen nav={nav} routes={ROUTES_Q3} tabs={TABS_Q3} />,
    overview: (nav) => <OverviewFreeScreen nav={nav} routes={ROUTES_Q3} tabs={TABS_Q3} />,
    transactions: (nav) => <TransactionsScreen nav={nav} />,
    txSelect: (nav) => <TransactionsScreen nav={nav} select />,
    category,
    paywall: (nav) => <PaywallScreen nav={nav} />,
    processing: (nav) => <ProcessingScreen nav={nav} backTo="selfAssessment" />,
  },
  sheets: { txActions: (nav) => <TxActionsSheet nav={nav} /> },
};

export { ChevronRight };

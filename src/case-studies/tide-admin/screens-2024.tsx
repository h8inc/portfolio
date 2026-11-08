/**
 * 2024: freemium.
 * Q2 gives the bookkeeping score away and sells insights behind Admin Extra.
 * Q3 gives insights and the tax estimate away too, with detail behind the trial.
 */
import { CircleHelp, FileText } from 'lucide-react';
import { SELF_ASSESSMENT_2024 } from './data';
import { StatusBar, type Nav, type StageProto } from './proto';
import { AdminHeader, ExploreMore, InvoicesBillsEmpty, SelfAssessmentDetail, TeamExpenses } from './screens-2023';
import {
  AdminPlansScreen,
  CategoryScreen,
  ConfirmDetailsScreen,
  ExpensesBreakdownScreen,
  InsightsFreeScreen,
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
import { Card, CardTitle, HEAD, ListRow, OutlineButton, Pill, ScoreDial, SectionTitle, T } from './ui';

/* ---------- Q2 2024: first freemium release ---------- */

const TABS_Q2 = ['Overview', 'Insights', 'Bookkeeping tasks', 'Self Assessment'];
/** Q2 sells insights and the tax estimate behind Admin Extra outright: no dedicated
 *  screens exist for them yet (that softer, blurred-preview treatment is Q3's), so
 *  both tabs open the paywall directly rather than a locked placeholder page. */
const ROUTES_Q2 = { Overview: 'overview', 'Bookkeeping tasks': 'transactions', Insights: 'paywall', 'Self Assessment': 'paywall' };

function HomeQ2(nav: Nav) {
  const done = nav.flags.categorised && nav.flags.vatDone;
  return (
    <>
      <StatusBar />
      <AdminHeader />
      <section className="mt-2">
        <SectionTitle more>Accounting</SectionTitle>
        <Card>
          <CardTitle right={<CircleHelp size={18} style={{ color: T.muted }} />}>Bookkeeping score</CardTitle>
          <ScoreDial value={done ? 80 : nav.flags.categorised ? 55 : 40} />
          <div className="mt-1 text-center">
            <Pill tone={done ? 'green' : 'danger'}>{done ? 'ALMOST THERE' : 'NEEDS WORK'}</Pill>
            <p className="mt-1.5 text-[11px]" style={{ color: T.muted }}>
              {done ? 'Complete your remaining tasks to reach 100%' : 'Complete tasks to increase your score'}
            </p>
          </div>
          <div className="-mx-4 mt-4 border-t" style={{ borderColor: T.border }}>
            <ListRow first title={done ? '14 items require your attention' : `${nav.flags.categorised ? 15 : 19} transactions are missing details`} sub="Add details to ensure your reports are accurate" onTap={() => nav.go('transactions')} />
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

/** Screens every freemium release shares. */
const freemiumScreens = (routes: Record<string, string>, tabs: string[], afterProcessing: string) => ({
  overview: (nav: Nav) => <OverviewFreeScreen nav={nav} routes={routes} tabs={tabs} />,
  transactions: (nav: Nav) => <TransactionsScreen nav={nav} />,
  txSelect: (nav: Nav) => <TransactionsScreen nav={nav} mode="category" />,
  txVatSelect: (nav: Nav) => <TransactionsScreen nav={nav} mode="vat" />,
  category: (nav: Nav) => <CategoryScreen nav={nav} onSaved={() => categoryDone(nav)} />,
  vatRate: (nav: Nav) => <VatRateScreen nav={nav} onSaved={() => vatDone(nav)} />,
  expenses: (nav: Nav) => <ExpensesBreakdownScreen nav={nav} />,
  paywall: (nav: Nav) => <PaywallScreen nav={nav} />,
  adminPlans: (nav: Nav) => <AdminPlansScreen nav={nav} />,
  insufficientFunds: (nav: Nav) => <InsufficientFundsScreen nav={nav} />,
  processing: (nav: Nav) => <ProcessingScreen nav={nav} backTo={afterProcessing} />,
  confirmDetails: (nav: Nav) => <ConfirmDetailsScreen nav={nav} />,
});

export const PROTO_Q2_2024: StageProto = {
  tabs: ['Payments', 'Admin', 'Finance', 'Support'],
  screens: { home: HomeQ2, ...freemiumScreens(ROUTES_Q2, TABS_Q2, 'overview') },
  sheets: { txActions: (nav) => <TxActionsSheet nav={nav} /> },
};

/* ---------- Q3 2024: insights and tax estimate for everyone ---------- */

const TABS_Q3 = ['Overview', 'Insights', 'Bookkeeping', 'Self Assessment'];
const ROUTES_Q3 = { Overview: 'overview', Insights: 'insights', Bookkeeping: 'transactions', 'Self Assessment': 'selfAssessment' };

export function InsightsCardHome({ nav }: { nav: Nav }) {
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
    saDetails: (nav) => <SelfAssessmentDetail nav={nav} title="Self Assessment" due={SELF_ASSESSMENT_2024.due} period={SELF_ASSESSMENT_2024.period} paid={SELF_ASSESSMENT_2024.paid} />,
    ...freemiumScreens(ROUTES_Q3, TABS_Q3, 'selfAssessment'),
  },
  sheets: { txActions: (nav) => <TxActionsSheet nav={nav} /> },
};

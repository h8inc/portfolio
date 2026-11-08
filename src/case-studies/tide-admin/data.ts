/**
 * One fixture for the whole Admin evolution mock. Figures come from the Figma
 * prototypes where they exist; where Figma had placeholders, values here are
 * chosen to be internally consistent. Edit here, not in the screens.
 */

export const BIZ = {
  name: 'Feel Good Inc.',
  initials: 'FG',
  owner: 'JB',
  /** Current financial year label used across Tide Accounting. */
  fy: 'May 2022 – May 2023',
  fyOptions: ['28 Aug 2022 – 27 Aug 2023', '28 Aug 2021 – 27 Aug 2022', '28 Aug 2020 – 27 Aug 2021'],
  cash: '£7,320',
};

export const SCORE = {
  value: 40,
  label: 'NEEDS WORK',
  txMissing: 19,
  txMissingAfterFix: 15,
  invMissing: 10,
};

export type Tx = { name: string; amount: string; missing: string; tag?: string; tagTone?: 'tint' | 'danger' | 'gold' };
export const TX_DAY_1 = { date: '30 June 2023', total: '+£2,776.40' };
export const TX_1: Tx[] = [
  { name: 'Influitive', amount: '+£2,400.00', missing: 'Category missing', tag: 'Pending' },
  { name: 'Influitive', amount: '+£2,400.00', missing: 'Category missing', tag: 'Pending' },
  { name: 'Mori', amount: '+£500.00', missing: 'Category & VAT missing', tag: 'Needs VAT', tagTone: 'gold' },
  { name: 'Amazon', amount: '£124.40', missing: 'Category missing', tag: 'Needs receipt', tagTone: 'gold' },
];
export const TX_DAY_2 = { date: '29 June 2023', total: '£234.81' };
export const TX_2: Tx[] = [
  { name: 'Staples', amount: '£2.99', missing: 'VAT missing' },
  { name: 'Vodafone', amount: '£132.18', missing: 'Category & VAT missing' },
  { name: 'Muji', amount: '£12.33', missing: 'Category missing' },
  { name: 'Amazon', amount: '£34.20', missing: 'VAT missing' },
];

export const CATEGORIES = [
  'Bank fees',
  'Bank interest paid',
  'Car, land or premises asset',
  'Fuel',
  'Hotels and accommodation',
  'Income',
  'Insurance',
  'Loan repayments and interest',
  'Marketing',
  'Meals',
  'Office supplies',
  'Operational equipment',
];

/** Bookkeeping tasks tab (2023). */
export const BK_TASKS = {
  transactions: {
    count: 12,
    items: [
      { name: 'Groupon', amount: '+£500.00', task: 'Add category & VAT rate', tag: 'Pending' },
      { name: 'Amazon', amount: '+£121.00', task: 'Office supply' },
      { name: 'Muji', amount: '£12.33', task: 'Add category' },
    ],
  },
  invoices: {
    count: 17,
    items: [
      { name: 'Groupon', amount: '+£500.00', task: 'Add category & VAT rate', tag: 'Pending' },
      { name: 'Amazon', amount: '+£121.00', task: 'Add VAT rate' },
      { name: 'Muji', amount: '£12.33', task: 'Add category' },
    ],
  },
};

/** Old-IA insights (2023), three metrics with current vs previous period. */
export const INSIGHTS_2023 = [
  { key: 'netProfit', title: 'Net profit', value: '£50,320', delta: '+4% vs previous period', tone: 'teal' as const },
  { key: 'revenue', title: 'Revenue', value: '£50,320', delta: '+8% vs previous period', tone: 'indigo' as const },
  { key: 'expenses', title: 'Expenses', value: '£50,320', delta: '-4% vs previous period', tone: 'gold' as const },
];

export const KEY_DATES = [
  { month: 'AUG', day: '09', title: 'Automatic invoice payments', sub: 'Due in 3 days', urgent: true },
  { month: 'AUG', day: '09', title: 'Automatic invoice payments', sub: 'Due in 34 days', urgent: false },
];

export const REPORTS = ['Profit & Loss', 'Cash flow', 'Balance Sheet', 'Trial Balance'];

export const SELF_ASSESSMENT_2023 = {
  due: '31 Jan 2023',
  period: '28 Aug 21 – 27 Aug 22',
  income: {
    total: '£355,500.00',
    rows: [
      { title: 'Your turnover', amount: '£350,000.00', tag: 'Income' },
      { title: 'Any other business income', amount: '£5,500.00', tag: 'Other income' },
    ],
  },
  expenses: {
    total: '£540.00',
    rows: [
      { title: 'Phone, fax, stationery and other office costs', amount: '£140.00', tags: ['Office supplies', 'Phone & internet', 'Shipping & postage', 'Software & IT'] },
      { title: 'Repairs and maintenance of property and equipment', amount: '£200.00', tags: ['Utilities and work premises', 'Insurance'] },
      { title: 'Advertising and business entertainment costs', amount: '£200.00', tags: ['Marketing'] },
    ],
  },
};

export const VAT_PERIODS = [
  { title: 'Previous VAT period', when: 'Was due on 7 Dec 2023', status: '39 days overdue', tone: 'danger' as const, estimate: '£783.33', period: '01 Jul 2023 – 31 Oct 2023', cta: 'Submit on desktop' },
  { title: 'Current VAT period', when: 'Submit by 7 Feb 2024', status: 'Due in 17 days', tone: 'gold' as const, estimate: '£783.33', period: '01 Jan 2024 – 31 Mar 2024', cta: 'Submit previous outstanding reports', disabled: true },
  { title: 'Next VAT period', when: 'Submit by 7 May 2024', status: 'Due in 107 days', tone: 'tint' as const, estimate: '£783.33', period: '01 Jan 2024 – 31 Mar 2024', cta: 'Update 12 items' },
];

export const TAXES_2023 = {
  corporation: { estimate: '£1,257.00', due: '31 Dec 2025', period: '4 Apr 2024 – 5 Apr 2025' },
  vat: { estimate: '£1,257.00', due: '7 Jul 2025', period: '1 Jan 2024 – 30 Jun 2025' },
};

export const SETTINGS_2023 = ['Business details', 'VAT registration', 'Accounting period', 'Connect to HMRC', 'Accounting integrations', 'Log in on your computer'];

/** Mini Profit & Loss used in the PDF preview. */
export const PNL_PREVIEW = {
  period: '28 Aug 2022 – 27 Aug 2023',
  rows: [
    ['Revenue', '£132,320.00'],
    ['Cost of sales', '-£41,200.00'],
    ['Gross profit', '£91,120.00'],
    ['Operating expenses', '-£18,800.00'],
    ['Net profit', '£72,320.00'],
  ] as [string, string][],
};

/** Expenses donut (2024 overview and breakdown). */
export const EXPENSES_BREAKDOWN = {
  total: '£50,320.00',
  month: 'June 2024',
  cats: [
    { name: 'Uncategorised', pct: 34, amount: '£17,108.80', color: '#CDD1EC' },
    { name: 'Insurance', pct: 22, amount: '£11,070.40', color: '#D7385E' },
    { name: 'Meals', pct: 18, amount: '£9,057.60', color: '#3B4BD8' },
    { name: 'Travel', pct: 14, amount: '£7,044.80', color: '#F2B84B' },
    { name: 'More +15', pct: 12, amount: '£6,038.40', color: '#1C1F3A' },
  ],
};

export const VAT_RATES = [
  { rate: '20%', note: 'Standard rate' },
  { rate: '5%', note: 'Reduced rate' },
  { rate: '0%', note: 'Zero rate' },
  { rate: 'VAT exempt', note: 'No VAT applies' },
  { rate: 'Custom amount…', note: 'Enter a specific VAT amount' },
];

export const PLANS = [
  { name: 'Admin Extra', price: '£22.99/mo', desc: 'Accounting Extra and Invoice Assistant' },
  { name: 'Accounting Extra', price: '£14.99/mo', desc: 'Reports, insights, tax tools' },
  { name: 'Invoice Assistant', price: '£10.00/mo', desc: 'Automatic chasing and matching' },
];

export const CONFIRM_FIELDS: [string, string][] = [
  ['Business name', 'Feel Good Inc.'],
  ['Business type', 'Sole trader'],
  ['Accounting year', 'Starts 28 August'],
  ['HMRC UTR', '•••• •• 4471'],
];

/** Self Assessment detail as shown after the Q3 2024 trial unlock. */
export const SELF_ASSESSMENT_2024 = {
  due: '31 Jan 2024',
  period: '28 Aug 22 – 27 Aug 23',
  paid: { title: '£1,000.00 in taxes for 22/23', sub: 'Completed 5 months ago', month: 'JAN', day: '31' },
};

/* ---------- Q2 2025: Admin IA redesign ---------- */

export type Basis = 'Cash' | 'Accrual';
export type MetricKey = 'netProfit' | 'revenue' | 'expenses';

/** Insight values by basis and VAT treatment. Keys: `${basis}-${vat ? 'vat' : 'net'}`. */
export const INSIGHTS_2025: Record<MetricKey, { title: string; period: string; values: Record<string, string>; delta: string }> = {
  netProfit: { title: 'Net Profit', period: 'November 2024', delta: '-12% vs October', values: { 'Cash-net': '-£4,400', 'Cash-vat': '-£5,280', 'Accrual-net': '-£3,150', 'Accrual-vat': '-£3,780' } },
  revenue: { title: 'Revenue', period: 'October 2024', delta: '+8% vs September', values: { 'Cash-net': '£9,400', 'Cash-vat': '£11,280', 'Accrual-net': '£10,650', 'Accrual-vat': '£12,780' } },
  expenses: { title: 'Expenses', period: 'November 2024', delta: '+4% vs October', values: { 'Cash-net': '£9,400', 'Cash-vat': '£11,280', 'Accrual-net': '£8,242', 'Accrual-vat': '£9,890' } },
};

export const DRILL_ROWS: Record<MetricKey, { name: string; cat: string; amount: string }[]> = {
  netProfit: [
    { name: 'Facebook for Business', cat: 'Marketing', amount: '£50.00' },
    { name: 'AMZ LTD', cat: 'Stock', amount: '£1,000.40' },
    { name: 'Amazon', cat: 'Office supplies', amount: '£124.40' },
  ],
  revenue: [
    { name: 'Influitive', cat: 'Sales · Inv. 1123', amount: '+£2,400.00' },
    { name: 'Mori', cat: 'Sales · Inv. 1120', amount: '+£500.00' },
    { name: 'Groupon', cat: 'Sales · Inv. 1119', amount: '+£500.00' },
  ],
  expenses: [
    { name: 'Facebook for Business', cat: 'Marketing', amount: '£50.00' },
    { name: 'AMZ LTD', cat: 'Stock', amount: '£1,000.40' },
    { name: 'Amazon', cat: 'Office supplies', amount: '£124.40' },
  ],
};

export const DRILL_BREAKDOWN: Record<MetricKey, [string, string][]> = {
  netProfit: [
    ['Revenue', '£3,842.00'],
    ['Expenses', '£8,242.00'],
  ],
  revenue: [
    ['Invoices paid', '£7,900.00'],
    ['Other income', '£1,500.00'],
  ],
  expenses: [
    ['Stock', '£5,120.00'],
    ['Marketing', '£2,240.00'],
    ['Office & software', '£2,040.00'],
  ],
};

export const WHAT_IS: Record<MetricKey, { title: string; body: string[] }> = {
  netProfit: {
    title: 'What is net profit?',
    body: [
      'Net profit measures how much money your business earns. It’s calculated by subtracting all expenses from your total revenue.',
      'In accrual basis accounting, your expenses and revenue include all transactions, even if they haven’t been paid for yet.',
      'In contrast, gross profit measures how much money your business earns minus the cost of goods sold.',
    ],
  },
  revenue: {
    title: 'What is revenue?',
    body: ['Revenue is the amount of money that your business earns over a period, before any costs are taken off.', 'On a cash basis it counts money received. On an accrual basis it counts what you have invoiced.'],
  },
  expenses: {
    title: 'What are expenses?',
    body: ['Expenses are costs incurred to run your business. Some examples are stock, marketing, software and office supplies.', 'Categorising transactions keeps this number, and your tax estimate, accurate.'],
  },
};

/** Admin home after subscribing in 2025. */
export const HOME_2025_SUBSCRIBED = {
  metrics: [
    ['Cash Flow', '£9,400.00', 'teal'],
    ['Revenue', '£7,100', 'indigo'],
    ['Net Profit', '£7,100', 'lilac'],
    ['Expenses', '£7,100', 'gold'],
  ] as [string, string, 'teal' | 'indigo' | 'lilac' | 'gold'][],
  tasks: [
    { title: 'Enrich 16 transactions', sub: 'Add categories and VAT to improve the accuracy of your insights', go: 'transactions' },
    { title: 'Chase 5 late invoices', sub: 'Send reminders to customers and collect money you’re owed', go: 'invoices' },
    { title: 'Get £1,532.32 instantly!', sub: 'Split your payment to His Gracen… and repay in 4 instalments', go: null },
  ],
  overdue: { customer: 'Bob Baxter', ref: 'Inv. 1123', status: 'Overdue by 3 days', amount: '+£500.00' },
};

/* ---------- 2026: one Admin hub ---------- */

export const SOFTWARE_OPTIONS = ['I’m not using anything', 'Xero', 'FreeAgent', 'Sage', 'Other'];

export const TAXES_PAYING = [
  { title: 'Self assessments', due: '-£1,200', when: 'Due in 8 weeks', account: 'Tax saving account', rules: '1 automation rule', saved: '£1,000', left: '£200 left', pct: 83, tone: '#1E9E6A' },
  { title: 'VAT returns', due: '-£1,200', when: 'Due in 8 weeks', account: 'VAT saving account', rules: '3 automation rules', saved: '£1,000', left: '£200 left', pct: 83, tone: '#6A2FE0' },
];

export const TASKS_2026 = {
  fresh: {
    Urgent: [
      ['Send an invoice', 'Create, chase and get paid', 'invoices'],
      ['Tell us how you do accounting', 'So we know how to help best', 'accountingSoftware'],
      ['Track your upcoming taxes', 'Estimate, save and submit on time', 'taxes'],
    ],
    Upcoming: [
      ['Submit VAT return', 'Due 7 Aug', 'taxes'],
      ['Review payroll', 'Runs on the 25th', 'payroll'],
    ],
    Completed: [] as string[][],
  },
  established: {
    Urgent: [
      ['12 invoices worth £8,355 are overdue and need chasing', 'Collect payments you’re due to meet', 'invoices'],
      ['Understand your financials', 'Make better business decisions', 'insights'],
      ['£3,150 due for Self Assessment', 'Due in 6 weeks time', 'taxes'],
      ['Recurring tax saving of £150', 'Review your tax situation', 'taxes'],
      ['Credit payment worth £325', 'Due in 1 day', ''],
      ['Payroll payment', 'Due in 3 days', 'payroll'],
    ],
    Upcoming: [
      ['Corporation tax return', 'Due 31 Dec', 'taxes'],
      ['Renew insurance', 'Due 14 Jan', ''],
    ],
    Completed: [
      ['Tell us how you do accounting', 'Answered: Xero', 'accountingSoftware'],
      ['Connect to HMRC', 'Connected 3 months ago', ''],
    ],
  },
};

export const PAYROLL = {
  price: '£12/month',
  blurb: 'Everything you need to run your own payroll. No accountant or extra software needed.',
  groups: [
    { title: 'Get started with HMRC', steps: [['Connect your account', 'Add or create your HMRC login'], ['Sync your references', 'Add or register as an employer']] },
    { title: 'Prepare your first payroll', steps: [['Add yourself to payroll', 'Calculate a tax efficient salary'], ['Set your first payday', 'Define when you run payroll']] },
  ],
};

export const CARDS = [
  { name: 'Tide card', number: '•••• 4567', status: 'ACTIVE' },
  { name: 'Primary account', number: '•••• 8712', status: 'ACTIVE' },
];

export const CUSTOMERS = [
  ['Joe Bloggs', 'annsmith@email.co'],
  ['Sam Atlantic', 'samatlantic@email.co'],
  ['Tim', 'timairlines@email.co'],
  ['John Neww', 'johnneww@email.co'],
];

export const INSIGHTS_2026 = {
  cash: { title: 'Cash balance today', value: '£4,000', go: 'cashFlow' },
  rows: [
    { title: 'Profit this month', value: '£4,000', delta: '↓4% vs last month', go: 'netProfit6m', tone: '#B18CFF' },
    { title: 'Revenue this month', value: '£4,000', delta: '↓4% vs last month', go: 'cashFlow', tone: '#2BB5A0' },
    { title: 'Expenses this month', value: '£4,000', delta: '↓4% vs last month', go: 'cashFlow', tone: '#D7385E' },
  ],
  empty: ['Cash flow', 'Net profit', 'Revenue', 'Expenses'],
};

export const CASHFLOW_2026 = {
  balance: '£4,400',
  label: 'Available Balance in November',
  incomings: '£6000 incomings',
  outgoings: '£4000 outgoings',
  months: ['JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
  series: [
    [60, 40],
    [52, 44],
    [66, 38],
    [40, 48],
    [58, 36],
    [62, 42],
  ],
  tasks: '0/6 tasks completed',
};

export const NET_PROFIT_6M = { headline: 'Net Profit for the last 6 months is £36,400', sub: '22% profit margin and 24% up from last period' };

export const PAYMENTS_RECS = [
  { title: 'Switch your bank account to Tide', sub: 'Move direct debits and salary in one go', illo: 'accounting', go: '' },
  { title: 'Start growing your savings', sub: '4.33% AER (variable)', illo: 'growth', go: '' },
  { title: 'Send your first invoice', sub: 'Get paid faster', illo: 'invoices', go: 'invoices' },
  { title: 'Explore Tide Accounting', sub: 'Free trial available', illo: 'bookkeeping', go: 'toolkit' },
];

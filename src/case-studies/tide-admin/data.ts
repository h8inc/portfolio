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

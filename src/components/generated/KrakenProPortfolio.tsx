import React, { useState, useMemo } from 'react';
import { PortfolioHeader } from './PortfolioHeader';
import { PortfolioChart } from './PortfolioChart';
import { BottomNavigation } from './BottomNavigation';
import { TradingCard } from './TradingCard';
import { BalanceCard } from './BalanceCard';
import { ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight, Coins, ChevronRight, Wallet } from 'lucide-react';
type Period = '1W' | '1M' | '3M' | '6M' | '1Y' | 'ALL';
type AccountCardProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  value: string;
  currency: string;
  change?: string;
  changeColor?: string;
  showChevron?: boolean;
};
const AccountCard = ({
  icon,
  title,
  subtitle,
  value,
  currency,
  change,
  changeColor,
  showChevron = true
}: AccountCardProps) => {
  return <div className="bg-[#171827] rounded-2xl p-4 flex items-center justify-between hover:bg-[#1b1d2f] transition-colors cursor-pointer border border-white/5" role="button" aria-label={`${title} account card`}>
      <div className="flex items-center gap-3">
        <div className="bg-[#24263a]/50 rounded-xl p-2.5" aria-hidden>
          {icon}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-white font-medium text-sm">{title}</span>
          <span className="text-slate-400 text-xs">{subtitle}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end gap-0.5">
          <div className="flex items-baseline gap-1">
            <span className="text-white font-semibold text-base">
              {value}
            </span>
            <span className="text-slate-400 text-xs">{currency}</span>
          </div>
          {change && <span className={`text-xs font-medium ${changeColor || 'text-slate-500'}`}>
              {change}
            </span>}
        </div>
        {showChevron && <ChevronRight className="w-5 h-5 text-slate-500" aria-hidden />}
      </div>
    </div>;
};
type ActionButtonProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
};
const ActionButton = ({
  icon,
  label,
  onClick
}: ActionButtonProps) => {
  return <button onClick={onClick} className="flex flex-col items-center justify-center bg-[#1e1e33] rounded-xl p-3 hover:bg-[#24263a] transition-colors gap-2 flex-1 border border-white/5 min-h-[76px]" aria-label={label}>
      <div className="text-slate-200" aria-hidden>
        {icon}
      </div>
      <span className="text-white font-medium text-xs">{label}</span>
    </button>;
};
type Trade = {
  id: string;
  action: 'buy' | 'sell';
  asset: string;
  amount: number;
  price: number;
  currency: string;
  date: string;
  changePercent: number;
  changeAbsolute: number;
  icon: string;
};
type Balance = {
  id: string;
  name: string;
  icon: string;
  percentage: string;
  amount: string;
  currency: string;
  value: string;
  change: string;
  changeValue: string;
  changePercent: string;
  isPositive: boolean;
};
const lastTrades: Trade[] = [{
  id: '1',
  action: 'buy',
  asset: 'BTC',
  amount: 0.0125,
  price: 98245.50,
  currency: 'EUR',
  date: '2m ago',
  changePercent: 12.45,
  changeAbsolute: 136.18,
  icon: '₿'
}, {
  id: '2',
  action: 'sell',
  asset: 'SOL',
  amount: 25.5,
  price: 172.30,
  currency: 'EUR',
  date: '1h ago',
  changePercent: -3.82,
  changeAbsolute: -167.84,
  icon: '◎'
}, {
  id: '3',
  action: 'buy',
  asset: 'ETH',
  amount: 0.85,
  price: 3580.20,
  currency: 'EUR',
  date: '3h ago',
  changePercent: 8.23,
  changeAbsolute: 250.41,
  icon: 'Ξ'
}];
const balances: Balance[] = [{
  id: '1',
  name: 'Bitcoin',
  icon: '₿',
  percentage: '78.9%',
  amount: '1.46259',
  currency: 'BTC',
  value: '144,794.15',
  change: 'EUR',
  changeValue: '+66,720.60',
  changePercent: '+85.46%',
  isPositive: true
}, {
  id: '2',
  name: 'Solana',
  icon: '◎',
  percentage: '16.4%',
  amount: '175.27742',
  currency: 'SOL',
  value: '30,180.91',
  change: 'EUR',
  changeValue: '+6,168.22',
  changePercent: '+25.69%',
  isPositive: true
}, {
  id: '3',
  name: 'Ethereum',
  icon: 'Ξ',
  percentage: '2.6%',
  amount: '1.35119',
  currency: 'ETH',
  value: '4,836.46',
  change: 'EUR',
  changeValue: '+1,656.17',
  changePercent: '+52.08%',
  isPositive: true
}, {
  id: '4',
  name: 'Sui',
  icon: '~',
  percentage: '1.2%',
  amount: '953.434',
  currency: 'SUI',
  value: '2,144.75',
  change: 'EUR',
  changeValue: '-1,252.84',
  changePercent: '-36.87%',
  isPositive: false
}, {
  id: '5',
  name: 'Bittensor',
  icon: 'τ',
  percentage: '0.5%',
  amount: '2.480954',
  currency: 'TAO',
  value: '873.05',
  change: 'EUR',
  changeValue: '-64.45',
  changePercent: '-6.87%',
  isPositive: false
}];

// Period display mapping
const periodDisplayMap: Record<Period, string> = {
  '1W': 'week',
  '1M': 'month',
  '3M': '3 months',
  '6M': '6 months',
  '1Y': 'year',
  'ALL': 'all time'
};

// Generate daily data for demonstration
const generateDailyData = (days: number) => {
  const data: Array<{
    value: number;
  }> = [];
  let value = 180000;
  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.5) * 15000;
    value = Math.max(140000, Math.min(220000, value + change));
    data.push({
      value
    });
  }
  return data;
};
const DAILY_DATA = generateDailyData(90);

// @component: KrakenProPortfolio
export const KrakenProPortfolio = () => {
  // State for period selection
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('3M');

  // State for hover data from chart
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  // Calculate the default (latest) value and change
  const latestValue = useMemo(() => DAILY_DATA[DAILY_DATA.length - 1].value, []);

  // Calculate change based on selected period
  const {
    startValue,
    change,
    changePercentage
  } = useMemo(() => {
    const daysMap: Record<Period, number> = {
      '1W': 7,
      '1M': 30,
      '3M': 90,
      '6M': 90,
      '1Y': 90,
      'ALL': 90
    };
    const days = daysMap[selectedPeriod];
    const start = DAILY_DATA[Math.max(0, DAILY_DATA.length - days)].value;
    const end = latestValue;
    const diff = end - start;
    const pct = diff / start * 100;
    return {
      startValue: start,
      change: diff,
      changePercentage: pct
    };
  }, [selectedPeriod, latestValue]);

  // Calculate hover change if hovering
  const displayValue = hoveredValue !== null ? hoveredValue : latestValue;
  const displayChange = hoveredValue !== null ? hoveredValue - latestValue : change;
  const displayChangePercentage = hoveredValue !== null ? (hoveredValue - latestValue) / latestValue * 100 : changePercentage;

  // @return
  return <div className="w-full max-w-md bg-[#0f1419] text-white flex flex-col rounded-[30px] overflow-hidden border border-white/10 shadow-2xl relative" style={{
    aspectRatio: '285/431',
    isolation: 'isolate',
    contain: 'layout style paint',
    transform: 'translateZ(0)',
    willChange: 'transform'
  }}>
      <PortfolioHeader value={displayValue} currency="EUR" change={displayChange} changePercentage={displayChangePercentage} period={periodDisplayMap[selectedPeriod]} />

      <div className="w-full relative z-0 flex-1 min-h-0 overflow-hidden" style={{
      isolation: 'isolate',
      contain: 'layout style paint',
      transform: 'translateZ(0)'
    }}>
        <PortfolioChart variant="mobile" selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} onHoverValue={setHoveredValue} />
      </div>

      <BottomNavigation />
    </div>;
};
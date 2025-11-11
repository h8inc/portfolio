import React from 'react';
import { RotateCcw } from 'lucide-react';
type PortfolioHeaderProps = {
  value?: number;
  currency?: string;
  change?: number;
  changePercentage?: number;
  period?: string;
  /**
   * Controls the transparency of the glassmorphic background (0-100)
   * Lower values = more transparent
   * @default 40
   */
  backgroundOpacity?: number;
};
const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};
const formatChange = (num: number) => {
  const absNum = Math.abs(num);
  if (absNum >= 1000) {
    return `${num > 0 ? '+' : '-'}${(absNum / 1000).toFixed(1)}k`;
  }
  return num > 0 ? `+${num.toFixed(1)}` : num.toFixed(1);
};

// @component: PortfolioHeader
export const PortfolioHeader = ({
  value = 176938.69,
  currency = 'EUR',
  change = -6500,
  changePercentage = -3.52,
  period = '3M',
  backgroundOpacity = 40
}: PortfolioHeaderProps) => {
  const isPositive = change >= 0;

  // @return
  return <header className="relative top-0 left-0 right-0 w-full backdrop-blur-lg text-white py-4 px-4 transition-all duration-300" style={{
    backgroundColor: `rgba(15, 20, 24, ${backgroundOpacity / 100})`,
    paddingLeft: "30px",
    paddingRight: "30px",
    paddingTop: "30px",
    paddingBottom: "0px"
  }}>
      <div className="max-w-7xl mx-auto flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">
            Portfolio value
          </p>
          <div className="flex items-baseline gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-light tracking-tight">
              {formatNumber(value)}
            </h1>
            <span className="text-lg sm:text-xl text-slate-400 font-extralight">
              {currency}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {formatChange(change)} {currency} ({changePercentage.toFixed(2)}%)
            </span>
            <span className="text-slate-500 text-xs">
              last {period}
            </span>
          </div>
        </div>
        <button className="bg-white/5 hover:bg-white/10 transition-all duration-200 rounded-xl p-2.5 shrink-0 group mt-1" aria-label="Refresh portfolio">
          <RotateCcw className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors group-active:rotate-180 transition-transform duration-500" />
        </button>
      </div>
    </header>;
};
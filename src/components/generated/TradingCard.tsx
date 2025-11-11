import React from 'react';
type TradingCardProps = {
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
const formatNumber = (num: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
};

// @component: TradingCard
export const TradingCard = (props: TradingCardProps) => {
  const {
    action,
    asset,
    amount,
    price,
    currency,
    date,
    changePercent,
    changeAbsolute,
    icon
  } = props;
  const isPositive = changePercent >= 0;
  const actionColor = action === 'buy' ? 'text-emerald-400' : 'text-pink-400';

  // @return
  return <div className="w-full pb-3">
      <div className="flex items-start gap-3">
        {/* Column 1: Asset Icon */}
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg font-bold" style={{
          display: "none"
        }}>
            {icon}
          </div>
          {asset === 'SOL' && <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center border-2 border-[#171827] shadow-lg">
              <span className="text-[10px] font-bold">◎</span>
            </div>}
          <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-[#2a2a3e] rounded-full flex items-center justify-center border border-white/10">
            <span className="text-[10px]">$</span>
          </div>
        </div>

        {/* Column 2: Action/Asset, Price Info, Amount - 3 rows stacked */}
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          {/* Row 1: Action + Asset */}
          <div className="flex items-center gap-2">
            <span className={`${actionColor} font-semibold text-sm capitalize`}>
              {action}
            </span>
            <span className="text-white/60 font-medium text-sm">{asset}</span>
          </div>
          
          {/* Row 2: Price Info */}
          <div className="flex items-center gap-1">
            <span className="text-white/40 text-xs">@</span>
            <span className="text-white text-xs font-normal">
              {formatNumber(price, 2)}
            </span>
            <span className="text-white/40 text-xs">{currency}</span>
          </div>
          
          {/* Row 3: Amount */}
          <div className="flex items-center gap-1">
            <span className="text-white font-normal text-xs">
              {formatNumber(amount, 5)}
            </span>
            <span className="text-white/40 text-xs">{asset}</span>
          </div>
        </div>

        {/* Column 3: Date, Percentage Change, Profit/Loss - 3 rows stacked, right-aligned */}
        <div className="flex flex-col gap-0.5 items-end flex-shrink-0">
          {/* Row 1: Date */}
          <span className="text-white/40 text-xs">{date}</span>
          
          {/* Row 2: Percentage Change */}
          <span className={`text-xs font-medium ${isPositive ? 'text-emerald-400' : 'text-pink-400'}`}>
            {isPositive ? '+' : ''}
            {formatNumber(changePercent, 2)}%
          </span>
          
          {/* Row 3: Profit/Loss */}
          <span className={`text-xs ${isPositive ? 'text-emerald-400' : 'text-pink-400'}`}>
            {isPositive ? '+' : ''}
            {formatNumber(Math.abs(changeAbsolute), 2)} {currency}
          </span>
        </div>
      </div>
    </div>;
};
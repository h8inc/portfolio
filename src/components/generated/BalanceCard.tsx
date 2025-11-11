import React from 'react';
type BalanceCardProps = {
  name: string;
  icon: string;
  percentage: string;
  amount: string;
  currency: string;
  value: string;
  valueDisplay: string;
  changeValue: string;
  changePercent: string;
  isPositive: boolean;
};
const getGradient = (name: string): string => {
  const gradients: Record<string, string> = {
    'Bitcoin': 'linear-gradient(to bottom right, #f59e0b, #ea580c)',
    'Solana': 'linear-gradient(to bottom right, #8b5cf6, #6366f1)',
    'Ethereum': 'linear-gradient(to bottom right, #3b82f6, #2563eb)',
    'Sui': 'linear-gradient(to bottom right, #06b6d4, #0891b2)',
    'Bittensor': 'linear-gradient(to bottom right, #6b7280, #4b5563)'
  };
  return gradients[name] || 'linear-gradient(to bottom right, #6b7280, #4b5563)';
};

// @component: BalanceCard
export const BalanceCard = (props: BalanceCardProps) => {
  const {
    name,
    icon,
    percentage,
    amount,
    currency,
    value,
    valueDisplay,
    changeValue,
    changePercent,
    isPositive
  } = props;

  // @return
  return <div className="w-full pb-3">
      <div className="flex items-start gap-3">
        {/* Column 1: Asset Icon/Badge */}
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold" style={{
          background: getGradient(name),
          display: "none"
        }}>
            {icon}
          </div>
        </div>

        {/* Column 2: Name, Percentage, Amount Info */}
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          {/* Row 1: Name + Percentage */}
          <div className="flex items-center gap-2">
            <span className="text-white font-medium text-sm truncate">{name}</span>
            <span className="text-white/40 text-xs flex-shrink-0">· {percentage}</span>
          </div>
          
          {/* Row 2: Amount + Currency */}
          <div className="flex items-center gap-1">
            <span className="text-white font-normal text-xs">
              {amount}
            </span>
            <span className="text-white/40 text-xs">
              {currency}
            </span>
          </div>
        </div>

        {/* Column 3: Value Holdings and Change */}
        <div className="flex flex-col gap-0.5 items-end flex-shrink-0">
          {/* Row 1: Total Holdings Value + Currency */}
          <div className="flex items-center gap-1">
            <span className="text-white text-sm font-medium">
              {value}
            </span>
            <span className="text-white/40 text-xs">
              {valueDisplay}
            </span>
          </div>
          
          {/* Row 2: Change Value */}
          <span className={`text-xs font-medium ${isPositive ? 'text-emerald-400' : 'text-pink-400'}`}>
            {changeValue} {valueDisplay}
          </span>
          
          {/* Row 3: Change Percentage */}
          <span className={`text-xs ${isPositive ? 'text-emerald-400' : 'text-pink-400'}`}>
            {changePercent}
          </span>
        </div>
      </div>
    </div>;
};
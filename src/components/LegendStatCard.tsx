import clsx from 'clsx';
import React from 'react';

type LegendStatCardProps = {
  value: React.ReactNode;
  subtitle?: React.ReactNode;
  /**
   * Predefined styling variants for quick reuse.
   */
  variant?: 'primary' | 'secondary';
  /**
   * Optional extra classes for custom styling on specific instances.
   */
  className?: string;
};

const variantStyles: Record<
  NonNullable<LegendStatCardProps['variant']>,
  {
    background: string;
    valueColor: string;
    subtitleColor: string;
  }
> = {
  primary: {
    background: 'bg-[#f1ece3]',
    valueColor: 'text-[#130F25]',
    subtitleColor: 'text-[#5f5a4f]'
  },
  secondary: {
    background: 'bg-[#ebe4d9]',
    valueColor: 'text-[#130F25]',
    subtitleColor: 'text-[#5f5a4f]'
  }
};

export const LegendStatCard = ({
  value,
  subtitle,
  variant = 'primary',
  className
}: LegendStatCardProps) => {
  const styles = variantStyles[variant];

  return (
    <div
      className={clsx(
        'rounded-2xl px-5 py-3 shadow-sm min-w-[160px] text-center pointer-events-none',
        styles.background,
        className
      )}
    >
      <div
        className={clsx(
          'text-xl font-semibold tracking-tight leading-tight',
          styles.valueColor
        )}
      >
        {value}
      </div>
      {subtitle && (
        <div className={clsx('text-xs mt-1', styles.subtitleColor)}>{subtitle}</div>
      )}
    </div>
  );
};



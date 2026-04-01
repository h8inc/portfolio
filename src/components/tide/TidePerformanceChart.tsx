import React, { useMemo, useState } from 'react';
import { PrimitiveLineChart } from '../PrimitiveLineChart';
import { LegendStatCard } from '../LegendStatCard';

type TidePoint = { date: Date; value: number };
type Milestone = { date: Date; value: number };

type Props = {
  data: TidePoint[];
  className?: string;
  activationMilestones?: Milestone[];
};

const interpolateMilestoneValue = (milestones: Milestone[], targetDate: Date) => {
  if (!milestones.length) return null;
  if (milestones.length === 1) return milestones[0].value;

  const sorted = [...milestones].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  if (targetDate.getTime() <= sorted[0].date.getTime()) {
    return sorted[0].value;
  }
  if (targetDate.getTime() >= sorted[sorted.length - 1].date.getTime()) {
    return sorted[sorted.length - 1].value;
  }

  for (let i = 0; i < sorted.length - 1; i++) {
    const start = sorted[i];
    const end = sorted[i + 1];
    if (
      targetDate.getTime() >= start.date.getTime() &&
      targetDate.getTime() <= end.date.getTime()
    ) {
      const progress =
        (targetDate.getTime() - start.date.getTime()) /
        (end.date.getTime() - start.date.getTime());
      return start.value + (end.value - start.value) * progress;
    }
  }

  return sorted[sorted.length - 1].value;
};

export function TidePerformanceChart({
  data,
  className,
  activationMilestones
}: Props) {
  const [hoverPoint, setHoverPoint] = useState<TidePoint | null>(null);

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        maximumFractionDigits: 0
      }),
    []
  );
  const sorted = useMemo(
    () => [...data].sort((a, b) => a.date.getTime() - b.date.getTime()),
    [data]
  );

  const activationTimeline = useMemo(() => {
    if (!activationMilestones || !activationMilestones.length) return null;
    return activationMilestones.map(m => ({
      date: new Date(m.date),
      value: m.value
    }));
  }, [activationMilestones]);

  const latestPoint = sorted[sorted.length - 1] ?? null;
  const activePoint = hoverPoint ?? latestPoint;

  const shortValue = activePoint
    ? activePoint.value >= 1_000_000
      ? `£${(activePoint.value / 1_000_000)
          .toFixed(1)
          .replace(/\.0$/, '')}M`
      : activePoint.value >= 1_000
        ? `£${(activePoint.value / 1_000).toFixed(0)}K`
        : currencyFormatter.format(activePoint.value)
    : '—';

  const activeDateLabel = activePoint
    ? activePoint.date.toLocaleDateString('en-GB', {
        month: 'short',
        year: 'numeric'
      })
    : '';

  const activationRate =
    activePoint && activationTimeline
      ? interpolateMilestoneValue(activationTimeline, activePoint.date)
      : null;

  const activationLabel =
    activationRate !== null ? `${activationRate.toFixed(1)}%` : '—';
  const activationSubCopy = activeDateLabel
    ? `Activation • ${activeDateLabel}`
    : 'Activation';

  return (
    <div className={`w-full h-full relative ${className ?? ''}`}>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex flex-row flex-nowrap justify-center gap-3 pointer-events-none px-2 w-full">
        <LegendStatCard
          value={shortValue}
          subtitle={`ARR • ${activeDateLabel || '—'}`}
          variant="primary"
        />
        {activationTimeline && (
          <LegendStatCard
            value={activationLabel}
            subtitle={activationSubCopy}
            variant="primary"
          />
        )}
      </div>
      <div className="pt-28 sm:pt-20 h-full">
        <PrimitiveLineChart<TidePoint>
          data={sorted}
          xAccessor={(d) => d.date.getTime()}
          yAccessor={(d) => d.value}
          strokeColor="#f97316"
          unrevealedStrokeColor="#4b5563"
          areaGradientFrom="rgba(249, 115, 22, 0.3)"
          areaGradientTo="rgba(249, 115, 22, 0)"
          onHoverDatum={setHoverPoint}
          tooltipLabelFormatter={(d) =>
            `${currencyFormatter.format(d.value)} • ${d.date.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}`
          }
        />
      </div>
    </div>
  );
}



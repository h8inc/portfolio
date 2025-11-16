import React, { useMemo, useState } from 'react';
import { PrimitiveLineChart } from '../PrimitiveLineChart';

type TidePoint = { date: Date; value: number };

type Props = {
  data: TidePoint[];
  className?: string;
};

export function TidePerformanceChart({ data, className }: Props) {
  const [hover, setHover] = useState<TidePoint | null>(null);

  const sorted = useMemo(
    () => [...data].sort((a, b) => a.date.getTime() - b.date.getTime()),
    [data]
  );

  return (
    <div className={`w-full h-full ${className ?? ''}`}>
      <PrimitiveLineChart<TidePoint>
        data={sorted}
        xAccessor={(d) => d.date.getTime()}
        yAccessor={(d) => d.value}
        strokeColor="#f97316"
        unrevealedStrokeColor="#4b5563"
        areaGradientFrom="rgba(249, 115, 22, 0.3)"
        areaGradientTo="rgba(249, 115, 22, 0)"
        onHoverDatum={(d) => setHover(d)}
        tooltipLabelFormatter={(d) =>
          `${d.value.toLocaleString('en-GB')} • ${d.date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short'
          })}`
        }
      />
    </div>
  );
}



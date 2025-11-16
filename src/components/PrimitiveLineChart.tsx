import React, { useEffect, useMemo, useRef, useState } from 'react';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { line, curveCatmullRom } from 'd3-shape';

// Generic point type used internally after accessors are applied
type InternalPoint = {
  x: number;
  y: number;
  originalIndex: number;
};

type PrimitiveLineChartProps<T> = {
  data: T[];
  /**
   * Accessor for the x axis. Should return a numeric index or timestamp.
   * If you want to use dates, pre-map them to numbers externally, or
   * convert to getTime() inside this accessor.
   */
  xAccessor: (d: T, index: number) => number;
  /** Accessor for the y axis numeric value */
  yAccessor: (d: T, index: number) => number;

  /** Optional className applied to root container */
  className?: string;

  /** Background color, used for the root container */
  backgroundColor?: string;

  /** Stroke color for the revealed portion of the line */
  strokeColor?: string;

  /** Stroke color for the unrevealed portion of the line */
  unrevealedStrokeColor?: string;

  /** Gradient fill colors for the revealed area */
  areaGradientFrom?: string;
  areaGradientTo?: string;

  /**
   * Called with the hovered datum (from original data array) or null when hover ends.
   */
  onHoverDatum?: (datum: T | null, index: number | null) => void;

  /**
   * Optional formatter to render the tooltip label.
   * Receives the datum and index.
   */
  tooltipLabelFormatter?: (datum: T, index: number) => string;
};

/**
 * A reusable, D3-backed line chart primitive.
 *
 * - Uses d3 for scales and path generation.
 * - Renders gradient area, split revealed/unrevealed line, hover dot and vertical line.
 * - Keeps DOM/interaction logic in React.
 *
 * This is intentionally generic and data-agnostic so it can be reused across pages/projects.
 */
export function PrimitiveLineChart<T>({
  data,
  xAccessor,
  yAccessor,
  className,
  // Default to transparent for maximum reusability across containers
  backgroundColor = 'transparent',
  strokeColor = '#f97316',
  unrevealedStrokeColor = '#4b5563',
  areaGradientFrom = 'rgba(249, 115, 22, 0.3)',
  areaGradientTo = 'rgba(249, 115, 22, 0)',
  onHoverDatum,
  tooltipLabelFormatter
}: PrimitiveLineChartProps<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Unique id to avoid gradient/clipPath collisions
  const [uniqueId] = useState(() => `primitive-chart-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`);

  // Measure container size
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width && height) {
          setDimensions({ width, height });
        }
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const { points, linePath, areaPath, yMin, yMax } = useMemo(() => {
    if (!dimensions || data.length === 0) {
      return {
        points: [] as InternalPoint[],
        linePath: '',
        areaPath: '',
        yMin: 0,
        yMax: 0
      };
    }

    const margin = {
      top: 32,
      right: 0,
      bottom: 16,
      left: 0
    };

    const chartWidth = dimensions.width - margin.left - margin.right;
    const chartHeight = dimensions.height - margin.top - margin.bottom;

    // X domain based on accessor
    const xValues = data.map((d, i) => xAccessor(d, i));
    const [xMin, xMax] = extent(xValues) as [number, number];

    // Fallback in case extent fails
    const safeXMin = xMin ?? 0;
    const safeXMax = xMax ?? (data.length > 1 ? data.length - 1 : 1);

    const xScale = scaleLinear()
      .domain([safeXMin, safeXMax])
      .range([margin.left, margin.left + chartWidth]);

    // Y domain based on accessor
    const yValues = data.map((d, i) => yAccessor(d, i));
    const [rawYMin, rawYMax] = extent(yValues) as [number, number];
    const safeYMin = rawYMin ?? 0;
    const safeYMax = rawYMax ?? 1;
    const padding = (safeYMax - safeYMin || 1) * 0.1;

    const yScale = scaleLinear()
      .domain([safeYMin - padding, safeYMax + padding])
      .range([margin.top + chartHeight, margin.top]);

    const scaledPoints: InternalPoint[] = data.map((d, i) => ({
      x: xScale(xAccessor(d, i)),
      y: yScale(yAccessor(d, i)),
      originalIndex: i
    }));

    const lineGenerator = line<InternalPoint>()
      .x(p => p.x)
      .y(p => p.y)
      .curve(curveCatmullRom.alpha(0.25));

    const linePathData = scaledPoints.length ? lineGenerator(scaledPoints) ?? '' : '';

    const chartBottomY = dimensions.height - margin.bottom;
    const areaPathData =
      scaledPoints.length && linePathData
        ? `${linePathData} L ${scaledPoints[scaledPoints.length - 1].x} ${chartBottomY} L ${scaledPoints[0].x} ${chartBottomY} Z`
        : '';

    return {
      points: scaledPoints,
      linePath: linePathData,
      areaPath: areaPathData,
      yMin: safeYMin,
      yMax: safeYMax
    };
  }, [data, xAccessor, yAccessor, dimensions]);

  const handleInteraction = (clientX: number) => {
    if (!dimensions || points.length === 0 || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = clientX - rect.left;

    // Find closest point by x distance
    let closestIndex = 0;
    let minDist = Infinity;
    points.forEach((p, i) => {
      const dist = Math.abs(p.x - mouseX);
      if (dist < minDist) {
        minDist = dist;
        closestIndex = i;
      }
    });

    const point = points[closestIndex];

    setHoverIndex(closestIndex);

    // Tooltip positioning with edge clamping so it never gets clipped by parent overflow
    const tooltipY = Math.max(point.y - 36, 8); // position above point but keep inside
    const tooltipHalfWidth = 75; // approximate half width of tooltip pill
    const chartPadding = 12; // small gutter inside the chart
    const minX = tooltipHalfWidth + chartPadding;
    const maxX = dimensions.width - tooltipHalfWidth - chartPadding;
    const tooltipX = Math.min(Math.max(point.x, minX), maxX);

    setTooltipPos({
      x: tooltipX,
      y: tooltipY
    });

    if (onHoverDatum) {
      onHoverDatum(data[point.originalIndex], point.originalIndex);
    }

  };

  const handleInteractionEnd = () => {
    setHoverIndex(null);
    setTooltipPos(null);
    if (onHoverDatum) {
      onHoverDatum(null, null);
    }
  };

  if (!data.length) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center rounded-3xl ${className ?? ''}`}
        style={{ backgroundColor }}
      >
        <span className="text-xs text-slate-400">No data</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`w-full h-full overflow-hidden ${className ?? ''}`}
      style={{ backgroundColor, position: 'relative' }}
    >
      {dimensions && (
        <svg width={dimensions.width} height={dimensions.height} className="block">
          <defs>
            <linearGradient id={`area-gradient-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={areaGradientFrom} />
              <stop offset="100%" stopColor={areaGradientTo} />
            </linearGradient>

            <clipPath id={`revealed-clip-${uniqueId}`}>
              <rect
                x={0}
                y={0}
                width={
                  hoverIndex !== null && points[hoverIndex]
                    ? points[hoverIndex].x
                    : dimensions.width
                }
                height={dimensions.height}
              />
            </clipPath>

            <clipPath id={`unrevealed-clip-${uniqueId}`}>
              <rect
                x={
                  hoverIndex !== null && points[hoverIndex]
                    ? points[hoverIndex].x
                    : dimensions.width
                }
                y={0}
                width={
                  hoverIndex !== null && points[hoverIndex]
                    ? dimensions.width - points[hoverIndex].x
                    : 0
                }
                height={dimensions.height}
              />
            </clipPath>
          </defs>

          {/* Revealed area */}
          {areaPath && (
            <path
              d={areaPath}
              fill={`url(#area-gradient-${uniqueId})`}
              clipPath={`url(#revealed-clip-${uniqueId})`}
            />
          )}

          {/* Revealed line */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke={strokeColor}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              clipPath={`url(#revealed-clip-${uniqueId})`}
            />
          )}

          {/* Unrevealed line */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke={unrevealedStrokeColor}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              clipPath={`url(#unrevealed-clip-${uniqueId})`}
              opacity={0.5}
            />
          )}

          {/* Pulsing end dot (simple version, no animation keyframes here) */}
          {points.length > 0 && (
            <circle
              cx={points[points.length - 1].x}
              cy={points[points.length - 1].y}
              r={3.5}
              fill={strokeColor}
              opacity={hoverIndex === null ? 1 : 0}
            />
          )}

          {/* Hover dot */}
          {hoverIndex !== null && points[hoverIndex] && (
            <circle
              cx={points[hoverIndex].x}
              cy={points[hoverIndex].y}
              r={6}
              fill={strokeColor}
              stroke="#F7F4F4"
              strokeWidth={3}
            />
          )}

          {/* Vertical line from hovered point up into the tooltip */}
          {hoverIndex !== null && points[hoverIndex] && tooltipPos && (
            <line
              stroke="rgba(249, 115, 22, 0.4)"
              strokeWidth={1}
              strokeDasharray="4 4"
              opacity={1}
              x1={points[hoverIndex].x}
              x2={points[hoverIndex].x}
              y1={points[hoverIndex].y}
              y2={tooltipPos.y + 16}
            />
          )}

          {/* Transparent overlay for pointer events */}
          <rect
            x={0}
            y={0}
            width={dimensions.width}
            height={dimensions.height}
            fill="transparent"
            onMouseMove={event => handleInteraction(event.clientX)}
            onMouseLeave={handleInteractionEnd}
            onTouchMove={event => {
              const touch = event.touches[0];
              handleInteraction(touch.clientX);
            }}
            onTouchEnd={handleInteractionEnd}
          />
        </svg>
      )}

      {/* Tooltip */}
      {hoverIndex !== null && tooltipPos && tooltipLabelFormatter && (
        <div
          className="absolute bg-white text-[#111827] px-2 py-1 rounded-full text-xs font-semibold leading-none pointer-events-none z-[1000] shadow-lg whitespace-nowrap"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: 'translateX(-50%)'
          }}
        >
          {tooltipLabelFormatter(data[hoverIndex], hoverIndex)}
        </div>
      )}
    </div>
  );
}



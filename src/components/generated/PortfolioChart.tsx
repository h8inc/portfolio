import React, { useState, useMemo, useRef, useEffect } from 'react';
type Period = '1W' | '1M' | '3M' | '6M' | '1Y' | 'ALL';
type PortfolioChartProps = {
  className?: string;
  variant?: 'mobile' | 'web';
  selectedPeriod?: Period;
  onPeriodChange?: (period: Period) => void;
  onHoverValue?: (value: number | null) => void;
};

// Generate much more data points for granular daily data
const generateDailyData = (days: number) => {
  const data: Array<{
    value: number;
  }> = [];
  let value = 180000;
  for (let i = 0; i < days; i++) {
    // Add realistic daily volatility
    const change = (Math.random() - 0.5) * 15000;
    value = Math.max(140000, Math.min(220000, value + change));
    data.push({
      value
    });
  }
  return data;
};

// Generate 90 days of data (enough for all periods)
const DAILY_DATA = generateDailyData(90);
const getDataForPeriod = (period: Period) => {
  const daysMap: Record<Period, number> = {
    '1W': 7,
    '1M': 30,
    '3M': 90,
    '6M': 90,
    '1Y': 90,
    'ALL': 90
  };
  const days = daysMap[period];
  const today = new Date();
  return DAILY_DATA.slice(0, days).map((item, index) => ({
    index,
    value: item.value,
    // Count backwards from today
    date: new Date(today.getTime() - (days - index - 1) * 24 * 60 * 60 * 1000)
  }));
};
const formatValue = (value: number) => {
  return `${(value / 1000).toFixed(2)}K`;
};
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Generate smooth curve points using bezier interpolation
const generateSmoothPath = (points: Array<{
  x: number;
  y: number;
}>, tension: number = 0.25): string => {
  if (points.length < 2) return '';
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || points[i + 1];
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return path;
};
export const PortfolioChart = ({
  className,
  variant = 'web',
  selectedPeriod: externalSelectedPeriod,
  onPeriodChange,
  onHoverValue
}: PortfolioChartProps) => {
  const [internalSelectedPeriod, setInternalSelectedPeriod] = useState<Period>('3M');
  const selectedPeriod = externalSelectedPeriod ?? internalSelectedPeriod;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Generate a unique ID for this component instance to prevent gradient leaking
  const uniqueId = useRef(`chart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`).current;

  // Refs for the revealed/unrevealed paths and areas
  const revealedLineRef = useRef<SVGPathElement | null>(null);
  const unrevealedLineRef = useRef<SVGPathElement | null>(null);
  const revealedAreaRef = useRef<SVGPathElement | null>(null);
  const revealedClipRef = useRef<SVGRectElement | null>(null);
  const unrevealedClipRef = useRef<SVGRectElement | null>(null);
  const endDotRef = useRef<SVGCircleElement | null>(null);
  const data = useMemo(() => getDataForPeriod(selectedPeriod), [selectedPeriod]);
  const periods: Period[] = ['1W', '1M', '3M', '6M', '1Y', 'ALL'];
  const isMobile = variant === 'mobile';
  useEffect(() => {
    if (!svgRef.current || !containerRef.current || data.length === 0) return;
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    // Responsive margins - add right margin for value labels
    const margin = isMobile ? {
      top: 40,
      right: 80,
      bottom: 12,
      left: 0
    } : {
      top: 50,
      right: 90,
      bottom: 12,
      left: 0
    };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;
    const chartBottomY = containerHeight - margin.bottom;

    // Calculate scales - extend the chart further to the right
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const padding = (maxValue - minValue) * 0.1;
    const xScale = (index: number) => {
      // Scale from edge to edge within the container
      return index / (data.length - 1) * (containerWidth - margin.right);
    };
    const yScale = (value: number) => {
      return margin.top + height - (value - (minValue - padding)) / (maxValue + padding - (minValue - padding)) * height;
    };

    // Generate points for the chart
    const points = data.map(d => ({
      x: xScale(d.index),
      y: yScale(d.value),
      value: d.value,
      index: d.index,
      date: d.date
    }));

    // Clear SVG
    const svg = svgRef.current;
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    // Set SVG dimensions
    svg.setAttribute('width', containerWidth.toString());
    svg.setAttribute('height', containerHeight.toString());

    // Create defs for gradient and clip paths
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

    // Create gradient for area fill
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', `area-gradient-${uniqueId}`);
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '0%');
    gradient.setAttribute('y2', '100%');
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#8b5cf6');
    stop1.setAttribute('stop-opacity', '0.3');
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#8b5cf6');
    stop2.setAttribute('stop-opacity', '0');
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);

    // Clip path for revealed section (left of pointer)
    const revealedClip = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
    revealedClip.setAttribute('id', `revealed-clip-${uniqueId}`);
    const revealedRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    revealedRect.setAttribute('x', '0');
    revealedRect.setAttribute('y', '0');
    revealedRect.setAttribute('width', containerWidth.toString());
    revealedRect.setAttribute('height', containerHeight.toString());
    revealedClipRef.current = revealedRect;
    revealedClip.appendChild(revealedRect);
    defs.appendChild(revealedClip);

    // Clip path for unrevealed section (right of pointer)
    const unrevealedClip = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
    unrevealedClip.setAttribute('id', `unrevealed-clip-${uniqueId}`);
    const unrevealedRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    unrevealedRect.setAttribute('x', '0');
    unrevealedRect.setAttribute('y', '0');
    unrevealedRect.setAttribute('width', '0');
    unrevealedRect.setAttribute('height', containerHeight.toString());
    unrevealedClipRef.current = unrevealedRect;
    unrevealedClip.appendChild(unrevealedRect);
    defs.appendChild(unrevealedClip);
    svg.appendChild(defs);

    // // Add grid lines - exactly 5 horizontal dashed lines
    // const yTickCount = 5;
    // for (let i = 0; i < yTickCount; i++) {
    //   const value = minValue - padding + (maxValue + padding - (minValue - padding)) * i / (yTickCount - 1);
    //   const y = yScale(value);
    //   const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    //   line.setAttribute('x1', margin.left.toString());
    //   line.setAttribute('x2', containerWidth.toString());
    //   line.setAttribute('y1', y.toString());
    //   line.setAttribute('y2', y.toString());
    //   line.setAttribute('stroke', 'rgba(99, 102, 241, 0.12)');
    //   line.setAttribute('stroke-width', '1');
    //   line.setAttribute('stroke-dasharray', '4 8');
    //   svg.appendChild(line);
    // }

    // // Add grid lines - exactly 7 vertical dotted lines
    // const xTickCount = 7;
    // for (let i = 0; i < xTickCount; i++) {
    //   // Map evenly across the 90% width where data is plotted
    //   const x = margin.left + i / (xTickCount - 1) * (width * 0.9);
    //   const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    //   line.setAttribute('x1', x.toString());
    //   line.setAttribute('x2', x.toString());
    //   line.setAttribute('y1', margin.top.toString());
    //   line.setAttribute('y2', (containerHeight - margin.bottom).toString());
    //   line.setAttribute('stroke', 'rgba(99, 102, 241, 0.08)');
    //   line.setAttribute('stroke-width', '1');
    //   line.setAttribute('stroke-dasharray', '2 4');
    //   svg.appendChild(line);
    // }

    // Generate path data
    const linePathData = generateSmoothPath(points);
    const areaPathData = linePathData + ` L ${points[points.length - 1].x} ${chartBottomY}` + ` L ${points[0].x} ${chartBottomY} Z`;

    // Create REVEALED area fill (with gradient, clipped to left of pointer)
    const revealedArea = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    revealedArea.setAttribute('d', areaPathData);
    revealedArea.setAttribute('fill', `url(#area-gradient-${uniqueId})`);
    revealedArea.setAttribute('clip-path', `url(#revealed-clip-${uniqueId})`);
    revealedAreaRef.current = revealedArea;
    svg.appendChild(revealedArea);

    // Create REVEALED line (purple, clipped to left of pointer)
    const revealedLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    revealedLine.setAttribute('d', linePathData);
    revealedLine.setAttribute('fill', 'none');
    revealedLine.setAttribute('stroke', '#8b5cf6');
    revealedLine.setAttribute('stroke-width', isMobile ? '2' : '2.5');
    revealedLine.setAttribute('stroke-linecap', 'round');
    revealedLine.setAttribute('stroke-linejoin', 'round');
    revealedLine.setAttribute('vector-effect', 'non-scaling-stroke');
    revealedLine.setAttribute('clip-path', `url(#revealed-clip-${uniqueId})`);
    revealedLineRef.current = revealedLine;
    svg.appendChild(revealedLine);

    // Create UNREVEALED line (grey, clipped to right of pointer)
    const unrevealedLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    unrevealedLine.setAttribute('d', linePathData);
    unrevealedLine.setAttribute('fill', 'none');
    unrevealedLine.setAttribute('stroke', '#4b5563');
    unrevealedLine.setAttribute('stroke-width', isMobile ? '2' : '2.5');
    unrevealedLine.setAttribute('stroke-linecap', 'round');
    unrevealedLine.setAttribute('stroke-linejoin', 'round');
    unrevealedLine.setAttribute('vector-effect', 'non-scaling-stroke');
    unrevealedLine.setAttribute('clip-path', `url(#unrevealed-clip-${uniqueId})`);
    unrevealedLine.setAttribute('opacity', '0.5');
    unrevealedLineRef.current = unrevealedLine;
    svg.appendChild(unrevealedLine);

    // Add pulsing dot at the end of the line
    const lastPoint = points[points.length - 1];
    const endDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    endDot.setAttribute('cx', lastPoint.x.toString());
    endDot.setAttribute('cy', lastPoint.y.toString());
    endDot.setAttribute('r', isMobile ? '3' : '3.5');
    endDot.setAttribute('fill', '#8b5cf6');
    endDot.setAttribute('class', 'pulse-dot');
    endDot.setAttribute('opacity', '1');
    endDotRef.current = endDot;
    svg.appendChild(endDot);

    // Add CSS animation for pulsing effect
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse-dot {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.6;
          transform: scale(1.2);
        }
      }
      .pulse-dot {
        animation: pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        transform-origin: center;
        transform-box: fill-box;
      }
    `;
    if (!document.querySelector('#pulse-dot-style')) {
      style.id = 'pulse-dot-style';
      document.head.appendChild(style);
    }

    // Animate the revealed line on initial load
    const totalLength = revealedLine.getTotalLength?.() || 0;
    revealedLine.setAttribute('stroke-dasharray', totalLength.toString());
    revealedLine.setAttribute('stroke-dashoffset', totalLength.toString());

    // Trigger animation
    if (revealedLine.animate) {
      revealedLine.animate([{
        strokeDashoffset: totalLength
      }, {
        strokeDashoffset: 0
      }], {
        duration: 800,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fill: 'forwards'
      });
    }

    // Add vertical indicator line (initially hidden)
    const verticalLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    verticalLine.setAttribute('stroke', 'rgba(139, 92, 246, 0.4)');
    verticalLine.setAttribute('stroke-width', '1');
    verticalLine.setAttribute('stroke-dasharray', '4 4');
    verticalLine.setAttribute('opacity', '0');
    svg.appendChild(verticalLine);

    // Add interactive dots group
    const dotsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    dotsGroup.setAttribute('id', 'dots-group');
    svg.appendChild(dotsGroup);

    // Add a single dot for hover
    const hoverDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    hoverDot.setAttribute('r', '0');
    hoverDot.setAttribute('fill', '#8b5cf6');
    hoverDot.setAttribute('stroke', '#1f2937');
    hoverDot.setAttribute('stroke-width', isMobile ? '2' : '3');
    hoverDot.setAttribute('opacity', '0');
    dotsGroup.appendChild(hoverDot);

    // Add value labels AFTER grid lines so they layer on top
    const labelFontSize = isMobile ? '10' : '11';
    const labelXOffset = isMobile ? 8 : 10;
    const maxLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    maxLabel.setAttribute('x', (containerWidth - margin.right + labelXOffset).toString());
    maxLabel.setAttribute('y', (margin.top + 5).toString());
    maxLabel.setAttribute('fill', '#9ca3af');
    maxLabel.setAttribute('font-size', labelFontSize);
    maxLabel.setAttribute('font-weight', '500');
    maxLabel.setAttribute('text-anchor', 'start');
    maxLabel.textContent = formatValue(maxValue);
    svg.appendChild(maxLabel);
    const minLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    minLabel.setAttribute('x', (containerWidth - margin.right + labelXOffset).toString());
    minLabel.setAttribute('y', (containerHeight - margin.bottom + 5).toString());
    minLabel.setAttribute('fill', '#9ca3af');
    minLabel.setAttribute('font-size', labelFontSize);
    minLabel.setAttribute('font-weight', '500');
    minLabel.setAttribute('text-anchor', 'start');
    minLabel.textContent = formatValue(minValue);
    svg.appendChild(minLabel);

    // Add invisible overlay for hover detection with daily granularity
    const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    overlay.setAttribute('x', margin.left.toString());
    overlay.setAttribute('y', margin.top.toString());
    overlay.setAttribute('width', width.toString());
    overlay.setAttribute('height', height.toString());
    overlay.setAttribute('fill', 'transparent');
    overlay.setAttribute('pointer-events', 'all');
    const handleInteraction = (clientX: number, clientY: number) => {
      const rect = svg.getBoundingClientRect();
      const mouseX = clientX - rect.left;

      // Hide the pulsing end dot when hovering
      if (endDotRef.current) {
        endDotRef.current.style.opacity = '0';
      }

      // Map mouse X to data index - full width mapping
      const relativeX = mouseX - margin.left;
      const normalizedX = Math.max(0, Math.min(1, relativeX / width));

      // Map the entire width proportionally to all data points
      const exactIndex = normalizedX * (data.length - 1);
      const closestIndex = Math.round(exactIndex);
      if (closestIndex >= 0 && closestIndex < data.length) {
        const point = points[closestIndex];

        // Update clip paths for reveal effect
        if (revealedClipRef.current && unrevealedClipRef.current) {
          // Revealed section: from left edge to pointer
          revealedClipRef.current.setAttribute('x', '0');
          revealedClipRef.current.setAttribute('width', point.x.toString());

          // Unrevealed section: from pointer to right edge
          unrevealedClipRef.current.setAttribute('x', point.x.toString());
          unrevealedClipRef.current.setAttribute('width', (containerWidth - point.x).toString());
        }

        // Calculate tooltip position - use actual mouse X position for better tracking
        const tooltipY = margin.top - (isMobile ? 28 : 33);

        // Smart horizontal positioning: calculate pill position with edge detection
        const tooltipWidth = isMobile ? 110 : 130;
        const tooltipHalfWidth = tooltipWidth / 2;
        // Use actual mouseX position instead of point.x for precise tracking
        const pointRelativeX = mouseX;

        // Calculate the ideal centered position
        let finalX = pointRelativeX;
        let transformX = '-50%'; // Default center transform

        // Check if tooltip would overflow left edge
        if (pointRelativeX - tooltipHalfWidth < 0) {
          finalX = tooltipHalfWidth; // Position so the center is at half-width
          transformX = '-50%'; // Keep centered transform
        }
        // Check if tooltip would overflow right edge
        else if (pointRelativeX + tooltipHalfWidth > containerWidth) {
          finalX = containerWidth - tooltipHalfWidth;
          transformX = '-50%'; // Keep centered transform
        }
        setHoveredIndex(closestIndex);
        setTooltipPos({
          x: finalX,
          y: tooltipY
        });

        // Emit the hovered value to parent
        onHoverValue?.(point.value);

        // Show and position the dot
        hoverDot.setAttribute('cx', point.x.toString());
        hoverDot.setAttribute('cy', point.y.toString());
        hoverDot.setAttribute('r', isMobile ? '5' : '6');
        hoverDot.setAttribute('opacity', '1');

        // Show and position the vertical line
        verticalLine.setAttribute('x1', point.x.toString());
        verticalLine.setAttribute('x2', point.x.toString());
        verticalLine.setAttribute('y1', margin.top.toString());
        verticalLine.setAttribute('y2', chartBottomY.toString());
        verticalLine.setAttribute('opacity', '1');
      }
    };
    const handleInteractionEnd = () => {
      setHoveredIndex(null);
      setTooltipPos(null);
      onHoverValue?.(null);
      hoverDot.setAttribute('r', '0');
      hoverDot.setAttribute('opacity', '0');
      verticalLine.setAttribute('opacity', '0');

      // Show the pulsing end dot again
      if (endDotRef.current) {
        endDotRef.current.style.opacity = '1';
      }

      // Reset clip paths to show full chart
      if (revealedClipRef.current && unrevealedClipRef.current) {
        revealedClipRef.current.setAttribute('width', containerWidth.toString());
        unrevealedClipRef.current.setAttribute('width', '0');
      }
    };

    // Mouse events
    overlay.addEventListener('mousemove', event => {
      handleInteraction(event.clientX, event.clientY);
    });
    overlay.addEventListener('mouseout', handleInteractionEnd);

    // Touch events for mobile
    overlay.addEventListener('touchmove', event => {
      event.preventDefault();
      const touch = event.touches[0];
      handleInteraction(touch.clientX, touch.clientY);
    });
    overlay.addEventListener('touchend', handleInteractionEnd);
    svg.appendChild(overlay);
  }, [data, isMobile, variant, onHoverValue]);
  const handlePeriodClick = (period: Period) => {
    if (onPeriodChange) {
      onPeriodChange(period);
    } else {
      setInternalSelectedPeriod(period);
    }
  };
  if (isMobile) {
    return <div className={`w-full h-full bg-[#0f1419] flex flex-col overflow-hidden ${className || ''}`}>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Chart Section - Responsive aspect ratio */}
          <div className="w-full flex-1 relative overflow-hidden">
            <div ref={containerRef} className="absolute inset-0 bg-[#0f1419] overflow-hidden">
              <svg ref={svgRef} className="w-full h-full block"></svg>
              {hoveredIndex !== null && tooltipPos && data[hoveredIndex] && <div ref={tooltipRef} className="absolute bg-white text-[#111827] px-2 py-1 rounded-full text-[10px] font-semibold leading-none pointer-events-none z-[1000] shadow-lg whitespace-nowrap" style={{
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y}px`,
              transform: 'translateX(-50%)'
            }}>
                  <span>{formatDate(data[hoveredIndex].date)}</span>
                </div>}
            </div>
          </div>

          {/* Period Selector */}
          <div className="flex items-center justify-center gap-1 py-3 flex-shrink-0" style={{
          paddingBottom: "30px"
        }}>
            {periods.map(period => <button key={period} onClick={() => handlePeriodClick(period)} className={`
                  px-4 py-0.5 rounded-full text-sm font-medium tracking-wide transition-all duration-200
                  ${selectedPeriod === period ? 'bg-[#1f2937] text-[#e5e7eb] shadow-lg' : 'bg-transparent text-[#6b7280] hover:text-[#9ca3af]'}
                `}>
                <span>{period}</span>
              </button>)}
          </div>
        </div>
      </div>;
  }

  // Web variant
  return <div className={`w-full h-full bg-[#0f1419] flex flex-col overflow-hidden isolate ${className || ''}`} style={{
    contain: 'layout paint style',
    clipPath: 'inset(0)',
    isolation: 'isolate'
  }}>
      <div className="w-full h-full max-w-7xl mx-auto flex flex-col overflow-hidden" style={{
      isolation: 'isolate',
      clipPath: 'inset(0)'
    }}>
        {/* Chart Section */}
        <div className="w-full flex-1 min-h-0 overflow-hidden isolate" style={{
        contain: 'layout paint style',
        clipPath: 'inset(0)',
        isolation: 'isolate'
      }}>
          <div ref={containerRef} className="relative w-full h-full bg-[#0f1419] overflow-hidden isolate" style={{
          contain: 'layout paint style',
          clipPath: 'inset(0)',
          isolation: 'isolate'
        }}>
            <svg ref={svgRef} className="w-full h-full block overflow-hidden" style={{
            contain: 'layout paint style',
            clipPath: 'inset(0)',
            isolation: 'isolate'
          }}></svg>
            {hoveredIndex !== null && tooltipPos && data[hoveredIndex] && <div ref={tooltipRef} className="absolute bg-white text-[#111827] px-2 py-1 rounded-full text-xs font-semibold leading-none pointer-events-none z-[1000] shadow-lg whitespace-nowrap" style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: 'translateX(-50%)'
          }}>
                <span>{formatDate(data[hoveredIndex].date)}</span>
              </div>}
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex items-center justify-center gap-1 py-4 flex-shrink-0">
          {periods.map(period => <button key={period} onClick={() => handlePeriodClick(period)} className={`
                px-4 py-0.5 rounded-full text-sm font-medium tracking-wide transition-all duration-200
                ${selectedPeriod === period ? 'bg-[#1f2937] text-[#e5e7eb] shadow-lg' : 'bg-transparent text-[#6b7280] hover:text-[#9ca3af]'}
              `}>
              <span>{period}</span>
            </button>)}
        </div>
      </div>
    </div>;
};
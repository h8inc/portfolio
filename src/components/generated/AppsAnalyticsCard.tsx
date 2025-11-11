import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
type AppsAnalyticsCardProps = {
  value?: number;
  label?: string;
  data?: number[];
  months?: string[];
  years?: string[];
  accentColor?: string;
  backgroundColor?: string;
  className?: string;
};
const defaultData = [210.53, 203.24, 187.38, 185.66, 179.66, 164.22, 158.22, 156.07, 150.50, 138.92, 132.06, 123.05, 117.05, 111.05, 104.19, 99.04, 92.61, 84.89, 76.31, 64.73, 55.73, 48.44, 41.15, 36.86, 30];
const defaultMonths = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const visibleMonthIndices = [0, 4, 8, 12, 16, 20, 24];

// @component: AppsAnalyticsCard
export const AppsAnalyticsCard = ({
  value = 583,
  label = 'Apps',
  data = defaultData,
  months = defaultMonths,
  years = ['2023', '2025'],
  accentColor = 'rgb(34, 201, 140)',
  backgroundColor = 'rgb(247, 244, 244)',
  className = ''
}: AppsAnalyticsCardProps) => {
  const maxValue = 280;
  const chartHeight = 280;
  const barWidth = 9;
  const barCount = data.length;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState<number | null>(null);
  const [chartWidth, setChartWidth] = useState<number>(225);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive chart width calculation
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        // Calculate optimal chart width based on container
        const optimalWidth = Math.min(containerWidth - 60, barCount * barWidth);
        setChartWidth(optimalWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [barCount]);

  // Convert chart Y value back to actual data value
  const chartYToValue = (chartY: number): number => {
    const ratio = (chartHeight - chartY) / chartHeight;
    return Math.round(ratio * maxValue);
  };
  const handleInteraction = (clientX: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = clientX - rect.left;

    // Find the closest bar
    const index = Math.floor(x / barWidth);
    if (index >= 0 && index < data.length) {
      setHoveredIndex(index);
      setHoverX(index * barWidth + barWidth / 2);
    }
  };
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    handleInteraction(e.clientX);
  };
  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      handleInteraction(e.touches[0].clientX);
    }
  };
  const handleInteractionEnd = () => {
    setHoveredIndex(null);
    setHoverX(null);
  };

  // Display value - either hovered value or default
  const displayValue = hoveredIndex !== null ? chartYToValue(data[hoveredIndex]) : value;

  // @return
  return <div ref={containerRef} className={`relative flex flex-col w-full max-w-md rounded-[30px] p-[30px] overflow-hidden cursor-pointer shadow-2xl ${className}`} style={{
    backgroundColor,
    boxShadow: 'rgba(255, 255, 255, 0.18) 0px 0px 30px 0px inset',
    aspectRatio: '285/431'
  }}>
      <div className="relative w-full h-full flex flex-col">
        <div className="flex flex-col gap-[5px] text-[#130F25] uppercase" style={{ fontFamily: 'Aeonik Extended' }}>
          <div className="text-[32px] leading-[32px] font-normal transition-all duration-200">
            {displayValue}
          </div>
          <div className="text-[12px] flex items-center gap-[10px]">
            <div className="w-[11px] h-[11px] rounded-full -mt-[2px]" style={{
            backgroundColor: accentColor
          }} />
            {label}
          </div>
        </div>

        <svg ref={svgRef} width="100%" height="auto" viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="mt-0 flex-1" preserveAspectRatio="xMidYMid meet" onMouseMove={handleMouseMove} onMouseLeave={handleInteractionEnd} onTouchMove={handleTouchMove} onTouchEnd={handleInteractionEnd} style={{
        touchAction: 'none'
      }}>
          {data.map((dataPoint, index) => {
          const x = index * barWidth;
          const y1 = chartHeight;
          const y2 = dataPoint;
          const isLast = index === data.length - 1;
          const isHovered = index === hoveredIndex;
          const strokeColor = isHovered || isLast ? accentColor : 'rgba(27, 27, 74, 0.1)';
          return <g key={index}>
                <rect x={x} y="0" width={barWidth} height={chartHeight} fill="transparent" />
                <line x1={x + barWidth / 2} y1={y1} x2={x + barWidth / 2} y2={y2} stroke={strokeColor} strokeWidth="2" strokeLinecap="round" className="transition-colors duration-150" />
                {(isLast || isHovered) && <circle cx={x + barWidth / 2} cy={y2} r="3" fill={accentColor} className="transition-opacity duration-150" />}
              </g>;
        })}
          
          {/* Hover line indicator */}
          {hoverX !== null && hoveredIndex !== null && <line x1={hoverX} y1={0} x2={hoverX} y2={chartHeight} stroke={accentColor} strokeWidth="1" opacity="0.3" className="pointer-events-none" />}
        </svg>

        <div className="flex justify-between mt-1 uppercase text-[#130F25] w-full" style={{ fontFamily: 'Aeonik' }}>
          {months.map((month, index) => <div key={index} className="flex-1 text-center text-[10px] opacity-70 flex items-center justify-center" style={{
          visibility: visibleMonthIndices.includes(index) ? 'visible' : 'hidden'
        }}>
              {month}
            </div>)}
        </div>

        <div className="flex justify-between mt-[2px] font-medium uppercase opacity-30 text-[#130F25] w-full" style={{ fontFamily: 'Aeonik' }}>
          <div className="text-[11px] text-center">{years[0]}</div>
          <div className="text-[11px] text-center">{years[1]}</div>
        </div>
      </div>

      <ArrowUpRight className="absolute top-5 right-5 w-[30px] h-[30px] z-10" strokeWidth={1.5} color="#130F25" />

      <ArrowUpRight className="absolute top-[11px] right-[11px] w-12 h-12 z-10 opacity-40" strokeWidth={1.5} color="#130F25" style={{
      filter: 'blur(11px)'
    }} />

      <div className="absolute bottom-[-30px] right-[-50px] w-[266px] h-[124px] z-10 opacity-60 pointer-events-none">
        <div className="relative w-full h-full overflow-visible">
          <div className="absolute top-0 bottom-0 right-0 w-[124px] aspect-square rounded-full opacity-55" style={{
          backgroundColor: accentColor,
          filter: 'blur(81px)'
        }} />
          <div className="absolute top-0 bottom-0 left-0 w-[124px] aspect-square rounded-full opacity-36" style={{
          backgroundColor: 'rgb(139, 92, 246)',
          filter: 'blur(81px)'
        }} />
        </div>
      </div>

      <span className="absolute inset-0 rounded-[30px] pointer-events-none" />
    </div>;
};
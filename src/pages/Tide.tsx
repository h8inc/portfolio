import { GradientBackground } from '../components/generated/GradientBackground';
import { InteractiveTimeline } from '../components/generated/InteractiveTimeline';
import { TidePerformanceChart } from '../components/tide/TidePerformanceChart';
import React, { useMemo, useMemo as _useMemo, useRef } from 'react';
import { typography } from '../design/typography';
import { MarqueeBanner } from '../components/MarqueeBanner';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '../hooks/use-mobile';

function Tide() {
  // Tide ARR trajectory (mid-2023 through today)
  const { tideData, activationMilestones } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const arrMilestones = [
      { date: new Date('2023-06-01'), value: 0 }, // joining point
      { date: new Date('2023-12-01'), value: 500_000 },
      { date: new Date('2024-06-01'), value: 900_000 },
      { date: new Date('2024-11-01'), value: 2_000_000 },
      { date: new Date('2025-04-01'), value: 4_000_000 },
      { date: today, value: 7_600_000 }
    ];

    const activationMilestones = [
      { date: new Date('2023-06-01'), value: 0.95 },
      { date: new Date('2024-02-01'), value: 1.6 },
      { date: new Date('2024-09-01'), value: 3.8 },
      { date: today, value: 21.2 }
    ];

    const approxWeekMs = 7 * 24 * 60 * 60 * 1000;
    const points: Array<{ date: Date; value: number }> = [];

    for (let i = 0; i < arrMilestones.length - 1; i++) {
      const start = arrMilestones[i];
      const end = arrMilestones[i + 1];
      const duration = end.date.getTime() - start.date.getTime();
      const steps = Math.max(2, Math.round(duration / approxWeekMs));

      for (let step = 0; step < steps; step++) {
        if (i > 0 && step === 0) continue; // avoid duplicate points at segment seams
        const t = step / (steps - 1);
        const date = new Date(start.date.getTime() + duration * t);
        const value = start.value + (end.value - start.value) * t;
        points.push({ date, value });
      }
    }

    const lastMilestone = arrMilestones[arrMilestones.length - 1];
    if (
      !points.length ||
      points[points.length - 1].date.getTime() !== lastMilestone.date.getTime()
    ) {
      points.push(lastMilestone);
    }

    return {
      tideData: points,
      activationMilestones
    };
  }, []);

  // Scroll-coupled tanks setup
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start']
  });
  const isMobile = useIsMobile();
  const dropBase = isMobile ? 220 : 420;
  const driftBase = isMobile ? 12 : 28;
  const maxMockWidth = isMobile ? 200 : 240;
  const maxMockHeight = isMobile ? 420 : 520;
  const columnOffset = isMobile ? '-3rem' : '-6rem';

  // Left and right mock configurations (checkerboard layout)
  const leftItems = [
    { id: 'L1', gridColumn: '1 / span 1', gridRow: '1', dropFactor: 0.9, rotateRange: -6, driftX: -driftBase },
    { id: 'L2', gridColumn: '2 / span 1', gridRow: '1', dropFactor: 1.05, rotateRange: 6, driftX: driftBase * 0.6 },
    { id: 'L3', gridColumn: '1 / span 1', gridRow: '2', dropFactor: 1.2, rotateRange: -4, driftX: -driftBase * 0.4 }
  ] as const;

  const rightItems = [
    { id: 'R1', gridColumn: '2 / span 1', gridRow: '1', dropFactor: 0.9, rotateRange: 6, driftX: driftBase },
    { id: 'R2', gridColumn: '1 / span 1', gridRow: '1', dropFactor: 1.05, rotateRange: -6, driftX: -driftBase * 0.6 },
    { id: 'R3', gridColumn: '2 / span 1', gridRow: '2', dropFactor: 1.2, rotateRange: 4, driftX: driftBase * 0.4 }
  ] as const;

  const visibleLeft = isMobile ? leftItems.slice(0, 2) : leftItems;
  const visibleRight = isMobile ? rightItems.slice(0, 2) : rightItems;

  // Available mock images (cycle if fewer than items)
  const leftMockNames = [
    'Cash flow - current month.png',
    'Future-Insights-after-slice-5.png',
    'Registered Business - VAT registered - Connected (subscribed).png'
  ];
  const rightMockNames = [
    '✅ Admin - no tasks comeplete.png',
    'Bookkeeping - Slice 4.png',
    'Tax Account timeline.png'
  ];
  const leftMockImages = leftMockNames.map((name) => encodeURI(`/assets/${name}`));
  const rightMockImages = rightMockNames.map((name) => encodeURI(`/assets/${name}`));

  // Helpers to build transforms per item: downward drift + slight horizontal / rotation
  const buildTransforms = (dropFactor: number, driftX: number, rotateRange: number) => {
    const x = useTransform(scrollYProgress, [0, 1], [0, driftX], { clamp: false });
    const y = useTransform(scrollYProgress, [0, 1], [0, dropFactor * dropBase], { clamp: false });
    const rotate = useTransform(scrollYProgress, [0, 1], [0, rotateRange], { clamp: false });
    return { x, y, rotate };
  };

  return (
    <GradientBackground>
      {/* HERO SECTION ON GRADIENT BACKGROUND */}
      <section ref={heroRef} className="relative z-10 w-full min-h-[140vh] pb-8">
        <div className="w-full h-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto h-full">
            {/* Parallax / sticky hero widget */}
            <div className="relative h-[calc(140vh-32px)] flex items-start justify-center gap-3 sm:gap-6">
              {/* Left column */}
              <div
                aria-hidden
                className="hidden sm:grid pointer-events-none flex-shrink-0 grid-cols-2 gap-4"
                style={{ width: 'clamp(160px, 18vw, 300px)' }}
              >
                {visibleLeft.map((item, idx) => {
                  const { x, y, rotate } = buildTransforms(
                    item.dropFactor,
                    item.driftX,
                    item.rotateRange
                  );
                  const src = leftMockImages[idx % leftMockImages.length];
                  return (
                    <motion.img
                      key={item.id}
                      className="rounded-[1rem] object-contain"
                      style={{
                        gridColumn: item.gridColumn,
                        gridRow: item.gridRow,
                        width: 'auto',
                        height: 'auto',
                        maxWidth: `${maxMockWidth}px`,
                        maxHeight: `${maxMockHeight}px`,
                        justifySelf: 'center',
                        alignSelf: 'center',
                        marginTop: columnOffset,
                        x,
                        y,
                        rotate
                      }}
                      src={src}
                      alt="Tide mockup"
                      draggable={false}
                    />
                  );
                })}
              </div>

              <div className="w-full sticky top-[20px] relative z-10">
                <div className="w-full flex justify-center">
                  <div className="w-full max-w-3xl bg-[#FAF7F0] rounded-[2.5rem] sm:rounded-[3rem] px-6 sm:px-10 py-8 sm:py-10 md:py-12 content-card-shell">
                    {/* Optional top marquee stripe */}
                    <div className="bg-white py-3 sm:py-4 overflow-hidden relative z-10 rounded-t-[2.5rem] sm:rounded-t-[3rem] -mx-6 sm:-mx-10 -mt-8 sm:-mt-10 md:-mt-12 mb-6 sm:mb-8">
                      <MarqueeBanner
                        speed={40}
                        gradient={false}
                        items={[
                          <img src="/assets/tide-logo-white-noreg-1.svg" alt="Tide" className="h-3 sm:h-4" />,
                          <span className="font-bold tracking-wider" style={{ fontFamily: 'Aeonik Extended' }}>Accounting</span>,
                          <img src="/assets/tide-logo-white-noreg-1.svg" alt="Tide" className="h-3 sm:h-4" />,
                          <span className="font-bold tracking-wider" style={{ fontFamily: 'Aeonik Extended' }}>Invoices</span>,
              
                          <span className="font-bold tracking-wider" style={{ fontFamily: 'Aeonik Extended' }}>Tax</span>,
              
                          <span className="font-bold tracking-wider" style={{ fontFamily: 'Aeonik Extended' }}>Payroll</span>,
                          <img src="/assets/tide-logo-white-noreg-1.svg" alt="Tide" className="h-3 sm:h-4" />,
                          <span className="font-bold tracking-wider" style={{ fontFamily: 'Aeonik Extended' }}>Financial Insights & Planning</span>,
                          
                          <span className="font-bold tracking-wider" style={{ fontFamily: 'Aeonik Extended' }}>Secretary</span>,
                        ]}
                      />
                    </div>
                    <div className="text-center">
                      <h1
                        className={`${typography.h1.className} mb-4`}
                        style={typography.h1.style}
                      >
                        Designing a portfolio of subscription products
                      </h1>
                      <p
                        className={`${typography.subheader.className} max-w-2xl mx-auto`}
                        style={typography.subheader.style}
                      >
                        From a small bookkeeping add‑on to multi‑million
          SaaS product portfolio touching Tide&apos;s 1M+ member base
                      </p>
                    </div>
                    {/* Edge-to-edge chart (offset horizontal padding) */}
                    <div className="mt-6 -mx-6 sm:-mx-10">
                      <div className="w-full h-64 rounded-b-[2.5rem] sm:rounded-b-[3rem] overflow-hidden">
                        <TidePerformanceChart
                          data={tideData}
                          activationMilestones={activationMilestones}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div
                aria-hidden
                className="hidden sm:grid pointer-events-none flex-shrink-0 grid-cols-2 gap-4"
                style={{ width: 'clamp(160px, 18vw, 300px)' }}
              >
                {visibleRight.map((item, idx) => {
                  const { x, y, rotate } = buildTransforms(
                    item.dropFactor,
                    item.driftX,
                    item.rotateRange
                  );
                  const src = rightMockImages[idx % rightMockImages.length];
                  return (
                    <motion.img
                      key={item.id}
                      className="rounded-[1rem] object-contain"
                      style={{
                        gridColumn: item.gridColumn,
                        gridRow: item.gridRow,
                        width: 'auto',
                        height: 'auto',
                        maxWidth: `${maxMockWidth}px`,
                        maxHeight: `${maxMockHeight}px`,
                        justifySelf: 'center',
                        alignSelf: 'center',
                        marginTop: columnOffset,
                        x,
                        y,
                        rotate
                      }}
                      src={src}
                      alt="Tide mockup"
                      draggable={false}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION ON NEUTRAL BACKGROUND */}
      <section className="relative z-20 w-full bg-[#FAF7F0] py-16 sm:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
           
              <InteractiveTimeline fullScreen={false} />
          
          </div>
        </div>
      </section>
    </GradientBackground>
  );
}

export default Tide;


import { GradientBackground } from '../components/generated/GradientBackground';
import { InteractiveTimeline } from '../components/generated/InteractiveTimeline';
import { TidePerformanceChart } from '../components/tide/TidePerformanceChart';
import React, { useMemo } from 'react';
import { typography } from '../design/typography';
import { MarqueeBanner } from '../components/MarqueeBanner';

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

  return (
    <GradientBackground>
      {/* HERO SECTION ON GRADIENT BACKGROUND */}
      <section className="w-full min-h-[140vh] pb-8">
        <div className="w-full h-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto h-full">
            {/* Parallax / sticky hero widget */}
            <div className="relative h-[calc(140vh-32px)] flex items-start">
              <div className="w-full sticky top-[20px]">
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
                        Designing sticky products
                      </h1>
                      <p
                        className={`${typography.subheader.className} max-w-2xl mx-auto`}
                        style={typography.subheader.style}
                      >
                        From nothing to multi‑million
          subscription service helping 1M+ micro-businesses manage their finances and amdin.
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
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION ON NEUTRAL BACKGROUND */}
      <section className="w-full bg-[#FAF7F0] py-16 sm:py-24">
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


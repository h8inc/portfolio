import { GradientBackground } from '../components/generated/GradientBackground';
import { InteractiveTimeline } from '../components/generated/InteractiveTimeline';
import { TidePerformanceChart } from '../components/tide/TidePerformanceChart';
import React, { useMemo } from 'react';
import { typography } from '../design/typography';
import { MarqueeBanner } from '../components/MarqueeBanner';

function Tide() {
  // Tide-shaped date/value data – replace with real Tide metrics later.
  const tideData = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 60 }).map((_, i) => {
      const date = new Date(today.getTime() - (59 - i) * 24 * 60 * 60 * 1000);
      const base = 100;
      const noise = Math.sin(i / 6) * 8 + (Math.random() - 0.5) * 4;
      return { date, value: base + i * 1.2 + noise };
    });
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
                        <TidePerformanceChart data={tideData} />
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


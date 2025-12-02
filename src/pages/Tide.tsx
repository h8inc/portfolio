import { GradientBackground } from '../components/generated/GradientBackground';
import { InteractiveTimeline } from '../components/generated/InteractiveTimeline';
import { TidePerformanceChart } from '../components/tide/TidePerformanceChart';
import React, { useMemo } from 'react';
import { typography } from '../design/typography';
import { MarqueeBanner } from '../components/MarqueeBanner';
import { ScreenGallery } from '../components/primitives/ScreenGallery';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { TideLogo } from '../components/icons/TideLogo';

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

  const signatureScreens = useMemo(
    () => [
      {
        id: 'accounting-os',
        eyebrow: 'Admin OS',
        title: 'All admin in one place',
        description: 'A system of products designed to help small businesses owners navigate their administrative tasks with ease.',
        imageSrc: encodeURI('/assets/✅ Admin - no tasks comeplete.png'),
        imageAlt: 'Admin services home with task checklist'
      },
      {
        id: 'activation',
        eyebrow: 'Tax Product',
        title: 'Tax deadlines and estimates',
        description: 'Automated estimates and VAT management helps businesses prepare for tax obligations.',
        imageSrc: encodeURI('/assets/Registered Business - VAT registered - Connected (subscribed).png'),
        imageAlt: 'Registered business VAT estimates view'
      },
      {
        id: 'tax',
        eyebrow: 'Tax savings on autopilot',
        title: 'Predict and plan ahead',
        description: 'Tax savings account that saves on behalf of businesses and bears interest on the balance.',
        imageSrc: encodeURI('/assets/Tax Account timeline.png'),
        imageAlt: 'Tax account timeline and actions'
      }
    ],
    []
  );

  const taxScreens = useMemo(
    () => [
      {
        id: 'activation',
        eyebrow: 'Tax Product',
        title: 'Tax deadlines and estimates',
        description: 'Automated estimates and VAT management helps businesses prepare for tax obligations.',
        imageSrc: encodeURI('/assets/Registered Business - VAT registered - Connected (subscribed).png'),
        imageAlt: 'Registered business VAT estimates view'
      },
      {
        id: 'tax',
        eyebrow: 'Tax savings on autopilot',
        title: 'Predict and plan ahead',
        description: 'Tax savings account that saves on behalf of businesses and bears interest on the balance.',
        imageSrc: encodeURI('/assets/Tax Account timeline.png'),
        imageAlt: 'Tax account timeline and actions'
      },
      {
        id: 'filing-to-hmrc',
        eyebrow: 'Tax estimate',
        title: 'Filing to HMRC',
        description: 'Calculation of tax estimate based on trading activity data. Forecast models into the future based last period.',
        imageSrc: encodeURI('/assets/Filing to HMRC.png'),
        imageAlt: 'Filing to HMRC interface'
      },
      {
        id: 'payment-received',
        eyebrow: 'Saving for tax season',
        title: 'Payment received',
        description: 'The tax account enables users to add funds manually or automatically.',
        imageSrc: encodeURI('/assets/Payment received.png'),
        imageAlt: 'Payment received confirmation'
      },
      {
        id: 'filing-complete',
        eyebrow: 'Tax completion',
        title: 'Filing complete',
        description: 'Confirmation and receipt of completed tax filings and submissions.',
        imageSrc: encodeURI('/assets/Filing comeplete.png'),
        imageAlt: 'Filing complete confirmation'
      }
    ],
    []
  );

  const additionalScreens = useMemo(
    () => [
      {
        id: 'insights-subscribed',
        eyebrow: 'Financial insights',
        title: 'Subscribed state experience',
        description: 'Full access to detailed insights and analysis for subscribed members.',
        imageSrc: encodeURI('/assets/Insights-subscribed.png'),
        imageAlt: 'Financial insights subscribed state'
      },
      {
        id: 'insights',
        eyebrow: 'Financial insights',
        title: 'Smart analysis',
        description: 'Smart analysis and categorization that surfaces trends and helps members make better financial decisions.',
        imageSrc: encodeURI('/assets/Future-Insights-after-slice-5.png'),
        imageAlt: 'Financial insights and spending analysis'
      },
      {
        id: 'cashflow',
        eyebrow: 'Cash flow',
        title: 'Track and forecast with confidence',
        description: 'Visual timeline showing money in, money out, and projected balances so members can plan ahead and avoid surprises.',
        imageSrc: encodeURI('/assets/Cash flow - current month.png'),
        imageAlt: 'Cash flow tracker with projected balances'
      },
      {
        id: 'transactions',
        eyebrow: 'Transactions',
        title: 'Projected transactions view',
        description: 'Comprehensive view of projected transactions and financial activity.',
        imageSrc: encodeURI('/assets/Transactions/Populated/projected.png'),
        imageAlt: 'Projected transactions view'
      },
      {
        id: 'bookkeeping',
        eyebrow: 'Bookkeeping score',
        title: 'Keep records clean and compliant',
        description: 'Automated categorization and health scoring that guides members toward tax-ready books without manual effort.',
        imageSrc: encodeURI('/assets/Bookkeeping - Slice 4.png'),
        imageAlt: 'Bookkeeping score and smart categorization'
      }
    ],
    []
  );


  return (
    <GradientBackground>
      {/* Close button - top right */}
      <Link
        to="/"
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
        aria-label="Close and return to home"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" strokeWidth={2.5} />
      </Link>
      
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
                        Building from 0 to hero
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
      <section className="w-full bg-[#FAF7F0] py-16 sm:py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <InteractiveTimeline fullScreen={false} title="Journey & milestones" />
          </div>
        </div>
      </section>

      {/* SMART INSIGHTS */}
      <section className="w-full bg-white py-20 sm:py-24 overflow-x-clip">
        <ScreenGallery 
          items={additionalScreens}
          sectionEyebrow="Financial Tools"
          sectionTitle="Smart Insights"
          sectionDescription={
            <div>
              <p className="mb-4">
                I discovered (40+ interviews, dozens of surveys and usability tests) that small business owners - 42% of whom had limited or no financial literacy before starting - consistently ask a few fundamental questions no other competitor answers fully.
              </p>
              <ul className="list-disc list-inside space-y-3 text-sm sm:text-base text-[#3F3A2F] pl-4 list-bullet-accent mb-4" style={{ fontFamily: 'Aeonik' }}>
                <li>Am I profitable? Is it trending up or down?</li>
                <li>How are my expenses trending?</li>
                <li>Will I have enough money to pay my bills and keep afloat?</li>
              </ul>
              <p>
                I designed products that give clear answers to these painful and frequent questions. These products contributed to decreasing churn from 14% → 8% and hitting our recurring revenue goals.
              </p>
            </div>
          }
          sectionCTA={{
            label: "View prototype",
            href: "https://tide-mocks.netlify.app/cash-flow",
            show: true
          }}
        />
      </section>

      {/* ADMIN OS & PREMIUM FEATURES */}
      <section className="w-full bg-[#FAF7F0] py-20 sm:py-24 overflow-x-clip">
        <ScreenGallery 
          items={[
            {
              id: 'admin-os',
              eyebrow: 'Admin OS',
              title: 'All admin in one place',
              description: 'The system streamlines urgent admin tasks and has built in easy discoverability of frequently used features.',
              imageSrc: encodeURI('/assets/✅ Admin - free.png'),
              imageAlt: 'Admin OS main view'
            },
            {
              id: 'insights-free-state',
              eyebrow: 'Financial Insights',
              title: 'Free state experience',
              description: 'Surfaces the insights important to users and giving them a simpler way to spot changes.',
              imageSrc: encodeURI('/assets/Insights - free state1.png'),
              imageAlt: 'Financial insights free state'
            },
            {
              id: 'tax-free-state',
              eyebrow: 'Tax forecasting',
              title: 'Tax estimates and reminders',
              description: 'Give users confidence about taxes. Helps users calculate, save and pay on time.',
              imageSrc: encodeURI('/assets/tax-free-state.png'),
              imageAlt: 'Tax free state'
            },
            {
              id: 'bookkeeping',
              eyebrow: 'Automatic Bookkeeping',
              title: 'Keep records clean and compliant',
              description: 'Automated categorization and health scoring that guides members toward tax-ready books without manual effort.',
              imageSrc: encodeURI('/assets/Bookkeeping - Slice 4.png'),
              imageAlt: 'Bookkeeping score and smart categorization'
            }
          ]}
          sectionEyebrow="Admin OS"
          sectionTitle="Activation up 4× — from 6% to 24%"
          sectionDescription={
            <div>
              <p className="mb-4">
                I led the information architecture redesign of the Admin tab, reshaping it to improve discoverability, support a growing product suite, and drive activation. The work spanned 5–6 engineering teams and established a clearer, more scalable structure for both freemium and premium experiences. Users now access high-value moments earlier—such as tax estimates or cash-flow projections—while deeper insights sit behind subscription, creating a natural path to upgrade.
              </p>
              <p>
                Introduced a top-level product drawer and "Your tasks" feed that surfaces urgent work like tax deadlines, overdue bills, and payroll. Paired with streamlined quick actions (e.g., create invoice, add bill), the system directs attention where it matters, increasing engagement and supporting long-term retention.
              </p>
            </div>
          }
          sectionCTA={{
            label: "View case study",
            href: "#",
            show: false
          }}
        />
      </section>

      {/* TAX MANAGEMENT */}
      <section className="w-full bg-white py-20 sm:py-24 overflow-x-clip">
        <ScreenGallery 
          items={taxScreens}
          sectionEyebrow="Tax forecasting"
          sectionTitle="Predict and plan ahead"
          sectionDescription={
            <div>
              <p className="mb-4">
                <strong>Problem:</strong> Business owners with low financial literacy had no idea how much tax they owed until HMRC sent the bill - often too late to afford it.
              </p>
              <p className="mb-4">
                <strong>Solution:</strong> Tax savings account with auto-save + tax management module for filing in plain-English explanations throughout.
              </p>
              <p>
                <strong>Impact:</strong> 20% of signups, £4M ARR, 92% retention. 87% of users reported feeling more in control of their taxes.
              </p>
            </div>
          }
          sectionCTA={{
            label: "View case study",
            href: "#",
            show: false
          }}
        />
      </section>
    </GradientBackground>
  );
}

export default Tide;


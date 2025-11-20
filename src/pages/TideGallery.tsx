import { GradientBackground } from '../components/generated/GradientBackground';
import React, { useMemo } from 'react';
import { typography } from '../design/typography';
import { MarqueeBanner } from '../components/MarqueeBanner';
import { ScreenGallery } from '../components/primitives/ScreenGallery';

function TideGallery() {
  // Combine all 6 screens from both galleries
  const allScreens = useMemo(
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
        id: 'insights',
        eyebrow: 'Financial insights',
        title: 'Understand spending patterns',
        description: 'Smart analysis and categorization that surfaces trends and helps members make better financial decisions.',
        imageSrc: encodeURI('/assets/Future-Insights-after-slice-5.png'),
        imageAlt: 'Financial insights and spending analysis'
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
                        Tide Product Gallery
                      </h1>
                      <p
                        className={`${typography.subheader.className} max-w-2xl mx-auto`}
                        style={typography.subheader.style}
                      >
                        A comprehensive view of all Tide features and screens
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMBINED SCREENS GALLERY */}
      <section className="w-full bg-white py-20 sm:py-24 overflow-x-clip">
        <ScreenGallery 
          items={allScreens}
          sectionEyebrow="Tide Product Suite"
          sectionTitle="Complete feature overview"
          sectionDescription="All the tools and features that help small businesses manage their finances, taxes, and administrative tasks with ease."
          sectionCTA={{
            label: "View case study",
            href: "/tide",
            show: true
          }}
        />
      </section>
    </GradientBackground>
  );
}

export default TideGallery;


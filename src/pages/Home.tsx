import { useMemo } from 'react';
import { Container, Theme } from '../settings/types';
import { GradientBackground } from '../components/generated/GradientBackground';
import ProfileWidget from '../components/generated/ProfileWidget';
import { AppsAnalyticsCard } from '../components/generated/AppsAnalyticsCard';
import { KrakenProPortfolio } from '../components/generated/KrakenProPortfolio';
import { ChevronDown } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import { ScreenGallery } from '../components/primitives/ScreenGallery';
import { typography } from '../design/typography';
import { TideLogo } from '../components/icons/TideLogo';
import { PortfolioSection } from '../components/PortfolioSection';
import { LandingPage, BackgroundGlyphs, CryptoSwapWidgetPrimitive, TradingBoxPrimitive } from '@h8inc/perp-ui';
import { ExtendedInteractiveMock } from '../components/ExtendedInteractiveMock';

let theme: Theme = 'light';
// only use 'centered' container for standalone components, never for full page apps or websites.
let container: Container = 'none';

function Home() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

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
        id: 'insights-free',
        eyebrow: 'Financial insights',
        title: 'Free state experience',
        description: 'Answering frequently asked questions like "Am I profitable?" and "Will I have enough money?"',
        imageSrc: encodeURI('/assets/Insights-free state.png'),
        imageAlt: 'Financial insights free state'
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
        eyebrow: 'Understanding patterns',
        title: 'Understand spending patterns',
        description: 'Smart analysis and categorization that surfaces trends and helps members make better financial decisions.',
        imageSrc: encodeURI('/assets/Future-Insights-after-slice-5.png'),
        imageAlt: 'Financial insights and spending analysis'
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
        id: 'transactions',
        eyebrow: 'Transactions',
        title: 'Projected transactions view',
        description: 'Comprehensive view of projected transactions and financial activity.',
        imageSrc: encodeURI('/assets/Transactions/Populated/projected.png'),
        imageAlt: 'Projected transactions view'
      },
      {
        id: 'registered-business',
        eyebrow: 'Tax management',
        title: 'VAT registered and connected',
        description: 'Tax estimates and reminders for upcoming tax deadlines that are updated automatically.',
        imageSrc: encodeURI('/assets/Registered Business - VAT registered - Connected (subscribed).png'),
        imageAlt: 'Registered Business VAT registered connected subscribed'
      }
    ],
    []
  );

  const generatedComponent = useMemo(() => {
    const handleScrollToCharts = () => {
      trackEvent('scroll_to_section', {
        section: 'design_playground',
        method: 'button_click'
      });

      const chartsSection = document.getElementById('charts');
      if (chartsSection) {
        chartsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    return (
      <GradientBackground>
        <div className="w-full">
          {/* HERO SECTION WITH FLOATING PROFILE WIDGET */}
          <section className="w-full min-h-[140vh] pb-12">
            <div className="w-full h-full px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto h-full">
                <div className="relative h-[calc(140vh-48px)] flex items-start">
                  <div className="w-full sticky top-[24px] flex flex-col items-center gap-6">
                  <div className="w-full">
                      <ProfileWidget />
                    </div>

                    <button
                      onClick={handleScrollToCharts}
                      className="group cursor-pointer bg-transparent border-none outline-none transition-all hover:opacity-90 inline-flex flex-col items-center gap-2"
                    >
                      <span
                        className="text-sm sm:text-base lg:text-lg font-bold text-white"
                        style={{
                          fontFamily: 'Aeonik Extended',
                          textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
                        }}
                      >
                        Explore the design playground ✨
                      </span>
                      <ChevronDown
                        className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-bounce"
                        strokeWidth={2.5}
                        style={{
                          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))'
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CHARTS / PLAYGROUND SECTION */}
          <section id="charts" className="w-full bg-[#FAF7F0] py-16 sm:py-20">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <p
                    className="text-xs sm:text-sm tracking-[0.35em] uppercase text-[#FF6B35] mb-4"
                    style={{ fontFamily: 'Aeonik Extended' }}
                  >
                    Design playground
                  </p>
                 
                  <p
                    className="text-base sm:text-lg text-gray-600"
                    style={{ fontFamily: 'Aeonik' }}
                  >
                    I like to translate
              information into data visualisations with interactions. Just play with them 😉
          
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                  <div className="flex flex-col gap-5">
                    
                    <div className="flex justify-center">
                      <KrakenProPortfolio />
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    
                    <div className="flex justify-center">
                      <AppsAnalyticsCard />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TIDE FEATURE GALLERY */}
          <section className="w-full bg-white py-20 sm:py-24 overflow-x-clip">
            <ScreenGallery
              items={allScreens}
              sectionLogo={<div style={{ transform: 'scale(0.6)', transformOrigin: 'left center' }}><TideLogo className="max-w-full max-h-full w-full h-full" /></div>}
              sectionRole="Staff Designer, 2023-present"
              sectionDescription="Tide is a banking app with more than 1M users, where I built first-of-its-kind financial and tax forecasting tools that reimagine how businesses plan and operate. The system anticipates needs, doesn't wait for asks. It proactively surfaces tasks like upcoming tax deadlines before they became urgent. Introduced a completely new activation strategy for Tide's subscription products — freemium experiences that deliver value upfront."
              sectionStats={
                <ul className="list-disc list-inside space-y-3 text-sm sm:text-base text-[#3F3A2F] pl-4 list-bullet-accent" style={{ fontFamily: 'Aeonik' }}>
                  <li>0→<strong className="font-semibold">12,000+</strong> subscribers, 0→<strong className="font-semibold">£8M+</strong> annual recurring revenue</li>
                  <li><strong className="font-semibold">22%</strong> activation rate (vs. 0.9% baseline) - a <strong className="font-semibold">24x</strong> improvement</li>
                  <li>Built AI assistant for <strong className="font-semibold">3K+</strong> employees</li>
                </ul>
              }
              sectionCTA={{
                label: 'View work',
                href: '/tide',
                show: true
              }}
            />
          </section>

          {/* PERP UI PRIMITIVES (PACKAGE SHOWCASE) */}
          <section className="w-full bg-[#FAF7F0] py-20 sm:py-24 overflow-x-clip">
            <PortfolioSection
              logo={encodeURI('/assets/Extended-logo.svg')}
              role="Design + front-end, 2025"
              eyebrow="UI primitives"
              title="Perp / swap widget (from a shared package)"
              description={
                <div>
                  <p className="mb-4">
                    Design strategy and prototyping in code for the core trading experience. I built UI components
                    that surface value before wallet connection, collapse deposit and swap into a single action, and highlight multi-chain advantages early
                    in the funnel—materially reducing time-to-first-trade.
                  </p>
                  <p className="mb-4">
                    I re-architected trading and portfolio surfaces to support both spot and perps, mobile-first usage, and distinct trading styles, using
                    progressive disclosure and a clear metric hierarchy.
                  </p>
                </div>
              }
              cta={{
                label: 'View Case Study',
                href: '/extended',
                show: true,
              }}
            >
              <div className="w-full flex justify-center">
                {/* Interactive ScreenMock-sized embed (same rhythm as the gallery cards) */}
                <div className="w-[390px] max-w-full">
                  <div className="rounded-[34px] border-[3px] border-[#130F25] shadow-[0_12px_32px_rgba(10,8,23,0.12)] overflow-hidden">
                    <div className="w-[390px] h-[600px]">
                      <ExtendedInteractiveMock />
                    </div>
                  </div>
                </div>
              </div>
            </PortfolioSection>
          </section>

          {/* TIDE AI CASE STUDY */}
          <section className="w-full bg-[#FAF7F0] py-20 sm:py-24 overflow-x-clip">
            <ScreenGallery
              items={[
                {
                  id: 'tide-ai',
                  imageSrc: encodeURI('/assets/tideai.gif'),
                  imageAlt: 'Tide AI assistant',
                  noBorder: true
                }
              ]}
              sectionLogo={<div style={{ transform: 'scale(0.6)', transformOrigin: 'left center' }}><TideLogo className="max-w-full max-h-full w-full h-full" /></div>}
              sectionRole="PM, designer, front-end, 2025"
              sectionDescription={
                <div>
                  <p className="mb-4">
                    As Tide scaled (1000 → 3000 employees), the context got fragmented across tools. That creates communication silos that slows decision-making and reduces velocity. Employees waste days hunting for answers.
                  </p>
                  <p>
                  I partnered with an engineer to build an AI-powered internal search tool that surfaces instant, actionable answers from across all company systems. 
                  </p>
                </div>
              }
              sectionStats={
                <ul className="list-disc list-inside space-y-3 text-sm sm:text-base text-[#3F3A2F] pl-4 list-bullet-accent" style={{ fontFamily: 'Aeonik' }}>
                  <li><strong className="font-semibold">Scope:</strong> 2 person team, won a hackathon</li> 
                  <li><strong className="font-semibold">Approach:</strong> Building in Cursor & V0, no Figma, MVP in 5 days </li>
                  <li><strong className="font-semibold">Adoption</strong> Currently used across support & legal (~350 DAUs)</li>
                </ul>
              }
              sectionCTA={{
                label: 'View prototype',
                href: 'https://tide-ai-mock.vercel.app/',
                show: true,
                disabled: false
              }}
              singleItemWider={true}
              hideItemText={true}
            />
          </section>

          {/* OPAA CASE STUDY */}
          <section className="w-full bg-white py-20 sm:py-24 overflow-x-clip">
            <ScreenGallery
              items={[
                {
                  id: 'opaa',
                  imageSrc: encodeURI('/assets/Opaa.png'),
                  imageAlt: 'Opaa restaurant POS system',
                  noBorder: false,
                  customBorderRadius: 'rounded-[4px] md:rounded-[12px]'
                }
              ]}
              sectionLogo={encodeURI('/assets/opaalogo.png')}
              sectionRole="I shipped the MVP in code, 2025"
              sectionDescription={
                <div>
                  <p className="mb-4">
                    Restaurant owners lose revenue during peak hours because they can't serve fast enough. Customers grow frustrated waiting to order, having orders forgotten, or spending 20+ minutes trying to pay the bill.
                  </p>
                  <p>
                    I shipped a QR-code-based point-of-sale system in 2 weeks—from concept to working prototype—using AI-assisted development (Claude + v0). The system lets customers order and pay directly from their table, removing service bottlenecks while maintaining the dining experience.
                  </p>
                </div>
              }
              
              sectionCTA={{
                label: 'View project',
                href: 'https://opaa-website.vercel.app/en',
                show: true,
                disabled: false
              }}
              singleItemWider={true}
              hideItemText={true}
            />
          </section>

          {/* CALLIPER CASE STUDY */}
          <section className="w-full bg-[#FAF7F0] py-20 sm:py-24 overflow-x-clip">
            <ScreenGallery
              items={[
                {
                  id: 'portfolio-2024',
                  imageSrc: encodeURI('/assets/Portfolio 2024.gif'),
                  imageAlt: 'Portfolio 2024',
                  noBorder: false,
                  customBorderRadius: 'rounded-[4px] md:rounded-[12px]'
                }
              ]}
              sectionLogo={encodeURI('/assets/calliperlogo.png')}
              sectionRole="Designer, 2022-2023"
              sectionDescription={
                <div>
                  <p className="mb-4">
                    Calliper democratises data. Makes it social. Lets anyone get answers in seconds, not weeks. Connected scattered business data into one feed with plain-English queries.
                  </p>
                  <p>
                    I spoke with few dozens of people working in startups to understand the frequent data questions they have and built the MVP (slack bot) as well as core functionality such as data feed and goal tracking. Backed by Sequoia with $1.2M seed round. Later they got acquired.
                  </p>
                </div>
              }
              sectionStats={
                <ul className="list-disc list-inside space-y-3 text-sm sm:text-base text-[#3F3A2F] pl-4 list-bullet-accent" style={{ fontFamily: 'Aeonik' }}>
                  <li>Conducted <strong className="font-semibold">25+ interviews</strong> to validate the problems to focus on</li>
                  <li>Built the <strong className="font-semibold">design system from 0</strong> & shipped MVP in <strong className="font-semibold">3 months</strong></li>
                </ul>
              }
              sectionCTA={{
                label: 'Case study coming soon',
                href: '#',
                show: true,
                disabled: true
              }}
              singleItemWider={true}
              hideItemText={true}
            />
          </section>

          {/* HOTJAR CASE STUDY */}
          <section className="w-full bg-white py-20 sm:py-24 overflow-x-clip">
            <ScreenGallery
              items={[
                {
                  id: 'hotjar',
                  imageSrc: encodeURI('/assets/hotjar-cover.gif'),
                  imageAlt: 'Hotjar pricing page redesign',
                  noBorder: true
                }
              ]}
              sectionLogo={encodeURI('/assets/ hotjar-logo.png'.trim())}
              sectionRole="Freelance Growth Designer, 2022"
              sectionDescription="Ran experiments with the pricing page (which accounted for 20% of signups). Separately, tested and removed friction points in the sign-up and onboarding process that weren't relevant to all user personas, then designed a personalized onboarding flow for our target customers—product teams in small and medium tech companies."
              sectionStats={
                <ul className="list-disc list-inside space-y-3 text-sm sm:text-base text-[#3F3A2F] pl-4 list-bullet-accent" style={{ fontFamily: 'Aeonik' }}>
                  <li><strong className="font-semibold">10%</strong> overall improvement in activation across all segments</li>
                  <li><strong className="font-semibold">30x</strong> improvement in sales pipeline (0.5% to 15% demos booked)</li>
                  <li>Redesigned onboarding for <strong className="font-semibold">15k</strong> monthly signups</li>
                </ul>
              }
              sectionCTA={{
                label: 'Case study coming soon',
                href: '#',
                show: true,
                disabled: true
              }}
              singleItemWider={true}
              hideItemText={true}
            />
          </section>
        </div>
      </GradientBackground>
    );
  }, [allScreens]);

  if (container === 'centered') {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        {generatedComponent}
      </div>
    );
  } else {
    return generatedComponent;
  }
}

export default Home;


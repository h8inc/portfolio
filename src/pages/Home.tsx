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
        id: 'accounting-os',
        eyebrow: 'Admin OS',
        title: 'All admin in one place',
        description: 'A system of products designed to help small businesses owners navigate their administrative tasks with ease.',
        imageSrc: encodeURI('/assets/✅ Admin - no tasks comeplete.png'),
        imageAlt: 'Admin services home with task checklist'
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
              sectionEyebrow="Tide"
              sectionTitle="Financial subscriptions from 0 to 8 million in revneue"
              sectionDescription="Conceived and designed Tide's tax management hub and financial insights from the ground up, guiding strategic decisions throughout the entire process. The system anticipates needs, doesn't wait for asks. It proactively surfaces tasks like upcoming tax deadlines before they became urgent. Introduced a completely new activation strategy for Tide's subscription products — freemium experiences that deliver value upfront."
              sectionStats={
                <ul className="list-disc list-inside space-y-3 text-sm sm:text-base text-[#3F3A2F] pl-4" style={{ fontFamily: 'Aeonik' }}>
                  <li>0→<strong className="font-semibold">12,000+</strong> subscribers, 0→<strong className="font-semibold">£8M+</strong> annual recurring revenue</li>
                  <li><strong className="font-semibold">22%</strong> activation rate (vs. 0.9% baseline) - a <strong className="font-semibold">24x</strong> improvement</li>
                  <li>Built AI assistant for <strong className="font-semibold">3K+</strong> employees</li>
                </ul>
              }
              sectionCTA={{
                label: 'View case study',
                href: '/tide',
                show: true
              }}
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


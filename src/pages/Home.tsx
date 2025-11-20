import { useMemo } from 'react';
import { Container, Theme } from '../settings/types';
import { GradientBackground } from '../components/generated/GradientBackground';
import ProfileWidget from '../components/generated/ProfileWidget';
import { AppsAnalyticsCard } from '../components/generated/AppsAnalyticsCard';
import { KrakenProPortfolio } from '../components/generated/KrakenProPortfolio';
import { ChevronDown } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import { ExplainerCard } from '../components/ExplainerCard';
import { ScreenGallery } from '../components/primitives/ScreenGallery';

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

  const generatedComponent = useMemo(() => {
    const handleScrollToCharts = () => {
      // Track the scroll interaction
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

    // THIS IS WHERE THE TOP LEVEL GENRATED COMPONENT WILL BE RETURNED!
    return (
      <GradientBackground>
        <div className="w-full min-h-screen flex flex-col justify-center pt-[8vh] pb-[10vh]">
          {/* Main Profile Section */}
          <ProfileWidget />
          
          {/* Headline Section */}
          <div className="w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
            <div className="max-w-7xl mx-auto text-center">
              <button 
                onClick={handleScrollToCharts}
                className="group cursor-pointer bg-transparent border-none outline-none transition-all hover:opacity-80 inline-flex flex-col items-center gap-2"
              >
                <span className="text-sm sm:text-base lg:text-lg font-bold text-white" style={{ fontFamily: 'Aeonik Extended', textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>
                  Check out my design playground ✨
                </span>
                <ChevronDown 
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-bounce" 
                  strokeWidth={2.5}
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))' }}
                />
              </button>
            </div>
          </div>

          {/* Cards Section */}
          <div id="charts" className="w-full py-0 sm:py-4 px-4">
            <div className="max-w-7xl mx-auto">
              {/* Both Components Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
                {/* Portfolio Analytics Section */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-center">
                    <ExplainerCard 
                      title="Track value over time"
                      description="Interactive chart designed to help users track value over time - in this case portfolio value."
                    />
                  </div>
                  <div className="flex justify-center">
                    <KrakenProPortfolio />
                  </div>
                </div>

                {/* Apps Analytics Card Section */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-center">
                    <ExplainerCard 
                      title="Track growth over time"
                      description="Interactive chart designed to help users track growth over time - in this case app usage."
                    />
                  </div>
                  <div className="flex justify-center">
                    <AppsAnalyticsCard />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tide Gallery Section */}
          <div className="w-full bg-white py-20 sm:py-24 overflow-x-clip">
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
          </div>
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


import { useMemo } from 'react';
import { Container, Theme } from '../settings/types';
import { GradientBackground } from '../components/generated/GradientBackground';
import ProfileWidget from '../components/generated/ProfileWidget';
import { AppsAnalyticsCard } from '../components/generated/AppsAnalyticsCard';
import { KrakenProPortfolio } from '../components/generated/KrakenProPortfolio';
import { ChevronDown } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import { ExplainerCard } from '../components/ExplainerCard';

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
        </div>
      </GradientBackground>
    );
  }, []);

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


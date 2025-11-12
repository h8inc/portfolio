import { useMemo } from 'react';
import { Container, Theme } from './settings/types';
import { GradientBackground } from './components/generated/GradientBackground';
import ProfileWidget from './components/generated/ProfileWidget';
import { AppsAnalyticsCard } from './components/generated/AppsAnalyticsCard';
import { KrakenProPortfolio } from './components/generated/KrakenProPortfolio';
import { Leaf, ChevronDown, Info } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';

let theme: Theme = 'light';
// only use 'centered' container for standalone components, never for full page apps or websites.
let container: Container = 'none';

function App() {
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
                <div className="inline-flex items-center gap-2">
                  <span className="text-sm sm:text-base lg:text-lg font-bold text-white" style={{ fontFamily: 'Aeonik Extended', textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>
                    Design engineering
                  </span>
                  <Tooltip.Provider delayDuration={150} skipDelayDuration={300}>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <button aria-label="About this section" className="bg-white/30 backdrop-blur hover:bg-white/40 transition-colors rounded-xl p-1.5">
                          <Info className="w-4 h-4 text-white" />
                        </button>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content side="bottom" align="center" sideOffset={8} className="z-[1000] rounded-md bg-black/90 text-white px-3 py-2 text-xs shadow-lg max-w-[260px] leading-relaxed text-center">
                          Interactive design experiments showcasing data visualization and prototyping
                          <Tooltip.Arrow className="fill-black/90" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </div>
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
                <div className="flex justify-center">
                  <KrakenProPortfolio />
                </div>

                {/* Apps Analytics Card Section */}
                <div className="flex justify-center">
                  <AppsAnalyticsCard />
                </div>
              </div>
            </div>
          </div>

          {/* Company Logos Section - COMMENTED OUT FOR NOW */}
          {/* <div className="mt-6 sm:mt-8 lg:mt-10 px-4 sm:px-8 pb-12 sm:pb-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 items-center justify-items-center opacity-70">
                <a href="https://insurify.com/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-100">
                  <div className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight" style={{ fontFamily: 'Aeonik Extended' }}>insurify</div>
                </a>
                
                <a href="https://www.tide.co/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-100">
                  <div className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold lowercase" style={{ fontFamily: 'Aeonik Extended' }}>tide</div>
                </a>
                
                <a href="https://www.hotjar.com/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-100">
                  <div className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ fontFamily: 'Aeonik Extended' }}>Hotjar</div>
                </a>
                
                <a href="https://www.woodwing.com/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-100">
                  <div className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ fontFamily: 'Aeonik Extended' }}>WoodWing</div>
                </a>
                
                <a href="https://piktochart.com/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-100">
                  <div className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ fontFamily: 'Aeonik Extended' }}>Piktochart</div>
                </a>
                
                <a href="https://www.sequoiacap.com/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-100">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight" style={{ fontFamily: 'Aeonik Extended' }}>SEQUOIA</span>
                    <Leaf className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" strokeWidth={2.5} />
                  </div>
                </a>
                
                <a href="https://seedcamp.com/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-100">
                  <div className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight uppercase" style={{ fontFamily: 'Aeonik Extended' }}>SEEDCAMP</div>
                </a>
              </div>
            </div>
          </div> */}
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

export default App;
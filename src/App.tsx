import { useMemo } from 'react';
import { Container, Theme } from './settings/types';
import { GradientBackground } from './components/generated/GradientBackground';
import ProfileWidget from './components/generated/ProfileWidget';
import { AppsAnalyticsCard } from './components/generated/AppsAnalyticsCard';
import { KrakenProPortfolio } from './components/generated/KrakenProPortfolio';
import { Leaf } from 'lucide-react';

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
    // THIS IS WHERE THE TOP LEVEL GENRATED COMPONENT WILL BE RETURNED!
    return (
      <GradientBackground>
        <div className="w-full min-h-screen flex flex-col justify-center pt-[8vh] pb-[10vh]">
          {/* Main Profile Section */}
          <ProfileWidget />
          
          {/* Interactive Showcases Section - NOW BEFORE LOGOS */}
          <div className="w-full  py-12 sm:py-16 px-4">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Aeonik Extended' }}>
                  Interactive Components Showcase
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-white/80" style={{ fontFamily: 'Aeonik' }}>
                  Explore my interaction design skills through these examples
                </p>
              </div>

              {/* Both Components Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
                {/* Apps Analytics Card Section */}
                <div className="flex flex-col items-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center" style={{ fontFamily: 'Aeonik Extended' }}>
                    Data Visualization
                  </h3>
                  <div className="w-full max-w-md flex justify-center">
                    <div className="w-full">
                      <AppsAnalyticsCard />
                    </div>
                  </div>
                </div>

                {/* Portfolio Analytics Section */}
                <div className="flex flex-col items-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center" style={{ fontFamily: 'Aeonik Extended' }}>
                    Financial Portfolio Dashboard
                  </h3>
                  <div className="w-full max-w-md flex justify-center overflow-hidden" style={{ isolation: 'isolate' }}>
                    <div className="w-full overflow-hidden rounded-[30px]" style={{ isolation: 'isolate' }}>
                      <KrakenProPortfolio />
                    </div>
                  </div>
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
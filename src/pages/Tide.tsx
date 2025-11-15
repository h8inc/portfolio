import { GradientBackground } from '../components/generated/GradientBackground';
import { InteractiveTimeline } from '../components/generated/InteractiveTimeline';

function Tide() {
  return (
    <GradientBackground>
      <div className="w-full min-h-screen flex flex-col justify-center pt-[8vh] pb-[10vh]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Heading – matches main page typography & glow */}
            <div className="text-center mb-10 sm:mb-12">
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
                style={{
                  fontFamily: 'Aeonik Extended',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
                }}
              >
                Tide
              </h1>
              <p
                className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto"
                style={{
                  fontFamily: 'Aeonik',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.45)'
                }}
              >
                A timeline view of my journey, designed to feel playful and tactile
                while staying consistent with the main portfolio aesthetic.
              </p>
            </div>

            {/* Timeline block – keep component behavior, adapt how it sits on the page */}
            <div className="rounded-[32px] sm:rounded-[40px] overflow-hidden bg-[#FAF7F0] backdrop-blur-xl content-card-shell">
              <InteractiveTimeline fullScreen={false} />
            </div>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}

export default Tide;


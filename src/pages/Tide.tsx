import { GradientBackground } from '../components/generated/GradientBackground';
import { InteractiveTimeline } from '../components/generated/InteractiveTimeline';

function Tide() {
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
                    <div className="text-center">
                      <h1
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#130F25] mb-4"
                        style={{
                          fontFamily: 'Aeonik Extended'
                        }}
                      >
                        Building and scaling accounting at Tide
                      </h1>
                      <p
                        className="text-base sm:text-lg lg:text-xl text-[#3F3A2F] max-w-2xl mx-auto"
                        style={{
                          fontFamily: 'Aeonik'
                        }}
                      >
                        From a small bookkeeping add‑on with fewer than 1,000 users to a multi‑million
                        ARR SaaS product touching Tide&apos;s 1M+ member base — this is the arc of the work.
                      </p>
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


import * as React from "react";
import Marquee from "react-fast-marquee";
import BitcoinPill from "./generated/BitcoinPill";

export interface ProfileCardShellProps {
  imageUrl?: string;
  /** Max-width classes for the card; defaults to the homepage profile card width */
  widthClassName?: string;
  children: React.ReactNode;
}

/** Profile card chrome shared by the homepage and landing pages: overlapping avatar + name marquee. */
export function ProfileCardShell({
  imageUrl = "/assets/portrait_transparent_responsive.svg",
  widthClassName = "max-w-2xl lg:max-w-3xl",
  children
}: ProfileCardShellProps) {
  return <div className="w-full flex items-start justify-center p-4 sm:p-6 lg:p-8 mt-12 sm:mt-16 lg:mt-20">
      <div className={`w-full ${widthClassName}`}>
        {/* Main Card with relative positioning for avatar */}
        <div className="relative bg-[#FAF7F0] rounded-[2.5rem] sm:rounded-[3rem] overflow-visible content-card-shell">

          {/* Profile Image - Positioned at top center, overlapping the card */}
          <div className="absolute -top-24 sm:-top-32 lg:-top-36 left-1/2 -translate-x-1/2 z-20">
            <img src={imageUrl} alt="Illustrated portrait" className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72" />
          </div>

          {/* Top Marquee Section */}
          <div className="bg-white py-3 sm:py-4 overflow-hidden relative z-10 rounded-t-[2.5rem] sm:rounded-t-[3rem]">
            <Marquee speed={50} gradient={false} className="flex items-center">
              <div className="flex items-center">
                {[...Array(8)].map((_, i) => (
                  <React.Fragment key={i}>
                    <span className="mx-3 sm:mx-4 text-xs sm:text-sm md:text-base font-bold tracking-wider text-gray-400" style={{ fontFamily: 'Aeonik Extended' }}>HELLO, I'M NASKO</span>
                    <span className="mx-3 sm:mx-4"><BitcoinPill /></span>
                    <span className="mx-3 sm:mx-4 text-xs sm:text-sm md:text-base font-bold tracking-wider" style={{ fontFamily: 'Aeonik Extended' }}>
                      NASKO TERZIEV
                    </span>
                    <span className="mx-3 sm:mx-4"><BitcoinPill /></span>
                  </React.Fragment>
                ))}
              </div>
            </Marquee>
          </div>

          {children}
        </div>
      </div>
    </div>;
}

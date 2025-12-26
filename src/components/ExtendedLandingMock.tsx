import React from 'react';
import { BackgroundGlyphs, CryptoSwapWidgetPrimitive, TradingMetrics } from '@h8inc/perp-ui';

/**
 * Wide, interactive landing-page mock meant to live inside ScreenMock (600px tall).
 * Uses the landing composition (glyph background + headline + widget + metrics) but
 * intentionally omits the upstream Header/Nav to avoid leaking fixed-position UI.
 */
type ExtendedLandingMockProps = {
  /** Adds extra top padding for the headline inside the mock */
  headlinePadTopClassName?: string;
  /** Whether to show the metrics row */
  showMetrics?: boolean;
  /** Whether to show the headline */
  showHeadline?: boolean;
};

export const ExtendedLandingMock: React.FC<ExtendedLandingMockProps> = ({
  headlinePadTopClassName,
  showMetrics = true,
  showHeadline = true,
}) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#1D1D1D] text-white font-['Inter']">
      <BackgroundGlyphs />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 py-6 gap-4">
        {showHeadline && (
          /* Keep headline aligned to the same column width as the widget */
          <div className="w-full max-w-[520px]">
            <h2
              className={`text-2xl sm:text-3xl font-bold text-center leading-tight ${headlinePadTopClassName ?? ''}`}
              style={{ color: 'rgb(250 250 250 / 0.98)', fontWeight: 500 }}
            >
              Self-custody trading <span className="text-[#15F46F]">Crypto &amp; TradFi</span>
            </h2>
          </div>
        )}

        <div className="w-full flex justify-center">
          <div className="w-full max-w-[520px]">
            <CryptoSwapWidgetPrimitive />
          </div>
        </div>

        {showMetrics && (
          <div className="w-full max-w-[720px]">
            <TradingMetrics />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Home-page embed variant: extra headline breathing room + no metrics (keeps the mock clean).
 */
export const ExtendedLandingMockHome: React.FC = () => (
  <ExtendedLandingMock showHeadline={false} showMetrics={false} />
);



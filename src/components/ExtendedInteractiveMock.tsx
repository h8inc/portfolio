import React from 'react';
import { BackgroundGlyphs, CryptoSwapWidgetPrimitive } from '@h8inc/perp-ui';

/**
 * Interactive "ScreenMock"-sized embed (390x600).
 * We intentionally avoid the package <LandingPage /> because it uses `position: fixed`
 * for its Header + window scroll listeners, which will escape embeds.
 */
export const ExtendedInteractiveMock: React.FC = () => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#1D1D1D] text-white">
      <BackgroundGlyphs />

      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-4 py-6">
        <h3
          className="text-xl font-semibold text-center leading-tight"
          style={{ color: 'rgb(250 250 250 / 0.98)', fontWeight: 500 }}
        >
          Self-custody trading <span className="text-[#15F46F]">Crypto &amp; TradFi</span>
        </h3>

        <div className="mt-4 w-full flex justify-center">
          <CryptoSwapWidgetPrimitive />
        </div>

        <p className="mt-3 text-[#a0a0a0] text-xs text-center max-w-[320px]">
          Trade forex, gold, indices with USDC. DeFi-powered unified margins, spot markets, lending ahead.
        </p>
      </div>
    </div>
  );
};



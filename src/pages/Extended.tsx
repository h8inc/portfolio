import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { BackgroundGlyphs, CryptoSwapWidgetPrimitive, TradingBoxPrimitive, TradingMetrics } from '@h8inc/perp-ui';
import { ScreenGallery } from '../components/primitives/ScreenGallery';
import { ExtendedInteractiveMock } from '../components/ExtendedInteractiveMock';

function Extended() {
  const handleGetStarted = () => {
    const el = document.getElementById('components');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen w-full bg-[#0b0e11]">
      {/* Close button - top right (match Tide case study pattern) */}
      <Link
        to="/"
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[100] w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
        aria-label="Close and return to home"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" strokeWidth={2.5} />
      </Link>

      {/* HERO: landing composition without the package Header/Nav */}
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 pt-24 md:pt-16 gap-6 sm:gap-8 bg-[#1D1D1D] overflow-hidden text-white font-['Inter']">
        <BackgroundGlyphs />

        <div className="relative z-10 w-full flex flex-col items-center gap-6 sm:gap-8 pt-14 md:pt-0">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center px-4"
            style={{
              paddingTop: '0px',
              color: 'rgb(250 250 250 / 0.98)',
              fontWeight: '500',
            }}
          >
            Self-custody trading <span className="text-[#15F46F]">Crypto &amp; TradFi</span>
          </h1>

          <CryptoSwapWidgetPrimitive onGetStarted={handleGetStarted} />

          <p className="text-[#a0a0a0] text-sm sm:text-base text-center max-w-[480px] -mt-4 px-4">
            Trade forex, gold, indices with USDC. DeFi-powered unified margins, spot markets, lending ahead.
          </p>

          <div className="w-full px-4 md:px-0 md:max-w-4xl md:mx-auto">
            <TradingMetrics />
          </div>
        </div>
      </div>

      {/* CASE STUDY SECTIONS (use the same section/mocks system as Home: section wrapper + ScreenGallery/ScreenMock) */}
      <section id="components" className="w-full bg-[#FAF7F0] py-20 sm:py-24 overflow-x-clip">
        <ScreenGallery
          items={[
            {
              id: 'deposit-swap',
              mockContent: <ExtendedInteractiveMock />,
              noBorder: false,
            },
          ]}
          sectionLogo={encodeURI('/assets/Extended-logo.svg')}
          sectionRole="Design, product, front-end, 2025"
          sectionTitle="Deposit & Swap"
          sectionDescription={
            <div>
              <p className="mb-4">
                Inspired by Uniswap’s clarity, then reshaped for a perp DEX: remove the “setup tax” between intent and execution. Funding becomes part of
                the trade—one cohesive action, one moment of value.
              </p>
              <p className="mb-4">
                With spot and multi‑asset collateral live, users can deposit USDC and receive ETH (or other assets) in the same step—shortening
                time‑to‑first‑trade, reducing drop‑off, and lowering the barrier for newer traders.
              </p>
            </div>
          }
          sectionCTA={{
            label: 'Open prototype',
            href: 'https://x10ded.netlify.app/',
            show: true,
            disabled: false,
          }}
          hideItemText={true}
          singleItemWider={true}
        />
      </section>

      <section className="w-full bg-white py-20 sm:py-24 overflow-x-clip">
        <ScreenGallery
          items={[
            {
              id: 'trade-surface',
              mockContent: <div className="w-full h-full bg-[#0b0e11]"><TradingBoxPrimitive /></div>,
              noBorder: false,
            },
          ]}
          sectionEyebrow="Components"
          sectionTitle="Trade"
          sectionDescription={
            <div>
              <p className="mb-4">
                I reworked the trading interface to support spot and perpetuals within a single information architecture, without increasing complexity.
                The UI is mobile-first, uses progressive disclosure to scale from new users to power traders, and was fully coded and shipped by me.
              </p>
            </div>
          }
          sectionCTA={{
            label: 'Open prototype',
            href: 'https://x10ded.netlify.app/',
            show: true,
            disabled: false,
          }}
          hideItemText={true}
          singleItemWider={true}
        />
      </section>

      <section className="w-full bg-[#FAF7F0] py-20 sm:py-24 overflow-x-clip">
        <ScreenGallery
          items={[
            {
              id: 'portfolio-metrics',
              imageSrc: encodeURI('/assets/perp-metrics.gif'),
              imageAlt: 'Portfolio metrics and navigation — customizable metric slots grouped by category',
              noBorder: false,
            },
          ]}
          sectionEyebrow="Product"
          sectionTitle="Portfolio & navigation"
          sectionDescription={
            <div>
              <p className="mb-4">
                Rebuilt the portfolio and primary navigation to support distinct trading styles and workflows.
              </p>
              <p className="mb-4">
                Defined a fixed set of top‑level metric slots that scale across use cases—scalpers, swing traders, semi‑HFT users, and risk‑ or
                performance‑driven traders—without fragmenting the interface. Metrics are grouped into clear categories (account health, liquidity,
                profitability, performance) for fast scanning and decision‑making.
              </p>
              <p className="mb-1">
                <strong>Shipped:</strong> Metrics are customizable to match individual trading workflows and risk profiles.
              </p>
            </div>
          }
          sectionCTA={{
            label: 'Open prototype',
            href: 'https://x10ded.netlify.app/',
            show: true,
            disabled: false,
          }}
          hideItemText={true}
          singleItemWider={true}
        />
      </section>

      <section className="w-full bg-white py-20 sm:py-24 overflow-x-clip">
        <ScreenGallery
          items={[
            {
              id: 'glyph-background',
              mockContent: (
                <div className="relative w-full h-full bg-[#1D1D1D]">
                  <BackgroundGlyphs />
                  <div className="relative z-10 p-6">
                    <div className="inline-flex items-center rounded-full bg-black/40 border border-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
                      Live background layer
                    </div>
                  </div>
                </div>
              ),
              noBorder: false,
            },
          ]}
          sectionEyebrow="Visual system"
          sectionTitle="BackgroundGlyphs"
          sectionDescription={
            <div>
              <p className="mb-4">
                Animated glyph rings + ambient glows. It’s intentionally <span className="font-semibold">pointer-events: none</span> so it never blocks
                interaction with the UI.
              </p>
              <p>You can reuse it as a standalone background layer behind any component or hero.</p>
            </div>
          }
          sectionCTA={{
            label: 'Open prototype',
            href: 'https://x10ded.netlify.app/',
            show: true,
            disabled: false,
          }}
          hideItemText={true}
          singleItemWider={true}
        />
      </section>
    </div>
  );
}

export default Extended;



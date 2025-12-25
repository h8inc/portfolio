import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { BackgroundGlyphs, CryptoSwapWidgetPrimitive, TradingBoxPrimitive, TradingMetrics } from '@h8inc/perp-ui';

type SectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ id, eyebrow, title, description, children }) => {
  return (
    <section id={id} className="w-full py-20 sm:py-24 overflow-x-clip">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60 mb-4" style={{ fontFamily: 'Aeonik Extended' }}>
              {eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4" style={{ fontFamily: 'Aeonik Extended' }}>
              {title}
            </h2>
            <div className="text-white/75 text-base leading-relaxed" style={{ fontFamily: 'Aeonik' }}>
              {description}
            </div>
          </div>

          <div className="w-full flex justify-center lg:justify-end">{children}</div>
        </div>
      </div>
    </section>
  );
};

function Extended() {
  const handleGetStarted = () => {
    const el = document.getElementById('components');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen w-full bg-[#0b0e11] text-white">
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

      {/* COMPONENT SECTIONS */}
      <div className="w-full bg-[#0b0e11]">
        <Section
          id="components"
          eyebrow="Components"
          title="Deposit + Swap"
          description={
            <div>
              <p className="mb-4">
                Inspired by Uniswap’s swap experience—simple, confident, and instantly legible—then repurposed for the realities of a perp DEX.
                Instead of asking users to “deposit first, trade later”, the interface treats funding as part of the trade.
              </p>
              <p>
                The deposit‑swap flow collapses two steps into one: users can deposit one asset and receive another in a single action. That means a shorter
                time‑to‑first‑trade, fewer places to hesitate, and less drop‑off before the moment of value.
              </p>
            </div>
          }
        >
          <div className="w-full max-w-[520px]">
            <CryptoSwapWidgetPrimitive />
          </div>
        </Section>

        <Section
          eyebrow="Components"
          title="Trade"
          description={
            <div>
              <p className="mb-4">
                This is the trading surface with tabs, order types, leverage, and token selection—designed as a composable “box” you can drop into a
                trading page or a bottom sheet.
              </p>
              <p>
                It’s built to scale: start with spot simplicity, then grow into perp complexity without breaking the mental model. The same canvas can
                accommodate deeper controls—risk, margin, advanced execution—while still feeling fast, focused, and familiar at a glance.
              </p>
            </div>
          }
        >
          <div className="w-full max-w-[560px] h-[640px] rounded-[24px] overflow-hidden bg-[#0b0e11] shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
            <TradingBoxPrimitive />
          </div>
        </Section>

        <Section
          eyebrow="Visual system"
          title="BackgroundGlyphs"
          description={
            <div>
              <p className="mb-4">
                Animated glyph rings + ambient glows. It’s intentionally <span className="text-white/90">pointer-events: none</span> so it never blocks
                interaction with the UI.
              </p>
              <p>You can reuse it as a standalone background layer behind any component or hero.</p>
            </div>
          }
        >
          <div className="relative w-full max-w-[560px] h-[420px] rounded-[28px] overflow-hidden border border-white/10 bg-[#1D1D1D]">
            <BackgroundGlyphs />
            <div className="relative z-10 p-6">
              <div className="inline-flex items-center rounded-full bg-black/40 border border-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
                Live background layer
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

export default Extended;



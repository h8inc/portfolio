import React from 'react';
import { Link } from 'react-router-dom';
import { typography } from '../../design/typography';
import { ScreenMock } from './ScreenMock';
import { buttonStyles, buttonFontFamily } from '../../lib/button-styles';

type ScreenGalleryItem = {
  id: string;
  /**
   * Small label displayed above the title (e.g. feature name)
   */
  eyebrow: string;
  /**
   * Short title/heading shown under each mock
   */
  title: string;
  /**
   * Two-line description shown under the title
   */
  description: string;
  /**
   * Optional image source for the screen mock.
   * When omitted, a placeholder gradient is rendered instead.
   */
  imageSrc?: string;
  imageAlt?: string;
};

type ScreenGalleryProps = {
  items: ScreenGalleryItem[];
  className?: string;
  /**
   * Section metadata displayed on desktop (left column)
   */
  sectionEyebrow?: string;
  sectionTitle?: string;
  sectionDescription?: string;
  /**
   * Optional stats/metrics to display below the description
   */
  sectionStats?: React.ReactNode;
  /**
   * Optional CTA config (hidden by default)
   */
  sectionCTA?: {
    label: string;
    href: string;
    show?: boolean;
  };
};

const MOBILE_CARD_STYLE: React.CSSProperties = {
  width: '85vw',
  minWidth: 260,
  maxWidth: 340,
  paddingBottom: 24
};

const DESKTOP_CARD_STYLE: React.CSSProperties = {
  maxWidth: 360,
  width: '100%'
};

const SCREEN_MAX_HEIGHT = 600;

// Custom scrollbar styles
const scrollbarStyles: React.CSSProperties = {
  scrollbarWidth: 'thin' as const,
  scrollbarColor: '#FF6B35 #F5F2ED',
  scrollBehavior: 'smooth' as const,
};

const customScrollbarClass = `
  [&::-webkit-scrollbar]:h-2
  [&::-webkit-scrollbar]:bg-[#F5F2ED]
  [&::-webkit-scrollbar]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-[#FF6B35]
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:transition-colors
  hover:[&::-webkit-scrollbar-thumb]:bg-[#FF6B35]/80
`;

export const ScreenGallery: React.FC<ScreenGalleryProps> = ({ 
  items, 
  className,
  sectionEyebrow,
  sectionTitle,
  sectionDescription,
  sectionStats,
  sectionCTA
}) => {
  return (
    <div className={className}>
      {/* Mobile – Section header + horizontal scroll */}
      <div className="md:hidden">
        {/* Section metadata for mobile (centered above gallery) */}
        {(sectionEyebrow || sectionTitle || sectionDescription) && (
          <div className="mb-12 px-4">
            {sectionEyebrow && (
              <p
                className="text-xs uppercase tracking-[0.35em] text-[#7A7464] mb-4 text-left"
                style={{ fontFamily: 'Aeonik Extended' }}
              >
                {sectionEyebrow}
              </p>
            )}
            {sectionTitle && (
              <h2
                className={`${typography.h2.className} mb-4 text-left`}
                style={typography.h2.style}
              >
                {sectionTitle}
              </h2>
            )}
            {sectionDescription && (
              <p
                className={`${typography.subheader.className} max-w-3xl text-left`}
                style={typography.subheader.style}
              >
                {sectionDescription}
              </p>
            )}
            {sectionCTA && sectionCTA.show && (
              <Link
                to={sectionCTA.href}
                className={`${buttonStyles.primary} mt-6 inline-block`}
                style={buttonFontFamily.primary}
              >
                {sectionCTA.label}
              </Link>
            )}
            {sectionStats && (
              <div className="mt-6 max-w-3xl mx-auto hidden">
                {sectionStats}
              </div>
            )}
          </div>
        )}
        
        {/* Mobile gallery */}
        <div className="-mx-4 px-4">
        <div 
          className={`flex overflow-x-auto space-x-3 pb-8 snap-x snap-mandatory ${customScrollbarClass}`}
          style={scrollbarStyles}
        >
          {items.map((item, index) => (
            <article
              key={item.id}
              className="snap-center flex-shrink-0"
              aria-label={item.title}
              style={MOBILE_CARD_STYLE}
            >
              {/* Mock container with fixed height */}
              <div 
                className="w-full flex items-center justify-center mb-6" 
                style={{ height: SCREEN_MAX_HEIGHT }}
              >
                <ScreenMock
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
                  gradientIndex={index}
                  eager={index < 3}
                />
              </div>
              
              {/* Text content - flows naturally below */}
              <div className="space-y-1 text-center w-full">
                <p
                  className="text-xs uppercase tracking-[0.3em] text-[#7A7464]"
                  style={{ fontFamily: 'Aeonik Extended' }}
                >
                  {item.eyebrow}
                </p>
                {/* <h3 className="text-lg font-semibold text-[#130F25]" style={{ fontFamily: 'Aeonik' }}>
                  {item.title}
                </h3> */}
                <p className="text-sm text-[#3F3A2F] leading-relaxed" style={{ fontFamily: 'Aeonik' }}>
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
        </div>
      </div>

      {/* Desktop – side-by-side with edge-to-edge scrollable gallery */}
      <div className="hidden md:block">
        <div className="flex items-start pl-4 sm:pl-6 lg:pl-8">
          {/* Wrapper for left content with max-w */}
          <div className="flex-shrink-0" style={{ width: 'min(512px, 40vw)', marginLeft: 'max(0px, calc((100vw - 1280px) / 2))' }}>
            {sectionEyebrow && (
              <p
                className="text-xs uppercase tracking-[0.35em] text-[#7A7464] mb-4"
                style={{ fontFamily: 'Aeonik Extended' }}
              >
                {sectionEyebrow}
              </p>
            )}
            {sectionTitle && (
              <h2
                className={`${typography.h2.className} mb-4`}
                style={typography.h2.style}
              >
                {sectionTitle}
              </h2>
            )}
            {sectionDescription && (
              <p
                className={`${typography.subheader.className}`}
                style={typography.subheader.style}
              >
                {sectionDescription}
              </p>
            )}
            {sectionStats && (
              <div className="mt-6">
                {sectionStats}
              </div>
            )}
            {sectionCTA && sectionCTA.show && (
              <Link
                to={sectionCTA.href}
                className={`${buttonStyles.primary} mt-6`}
                style={buttonFontFamily.primary}
              >
                {sectionCTA.label}
              </Link>
            )}
          </div>

          {/* Gap */}
          <div className="w-12 lg:w-16 flex-shrink-0" />
          
          {/* Gallery extends to viewport edge */}
          <div 
            className={`flex-1 overflow-x-auto -mr-4 sm:-mr-6 lg:-mr-8 ${customScrollbarClass}`}
            style={scrollbarStyles}
          >
            <div className="flex space-x-6 pb-8 snap-x snap-mandatory pr-4 sm:pr-6 lg:pr-8">
            {items.map((item, index) => (
              <article
                key={item.id}
                className="snap-start flex-shrink-0"
                aria-label={item.title}
                style={{ width: 390 }}
              >
                {/* Mock container with fixed height */}
                <div 
                  className="w-full flex items-center justify-center mb-6" 
                  style={{ height: SCREEN_MAX_HEIGHT }}
                >
                  <ScreenMock
                    imageSrc={item.imageSrc}
                    imageAlt={item.imageAlt}
                    gradientIndex={index}
                    eager={index < 3}
                  />
                </div>
                
                {/* Text content - flows naturally below */}
                <div className="space-y-1 text-center w-full">
                  <p
                    className="text-xs uppercase tracking-[0.3em] text-[#7A7464]"
                    style={{ fontFamily: 'Aeonik Extended' }}
                  >
                    {item.eyebrow}
                  </p>
                  {/* <h3 className="text-xl font-semibold text-[#130F25]" style={{ fontFamily: 'Aeonik' }}>
                    {item.title}
                  </h3> */}
                  <p className="text-sm text-[#3F3A2F] leading-relaxed" style={{ fontFamily: 'Aeonik' }}>
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


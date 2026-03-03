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
  eyebrow?: string;
  /**
   * Short title/heading shown under each mock
   */
  title?: string;
  /**
   * Two-line description shown under the title
   */
  description?: string;
  /**
   * Optional image source for the screen mock.
   * When omitted, a placeholder gradient is rendered instead.
   */
  imageSrc?: string;
  imageAlt?: string;
  /**
   * Optional custom content to render inside the ScreenMock (for interactive embeds).
   * When provided, it takes precedence over imageSrc.
   */
  mockContent?: React.ReactNode;
  /**
   * When true, removes the border from the mock (useful for images that already have borders)
   */
  noBorder?: boolean;
  /**
   * Custom border radius classes (e.g., 'rounded-[4px] md:rounded-[12px]')
   */
  customBorderRadius?: string;
  /**
   * When true, removes the drop shadow from the mock container
   */
  noShadow?: boolean;
};

type ScreenGalleryProps = {
  items: ScreenGalleryItem[];
  className?: string;
  /**
   * Section metadata displayed on desktop (left column)
   */
  sectionEyebrow?: string;
  sectionTitle?: string;
  sectionDescription?: React.ReactNode;
  /**
   * Optional logo (React component or image path)
   */
  sectionLogo?: React.ReactNode | string;
  /**
   * Role and year text displayed below logo (e.g., "Staff Designer, 2023-present")
   */
  sectionRole?: string;
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
    disabled?: boolean;
  };
  /**
   * When true and there's only 1 item, makes the mock wider on desktop (800px instead of 390px)
   * Useful for desktop screenshots that need more horizontal space
   */
  singleItemWider?: boolean;
  /**
   * When true, hides the text content (eyebrow and description) below each mock
   */
  hideItemText?: boolean;
  /**
   * Background for the mock container (e.g. "bg-[#FAF7F0]" or "bg-white").
   * Use the same as the section so the area around the mock is not dark.
   */
  mockContainerBackground?: string;
  /**
   * Optional Tailwind gap class between gallery items (e.g. "space-x-2").
   * When set, overrides the default spacing for both mobile and desktop.
   */
  galleryGapClass?: string;
};

const MOBILE_CARD_STYLE: React.CSSProperties = {
  width: '85vw',
  minWidth: 260,
  maxWidth: 340,
  paddingBottom: 24
};

const SINGLE_ITEM_MOBILE_CARD_STYLE: React.CSSProperties = {
  width: '100%',
  minWidth: 'auto',
  maxWidth: '100%',
  paddingBottom: 12
};

const DESKTOP_CARD_STYLE: React.CSSProperties = {
  maxWidth: 360,
  width: '100%'
};

const SCREEN_MAX_HEIGHT = 600;
const MOCK_CONTAINER_STYLE: React.CSSProperties = {
  height: SCREEN_MAX_HEIGHT,
  paddingLeft: 24,
  paddingRight: 24,
  paddingBottom: 12
};

const SINGLE_ITEM_MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  paddingLeft: 16,
  paddingRight: 16,
  paddingBottom: 8
};

// Custom scrollbar styles
const scrollbarStyles: React.CSSProperties = {
  scrollbarWidth: 'thin' as const,
  scrollbarColor: '#FF6B35 #F5F2ED',
  scrollBehavior: 'smooth' as const,
  scrollPaddingRight: '2rem',
  paddingRight: '2rem'
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
  sectionCTA,
  sectionLogo,
  sectionRole,
  singleItemWider = false,
  hideItemText = false,
  mockContainerBackground,
  galleryGapClass
}) => {
  // Calculate desktop article width: wider if singleItemWider is true and there's only 1 item
  const isSingleWideItem = singleItemWider && items.length === 1;
  const desktopArticleWidth = isSingleWideItem ? 960 : 390;
  const desktopArticleMarginRight = isSingleWideItem ? -64 : 0;
  const gapWidthClass = isSingleWideItem ? 'w-0 lg:w-0' : 'w-12 lg:w-16';
  const defaultGallerySpacing = isSingleWideItem ? 'space-x-0' : 'space-x-6';
  const defaultMobileGallerySpacing = isSingleWideItem ? 'space-x-0' : 'space-x-3';
  const gallerySpacingClass = galleryGapClass ?? defaultGallerySpacing;
  const mobileGallerySpacingClass = galleryGapClass ?? defaultMobileGallerySpacing;
  const mobileMockContainerStyle = isSingleWideItem ? SINGLE_ITEM_MOBILE_CONTAINER_STYLE : MOCK_CONTAINER_STYLE;
  const mobileCardStyle = isSingleWideItem ? SINGLE_ITEM_MOBILE_CARD_STYLE : MOBILE_CARD_STYLE;
  const galleryScrollbarStyle = isSingleWideItem
    ? { ...scrollbarStyles, paddingRight: '1rem', scrollPaddingRight: '1rem' }
    : scrollbarStyles;
  const renderMobileArticle = (item: ScreenGalleryItem, index: number) => (
    <article
      key={item.id}
      className="snap-center flex-shrink-0"
      aria-label={item.title}
      style={mobileCardStyle}
    >
      {/* Mock container with adaptive height */}
      <div 
        className={`w-full flex items-center justify-center mb-6 overflow-visible ${mockContainerBackground ?? ''}`}
        style={mobileMockContainerStyle}
      >
        {item.mockContent && item.noBorder && item.noShadow ? (
          item.mockContent
        ) : (
          <ScreenMock
            imageSrc={item.imageSrc}
            imageAlt={item.imageAlt}
            gradientIndex={index}
            eager={index < 3}
            noBorder={item.noBorder}
            customBorderRadius={item.customBorderRadius}
            noShadow={item.noShadow}
          >
            {item.mockContent}
          </ScreenMock>
        )}
      </div>
      
      {/* Text content */}
      {!hideItemText && (item.eyebrow || item.description) && (
        <div className="space-y-1 text-center w-full">
          {item.eyebrow && (
            <p
              className="text-xs uppercase tracking-[0.3em] text-[#7A7464]"
              style={{ fontFamily: 'Aeonik Extended' }}
            >
              {item.eyebrow}
            </p>
          )}
          {item.description && (
            <p className="text-sm text-[#3F3A2F] leading-relaxed" style={{ fontFamily: 'Aeonik' }}>
              {item.description}
            </p>
          )}
        </div>
      )}
    </article>
  );

  return (
    <div className={className}>
      {/* Mobile – Section header + horizontal scroll */}
      <div className="md:hidden">
        {/* Section metadata for mobile (centered above gallery) */}
        {(sectionLogo || sectionRole || sectionEyebrow || sectionTitle || sectionDescription) && (
          <div className="mb-12 px-4">
            {sectionLogo ? (
              <div className="mb-6">
                <div className="flex items-center justify-start" style={{ width: '120px', height: '60px', maxWidth: '120px', maxHeight: '60px' }}>
                  {typeof sectionLogo === 'string' ? (
                    <img 
                      src={sectionLogo} 
                      alt="" 
                      className="max-h-full max-w-full w-auto h-auto object-contain" 
                    />
                  ) : (
                    <div className="max-h-full max-w-full w-full h-full flex items-center">
                      {sectionLogo}
                    </div>
                  )}
                </div>
                {sectionRole && (
                  <p 
                    className="text-[#3F3A2F] text-left"
                    style={{ fontFamily: 'Aeonik Mono', fontSize: '12px', margin: 0, padding: 0 }}
                  >
                    {sectionRole}
                  </p>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
            {sectionDescription && (
              <div
                className={`${typography.subheader.className} max-w-3xl text-left`}
                style={typography.subheader.style}
              >
                {sectionDescription}
              </div>
            )}
            {sectionCTA && sectionCTA.show && (
              sectionCTA.disabled ? (
                <span
                  className={`${buttonStyles.primary} mt-6 inline-block opacity-50 cursor-not-allowed`}
                  style={buttonFontFamily.primary}
                >
                  {sectionCTA.label}
                </span>
              ) : sectionCTA.href.startsWith('http') ? (
                <a
                  href={sectionCTA.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${buttonStyles.primary} mt-6 inline-block`}
                  style={buttonFontFamily.primary}
                >
                  {sectionCTA.label}
                </a>
              ) : (
                <Link
                  to={sectionCTA.href}
                  className={`${buttonStyles.primary} mt-6 inline-block`}
                  style={buttonFontFamily.primary}
                >
                  {sectionCTA.label}
                </Link>
              )
            )}
            {sectionStats && (
              <div className="mt-6 max-w-3xl mx-auto hidden">
                {sectionStats}
              </div>
            )}
          </div>
        )}
        
        {/* Mobile gallery */}
        {isSingleWideItem ? (
          <div className="">
            {items.map((item, index) => renderMobileArticle(item, index))}
          </div>
        ) : (
          <div className="-mx-4 px-4">
            <div 
              className={`flex overflow-x-auto ${mobileGallerySpacingClass} pb-8 snap-x snap-mandatory ${customScrollbarClass}`}
              style={galleryScrollbarStyle}
            >
              {items.map((item, index) => renderMobileArticle(item, index))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop – side-by-side with edge-to-edge scrollable gallery */}
      <div className="hidden md:block">
        <div className="flex items-start pl-4 sm:pl-6 lg:pl-8">
          {/* Wrapper for left content with max-w */}
          <div className="flex-shrink-0" style={{ width: 'min(512px, 40vw)', marginLeft: 'max(0px, calc((100vw - 1280px) / 2))' }}>
            {sectionLogo ? (
              <div className="mb-6">
                <div className="flex items-center" style={{ width: '120px', height: '60px', maxWidth: '120px', maxHeight: '60px' }}>
                  {typeof sectionLogo === 'string' ? (
                    <img 
                      src={sectionLogo} 
                      alt="" 
                      className="max-h-full max-w-full w-auto h-auto object-contain" 
                    />
                  ) : (
                    <div className="max-h-full max-w-full w-full h-full flex items-center">
                      {sectionLogo}
                    </div>
                  )}
                </div>
                {sectionRole && (
                  <p 
                    className="text-[#3F3A2F]"
                    style={{ fontFamily: 'Aeonik Mono', fontSize: '12px', margin: 0, padding: 0 }}
                  >
                    {sectionRole}
                  </p>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
            {sectionDescription && (
              <div
                className={`${typography.subheader.className}`}
                style={typography.subheader.style}
              >
                {sectionDescription}
              </div>
            )}
            {sectionStats && (
              <div className="mt-6">
                {sectionStats}
              </div>
            )}
            {sectionCTA && sectionCTA.show && (
              sectionCTA.disabled ? (
                <span
                  className={`${buttonStyles.primary} mt-12 opacity-50 cursor-not-allowed`}
                  style={buttonFontFamily.primary}
                >
                  {sectionCTA.label}
                </span>
              ) : sectionCTA.href.startsWith('http') ? (
                <a
                  href={sectionCTA.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${buttonStyles.primary} mt-12`}
                  style={buttonFontFamily.primary}
                >
                  {sectionCTA.label}
                </a>
              ) : (
                <Link
                  to={sectionCTA.href}
                  className={`${buttonStyles.primary} mt-12`}
                  style={buttonFontFamily.primary}
                >
                  {sectionCTA.label}
                </Link>
              )
            )}
          </div>

          {/* Gap */}
          <div className={`${gapWidthClass} flex-shrink-0`} />
          
          {/* Gallery extends to viewport edge */}
          <div 
            className={`flex-1 overflow-x-auto -mr-2 sm:-mr-4  ${customScrollbarClass}`}
            style={scrollbarStyles}
          >
          <div className={`flex ${gallerySpacingClass} pb-8 snap-x snap-mandatory pr-4 sm:pr-6 lg:pr-8`}>
            {items.map((item, index) => (
              <article
                key={item.id}
                className="snap-start flex-shrink-0"
                aria-label={item.title}
                style={{ width: desktopArticleWidth, marginRight: desktopArticleMarginRight }}
              >
                {/* Mock container with fixed height */}
                <div 
                  className={`w-full flex items-center justify-center mb-6 overflow-visible ${mockContainerBackground ?? ''}`}
                  style={MOCK_CONTAINER_STYLE}
                >
                  {item.mockContent && item.noBorder && item.noShadow ? (
                    item.mockContent
                  ) : (
                    <ScreenMock
                      imageSrc={item.imageSrc}
                      imageAlt={item.imageAlt}
                      gradientIndex={index}
                      eager={index < 3}
                      noBorder={item.noBorder}
                      customBorderRadius={item.customBorderRadius}
                      noShadow={item.noShadow}
                    >
                      {item.mockContent}
                    </ScreenMock>
                  )}
                </div>
                
                {/* Text content - flows naturally below */}
                {!hideItemText && (item.eyebrow || item.description) && (
                  <div className="space-y-1 text-center w-full">
                    {item.eyebrow && (
                      <p
                        className="text-xs uppercase tracking-[0.3em] text-[#7A7464]"
                        style={{ fontFamily: 'Aeonik Extended' }}
                      >
                        {item.eyebrow}
                      </p>
                    )}
                    {/* <h3 className="text-xl font-semibold text-[#130F25]" style={{ fontFamily: 'Aeonik' }}>
                      {item.title}
                    </h3> */}
                    {item.description && (
                      <p className="text-sm text-[#3F3A2F] leading-relaxed" style={{ fontFamily: 'Aeonik' }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                )}
              </article>
            ))}
            <div className="w-4 md:w-6 flex-shrink-0" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


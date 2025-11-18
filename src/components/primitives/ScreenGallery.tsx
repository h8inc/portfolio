import React from 'react';
import { typography } from '../../design/typography';
import { motion } from 'framer-motion';

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
   * Optional CTA config (hidden by default)
   */
  sectionCTA?: {
    label: string;
    href: string;
    show?: boolean;
  };
};

const placeholderGradients = [
  'linear-gradient(135deg,#F5F2ED 0%,#E8E3D9 100%)',
  'linear-gradient(135deg,#FFF1E6 0%,#F5D2C5 100%)',
  'linear-gradient(135deg,#E3F2FD 0%,#B9D7EA 100%)'
];

const ScreenMock: React.FC<{
  imageSrc?: string;
  imageAlt?: string;
  gradientIndex: number;
}> = ({ imageSrc, imageAlt, gradientIndex }) => {
  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={imageAlt || 'Product screen'}
        className="max-h-full max-w-full object-contain rounded-[34px] shadow-[0_24px_70px_rgba(10,8,23,0.2)] border-[3px] border-[#130F25]"
      />
    );
  }

  return (
    <div
      className="w-full h-full rounded-[32px] border border-[#E2DDD2] shadow-inner flex items-center justify-center p-6"
      style={{ background: placeholderGradients[gradientIndex % placeholderGradients.length] }}
    >
      <div className="h-full w-full flex flex-col items-center justify-center text-center px-6">
        <span
          className="text-xs uppercase tracking-[0.3em] text-[#7A7464]"
          style={{ fontFamily: 'Aeonik Extended' }}
        >
          Screen
        </span>
        <p className="text-sm text-[#3F3A2F] mt-2" style={{ fontFamily: 'Aeonik' }}>
          Placeholder preview for future mock
        </p>
      </div>
    </div>
  );
};

const MOBILE_CARD_STYLE: React.CSSProperties = {
  width: '92vw',
  minWidth: 260,
  maxWidth: 360,
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
  sectionCTA
}) => {
  return (
    <div className={className}>
      {/* Mobile – Section header + horizontal scroll */}
      <div className="md:hidden">
        {/* Section metadata for mobile (centered above gallery) */}
        {(sectionEyebrow || sectionTitle || sectionDescription) && (
          <div className="text-center mb-12 px-4">
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
                className={`${typography.subheader.className} max-w-3xl mx-auto`}
                style={typography.subheader.style}
              >
                {sectionDescription}
              </p>
            )}
          </div>
        )}
        
        {/* Mobile gallery */}
        <div className="-mx-4 px-4">
        <div 
          className={`flex overflow-x-auto space-x-4 pb-8 snap-x snap-mandatory ${customScrollbarClass}`}
          style={scrollbarStyles}
        >
          {items.map((item, index) => (
            <motion.article
              key={item.id}
              className="snap-center flex-shrink-0"
              aria-label={item.title}
              style={MOBILE_CARD_STYLE}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
                <h3 className="text-lg font-semibold text-[#130F25]" style={{ fontFamily: 'Aeonik' }}>
                  {item.title}
                </h3>
                <p className="text-sm text-[#3F3A2F] leading-relaxed" style={{ fontFamily: 'Aeonik' }}>
                  {item.description}
                </p>
              </div>
            </motion.article>
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
            {sectionCTA && sectionCTA.show && (
              <a
                href={sectionCTA.href}
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#130F25] text-white rounded-full font-medium hover:bg-[#130F25]/90 transition-colors"
                style={{ fontFamily: 'Aeonik' }}
              >
                {sectionCTA.label}
                <span>→</span>
              </a>
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
              <motion.article
                key={item.id}
                className="snap-start flex-shrink-0"
                aria-label={item.title}
                style={{ width: 420 }}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
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
                  <h3 className="text-xl font-semibold text-[#130F25]" style={{ fontFamily: 'Aeonik' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#3F3A2F] leading-relaxed" style={{ fontFamily: 'Aeonik' }}>
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


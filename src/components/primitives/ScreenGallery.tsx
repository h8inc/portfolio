import React from 'react';

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
        className="max-h-full max-w-full object-contain rounded-[34px] shadow-[0_24px_70px_rgba(10,8,23,0.2)]"
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

export const ScreenGallery: React.FC<ScreenGalleryProps> = ({ items, className }) => {
  return (
    <div className={className}>
      {/* Mobile – horizontal scroll */}
      <div className="-mx-4 px-4 md:hidden">
        <div className="flex overflow-x-auto space-x-4 pb-8 snap-x snap-mandatory">
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
            </article>
          ))}
        </div>
      </div>

      {/* Desktop – grid */}
      <div className="hidden md:grid grid-cols-3 gap-8">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="flex flex-col items-center"
            aria-label={item.title}
            style={DESKTOP_CARD_STYLE}
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
          </article>
        ))}
      </div>
    </div>
  );
};


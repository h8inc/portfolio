import React from 'react';
import { ScreenMock } from './ScreenMock';

type ProjectMock = {
  id: string;
  imageSrc: string;
  imageAlt: string;
};

type ProjectGalleryProps = {
  /**
   * Project metadata displayed on left side
   */
  metadata?: {
    year?: string;
    company?: string;
    role?: string;
  };
  /**
   * Project title/heading
   */
  title: string;
  /**
   * Full project description (truncated on mobile)
   */
  description: string;
  /**
   * Optional CTA button
   */
  cta?: {
    label: string;
    href: string;
  };
  /**
   * Array of 1-4 mocks to display
   * - 1 mock = single large mock
   * - 2-4 mocks = equal width row
   */
  mocks: ProjectMock[];
  className?: string;
};

const SCREEN_MAX_HEIGHT = 600;

// Custom scrollbar styles for mobile
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

const MOBILE_MOCK_STYLE: React.CSSProperties = {
  width: '85vw',
  minWidth: 260,
  maxWidth: 340,
};

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ 
  metadata,
  title,
  description,
  cta,
  mocks,
  className
}) => {
  const isSingleMock = mocks.length === 1;
  const hasMultipleMocks = mocks.length >= 2 && mocks.length <= 4;

  return (
    <div className={className}>
      {/* Mobile Layout - Stacked */}
      <div className="md:hidden">
        <div className="max-w-7xl mx-auto px-4">
          {/* Title and Year */}
          <div className="mb-6">
            {metadata?.year && (
              <p className="text-sm text-[#7A7464] mb-2" style={{ fontFamily: 'Aeonik Extended' }}>
                {metadata.year}
              </p>
            )}
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#130F25]"
              style={{ fontFamily: 'Aeonik' }}
            >
              {title}
            </h2>
          </div>

          {/* Mocks - Horizontal Scroll */}
          <div className="mb-6">
            <div 
              className={`flex overflow-x-auto space-x-3 pb-4 snap-x snap-mandatory ${customScrollbarClass}`}
              style={scrollbarStyles}
            >
              {mocks.map((mock, index) => (
                <div
                  key={mock.id}
                  className="snap-center flex-shrink-0"
                  style={MOBILE_MOCK_STYLE}
                >
                  <div 
                    className="w-full flex items-center justify-center" 
                    style={{ height: SCREEN_MAX_HEIGHT }}
                  >
                    <ScreenMock
                      imageSrc={mock.imageSrc}
                      imageAlt={mock.imageAlt}
                      gradientIndex={index}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Truncated Description */}
          <div className="mb-6">
            <p 
              className="text-sm text-[#3F3A2F] leading-relaxed line-clamp-2"
              style={{ fontFamily: 'Aeonik' }}
            >
              {description}
            </p>
          </div>

          {/* CTA */}
          {cta && (
            <div>
              <a
                href={cta.href}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#130F25] hover:opacity-80 transition-opacity"
                style={{ fontFamily: 'Aeonik' }}
              >
                {cta.label}
                <span>→</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout - Top Section + Bottom Split */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Section - 4 Column Layout */}
          <div className="mb-8 lg:mb-12">
            <div className="grid grid-cols-4 gap-6 lg:gap-8 items-start">
              {/* Column 1: Year + Title */}
              <div className="flex flex-col">
                {metadata?.year && (
                  <p className="text-sm text-[#7A7464] mb-2" style={{ fontFamily: 'Aeonik Extended' }}>
                    {metadata.year}
                  </p>
                )}
                <h2
                  className="text-3xl lg:text-4xl font-bold text-[#130F25]"
                  style={{ fontFamily: 'Aeonik' }}
                >
                  {title}
                </h2>
              </div>

              {/* Column 2: Working On */}
              {metadata?.company && (
                <div className="flex flex-col">
                  <p className="text-sm text-[#7A7464] mb-2" style={{ fontFamily: 'Aeonik Extended' }}>
                    Working on
                  </p>
                  <p className="text-base font-medium text-[#130F25]" style={{ fontFamily: 'Aeonik' }}>
                    {metadata.company}
                  </p>
                </div>
              )}

              {/* Column 3: Role */}
              {metadata?.role && (
                <div className="flex flex-col">
                  <p className="text-sm text-[#7A7464] mb-2" style={{ fontFamily: 'Aeonik Extended' }}>
                    Role
                  </p>
                  <p className="text-base font-medium text-[#130F25]" style={{ fontFamily: 'Aeonik' }}>
                    {metadata.role}
                  </p>
                </div>
              )}

              {/* Column 4: CTA */}
              {cta && (
                <div className="flex items-center justify-end">
                  <a
                    href={cta.href}
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#130F25] text-[#130F25] rounded-full font-medium hover:bg-[#130F25] hover:text-white transition-colors"
                    style={{ fontFamily: 'Aeonik' }}
                  >
                    {cta.label}
                    <span>→</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Section - Split */}
          <div className="flex gap-8 lg:gap-12 items-start">
            {/* Left: Description */}
            <div className="flex-1" style={{ maxWidth: '50%' }}>
              <p 
                className="text-base text-[#3F3A2F] leading-relaxed"
                style={{ fontFamily: 'Aeonik' }}
              >
                {description}
              </p>
            </div>

            {/* Right: Mocks */}
            <div className="flex-1 min-w-0">
              {isSingleMock ? (
                /* Single Large Mock */
                <div className="w-full">
                  <div 
                    className="w-full flex items-start justify-center" 
                    style={{ height: SCREEN_MAX_HEIGHT }}
                  >
                    <ScreenMock
                      imageSrc={mocks[0].imageSrc}
                      imageAlt={mocks[0].imageAlt}
                      gradientIndex={0}
                    />
                  </div>
                </div>
              ) : hasMultipleMocks ? (
                /* Multiple Mocks - Equal Width Row */
                <div className="flex gap-4">
                  {mocks.map((mock, index) => (
                    <div key={mock.id} className="flex-1 min-w-0">
                      <div 
                        className="w-full flex items-start justify-center" 
                        style={{ height: SCREEN_MAX_HEIGHT }}
                      >
                        <ScreenMock
                          imageSrc={mock.imageSrc}
                          imageAlt={mock.imageAlt}
                          gradientIndex={index}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

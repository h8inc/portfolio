import React from 'react';
import { Link } from 'react-router-dom';
import { typography } from '../design/typography';
import { buttonFontFamily, buttonStyles } from '../lib/button-styles';

type PortfolioSectionProps = {
  /** Left column content (matches ScreenGallery’s section metadata) */
  eyebrow?: string;
  title?: string;
  description?: React.ReactNode;
  logo?: React.ReactNode | string;
  role?: string;
  stats?: React.ReactNode;
  cta?: {
    label: string;
    href: string;
    show?: boolean;
    disabled?: boolean;
  };
  /** Right column content */
  children: React.ReactNode;
};

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  eyebrow,
  title,
  description,
  logo,
  role,
  stats,
  cta,
  children,
}) => {
  const renderCta = (className: string) => {
    if (!cta || !cta.show) return null;
    if (cta.disabled) {
      return (
        <span className={`${className} opacity-50 cursor-not-allowed`} style={buttonFontFamily.primary}>
          {cta.label}
        </span>
      );
    }
    if (cta.href.startsWith('http')) {
      return (
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          style={buttonFontFamily.primary}
        >
          {cta.label}
        </a>
      );
    }
    return (
      <Link to={cta.href} className={className} style={buttonFontFamily.primary}>
        {cta.label}
      </Link>
    );
  };

  return (
    <div>
      {/* Mobile – left content on top, custom content below */}
      <div className="md:hidden">
        {(logo || role || eyebrow || title || description) && (
          <div className="mb-12 px-4">
            {logo ? (
              <div className="mb-6">
                <div className="flex items-center justify-start" style={{ width: '120px', height: '60px' }}>
                  {typeof logo === 'string' ? (
                    <img src={logo} alt="" className="max-h-full max-w-full w-auto h-auto object-contain" />
                  ) : (
                    <div className="max-h-full max-w-full w-full h-full flex items-center">{logo}</div>
                  )}
                </div>
                {role && (
                  <p className="text-[#3F3A2F] text-left" style={{ fontFamily: 'Aeonik Mono', fontSize: '12px', margin: 0 }}>
                    {role}
                  </p>
                )}
              </div>
            ) : (
              <>
                {eyebrow && (
                  <p
                    className="text-xs uppercase tracking-[0.35em] text-[#7A7464] mb-4 text-left"
                    style={{ fontFamily: 'Aeonik Extended' }}
                  >
                    {eyebrow}
                  </p>
                )}
                {title && (
                  <h2 className={`${typography.h2.className} mb-4 text-left`} style={typography.h2.style}>
                    {title}
                  </h2>
                )}
              </>
            )}

            {description && (
              <div className={`${typography.subheader.className} max-w-3xl text-left`} style={typography.subheader.style}>
                {description}
              </div>
            )}
            {stats && <div className="mt-6">{stats}</div>}
            {renderCta(`${buttonStyles.primary} mt-6 inline-block`)}
          </div>
        )}

        <div className="px-4">{children}</div>
      </div>

      {/* Desktop – side-by-side, right content extends to viewport edge */}
      <div className="hidden md:block">
        <div className="flex items-start pl-4 sm:pl-6 lg:pl-8">
          {/* Left content aligned to max-w container like ScreenGallery */}
          <div
            className="flex-shrink-0"
            style={{ width: 'min(512px, 40vw)', marginLeft: 'max(0px, calc((100vw - 1280px) / 2))' }}
          >
            {logo ? (
              <div className="mb-6">
                <div className="flex items-center" style={{ width: '120px', height: '60px' }}>
                  {typeof logo === 'string' ? (
                    <img src={logo} alt="" className="max-h-full max-w-full w-auto h-auto object-contain" />
                  ) : (
                    <div className="max-h-full max-w-full w-full h-full flex items-center">{logo}</div>
                  )}
                </div>
                {role && (
                  <p className="text-[#3F3A2F]" style={{ fontFamily: 'Aeonik Mono', fontSize: '12px', margin: 0 }}>
                    {role}
                  </p>
                )}
              </div>
            ) : (
              <>
                {eyebrow && (
                  <p className="text-xs uppercase tracking-[0.35em] text-[#7A7464] mb-4" style={{ fontFamily: 'Aeonik Extended' }}>
                    {eyebrow}
                  </p>
                )}
                {title && (
                  <h2 className={`${typography.h2.className} mb-4`} style={typography.h2.style}>
                    {title}
                  </h2>
                )}
              </>
            )}

            {description && (
              <div className={`${typography.subheader.className}`} style={typography.subheader.style}>
                {description}
              </div>
            )}
            {stats && <div className="mt-6">{stats}</div>}
            {renderCta(`${buttonStyles.primary} mt-12`)}
          </div>

          {/* Gap (match ScreenGallery spacing) */}
          <div className="w-12 lg:w-16 flex-shrink-0" />

          {/* Right content */}
          <div className="flex-1 pr-4 sm:pr-6 lg:pr-8">{children}</div>
        </div>
      </div>
    </div>
  );
};




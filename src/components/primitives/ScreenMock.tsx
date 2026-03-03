import React from 'react';
import { shadows } from '../../design/shadows';

const placeholderGradients = [
  'linear-gradient(135deg,#F5F2ED 0%,#E8E3D9 100%)',
  'linear-gradient(135deg,#FFF1E6 0%,#F5D2C5 100%)',
  'linear-gradient(135deg,#E3F2FD 0%,#B9D7EA 100%)'
];

type ScreenMockProps = {
  imageSrc?: string;
  imageAlt?: string;
  gradientIndex: number;
  eager?: boolean;
  noBorder?: boolean;
  customBorderRadius?: string;
  noShadow?: boolean;
  /**
   * Optional custom content to render inside the mock frame (for interactive embeds).
   * When provided, it takes precedence over imageSrc.
   */
  children?: React.ReactNode;
};

export const ScreenMock: React.FC<ScreenMockProps> = ({
  imageSrc,
  imageAlt,
  gradientIndex,
  eager = false,
  noBorder = false,
  customBorderRadius,
  noShadow = false,
  children
}) => {
  const borderClasses = noBorder 
    ? '' 
    : 'border-[3px] border-[#130F25]';
  const roundedClasses = customBorderRadius 
    ? customBorderRadius
    : noBorder 
      ? 'rounded-[4px] md:rounded-[12px]' 
      : 'rounded-[34px]';

  const shadowClass = noShadow ? '' : shadows.mock.class;

  if (children) {
    return (
      <div
        className={`w-full h-full overflow-hidden ${roundedClasses} ${shadowClass} ${borderClasses}`}
        style={{ backgroundColor: 'transparent' }}
      >
        {children}
      </div>
    );
  }

  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={imageAlt || 'Product screen'}
        loading={eager ? undefined : 'lazy'}
        decoding={eager ? 'auto' : 'async'}
        fetchPriority={eager ? 'high' : 'low'}
        className={`max-h-full max-w-full object-contain ${roundedClasses} ${shadowClass} ${borderClasses}`}
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


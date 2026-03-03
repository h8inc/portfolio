import { ReactNode } from 'react';
import { shadows } from '../../../design/shadows';

interface PhoneFrameProps {
  children: ReactNode;
}

/**
 * Minimal phone frame (screen only, no bezel) for embedding wallet mocks
 * in ScreenGallery. Same dimensions and scale as Home page Blockstream section.
 */
export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="w-full h-full relative">
      <div
        className={`phone-screen absolute top-1/2 left-1/2 ${shadows.mock.class}`}
        style={{ width: 430, height: 932, transform: 'translate(-50%, -50%) scale(0.62)' }}
      >
        <div className="phone-content">{children}</div>
      </div>
    </div>
  );
}

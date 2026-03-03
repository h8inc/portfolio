import { ReactNode } from 'react';

interface MobileDeviceFrameProps {
  children: ReactNode;
  inline?: boolean;
}

export function MobileDeviceFrame({ children, inline = false }: MobileDeviceFrameProps) {
  if (inline) {
    return (
      <div className="mobile-frame-inline">
        <div className="phone-bezel">
          <div className="phone-screen">
            <div className="phone-content">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-frame-wrapper">
      <div className="mobile-frame-container">
        <div className="phone-bezel">
          <div className="phone-screen" id="phone-screen-root">
            <div className="phone-content">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

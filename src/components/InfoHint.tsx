import React, { useEffect, useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Popover from '@radix-ui/react-popover';

type InfoHintProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  contentClassName?: string;
};

/**
 * InfoHint shows a Tooltip on pointer-precise devices (mouse/trackpad)
 * and a Popover on touch devices. This ensures hover on desktop and
 * tap-to-toggle on mobile, while keeping identical styling and portal behavior.
 */
export function InfoHint({
  trigger,
  content,
  side = 'bottom',
  align = 'end',
  sideOffset = 8,
  contentClassName = 'z-[1000] rounded-md bg-black/90 text-white px-4 py-3 text-xs shadow-lg max-w-[280px] leading-relaxed text-left',
}: InfoHintProps) {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const getIsTouch = () => {
      if (typeof window === 'undefined') return false;
      return (
        (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
        (navigator as any).maxTouchPoints > 0
      );
    };
    setIsTouch(getIsTouch());
    const mq = window.matchMedia?.('(pointer: coarse)');
    const handler = () => setIsTouch(getIsTouch());
    mq?.addEventListener('change', handler);
    return () => mq?.removeEventListener('change', handler);
  }, []);

  if (isTouch) {
    return (
      <Popover.Root>
        <Popover.Trigger asChild>{trigger}</Popover.Trigger>
        <Popover.Portal>
          <Popover.Content side={side} align={align} sideOffset={sideOffset} className={contentClassName}>
            {content}
            <Popover.Arrow className="fill-black/90" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  }

  return (
    <Tooltip.Provider delayDuration={150} skipDelayDuration={300}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{trigger}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side={side} align={align} sideOffset={sideOffset} className={contentClassName}>
            {content}
            <Tooltip.Arrow className="fill-black/90" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}



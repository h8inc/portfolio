import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const OVERLAY_PATHS = ['/tide', '/about'];

export function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathRef = useRef(pathname);
  
  useEffect(() => {
    const prevPath = prevPathRef.current;
    const wasOverlay = OVERLAY_PATHS.includes(prevPath);
    const isOverlay = OVERLAY_PATHS.includes(pathname);
    
    // Don't scroll when:
    // 1. Navigating to an overlay (preserve home scroll position)
    // 2. Returning from an overlay to home (preserve home scroll position)
    const shouldSkipScroll = 
      (pathname === '/' && wasOverlay) || // Returning from overlay to home
      (prevPath === '/' && isOverlay);     // Opening overlay from home
    
    if (!shouldSkipScroll) {
      window.scrollTo(0, 0);
    }
    
    prevPathRef.current = pathname;
  }, [pathname]);
  
  return null;
}


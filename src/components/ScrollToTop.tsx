import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const OVERLAY_PATHS = ['/tide', '/about', '/extended'];

export function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Do NOTHING - App.tsx handles all scroll management for overlays and home
    // This component is kept for potential future non-overlay routes
  }, [pathname]);
  
  return null;
}


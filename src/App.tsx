import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Home from './pages/Home';
import Tide from './pages/Tide';
import Extended from './pages/Extended';
import About from './pages/About';

const OVERLAY_PATHS = ['/tide', '/about', '/extended'];

function App() {
  const location = useLocation();
  const isOverlay = OVERLAY_PATHS.includes(location.pathname);
  const scrollPositionRef = useRef(0);

  // Disable browser scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Preserve scroll position during navigation
  useEffect(() => {
    // Save current position before any route change
    const currentScroll = window.scrollY;
    scrollPositionRef.current = currentScroll;
    
    // Immediately after React processes the route change, restore position
    const restoreScroll = () => {
      window.scrollTo(0, scrollPositionRef.current);
    };
    
    // Use multiple methods to ensure scroll is preserved
    restoreScroll(); // Immediate
    setTimeout(restoreScroll, 0); // Next tick
    requestAnimationFrame(restoreScroll); // Next frame
    
  }, [location.pathname]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOverlay) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOverlay]);

  return (
    <>
      
      {/* Home page - always mounted underneath overlays, or shown on home route */}
      {(location.pathname === '/' || isOverlay) && (
        <div style={{ display: isOverlay ? 'none' : 'block' }}>
          <Home />
        </div>
      )}
      
      {/* Overlay routes slide in on top */}
      <AnimatePresence>
        {isOverlay && (
          <>
            {/* Background layer sits between Home and overlay content - fades with overlay */}
            <motion.div 
              className="fixed inset-0 z-20" 
              style={{ pointerEvents: 'none' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  background:
                    'radial-gradient(120% 100% at 50% 0%, rgba(227,233,255,1) 0%, rgba(243,239,234,1) 60%, rgba(247,226,216,1) 100%)'
                }}
              />
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    'url(https://framerusercontent.com/images/gOHq8h45ifJphidGvrjMYiYc.png?scale-down-to=1024&width=3072&height=3072)'
                }}
              />
            </motion.div>
            <motion.div
              key={location.pathname}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1] // Smooth exponential easing
              }}
              style={{ 
                position: 'fixed', 
                inset: 0, 
                zIndex: 30, 
                overflowY: 'auto', 
                overflowX: 'hidden',
                width: '100vw',
                height: '100vh',
                willChange: 'transform',
                WebkitOverflowScrolling: 'touch' // Smooth scroll on iOS
              }}
            >
              <Routes location={location}>
                <Route path="/tide" element={<Tide />} />
                <Route path="/about" element={<About />} />
                <Route path="/extended" element={<Extended />} />
              </Routes>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
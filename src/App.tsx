import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react';
import Home from './pages/Home';
import Tide from './pages/Tide';
import Extended from './pages/Extended';
import About from './pages/About';
import Blockstream from './pages/Blockstream';

const DemoUpsell = lazy(() => import('./case-studies/blockstream/demos/DemoUpsell'));
const DemoSecurity = lazy(() => import('./case-studies/blockstream/demos/DemoSecurity'));
const DemoSell = lazy(() => import('./case-studies/blockstream/demos/DemoSell'));
const DemoReceive = lazy(() => import('./case-studies/blockstream/demos/DemoReceive'));

const DEMO_PATHS = ['/demo/upsell', '/demo/security', '/demo/sell', '/demo/receive'];
const OVERLAY_PATHS = ['/tide', '/about', '/extended', '/blockstream'];

function App() {
  const location = useLocation();
  const isDemo = DEMO_PATHS.includes(location.pathname);
  const isOverlay = OVERLAY_PATHS.includes(location.pathname);
  const scrollPositionRef = useRef(0);
  const prevPathRef = useRef(location.pathname);

  // Disable browser scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Track scroll position while on Home
  useEffect(() => {
    if (location.pathname === '/' && !isOverlay) {
      const handleScroll = () => {
        scrollPositionRef.current = window.scrollY;
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [location.pathname, isOverlay]);

  // Restore scroll position BEFORE paint when returning from an overlay
  useLayoutEffect(() => {
    const prevPath = prevPathRef.current;
    const wasOverlay = OVERLAY_PATHS.includes(prevPath);

    if (location.pathname === '/' && wasOverlay) {
      window.scrollTo(0, scrollPositionRef.current);
    }

    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOverlay) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOverlay]);

  if (isDemo) {
    return (
      <Suspense fallback={
        <div className="h-screen w-screen flex items-center justify-center bg-[#0d0d0d]">
          <div className="w-6 h-6 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
        </div>
      }>
        <Routes location={location}>
          <Route path="/demo/upsell" element={<DemoUpsell />} />
          <Route path="/demo/security" element={<DemoSecurity />} />
          <Route path="/demo/sell" element={<DemoSell />} />
          <Route path="/demo/receive" element={<DemoReceive />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <>
      
      {/* Home page stays mounted to preserve scroll position */}
      <div
        style={{
          visibility: isOverlay ? 'hidden' : 'visible',
          pointerEvents: isOverlay ? 'none' : 'auto'
        }}
      >
        <Home />
      </div>
      
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
                <Route path="/blockstream" element={<Blockstream />} />
              </Routes>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
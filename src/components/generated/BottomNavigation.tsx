import React from 'react';
import { Home, TrendingUp, ArrowUpRight, Wallet, Percent } from 'lucide-react';
import { motion } from 'framer-motion';
type BottomNavigationProps = {
  onNavigate?: (item: string) => void;
};
type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
  isCenter?: boolean;
};
const navItems: NavItem[] = [{
  id: 'markets',
  label: 'Markets',
  icon: Home
}, {
  id: 'trading',
  label: 'Trading',
  icon: TrendingUp
}, {
  id: 'exchange',
  label: '',
  icon: ArrowUpRight,
  isCenter: true
}, {
  id: 'portfolio',
  label: 'Portfolio',
  icon: Wallet
}, {
  id: 'earn',
  label: 'Earn',
  icon: Percent
}];

// @component: BottomNavigation
export const BottomNavigation = (props: BottomNavigationProps) => {
  const {
    onNavigate
  } = props;
  const [activeItem, setActiveItem] = React.useState('portfolio');
  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    onNavigate?.(itemId);
  };

  // @return
  return <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a2e] border-t border-white/5 pb-safe z-50" style={{
    display: "none"
  }}>
      <div className="max-w-screen-xl mx-auto px-4">
        <nav className="flex items-center justify-around h-20">
          {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          if (item.isCenter) {
            return <button key={item.id} onClick={() => handleItemClick(item.id)} className="flex flex-col items-center justify-center relative" aria-label="Exchange">
                  <motion.div className="w-16 h-16 rounded-full bg-[#7c4dff] flex items-center justify-center shadow-lg shadow-purple-500/30 -mt-6" whileTap={{
                scale: 0.95
              }} whileHover={{
                scale: 1.05
              }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </motion.div>
                </button>;
          }
          return <button key={item.id} onClick={() => handleItemClick(item.id)} className="flex flex-col items-center justify-center gap-1 min-w-[72px] relative">
                <motion.div whileTap={{
              scale: 0.9
            }} className="flex flex-col items-center gap-1">
                  <Icon className={`w-6 h-6 transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`} strokeWidth={2} />
                  <span className={`text-xs font-medium transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>
                    {item.label}
                  </span>
                </motion.div>
                {isActive && !item.isCenter && <motion.div layoutId="activeIndicator" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-500" transition={{
              type: 'spring',
              stiffness: 380,
              damping: 30
            }} />}
              </button>;
        })}
        </nav>
      </div>
    </div>;
};
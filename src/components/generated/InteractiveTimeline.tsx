import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TimelineEvent = {
  id: string;
  year: string;
  title: string;
  description: string[];
  logos?: string[];
  position: 'top' | 'bottom';
};

type InteractiveTimelineProps = {
  events?: TimelineEvent[];
  /**
   * When true (default), the component behaves as a full-page section with its own background.
   * When false, it renders as a self-contained block that can be embedded inside another layout
   * (for example on the Tide page inside the gradient background).
   */
  fullScreen?: boolean;
};

const defaultEvents: TimelineEvent[] = [{
  id: '1',
  year: '2012',
  title: 'Began in visual design',
  description: ['Started in garage, built offices in CA & India', 'Produced $1.5M in sales first year'],
  logos: ['Williams Sonoma', 'Google'],
  position: 'bottom'
}, {
  id: '2',
  year: '2014',
  title: 'Built design agency',
  description: ['Started in garage, built offices in CA & India', 'Produced $1.5M in sales first year'],
  logos: ['Honda', 'Genentech', 'Sutter Health', 'Stanford'],
  position: 'top'
}, {
  id: '3',
  year: '2017',
  title: 'Co-founded startup',
  description: ['Raised $500K Seed + $5M Series A', 'Launched 2 pilot programs', 'Started as side project at agency'],
  logos: ['Sureify'],
  position: 'bottom'
}, {
  id: '4',
  year: '2019',
  title: 'AI/ML tools before the hype',
  description: ['Led major redesign, increased MAUs', 'Discovered I like to lead & mentor', 'Acquired by Instacart'],
  logos: ['Eversight by Instacart', 'Sutter Hill Ventures'],
  position: 'top'
}, {
  id: '5',
  year: 'NOW',
  title: 'Founded & leading design',
  description: ['Helped raise $350M+', 'Led major redesign, +200% YoY ARR', 'Design & research for AI', 'Leading 4-person design team'],
  logos: ['Observe'],
  position: 'bottom'
}];

// @component: InteractiveTimeline
export const InteractiveTimeline = ({
  events = defaultEvents,
  fullScreen = true
}: InteractiveTimelineProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleEventClick = (id: string) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const isExpanded = (id: string) => hoveredId === id || selectedId === id;

   // Root container styling:
   // - In fullScreen mode we keep the original "own page" behavior
   // - In embedded mode we remove the min-h-screen and turn it into a card-like section
   const rootClasses = fullScreen
     ? 'w-full min-h-screen bg-[#F5F2ED]'
     : 'w-full bg-[#F5F2ED] rounded-[32px] sm:rounded-[40px]';

  // @return
  return <div className={rootClasses}>
      {/* Desktop View */}
      <div className="hidden md:block px-8 lg:px-12 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="relative" style={{
          paddingTop: '200px',
          paddingBottom: '200px'
        }}>
            {/* Timeline Line */}
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-[#D4D1CB] -translate-y-1/2" />

            {/* Timeline Events */}
            <div className="relative flex justify-between items-center">
              {events.map((event, index) => {
              const expanded = isExpanded(event.id);
              const isTop = event.position === 'top';
              return <motion.div key={event.id} className="relative flex-1 flex flex-col items-center" style={{
                zIndex: expanded ? 20 : 10
              }}>
                    {/* Content Card */}
                    <AnimatePresence>
                      {expanded && <motion.div initial={{
                    opacity: 0,
                    y: isTop ? 20 : -20,
                    scale: 0.9
                  }} animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                  }} exit={{
                    opacity: 0,
                    y: isTop ? 20 : -20,
                    scale: 0.9
                  }} transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1]
                  }} className={`absolute ${isTop ? 'bottom-full mb-8' : 'top-full mt-8'} left-1/2 -translate-x-1/2 w-80`}>
                          <div className="bg-white rounded-lg p-6 shadow-xl border border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                              {event.title}
                            </h3>
                            <ul className="space-y-2 mb-4">
                              {event.description.map((item, i) => <li key={i} className="text-sm text-gray-600 leading-relaxed">
                                  • {item}
                                </li>)}
                            </ul>
                            {event.logos && event.logos.length > 0 && <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                                {event.logos.map((logo, i) => <span key={i} className="text-xs text-gray-500 font-medium">
                                    {logo}
                                  </span>)}
                              </div>}
                          </div>
                        </motion.div>}
                    </AnimatePresence>

                    {/* Timeline Node */}
                    <motion.button className="relative z-10 cursor-pointer touch-manipulation" onMouseEnter={() => setHoveredId(event.id)} onMouseLeave={() => setHoveredId(null)} onClick={() => handleEventClick(event.id)} whileHover={{
                  scale: 1.2
                }} whileTap={{
                  scale: 0.95
                }} aria-label={`View details for ${event.year}: ${event.title}`}>
                      <motion.div className="w-5 h-5 rounded-full bg-[#FF6B35] border-4 border-[#F5F2ED]" animate={{
                    scale: expanded ? 1.5 : 1,
                    backgroundColor: expanded ? '#FF6B35' : '#FF6B35'
                  }} transition={{
                    duration: 0.3
                  }} />
                    </motion.button>

                    {/* Year Label */}
                    <motion.div className={`absolute ${isTop ? 'top-full mt-4' : 'bottom-full mb-4'} text-center select-none pointer-events-none`} animate={{
                  scale: expanded ? 1.1 : 1,
                  fontWeight: expanded ? 600 : 400
                }}>
                      <span className="text-lg text-[#FF6B35] font-medium whitespace-nowrap">
                        {event.year}
                      </span>
                    </motion.div>

                    {/* Compact Title Preview (shown when not expanded) */}
                    <AnimatePresence>
                      {!expanded && <motion.div initial={{
                    opacity: 0
                  }} animate={{
                    opacity: 1
                  }} exit={{
                    opacity: 0
                  }} className={`absolute ${isTop ? 'bottom-full mb-12' : 'top-full mt-12'} text-center max-w-[160px] pointer-events-none`}>
                          <p className="text-sm text-gray-700 font-medium leading-tight">
                            {event.title}
                          </p>
                          {event.logos && event.logos.length > 0 && <div className="mt-2 space-y-1">
                              {event.logos.slice(0, 2).map((logo, i) => <p key={i} className="text-xs text-gray-400">
                                  {logo}
                                </p>)}
                            </div>}
                        </motion.div>}
                    </AnimatePresence>
                  </motion.div>;
            })}
            </div>
          </div>

          {/* Desktop Instructions */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Hover or click on timeline points to view details
            </p>
          </div>
        </div>
      </div>

      {/* Mobile View - Vertical Timeline */}
      <div className="md:hidden px-6 py-12">
        <div className="max-w-xl mx-auto">
          <div className="relative">
            {/* Vertical Timeline Line */}
            {/* Center the line under the 24px dot (w-6) -> 12px radius, minus 1px half-line width = ~11px */}
            <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-[#D4D1CB]" />

            {/* Timeline Events */}
            <div className="space-y-12">
              {events.map((event, index) => {
              const expanded = isExpanded(event.id);
              return <motion.div key={event.id} className="relative flex items-start gap-6" initial={false}>
                    {/* Timeline Node */}
                    <motion.button className="relative z-10 cursor-pointer touch-manipulation shrink-0" onClick={() => handleEventClick(event.id)} whileTap={{
                  scale: 0.9
                }} aria-label={`View details for ${event.year}: ${event.title}`}>
                      <motion.div className="w-6 h-6 rounded-full bg-[#FF6B35] border-4 border-[#F5F2ED] shadow-lg" animate={{
                    scale: expanded ? 1.2 : 1
                  }} transition={{
                    duration: 0.3
                  }} />
                    </motion.button>

                    {/* Content Area */}
                    <div className="flex-1 pb-4">
                      {/* Year and Title - Always visible */}
                      <div className="mb-3">
                        <span className="text-lg font-semibold text-[#FF6B35] block mb-1">
                          {event.year}
                        </span>
                        <h3 className="text-base font-semibold text-gray-900">
                          {event.title}
                        </h3>
                      </div>

                      {/* Expandable Details */}
                      <AnimatePresence>
                        {expanded && <motion.div initial={{
                      opacity: 0,
                      height: 0
                    }} animate={{
                      opacity: 1,
                      height: 'auto'
                    }} exit={{
                      opacity: 0,
                      height: 0
                    }} transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1]
                    }}>
                            <div className="bg-white rounded-lg p-5 shadow-lg border border-gray-200">
                              <ul className="space-y-2 mb-4">
                                {event.description.map((item, i) => <li key={i} className="text-sm text-gray-600 leading-relaxed">
                                    • {item}
                                  </li>)}
                              </ul>
                              {event.logos && event.logos.length > 0 && <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                                  {event.logos.map((logo, i) => <span key={i} className="text-xs text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded">
                                      {logo}
                                    </span>)}
                                </div>}
                            </div>
                          </motion.div>}
                      </AnimatePresence>

                      {/* Tap to expand hint when not expanded */}
                      {!expanded && <motion.p initial={{
                    opacity: 0
                  }} animate={{
                    opacity: 1
                  }} className="text-xs text-gray-400 mt-2">
                          Tap to view details →
                        </motion.p>}
                    </div>
                  </motion.div>;
            })}
            </div>
          </div>

          {/* Mobile Instructions */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Tap on timeline points to expand details
            </p>
          </div>
        </div>
      </div>
    </div>;
};


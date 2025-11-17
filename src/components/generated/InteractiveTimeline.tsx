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

const defaultEvents: TimelineEvent[] = [
  {
    id: '2',
    year: 'Q3 ’23 → Q1 ’24',
    title: 'Built accounting product',
    description: [
      'Joined as IC, working with 5 team, and 3 product managers.',
      'Turned a basic bookkeeping feature (<300 users) into a robut accounting product',
      'Build tax and financial insights modules from 0 to live products through iterative delivery.'
    ],
    logos: [''],
    position: 'bottom'
  },
  {
    id: '3',
    year: 'Q1 ’24 → Q2 ’24',
    title: 'Introduced freemium at Tide',
    description: [
      'Influenced the roadmap to decouple from third party software.',
      'Persuaded the VP and Engineering to adopt a freemium approach.',
      'Shifted from marketing-led to product-led in the app.',
      'Drove sign up rate 0.95% → 1.65%.'
    ],
    logos: [''],
    position: 'bottom'
  },
  {
    id: '4',
    year: 'Q2 ’24 → Q4 ’24',
    title: 'Scaled freemium across accounting',
    description: [
      'Presented financial insights = retention = revenue.',
      'Presented that tax estimates capture top‑of‑funnel demand.',
      'Influenced the design of backend to support freemium on insights and tax estimates.',
      'Sign‑up rate grew from 1.6% → 3.8% through.',
      'ARR grew from £900K → £2M.'
    ],
    logos: [''],
    position: 'bottom'
  },
  {
    id: '5',
    year: 'Q4 ’24 → Q2 ’25',
    title: 'Redesigned Tide’s core surfaces',
    description: [
      'Redesigned one and influenced the design of a second of Tide’s 5 main tabs (1M+ users).',
      'Streamlined workflows to boost engagement, retention and revenue for accounting.',
      'Sign‑ups to the accounting product grew from 3.8% → 21.2%, with 4× more new members signing up.',
      'ARR grew from £2M → £4M as 10% of freemium sign‑ups converted to paying customers.'
    ],
    logos: [''],
    position: 'bottom'
  },
  {
    id: '6',
    year: 'Q2 ’25 → Today',
    title: 'Building 2 new products',
    description: [
      'Building two new products at Tide, applying the same discovery, experimentation and growth playbook.',
      'Balancing product strategy, UX and experimentation to unlock the next wave of SaaS growth.'
    ],
    logos: [''],
    position: 'bottom'
  }
];

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

  const handleKeyToggle = (
    event: React.KeyboardEvent<HTMLElement>,
    id: string
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleEventClick(id);
    }
  };

  const handleMouseLeave = (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    const nextTarget = event.relatedTarget as HTMLElement | null;
    if (nextTarget && nextTarget.closest(`[data-timeline-id="${id}"]`)) {
      return;
    }
    setHoveredId((current) => (current === id ? null : current));
  };

  const isExpanded = (id: string) => hoveredId === id || selectedId === id;

   // Root container styling:
   // - In fullScreen mode we keep the original "own page" behavior
   // - In embedded mode we remove the min-h-screen and turn it into a card-like section
   const rootClasses = fullScreen
     ? 'w-full min-h-screen bg-[#F5F2ED]'
     : 'w-full bg-[#FAF7F0] rounded-[32px] sm:rounded-[40px]';

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
            <div className="relative flex justify-between items-center overflow-visible">
              {events.map((event) => {
              const expanded = isExpanded(event.id);
              const isTop = event.position === 'top';
              const detailsId = `timeline-details-desktop-${event.id}`;
              return <motion.div key={event.id} data-timeline-id={event.id} className="relative flex-1 flex flex-col items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]/40 rounded-xl overflow-visible" style={{
                zIndex: expanded ? 20 : 10
              }} role="button" tabIndex={0} aria-pressed={selectedId === event.id} aria-expanded={expanded} aria-controls={detailsId} onMouseEnter={() => setHoveredId(event.id)} onMouseLeave={(mouseEvent) => handleMouseLeave(mouseEvent, event.id)} onClick={() => handleEventClick(event.id)} onKeyDown={(keyboardEvent) => handleKeyToggle(keyboardEvent, event.id)}>
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
                  }} id={detailsId} className={`absolute ${isTop ? 'bottom-full mb-8' : 'top-full mt-8'} left-1/2 -translate-x-1/2 w-[600px] max-w-[90vw]`}>
                          <div className="bg-white rounded-lg p-6 shadow-xl border border-gray-200">
                            <h3
                              className="text-3xl font-semibold text-gray-900 mb-4"
                              style={{ fontFamily: 'Aeonik' }}
                            >
                              {event.title}
                            </h3>
                            <ul className="space-y-2 mb-4">
                              {event.description.map((item, i) => (
                                <li
                                  key={i}
                                  className="text-sm text-gray-600 leading-relaxed"
                                  style={{ fontFamily: 'Aeonik' }}
                                >
                                  • {item}
                                </li>
                              ))}
                            </ul>
                            {event.logos && event.logos.length > 0 && (
                              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                                {event.logos.map((logo, i) => (
                                  <span
                                    key={i}
                                    className="text-xs text-gray-500 font-medium"
                                    style={{ fontFamily: 'Aeonik' }}
                                  >
                                    {logo}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>}
                    </AnimatePresence>

                    {/* Timeline Node */}
                    <motion.div className="relative z-10 touch-manipulation" whileHover={{
                  scale: 1.2
                }} whileTap={{
                  scale: 0.95
                }} aria-hidden="true">
                      <motion.div className="w-5 h-5 rounded-full bg-[#FF6B35] border-4 border-[#F5F2ED]" animate={{
                    scale: expanded ? 1.5 : 1,
                    backgroundColor: expanded ? '#FF6B35' : '#FF6B35'
                  }} transition={{
                    duration: 0.3
                  }} />
                    </motion.div>

                    {/* Year Label */}
                    <motion.div className={`absolute ${isTop ? 'top-full mt-4' : 'bottom-full mb-4'} text-center select-none`} animate={{
                  scale: expanded ? 1.1 : 1,
                  fontWeight: expanded ? 600 : 400
                }} onMouseEnter={() => setHoveredId(event.id)} onMouseLeave={(mouseEvent) => handleMouseLeave(mouseEvent, event.id)}>
                      <span
                        className="text-2xl text-[#FF6B35] font-medium whitespace-nowrap"
                        style={{ fontFamily: 'Aeonik' }}
                      >
                        {event.year}
                      </span>
                    </motion.div>

                    {/* Compact Title Preview (shown when not expanded) */}
                    <AnimatePresence>
                      {!expanded && (
                        <motion.div initial={{
                    opacity: 0
                  }} animate={{
                    opacity: 1
                  }} exit={{
                    opacity: 0
                  }} className={`absolute ${isTop ? 'bottom-full mb-8' : 'top-full mt-8'} text-center max-w-[160px]`} onMouseEnter={() => setHoveredId(event.id)} onMouseLeave={(mouseEvent) => handleMouseLeave(mouseEvent, event.id)}>
                          <p
                            className="text-lg text-gray-700 font-medium leading-tight"
                            style={{ fontFamily: 'Aeonik' }}
                          >
                            {event.title}
                          </p>
                          {event.logos && event.logos.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {event.logos.slice(0, 2).map((logo, i) => (
                                <p
                                  key={i}
                                  className="text-xs text-gray-400"
                                  style={{ fontFamily: 'Aeonik' }}
                                >
                                  {logo}
                                </p>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>;
            })}
            </div>
          </div>

          {/* Desktop Instructions */}
          <div className="mt-8 text-center">
            <p
              className="text-sm text-gray-500"
              style={{ fontFamily: 'Aeonik' }}
            >
              Hover or click each milestone to view details
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
              {events.map((event) => {
              const expanded = isExpanded(event.id);
              const detailsId = `timeline-details-mobile-${event.id}`;
              return <motion.div key={event.id} className="relative flex items-start gap-6 cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]/40" initial={false} role="button" tabIndex={0} aria-expanded={expanded} aria-controls={detailsId} onClick={() => handleEventClick(event.id)} onKeyDown={(keyboardEvent) => handleKeyToggle(keyboardEvent, event.id)} whileTap={{
                scale: 0.97
              }}>
                    {/* Timeline Node */}
                    <motion.div className="relative z-10 touch-manipulation shrink-0" whileTap={{
                  scale: 0.9
                }} aria-hidden="true">
                      <motion.div className="w-6 h-6 rounded-full bg-[#FF6B35] border-4 border-[#F5F2ED] shadow-lg" animate={{
                    scale: expanded ? 1.2 : 1
                  }} transition={{
                    duration: 0.3
                  }} />
                    </motion.div>

                    {/* Content Area */}
                    <div className="flex-1 pb-4">
                      {/* Year and Title - Always visible */}
                      <div className="mb-3">
                        <span
                          className="text-2xl font-semibold text-[#FF6B35] block mb-1"
                          style={{ fontFamily: 'Aeonik' }}
                        >
                          {event.year}
                        </span>
                        <h3
                          className="text-xl font-semibold text-gray-900"
                          style={{ fontFamily: 'Aeonik' }}
                        >
                          {event.title}
                        </h3>
                      </div>

                      {/* Expandable Details */}
                      <AnimatePresence>
                        {expanded && <motion.div id={detailsId} initial={{
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
                                {event.description.map((item, i) => (
                                  <li
                                    key={i}
                                    className="text-sm text-gray-600 leading-relaxed"
                                    style={{ fontFamily: 'Aeonik' }}
                                  >
                                    • {item}
                                  </li>
                                ))}
                              </ul>
                              {event.logos && event.logos.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                                  {event.logos.map((logo, i) => (
                                    <span
                                      key={i}
                                      className="text-xs text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded"
                                      style={{ fontFamily: 'Aeonik' }}
                                    >
                                      {logo}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>}
                      </AnimatePresence>

                      {/* Tap to expand hint when not expanded */}
                      {!expanded && <motion.p initial={{
                    opacity: 0
                  }} animate={{
                    opacity: 1
                  }} className="text-xs text-gray-400 mt-2" style={{ fontFamily: 'Aeonik' }}>
                          Tap to view details →
                        </motion.p>}
                    </div>
                  </motion.div>;
            })}
            </div>
          </div>

          {/* Mobile Instructions */}
          <div className="mt-12 text-center">
            <p
              className="text-sm text-gray-500"
              style={{ fontFamily: 'Aeonik' }}
            >
              Tap on timeline points to expand details
            </p>
          </div>
        </div>
      </div>
    </div>;
};


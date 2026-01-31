import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { typography } from '../../design/typography';
import { useCanHover } from '../../hooks/use-can-hover';

const IMAGES = [
  { url: '/assets/boycho-popov-AnaSoVj-XPU-unsplash%20(1).jpg', alt: 'Plovdiv, Bulgaria — cobbled street with mural and vintage street lamp' },
  { url: '/assets/about-mountain-peak.png', alt: 'Person on a rocky mountain peak overlooking a vast mountain range under a clear blue sky' },
  { url: '/assets/about-mountain-trekking.png', alt: 'Mountain trekking in snow — cross-country skiing through a snowy forest towards sunlit peaks' },
];

export function PortfolioAbout() {
  const canHover = useCanHover();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canHover) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (galleryRef.current && !galleryRef.current.contains(e.target as Node)) {
        setActiveIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [canHover]);

  const isExpanded = (index: number) => canHover ? false : activeIndex === index;

  return (
    <section className="w-full min-h-screen bg-[#FAF7F0] flex items-center justify-center py-12 px-4 sm:px-6 md:py-24 md:px-12 overflow-x-hidden">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col space-y-8 lg:sticky lg:top-24"
          >
            <h2 className={`${typography.h2.className} text-[#130F25] tracking-tight`} style={typography.h2.style}>
              About me
            </h2>
            <div className={`${typography.subheader.className} space-y-6 text-[#3F3A2F] leading-relaxed`} style={typography.subheader.style}>
              <p>
                I was born in Plovdiv, Bulgaria — a city that&apos;s been alive for over 8,000 years — where my curiosity for psychology, entrepreneurship, and creativity first took shape, probably somewhere between books, ideas, and a few graffiti walls.
              </p>
              <p>
                In 2015, a scholarship took me to Barcelona for a master&apos;s in economics and marketing, where I helped a startup with customer discovery. From project management and conversion optimisation to incubating a digital product, my path naturally evolved into product design.
              </p>
              <p>
                After a decade abroad, across eight countries, I returned home to be closer to family — now designing, coding a little, and chasing mountains with my dog.
              </p>
            </div>
          </motion.div>

          <motion.div
            ref={galleryRef}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex gap-2 sm:gap-4 h-[320px] sm:h-[420px] md:h-[560px] lg:h-[700px] w-full touch-manipulation"
          >
            {IMAGES.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  if (!canHover) setActiveIndex((i) => (i === index ? null : index));
                }}
                className={`
                  group relative h-full overflow-hidden rounded-xl flex-1 transition-[flex] duration-500 ease-in-out
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2
                  ${isExpanded(index) ? 'flex-[1.5]' : 'flex-1'}
                  ${canHover ? 'hover:flex-[1.5]' : ''}
                `}
                aria-pressed={isExpanded(index)}
                aria-label={`View ${image.alt}`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="h-full w-[60vw] max-w-none object-cover object-center pointer-events-none select-none"
                    draggable={false}
                  />
                </div>
                <div
                  className={`absolute inset-0 transition-colors duration-300 pointer-events-none ${
                    isExpanded(index) ? 'bg-transparent' : 'bg-black/5'
                  } ${canHover ? 'group-hover:bg-transparent' : ''}`}
                />
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

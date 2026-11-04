'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';

const webBanner = '/assets/services/service-web.jpg';
const appBanner = '/assets/services/service-app.jpg';
const chatBanner = '/assets/services/service-chat.jpg';
const erpBanner = '/assets/services/service-erp.jpg';
const seoBanner = '/assets/services/service-seo.jpg';
const socialBanner = '/assets/services/service-social.jpg';
const geoBanner = '/assets/services/service-geo.jpg';

const webIcon = '/assets/icons/web.svg';
const appIcon = '/assets/icons/app.svg';
const chatIcon = '/assets/icons/chat.svg';
const erpIcon = '/assets/icons/erp.svg';
const seoIcon = '/assets/icons/seo.svg';
const socialIcon = '/assets/icons/social.svg';
const geoIcon = '/assets/icons/geo.svg';

export const servicesData = [
  {
    id: 'web',
    title: 'Website Development',
    quote: 'Our website looks outdated',
    label: '4 solutions',
    description:
      'Custom website design and development for businesses that want more enquiries, not just a nicer homepage. Fast, mobile-first, SEO-ready sites and e-commerce stores built on WordPress, Shopify or React.',
    image: webBanner,
    bakedQuote: true,
    icon: webIcon,
    href: '/know-that-what-work-we-do#web'
  },
  {
    id: 'app',
    title: 'Mobile App Development',
    quote: 'We need our own mobile app',
    label: '4 solutions',
    description:
      'Android and iOS app development from idea to Play Store and App Store. We design clean user journeys, build with Flutter and give you a secure admin panel to run everything.',
    image: appBanner,
    bakedQuote: true,
    bakedLabel: true,
    icon: appIcon,
    href: '/know-that-what-work-we-do#app'
  },
  {
    id: 'chat',
    title: 'AI Chatbot Development',
    quote: "We can't reply to every WhatsApp message",
    label: '4 solutions',
    description:
      'AI chatbots and AI agents for your website and WhatsApp that answer customer questions, book appointments and capture leads around the clock — trained on your own services.',
    image: chatBanner,
    bakedQuote: true,
    bakedLabel: true,
    icon: chatIcon,
    href: '/know-that-what-work-we-do#chat'
  },
  {
    id: 'erp',
    title: 'ERP Solutions',
    quote: 'Our operations run on spreadsheets',
    label: '4 solutions',
    description:
      'Custom ERP and CRM software that replaces spreadsheets with one connected system for leads, sales, inventory, billing, production and reports. Zoho and ERPNext setup available.',
    image: erpBanner,
    bakedQuote: false,
    icon: erpIcon,
    href: '/know-that-what-work-we-do#erp'
  },
  {
    id: 'seo',
    title: 'SEO & Google Ads',
    quote: "Customers can't find us on Google",
    label: '4 solutions',
    description:
      'SEO and Google Ads management that puts your business in front of people already searching for you. Technical and local SEO, Google Business Profile and Performance Max campaigns.',
    image: seoBanner,
    bakedQuote: true,
    bakedLabel: true,
    icon: seoIcon,
    href: '/know-that-what-work-we-do#seo'
  },
  {
    id: 'social',
    title: 'Social Media & Ads Management',
    quote: "Our social media isn't bringing customers",
    label: '4 solutions',
    description:
      'Social media marketing and paid ads on Instagram, Facebook and LinkedIn — content, reels and lead-generation campaigns planned and managed end to end, with monthly reporting.',
    image: socialBanner,
    bakedQuote: true,
    bakedLabel: true,
    icon: socialIcon,
    href: '/know-that-what-work-we-do#social'
  },
  {
    id: 'geo',
    title: 'Geospatial Solutions',
    quote: 'We need accurate maps and location data',
    label: '4 solutions',
    description:
      'GIS mapping, survey digitisation, remote sensing and Web GIS dashboards that turn location data into clear decisions — proven on government projects across Uttarakhand.',
    image: geoBanner,
    bakedQuote: true,
    bakedLabel: true,
    icon: geoIcon,
    href: '/know-that-what-work-we-do#geo'
  }
];

const ArrowIcon = ({ className = "w-3.5 h-3.5 sm:w-4 sm:h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const PrevArrowIcon = ({ className = "w-4 h-4 sm:w-5 sm:h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const NextArrowIcon = ({ className = "w-4 h-4 sm:w-5 sm:h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

// Circular continuous distance calculation matching RS from design
const RS = (idx, activeWithOffset, total) => {
  let r = ((idx - activeWithOffset) % total + total) % total;
  if (r >= total / 2) r -= total;
  return r;
};

// Responsive Coverflow configuration matching wS from design
const wS = (width) =>
  width < 560
    ? { cardW: Math.min(Math.max(width * 0.78, 260), 340), spread: 0.62 }
    : width < 900
    ? { cardW: Math.min(width * 0.5, 420), spread: 0.75 }
    : { cardW: Math.min(width * 0.36, 470), spread: 0.8 };

// 3D Cylinder Radius matching HS from design
const HS = (config, total) =>
  (config.cardW / 2 / Math.tan(Math.PI / total)) * 1.08;

// Exact 3D Coordinate Projection matching SS from design
const SS = (dist, config, total) => {
  const radius = HS(config, total);
  const angleRad = (dist * 2 * Math.PI) / total;
  const angleDeg = (angleRad * 180) / Math.PI;
  const cos = Math.cos(angleRad);
  const rotY = Math.abs(angleDeg) <= 90 ? angleDeg : angleDeg - Math.sign(angleDeg) * 180;
  return {
    x: radius * Math.sin(angleRad),
    z: radius * (cos - 1),
    rotateY: rotY,
    y: (1 - cos) * 18,
    scale: 1,
    opacity: cos > 0 ? 1 : 0.35 + 0.65 * (1 + cos),
    zIndex: Math.round(100 + cos * 100)
  };
};

function useContainerWidth(ref) {
  const [width, setWidth] = useState(1200);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return width;
}

function ServiceCard({ item, isActive, distance, reduceMotion }) {
  const veilOpacity = Math.min(distance, 1) * 0.42;
  const tabIndex = isActive ? 0 : -1;

  return (
    <motion.article
      className={`cf-card relative p-2.5 sm:p-3 rounded-[24px] sm:rounded-[28px] bg-[#eef8fa] shadow-[18px_22px_40px_rgba(20,84,120,0.16),-14px_-14px_30px_rgba(255,255,255,0.95)] overflow-visible transition-[box-shadow,transform] duration-300 ${
        isActive ? 'is-active hover:shadow-[22px_30px_54px_rgba(20,84,120,0.22),-14px_-14px_30px_rgba(255,255,255,0.95)]' : ''
      }`}
      whileHover={isActive && !reduceMotion ? { y: -8 } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <div className="cf-card__media relative aspect-[16/9.6] rounded-[18px] sm:rounded-[20px] overflow-hidden bg-[#cfe7ec] after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-[42%] after:bg-gradient-to-t after:from-[rgba(7,20,40,0.55)] after:to-transparent after:pointer-events-none">
        <img
          src={item.image}
          alt=""
          draggable="false"
          loading="lazy"
          className="w-full h-full object-cover block scale-[1.02] transition-transform duration-900 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
        />
        {!item.bakedQuote && (
          <span className="cf-card__quote absolute top-2.5 sm:top-3 left-2.5 sm:left-3 z-[2] max-w-[calc(100%-20px)] sm:max-w-[calc(100%-24px)] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/95 text-[11px] sm:text-xs md:text-sm font-semibold text-[#0e1b2e] whitespace-nowrap overflow-hidden text-ellipsis shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
            “{item.quote}”
          </span>
        )}
      </div>

      <motion.div
        className="cf-card__icon absolute right-4 sm:right-6.5 top-[calc((var(--cf-card-w)-24px)*0.6+12px-36px)] sm:top-[calc((var(--cf-card-w)-24px)*0.6+12px-44px)] z-[3] w-[clamp(56px,17%,88px)] aspect-square rounded-full grid place-items-center bg-[#eef8fa] shadow-[8px_10px_20px_rgba(20,84,120,0.2),-6px_-6px_14px_rgba(255,255,255,0.95)]"
        animate={reduceMotion ? undefined : { y: [0, -7, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <img src={item.icon} alt="" draggable="false" className="w-[58%] h-[58%] object-contain" />
      </motion.div>

      <div className="cf-card__body pt-4 sm:pt-5.5 pb-2 px-1 sm:px-2 md:px-3 flex flex-col gap-2 sm:gap-2.5">
        <h3 className="cf-card__title m-0 pr-14 sm:pr-20 text-[clamp(17px,2vw,24px)] font-bold leading-[1.2] tracking-[-0.01em] text-[#0e1b2e]">
          {item.title}
        </h3>
        <p className="cf-card__desc m-0 text-xs sm:text-[13.5px] md:text-[15px] leading-[1.6] text-[#44546a] line-clamp-3 overflow-hidden">
          {item.description}
        </p>

        {/* Action Buttons - Arranged cleanly across mobile & desktop */}
        <div className="cf-card__actions mt-1 sm:mt-1.5 flex items-center justify-between gap-1.5 sm:gap-2.5 w-full">
          <Link
            className="cf-btn group/btn inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 min-h-[36px] sm:min-h-[42px] md:min-h-[46px] rounded-full bg-[#0b4db5] hover:bg-[#083a8a] text-white font-bold text-xs sm:text-[13.5px] md:text-[15px] whitespace-nowrap shadow-[0_10px_20px_-10px_rgba(11,77,181,0.85),inset_0_1px_rgba(255,255,255,0.25)] transition-all duration-200 hover:-translate-y-0.5 shrink-0"
            href={`/reach-to-us?service=${item.id}#contact`}
            tabIndex={tabIndex}
          >
            <span>Get a free plan</span>
            <ArrowIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Link>
          <Link
            className="cf-link group/link inline-flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 py-1.5 sm:px-2 sm:py-2 min-h-[34px] sm:min-h-[40px] md:min-h-[44px] text-[#0b4db5] hover:text-[#083a8a] font-bold text-xs sm:text-[13.5px] md:text-[15px] whitespace-nowrap transition-colors duration-200 shrink-0"
            href={item.href}
            tabIndex={tabIndex}
          >
            <span>Explore</span>
            <ArrowIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 shrink-0 transition-transform duration-200 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>

      <motion.span
        className="cf-card__veil absolute inset-0 rounded-[24px] sm:rounded-[28px] bg-[#eef8fa] pointer-events-none z-[4] transition-opacity duration-350"
        animate={{ opacity: veilOpacity }}
        transition={{ duration: 0.35 }}
        aria-hidden="true"
      />
    </motion.article>
  );
}

export function CoverflowCarousel({
  items = servicesData,
  autoplay = true,
  interval = 3800,
  initialIndex = 0,
  ariaLabel = 'Our services'
}) {
  const total = items.length;
  const reduceMotion = useReducedMotion();
  const stageRef = useRef(null);
  const containerWidth = useContainerWidth(stageRef);
  const cardConfig = wS(containerWidth);
  const spreadPixels = cardConfig.cardW * cardConfig.spread;

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hasDraggedRef = useRef(false);
  const [isTabHidden, setIsTabHidden] = useState(false);

  const normalizedActive = ((activeIndex % total) + total) % total;

  const step = useCallback((delta) => {
    setActiveIndex((prev) => prev + delta);
  }, []);

  const goTo = useCallback(
    (target) => {
      setActiveIndex((prev) => {
        const norm = ((prev % total) + total) % total;
        let diff = ((target - norm) % total + total) % total;
        if (diff > total / 2) diff -= total;
        return prev + diff;
      });
    },
    [total]
  );

  // Tab visibility
  useEffect(() => {
    const handleVis = () => setIsTabHidden(document.hidden);
    document.addEventListener('visibilitychange', handleVis);
    return () => document.removeEventListener('visibilitychange', handleVis);
  }, []);

  // Autoplay
  const isAutoplaying = autoplay && !reduceMotion && !isHovered && !isDragging && !isTabHidden && total > 1;
  useEffect(() => {
    if (!isAutoplaying) return;
    const timer = setTimeout(() => step(1), interval);
    return () => clearTimeout(timer);
  }, [isAutoplaying, activeIndex, interval, step]);

  // Framer Motion Pan Handlers matching L, U, Z in compiled bundle
  const handlePanStart = () => {
    hasDraggedRef.current = false;
    setIsDragging(true);
  };

  const handlePan = (e, info) => {
    if (Math.abs(info.offset.x) > 6) {
      hasDraggedRef.current = true;
    }
    setDragOffset(-info.offset.x / spreadPixels);
  };

  const handlePanEnd = (e, info) => {
    const momentum = -(info.offset.x + info.velocity.x * 0.25) / spreadPixels;
    let delta = Math.round(momentum);
    if (delta === 0 && Math.abs(info.offset.x) > spreadPixels * 0.18) {
      delta = info.offset.x < 0 ? 1 : -1;
    }
    delta = Math.max(-3, Math.min(3, delta));
    setDragOffset(0);
    setIsDragging(false);
    if (delta !== 0) {
      step(delta);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      step(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      step(-1);
    }
  };

  const springTransition = reduceMotion
    ? { duration: 0 }
    : { type: 'spring', stiffness: 140, damping: 22, mass: 0.9 };

  return (
    <section
      className="cf relative w-full text-[#0e1b2e] outline-none overflow-hidden select-none font-sans"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsHovered(true)}
      onBlurCapture={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
    >
      <motion.div
        ref={stageRef}
        className={`cf__stage relative h-[calc(var(--cf-card-w)*0.6+300px)] [perspective:1500px] [perspective-origin:50%_30%] touch-pan-y select-none ${
          isDragging ? 'is-dragging cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ '--cf-card-w': `${cardConfig.cardW}px` }}
        onPointerDownCapture={() => {
          hasDraggedRef.current = false;
        }}
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
      >
        <div className="cf__floor absolute inset-x-0 bottom-0 h-28 pointer-events-none" aria-hidden="true" />
        {items.map((item, idx) => {
          const dist = RS(idx, activeIndex + dragOffset, total);
          const pos = SS(dist, cardConfig, total);
          const isActive = idx === normalizedActive && !isDragging;
          const isFar = Math.abs(dist) > 1.5;

          return (
            <motion.div
              key={item.id}
              className="cf__slide absolute top-2 left-1/2 w-[var(--cf-card-w)] -ml-[calc(var(--cf-card-w)/2)] [transform-style:preserve-3d] will-change-[transform,opacity]"
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${total}: ${item.title}`}
              aria-hidden={idx !== normalizedActive}
              initial={false}
              animate={pos}
              transition={isDragging ? { duration: 0 } : springTransition}
              style={{ pointerEvents: isFar ? 'none' : 'auto' }}
              onClickCapture={(e) => {
                if (hasDraggedRef.current) {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
                if (idx !== normalizedActive) {
                  e.preventDefault();
                  e.stopPropagation();
                  goTo(idx);
                }
              }}
            >
              <ServiceCard
                item={item}
                isActive={isActive}
                distance={Math.min(Math.abs(dist) * 0.8, 1)}
                reduceMotion={reduceMotion}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Carousel Controls */}
      <div className="cf__controls mt-2 flex items-center justify-center gap-3 sm:gap-4.5">
        <button
          type="button"
          className="cf__arrow w-10 h-10 sm:w-[54px] sm:h-[54px] rounded-full border-0 grid place-items-center text-[#0b4db5] bg-[#eef8fa] cursor-pointer shadow-[5px_5px_12px_rgba(20,84,120,0.16),-5px_-5px_12px_rgba(255,255,255,0.95)] hover:scale-105 active:shadow-[inset_3px_3px_6px_rgba(20,84,120,0.16),inset_-3px_-3px_6px_rgba(255,255,255,0.95)] transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#f5b82e]"
          onClick={() => step(-1)}
          aria-label="Previous service"
        >
          <PrevArrowIcon />
        </button>

        <div className="cf__track flex items-center gap-2.5 sm:gap-3.5 px-3.5 py-2 sm:px-5 sm:py-3 rounded-full bg-[#e6f3f6] shadow-[inset_4px_4px_8px_rgba(20,84,120,0.16),inset_-4px_-4px_8px_rgba(255,255,255,0.95)]">
          <span className="cf__hint text-xs sm:text-[13px] font-bold text-[#44546a] whitespace-nowrap">
            360° · drag or swipe to spin
          </span>
          <div className="cf__dots flex items-center gap-1.5 sm:gap-2">
            {items.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className={`cf__dot relative h-2 sm:h-2.5 p-0 border-0 rounded-full cursor-pointer overflow-hidden transition-all duration-350 outline-none focus-visible:ring-2 focus-visible:ring-[#f5b82e] ${
                  idx === normalizedActive
                    ? 'is-on w-6 sm:w-[38px] bg-[#a9c4ee]'
                    : 'w-2 sm:w-2.5 bg-[#b5d3da]'
                }`}
                onClick={() => goTo(idx)}
                aria-label={`Show ${item.title}`}
                aria-current={idx === normalizedActive}
              >
                {idx === normalizedActive && isAutoplaying && (
                  <motion.span
                    key={activeIndex}
                    className="cf__dot-fill absolute inset-0 bg-[#0b4db5] origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: interval / 1000, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="cf__arrow w-10 h-10 sm:w-[54px] sm:h-[54px] rounded-full border-0 grid place-items-center text-[#0b4db5] bg-[#eef8fa] cursor-pointer shadow-[5px_5px_12px_rgba(20,84,120,0.16),-5px_-5px_12px_rgba(255,255,255,0.95)] hover:scale-105 active:shadow-[inset_3px_3px_6px_rgba(20,84,120,0.16),inset_-3px_-3px_6px_rgba(255,255,255,0.95)] transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#f5b82e]"
          onClick={() => step(1)}
          aria-label="Next service"
        >
          <NextArrowIcon />
        </button>
      </div>
    </section>
  );
}

export default function TopServices({
  eyebrow = "Our top services",
  title = <>Our <span className="hl text-[#0b4db5]">360°</span> digital strategy covers it all</>,
  lead = "Websites, apps, AI, ERP, search and geospatial — planned as one strategy for businesses across India. Drag, swipe or use the arrows to explore.",
  showCta = true
}) {
  return (
    <section className="sec services max-w-[1400px] mx-auto w-full px-4 overflow-hidden" aria-label="Our top services">
      <div className="services__head max-w-[760px] mx-auto mb-7 max-sm:mb-2 text-center flex flex-col items-center gap-4">
        <Reveal
          as="span"
          className="eyebrow center inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef8fa] shadow-[4px_4px_10px_rgba(20,84,120,0.1),-4px_-4px_10px_rgba(255,255,255,0.9)] text-[12px] sm:text-[13px] font-bold text-[#0b4db5] tracking-[0.12em] uppercase"
        >
          {eyebrow}
        </Reveal>
        <Reveal
          as="h2"
          className="h2 m-0 text-[clamp(28px,4vw,50px)] max-sm:text-[28px] font-extrabold leading-[1.12] tracking-[-0.02em] text-[#0e1b2e]"
        >
          {title}
        </Reveal>
        {lead && (
          <Reveal
            as="p"
            className="lead m-0 text-base sm:text-[17px] leading-[1.7] text-[#44546a]"
          >
            {lead}
          </Reveal>
        )}
        {showCta && (
          <Reveal>
            <Link
              href="/know-that-what-work-we-do"
              className="btn btn-neu inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-bold text-sm sm:text-[15px] text-[#0b4db5] bg-[#eaf6f8] shadow-[6px_6px_14px_rgba(20,84,120,0.14),-6px_-6px_14px_rgba(255,255,255,0.9)] hover:text-[#083a8a] transition-all"
            >
              <span>View all services</span> <span className="arr text-base">→</span>
            </Link>
          </Reveal>
        )}
      </div>

      <CoverflowCarousel />
    </section>
  );
}

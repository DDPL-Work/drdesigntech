'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

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

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const PrevArrowIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const NextArrowIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
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
    ? { cardW: Math.min(width * 0.72, 330), spread: 0.62 }
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
      className={`cf-card${isActive ? ' is-active' : ''}`}
      whileHover={isActive && !reduceMotion ? { y: -8 } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <div className="cf-card__media">
        <img src={item.image} alt="" draggable="false" loading="lazy" />
        {!item.bakedQuote && (
          <span className="cf-card__quote">
            “{item.quote}”
          </span>
        )}
      </div>

      <motion.div
        className="cf-card__icon"
        animate={reduceMotion ? undefined : { y: [0, -7, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <img src={item.icon} alt="" draggable="false" />
      </motion.div>

      <div className="cf-card__body">
        <h3 className="cf-card__title">{item.title}</h3>
        <p className="cf-card__desc">{item.description}</p>
        <div className="cf-card__actions">
          <Link
            className="cf-btn"
            href="/reach-to-us"
            tabIndex={tabIndex}
          >
            <span>Get a free plan</span> <ArrowIcon />
          </Link>
          <Link
            className="cf-link"
            href={item.href}
            tabIndex={tabIndex}
          >
            <span>Explore</span> <ArrowIcon />
          </Link>
        </div>
      </div>

      <motion.span
        className="cf-card__veil"
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
      className="cf"
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
        className={`cf__stage${isDragging ? ' is-dragging' : ''}`}
        style={{ '--cf-card-w': `${cardConfig.cardW}px` }}
        onPointerDownCapture={() => {
          hasDraggedRef.current = false;
        }}
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
      >
        <div className="cf__floor" aria-hidden="true" />
        {items.map((item, idx) => {
          const dist = RS(idx, activeIndex + dragOffset, total);
          const pos = SS(dist, cardConfig, total);
          const isActive = idx === normalizedActive && !isDragging;
          const isFar = Math.abs(dist) > 1.5;

          return (
            <motion.div
              key={item.id}
              className="cf__slide"
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
      <div className="cf__controls">
        <button
          type="button"
          className="cf__arrow"
          onClick={() => step(-1)}
          aria-label="Previous service"
        >
          <PrevArrowIcon />
        </button>

        <div className="cf__track">
          <span className="cf__hint">360° · drag or swipe to spin</span>
          <div className="cf__dots">
            {items.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className={`cf__dot${idx === normalizedActive ? ' is-on' : ''}`}
                onClick={() => goTo(idx)}
                aria-label={`Show ${item.title}`}
                aria-current={idx === normalizedActive}
              >
                {idx === normalizedActive && isAutoplaying && (
                  <motion.span
                    key={activeIndex}
                    className="cf__dot-fill"
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
          className="cf__arrow"
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
  title = <>Our <span className="hl">360°</span> digital strategy covers it all</>,
  lead = "Websites, apps, AI, ERP, search and geospatial — planned as one strategy for businesses across India. Drag, swipe or use the arrows to explore.",
  showCta = true
}) {
  return (
    <section className="sec services" aria-label="Our top services">
      <div className="services__head">
        <span className="eyebrow center">{eyebrow}</span>
        <h2 className="h2">{title}</h2>
        {lead && <p className="lead">{lead}</p>}
        {showCta && (
          <div>
            <Link href="/know-that-what-work-we-do" className="btn btn-neu">
              View all services <span className="arr">→</span>
            </Link>
          </div>
        )}
      </div>

      <CoverflowCarousel />
    </section>
  );
}

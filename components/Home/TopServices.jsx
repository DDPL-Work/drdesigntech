'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

const webBanner = '/assets/services/service-web.svg';
const appBanner = '/assets/services/service-app.svg';
const chatBanner = '/assets/services/service-chat.svg';
const erpBanner = '/assets/services/service-erp.svg';
const seoBanner = '/assets/services/service-seo.svg';
const socialBanner = '/assets/services/service-social.svg';
const geoBanner = '/assets/services/service-geo.svg';

const webIcon = '/assets/icons/web.svg';
const appIcon = '/assets/icons/app.svg';
const chatIcon = '/assets/icons/chat.svg';
const erpIcon = '/assets/icons/erp.svg';
const seoIcon = '/assets/icons/seo.svg';
const socialIcon = '/assets/icons/social.svg';
const geoIcon = '/assets/icons/geo.svg';

const servicesData = [
  {
    id: 'web',
    title: 'Website Development',
    quote: 'Our website looks outdated',
    label: '4 solutions',
    description:
      'Fast, modern, SEO-ready websites that explain your services clearly and turn visitors into enquiries. Dr. Design builds sites for businesses across India, tailored to your goals.',
    image: webBanner,
    icon: webIcon,
    href: '/our-services#web'
  },
  {
    id: 'app',
    title: 'Mobile App Development',
    quote: 'We need our own mobile app',
    label: '4 solutions',
    description:
      'Turn your idea into an Android and iOS app that makes life easier for your customers — built around your goals, your users and a secure admin panel.',
    image: appBanner,
    icon: appIcon,
    href: '/our-services#app'
  },
  {
    id: 'chat',
    title: 'AI Chatbot Development',
    quote: "We can't reply to every WhatsApp message",
    label: '4 solutions',
    description:
      'Help customers get answers, book appointments and reach your team 24/7. We build AI chatbots and call agents around your services and workflows.',
    image: chatBanner,
    icon: chatIcon,
    href: '/our-services#chat'
  },
  {
    id: 'erp',
    title: 'ERP Solutions',
    quote: 'Our operations run on spreadsheets',
    label: '4 solutions',
    description:
      'Bring your teams, data and daily workflows into one system. Custom ERP and CRM solutions tailored to how your business actually works.',
    image: erpBanner,
    icon: erpIcon,
    href: '/our-services#erp'
  },
  {
    id: 'seo',
    title: 'SEO & Google Ads',
    quote: "Customers can't find us on Google",
    label: '4 solutions',
    description:
      'Get found by people already searching for what you offer. SEO and Google Ads campaigns focused on enquiries and measurable results.',
    image: seoBanner,
    icon: seoIcon,
    href: '/our-services#seo'
  },
  {
    id: 'social',
    title: 'Social Media & Ads Management',
    quote: "Our social media isn't bringing customers",
    label: '4 solutions',
    description:
      'Content, reels and paid campaigns on Instagram, Facebook, LinkedIn and YouTube — planned, posted and managed for you, with ads that turn followers into enquiries.',
    image: socialBanner,
    icon: socialIcon,
    href: '/our-services#social'
  },
  {
    id: 'geo',
    title: 'Geospatial Solutions',
    quote: 'We need accurate maps and location data',
    label: '4 solutions',
    description:
      'GIS mapping, survey digitisation and location analytics that turn spatial data into clear decisions — backed by our government project experience.',
    image: geoBanner,
    icon: geoIcon,
    href: '/our-services#geo'
  }
];

function ArrowIcon() {
  return (
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
}

function PrevArrowIcon() {
  return (
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
}

function NextArrowIcon() {
  return (
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
}

// Circular continuous distance calculation matching zU from design
const zU = (t, e, n) => {
  let i = ((t - e) % n + n) % n;
  if (i >= n / 2) i -= n;
  return i;
};

// Responsive Coverflow configuration matching DU from design
const DU = (t) => {
  if (t < 560) {
    return {
      cardW: Math.min(t * 0.72, 330),
      spread: 0.62
    };
  }
  if (t < 900) {
    return {
      cardW: Math.min(t * 0.5, 420),
      spread: 0.75
    };
  }
  return {
    cardW: Math.min(t * 0.36, 470),
    spread: 0.8
  };
};

// 3D Cylinder Radius matching BU from design: (cardW / 2 / tan(π / total)) * 1.08
const BU = (t, e) => (t.cardW / 2 / Math.tan(Math.PI / e)) * 1.08;

// Exact 3D Coordinate Projection matching EU from design
const EU = (t, e, n) => {
  const i = BU(e, n);
  const r = (t * 2 * Math.PI) / n;
  const a = (r * 180) / Math.PI;
  const o = Math.cos(r);
  const s = Math.abs(a) <= 90 ? a : a - Math.sign(a) * 180;
  return {
    x: i * Math.sin(r),
    z: i * (o - 1),
    rotateY: s,
    y: (1 - o) * 18,
    scale: 1,
    opacity: o > 0 ? 1 : 0.35 + 0.65 * (1 + o),
    zIndex: Math.round(100 + o * 100)
  };
};

function CoverflowCarousel({ items = servicesData, autoplay = true, interval = 3800, ariaLabel = "Our services" }) {
  const total = items.length;
  const stageRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(1200);

  // Discrete index d (integer), drag offset fraction L, isDragging P, isHovered f
  const [d, setD] = useState(0);
  const [L, setL] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);

  const hasMovedRef = useRef(false);
  const pointerStartX = useRef(0);
  const pointerLastX = useRef(0);
  const pointerLastTime = useRef(0);
  const velocityPxRef = useRef(0);

  // ResizeObserver for dynamic width calculation
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Track tab visibility
  useEffect(() => {
    const handleVis = () => setIsTabHidden(document.hidden);
    document.addEventListener('visibilitychange', handleVis);
    return () => document.removeEventListener('visibilitychange', handleVis);
  }, []);

  const config = DU(containerWidth);
  const spreadPixels = config.cardW * config.spread;
  const activeIndex = ((d % total) + total) % total;

  // Step delta helper y
  const step = useCallback((delta) => {
    setD((prev) => prev + delta);
  }, []);

  // Direct index jump V: shortest circular route
  const goTo = useCallback(
    (target) => {
      setD((prev) => {
        const norm = ((prev % total) + total) % total;
        let diff = ((target - norm) % total + total) % total;
        if (diff > total / 2) diff -= total;
        return prev + diff;
      });
    },
    [total]
  );

  // Autoplay timer
  const canAutoplay = autoplay && !isHovered && !isDragging && !isTabHidden && total > 1;
  useEffect(() => {
    if (!canAutoplay) return;
    const timer = setTimeout(() => {
      step(1);
    }, interval);
    return () => clearTimeout(timer);
  }, [canAutoplay, d, interval, step]);

  // Pointer drag handling: 1:1 real-time drag and momentum release matching design
  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    hasMovedRef.current = false;
    pointerStartX.current = e.clientX;
    pointerLastX.current = e.clientX;
    pointerLastTime.current = performance.now();
    velocityPxRef.current = 0;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const now = performance.now();
    const dt = Math.max(now - pointerLastTime.current, 1);
    const instantVelocity = ((e.clientX - pointerLastX.current) / dt) * 1000;
    velocityPxRef.current = velocityPxRef.current * 0.6 + instantVelocity * 0.4;
    pointerLastX.current = e.clientX;
    pointerLastTime.current = now;

    const deltaX = e.clientX - pointerStartX.current;
    if (Math.abs(deltaX) > 6) {
      hasMovedRef.current = true;
    }
    setL(-deltaX / spreadPixels);
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    const deltaX = e.clientX - pointerStartX.current;
    const vX = velocityPxRef.current;
    const b = -(deltaX + vX * 0.25) / spreadPixels;
    let snapDelta = Math.round(b);
    if (snapDelta === 0 && Math.abs(deltaX) > spreadPixels * 0.18) {
      snapDelta = deltaX < 0 ? 1 : -1;
    }
    snapDelta = Math.max(-3, Math.min(3, snapDelta));

    setL(0);
    setIsDragging(false);
    if (snapDelta !== 0) {
      step(snapDelta);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      step(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      step(-1);
    }
  };

  return (
    <section
      className="cf relative w-full font-sans text-[#0e1b2e] outline-none select-none"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsHovered(true)}
      onBlurCapture={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
    >
      {/* 3D Coverflow Stage */}
      <div
        ref={stageRef}
        className={`cf__stage relative w-full [perspective:1500px] [perspective-origin:50%_30%] touch-pan-y select-none ${
          isDragging ? 'is-dragging cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          '--cf-card-w': `${config.cardW}px`,
          height: `${config.cardW * 0.6 + 300}px`
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Stage Floor Ambient Ellipse & Dashed Ring */}
        <div
          className="cf__floor absolute left-1/2 -translate-x-1/2 bottom-[60px] sm:bottom-[46px] w-[min(1100px,96%)] h-[70px] sm:h-[120px] rounded-[50%] pointer-events-none bg-[radial-gradient(closest-side,rgba(11,77,181,0.16),rgba(11,77,181,0.05)_60%,transparent_72%)] shadow-[inset_0_0_0_2px_rgba(11,77,181,0.1)] after:content-[''] after:absolute after:top-[18px] after:right-[12%] after:bottom-[18px] after:left-[12%] after:rounded-[50%] after:border-2 after:border-dashed after:border-[rgba(245,184,46,0.45)]"
          aria-hidden="true"
        />

        {items.map((item, idx) => {
          const b = zU(idx, d + L, total);
          const E = EU(b, config, total);
          const isActive = idx === activeIndex && !isDragging;
          const isFar = Math.abs(b) > 1.5;

          return (
            <div
              key={item.id}
              className="cf__slide absolute top-2 left-1/2 [transform-style:preserve-3d] will-change-[transform,opacity]"
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${total}: ${item.title}`}
              aria-hidden={idx !== activeIndex}
              style={{
                width: `${config.cardW}px`,
                marginLeft: `${-config.cardW / 2}px`,
                transform: `translate3d(${E.x.toFixed(2)}px, ${E.y.toFixed(2)}px, ${E.z.toFixed(2)}px) rotateY(${E.rotateY.toFixed(2)}deg)`,
                opacity: E.opacity,
                zIndex: E.zIndex,
                transition: isDragging
                  ? 'none'
                  : 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: isFar ? 'none' : 'auto'
              }}
              onClickCapture={(e) => {
                if (hasMovedRef.current) {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
                if (idx !== activeIndex) {
                  e.preventDefault();
                  e.stopPropagation();
                  goTo(idx);
                }
              }}
            >
              <article
                className={`cf-card group/card relative p-3 rounded-[28px] bg-[#eef8fa] shadow-[18px_22px_40px_rgba(20,84,120,0.16),-14px_-14px_30px_rgba(255,255,255,0.95)] overflow-visible transition-[box-shadow,transform] duration-300 ${
                  isActive
                    ? 'is-active hover:-translate-y-2 hover:shadow-[22px_30px_54px_rgba(20,84,120,0.22),-14px_-14px_30px_rgba(255,255,255,0.95)]'
                    : ''
                }`}
              >
                <div className="cf-card__media relative aspect-[16/9.6] rounded-[20px] overflow-hidden bg-[#cfe7ec] after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-[42%] after:bg-gradient-to-t after:from-[rgba(7,20,40,0.55)] after:to-transparent after:pointer-events-none">
                  <img
                    src={item.image}
                    alt=""
                    draggable="false"
                    loading="lazy"
                    className={`w-full h-full object-cover block scale-[1.02] transition-transform duration-900 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                      isActive ? 'group-hover/card:scale-[1.09]' : ''
                    }`}
                  />
                  <span className="cf-card__quote absolute top-3 left-3 z-[2] max-w-[calc(100%-24px)] px-3.5 py-[7px] rounded-full bg-[rgba(255,255,255,0.94)] text-[clamp(11px,1vw,14px)] font-semibold text-[#0e1b2e] whitespace-nowrap overflow-hidden text-ellipsis shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
                    “{item.quote}”
                  </span>
                  <span className="cf-card__label absolute left-4 bottom-3.5 z-[2] font-sans text-xs font-bold tracking-[0.14em] uppercase text-white">
                    {item.label}
                  </span>
                </div>

                <div
                  className="cf-card__icon absolute right-[26px] z-[3] w-[clamp(64px,17%,88px)] aspect-square rounded-full grid place-items-center bg-[#eef8fa] shadow-[8px_10px_20px_rgba(20,84,120,0.2),-6px_-6px_14px_rgba(255,255,255,0.95)]"
                  style={{
                    top: `${(config.cardW - 24) * 0.6 + 12 - 44}px`,
                    animation: 'cfIconFloat 4s ease-in-out infinite'
                  }}
                  aria-hidden="true"
                >
                  <img
                    src={item.icon}
                    alt=""
                    draggable="false"
                    className="w-[58%] h-[58%] object-contain pointer-events-none select-none"
                  />
                </div>

                <div className="cf-card__body px-3 pt-[22px] pb-2.5 flex flex-col gap-3">
                  <h3 className="cf-card__title m-0 pr-[70px] sm:pr-[84px] font-sans text-[clamp(19px,2vw,26px)] font-bold leading-[1.2] tracking-[-0.01em] text-[#0e1b2e]">
                    {item.title}
                  </h3>
                  <p className="cf-card__desc m-0 text-[clamp(14px,1.1vw,15.5px)] leading-[1.65] text-[#44546a] line-clamp-3 overflow-hidden">
                    {item.description}
                  </p>
                  <div className="cf-card__actions flex items-center justify-between gap-3 mt-1.5">
                    <Link
                      className="cf-btn group/cfbtn inline-flex items-center gap-2.5 min-h-[44px] sm:min-h-[48px] px-4 sm:px-[22px] rounded-full bg-[#0b4db5] text-white font-bold text-sm sm:text-[15px] no-underline whitespace-nowrap shadow-[0_14px_24px_-12px_rgba(11,77,181,0.85),inset_0_1px_rgba(255,255,255,0.25)] hover:bg-[#083a8a] hover:text-white hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#f5b82e] focus-visible:outline-offset-3 transition-[background-color,transform] duration-250 cursor-pointer"
                      href="/contact-with-us"
                      tabIndex={isActive ? 0 : -1}
                    >
                      <span>Get a free plan</span>
                      <span className="inline-block transition-transform duration-250 group-hover/cfbtn:translate-x-1">
                        <ArrowIcon />
                      </span>
                    </Link>
                    <Link
                      className="cf-link group/cflink inline-flex items-center gap-1.5 min-h-[44px] font-bold text-[15px] text-[#0b4db5] hover:text-[#083a8a] no-underline focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#f5b82e] focus-visible:outline-offset-3 transition-colors duration-250 cursor-pointer"
                      href={item.href}
                      tabIndex={isActive ? 0 : -1}
                    >
                      <span>Explore</span>
                      <span className="inline-block transition-transform duration-250 group-hover/cflink:translate-x-1">
                        <ArrowIcon />
                      </span>
                    </Link>
                  </div>
                </div>

                <span
                  className="cf-card__veil absolute inset-0 rounded-[28px] bg-[#eef8fa] pointer-events-none z-[4] transition-opacity duration-350"
                  style={{ opacity: Math.min(Math.abs(b) * 0.8, 1) * 0.42 }}
                  aria-hidden="true"
                />
              </article>
            </div>
          );
        })}
      </div>

      {/* Carousel Controls */}
      <div className="cf__controls flex items-center justify-center gap-[18px] mt-2">
        <button
          type="button"
          className="cf__arrow w-[54px] h-[54px] rounded-full border-0 grid place-items-center text-[#0b4db5] bg-[#eef8fa] cursor-pointer shadow-[6px_6px_14px_rgba(20,84,120,0.16),-6px_-6px_14px_rgba(255,255,255,0.95)] hover:scale-[1.07] active:shadow-[inset_4px_4px_8px_rgba(20,84,120,0.16),inset_-4px_-4px_8px_rgba(255,255,255,0.95)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#f5b82e] focus-visible:outline-offset-3 transition-[transform,box-shadow] duration-200"
          onClick={() => step(-1)}
          aria-label="Previous service"
        >
          <PrevArrowIcon />
        </button>

        <div className="cf__track flex items-center gap-3.5 px-5 py-3 rounded-full bg-[#e6f3f6] shadow-[inset_5px_5px_10px_rgba(20,84,120,0.16),inset_-5px_-5px_10px_rgba(255,255,255,0.95)]">
          <span className="cf__hint hidden sm:inline-block text-[13px] font-bold text-[#44546a] whitespace-nowrap">
            360° · drag or swipe to spin
          </span>
          <div className="cf__dots flex items-center gap-2">
            {items.map((item, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`cf__dot relative h-2.5 p-0 border-0 rounded-full cursor-pointer overflow-hidden transition-[width,background-color] duration-350 focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#f5b82e] focus-visible:outline-offset-3 ${
                    isCurrent ? 'is-on w-[38px] bg-[#a9c4ee]' : 'w-2.5 bg-[#b5d3da]'
                  }`}
                  onClick={() => goTo(idx)}
                  aria-label={`Show ${item.title}`}
                  aria-current={isCurrent}
                >
                  {isCurrent && canAutoplay && (
                    <span
                      key={d}
                      className="cf__dot-fill absolute inset-0 bg-[#0b4db5]"
                      style={{
                        animation: `cfDotFill ${interval}ms linear forwards`,
                        transformOrigin: 'left center'
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className="cf__arrow w-[54px] h-[54px] rounded-full border-0 grid place-items-center text-[#0b4db5] bg-[#eef8fa] cursor-pointer shadow-[6px_6px_14px_rgba(20,84,120,0.16),-6px_-6px_14px_rgba(255,255,255,0.95)] hover:scale-[1.07] active:shadow-[inset_4px_4px_8px_rgba(20,84,120,0.16),inset_-4px_-4px_8px_rgba(255,255,255,0.95)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#f5b82e] focus-visible:outline-offset-3 transition-[transform,box-shadow] duration-200"
          onClick={() => step(1)}
          aria-label="Next service"
        >
          <NextArrowIcon />
        </button>
      </div>

      <p className="cf__sr sr-only" aria-live="polite">
        {items[activeIndex]?.title}
      </p>
    </section>
  );
}

export default function TopServices() {
  return (
    <section className="sec services relative w-full max-w-[1400px] mx-auto px-4 py-7 sm:py-10 md:pb-[88px] overflow-hidden" aria-label="Our top services">
      <div className="services__head max-w-[760px] mx-auto mb-2 sm:mb-7 text-center flex flex-col items-center gap-4">
        <span className="eyebrow center self-center inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#eef8fa] shadow-[5px_5px_12px_rgba(20,84,120,0.13),-5px_-5px_12px_rgba(255,255,255,0.95)] text-[13px] font-bold text-[#0b4db5] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f5b82e] before:shadow-[0_0_0_4px_rgba(245,184,46,0.25)]">
          Our top services
        </span>
        <h2 className="h2 m-0 font-sans text-[clamp(30px,4vw,50px)] leading-[1.12] font-extrabold tracking-[-0.02em] text-[#0e1b2e]">
          Our <span className="hl text-[#0b4db5]">360°</span> digital strategy covers it all
        </h2>
        <p className="lead m-0 text-base sm:text-[17px] leading-[1.7] text-[#44546a]">
          Websites, apps, AI, ERP, search and geospatial — planned as one strategy
          for businesses across India. Drag, swipe or use the arrows to explore.
        </p>
        <div>
          <Link
            href="/our-services"
            className="btn btn-neu group inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 rounded-full font-bold text-[15px] no-underline cursor-pointer bg-[#eaf6f8] text-[#0e1b2e] shadow-[6px_6px_14px_rgba(20,84,120,0.14),-6px_-6px_14px_rgba(255,255,255,0.92)] hover:text-[#0b4db5] hover:-translate-y-0.5 hover:shadow-[8px_8px_18px_rgba(20,84,120,0.18),-8px_-8px_18px_rgba(255,255,255,0.96)] transition-all duration-200 border-0"
          >
            View all services <span className="arr inline-block transition-transform duration-250 group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <CoverflowCarousel />
    </section>
  );
}

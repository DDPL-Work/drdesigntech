'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { openWhatsApp } from '@/utils/whatsapp';

const logoImg = '/assets/logo.png';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/know-about-us-more', label: 'About' },
  { href: '/know-that-what-work-we-do', label: 'Services', isServices: true },
  { href: '/work-we-have-done', label: 'Our Work' },
  { href: '/know-answers-of-your-questions', label: 'FAQs' },
  { href: '/reach-to-us', label: 'Contact' }
];

const mobileNavLinks = [
  {
    href: '/',
    label: 'Home',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5L12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5h-4.5a1 1 0 0 1-1-1v-4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1H4.5A1.5 1.5 0 0 1 3 20v-9.5z" />
      </svg>
    )
  },
  {
    href: '/know-about-us-more',
    label: 'About',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="9.5" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    href: '/know-that-what-work-we-do',
    label: 'Services',
    isServices: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    )
  },
  {
    href: '/work-we-have-done',
    label: 'Our Work',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    )
  },
  {
    href: '/know-answers-of-your-questions',
    label: 'FAQs',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    )
  },
  {
    href: '/get-your-audit',
    label: 'Website Audit',
    badge: 'Free',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <path d="m8 11 2 2 4-4" />
      </svg>
    )
  },
  {
    href: '/reach-to-us',
    label: 'Contact',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    )
  }
];

const servicesData = [
  {
    id: 'web',
    title: 'Website Development',
    sub: 'Fast, SEO-ready business websites',
    icon: '/assets/icons/web.svg',
    href: '/know-that-what-work-we-do#web'
  },
  {
    id: 'app',
    title: 'Mobile App Development',
    sub: 'Android & iOS apps with admin panel',
    icon: '/assets/icons/app.svg',
    href: '/know-that-what-work-we-do#app'
  },
  {
    id: 'chat',
    title: 'AI Chatbots & Agents',
    sub: 'AI chatbots for WhatsApp & web',
    icon: '/assets/icons/chat.svg',
    href: '/know-that-what-work-we-do#chat'
  },
  {
    id: 'erp',
    title: 'ERP & CRM Software',
    sub: 'ERP & CRM built around your workflow',
    icon: '/assets/icons/erp.svg',
    href: '/know-that-what-work-we-do#erp'
  },
  {
    id: 'seo',
    title: 'SEO & Google Ads',
    sub: 'Rank on Google & run search ads',
    icon: '/assets/icons/seo.svg',
    href: '/know-that-what-work-we-do#seo'
  },
  {
    id: 'social',
    title: 'Social Media Management',
    sub: 'Instagram, Meta & LinkedIn growth',
    icon: '/assets/icons/social.svg',
    href: '/know-that-what-work-we-do#social'
  },
  {
    id: 'geo',
    title: 'GIS & Remote Sensing',
    sub: 'GIS mapping & survey digitisation',
    icon: '/assets/icons/geo.svg',
    href: '/know-that-what-work-we-do#geo'
  }
];

export function Brand({ dark = false }) {
  return (
    <Link href="/" className="brand">
      <span className="brand__logo">
        <img src={logoImg} alt="Dr. Design Pvt. Ltd. logo" />
      </span>
      <span className="brand__name">
        <b style={dark ? { color: '#fff' } : undefined}>DR. DESIGN</b>
        <small style={dark ? { color: '#F5B82E' } : undefined}>TECHNOLOGY</small>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const leaveTimerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1020);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('dd-nav-toggle', { detail: { open: menuOpen } }));
      if (menuOpen) {
        document.body.classList.add('nav-open');
      } else {
        document.body.classList.remove('nav-open');
      }
    }
  }, [menuOpen]);

  useEffect(() => {
    return () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('nav-open');
      }
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
    setHoveredHref(null);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const openMega = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setServicesOpen(true);
  };

  const closeMega = () => {
    leaveTimerRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 160);
  };

  const handleOpenLead = () => {
    window.dispatchEvent(new CustomEvent('open-lead', { detail: 'quote' }));
  };

  // Determine active route & active indicator target
  const activeLink = navLinks.find(
    (link) => pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
  );
  const currentPill = hoveredHref ?? activeLink?.href;

  return (
    <>
      {/* Top Notification Bar */}
      <div className="topbar">
        <div className="wrap">
          <span className="topbar__l">
            <span className="live" />
            <span>
              Support desk open <b>10 AM – 6 PM IST</b> · Mon–Sat
            </span>
            <span className="topbar__sep" aria-hidden="true" />
            <span className="topbar__loc">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Dehradun · Delhi
            </span>
          </span>

          <span className="topbar__r">
            <Link href="/get-your-audit" className="topbar__audit">
              <span className="topbar__badge">Free</span>
              Website audit →
            </Link>
            <a href="tel:+917217052558">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
              </svg>
              +91 7217052558
            </a>
            <a href="mailto:contact@drdesigntech.com">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              contact@drdesigntech.com
            </a>
            <span className="topbar__soc">
              <a
                href="https://www.instagram.com/drdesigntechnology/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dr. Design on Instagram"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/drdesignpvtltd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dr. Design on LinkedIn"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M8 10.5V17M8 7.2v.1M12 17v-6.5M12 13.2a2.7 2.7 0 0 1 5 0V17" />
                </svg>
              </a>
            </span>
          </span>
        </div>
      </div>

      {/* Main Glassmorphic Header */}
      <header className={`header${isScrolled ? ' is-scrolled' : ''}`}>
        <div className="wrap">
          <div className="header__bar neu">
            <Brand />

            {/* Desktop Navigation Links with Spring Hover Glider */}
            <nav
              className="nav"
              aria-label="Main"
              onMouseLeave={() => setHoveredHref(null)}
            >
              {navLinks.map((item) => {
                const isCurrent =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));
                const showPill = currentPill === item.href;

                return (
                  <div
                    key={item.href}
                    className="nav__item"
                    onMouseEnter={() => {
                      setHoveredHref(item.href);
                      if (item.isServices) openMega();
                    }}
                    onMouseLeave={() => {
                      if (item.isServices) closeMega();
                    }}
                  >
                    <Link
                      href={item.href}
                      className={isCurrent ? 'on' : undefined}
                      aria-current={isCurrent ? 'page' : undefined}
                      aria-haspopup={item.isServices ? 'menu' : undefined}
                      aria-expanded={item.isServices ? servicesOpen : undefined}
                      onFocus={() => {
                        setHoveredHref(item.href);
                        if (item.isServices) openMega();
                      }}
                    >
                      {showPill && (
                        <motion.span
                          layoutId="navpill"
                          className="nav__pill"
                          transition={{
                            type: 'spring',
                            stiffness: 420,
                            damping: 34
                          }}
                        />
                      )}
                      <span className="nav__txt">{item.label}</span>
                      {item.isServices && (
                        <motion.span
                          className="nav__chev"
                          animate={{ rotate: servicesOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </motion.span>
                      )}
                    </Link>

                    {/* Mega Menu Dropdown */}
                    {item.isServices && (
                      <AnimatePresence>
                        {servicesOpen && (
                          <div
                            className="mega__wrap"
                            onMouseEnter={openMega}
                            onMouseLeave={closeMega}
                          >
                            <motion.div
                              className="mega neu"
                              role="menu"
                              initial={{ opacity: 0, y: 14, rotateX: -8, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.98 }}
                              transition={{
                                type: 'spring',
                                stiffness: 320,
                                damping: 26
                              }}
                            >
                              <div className="mega__grid">
                                {servicesData.map((svc, sIdx) => (
                                  <motion.div
                                    key={svc.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.03 * sIdx }}
                                  >
                                    <Link
                                      href={svc.href}
                                      role="menuitem"
                                      className="mega__item"
                                      onClick={() => setServicesOpen(false)}
                                    >
                                      <span className="mega__ic">
                                        <img src={svc.icon} alt="" />
                                      </span>
                                      <span>
                                        <b>{svc.title}</b>
                                        <small>{svc.sub}</small>
                                      </span>
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>

                              <Link
                                href="/get-your-audit"
                                className="mega__cta !rounded-[20px] !text-left !items-start !w-full !max-w-[250px] !aspect-auto"
                                onClick={() => setServicesOpen(false)}
                              >
                                <span className="mega__cta-ic">
                                  <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                  >
                                    <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
                                    <path d="M7 12h10" />
                                  </svg>
                                </span>
                                <b>Free website audit</b>
                                <small>
                                  Scan any site for speed, SEO and issues — report in 60 seconds.
                                </small>
                                <span className="mega__cta-go">Run free audit →</span>
                              </Link>
                            </motion.div>
                          </div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="header__actions">
              {!(isMobile && menuOpen) && (
                <button
                  type="button"
                  className="btn btn-blue shine hcta"
                  onClick={handleOpenLead}
                >
                  <span>Get a free proposal</span>
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
                </button>
              )}

              <button
                type="button"
                className="round neu-s menu-btn"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  {menuOpen ? (
                    <path d="M6 6l12 12M18 6L6 18" />
                  ) : (
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Drawer Navigation */}
          <AnimatePresence>
            {menuOpen && (
              <>
                <motion.div
                  className="mnav__scrim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMenuOpen(false)}
                  aria-hidden="true"
                />
                <motion.nav
                  className="mnav neu"
                  aria-label="Mobile"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {mobileNavLinks.map((item, v) => {
                    const isCurrent =
                      pathname === item.href ||
                      (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * v }}
                      >
                        <Link
                          href={item.href}
                          className={isCurrent ? 'on' : undefined}
                          aria-current={isCurrent ? 'page' : undefined}
                          onClick={() => setMenuOpen(false)}
                        >
                          <span className="flex items-center gap-3 w-full">
                            <span className="mnav__tab-ic" aria-hidden="true">
                              {item.icon}
                            </span>
                            <span className="mnav__tab-label">{item.label}</span>
                            {item.badge && (
                              <span className="topbar__badge text-[10.5px]">
                                {item.badge}
                              </span>
                            )}
                            {isCurrent && <span className="mnav__tab-dot" aria-hidden="true" />}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Mobile Services Grid */}
                  <div className="mnav__svc">
                    {servicesData.map((svc, idx) => {
                      const isLast = idx === servicesData.length - 1;
                      return (
                        <Link
                          key={svc.id}
                          href={svc.href}
                          onClick={() => setMenuOpen(false)}
                          className={isLast ? 'col-span-2 mnav__svc--full' : undefined}
                          style={isLast ? { gridColumn: '1 / -1' } : undefined}
                        >
                          <img src={svc.icon} alt="" />
                          <span>{svc.title.replace(' Development', '').replace(' Management', '')}</span>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Mobile Quick Action Buttons */}
                  <div className="mnav__row">
                    <a href="tel:+917217052558" className="btn btn-neu">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
                      </svg>
                      Call
                    </a>
                    <a
                      href="https://wa.me/917217052558?text=Hi%20Dr.%20Design%2C%20I%20would%20like%20to%20discuss%20a%20project."
                      className="btn btn-neu"
                      style={{ color: '#1E7A43' }}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        setMenuOpen(false);
                        openWhatsApp("917217052558", "Hi Dr. Design, I would like to discuss a project.", e);
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.4L3 21z" />
                        <path d="M9 9.5c.3 1.8 1.7 3.6 3.6 4.6l1.3-1.1 2 .9c-.2 1-1.1 1.6-2.1 1.6-3 0-6.4-3.4-6.4-6.4 0-1 .6-1.9 1.6-2.1l.9 2-1 1z" />
                      </svg>
                      WhatsApp
                    </a>
                  </div>

                  <button
                    type="button"
                    className="btn btn-blue"
                    style={{ marginTop: 8, color: '#fff' }}
                    onClick={() => {
                      setMenuOpen(false);
                      handleOpenLead();
                    }}
                  >
                    Get a free proposal
                  </button> 

                  {/* Mobile Socials */}
                  <div className="mnav__soc">
                    <a
                      href="https://www.instagram.com/drdesigntechnology/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mnav__soc-btn"
                      aria-label="Instagram"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/drdesignpvtltd/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mnav__soc-btn"
                      aria-label="LinkedIn"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="3" />
                        <path d="M8 10.5V17M8 7.2v.1M12 17v-6.5M12 13.2a2.7 2.7 0 0 1 5 0V17" />
                      </svg>
                    </a>
                  </div>
                </motion.nav>
              </>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}

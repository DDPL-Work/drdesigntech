'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import { openLeadModal } from '../../utils/events';

const webIcon = '/assets/icons/web.svg';
const erpIcon = '/assets/icons/erp.svg';
const appIcon = '/assets/icons/app.svg';
const seoIcon = '/assets/icons/seo.svg';
const geoIcon = '/assets/icons/geo.svg';
const askIcon = '/assets/icons/ask.svg';
const socialIcon = '/assets/icons/social.svg';
const adsIcon = '/assets/icons/ads.svg';

const icons = {
  web: webIcon,
  erp: erpIcon,
  app: appIcon,
  seo: seoIcon,
  geo: geoIcon,
  ask: askIcon,
  social: socialIcon,
  ads: adsIcon,
};

const heroChips = [
  ['web', 'Our website looks outdated', '/reach-to-us?service=web#contact'],
  ['erp', 'Operations run on spreadsheets', '/reach-to-us?service=erp#contact'],
  ['app', 'We need our own app', '/reach-to-us?service=app#contact'],
  ['seo', "Customers can't find us online", '/reach-to-us?service=seo#contact'],
  ['geo', 'We need maps & GIS data', '/reach-to-us?service=geo#contact'],
  ['ask', 'Not sure yet? Help me choose', '/reach-to-us?service=ask#contact'],
];

const PM = [
  { r: 0, c: '#1a5fd0' },
  { r: 30, c: '#5bb8c2' },
  { r: 60, c: '#9adce4' },
  { r: 90, c: '#1a5fd0' },
  { r: 120, c: '#5bb8c2' },
  { r: 150, c: '#9adce4' },
];

const SM = [
  { a: 0, c: 'gb-sun' },
  { a: 120, c: 'gb-teal' },
  { a: 240, c: 'gb-blue' },
];

const orbitPills = [
  { label: 'SEO', sym: 'seo', x: 50, y: 4 },
  { label: 'Social Media', sym: 'social', x: 86, y: 21.3 },
  { label: 'Mobile Apps', sym: 'app', x: 94.8, y: 60.2 },
  { label: 'ERP & CRM', sym: 'erp', x: 70, y: 91.4 },
  { label: 'GIS Mapping', sym: 'geo', x: 30, y: 91.4 },
  { label: 'Ads Management', sym: 'ads', x: 5.2, y: 60.2 },
  { label: 'Web Development', sym: 'web', x: 14, y: 21.3 },
];

const capabilities = [
  'Web Design',
  'Mobile Apps',
  'ERP Solutions',
  'CRM Systems',
  'Digital Transformation',
  'Geospatial & GIS',
  'SEO & Google Ads',
  'Social Media & Ads',
  'UI/UX Design',
];

function GlobeVisual() {
  const containerRef = useRef(null);
  const dashedRingRef = useRef(null);
  const stageSphereRef = useRef(null);
  const coreMapRef = useRef(null);
  const orbitLayerRef = useRef(null);
  const orbitPillRefs = useRef([]);

  const rotYRef = useRef(20);
  const rotXRef = useRef(14);
  const velYRef = useRef(0);
  const dragRef = useRef(null);

  useEffect(() => {
    let animId;

    const onFrame = () => {
      if (!dragRef.current) {
        velYRef.current *= 0.94;
        rotYRef.current += velYRef.current + 0.25;
        rotXRef.current += (14 - rotXRef.current) * 0.03;
      }

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollProgress = window.scrollY / maxScroll;
      const totalRotY = rotYRef.current + scrollProgress * 1080;
      const rotOrbit = totalRotY * 0.5;
      const rotOrbitRev = -rotOrbit;
      const rotDashedRing = totalRotY * 0.25;

      if (dashedRingRef.current) {
        dashedRingRef.current.style.transform = `rotate(${rotDashedRing}deg)`;
      }
      if (coreMapRef.current) {
        const mapOffset = -50 + ((((totalRotY % 360) + 360) % 360) / 360) * 50;
        coreMapRef.current.style.transform = `translateX(${mapOffset}%)`;
      }
      if (stageSphereRef.current) {
        stageSphereRef.current.style.transform = `rotateX(${rotXRef.current}deg) rotateY(${totalRotY}deg)`;
      }
      if (orbitLayerRef.current) {
        orbitLayerRef.current.style.transform = `rotate(${rotOrbit}deg)`;
      }
      orbitPillRefs.current.forEach((el) => {
        if (el) {
          el.style.transform = `rotate(${rotOrbitRev}deg)`;
        }
      });

      animId = requestAnimationFrame(onFrame);
    };

    animId = requestAnimationFrame(onFrame);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handlePointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (e.currentTarget.setPointerCapture) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // ignore if not supported
      }
    }
    dragRef.current = {
      x: e.clientX,
      y: e.clientY,
      lx: e.clientX,
      b: rotXRef.current,
    };
    velYRef.current = 0;
  };

  const handlePointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = e.clientX - drag.lx;
    drag.lx = e.clientX;
    velYRef.current = dx * 0.5;
    rotYRef.current += dx * 0.5;
    rotXRef.current = Math.max(-35, Math.min(45, drag.b - (e.clientY - drag.y) * 0.25));
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="hg"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role="img"
      aria-label="Dr. Design 3D globe — drag to rotate"
    >
      <div className="hg__disc neu" style={{ inset: 0 }} />

      <div ref={dashedRingRef} style={{ position: 'absolute', inset: '4%' }}>
        <svg className="spin60" viewBox="0 0 200 200" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
          <circle cx="100" cy="100" r="88" fill="none" stroke="#9BB9C1" strokeWidth="5" strokeDasharray="0.6 4.007" />
          <circle cx="100" cy="100" r="88" fill="none" stroke="#7E9CA6" strokeWidth="9" strokeDasharray="1.2 45.87" />
          <circle cx="100" cy="12" r="4" fill="#2A8693" />
        </svg>
      </div>

      <div className="hg__disc neu" style={{ inset: '15%' }} />
      <div className="hg__disc neu-in" style={{ inset: '18%' }} />

      <div
        className="shad"
        style={{
          position: 'absolute',
          left: '31%',
          right: '31%',
          bottom: '17%',
          height: '5%',
          borderRadius: '50%',
          background: '#6E97A4',
          filter: 'blur(10px)',
        }}
      />

      <div className="hg__stage" aria-hidden="true">
        <div className="p3 float">
          <div className="core">
            <div
              ref={coreMapRef}
              className="core__map"
              style={{ backgroundImage: 'url("/assets/icons/world-map.svg")' }}
            />
            <div className="core__shade" />
          </div>
          <div ref={stageSphereRef} className="p3">
            <div className="p3" style={{ animation: 'spinY 22s linear infinite' }}>
              {PM.map((m) => (
                <div key={m.r} className="mer" style={{ transform: `rotateY(${m.r}deg)`, borderColor: m.c }} />
              ))}
              <div className="mer" style={{ inset: '3.35cqw', transform: 'rotateX(90deg) translateZ(12.5cqw)', borderColor: '#5bb8c2' }} />
              <div className="mer" style={{ inset: '3.35cqw', transform: 'rotateX(90deg) translateZ(-12.5cqw)', borderColor: '#5bb8c2' }} />
              <div className="mer" style={{ inset: '-3cqw', transform: 'rotateX(90deg)', borderColor: '#f5b82e', borderWidth: '1.5cqw' }} />
              <div className="rod" />
              <div className="rod" style={{ transform: 'rotateY(90deg)' }} />
              {SM.map((m) => (
                <div key={m.a} className="bwrap" style={{ transform: `rotateY(${m.a}deg) translateZ(28cqw)` }}>
                  {[0, 60, 120].map((A) => (
                    <div key={A} className={`ball ${m.c}`} style={{ transform: `rotateY(${A}deg)` }} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <span className="hg__hint neu-s">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
          <path d="M3 3v5h5" />
        </svg>
        Drag to rotate 360°
      </span>

      <div ref={orbitLayerRef} style={{ position: 'absolute', inset: 0, zIndex: 5 }}>
        <div className="spin40" style={{ position: 'absolute', inset: 0 }}>
          <span className="gball gb-teal" style={{ left: '8%', top: '62%', width: 18, height: 18 }} />
          <span className="gball gb-sun" style={{ left: '62%', top: '86%', width: 14, height: 14 }} />
          {orbitPills.map((m, idx) => (
            <div key={m.label} className="orbit-pos" style={{ left: `${m.x}%`, top: `${m.y}%` }}>
              <div ref={(el) => (orbitPillRefs.current[idx] = el)}>
                <div className="spinr40">
                  <span className="pill neu-s">
                    <span className="ci">
                      <img src={icons[m.sym]} alt="" width={20} height={20} className="w-5 h-5 object-contain pointer-events-none" />
                    </span>
                    {m.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CapabilitiesMarquee() {
  return (
    <div className="w-full overflow-hidden">
      <div className="marquee" aria-label="Our capabilities">
        <div className="marquee__track">
          {[...capabilities, ...capabilities, ...capabilities, ...capabilities].map((item, idx) => (
            <span key={idx} className="marquee__item" aria-hidden={idx >= capabilities.length}>
              {item}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#F5B82E" aria-hidden="true">
                <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const LandingHero = () => {
  return (
    <>
      <section id="top" className="hero relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 max-sm:px-[18px] flex flex-wrap items-center gap-10 max-sm:gap-6 pt-12 max-sm:pt-6 pb-20 max-sm:pb-10">
          {/* Left Copy */}
          <div className="flex-1 basis-[520px] min-w-0 flex flex-col gap-6 order-2 md:order-1">
            <Reveal
              as="h1"
              delay={0}
              className="eyebrow hero__kicker inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#eef8fa] shadow-[5px_5px_12px_rgba(20,84,120,0.13),-5px_-5px_12px_rgba(255,255,255,0.95)] text-[13px] font-bold text-[#0b4db5] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f5b82e] before:shadow-[0_0_0_4px_rgba(245,184,46,0.25)]"
            >
              Website, App &amp; Digital Marketing Company in Dehradun, India
            </Reveal>

            <Reveal
              as="p"
              delay={0.1}
              className="m-0 font-extrabold text-[clamp(36px,4.8vw,62px)] max-sm:text-[36px] leading-[1.06] tracking-[-0.025em] text-[#0e1b2e]"
            >
              Build smarter. Scale faster.{' '}
              <span className="relative whitespace-nowrap text-[#0b4db5]">
                Succeed digitally.
                <svg
                  viewBox="0 0 300 18"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="absolute left-0 -bottom-2.5 w-full h-3.5 pointer-events-none"
                >
                  <path
                    d="M4 12 C80 2, 200 2, 296 10"
                    fill="none"
                    stroke="#F5B82E"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="320"
                    strokeDashoffset="320"
                    style={{ animation: 'draw 1.2s .9s ease forwards' }}
                  />
                </svg>
              </span>
            </Reveal>

            <Reveal
              as="p"
              delay={0.2}
              className="text-[18px] max-w-[600px] text-[#3b4b60] leading-[1.75] m-0"
            >
              We design high-converting websites, build mobile apps, ERP systems and AI chatbots, and run SEO and paid ads that bring in real enquiries — for startups, SMEs and government bodies across India and abroad.{' '}
              <b className="whitespace-nowrap">6+ years</b>,{' '}
              <b className="whitespace-nowrap">300+ projects</b> delivered.
            </Reveal>

            <Reveal delay={0.3} className="flex flex-col gap-3.5">
              <span className="text-[13px] font-bold text-[#5b6b80] uppercase tracking-wider">
                What&apos;s holding your business back?
              </span>
              <div className="chips">
                {heroChips.map(([iconName, text, href]) => (
                  <Link key={text} href={href} className="chip neu-s group">
                    <span className="ci">
                      <img
                        src={icons[iconName]}
                        alt=""
                        width={22}
                        height={22}
                        className="w-[22px] h-[22px] object-contain pointer-events-none"
                      />
                    </span>
                    <span className="chip__t">{text}</span>
                    <span className="chip__go" aria-hidden="true">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.4} className="flex flex-wrap items-center gap-3.5 max-sm:w-full">
              <button
                type="button"
                className="btn btn-glow btn-pulse max-sm:w-full"
                onClick={() => openLeadModal('quote')}
              >
                <span>Book a free strategy call</span>
                <span className="arr" aria-hidden="true">→</span>
              </button>
              <Link href="/know-that-what-work-we-do" className="btn btn-neu max-sm:w-full">
                Our services
              </Link>
            </Reveal>

            <Reveal delay={0.5} className="trust flex flex-wrap items-center gap-4 text-[13.5px] text-[#5b6b80]">
              <span>
                <b className="font-bold text-[#0e1b2e]">6+ years</b> in software engineering
              </span>
              <span>
                <b className="font-bold text-[#0e1b2e]">300+ projects</b> completed
              </span>
              <span>
                <b className="font-bold text-[#f5b82e]">★★★★★</b> Google reviews
              </span>
            </Reveal>
          </div>

          {/* Right Visual (Top on mobile, right on desktop) */}
          <motion.div
            className="flex-1 basis-[440px] min-w-0 flex justify-center py-5 max-sm:py-2 order-1 md:order-2"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <GlobeVisual />
          </motion.div>
        </div>
      </section>

      {/* Capabilities Marquee */}
      <CapabilitiesMarquee />
    </>
  );
};

export default LandingHero;

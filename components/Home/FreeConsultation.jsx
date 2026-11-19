'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import { openWhatsApp } from '@/utils/whatsapp';

const webIcon = '/assets/icons/web.svg';
const appIcon = '/assets/icons/app.svg';
const erpIcon = '/assets/icons/erp.svg';
const seoIcon = '/assets/icons/seo.svg';
const socialIcon = '/assets/icons/social.svg';
const chatIcon = '/assets/icons/chat.svg';
const geoIcon = '/assets/icons/geo.svg';
const askIcon = '/assets/icons/ask.svg';
const chartIcon = '/assets/icons/chart.svg';

const needsOptions = [
  { label: 'Web Development', icon: webIcon },
  { label: 'Mobile Apps', icon: appIcon },
  { label: 'ERP / CRM', icon: erpIcon },
  { label: 'SEO & Ads', icon: seoIcon },
  { label: 'Social Media & Ads', icon: socialIcon },
  { label: 'AI Chatbots', icon: chatIcon },
  { label: 'Geospatial / GIS', icon: geoIcon },
  { label: 'Not sure yet', icon: askIcon }
];

const serviceMap = {
  web: 'Web Development',
  website: 'Web Development',
  'web-development': 'Web Development',
  app: 'Mobile Apps',
  mobile: 'Mobile Apps',
  'mobile-apps': 'Mobile Apps',
  erp: 'ERP / CRM',
  crm: 'ERP / CRM',
  'erp-crm': 'ERP / CRM',
  seo: 'SEO & Ads',
  ads: 'SEO & Ads',
  'seo-ads': 'SEO & Ads',
  social: 'Social Media & Ads',
  'social-media': 'Social Media & Ads',
  chat: 'AI Chatbots',
  chatbot: 'AI Chatbots',
  'ai-chatbots': 'AI Chatbots',
  geo: 'Geospatial / GIS',
  gis: 'Geospatial / GIS',
  'geospatial-gis': 'Geospatial / GIS',
  ask: 'Not sure yet',
  notsure: 'Not sure yet',
  'not-sure-yet': 'Not sure yet'
};

const checklistItems = ['30-min strategy call', 'In-depth audit', 'Growth roadmap'];

const WHATSAPP_BASE = 'https://wa.me/917217052558';
const PHONE_NUMBER = '+91 7217052558';
const PHONE_HREF = 'tel:+917217052558';

// Growth Dashboard Constants (1:1 with Design)
const Bp = [
  [0, 78],
  [1, 70],
  [2, 72],
  [3, 52],
  [4, 40],
  [5, 18]
];
const chartWidth = 300;
const chartHeight = 120;
const getX = (t) => 10 + t * ((chartWidth - 20) / 5);

const linePath = Bp.map(([t, e], idx) => `${idx ? 'L' : 'M'}${getX(t)} ${e}`).join(' ');
const areaPath = `${linePath} L${getX(5)} ${chartHeight} L${getX(0)} ${chartHeight} Z`;

const kpiData = [
  { title: 'Leads', icon: seoIcon, color: '#5BC4D0', spark: 'M0 18 L8 14 L16 15 L24 8 L32 4' },
  { title: 'Enquiries', icon: chatIcon, color: '#F5B82E', spark: 'M0 16 L8 16 L16 10 L24 11 L32 3' },
  { title: 'Traffic', icon: chartIcon, color: '#7AA9FF', spark: 'M0 18 L8 12 L16 13 L24 6 L32 5' }
];

const easeCurve = [0.16, 1, 0.3, 1];

function GrowthDashboard() {
  return (
    <div className="gd neu">
      {/* Dark Glossy Terminal Screen */}
      <div className="gd__screen">
        {/* Header */}
        <div className="gd__head">
          <span className="ph">Your growth dashboard</span>
          <span className="gd__live">
            <span className="live" />
            Live
          </span>
        </div>

        {/* 3 KPI Cards with Staggered Entrance Animations */}
        <div className="gd__kpis">
          {kpiData.map((kpi, idx) => (
            <motion.div
              key={kpi.title}
              className="gd__kpi"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.12, duration: 0.6, ease: easeCurve }}
            >
              <span className="gd__kpi-ic">
                <img src={kpi.icon} alt="" width={18} height={18} loading="lazy" decoding="async" className="select-none" draggable="false" />
              </span>
              <span className="gd__kpi-t">
                <span>{kpi.title}</span>
                <b style={{ color: kpi.color, marginLeft: 2 }}>↑</b>
              </span>
              <svg viewBox="0 0 32 20" className="gd__spark" aria-hidden="true">
                <motion.path
                  d={kpi.spark}
                  fill="none"
                  stroke={kpi.color}
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + idx * 0.12, duration: 1.2, ease: easeCurve }}
                />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Chart Visualization with Staggered Drawing Animations */}
        <div className="gd__chart">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight + 18}`}
            preserveAspectRatio="none"
            className="w-full h-full block overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="gdArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#5BC4D0" stopOpacity="0.45" />
                <stop offset="1" stopColor="#5BC4D0" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="gdLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#5BC4D0" />
                <stop offset="1" stopColor="#F5B82E" />
              </linearGradient>
            </defs>

            {/* Horizontal Gridlines */}
            {[30, 60, 90].map((y) => (
              <line key={y} x1="0" x2={chartWidth} y1={y} y2={y} stroke="#ffffff" strokeOpacity="0.07" />
            ))}

            {/* Month Vertical Volume Bars animating scaleY from bottom */}
            {Bp.map(([t, e]) => (
              <motion.rect
                key={t}
                x={getX(t) - 9}
                width="18"
                rx="4"
                y={e}
                height={chartHeight - e}
                fill={t === 5 ? '#F5B82E' : t >= 3 ? '#1A5FD0' : '#2A4466'}
                fillOpacity={t === 5 ? 0.35 : 0.45}
                style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + t * 0.08, duration: 0.9, ease: easeCurve }}
              />
            ))}

            {/* Area Fill fade in */}
            <motion.path
              d={areaPath}
              fill="url(#gdArea)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.8 }}
            />

            {/* Growth Line stroke drawing */}
            <motion.path
              d={linePath}
              fill="none"
              stroke="url(#gdLine)"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1.6, ease: easeCurve }}
            />

            {/* Data Dots */}
            {Bp.map(([t, e]) => (
              <circle key={t} cx={getX(t)} cy={e} r="3" fill="#0E1B2E" stroke="#5BC4D0" strokeWidth="2" />
            ))}

            {/* Month 6 Peak Active Indicator Dot with Ping */}
            <circle cx={getX(5)} cy={18} r="5" fill="#F5B82E" />
            <circle
              className="gd__ping"
              cx={getX(5)}
              cy={18}
              r="5"
              fill="none"
              stroke="#F5B82E"
              strokeWidth="2"
            />

            {/* Labels */}
            <text x="10" y={chartHeight + 15} fill="#9FB2C8" fontSize="10" fontFamily="'Plus Jakarta Sans', sans-serif">
              Month 1
            </text>
            <text
              x={chartWidth - 10}
              y={chartHeight + 15}
              fill="#9FB2C8"
              fontSize="10"
              textAnchor="end"
              fontFamily="'Plus Jakarta Sans', sans-serif"
            >
              Month 6
            </text>
          </svg>

          {/* Floating Pill Tip with spring scale-in */}
          <motion.span
            className="gd__tip"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2.1, type: 'spring', stiffness: 260, damping: 16 }}
          >
            <img src={chartIcon} alt="" width={16} height={16} loading="lazy" decoding="async" />
            Growing every month
          </motion.span>
        </div>
      </div>

      {/* Floating Badge A: SLA Guarantee (Bottom-Left) */}
      <div className="gd__float gd__float--a neu-s floatb">
        <img src={chatIcon} alt="" width={30} height={30} loading="lazy" decoding="async" />
        Reply within one business day
      </div>

      {/* Floating Badge B: Team Availability (Top-Right) */}
      <div className="gd__float gd__float--b neu-s float">
        <span className="gd__avatars">
          <i style={{ background: '#0B4DB5' }}>D</i>
          <i style={{ background: '#2A8693' }}>D</i>
          <i style={{ background: '#F5B82E', color: '#0E1B2E' }}>T</i>
        </span>
        <span>
          <b>Talk to an expert</b>
          <small>Mon–Sat · 10 AM–6 PM</small>
        </span>
      </div>
    </div>
  );
}

export default function FreeConsultation() {
  const [selectedNeed, setSelectedNeed] = useState('Web Development');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleUrlParams = () => {
      if (typeof window === 'undefined') return;

      const searchParams = new URLSearchParams(window.location.search);
      const serviceParam = searchParams.get('service') || searchParams.get('need');
      const hashParam = window.location.hash.replace('#', '').toLowerCase();

      const targetKey = (serviceParam || hashParam || '').toLowerCase();

      if (targetKey && serviceMap[targetKey]) {
        setSelectedNeed(serviceMap[targetKey]);
      }

      if ((targetKey && serviceMap[targetKey]) || hashParam === 'contact' || hashParam === 'consultation-form') {
        const scrollTarget = () => {
          const formEl = document.getElementById('consultation-form') || document.getElementById('contact');
          if (formEl) {
            formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        };

        scrollTarget();
        const t1 = setTimeout(scrollTarget, 180);
        const t2 = setTimeout(scrollTarget, 450);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
        };
      }
    };

    const cleanup = handleUrlParams();
    window.addEventListener('hashchange', handleUrlParams);
    window.addEventListener('popstate', handleUrlParams);
    return () => {
      if (cleanup) cleanup();
      window.removeEventListener('hashchange', handleUrlParams);
      window.removeEventListener('popstate', handleUrlParams);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const message = formData.get('message');

    const text = `Hi Dr. Design, I'd like a free plan.
Service: ${selectedNeed}
Name: ${name}
Phone: ${phone}${email ? `\nEmail: ${email}` : ''}${message ? `\nMessage: ${message}` : ''}`;

    openWhatsApp('917217052558', text);
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="sec contact relative py-14 max-sm:py-8 overflow-hidden"
      style={{ scrollMarginTop: '110px' }}
      aria-label="Free consultation"
    >
      <div className="wrap flex flex-wrap gap-12 max-sm:gap-6">
        {/* Left Column: Side Info & Dashboard */}
        <div className="contact__side flex-[1_1_400px] min-w-0 flex flex-col gap-[22px]">
          <Reveal as="span" className="eyebrow">Free consultation</Reveal>
          <Reveal as="h2" className="h2 m-0 text-[clamp(30px,3.6vw,48px)] leading-[1.12] font-extrabold tracking-[-0.02em] text-[#0e1b2e] font-['Plus_Jakarta_Sans',sans-serif]">
            Let&apos;s turn your next goal into <span className="hl text-[#0b4db5]">measurable growth.</span>
          </Reveal>
          <Reveal as="p" className="lead m-0 text-[18px] max-sm:text-[16px] leading-[1.7] text-[#44546a]">
            Share your goals with our team. We&apos;ll review where you stand and recommend the most useful next step.
          </Reveal>

          {/* Checklist Feature Badges */}
          <Reveal className="row flex flex-wrap gap-3 items-center">
            {checklistItems.map((item) => (
              <span
                key={item}
                className="tick-pill neu-s"
              >
                {item}
              </span>
            ))}
          </Reveal>

          {/* Growth Dashboard Graphic */}
          <Reveal>
            <GrowthDashboard />
          </Reveal>

          {/* Quick Contact Action Buttons */}
          <Reveal className="row flex flex-wrap gap-3 items-center mt-5 max-sm:mt-0">
            <a
              href={WHATSAPP_BASE}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => openWhatsApp('917217052558', '', e)}
              className="btn btn-neu inline-flex items-center justify-center gap-2.5 min-h-[52px] px-[26px] rounded-full font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[15px] text-[#1E7A43] bg-[#eaf6f8] shadow-[6px_6px_14px_rgba(20,84,120,0.14),-6px_-6px_14px_rgba(255,255,255,0.92)] hover:shadow-[10px_12px_24px_rgba(20,84,120,0.18),-8px_-8px_18px_rgba(255,255,255,0.95)] hover:-translate-y-0.5 transition-all duration-200"
            >
              WhatsApp us
            </a>
            <a
              href={PHONE_HREF}
              className="btn btn-neu inline-flex items-center justify-center gap-2.5 min-h-[52px] px-[26px] rounded-full font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[15px] text-[#0e1b2e] bg-[#eaf6f8] shadow-[6px_6px_14px_rgba(20,84,120,0.14),-6px_-6px_14px_rgba(255,255,255,0.92)] hover:shadow-[10px_12px_24px_rgba(20,84,120,0.18),-8px_-8px_18px_rgba(255,255,255,0.95)] hover:-translate-y-0.5 transition-all duration-200"
            >
              {PHONE_NUMBER}
            </a>
          </Reveal>

          {/* Social Pills matching 1:1 with design */}
          <Reveal style={{ marginTop: 18 }}>
            <div className="soc-pills">
              <a
                href="https://www.instagram.com/drdesigntechnology/"
                target="_blank"
                rel="noopener noreferrer"
                className="soc-pill neu-s soc-pill--instagram"
                aria-label="Dr. Design on Instagram"
              >
                <span className="soc-pill__ic">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                <span>
                  <b>Instagram</b>
                  <small>@drdesigntechnology</small>
                </span>
              </a>
              <a
                href="https://www.linkedin.com/company/drdesignpvtltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="soc-pill neu-s soc-pill--linkedin"
                aria-label="Dr. Design on LinkedIn"
              >
                <span className="soc-pill__ic">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <path d="M8 10.5V17M8 7.2v.1M12 17v-6.5M12 13.2a2.7 2.7 0 0 1 5 0V17" />
                  </svg>
                </span>
                <span>
                  <b>LinkedIn</b>
                  <small>Dr. Design Pvt. Ltd.</small>
                </span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Lead Form */}
        <Reveal
          as="form"
          id="consultation-form"
          style={{ scrollMarginTop: '110px' }}
          className="form neu flex-[999_1_560px] min-w-0 p-[clamp(22px,4vw,40px)] flex flex-col gap-[22px] rounded-[34px] max-sm:rounded-[26px] bg-[#eaf6f8] shadow-[14px_14px_32px_rgba(20,84,120,0.14),-12px_-12px_28px_rgba(255,255,255,0.92)]"
          onSubmit={handleSubmit}
        >
          {/* Services Selector Grid */}
          <fieldset className="border-0 m-0 p-0 flex flex-col gap-3">
            <legend className="text-[14px] font-bold text-[#0e1b2e] mb-3">
              What do you need help with? *
            </legend>
            <div className="needs grid grid-cols-[repeat(auto-fit,minmax(128px,1fr))] gap-3.5">
              {needsOptions.map((opt) => {
                const isActive = selectedNeed === opt.label;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    className={`need neu-s flex flex-col items-center justify-center gap-2 min-h-[104px] p-3 py-3.5 rounded-[20px] border-2 cursor-pointer transition-all duration-250 font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[14px] leading-snug text-center ${
                      isActive
                        ? 'on border-[#f5b82e] text-[#0b4db5] ring-2 ring-[#0b4db5] ring-offset-2 ring-offset-[#eaf6f8] bg-[#eaf6f8] shadow-[inset_4px_4px_8px_rgba(20,84,120,0.12),inset_-4px_-4px_8px_#ffffff]'
                        : 'border-transparent text-[#0e1b2e] bg-[#eaf6f8] shadow-[6px_6px_14px_rgba(20,84,120,0.14),-6px_-6px_14px_rgba(255,255,255,0.92)] hover:-translate-y-0.5'
                    }`}
                    aria-pressed={isActive}
                    onClick={() => setSelectedNeed(opt.label)}
                  >
                    <img src={opt.icon} alt="" loading="lazy" decoding="async" className="w-[34px] h-[34px] select-none" draggable="false" />
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Name & Phone Inputs */}
          <div className="fields grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
            <label className="field flex flex-col gap-2 text-[14px] font-bold text-[#0e1b2e]">
              Your name *
              <input
                name="name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
                required
                className="font-medium text-[15px] p-[16px_18px] rounded-[16px] border-0 bg-[#e6f3f6] text-[#0e1b2e] outline-none shadow-[inset_5px_5px_10px_rgba(20,84,120,0.13),inset_-5px_-5px_10px_rgba(255,255,255,0.95)] placeholder-[#5b6b80] focus:ring-2 focus:ring-[#0b4db5]"
              />
            </label>
            <label className="field flex flex-col gap-2 text-[14px] font-bold text-[#0e1b2e]">
              Phone / WhatsApp *
              <input
                name="phone"
                type="tel"
                placeholder="+91 9xxxx xxxxx"
                autoComplete="tel"
                required
                className="font-medium text-[15px] p-[16px_18px] rounded-[16px] border-0 bg-[#e6f3f6] text-[#0e1b2e] outline-none shadow-[inset_5px_5px_10px_rgba(20,84,120,0.13),inset_-5px_-5px_10px_rgba(255,255,255,0.95)] placeholder-[#5b6b80] focus:ring-2 focus:ring-[#0b4db5]"
              />
            </label>
          </div>

          {/* Email Input */}
          <label className="field flex flex-col gap-2 text-[14px] font-bold text-[#0e1b2e]">
            Email (optional)
            <input
              name="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              className="font-medium text-[15px] p-[16px_18px] rounded-[16px] border-0 bg-[#e6f3f6] text-[#0e1b2e] outline-none shadow-[inset_5px_5px_10px_rgba(20,84,120,0.13),inset_-5px_-5px_10px_rgba(255,255,255,0.95)] placeholder-[#5b6b80] focus:ring-2 focus:ring-[#0b4db5]"
            />
          </label>

          {/* Message Textarea */}
          <label className="field flex flex-col gap-2 text-[14px] font-bold text-[#0e1b2e]">
            Message (optional)
            <textarea
              name="message"
              rows="4"
              placeholder="Tell us a little about your business"
              className="font-medium text-[15px] p-[16px_18px] rounded-[16px] border-0 bg-[#e6f3f6] text-[#0e1b2e] outline-none shadow-[inset_5px_5px_10px_rgba(20,84,120,0.13),inset_-5px_-5px_10px_rgba(255,255,255,0.95)] placeholder-[#5b6b80] resize-y focus:ring-2 focus:ring-[#0b4db5]"
            />
          </label>

          {/* WhatsApp Success Notice */}
          {submitted && (
            <motion.div
              className="sent p-[14px_16px] rounded-[14px] bg-[#ddf5e6] text-[#14532d] font-bold text-[14px]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Thanks! Press send in WhatsApp — our team replies within one business day.
            </motion.div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="btn btn-blue btn-glow group inline-flex items-center justify-center gap-2.5 min-h-[56px] px-[34px] rounded-full font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[16px] text-white bg-[#0b4db5] shadow-[0_14px_26px_-12px_rgba(11,77,181,0.8),inset_0_1px_rgba(255,255,255,0.25)] hover:bg-[#083a88] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer max-sm:w-full"
            >
              Get my free plan{' '}
              <span className="arr transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

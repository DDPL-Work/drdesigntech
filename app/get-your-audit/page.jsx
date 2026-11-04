'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { openWhatsApp } from '@/utils/whatsapp';

const WHATSAPP_BASE = 'https://wa.me/917217052558';

const CATEGORIES = [
  { id: 'performance', label: 'Performance', icon: 'chart' },
  { id: 'seo', label: 'SEO', icon: 'seo' },
  { id: 'accessibility', label: 'Accessibility', icon: 'shield' },
  { id: 'best-practices', label: 'Best practices', icon: 'web' }
];

const METRICS = [
  {
    id: 'first-contentful-paint',
    label: 'First paint',
    tip: 'When the first text or image appears'
  },
  {
    id: 'largest-contentful-paint',
    label: 'Main content',
    tip: 'When the main content has loaded (LCP)'
  },
  {
    id: 'total-blocking-time',
    label: 'Blocking time',
    tip: 'How long the page is frozen to taps/clicks'
  },
  {
    id: 'cumulative-layout-shift',
    label: 'Layout shift',
    tip: 'How much the page jumps while loading (CLS)'
  },
  {
    id: 'speed-index',
    label: 'Speed index',
    tip: 'How quickly the page visibly fills in'
  }
];

const SCAN_STEPS = [
  'Connecting to your website',
  'Loading the page like a real visitor',
  'Measuring speed & Core Web Vitals',
  'Checking SEO & meta tags',
  'Testing accessibility',
  'Reviewing security & best practices',
  'Building your report'
];

const CHECKS = [
  [
    'chart',
    'Performance',
    'Load speed, Core Web Vitals, image & code size, caching.'
  ],
  [
    'seo',
    'SEO',
    'Titles, meta descriptions, crawlability, links and mobile-friendliness.'
  ],
  [
    'shield',
    'Accessibility',
    'Contrast, labels, alt text and keyboard navigation.'
  ],
  [
    'web',
    'Best practices',
    'HTTPS, security, browser errors and modern web standards.'
  ]
];

const cleanUrlInput = (raw) => {
  let u = (raw || '').trim();
  if (!u) return null;
  if (!/^https?:\/\//i.test(u)) u = `https://${u}`;
  try {
    const parsed = new URL(u);
    return parsed.hostname.includes('.') ? parsed.href : null;
  } catch {
    return null;
  }
};

const getScoreCat = (score) => {
  if (score == null) return 'na';
  if (score >= 0.9) return 'good';
  if (score >= 0.5) return 'avg';
  return 'poor';
};

const stripMarkdown = (str = '') =>
  str.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/`/g, '');

function parseLighthouseResult(data) {
  const result = data.lighthouseResult;
  const audits = result.audits || {};
  const categories = result.categories || {};

  const scores = CATEGORIES.map((cat) => ({
    ...cat,
    score: categories[cat.id]?.score ?? null
  }));

  const metrics = METRICS.map((m) => ({
    ...m,
    value: audits[m.id]?.displayValue || '–',
    score: audits[m.id]?.score ?? null
  }));

  const seen = new Set();
  const issues = [];

  CATEGORIES.forEach((cat) => {
    const auditRefs = categories[cat.id]?.auditRefs || [];
    auditRefs.forEach((ref) => {
      const item = audits[ref.id];
      if (
        !item ||
        seen.has(ref.id) ||
        ref.group === 'metrics' ||
        item.score === null ||
        item.score === undefined ||
        item.score >= 0.9
      ) {
        return;
      }
      if (['binary', 'numeric', 'metricSavings'].includes(item.scoreDisplayMode)) {
        seen.add(ref.id);
        issues.push({
          id: ref.id,
          cat: cat.label,
          title: item.title,
          desc: stripMarkdown(item.description || '').split('. ')[0] + '.',
          value: item.displayValue || '',
          score: item.score,
          savings: item.details?.overallSavingsMs || 0
        });
      }
    });
  });

  issues.sort((a, b) => a.score - b.score || b.savings - a.savings);

  const passed = Object.values(audits).filter(
    (u) => u.score === 1 && u.scoreDisplayMode === 'binary'
  ).length;

  const shot = audits['final-screenshot']?.details?.data || null;

  return {
    url: result.finalDisplayedUrl || result.finalUrl || result.requestedUrl,
    fetched: result.fetchTime,
    scores,
    metrics,
    issues,
    passed,
    shot
  };
}

function RingScore({ score, label, icon, delay = 0 }) {
  const [num, setNum] = useState(0);
  const finalScore = score == null ? 0 : Math.round(score * 100);

  useEffect(() => {
    const controls = animate(0, finalScore, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setNum(Math.round(v))
    });
    return () => controls.stop();
  }, [finalScore, delay]);

  const circumference = 2 * Math.PI * 52;
  const scoreCat = getScoreCat(score);

  return (
    <motion.div
      className="relative flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <svg viewBox="0 0 120 120" aria-hidden="true" className="w-[120px] h-[120px] -rotate-90">
        <circle cx="60" cy="60" r="52" className="fill-none stroke-[#e1ecf1] stroke-[10]" />
        <motion.circle
          cx="60"
          cy="60"
          r="52"
          className={`fill-none stroke-[10] [stroke-linecap:round] ${
            scoreCat === 'good'
              ? 'stroke-[#1e9e52]'
              : scoreCat === 'avg'
              ? 'stroke-[#e89a00]'
              : scoreCat === 'poor'
              ? 'stroke-[#d3262c]'
              : 'stroke-[#b8c7d6]'
          }`}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset:
              circumference * (1 - (score == null ? 0 : score))
          }}
          transition={{ duration: 1.6, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <span
        className={`absolute top-[38px] text-[34px] font-extrabold ${
          scoreCat === 'good'
            ? 'text-[#1e9e52]'
            : scoreCat === 'avg'
            ? 'text-[#c27c00]'
            : scoreCat === 'poor'
            ? 'text-[#d3262c]'
            : 'text-[#8291a6]'
        }`}
      >
        {score == null ? '–' : num}
      </span>
      <span className="inline-flex items-center gap-1.5 font-bold text-[14px] text-[#0e1b2e]">
        <img
          src={`/assets/icons/${icon}.svg`}
          alt=""
          width={18}
          height={18}
          aria-hidden="true"
        />
        {label}
      </span>
    </motion.div>
  );
}

export default function AuditPage() {
  const [url, setUrl] = useState('');
  const [strategy, setStrategy] = useState('mobile');
  const [status, setStatus] = useState('idle'); // 'idle' | 'scanning' | 'done' | 'error'
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [report, setReport] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const abortCtrlRef = useRef(null);

  // Stepped scanning progression
  useEffect(() => {
    if (status !== 'scanning') return;
    setCurrentStep(0);
    const interval = setInterval(() => {
      setCurrentStep((prev) => Math.min(prev + 1, SCAN_STEPS.length - 1));
    }, 4200);
    return () => clearInterval(interval);
  }, [status]);

  const handleRunScan = async (e) => {
    e?.preventDefault();
    const cleanUrl = cleanUrlInput(url);
    if (!cleanUrl) {
      setErrorMsg('Please enter a valid website address, e.g. yourbusiness.com');
      setStatus('error');
      return;
    }

    if (abortCtrlRef.current) {
      abortCtrlRef.current.abort();
    }
    const ac = new AbortController();
    abortCtrlRef.current = ac;

    setErrorMsg('');
    setReport(null);
    setStatus('scanning');

    const params = new URLSearchParams({
      url: cleanUrl,
      strategy
    });
    CATEGORIES.forEach((cat) => params.append('category', cat.id));

    try {
      const res = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`,
        { signal: ac.signal }
      );
      const data = await res.json();

      if (!res.ok || !data.lighthouseResult) {
        throw new Error(
          data?.error?.message || 'The scan could not be completed.'
        );
      }

      setReport(parseLighthouseResult(data));
      setActiveFilter('All');
      setStatus('done');

      setTimeout(() => {
        document
          .getElementById('au-report')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    } catch (err) {
      if (err.name === 'AbortError') return;
      const msg = String(err.message || '');
      if (/quota|rate/i.test(msg)) {
        setErrorMsg(
          'Our free scanner is busy right now. Please try again in a minute — or ask us for a manual audit.'
        );
      } else if (
        /unable to resolve|ERR_NAME|DNS|FAILED_DOCUMENT_REQUEST|NO_FCP|ERRORED_DOCUMENT/i.test(
          msg
        )
      ) {
        setErrorMsg(
          "We couldn't load that website. Check the address is correct and the site is online."
        );
      } else {
        setErrorMsg(
          "The scan couldn't be completed. Check your connection and try again — or ask us for a manual audit."
        );
      }
      setStatus('error');
    }
  };

  const overallScore = report
    ? Math.round(
        (report.scores.reduce((acc, curr) => acc + (curr.score ?? 0), 0) /
          report.scores.length) *
          100
      )
    : 0;

  const filteredIssues = report
    ? report.issues.filter(
        (iss) => activeFilter === 'All' || iss.cat === activeFilter
      )
    : [];

  const whatsappMsg = report
    ? `Hi Dr. Design, I ran the free website audit for ${report.url} (${strategy}).\n` +
      report.scores
        .map(
          (v) =>
            `${v.label}: ${
              v.score == null ? '–' : Math.round(v.score * 100)
            }/100`
        )
        .join('\n') +
      `\nIssues found: ${report.issues.length}. Please help me fix them.`
    : '';

  return (
    <div className="w-full text-[#0e1b2e]">
      {/* Hero Section */}
      <section className="pt-4 pb-2.5 print:hidden">
        <div className="wrap max-w-[1400px] mx-auto px-4 w-full">
          <div className="relative overflow-hidden isolate flex flex-col items-center text-center gap-4 py-7 px-4.5 sm:py-[clamp(36px,6vw,72px)] sm:px-[clamp(20px,5vw,64px)] rounded-[26px] sm:rounded-[36px] text-white bg-[#0b3e9e] shadow-[0_40px_70px_-44px_rgba(11,77,181,0.9)]">
            {/* Animated mesh */}
            <div
              className="absolute -inset-[20%] -z-20 [animation:ctaMesh_14s_ease-in-out_infinite_alternate] [background:radial-gradient(40%_50%_at_15%_25%,rgba(91,196,208,0.5),transparent_70%),radial-gradient(35%_45%_at_85%_80%,rgba(245,184,46,0.32),transparent_70%),linear-gradient(135deg,#0b4db5,#082f78)]"
              aria-hidden="true"
            />
            {/* Radial grid */}
            <div
              className="absolute inset-0 -z-10 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:38px_38px] [mask-image:radial-gradient(60%_70%_at_50%_50%,#000,transparent)] [-webkit-mask-image:radial-gradient(60%_70%_at_50%_50%,#000,transparent)]"
              aria-hidden="true"
            />

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[13px] font-bold text-white/90" aria-label="Breadcrumb">
              <Link href="/" className="text-white hover:text-[#f5b82e] transition-colors">
                Home
              </Link>
              <span aria-hidden="true" className="opacity-60">/</span>
              <span aria-current="page" className="text-white/80">Free website audit</span>
            </nav>

            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eef8fa] shadow-[5px_5px_12px_rgba(20,84,120,0.13),-5px_-5px_12px_rgba(255,255,255,0.95)] text-[13px] font-bold text-[#0b4db5] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f5b82e] before:shadow-[0_0_0_4px_rgba(245,184,46,0.25)]">
              Free website audit
            </span>

            {/* Title */}
            <h1 className="m-0 max-w-[820px] text-[30px] sm:text-[clamp(34px,4.8vw,60px)] leading-[1.06] font-extrabold tracking-[-0.03em] text-white">
              Scan your website.{' '}
              <span className="text-[#f5b82e]">Find every issue.</span>
            </h1>

            {/* Paragraph */}
            <p className="m-0 max-w-[640px] text-[15.5px] sm:text-[17.5px] leading-[1.7] text-[#dce8fa]">
              Get a complete report on speed, SEO, accessibility and best
              practices in about a minute — powered by Google Lighthouse,
              explained in plain English.
            </p>

            {/* URL input and options form */}
            <form className="w-full max-w-[760px] flex flex-col gap-3 mt-2.5" onSubmit={handleRunScan}>
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 p-2.5 sm:py-2 sm:pr-2 sm:pl-4 rounded-[22px] sm:rounded-full bg-white shadow-[0_20px_40px_-18px_rgba(0,0,0,0.5),0_0_0_6px_rgba(255,255,255,0.12)]">
                <span className="shrink-0 w-10 h-10 rounded-full grid place-items-center text-[#0b4db5] bg-[#eaf3ff]" aria-hidden="true">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
                    <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
                  </svg>
                </span>
                <label htmlFor="au-url" className="sr-only">
                  Website address
                </label>
                <input
                  id="au-url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter your website, e.g. yourbusiness.com"
                  inputMode="url"
                  autoComplete="url"
                  spellCheck="false"
                  className="flex-1 basis-[60%] sm:basis-auto min-w-0 border-0 outline-none bg-transparent font-semibold text-[16px] text-[#0e1b2e] py-3 px-1.5 placeholder:text-[#8291a6] placeholder:font-medium"
                />
                <button
                  type="submit"
                  className="btn btn-glow min-h-[54px] w-full sm:w-auto shrink-0 disabled:opacity-80 disabled:cursor-progress"
                  disabled={status === 'scanning'}
                >
                  <span>{status === 'scanning' ? 'Scanning…' : 'Run free scan'}</span>{' '}
                  <span className="arr">→</span>
                </button>
              </div>

              {/* Device Selector */}
              <div className="flex flex-wrap items-center justify-center gap-2" role="radiogroup" aria-label="Device">
                {[
                  ['mobile', 'Mobile'],
                  ['desktop', 'Desktop']
                ].map(([val, label]) => (
                  <button
                    key={val}
                    type="button"
                    role="radio"
                    aria-checked={strategy === val}
                    className={`min-h-[38px] px-4 rounded-full border-[1.5px] cursor-pointer font-bold text-[13.5px] transition-all duration-200 ${
                      strategy === val
                        ? 'bg-white text-[#0b4db5] border-white'
                        : 'bg-transparent text-white border-white/40 hover:border-white/70'
                    }`}
                    onClick={() => setStrategy(val)}
                  >
                    {label}
                  </button>
                ))}
                <span className="w-full sm:w-auto sm:ml-2 text-center sm:text-left text-[13px] text-[#bfd3f2]">
                  Speed · SEO · Accessibility · Best practices
                </span>
              </div>
            </form>

            {/* Error Message */}
            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  className="flex flex-wrap items-center justify-center gap-2 py-3 px-4.5 rounded-2xl bg-[#fff4e5] text-[#7a3e00] font-semibold text-[14.5px] mt-1"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="w-[22px] h-[22px] rounded-full grid place-items-center bg-[#e0393a] text-white font-extrabold text-[12px]">
                    !
                  </span>
                  {errorMsg}{' '}
                  <a
                    href={`${WHATSAPP_BASE}?text=${encodeURIComponent(
                      `Hi Dr. Design, please do a manual audit of my website: ${url}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => openWhatsApp("917217052558", `Hi Dr. Design, please do a manual audit of my website: ${url}`, e)}
                    className="text-[#0b4db5] font-extrabold hover:underline"
                  >
                    Ask on WhatsApp →
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Scanning State (Radar Animation) */}
      <AnimatePresence>
        {status === 'scanning' && (
          <motion.section
            className="py-7 sm:pt-[30px] sm:pb-2.5 print:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="wrap max-w-[1400px] mx-auto px-4 flex flex-wrap items-center gap-[22px] sm:gap-10 p-[22px] sm:p-[34px] rounded-[30px] neu bg-[#eaf6f8] shadow-[14px_14px_32px_rgba(20,84,120,0.12),-12px_-12px_28px_rgba(255,255,255,0.9)]">
              {/* Radar Circle */}
              <div
                className="relative shrink-0 w-[170px] h-[170px] sm:w-[220px] sm:h-[220px] rounded-full overflow-hidden mx-auto [background:radial-gradient(circle,#0e3a86,#082450)] shadow-[inset_0_0_40px_rgba(91,196,208,0.35),0_20px_40px_-20px_rgba(11,77,181,0.8)]"
                aria-hidden="true"
              >
                <span className="absolute inset-0 [background:conic-gradient(from_0deg,rgba(91,196,208,0.55),transparent_28%)] animate-[spin_2.4s_linear_infinite]" />
                <span className="absolute inset-[22%] rounded-full border border-white/20" />
                <span className="absolute inset-[44%] rounded-full border border-white/20" />
                <span
                  className="absolute w-2.5 h-2.5 rounded-full bg-[#f5b82e] shadow-[0_0_12px_#f5b82e] animate-[blink_1.6s_infinite]"
                  style={{ left: '64%', top: '30%' }}
                />
                <span
                  className="absolute w-2.5 h-2.5 rounded-full bg-[#f5b82e] shadow-[0_0_12px_#f5b82e] animate-[blink_1.6s_infinite]"
                  style={{
                    left: '30%',
                    top: '62%',
                    animationDelay: '.8s'
                  }}
                />
                <img
                  src="/assets/logo.png"
                  alt=""
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[54px] h-[54px] p-1.5 rounded-full bg-white object-contain shadow-sm"
                />
              </div>

              {/* Status Copy and Steps */}
              <div className="flex-1 basis-[320px] min-w-0">
                <h2 className="m-0 text-[24px] font-extrabold text-[#0e1b2e] break-all">
                  Scanning {url.replace(/^https?:\/\//, '')}.
                </h2>
                <p className="mt-1 mb-4 text-[#5b6b80] text-[15px]">
                  This usually takes 30-60 seconds.
                </p>
                <ol className="list-none m-0 p-0 flex flex-col gap-2.5">
                  {SCAN_STEPS.map((step, idx) => {
                    const isDone = idx < currentStep;
                    const isNow = idx === currentStep;
                    return (
                      <li
                        key={step}
                        className={`flex items-center gap-2.5 font-semibold text-[14.5px] transition-colors duration-300 ${
                          isDone
                            ? 'text-[#0e1b2e]'
                            : isNow
                            ? 'text-[#0b4db5]'
                            : 'text-[#8291a6]'
                        }`}
                      >
                        <span
                          className={`w-[22px] h-[22px] rounded-full grid place-items-center text-[12px] text-white shrink-0 transition-colors duration-300 ${
                            isDone
                              ? 'bg-[#25aa5a]'
                              : isNow
                              ? 'bg-[#0b4db5] shadow-[0_0_0_5px_rgba(11,77,181,0.18)] animate-[pulseDot_1.2s_infinite]'
                              : 'bg-[#d5e3ea]'
                          }`}
                        >
                          {isDone ? '✓' : ''}
                        </span>
                        {step}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Done State (Official Diagnostic Report) */}
      {status === 'done' && report && (
        <section id="au-report" className="pt-[30px] pb-[70px] scroll-mt-[110px]">
          <div className="wrap max-w-[1400px] mx-auto px-4 w-full">
            <motion.div
              className="p-[18px] sm:p-7 rounded-[30px] flex flex-col gap-[22px] neu bg-[#eaf6f8] shadow-[14px_14px_32px_rgba(20,84,120,0.12),-12px_-12px_28px_rgba(255,255,255,0.9)]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-wrap justify-between items-center gap-3.5 pb-4.5 border-b border-dashed border-[#c9dce5]">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/logo.png"
                    alt=""
                    className="w-12 h-12 p-[5px] rounded-full bg-white object-contain shadow-[0_6px_14px_rgba(20,84,120,0.15)]"
                  />
                  <span className="flex flex-col">
                    <b className="text-[18px] font-extrabold text-[#0e1b2e]">
                      Website audit report
                    </b>
                    <small className="text-[13px] text-[#5b6b80] font-semibold">
                      by Dr. Design Technology
                    </small>
                  </span>
                </div>
                <div className="flex flex-col text-left sm:text-right min-w-0">
                  <b className="text-[#0b4db5] font-bold break-all text-[15px]">
                    {report.url}
                  </b>
                  <small className="text-[#5b6b80] text-[13px]">
                    {strategy === 'mobile' ? 'Mobile' : 'Desktop'} scan ·{' '}
                    {new Date(report.fetched).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </small>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-[30px]">
                <div className="relative shrink-0 basis-[300px] mx-auto">
                  <div
                    className={`overflow-hidden grid place-items-center bg-white border-[8px] border-[#0e1b2e] shadow-[0_24px_40px_-20px_rgba(14,27,46,0.6)] mx-auto ${
                      strategy === 'mobile'
                        ? 'w-[190px] h-[360px] rounded-[28px]'
                        : 'w-[300px] h-[200px] rounded-[14px]'
                    }`}
                  >
                    {report.shot ? (
                      <img
                        src={report.shot}
                        alt={`Screenshot of ${report.url}`}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <img
                        src="/assets/icons/web.svg"
                        width={80}
                        height={80}
                        alt=""
                      />
                    )}
                  </div>
                  <div
                    className={`absolute -right-1.5 -bottom-3.5 flex flex-col items-center py-2.5 px-4 rounded-[18px] text-white shadow-[0_14px_26px_-10px_rgba(0,0,0,0.4)] ${
                      overallScore >= 90
                        ? 'bg-[#1e9e52]'
                        : overallScore >= 50
                        ? 'bg-[#d98a00]'
                        : 'bg-[#d3262c]'
                    }`}
                  >
                    <b className="text-[30px] leading-none font-extrabold">{overallScore}</b>
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Overall score
                    </span>
                  </div>
                </div>

                <div className="flex-1 basis-[420px] grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-4.5">
                  {report.scores.map((sc, h) => (
                    <RingScore
                      key={sc.id}
                      {...sc}
                      delay={0.15 + h * 0.12}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4.5 text-[13px] font-semibold text-[#5b6b80]">
                <span className="flex items-center gap-1.5 before:content-[''] before:inline-block before:w-2.5 before:h-2.5 before:rounded-full before:bg-[#1e9e52]">
                  90–100 Good
                </span>
                <span className="flex items-center gap-1.5 before:content-[''] before:inline-block before:w-2.5 before:h-2.5 before:rounded-full before:bg-[#e89a00]">
                  50–89 Needs work
                </span>
                <span className="flex items-center gap-1.5 before:content-[''] before:inline-block before:w-2.5 before:h-2.5 before:rounded-full before:bg-[#d3262c]">
                  0–49 Poor
                </span>
              </div>
            </motion.div>

            {/* Speed & Core Web Vitals */}
            <h2 className="mt-11 mb-4 text-[clamp(22px,2.4vw,28px)] font-extrabold tracking-[-0.02em] text-[#0e1b2e]">
              Speed & Core Web Vitals
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-3.5">
              {report.metrics.map((m, h) => {
                const cat = getScoreCat(m.score);
                return (
                  <motion.div
                    key={m.id}
                    className="relative flex flex-col gap-1 p-4.5 rounded-[20px] neu-s bg-[#eaf6f8] shadow-[4px_4px_10px_rgba(20,84,120,0.12),-4px_-4px_10px_rgba(255,255,255,0.9)]"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + h * 0.07 }}
                  >
                    <span
                      className={`absolute top-4.5 right-4.5 w-3 h-3 rounded-full ${
                        cat === 'good'
                          ? 'bg-[#1e9e52]'
                          : cat === 'avg'
                          ? 'bg-[#e89a00]'
                          : cat === 'poor'
                          ? 'bg-[#d3262c]'
                          : 'bg-[#b8c7d6]'
                      }`}
                    />
                    <small className="text-[12.5px] font-bold text-[#5b6b80] uppercase tracking-[0.06em]">
                      {m.label}
                    </small>
                    <b
                      className={`text-[26px] font-extrabold ${
                        cat === 'good'
                          ? 'text-[#1e9e52]'
                          : cat === 'avg'
                          ? 'text-[#c27c00]'
                          : cat === 'poor'
                          ? 'text-[#d3262c]'
                          : 'text-[#0e1b2e]'
                      }`}
                    >
                      {m.value}
                    </b>
                    <span className="text-[12.5px] text-[#6b7b90] leading-[1.45]">
                      {m.tip}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Issues Breakdown */}
            <div className="flex flex-wrap items-baseline justify-between gap-2.5">
              <h2 className="mt-11 mb-4 text-[clamp(22px,2.4vw,28px)] font-extrabold tracking-[-0.02em] text-[#0e1b2e]">
                {report.issues.length
                  ? `${report.issues.length} issues to fix`
                  : 'No major issues found 🎉'}
              </h2>
              <span className="mt-11 font-bold text-[#1e9e52] text-[15px]">
                ✓ {report.passed} checks passed
              </span>
            </div>

            {report.issues.length > 0 && (
              <>
                <div className="flex flex-wrap gap-2 mb-3.5 print:hidden" role="tablist">
                  {['All', ...report.scores.map((s) => s.label)].map((cat) => {
                    const count =
                      cat === 'All'
                        ? report.issues.length
                        : report.issues.filter((r) => r.cat === cat).length;
                    return (
                      <button
                        key={cat}
                        type="button"
                        role="tab"
                        aria-selected={activeFilter === cat}
                        className={`min-h-[40px] px-3.5 rounded-full border-0 cursor-pointer font-bold text-[13.5px] transition-all duration-200 ${
                          activeFilter === cat
                            ? 'bg-[#0b4db5] text-white shadow-md'
                            : 'bg-[#eaf6f8] text-[#0e1b2e] shadow-[4px_4px_10px_rgba(20,84,120,0.12),-4px_-4px_10px_rgba(255,255,255,0.9)] hover:text-[#0b4db5]'
                        }`}
                        onClick={() => setActiveFilter(cat)}
                      >
                        {cat}{' '}
                        <em
                          className={`not-italic ml-1 py-0.5 px-1.5 rounded-full text-[12px] font-semibold ${
                            activeFilter === cat
                              ? 'bg-white/25 text-white'
                              : 'bg-[#e1ecf1] text-[#0e1b2e]'
                          }`}
                        >
                          {count}
                        </em>
                      </button>
                    );
                  })}
                </div>

                <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
                  {filteredIssues.map((issue, h) => (
                    <motion.li
                      key={issue.id}
                      className={`flex flex-wrap sm:flex-nowrap items-start gap-3.5 p-4 sm:py-4 sm:px-4.5 rounded-[18px] border-l-[5px] neu-s bg-[#eaf6f8] shadow-[4px_4px_10px_rgba(20,84,120,0.12),-4px_-4px_10px_rgba(255,255,255,0.9)] ${
                        issue.score < 0.5
                          ? 'border-l-[#d3262c]'
                          : 'border-l-[#e89a00]'
                      }`}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: Math.min(h * 0.04, 0.6) }}
                    >
                      <span
                        className={`shrink-0 mt-0.5 py-[3px] px-2.5 rounded-full text-[11.5px] font-extrabold text-white ${
                          issue.score < 0.5 ? 'bg-[#d3262c]' : 'bg-[#e89a00]'
                        }`}
                      >
                        {issue.score < 0.5 ? 'High' : 'Medium'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <b className="block text-[15.5px] font-bold text-[#0e1b2e]">
                          {issue.title}
                        </b>
                        <p className="mt-1 text-[#5b6b80] text-[13.5px] leading-[1.55]">
                          {issue.desc}
                        </p>
                      </div>
                      <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto gap-1.5">
                        <span className="text-[12px] font-bold text-[#1d7f8c]">
                          {issue.cat}
                        </span>
                        {issue.value && (
                          <span className="text-[12.5px] font-bold py-[3px] px-[9px] rounded-lg bg-[#eef3f7] text-[#0e1b2e] whitespace-nowrap">
                            {issue.value}
                          </span>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </>
            )}

            {/* Report CTA Action Banner */}
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-between gap-[22px] p-6 sm:p-[clamp(26px,4vw,44px)] rounded-[30px] text-white bg-gradient-to-br from-[#0b4db5] to-[#082f78] shadow-[0_30px_60px_-36px_rgba(11,77,181,0.9)] print:hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex-1 basis-[340px]">
                <h2 className="m-0 mb-1.5 text-[clamp(24px,2.8vw,32px)] font-extrabold text-white">
                  Want these issues fixed?
                </h2>
                <p className="m-0 text-[#dce8fa] leading-[1.6] text-[15px]">
                  Our team will review this report, explain the priorities and
                  send a fix plan with a clear quote — free, no obligation.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <a
                  href={`${WHATSAPP_BASE}?text=${encodeURIComponent(
                    whatsappMsg
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => openWhatsApp("917217052558", whatsappMsg, e)}
                  className="btn btn-glow btn-pulse w-full sm:w-auto"
                >
                  <span>Send report on WhatsApp</span>{' '}
                  <span className="arr">→</span>
                </a>
                <button
                  type="button"
                  className="btn btn-ghost-w w-full sm:w-auto font-inherit cursor-pointer"
                  onClick={() => window.print()}
                >
                  Download PDF
                </button>
                <button
                  type="button"
                  className="btn btn-ghost-w w-full sm:w-auto font-inherit cursor-pointer"
                  onClick={() => {
                    setStatus('idle');
                    setReport(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Scan another site
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* What the scan checks section (shown when not showing report) */}
      {status !== 'done' && (
        <section className="py-12 sm:py-16 print:hidden">
          <div className="wrap max-w-[1400px] mx-auto px-4 w-full">
            <div className="text-center max-w-[760px] mx-auto mb-[30px] flex flex-col items-center gap-2">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eef8fa] shadow-[5px_5px_12px_rgba(20,84,120,0.13),-5px_-5px_12px_rgba(255,255,255,0.95)] text-[13px] font-bold text-[#0b4db5] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f5b82e] before:shadow-[0_0_0_4px_rgba(245,184,46,0.25)]">
                What the scan checks
              </span>
              <h2 className="m-0 font-extrabold text-[clamp(28px,3.6vw,44px)] text-[#0e1b2e] leading-tight">
                A complete health check{' '}
                <span className="text-[#0b4db5]">in one click</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {CHECKS.map(([icon, title, desc], idx) => (
                <motion.div
                  key={title}
                  className="p-[26px] flex flex-col gap-2.5 rounded-[26px] neu lift bg-[#eaf6f8] shadow-[10px_10px_24px_rgba(20,84,120,0.12),-8px_-8px_20px_rgba(255,255,255,0.9)]"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <span className="w-[60px] h-[60px] rounded-full grid place-items-center bg-white shadow-[inset_2px_2px_5px_rgba(20,84,120,0.12)]">
                    <img
                      src={`/assets/icons/${icon}.svg`}
                      alt=""
                      width={34}
                      height={34}
                    />
                  </span>
                  <h3 className="mt-1 text-[19px] font-extrabold text-[#0e1b2e]">{title}</h3>
                  <p className="m-0 text-[#5b6b80] leading-[1.6] text-[14.5px]">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

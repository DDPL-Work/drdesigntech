"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import AnimatedNumber from "./AnimatedNumber";

const metaItems = [
  ["Sector", "Executive Black Car & Chauffeur"],
  ["Engagement", "Enterprise Growth Retainer"],
  ["Channels", "Google Ads, Local SEO, Call Tracking"],
  ["Reported in", "Google Ads & Search Console"],
];

const beforeItems = [
  "The client required multi-airport coverage (corporate executive travel, airport transfers, special occasions) in a highly competitive market where broad clicks easily waste thousands of dollars on low-intent queries.",
  "Generic keywords like ‘car rental’ or untargeted rideshare searches were leaking budget before high-intent corporate buyers reached dispatch.",
  "The business needed a dual-engine approach: aggressive high-intent Google Ads management for immediate bookings, coupled with local SEO to capture long-term organic authority.",
];

const stepItems = [
  [
    "Exact & Phrase Route Structure with 300+ Negative Keywords",
    "Rebuilt Google Ads around exact airport transfers and executive corporate queries while filtering out budget rideshare, cheap rentals, and driver employment traffic. Achieved 45% overall impression share and 58% on premium event queries.",
  ],
  [
    "Dedicated Call Tracking & Instant Phone Routing",
    "Implemented direct click-to-call and dynamic number insertion, capturing 644 qualified phone calls directly from prospective riders ready to book.",
  ],
  [
    "Local Search Architecture & Schema",
    "Structured service-area pages and schema markup across the coverage territory, lifting organic Google Search Console clicks from 257 to 601 per quarter (+133% increase) with 37.8K total impressions.",
  ],
  [
    "Real-Time Bidding against Booked Value",
    "Adjusted automated bidding towards completed corporate rides and round-trip airport reservations rather than generic form submissions.",
  ],
];

const afterItems = [
  "The campaign established dominant local search presence, maintaining top-of-page visibility on the exact routes that drive high-margin corporate retainers and airport runs.",
  "Organic clicks more than doubled within six months, allowing the fleet to capture non-paid bookings alongside scalable paid acquisition.",
];

const kpiItems = [
  { to: 25.9, suffix: "K", decimals: 1, label: "Qualified paid search clicks" },
  { to: 2.95, suffix: "K", decimals: 2, label: "Total tracked conversions" },
  { to: 644, label: "Direct inbound phone calls" },
  { to: 133, prefix: "+", suffix: "%", label: "Quarterly organic search clicks" },
];

export default function CaseStudyBlackCar() {
  return (
    <div className="cs ex-cs" id="work-black-car">
      <div className="head center text-center flex flex-col items-center gap-2">
        <Reveal as="span" className="eyebrow center self-center inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef8fa] text-[13px] font-bold text-[#0b4db5] shadow-[4px_4px_10px_rgba(20,84,120,0.12),-4px_-4px_10px_rgba(255,255,255,0.9)] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f5b82e]">
          Case study · Google Ads + Local SEO · USA
        </Reveal>
        <Reveal as="h2" className="h2 m-0 font-sans text-[clamp(28px,3.6vw,44px)] font-extrabold tracking-[-0.02em] text-[#0e1b2e] leading-tight">
          <span className="hl text-[#0b4db5]">2.95K conversions, 644 calls</span> and +133% organic search growth
        </Reveal>
        <Reveal as="p" className="lead m-0 text-base sm:text-[17px] text-[#5b6b80] max-w-[700px] leading-relaxed">
          A US executive black car & chauffeur service — a dual-engine growth programme of high-intent paid search and local SEO.
        </Reveal>
      </div>

      {/* 4 Metadata Pills */}
      <Reveal className="ex-meta">
        {metaItems.map(([label, val]) => (
          <div key={label} className="ex-meta__item neu-s">
            <span>{label}</span>
            <b>{val}</b>
          </div>
        ))}
      </Reveal>

      {/* Main Panel: Before & Implementation Steps */}
      <Reveal className="cs__panel neu ex-panel">
        <div className="ex-before">
          <span className="ex-label ex-label--red">The situation before our intervention</span>
          <ul>
            {beforeItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="ex-steps">
          <span className="ex-label">Implementation · what we engineered & deployed</span>
          <div className="ex-steps__grid">
            {stepItems.map(([title, desc], idx) => (
              <div key={title} className="ex-step">
                <span className="ex-step__n">{String(idx + 1).padStart(2, "0")}</span>
                <b>{title}</b>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Transformation Card */}
      <Reveal className="ex-after">
        <span className="ex-label ex-label--green">Transformation · what changed in operations</span>
        <div className="ex-after__grid">
          {afterItems.map((item, idx) => (
            <p key={idx}>
              <span aria-hidden="true">✓</span>
              {item}
            </p>
          ))}
        </div>
      </Reveal>

      {/* Proof & KPIs */}
      <Reveal className="ex-proof">
        <span className="ex-label center">Proof & attribution · verified campaign metrics</span>
        <div className="ex-kpis">
          {kpiItems.map((kpi, idx) => (
            <div key={kpi.label} className={`ex-kpi neu ${idx === 0 ? "is-hero" : ""}`}>
              <b>
                <AnimatedNumber
                  to={kpi.to}
                  prefix={kpi.prefix}
                  suffix={kpi.suffix}
                  decimals={kpi.decimals || 0}
                />
              </b>
              <span>{kpi.label}</span>
              <em>✓ Confirmed</em>
            </div>
          ))}
        </div>

        <figure className="cs__proof ex-shot">
          <img
            src="/assets/work/black-car-google-ads.jpg"
            alt="Google Ads dashboard: 25.9K clicks, 2.95K conversions, 644 phone calls, $47.2K cost"
            loading="lazy"
          />
          <figcaption>
            Live Google Ads reporting: 25.9K clicks, 2.95K conversions, 644 inbound calls on $47.2K spend. Account details hidden for client privacy.
          </figcaption>
        </figure>

        <p className="ex-note">
          Data verified from the live Google Ads manager dashboard (25.9K clicks, 2.95K conversions, 644 calls on $47.2K media spend) and Google Search Console performance reporting (601 clicks vs 257 prior period, 37.8K impressions).
        </p>
      </Reveal>

      <Reveal className="cs__cta" style={{ justifyContent: "center" }}>
        <Link href="/reach-to-us" className="btn btn-blue btn-glow">
          <span>Grow my bookings</span> <span className="arr">→</span>
        </Link>
      </Reveal>
    </div>
  );
}


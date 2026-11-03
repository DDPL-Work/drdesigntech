"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AnimatedNumber from "./AnimatedNumber";

const strategies = [
  "Identified strong market potential and rising demand for AI agents tailored to Indian businesses.",
  "Strategically doubled down on AI agent-focused marketing campaigns across platforms.",
  "Google Ads: high engagement and lead quality with a very low CPL.",
  "Meta AI agent-specific campaigns generated over 700 high-quality leads.",
  "Built a robust sales pipeline covering the next 6 months, driven by this campaign’s success.",
];

const platforms = [
  {
    key: "google",
    name: "Google Ads",
    tag: "Search & display",
    kpis: [
      { to: 1430, label: "free trial sign-ups" },
      { to: 20.54, prefix: "₹", decimals: 2, label: "cost per lead" },
      { to: 3.26, suffix: "K", decimals: 2, label: "clicks" },
      { to: 29.3, prefix: "₹", suffix: "K", decimals: 1, label: "total cost" },
    ],
    from: 30.59,
    toCpl: 20.54,
  },
  {
    key: "meta",
    name: "Meta Ads",
    tag: "Facebook & Instagram",
    kpis: [
      { to: 700, suffix: "+", label: "form sign-ups" },
      { to: 89, prefix: "₹", label: "overall cost per lead" },
      { to: 56.37, prefix: "₹", decimals: 2, label: "best cost per lead" },
      { to: 62, prefix: "₹", suffix: "K", label: "total cost" },
    ],
    from: 357,
    toCpl: 56.37,
  },
];

function CostDropBar({ from, to }) {
  const pct = Math.round((1 - to / from) * 100);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ai-drop" ref={ref}>
      <div className="ai-drop__head">
        <span>Cost per lead</span>
        <b className="ai-drop__pct">↓ {pct}%</b>
      </div>
      <div className="ai-drop__row">
        <small>Start</small>
        <div className="cs__track">
          <i
            className="is-old"
            style={{
              width: inView ? "100%" : "0%",
              transition: "width 1s ease",
            }}
          />
        </div>
        <b>₹{from}</b>
      </div>
      <div className="ai-drop__row">
        <small>Now</small>
        <div className="cs__track">
          <i
            style={{
              width: inView ? `${Math.max(6, (to / from) * 100)}%` : "100%",
              transition: "width 1.4s 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>
        <b>₹{to}</b>
      </div>
    </div>
  );
}

export default function CaseStudyAIMetaGoogleAds() {
  return (
    <div className="cs ex-cs ai-cs" id="work-ai-agents">
      <div className="head center text-center flex flex-col items-center gap-2">
        <span className="eyebrow center self-center inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef8fa] text-[13px] font-bold text-[#0b4db5] shadow-[4px_4px_10px_rgba(20,84,120,0.12),-4px_-4px_10px_rgba(255,255,255,0.9)] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f5b82e]">
          Case study · Google Ads + Meta Ads
        </span>
        <h2 className="h2 m-0 font-sans text-[clamp(28px,3.6vw,44px)] font-extrabold tracking-[-0.02em] text-[#0e1b2e] leading-tight">
          <span className="hl text-[#0b4db5]">2,100+ AI agent leads</span> and a 6-month sales pipeline
        </h2>
        <p className="lead m-0 text-base sm:text-[17px] text-[#5b6b80] max-w-[700px] leading-relaxed">
          Lead-generation campaigns for AI agents built for Indian businesses — run across Google and Meta, with cost per lead cut by up to 84%.
        </p>
      </div>

      <div className="cs__panel neu ai-cs__panel">
        {/* Left Column: Strategy & Facts */}
        <div className="cs__media">
          <div className="ai-strategy">
            <span className="ai-strategy__title">Strategy & outcome</span>
            <ol>
              {strategies.map((item, idx) => (
                <li key={idx}>
                  <span className="ai-strategy__n">{idx + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <ul className="cs__facts">
            <li>
              <span>Platforms</span>
              Google Ads + Meta Ads
            </li>
            <li>
              <span>Market</span>
              Indian businesses
            </li>
            <li>
              <span>Offer</span>
              AI agents · free trial
            </li>
            <li>
              <span>Period</span>
              Feb – May 2025
            </li>
          </ul>
        </div>

        {/* Right Column: Platform Results Cards */}
        <div className="cs__data">
          {platforms.map((plat) => (
            <div key={plat.key} className={`ai-plat ai-plat--${plat.key}`}>
              <div className="ai-plat__head">
                <b>{plat.name}</b>
                <small>{plat.tag}</small>
              </div>
              <div className="cs__kpis">
                {plat.kpis.map((kpi, kidx) => (
                  <div key={kpi.label} className={`cs__kpi ${kidx === 0 ? "cs__kpi--hero" : ""}`}>
                    <b>
                      <AnimatedNumber
                        to={kpi.to}
                        prefix={kpi.prefix}
                        suffix={kpi.suffix}
                        decimals={kpi.decimals || 0}
                      />
                    </b>
                    <span>{kpi.label}</span>
                  </div>
                ))}
              </div>
              <CostDropBar from={plat.from} to={plat.toCpl} />
            </div>
          ))}
        </div>
      </div>

      {/* Proof Gallery */}
      <div className="ai-proof">
        <figure className="cs__proof ai-proof__g">
          <img
            src="/assets/work/ai-agent-google-ads.jpg"
            alt="Google Ads dashboard: 3.26K clicks, ₹20.54 cost per conversion, 1.43K conversions, ₹29.3K cost"
            loading="lazy"
          />
          <figcaption>Google Ads · 10 Feb – 26 May 2025</figcaption>
        </figure>
        <div className="ai-proof__m">
          <figure className="cs__proof">
            <img
              src="/assets/work/ai-agent-meta-month.jpg"
              alt="Meta Ads initial month: ₹357.90 cost per lead"
              loading="lazy"
            />
            <figcaption>Meta Ads · initial month (₹357.90 per lead)</figcaption>
          </figure>
          <figure className="cs__proof">
            <img
              src="/assets/work/ai-agent-meta-overall.jpg"
              alt="Meta Ads overall: 377 and 330 leads, ₹56.37 best cost per lead"
              loading="lazy"
            />
            <figcaption>Meta Ads · overall (377 + 330 leads)</figcaption>
          </figure>
        </div>
      </div>

      <div className="cs__cta" style={{ justifyContent: "center" }}>
        <Link href="/reach-to-us" className="btn btn-blue btn-glow">
          <span>Plan my lead campaign</span> <span className="arr">→</span>
        </Link>
      </div>
    </div>
  );
}


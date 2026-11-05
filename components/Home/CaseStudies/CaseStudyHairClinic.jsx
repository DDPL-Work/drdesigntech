"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import AnimatedNumber from "./AnimatedNumber";

const metaItems = [
  ["Sector", "Hair transplant surgery"],
  ["Engagement", "PPC & Google Ads management"],
  ["Includes", "Conversion-built landing page"],
  ["Duration", "18 months running"],
];

const failItems = [
  "Agencies treat a $5,000–$15,000 procedure like a $150 teeth-whitening lead.",
  "Broad-match keywords burn budget on clicks that never book.",
  "No healthcare policy review — ad claims trip Google’s speculative procedures policy.",
  "Every click lands on a homepage that was never built to convert.",
  "Cost per lead creeps past $300 — then the account is suspended without warning.",
];

const frameworkPillars = [
  {
    ic: "🛡️",
    t: "Compliance-first",
    d: "Ad copy and claims reviewed against Google’s healthcare and speculative procedures policies before launch — no surprise suspensions.",
  },
  {
    ic: "🎯",
    t: "Searches that book consults",
    d: "Keyword structure tuned to high-intent hair transplant searches, filtering the broad-match clicks that never convert.",
  },
  {
    ic: "🚀",
    t: "Conversion-built landing page",
    d: "Every engagement includes a dedicated landing page that turns paid clicks into booked consultations and deposits.",
  },
];

const kpiItems = [
  { to: 200, suffix: "+", label: "qualified consults every month" },
  { to: 80, prefix: "<$", label: "cost per lead (sub-$80 CPL)" },
  { to: 15, suffix: "%+", label: "landing page conversion rate" },
  { to: 18, label: "months running, zero suspensions" },
];

export default function CaseStudyHairClinic() {
  const [inView, setInView] = useState(false);
  const vsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    if (vsRef.current) observer.observe(vsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="cs ex-cs hr-cs" id="work-hair-clinic">
      <div className="head center text-center flex flex-col items-center gap-2">
        <Reveal as="span" className="eyebrow center self-center inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef8fa] text-[13px] font-bold text-[#0b4db5] shadow-[4px_4px_10px_rgba(20,84,120,0.12),-4px_-4px_10px_rgba(255,255,255,0.9)] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f5b82e]">
          Case study · PPC & Google Ads · Healthcare
        </Reveal>
        <Reveal as="h2" className="h2 m-0 font-sans text-[clamp(28px,3.6vw,44px)] font-extrabold tracking-[-0.02em] text-[#0e1b2e] leading-tight">
          <span className="hl text-[#0b4db5]">200+ qualified consults a month</span> for a hair transplant clinic
        </Reveal>
        <Reveal as="p" className="lead m-0 text-base sm:text-[17px] text-[#5b6b80] max-w-[700px] leading-relaxed">
          Clicks are cheap. Booked procedures are the only number that actually pays the surgeons — so we built the account around compliance, high-intent searches and a landing page made to convert.
        </Reveal>
      </div>

      <div className="ex-meta">
        {metaItems.map(([label, val]) => (
          <div key={label} className="ex-meta__item neu-s">
            <span>{label}</span>
            <b>{val}</b>
          </div>
        ))}
      </div>

      <div className="cs__panel neu ex-panel">
        {/* Left: Why most fail */}
        <div className="ex-before">
          <span className="ex-label ex-label--red">Why most clinic Google Ads fail</span>
          <ul>
            {failItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p className="hr-quote">
            “Google Ads works fine. It fails when it’s run like any other lead-gen account.”
          </p>
        </div>

        {/* Right: Our PPC framework */}
        <div className="ex-steps">
          <span className="ex-label">Our PPC framework</span>
          <div className="hr-pillars">
            {frameworkPillars.map((p) => (
              <div key={p.t} className="ex-step hr-pillar">
                <span className="hr-pillar__ic" aria-hidden="true">{p.ic}</span>
                <div>
                  <b>{p.t}</b>
                  <p>{p.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="hr-vs" ref={vsRef}>
            <span className="ex-label">Where paid clicks become booked patients</span>
            <div className="co-row hr-vs__row">
              <div className="co-row__k">Industry average</div>
              <div className="co-bar co-bar--a">
                <i
                  style={{
                    width: inView ? "16%" : "0%",
                    transition: "width 0.9s ease",
                  }}
                />
                <span>2.4%</span>
              </div>
            </div>
            <div className="co-row hr-vs__row">
              <div className="co-row__k">Our landing pages</div>
              <div className="co-bar co-bar--b">
                <i
                  style={{
                    width: inView ? "100%" : "0%",
                    transition: "width 1.3s 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
                <span>15%+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proof & KPIs */}
      <div className="ex-proof">
        <span className="ex-label center">Results · predictable lead flow, every month</span>
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
            </div>
          ))}
        </div>

        <figure className="cs__proof ex-shot">
          <img
            src="/assets/work/hair-clinic-google-ads.jpg"
            alt="Google Ads dashboard: 232.32 conversions, 20.11% conversion rate, $29.11 cost per conversion"
            loading="lazy"
          />
          <figcaption>
            Live Google Ads reporting: 232.32 conversions, 20.11% conversion rate, $29.11 cost per conversion, 4.23% CTR. Clinic details hidden for privacy.
          </figcaption>
        </figure>
      </div>

      <div className="cs__cta" style={{ justifyContent: "center" }}>
        <Link href="/reach-to-us?service=seo#contact" className="btn btn-blue btn-glow">
          <span>Get more booked consults</span> <span className="arr">→</span>
        </Link>
      </div>
    </div>
  );
}


"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import AnimatedNumber from "./AnimatedNumber";

const metaItems = [
  ["Industry", "Education · Banking & finance courses"],
  ["Market", "India"],
  ["Channel", "Meta Ads (Facebook & Instagram)"],
  ["Goal", "More conversions at a lower cost"],
];

const topKpis = [
  { to: 154.6, prefix: "+", suffix: "%", decimals: 1, label: "total conversions" },
  { to: 225.6, prefix: "+", suffix: "%", decimals: 1, label: "conversion rate" },
  { to: 22.4, prefix: "↓ ", suffix: "%", decimals: 1, label: "cost per conversion" },
  { to: 50.8, prefix: "+", suffix: "%", decimals: 1, label: "clicks" },
];

const whatWeDid = [
  {
    t: "Segmented budget allocation",
    d: "Daily budget split across ad sets by audience intent (cold vs warm), course demand (investment banking, NISM, mutual funds) and device / location. Budgets of ₹1,500–₹2,000/day were scaled up gradually — sudden spend spikes can trigger automated account reviews and temporary suspensions.",
  },
  {
    t: "Scroll-stopping creative",
    d: "Student testimonials, short success stories, finance-career outcome stats and carousel ads with course highlights — every creative tied to outcomes, job prospects and real credibility.",
  },
  {
    t: "Ad copy testing & clear CTAs",
    d: "15+ ad copies A/B tested: headlines like “Get Certified in 30 Days” and “Build a Career in Banking”, urgency like “Limited Seats | ₹1999 Only”, and CTAs “Enroll Now”, “Download Brochure”, “Book Free Demo”.",
  },
  {
    t: "Conversion-optimised landing pages",
    d: "Short, benefit-focused content, a clear curriculum breakdown, trust badges and success metrics — so traffic didn’t just land, it converted.",
  },
  {
    t: "Continuous daily optimisation",
    d: "Underperforming ad sets paused, budget moved to winners, and targeting adjusted by age, city and interest trends — scaling spend while keeping cost per conversion under control.",
  },
];

const budgetGroups = [
  { b: "₹1,500/day", c: "+259.46%", cost: "−56.75%", w: 100 },
  { b: "₹1,500/day (shared)", c: "+213.33%", cost: "−4.15%", w: 82 },
  { b: "₹1,500/day (shared)", c: "+76.47%", cost: "−34.98%", w: 29 },
  { b: "₹2,000/day", c: "+26.99%", cost: "−21.23%", w: 10 },
];

export default function CaseStudyFinanceCourses() {
  const [inView, setInView] = useState(false);
  const sideRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.25 }
    );
    if (sideRef.current) observer.observe(sideRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="cs ex-cs fin-cs" id="work-finance-courses">
      <div className="head center text-center flex flex-col items-center gap-2">
        <Reveal as="span" className="eyebrow center self-center inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef8fa] text-[13px] font-bold text-[#0b4db5] shadow-[4px_4px_10px_rgba(20,84,120,0.12),-4px_-4px_10px_rgba(255,255,255,0.9)] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f5b82e]">
          Case study · Paid ads · Education
        </Reveal>
        <Reveal as="h2" className="h2 m-0 font-sans text-[clamp(28px,3.6vw,44px)] font-extrabold tracking-[-0.02em] text-[#0e1b2e] leading-tight">
          <span className="hl text-[#0b4db5]">+154.6% conversions</span> for banking & finance courses in India
        </Reveal>
        <Reveal as="p" className="lead m-0 text-base sm:text-[17px] text-[#5b6b80] max-w-[700px] leading-relaxed">
          The brief: drive quality leads and enrolments for banking and finance courses across India — maximising conversions while keeping cost per conversion low in a crowded education ad space.
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

      {/* 4 KPIs */}
      <div className="ex-kpis">
        {topKpis.map((kpi, idx) => (
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

      {/* Main Panel */}
      <div className="cs__panel neu ex-panel fin-panel">
        <div className="ex-steps">
          <span className="ex-label">What we did</span>
          <div className="fin-steps">
            {whatWeDid.map((step, idx) => (
              <div key={step.t} className="ex-step">
                <span className="ex-step__n">{String(idx + 1).padStart(2, "0")}</span>
                <b>{step.t}</b>
                <p>{step.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="fin-side" ref={sideRef}>
          <span className="ex-label">Conversion uplift by budget group</span>
          {budgetGroups.map((bg, idx) => (
            <div className="pt-set" key={bg.b + idx}>
              <div className="pt-set__top">
                <b>{bg.b}</b>
                <span className="pt-set__nums">
                  <strong>{bg.c}</strong> conversions · {bg.cost} cost
                </span>
              </div>
              <div className="cs__track">
                <i
                  className={idx === 0 ? "is-chat" : ""}
                  style={{
                    width: inView ? `${bg.w}%` : "0%",
                    transition: `width 1.1s ${idx * 0.1}s cubic-bezier(0.16, 1, 0.3, 1)`,
                  }}
                />
              </div>
            </div>
          ))}

          <div className="fin-badges">
            <div>
              <b>119+</b>
              <span>impression-assisted conversions</span>
            </div>
            <div>
              <b>76.47%</b>
              <span>uplift from another high-performing budget group, at lower cost</span>
            </div>
          </div>
        </div>
      </div>

      {/* Proof Report */}
      <figure className="cs__proof ex-shot">
        <img
          src="/assets/work/finance-courses-ads-report.jpg"
          alt="Ads report comparing periods: conversions up 259%, 213%, 76% and 27% by budget group, with lower cost per conversion"
          loading="lazy"
        />
        <figcaption>
          Live campaign report · period-over-period change in conversions and cost per conversion. Campaign and budget names hidden.
        </figcaption>
      </figure>

      <div className="cs__cta" style={{ justifyContent: "center" }}>
        <Link href="/reach-to-us" className="btn btn-blue btn-glow">
          <span>Get more enrolments</span> <span className="arr">→</span>
        </Link>
      </div>
    </div>
  );
}


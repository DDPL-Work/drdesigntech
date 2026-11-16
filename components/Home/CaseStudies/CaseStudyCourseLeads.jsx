"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import AnimatedNumber from "./AnimatedNumber";

const metaItems = [
  ["Industry", "Education · professional training course"],
  ["Platform", "Meta Ads (Facebook & Instagram)"],
  ["Objective", "Lead form enquiries → enrolments"],
  ["Campaigns", "3 lead campaigns · Jul – Aug 2026"],
];

const topKpis = [
  { to: 15.85, suffix: "X", decimals: 2, label: "revenue-based ROAS" },
  { to: 678, label: "lead form enquiries" },
  { to: 37.21, prefix: "₹", decimals: 2, label: "overall cost per lead" },
  { to: 80, label: "students enrolled" },
];

const glanceItems = [
  ["₹25,228.74", "Total Meta Ads investment"],
  ["1,35,966", "Total impressions"],
  ["4", "Batches completed"],
  ["₹5,000", "Course fee per student"],
  ["₹4,00,000", "Total course revenue"],
];

const campaigns = [
  { n: "Lead campaign — July", l: 412, sp: "₹14,078.73", cpl: "₹34.17" },
  { n: "Lead campaign — August", l: 250, sp: "₹7,879.25", cpl: "₹31.52" },
  { n: "Lead campaign — August (test)", l: 16, sp: "₹3,270.76", cpl: "₹204.42" },
];

const funnelSteps = [
  { k: "Impressions", v: "1,35,966", w: 100 },
  { k: "Lead enquiries", v: "678", w: 55 },
  { k: "Students enrolled", v: "80", w: 30 },
];

export default function CaseStudyCourseLeads() {
  const [inView, setInView] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    if (panelRef.current) observer.observe(panelRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="cs ex-cs crs-cs" id="work-course-leads">
      <div className="head center text-center flex flex-col items-center gap-2">
        <Reveal as="span" className="eyebrow center self-center inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef8fa] text-[13px] font-bold text-[#0b4db5] shadow-[4px_4px_10px_rgba(20,84,120,0.12),-4px_-4px_10px_rgba(255,255,255,0.9)] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f5b82e]">
          Case study · Meta Ads · Education
        </Reveal>
        <Reveal as="h2" className="h2 m-0 font-sans text-[clamp(28px,3.6vw,44px)] font-extrabold tracking-[-0.02em] text-[#0e1b2e] leading-tight">
          <span className="hl text-[#0b4db5]">15.85X return</span>: ₹25K in ads turned into ₹4 lakh in course fees
        </Reveal>
        <Reveal as="p" className="lead m-0 text-base sm:text-[17px] text-[#5b6b80] max-w-[700px] leading-relaxed">
          Lead-form campaigns on Facebook and Instagram for a professional training course — 678 enquiries at ₹37.21 each, 80 students enrolled across 4 completed batches.
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

      {/* 4 KPIs grid */}
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
      <div className="cs__panel neu sp-panel" ref={panelRef}>
        <div>
          <span className="ex-label">From ad view to enrolment</span>
          <div className="sw-funnel">
            {funnelSteps.map((step, idx) => (
              <div key={step.k} className="sw-step">
                <div
                  className="sw-step__bar"
                  style={{
                    width: inView ? `${step.w}%` : "0%",
                    transition: `width 1s ${idx * 0.12}s cubic-bezier(0.16, 1, 0.3, 1)`,
                  }}
                >
                  <b>{step.v}</b>
                </div>
                <span>{step.k}</span>
              </div>
            ))}
          </div>
          <div className="crs-glance">
            {glanceItems.map(([val, label]) => (
              <div key={label}>
                <b>{val}</b>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="fin-side">
          <span className="ex-label">Campaign breakdown</span>
          {campaigns.map((camp, idx) => (
            <div key={camp.n} className="pt-set">
              <div className="pt-set__top">
                <b>{camp.n}</b>
                <span className="pt-set__nums">
                  <strong>{camp.l}</strong> leads · {camp.sp} · {camp.cpl}/lead
                </span>
              </div>
              <div className="cs__track">
                <i
                  className={idx === 1 ? "is-chat" : ""}
                  style={{
                    width: inView ? `${(camp.l / 412) * 100}%` : "0%",
                    transition: `width 1.1s ${idx * 0.1}s cubic-bezier(0.16, 1, 0.3, 1)`,
                  }}
                />
              </div>
            </div>
          ))}

          <div className="fin-badges">
            <div>
              <b>678 leads · ₹37.21</b>
              <span>total across all campaigns, from ₹25,228.74 spend</span>
            </div>
            <div>
              <b>₹4,00,000 ÷ ₹25,228.74</b>
              <span>= 15.85X revenue return on ad spend</span>
            </div>
          </div>
        </div>
      </div>

      {/* Proof */}
      <figure className="cs__proof ex-shot">
        <img
          src="/assets/work/course-leads-meta-ads.jpg"
          alt="Meta Ads Manager lead campaigns: 246 and 79 form leads at ₹31.46 and ₹46.84 per lead"
          loading="lazy"
        />
        <figcaption>
          Meta Ads Manager · lead form campaigns (last 30 days view). Campaign names hidden.
        </figcaption>
      </figure>

      <div className="cs__cta" style={{ justifyContent: "center" }}>
        <Link href="/reach-to-us?service=social#contact" className="btn btn-blue btn-glow">
          <span>Fill your next batch</span> <span className="arr">→</span>
        </Link>
      </div>
    </div>
  );
}

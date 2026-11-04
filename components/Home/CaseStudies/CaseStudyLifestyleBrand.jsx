"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import AnimatedNumber from "./AnimatedNumber";

const metaItems = [
  ["Sector", "E-commerce · apparel & nutrition"],
  ["Location", "India"],
  ["Duration", "6 months (ongoing retainer)"],
  ["Team", "Performance marketer, creative designer, analyst"],
];

const topKpis = [
  { to: 3134, prefix: "+", suffix: "%", label: "return on ad spend" },
  { to: 12.3, suffix: "x", decimals: 1, label: "ROAS (₹2.89M revenue on ₹235K)" },
  { to: 1286, label: "purchases in 30 days" },
  { to: 96, prefix: "↓ ", suffix: "%", label: "cost per purchase" },
];

const problems = [
  ["Ads that did not pay back", "Spend on Meta and Google was returning less revenue than it cost."],
  ["A thin product feed", "Shopping ads ran from a feed with short titles, missing attributes and disapproved products."],
  ["Blind spots in tracking", "Purchases were under-reported, so campaigns optimised towards the wrong signals."],
];

const challenges = [
  ["Two very different ranges", "Apparel and nutrition each got their own campaigns, budgets and ROAS targets."],
  ["Creative fatigue", "A weekly testing rhythm kept fresh creative ready to replace winners as they wore out."],
  ["Scaling without losing return", "Budgets raised in steps, only on campaigns that held ROAS for a full week."],
];

const whatWeBuilt = [
  ["Tracking you can trust", "Pixel, Conversions API and GA4 purchase events reconciled against store orders."],
  ["Rebuilt Shopping feed", "Optimised titles, attributes and custom labels in Google Merchant Center."],
  ["Full-funnel Meta structure", "Prospecting, retargeting and dynamic catalogue ads with clean audiences."],
  ["Weekly creative testing", "New hooks, formats and offers tested every week across feed, Stories and Reels."],
  ["ROAS dashboard", "Spend, revenue and ROAS by channel, campaign and product in Looker Studio."],
];

const timeline = [
  ["Weeks 1–2", "Audit & tracking", "Audited both ad accounts; fixed Pixel, Conversions API and GA4."],
  ["Weeks 3–4", "Feed & structure", "Rebuilt the Merchant Center feed and restructured Meta and Google."],
  ["Weeks 5–6", "Launch", "Shopping, Performance Max and full-funnel Meta campaigns live."],
  ["Ongoing", "Creative testing", "New creatives weekly; fatigued ads retired."],
  ["Month 3+", "Scale", "Budget moved to the best products and audiences, reported weekly."],
];

const channels = [
  { k: "Google — Shopping", sp: "₹88,560", rev: "₹12.14L", roas: "13.71x", w: 42 },
  { k: "Meta — Prospecting", sp: "₹95,423", rev: "₹8.35L", roas: "8.76x", w: 28.9 },
  { k: "Meta — Retargeting & catalogue", sp: "₹42,566", rev: "₹7.25L", roas: "17.04x", w: 25.1 },
  { k: "Google — Brand search", sp: "₹8,452", rev: "₹1.16L", roas: "13.68x", w: 4 },
];

export default function CaseStudyLifestyleBrand() {
  return (
    <div className="cs ex-cs ls-cs" id="work-lifestyle-brand">
      {/* Header */}
      <div className="head center text-center flex flex-col items-center gap-2 px-2">
        <Reveal as="span" className="eyebrow center self-center inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef8fa] text-[13px] font-bold text-[#0b4db5] shadow-[4px_4px_10px_rgba(20,84,120,0.12),-4px_-4px_10px_rgba(255,255,255,0.9)] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f5b82e]">
          Case study · Meta Ads + Google Shopping
        </Reveal>
        <Reveal as="h2" className="h2 m-0 font-sans text-[clamp(24px,3.6vw,44px)] font-extrabold tracking-[-0.02em] text-[#0e1b2e] leading-tight text-center">
          Meta & Google Shopping ads that lifted <span className="hl text-[#0b4db5]">ROAS by 3,134%</span>
        </Reveal>
        <Reveal as="p" className="lead m-0 text-[15px] sm:text-[17px] text-[#5b6b80] max-w-[700px] leading-relaxed text-center px-1">
          Paid social and Shopping campaigns for a performance lifestyle brand selling apparel and nutrition online — a rebuilt product feed, full-funnel Meta campaigns and weekly creative testing turned paid media from losing money into one of its most profitable channels.
        </Reveal>
      </div>

      {/* Meta Pills */}
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

      {/* Problem & What We Built Panel */}
      <div className="cs__panel neu ex-panel">
        <div className="ex-before">
          <span className="ex-label ex-label--red">The problem</span>
          <ul>
            {problems.map(([head, desc]) => (
              <li key={head}>
                <b>{head}.</b> {desc}
              </li>
            ))}
          </ul>

          <span className="ex-label ex-label--red" style={{ marginTop: 18 }}>
            Challenges we solved
          </span>
          <ul>
            {challenges.map(([head, desc]) => (
              <li key={head}>
                <b>{head}.</b> {desc}
              </li>
            ))}
          </ul>
        </div>

        <div className="ex-steps">
          <span className="ex-label">What we built</span>
          <div className="fin-steps">
            {whatWeBuilt.map(([head, desc], idx) => (
              <motion.div
                key={head}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: idx * 0.07 }}
                className="ex-step"
              >
                <span className="ex-step__n">{String(idx + 1).padStart(2, "0")}</span>
                <b>{head}</b>
                <p>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 5 Timeline Cards: Our approach */}
      <div>
        <span className="ex-label center">Our approach</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {timeline.map(([period, phase, desc], idx) => (
            <Reveal
              key={phase}
              delay={idx * 0.07}
              className={`co-res neu ${idx === 4 ? "is-hero" : ""}`}
            >
              <small>{period}</small>
              <b>{phase}</b>
              <p className={`mt-2 text-[13.5px] leading-[1.55] ${idx === 4 ? "text-[#dbe7ff]" : "text-[#5b6b80]"}`}>
                {desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Revenue by Channel Panel */}
      <Reveal className="cs__panel neu pt-sets">
        <span className="ex-label">Revenue by channel · last 30 days</span>
        {channels.map((ch, idx) => (
          <div key={ch.k} className="pt-set">
            <div className="pt-set__top">
              <b>{ch.k}</b>
              <span className="pt-set__nums">
                <strong>{ch.roas}</strong> ROAS · {ch.rev} revenue · {ch.sp} spend
              </span>
            </div>
            <div className="cs__track">
              <motion.i
                initial={{ width: 0 }}
                whileInView={{ width: `${(ch.w / 42) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: idx * 0.08 }}
                className={idx === 2 ? "is-chat" : ""}
              />
            </div>
          </div>
        ))}
      </Reveal>

      {/* Proof Pair */}
      <div className="co-proof">
        <span className="ex-label center">Proof · ROAS report & Meta Ads Manager</span>
        <div className="co-proof__pair">
          <Reveal as="figure" className="cs__proof">
            <img
              src="/assets/work/lifestyle-roas-report.jpg"
              alt="ROAS report: ₹235K spend, ₹2.89M revenue, 12.30 ROAS, 1,286 purchases"
              loading="lazy"
            />
            <figcaption>ROAS dashboard · 18 Aug – 16 Sep 2025 vs March 2025</figcaption>
          </Reveal>
          <Reveal as="figure" className="cs__proof">
            <img
              src="/assets/work/lifestyle-meta-ads.jpg"
              alt="Meta Ads Manager: 744 purchases at ₹185 each, 11.31 purchase ROAS"
              loading="lazy"
            />
            <figcaption>Meta Ads · 744 purchases at 11.31x ROAS. Brand and campaign names hidden.</figcaption>
          </Reveal>
        </div>
      </div>

      {/* CTA Button */}
      <Reveal className="cs__cta flex justify-center mt-6 sm:mt-8 w-full">
        <Link href="/reach-to-us" className="btn btn-blue btn-glow w-full max-w-[320px] sm:w-auto text-center justify-center">
          <span>Make your ads profitable</span> <span className="arr">→</span>
        </Link>
      </Reveal>
    </div>
  );
}


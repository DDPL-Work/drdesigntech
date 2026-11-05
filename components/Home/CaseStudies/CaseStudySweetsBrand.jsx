"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import AnimatedNumber from "./AnimatedNumber";

const metaItems = [
  ["Category", "Sweets & confectionery · D2C e-commerce"],
  ["Platform", "Meta Ads (Facebook & Instagram)"],
  ["Period", "13 Feb – 17 Mar 2025"],
  ["Scale", "22 campaigns"],
];

const topKpis = [
  { to: 11.98, prefix: "₹", suffix: "L", decimals: 2, label: "revenue from purchases" },
  { to: 2003, label: "online orders" },
  { to: 4.34, suffix: "x", decimals: 2, label: "ROAS on the top campaign" },
  { to: 5.26, prefix: "₹", decimals: 2, label: "average cost per click" },
];

const funnelSteps = [
  { k: "Video plays", v: "17.4L", w: 100 },
  { k: "Clicks", v: "83,572", w: 62 },
  { k: "Adds to cart", v: "13,342", w: 40 },
  { k: "Purchases", v: "2,003", w: 24 },
];

const topCampaigns = [
  { p: 1167, rev: "₹6.96L", roas: "4.34x" },
  { p: 354, rev: "₹2.14L", roas: "1.71x" },
  { p: 118, rev: "₹58.6K", roas: "1.55x" },
  { p: 81, rev: "₹45.7K", roas: "1.95x" },
  { p: 66, rev: "₹39.6K", roas: "1.95x" },
];

export default function CaseStudySweetsBrand() {
  return (
    <div className="cs ex-cs sw-cs" id="work-sweets-brand">
      {/* Header */}
      <div className="head center text-center flex flex-col items-center gap-2 px-2">
        <Reveal as="span" className="eyebrow center self-center inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef8fa] text-[13px] font-bold text-[#0b4db5] shadow-[4px_4px_10px_rgba(20,84,120,0.12),-4px_-4px_10px_rgba(255,255,255,0.9)] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f5b82e]">
          Case study · Meta Ads · D2C e-commerce
        </Reveal>
        <Reveal as="h2" className="h2 m-0 font-sans text-[clamp(24px,3.6vw,44px)] font-extrabold tracking-[-0.02em] text-[#0e1b2e] leading-tight text-center">
          <span className="hl text-[#0b4db5]">₹11.98 lakh in sales</span> and 2,003 orders for a sweets brand
        </Reveal>
        <Reveal as="p" className="lead m-0 text-[15px] sm:text-[17px] text-[#5b6b80] max-w-[700px] leading-relaxed text-center px-1">
          Video-led Facebook and Instagram campaigns for an Indian sweets and confectionery brand — turning 17 lakh+ video plays into thousands of carts and paid orders in just over a month.
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

      {/* Funnel & Top 5 Campaigns Panel */}
      <Reveal className="cs__panel neu sp-panel">
        {/* Left Column: Video to Order Funnel */}
        <div>
          <span className="ex-label">From video view to order</span>
          <div className="sw-funnel">
            {funnelSteps.map((step, idx) => (
              <div key={step.k} className="sw-step">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${step.w}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="sw-step__bar"
                >
                  <b>{step.v}</b>
                </motion.div>
                <span>{step.k}</span>
              </div>
            ))}
          </div>

          <div className="fin-badges sw-badges">
            <div>
              <b>16%</b>
              <span>of clicks became add-to-carts</span>
            </div>
            <div>
              <b>170</b>
              <span>messaging conversations from ads</span>
            </div>
          </div>
        </div>

        {/* Right Column: Top 5 Campaigns */}
        <div className="fin-side">
          <span className="ex-label">Top 5 campaigns by orders</span>
          <div className="flex flex-col gap-3.5">
            {topCampaigns.map((c, idx) => (
              <div key={idx} className="pt-set">
                <div className="pt-set__top">
                  <b>Campaign {idx + 1}</b>
                  <span className="pt-set__nums">
                    <strong>{c.p.toLocaleString("en-IN")}</strong> orders · {c.rev} · {c.roas} ROAS
                  </span>
                </div>
                <div className="cs__track">
                  <motion.i
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(c.p / 1167) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: idx * 0.08 }}
                    className={idx === 0 ? "is-chat" : ""}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Proof Screenshot */}
      <Reveal as="figure" className="cs__proof ex-shot">
        <img
          src="/assets/work/sweets-meta-ads.jpg"
          alt="Meta Ads Manager: 22 campaigns, 2,003 purchases, ₹11,97,992 purchase value, 2.72 average ROAS"
          loading="lazy"
        />
        <figcaption>
          Meta Ads Manager · 13 Feb – 17 Mar 2025 · 22 campaigns. Brand and campaign names hidden.
        </figcaption>
      </Reveal>

      {/* CTA Button */}
      <Reveal className="cs__cta flex justify-center mt-6 sm:mt-8 w-full">
        <Link href="/reach-to-us?service=social#contact" className="btn btn-blue btn-glow w-full max-w-[320px] sm:w-auto text-center justify-center">
          <span>Grow your online sales</span> <span className="arr">→</span>
        </Link>
      </Reveal>
    </div>
  );
}

"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import AnimatedNumber from "./AnimatedNumber";

const metaItems = [
  ["Category", "Sporting goods store"],
  ["Campaign type", "Google Ads · Performance Max"],
  ["Duration", "3 months · Sep – Nov 2025"],
  ["Total ad spend", "₹1.27 Lakhs"],
];

const topKpis = [
  { to: 8.13, suffix: "x", decimals: 2, label: "ROAS achieved" },
  { to: 10.3, prefix: "₹", suffix: "L+", decimals: 1, label: "total conversion value" },
  { to: 246, suffix: "+", label: "purchases" },
  { to: 1.86, prefix: "₹", decimals: 2, label: "average cost per click" },
];

const challenges = [
  "High ad spend with limited returns and inconsistent online sales",
  "No clear separation between prospecting, scaling and remarketing campaigns",
  "Unoptimised product feed and assets limiting Shopping and Performance Max visibility",
  "No strong remarketing strategy — missed conversions from high-intent users",
];

const objectives = [
  "Shift Google Ads from budget-heavy spending to a revenue-driven, profitable sales channel",
  "Improve ROAS while keeping a consistent, healthy volume of purchases",
  "Fix tracking and reporting gaps so every sale, product and campaign is measured",
  "Build a scalable structure that holds performance at higher budgets",
];

const stages = [
  {
    t: "Account & funnel analysis",
    items: [
      "Identified revenue leakage across campaigns",
      "Mapped the journey from discovery to purchase",
      "Segmented cold, warm and hot audiences",
    ],
  },
  {
    t: "Product & feed optimisation",
    items: [
      "Analysed top-performing SKUs and margins",
      "Optimised titles, descriptions and attributes",
      "Grouped products by demand and profitability",
    ],
  },
  {
    t: "Competitor & market research",
    items: [
      "Reviewed competitor pricing and ad positioning",
      "Identified demand trends and high-intent categories",
      "Found gaps in competitor strategies",
      "Finalised positioning before launch",
    ],
  },
  {
    t: "Strategic campaign setup",
    items: [
      "Performance Max campaigns with clear roles: prospecting, feed-based scaling and high-intent remarketing",
      "Asset groups aligned to product categories",
      "Smart budget allocation based on ROAS signals",
    ],
  },
];

const takeaways = [
  "High ad spend doesn’t guarantee sales — strategy does",
  "Performance Max works best when guided with structure and intent",
  "Product feed optimisation is critical to e-commerce success",
  "Remarketing unlocks higher ROAS",
  "Data-driven decisions outperform guesswork every time",
];

export default function CaseStudySportingGoods() {
  return (
    <div className="cs ex-cs sp-cs" id="work-sporting-goods">
      <div className="head center text-center flex flex-col items-center gap-2">
        <Reveal as="span" className="eyebrow center self-center inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef8fa] text-[13px] font-bold text-[#0b4db5] shadow-[4px_4px_10px_rgba(20,84,120,0.12),-4px_-4px_10px_rgba(255,255,255,0.9)] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f5b82e]">
          Case study · Google Ads · E-commerce
        </Reveal>
        <Reveal as="h2" className="h2 m-0 font-sans text-[clamp(28px,3.6vw,44px)] font-extrabold tracking-[-0.02em] text-[#0e1b2e] leading-tight">
          Sporting goods store: <span className="hl text-[#0b4db5]">8X+ ROAS in just 3 months</span>
        </Reveal>
        <Reveal as="p" className="lead m-0 text-base sm:text-[17px] text-[#5b6b80] max-w-[700px] leading-relaxed">
          A well-planned Google Ads strategy turned underperforming ads into consistent growth — ₹10.3 lakhs+ in sales from ₹1.27 lakhs of ad spend.
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

      {/* Challenges & Objectives */}
      <div className="cs__panel neu ex-panel sp-panel">
        <div className="ex-before">
          <span className="ex-label ex-label--red">Challenges</span>
          <ul>
            {challenges.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        </div>
        <div className="sp-obj">
          <span className="ex-label">Objectives</span>
          <ul>
            {objectives.map((o, idx) => (
              <li key={idx}>{o}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4 Stages */}
      <div>
        <span className="ex-label center">Our research & analysis — a four-stage deep-dive audit</span>
        <div className="sp-stages">
          {stages.map((st, idx) => (
            <div key={st.t} className={`co-res neu ${idx === 3 ? "is-hero" : ""}`}>
              <small>Stage {idx + 1}</small>
              <b>{st.t}</b>
              <ul>
                {st.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Proof Pair */}
      <div className="co-proof">
        <span className="ex-label center">Proof · Google Ads, 1 Sep – 30 Nov 2025</span>
        <div className="co-proof__pair">
          <figure className="cs__proof">
            <img
              src="/assets/work/sporting-goods-roas.jpg"
              alt="Google Ads: ₹127K cost, 8.13 conversion value per cost, 246.30 purchases, ₹1.03M conversion value"
              loading="lazy"
            />
            <figcaption>₹127K spend → ₹1.03M conversion value · 8.13x ROAS</figcaption>
          </figure>
          <figure className="cs__proof">
            <img
              src="/assets/work/sporting-goods-pmax.jpg"
              alt="Three Performance Max campaigns with ROAS of 7.13, 7.10 and 9.25"
              loading="lazy"
            />
            <figcaption>3 Performance Max campaigns · 68.1K clicks, 3.16M impressions. Campaign names hidden.</figcaption>
          </figure>
        </div>
      </div>

      {/* Takeaways */}
      <div className="ex-after">
        <span className="ex-label ex-label--green">Takeaways</span>
        <div className="ex-after__grid">
          {takeaways.map((item, idx) => (
            <p key={idx}>
              <span aria-hidden="true">✓</span>
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className="cs__cta" style={{ justifyContent: "center" }}>
        <Link href="/reach-to-us?service=seo#contact" className="btn btn-blue btn-glow">
          <span>Grow my store’s ROAS</span> <span className="arr">→</span>
        </Link>
      </div>
    </div>
  );
}


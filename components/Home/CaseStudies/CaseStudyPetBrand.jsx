"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import AnimatedNumber from "./AnimatedNumber";

const metaItems = [
  ["Sector", "Pet accessories & care"],
  ["Market", "Australia (Shopify)"],
  ["Platforms", "Google Ads (PMax & Shopping) + Meta Ads"],
  ["Engagement", "Growth Retainer · scaling profitably"],
];

const topKpis = [
  { to: 346.5, prefix: "$", suffix: "K", decimals: 1, label: "total online revenue (4 months)" },
  { to: 5.12, suffix: "x", decimals: 2, label: "blended ROAS across all channels" },
  { to: 2.34, suffix: "K", decimals: 2, label: "total purchases tracked" },
  { to: 40, prefix: "+", suffix: "%", label: "Shopping CTR uplift in 3 weeks" },
];

const titleComparisons = [
  ["“Deluxe Dog Collar”", "“Heavy-Duty Reflective Dog Collar with Quick-Release Buckle · Padded Neoprene”"],
  ["“Puppy Harness Set”", "“No-Pull Breathable Mesh Dog Harness with Leash for Small Dogs”"],
  ["“Pet Dematting Comb”", "“2-in-1 Undercoat Deshedding Tool for Shedding Dogs & Cats”"],
];

const scalingSteps = [
  ["Category Isolation", "Collars & harnesses separated from grooming and apparel so budget flows to the actual bestsellers."],
  ["Margin Tiering", "Products split by gross margin so high-margin SKUs can bid higher without sacrificing overall account profitability."],
  ["Asset Group Relevance", "Every asset group built with category-specific copy and lifestyle images matching the landing collection."],
  ["Signals & Audience Lists", "Customer lists segmented by 30/60/90-day purchasers fed into Performance Max as audience signals."],
];

const googleRows = [
  ["$251,032.48", "Total revenue"],
  ["1,380", "Purchases"],
  ["6.89x", "Conversion value / cost"],
  ["$36,448", "Ad spend"],
  ["$181.91", "Avg. order value"],
  ["$26.41", "Cost per purchase"],
];

const metaRows = [
  ["$95,502.76", "Total revenue"],
  ["963", "Purchases"],
  ["3.06x", "Blended ROAS"],
  ["$31,232", "Ad spend"],
  ["$99.17", "Avg. order value"],
  ["$32.43", "Cost per purchase"],
];

const metaAdSets = [
  {
    n: "Retargeting · DPA & website visitors",
    tag: "Highest ROAS",
    roas: 7.72,
    p: 261,
    rev: "$26,708",
    d: "Dynamic ads to past 30-day visitors and add-to-carts with testimonial overlays.",
  },
  {
    n: "Lookalike 1% · top purchasers",
    roas: 3.53,
    p: 108,
    rev: "$9,408",
    d: "Seeded from the highest-LTV customers (3+ repeat orders) instead of all purchasers.",
  },
  {
    n: "Interest-based targeting",
    roas: 2.93,
    p: 73,
    rev: "$6,606",
    d: "Breed-specific interest groups converted at 2–3x the rate of generic “pet owner” targeting.",
  },
  {
    n: "Broad prospecting",
    roas: 2.93,
    p: 264,
    rev: "$23,191",
    d: "The scale driver — broad targeting with strong creative, letting the algorithm find buyers.",
  },
  {
    n: "Volume driver",
    roas: 2.79,
    p: 365,
    rev: "$39,037",
    d: "Largest ad set by spend ($14,012) — profitable on first purchase, more so with 40–60% repeat rates.",
  },
];

export default function CaseStudyPetBrand() {
  const [inView, setInView] = useState(false);
  const setsRef = useRef(null);
  const maxRoas = Math.max(...metaAdSets.map((s) => s.roas));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.25 }
    );
    if (setsRef.current) observer.observe(setsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="cs ex-cs pt-cs" id="work-pet-brand">
      <div className="head center text-center flex flex-col items-center gap-2">
        <Reveal as="span" className="eyebrow center self-center inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef8fa] text-[13px] font-bold text-[#0b4db5] shadow-[4px_4px_10px_rgba(20,84,120,0.12),-4px_-4px_10px_rgba(255,255,255,0.9)] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f5b82e]">
          Case study · Google Ads + Meta Ads · E-commerce
        </Reveal>
        <Reveal as="h2" className="h2 m-0 font-sans text-[clamp(28px,3.6vw,44px)] font-extrabold tracking-[-0.02em] text-[#0e1b2e] leading-tight">
          <span className="hl text-[#0b4db5]">$346K in revenue at 5.12x ROAS</span> for a pet accessories brand
        </Reveal>
        <Reveal as="p" className="lead m-0 text-base sm:text-[17px] text-[#5b6b80] max-w-[700px] leading-relaxed">
          A Shopify pet accessories brand in Australia — collars, harnesses, grooming tools and pet apparel — with strong margins and solid repeat purchases, but no consistent ROAS after two previous agencies. Our team took over in February 2026 with one goal: make every ad dollar generate at least 5x in revenue.
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

      {/* Main Panel: Google Shopping Rebuild & Scaling Architecture */}
      <div className="cs__panel neu pt-panel">
        <div className="pt-col">
          <span className="ex-label">Google · Shopping feed rebuild</span>
          <p className="co-sub">
            Every product title was rewritten around what buyers actually search: product type, material or feature, and size or breed suitability — reverse-engineered from the account’s real search query data.
          </p>
          <div className="pt-titles">
            {titleComparisons.map(([oldT, newT], idx) => (
              <div key={idx} className="pt-title">
                <span className="pt-title__old">{oldT}</span>
                <span className="pt-title__arr" aria-hidden="true">→</span>
                <span className="pt-title__new">{newT}</span>
              </div>
            ))}
          </div>
          <div className="pt-flags">
            <div>
              <b>+40%</b>
              <span>Shopping CTR in the first three weeks from title optimisation alone</span>
            </div>
            <div>
              <b>Margin labels</b>
              <span>High-margin products (50%+) bid aggressively; low-margin add-ons capped — no more $15 of spend to sell a $12 product</span>
            </div>
          </div>
        </div>

        <div className="pt-col">
          <span className="ex-label">Campaign architecture built for scaling</span>
          <p className="co-sub">
            One campaign split into four by product category and margin tier — each with its own asset groups, headlines, descriptions and images.
          </p>
          <div className="ex-steps__grid">
            {scalingSteps.map(([title, desc], idx) => (
              <div key={title} className="ex-step">
                <span className="ex-step__n">{String(idx + 1).padStart(2, "0")}</span>
                <b>{title}</b>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Google Ads Results Block */}
      <div className="pt-block">
        <div className="pt-block__head">
          <span className="pt-dot pt-dot--g" />
          <b>Google Ads results</b>
          <small>Jan – Apr 2026</small>
        </div>
        <div className="pt-block__body">
          <div className="pt-res">
            {googleRows.map(([val, label], idx) => (
              <div key={label} className={`pt-res__i ${idx === 2 ? "is-hero" : ""}`}>
                <b>{val}</b>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <figure className="cs__proof">
            <img
              src="/assets/work/pet-brand-google-ads.jpg"
              alt="Google Ads dashboard: $251K purchase value, 1.38K purchases, 6.89 conversion value per cost"
              loading="lazy"
            />
            <figcaption>Google Ads · 1 Jan – 30 Apr 2026</figcaption>
          </figure>
        </div>
      </div>

      {/* Meta Ad Sets Breakdown */}
      <div className="cs__panel neu pt-sets" ref={setsRef}>
        <span className="ex-label">Meta · how each ad set performed</span>
        {metaAdSets.map((set, idx) => (
          <div className="pt-set" key={set.n}>
            <div className="pt-set__top">
              <b>
                {set.n} {set.tag && <em>{set.tag}</em>}
              </b>
              <span className="pt-set__nums">
                <strong>{set.roas}x</strong> ROAS · {set.p} purchases · {set.rev}
              </span>
            </div>
            <div className="cs__track">
              <i
                className={idx === 0 ? "is-chat" : ""}
                style={{
                  width: inView ? `${(set.roas / maxRoas) * 100}%` : "0%",
                  transition: `width 1.1s ${idx * 0.08}s cubic-bezier(0.16, 1, 0.3, 1)`,
                }}
              />
            </div>
            <p>{set.d}</p>
          </div>
        ))}
      </div>

      {/* Meta Ads Results Block */}
      <div className="pt-block">
        <div className="pt-block__head">
          <span className="pt-dot pt-dot--m" />
          <b>Meta Ads results</b>
          <small>Jan – May 2026</small>
        </div>
        <div className="pt-block__body">
          <div className="pt-res">
            {metaRows.map(([val, label], idx) => (
              <div key={label} className={`pt-res__i ${idx === 2 ? "is-hero" : ""}`}>
                <b>{val}</b>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <figure className="cs__proof">
            <img
              src="/assets/work/pet-brand-meta-ads.jpg"
              alt="Meta Ads Manager ad set results with purchase ROAS from 7.72 to 2.79"
              loading="lazy"
            />
            <figcaption>Meta Ads Manager · 1 Jan – 8 May 2026 · ad set names hidden</figcaption>
          </figure>
        </div>
        <p className="hr-quote">
          A 3.06x blended ROAS across prospecting, retargeting and lookalikes — with retargeting alone returning nearly $8 for every $1 spent. That’s a full-funnel Meta strategy, not boosted posts.
        </p>
      </div>

      <div className="cs__cta" style={{ justifyContent: "center" }}>
        <Link href="/reach-to-us" className="btn btn-blue btn-glow">
          <span>Scale my store’s ROAS</span> <span className="arr">→</span>
        </Link>
      </div>
    </div>
  );
}


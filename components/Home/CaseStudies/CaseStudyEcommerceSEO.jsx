"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AnimatedNumber from "./AnimatedNumber";

const metaItems = [
  ["Sector", "IT & networking e-commerce"],
  ["Market", "Thailand"],
  ["Catalogue", "400+ products · 5–7 core categories"],
  ["Service", "SEO — technical, on-page & off-page"],
];

const topKpis = [
  { to: 33.8, suffix: "K", decimals: 1, label: "clicks in 6 months (from 3.02K)" },
  { to: 1.44, suffix: "M", decimals: 2, label: "impressions (from 108K)" },
  { to: 20.3, suffix: "K", decimals: 1, label: "clicks in the last 3 months" },
  { to: 11.7, decimals: 1, label: "average position (from 14.4)" },
];

const compareRows = [
  { k: "Clicks", a: "3.02K", b: "33.8K", pa: 9, pb: 100, tag: "+1,019%" },
  { k: "Impressions", a: "108K", b: "1.44M", pa: 7.5, pb: 100, tag: "+1,233%" },
  { k: "Average position", a: "14.4", b: "11.7", pa: 60, pb: 100, tag: "↑ 2.7 places" },
];

const challenges = [
  "High-authority competitors dominate high-volume keywords like CCTV and fibre optic cables (10K+ searches a month).",
  "Limited branding budget compared with competitors, making it harder to compete on brand signals.",
];

const pillars = [
  {
    t: "Technical optimisation",
    items: [
      "Cleaned up low-quality pages — empty tag pages and duplicate blogs",
      "Removed bloated, duplicate pages that lowered overall site quality",
      "Fixed the linking structure",
    ],
  },
  {
    t: "On-page optimisation",
    items: [
      "H1, H2 & H3 heading optimisation",
      "New category pages built from keyword research (incl. sub-brands)",
      "Sentence-level optimisation with semantically relevant keywords",
      "Keyword frequency tuned against competitor averages — kept slightly lower to avoid over-optimisation",
      "Supporting blogs to capture extra traffic",
      "Internal linking with relevant anchor text",
    ],
  },
  {
    t: "Off-page optimisation",
    items: [
      "Branding guidance to drive direct engagement",
      "A steady flow of quality guest posts each month",
      "Links built strategically to the right pages with selected anchor text",
    ],
  },
];

export default function CaseStudyEcommerceSEO() {
  const [inView, setInView] = useState(false);
  const compareRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.25 }
    );
    if (compareRef.current) observer.observe(compareRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="cs ex-cs seo-cs" id="work-ecommerce-seo">
      <div className="head center text-center flex flex-col items-center gap-2">
        <span className="eyebrow center self-center inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef8fa] text-[13px] font-bold text-[#0b4db5] shadow-[4px_4px_10px_rgba(20,84,120,0.12),-4px_-4px_10px_rgba(255,255,255,0.9)] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f5b82e]">
          Case study · E-commerce SEO
        </span>
        <h2 className="h2 m-0 font-sans text-[clamp(28px,3.6vw,44px)] font-extrabold tracking-[-0.02em] text-[#0e1b2e] leading-tight">
          <span className="hl text-[#0b4db5]">1,000% increase in traffic</span> after 6 months of SEO
        </h2>
        <p className="lead m-0 text-base sm:text-[17px] text-[#5b6b80] max-w-[700px] leading-relaxed">
          An online store selling IT and networking products — CCTV, IoT devices, access control, fibre optic cables and more. Built on WordPress, with some DIY SEO before we took over. Website and keywords are kept private for the client’s security.
        </p>
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

      {/* Comparison Bars */}
      <div className="cs__panel neu co-compare" ref={compareRef}>
        <span className="ex-label">Last 6 months vs previous 6 months</span>
        {compareRows.map((row, idx) => (
          <div className="co-row" key={row.k}>
            <div className="co-row__k">{row.k}</div>
            <div className="co-row__bars">
              <div className="co-bar co-bar--a">
                <i
                  style={{
                    width: inView ? `${row.pa}%` : "0%",
                    transition: `width 0.9s ${idx * 0.08}s ease`,
                  }}
                />
                <span>{row.a}</span>
              </div>
              <div className="co-bar co-bar--b">
                <i
                  style={{
                    width: inView ? `${row.pb}%` : "0%",
                    transition: `width 1.3s ${0.3 + idx * 0.08}s cubic-bezier(0.16, 1, 0.3, 1)`,
                  }}
                />
                <span>{row.b}</span>
              </div>
            </div>
            <b className="co-row__tag is-up">{row.tag}</b>
          </div>
        ))}
      </div>

      {/* Challenges */}
      <div className="co-challenge">
        <span className="ex-label ex-label--red">The challenges</span>
        <div className="ex-before">
          <ul>
            {challenges.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3 SEO Steps */}
      <div className="co-results seo-pillars">
        {pillars.map((pil, idx) => (
          <div key={pil.t} className={`co-res neu ${idx === 1 ? "is-hero" : ""}`}>
            <small>Step {idx + 1}</small>
            <b>{pil.t}</b>
            <ul>
              {pil.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Proof */}
      <div className="co-proof">
        <span className="ex-label center">Proof · Google Search Console</span>
        <figure className="cs__proof co-proof__map">
          <img
            src="/assets/work/ecommerce-seo-search-console.jpg"
            alt="Search Console comparison: 33.8K clicks and 1.44M impressions in the last 6 months vs 3.02K and 108K in the previous 6 months"
            loading="lazy"
          />
          <figcaption>
            Search Console comparison: 33.8K clicks and 1.44M impressions in the last 6 months vs 3.02K and 108K in the previous 6 months
          </figcaption>
        </figure>
      </div>

      <div className="cs__cta" style={{ justifyContent: "center" }}>
        <Link href="/reach-to-us" className="btn btn-blue btn-glow">
          <span>Grow my organic traffic</span> <span className="arr">→</span>
        </Link>
      </div>
    </div>
  );
}


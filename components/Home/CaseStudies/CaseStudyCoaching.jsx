"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const metaItems = [
  ["Sector", "Life coaching & hypnotherapy"],
  ["Location", "San Francisco, USA"],
  ["Services", "Website redesign, SEO, Local SEO / GBP"],
  ["Paid ads", "None — 100% organic"],
];

const compareRows = [
  { k: "Conversion rate", a: "~2%", b: "~20%", pa: 10, pb: 100, good: "up" },
  { k: "Bounce rate", a: "~95%", b: "~40%", pa: 95, pb: 40, good: "down" },
  { k: "Avg. time on site", a: "~1 min", b: "~5 min", pa: 20, pb: 100, good: "up" },
  { k: "Google Business Profile calls / month", a: "~12", b: "100+", pa: 12, pb: 100, good: "up" },
  { k: "Booking & direction clicks / month", a: "100+", b: "250+", pa: 40, pb: 100, good: "up" },
];

const challengeChips = [
  "Outdated site on Weebly",
  "95% bounce rate",
  "~1 minute average time on site",
  "Poor mobile experience",
  "Unclear calls-to-action",
  "Low form submission rate (~10%)",
  "Conversion rate stuck around ~2%",
  "Limited scalability & optimisation",
  "Broken pages & weak technical SEO",
  "Content not optimised for local search intent",
  "Google Business Profile: only ~12 calls/month",
];

const phases = [
  {
    t: "Phase 1 — Rebuild",
    items: [
      "Migrated the site off Weebly onto a scalable CMS",
      "Designed a clearer content hierarchy and conversion flow",
      "Improved mobile usability across all key pages",
      "Optimised site structure for local SEO",
      "Improved internal linking and page organisation",
      "Cleaned up technical SEO, sitemap and Google Search Console setup",
      "Aligned content with high-intent local search terms",
    ],
  },
  {
    t: "Phase 2 — Local SEO Growth",
    items: [
      "Continued SEO improvements across the Google Business Profile and key service pages",
      "Expanded targeting from lower-competition, high-intent keywords toward higher-volume search terms",
      "Ongoing content and technical work to sustain rankings",
    ],
  },
];

const results = [
  {
    t: "UX & engagement",
    s: "Phase 1",
    items: [
      "Bounce rate reduced from ~95% to ~40%",
      "Average time on site up from ~1 minute to ~5 minutes",
      "Improved scroll depth and page engagement",
      "Significantly better mobile usability",
    ],
  },
  {
    t: "Conversion",
    s: "Phase 1 · SEO only",
    items: [
      "Conversion rate increased from ~2% to ~20%",
      "Form submission rate well beyond the previous ~10%",
      "More consistent lead flow from organic traffic",
      "Clearer CTAs leading to higher-intent inquiries",
    ],
  },
  {
    t: "Local growth",
    s: "Phase 2 · 6 months in (Aug 2026)",
    items: [
      "Google Business Profile calls scaled from 12 to 100+ per month",
      "Booking / direction clicks up from 100+ to 250+ per month",
      "Ranked in the top 3 of the local Map Pack",
      "Top positions for multiple commercial and informational keywords",
    ],
  },
];

export default function CaseStudyCoaching() {
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
    <div className="cs ex-cs co-cs" id="work-coaching">
      <div className="head center text-center flex flex-col items-center gap-2">
        <Reveal as="span" className="eyebrow center self-center inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef8fa] text-[13px] font-bold text-[#0b4db5] shadow-[4px_4px_10px_rgba(20,84,120,0.12),-4px_-4px_10px_rgba(255,255,255,0.9)] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f5b82e]">
          Case study · Website redesign + SEO · USA
        </Reveal>
        <Reveal as="h2" className="h2 m-0 font-sans text-[clamp(28px,3.6vw,44px)] font-extrabold tracking-[-0.02em] text-[#0e1b2e] leading-tight">
          Coaching website: <span className="hl text-[#0b4db5]">2% → 20% conversion</span> with SEO and redesign
        </Reveal>
        <Reveal as="p" className="lead m-0 text-base sm:text-[17px] text-[#5b6b80] max-w-[700px] leading-relaxed">
          A San Francisco life coaching and hypnotherapy practice had strong expertise and organic visibility — but the website wasn’t turning visitors into leads and the Google Business Profile barely generated calls. The goal: better design, performance and local search presence, without paid ads.
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

      {/* Before / After Comparison Meters */}
      <div className="cs__panel neu co-compare" ref={compareRef}>
        <span className="ex-label">Before → after</span>
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
            <b className={`co-row__tag ${row.good === "down" ? "is-down" : ""}`}>
              {row.good === "down" ? "↓" : "↑"} {row.b}
            </b>
          </div>
        ))}
      </div>

      {/* Challenge Card */}
      <div className="co-challenge">
        <span className="ex-label ex-label--red">The challenge</span>
        <p className="co-sub">
          Despite organic traffic coming in, the website struggled across both UX and conversion — and the local presence was underdeveloped.
        </p>
        <div className="co-chips">
          {challengeChips.map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
        </div>
        <p className="co-sub">
          <b>The result:</b> traffic without meaningful conversions, and a local presence that wasn’t being found.
        </p>
      </div>

      {/* 2 Phases */}
      <div className="co-phases">
        {phases.map((ph, idx) => (
          <div key={ph.t} className="ex-step co-phase">
            <span className="ex-step__n">{String(idx + 1).padStart(2, "0")}</span>
            <b>{ph.t}</b>
            <ul>
              {ph.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 3 Results Cards */}
      <div className="co-results">
        {results.map((res, idx) => (
          <div key={res.t} className={`co-res neu ${idx === 1 ? "is-hero" : ""}`}>
            <small>{res.s}</small>
            <b>{res.t}</b>
            <ul>
              {res.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Proof Gallery */}
      <div className="co-proof">
        <span className="ex-label center">Proof · Google Business Profile & local search</span>
        <figure className="cs__proof co-proof__map">
          <img
            src="/assets/work/coaching-map-pack.jpg"
            alt="Google local Map Pack results with our client highlighted in the top 3"
            loading="lazy"
          />
          <figcaption>Local Map Pack: our client ranked in the top 3. Other business names hidden.</figcaption>
        </figure>
        <div className="co-proof__pair">
          <figure className="cs__proof">
            <img
              src="/assets/work/coaching-calls.jpg"
              alt="134 calls made from the Business Profile in August 2026"
              loading="lazy"
            />
            <figcaption>134 calls from the Business Profile · Aug 2026</figcaption>
          </figure>
          <figure className="cs__proof">
            <img
              src="/assets/work/coaching-directions.jpg"
              alt="257 direction requests made from the Business Profile"
              loading="lazy"
            />
            <figcaption>257 direction requests from the Business Profile</figcaption>
          </figure>
        </div>
        <p className="co-noads">
          No paid ads required at any stage. Results driven entirely by SEO, UX and local optimisation.
        </p>
      </div>

      <div className="cs__cta" style={{ justifyContent: "center" }}>
        <Link href="/reach-to-us?service=web#contact" className="btn btn-blue btn-glow">
          <span>Start a website project</span> <span className="arr">→</span>
        </Link>
      </div>
    </div>
  );
}


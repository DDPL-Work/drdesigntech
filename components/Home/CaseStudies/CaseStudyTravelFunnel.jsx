"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import AnimatedNumber from "./AnimatedNumber";

const metaItems = [
  ["Industry", "Premium travel agency"],
  ["Destinations", "Europe, Dubai, Singapore, Bali, Hong Kong"],
  ["Channels", "Meta Ads, Google Search Ads, landing page"],
  ["Model", "Two-phase funnel by ticket size"],
];

const topKpis = [
  { to: 2.5, suffix: "M+", decimals: 1, label: "people reached on Meta" },
  { to: 350, suffix: "+", label: "qualified leads from Meta" },
  { to: 239, prefix: "₹", label: "avg. cost per lead · Google Ads" },
  { to: 3.5, suffix: "x", decimals: 1, label: "higher lead-to-close ratio" },
];

const challenges = [
  "No structured online funnel",
  "Lack of authenticity across social channels",
  "Previous campaigns generating poor-quality leads",
  "Hard to promote high-ticket packages (especially Europe) to a filtered, intent-based audience",
];

const phases = [
  {
    n: "Phase 1",
    t: "Social presence + Meta Ads",
    s: "Mid-ticket destinations · Dubai, Singapore, Bali, Hong Kong",
    why: "Highly visual, aspirational destinations that sell through emotional storytelling — so we built a trust layer before spending any ad budget.",
    did: [
      "Social profile optimisation to pass the “authenticity check”",
      "UGC-style travel content and Reels for relatability",
      "Meta brand awareness + lead gen campaigns with carousels, Reels and testimonials",
      "Hyper-targeted interests — luxury travellers, honeymooners, solo adventurers",
    ],
    res: [
      "Reached 2.5M+ people on Meta in a few weeks",
      "350+ qualified leads via Meta lead forms and click-to-WhatsApp ads",
      "Brand authority through consistent content, copy and conversions",
    ],
  },
  {
    n: "Phase 2",
    t: "Landing page funnel + Google Ads",
    s: "High-ticket Europe packages",
    why: "Europe tours are premium, complex and decision-heavy — not ideal for casual scrollers — so we moved them to high-intent Google Search.",
    did: [
      "SEO-friendly, high-conversion landing page just for Europe packages",
      "Itinerary breakdowns, pricing tiers, FAQs, trust badges, limited slots and WhatsApp CTAs",
      "High-intent keywords like “Europe trip from India all-inclusive” and “luxury Europe travel agency India”",
      "A/B tested headlines, extensions and audience segments to lower CPL",
    ],
    res: [
      "₹239 average cost per lead on Google Ads",
      "High-ticket bookings closed within the first 3 weeks",
      "More WhatsApp enquiries and email submissions from the funnel",
      "3.5x increase in lead-to-close ratio vs previous efforts",
    ],
  },
];

const takeaways = [
  "Multi-channel presence built from scratch",
  "Meta campaigns for visual destinations → 350+ leads",
  "Google Ads for high-intent buyers → ₹239 CPL for Europe",
  "A trust-first ecosystem of content, brand presence and targeting",
  "The client now runs repeat destination campaigns with us every season",
];

export default function CaseStudyTravelFunnel() {
  return (
    <div className="cs ex-cs tv-cs" id="work-travel-funnel">
      <div className="head center text-center flex flex-col items-center gap-2">
        <Reveal as="span" className="eyebrow center self-center inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef8fa] text-[13px] font-bold text-[#0b4db5] shadow-[4px_4px_10px_rgba(20,84,120,0.12),-4px_-4px_10px_rgba(255,255,255,0.9)] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f5b82e]">
          Case study · Meta Ads + Google Ads · Travel
        </Reveal>
        <Reveal as="h2" className="h2 m-0 font-sans text-[clamp(28px,3.6vw,44px)] font-extrabold tracking-[-0.02em] text-[#0e1b2e] leading-tight">
          Multi-destination travel funnel that delivered <span className="hl text-[#0b4db5]">350+ leads</span>
        </Reveal>
        <Reveal as="p" className="lead m-0 text-base sm:text-[17px] text-[#5b6b80] max-w-[700px] leading-relaxed">
          A premium travel agency with a stellar offline reputation wanted the same success online across Europe, Dubai, Singapore, Bali and Hong Kong. They didn’t just need leads — they needed the right audience, the right strategy per destination, and a profitable funnel.
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

      {/* Client Challenge */}
      <div className="co-challenge">
        <span className="ex-label ex-label--red">The client’s challenge</span>
        <div className="co-chips">
          {challenges.map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
        </div>
      </div>

      {/* 2 Phases */}
      <div className="tv-phases">
        {phases.map((ph, idx) => (
          <div key={ph.n} className={`tv-phase neu ${idx === 1 ? "is-dark" : ""}`}>
            <span className="tv-phase__n">{ph.n}</span>
            <b className="tv-phase__t">{ph.t}</b>
            <small className="tv-phase__s">{ph.s}</small>
            <p className="tv-phase__why">{ph.why}</p>
            <div className="tv-phase__cols">
              <div>
                <em>What we did</em>
                <ul>
                  {ph.did.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <em>The result</em>
                <ul className="is-res">
                  {ph.res.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Proof Gallery */}
      <div className="co-proof">
        <span className="ex-label center">Proof · creatives, landing page & ad results</span>
        <div className="co-proof__pair">
          <figure className="cs__proof">
            <img
              src="/assets/work/travel-meta-creatives.jpg"
              alt="Meta ad creatives for Hong Kong & Macau, Singapore and Dubai packages"
              loading="lazy"
            />
            <figcaption>Phase 1 · Meta ad creatives (brand logo hidden)</figcaption>
          </figure>
          <figure className="cs__proof">
            <img
              src="/assets/work/travel-meta-results.jpg"
              alt="Meta Ads results: 371 leads, 122,532 reach, ₹22.84 cost per lead"
              loading="lazy"
            />
            <figcaption>Phase 1 · Meta lead results — 371 leads at ₹22.84 per lead</figcaption>
          </figure>
        </div>

        <div className="co-proof__pair">
          <figure className="cs__proof">
            <img
              src="/assets/work/travel-landing-page.jpg"
              alt="Travel landing page with Europe, Dubai and Singapore package cards"
              loading="lazy"
            />
            <figcaption>Phase 2 · destination landing page</figcaption>
          </figure>
          <figure className="cs__proof">
            <img
              src="/assets/work/travel-google-ads.jpg"
              alt="Google Ads: ₹12.40 avg CPC, 11.4K conversions, ₹239 cost per conversion"
              loading="lazy"
            />
            <figcaption>Phase 2 · Google Ads — ₹239 cost per conversion</figcaption>
          </figure>
        </div>

        <figure className="cs__proof co-proof__map">
          <img
            src="/assets/work/travel-search-campaigns.jpg"
            alt="Google Search campaigns by destination with impressions, clicks and CTR"
            loading="lazy"
          />
          <figcaption>
            Google Search campaigns by destination — up to 1.25M impressions and 49.9K clicks per campaign. Campaign names hidden.
          </figcaption>
        </figure>
      </div>

      {/* Takeaways */}
      <div className="ex-after">
        <span className="ex-label ex-label--green">Results & long-term partnership</span>
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
          <span>Build my travel funnel</span> <span className="arr">→</span>
        </Link>
      </div>
    </div>
  );
}


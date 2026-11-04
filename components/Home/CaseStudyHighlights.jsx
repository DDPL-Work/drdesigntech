"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import AnimatedNumber from "./CaseStudies/AnimatedNumber";

const highlightCards = [
  {
    k: "Meta Ads · Travel",
    numberComponent: <AnimatedNumber to={360} suffix=" leads" duration={1.6} />,
    d: "in 15 days for a tour operator",
    href: "/work-we-have-done#work-case-study",
    c: "#0b4db5",
  },
  {
    k: "Google Ads · E-commerce",
    numberComponent: <AnimatedNumber to={8.13} decimals={2} suffix="x ROAS" duration={1.6} />,
    d: "in 3 months for a sporting goods store",
    href: "/work-we-have-done#work-sporting-goods",
    c: "#1e9e52",
  },
  {
    k: "SEO · E-commerce",
    numberComponent: <AnimatedNumber to={1000} prefix="+" suffix="%" duration={1.6} />,
    d: "organic traffic in 6 months",
    href: "/work-we-have-done#work-ecommerce-seo",
    c: "#f5b82e",
  },
  {
    k: "Redesign + SEO · Coaching",
    numberComponent: (
      <span>
        2% → <AnimatedNumber to={20} suffix="%" duration={1.6} />
      </span>
    ),
    d: "website conversion rate",
    href: "/work-we-have-done#work-coaching",
    c: "#3f8cff",
  },
  {
    k: "Meta + Google · Retail",
    numberComponent: <AnimatedNumber to={346} prefix="$" suffix="K" duration={1.6} />,
    d: "revenue at 5.12x ROAS",
    href: "/work-we-have-done#work-pet-brand",
    c: "#e0393a",
  },
  {
    k: "Meta Ads · D2C sweets",
    numberComponent: <AnimatedNumber to={11.98} decimals={2} prefix="₹" suffix="L" duration={1.6} />,
    d: "sales from 2,003 orders",
    href: "/work-we-have-done#work-sweets-brand",
    c: "#8a4fff",
  },
];

export default function CaseStudyHighlights() {
  return (
    <section
      id="results-delivered"
      className="sec relative w-full overflow-hidden py-8 sm:py-12"
      aria-label="Results we’ve delivered"
    >
      <div className="wrap max-w-[1400px] mx-auto px-4 sm:px-[18px]">
        <div className="chl">
          {/* Header */}
          <div className="head center text-center flex flex-col items-center gap-2">
            <Reveal
              as="div"
              className="center self-center inline-flex items-center gap-2.5 text-[12px] sm:text-[13px] font-extrabold tracking-[0.14em] uppercase text-[#0b4db5]"
            >
              <span className="w-5 h-[3px] bg-[#f5b82e] rounded-full inline-block" aria-hidden="true" />
              RESULTS WE’VE DELIVERED
            </Reveal>
            <Reveal
              as="h2"
              delay={0.06}
              className="h2 m-0 font-sans text-[clamp(28px,3.8vw,48px)] font-extrabold tracking-[-0.02em] text-[#0e1b2e] leading-tight text-center"
            >
              Real numbers from{" "}
              <span className="hl text-[#0b4db5]">real campaigns</span>
            </Reveal>
            <Reveal
              as="p"
              delay={0.12}
              className="lead m-0 text-base sm:text-[17px] text-[#5b6b80] max-w-[720px] leading-relaxed text-center px-2"
            >
              A snapshot of recent results across ads, SEO and web. Client names stay confidential —
              the numbers are straight from their dashboards.
            </Reveal>
          </div>

          {/* 6 Metric Cards Grid with Staggered Reveal and Count Animations */}
          <div className="chl__grid">
            {highlightCards.map((card, idx) => (
              <Reveal
                key={card.k}
                delay={(idx % 3) * 0.08}
                className="h-full"
              >
                <Link
                  href={card.href}
                  className="chl__card lift group block w-full h-full"
                  style={{ "--c": card.c }}
                >
                  <span className="chl__k">{card.k}</span>
                  <b className="chl__v" style={{ color: card.c }}>
                    {card.numberComponent}
                  </b>
                  <span className="chl__d">{card.d}</span>
                  <span className="chl__go">
                    Read case study <span className="inline-block transition-transform duration-250 group-hover:translate-x-1" aria-hidden="true">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Bottom Action Button */}
          <Reveal delay={0.2} className="row flex justify-center mt-3 sm:mt-5">
            <Link
              href="/work-we-have-done"
              className="btn btn-blue btn-glow group inline-flex items-center justify-center gap-2 px-7 min-h-[50px] rounded-full font-bold text-[15px] text-white"
            >
              <span>See all 12 case studies</span>{" "}
              <span
                className="arr transition-transform duration-250 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

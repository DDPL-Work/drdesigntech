"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import AnimatedNumber from "./AnimatedNumber";

const campaignBars = [
  { name: "Bhutan · Instant Form · India", result: 198, unit: "leads", cost: 61.63 },
  { name: "Bhutan Travel Package · Instant Form", result: 162, unit: "leads", cost: 54.26 },
  { name: "Bhutan Travel Package · Messaging", result: 25, unit: "chats", cost: 27.11 },
];

export default function CaseStudyMetaAds() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const maxVal = Math.max(...campaignBars.map((c) => c.result));

  return (
    <div className="cs" id="work-case-study" ref={sectionRef}>
      <div className="head center text-center flex flex-col items-center gap-2">
        <Reveal as="span" className="eyebrow center self-center inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef8fa] text-[13px] font-bold text-[#0b4db5] shadow-[4px_4px_10px_rgba(20,84,120,0.12),-4px_-4px_10px_rgba(255,255,255,0.9)] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f5b82e]">
          Case study · Meta Ads
        </Reveal>
        <Reveal as="h2" className="h2 m-0 font-sans text-[clamp(28px,3.6vw,44px)] font-extrabold tracking-[-0.02em] text-[#0e1b2e] leading-tight">
          <span className="hl text-[#0b4db5]">360 travel leads</span> in 15 days for Rejoy Tours
        </Reveal>
        <Reveal as="p" className="lead m-0 text-base sm:text-[17px] text-[#5b6b80] max-w-[700px] leading-relaxed">
          Facebook & Instagram lead-generation campaigns for Rejoy Tours’ Bhutan travel packages — instant forms and messaging ads, set up and managed by Dr. Design.
        </Reveal>
      </div>

      <Reveal className="cs__panel neu">
        {/* Left Column: Media */}
        <div className="cs__media">
          <div className="wk-browser cs__frame border border-[#d2e4ea] bg-white rounded-2xl overflow-hidden shadow-[0_12px_28px_-12px_rgba(14,27,46,0.25)]">
            <div className="wk-browser__bar flex items-center gap-1.5 px-3 py-2 bg-[#f0f6f8] border-b border-[#e1edf1]">
              <i className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
              <i className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
              <i className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
            </div>
            <img
              className="cs__shot block w-full aspect-[2.15/1] object-cover object-left-top"
              src="/assets/work/rejoy-tours.jpg"
              alt="Rejoy Tours homepage"
              loading="lazy"
            />
          </div>

          <div className="cs__client">
            <img src="/assets/clients/rejoy-tours.png" alt="Rejoy Tours" />
            <div>
              <b>Rejoy Tours</b>
              <small>Travel agency · International & domestic tours</small>
            </div>
          </div>

          <ul className="cs__facts">
            <li>
              <span>Platform</span>
              Meta Ads (Facebook + Instagram)
            </li>
            <li>
              <span>Objective</span>
              Leads via instant forms & messaging
            </li>
            <li>
              <span>Offer</span>
              Bhutan travel packages
            </li>
            <li>
              <span>Duration</span>
              15 days · 21 Sep – 6 Oct 2026
            </li>
          </ul>
        </div>

        {/* Right Column: Data */}
        <div className="cs__data">
          <div className="cs__kpis">
            <div className="cs__kpi cs__kpi--hero">
              <b><AnimatedNumber to={360} /></b>
              <span>form leads</span>
            </div>
            <div className="cs__kpi">
              <b><AnimatedNumber to={54.26} prefix="₹" decimals={2} /></b>
              <span>best cost per lead</span>
            </div>
            <div className="cs__kpi">
              <b><AnimatedNumber to={25} /></b>
              <span>messaging conversations</span>
            </div>
            <div className="cs__kpi">
              <b><AnimatedNumber to={15} /></b>
              <span>days live</span>
            </div>
          </div>

          <div className="cs__bars" aria-label="Results by campaign">
            {campaignBars.map((item, idx) => (
              <div className="cs__bar" key={item.name}>
                <div className="cs__barhead">
                  <span>{item.name}</span>
                  <b>{item.result} {item.unit} · ₹{item.cost.toFixed(2)}/{item.unit === "chats" ? "chat" : "lead"}</b>
                </div>
                <div className="cs__track">
                  <i
                    className={idx === 2 ? "is-chat" : ""}
                    style={{
                      width: inView ? `${(item.result / maxVal) * 100}%` : "0%",
                      transition: `width 1.2s ${0.15 * idx}s cubic-bezier(0.16, 1, 0.3, 1)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <figure className="cs__proof">
            <img
              src="/assets/work/rejoy-proof.jpg"
              alt="Meta Ads Manager results for the Rejoy Tours campaigns, 21 Sep – 6 Oct 2026"
              loading="lazy"
            />
            <figcaption>
              Live results from Meta Ads Manager, 21 Sep – 6 Oct 2026. One campaign earned a “high performing” tag.
            </figcaption>
          </figure>

          <div className="cs__cta">
            <Link href="/reach-to-us?service=social#contact" className="btn btn-blue btn-glow">
              <span>Get leads like this</span> <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}


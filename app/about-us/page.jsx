'use client';

import Link from "next/link";
import { openLeadModal } from "@/utils/events";
import AboutUs from "@/components/Home/AboutUs";
import AtAGlance from "@/components/Home/AtAGlance";
import TrustedClients from "@/components/Home/TrustedClients";
import Newsletter from "@/components/Home/Newsletter";
import { FaWhatsapp, FaCheckCircle, FaAward, FaBuilding, FaUsers, FaRocket } from "react-icons/fa";

const journeyTimeline = [
  {
    step: "01",
    title: "Founded in Dehradun",
    desc: "Started as a high-precision technology and engineering consultancy with deep foundations in computer science, software design, and spatial data systems.",
    icon: <FaBuilding className="text-[#0b4db5]" />,
  },
  {
    step: "02",
    title: "Government & Enterprise Contracts",
    desc: "Delivered critical GIS mapping, geospatial digitisation, and bespoke data tools for public-sector bodies and state infrastructure projects, proving federal-level reliability.",
    icon: <FaAward className="text-[#f5b82e]" />,
  },
  {
    step: "03",
    title: "Delhi Regional Expansion",
    desc: "Opened our strategic Delhi NCR corporate office to collaborate with fast-moving startups, venture-backed companies, and export houses across North India.",
    icon: <FaRocket className="text-[#5bb8c2]" />,
  },
  {
    step: "04",
    title: "300+ Digital Systems Deployed",
    desc: "Engineered scalable modern web applications, Flutter mobile apps, WhatsApp AI agents, and custom ERP systems for clients across India, USA, and the Middle East.",
    icon: <FaUsers className="text-[#25aa5a]" />,
  },
];

const coreValues = [
  {
    title: "Engineering Excellence",
    desc: "We write clean, typed, modular code with automated testing and high-speed delivery pipelines.",
  },
  {
    title: "Business Accountability",
    desc: "We align technical milestones with real KPIs — lead conversion, operating speed, and client revenue.",
  },
  {
    title: "Transparent Collaboration",
    desc: "Weekly sprints, live staging links, direct developer chats, and zero jargon.",
  },
  {
    title: "End-to-End Ownership",
    desc: "From initial UX architecture and database schema to cloud infrastructure and SEO indexation.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="py-10 md:py-16">
      {/* Page Header */}
      <section className="max-w-[1240px] mx-auto px-6 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0b4db5]/10 text-[#0b4db5] text-[13px] font-extrabold tracking-wider uppercase mb-4">
          About Dr. Design Technology
        </div>
        <h1 className="font-['Poppins'] font-extrabold text-[36px] sm:text-[48px] md:text-[58px] leading-tight text-[#0e1b2e] max-w-[950px] mx-auto">
          Technology partners for <span className="text-[#0b4db5]">growing businesses</span>
        </h1>
        <p className="max-w-[750px] mx-auto text-[#3b4b60] text-[16px] sm:text-[18px] mt-4 leading-relaxed font-medium">
          A forward-thinking technology and consulting company specialising in IT Services, Digital Transformation, and Geospatial Solutions — headquartered in Dehradun with a corporate branch in Delhi.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={() => openLeadModal("About Us Consultation")}
            className="btn btn-sun shine"
          >
            Talk to our team <span className="arr">→</span>
          </button>
          <Link href="/our-work" className="btn btn-neu">
            See our work
          </Link>
        </div>
      </section>

      {/* Main About Component */}
      <AboutUs />

      {/* Journey Timeline */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="text-center max-w-[650px] mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#0b4db5]/10 text-[#0b4db5] text-[12px] font-extrabold tracking-wider uppercase mb-3">
              Our Journey
            </span>
            <h2 className="font-['Poppins'] font-extrabold text-[32px] md:text-[42px] text-[#0e1b2e] leading-tight">
              Built on <span className="text-[#0b4db5]">trust and delivery</span>
            </h2>
            <p className="text-[#3b4b60] text-[15px] md:text-[17px] mt-2 font-medium">
              From our origins in Dehradun to enterprise deployments across India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {journeyTimeline.map((item, idx) => (
              <div
                key={idx}
                className="relative p-7 rounded-[26px] bg-[#eaf6f8] shadow-[8px_8px_20px_rgba(20,84,120,0.12),-8px_-8px_20px_rgba(255,255,255,0.92)] hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-12 h-12 rounded-2xl bg-white grid place-items-center text-[20px] shadow-[inset_2px_2px_5px_rgba(20,84,120,0.1)]">
                      {item.icon}
                    </span>
                    <span className="font-['Poppins'] text-[24px] font-extrabold text-[#0b4db5]/25">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-['Poppins'] font-extrabold text-[19px] text-[#0e1b2e] mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[#3b4b60] text-[14px] leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="p-8 md:p-14 rounded-[36px] bg-[#eaf6f8] shadow-[14px_14px_32px_rgba(20,84,120,0.12),-12px_-12px_28px_rgba(255,255,255,0.9)]">
            <div className="text-center max-w-[600px] mx-auto mb-12">
              <span className="text-[12px] font-extrabold tracking-wider uppercase text-[#0b4db5] mb-2 block">
                How we think & build
              </span>
              <h2 className="font-['Poppins'] font-extrabold text-[30px] md:text-[38px] text-[#0e1b2e] leading-tight">
                Our Operating Principles
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coreValues.map((val, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-white/60 shadow-sm">
                  <FaCheckCircle className="text-[#0b4db5] text-[22px] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-extrabold text-[17px] text-[#0e1b2e] mb-1">
                      {val.title}
                    </h4>
                    <p className="text-[#3b4b60] text-[14.5px] leading-relaxed font-medium">
                      {val.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* At A Glance Stats & Newsletter */}
      <AtAGlance />
      <TrustedClients />
      <Newsletter />
    </div>
  );
}

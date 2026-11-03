'use client';

import { useState } from "react";
import { openLeadModal } from "@/utils/events";
import { FaPlus, FaMinus, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const faqGroups = [
  {
    group: "General",
    items: [
      {
        q: "What services does Dr. Design offer?",
        a: "Dr. Design Technology is a full-stack digital and IT consulting firm. We specialize in custom website development, mobile apps (Android & iOS), WhatsApp AI chatbots & voice call agents, custom ERP & CRM solutions, search engine optimization (SEO), Meta & Google advertising, and GIS / geospatial intelligence.",
      },
      {
        q: "Where are you located?",
        a: "Our headquarters and development center is located in Dehradun, Uttarakhand, with a corporate branch office in Delhi. We serve clients across all states of India as well as international partners in the US, UK, and Middle East.",
      },
      {
        q: "How long has Dr. Design been in technology?",
        a: "Our core engineering and leadership team brings over 10+ years of active industry experience across government geospatial contracts, private corporate ERP implementations, and high-growth consumer apps.",
      },
    ],
  },
  {
    group: "Web & Mobile App Development",
    items: [
      {
        q: "How long does a typical website take to design and launch?",
        a: "A high-converting business website or landing page typically takes 10 to 18 business days from kickoff to deployment. Larger custom platforms, complex e-commerce stores, and custom web applications generally range from 3 to 6 weeks.",
      },
      {
        q: "Will our website be mobile-friendly and SEO-optimized?",
        a: "Yes, 100%. Every single project we build follows mobile-first responsive architecture, semantic HTML5 markup, structured schema markup, and optimized Core Web Vitals to score green (90+) on Google PageSpeed Insights.",
      },
      {
        q: "Do you build native or cross-platform mobile apps?",
        a: "We specialize in Flutter and React Native cross-platform applications, delivering pixel-perfect, native-performance iOS and Android apps from a single unified codebase, paired with secure cloud backend admin panels.",
      },
    ],
  },
  {
    group: "AI Chatbots & Automation",
    items: [
      {
        q: "How do your WhatsApp AI chatbots work?",
        a: "Our AI chatbots connect to the official Meta WhatsApp Business Cloud API. Powered by advanced LLMs (like OpenAI or Claude), the bot understands natural language questions, provides instant answers about your pricing, packages, or services, and captures verified customer phone numbers.",
      },
      {
        q: "Can the AI bot integrate with our CRM or Google Sheets?",
        a: "Absolutely. Every enquiry, booking, or customer qualification captured by the bot is automatically pushed in real time to your CRM, Google Sheets, or ERP system, and can trigger instant SMS or email notifications to your sales reps.",
      },
      {
        q: "What are AI Call Agents for inbound and outbound calls?",
        a: "AI Call Agents are human-sounding, real-time voice agents that answer incoming phone inquiries, qualify leads, schedule calendar appointments, or run automated outbound reminders without human delay.",
      },
    ],
  },
  {
    group: "Pricing & Process",
    items: [
      {
        q: "How much does a project cost?",
        a: "Because every business has distinct scope requirements, we provide itemized, transparent quotes after an initial discovery discussion. We offer competitive fixed-price milestone milestones with zero hidden surprises.",
      },
      {
        q: "What are your payment terms?",
        a: "Our typical payment milestone structure is 40% upfront deposit upon contract signing and architecture blueprint approval, 40% upon staging server demo approval, and the final 20% upon official domain launch and code handover.",
      },
      {
        q: "Do you provide post-launch maintenance and technical support?",
        a: "Yes. Every project includes 30 days of comprehensive post-launch warranty and bug-fix support. We also provide ongoing Monthly Maintenance Retainers covering security patches, cloud backups, speed monitoring, and content updates.",
      },
    ],
  },
];

export default function FaqsPage() {
  const [openItems, setOpenItems] = useState({ "0-0": true });

  const toggleItem = (key) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="py-10 md:py-16">
      {/* Page Header */}
      <section className="max-w-[1240px] mx-auto px-6 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0b4db5]/10 text-[#0b4db5] text-[13px] font-extrabold tracking-wider uppercase mb-4">
          Answers & Clarifications · FAQs
        </div>
        <h1 className="font-['Poppins'] font-extrabold text-[36px] sm:text-[48px] md:text-[58px] leading-tight text-[#0e1b2e] max-w-[900px] mx-auto">
          Everything you need to <span className="text-[#0b4db5]">know</span>
        </h1>
        <p className="max-w-[700px] mx-auto text-[#3b4b60] text-[16px] sm:text-[18px] mt-4 leading-relaxed font-medium">
          Clear, straightforward answers about our development timelines, pricing models, technologies, and post-launch support.
        </p>

        {/* Quick Help Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <a
            href="https://wa.me/917217052558"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sun shine"
          >
            <FaWhatsapp className="text-[18px]" /> Instant WhatsApp chat
          </a>
          <a href="tel:+917217052558" className="btn btn-neu">
            <FaPhoneAlt className="text-[#0b4db5]" /> Call +91 7217052558
          </a>
        </div>
      </section>

      {/* Accordion Groups */}
      <div className="max-w-[900px] mx-auto px-6 flex flex-col gap-12">
        {faqGroups.map((group, gIdx) => (
          <div key={gIdx} className="flex flex-col gap-4">
            <h2 className="font-['Poppins'] font-extrabold text-[22px] md:text-[26px] text-[#0e1b2e] flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0b4db5]" />
              {group.group}
            </h2>

            <div className="flex flex-col gap-3.5">
              {group.items.map((item, iIdx) => {
                const key = `${gIdx}-${iIdx}`;
                const isOpen = !!openItems[key];

                return (
                  <div
                    key={iIdx}
                    className="rounded-2xl bg-[#eaf6f8] overflow-hidden shadow-[6px_6px_14px_rgba(20,84,120,0.1),-6px_-6px_14px_rgba(255,255,255,0.9)] transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(key)}
                      className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left cursor-pointer border-0 bg-transparent"
                      aria-expanded={isOpen}
                    >
                      <span className="font-extrabold text-[16px] md:text-[18px] text-[#0e1b2e] leading-snug">
                        {item.q}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-white grid place-items-center text-[#0b4db5] shrink-0 shadow-sm transition-transform duration-200">
                        {isOpen ? <FaMinus size={12} /> : <FaPlus size={12} />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-6 md:px-6 md:pb-6 text-[#3b4b60] text-[15px] md:text-[16px] leading-relaxed font-medium animate-[fadeIn_0.2s_ease-out]">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Still Have a Question? Card */}
        <div className="p-8 md:p-10 rounded-[28px] bg-gradient-to-br from-[#0e1b2e] to-[#12243d] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_20px_40px_-16px_rgba(14,27,46,0.5)]">
          <div className="text-center md:text-left">
            <span className="text-[12px] font-bold tracking-wider uppercase text-[#f5b82e] block mb-1">
              Have a unique question?
            </span>
            <h3 className="font-['Poppins'] font-extrabold text-[24px] md:text-[28px] text-white leading-tight">
              Speak directly with an engineer
            </h3>
            <p className="text-white/75 text-[14.5px] mt-2 font-medium max-w-[480px]">
              No sales pressure. Discuss technical feasibility, architecture, or custom integrations with our lead developers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="https://wa.me/917217052558"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sun shine"
            >
              <FaWhatsapp className="text-[18px]" /> WhatsApp chat
            </a>
            <button
              type="button"
              onClick={() => openLeadModal("Custom Inquiry")}
              className="btn btn-ghost-w"
            >
              Request callback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


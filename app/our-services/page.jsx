'use client';

import Link from "next/link";
import { openLeadModal } from "@/utils/events";
import { FaWhatsapp, FaArrowRight, FaCheckCircle } from "react-icons/fa";

const servicesData = [
  {
    id: "web",
    title: "Website Development",
    quote: "Our website looks outdated",
    badge: "01 · Core Service",
    description:
      "Fast, modern, SEO-ready websites that explain your services clearly and turn visitors into enquiries. Dr. Design builds sites for businesses across India, tailored to your goals.",
    pts: [
      "Corporate & business websites",
      "E-commerce stores (WooCommerce, custom)",
      "Landing pages that convert",
      "Speed, SEO & mobile optimisation",
    ],
    tools: ["WordPress", "WooCommerce", "React", "Next.js", "PHP", "Tailwind CSS"],
    icon: "🌐",
    color: "#0b4db5",
  },
  {
    id: "app",
    title: "Mobile App Development",
    quote: "We need our own mobile app",
    badge: "02 · Core Service",
    description:
      "Turn your idea into an Android and iOS app that makes life easier for your customers — built around your goals, your users and a secure admin panel.",
    pts: [
      "Android & iOS apps",
      "Cross-platform with Flutter & React Native",
      "Booking, delivery & marketplace apps",
      "Admin panels & dashboards",
    ],
    tools: ["Flutter", "React Native", "Firebase", "Node.js", "REST APIs"],
    icon: "📱",
    color: "#5bb8c2",
  },
  {
    id: "chat",
    title: "AI Chatbot & Automation",
    quote: "We can't reply to every WhatsApp message",
    badge: "03 · Core Service",
    description:
      "Help customers get answers, book appointments and reach your team 24/7. We build AI chatbots and call agents around your services and workflows.",
    pts: [
      "WhatsApp AI chatbots with catalog ordering",
      "AI call agents for automated inbound calls",
      "Lead capture & auto follow-up workflows",
      "CRM & spreadsheet auto-sync",
    ],
    tools: ["WhatsApp API", "OpenAI", "Claude", "CRM Integrations", "Webhooks"],
    icon: "💬",
    color: "#25d366",
  },
  {
    id: "erp",
    title: "ERP & CRM Solutions",
    quote: "Our operations run on spreadsheets",
    badge: "04 · Core Service",
    description:
      "Bring your teams, data and daily workflows into one system. Custom ERP and CRM solutions tailored to how your business actually works.",
    pts: [
      "Custom ERP for manufacturing & trading",
      "Sales CRM & lead pipeline management",
      "Inventory, billing, invoicing & GST accounts",
      "Zoho & ERPNext end-to-end setup",
    ],
    tools: ["ERPNext", "Zoho CRM", "PostgreSQL", "Custom Dashboards"],
    icon: "⚙️",
    color: "#f5b82e",
  },
  {
    id: "seo",
    title: "SEO & Search Marketing",
    quote: "Our competitors rank higher on Google",
    badge: "05 · Core Service",
    description:
      "Rank where high-intent buyers search. Organic SEO and targeted Google Ads campaigns engineered to drive real phone calls and qualified enquiries.",
    pts: [
      "Local, technical & high-intent on-page SEO",
      "Google Ads & Performance Max campaigns",
      "Google Business Profile optimization",
      "AI search (GEO) visibility & citations",
    ],
    tools: ["Google Search Console", "Google Ads", "Ahrefs", "GA4"],
    icon: "🔍",
    color: "#0b4db5",
  },
  {
    id: "social",
    title: "Social Media & Meta Ads",
    quote: "We need more leads every week",
    badge: "06 · Core Service",
    description:
      "Targeted campaigns on Instagram, Facebook and LinkedIn that reach decision makers and deliver measurable return on ad spend.",
    pts: [
      "Social media strategy & monthly content calendar",
      "High-converting video reels, posts & creatives",
      "Meta, Instagram & LinkedIn ads management",
      "Weekly analytics reporting & conversion tracking",
    ],
    tools: ["Meta Ads Manager", "Instagram", "LinkedIn Ads", "Canva Pro"],
    icon: "📢",
    color: "#e0393a",
  },
  {
    id: "geo",
    title: "Geospatial & GIS Solutions",
    quote: "We need accurate spatial intelligence",
    badge: "07 · Specialized Capability",
    description:
      "High-precision GIS mapping, drone survey processing, satellite remote sensing, and custom spatial databases for government, infrastructure, and forestry.",
    pts: [
      "GIS mapping, digitisation & spatial analysis",
      "Drone survey data processing & DEM/DSM generation",
      "Satellite remote sensing & land-use classification",
      "Interactive WebGIS dashboards & spatial databases",
    ],
    tools: ["ArcGIS Pro", "QGIS", "PostGIS", "GeoServer", "Leaflet"],
    icon: "🗺️",
    color: "#1e9e52",
  },
];

export default function ServicesPage() {
  return (
    <div className="py-10 md:py-16">
      {/* Page Header Hero */}
      <section className="max-w-[1240px] mx-auto px-6 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0b4db5]/10 text-[#0b4db5] text-[13px] font-extrabold tracking-wider uppercase mb-4">
          What we do · Services
        </div>
        <h1 className="font-['Poppins'] font-extrabold text-[36px] sm:text-[48px] md:text-[58px] leading-tight text-[#0e1b2e] max-w-[900px] mx-auto">
          One partner for every layer of your{" "}
          <span className="text-[#0b4db5]">digital growth</span>
        </h1>
        <p className="max-w-[700px] mx-auto text-[#3b4b60] text-[16px] sm:text-[18px] mt-4 leading-relaxed font-medium">
          Websites, mobile apps, AI chatbots, ERP, search marketing, and geospatial solutions — planned as one cohesive strategy for businesses across India.
        </p>

        {/* Quick CTA */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={() => openLeadModal("quote")}
            className="btn btn-sun shine"
          >
            Get a free plan <span className="arr">→</span>
          </button>
          <a
            href="https://wa.me/917217052558"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-neu"
          >
            <FaWhatsapp className="text-[#25d366] text-[18px]" /> Chat on WhatsApp
          </a>
        </div>

        {/* Quick Jump Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-12 max-sm:overflow-x-auto max-sm:justify-start max-sm:pb-2">
          {servicesData.map((svc) => (
            <a
              key={svc.id}
              href={`#${svc.id}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eaf6f8] text-[#0e1b2e] text-[14px] font-bold shadow-[4px_4px_10px_rgba(20,84,120,0.1),-4px_-4px_10px_rgba(255,255,255,0.9)] hover:text-[#0b4db5] hover:shadow-[inset_2px_2px_5px_rgba(20,84,120,0.12),inset_-2px_-2px_5px_#ffffff] transition-all whitespace-nowrap"
            >
              <span>{svc.icon}</span>
              <span>{svc.title}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Alternating Service Rows */}
      <div className="max-w-[1240px] mx-auto px-6 flex flex-col gap-16 md:gap-24">
        {servicesData.map((svc, idx) => {
          const isRev = idx % 2 === 1;

          return (
            <article
              key={svc.id}
              id={svc.id}
              className={`scroll-mt-32 flex flex-col ${
                isRev ? "lg:flex-row-reverse" : "lg:flex-row"
              } items-center gap-10 lg:gap-16 p-8 md:p-12 rounded-[32px] bg-[#eaf6f8] shadow-[14px_14px_32px_rgba(20,84,120,0.12),-12px_-12px_28px_rgba(255,255,255,0.9)]`}
            >
              {/* Media & Quote Card */}
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <div className="relative p-8 rounded-[24px] bg-gradient-to-br from-[#0e1b2e] to-[#12243d] text-white overflow-hidden shadow-[0_20px_40px_-16px_rgba(14,27,46,0.4)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#0b4db5]/20 rounded-full blur-2xl" />
                  
                  {/* Service Icon Badge */}
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[28px] mb-6 shadow-inner">
                    {svc.icon}
                  </div>

                  {/* Customer Pain Point / Quote */}
                  <span className="block text-[13px] font-bold tracking-wider uppercase text-[#f5b82e] mb-2">
                    Common challenge
                  </span>
                  <blockquote className="text-[20px] md:text-[24px] font-extrabold leading-snug italic text-white/95">
                    “{svc.quote}”
                  </blockquote>

                  {/* Resolution Note */}
                  <p className="mt-4 text-[14px] text-white/75 font-medium leading-relaxed">
                    We step in as your full-cycle implementation team, providing end-to-end architecture, design, and deployment.
                  </p>
                </div>
              </div>

              {/* Service Copy & Checkpoints */}
              <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                <span className="inline-block px-3 py-1 rounded-full bg-[#0b4db5]/10 text-[#0b4db5] text-[12px] font-extrabold tracking-wider uppercase mb-3">
                  {svc.badge}
                </span>

                <h2 className="font-['Poppins'] font-extrabold text-[28px] md:text-[38px] text-[#0e1b2e] leading-tight mb-4">
                  {svc.title}
                </h2>

                <p className="text-[#3b4b60] text-[16px] leading-relaxed font-medium mb-6">
                  {svc.description}
                </p>

                {/* Point List */}
                <ul className="flex flex-col gap-3 w-full mb-6">
                  {svc.pts.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3 text-[#0e1b2e] text-[15px] font-semibold">
                      <FaCheckCircle className="text-[#25aa5a] text-[18px] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Tools Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {svc.tools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-full bg-white/70 text-[#0e1b2e] text-[12.5px] font-bold border border-[#0b4db5]/10 shadow-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 w-full">
                  <button
                    type="button"
                    onClick={() => openLeadModal(svc.title)}
                    className="btn btn-blue shine"
                  >
                    Get a free plan <span className="arr">→</span>
                  </button>
                  <a
                    href={`https://wa.me/917217052558?text=${encodeURIComponent(`Hi Dr. Design, I'm interested in your ${svc.title} service.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-neu"
                  >
                    <FaWhatsapp className="text-[#25d366]" /> Ask on WhatsApp
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}


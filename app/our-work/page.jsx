'use client';

import { useState } from "react";
import Link from "next/link";
import { openLeadModal } from "@/utils/events";
import { FaExternalLinkAlt, FaWhatsapp } from "react-icons/fa";

const filterCategories = [
  "All",
  "Websites",
  "Mobile Apps",
  "Fintech & SaaS",
  "E-Commerce",
  "GIS & Data",
];

const allWorkItems = [
  {
    name: "Gandharva · GMS Healing Instruments",
    client: "E-Commerce · Rishikesh",
    title: "Sound healing online store",
    category: "E-Commerce",
    overview:
      "A complete e-commerce store for Gandharva, a sound healing and mindful living brand in Rishikesh — singing bowls, gongs, meditation essentials, with cart, accounts and global shipping.",
    stack: ["WooCommerce", "WordPress", "Custom CSS", "Razorpay"],
    status: "Live",
    url: "https://gmshealinginstrument.com/",
    domain: "gmshealinginstrument.com",
    bg: "from-[#0b4db5] to-[#083a8a]",
    icon: "🛍️",
  },
  {
    name: "Slideit · Fintech BNPL",
    client: "Private IT Sector · Fintech",
    title: "Credit-scoring tool & UI/UX design",
    category: "Fintech & SaaS",
    overview:
      "An automated financial tool that streamlines data processing to calculate accurate credit scores instantly — plus UI/UX design for Slideit, a buy-now-pay-later mobile app.",
    stack: ["UI/UX", "PHP", "React", "Tailwind CSS", "MySQL"],
    status: "Deployed",
    url: "https://slideitapp.com/",
    domain: "slideitapp.com",
    bg: "from-[#2A2560] to-[#1a173d]",
    icon: "💳",
  },
  {
    name: "Subhash Iyer",
    client: "Author Portfolio & Publishing",
    title: "Website & book landing page",
    category: "Websites",
    overview:
      "Author website and book landing page for Subhash Iyer — a cinematic hero slider showcasing A Seeker’s Lens and Navapura – The City of Nine Gates with automated order links and blog.",
    stack: ["Landing Page", "Next.js", "Tailwind CSS", "Responsive Design"],
    status: "Live",
    url: "https://subhashiyer.com/",
    domain: "subhashiyer.com",
    bg: "from-[#0e1b2e] to-[#12243d]",
    icon: "📚",
  },
  {
    name: "Traveamer",
    client: "Travel Tech · SaaS",
    title: "Travel platform design & development",
    category: "Fintech & SaaS",
    overview:
      "An automated travel management solution that simplifies itinerary planning and approval workflows to reduce administrative overhead — designed and developed end-to-end.",
    stack: ["Flutter", "UI/UX", "Node.js", "Approval Workflows"],
    status: "Live",
    url: "https://traveamer.com/",
    domain: "traveamer.com",
    bg: "from-[#0B1A45] to-[#06102b]",
    icon: "✈️",
  },
  {
    name: "Mugafi IoT",
    client: "IoT Platform & Hardware",
    title: "Real-time IoT management platform",
    category: "Fintech & SaaS",
    overview:
      "A comprehensive platform built to manage IoT devices, automate recurring billing, and detect real-time temperature fluctuations with live telemetry dashboard.",
    stack: ["Three.js", "React", "Node.js", "MQTT / WebSockets"],
    status: "Live",
    url: "https://mugafi.co/",
    domain: "mugafi.co",
    bg: "from-[#2A0B14] to-[#17060b]",
    icon: "📡",
  },
  {
    name: "Cedra Online",
    client: "Luxury Florist & Gifting",
    title: "Online flower & gift boutique",
    category: "E-Commerce",
    overview:
      "High-conversion e-commerce storefront with custom bouquet builder, local delivery calendar slot selector, and WhatsApp order confirmation notifications.",
    stack: ["Shopify", "Tailwind CSS", "WhatsApp API", "Custom Checkout"],
    status: "Live",
    url: "https://cedraflower.com/",
    domain: "cedraflower.com",
    bg: "from-[#381c10] to-[#201009]",
    icon: "💐",
  },
  {
    name: "State GIS Portal & Cadastral Mapping",
    client: "Public Sector & Infrastructure",
    title: "High-precision WebGIS digitisation",
    category: "GIS & Data",
    overview:
      "Enterprise WebGIS mapping platform processing drone ortho-mosaics and multi-layer cadastral boundary parcel data with instant polygon measurement tools.",
    stack: ["PostGIS", "GeoServer", "Leaflet", "QGIS", "Python"],
    status: "Deployed",
    bg: "from-[#0f3d2e] to-[#08241b]",
    icon: "🗺️",
  },
  {
    name: "Dr. Body NYC",
    client: "Healthcare Clinic",
    title: "Patient appointment & clinic UI",
    category: "Mobile Apps",
    overview:
      "A clean interface that builds trust, using a premium aesthetic to highlight clinical expertise, patient testimonials, and instant telehealth booking.",
    stack: ["Figma", "React Native", "HIPAA-ready APIs"],
    status: "Completed",
    bg: "from-[#1b3d54] to-[#0e212e]",
    icon: "🩺",
  },
];

export default function OurWorkPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredItems =
    activeTab === "All"
      ? allWorkItems
      : allWorkItems.filter((item) => item.category === activeTab);

  return (
    <div className="py-10 md:py-16">
      {/* Page Header */}
      <section className="max-w-[1240px] mx-auto px-6 text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0b4db5]/10 text-[#0b4db5] text-[13px] font-extrabold tracking-wider uppercase mb-4">
          Portfolio · Case Studies
        </div>
        <h1 className="font-['Poppins'] font-extrabold text-[36px] sm:text-[48px] md:text-[58px] leading-tight text-[#0e1b2e] max-w-[900px] mx-auto">
          Real clients. <span className="text-[#0b4db5]">Live results.</span>
        </h1>
        <p className="max-w-[700px] mx-auto text-[#3b4b60] text-[16px] sm:text-[18px] mt-4 leading-relaxed font-medium">
          Live websites, deployed mobile products, and custom software solutions engineered for growing businesses across India and abroad.
        </p>

        {/* Quick Stats Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[800px] mx-auto mt-10">
          <div className="p-4 rounded-2xl bg-[#eaf6f8] shadow-[6px_6px_14px_rgba(20,84,120,0.1),-6px_-6px_14px_rgba(255,255,255,0.9)]">
            <b className="font-['Poppins'] text-[28px] text-[#0b4db5] block font-extrabold">150+</b>
            <span className="text-[13px] text-[#3b4b60] font-bold">Projects Shipped</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#eaf6f8] shadow-[6px_6px_14px_rgba(20,84,120,0.1),-6px_-6px_14px_rgba(255,255,255,0.9)]">
            <b className="font-['Poppins'] text-[28px] text-[#25aa5a] block font-extrabold">98%</b>
            <span className="text-[13px] text-[#3b4b60] font-bold">Client Retention</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#eaf6f8] shadow-[6px_6px_14px_rgba(20,84,120,0.1),-6px_-6px_14px_rgba(255,255,255,0.9)]">
            <b className="font-['Poppins'] text-[28px] text-[#f5b82e] block font-extrabold">4.9 ★</b>
            <span className="text-[13px] text-[#3b4b60] font-bold">Google Rating</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#eaf6f8] shadow-[6px_6px_14px_rgba(20,84,120,0.1),-6px_-6px_14px_rgba(255,255,255,0.9)]">
            <b className="font-['Poppins'] text-[28px] text-[#0e1b2e] block font-extrabold">10+ Yrs</b>
            <span className="text-[13px] text-[#3b4b60] font-bold">Excellence</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-12 max-sm:overflow-x-auto max-sm:justify-start max-sm:pb-2">
          {filterCategories.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2.5 rounded-full text-[14px] font-bold transition-all cursor-pointer border-0 ${
                  isActive
                    ? "bg-[#0b4db5] text-white shadow-[0_10px_20px_-6px_rgba(11,77,181,0.6)]"
                    : "bg-[#eaf6f8] text-[#0e1b2e] shadow-[4px_4px_10px_rgba(20,84,120,0.1),-4px_-4px_10px_rgba(255,255,255,0.9)] hover:text-[#0b4db5]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-[28px] bg-[#eaf6f8] overflow-hidden shadow-[12px_12px_28px_rgba(20,84,120,0.12),-10px_-10px_24px_rgba(255,255,255,0.9)] hover:-translate-y-2 hover:shadow-[16px_16px_36px_rgba(20,84,120,0.16),-12px_-12px_30px_rgba(255,255,255,0.95)] transition-all duration-300"
            >
              {/* Card Media Preview Header */}
              <div
                className={`relative w-full aspect-[16/10] bg-gradient-to-br ${item.bg} p-6 flex flex-col justify-between text-white overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md grid place-items-center text-[20px]">
                    {item.icon}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[12px] font-extrabold tracking-wide uppercase bg-white/20 backdrop-blur-md">
                    {item.status}
                  </span>
                </div>

                <div className="relative z-10">
                  <span className="text-[12px] font-bold text-[#f5b82e] block mb-1">
                    {item.client}
                  </span>
                  <h3 className="font-['Poppins'] font-extrabold text-[20px] text-white leading-snug">
                    {item.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex flex-col grow justify-between">
                <div>
                  <h4 className="font-bold text-[17px] text-[#0e1b2e] mb-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[#3b4b60] text-[14px] leading-relaxed font-medium mb-5">
                    {item.overview}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.stack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-full bg-white text-[#0e1b2e] text-[12px] font-bold border border-[#0b4db5]/10 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-[#0b4db5]/10 flex items-center justify-between">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#0b4db5] hover:text-[#083a8a] no-underline"
                    >
                      <span>Visit Live Website</span>
                      <FaExternalLinkAlt size={12} />
                    </a>
                  ) : (
                    <span className="text-[13px] font-semibold text-[#5b6b80]">
                      Enterprise Product
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => openLeadModal(item.name)}
                    className="text-[13px] font-bold text-[#0e1b2e] hover:text-[#0b4db5] cursor-pointer border-0 bg-transparent"
                  >
                    Discuss similar →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 md:p-12 rounded-[32px] bg-gradient-to-r from-[#0b4db5] to-[#083a8a] text-white text-center flex flex-col items-center shadow-[0_20px_40px_-14px_rgba(11,77,181,0.5)]">
          <h3 className="font-['Poppins'] font-extrabold text-[26px] md:text-[36px] mb-3">
            Ready to bring your digital vision to life?
          </h3>
          <p className="max-w-[600px] text-white/80 text-[16px] mb-8 font-medium">
            Get a tailored architecture roadmap and transparent project quote within 24 business hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => openLeadModal("New Project Quote")}
              className="btn btn-sun shine"
            >
              Start your project <span className="arr">→</span>
            </button>
            <a
              href="https://wa.me/917217052558"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost-w"
            >
              <FaWhatsapp className="text-[18px]" /> WhatsApp our team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}


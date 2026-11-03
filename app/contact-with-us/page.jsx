'use client';

import { useState } from "react";
import { openLeadModal } from "@/utils/events";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const contactCards = [
  {
    icon: <FaMapMarkerAlt className="text-[#0b4db5] text-[26px]" />,
    title: "Visit Our Offices",
    value: "Dehradun (HQ) & Delhi Branch",
    sub: "Dehradun, Uttarakhand · Mon–Sat 10 AM – 6 PM",
    cta: "Open in Google Maps",
    href: "https://maps.google.com/?q=Dehradun,+Uttarakhand",
    external: true,
  },
  {
    icon: <FaPhoneAlt className="text-[#1a73e8] text-[24px]" />,
    title: "Direct Phone Call",
    value: "+91 7217052558",
    sub: "Connect with our solution architect",
    cta: "Call now",
    href: "tel:+917217052558",
    external: false,
  },
  {
    icon: <FaWhatsapp className="text-[#25d366] text-[28px]" />,
    title: "WhatsApp Chat",
    value: "+91 7217052558",
    sub: "Instant technical & pricing replies",
    cta: "Start chat",
    href: "https://wa.me/917217052558",
    external: true,
  },
  {
    icon: <FaEnvelope className="text-[#f5b82e] text-[24px]" />,
    title: "Official Email",
    value: "contact@drdesigntech.com",
    sub: "Reply guaranteed within one business day",
    cta: "Send email",
    href: "mailto:contact@drdesigntech.com",
    external: false,
  },
];

const serviceOptions = [
  "Custom Website",
  "Mobile App (iOS/Android)",
  "WhatsApp AI Chatbot",
  "ERP / CRM System",
  "SEO & Search Ads",
  "Geospatial / GIS",
  "Other Inquiry",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Custom Website",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappMsg = `Hi Dr. Design, I would like to consult with your team.
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Service: ${formData.service}
Details: ${formData.message || "None provided"}`;

    window.open(
      `https://wa.me/917217052558?text=${encodeURIComponent(whatsappMsg)}`,
      "_blank"
    );
    setSubmitted(true);
  };

  return (
    <div className="py-10 md:py-16">
      {/* Page Header */}
      <section className="max-w-[1240px] mx-auto px-6 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0b4db5]/10 text-[#0b4db5] text-[13px] font-extrabold tracking-wider uppercase mb-4">
          Get in touch · Contact Us
        </div>
        <h1 className="font-['Poppins'] font-extrabold text-[36px] sm:text-[48px] md:text-[58px] leading-tight text-[#0e1b2e] max-w-[900px] mx-auto">
          Let’s build something <span className="text-[#0b4db5]">great together</span>
        </h1>
        <p className="max-w-[700px] mx-auto text-[#3b4b60] text-[16px] sm:text-[18px] mt-4 leading-relaxed font-medium">
          Tell us about your project requirements and receive a complimentary technical consultation and growth roadmap within one business day.
        </p>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <a
            href="https://wa.me/917217052558"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sun shine"
          >
            <FaWhatsapp className="text-[18px]" /> WhatsApp us directly
          </a>
          <a href="tel:+917217052558" className="btn btn-neu">
            <FaPhoneAlt className="text-[#0b4db5]" /> Call +91 7217052558
          </a>
        </div>
      </section>

      {/* 4 Direct Contact Cards */}
      <section className="max-w-[1240px] mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map((card, idx) => (
            <a
              key={idx}
              href={card.href}
              target={card.external ? "_blank" : undefined}
              rel={card.external ? "noopener noreferrer" : undefined}
              className="flex flex-col justify-between p-6 md:p-7 rounded-[26px] bg-[#eaf6f8] no-underline shadow-[8px_8px_20px_rgba(20,84,120,0.12),-8px_-8px_20px_rgba(255,255,255,0.92)] hover:-translate-y-2 hover:shadow-[12px_12px_28px_rgba(20,84,120,0.16),-10px_-10px_24px_rgba(255,255,255,0.95)] transition-all duration-300"
            >
              <div>
                <div className="w-13 h-13 rounded-2xl bg-white grid place-items-center shadow-[inset_2px_2px_5px_rgba(20,84,120,0.1)] mb-4">
                  {card.icon}
                </div>
                <small className="text-[11.5px] font-extrabold tracking-wider uppercase text-[#1d7f8c] block mb-1">
                  {card.title}
                </small>
                <b className="text-[16.5px] text-[#0e1b2e] leading-snug block mb-2">
                  {card.value}
                </b>
                <span className="text-[13px] text-[#5b6b80] font-medium leading-relaxed block">
                  {card.sub}
                </span>
              </div>

              <div className="pt-4 mt-4 border-t border-[#0b4db5]/10 flex items-center gap-1 text-[13.5px] font-bold text-[#0b4db5]">
                <span>{card.cta}</span>
                <span>→</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Interactive Consultation Form Section */}
      <section className="max-w-[1000px] mx-auto px-6">
        <div className="p-8 md:p-12 rounded-[32px] bg-[#eaf6f8] shadow-[14px_14px_32px_rgba(20,84,120,0.12),-12px_-12px_28px_rgba(255,255,255,0.9)]">
          <div className="text-center max-w-[600px] mx-auto mb-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#0b4db5]/10 text-[#0b4db5] text-[12px] font-extrabold tracking-wider uppercase mb-2">
              Free Technical Consultation
            </span>
            <h2 className="font-['Poppins'] font-extrabold text-[28px] md:text-[36px] text-[#0e1b2e] leading-tight">
              Tell us about your project
            </h2>
            <p className="text-[#3b4b60] text-[15px] mt-2 font-medium">
              Fill in your details below. We review every request and respond with scope estimates and architecture plans within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-white text-center flex flex-col items-center gap-4 shadow-sm">
              <FaCheckCircle className="text-[#25aa5a] text-[48px]" />
              <h3 className="font-extrabold text-[22px] text-[#0e1b2e]">
                Thank you! We have opened WhatsApp with your enquiry.
              </h3>
              <p className="text-[#3b4b60] text-[15px] max-w-[500px]">
                Our lead consultant has been notified. You can also directly call our office at{" "}
                <a href="tel:+917217052558" className="text-[#0b4db5] font-bold">
                  +91 7217052558
                </a>.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="btn btn-blue mt-2"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13.5px] font-bold text-[#0e1b2e]">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#0b4db5]/15 text-[#0e1b2e] text-[15px] font-medium placeholder:text-[#5b6b80]/60 focus:outline-none focus:ring-2 focus:ring-[#0b4db5]/30 shadow-[inset_2px_2px_4px_rgba(20,84,120,0.06)]"
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13.5px] font-bold text-[#0e1b2e]">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#0b4db5]/15 text-[#0e1b2e] text-[15px] font-medium placeholder:text-[#5b6b80]/60 focus:outline-none focus:ring-2 focus:ring-[#0b4db5]/30 shadow-[inset_2px_2px_4px_rgba(20,84,120,0.06)]"
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13.5px] font-bold text-[#0e1b2e]">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#0b4db5]/15 text-[#0e1b2e] text-[15px] font-medium placeholder:text-[#5b6b80]/60 focus:outline-none focus:ring-2 focus:ring-[#0b4db5]/30 shadow-[inset_2px_2px_4px_rgba(20,84,120,0.06)]"
                  />
                </div>
              </div>

              {/* Service Required */}
              <div className="flex flex-col gap-2">
                <label className="text-[13.5px] font-bold text-[#0e1b2e]">
                  Primary Service Required
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {serviceOptions.map((opt) => {
                    const isSelected = formData.service === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, service: opt })
                        }
                        className={`px-3.5 py-2.5 rounded-xl text-[13px] font-bold text-left transition-all border-0 cursor-pointer ${
                          isSelected
                            ? "bg-[#0b4db5] text-white shadow-md"
                            : "bg-white text-[#0e1b2e] hover:bg-[#f2f8fa] shadow-sm"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-[13.5px] font-bold text-[#0e1b2e]">
                  Project Overview & Goals
                </label>
                <textarea
                  rows={4}
                  placeholder="Share a brief overview of your business, target audience, key features, or expected timelines..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full p-4 rounded-xl bg-white border border-[#0b4db5]/15 text-[#0e1b2e] text-[15px] font-medium placeholder:text-[#5b6b80]/60 focus:outline-none focus:ring-2 focus:ring-[#0b4db5]/30 shadow-[inset_2px_2px_4px_rgba(20,84,120,0.06)] resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-blue shine w-full py-4 text-[16px] font-extrabold"
              >
                Send Request & Open WhatsApp Consultation <span className="arr">→</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}


"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/layout/PageHero";
import FreeConsultation from "@/components/Home/FreeConsultation";
import Newsletter from "@/components/Home/Newsletter";
import { openWhatsApp } from "@/utils/whatsapp";

const MAPS_URL =
  "https://maps.app.goo.gl/CLuEKcrimRnkSibNA";
const WHATSAPP_URL =
  "https://wa.me/917217052558?text=Hi%20Dr.%20Design%2C%20I%20would%20like%20to%20discuss%20a%20project.";
const PHONE_NUMBER = "+91 7217052558";
const PHONE_TEL = "tel:+917217052558";
const EMAIL_ADDRESS = "contact@drdesigntech.com";

const CONTACT_CARDS = [
  {
    s: "geo",
    t: "Visit us",
    v: "11 East Canal Road, Near Survey Chowk, Dehradun 248001",
    sub: "Offices in Dehradun (HQ) & Delhi",
    href: MAPS_URL,
    cta: "Open in Google Maps",
    ext: true,
  },
  {
    s: "app",
    t: "Call us",
    v: PHONE_NUMBER,
    sub: "Mon–Sat · 10 AM – 6 PM IST",
    href: PHONE_TEL,
    cta: "Call now",
  },
  {
    s: "chat",
    t: "WhatsApp",
    v: PHONE_NUMBER,
    sub: "Quick replies on chat",
    href: WHATSAPP_URL,
    cta: "Start chat",
    ext: true,
  },
  {
    s: "web",
    t: "Email",
    v: EMAIL_ADDRESS,
    sub: "Reply within one business day",
    href: `mailto:${EMAIL_ADDRESS}`,
    cta: "Send email",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Get in touch"
        title="Let's build something"
        hl="great together"
        intro="Tell us about your project and get a free consultation and growth roadmap. We reply within one business day."
        icons={["chat", "app", "geo", "web"]}
      >
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => openWhatsApp("917217052558", "Hi Dr. Design, I would like to discuss a project.", e)}
          className="btn btn-sun"
        >
          <span>WhatsApp us</span> <span className="arr">→</span>
        </a>
        <a href={PHONE_TEL} className="btn btn-ghost-w">
          Call {PHONE_NUMBER}
        </a>
      </PageHero>

      {/* 4 Direct Interactive Contact Cards */}
      <section className="sec" style={{ paddingBottom: 0 }}>
        <div className="wrap ct-cards">
          {CONTACT_CARDS.map((card, idx) => (
            <motion.a
              key={card.t}
              href={card.href}
              target={card.ext ? "_blank" : undefined}
              rel={card.ext ? "noopener noreferrer" : undefined}
              onClick={card.t === "WhatsApp" ? (e) => openWhatsApp("917217052558", "Hi Dr. Design, I would like to discuss a project.", e) : undefined}
              className="ct-card neu lift"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07, duration: 0.5 }}
            >
              <span className="ct-card__ic">
                <img
                  src={`/assets/icons/${card.s}.svg`}
                  alt=""
                  aria-hidden="true"
                  width={34}
                  height={34}
                  className="sym"
                />
              </span>
              <small>{card.t}</small>
              <b>{card.v}</b>
              <span className="ct-card__sub">{card.sub}</span>
              <span className="ct-card__cta">{card.cta} →</span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Interactive Free Consultation Section */}
      <FreeConsultation />

      {/* Office Map Location Section */}
      <section className="sec pt-0 pb-12 sm:pb-16" aria-label="Our office location">
        <div className="wrap max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="p-4 sm:p-7 md:p-8 rounded-[28px] sm:rounded-[36px] bg-[#eaf6f8] shadow-[14px_18px_36px_rgba(20,84,120,0.14),-12px_-12px_28px_rgba(255,255,255,0.95)] border border-[#d8eaee]">
            {/* Map Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5 sm:mb-6">
              <div className="flex flex-col gap-1.5">
                <span className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold text-[#0b4db5] uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#f5b82e] shadow-[0_0_0_3px_rgba(245,184,46,0.3)]" />
                  Our Location
                </span>
                <h3 className="m-0 text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0e1b2e]">
                  Visit our office in Dehradun
                </h3>
                <p className="m-0 text-xs sm:text-sm md:text-base text-[#44546a]">
                  Near Survey Chowk, 11 East Canal Road, Dehradun, Uttarakhand 248001
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-blue inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
                >
                  <span>Open in Google Maps</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="w-full overflow-hidden rounded-[20px] sm:rounded-[24px] shadow-inner border border-[#cbe1e6] bg-[#cfe5ea]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3188.2066983845975!2d78.05019947512162!3d30.328168405073182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929004980aa17%3A0x63e945299375e7cf!2sDr.%20Design%20Pvt.%20Ltd.!5e1!3m2!1sen!2sin!4v1793796260145!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Dr. Design Pvt. Ltd. on Google Maps"
                className="w-full h-[320px] sm:h-[420px] md:h-[480px] block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}

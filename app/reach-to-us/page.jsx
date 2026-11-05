"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/layout/PageHero";
import FreeConsultation from "@/components/Home/FreeConsultation";
import Newsletter from "@/components/Home/Newsletter";
import { openWhatsApp } from "@/utils/whatsapp";

const MAPS_URL =
  "https://www.google.com/maps/place/Dr.+Design+Pvt.+Ltd./@30.3281194,78.0527268,46m/data=!3m1!1e3!4m14!1m7!3m6!1s0x390929004980aa17:0x63e945299375e7cf!2sDr.+Design+Pvt.+Ltd.!8m2!3d30.3281638!4d78.0527744!16s%2Fg%2F11xp3493mf!3m5!1s0x390929004980aa17:0x63e945299375e7cf!8m2!3d30.3281638!4d78.0527744!16s%2Fg%2F11xp3493mf?entry=ttu&g_ep=EgoyMDI2MTEwMi4wIKXMDSoASAFQAw%3D%3D";
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
     

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}

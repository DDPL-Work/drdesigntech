'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import { openWhatsApp } from '@/utils/whatsapp';

const FAQS = [
  {
    question: "What services does Dr. Design offer?",
    answer:
      "IT services, digital transformation and geospatial solutions — including websites, mobile apps, ERP/CRM systems, digital marketing and GIS mapping."
  },
  {
    question: "Do you work with startups and small businesses?",
    answer:
      "Yes. We are expanding our expertise to startups, SMEs and growing businesses, with plans shaped around your budget and goals."
  },
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on scope. A business website usually takes a few weeks, while apps and ERP systems are planned in milestones. You get a clear timeline before we start."
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Yes. Our support team is available Monday to Saturday, 10 AM – 6 PM IST, and we offer maintenance plans for ongoing updates."
  },
  {
    question: "Can you work with clients outside Dehradun?",
    answer:
      "Absolutely. We're headquartered in Dehradun with an office in Delhi, and work with businesses across India and internationally through calls, WhatsApp and shared project dashboards."
  }
];

const WHATSAPP_URL = "https://wa.me/917217052558";

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="sec overflow-hidden">
      <div className="wrap flex flex-wrap gap-12 lg:gap-14">
        {/* Left Column / Side */}
        <div className="flex-[1_1_360px] min-w-0 flex flex-col gap-[18px]">
          <Reveal as="span" className="eyebrow self-start">FAQs</Reveal>
          <Reveal as="h2" className="h2 text-left">
            Questions, <span className="hl">answered</span>
          </Reveal>
          <Reveal as="p" className="lead text-left text-[#5b6b80]">
            Can&apos;t find what you&apos;re looking for? Our team is one message away.
          </Reveal>
          <Reveal className="pt-1">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => openWhatsApp("917217052558", "", e)}
              className="btn btn-neu inline-flex items-center"
            >
              Ask on WhatsApp
            </a>
          </Reveal>
        </div>

        {/* Right Column / Accordion List */}
        <div className="flex-[999_1_560px] min-w-0 flex flex-col gap-4">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal
                key={item.question}
                className={`neu-s rounded-[22px] transition-all duration-300 overflow-hidden${
                  isOpen ? " on" : ""
                }`}
                delay={index * 0.05}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between gap-4 min-h-[60px] sm:min-h-[68px] px-[18px] sm:px-[22px] py-4 sm:py-[18px] bg-transparent border-0 text-left font-semibold text-[15.5px] sm:text-[17px] text-[#0e1b2e] cursor-pointer focus:outline-none select-none font-['Plus_Jakarta_Sans',sans-serif]"
                >
                  <span className="leading-snug">{item.question}</span>
                  <span
                    className={`w-9 h-9 rounded-full shrink-0 grid place-items-center neu-s transition-all duration-350 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                      isOpen
                        ? "rotate-45 !bg-[#f5b82e] !text-[#0e1b2e]"
                        : "text-[#0b4db5] bg-transparent"
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                    >
                      <p className="m-0 px-[18px] sm:px-[22px] pb-[18px] sm:pb-[22px] text-[#5b6b80] leading-[1.75] text-[15px] sm:text-[15.5px]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faqs;

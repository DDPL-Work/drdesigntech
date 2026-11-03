'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '@/components/layout/PageHero';
import CallToAction from '@/components/Home/CallToAction';
import Newsletter from '@/components/Home/Newsletter';

const FAQS_DATA = [
  {
    g: 'General',
    items: [
      [
        'What services does Dr. Design offer?',
        'IT services, digital transformation and geospatial solutions — including websites, mobile apps, AI chatbots, ERP/CRM systems, digital marketing and GIS mapping.'
      ],
      [
        'Do you work with startups and small businesses?',
        'Yes. We are expanding our expertise to startups, SMEs and growing businesses, with plans shaped around your budget and goals.'
      ],
      [
        'Where are you located?',
        'Our headquarters is in Dehradun (Near Survey Chowk, 11 East Canal Road) and we have an office in Delhi. We work with clients across India and internationally.'
      ],
      [
        'Why choose Dr. Design over a freelancer or a big agency?',
        'You get a full team — design, development, SEO and ads — under one roof, with the accountability of a registered company that has delivered government projects. And you work directly with the people building your project.'
      ],
      [
        'Do you sign an NDA?',
        'Yes. We’re happy to sign an NDA before you share your idea, and we never publish client names or data without permission.'
      ]
    ]
  },
  {
    g: 'Projects & pricing',
    items: [
      [
        'How long does a typical project take?',
        'It depends on scope. A business website usually takes a few weeks, while apps and ERP systems are planned in milestones. You get a clear timeline before we start.'
      ],
      [
        'How much does a project cost?',
        'Every project is quoted on its scope. Share your requirements and we’ll send a free proposal with a clear breakdown — no obligation.'
      ],
      [
        'Can you redesign my existing website?',
        'Yes. We can redesign or rebuild an existing site, keep your content and SEO, and move it to a faster, mobile-friendly design.'
      ],
      [
        'How payments work?',
        'Payments are milestone-based — you pay in stages as work is delivered, with a GST invoice. The schedule is written into your proposal.'
      ],
      [
        'How soon will I see results from SEO or ads?',
        'Google and Meta ads can bring enquiries within days of launch. SEO compounds over time — most clients see clear movement in rankings and traffic within 3–6 months.'
      ],
      [
        'Will my website be SEO-friendly and mobile-friendly?',
        'Always. Every site we build is mobile-first, fast-loading and set up with clean structure, meta tags, schema and Google Search Console from day one.'
      ]
    ]
  },
  {
    g: 'Support',
    items: [
      [
        'Do you provide support after launch?',
        'Yes. Our support team is available Monday to Saturday, 10 AM – 6 PM IST, and we offer maintenance plans for ongoing updates.'
      ],
      [
        'Will I be able to update my website myself?',
        'Yes. We build on easy-to-manage platforms and walk you through updating content, products and images.'
      ],
      [
        'Can you work with clients outside Dehradun?',
        'Absolutely. We work with businesses across India and internationally through calls, WhatsApp and shared project dashboards.'
      ]
    ]
  }
];

const WHATSAPP_URL =
  'https://wa.me/917217052558?text=Hi%20Dr.%20Design%2C%20I%20have%20a%20question%20about%20your%20services.';
const PHONE_NUMBER = '+91 7217052558';
const PHONE_TEL = 'tel:+917217052558';

export default function FaqsPage() {
  const [openKey, setOpenKey] = useState('0-0');
  const [activeTab, setActiveTab] = useState('All');

  const visibleGroups =
    activeTab === 'All'
      ? FAQS_DATA
      : FAQS_DATA.filter((group) => group.g === activeTab);

  return (
    <>
      <PageHero
        crumb="FAQs"
        eyebrow="Help centre"
        title="Questions,"
        hl="answered"
        intro="Everything you need to know about working with Dr. Design. Can't find your answer? We're one message away."
        icons={['ask', 'chat', 'shield', 'web']}
      >
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sun"
        >
          <span>Ask on WhatsApp</span> <span className="arr">→</span>
        </a>
      </PageHero>

      <section className="sec">
        <div className="wrap max-w-[900px] mx-auto px-4 flex flex-col gap-[18px]">
          {/* Category Tabs */}
          <div
            className="flex items-center sm:justify-center justify-start flex-nowrap sm:flex-wrap gap-2 mb-2.5 overflow-x-auto sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="FAQ categories"
          >
            {['All', ...FAQS_DATA.map((g) => g.g)].map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeTab === cat}
                className={`min-h-[44px] px-[18px] rounded-full border-0 cursor-pointer font-bold text-[14px] shrink-0 sm:shrink transition-all duration-200 ${
                  activeTab === cat
                    ? 'bg-[#0b4db5] text-white shadow-[0_10px_20px_-10px_rgba(11,77,181,0.8)]'
                    : 'bg-[#eaf6f8] text-[#0e1b2e] shadow-[4px_4px_10px_rgba(20,84,120,0.12),-4px_-4px_10px_rgba(255,255,255,0.9)] hover:text-[#0b4db5]'
                }`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Groups */}
          {visibleGroups.map((group) => {
            const groupIndex = FAQS_DATA.indexOf(group);
            return (
              <div key={group.g} className="flex flex-col gap-3">
                <h2 className="mt-3.5 mb-0.5 text-[13px] font-extrabold tracking-[0.12em] uppercase text-[#1d7f8c]">
                  {group.g}
                </h2>
                {group.items.map(([question, answer], itemIndex) => {
                  const key = `${groupIndex}-${itemIndex}`;
                  const isOpen = openKey === key;
                  return (
                    <div
                      key={question}
                      className="rounded-[22px] overflow-hidden transition-all duration-300 neu-s bg-[#eaf6f8] shadow-[4px_4px_10px_rgba(20,84,120,0.12),-4px_-4px_10px_rgba(255,255,255,0.9)]"
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenKey(isOpen ? '' : key)}
                        className="w-full flex items-center justify-between gap-4 min-h-[60px] sm:min-h-[68px] py-4 sm:py-[18px] px-[18px] sm:px-[22px] bg-transparent border-0 text-left font-semibold text-[15.5px] sm:text-[17px] text-[#0e1b2e] cursor-pointer focus:outline-none select-none transition-colors hover:text-[#0b4db5]"
                      >
                        <span className="leading-snug">{question}</span>
                        <span
                          className={`w-9 h-9 rounded-full shrink-0 grid place-items-center neu-s transition-all duration-350 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                            isOpen
                              ? 'rotate-45 !bg-[#f5b82e] !text-[#0e1b2e] shadow-[inset_2px_2px_4px_rgba(20,84,120,0.15)]'
                              : 'text-[#0b4db5] bg-[#eaf6f8] shadow-[3px_3px_7px_rgba(20,84,120,0.12),-3px_-3px_7px_rgba(255,255,255,0.9)]'
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
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="m-0 px-[18px] sm:px-[22px] pb-[18px] sm:pb-[22px] text-[#5b6b80] leading-[1.75] text-[15px] sm:text-[15.5px]">
                              {answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* Ask Box */}
          <div className="mt-5 p-[26px] flex flex-wrap items-center gap-[18px] rounded-[26px] neu bg-[#eaf6f8] shadow-[10px_10px_24px_rgba(20,84,120,0.12),-8px_-8px_20px_rgba(255,255,255,0.9)]">
            <img
              src="/assets/icons/chat.svg"
              alt=""
              aria-hidden="true"
              width={48}
              height={48}
              className="w-12 h-12 shrink-0 animate-[float_5s_ease-in-out_infinite]"
            />
            <div className="flex-1 basis-[260px] min-w-0">
              <h3 className="m-0 mb-1 text-[20px] font-extrabold text-[#0e1b2e]">
                Still have a question?
              </h3>
              <p className="m-0 text-[#5b6b80] text-[15px]">
                Talk to our team on WhatsApp or call — Mon–Sat, 10 AM – 6 PM
                IST.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-blue"
              >
                WhatsApp {PHONE_NUMBER}
              </a>
              <a href={PHONE_TEL} className="btn btn-neu">
                Call {PHONE_NUMBER}
              </a>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
      <Newsletter />
    </>
  );
}

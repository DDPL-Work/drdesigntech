'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const seoIcon = '/assets/icons/seo.svg';
const socialIcon = '/assets/icons/social.svg';
const adsIcon = '/assets/icons/ads.svg';

const NEWSLETTER_EMAIL = "contact@drdesigntech.com";

const Newsletter = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    window.location.href = `mailto:${NEWSLETTER_EMAIL}?subject=${encodeURIComponent(
      "Newsletter sign-up"
    )}&body=${encodeURIComponent(
      `Please add ${email} to the Dr. Design newsletter.`
    )}`;
    setSubmitted(true);
  };

  return (
    <section className="pb-[70px] overflow-hidden" aria-labelledby="nl-title">
      <div className="wrap">
        <motion.div
          className="nl__panel relative overflow-hidden isolate flex flex-wrap items-center justify-between gap-x-10 gap-y-5.5 p-7 sm:p-10 md:p-12 rounded-[32px] bg-white shadow-[18px_22px_44px_rgba(20,84,120,0.14),-12px_-12px_28px_rgba(255,255,255,0.9)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle Radial Gradient Background */}
          <div
            className="absolute inset-0 -z-10 pointer-events-none [background:radial-gradient(40%_80%_at_0%_0%,rgba(91,196,208,0.22),transparent_70%),radial-gradient(40%_90%_at_100%_100%,rgba(245,184,46,0.25),transparent_70%)]"
            aria-hidden="true"
          />

          {/* Floating Icon Badges (Desktop Only) */}
          {/* 0: Mail */}
          <span
            className="hidden lg:grid absolute -z-10 w-14 h-14 rounded-[18px] place-items-center bg-[#eef8fa] shadow-[6px_8px_16px_rgba(20,84,120,0.14)] opacity-90 left-[46%] top-3.5 animate-[floatBob_4s_ease-in-out_infinite]"
            aria-hidden="true"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0B4DB5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
          </span>

          {/* 1: SEO */}
          <span
            className="hidden lg:grid absolute -z-10 w-14 h-14 rounded-[18px] place-items-center bg-[#eef8fa] shadow-[6px_8px_16px_rgba(20,84,120,0.14)] opacity-90 right-[22px] top-[18px] animate-[floatBob_4.5s_ease-in-out_infinite_reverse]"
            aria-hidden="true"
          >
            <img src={seoIcon} alt="SEO" className="w-[30px] h-[30px]" />
          </span>

          {/* 2: Social */}
          <span
            className="hidden lg:grid absolute -z-10 w-14 h-14 rounded-[18px] place-items-center bg-[#eef8fa] shadow-[6px_8px_16px_rgba(20,84,120,0.14)] opacity-90 left-[38%] bottom-3.5 animate-[floatBob_5s_ease-in-out_infinite]"
            aria-hidden="true"
          >
            <img src={socialIcon} alt="Social" className="w-[30px] h-[30px]" />
          </span>

          {/* 3: Ads */}
          <span
            className="hidden lg:grid absolute -z-10 w-14 h-14 rounded-[18px] place-items-center bg-[#eef8fa] shadow-[6px_8px_16px_rgba(20,84,120,0.14)] opacity-90 right-[34%] bottom-2.5 animate-[floatBob_4.2s_ease-in-out_infinite_reverse]"
            aria-hidden="true"
          >
            <img src={adsIcon} alt="Ads" className="w-[30px] h-[30px]" />
          </span>

          {/* Copy Side */}
          <div className="flex-[1_1_380px] max-w-[520px] flex flex-col gap-2 text-left">
            <span className="text-[13px] font-extrabold tracking-[0.12em] uppercase text-[#1d7f8c]">
              Newsletter
            </span>

            <h2
              id="nl-title"
              className="m-0 font-extrabold text-[26px] sm:text-[32px] md:text-[38px] leading-[1.12] tracking-[-0.025em] text-[#0e1b2e]"
            >
              Get growth tips{" "}
              <span className="nl__hl">
                every month
              </span>
            </h2>

            <p className="m-0 text-[#44546a] leading-[1.65] text-base">
              Website, SEO, social media ads and automation ideas for growing businesses. One email a month — no spam.
            </p>
          </div>

          {/* Form / Success State */}
          {submitted ? (
            <div className="flex-[1_1_380px] max-w-[520px] flex items-center gap-3 font-bold text-[#14532d] py-3 text-left">
              <span className="w-9 h-9 rounded-full grid place-items-center text-white bg-[#25aa5a] shrink-0 font-bold">
                ✓
              </span>
              <span>Thanks! Send the email that just opened to confirm.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex-[1_1_380px] max-w-[520px] flex flex-col sm:flex-row gap-2 p-2 rounded-[22px] sm:rounded-full bg-[#eef6f9] shadow-[inset_4px_4px_9px_rgba(20,84,120,0.12),inset_-4px_-4px_9px_#ffffff]"
            >
              <label htmlFor="nl-email" className="sr-only">
                Email address
              </label>
              <input
                id="nl-email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="flex-1 min-w-0 border-0 bg-transparent px-4.5 py-3 sm:py-0 font-medium text-[15.5px] text-[#0e1b2e] outline-none"
              />
              <button
                type="submit"
                className="btn btn-glow min-h-[52px] w-full sm:w-auto cursor-pointer"
              >
                <span>Subscribe</span>
                <span className="arr">→</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;


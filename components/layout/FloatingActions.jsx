'use client';

import { openLeadModal } from "@/utils/events";
import LeadModal from "./LeadModal";
import ScrollProgress from "./ScrollProgress";
import BackToTop from "./BackToTop";
import LiveToasts from "./LiveToasts";

export default function FloatingActions() {
  return (
    <>
      {/* Scroll Progress Bar at the very top */}
      <ScrollProgress />

      {/* Floating Notification Toasts (social proof alerts) */}
      <LiveToasts />

      {/* Back to Top button with SVG circular progress ring */}
      <BackToTop />

      {/* Side Docked "Free quote" Tab Button */}
      <button
        type="button"
        aria-label="Request a free quote"
        onClick={() => openLeadModal("quote")}
        className="fixed right-0 top-[46%] z-50 [writing-mode:vertical-rl] rotate-180 py-4 px-2.5 rounded-l-none rounded-r-2xl font-extrabold text-[13px] tracking-wider uppercase text-[#0e1b2e] bg-gradient-to-b from-[#ffd66b] to-[#f5b82e] shadow-[-8px_10px_24px_-8px_rgba(201,138,0,0.7)] hover:pr-5 transition-all duration-300 border-0 cursor-pointer hidden md:block"
      >
        Free quote
      </button>

      {/* Floating Bottom-Right Call & WhatsApp FABs */}
      <div className="fixed right-5 bottom-5.5 z-60 flex flex-col gap-3.5 items-end max-sm:right-3.5 max-sm:bottom-4 max-sm:gap-3" aria-label="Quick contact buttons">
        {/* Call Button */}
        <a
          href="tel:+917217052558"
          className="group relative w-15 h-15 max-sm:w-[54px] max-sm:h-[54px] rounded-full grid place-items-center text-white no-underline bg-[#1a73e8] shadow-[0_12px_24px_-8px_rgba(26,115,232,0.7)] hover:scale-108 transition-transform duration-200 animate-[ring_2.4s_infinite]"
          aria-label="Call us on +91 7217052558"
        >
          <span className="absolute right-[72px] top-1/2 -translate-y-1/2 translate-x-2 whitespace-nowrap py-2 px-3.5 rounded-full bg-white text-[#0e1b2e] shadow-[0_10px_24px_rgba(14,27,46,0.25)] text-[13px] font-bold opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 max-sm:hidden">
            Call +91 7217052558
          </span>
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="animate-[shake_2.4s_infinite]"
          >
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
          </svg>
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/917217052558"
          className="group relative w-15 h-15 max-sm:w-[54px] max-sm:h-[54px] rounded-full grid place-items-center text-white no-underline bg-[#25d366] shadow-[0_12px_24px_-8px_rgba(37,211,102,0.7)] hover:scale-108 transition-transform duration-200 animate-[pulse_1.8s_infinite]"
          aria-label="Chat on WhatsApp +91 7217052558"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="absolute right-[72px] top-1/2 -translate-y-1/2 translate-x-2 whitespace-nowrap py-2 px-3.5 rounded-full bg-white text-[#0e1b2e] shadow-[0_10px_24px_rgba(14,27,46,0.25)] text-[13px] font-bold opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 max-sm:hidden">
            WhatsApp +91 7217052558
          </span>
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.36A9.9 9.9 0 1 0 12.04 2zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.1.8.83-3-.2-.31a8.2 8.2 0 1 1 6.97 3.84zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.43l-.75-1.82c-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31 2.8 2.8 0 0 0-.87 2.08 4.9 4.9 0 0 0 1.02 2.58 11.1 11.1 0 0 0 4.27 3.77c1.59.69 2.21.75 3 .63a2.6 2.6 0 0 0 1.68-1.19 2.1 2.1 0 0 0 .15-1.19c-.06-.1-.23-.17-.48-.29z" />
          </svg>
        </a>
      </div>

      {/* Interactive Free Quote & Newsletter Lead Modal */}
      <LeadModal />
    </>
  );
}

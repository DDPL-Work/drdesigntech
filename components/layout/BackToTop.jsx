'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [dashOffset, setDashOffset] = useState(126);

  useEffect(() => {
    const handleNavToggle = (e) => {
      setNavOpen(!!e.detail?.open);
    };
    window.addEventListener('dd-nav-toggle', handleNavToggle);
    return () => window.removeEventListener('dd-nav-toggle', handleNavToggle);
  }, []);

  useEffect(() => {
    const circumference = 2 * Math.PI * 20; // ~125.66, approximated to 126 in design

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (totalHeight > 0) {
        const progress = Math.min(Math.max(scrollY / totalHeight, 0), 1);
        setVisible(progress >= 0.1);
        setDashOffset(circumference - progress * circumference);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && !navOpen && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          className="fx-top fixed right-4 bottom-[calc(84px+env(safe-area-inset-bottom))] sm:right-[26px] sm:bottom-[254px] z-[61] w-12 h-12 p-0 border-0 rounded-full cursor-pointer bg-[#e6f0f5] text-[#0b4db5] grid place-items-center shadow-[6px_6px_14px_rgba(20,84,120,0.14),-6px_-6px_14px_rgba(255,255,255,0.92)] transition-colors duration-200"
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            {/* Background track circle */}
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="rgba(11,77,181,0.15)"
              strokeWidth="3"
            />
            {/* Dynamic yellow progress circle */}
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#F5B82E"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="126"
              strokeDashoffset={dashOffset}
              transform="rotate(-90 24 24)"
              className="transition-[stroke-dashoffset] duration-100 ease-linear"
            />
          </svg>
          {/* Upward Chevron Arrow */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative z-10 transition-transform group-hover:-translate-y-0.5"
            aria-hidden="true"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}


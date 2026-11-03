'use client';

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [dashOffset, setDashOffset] = useState(126);

  useEffect(() => {
    const circumference = 2 * Math.PI * 20; // ~125.66, approximated to 126 in design

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;

      if (totalHeight > 0) {
        const progress = Math.min(Math.max(scrollY / totalHeight, 0), 1);
        setVisible(progress > 0.12);
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

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed right-6.5 bottom-[248px] z-[61] max-sm:bottom-[228px] max-sm:right-4 w-12 h-12 p-0 border-0 rounded-full cursor-pointer bg-[#e6f0f5] text-[#0b4db5] grid place-items-center shadow-[6px_6px_14px_rgba(20,84,120,0.14),-6px_-6px_14px_rgba(255,255,255,0.92)] hover:-translate-y-1 active:scale-95 transition-all duration-200"
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
    </button>
  );
}


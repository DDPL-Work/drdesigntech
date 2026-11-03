'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const toastItems = [
  {
    ic: "📈",
    t: "Rejoy Tours · Meta Ads",
    d: "360 travel leads in 15 days",
    href: "/our-work",
  },
  {
    ic: "🚀",
    t: "Just launched",
    d: "Cedra — online flower & gift store",
    href: "/our-work",
  },
  {
    ic: "🔍",
    t: "Free website audit",
    d: "Check your site’s speed & SEO in 60 seconds",
    href: "/audit",
  },
  {
    ic: "💳",
    t: "Slideit · Fintech",
    d: "Credit-scoring tool & UI/UX — deployed",
    href: "/our-work",
  },
  {
    ic: "✈️",
    t: "Traveamer",
    d: "Travel platform designed & developed",
    href: "/our-work",
  },
  {
    ic: "📸",
    t: "Follow our work",
    d: "@drdesigntechnology on Instagram",
    href: "https://www.instagram.com/drdesigntechnology/",
  },
];

export default function LiveToasts() {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isDismissed, setIsDismissed] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const hideTimerRef = useRef(null);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && sessionStorage.getItem("dd-toasts-off") === "1") {
        setTimeout(() => setIsDismissed(true), 0);
      }
    } catch {
      // Ignore sessionStorage errors
    }
  }, []);

  useEffect(() => {
    if (isDismissed) return;

    let toastCounter = 0;

    const showNextToast = () => {
      // Don't show toast if lead modal or a dialog is open
      if (document.querySelector('.lp[role="dialog"]') || document.querySelector('[role="dialog"]')) {
        return;
      }

      setCurrentIndex(toastCounter % toastItems.length);
      toastCounter++;
      setTimerKey((prev) => prev + 1);

      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        setCurrentIndex(-1);
      }, 6500);
    };

    // First toast after 10s, then subsequent every 22s
    const initialTimeout = setTimeout(showNextToast, 10000);
    const interval = setInterval(showNextToast, 22000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [isDismissed]);

  const handleDismiss = () => {
    setCurrentIndex(-1);
    setIsDismissed(true);
    try {
      sessionStorage.setItem("dd-toasts-off", "1");
    } catch {
      // Ignore sessionStorage errors
    }
  };

  const activeToast = toastItems[currentIndex];
  if (isDismissed || !activeToast) return null;

  const isExternal = activeToast.href.startsWith("http");

  return (
    <div
      className="fixed left-5.5 bottom-5.5 z-[70] max-sm:left-4 max-sm:bottom-[86px] pointer-events-none"
      aria-live="polite"
    >
      <div className="relative pointer-events-auto w-[min(340px,calc(100vw-32px))] bg-white rounded-[18px] overflow-hidden shadow-[0_22px_44px_-18px_rgba(14,27,46,0.45),0_0_0_1px_rgba(11,77,181,0.08)] transition-all duration-300 animate-[fadeIn_0.35s_ease-out]">
        <Link
          href={activeToast.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          onClick={() => setCurrentIndex(-1)}
          className="flex items-center gap-3.5 p-3.5 pr-8 no-underline text-[#0e1b2e] hover:bg-[#f6fbfd] transition-colors"
        >
          {/* Toast Icon */}
          <span
            className="w-11 h-11 rounded-2xl bg-[#f0f7fb] grid place-items-center text-[22px] shrink-0 shadow-[inset_2px_2px_4px_rgba(20,84,120,0.08)]"
            aria-hidden="true"
          >
            {activeToast.ic}
          </span>

          {/* Toast Content */}
          <span className="flex flex-col min-w-0 pr-2">
            <b className="font-extrabold text-[14px] leading-tight text-[#0e1b2e] truncate">
              {activeToast.t}
            </b>
            <small className="text-[12.5px] text-[#5b6b80] font-semibold mt-1 leading-snug line-clamp-1">
              {activeToast.d}
            </small>
          </span>
        </Link>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Hide notifications"
          className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full text-[#5b6b80] hover:text-[#0e1b2e] hover:bg-[#eaf6f8] grid place-items-center text-[16px] leading-none transition-colors border-0 cursor-pointer"
        >
          ×
        </button>

        {/* 6.5s Countdown Timer Bar */}
        <div
          key={timerKey}
          className="absolute left-0 right-0 bottom-0 h-[3px] bg-gradient-to-r from-[#0b4db5] to-[#f5b82e] origin-left animate-[timerProgress_6.5s_linear_forwards]"
        />
      </div>
    </div>
  );
}

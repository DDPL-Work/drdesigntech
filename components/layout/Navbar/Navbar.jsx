'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { openLeadModal } from "@/utils/events";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const logoImg = '/assets/logo.png';

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About" },
  { href: "/our-services", label: "Services" },
  { href: "/our-work", label: "Our Work" },
  { href: "/faq", label: "FAQs" },
  { href: "/contact-with-us", label: "Contact" },
  { href: "/audit", label: "Free Audit", highlight: true },
];

export function Brand({ dark = false }) {
  return (
    <Link href="/" className="flex items-center gap-3 no-underline">
      <span className="w-[50px] h-[50px] md:w-[54px] md:h-[54px] rounded-full bg-white grid place-items-center shadow-[inset_2px_2px_5px_rgba(20,84,120,0.12)] shrink-0">
        <img src={logoImg} alt="Dr. Design Pvt. Ltd. logo" className="w-9 h-10 md:w-10 md:h-11 object-contain" />
      </span>
      <span className="flex flex-col leading-none">
        <b className={`font-['Poppins'] font-extrabold text-[18px] md:text-[20px] ${dark ? "text-white" : "text-[#0b4db5]"}`}>
          DR. DESIGN
        </b>
        <small className={`font-['Poppins'] font-bold text-[10px] md:text-[11px] tracking-[0.26em] mt-1 ${dark ? "text-[#F5B82E]" : "text-[#0e1b2e]"}`}>
          TECHNOLOGY
        </small>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-[#0e1b2e] text-[#c9d6e8] text-[13px]">
        <div className="max-w-[1240px] mx-auto px-6 flex flex-wrap justify-between items-center gap-2 min-h-[40px] py-1.5">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#25aa5a] inline-block animate-[blink_1.4s_infinite]" />
            Support desk open 10 AM – 6 PM IST · Monday to Saturday
          </span>
          <span className="flex gap-5 flex-wrap">
            <a href="tel:+917217052558" className="text-white no-underline hover:text-[#f5b82e] transition-colors">
              +91 7217052558
            </a>
            <a href="mailto:contact@drdesigntech.com" className="text-white no-underline hover:text-[#f5b82e] transition-colors">
              contact@drdesigntech.com
            </a>
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 py-3.5 bg-[#e6f3f6]/80 backdrop-blur-[14px]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="flex items-center justify-between gap-4 min-h-[74px] py-2 pl-4 pr-2.5 rounded-full bg-[#eaf6f8] shadow-[14px_14px_32px_rgba(20,84,120,0.14),-12px_-12px_28px_rgba(255,255,255,0.92)]">
            <Brand />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`no-underline font-semibold text-[14.5px] px-3.5 py-2 rounded-full transition-all duration-200 ${
                      item.highlight
                        ? "bg-[#f5b82e]/20 text-[#b07a00] font-extrabold hover:bg-[#f5b82e]/30 shadow-sm"
                        : isActive
                        ? "text-[#0b4db5] font-extrabold bg-[#eaf6f8] shadow-[inset_2px_2px_5px_rgba(20,84,120,0.12),inset_-2px_-2px_5px_#ffffff]"
                        : "text-[#0e1b2e] hover:text-[#0b4db5] hover:bg-[#eaf6f8] hover:shadow-[inset_2px_2px_5px_rgba(20,84,120,0.08),inset_-2px_-2px_5px_#ffffff]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://wa.me/917217052558"
                aria-label="Chat on WhatsApp"
                className="w-[50px] h-[50px] rounded-full grid place-items-center text-[#1e9e52] bg-[#eaf6f8] shadow-[6px_6px_14px_rgba(20,84,120,0.14),-6px_-6px_14px_rgba(255,255,255,0.92)] hover:scale-[1.07] transition-transform duration-200 cursor-pointer border-0 max-sm:hidden"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={22} />
              </a>

              <button
                type="button"
                onClick={() => openLeadModal("quote")}
                className="btn btn-blue shine"
              >
                Get a free proposal
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                className="lg:hidden w-[50px] h-[50px] rounded-full grid place-items-center text-[#0e1b2e] bg-[#eaf6f8] shadow-[6px_6px_14px_rgba(20,84,120,0.14),-6px_-6px_14px_rgba(255,255,255,0.92)] hover:scale-[1.07] transition-transform duration-200 cursor-pointer border-0"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  {menuOpen ? (
                    <path d="M6 6l12 12M18 6L6 18" />
                  ) : (
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Navigation */}
          {menuOpen && (
            <nav
              className="mt-2.5 p-4 rounded-[26px] flex flex-col gap-1.5 overflow-hidden bg-[#eaf6f8] shadow-[14px_14px_32px_rgba(20,84,120,0.14),-12px_-12px_28px_rgba(255,255,255,0.92)] lg:hidden animate-[fadeIn_0.2s_ease-out]"
              aria-label="Mobile"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`p-3 rounded-xl font-bold text-[15px] no-underline transition-colors flex items-center justify-between ${
                    item.highlight
                      ? "bg-[#f5b82e]/20 text-[#b07a00]"
                      : pathname === item.href
                      ? "bg-[#e6f3f6] text-[#0b4db5]"
                      : "text-[#0e1b2e] hover:bg-[#e6f3f6] hover:text-[#0b4db5]"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.highlight && (
                    <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-[#f5b82e] text-[#0e1b2e]">
                      HOT
                    </span>
                  )}
                </Link>
              ))}
              <button
                type="button"
                className="btn btn-blue w-full mt-2"
                onClick={() => {
                  setMenuOpen(false);
                  openLeadModal("quote");
                }}
              >
                Get a free proposal
              </button>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}

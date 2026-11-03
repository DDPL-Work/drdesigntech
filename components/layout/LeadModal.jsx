'use client';

import { useState, useEffect, useRef } from "react";

const globeSvg = '/assets/icons/globe.svg';
const webSvg = '/assets/icons/web.svg';
const appSvg = '/assets/icons/app.svg';
const socialSvg = '/assets/icons/social.svg';
const adsSvg = '/assets/icons/ads.svg';
const seoSvg = '/assets/icons/seo.svg';
const chatSvg = '/assets/icons/chat.svg';

const serviceOptions = [
  "Website",
  "Mobile App",
  "ERP / CRM",
  "SEO & Google Ads",
  "Social Media & Ads",
  "AI Chatbot",
  "Geospatial / GIS",
  "Not sure yet",
];

const orbitIcons = [
  { name: "web", icon: webSvg },
  { name: "app", icon: appSvg },
  { name: "social", icon: socialSvg },
  { name: "ads", icon: adsSvg },
  { name: "seo", icon: seoSvg },
  { name: "chat", icon: chatSvg },
];

function ConfettiBurst() {
  const dots = Array.from({ length: 18 }, (_, i) => i);
  const colors = ["#F5B82E", "#0B4DB5", "#5BC4D0", "#25D366", "#E0393A"];

  return (
    <div className="absolute left-1/2 top-[66px] w-0 h-0 pointer-events-none" aria-hidden="true">
      {dots.map((n) => {
        const angle = (n / dots.length) * Math.PI * 2;
        const dist = 90 + (n % 3) * 30;
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;
        return (
          <span
            key={n}
            className="absolute w-2.5 h-2.5 rounded-[3px]"
            style={{
              background: colors[n % colors.length],
              transform: `translate(${x}px, ${y}px) scale(0.4) rotate(180deg)`,
              opacity: 0,
              transition: "transform 1.1s ease-out, opacity 1.1s ease-out",
            }}
          />
        );
      })}
    </div>
  );
}

export default function LeadModal({ delay = 9000 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeTab, setActiveTab] = useState("quote");
  const [submittedType, setSubmittedType] = useState("");
  const [selectedService, setSelectedService] = useState("Website");
  const nameInputRef = useRef(null);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 220);
  };

  // Auto trigger after delay or on exit intent
  useEffect(() => {
    try {
      if (sessionStorage.getItem("dd-lead-seen")) return;
    } catch {
      return;
    }

    const trigger = () => {
      try {
        if (!sessionStorage.getItem("dd-lead-seen")) {
          sessionStorage.setItem("dd-lead-seen", "1");
          setActiveTab("quote");
          setIsOpen(true);
        }
      } catch {
        setIsOpen(true);
      }
    };

    const timer = setTimeout(trigger, delay);

    const onMouseOut = (e) => {
      const isDesktop =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (isDesktop && !e.relatedTarget && e.clientY <= 0) {
        trigger();
      }
    };

    document.addEventListener("mouseout", onMouseOut);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [delay]);

  // Global event listener to open modal from anywhere (tabs, navbar, cta)
  useEffect(() => {
    const handleOpen = (e) => {
      try {
        sessionStorage.setItem("dd-lead-seen", "1");
      } catch {
        // ignore
      }
      setActiveTab(e.detail || "quote");
      setSubmittedType("");
      setIsClosing(false);
      setIsOpen(true);
    };

    window.addEventListener("open-lead", handleOpen);
    return () => window.removeEventListener("open-lead", handleOpen);
  }, []);

  // Handle escape key and focus
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", handleKeyDown);
    const focusTimer = setTimeout(() => {
      nameInputRef.current?.focus();
    }, 350);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(focusTimer);
    };
  }, [isOpen, activeTab]);

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const note = formData.get("note");

    const message = `Hi Dr. Design, I'd like a free quote.
Name: ${name}
Phone: ${phone}
Service: ${selectedService}${note ? `\nDetails: ${note}` : ""}`;

    const waUrl = `https://wa.me/917217052558?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSubmittedType("quote");
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const subject = encodeURIComponent("Newsletter sign-up");
    const body = encodeURIComponent(
      `Please add ${email} to the Dr. Design newsletter.`
    );
    window.location.href = `mailto:contact@drdesigntech.com?subject=${subject}&body=${body}`;
    setSubmittedType("news");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] grid place-items-center max-[760px]:place-items-end p-4 max-[760px]:p-0 [perspective:1200px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lp-title"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-[#08142c]/55 backdrop-blur-[6px] ${
          isClosing
            ? "animate-[scrimOut_0.22s_ease-in_forwards]"
            : "animate-[scrimIn_0.3s_ease-out_forwards]"
        }`}
        onClick={closeModal}
      />

      {/* Modal Dialog Card */}
      <div
        className={`relative w-[min(880px,100%)] max-h-[calc(100vh-32px)] max-[760px]:max-h-[92vh] overflow-y-auto no-scrollbar grid grid-cols-[0.9fr_1.1fr] max-[760px]:grid-cols-1 rounded-[30px] max-[760px]:rounded-b-none max-[760px]:rounded-t-[26px] bg-[#f4fafc] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)] ${
          isClosing
            ? "animate-[modalOut_0.22s_ease-in_forwards]"
            : "animate-[modalIn_0.42s_cubic-bezier(0.16,1,0.3,1)_forwards]"
        }`}
      >
        {/* Close Button */}
        <button
          type="button"
          className="absolute top-3.5 right-3.5 max-[760px]:top-3 max-[760px]:right-3 z-10 w-[42px] h-[42px] rounded-full bg-white grid place-items-center text-[#0e1b2e] shadow-[0_6px_14px_rgba(0,0,0,0.12)] cursor-pointer hover:rotate-90 transition-transform duration-250 border-0"
          aria-label="Close"
          onClick={closeModal}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* Left Side: Animated Orbit & Visual Art */}
        <div
          className="relative overflow-hidden isolate min-h-[460px] max-[760px]:min-h-0 text-white flex flex-col justify-end max-[760px]:flex-row max-[760px]:items-center max-[760px]:justify-start p-[26px] max-[760px]:p-[18px_20px] [--r:112px]"
          aria-hidden="true"
        >
          {/* Background Mesh */}
          <div className="absolute -inset-[20%] -z-20 bg-[radial-gradient(40%_45%_at_20%_20%,rgba(91,196,208,0.6),transparent_70%),radial-gradient(40%_45%_at_85%_80%,rgba(245,184,46,0.4),transparent_70%),linear-gradient(140deg,#0b4db5,#082f78)] animate-[ctaMesh_10s_ease-in-out_infinite_alternate]" />

          {/* Outer Ring */}
          <div className="absolute left-1/2 top-[40%] w-[270px] h-[270px] -ml-[135px] -mt-[135px] rounded-full border-[1.5px] border-dashed border-white/35 animate-[spin_40s_linear_infinite] max-[760px]:hidden" />

          {/* Inner Glowing Ring */}
          <div className="absolute left-1/2 top-[40%] w-[170px] h-[170px] -ml-[85px] -mt-[85px] rounded-full border-[1.5px] border-solid border-white/20 shadow-[inset_0_0_40px_rgba(91,196,208,0.4)] max-[760px]:hidden" />

          {/* Orbiting Nodes */}
          <div className="absolute left-1/2 top-[40%] w-0 h-0 animate-[spin_24s_linear_infinite] max-[760px]:hidden">
            {orbitIcons.map((item, idx) => (
              <span
                key={item.name}
                className="absolute -left-[22px] -top-[22px]"
                style={{
                  transform: `rotate(${idx * 60}deg) translateX(var(--r)) rotate(${-idx * 60}deg)`,
                }}
              >
                <span className="w-[44px] h-[44px] rounded-full grid place-items-center bg-white shadow-[0_10px_18px_-6px_rgba(0,0,0,0.4)] animate-[spinr_24s_linear_infinite]">
                  <img
                    src={item.icon}
                    alt=""
                    width={22}
                    height={22}
                    className="block drop-shadow-[0_8px_8px_rgba(11,77,181,0.18)]"
                  />
                </span>
              </span>
            ))}
          </div>

          {/* Central Floating Globe */}
          <div className="absolute left-1/2 top-[40%] -ml-[55px] -mt-[55px] drop-shadow-[0_18px_18px_rgba(0,0,0,0.4)] max-[760px]:hidden">
            <img src={globeSvg} alt="" width={110} height={110} className="block" />
          </div>

          {/* Art Bottom Copy */}
          <div className="relative flex flex-col gap-1">
            <span className="self-start inline-flex items-center gap-[7px] px-3 py-1.5 mb-2 rounded-full text-[12px] font-bold bg-white/15 border border-white/25 text-white">
              <span className="w-2 h-2 rounded-full bg-[#25aa5a] inline-block animate-[blink_1.4s_infinite]" />
              Reply within one business day
            </span>
            <b className="font-['Poppins'] text-[26px] max-[760px]:text-[20px] font-extrabold tracking-[-0.02em] leading-tight text-white">
              Free strategy call
            </b>
            <span className="text-[#dce8fa] text-[14.5px]">
              + growth roadmap for your business
            </span>
          </div>
        </div>

        {/* Right Side: Interactive Forms */}
        <div className="relative p-[28px_30px_26px] max-[760px]:p-[18px_18px_calc(18px+env(safe-area-inset-bottom))] flex flex-col gap-3.5">
          {/* Tab Switcher */}
          <div
            className="relative grid grid-cols-2 p-1 mr-[46px] rounded-full bg-[#e3eff3] shadow-[inset_3px_3px_7px_rgba(20,84,120,0.12),inset_-3px_-3px_7px_#ffffff]"
            role="tablist"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "quote"}
              className={`relative z-[1] min-h-[40px] border-0 bg-transparent cursor-pointer font-bold font-['Plus_Jakarta_Sans'] text-[14px] rounded-full transition-colors duration-200 ${
                activeTab === "quote" ? "text-white" : "text-[#44546a]"
              }`}
              onClick={() => {
                setActiveTab("quote");
                setSubmittedType("");
              }}
            >
              Free quote
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "news"}
              className={`relative z-[1] min-h-[40px] border-0 bg-transparent cursor-pointer font-bold font-['Plus_Jakarta_Sans'] text-[14px] rounded-full transition-colors duration-200 ${
                activeTab === "news" ? "text-white" : "text-[#44546a]"
              }`}
              onClick={() => {
                setActiveTab("news");
                setSubmittedType("");
              }}
            >
              Newsletter
            </button>
            <span
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-[#0b4db5] shadow-[0_8px_16px_-8px_rgba(11,77,181,0.9)] transition-all duration-250 pointer-events-none"
              style={{
                left: activeTab === "quote" ? 4 : "50%",
              }}
            />
          </div>

          {/* Content: Success or Forms */}
          {submittedType ? (
            <div className="relative flex flex-col items-center text-center gap-3 py-[30px] px-1.5">
              <ConfettiBurst />
              <span className="w-[74px] h-[74px] rounded-full grid place-items-center bg-[#25aa5a] shadow-[0_0_0_10px_rgba(37,170,90,0.15)]">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12l5 5 9-10" />
                </svg>
              </span>
              <h3 id="lp-title" className="font-['Poppins'] m-0 mt-1.5 text-[26px] font-extrabold tracking-[-0.02em] text-[#0e1b2e]">
                {submittedType === "quote" ? "Almost done!" : "You're on the list!"}
              </h3>
              <p className="m-0 text-[#44546a] text-[14.5px] leading-[1.6]">
                {submittedType === "quote"
                  ? "Press send in WhatsApp and our team will reply within one business day."
                  : "Send the email that just opened to confirm your sign-up."}
              </p>
              <button
                type="button"
                className="btn btn-blue mt-2"
                onClick={closeModal}
              >
                Back to the site
              </button>
            </div>
          ) : activeTab === "quote" ? (
            <form className="flex flex-col gap-3" onSubmit={handleQuoteSubmit}>
              <h3 id="lp-title" className="font-['Poppins'] m-0 mt-1.5 text-[26px] max-[760px]:text-[22px] font-extrabold tracking-[-0.02em] text-[#0e1b2e]">
                Get your <span className="text-[#0b4db5]">free quote</span>
              </h3>
              <p className="m-0 text-[#44546a] text-[14.5px] leading-[1.6]">
                Tell us what you need — we&apos;ll send a clear plan and price.
              </p>

              {/* Service Chips */}
              <div className="flex flex-wrap gap-1.5 my-1">
                {serviceOptions.map((service) => {
                  const isSelected = selectedService === service;
                  return (
                    <button
                      key={service}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedService(service)}
                      className={`min-h-[36px] px-3 py-0 rounded-full border-[1.5px] font-semibold font-['Plus_Jakarta_Sans'] text-[13px] cursor-pointer inline-flex items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? "bg-[#0b4db5] border-[#0b4db5] text-white"
                          : "bg-white border-[#CFE1E7] text-[#0e1b2e] hover:border-[#0b4db5]"
                      }`}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>

              {/* Input: Name */}
              <label className="flex flex-col gap-1.5 text-[13.5px] font-bold text-[#0e1b2e]">
                Your name *
                <input
                  ref={nameInputRef}
                  name="name"
                  required
                  placeholder="Your name"
                  autoComplete="name"
                  className="font-['Plus_Jakarta_Sans'] font-medium text-[14.5px] px-4 py-2.5 rounded-[14px] border-0 bg-[#e6f3f6] text-[#0e1b2e] placeholder-[#5b6b80] outline-none w-full box-border shadow-[inset_4px_4px_8px_rgba(20,84,120,0.13),inset_-4px_-4px_8px_rgba(255,255,255,0.95)] "
                />
              </label>

              {/* Input: Phone */}
              <label className="flex flex-col gap-1.5 text-[13.5px] font-bold text-[#0e1b2e]">
                Phone / WhatsApp *
                <input
                  name="phone"
                  required
                  type="tel"
                  placeholder="+91 9xxxx xxxxx"
                  autoComplete="tel"
                  className="font-['Plus_Jakarta_Sans'] font-medium text-[14.5px] px-4 py-2.5 rounded-[14px] border-0 bg-[#e6f3f6] text-[#0e1b2e] placeholder-[#5b6b80] outline-none w-full box-border shadow-[inset_4px_4px_8px_rgba(20,84,120,0.13),inset_-4px_-4px_8px_rgba(255,255,255,0.95)] "
                />
              </label>

              {/* Input: Note */}
              <label className="flex flex-col gap-1.5 text-[13.5px] font-bold text-[#0e1b2e]">
                Anything else? (optional)
                <input
                  name="note"
                  placeholder="e.g. new website for my clinic"
                  className="font-['Plus_Jakarta_Sans'] font-medium text-[14.5px] px-4 py-2.5 rounded-[14px] border-0 bg-[#e6f3f6] text-[#0e1b2e] placeholder-[#5b6b80] outline-none w-full box-border shadow-[inset_4px_4px_8px_rgba(20,84,120,0.13),inset_-4px_-4px_8px_rgba(255,255,255,0.95)] "
                />
              </label>

              {/* Submit Button with Animated Conic Border & Golden Shimmer Face */}
              <button type="submit" className="btn btn-glow lp__submit">
                <span>Get my free quote</span> <span className="arr">→</span>
              </button>
              <small className="text-center text-[#6b7b90] text-[12px] m-0 block">
                Opens WhatsApp with your details · no spam, ever
              </small>
            </form>
          ) : (
            <form className="flex flex-col gap-3" onSubmit={handleNewsletterSubmit}>
              <h3 id="lp-title" className="font-['Poppins'] m-0 mt-1.5 text-[26px] max-[760px]:text-[22px] font-extrabold tracking-[-0.02em] text-[#0e1b2e]">
                Grow with <span className="text-[#0b4db5]">smart tips</span>
              </h3>
              <p className="m-0 text-[#44546a] text-[14.5px] leading-[1.6]">
                Monthly ideas on websites, SEO, social media ads and automation for
                growing businesses.
              </p>
              <ul className="list-none m-0 p-0 flex flex-col gap-2 my-1">
                <li className="relative pl-7 font-semibold text-[14.5px] text-[#0e1b2e] before:content-['✓'] before:absolute before:left-0 before:top-[1px] before:w-5 before:h-5 before:rounded-full before:grid before:place-items-center before:text-[11px] before:font-extrabold before:text-white before:bg-[#25aa5a]">
                  Website &amp; SEO checklists
                </li>
                <li className="relative pl-7 font-semibold text-[14.5px] text-[#0e1b2e] before:content-['✓'] before:absolute before:left-0 before:top-[1px] before:w-5 before:h-5 before:rounded-full before:grid before:place-items-center before:text-[11px] before:font-extrabold before:text-white before:bg-[#25aa5a]">
                  Social media &amp; ads ideas that work
                </li>
                <li className="relative pl-7 font-semibold text-[14.5px] text-[#0e1b2e] before:content-['✓'] before:absolute before:left-0 before:top-[1px] before:w-5 before:h-5 before:rounded-full before:grid before:place-items-center before:text-[11px] before:font-extrabold before:text-white before:bg-[#25aa5a]">
                  New tools to automate your business
                </li>
              </ul>

              <label className="flex flex-col gap-1.5 text-[13.5px] font-bold text-[#0e1b2e]">
                Email address *
                <input
                  ref={nameInputRef}
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  autoComplete="email"
                  className="font-['Plus_Jakarta_Sans'] font-medium text-[14.5px] px-4 py-2.5 rounded-[14px] border-0 bg-[#e6f3f6] text-[#0e1b2e] placeholder-[#5b6b80] outline-none w-full box-border shadow-[inset_4px_4px_8px_rgba(20,84,120,0.13),inset_-4px_-4px_8px_rgba(255,255,255,0.95)] "
                />
              </label>

              {/* Submit Button with Animated Conic Border & Golden Shimmer Face */}
              <button type="submit" className="btn btn-glow lp__submit">
                <span>Subscribe free</span> <span className="arr">→</span>
              </button>
              <small className="text-center text-[#6b7b90] text-[12px] m-0 block">
                One email a month · unsubscribe anytime
              </small>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

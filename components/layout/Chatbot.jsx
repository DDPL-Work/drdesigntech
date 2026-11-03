'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const INITIAL_BOT_MSG = {
  from: "bot",
  text: "Hi! I’m the Dr. Design AI assistant. I can answer questions about our services, pricing, tech stack, and recent work — or put together a quick proposal for you. How can I help today?",
  chips: ["Our services", "See our work", "Free quote", "Cost & timelines"]
};

const SERVICES_CARDS = [
  { n: "Websites", d: "Next.js, React, WordPress & custom web apps", price: "From ₹25k", href: "/know-that-what-work-we-do" },
  { n: "Mobile Apps", d: "Flutter, React Native for iOS & Android", price: "From ₹45k", href: "/know-that-what-work-we-do" },
  { n: "AI Chatbots", d: "Custom trained 24/7 web & WhatsApp bots", price: "From ₹15k", href: "/know-that-what-work-we-do" },
  { n: "SEO & Ads", d: "Google Ads, Meta Ads & rank-1 SEO growth", price: "From ₹18k/mo", href: "/know-that-what-work-we-do" },
];

const WORK_CARDS = [
  { n: "Slideit", d: "Fintech buy-now-pay-later credit tool", price: "Live", href: "/work-we-have-done" },
  { n: "Traveamer", d: "Travel management platform & SaaS", price: "Live", href: "/work-we-have-done" },
  { n: "Mugafi", d: "IoT device tracking & billing automation", price: "Live", href: "/work-we-have-done" },
  { n: "Rejoy Tours", d: "Meta Ads 1,420+ leads & 5.4x ROAS", price: "Case Study", href: "/work-we-have-done" },
];

const LEAD_STEPS = [
  { key: "name", ask: "Great! Let’s get you a free proposal. What’s your name?" },
  { key: "phone", ask: "What WhatsApp or phone number should our team reach you at?" },
  { key: "email", ask: "And your email address? (or type “skip”)" },
  { key: "details", ask: "Could you share a brief sentence about what you’d like to build?" },
  {
    key: "when",
    ask: "When are you planning to start?",
    chips: ["Immediately", "In 1–2 weeks", "This month", "Just exploring"]
  }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_BOT_MSG]);
  const [leadState, setLeadState] = useState(null); // { step: 0, data: {} }
  const [isTyping, setIsTyping] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [showNudge, setShowNudge] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const msgsEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setShowNudge(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  // Show nudge after 20s if not dismissed or opened
  useEffect(() => {
    try {
      if (sessionStorage.getItem("dd-chat-nudged") === "1") return;
    } catch {
      return;
    }

    const timer = setTimeout(() => {
      setShowNudge(true);
      setUnreadCount(1);
      try {
        sessionStorage.setItem("dd-chat-nudged", "1");
      } catch {}
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  // Send Bot Message with typing delay
  const sendBotMsg = (msg, delay = 600) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { from: "bot", ...msg }]);
      if (!isOpen) {
        setUnreadCount((c) => c + 1);
      }
    }, delay);
  };

  // Start Lead Questionnaire
  const startLeadFlow = (serviceName) => {
    setLeadState({ step: 0, data: serviceName ? { service: serviceName } : {} });
    sendBotMsg({
      text: serviceName
        ? `Great — let’s put together a custom proposal for ${serviceName}. What’s your name?`
        : LEAD_STEPS[0].ask,
      chips: undefined
    });
  };

  // Finalize Lead Submission
  const finishLeadFlow = (data) => {
    setLeadState(null);
    const summary = `New enquiry from website chat\nName: ${data.name || ""}\nPhone: ${data.phone || ""}\nEmail: ${data.email || "N/A"}\nService: ${data.service || "General Inquiry"}\nProject: ${data.details || ""}\nStart: ${data.when || "Flexible"}`;
    const waUrl = `https://wa.me/917217052558?text=${encodeURIComponent(summary)}`;
    const mailUrl = `mailto:contact@drdesigntech.com?subject=${encodeURIComponent(`Website Enquiry – ${data.name || "Client"}`)}&body=${encodeURIComponent(summary)}`;

    sendBotMsg(
      {
        text: `Thank you, ${data.name?.split(" ")[0] || "there"}! ✅ Here’s a summary of your inquiry. Click below to deliver it directly to our team on WhatsApp or Email:`,
        lead: data,
        waUrl,
        mailUrl,
        chips: ["Our services", "See our work"]
      },
      700
    );
  };

  // Process Lead Step Input
  const handleLeadInput = (text) => {
    const stepConfig = LEAD_STEPS[leadState.step];
    let val = text.trim();

    if (stepConfig.key === "name" && val.length < 2) {
      return sendBotMsg({ text: "Could you share your full name, please?" });
    }
    if (stepConfig.key === "phone") {
      const clean = val.replace(/\D/g, "");
      if (clean.length < 8 || clean.length > 15) {
        return sendBotMsg({ text: "Please enter a valid phone number with country code, e.g. +91 98xxx xxxxx." });
      }
    }
    if (stepConfig.key === "email") {
      if (/^(skip|no|na|n\/a|-)$/i.test(val)) {
        val = "";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        return sendBotMsg({ text: "That email looks incomplete. Please type it again or type “skip”." });
      }
    }

    const updatedData = { ...leadState.data, [stepConfig.key]: val };
    const nextStep = leadState.step + 1;

    if (nextStep >= LEAD_STEPS.length) {
      finishLeadFlow(updatedData);
    } else {
      setLeadState({ step: nextStep, data: updatedData });
      const nextConfig = LEAD_STEPS[nextStep];
      sendBotMsg({ text: nextConfig.ask, chips: nextConfig.chips });
    }
  };

  // Main input handler
  const handleSend = (textToSend) => {
    const text = (textToSend ?? inputVal).trim();
    if (!text) return;

    setInputVal("");
    setMessages((prev) => [...prev, { from: "me", text }]);

    const lower = text.toLowerCase();

    // Cancel / Exit
    if (/^(cancel|stop|exit|restart)$/i.test(lower)) {
      setLeadState(null);
      return sendBotMsg({
        text: "No problem! Resetting. What else can I help you with?",
        chips: ["Our services", "See our work", "Free quote"]
      });
    }

    // Lead questionnaire active
    if (leadState) {
      return handleLeadInput(text);
    }

    // Quick intents
    if (/our services|services|what do you do/i.test(lower)) {
      return sendBotMsg({
        text: "We specialize in end-to-end digital engineering and growth strategy. Here are our core services:",
        cards: SERVICES_CARDS,
        chips: ["Free quote", "See our work", "Cost & timelines"]
      });
    }

    if (/see our work|our work|portfolio|case studies|projects/i.test(lower)) {
      return sendBotMsg({
        text: "Here are some of our recently delivered websites, web apps, and marketing campaigns:",
        cards: WORK_CARDS,
        chips: ["Free quote", "Our services", "Talk to a person"]
      });
    }

    if (/free quote|quote|proposal|pricing|cost|estimate/i.test(lower)) {
      return startLeadFlow();
    }

    if (/cost & timelines|timeline|how long/i.test(lower)) {
      return sendBotMsg({
        text: "Most standard website projects launch within 2–4 weeks. Mobile apps and custom ERPs typically take 6–10 weeks. Pricing starts at ₹25k for websites and ₹45k for mobile apps. Would you like a personalized estimate?",
        chips: ["Free quote", "Our services", "Chat on WhatsApp"]
      });
    }

    if (/whatsapp|talk to a person|human|call/i.test(lower)) {
      return sendBotMsg({
        text: "You can talk directly with our lead solution architect right now on WhatsApp (+91 7217052558) or call us during business hours (10 AM – 6 PM IST).",
        waUrl: "https://wa.me/917217052558?text=Hi%20Dr.%20Design%2C%20I%20have%20an%20enquiry.",
        chips: ["Free quote", "Our services"]
      });
    }

    // Default Fallback
    sendBotMsg({
      text: "Thanks for asking! We’d love to understand your requirements in detail. Would you like to get a free proposal or explore our services?",
      chips: ["Free quote", "Our services", "See our work"]
    });
  };

  const resetChat = () => {
    setLeadState(null);
    setMessages([INITIAL_BOT_MSG]);
  };

  return (
    <>
      {/* Nudge Notification Pill */}
      {showNudge && !isOpen && (
        <button
          type="button"
          className="cb-nudge"
          onClick={() => setIsOpen(true)}
        >
          <span
            className="cb-nudge__x"
            role="button"
            aria-label="Dismiss"
            onClick={(e) => {
              e.stopPropagation();
              setShowNudge(false);
            }}
          >
            ×
          </span>
          <b>Hi! 👋 Need help?</b>
          <span>Ask about pricing, services or our work — I reply instantly.</span>
        </button>
      )}

      {/* Floating Launch FAB */}
      <button
        type="button"
        className={`cb-launch ${isOpen ? "is-open" : ""}`}
        aria-label={isOpen ? "Close chat" : "Chat with us"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12z" />
            <circle cx="8.5" cy="12" r=".6" fill="currentColor" />
            <circle cx="12" cy="12" r=".6" fill="currentColor" />
            <circle cx="15.5" cy="12" r=".6" fill="currentColor" />
          </svg>
        )}
        {!isOpen && unreadCount > 0 && (
          <span className="cb-badge">{unreadCount}</span>
        )}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="cb" role="dialog" aria-label="Dr. Design AI Assistant">
          {/* Header */}
          <div className="cb-head">
            <div className="cb-head__ava">
              <img src="/assets/bot-avatar.png" alt="Dr. Design" />
              <i aria-hidden="true" />
            </div>
            <div className="cb-head__t">
              <b>Dr. Design Assistant</b>
              <small>
                <span className="cb-dot" /> Online · Instant replies
              </small>
            </div>
            <button
              type="button"
              className="cb-head__btn"
              title="Restart conversation"
              aria-label="Restart chat"
              onClick={resetChat}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
            <button
              type="button"
              className="cb-head__btn"
              title="Close chat"
              aria-label="Close chat"
              onClick={() => setIsOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="cb-msgs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`cb-msg ${m.from === "me" ? "cb-msg--me" : "cb-msg--bot"}`}
              >
                {m.from === "bot" && (
                  <div className="cb-ava">
                    <img src="/assets/bot-avatar.png" alt="" />
                  </div>
                )}
                <div className="cb-bubble">
                  <p>{m.text}</p>

                  {/* Cards preview (Services / Portfolio) */}
                  {m.cards && (
                    <div className="cb-cards">
                      {m.cards.map((card, cIdx) => (
                        <Link
                          key={cIdx}
                          href={card.href}
                          className="cb-card"
                          onClick={() => setIsOpen(false)}
                        >
                          <b>{card.n}</b>
                          <small>{card.d}</small>
                          <span>{card.price}</span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Lead Summary Actions */}
                  {m.lead && (
                    <div className="cb-lead">
                      <div className="cb-lead__row">
                        <span>Name</span>
                        <b>{m.lead.name}</b>
                      </div>
                      <div className="cb-lead__row">
                        <span>Phone</span>
                        <b>{m.lead.phone}</b>
                      </div>
                      {m.lead.email && (
                        <div className="cb-lead__row">
                          <span>Email</span>
                          <b>{m.lead.email}</b>
                        </div>
                      )}
                      <div className="cb-lead__row">
                        <span>Service</span>
                        <b>{m.lead.service || "Web / App Project"}</b>
                      </div>
                      <div className="cb-lead__row">
                        <span>Project</span>
                        <b>{m.lead.details}</b>
                      </div>
                      <div className="cb-lead__row">
                        <span>Start</span>
                        <b>{m.lead.when}</b>
                      </div>

                      <a
                        href={m.waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cb-lead__wa"
                      >
                        Send on WhatsApp →
                      </a>
                      <a href={m.mailUrl} className="cb-lead__mail">
                        Or send via Email
                      </a>
                    </div>
                  )}

                  {/* Quick Chips */}
                  {m.chips && (
                    <div className="cb-chips">
                      {m.chips.map((chip, chipIdx) => (
                        <button
                          key={chipIdx}
                          type="button"
                          onClick={() => handleSend(chip)}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="cb-msg cb-msg--bot">
                <div className="cb-ava">
                  <img src="/assets/bot-avatar.png" alt="" />
                </div>
                <div className="cb-bubble cb-typing">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}
            <div ref={msgsEndRef} />
          </div>

          {/* Input Footer */}
          <form
            className="cb-input"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder={leadState ? "Type your answer..." : "Ask a question..."}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </form>

          <div className="cb-foot">
            Automated assistant ·{" "}
            <a
              href="https://wa.me/917217052558"
              target="_blank"
              rel="noopener noreferrer"
            >
              chat with a person on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}


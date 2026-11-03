'use client';

import { useState, useRef } from "react";
import Link from "next/link";
import { openLeadModal } from "@/utils/events";
import {
  FaSearch,
  FaMobileAlt,
  FaDesktop,
  FaCheckCircle,
  FaExclamationTriangle,
  FaWhatsapp,
  FaRedo,
} from "react-icons/fa";

export default function AuditPage() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState("mobile");
  const [status, setStatus] = useState("idle"); // idle | scanning | done | error
  const [stepIndex, setStepIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [report, setReport] = useState(null);
  const abortCtrlRef = useRef(null);

  const scanSteps = [
    "Connecting to URL & checking server headers...",
    "Measuring First Contentful Paint (FCP) & LCP...",
    "Testing Core Web Vitals on mobile viewport...",
    "Auditing SEO schema, meta tags & indexability...",
    "Finalizing diagnostic report...",
  ];

  const handleRunAudit = async (e) => {
    e?.preventDefault();
    if (!url.trim()) {
      setErrorMsg("Please enter a valid website address, e.g. yourbusiness.com");
      setStatus("error");
      return;
    }

    let cleanUrl = url.trim();
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = "https://" + cleanUrl;
    }

    if (abortCtrlRef.current) abortCtrlRef.current.abort();
    const ac = new AbortController();
    abortCtrlRef.current = ac;

    setErrorMsg("");
    setReport(null);
    setStatus("scanning");
    setStepIndex(0);

    const stepInterval = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, scanSteps.length - 1));
    }, 2800);

    try {
      const params = new URLSearchParams({
        url: cleanUrl,
        strategy,
      });
      ["performance", "accessibility", "best-practices", "seo"].forEach((cat) =>
        params.append("category", cat)
      );

      const res = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`,
        { signal: ac.signal }
      );

      clearInterval(stepInterval);
      const data = await res.json();

      if (!res.ok || !data.lighthouseResult) {
        throw new Error(data?.error?.message || "Unable to complete scan on this URL.");
      }

      const cats = data.lighthouseResult.categories || {};
      const parsedScores = [
        {
          label: "Performance",
          score: Math.round((cats.performance?.score || 0) * 100),
          desc: "Speed, rendering efficiency, and interactivity",
        },
        {
          label: "SEO",
          score: Math.round((cats.seo?.score || 0) * 100),
          desc: "Search engine discoverability and metadata",
        },
        {
          label: "Best Practices",
          score: Math.round((cats["best-practices"]?.score || 0) * 100),
          desc: "Security, modern web standards, and HTTPS",
        },
        {
          label: "Accessibility",
          score: Math.round((cats.accessibility?.score || 0) * 100),
          desc: "Usability for all users, contrast, and ARIA labels",
        },
      ];

      const overall = Math.round(
        parsedScores.reduce((acc, c) => acc + c.score, 0) / parsedScores.length
      );

      setReport({
        url: cleanUrl,
        strategy,
        overall,
        scores: parsedScores,
      });
      setStatus("done");
    } catch (err) {
      clearInterval(stepInterval);
      if (err.name === "AbortError") return;
      setErrorMsg(
        err.message ||
          "Could not complete scan. Please ensure the domain is online and accessible, or contact us for a manual audit."
      );
      setStatus("error");
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-[#25aa5a] bg-[#25aa5a]/10 border-[#25aa5a]/30";
    if (score >= 50) return "text-[#f5b82e] bg-[#f5b82e]/10 border-[#f5b82e]/30";
    return "text-[#e0393a] bg-[#e0393a]/10 border-[#e0393a]/30";
  };

  return (
    <div className="py-10 md:py-16">
      {/* Header */}
      <section className="max-w-[1240px] mx-auto px-6 text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0b4db5]/10 text-[#0b4db5] text-[13px] font-extrabold tracking-wider uppercase mb-4">
          Free Diagnostic Tool · 60 Seconds
        </div>
        <h1 className="font-['Poppins'] font-extrabold text-[36px] sm:text-[48px] md:text-[58px] leading-tight text-[#0e1b2e] max-w-[900px] mx-auto">
          Free Website <span className="text-[#0b4db5]">Speed & SEO Audit</span>
        </h1>
        <p className="max-w-[700px] mx-auto text-[#3b4b60] text-[16px] sm:text-[18px] mt-4 leading-relaxed font-medium">
          Powered by real-time Google Lighthouse. Check your Core Web Vitals, mobile responsiveness, and SEO readiness instantly.
        </p>

        {/* Input Form Box */}
        <div className="max-w-[750px] mx-auto mt-10 p-6 md:p-8 rounded-[30px] bg-[#eaf6f8] shadow-[14px_14px_32px_rgba(20,84,120,0.12),-12px_-12px_28px_rgba(255,255,255,0.9)]">
          <form onSubmit={handleRunAudit} className="flex flex-col gap-4">
            {/* Device Switcher */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <button
                type="button"
                onClick={() => setStrategy("mobile")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold border-0 cursor-pointer transition-all ${
                  strategy === "mobile"
                    ? "bg-[#0b4db5] text-white shadow-md"
                    : "bg-white text-[#0e1b2e] shadow-sm hover:text-[#0b4db5]"
                }`}
              >
                <FaMobileAlt /> Mobile (Recommended)
              </button>
              <button
                type="button"
                onClick={() => setStrategy("desktop")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold border-0 cursor-pointer transition-all ${
                  strategy === "desktop"
                    ? "bg-[#0b4db5] text-white shadow-md"
                    : "bg-white text-[#0e1b2e] shadow-sm hover:text-[#0b4db5]"
                }`}
              >
                <FaDesktop /> Desktop
              </button>
            </div>

            {/* URL Input and Action */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative grow">
                <input
                  type="text"
                  placeholder="e.g. yourcompany.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={status === "scanning"}
                  className="w-full px-5 py-4 rounded-2xl bg-white border border-[#0b4db5]/15 text-[#0e1b2e] text-[16px] font-semibold placeholder:text-[#5b6b80]/60 focus:outline-none focus:ring-2 focus:ring-[#0b4db5]/30 shadow-[inset_2px_2px_4px_rgba(20,84,120,0.06)] disabled:opacity-60"
                />
              </div>
              <button
                type="submit"
                disabled={status === "scanning"}
                className="btn btn-sun shine shrink-0 px-8 text-[15px] font-extrabold disabled:opacity-60"
              >
                {status === "scanning" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-[#0e1b2e] border-t-transparent animate-spin" />
                    Scanning...
                  </span>
                ) : (
                  <>Run free audit <span className="arr">→</span></>
                )}
              </button>
            </div>
          </form>

          {/* Scanning Progress Status */}
          {status === "scanning" && (
            <div className="mt-6 p-5 rounded-2xl bg-white flex flex-col items-center gap-3 animate-[fadeIn_0.3s]">
              <div className="w-full bg-[#eaf6f8] h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#0b4db5] to-[#f5b82e] transition-all duration-500"
                  style={{ width: `${((stepIndex + 1) / scanSteps.length) * 100}%` }}
                />
              </div>
              <span className="text-[14px] font-bold text-[#0b4db5]">
                {scanSteps[stepIndex]}
              </span>
            </div>
          )}

          {/* Error Message */}
          {status === "error" && (
            <div className="mt-4 p-4 rounded-2xl bg-[#fff0f0] border border-[#e0393a]/20 text-[#e0393a] text-[14px] font-semibold flex items-center gap-3 text-left">
              <FaExclamationTriangle className="text-[18px] shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      </section>

      {/* Generated Report Card */}
      {status === "done" && report && (
        <section className="max-w-[1000px] mx-auto px-6 animate-[fadeIn_0.4s_ease-out]">
          <div className="p-8 md:p-12 rounded-[36px] bg-[#eaf6f8] shadow-[16px_16px_36px_rgba(20,84,120,0.14),-14px_-14px_32px_rgba(255,255,255,0.92)]">
            {/* Header info */}
            <div className="flex flex-col md:flex-row items-center justify-between pb-8 border-b border-[#0b4db5]/15 gap-4">
              <div className="text-center md:text-left">
                <span className="text-[12px] font-extrabold tracking-wider uppercase text-[#0b4db5] block mb-1">
                  Official Scan Report
                </span>
                <h3 className="font-['Poppins'] font-extrabold text-[24px] md:text-[28px] text-[#0e1b2e]">
                  {report.url}
                </h3>
                <span className="text-[13px] text-[#5b6b80] font-semibold">
                  Device: {report.strategy.toUpperCase()} · Tested live with Google PageSpeed
                </span>
              </div>

              {/* Overall Score Circle */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center font-['Poppins'] font-extrabold text-[28px] ${getScoreColor(
                    report.overall
                  )}`}
                >
                  {report.overall}
                  <span className="text-[9px] font-bold uppercase tracking-wider text-inherit -mt-1">
                    Overall
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Category Score Gauges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-8">
              {report.scores.map((sc, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-extrabold text-[15px] text-[#0e1b2e]">
                        {sc.label}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[13px] font-extrabold border ${getScoreColor(
                          sc.score
                        )}`}
                      >
                        {sc.score}/100
                      </span>
                    </div>
                    <p className="text-[12.5px] text-[#5b6b80] font-medium leading-relaxed">
                      {sc.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-[#0b4db5]/15 flex flex-wrap items-center justify-between gap-4">
              <div className="text-[14.5px] font-semibold text-[#0e1b2e]">
                Need our team to optimize your site to 95+ score?
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/917217052558?text=${encodeURIComponent(
                    `Hi Dr. Design, I ran the free website audit for ${report.url} (${report.strategy}). Overall score is ${report.overall}/100. Please help me improve speed and SEO.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sun shine"
                >
                  <FaWhatsapp className="text-[18px]" /> Share report on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => openLeadModal("Website Speed Optimization")}
                  className="btn btn-blue"
                >
                  Get free fix plan
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}


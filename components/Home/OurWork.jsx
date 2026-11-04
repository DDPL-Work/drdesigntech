"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import CaseStudyMetaAds from "./CaseStudies/CaseStudyMetaAds";
import CaseStudyAIMetaGoogleAds from "./CaseStudies/CaseStudyAIMetaGoogleAds";
import CaseStudyBlackCar from "./CaseStudies/CaseStudyBlackCar";
import CaseStudyCoaching from "./CaseStudies/CaseStudyCoaching";
import CaseStudyHairClinic from "./CaseStudies/CaseStudyHairClinic";
import CaseStudyPetBrand from "./CaseStudies/CaseStudyPetBrand";
import CaseStudyEcommerceSEO from "./CaseStudies/CaseStudyEcommerceSEO";
import CaseStudyFinanceCourses from "./CaseStudies/CaseStudyFinanceCourses";
import CaseStudyTravelFunnel from "./CaseStudies/CaseStudyTravelFunnel";
import CaseStudySportingGoods from "./CaseStudies/CaseStudySportingGoods";
import CaseStudyLifestyleBrand from "./CaseStudies/CaseStudyLifestyleBrand";
import CaseStudySweetsBrand from "./CaseStudies/CaseStudySweetsBrand";
import ReelsAndContent from "./ReelsAndContent";
const slideitImg = "/assets/work/slideit.jpg";
const traveamerImg = "/assets/work/traveamer.jpg";
const mugafiImg = "/assets/work/mugafi.jpg";
const polatGlobalImg = "/assets/work/polat-global.jpg";
const cedraImg = "/assets/work/cedra.jpg";
const churchillSquareImg = "/assets/work/churchill-square.jpg";
const gmsHealingImg = "/assets/work/gms-healing.jpg";
const subhashIyerImg = "/assets/work/subhash-iyer.jpg";
const toolWebMvpsImg = "/assets/work/tool-web-mvps.jpg";

const statusConfigMap = {
  Live: { c: "#1E9E52", bg: "#DDF5E6" },
  Deployed: { c: "#0B4DB5", bg: "#E1ECFF" },
  Completed: { c: "#0B4DB5", bg: "#E1ECFF" },
  "In progress": { c: "#B07A00", bg: "#FFF3D6" },
};

// All 9 projects from B3 in design file with their actual extracted images
const projectsData = [
  {
    name: "Slideit",
    client: "Private IT sector · Fintech",
    title: "Credit-scoring tool & UI/UX design",
    overview:
      "An automated financial tool that streamlines data processing to calculate accurate credit scores instantly — plus UI/UX design for Slideit, a buy-now-pay-later app that splits purchases into 3 or 4 interest-free instalments.",
    stack: ["UI/UX", "PHP", "React", "Tailwind", "CSS", "MySQL"],
    status: "Live",
    url: "https://slideitapp.com/",
    domain: "slideitapp.com",
    image: slideitImg,
    sym: "app",
    bg: "#2A2560",
    ring: "rgba(255,255,255,0.3)",
    featured: true,
  },
  {
    name: "Traveamer",
    client: "Travel tech · SaaS",
    title: "Travel platform design & development",
    overview:
      "An automated travel solution that simplifies itinerary management and approval workflows to reduce administrative overhead — designed and developed end to end.",
    stack: ["UI/UX", "Design", "Development", "Approval workflows"],
    status: "Live",
    url: "https://traveamer.com/",
    domain: "traveamer.com",
    image: traveamerImg,
    sym: "app",
    bg: "#0B1A45",
    ring: "rgba(255,255,255,0.3)",
    featured: true,
  },
  {
    name: "Mugafi",
    client: "AI Screenwriting · IP Incubator",
    title: "Digital ecosystem for storytellers",
    overview:
      "An end-to-end digital ecosystem for screenwriters and creators, featuring AI-powered script co-pilots, automated industry formatting, and IP incubation to turn ideas into monetizable media assets.",
    stack: ["AI Co-Pilot", "Script Automation", "IP Incubator", "React"],
    status: "Live",
    url: "https://mugafi.com/",
    domain: "mugafi.com",
    image: mugafiImg,
    sym: "app",
    bg: "#2A0B14",
    ring: "rgba(255,255,255,0.3)",
    featured: true,
  },
  {
    name: "Polat Global Investments",
    client: "Real estate · Türkiye",
    title: "Property marketplace website",
    overview:
      "A responsive property marketplace designed for seamless navigation, offering real-time listing updates — villas and homes in Güllük, Milas and Bodrum.",
    stack: ["UI/UX", "Responsive", "Real-time listings", "Multilingual"],
    status: "Live",
    url: "https://polatglobal.com/",
    domain: "polatglobal.com",
    image: polatGlobalImg,
    sym: "web",
    bg: "#1C2B33",
    ring: "rgba(255,255,255,0.3)",
    featured: true,
  },
  {
    name: "Cedra",
    client: "Flower e-commerce · Morocco",
    title: "Online flower & gift store",
    overview:
      "A scalable online store designed for recurring revenue, integrating advanced PHP functionality with a high-conversion user interface.",
    stack: ["WordPress", "PHP", "CSS", "Bootstrap", "SQL"],
    status: "Live",
    url: "https://cedraflower.com/",
    domain: "cedraflower.com",
    image: cedraImg,
    sym: "web",
    bg: "#7A0F24",
    ring: "rgba(255,255,255,0.3)",
    featured: true,
  },
  {
    name: "Churchill Square Consulting",
    client: "UI/UX design · UK",
    title: "Home page & blog page design",
    overview:
      "UI/UX design of the home page and blog page for Churchill Square Consulting, a UK Insights Discovery training and practitioner accreditation partner — clear messaging, trust badges and simple paths to book a discovery call.",
    stack: ["UI/UX", "Home page", "Blog page"],
    status: "Live",
    url: "https://churchillsquareconsulting.com/",
    domain: "churchillsquareconsulting.com",
    image: churchillSquareImg,
    sym: "web",
    bg: "#1565C0",
    ring: "rgba(255,255,255,0.35)",
    featured: true,
  },
  {
    name: "Gandharva · GMS Healing Instruments",
    client: "E-commerce · Rishikesh",
    title: "Sound healing online store",
    overview:
      "A complete e-commerce store for Gandharva, a sound healing and mindful living brand in Tapovan, Rishikesh — singing bowls, gongs, chimes, yoga and meditation essentials, with cart, customer accounts and shipping across India and worldwide.",
    stack: ["E-commerce", "Web design", "Development"],
    status: "Live",
    url: "https://gmshealinginstrument.com/",
    domain: "gmshealinginstrument.com",
    image: gmsHealingImg,
    sym: "web",
    bg: "#0B4DB5",
    ring: "rgba(255,255,255,0.35)",
    featured: true,
  },
  {
    name: "Subhash Iyer",
    client: "Author website",
    title: "Website & book landing page",
    overview:
      "Author website and book landing page for Subhash Iyer — a cinematic hero slider showcasing A Seeker’s Lens and Navapura – The City of Nine Gates, with Buy the book journeys, an announcement ticker and blog.",
    stack: ["Landing page", "HTML"],
    status: "Live",
    url: "https://subhashiyer.com/",
    domain: "subhashiyer.com",
    image: subhashIyerImg,
    sym: "globe",
    bg: "#0E1B2E",
    ring: "rgba(255,255,255,0.3)",
    featured: true,
  },
  {
    name: "Tool Web MVPs",
    client: "Private IT sector · Security SaaS",
    title: "Ad graphics suite",
    overview:
      "Created a suite of ad graphics with a clean, tech-forward aesthetic, focusing on conveying trust and simplifying complex security messages into clear visual hooks — for Tool Web, an AI-powered MicroSaaS MVP platform.",
    stack: ["Ad graphics", "Canva", "Branding"],
    status: "Live",
    url: "https://toolwebmvps.com/",
    domain: "toolwebmvps.com",
    image: toolWebMvpsImg,
    sym: "chart",
    bg: "#12407F",
    ring: "rgba(255,255,255,0.3)",
    featured: true,
  },
];

function StatusBadge({ status }) {
  const cfg = statusConfigMap[status] || statusConfigMap.Completed;
  return (
    <span
      className="wk-status inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
      style={{ color: cfg.c, backgroundColor: cfg.bg }}
    >
      <span
        className="wk-status__dot relative w-[7px] h-[7px] rounded-full after:content-[''] after:absolute after:inset-0 after:rounded-full after:bg-inherit after:animate-[ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite]"
        style={{ backgroundColor: cfg.c }}
      />
      {status}
    </span>
  );
}

function WorkCard({ project, index, featured = true }) {
  return (
    <Reveal
      as="article"
      delay={index * 0.07}
      className={`neu lift wk-card group flex flex-col p-3.5 rounded-[28px] bg-[#eaf6f8] text-[#0e1b2e] shadow-[10px_10px_24px_rgba(20,84,120,0.14),-10px_-10px_24px_rgba(255,255,255,0.92)] transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-[14px_18px_32px_rgba(20,84,120,0.2),-14px_-14px_32px_rgba(255,255,255,0.95)]${
        featured ? " wk-card--feat" : ""
      }`}
    >
      {/* Card Visual / Screenshot / Browser mockup */}
      <div
        className="wk-card__img relative rounded-[20px] overflow-hidden grid place-items-center p-3.5 sm:p-5 pb-8 sm:pb-10"
        style={{ backgroundColor: project.bg }}
      >
        {/* Decorative Rotating Ring */}
        <div
          className="ring-deco spin60 absolute rounded-full border-[1.5px] border-dashed pointer-events-none animate-[spin_60s_linear_infinite]"
          style={{ width: 320, height: 320, borderColor: project.ring }}
          aria-hidden="true"
        />

        {/* Browser Window Mockup */}
        <div className="wk-browser w-full max-w-none mx-auto rounded-[14px] bg-white overflow-hidden shadow-[0_26px_44px_-22px_rgba(0,0,0,0.55)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:-translate-y-1.5 group-hover:shadow-[0_34px_54px_-24px_rgba(0,0,0,0.65)]">
          {/* Chrome Top Bar */}
          <div className="wk-browser__bar flex items-center gap-1.5 px-3 py-2 bg-[#eaf3f7] text-xs font-semibold text-[#5b6b80]">
            <i className="inline-block w-[9px] h-[9px] rounded-full bg-[#e0393a]" />
            <i className="inline-block w-[9px] h-[9px] rounded-full bg-[#f5b82e]" />
            <i className="inline-block w-[9px] h-[9px] rounded-full bg-[#25aa5a]" />
            <span className="ml-2 px-3 py-0.5 rounded-full bg-white truncate">
              {project.domain}
            </span>
          </div>

          {/* Screenshot Body */}
          <div className="wk-browser__body overflow-hidden bg-white">
            <img
              className="wk-shot block w-full aspect-[2.15/1] object-cover object-left-top transition-transform duration-800 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.03]"
              src={project.image}
              alt={`${project.name} website homepage`}
              loading="lazy"
            />
          </div>
        </div>

        {/* Project Number */}
        <span className="wk-num absolute left-4 bottom-2.5 sm:bottom-3.5 font-extrabold text-[13px] font-sans tracking-[0.14em] text-white/85">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Card Content Body */}
      <div className="wk-card__body px-2 pt-5 pb-2 flex flex-col gap-2 flex-1">
        <div className="wk-card__top flex justify-between items-center gap-2.5">
          <span className="wk-client text-[13px] font-bold text-[#0b4db5]">
            {project.client}
          </span>
          <StatusBadge status={project.status} />
        </div>

        <h3 className="m-0 mt-1 font-sans text-[21px] font-bold leading-tight text-[#0e1b2e] transition-colors duration-200 group-hover:text-[#0b4db5]">
          {project.name}
        </h3>
        <b className="wk-title text-[14.5px] font-bold text-[#0e1b2e] leading-snug">
          {project.title}
        </b>
        <p className="m-0 text-[#3b4b60] text-[14.5px] leading-[1.65]">
          {project.overview}
        </p>

        {/* Card Footer: Tech Stack + Visit Link */}
        <div className="wk-card__foot mt-auto pt-2.5 flex flex-col items-stretch gap-3">
          <div className="wk-stack flex flex-wrap gap-1.5">
            {project.stack.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full text-xs font-bold text-white bg-[#0b4db5]"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.url && (
            <a
              className="wk-visit group/visit inline-flex items-center justify-center gap-1.5 min-h-[46px] px-4 rounded-full text-[13.5px] font-bold text-white bg-[#25aa5a] no-underline shadow-[0_10px_20px_-10px_rgba(37,170,90,0.8)] hover:bg-[#1e9e52] hover:text-white transition-all duration-200 cursor-pointer"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Visit live site</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/visit:translate-x-0.5 group-hover/visit:-translate-y-0.5"
              >
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function OurWork({ bare = false }) {
  return (
    <section
      id="work"
      className="sec relative w-full overflow-hidden py-7 sm:py-10 md:pb-[88px]"
      aria-label="Our work"
    >
      <div className="wrap max-w-[1400px] mx-auto px-4 sm:px-[18px] flex flex-col gap-10">
        {!bare && (
          <div className="head-row flex flex-wrap justify-between items-end gap-5">
            <div className="head flex flex-col gap-2">
              <Reveal
                as="span"
                className="eyebrow self-start inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#eef8fa] shadow-[5px_5px_12px_rgba(20,84,120,0.13),-5px_-5px_12px_rgba(255,255,255,0.95)] text-[13px] font-bold text-[#0b4db5] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f5b82e] before:shadow-[0_0_0_4px_rgba(245,184,46,0.25)]"
              >
                Our work
              </Reveal>
              <Reveal
                as="h2"
                className="h2 m-0 font-sans text-[clamp(30px,4vw,50px)] leading-[1.12] font-extrabold tracking-[-0.02em] text-[#0e1b2e]"
              >
                Real clients.{" "}
                <span className="hl text-[#0b4db5]">Live results.</span>
              </Reveal>
              <Reveal
                as="p"
                className="lead m-0 text-base sm:text-[17px] leading-[1.7] text-[#44546a] max-w-[620px]"
              >
                A few recent projects — live websites, deployed products and
                design work for clients in India and abroad.
              </Reveal>
            </div>
            <Reveal>
              <Link
                href="/reach-to-us"
                className="btn btn-neu group inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 rounded-full font-bold text-[15px] no-underline cursor-pointer bg-[#eaf6f8] text-[#0e1b2e] shadow-[6px_6px_14px_rgba(20,84,120,0.14),-6px_-6px_14px_rgba(255,255,255,0.92)] hover:text-[#0b4db5] hover:-translate-y-0.5 hover:shadow-[8px_8px_18px_rgba(20,84,120,0.18),-8px_-8px_18px_rgba(255,255,255,0.96)] transition-all duration-200 border-0"
              >
                Start your project{" "}
                <span
                  className="arr inline-block transition-transform duration-250 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        )}

        {/* Featured Projects Grid matching design .wk-grid--feat */}
        <div className="wk-grid wk-grid--feat grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] [&>*:last-child:nth-child(odd)]:lg:col-span-full [&>*:last-child:nth-child(odd)]:lg:justify-self-center [&>*:last-child:nth-child(odd)]:lg:w-[calc(50%-12px)]">
          {projectsData.map((project, idx) => (
            <WorkCard
              key={project.name}
              project={project}
              index={idx}
              featured={true}
            />
          ))}
        </div>

        {/* 10 Case Studies & Reels Section matching 1:1 with design */}
        {bare && (
          <>
            <CaseStudyMetaAds />
            <CaseStudyAIMetaGoogleAds />
            <CaseStudyBlackCar />
            <CaseStudyCoaching />
            <CaseStudyHairClinic />
            <CaseStudyPetBrand />
            <CaseStudyEcommerceSEO />
            <CaseStudyFinanceCourses />
            <CaseStudyTravelFunnel />
            <CaseStudySportingGoods />
            <CaseStudySweetsBrand />
            <CaseStudyLifestyleBrand />
            <ReelsAndContent />
          </>
        )}
      </div>
    </section>
  );
}

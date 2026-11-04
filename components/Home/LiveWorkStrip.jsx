'use client';

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const projects = [
  {
    name: "Slideit",
    domain: "slideitapp.com",
    image: "/assets/work/slideit.jpg",
  },
  {
    name: "Traveamer",
    domain: "traveamer.com",
    image: "/assets/work/traveamer.jpg",
  },
  {
    name: "Mugafi",
    domain: "mugafi.com",
    image: "/assets/work/mugafi.jpg",
  },
  {
    name: "Polat Global Investments",
    domain: "polatglobal.com",
    image: "/assets/work/polat-global.jpg",
  },
  {
    name: "Cedra",
    domain: "cedraflower.com",
    image: "/assets/work/cedra.jpg",
  },
  {
    name: "Churchill Square Consulting",
    domain: "churchillsquareconsulting.com",
    image: "/assets/work/churchill-square.jpg",
  },
  {
    name: "Gandharva · GMS Healing Instruments",
    domain: "gmshealinginstrument.com",
    image: "/assets/work/gms-healing.jpg",
  },
  {
    name: "Subhash Iyer",
    domain: "subhashiyer.com",
    image: "/assets/work/subhash-iyer.jpg",
  },
  {
    name: "Tool Web MVPs",
    domain: "toolwebmvps.com",
    image: "/assets/work/tool-web-mvps.jpg",
  },
];

const evenRow = projects.filter((_, idx) => idx % 2 === 0);
const oddRow = projects.filter((_, idx) => idx % 2 === 1);

export default function LiveWorkStrip() {
  const renderRow = (items, isRev, duration) => (
    <div className="fx-strip__row [transform:rotateX(14deg)_rotate(-3deg)] [transform-style:preserve-3d]">
      <div
        className={`fx-strip__track flex gap-3.5 sm:gap-[22px] w-max animate-[marquee_60s_linear_infinite] group-hover/stage:[animation-play-state:paused] ${
          isRev ? "is-rev [animation-direction:reverse]" : ""
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        {[...items, ...items, ...items, ...items].map((s, c) => (
          <Link
            key={c}
            href="/work-we-have-done"
            className="fx-shot group/shot relative flex-none w-[250px] sm:w-[360px] rounded-[14px] overflow-hidden bg-white no-underline shadow-[0_26px_40px_-22px_rgba(14,27,46,0.55)] transition-[transform,box-shadow] duration-450 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-2.5 hover:scale-[1.04] hover:shadow-[0_36px_54px_-24px_rgba(11,77,181,0.55)] cursor-pointer"
            aria-hidden={c >= items.length}
            tabIndex={c >= items.length ? -1 : undefined}
          >
            {/* Browser top chrome */}
            <span className="fx-shot__bar flex items-center gap-[5px] px-2.5 py-[7px] bg-[#eaf3f7] text-[11px]">
              <i className="inline-block w-[7px] h-[7px] rounded-full bg-[#e0393a]" />
              <i className="inline-block w-[7px] h-[7px] rounded-full bg-[#f5b82e]" />
              <i className="inline-block w-[7px] h-[7px] rounded-full bg-[#25aa5a]" />
              <em className="not-italic font-semibold text-[#5b6b80] ml-1.5 truncate">
                {s.domain}
              </em>
            </span>

            {/* Live website preview screenshot */}
            <img
              src={s.image}
              alt={c < items.length ? `${s.name} website` : ""}
              loading="lazy"
              draggable="false"
              className="block w-full aspect-[2.15/1] object-cover object-left-top"
            />

            {/* Hover Floating Tag Badge */}
            <span className="fx-shot__tag absolute left-2.5 bottom-2.5 px-3 py-[5px] rounded-full text-xs font-extrabold text-white bg-[rgba(11,77,181,0.9)] opacity-0 translate-y-2 transition-all duration-300 group-hover/shot:opacity-100 group-hover/shot:translate-y-0 pointer-events-none">
              {s.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <section
      className="fx-strip relative w-full overflow-hidden pt-[50px] sm:pt-[70px] pb-10"
      aria-label="Recently launched websites"
    >
      {/* Header matching design */}
      <div className="fx-strip__head wrap max-w-[1400px] mx-auto px-4 sm:px-[18px] text-center flex flex-col items-center gap-2 mb-[26px]">
        <Reveal as="span" className="eyebrow center self-center inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#eef8fa] shadow-[5px_5px_12px_rgba(20,84,120,0.13),-5px_-5px_12px_rgba(255,255,255,0.95)] text-[13px] font-bold text-[#0b4db5] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f5b82e] before:shadow-[0_0_0_4px_rgba(245,184,46,0.25)]">
          Recently launched
        </Reveal>
        <Reveal as="h2" className="h2 m-0 font-sans text-[clamp(30px,4vw,50px)] leading-[1.12] font-extrabold tracking-[-0.02em] text-[#0e1b2e]">
          Live websites <span className="hl text-[#0b4db5]">built by Dr. Design</span>
        </Reveal>
      </div>

      {/* 3D Tilted Perspective Stage with dual continuous tracks */}
      <div className="fx-strip__stage group/stage flex flex-col gap-[22px] py-[30px] [perspective:1400px] [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
        {renderRow(evenRow, false, 60)}
        {renderRow(oddRow, true, 66)}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const reelsData = [
  { v: "/assets/reels/reel-1.mp4", p: "/assets/reels/poster-1.jpg", t: "Chocolate Almonds", tag: "Product reel · FMCG" },
  { v: "/assets/reels/reel-2.mp4", p: "/assets/reels/poster-2.jpg", t: "₹9,039 Cr small-cap funds", tag: "Finance explainer" },
  { v: "/assets/reels/reel-3.mp4", p: "/assets/reels/poster-3.jpg", t: "Handloom brand film", tag: "Fashion · storytelling" },
  { v: "/assets/reels/reel-4.mp4", p: "/assets/reels/poster-4.jpg", t: "“Everything is normal”", tag: "Teaser · launch" },
  { v: "/assets/reels/reel-5.mp4", p: "/assets/reels/poster-5.jpg", t: "Animated nutrition story", tag: "2D animation" },
  { v: "/assets/reels/reel-6.mp4", p: "/assets/reels/poster-6.jpg", t: "Your assets, within reach", tag: "Fintech · card launch" },
  { v: "/assets/reels/reel-7.mp4", p: "/assets/reels/poster-7.jpg", t: "09 funds, 3 goals", tag: "Investment explainer" },
];

const totalReels = reelsData.length;
const normIdx = (e) => ((e % totalReels) + totalReels) % totalReels;
const autoSpeed = 4200;

export default function ReelsAndContent() {
  const [pos, setPos] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [inView, setInView] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRefs = useRef([]);
  const containerRef = useRef(null);
  const posRef = useRef(0);
  const dragStart = useRef(null);
  const hasDragged = useRef(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const cardWidth = containerWidth < 560 ? 200 : containerWidth < 900 ? 230 : 260;
  const cardGap = containerWidth < 560 ? 14 : 26;
  const stepDistance = cardWidth * 0.82 + cardGap;
  const activeIndex = normIdx(Math.round(pos));
  const isPlayingSound = !isMuted;

  // Viewport and resize observers
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    const ro = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    io.observe(el);
    ro.observe(el);
    return () => {
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  const updatePos = (p) => {
    posRef.current = p;
    setPos(p);
  };

  // Auto rotation
  useEffect(() => {
    if (!inView || isDragging || isPlayingSound) return;
    let animId;
    let lastTime = performance.now();
    const tick = (now) => {
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;
      updatePos(posRef.current + (dt / autoSpeed) * (isHovered ? 0.45 : 1));
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [inView, isDragging, isPlayingSound, isHovered]);

  // Video play / pause according to active card
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === activeIndex && inView) {
        video.muted = isMuted;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex, inView, isMuted]);

  // Sound toggle reset
  useEffect(() => {
    if (isPlayingSound) setIsMuted(true);
  }, [activeIndex]);

  // Smooth animation to target index
  const animateTo = (target) => {
    const startPos = posRef.current;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = Math.min(1, (now - startTime) / 600);
      const ease = 1 - Math.pow(1 - elapsed, 3);
      updatePos(startPos + (target - startPos) * ease);
      if (elapsed < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const navStep = (dir) => {
    animateTo(Math.round(posRef.current) + dir);
  };

  const selectCard = (idx) => {
    let diff = normIdx(idx - activeIndex);
    if (diff > totalReels / 2) diff -= totalReels;
    animateTo(Math.round(posRef.current) + diff);
  };

  // Drag handlers
  const handlePointerDown = (e) => {
    dragStart.current = { x: e.clientX, p: posRef.current };
    hasDragged.current = false;
    setIsDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    if (Math.abs(dx) > 5) hasDragged.current = true;
    updatePos(dragStart.current.p - dx / stepDistance);
  };

  const handlePointerUp = () => {
    if (dragStart.current) {
      dragStart.current = null;
      setIsDragging(false);
    }
  };

  return (
    <section className="rl" aria-labelledby="rl-title" ref={containerRef}>
      <div className="head center text-center flex flex-col items-center gap-2">
        <span className="eyebrow center self-center inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef8fa] text-[13px] font-bold text-[#0b4db5] shadow-[4px_4px_10px_rgba(20,84,120,0.12),-4px_-4px_10px_rgba(255,255,255,0.9)] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f5b82e]">
          Reels & content
        </span>
        <h2 id="rl-title" className="h2 m-0 font-sans text-[clamp(28px,3.6vw,44px)] font-extrabold tracking-[-0.02em] text-[#0e1b2e] leading-tight">
          Scroll-stopping <span className="hl text-[#0b4db5]">reels we’ve created</span>
        </h2>
        <p className="lead m-0 text-base sm:text-[17px] text-[#5b6b80] max-w-[700px] leading-relaxed">
          Product reels, explainers, brand films and animations made for Instagram, YouTube Shorts and ads. Drag to explore — tap a reel to hear it.
        </p>
      </div>

      <div
        className={`rl__stage ${isDragging ? "is-drag" : ""}`}
        style={{ height: (cardWidth * 16) / 9 + 80 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handlePointerUp();
        }}
      >
        {reelsData.map((item, idx) => {
          let offset = ((idx - pos) % totalReels + totalReels) % totalReels;
          if (offset > totalReels / 2) offset -= totalReels;
          const absOffset = Math.abs(offset);
          const isActive = idx === activeIndex;
          const scale = absOffset < 1 ? 1 - absOffset * 0.14 : Math.max(0.7, 0.86 - (absOffset - 1) * 0.12);
          const opacity = absOffset > 2.6 ? 0 : absOffset > 2 ? 1 - (absOffset - 2) / 0.6 : 1;
          const zIndex = Math.round(100 - absOffset * 10);

          return (
            <div
              key={item.t}
              className={`rl__card ${isActive ? "is-on" : ""}`}
              style={{
                width: cardWidth,
                zIndex,
                opacity,
                pointerEvents: absOffset > 2.2 ? "none" : "auto",
                transform: `translateX(-50%) translateX(${offset * stepDistance}px) translateY(${
                  Math.min(absOffset, 2) * 13
                }px) rotateY(${-offset * 10}deg) scale(${scale})`,
              }}
              onClick={() => {
                if (hasDragged.current) return;
                if (isActive) {
                  setIsMuted((prev) => !prev);
                } else {
                  setIsMuted(true);
                  selectCard(idx);
                }
              }}
            >
              <div className="rl__phone">
                <video
                  ref={(el) => (videoRefs.current[idx] = el)}
                  src={item.v}
                  poster={item.p}
                  playsInline
                  muted={isMuted}
                  loop
                  preload={absOffset <= 1.5 ? "auto" : "metadata"}
                  draggable={false}
                />
                {isActive && (
                  <button
                    type="button"
                    className="rl__sound"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMuted((prev) => !prev);
                    }}
                  >
                    {isMuted ? "🔇" : "🔊"}
                  </button>
                )}
                {!isActive && (
                  <span className="rl__play" aria-hidden="true">
                    <i>▶</i>
                  </span>
                )}
              </div>
              <div className="rl__meta">
                <b>{item.t}</b>
                <small>{item.tag}</small>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="rl__nav">
        <button
          type="button"
          className="round neu-s"
          aria-label="Previous reel"
          onClick={() => navStep(-1)}
        >
          ‹
        </button>
        <div className="rv-dots flex items-center gap-2">
          {reelsData.map((item, idx) => (
            <button
              key={item.t}
              type="button"
              aria-label={`Show reel ${idx + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border-0 cursor-pointer ${
                idx === activeIndex
                  ? "bg-[#0b4db5] w-6"
                  : "bg-[#cad8e4] hover:bg-[#9fb2c8]"
              }`}
              onClick={() => selectCard(idx)}
            />
          ))}
        </div>
        <button
          type="button"
          className="round neu-s"
          aria-label="Next reel"
          onClick={() => navStep(1)}
        >
          ›
        </button>
      </div>

      {/* Action Buttons */}
      <div className="row flex flex-wrap justify-center gap-3 mt-4">
        <Link href="/reach-to-us" className="btn btn-blue btn-glow">
          <span>Get reels for my brand</span> <span className="arr">→</span>
        </Link>
        <a
          href="https://www.instagram.com/drdesigntechnology/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-neu"
        >
          See more on Instagram ↗
        </a>
      </div>
    </section>
  );
}


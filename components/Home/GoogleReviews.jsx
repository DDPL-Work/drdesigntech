'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';

const REVIEWS = [
  {
    name: "Madan Mohan Goel",
    initial: "M",
    color: "#6B4E9B",
    text: "I had a very good experience working with Doctor Design and Ashish. The work is clear, and communication is always good. They provide timely updates and are very punctual with their work. Any changes or fixes are handled smoothly without any arguments or hesitation. Overall, it was a very good and hassle-free experience."
  },
  {
    name: "Polat Global",
    initial: "P",
    color: "#689F38",
    text: "Excellent service and highly professional team! They have built multiple websites for our company, and we have always been impressed with their quality, responsiveness, and attention to detail. Great communication and reliable support throughout the process. Highly recommended!"
  },
  {
    name: "Suraaaj Shaaarma",
    initial: "S",
    color: "#78909C",
    text: `I recently had the pleasure of working with Dr Design Company, and I can confidently say that choosing them to build my website was one of the best decisions I made for my business.

From the very beginning, their team was professional, responsive, and genuinely interested in understanding my vision. They took the time to listen carefully to my ideas, goals, and expectations, and then turned them into a beautifully designed, fully functional website that exceeded what I had imagined.

One of the things I appreciated most was their commitment to delivering the project on time. In today's fast-paced world, meeting deadlines is extremely important, and Dr Design Company did exactly that. They kept me updated throughout the entire process, maintained clear communication, and ensured everything stayed on schedule without compromising quality.

The quality of their work truly stands out. The design is modern, clean, and user-friendly. The website runs smoothly, looks great on both desktop and mobile devices, and reflects my brand perfectly. I've already received positive feedback from clients about the professional look and easy navigation.

What impressed me even more was their pricing. The cost was very reasonable and fair for the level of service and quality they provided. It's not easy to find a company that offers both high-quality work and affordable prices, but Dr Design Company delivers on both.

Overall, I highly recommend Dr Design Company to anyone looking for reliable, skilled, and professional web design services. They are talented, trustworthy, and dedicated to customer satisfaction. I look forward to working with them again in the future!`
  },
  {
    name: "Pragya Bisht",
    initial: "P",
    color: "#7E57C2",
    text: `Working with Dr. Design Technology has been an exceptional experience. The team is highly skilled, professional, and truly committed to delivering quality results.

Communication is smooth, ideas are executed creatively, and they go the extra mile to ensure client satisfaction. Highly recommended for anyone looking for reliable and innovative tech solutions.`
  },
  {
    name: "Sue Lloyd",
    initial: "S",
    color: "#2E7D32",
    text: "We used them to design some web pages -they were excellent thank you"
  }
];

const MAX_CHAR_LENGTH = 230;
const GOOGLE_REVIEW_URL = "https://share.google/UhUoCrQSFN15Eqt2i";

const GoogleIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    aria-hidden="true"
    className="shrink-0"
  >
    <path
      fill="#FFC107"
      d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
    />
    <path
      fill="#FF3D00"
      d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
    />
  </svg>
);

const StarRating = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className="rv-stars inline-flex gap-0.5" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((t) => (
        <svg
          key={t}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`shrink-0 ${inView ? 'rv-star-anim' : 'opacity-0'}`}
          style={{ animationDelay: `${0.2 + t * 0.08}s` }}
        >
          <path
            d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"
            fill="#FBBC04"
          />
        </svg>
      ))}
    </span>
  );
};

const ReviewCard = ({ review, index }) => {
  const isLong = review.text.length > MAX_CHAR_LENGTH;
  const [expanded, setExpanded] = useState(false);

  const displayText =
    isLong && !expanded
      ? `${review.text.slice(0, MAX_CHAR_LENGTH).replace(/\s+\S*$/, "")}…`
      : review.text;

  return (
    <figure
      className="neu lift rv-card relative m-0 flex flex-col justify-between gap-3.5 overflow-hidden p-6 sm:p-7 h-full min-h-[380px] sm:min-h-[420px]"
    >
      <span
        className="rv-quote select-none pointer-events-none"
        aria-hidden="true"
      >
        “
      </span>

      <div className="flex flex-col gap-3.5 flex-1">
        <figcaption className="rv-head flex items-center gap-3">
          <span
            className="rv-avatar shrink-0 select-none text-white font-bold text-[19px] grid place-items-center rounded-full"
            style={{ backgroundColor: review.color }}
          >
            {review.initial}
          </span>
          <span className="rv-who flex flex-col gap-[3px] text-left">
            <b className="text-[#0e1b2e] font-bold text-base leading-snug">{review.name}</b>
            <span className="rv-src inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#5b6b80]">
              <GoogleIcon size={14} /> Google review
            </span>
          </span>
        </figcaption>

        <StarRating />

        <blockquote className="rv-text m-0 text-[15px] sm:text-[15.5px] leading-[1.7] text-[#24344a] whitespace-pre-line text-left flex-1">
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={expanded ? "o" : "c"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="transition-opacity duration-250 ease-in-out"
            >
              {displayText}
            </motion.span>
          </AnimatePresence>
        </blockquote>
      </div>

      {isLong ? (
        <button
          type="button"
          className="rv-more self-start mt-auto pt-2 pb-0 px-0 border-0 bg-transparent font-bold text-sm text-[#0b4db5] hover:text-[#083a8a] cursor-pointer underline underline-offset-[3px] transition-colors"
          aria-expanded={expanded}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Show less" : "Read full review"}
        </button>
      ) : (
        <div className="h-6 mt-auto" aria-hidden="true" />
      )}
    </figure>
  );
};

function useVisibleCount() {
  const [vis, setVis] = useState(3);

  useEffect(() => {
    const getCount = () => {
      if (window.innerWidth < 700) return 1;
      if (window.innerWidth < 1080) return 2;
      return 3;
    };
    setVis(getCount());
    const handleResize = () => setVis(getCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return vis;
}

// 3 sets of slides for seamless circular infinite looping
const SLIDES = [...REVIEWS, ...REVIEWS, ...REVIEWS];
const SET_SIZE = REVIEWS.length;
const INITIAL_INDEX = SET_SIZE; // 5

const ReviewSlider = () => {
  const vis = useVisibleCount();
  const [currentIdx, setCurrentIdx] = useState(INITIAL_INDEX);
  const [enableTransition, setEnableTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  // Transition reset for seamless infinite loop
  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;

    if (currentIdx >= SET_SIZE * 2) {
      setEnableTransition(false);
      setCurrentIdx((prev) => prev - SET_SIZE);
    } else if (currentIdx < SET_SIZE) {
      setEnableTransition(false);
      setCurrentIdx((prev) => prev + SET_SIZE);
    }
  };

  // Re-enable CSS transition after silent reset frame
  useEffect(() => {
    if (!enableTransition) {
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true);
        });
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [enableTransition]);

  // Autoplay with 5200ms timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setEnableTransition(true);
      setCurrentIdx((prev) => prev + 1);
    }, 5200);
    return () => clearInterval(interval);
  }, [isPaused]);

  const step = (delta) => {
    setEnableTransition(true);
    setCurrentIdx((prev) => prev + delta);
  };

  const goTo = (dotIdx) => {
    setEnableTransition(true);
    setCurrentIdx(SET_SIZE + dotIdx);
  };

  // Active dot mapped to the 5 reviews
  const activeDot = ((currentIdx % SET_SIZE) + SET_SIZE) % SET_SIZE;

  return (
    <div
      className="rv-slider"
      style={{ "--vis": vis }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(e) => {
        setIsPaused(true);
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        setIsPaused(false);
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchEndX - touchStartX.current;
        if (Math.abs(diff) > 40) {
          step(diff < 0 ? 1 : -1);
        }
      }}
    >
      <div className="rv-viewport">
        <div
          className="rv-track"
          style={{
            transform: `translateX(calc(${-currentIdx} * (100% + 24px) / var(--vis)))`,
            transition: enableTransition
              ? "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
              : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {SLIDES.map((review, idx) => (
            <ReviewCard key={`${review.name}-${idx}`} review={review} index={idx} />
          ))}
        </div>
      </div>

      <div className="rv-nav">
        <button
          type="button"
          className="round neu-s"
          aria-label="Previous review"
          onClick={() => step(-1)}
        >
          ‹
        </button>
        <div className="rv-dots">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to review ${i + 1}`}
              className={i === activeDot ? "on" : ""}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="round neu-s"
          aria-label="Next review"
          onClick={() => step(1)}
        >
          ›
        </button>
      </div>
    </div>
  );
};

const GoogleReviews = () => {
  return (
    <section className="sec pt-14 pb-24 overflow-hidden" aria-labelledby="rv-title">
      <div className="wrap max-w-[1240px] mx-auto px-6 flex flex-col gap-10">
        <div className="head center max-w-[720px] mx-auto text-center flex flex-col items-center gap-4">
          <Reveal as="span" className="eyebrow center inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#eef8fa] shadow-[5px_5px_12px_rgba(20,84,120,0.13),-5px_-5px_12px_rgba(255,255,255,0.95)] text-[13px] font-bold text-[#0b4db5] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f5b82e] before:shadow-[0_0_0_4px_rgba(245,184,46,0.25)]">
            Google reviews
          </Reveal>
          <Reveal as="h2" id="rv-title" className="h2 m-0 font-sans text-[clamp(30px,4vw,50px)] leading-[1.12] font-extrabold tracking-[-0.02em] text-[#0e1b2e]">
            What our <span className="hl text-[#0b4db5]">clients say</span>
          </Reveal>
          <Reveal className="rv-badge neu-s inline-flex items-center gap-2.5 sm:gap-3.5 px-4 sm:px-[22px] py-2.5 sm:py-3 rounded-full mt-1 bg-[#eaf6f8] shadow-[6px_6px_14px_rgba(20,84,120,0.14),-6px_-6px_14px_rgba(255,255,255,0.92)]">
            <GoogleIcon size={26} />
            <span className="rv-badge__txt flex flex-col text-left leading-[1.25] text-[13px] text-[#3b4b60]">
              <b className="text-[15px] font-bold text-[#0e1b2e]">5-star reviews</b>
              <span>from clients on Google</span>
            </span>
            <StarRating />
          </Reveal>
        </div>

        <ReviewSlider />

        <Reveal className="flex flex-wrap justify-center gap-3 mt-2">
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-neu"
          >
            <GoogleIcon size={20} />
            <span>See all reviews on Google</span>
          </a>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-blue"
          >
            <span>Write a review</span>
            <span className="arr transition-transform duration-250">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default GoogleReviews;

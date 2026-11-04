'use client';

import { useId, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Gradient and helper components for SVG icons
const GoldGrad = ({ id }) => (
  <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stopColor="#FFE9A6" />
    <stop offset=".5" stopColor="#F5B82E" />
    <stop offset="1" stopColor="#C78400" />
  </linearGradient>
);

const BlueGrad = ({ id }) => (
  <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stopColor="#7AA9FF" />
    <stop offset=".5" stopColor="#1A5FD0" />
    <stop offset="1" stopColor="#07357F" />
  </linearGradient>
);

const TealGrad = ({ id }) => (
  <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stopColor="#D8F8FB" />
    <stop offset=".5" stopColor="#6CC7D2" />
    <stop offset="1" stopColor="#2A8693" />
  </linearGradient>
);

const Twinkle = ({ x, y, s = 1, d = 0, c = '#F5B82E' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path
      className="si-twinkle"
      style={{ animationDelay: `${d}s` }}
      d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1 Z"
      fill={c}
    />
  </g>
);

// 1. Trophy Icon (5+ years)
function TrophyIcon() {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 64 64" className="si" aria-hidden="true">
      <defs>
        <GoldGrad id={`g${uid}`} />
        <BlueGrad id={`b${uid}`} />
        <clipPath id={`c${uid}`}>
          <path d="M18 9h28v11a14 14 0 0 1-28 0z" />
        </clipPath>
      </defs>
      <g className="si-float">
        <path
          d="M18 13h-5a6 6 0 0 0 6 10M46 13h5a6 6 0 0 1-6 10"
          fill="none"
          stroke={`url(#g${uid})`}
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <path d="M18 9h28v11a14 14 0 0 1-28 0z" fill={`url(#g${uid})`} />
        <g clipPath={`url(#c${uid})`}>
          <rect
            className="si-shine"
            x="-14"
            y="4"
            width="8"
            height="40"
            fill="#fff"
            opacity=".55"
            transform="skewX(-20)"
          />
        </g>
        <path
          d="M32 14l1.8 3.7 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6z"
          fill="#fff"
          opacity=".9"
        />
        <rect x="29" y="33" width="6" height="8" rx="1" fill="#C78400" />
        <rect x="21" y="41" width="22" height="7" rx="2.5" fill={`url(#b${uid})`} />
        <rect x="16" y="48" width="32" height="7" rx="3" fill="#07357F" />
      </g>
      <Twinkle x={9} y={10} s={1.1} d={0} />
      <Twinkle x={56} y={8} s={0.9} d={0.6} c="#5BC4D0" />
      <Twinkle x={57} y={40} s={0.8} d={1.2} />
    </svg>
  );
}

// 2. Stacked Projects Icon (300+ projects)
function ProjectsIcon() {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 64 64" className="si" aria-hidden="true">
      <defs>
        <GoldGrad id={`g${uid}`} />
        <BlueGrad id={`b${uid}`} />
        <TealGrad id={`t${uid}`} />
      </defs>
      <g className="si-lay si-lay3">
        <path d="M30 58 4 46v-4l26 12 26-12v4z" fill="#07357F" />
        <path d="M30 54 4 42l26-12 26 12z" fill={`url(#b${uid})`} />
      </g>
      <g className="si-lay si-lay2">
        <path d="M30 44 4 32v-4l26 12 26-12v4z" fill="#2A8693" />
        <path d="M30 40 4 28l26-12 26 12z" fill={`url(#t${uid})`} />
      </g>
      <g className="si-lay si-lay1">
        <path d="M30 30 4 18v-4l26 12 26-12v4z" fill="#C78400" />
        <path d="M30 26 4 14 30 2l26 12z" fill={`url(#g${uid})`} />
      </g>
      <g className="si-pop">
        <circle cx="52" cy="50" r="10" fill="#25AA5A" />
        <path
          d="M47.5 50.5l3 3 6-6.5"
          stroke="#fff"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

// 3. Digital Approach Globe Icon (360°)
function DigitalApproachIcon() {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 64 64" className="si" aria-hidden="true">
      <defs>
        <radialGradient id={`s${uid}`} cx=".34" cy=".28" r=".8">
          <stop offset="0" stopColor="#E4FCFF" />
          <stop offset=".25" stopColor="#7FD3E2" />
          <stop offset=".62" stopColor="#1E6AD0" />
          <stop offset="1" stopColor="#082F78" />
        </radialGradient>
        <GoldGrad id={`g${uid}`} />
      </defs>
      <g transform="rotate(-20 32 32)">
        <path
          d="M2 32 a30 10 0 0 1 60 0"
          fill="none"
          stroke={`url(#g${uid})`}
          strokeWidth="2.6"
          opacity=".55"
        />
      </g>
      <circle cx="32" cy="32" r="19" fill={`url(#s${uid})`} />
      <g className="si-spin-slow" style={{ transformOrigin: '32px 32px' }}>
        <path
          d="M13 32h38M32 13c7 6 7 32 0 38M32 13c-7 6-7 32 0 38"
          stroke="#fff"
          strokeOpacity=".45"
          strokeWidth="1.1"
          fill="none"
        />
      </g>
      <ellipse
        cx="25"
        cy="22"
        rx="6"
        ry="3"
        transform="rotate(-35 25 22)"
        fill="#fff"
        opacity=".6"
      />
      <g transform="rotate(-20 32 32)">
        <path d="M2 32 a30 10 0 0 0 60 0" fill="none" stroke={`url(#g${uid})`} strokeWidth="2.6" />
        <circle r="3.6" fill="#fff" stroke="#1A5FD0" strokeWidth="1.6">
          <animateMotion
            dur="3.2s"
            repeatCount="indefinite"
            path="M2 32 a30 10 0 1 0 60 0 a30 10 0 1 0 -60 0"
          />
        </circle>
      </g>
    </svg>
  );
}

// 4. HQ Pin Icon (HQ in Dehradun)
function HQIcon() {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 64 64" className="si" aria-hidden="true">
      <defs>
        <linearGradient id={`r${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF9B8F" />
          <stop offset=".5" stopColor="#E0393A" />
          <stop offset="1" stopColor="#A3161C" />
        </linearGradient>
        <radialGradient id={`s${uid}`} cx=".34" cy=".28" r=".8">
          <stop offset="0" stopColor="#E4FCFF" />
          <stop offset=".3" stopColor="#7FD3E2" />
          <stop offset="1" stopColor="#0B4DB5" />
        </radialGradient>
      </defs>
      <ellipse className="si-ripple" cx="32" cy="57" rx="14" ry="4" fill="none" stroke="#0B4DB5" strokeWidth="1.5" />
      <ellipse
        className="si-ripple"
        style={{ animationDelay: '1s' }}
        cx="32"
        cy="57"
        rx="14"
        ry="4"
        fill="none"
        stroke="#0B4DB5"
        strokeWidth="1.5"
      />
      <ellipse className="si-shadow" cx="32" cy="57" rx="9" ry="2.6" fill="#07357F" opacity=".25" />
      <g className="si-bounce">
        <path
          d="M32 54S13 36 13 23a19 19 0 0 1 38 0c0 13-19 31-19 31z"
          fill={`url(#r${uid})`}
        />
        <circle cx="32" cy="23" r="9" fill={`url(#s${uid})`} />
        <ellipse
          cx="22"
          cy="12"
          rx="5"
          ry="2.4"
          transform="rotate(-35 22 12)"
          fill="#fff"
          opacity=".6"
        />
      </g>
    </svg>
  );
}

// 5. Clock Support Icon (6 days support)
function SupportIcon() {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 64 64" className="si" aria-hidden="true">
      <defs>
        <BlueGrad id={`b${uid}`} />
      </defs>
      <circle cx="32" cy="34" r="25" fill={`url(#b${uid})`} />
      <circle cx="32" cy="34" r="19.5" fill="#F2FBFD" />
      {Array.from({ length: 12 }, (_, n) => (
        <line
          key={n}
          x1="32"
          y1="17"
          x2="32"
          y2={n % 3 ? 19 : 21}
          stroke="#7A8EA6"
          strokeWidth={n % 3 ? 1.2 : 2}
          strokeLinecap="round"
          transform={`rotate(${n * 30} 32 34)`}
        />
      ))}
      <line
        className="si-hand-h"
        x1="32"
        y1="34"
        x2="32"
        y2="24"
        stroke="#0E1B2E"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        className="si-hand-m"
        x1="32"
        y1="34"
        x2="32"
        y2="19.5"
        stroke="#E0393A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="32" cy="34" r="2.6" fill="#F5B82E" />
      <rect x="27" y="4" width="10" height="6" rx="2" fill="#F5B82E" />
      <path d="M14 15l-4-4M50 15l4-4" stroke="#1A5FD0" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}

// 6. Growth Plan Icon (Free growth plan)
function GrowthPlanIcon() {
  return (
    <svg viewBox="0 0 64 64" className="si" aria-hidden="true">
      <rect
        className="si-bar"
        style={{ animationDelay: '0s' }}
        x="8"
        y="36"
        width="11"
        height="22"
        rx="3"
        fill="#0E1B2E"
        opacity=".55"
      />
      <rect
        className="si-bar"
        style={{ animationDelay: '.2s' }}
        x="24"
        y="26"
        width="11"
        height="32"
        rx="3"
        fill="#0E1B2E"
        opacity=".75"
      />
      <rect
        className="si-bar"
        style={{ animationDelay: '.4s' }}
        x="40"
        y="14"
        width="11"
        height="44"
        rx="3"
        fill="#0B4DB5"
      />
      <path
        className="si-draw"
        d="M6 30 20 18l8 6 22-18"
        stroke="#fff"
        strokeWidth="3.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43 5h8v8"
        stroke="#fff"
        strokeWidth="3.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Animated Numbers Component
function AnimatedCounter({ to, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const startTime = performance.now();
          const duration = 2000;
          const animate = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Cubic ease-out
            const ease = 1 - Math.pow(1 - progress, 3);
            setVal(Math.round(ease * to));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

// Interactive 3D Stat Card
function StatCard({ icon, children, tone = 'light', href, delay = 0, fill = 0.7 }) {
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotX: (0.5 - y) * 16,
      rotY: (x - 0.5) * 18,
      glareX: x * 100,
      glareY: y * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const Tag = href ? motion.a : motion.div;

  return (
    <Tag
      href={href}
      className={`ss-card ss-card--${tone} group`}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg)`,
      }}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        className="ss-card__glare"
        style={{
          background: `radial-gradient(260px circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.75), transparent 60%)`,
          opacity: isHovered ? (tone === 'light' ? 0.55 : 1) : 0,
        }}
        aria-hidden="true"
      />
      <span className="ss-card__icon" aria-hidden="true">
        <span className="ss-card__ring" />
        {icon}
      </span>
      <div className="ss-card__body">{children}</div>
      <span className="ss-card__bar" aria-hidden="true">
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: fill }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </span>
    </Tag>
  );
}

function MiniWorldGlobe() {
  return (
    <svg viewBox="0 0 120 120" className="ss-globe" aria-hidden="true">
      <defs>
        <radialGradient id="ssOcean" cx=".36" cy=".3" r=".85">
          <stop offset="0" stopColor="#B8F1F7" />
          <stop offset=".35" stopColor="#4FB3DA" />
          <stop offset=".72" stopColor="#1559C8" />
          <stop offset="1" stopColor="#072B70" />
        </radialGradient>
        <radialGradient id="ssShade" cx=".38" cy=".32" r=".78">
          <stop offset=".55" stopColor="#041a45" stopOpacity="0" />
          <stop offset="1" stopColor="#041a45" stopOpacity=".6" />
        </radialGradient>
        <clipPath id="ssClip">
          <circle cx="60" cy="60" r="56" />
        </clipPath>
      </defs>
      <circle cx="60" cy="60" r="56" fill="url(#ssOcean)" />
      <g clipPath="url(#ssClip)">
        <g className="ss-land">
          <image
            href="/assets/icons/world-map.svg"
            x="4"
            y="4"
            width="224"
            height="112"
            preserveAspectRatio="none"
          />
          <image
            href="/assets/icons/world-map.svg"
            x="228"
            y="4"
            width="224"
            height="112"
            preserveAspectRatio="none"
          />
        </g>
        <g fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth=".8">
          <ellipse cx="60" cy="60" rx="56" ry="18" />
          <ellipse cx="60" cy="60" rx="56" ry="38" />
          <path d="M4 60h112" />
        </g>
      </g>
      <circle cx="60" cy="60" r="56" fill="url(#ssShade)" />
      <ellipse
        cx="40"
        cy="32"
        rx="16"
        ry="7"
        transform="rotate(-32 40 32)"
        fill="#fff"
        opacity=".45"
      />
      <circle
        className="ss-ping"
        cx="60"
        cy="46"
        r="3.5"
        fill="none"
        stroke="#E0393A"
        strokeWidth="1.6"
      />
      <circle
        className="ss-ping"
        style={{ animationDelay: '.9s' }}
        cx="60"
        cy="46"
        r="3.5"
        fill="none"
        stroke="#E0393A"
        strokeWidth="1.6"
      />
      <path
        d="M60 50s-5-4.6-5-8.3a5 5 0 0 1 10 0c0 3.7-5 8.3-5 8.3z"
        fill="#E0393A"
        stroke="#fff"
        strokeWidth="1"
      />
      <circle cx="60" cy="41.7" r="1.8" fill="#fff" />
      <g transform="translate(66 28)">
        <rect width="30" height="12" rx="6" fill="#fff" />
        <text
          x="15"
          y="8.6"
          textAnchor="middle"
          fontSize="7"
          fontWeight="800"
          fill="#0E1B2E"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          India
        </text>
      </g>
    </svg>
  );
}

const sparkPositions = [
  [12, 40, 0],
  [28, 8, 0.8],
  [72, 6, 1.6],
  [92, 52, 0.4],
  [78, 94, 1.2],
  [22, 92, 2],
  [50, 2, 2.4],
  [4, 66, 1],
];

const locationPlaces = [
  ['Dehradun HQ', 15, 15],
  ['Delhi', 85, 15],
  ['Pan-India', 85, 85],
  ['Global clients', 15, 85],
];

function OrbitCenterpiece() {
  return (
    <motion.div
      className="ss-orbit"
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Outer Rotating Ring A */}
      <div className="ss-orbit__ring ss-orbit__ring--a">
        <span />
        <span />
      </div>

      {/* Inner Rotating Ring B */}
      <div className="ss-orbit__ring ss-orbit__ring--b">
        <span />
      </div>

      {/* Neumorphic Disc */}
      <div className="ss-orbit__disc" />

      {/* Conic Radar Beam Sweep */}
      <div className="ss-orbit__radar" />

      {/* Pulsing Radar Waves */}
      <div className="ss-orbit__wave" />
      <div className="ss-orbit__wave" style={{ animationDelay: '1.3s' }} />
      <div className="ss-orbit__wave" style={{ animationDelay: '2.6s' }} />

      {/* Center Core with 3D Globe & Planetary Satellites */}
      <div className="ss-orbit__core">
        <div className="ss-orbit__shadow" />
        <div className="ss-orbit__float">
          <MiniWorldGlobe />
          <div className="ss-tilt ss-tilt--a">
            <div>
              <i className="gb-sun" />
              <i className="gb-blue" />
            </div>
          </div>
          <div className="ss-tilt ss-tilt--b">
            <div>
              <i className="gb-teal" />
            </div>
          </div>
        </div>
      </div>

      {/* Ambient Sparkles */}
      {sparkPositions.map(([x, y, delay], idx) => (
        <span
          key={idx}
          className="ss-spark"
          style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${delay}s` }}
        />
      ))}

      {/* Geographic Orbiting Location Badges */}
      <div className="ss-orbit__places">
        {locationPlaces.map(([title, x, y]) => (
          <div key={title} className="orbit-pos" style={{ left: `${x}%`, top: `${y}%` }}>
            <div className="ss-orbit__counter">
              <span className="ss-place">
                <span className="ss-place__dot" />
                {title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function AtAGlance() {
  return (
    <section className="sec ss overflow-hidden" aria-label="Dr. Design at a glance">
      <div className="max-w-[1240px] mx-auto px-6 max-sm:px-[18px] ss__grid">
        {/* Left Column (Stats 1-3) */}
        <div className="ss__col">
          <StatCard icon={<TrophyIcon />} delay={0} fill={0.55}>
            <div className="ss-num">
              <AnimatedCounter to={6} suffix="+" /> <small>years</small>
            </div>
            <div className="ss-label">In software engineering</div>
          </StatCard>

          <StatCard icon={<ProjectsIcon />} delay={0.1} fill={0.9}>
            <div className="ss-num">
              <AnimatedCounter to={300} suffix="+" />
            </div>
            <div className="ss-label">Projects successfully completed</div>
          </StatCard>

          <StatCard icon={<DigitalApproachIcon />} delay={0.2} fill={1}>
            <div className="ss-num">
              <AnimatedCounter to={360} suffix="°" />
            </div>
            <div className="ss-label">Digital approach — data, design &amp; tools</div>
          </StatCard>
        </div>

        {/* Center Orbit Interactive Mockup */}
        <OrbitCenterpiece />

        {/* Right Column (Stats 4-6) */}
        <div className="ss__col">
          <StatCard icon={<HQIcon />} delay={0} fill={0.8}>
            <div className="ss-num ss-num--text">HQ in Dehradun</div>
            <div className="ss-label">Offices in Delhi &amp; Dehradun</div>
          </StatCard>

          <StatCard icon={<SupportIcon />} delay={0.1} fill={0.86}>
            <div className="ss-num">
              <AnimatedCounter to={6} /> <small>days</small>
            </div>
            <div className="ss-label">Support every week, Mon–Sat · 10 AM–6 PM</div>
          </StatCard>

          <StatCard icon={<GrowthPlanIcon />} tone="sun" href="/#contact" delay={0.2} fill={1}>
            <div className="ss-num ss-num--cta">Free growth plan</div>
            <div className="ss-label ss-label--cta">
              Reply within one business day <span className="ss-arrow">→</span>
            </div>
          </StatCard>
        </div>
      </div>
    </section>
  );
}


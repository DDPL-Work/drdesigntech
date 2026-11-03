import { useId } from 'react';

function DiscoverIcon({ id }) {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id={`b${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7AA9FF" />
          <stop offset="0.5" stopColor="#1A5FD0" />
          <stop offset="1" stopColor="#07357F" />
        </linearGradient>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE9A6" />
          <stop offset="0.5" stopColor="#F5B82E" />
          <stop offset="1" stopColor="#C78400" />
        </linearGradient>
        <clipPath id={`c${id}`}>
          <circle cx="0" cy="0" r="10" />
        </clipPath>
      </defs>
      <rect
        x="10"
        y="6"
        width="34"
        height="44"
        rx="5"
        fill="#fff"
        stroke="#C9DCE5"
        strokeWidth="1.5"
      />
      {[14, 21, 28, 35, 42].map((y, n) => (
        <rect
          key={y}
          x="16"
          y={y}
          width={n % 2 ? 16 : 22}
          height="3"
          rx="1.5"
          fill={n === 2 ? '#F5B82E' : '#B8C7D6'}
        />
      ))}
      <g className="si-scan">
        <circle
          cx="0"
          cy="0"
          r="12"
          fill="#EAF6FF"
          fillOpacity="0.55"
          stroke={`url(#b${id})`}
          strokeWidth="5"
        />
        <rect
          x="7"
          y="7"
          width="7"
          height="18"
          rx="3.5"
          transform="rotate(-45 10.5 16)"
          fill={`url(#g${id})`}
        />
        <ellipse
          cx="-4"
          cy="-5"
          rx="4"
          ry="2"
          transform="rotate(-35 -4 -5)"
          fill="#fff"
          opacity="0.8"
        />
      </g>
    </svg>
  );
}

function DesignIcon({ id }) {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id={`b${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7AA9FF" />
          <stop offset="0.5" stopColor="#1A5FD0" />
          <stop offset="1" stopColor="#07357F" />
        </linearGradient>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE9A6" />
          <stop offset="0.5" stopColor="#F5B82E" />
          <stop offset="1" stopColor="#C78400" />
        </linearGradient>
      </defs>
      <rect
        x="6"
        y="8"
        width="52"
        height="40"
        rx="7"
        fill="#fff"
        stroke="#C9DCE5"
        strokeWidth="1.5"
      />
      <path
        className="si-sketch"
        d="M12 38 C 20 14, 30 14, 34 28 S 48 40, 52 18"
        stroke="#1A5FD0"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="12" cy="38" r="2.6" fill="#fff" stroke="#1A5FD0" strokeWidth="1.6" />
      <circle cx="52" cy="18" r="2.6" fill="#fff" stroke="#1A5FD0" strokeWidth="1.6" />
      <g className="si-pen">
        <path
          d="M0 0 l6 -14 l6 3 l-6 14 z"
          fill={`url(#g${id})`}
          transform="translate(46 32) rotate(20)"
        />
      </g>
      {['#0B4DB5', '#5BC4D0', '#F5B82E', '#E0393A'].map((color, n) => (
        <circle
          key={color}
          className="si-swatch"
          style={{ animationDelay: `${n * 0.15}s` }}
          cx={14 + n * 12}
          cy="57"
          r="4.5"
          fill={color}
        />
      ))}
    </svg>
  );
}

function BuildIcon({ id }) {
  const getGearPoints = (radius, count) => {
    const pts = [];
    for (let s = 0; s < count * 2; s++) {
      const angle = (Math.PI * s) / count;
      const r = s % 2 ? radius : radius + 4;
      pts.push(`${(Math.cos(angle) * r).toFixed(2)},${(Math.sin(angle) * r).toFixed(2)}`);
    }
    return pts.join(' ');
  };

  return (
    <svg viewBox="0 0 64 64" className="w-full h-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id={`b${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7AA9FF" />
          <stop offset="0.5" stopColor="#1A5FD0" />
          <stop offset="1" stopColor="#07357F" />
        </linearGradient>
        <linearGradient id={`t${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#D8F8FB" />
          <stop offset="0.5" stopColor="#6CC7D2" />
          <stop offset="1" stopColor="#2A8693" />
        </linearGradient>
      </defs>
      <g transform="translate(24 28)">
        <g className="si-gear">
          <polygon
            points={getGearPoints(13, 9)}
            fill={`url(#b${id})`}
            strokeLinejoin="round"
          />
          <circle r="6" fill="#F2FBFD" />
        </g>
      </g>
      <g transform="translate(45 44)">
        <g className="si-gear si-gear--r">
          <polygon points={getGearPoints(9, 7)} fill={`url(#t${id})`} />
          <circle r="4" fill="#F2FBFD" />
        </g>
      </g>
      <path
        d="M10 52l-5 4 5 4M22 52l5 4-5 4"
        stroke="#F5B82E"
        strokeWidth="2.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LaunchIcon({ id }) {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id={`b${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7AA9FF" />
          <stop offset="0.5" stopColor="#1A5FD0" />
          <stop offset="1" stopColor="#07357F" />
        </linearGradient>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE9A6" />
          <stop offset="0.5" stopColor="#F5B82E" />
          <stop offset="1" stopColor="#C78400" />
        </linearGradient>
        <linearGradient id={`r${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF9B8F" />
          <stop offset="1" stopColor="#C2181E" />
        </linearGradient>
      </defs>
      <path
        className="si-streak"
        d="M10 18v10M54 30v12M16 40v8"
        stroke="#5BC4D0"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <g className="si-rocket">
        <path
          className="si-flame"
          d="M28 46c0 6 4 12 4 12s4-6 4-12z"
          fill={`url(#g${id})`}
        />
        <path
          d="M24 38l-7 6 1-11 6-4zM40 38l7 6-1-11-6-4z"
          fill={`url(#r${id})`}
        />
        <path
          d="M32 4c9 7 12 20 9 36H23C20 24 23 11 32 4z"
          fill="#F2FBFD"
          stroke="#C9DCE5"
          strokeWidth="1.2"
        />
        <path
          d="M32 4c4 3 7 8 8.5 14h-17C25 12 28 7 32 4z"
          fill={`url(#b${id})`}
        />
        <circle
          cx="32"
          cy="25"
          r="5"
          fill={`url(#b${id})`}
          stroke="#fff"
          strokeWidth="2"
        />
        <rect x="26" y="40" width="12" height="5" rx="2" fill="#1B2B44" />
      </g>
    </svg>
  );
}

const stepsData = [
  {
    t: 'Discover',
    d: 'We study your business, customers and current systems to find the real bottlenecks.',
    tags: ['Workshops', 'Audit'],
    c: '#0B4DB5',
    ringGradient: 'conic-gradient(from 0deg, transparent 0 70%, #0B4DB5 85%, #5BC4D0 100%)',
    iconType: 'discover'
  },
  {
    t: 'Design',
    d: 'UI/UX, architecture and data models shaped around your goals and users.',
    tags: ['Figma', 'Prototypes'],
    c: '#2A8693',
    ringGradient: 'conic-gradient(from 0deg, transparent 0 70%, #2A8693 85%, #7FD3E2 100%)',
    iconType: 'design'
  },
  {
    t: 'Build & integrate',
    d: 'Agile development, testing and integration with the tools you already use.',
    tags: ['Agile', 'QA'],
    c: '#1A5FD0',
    ringGradient: 'conic-gradient(from 0deg, transparent 0 70%, #1A5FD0 85%, #6CC7D2 100%)',
    iconType: 'build'
  },
  {
    t: 'Launch & support',
    d: 'Go-live, training and dedicated support Monday to Saturday, 10 AM – 6 PM IST.',
    tags: ['Go-live', 'Support'],
    c: '#C78400',
    ringGradient: 'conic-gradient(from 0deg, transparent 0 70%, #C78400 85%, #F5B82E 100%)',
    iconType: 'launch'
  }
];

export default function HowWeWork() {
  const baseId = useId().replace(/:/g, '');

  return (
    <section className="sec relative" id="process" aria-label="How we work">
      <div className="wrap flex flex-col gap-11">
        {/* Header Row */}
        <div className="head-row flex flex-wrap justify-between items-end gap-5 max-sm:gap-4">
          <div className="head flex flex-col gap-4 max-w-[720px]">
            <span className="eyebrow">How we work</span>
            <h2 className="m-0 text-[clamp(30px,3.6vw,48px)] leading-[1.12] font-extrabold tracking-[-0.02em] text-[#0e1b2e] font-['Plus_Jakarta_Sans',sans-serif]">
              Four checkpoints. <span className="text-[#0b4db5]">One clear roadmap.</span>
            </h2>
          </div>
          <div className="row flex flex-wrap items-center gap-3.5">
            <a href="#/contact" className="btn btn-blue group">
              Get an audit report <span className="arr transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
            </a>
            <b className="text-[15px] font-bold text-[#3B4B60]">Free. No obligation.</b>
          </div>
        </div>

        {/* Process Roadmap Track & Cards */}
        <div className="pr-wrap relative">
          {/* Animated Connecting Timeline Rail */}
          <div className="pr-rail max-[1100px]:hidden pointer-events-none" aria-hidden="true">
            <span className="pr-rail__fill" />
            <span className="pr-rail__dot" />
          </div>

          {/* 4 Process Cards */}
          <ol className="pr-grid list-none m-0 p-0 relative grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-sm:flex max-sm:overflow-x-auto max-sm:snap-x max-sm:snap-mandatory max-sm:gap-3.5 max-sm:-mx-[18px] max-sm:pt-1.5 max-sm:pb-[18px] max-sm:px-[18px] max-sm:no-scrollbar">
            {stepsData.map((step, idx) => (
              <li
                key={step.t}
                className="pr-card neu group relative z-[2] overflow-hidden p-[26px_26px_28px] max-sm:p-5 rounded-[28px] bg-[#eaf6f8] shadow-[14px_14px_32px_rgba(20,84,120,0.14),-12px_-12px_28px_rgba(255,255,255,0.92)] flex flex-col gap-3 transition-transform duration-400 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-2.5 max-sm:flex-none max-sm:w-[80%] max-sm:snap-start"
                style={{ '--c': step.c }}
              >
                {/* Top Accent Line */}
                <span
                  className="pr-card__accent absolute left-0 right-0 top-0 h-[5px] opacity-85"
                  style={{ backgroundColor: step.c }}
                  aria-hidden="true"
                />

                {/* Card Top: Icon Well + Step Counter */}
                <div className="pr-card__top flex items-center justify-between mb-1">
                  <span className="pr-card__icon max-sm:w-[72px] max-sm:h-[72px]">
                    <span
                      className="ss-card__ring"
                      style={{
                        background: step.ringGradient,
                        WebkitMask:
                          'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))',
                        mask:
                          'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))'
                      }}
                    />
                    <span className="w-[60px] h-[60px] max-sm:w-[46px] max-sm:h-[46px] flex items-center justify-center">
                      {step.iconType === 'discover' && (
                        <DiscoverIcon id={`${baseId}_discover`} />
                      )}
                      {step.iconType === 'design' && (
                        <DesignIcon id={`${baseId}_design`} />
                      )}
                      {step.iconType === 'build' && (
                        <BuildIcon id={`${baseId}_build`} />
                      )}
                      {step.iconType === 'launch' && (
                        <LaunchIcon id={`${baseId}_launch`} />
                      )}
                    </span>
                  </span>

                  <span
                    className="pr-card__step flex flex-col items-end font-extrabold text-[34px] leading-none opacity-90 font-['Plus_Jakarta_Sans',sans-serif]"
                    style={{ color: step.c }}
                  >
                    <small className="text-[11px] tracking-[0.16em] uppercase text-[#3B4B60] font-bold mb-1">
                      Step
                    </small>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="m-0 mt-1.5 text-[22px] font-extrabold tracking-[-0.02em] text-[#0e1b2e] leading-[1.25] font-['Plus_Jakarta_Sans',sans-serif]">
                  {step.t}
                </h3>
                <p className="m-0 text-[#3B4B60] text-[15px] leading-[1.7]">
                  {step.d}
                </p>

                {/* Tags */}
                <div className="pr-tags flex gap-1.5 flex-wrap mt-auto pt-1.5">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="py-1 px-[11px] rounded-full text-[12px] font-bold whitespace-nowrap"
                      style={{
                        color: step.c,
                        backgroundColor: `color-mix(in srgb, ${step.c} 10%, transparent)`
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

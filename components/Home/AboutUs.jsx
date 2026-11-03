import { useId } from 'react';

const webIcon = '/assets/icons/web.svg';
const appIcon = '/assets/icons/app.svg';
const erpIcon = '/assets/icons/erp.svg';
const seoIcon = '/assets/icons/seo.svg';
const chatIcon = '/assets/icons/chat.svg';
const globeIcon = '/assets/icons/globe.svg';
const itIcon = '/assets/icons/it.svg';
const shieldIcon = '/assets/icons/shield.svg';

const iconMap = {
  web: webIcon,
  app: appIcon,
  erp: erpIcon,
  seo: seoIcon,
  chat: chatIcon,
  globe: globeIcon,
  it: itIcon,
  shield: shieldIcon
};

const bubbles = [
  ['web', '#0B4DB5'],
  ['app', '#0E1B2E'],
  ['erp', '#5BC4D0'],
  ['seo', '#F5B82E'],
  ['chat', '#1A5FD0'],
  ['globe', '#2A8693']
];

const tools = [
  'Flutter',
  'WordPress',
  'WooCommerce',
  'PHP',
  'Figma',
  'Zoho',
  'ERPNext',
  'GIS',
  'Canva',
  'SEO'
];

const values = [
  { t: 'Highly skilled workforce', s: 'it' },
  { t: 'Deep domain expertise', s: 'shield' },
  { t: 'Client-centric approach', s: 'chat' }
];

function ServerStackIcon({ id }) {
  return (
    <svg viewBox="0 0 64 64" className="si" aria-hidden="true">
      <defs>
        <linearGradient id={`b${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7AA9FF" />
          <stop offset="0.5" stopColor="#1A5FD0" />
          <stop offset="1" stopColor="#07357F" />
        </linearGradient>
      </defs>
      {[6, 24, 42].map((y, n) => (
        <g key={y}>
          <rect
            x="8"
            y={y}
            width="48"
            height="15"
            rx="5"
            fill={n === 2 ? '#1B2B44' : `url(#b${id})`}
          />
          <circle
            className="si-blink"
            style={{ animationDelay: `${n * 0.4}s` }}
            cx="16"
            cy={y + 7.5}
            r="2.8"
            fill={['#F5B82E', '#5BC4D0', '#25D366'][n]}
          />
          <rect
            x="24"
            y={y + 6}
            width="24"
            height="3"
            rx="1.5"
            fill="#fff"
            opacity="0.45"
          />
          <rect
            className="si-data"
            style={{ animationDelay: `${n * 0.5}s` }}
            x="24"
            y={y + 6}
            width="8"
            height="3"
            rx="1.5"
            fill="#fff"
          />
        </g>
      ))}
    </svg>
  );
}

function CloudSyncIcon({ id }) {
  return (
    <svg viewBox="0 0 64 64" className="si" aria-hidden="true">
      <defs>
        <linearGradient id={`t${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#D8F8FB" />
          <stop offset="0.5" stopColor="#6CC7D2" />
          <stop offset="1" stopColor="#2A8693" />
        </linearGradient>
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
      <g className="si-float">
        <path
          d="M17 50a12 12 0 0 1 0-24 16 16 0 0 1 30 2 11 11 0 0 1 0 22z"
          fill={`url(#t${id})`}
        />
        <circle cx="32" cy="38" r="12" fill={`url(#b${id})`} />
        <g className="si-sync">
          <path
            d="M26 36a6.5 6.5 0 0 1 11-3.5"
            stroke="#fff"
            strokeWidth="2.6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M38 29v4h-4"
            stroke="#fff"
            strokeWidth="2.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M38 40a6.5 6.5 0 0 1-11 3.5"
            stroke="#fff"
            strokeWidth="2.6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M26 47v-4h4"
            stroke="#fff"
            strokeWidth="2.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <circle cx="51" cy="13" r="6" fill={`url(#g${id})`} />
      <g transform="translate(10 14) scale(0.9)">
        <path
          className="si-twinkle"
          style={{ animationDelay: '0.5s' }}
          d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1 Z"
          fill="#5BC4D0"
        />
      </g>
    </svg>
  );
}

function GeospatialPinIcon({ id }) {
  return (
    <svg viewBox="0 0 64 64" className="si" aria-hidden="true">
      <defs>
        <linearGradient id={`r${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF9B8F" />
          <stop offset="0.5" stopColor="#E0393A" />
          <stop offset="1" stopColor="#A3161C" />
        </linearGradient>
        <radialGradient id={`s${id}`} cx="0.34" cy="0.28" r="0.8">
          <stop offset="0" stopColor="#E4FCFF" />
          <stop offset="0.3" stopColor="#7FD3E2" />
          <stop offset="1" stopColor="#0B4DB5" />
        </radialGradient>
      </defs>
      <ellipse className="si-ripple" cx="32" cy="57" rx="14" ry="4" fill="none" stroke="#0B4DB5" strokeWidth="1.5" />
      <ellipse className="si-ripple" style={{ animationDelay: '1s' }} cx="32" cy="57" rx="14" ry="4" fill="none" stroke="#0B4DB5" strokeWidth="1.5" />
      <ellipse className="si-shadow" cx="32" cy="57" rx="9" ry="2.6" fill="#07357F" opacity="0.25" />
      <g className="si-bounce">
        <path d="M32 54S13 36 13 23a19 19 0 0 1 38 0c0 13-19 31-19 31z" fill={`url(#r${id})`} />
        <circle cx="32" cy="23" r="9" fill={`url(#s${id})`} />
        <ellipse cx="22" cy="12" rx="5" ry="2.4" transform="rotate(-35 22 12)" fill="#fff" opacity="0.6" />
      </g>
    </svg>
  );
}

function TrophyGovIcon({ id }) {
  return (
    <svg viewBox="0 0 64 64" className="si" aria-hidden="true">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE9A6" />
          <stop offset="0.5" stopColor="#F5B82E" />
          <stop offset="1" stopColor="#C78400" />
        </linearGradient>
        <linearGradient id={`b${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7AA9FF" />
          <stop offset="0.5" stopColor="#1A5FD0" />
          <stop offset="1" stopColor="#07357F" />
        </linearGradient>
        <clipPath id={`c${id}`}>
          <path d="M18 9h28v11a14 14 0 0 1-28 0z" />
        </clipPath>
      </defs>
      <g className="si-float">
        <path
          d="M18 13h-5a6 6 0 0 0 6 10M46 13h5a6 6 0 0 1-6 10"
          fill="none"
          stroke={`url(#g${id})`}
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <path d="M18 9h28v11a14 14 0 0 1-28 0z" fill={`url(#g${id})`} />
        <g clipPath={`url(#c${id})`}>
          <rect
            className="si-shine"
            x="-14"
            y="4"
            width="8"
            height="40"
            fill="#fff"
            opacity="0.55"
            transform="skewX(-20)"
          />
        </g>
        <path
          d="M32 14l1.8 3.7 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6z"
          fill="#fff"
          opacity="0.9"
        />
        <rect x="29" y="33" width="6" height="8" rx="1" fill="#C78400" />
        <rect x="21" y="41" width="22" height="7" rx="2.5" fill={`url(#b${id})`} />
        <rect x="16" y="48" width="32" height="7" rx="3" fill="#07357F" />
      </g>
      <g transform="translate(9 10) scale(1.1)">
        <path
          className="si-twinkle"
          style={{ animationDelay: '0s' }}
          d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1 Z"
          fill="#F5B82E"
        />
      </g>
      <g transform="translate(56 8) scale(0.9)">
        <path
          className="si-twinkle"
          style={{ animationDelay: '0.6s' }}
          d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1 Z"
          fill="#5BC4D0"
        />
      </g>
      <g transform="translate(57 40) scale(0.8)">
        <path
          className="si-twinkle"
          style={{ animationDelay: '1.2s' }}
          d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1 Z"
          fill="#F5B82E"
        />
      </g>
    </svg>
  );
}

const serviceCards = [
  {
    n: '01',
    t: 'IT Services',
    d: 'Websites, apps and custom software engineered for how you work.',
    tags: ['Web', 'Mobile', 'Cloud'],
    off: false,
    iconType: 'stack'
  },
  {
    n: '02',
    t: 'Digital Transformation',
    d: 'ERP, CRM and automation that replace spreadsheets and manual work.',
    tags: ['ERP', 'CRM', 'AI'],
    off: true,
    iconType: 'cloud'
  },
  {
    n: '03',
    t: 'Geospatial Solutions',
    d: 'GIS mapping, survey data and location analytics for smarter decisions.',
    tags: ['GIS', 'Mapping', 'Survey'],
    off: false,
    iconType: 'pin'
  }
];

export default function AboutUs() {
  const baseId = useId().replace(/:/g, '');

  return (
    <section id="about" className="sec about">
      <div className="wrap">
        {/* Left Visual: ab-visual */}
        <div className="ab-visual">
          <div className="ab-panel neu">
            <div className="ab-dots" aria-hidden="true" />
            <div className="ab-glow" aria-hidden="true" />

            {/* Top 6 service bubbles */}
            <div className="ab-bubbles" aria-hidden="true">
              {bubbles.map(([sym, color], idx) => (
                <span key={sym} className="ab-bubble" style={{ '--c': color }}>
                  <span
                    className="ab-bubble__in"
                    style={{ animationDelay: `${idx * 0.35}s` }}
                  >
                    <img
                      src={iconMap[sym]}
                      alt=""
                      width={30}
                      height={30}
                      className="w-[30px] h-[30px] object-contain"
                    />
                  </span>
                </span>
              ))}
            </div>

            {/* 3 Service Flow Cards connected by animated dashed line */}
            <div className="ab-flow">
              <svg
                className="ab-line"
                viewBox="0 0 10 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line x1="5" y1="0" x2="5" y2="100" />
              </svg>
              <span className="ab-pulse" aria-hidden="true" />

              {serviceCards.map((card) => (
                <div
                  key={card.n}
                  className={`ab-card neu-s${card.off ? ' ab-card--off' : ''}`}
                >
                  <span className="ab-card__icon">
                    <span className="ss-card__ring" />
                    {card.iconType === 'stack' && (
                      <ServerStackIcon id={`${baseId}_stack`} />
                    )}
                    {card.iconType === 'cloud' && (
                      <CloudSyncIcon id={`${baseId}_cloud`} />
                    )}
                    {card.iconType === 'pin' && (
                      <GeospatialPinIcon id={`${baseId}_pin`} />
                    )}
                  </span>
                  <div className="ab-card__body">
                    <small>{card.n}</small>
                    <b>{card.t}</b>
                    <p>{card.d}</p>
                    <div className="ab-tags">
                      {card.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span className="ab-card__go" aria-hidden="true">
                    →
                  </span>
                </div>
              ))}
            </div>

            {/* Tools Marquee */}
            <div className="ab-stack" aria-label="Tools we work with">
              <div className="ab-stack__track">
                {[...tools, ...tools].map((tool, idx) => (
                  <span key={idx} aria-hidden={idx >= tools.length}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Government Badge */}
          <div className="gov ab-gov">
            <span className="ab-gov__icon">
              <TrophyGovIcon id={`${baseId}_trophy`} />
            </span>
            <div>
              <div className="ph font-extrabold text-[16px] text-[#0e1b2e]">
                Government-backed
              </div>
              <div className="font-semibold text-[13px] text-[#0e1b2e]">
                credibility &amp; expertise
              </div>
            </div>
          </div>

          {/* Floating Location Badge */}
          <div className="ab-loc neu-s">
            <span className="ab-loc__dot" />
            Dehradun HQ · Delhi
          </div>
        </div>

        {/* Right Copy: about__copy */}
        <div className="about__copy">
          <span className="eyebrow">About us</span>
          <h2 className="h2">
            Bringing together <span className="hl">data, design</span> and digital tools
          </h2>
          <p className="lead">
            DR. DESIGN PVT. LTD. is a forward-thinking technology and consulting company specializing in IT Services, Digital Transformation and Geospatial Solutions. Founded on a strong foundation of technical expertise and government-backed credibility, we are expanding our services to Startups, SMEs, and growing businesses — helping them leverage cutting-edge tech to build smarter, scale faster, and succeed in the digital age.
          </p>
          <p className="lead">
            With a highly skilled workforce, deep domain expertise, and a client-centric approach, we bring together data, design, and digital tools to solve complex real-world problems.
          </p>

          {/* 3 Value Cards */}
          <div className="ab-values">
            {values.map((v) => (
              <div key={v.t} className="ab-value neu-s lift">
                <span className="ab-value__icon">
                  <img
                    src={iconMap[v.s]}
                    alt=""
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] object-contain"
                  />
                </span>
                <span>{v.t}</span>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="row">
            <a href="#/contact" className="btn btn-blue">
              Talk to our team <span className="arr" aria-hidden="true">→</span>
            </a>
            <a href="#/work" className="btn btn-neu">
              See our work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


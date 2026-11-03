'use client';

const webIcon = '/assets/icons/web.svg';
const appIcon = '/assets/icons/app.svg';
const erpIcon = '/assets/icons/erp.svg';
const seoIcon = '/assets/icons/seo.svg';
const chatIcon = '/assets/icons/chat.svg';
const geoIcon = '/assets/icons/geo.svg';
const globeIcon = '/assets/icons/globe.svg';
const shieldIcon = '/assets/icons/shield.svg';

const NODES = [
  ["web", 0, webIcon],
  ["app", 60, appIcon],
  ["erp", 120, erpIcon],
  ["seo", 180, seoIcon],
  ["chat", 240, chatIcon],
  ["geo", 300, geoIcon],
];

const SPARKS = [
  [8, 22, 0],
  [30, 80, 1.2],
  [52, 14, 0.6],
  [62, 88, 2],
  [44, 50, 1.6],
];

const WHATSAPP_URL = "https://wa.me/917217052558";

const WhatsAppIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="shrink-0"
  >
    <path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.4L3 21z" />
    <path d="M9 9.5c.3 1.8 1.7 3.6 3.6 4.6l1.3-1.1 2 .9c-.2 1-1.1 1.6-2.1 1.6-3 0-6.4-3.4-6.4-6.4 0-1 .6-1.9 1.6-2.1l.9 2-1 1z" />
  </svg>
);

const CallToAction = () => {
  const handleOpenLead = () => {
    window.dispatchEvent(new CustomEvent("open-lead", { detail: "quote" }));
  };

  return (
    <section className="pb-[70px] sm:pb-[110px]">
      <div className="wrap">
        <div className="relative overflow-hidden isolate rounded-[28px] sm:rounded-[36px] bg-[#0b3e9e] text-white p-[28px_22px] sm:p-12 md:p-14 lg:p-16 flex flex-wrap gap-8 items-center justify-between min-h-0 sm:min-h-[420px] shadow-[0_40px_70px_-40px_rgba(11,77,181,0.9)]">
          {/* Animated Background Mesh */}
          <div
            className="absolute -top-[20%] -right-[20%] -bottom-[20%] -left-[20%] -z-20 pointer-events-none [background:radial-gradient(40%_50%_at_15%_20%,rgba(91,196,208,0.55),transparent_70%),radial-gradient(35%_45%_at_85%_80%,rgba(245,184,46,0.35),transparent_70%),radial-gradient(50%_60%_at_70%_10%,rgba(26,95,208,0.9),transparent_70%),linear-gradient(135deg,#0b4db5,#082f78)] [animation:ctaMesh_14s_ease-in-out_infinite_alternate]"
            aria-hidden="true"
          />

          {/* Grid Overlay */}
          <div
            className="absolute inset-0 -z-10 pointer-events-none [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:38px_38px] [mask-image:radial-gradient(70%_80%_at_75%_50%,#000,transparent)] [-webkit-mask-image:radial-gradient(70%_80%_at_75%_50%,#000,transparent)]"
            aria-hidden="true"
          />

          {/* Light Beam Sweep */}
          <div
            className="absolute -top-1/2 -left-[30%] w-[30%] h-[200%] -z-10 pointer-events-none [background:linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)] rotate-[18deg] [animation:ctaBeam_7s_ease-in-out_infinite]"
            aria-hidden="true"
          />

          {/* Ambient Sparks */}
          {SPARKS.map(([left, top, delay], idx) => (
            <span
              key={idx}
              className="absolute w-[5px] h-[5px] rounded-full bg-white shadow-[0_0_10px_3px_rgba(159,227,234,0.9)] [animation:ssSpark_3s_ease-in-out_infinite] -z-10 pointer-events-none"
              style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}s` }}
              aria-hidden="true"
            />
          ))}

          {/* Copy Side */}
          <div className="relative flex-[1_1_480px] max-w-[640px] flex flex-col gap-4.5 text-left">
            <span className="self-start inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[13px] font-bold bg-white/12 border border-white/20 backdrop-blur-[6px] tracking-normal normal-case">
              <span className="live w-2 h-2 rounded-full bg-[#25aa5a] shadow-[0_0_8px_#25aa5a]" />
              Free consultation · Reply within one business day
            </span>

            <h2 className="m-0 font-extrabold text-[30px] sm:text-[38px] md:text-[46px] lg:text-[52px] leading-[1.12] tracking-[-0.02em] text-white">
              Ready to build smarter and{" "}
              <span className="cta2__hl">
                scale faster?
              </span>
            </h2>

            <p className="m-0 text-base sm:text-lg leading-relaxed text-[#dce8fa]">
              Get a free consultation and a clear digital roadmap for your business, anywhere in India.
            </p>

            <div className="flex flex-wrap sm:flex-nowrap gap-3 pt-1">
              <button
                type="button"
                className="btn btn-glow btn-pulse w-full sm:w-auto cursor-pointer"
                onClick={handleOpenLead}
              >
                <span>Book a free strategy call</span>
                <span className="arr">→</span>
              </button>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-w w-full sm:w-auto"
              >
                <WhatsAppIcon size={18} />
                <span>WhatsApp us</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 text-[13px] sm:text-sm text-[#dce8fa] pt-1">
              <span>
                <b className="text-white font-bold">5+ years</b> in software
              </span>
              <i className="w-1 h-1 rounded-full bg-white/50 not-italic" />
              <span>
                <b className="text-white font-bold">300+</b> projects
              </span>
              <i className="w-1 h-1 rounded-full bg-white/50 not-italic" />
              <span className="text-[#fbbc04] tracking-widest">
                ★★★★★{" "}
                <b className="text-white font-bold tracking-normal ml-1">
                  Google reviews
                </b>
              </span>
            </div>
          </div>

          {/* Visual Orbiting Graphic (Desktop / Tablet) */}
          <div
            className="hidden lg:block relative flex-[0_1_380px] aspect-square [--r:150px]"
            aria-hidden="true"
          >
            {/* Outer Dashed Ring */}
            <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-white/35 [animation:spin_50s_linear_infinite]" />

            {/* Inner Glowing Ring */}
            <div className="absolute inset-[18%] rounded-full border-[1.5px] border-white/18 shadow-[inset_0_0_60px_rgba(91,196,208,0.35)]" />

            {/* Orbit Container with 6 Nodes */}
            <div className="absolute left-1/2 top-1/2 w-0 h-0 [animation:spin_30s_linear_infinite]">
              {NODES.map(([name, angle, iconSrc]) => (
                <span
                  key={name}
                  className="absolute -left-[29px] -top-[29px]"
                  style={{
                    transform: `rotate(${angle}deg) translateX(var(--r)) rotate(${-angle}deg)`
                  }}
                >
                  <span className="w-[58px] h-[58px] rounded-full grid place-items-center bg-white/95 shadow-[0_12px_24px_-8px_rgba(0,0,0,0.4)] [animation:spinr_30s_linear_infinite]">
                    <img src={iconSrc} alt={name} className="w-7 h-7" />
                  </span>
                </span>
              ))}
            </div>

            {/* Core Floating 3D Globe */}
            <div className="absolute inset-0 grid place-items-center animate-[floatBob_4s_ease-in-out_infinite]">
              <img
                src={globeIcon}
                alt="Globe"
                className="w-[150px] h-[150px] [filter:drop-shadow(0_24px_24px_rgba(0,0,0,0.4))]"
              />
            </div>

            {/* Floating Security Badge */}
            <div className="absolute -left-7.5 bottom-1.5 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white text-[#0e1b2e] shadow-[0_16px_30px_-12px_rgba(0,0,0,0.45)] animate-[floatBob_4.5s_ease-in-out_infinite_reverse]">
              <img src={shieldIcon} alt="Shield" className="w-[26px] h-[26px] shrink-0" />
              <span className="flex flex-col text-[13px] leading-tight text-left">
                <b className="font-bold text-[#0e1b2e]">Trusted by</b>
                <small className="text-[11.5px] text-[#5b6b80] font-semibold">
                  NHPC · Govt. of Uttarakhand
                </small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;


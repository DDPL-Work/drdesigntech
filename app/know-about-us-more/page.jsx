'use client';

import Link from 'next/link';
import PageHero from '@/components/layout/PageHero';
import AboutUs from '@/components/Home/AboutUs';
import AtAGlance from '@/components/Home/AtAGlance';
import HowWeWork from '@/components/Home/HowWeWork';
import TrustedClients from '@/components/Home/TrustedClients';
import CallToAction from '@/components/Home/CallToAction';
import Newsletter from '@/components/Home/Newsletter';

const journeyTimeline = [
  [
    'Founded in Dehradun',
    'Started as a technology and consulting company with a strong technical foundation.'
  ],
  [
    'Government projects',
    'Delivered work for public-sector bodies, building government-backed credibility.'
  ],
  [
    'Delhi office',
    'Expanded with an office in Delhi to serve clients across North India.'
  ],
  [
    '300+ projects',
    'Websites, apps, ERP and geospatial work for startups, SMEs and enterprises.'
  ]
];

export default function AboutUsPage() {
  return (
    <>
      {/* 1. Sub-Page Hero Banner Hf */}
      <PageHero
        crumb="About"
        eyebrow="About Dr. Design"
        title="Technology partners for"
        hl="growing businesses"
        intro="A forward-thinking technology and consulting company specialising in IT Services, Digital Transformation and Geospatial Solutions — headquartered in Dehradun with an office in Delhi."
        icons={['it', 'dt', 'geo', 'shield']}
      >
        <Link href="/reach-to-us" className="btn btn-sun">
          <span>Talk to our team</span> <span className="arr" aria-hidden="true">→</span>
        </Link>
        <Link href="/work-we-have-done" className="btn btn-ghost-w">
          See our work
        </Link>
      </PageHero>

      {/* 2. Core About Section E2 */}
      <AboutUs />

      {/* 3. Stat Counter Strip B2 */}
      <AtAGlance />

      {/* 4. Journey Timeline Section */}
      <section className="sec" aria-labelledby="journey-title">
        <div className="wrap max-w-[1400px] mx-auto px-4" style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          <div className="head center text-center flex flex-col items-center gap-2">
            <span className="eyebrow center self-center inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#eef8fa] shadow-[5px_5px_12px_rgba(20,84,120,0.13),-5px_-5px_12px_rgba(255,255,255,0.95)] text-[13px] font-bold text-[#0b4db5] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f5b82e] before:shadow-[0_0_0_4px_rgba(245,184,46,0.25)]">
              Our journey
            </span>
            <h2 id="journey-title" className="h2 m-0 font-sans text-[clamp(30px,4vw,50px)] leading-[1.12] font-extrabold tracking-[-0.02em] text-[#0e1b2e]">
              Built on <span className="hl text-[#0b4db5]">trust and delivery</span>
            </h2>
          </div>
          <ol className="tl">
            {journeyTimeline.map(([title, desc], idx) => (
              <li key={title} className="tl__item neu">
                <span className="tl__dot">{String(idx + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. How We Work Qu */}
      <HowWeWork />

      {/* 6. Trusted Clients ku */}
      <TrustedClients />

      {/* 7. Call To Action hf */}
      <CallToAction />

      {/* 8. Pre-footer Newsletter SB */}
      <Newsletter />
    </>
  );
}

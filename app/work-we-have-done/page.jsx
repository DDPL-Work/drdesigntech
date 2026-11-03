'use client';

import Link from 'next/link';
import PageHero from '@/components/layout/PageHero';
import OurWork from '@/components/Home/OurWork';
import TrustedClients from '@/components/Home/TrustedClients';
import GoogleReviews from '@/components/Home/GoogleReviews';
import CallToAction from '@/components/Home/CallToAction';
import Newsletter from '@/components/Home/Newsletter';

export default function OurWorkPage() {
  return (
    <>
      {/* 1. Sub-Page Hero Banner Hf */}
      <PageHero
        crumb="Our Work"
        eyebrow="Portfolio"
        title="Real clients."
        hl="Live results."
        intro="Live websites, deployed products and design work for government bodies, startups and growing brands in India and abroad."
        icons={['web', 'app', 'chart', 'shield']}
      >
        <Link href="/reach-to-us" className="btn btn-sun">
          <span>Start your project</span> <span className="arr" aria-hidden="true">→</span>
        </Link>
      </PageHero>

      {/* 2. Full Our Work Showcase (Featured Projects + 10 Deep Case Studies + 3D Reels Carousel) N2 with bare=true */}
      <OurWork bare={true} />

      {/* 3. Our Trusted Clients Marquee ku */}
      <TrustedClients />

      {/* 4. Google Reviews Testimonials z2 */}
      <GoogleReviews />

      {/* 5. Call To Action hf */}
      <CallToAction />

      {/* 6. Pre-footer Newsletter SB */}
      <Newsletter />
    </>
  );
}

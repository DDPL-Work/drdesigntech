'use client';

import Link from 'next/link';
import PageHero from '@/components/layout/PageHero';
import TopServices from '@/components/Home/TopServices';
import EngagePartners from '@/components/Home/EngagePartners';
import HowWeWork from '@/components/Home/HowWeWork';
import CallToAction from '@/components/Home/CallToAction';
import Newsletter from '@/components/Home/Newsletter';

const WHATSAPP_URL = 'https://wa.me/917217052558';

const servicesList = [
  {
    id: 'web',
    title: 'Website Development',
    quote: 'Our website looks outdated',
    description:
      'Custom website design and development for businesses that want more enquiries, not just a nicer homepage. Fast, mobile-first, SEO-ready sites and e-commerce stores built on WordPress, Shopify or React.',
    image: '/assets/services/service-web.jpg',
    pageImage: '/assets/services/service-web-page.jpg',
    bakedQuote: true,
    icon: '/assets/icons/web.svg',
    pts: [
      'Corporate & business websites',
      'E-commerce stores (WooCommerce, custom)',
      'Landing pages that convert',
      'Speed, SEO & mobile optimisation'
    ],
    tools: ['WordPress', 'WooCommerce', 'React', 'PHP']
  },
  {
    id: 'app',
    title: 'Mobile App Development',
    quote: 'We need our own mobile app',
    description:
      'Android and iOS app development from idea to Play Store and App Store. We design clean user journeys, build with Flutter and give you a secure admin panel to run everything.',
    image: '/assets/services/service-app.jpg',
    pageImage: null,
    bakedQuote: true,
    icon: '/assets/icons/app.svg',
    pts: [
      'Android & iOS apps',
      'Cross-platform with Flutter',
      'Booking, delivery & marketplace apps',
      'Admin panels & dashboards'
    ],
    tools: ['Flutter', 'Firebase', 'REST APIs']
  },
  {
    id: 'chat',
    title: 'AI Chatbot Development',
    quote: "We can't reply to every WhatsApp message",
    description:
      'AI chatbots and AI agents for your website and WhatsApp that answer customer questions, book appointments and capture leads around the clock — trained on your own services.',
    image: '/assets/services/service-chat.jpg',
    pageImage: null,
    bakedQuote: true,
    icon: '/assets/icons/chat.svg',
    pts: [
      'WhatsApp AI chatbots',
      'AI call agents for inbound calls',
      'Lead capture & auto follow-up',
      'CRM integration'
    ],
    tools: ['WhatsApp API', 'OpenAI', 'CRM']
  },
  {
    id: 'erp',
    title: 'ERP Solutions',
    quote: 'Our operations run on spreadsheets',
    description:
      'Custom ERP and CRM software that replaces spreadsheets with one connected system for leads, sales, inventory, billing, production and reports. Zoho and ERPNext setup available.',
    image: '/assets/services/service-erp.jpg',
    pageImage: null,
    bakedQuote: false,
    icon: '/assets/icons/erp.svg',
    pts: [
      'Custom ERP for manufacturing & trading',
      'Sales CRM & lead management',
      'Inventory, billing & accounts',
      'Zoho & ERPNext setup'
    ],
    tools: ['ERPNext', 'Zoho', 'Custom']
  },
  {
    id: 'seo',
    title: 'SEO & Google Ads',
    quote: "Customers can't find us on Google",
    description:
      'SEO and Google Ads management that puts your business in front of people already searching for you. Technical and local SEO, Google Business Profile and Performance Max campaigns.',
    image: '/assets/services/service-seo.jpg',
    pageImage: null,
    bakedQuote: true,
    icon: '/assets/icons/seo.svg',
    pts: [
      'Local, technical & on-page SEO',
      'Google Ads & Performance Max',
      'Google Business Profile',
      'AI search (GEO) visibility'
    ],
    tools: ['Search Console', 'Google Ads', 'Analytics']
  },
  {
    id: 'social',
    title: 'Social Media & Ads Management',
    quote: "Our social media isn't bringing customers",
    description:
      'Social media marketing and paid ads on Instagram, Facebook and LinkedIn — content, reels and lead-generation campaigns planned and managed end to end, with monthly reporting.',
    image: '/assets/services/service-social.jpg',
    pageImage: null,
    bakedQuote: true,
    icon: '/assets/icons/social.svg',
    pts: [
      'Social media strategy & content calendar',
      'Posts, reels & creative design',
      'Meta, Instagram & LinkedIn ads management',
      'Monthly reporting & optimisation'
    ],
    tools: ['Meta Ads', 'Instagram', 'LinkedIn', 'Canva']
  },
  {
    id: 'geo',
    title: 'Geospatial Solutions',
    quote: 'We need accurate maps and location data',
    description:
      'GIS mapping, survey digitisation, remote sensing and Web GIS dashboards that turn location data into clear decisions — proven on government projects across Uttarakhand.',
    image: '/assets/services/service-geo.jpg',
    pageImage: null,
    bakedQuote: true,
    icon: '/assets/icons/geo.svg',
    pts: [
      'GIS mapping & digitisation',
      'Survey data processing',
      'Remote sensing analysis',
      'Web GIS dashboards'
    ],
    tools: ['QGIS', 'ArcGIS', 'Web GIS']
  }
];

export default function ServicesPage() {
  return (
    <>
      {/* 1. Page Hero Banner Hf */}
      <PageHero
        crumb="Services"
        eyebrow="What we do"
        title="One partner for every layer of your"
        hl="digital growth"
        intro="Websites, mobile apps, AI chatbots, ERP, search marketing and geospatial solutions — planned as one strategy for businesses across India."
        icons={['web', 'app', 'chat', 'erp', 'seo', 'social', 'ads', 'geo']}
      >
        <Link href="/reach-to-us" className="btn btn-sun">
          <span>Get a free plan</span> <span className="arr" aria-hidden="true">→</span>
        </Link>
      </PageHero>

      {/* 2. Detailed Service Rows Section */}
      <section className="sec" aria-labelledby="services-detail-heading">
        <div className="wrap max-w-[1400px] mx-auto px-4">
          <h2 id="services-detail-heading" className="sr-only">Our Core Services Breakdown</h2>

          {/* Jump Navigation Bar */}
          <nav className="svc-jump" aria-label="Jump to a service">
            {servicesList.map((svc) => (
              <a key={svc.id} href={`#services-${svc.id}`} className="svc-jump__a neu-s">
                <img src={svc.icon} alt="" width="22" height="22" />
                {svc.title}
              </a>
            ))}
          </nav>

          {/* List of 7 Detailed Service Rows */}
          <div className="svc-list">
            {servicesList.map((svc, idx) => {
              const isRev = idx % 2 === 1;
              return (
                <article
                  key={svc.id}
                  id={`services-${svc.id}`}
                  className={`svc-row${isRev ? ' svc-row--rev' : ''}`}
                >
                  {/* Media Column */}
                  <div className="svc-row__media neu">
                    <img
                      src={svc.pageImage || svc.image}
                      alt={`${svc.title} by Dr. Design`}
                      loading="lazy"
                    />
                    {!(svc.pageImage || svc.bakedQuote) && (
                      <span className="svc-row__quote">
                        “{svc.quote}”
                      </span>
                    )}
                    <span className="svc-row__icon">
                      <img src={svc.icon} alt="" />
                    </span>
                  </div>

                  {/* Copy Column */}
                  <div className="svc-row__copy">
                    <span className="eyebrow self-start">
                      {String(idx + 1).padStart(2, '0')} · Service
                    </span>
                    <h2
                      className="h2 m-0 font-sans font-extrabold text-[#0e1b2e] leading-tight"
                      style={{ fontSize: 'clamp(26px, 3vw, 38px)' }}
                    >
                      {svc.title}
                    </h2>
                    <p className="lead m-0 text-base sm:text-[17px] leading-[1.7] text-[#44546a]">
                      {svc.description}
                    </p>
                    <ul className="svc-pts">
                      {svc.pts.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    <div className="svc-tools">
                      {svc.tools.map((tool) => (
                        <span key={tool}>{tool}</span>
                      ))}
                    </div>
                    <div className="row flex flex-wrap items-center" style={{ gap: 12 }}>
                      <Link href="/reach-to-us" className="btn btn-blue">
                        <span>Get a free plan</span> <span className="arr" aria-hidden="true">→</span>
                      </Link>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-neu"
                      >
                        Ask on WhatsApp
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. 360° Interactive Coverflow Carousel */}
      <TopServices
        eyebrow="Explore"
        title={
          <>
            Swipe through <span className="hl">our services</span>
          </>
        }
        lead={null}
        showCta={false}
      />

      {/* 4. Digital Technology Partners w5 */}
      <div className="sec">
        <EngagePartners />
      </div>

      {/* 5. How We Work Qu */}
      <HowWeWork />

      {/* 6. Call To Action hf */}
      <CallToAction />

      {/* 7. Pre-footer Newsletter SB */}
      <Newsletter />
    </>
  );
}

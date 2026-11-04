'use client';

import Reveal from '@/components/ui/Reveal';

const getClientLogo = (name) => `/assets/clients/${name}.png`;

const clientsRow1 = [
  ['nhpc', 'NHPC'],
  ['govt-uttarakhand', 'Government of Uttarakhand'],
  ['ideaforge', 'ideaForge'],
  ['irrigation-uttarakhand', 'Irrigation Department, Uttarakhand'],
  ['amtron', 'AMTRON'],
  ['mugafi', 'Mugafi'],
  ['maven-jobs', 'Maven Jobs'],
  ['polat-global', 'Polat Global Investments'],
  ['protergia', 'Protergia'],
  ['myquotemate', 'MyQuoteMate'],
  ['holiday-circuit', 'Holiday Circuit'],
  ['geps', 'GEPS'],
];

const clientsRow2 = [
  ['traveamer', 'Traveamer'],
  ['the-proven-code', 'The Proven Code'],
  ['slideit', 'slideit'],
  ['zadium', 'Zadium'],
  ['chakra', 'Chakra'],
  ['dsoult', "D'Soult"],
  ['mawahib', 'Mawahib'],
  ['kwc', 'KWC'],
  ['genda-phool', 'Genda Phool'],
  ['adopt', 'ADOPT'],
  ['k-rajee', 'K Rajee'],
  ['hpk', 'HPK'],
];

const clientsRow3 = [
  ['rejoy-tours', 'Rejoy Tours'],
  ['karoflight', 'KaroFlight'],
  ['cccwale', 'CCCwale.com'],
  ['reborn-secrets', 'Reborn Secrets'],
  ['oroos', 'Oroos Confectionery'],
  ['ontario-hardware', 'Ontario Hardware'],
  ['oracle-solutions', 'Oracle Solutions'],
  ['ship-emblem', 'Client logo'],
  ['thegiftsconnect', 'TheGiftsConnect'],
  ['intexso', 'intexSo'],
  ['kann', 'KANN'],
];

function LogoRow({ items, reverse = false, speed = 46 }) {
  const quadrupled = [...items, ...items, ...items, ...items];
  return (
    <div className="logos__row">
      <div
        className={`logos__track${reverse ? ' is-rev' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {quadrupled.map(([id, name], idx) => (
          <div
            key={idx}
            className="logo-card"
            aria-hidden={idx >= items.length}
          >
            <img
              src={getClientLogo(id)}
              alt={idx < items.length ? name : ''}
              loading="lazy"
              draggable="false"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrustedClients() {
  return (
    <section className="sec clients overflow-hidden" aria-labelledby="clients-title">
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div className="head center">
          <Reveal as="span" className="eyebrow center">Our trusted clients</Reveal>
          <Reveal as="h2" id="clients-title" className="h2">
            Trusted by <span className="hl">government bodies</span> and growing brands
          </Reveal>
          <Reveal as="p" className="lead">
            From Uttarakhand government departments and NHPC to startups and global brands — websites, apps and campaigns across 300+ projects.
          </Reveal>
        </div>
      </div>

      <Reveal className="logos" delay={0.1}>
        <LogoRow items={clientsRow1} speed={92} />
        <LogoRow items={clientsRow2} speed={100} reverse />
        <LogoRow items={clientsRow3} speed={84} />
      </Reveal>
    </section>
  );
}

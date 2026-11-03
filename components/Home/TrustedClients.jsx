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

function LogoRow({ items, reverse = false, speed = 46 }) {
  const doubled = [...items, ...items];
  return (
    <div className="logos__row">
      <div
        className={`logos__track${reverse ? ' is-rev' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map(([id, name], idx) => (
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
    <section className="sec clients" aria-labelledby="clients-title">
      <div className="wrap flex flex-col gap-[18px]">
        <div className="head center">
          <span className="eyebrow center">Our trusted clients</span>
          <h2 id="clients-title" className="h2">
            Trusted by <span className="hl">government bodies</span>
            <br className="max-md:hidden" /> and growing brands
          </h2>
          <p className="lead max-w-[640px]">
            From Uttarakhand government departments and NHPC to startups and global brands — 300+ projects delivered.
          </p>
        </div>
      </div>

      <div className="logos">
        <LogoRow items={clientsRow1} speed={46} />
        <LogoRow items={clientsRow2} speed={52} reverse />
      </div>
    </section>
  );
}


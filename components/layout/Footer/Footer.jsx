import Link from 'next/link';
import { Brand } from '../Navbar/Navbar';

const servicesList = [
  { name: 'Web Design & Development', href: '/know-that-what-work-we-do#web' },
  { name: 'Mobile App Development', href: '/know-that-what-work-we-do#app' },
  { name: 'ERP & CRM Solutions', href: '/know-that-what-work-we-do#erp' },
  { name: 'SEO & Google Ads', href: '/know-that-what-work-we-do#seo' },
  { name: 'Social Media & Ads', href: '/know-that-what-work-we-do#social' },
  { name: 'AI Chatbots & Agents', href: '/know-that-what-work-we-do#chat' },
  { name: 'Geospatial Solutions', href: '/know-that-what-work-we-do#geo' }
];

const companyLinks = [
  { name: 'About us', href: '/know-about-us-more' },
  { name: 'Case studies', href: '/work-we-have-done' },
  { name: 'FAQs', href: '/know-answers-of-your-questions' },
  { name: 'Free website audit', href: '/get-your-audit' },
  { name: 'Contact', href: '/reach-to-us' },
  { name: 'Privacy policy', href: '/#' },
  { name: 'Terms & conditions', href: '/#' }
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__cols">
          {/* Brand & Socials Column */}
          <div className="footer__col" style={{ gap: 16 }}>
            <Brand dark={true} />
            <p style={{ margin: 0 }}>
              Website design, app development, ERP, AI chatbots, SEO and digital marketing company
              in Dehradun, serving businesses across India and worldwide.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <a
                href="https://www.instagram.com/drdesigntechnology/"
                target="_blank"
                rel="noopener noreferrer"
                className="soc soc--instagram"
                aria-label="Dr. Design on Instagram"
                title="Instagram"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/drdesignpvtltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="soc soc--linkedin"
                aria-label="Dr. Design on LinkedIn"
                title="LinkedIn"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M8 10.5V17M8 7.2v.1M12 17v-6.5M12 13.2a2.7 2.7 0 0 1 5 0V17" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="footer__col">
            <h3>Services</h3>
            {servicesList.map((service) => (
              <Link key={service.name} href={service.href}>
                {service.name}
              </Link>
            ))}
          </div>

          {/* Company Column */}
          <div className="footer__col">
            <h3>Company</h3>
            {companyLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Get In Touch Column */}
          <div className="footer__col">
            <h3>Get in touch</h3>
            <ul className="contact-list">
              <li>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <a
                  href="https://www.google.com/maps/place/Dr.+Design+Pvt.+Ltd./@30.3281684,78.0501995,17z/data=!3m1!4b1!4m6!3m5!1s0x390929004980aa17:0x63e945299375e7cf!8m2!3d30.3281684!4d78.0527744"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0b4db5] transition-colors"
                  aria-label="View Dr. Design Pvt. Ltd. on Google Maps"
                >
                  Near Survey Chowk, 11 East Canal Road, Dehradun, Uttarakhand, 248001.
                  <br />
                  <small>Offices in Dehradun (HQ) &amp; Delhi</small>
                </a>
              </li>

              <li>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                <a href="mailto:contact@drdesigntech.com">contact@drdesigntech.com</a>
              </li>

              <li>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
                </svg>
                <a href="tel:+917217052558">+91 7217052558</a>
              </li>

              <li>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.4L3 21z" />
                  <path d="M9 9.5c.3 1.8 1.7 3.6 3.6 4.6l1.3-1.1 2 .9c-.2 1-1.1 1.6-2.1 1.6-3 0-6.4-3.4-6.4-6.4 0-1 .6-1.9 1.6-2.1l.9 2-1 1z" />
                </svg>
                <a
                  href="https://wa.me/917217052558"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +91 7217052558
                </a>
              </li>

              <li>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                <span>Mon – Sat · 10 AM – 6 PM IST</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom max-sm:pb-4">
          <span>© 2026 DR. DESIGN PVT. LTD. All rights reserved.</span>
          <span>Crafted with care in Dehradun, India.</span>
        </div>
      </div>
    </footer>
  );
}

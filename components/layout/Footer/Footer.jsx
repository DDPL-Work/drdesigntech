import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { FiMapPin, FiMail, FiPhone, FiClock } from "react-icons/fi";
import { Brand } from "../Navbar/Navbar";

const services = [
  { name: "Web Design & Development", href: "/our-services#web" },
  { name: "Mobile App Development", href: "/our-services#app" },
  { name: "AI Chatbots & Automation", href: "/our-services#chat" },
  { name: "ERP & CRM Solutions", href: "/our-services#erp" },
  { name: "Digital Marketing & SEO", href: "/our-services#seo" },
  { name: "Geospatial & GIS Solutions", href: "/our-services#geo" },
];

const companyLinks = [
  { name: "About us", href: "/about-us" },
  { name: "Case studies", href: "/our-work" },
  { name: "FAQs", href: "/faq" },
  { name: "Contact us", href: "/contact-with-us" },
  { name: "Free Website Audit", href: "/audit" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0e1b2e] text-[#c9d6e8] rounded-t-[40px]">
      <div className="max-w-[1240px] mx-auto px-6 pt-[72px] pb-8 flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9">
          {/* Brand & Socials Column */}
          <div className="flex flex-col gap-4 text-[14px] leading-[1.6]">
            <Brand dark={true} />
            <p className="m-0 text-[#c9d6e8]">
              IT Services, Digital Transformation and Geospatial Solutions for
              startups, SMEs and growing businesses across India and worldwide.
            </p>
            <div className="flex gap-2.5 mt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-[#2c3d57] grid place-items-center text-white hover:bg-[#f5b82e] hover:border-[#f5b82e] hover:text-[#0e1b2e] transition-all duration-200 no-underline"
                aria-label="Facebook"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="https://instagram.com/drdesigntechnology"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-[#2c3d57] grid place-items-center text-white hover:bg-[#f5b82e] hover:border-[#f5b82e] hover:text-[#0e1b2e] transition-all duration-200 no-underline"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-[#2c3d57] grid place-items-center text-white hover:bg-[#f5b82e] hover:border-[#f5b82e] hover:text-[#0e1b2e] transition-all duration-200 no-underline"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="flex flex-col gap-2.5 text-[14px] leading-[1.6]">
            <h3 className="m-0 mb-1.5 text-white text-[16px] font-bold font-['Poppins']">
              Services
            </h3>
            {services.map((service) => (
              <Link
                key={service.name}
                href={service.href}
                className="text-[#c9d6e8] no-underline text-[14px] hover:text-[#f5b82e] transition-colors duration-200"
              >
                {service.name}
              </Link>
            ))}
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-2.5 text-[14px] leading-[1.6]">
            <h3 className="m-0 mb-1.5 text-white text-[16px] font-bold font-['Poppins']">
              Company
            </h3>
            {companyLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[#c9d6e8] no-underline text-[14px] hover:text-[#f5b82e] transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Get In Touch Column */}
          <div className="flex flex-col gap-2.5 text-[14px] leading-[1.6]">
            <h3 className="m-0 mb-1.5 text-white text-[16px] font-bold font-['Poppins']">
              Get in touch
            </h3>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              <li className="flex items-start gap-3 text-[#c9d6e8]">
                <FiMapPin size={18} className="shrink-0 mt-1 text-[#f5b82e]" />
                <span>
                  Near Survey Chowk, 11 East Canal Road, Dehradun, Uttarakhand,
                  248001.
                  <br />
                  <small className="text-[#8899aa]">Offices in Dehradun (HQ) &amp; Delhi</small>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail size={18} className="shrink-0 text-[#f5b82e]" />
                <a
                  href="mailto:contact@drdesigntech.com"
                  className="text-[#c9d6e8] no-underline hover:text-[#f5b82e] transition-colors duration-200"
                >
                  contact@drdesigntech.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone size={18} className="shrink-0 text-[#f5b82e]" />
                <a
                  href="tel:+917217052558"
                  className="text-[#c9d6e8] no-underline hover:text-[#f5b82e] transition-colors duration-200"
                >
                  +91 7217052558
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp size={18} className="shrink-0 text-[#25d366]" />
                <a
                  href="https://wa.me/917217052558"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c9d6e8] no-underline hover:text-[#f5b82e] transition-colors duration-200"
                >
                  +91 7217052558 (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-3 text-[#c9d6e8]">
                <FiClock size={18} className="shrink-0 text-[#f5b82e]" />
                <span>Mon – Sat · 10 AM – 6 PM IST</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-wrap justify-between gap-3 pt-6 border-t border-[#2c3d57] text-[13px] text-[#c9d6e8]">
          <span>© 2026 DR. DESIGN PVT. LTD. All rights reserved.</span>
          <span>Crafted with care in Dehradun, India.</span>
        </div>
      </div>
    </footer>
  );
}

import dynamic from "next/dynamic";
import LandingHero from "@/components/Home/LandingHero";
import AtAGlance from "@/components/Home/AtAGlance";
import TrustedClients from "@/components/Home/TrustedClients";
import AboutUs from "@/components/Home/AboutUs";
import TopServices from "@/components/Home/TopServices";
import HowWeWork from "@/components/Home/HowWeWork";
import LiveWorkStrip from "@/components/Home/LiveWorkStrip";

const EngagePartners = dynamic(() => import("@/components/Home/EngagePartners"));
const OurWork = dynamic(() => import("@/components/Home/OurWork"));
const CaseStudyHighlights = dynamic(() => import("@/components/Home/CaseStudyHighlights"));
const ReelsAndContent = dynamic(() => import("@/components/Home/ReelsAndContent"));
const FreeConsultation = dynamic(() => import("@/components/Home/FreeConsultation"));
const GoogleReviews = dynamic(() => import("@/components/Home/GoogleReviews"));
const Faqs = dynamic(() => import("@/components/Home/Faqs"));
const CallToAction = dynamic(() => import("@/components/Home/CallToAction"));
const Newsletter = dynamic(() => import("@/components/Home/Newsletter"));

export const metadata = {
  title: "Website Design, App Development & Digital Marketing Agency | Dr. Design Technology",
  description:
    "Dr. Design Technology (DDPL) is an IT services firm in Dehradun & Delhi offering custom web design, mobile app development, SEO, performance marketing, AI chatbots, and GIS solutions across India.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Website Design, App Development & Digital Marketing Agency | Dr. Design Technology",
    description:
      "Transforming ideas into high-performing websites, mobile apps, and scalable digital solutions.",
    url: "/",
  },
};

const Home = () => {
  return (
    <main className="overflow-x-clip">
      <LandingHero />
      <AtAGlance />
      <TrustedClients />
      <AboutUs />
      <TopServices />
      <HowWeWork />
      <EngagePartners />
      <LiveWorkStrip />
      <OurWork />
      <CaseStudyHighlights />
      <ReelsAndContent />
      <FreeConsultation />
      <GoogleReviews />
      <Faqs />
      <CallToAction />
      <Newsletter />
    </main>
  );
};

export default Home;

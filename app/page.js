import LandingHero from "@/components/Home/LandingHero";
import AtAGlance from "@/components/Home/AtAGlance";
import TrustedClients from "@/components/Home/TrustedClients";
import AboutUs from "@/components/Home/AboutUs";
import TopServices from "@/components/Home/TopServices";
import HowWeWork from "@/components/Home/HowWeWork";
import EngagePartners from "@/components/Home/EngagePartners";
import LiveWorkStrip from "@/components/Home/LiveWorkStrip";
import OurWork from "@/components/Home/OurWork";
import CaseStudyHighlights from "@/components/Home/CaseStudyHighlights";
import FreeConsultation from "@/components/Home/FreeConsultation";
import GoogleReviews from "@/components/Home/GoogleReviews";
import Faqs from "@/components/Home/Faqs";
import CallToAction from "@/components/Home/CallToAction";
import Newsletter from "@/components/Home/Newsletter";
import ReelsAndContent from "@/components/Home/ReelsAndContent";

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

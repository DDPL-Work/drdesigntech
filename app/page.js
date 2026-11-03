import LandingHero from "@/components/Home/LandingHero";
import AtAGlance from "@/components/Home/AtAGlance";
import TrustedClients from "@/components/Home/TrustedClients";
import AboutUs from "@/components/Home/AboutUs";
import TopServices from "@/components/Home/TopServices";
import HowWeWork from "@/components/Home/HowWeWork";
import EngagePartners from "@/components/Home/EngagePartners";
import LiveWorkStrip from "@/components/Home/LiveWorkStrip";
import OurWork from "@/components/Home/OurWork";
import FreeConsultation from "@/components/Home/FreeConsultation";
import GoogleReviews from "@/components/Home/GoogleReviews";
import Faqs from "@/components/Home/Faqs";
import CallToAction from "@/components/Home/CallToAction";
import Newsletter from "@/components/Home/Newsletter";

const Home= () => {
  return (
    <main>
      <LandingHero />
      <AtAGlance />
      <TrustedClients />
      <AboutUs />
      <TopServices />
      <HowWeWork />
      <EngagePartners />
      <LiveWorkStrip />
      <OurWork />
      <FreeConsultation />
      <GoogleReviews />
      <Faqs />
      <CallToAction />
      <Newsletter />
    </main>
  )
}

export default Home;


"use client";

import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import OurWork from "@/components/Home/OurWork";
import TrustedClients from "@/components/Home/TrustedClients";
import GoogleReviews from "@/components/Home/GoogleReviews";
import CallToAction from "@/components/Home/CallToAction";
import Newsletter from "@/components/Home/Newsletter";
import CaseStudySweetsBrand from "@/components/Home/CaseStudies/CaseStudySweetsBrand";
import CaseStudyLifestyleBrand from "@/components/Home/CaseStudies/CaseStudyLifestyleBrand";
import CaseStudySportingGoods from "@/components/Home/CaseStudies/CaseStudySportingGoods";
import CaseStudyTravelFunnel from "@/components/Home/CaseStudies/CaseStudyTravelFunnel";
import CaseStudyFinanceCourses from "@/components/Home/CaseStudies/CaseStudyFinanceCourses";
import CaseStudyEcommerceSEO from "@/components/Home/CaseStudies/CaseStudyEcommerceSEO";
import CaseStudyPetBrand from "@/components/Home/CaseStudies/CaseStudyPetBrand";
import CaseStudyHairClinic from "@/components/Home/CaseStudies/CaseStudyHairClinic";
import CaseStudyCoaching from "@/components/Home/CaseStudies/CaseStudyCoaching";
import CaseStudyBlackCar from "@/components/Home/CaseStudies/CaseStudyBlackCar";
import CaseStudyAIMetaGoogleAds from "@/components/Home/CaseStudies/CaseStudyAIMetaGoogleAds";
import CaseStudyMetaAds from "@/components/Home/CaseStudies/CaseStudyMetaAds";
import ReelsAndContent from "@/components/Home/ReelsAndContent";

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
        icons={["web", "app", "chart", "shield"]}
      >
        <Link href="/reach-to-us" className="btn btn-sun">
          <span>Start your project</span>{" "}
          <span className="arr" aria-hidden="true">
            →
          </span>
        </Link>
      </PageHero>
      <OurWork bare={true} />
      
      <TrustedClients />
      <GoogleReviews />
      <CallToAction />
      <Newsletter />
    </>
  );
}

"use client";

import React, { useRef } from "react";
import RecruitmentHero from "@/components/recruitment/RecruitmentHero";
import RecruitmentSpecialisations from "@/components/recruitment/RecruitmentSpecializations";
import RecruitmentCta from "@/components/recruitment/RecruitmentCta";
import RecruitmentNewsletter from "@/components/recruitment/RecruitmentNewsletter";
import RecruitmentFaq from "@/components/recruitment/RecruitmentFaq";

export default function Recruitment() {
    const specialisationsSectionRef = useRef<HTMLElement>(null);
    const handleScrollToSpecialisations = () => {
        specialisationsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  return (
    <main>
      <RecruitmentHero onExploreClick={handleScrollToSpecialisations}/>
      <RecruitmentSpecialisations ref={specialisationsSectionRef}/>
      <RecruitmentCta />
      <RecruitmentFaq />
      <RecruitmentNewsletter />
    </main>
  );
}

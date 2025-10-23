"use client";

import React, { useRef } from "react";
import RecruitmentHeroDark from "@/components/recruitment/RecruitmentHeroDark";
import RecruitmentSpecializationsDark from "@/components/recruitment/RecruitmentSpecializationsDark";
import RecruitmentCtaDark from "@/components/recruitment/RecruitmentCtaDark";
import RecruitmentFaqDark from "@/components/recruitment/RecruitmentFaqDark";
import RecruitmentNewsletterDark from "@/components/recruitment/RecruitmentNewsletterDark";

export default function RecruitmentDark() {
  const specialisationsSectionRef = useRef<HTMLElement>(null);
  const handleScrollToSpecialisations = () => {
    specialisationsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
      <main className="bg-black">
        <RecruitmentHeroDark onExploreClick={handleScrollToSpecialisations} />
        <RecruitmentSpecializationsDark ref={specialisationsSectionRef} />
        <RecruitmentCtaDark />
        <RecruitmentFaqDark />
        <RecruitmentNewsletterDark />
      </main>
  );
}



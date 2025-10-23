"use client";

import React, { useRef } from 'react';
import ITSolutionsFaq from "@/components/it-solutions/ITSolutionFaq";
import ITSolutionHero from "@/components/it-solutions/ITSolutionHero";
import ITSolutionCta from "@/components/it-solutions/ITSolutionCta";
import ITSolutionSpecialization from "@/components/it-solutions/ITSolutionSpecialization";
import ITSolutionNewsletter from "@/components/it-solutions/ITSolutionNewsletter";

export default function ITSolutions() {
    const specialisationsSectionRef = useRef<HTMLElement>(null);
    const handleScrollToSpecialisations = () => {
        specialisationsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  return (
    <main>
      <ITSolutionHero onExploreClick={handleScrollToSpecialisations}/>
      <ITSolutionSpecialization ref={specialisationsSectionRef}/>
      <ITSolutionCta />
      <ITSolutionsFaq />
      <ITSolutionNewsletter />
    </main>
  );
}

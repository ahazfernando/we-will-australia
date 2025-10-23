"use client";

import React, { useRef } from 'react';
import FaqDark from "@/components/it-solutions/FaqDark";
import HeroDark from "@/components/it-solutions/HeroDark";
import CtaDark from "@/components/it-solutions/CtaDark";
import SpecializationsDark from "@/components/it-solutions/SpecializationsDark";
import NewsletterDark from "@/components/it-solutions/NewsletterDark";

export default function ITSolutionsDark() {
    const specialisationsSectionRef = useRef<HTMLElement>(null);
    const handleScrollToSpecialisations = () => {
        specialisationsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  return (
    <main className="bg-black">
      <HeroDark onExploreClick={handleScrollToSpecialisations}/>
      <SpecializationsDark ref={specialisationsSectionRef}/>
      <CtaDark />
      <FaqDark />
      <NewsletterDark />
    </main>
  );
}

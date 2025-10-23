"use client";

import React, { useRef } from 'react';
import BusinessConsultingHero from "@/components/business-consulting/BusinessConsultingHero";
import BusinessConsultingSpecialization from "@/components/business-consulting/BusinessConsultingSpecialization";
import BusinessConsultingCta from "@/components/business-consulting/BusinessConsultingCta";
import BusinessConsultingFaq from "@/components/business-consulting/BusinessConsultingFaq";
import BusinessConsultingNewsletter from "@/components/business-consulting/BusinessConsultingNewsletter";

export default function BusinessSolutions() {
    const specialisationsSectionRef = useRef<HTMLElement>(null);
    const handleScrollToSpecialisations = () => {
        specialisationsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main>
            <BusinessConsultingHero onExploreClick={handleScrollToSpecialisations}/>
            <BusinessConsultingSpecialization ref={specialisationsSectionRef} />
            <BusinessConsultingCta />
            <BusinessConsultingFaq />
            <BusinessConsultingNewsletter />
        </main>
    );
}

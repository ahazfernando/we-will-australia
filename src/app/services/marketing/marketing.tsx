"use client";

import React, { useRef } from 'react';
import HeroDark from '@/components/marketing/HeroDark';
import SpecializationsDark from '@/components/marketing/SpecializationsDark';
import SocialDark from '@/components/marketing/SocialDark';
import CtaDark from "@/components/marketing/CtaDark";
import FaqDark from "@/components/marketing/FaqDark";
import NewsletterDark from "@/components/marketing/NewsletterDark";

export default function Marketing() {
    const specialisationsSectionRef = useRef<HTMLElement>(null);
    const handleScrollToSpecialisations = () => {
        specialisationsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main className="bg-black">
            <HeroDark onExploreClick={handleScrollToSpecialisations} />
            <SpecializationsDark ref={specialisationsSectionRef} />
            <SocialDark />
            <CtaDark />
            <FaqDark />
            <NewsletterDark />
        </main>
    );
}

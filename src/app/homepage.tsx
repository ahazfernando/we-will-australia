"use client";

import React, { useRef } from "react";
import HomeHero from "@/components/home/HomeHero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/layout/NewsLetter";
import ServicesSection from "@/components/home/ServicesSection";
import GlobalExcellence from "@/components/home/GlobalExcellence";

export default function HomePage() {
    const servicesSectionRef = useRef<HTMLElement>(null);

    const handleScrollToServices = () => {
        servicesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main className="overflow-hidden">
            <HomeHero onExploreClick={handleScrollToServices} />
            <ServicesSection ref={servicesSectionRef} />
            <WhyChooseUs />
            <GlobalExcellence /> 
            {/*<Testimonials />*/}
            <Newsletter />
        </main>
    );
}
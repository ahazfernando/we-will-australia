"use client";

import React, { useRef } from "react";
import HomeHeroAClient from "@/components/home/HomeHeroAClient";
import WhyChooseUsClient from "@/components/home/WhyChooseUsClient";
import WhyChooseUsA from "@/components/home/WhyChooseUsA";
import NewsletterA from "@/components/home/NewsletterA";
import ServicesSectionClient from "@/components/home/ServicesSectionClient";
import ServicesSectionA from "@/components/home/ServicesSectionA";
import OurStory from "@/components/about/OurStory";

export default function HomePageServer() {
    const servicesSectionRef = useRef<HTMLElement>(null);

    const handleScrollToServices = () => {
        servicesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main className="overflow-hidden smooth-scroll">
            <HomeHeroAClient onExploreClick={handleScrollToServices} />
            {/* <ServicesSectionClient ref={servicesSectionRef} /> */}
            <ServicesSectionA />
            <WhyChooseUsA />
            <OurStory />
            <NewsletterA />
        </main>
    );
}

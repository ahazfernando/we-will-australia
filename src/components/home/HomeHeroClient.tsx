"use client";

import React from "react";
import HomeHero from "@/components/home/HomeHero";

interface HomeHeroClientProps {
    onExploreClick: () => void;
}

export default function HomeHeroClient({ onExploreClick }: HomeHeroClientProps) {
    return <HomeHero onExploreClick={onExploreClick} />;
}

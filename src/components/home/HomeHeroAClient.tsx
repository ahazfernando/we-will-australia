"use client";

import React from "react";
import HomeHeroA from "@/components/home/HomeHeroA";

interface HomeHeroAClientProps {
    onExploreClick: () => void;
}

export default function HomeHeroAClient({ onExploreClick }: HomeHeroAClientProps) {
    return <HomeHeroA onExploreClick={onExploreClick} />;
}

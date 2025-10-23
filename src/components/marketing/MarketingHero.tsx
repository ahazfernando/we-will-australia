"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SparklesCore } from "../ui/sparkles";
import { TextHoverEffect } from "../ui/text-hover-effect";

interface MarketingHeroProps {
  onExploreClick: () => void;
}

const MarketingHero: React.FC<MarketingHeroProps> = ({ onExploreClick }) => {
  return (
      <section className="relative h-screen pt-32">
        <Image
            alt="An abstract image representing strategic marketing that drives results."
            src="/marketing/MarketingHero.png"
            priority
            fill
            className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/30 to-transparent"></div>
        {/* Sparkle Effect */}
        <div className="absolute inset-0 opacity-60">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1.2}
            particleDensity={400}
            particleColor="#552586"
            className="w-full h-full"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center pt-8 h-full text-center px-4">
          <Badge
              variant="outline"
              className="py-1 px-4 pr-4 flex items-center gap-2 mb-3 bg-gray-100/80 backdrop-blur-sm shadow-sm rounded-[24px]"
          >
            <span>We Connect Profiles</span>
            <div className="w-10 h-6 rounded-[20px] bg-[#552586] flex items-center justify-center">
              <ArrowRight className="h-3 w-3 text-white" />
            </div>
          </Badge>
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <TextHoverEffect text="MARKETING" />
            </div>
            <h1 className="font-semibold mb-2 leading-tight px-2 text-5xl bg-gradient-to-br from-[#552586] via-[#804FB3] to-[#B589D6] bg-clip-text text-transparent relative z-10">
              Strategic Marketing That Drives Results
            </h1>
          </div>
          <p className="text-md text-black max-w-4xl mx-auto mb-4">
            Build your brand, engage audiences, and generate measurable growth
            with tailored marketing strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto px-4 sm:px-0">
            <button
                onClick={onExploreClick}
                className="px-4 sm:px-6 text-sm sm:text-base bg-transparent border border-[#001114] text-[#001114] rounded-xl hover:bg-[#331650] hover:text-white transition-colors w-full sm:w-auto min-w-0 sm:min-w-[180px] h-10"
            >
              Explore Our Specialisations
            </button>
            <Link href="/contact">
              <button className="px-4 sm:px-6 text-sm sm:text-base bg-[#331650] text-white rounded-xl hover:bg-[#331650] transition-colors w-full sm:w-auto min-w-0 sm:min-w-[200px] h-10">
                Book a Free Consultation
              </button>
            </Link>
          </div>
        </div>
      </section>
  );
};

export default MarketingHero;
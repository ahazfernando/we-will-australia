"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface RecruitmentHeroProps {
  onExploreClick: () => void;
}

const RecruitmentHero: React.FC<RecruitmentHeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative h-screen pt-32">
      <Image
        alt="Illustrative image of connecting talent with opportunity for recruitment services."
        src="/recruitement/RecruitementHero.png"
        priority
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/30 to-transparent"></div>
      
      <div className="relative z-10 flex flex-col items-center pt-8 h-full text-center px-4">
        <div className="py-1 px-4 pr-4 flex items-center gap-2 mb-3 bg-gray-100/80 backdrop-blur-sm shadow-sm rounded-[24px] border border-gray-300">
          <span className="text-gray-800">Let's build your team</span>
          <div className="w-10 h-6 rounded-[20px] bg-[#1e3a8a] flex items-center justify-center">
            <ArrowRight className="h-3 w-3 text-white" />
          </div>
        </div>
        
        <h1 className="font-semibold mb-2 leading-tight px-2 text-5xl bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">
          Connecting Talent with Opportunity
        </h1>
        
        <p className="text-md text-black max-w-4xl mx-auto mb-4">
          We find exceptional talent that fits your culture and drives your
          business forward.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto px-4 sm:px-0">
          <button
            onClick={onExploreClick}
            className="px-4 sm:px-6 text-sm sm:text-base bg-transparent border border-[#001114] text-[#001114] rounded-xl hover:bg-[#1e3a8a] hover:text-white transition-colors w-full sm:w-auto min-w-0 sm:min-w-[180px] h-10"
          >
            Explore Our Specialisations
          </button>
          <Link href="/contact">
            <button className="px-4 sm:px-6 text-sm sm:text-base bg-[#1e3a8a] text-white rounded-xl hover:bg-[#1e40af] transition-colors w-full sm:w-auto min-w-0 sm:min-w-[200px] h-10">
              Find Your Next Hire
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecruitmentHero;
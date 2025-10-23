"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { SparklesCore } from "@/components/ui/sparkles";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface RecruitmentHeroDarkProps {
  onExploreClick: () => void;
}

const RecruitmentHeroDark: React.FC<RecruitmentHeroDarkProps> = ({ onExploreClick }) => {
  return (
      <section className="relative h-[85vh] sm:h-screen pt-28 sm:pt-32 bg-black overflow-hidden">
        <video
            className="absolute inset-0 w-full h-full object-cover opacity-100"
            src="/recruitement/OwaldBengi.mp4"
            autoPlay
            muted
            loop
            playsInline
            poster="/recruitement/RecruitmentDarkHero.png"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/16 to-transparent"></div>
        {/* Sparkle Effect */}
        <div className="absolute inset-0 opacity-60">
          <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1.2}
              particleDensity={400}
              particleColor="#60A5FA"
              className="w-full h-full"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center pt-8 h-full text-center px-4">
          <Badge
              variant="outline"
              className="py-1 px-4 pr-1 flex items-center gap-2 mb-3 bg-gray-100/12 backdrop-blur-sm shadow-sm rounded-[24px]"
          >
            <span className="text-white">Let’s innovate together</span>
            <div className="w-10 h-6 rounded-[20px] bg-[#ffffff] flex items-center justify-center">
              <ArrowRight className="h-3 w-3 text-black" />
            </div>
          </Badge>
          <div className="relative">
            <h1 className="font-semibold mb-2 leading-tight px-2 text-5xl bg-gradient-to-r from-[#88B1E7] to-[#FFFFFF] bg-clip-text text-transparent relative z-10">
              Build World class teams with the right Talent
            </h1>
          </div>
          <p className="text-md text-white max-w-4xl mx-auto mb-4">
            Discover flexible, specialized, and scalable recruitment solutions tailored to your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto px-4 sm:px-0">
            <Link href="/recruitment/listings">
              <button
                  className="px-4 sm:px-6 text-sm sm:text-base bg-transparent border border-white text-white rounded-xl hover:bg-[#60A5FA] hover:text-black transition-colors w-full sm:w-auto min-w-0 sm:min-w-[180px] h-10"
              >
                Browse Jobs
              </button>
            </Link>
            <Link href="/recruitment/employer-form">
              <button className="px-4 sm:px-6 text-sm sm:text-base bg-white text-black rounded-xl hover:bg-[#BFDBFE] transition-colors w-full sm:w-auto min-w-0 sm:min-w-[200px] h-10">
                Post a Job
              </button>
            </Link>
          </div>
        </div>
      </section>
  );
};

export default RecruitmentHeroDark;



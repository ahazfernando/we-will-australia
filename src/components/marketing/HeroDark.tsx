"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SparklesCore } from "../ui/sparkles";

interface HeroDarkProps {
  onExploreClick: () => void;
}

const HeroDark: React.FC<HeroDarkProps> = ({ onExploreClick }) => {
  return (
      <section className="relative h-screen pt-32 bg-black">
        <Image
            alt="An abstract image representing strategic marketing that drives results."
            src="/marketing/HeroDark.png"
            priority
            fill
            className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-transparent"></div>
        {/* Sparkle Effect */}
        <div className="absolute inset-0 opacity-60">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1.2}
            particleDensity={400}
            particleColor="#BA64FF"
            className="w-full h-full"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center pt-8 h-full text-center px-4">
          <Badge
              variant="outline"
              className="py-1 px-4 pr-1 flex items-center gap-2 mb-3 bg-gray-100/12 backdrop-blur-sm shadow-sm rounded-[24px]"
          >
            <span className="text-white">Reach Out to the World</span>
            <div className="w-10 h-6 rounded-[20px] bg-[#ffffff] flex items-center justify-center">
              <ArrowRight className="h-3 w-3 text-black" />
            </div>
          </Badge>
          <div className="relative">
            <h1 className="font-semibold mb-2 leading-tight px-2 text-5xl bg-gradient-to-r from-[#CEC2EB] to-[#EBE8FC] bg-clip-text text-transparent relative z-10">
              Strategic Marketing That Drives Results
            </h1>
          </div>
          <p className="text-md text-white max-w-4xl mx-auto mb-4">
            Build your brand, engage audiences, and generate measurable growth
            with tailored marketing strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto px-4 sm:px-0">
            <button
                onClick={onExploreClick}
                className="px-4 sm:px-6 text-sm sm:text-base bg-transparent border border-white text-white rounded-xl hover:bg-[#BA64FF] hover:text-white transition-colors w-full sm:w-auto min-w-0 sm:min-w-[180px] h-10"
            >
              Explore Our Specialisations
            </button>
            <Link href="/contact">
              <button className="px-4 sm:px-6 text-sm sm:text-base bg-white text-black rounded-xl hover:bg-[#E0AAFF] transition-colors w-full sm:w-auto min-w-0 sm:min-w-[200px] h-10">
                Book a Free Consultation
              </button>
            </Link>
          </div>
        </div>
      </section>
  );
};

export default HeroDark;

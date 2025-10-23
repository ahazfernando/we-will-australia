"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SparklesCore } from "../ui/sparkles";

interface HeroDarkProps {
  onExploreClick: () => void;
}

const HeroDark: React.FC<HeroDarkProps> = ({ onExploreClick }) => {
  return (
      <section className="relative h-screen pt-32 bg-black">
        <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
        >
            <source src="/itconsult/ITHeroDark.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/72 via-black/30 to-transparent"></div>
        {/* Sparkle Effect */}
        <div className="absolute inset-0 opacity-60">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1.2}
            particleDensity={400}
            particleColor="#00a067"
            className="w-full h-full"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center pt-8 h-full text-center px-4">
          <Badge
              variant="outline"
              className="py-1 px-4 pr-1 flex items-center gap-2 mb-3 bg-gray-100/12 backdrop-blur-sm shadow-sm rounded-[24px]"
          >
            <span className="text-white">Let's innovate together</span>
            <div className="w-10 h-6 rounded-[20px] bg-[#00a067] flex items-center justify-center">
              <ArrowRight className="h-3 w-3 text-white" />
            </div>
          </Badge>
          <div className="relative">
            <h1 className="font-semibold mb-2 leading-tight px-2 text-5xl bg-gradient-to-r from-[#52c585] to-[#6ee7b7] bg-clip-text text-transparent relative z-10">
              Transform Your Business <br />with Cutting-Edge IT Solutions
            </h1>
          </div>
          <p className="text-md text-white max-w-4xl mx-auto mb-4">
            Streamline operations, enhance security, and fuel growth with our
            smart technology solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto px-4 sm:px-0">
            <button
                onClick={onExploreClick}
                className="px-4 sm:px-6 text-sm sm:text-base bg-transparent border border-white text-white rounded-xl hover:bg-[#00a067] hover:text-white transition-colors w-full sm:w-auto min-w-0 sm:min-w-[180px] h-10"
            >
              Explore Our Specialisations
            </button>
            <Link href="/contact">
              <button className="px-4 sm:px-6 text-sm sm:text-base bg-white text-black rounded-xl hover:bg-[#52c585] transition-colors w-full sm:w-auto min-w-0 sm:min-w-[200px] h-10">
                Get a Tech Consultation
              </button>
            </Link>
          </div>
        </div>
      </section>
  );
};

export default HeroDark;

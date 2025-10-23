"use client";

import React, { useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface HomeHeroProps {
  onExploreClick: () => void;
}

const HomeHero: React.FC<HomeHeroProps> = ({ onExploreClick }) => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative h-screen pt-32">
      {/* Aurora Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={backgroundRef}
          className="animate-aurora pointer-events-none absolute -inset-[10px] opacity-36 blur-[20px] will-change-transform"
          style={{
            background: "repeating-linear-gradient(100deg, #3b82f6 10%, #a5b4fc 15%, #93c5fd 20%, #ddd6fe 25%, #60a5fa 30%)",
            backgroundSize: "300% 200%",
            backgroundPosition: "50% 50%",
          }}
        ></div>
      </div>
      <div className="absolute inset-0 overflow-hidden bg-black">
        <Image
          alt="We Will Australia home hero background."
          src="/home/WHHOMe.png"
          priority
          fill
          className="object-cover object-center"
          style={{
            opacity: 1
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-transparent"></div>
      <div className="relative z-10 flex flex-col items-center pt-8 h-full text-center px-4 animate-fade-in-up">
        <Badge
          ref={badgeRef}
          variant="outline"
          className="py-1 px-4 pr-4 flex items-center gap-2 mb-3 bg-gray-100/80 backdrop-blur-sm shadow-sm rounded-[24px]"
        >
          <span>We Connect Profiles</span>
          <div className="w-10 h-6 rounded-[20px] bg-[#001114] flex items-center justify-center">
            <ArrowRight className="h-3 w-3 text-white" />
          </div>
        </Badge>
        <h1 
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-2 leading-tight px-2"
          style={{
            background: 'linear-gradient(90deg, #C9DEF4 20%, #F5CCD4 50%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Empowering Victoria's
          <br />
          Businesses to Thrive and Succeed
        </h1>
        <p ref={descriptionRef} className="text-md text-black max-w-4xl mx-auto mb-4 text-white">
          Driving success with tailored Marketing, Recruitment, IT, and Business
          Solutions of Victoria to Thrive.
        </p>
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto px-4 sm:px-0">
          <button
            onClick={onExploreClick}
            className="bg-transparent border border-white text-white hover:bg-white hover:text-black transition-colors px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base w-full sm:w-auto min-w-0 sm:min-w-[180px] rounded-xl"
          >
            Explore Our Services
          </button>
          <Link href="/contact">
            <button className="bg-white text-black hover:bg-gray-100 transition-colors px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base w-full sm:w-auto min-w-0 sm:min-w-[200px] rounded-xl">
              Book a Free Consultation
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;

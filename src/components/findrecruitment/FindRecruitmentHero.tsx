"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const FindRecruitmentHero: React.FC = () => {
  return (
    <section className="relative h-screen pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/recruitement/RecruitmentDarkHero.png"
          alt="Find Recruitment Hero"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-40 flex flex-col items-center justify-center h-full text-center px-4">
        <div className="flex justify-center mb-3">
          <Badge
            variant="outline"
            className="py-1 px-4 pr-1 flex items-center gap-2 bg-white/20 text-white backdrop-blur-sm shadow-sm rounded-[24px] w-fit"
          >
            <span>We Connect Profiles</span>
            <div className="w-10 h-6 rounded-[20px] bg-white flex items-center justify-center">
              <ArrowRight className="h-3 w-3 text-black" />
            </div>
          </Badge>
        </div>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-2 leading-tight px-2">
          <span className="bg-gradient-to-r from-[#BADBFC] via-[#ABD4FF] to-[#BADBFC] bg-clip-text text-transparent">
            Where great talent <br />meets great opportunities
          </span>
        </h1>
        
        <p className="text-md text-white max-w-2xl mb-4 leading-relaxed mx-auto">
          Discover amazing opportunities with top companies. We connect talented professionals 
          with their ideal roles
        </p>

        <div className="flex flex-row gap-3 sm:gap-4 mt-2 justify-center items-center w-full sm:w-auto px-4 sm:px-0">
          <Link href="/recruitment/listings">
            <Button 
              className="bg-transparent border border-white text-white hover:bg-white hover:text-black transition-colors px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base w-full sm:w-auto min-w-0 sm:min-w-[180px] rounded-xl"
            >
              Browse Jobs
            </Button>
          </Link>
          
          <Link href="/recruitment/employer-form">
            <Button 
              className="bg-white text-black hover:bg-gray-100 transition-colors px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base w-full sm:w-auto min-w-0 sm:min-w-[200px] rounded-xl"
            >
              Post a Job
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FindRecruitmentHero;

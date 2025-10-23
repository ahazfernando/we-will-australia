"use client";
import React from "react";
import { SparklesCore } from "../ui/sparkles";
import { Badge } from "../ui/badge";
import { ArrowRight } from "lucide-react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export function SparklesPreview() {
  return (
    <div className="h-[32rem] sm:h-[40rem] w-full bg-black overflow-hidden rounded-md relative">
      {/* Background image layer */}
      <div
        className="absolute inset-0 z-0 bg-right bg-cover opacity-32"
        style={{ backgroundImage: "url(/landing/LandingHeroimg.png)" }}
      />
      {/* Background hover text behind header content */}
      <div className="absolute inset-0 flex items-center z-5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-6">
              <div className="w-[600px] max-w-full opacity-15">
                <TextHoverEffect text="We Will Australia" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-9">
              <div className="flex justify-center lg:justify-start mb-3">
                <Badge
                  variant="outline"
                  className="py-1 px-4 pr-1 flex items-center gap-2 bg-white-100/20 text-white backdrop-blur-sm shadow-sm rounded-[24px] w-fit"
                >
                  <span>We Connect Profiles</span>
                  <div className="w-10 h-6 rounded-[20px] bg-white flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-black" />
                  </div>
                </Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-center lg:text-left bg-gradient-to-r from-[#C9DEF4] to-[#82BBF6] bg-clip-text text-transparent mb-4 max-w-4xl mx-auto lg:mx-0">
                Joining Hands <br /> to help your Business grow
              </h1>
              <p className="text-base text-white/80 text-center lg:text-left max-w-2xl mb-6 mx-auto lg:mx-0">
                Driving success by delivering tailored Marketing, Recruitment, IT, and Business Solutions that empower Australia and stay competitive in today's dynamic market landscape.
              </p>
              <div className="w-full max-w-2xl h-28 sm:h-32 relative overflow-hidden mb-12 mx-auto lg:mx-0">
                {/* Gradients */}
                <div className="absolute left-0 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                <div className="absolute left-0 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                <div className="absolute left-20 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/2 blur-sm" />
                <div className="absolute left-20 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/2" />
                
                {/* Core component */}
                <SparklesCore
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleDensity={200}
                  className="w-full h-full"
                  particleColor="#FFFFFF"
                />
                {/* <div className="absolute inset-0 z-30 flex flex-col justify-center mt-10">
                  <p className="text-sm text-white/60 mb-3 text-center lg:text-left">Trusted by Professionals from</p>
                  <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center lg:justify-start">
                    <div className="h-6 sm:h-8 opacity-70 hover:opacity-100 transition-opacity duration-300">
                      <img 
                        src="/landing/amazon.png" 
                        alt="Amazon" 
                        className="h-full w-auto object-contain filter brightness-0 invert opacity-80"
                      />
                    </div>
                    <div className="h-6 sm:h-8 opacity-70 hover:opacity-100 transition-opacity duration-300">
                      <img 
                        src="/landing/booking.png" 
                        alt="Booking.com" 
                        className="h-full w-auto object-contain filter brightness-0 invert opacity-80"
                      />
                    </div>
                    <div className="h-6 sm:h-8 opacity-70 hover:opacity-100 transition-opacity duration-300">
                      <img 
                        src="/landing/officeworksla.png" 
                        alt="Officeworks" 
                        className="h-full w-auto object-contain filter brightness-0 invert opacity-80"
                      />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SparklesPreview;
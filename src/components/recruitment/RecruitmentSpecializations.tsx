"use client";

import React, {forwardRef} from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const specialisations = [
  {
    tab: "regional-workforce",
    title: "Regional Workforce Hire",
    description:
      "Connecting local talent with businesses across regional Australia to build capable and committed teams.",
    offerings: [
      "Local recruitment expertise",
      "Access to regional talent pools",
      "Long-term staff negotiation and retention support",
    ],
    whyUs:
      "Our extensive network and rigorous vetting process ensure you get visionary leaders perfectly aligned with your goals.",
    image: "/recruitement/42.png",
  },
  {
    tab: "specialized-recruitment",
    title: "Specialized Recruitment",
    description:
      "Finding niche experts and highly skilled professionals who fit your industry and business needs.",
    offerings: [
      "Industry-specific talent sourcing",
      "Rigorous screening and assessment",
      "Custom recruitment strategies",
    ],
    whyUs:
      "We speak the language of tech and connect you with the innovators who will shape your future.",
    image: "/recruitement/42.png",
  },
  {
    tab: "part-time-casual",
    title: "Part-Time & Casual Staff Connecting",
    description:
      "Helping businesses access reliable part-time and casual staff to meet flexible workforce demands.",
    offerings: [
      "Fast matching of temporary roles",
      "Skilled candidates ready to start",
      "Flexible staffing solutions",
    ],
    whyUs:
      "Our scalable solutions deliver quality candidates at speed, without compromising on fit.",
    image: "/recruitement/42.png",
  },
  {
    tab: "team-expansion",
    title: "Team Expansion Solutions",
    description:
      "Efficiently scaling teams with multiple hires while maintaining quality and cultural fit.",
    offerings: [
      "Large-scale recruitment campaigns",
      "Streamlined hiring process",
      "Onboarding support for multiple hires",
    ],
    whyUs:
      "We provide strategic HR guidance to build a resilient and high-performing organizational culture.",
    image: "/recruitement/42.png",
  },
];

const RecruitmentSpecialisations = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-20 bg-white scroll-mt-[10px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-semibold mb-2 leading-tight px-2 text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">
            Our Recruitment Specialisations
          </h2>
          <p className="text-sm sm:text-md text-black max-w-4xl mx-auto mb-4">
            Comprehensive recruitment solutions designed to build and scale your
            high-performing teams.
          </p>
        </div>

        <Tabs defaultValue="regional-workforce" className="w-full">
          <div className="flex justify-center mb-6 sm:mb-8 lg:mb-10">
            <TabsList className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 bg-transparent h-auto p-0 max-w-full">
              {specialisations.map((spec) => (
                <TabsTrigger
                  key={spec.tab}
                  value={spec.tab}
                  className="rounded-full px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 text-xs sm:text-sm lg:text-base transition-all duration-300 data-[state=active]:bg-blue-950 data-[state=active]:text-white data-[state=active]:shadow-lg bg-white text-gray-700 border border-gray-300 hover:bg-blue-100 hover:border-blue-300 data-[state=inactive]:hover:bg-blue-100 whitespace-nowrap flex-shrink-0"
                >
                  {spec.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {specialisations.map((spec) => (
            <TabsContent key={spec.tab} value={spec.tab} className="mt-0">
              <div className="bg-blue-950 text-white rounded-2xl shadow-2xl min-h-[300px] sm:min-h-[350px] lg:h-[368px] overflow-hidden relative">
                <div className="absolute -bottom-24 -right-8 w-64 h-64 lg:w-80 lg:h-80 z-0">
                  <Image
                    src={spec.image}
                    alt={`Illustration for ${spec.title}`}
                    fill
                    className="object-cover"
                  />
                </div>
              
                <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/60 via-50% to-transparent z-[1]"></div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-950 via-blue-950/80 via-30% to-transparent z-[2]"></div>

                <div className="block lg:hidden p-4 sm:p-6 relative z-10">
                  <div className="mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                      {spec.title}
                    </h3>
                    <p className="text-white/80 mb-4 sm:mb-6 text-sm">
                      {spec.description}
                    </p>

                    <h4 className="text-sm sm:text-base font-semibold mb-3">
                      What we Offer?
                    </h4>
                    <ul className="space-y-2 mb-6">
                      {spec.offerings.map((offer, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle2
                            size={16}
                            className="mr-2 text-blue-400 flex-shrink-0"
                          />
                          <span className="text-white/80 text-xs sm:text-sm">
                            {offer}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-400/20 p-3 sm:p-4 rounded-xl border border-blue-400/30 mb-4">
                    <h4 className="font-semibold text-white text-sm mb-2">
                      Why Choose {spec.title} with us?
                    </h4>
                    <p className="text-white/80 text-xs sm:text-sm">
                      {spec.whyUs}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <Link href="/contact">
                      <button className="bg-white text-blue-700 hover:bg-gray-200 px-4 sm:px-6 py-2 text-sm rounded-full font-semibold w-full">
                        Choose this Package
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="hidden lg:grid lg:grid-cols-2 h-full relative z-10">
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">{spec.title}</h3>
                      <p className="text-white/80 mb-6 text-base">
                        {spec.description}
                      </p>

                      <h4 className="text-base font-semibold mb-3">
                        What we Offer?
                      </h4>
                      <ul className="space-y-2">
                        {spec.offerings.map((offer, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle2
                              size={16}
                              className="mr-2 text-blue-400"
                            />
                            <span className="text-white/80 text-sm">
                              {offer}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link href="/contact">
                      <button className="bg-white text-blue-700 hover:bg-gray-200 px-6 py-2 text-sm rounded-full font-semibold w-full mt-4">
                        Choose this Package
                      </button>
                    </Link>
                  </div>

                  <div className="p-6 flex flex-col relative">
                    <div className="absolute left-0 top-6 bottom-6 w-px bg-blue-400/30"></div>
                    <div className="bg-blue-400/20 p-4 rounded-xl border border-blue-400/30 mb-4">
                      <h4 className="font-semibold text-white text-sm mb-2">
                        Why Choose {spec.title} with us?
                      </h4>
                      <p className="text-white/80 text-sm">{spec.whyUs}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
});

RecruitmentSpecialisations.displayName = 'RecruitmentSpecialisations';

export default RecruitmentSpecialisations;
"use client";

import React, {forwardRef, useState, useEffect} from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const specialisations = [
  {
    tab: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Maximize your online presence with comprehensive digital strategies that drive traffic, engagement, and conversions across all digital channels.",
    offerings: [
      "SEO & SEM campaigns",
      "Social media management",
      "Content marketing strategy",
    ],
    whyUs:
      "Expertise in Victoria and data-driven optimization deliver consistent, measurable business growth.",
    image: "/marketing/marketingservices.png",
  },
  {
    tab: "brand-development",
    title: "Brand Development",
    description:
      "Craft a compelling brand identity that resonates with your target audience and sets you apart from the competition.",
    offerings: [
      "Brand strategy & positioning",
      "Logo design & visual identity",
      "Brand messaging & storytelling",
    ],
    whyUs:
      "We build memorable brands that foster loyalty and drive long-term value.",
    image: "/marketing/marketingservices.png",
  },
  {
    tab: "lead-generation",
    title: "Lead Generation",
    description:
      "Fuel your sales pipeline with high-quality leads through targeted campaigns and conversion-focused strategies.",
    offerings: [
      "Lead magnet creation",
      "Landing page optimization",
      "Email marketing funnels",
    ],
    whyUs:
      "Our lead generation tactics are designed to attract, engage, and convert your ideal customers.",
    image: "/marketing/marketingservices.png",
  },
  {
    tab: "marketing-analytics",
    title: "Marketing Analytics",
    description:
      "Gain actionable insights from your marketing data to make informed decisions and maximize your ROI.",
    offerings: [
      "Performance tracking & reporting",
      "Customer journey analysis",
      "A/B testing & optimization",
    ],
    whyUs:
      "We turn complex data into clear, actionable insights for continuous improvement.",
    image: "/marketing/marketingservices.png",
  },
];

const SpecializationsDark = forwardRef<HTMLElement>((props, ref) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section ref={ref} className="py-20 bg-black scroll-mt-[10px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-semibold mb-2 leading-tight px-2 text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-[#52c585] to-[#6ee7b7] bg-clip-text text-transparent">
              Our Marketing Specialisations
            </h2>
            <p className="text-sm sm:text-md text-white max-w-4xl mx-auto mb-4">
              Comprehensive marketing solutions designed to accelerate your
              business growth across all channels.
            </p>
          </div>
          <div className="flex justify-center mb-6 sm:mb-8 lg:mb-10">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 bg-transparent h-auto p-0 max-w-full">
              {specialisations.map((spec) => (
                <div
                  key={spec.tab}
                  className="rounded-full px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 text-xs sm:text-sm lg:text-base bg-black/20 text-white border border-white/20 whitespace-nowrap flex-shrink-0 backdrop-blur-sm"
                >
                  {spec.title}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-black/20 backdrop-blur-xl text-white rounded-2xl shadow-2xl min-h-[300px] sm:min-h-[350px] lg:h-[368px] overflow-hidden relative border border-white/10">
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">{specialisations[0].title}</h3>
              <p className="text-white/80 mb-6 text-base">
                {specialisations[0].description}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
      <section ref={ref} className="py-20 bg-black scroll-mt-[10px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-semibold mb-2 leading-tight px-2 text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-[#CEC2EB] to-[#EBE8FC] bg-clip-text text-transparent">
              Our Marketing Specialisations
            </h2>
            <p className="text-sm sm:text-md text-white max-w-4xl mx-auto mb-4">
              Comprehensive marketing solutions designed to accelerate your
              business growth across all channels.
            </p>
          </div>

          <Tabs defaultValue="digital-marketing" className="w-full" id="marketing-specializations-tabs">
            <div className="flex justify-center mb-6 sm:mb-8 lg:mb-10">
              <TabsList className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 bg-transparent h-auto p-0 max-w-full">
                {specialisations.map((spec) => (
                    <TabsTrigger
                        key={spec.tab}
                        value={spec.tab}
                        className="rounded-full px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 text-xs sm:text-sm lg:text-base transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#CEC2EB] data-[state=active]:to-[#EBE8FC] data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:backdrop-blur-sm bg-black/20 text-white border border-white/20 hover:bg-white/10 hover:border-white/30 data-[state=inactive]:hover:bg-white/10 whitespace-nowrap flex-shrink-0 backdrop-blur-sm"
                    >
                      {spec.title}
                    </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {specialisations.map((spec) => (
                <TabsContent key={spec.tab} value={spec.tab} className="mt-0">
                  <div className="bg-black/20 backdrop-blur-xl text-white rounded-2xl shadow-2xl min-h-[300px] sm:min-h-[350px] lg:h-[368px] overflow-hidden relative border border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/2 via-transparent to-purple-500/3 rounded-2xl"></div>
                    
                    <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-[#CEC2EB]/20 via-[#BA64FF]/15 to-transparent rounded-full blur-3xl z-[1]"></div>
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-tl from-[#EBE8FC]/25 via-[#CEC2EB]/20 to-transparent rounded-full blur-2xl z-[1]"></div>
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/2 to-transparent rounded-2xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/2 to-transparent rounded-2xl"></div>
                    
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-2xl"></div>
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent rounded-tl-2xl"></div>
                    
                    <div className="absolute -bottom-48 -right-32 w-80 h-80 sm:w-96 sm:h-96 lg:w-[28rem] lg:h-[28rem] z-[2] opacity-100">
                      <Image
                        src="/marketing/bringes 1.png"
                        alt="Bringes Background"
                        fill
                        className="object-contain"
                      />
                    </div>

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
                                    className="mr-2 text-[#CEC2EB] flex-shrink-0"
                                />
                                <span className="text-white/80 text-xs sm:text-sm">
                            {offer}
                          </span>
                              </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white/5 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/20 mb-4 shadow-lg">
                        <h4 className="font-semibold text-white text-sm mb-2">
                          Why Choose {spec.title} with us?
                        </h4>
                        <p className="text-white/80 text-xs sm:text-sm">
                          {spec.whyUs}
                        </p>
                      </div>

                  <div className="flex justify-stretch">
                    <Link href="/contact" className="w-full">
                    <button className="bg-gradient-to-r from-[#CEC2EB] to-[#EBE8FC] text-black hover:from-[#EBE8FC] hover:to-[#CEC2EB] px-4 sm:px-6 py-2 text-sm rounded-full font-semibold w-full shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300">
                      Get in Touch
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
                              className="mr-2 text-[#CEC2EB]"
                            />
                            <span className="text-white/80 text-sm">
                              {offer}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link href="/contact">
                      <button className="bg-gradient-to-r from-[#CEC2EB] to-[#EBE8FC] text-black hover:from-[#EBE8FC] hover:to-[#CEC2EB] px-4 sm:px-6 py-2 text-sm rounded-full font-semibold w-full shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300">
                        Get in Touch
                      </button>
                    </Link>
                  </div>

                  <div className="p-6 flex flex-col relative">
                    <div className="absolute left-0 top-6 bottom-6 w-px bg-[#CEC2EB]/30"></div>
                    <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/20 mb-4 shadow-lg">
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

SpecializationsDark.displayName = "SpecializationsDark";

export default SpecializationsDark;

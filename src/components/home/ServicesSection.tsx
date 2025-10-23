"use client";

import React, { forwardRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Monitor, BarChart3 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MorphingText } from "@/registry/magicui/morphing-text";

const services = [
  {
    title: "Marketing Services",
    description:
        "End-to-end marketing solutions designed to get your business noticed. From traditional campaigns to digital strategies, we help you reach more customers and grow your brand.",
    icon: TrendingUp,
    image: "/home/marketing-img.png",
    path: "/services/marketing",
  },
  {
    title: "IT Solutions",
    description:
        "Reliable technology support that keeps your business moving. We simplify systems, strengthen security, and ensure your operations run smoothly.",
    icon: Monitor,
    image: "/home/it-image.png",
    path: "/services/it-solutions",
  },
  {
    title: "Recruitment",
    description:
        "Smart recruitment tailored to your business needs. We connect you with the right people — talent that not only fills roles but drives long-term success.",
    icon: Users,
    image: "/home/recruitment-img.png",
    path: "/services/recruitment",
  },
  {
    title: "Business Solutions",
    description:
        "Working side by side with you to streamline operations and unlock growth. From planning to execution, we partner with you to build a stronger, more sustainable business.",
    icon: BarChart3,
    image: "/home/business-img.png",
    path: "/services/business-solutions",
  },
];
const ServicesSection = forwardRef<HTMLElement, {}>( (props, ref) => {
  const morphingTexts = [
    "Elevate your Brand",
    "Joining hands to",
    "Ignite your Business", 
    "thrive your business"
  ];

  return (
    <section ref={ref} className="py-20 bg-white scroll-mt-[10px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-4 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                We Connect Profiles
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1 whitespace-nowrap leading-tight">
                  <div className="flex flex-col space-y-2">
                    <div className="text-3xl md:text-4xl font-bold leading-tight">
                      <MorphingText texts={morphingTexts.slice(0, 2)} duration={3000} />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold leading-tight">
                      <MorphingText texts={morphingTexts.slice(2, 4)} duration={3000} />
                    </div>
                  </div>
                </h2>
              </div>
              <div className="lg:text-right">
                <p className="text-md text-gray-600 max-w-md mb-4 lg:text-start">
                  From strategic marketing and talent acquisition to IT
                  solutions and business consulting – your integrated partner
                  for sustainable growth.
                </p>
                <Link href="/contact">
                  <button className="px-6 bg-transparent border border-gray-400 rounded-full text-gray-700 hover:bg-gray-50 transition-colors h-8 flex items-center">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {services.map((service, index) => {
            const IconComponent = service.icon;
            const needsMobileAdjustment = service.image === "/home/recruitment-img.png" || service.path === "/services/business-solutions";

            return (
              <div key={index} className="col-span-12 lg:col-span-6">
                <Card className="bg-white shadow-lg border border-gray-200/80 hover:shadow-xl transition-shadow h-full relative overflow-hidden">
                  <div className={`absolute top-0 right-0 bottom-0 ${
                    needsMobileAdjustment 
                      ? "w-3/5 sm:w-2/5 lg:w-1/2" 
                      : "w-1/2 sm:w-2/5 lg:w-1/2"
                  }`}>
                    <Image
                      src={service.image}
                      alt={`Illustration for ${service.title}`}
                      fill
                      className="object-cover object-left"
                    />
                  </div>

                  <div className={`absolute inset-0 pointer-events-none z-[1] ${
                    needsMobileAdjustment
                      ? "bg-gradient-to-r from-white via-white/90 via-60% to-transparent"
                      : "bg-gradient-to-r from-white via-white/80 via-white/60 to-transparent"
                  }`}></div>

                  <CardContent className="p-3 relative h-full z-[2]">
                    <div className="absolute pl-4 top-3 left-3 z-10">
                      <IconComponent className="w-6 h-6 text-black" />
                    </div>
                    <div className={`relative z-10 pl-4 pt-12 pb-16 ${
                      needsMobileAdjustment
                        ? "pr-[45%] sm:pr-[50%] lg:pr-[50%]"
                        : "pr-[50%]"
                    }`}>
                      <h3 className="font-semibold text-xl mb-3 text-gray-800">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <div className={`absolute bottom-3 left-3 z-10 ${
                      needsMobileAdjustment
                        ? "right-[45%] sm:right-[50%] lg:right-[50%]"
                        : "right-[50%]"
                    }`}>
                      <Link href={service.path}>
                        <button className="text-base px-8 ml-3 h-10 w-auto min-w-[120px] max-w-full bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 ease-in-out">
                          <span className="text-center text-base leading-none font-medium tracking-tight whitespace-pre-wrap">
                            View More
                          </span>
                        </button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default ServicesSection;

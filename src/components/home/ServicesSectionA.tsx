"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { MorphingText } from "@/registry/magicui/morphing-text";
import Link from "next/link";

const ServicesSectionA: React.FC = () => {
  const morphingTexts = [
    "Elevate your Brand",
    "Joining hands to",
    "Ignite your Business", 
    "thrive your business"
  ];

  const services = [
    {
      title: "Digital Marketing",
      description: "Graphic Design , Digital Design , Social Media Management , Content Marketing",
      path: "/services/marketing",
    },
    {
      title: "IT Solutions", 
      description: "UI Design and Refactoring , Software Development , Software Development , SaaS",
      path: "/services/it-solutions",
    },
    {
      title: "Recruitment",
      description: "Talent Acquisition , Executive Search , HR Consulting , Staffing Solutions",
      path: "/services/recruitment",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
          {/* Left Side - Video */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[2/3]">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/home/WWAHome.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Right Side - Services */}
          <div className="order-1 lg:order-2 lg:col-span-2">
            {/* Heading */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-4 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                  We Connect Profiles
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1 whitespace-nowrap leading-tight">
                <div className="flex flex-col space-y-1">
                  <div className="text-3xl md:text-4xl font-bold leading-tight">
                    <MorphingText texts={morphingTexts.slice(0, 2)} duration={3000} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold leading-tight">
                    <MorphingText texts={morphingTexts.slice(2, 4)} duration={3000} />
                  </div>
                </div>
              </h2>
              <p className="text-md text-gray-600 max-w-md mb-4">
                From strategic marketing to IT solutions and business consulting your integrated partner for sustainable growth.
              </p>
            </div>

            {/* Services List */}
            <div className="space-y-0">
              {services.map((service, index) => (
                <div key={service.title}>
                  <Link href={service.path}>
                    <div className="flex items-center justify-between py-6 group cursor-pointer hover:bg-gray-100 transition-colors rounded-lg px-4">
                      <div className="flex-1">
                        <h3 className="text-2xl lg:text-3xl font-semibold text-black mb-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 text-sm lg:text-base">
                          {service.description}
                        </p>
                      </div>
                      <div className="ml-6">
                        <ArrowRight className="h-6 w-6 text-black group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                  {index < services.length - 1 && (
                    <div className="border-t border-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSectionA;

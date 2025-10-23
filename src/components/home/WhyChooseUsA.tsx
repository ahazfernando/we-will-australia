"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const stats = [
  {
    title: "For better Decisions",
    value: "Data Driven",
  },
  {
    title: "& Local Talent", 
    value: "Global Talent",
  },
  {
    title: "and Tailored Solutions",
    value: "Customized Services",
  },
  {
    title: "Your Go to place for Services",
    value: "Professional Solutions",
  },
];

const WhyChooseUsA: React.FC = () => {
  const router = useRouter();

  const handleInquiryClick = () => {
    router.push('/contact');
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
            Why Choose Us?
            </h2>
            <Button 
              onClick={handleInquiryClick}
              className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium"
            >
              Make an Inquiry <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <div className="space-y-4 text-gray-600">
              <p>
              Trusted by businesses in both cities and regions, we bring the right mix of expertise, talent, and innovation to help you thrive wherever you're based.
              </p>
            </div>
          </div>

          {/* Center Column - Video */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-full overflow-hidden shadow-2xl">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/home/WWA_Video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Right Column - Statistics */}
          <div className="space-y-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center lg:text-right">
                <div className="text-4xl font-bold text-black mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-800">
                  {stat.title}
                </div>
                {index < stats.length - 1 && (
                  <div className="mt-4 border-t border-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsA;

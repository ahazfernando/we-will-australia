import React from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const AboutUsHero: React.FC = () => {
  return (
    <section className="relative h-screen pt-32">
      <Image
          alt="The Melbourne Skyline."
          src="/home/hero.png"
          priority
          fill
          className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/30 to-transparent"></div>

      <div className="relative z-10 pt-8 h-full px-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-8 text-left">
              <Badge
                variant="outline"
                className="py-1 px-4 pr-4 flex items-center gap-2 mb-3 bg-gray-100/80 backdrop-blur-sm shadow-sm rounded-[24px] w-fit"
              >
                <span>We Connect Profiles</span>
                <div className="w-10 h-6 rounded-[20px] bg-[#001114] flex items-center justify-center">
                  <ArrowRight className="h-3 w-3 text-white" />
                </div>
              </Badge>

              <h1 className="text-2xl sm:text-xl md:text-2xl lg:text-[36px] font-semibold text-gray-800 mb-2 gradient-text leading-tight">
                Built to Connect Cities and Regions
                <br />
                Through Strategy, Talent, and Technology
              </h1>

              <p className="text-md text-black max-w-4xl mb-4">
                Your Link Between Strategy, People, and Innovation.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto">
                <Link href="/contact">
                  <button className="px-4 sm:px-6 py-1 text-[14px] bg-[#001114] text-white rounded-xl hover:bg-[#001114] transition-colors w-full sm:w-auto min-w-0 sm:min-w-[200px] h-10">
                    Book a Free Consultation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsHero;

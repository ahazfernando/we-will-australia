import React from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CommunityHero: React.FC = () => {
  return (
    <section className="relative h-screen pt-32">
      <Image
          alt="WWA Community - Tram in Melbourne"
          src="/community/tramsmel.jpg"
          priority
          fill
          className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-transparent"></div>

      <div className="relative z-10 h-full flex items-end justify-center px-4 sm:px-6 lg:px-12 xl:px-16 pb-16 sm:pb-20 lg:pb-24">
        <div className="container mx-auto w-full">
          <div className="max-w-4xl text-center md:text-left">
              <Badge
                variant="outline"
                className="py-1 px-4 pr-2 flex items-center gap-2 mb-3 bg-gray-100/20 backdrop-blur-sm shadow-sm rounded-[24px] w-fit mx-auto md:mx-0 text-white"
              >
                <span>We Connect Communities</span>
                <div className="w-10 h-6 rounded-[20px] bg-white flex items-center justify-center">
                  <ArrowRight className="h-3 w-3 text-black" />
                </div>
              </Badge>

              <h1 className="font-semibold mb-2 leading-tight px-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">
                Join the We Will Australia Community Building Connections Across Australia
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-white max-w-4xl mx-auto mb-4">
                Connect, collaborate, and grow with a diverse community of professionals, businesses, and innovators accross australia
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto px-4 sm:px-0">
                <Link href="/contact">
                  <button className="px-4 sm:px-6 text-sm sm:text-base bg-transparent border border-white text-white rounded-xl hover:bg-white/10 transition-colors w-full sm:w-auto min-w-0 sm:min-w-[180px] h-10">
                    Connect with us
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-4 sm:px-6 text-sm sm:text-base bg-white text-black rounded-xl hover:bg-[#334155] hover:text-white transition-colors w-full sm:w-auto min-w-0 sm:min-w-[200px] h-10">
                    Join Our Community
                  </button>
                </Link>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityHero;


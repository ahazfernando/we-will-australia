import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Feather, Leaf, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

const missionData = [
  {
    subTitle: "Where It Started",
    title: "Our Story",
    description:
      "Founded to bridge Victoria, We Will Australia emerged as the multi-service partner connecting cities and regions through integrated marketing, recruitment, IT solutions, and strategic consulting expertise.",
    icon: Feather,
  },
  {
    subTitle: "Something Better",
    title: "Our Mission",
    description:
      "Empowering Businesses in Victoria to achieve sustainable growth through marketing, recruitment, IT solutions, and business consulting services that connect talent, technology, and strategy.",
    icon: Leaf,
  },
  {
    subTitle: "Beginning of Success",
    title: "Our Vision",
    description:
      "To be Victoria's leading multi-service growth partner, seamlessly connecting cities and regions through innovative strategy, exceptional talent, and cutting-edge technology solutions.",
    icon: Globe,
  },
];

const VisionMission: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background image positioned absolutely behind everything */}
      <div className="absolute inset-0 flex justify-center items-start pointer-events-none pt-12">
        <Image
          src="/about/dot-map.png"
          alt="A decorative background image of a world map made of dots."
          width={0}
          height={0}
          sizes="100vw"
          className="w-full max-w-4xl h-auto object-contain opacity-20"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end">
              <div className="mb-8 lg:mb-0">
                <Badge
                  variant="outline"
                  className="py-1 px-4 pr-4 flex items-center gap-2 bg-gray-100/80 backdrop-blur-sm shadow-sm h-10 rounded-[24px] mb-4"
                >
                  <span>What we stand for</span>
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-[#001114]">
                  Building Tomorrow's
                  <span className="block text-[#001114]">
                    Australia: Our Vision & Mission
                  </span>
                </h2>
              </div>
              <div className="lg:w-1/3 text-left lg:text-left">
                <p className="text-gray-600 mb-6">
                  To be Victoria's leading multi-service growth partner,
                  seamlessly connecting cities and regions through innovative
                  strategy.
                </p>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-gray-400 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Contact Us
                  </Button>
              </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {missionData.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="bg-white border border-gray-200/60 rounded-2xl shadow-md hover:shadow-lg transition-shadow p-8"
              >
                <CardContent className="p-0">
                  <div className="flex justify-between items-center mb-4">
                    <Badge
                      variant="outline"
                      className="py-2 px-4 pr-4 flex items-center h-12 gap-2 mb-3 backdrop-blur-sm rounded-[12px]"
                    >
                      <span>We Connect Profiles</span>
                    </Badge>
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="w-5 h-5 text-gray-700" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VisionMission;

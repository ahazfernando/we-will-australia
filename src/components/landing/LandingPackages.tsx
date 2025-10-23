import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AlertTriangleIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
    />
  </svg>
);

const ZapIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const UsersIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const KeyIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
    />
  </svg>
);

type StoryPoint = {
  title: string;
  description: string;
  icon: React.ComponentType;
};

const storyPoints: StoryPoint[] = [
  {
    icon: AlertTriangleIcon,
    title: "Recognizing the Gap",
    description:
      "Fragmented providers and geographical barriers prevented businesses in Victoria from accessing strategic solutions.",
  },
  {
    icon: ZapIcon,
    title: "Building the Bridge",
    description:
      "Victoria's premier all-in-one platform, uniting Marketing, Recruitment, IT, and Business Solutions.",
  },
  {
    icon: UsersIcon,
    title: "Connect with Our Experts",
    description:
      "Tap into Victoria's leading Marketing, Recruitment, IT, and Business Solutions professionals to drive your growth.",
  },
  {
    icon: KeyIcon,
    title: "Keep in touch with our Social Media",
    description:
      "Download our complete company profile and discover what makes us different.",
  },
];

const LandingPackages: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                    Victoria: Everything you need
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
          
         <div className="flex flex-col lg:flex-row gap-8 mt-8">
           <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {storyPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50/80 border border-gray-200/60 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  style={{ height: "204px" }}
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gray-200 mb-4">
                      <div className="text-gray-700">
                        <Icon />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {point.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed flex-grow">
                      {point.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="lg:w-1/3">
            <div
              className="relative rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              style={{ height: "440px" }}
            >
              <video
                title="A video showcasing the story and innovation of We Will Australia."
                src="/about/wwa-story.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute top-4 left-4">
                <Badge
                  variant="outline"
                  className="py-1 px-4 pr-4 flex items-center gap-2 bg-gray-100/80 backdrop-blur-sm shadow-sm rounded-[24px]"
                >
                  <span>Peak Innovation</span>
                </Badge>
              </div>
            </div>
          </div>
      </div>
      </div>
    </section>
  );
};

export default LandingPackages;
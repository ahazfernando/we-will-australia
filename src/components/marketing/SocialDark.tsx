"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { OrbitingCircles } from "@/registry/magicui/orbiting-circles";
import Image from "next/image";

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
      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z"
    />
  </svg>
);

const Icons = {
  instagram: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
        fill="currentColor"
      />
    </svg>
  ),
  facebook: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
        fill="currentColor"
      />
    </svg>
  ),
  linkedin: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        fill="currentColor"
      />
    </svg>
  ),
  x: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        fill="currentColor"
      />
    </svg>
  ),
};

const storyPoints = [
  {
    icon: AlertTriangleIcon,
    title: "Recognizing the Gap",
    description:
      "Fragmented providers and geographical barriers prevented Business in Victoria from accessing strategic solutions.",
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

const SocialDark = () => {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/marketing/earthpurplemoon.png"
          alt="Earth Purple Moon Background"
          fill
          className="object-cover opacity-20"
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mb-8">
          <h2 className="font-semibold mb-2 leading-tight text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-[#CEC2EB] to-[#EBE8FC] bg-clip-text text-transparent">
          We Specialize in Social Media
            <span className="block">
              to Improve your Brand
            </span>
            </h2>
          <p className="mt-4 text-lg text-white/80">
            From challenge to solution: Connecting Victoria's businesses with
            globally to thrive and improve
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {storyPoints.map((point, index) => {
              const Icon = point.icon;
              
              const getGradientPosition = (cardIndex: number) => {
                switch (cardIndex) {
                  case 0:
                    return "absolute -bottom-48 -right-48 w-80 h-80 bg-gradient-to-tl from-[#CEC2EB]/20 via-[#BA64FF]/15 to-transparent rounded-full blur-3xl z-0";
                  case 1:
                    return "absolute -bottom-48 -left-48 w-80 h-80 bg-gradient-to-tr from-[#CEC2EB]/20 via-[#BA64FF]/15 to-transparent rounded-full blur-3xl z-0";
                  case 2:
                    return "absolute -top-48 -right-48 w-80 h-80 bg-gradient-to-bl from-[#CEC2EB]/20 via-[#BA64FF]/15 to-transparent rounded-full blur-3xl z-0";
                  case 3:
                    return "absolute -top-48 -left-48 w-80 h-80 bg-gradient-to-br from-[#CEC2EB]/20 via-[#BA64FF]/15 to-transparent rounded-full blur-3xl z-0";
                  default:
                    return "absolute -bottom-48 -right-48 w-80 h-80 bg-gradient-to-tl from-[#CEC2EB]/20 via-[#BA64FF]/15 to-transparent rounded-full blur-3xl z-0";
                }
              };
              
              return (
                <div
                  key={index}
                  className="bg-black/20 backdrop-blur-xl text-white rounded-2xl shadow-2xl hover:shadow-xl transition-shadow relative overflow-hidden border border-white/10"
                  style={{ height: "204px" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/2 via-transparent to-purple-500/3 rounded-2xl"></div>
                  
                  <div className={getGradientPosition(index)}></div>
                  
                  <div className={`absolute ${index === 0 ? '-bottom-24 -right-24' : index === 1 ? '-bottom-24 -left-24' : index === 2 ? '-top-24 -right-24' : '-top-24 -left-24'} w-60 h-60 bg-gradient-to-tl from-[#EBE8FC]/25 via-[#CEC2EB]/20 to-transparent rounded-full blur-2xl z-0`}></div>

                  <div className="p-6 flex flex-col h-full relative z-10">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#CEC2EB]/20 mb-4">
                      <div className="text-[#CEC2EB]">
                        <Icon />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {point.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed flex-grow">
                      {point.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="lg:w-1/3">
            <div
              className="relative rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden bg-gray-900"
              style={{ height: "440px" }}
            >
              <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/marketing/SkillCity.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-4 left-4">
                <Badge
                  variant="outline"
                  className="py-1 px-4 pr-4 flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm shadow-sm rounded-[24px] border-gray-700"
                >
                  <span className="text-white">Social Media</span>
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialDark;

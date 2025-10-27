"use client";

import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";

const ITDownloadSection: React.FC = () => {
  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = "/itconsult/WWA_ITDoc(D1V1C1).pdf";
    link.download = "WWA_ITDoc.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/itconsult/Background.png"
              alt="IT Solutions Background"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          
          {/* Content */}
          <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-24">
            {/* Profile Images */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden">
                <Image
                  src="/itconsult/Avatar.png"
                  alt="Team Member 1"
                  width={160}
                  height={160}
                  quality={100}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden">
                <Image
                  src="/itconsult/Avatar-1.png"
                  alt="Team Member 2"
                  width={160}
                  height={160}
                  quality={100}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden">
                <Image
                  src="/itconsult/Avatar-2.png"
                  alt="Team Member 3"
                  width={160}
                  height={160}
                  quality={100}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Main Heading */}
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white text-center mb-3 leading-tight">
              Choose We Will Australia! Your <br />trusted guide
              through the Digital landscape
            </h2>

            {/* Subtitle */}
            <p className="text-gray-200 text-center text-lg lg:text-xl mb-5 max-w-3xl mx-auto">
              Download our Official Documentation to know about our IT Solutions
            </p>

            {/* Download Button */}
            <div className="flex justify-center">
              <button
                onClick={handleDownload}
                className=" font-semibold bg-white text-black hover:bg-gray-100 transition-colors px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-xl flex items-center gap-3"
              >
                <Download className="h-5 w-5" />
                Download Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ITDownloadSection;

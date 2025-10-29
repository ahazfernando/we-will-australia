import React from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const CommunityConnections: React.FC = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-4xl mx-auto">
          <div className="relative min-h-0 md:min-h-[500px] flex items-center justify-center py-8 md:py-20 overflow-visible">
            <div className="text-center relative z-10">
            <Badge
                variant="outline"
                className="py-1 px-4 pr-2 flex items-center gap-2 mb-3 bg-gray-100/20 backdrop-blur-sm shadow-sm rounded-[24px] w-fit mx-auto text-gray-900"
              >
                <span>Reach new heights</span>
                <div className="w-10 h-6 rounded-[20px] bg-gray-900 flex items-center justify-center">
                  <ArrowRight className="h-3 w-3 text-white" />
                </div>
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Connect, Collaborate, and Grow
                <br />
                with Our{" "}
                <span className="text-green-600">Community</span>
                
              </h2>
          <div className="text-center mt-4">
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of professionals, and businesses across Australia <br />who are building stronger connections and growing together.
            </p>
            <a 
              href="https://chat.whatsapp.com/KVdtQUzOTJrJDbHT0MlY9I" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
            >
              Join our WhatsApp Community
            </a>
          </div>
            </div>
            <div className="hidden md:block absolute top-8 left-4 md:top-12 md:left-[12%] w-16 h-16 md:w-20 md:h-20">
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src="/community/peopleimages/Frame.png"
                  alt="Community Member"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="hidden md:block absolute top-8 right-4 md:top-12 md:right-[8%] w-16 h-16 md:w-20 md:h-20">
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src="/community/peopleimages/Frame-1.png"
                  alt="Community Member"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="hidden md:block absolute top-[calc(50%+8px)] -left-8 md:-left-4 -translate-y-0 w-16 h-16 md:w-20 md:h-20">
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src="/community/peopleimages/Frame-2.png"
                  alt="Community Member"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="hidden md:block absolute top-[calc(50%+8px)] -right-12 md:-right-4 -translate-y-0 w-16 h-16 md:w-20 md:h-20">
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src="/community/peopleimages/Frame-3.png"
                  alt="Community Member"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="hidden md:block absolute bottom-8 left-4 md:bottom-12 md:left-[10%] w-16 h-16 md:w-20 md:h-20">
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src="/community/peopleimages/Frame-4.png"
                  alt="Community Member"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="hidden md:block absolute bottom-8 right-4 md:bottom-12 md:right-[10%] w-16 h-16 md:w-20 md:h-20">
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src="/community/peopleimages/Frame-5.png"
                  alt="Community Member"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityConnections;


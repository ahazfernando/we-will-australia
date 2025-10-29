import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const DiscoverRegional: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Bento Grid on the left */}
          <div className="grid grid-cols-3 gap-4 auto-rows-[160px]">
            {/* Card 1 - spans 1 col, 2 rows (tall left) */}
            <div className="relative col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/community/bentogridcomm/GridImage(D1V1C1).jpg"
                alt="Regional Australia"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Card 2 - spans 1 col, 1 row (top middle) */}
            <div className="relative col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/community/bentogridcomm/GridImage(D1V1C2).jpg"
                alt="Regional Australia"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Card 3 - spans 1 col, 1 row (top right) - Kangaroo */}
            <div className="relative col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/community/bentogridcomm/GridImage(D1V1C4).jpg"
                alt="Regional Australia"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Card 4 - spans 2 cols, 1 row (bottom wide) - Girls */}
            <div className="relative col-span-2 row-span-1 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/community/bentogridcomm/GridImage(D1V1C3).jpg"
                alt="Regional Australia"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content on the right */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-4">
                Discover Regional Australia
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Explore the vibrant communities, unique opportunities, and rich culture that make regional Australia a destination for businesses, professionals, and families seeking growth and connection.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/blog">
                <button className="flex items-center justify-center px-4 sm:px-6 text-sm sm:text-base bg-transparent border-1 border-black text-black rounded-xl hover:bg-black hover:text-white transition-colors w-full sm:w-auto min-w-0 sm:min-w-[180px] h-10 whitespace-nowrap">
                  <span>Visit Our Blogs</span>
                </button>
              </Link>
              <Link href="/magazine">
                <button className="flex items-center justify-center px-4 sm:px-6 text-sm sm:text-base bg-[#001114] hover:bg-gray-800 text-white rounded-xl transition-colors w-full sm:w-auto min-w-0 sm:min-w-[200px] h-10 whitespace-nowrap">
                  <span>Explore WWA Magazine</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverRegional;

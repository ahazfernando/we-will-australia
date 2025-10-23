"use client";
import WorldMap from "@/components/ui/world-map";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React from "react";

export function WorldMapDemo() {
  // Melbourne coordinates (double-checked)
  const melbourneCoords = { lat: -37.8136, lng: 144.9631 };
  
  return (
    <div className="dark:bg-black bg-white w-full">
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid grid-cols-12 text-center">
            <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center mx-auto">
              <Badge
                variant="outline"
                className="py-1 px-4 pr-4 flex items-center gap-2 mb-3 bg-gray-100/80 backdrop-blur-sm shadow-sm rounded-[24px] w-fit mx-auto"
              >
                <span>Time to go Global</span>
              </Badge>
              <h1 className="text-2xl sm:text-xl md:text-2xl lg:text-[36px] font-semibold text-gray-800 dark:text-gray-200 mb-2 gradient-text leading-tight">
                Built to Connect Cities and Regions
                <br />
                Through Strategy, Talent, and Technology
              </h1>
              <p className="text-md text-black dark:text-gray-300 max-w-4xl mb-4 mx-auto">
                Your Link Between Strategy, People, and Innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto justify-center">
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

      {/* World Map Section */}
      <div className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-12">
              <WorldMap
                dots={[
                  // Melbourne -> Los Angeles
                  { 
                    start: melbourneCoords, 
                    end: { lat: 34.0522, lng: -118.2437 } 
                  },
                  // Melbourne -> Berlin
                  { 
                    start: melbourneCoords, 
                    end: { lat: 52.5200, lng: 13.4050 } 
                  },
                  // Melbourne -> London
                  { 
                    start: melbourneCoords, 
                    end: { lat: 51.5074, lng: -0.1278 } 
                  },
                  // Melbourne -> Auckland
                  { 
                    start: melbourneCoords, 
                    end: { lat: -36.8485, lng: 174.7633 } 
                  },
                  // Melbourne -> Tokyo
                  { 
                    start: melbourneCoords, 
                    end: { lat: 35.6762, lng: 139.6503 } 
                  },
                  // Melbourne -> Singapore (added for better connectivity)
                  { 
                    start: melbourneCoords, 
                    end: { lat: 1.3521, lng: 103.8198 } 
                  },
                  // Melbourne -> Dubai (added for better connectivity)
                  { 
                    start: melbourneCoords, 
                    end: { lat: 25.2048, lng: 55.2708 } 
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorldMapDemo;
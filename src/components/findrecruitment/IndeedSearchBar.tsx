"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, X } from "lucide-react";

interface IndeedSearchBarProps {
  onSearch: (query: string, location: string) => void;
}

const IndeedSearchBar: React.FC<IndeedSearchBarProps> = ({ onSearch }) => {
  const [jobQuery, setJobQuery] = useState('');
  const [location, setLocation] = useState('');
  const [showTip, setShowTip] = useState(true);

  const handleSearch = () => {
    onSearch(jobQuery, location);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
      <div className="bg-white py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Responsive search container */}
            <div className="flex flex-col md:flex-row bg-white border-2 border-gray-300 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">

              {/* Job Input */}
              <div className="flex-1 flex items-center px-4 py-1 border-b-2 md:border-b-0 md:border-r-2 border-gray-300">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <Input
                    placeholder="Job title, keywords, or company"
                    value={jobQuery}
                    onChange={(e) => setJobQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="border-0 p-0 text-base md:text-lg focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none h-auto py-2"
                />
              </div>

              {/* Location Input */}
              <div className="flex-1 flex items-center px-4 py-1 border-b-2 md:border-b-0 md:border-r-2 border-gray-300">
                <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                <Input
                    placeholder="City, state, or 'remote'"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="border-0 p-0 text-base md:text-lg focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none h-auto py-2"
                />
              </div>

              {/* Search Button using shadcn Button component */}
              <Button
                  onClick={handleSearch}
                  className="w-full md:w-auto px-8 py-3 font-semibold text-lg rounded-none h-full"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default IndeedSearchBar;


"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, ExternalLink } from "lucide-react";
import { Job } from "@/types/job";

interface IndeedJobCardProps {
  job: Job;
  isSelected?: boolean;
  onClick?: () => void;
}

const IndeedJobCard: React.FC<IndeedJobCardProps> = ({ job, isSelected = false, onClick }) => {

  return (
    <div 
      className={`p-4 border-l-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
        isSelected 
          ? 'border-black bg-gray-50' 
          : 'border-transparent hover:border-gray-300'
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-black">
            {job.title}
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span className="font-medium">{job.company}</span>
            <span>•</span>
            <span>
              {job.city && job.state 
                ? `${job.city}, ${job.state}` 
                : job.location || 'Remote'
              }
            </span>
          </div>

          <div className="text-xs text-gray-600 mt-2">
            <p className="line-clamp-2">
              {job.description ? job.description.split('.')[0] + '.' : 'No description available.'}
            </p>
          </div>

          {/* View Count */}
          {job.viewCount !== undefined && (
            <div className="mt-2">
              <span className="text-xs text-green-600 font-medium">
                Viewed by {job.viewCount} Applicants
              </span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default IndeedJobCard;

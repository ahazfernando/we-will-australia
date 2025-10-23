"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Copy, Lightbulb } from "lucide-react";
import { Job } from "@/types/job";
import { toast } from 'react-hot-toast';

interface IndeedJobDetailsProps {
  job: Job | null;
  onApply?: () => void;
}

const IndeedJobDetails: React.FC<IndeedJobDetailsProps> = ({ job, onApply }) => {
  const handleCopyJobLink = async () => {
    if (!job) return;
    
    try {
      // Create a job link (you can customize this URL structure)
      const jobLink = `${window.location.origin}/recruitment/listings?job=${job.id}`;
      
      await navigator.clipboard.writeText(jobLink);
      toast.success('Job link successfully copied!');
    } catch (error) {
      toast.error('Failed to copy job link');
    }
  };

  if (!job) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-center text-gray-500">
            <p className="text-lg mb-2">Select a job to view details</p>
            <p className="text-sm">Click on any job listing to see more information</p>
          </div>
        </div>
    );
  }

  return (
      <div className="bg-white border border-gray-200 rounded-lg">
        {/* Job Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {job.title}
              </h2>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <span className="font-medium">{job.company}</span>
                <span>•</span>
                <span>
                  {job.city && job.state 
                    ? `${job.city}, ${job.state}` 
                    : job.location || 'Remote'
                  }
                </span>
              </div>
            </div>

            <div className="flex gap-2 ml-4">
              <div className="relative group">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-10"
                  onClick={handleCopyJobLink}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  Copy job link
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                </div>
              </div>
            </div>
          </div>

          <Button
              className="w-full bg-black hover:bg-gray-800 text-white py-3 text-lg font-semibold"
              onClick={onApply}
          >
            Apply now
          </Button>
        </div>

        {/* Job Description */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {job.description}
            </p>
          </div>
        </div>

        {/* Requirements Section */}
        {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
              <ul className="prose prose-sm max-w-none list-disc pl-5 space-y-2">
                {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="text-gray-700 leading-relaxed">
                      {responsibility}
                    </li>
                ))}
              </ul>
            </div>
        )}

        {/* Skills */}
        {job.skills && job.skills.length > 0 && (
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {skill}
                    </Badge>
                ))}
              </div>
            </div>
        )}

      </div>
  );
};

export default IndeedJobDetails;

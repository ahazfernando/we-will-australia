"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Star } from "lucide-react";
import { Job } from "@/types/job";
import Link from "next/link";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const renderStars = (rating?: number) => {
    if (!rating) return null;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          {/* Company Logo */}
          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white font-bold text-lg">
            {job.company.charAt(0)}
          </div>
          
          {/* Bookmark Icon */}
          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>

        {/* Job Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-black transition-colors">
          {job.title}
        </h3>

        {/* Company Name */}
        <p className="text-gray-600 text-sm mb-2">{job.company}</p>

        {/* Job Details */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span>{job.experienceLevel}</span>
          <span>•</span>
          <span>Est. Budget: {job.budget}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {job.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {renderStars(job.rating)}
            <span className="text-xs text-gray-500">{job.postedTime}</span>
          </div>
          
          <Link href={`/recruitment/${job.id}`}>
            <Button size="sm" className="bg-black hover:bg-gray-800">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;

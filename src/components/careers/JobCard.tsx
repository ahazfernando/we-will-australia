"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, MapPin, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface JobCardProps {
    job: {
        id: string;
        title: string;
        location: string;
        type: 'Full-time' | 'Part-time' | 'Internship';
        department: string;
        companyDescription: string;
        roleDescription: string;
        qualifications: string[];
        backgroundImageUrl: string;
        postedDate?: string;
    };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    const router = useRouter();
    const [isSaved, setIsSaved] = useState(false);

    const handleSaveToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsSaved(!isSaved);
    };

    const handleApplyClick = () => {
        router.push(`/careers/apply/${job.id}`);
    };

    const getTimeAgo = (dateString?: string) => {
        if (!dateString) return 'Recently';
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
        return `${Math.ceil(diffDays / 30)} months ago`;
    };

    const getJobTypeBadges = () => {
        const badges = [];
        
        // Primary job type badge
        badges.push(
            <Badge 
                key="type" 
                variant={job.type === 'Full-time' ? 'default' : 'secondary'}
                className="text-xs px-2 py-1"
            >
                {job.type}
            </Badge>
        );

        // Add experience level if available
        if (job.title.toLowerCase().includes('senior')) {
            badges.push(
                <Badge key="level" variant="outline" className="text-xs px-2 py-1">
                    Senior level
                </Badge>
            );
        } else if (job.title.toLowerCase().includes('junior')) {
            badges.push(
                <Badge key="level" variant="outline" className="text-xs px-2 py-1">
                    Junior level
                </Badge>
            );
        }

        // Add remote/office badge
        if (job.location.toLowerCase().includes('remote')) {
            badges.push(
                <Badge key="remote" variant="outline" className="text-xs px-2 py-1">
                    Remote
                </Badge>
            );
        } else {
            badges.push(
                <Badge key="office" variant="outline" className="text-xs px-2 py-1">
                    In office
                </Badge>
            );
        }

        return badges;
    };


    return (
        <Card 
            className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-white border-gray-200/80 rounded-2xl overflow-hidden"
            onClick={handleApplyClick}
        >
            <CardContent className="p-6">
                {/* Header Section */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div>
                            <div className="font-semibold text-gray-900">We Will Australia</div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Clock className="w-3 h-3" />
                                {getTimeAgo(job.postedDate)}
                            </div>
                        </div>
                    </div>
                    
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSaveToggle}
                        className={`p-2 hover:bg-gray-100 transition-colors ${
                            isSaved ? 'text-blue-600' : 'text-gray-400'
                        }`}
                    >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </Button>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                    {job.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                    {getJobTypeBadges()}
                </div>

                {/* Footer Section */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        {/* Location */}
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                        </div>
                    </div>

                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleApplyClick();
                        }}
                        className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                        Apply now
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default JobCard;

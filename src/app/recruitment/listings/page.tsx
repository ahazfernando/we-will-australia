"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Job } from "@/types/job";

// Import Indeed-style components
import IndeedSearchBar from "@/components/findrecruitment/IndeedSearchBar";
import IndeedFilters from "@/components/findrecruitment/IndeedFilters";
import IndeedJobCard from "@/components/findrecruitment/IndeedJobCard";
import IndeedJobDetails from "@/components/findrecruitment/IndeedJobDetails";
import JobDetailsForm from "@/components/findrecruitment/JobDetailsForm";
import SuccessDialog from "@/components/findrecruitment/SuccessDialog";
import BrowseJobsHero from "@/components/recruitment/BrowseJobsHero";
import JobCardSkeleton from "@/components/findrecruitment/JobCardSkeleton";

export default function JobListingPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        workType: '',
        datePosted: '',
        jobType: '',
        experience: '',
        salary: '',
        education: '',
    });

    useEffect(() => {
        const fetchJobs = async () => {
            const querySnapshot = await getDocs(collection(db, "listings"));
            const jobsData = querySnapshot.docs.map(doc => {
                const data = doc.data();
                const postedTime = data.postedTime;
                let postedTimeString = "Not specified";
                if (postedTime && typeof postedTime.toDate === 'function') {
                    postedTimeString = new Date(postedTime.toDate()).toLocaleDateString();
                } else if (postedTime && postedTime.seconds) {
                    postedTimeString = new Date(postedTime.seconds * 1000).toLocaleDateString();
                }

                return {
                    id: doc.id,
                    ...data,
                    postedTime: postedTimeString,
                    skills: data.skills || [],
                } as Job;
            });
            setJobs(jobsData);

            // Select first job by default
            if (jobsData.length > 0) {
                setSelectedJob(jobsData[0]);
            }
            
            setIsLoading(false);
        };

        fetchJobs();
    }, []);

    const filteredJobs = useMemo(() => {
        let filtered = jobs;

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter((job: Job) =>
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.state?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.location?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (locationQuery) {
            filtered = filtered.filter((job: Job) =>
                job.location?.toLowerCase().includes(locationQuery.toLowerCase()) ||
                job.city?.toLowerCase().includes(locationQuery.toLowerCase()) ||
                job.state?.toLowerCase().includes(locationQuery.toLowerCase()) ||
                job.location?.toLowerCase().includes('remote')
            );
        }
        // Work type filter
        if (filters.workType) {
            filtered = filtered.filter((job: Job) => {
                const location = job.location?.toLowerCase() || '';
                const city = job.city?.toLowerCase() || '';
                const state = job.state?.toLowerCase() || '';
                const combinedLocation = `${location} ${city} ${state}`.trim();
                
                if (filters.workType === 'remote') {
                    return combinedLocation.includes('remote');
                } else if (filters.workType === 'onsite') {
                    return !combinedLocation.includes('remote') && !combinedLocation.includes('hybrid');
                } else if (filters.workType === 'hybrid') {
                    return combinedLocation.includes('hybrid');
                }
                return true;
            });
        }

        // Job type filter
        if (filters.jobType) {
            filtered = filtered.filter((job: Job) =>
                job.type?.toLowerCase().includes(filters.jobType.toLowerCase())
            );
        }

        // Experience level filter
        if (filters.experience) {
            filtered = filtered.filter((job: Job) =>
                job.experienceLevel?.toLowerCase().includes(filters.experience.toLowerCase())
            );
        }

        // Salary filter
        if (filters.salary) {
            const minSalary = parseInt(filters.salary, 10);
            if (!isNaN(minSalary)) {
                filtered = filtered.filter((job: Job) => {
                    if (!job.budget) return false;
                    // Extracts numbers from the budget string (e.g., "78,000+AUD" -> "78000")
                    const budgetString = job.budget.replace(/,/g, '').match(/\d+/);
                    if (!budgetString) return false;

                    const jobSalary = parseInt(budgetString[0], 10);
                    return !isNaN(jobSalary) && jobSalary >= minSalary;
                });
            }
        }

        return filtered;
    }, [searchQuery, locationQuery, filters, jobs]);
    useEffect(() => {
        if (filteredJobs.length > 0) {
            const isCurrentJobInResults = filteredJobs.some(job => job.id === selectedJob?.id);
            if (!isCurrentJobInResults) {
                setSelectedJob(filteredJobs[0]);
            }
        } else if (filteredJobs.length === 0 && !isLoading) {
            setSelectedJob(null);
        }
    }, [filteredJobs, selectedJob, isLoading]);

    const handleSearch = (query: string, location: string) => {
        setSearchQuery(query);
        setLocationQuery(location);
    };

    const handleFilterChange = (filterType: string, value: string) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
    };

    const handleApplyClick = () => {
        if (selectedJob) {
            setShowApplicationForm(true);
        }
    };

    const handleApplicationSubmit = () => {
        setShowApplicationForm(false);
        setShowSuccessDialog(true);
    };

    return (
        <><BrowseJobsHero/>
            <div className="min-h-screen bg-gray-50 mt-10">
                {/* Search Bar */}
                <IndeedSearchBar onSearch={handleSearch}/>

                {/* Filters */}
                <IndeedFilters onFilterChange={handleFilterChange}/>

                {/* Main Content */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
                        {/* Left Column - Job Listings */}
                        <div className="space-y-4">
                            {/* Job Count and Sort */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {searchQuery ? `${searchQuery} jobs` : 'All jobs'}
                                    </h2>
                                    <span className="text-sm text-gray-600">
                                    {filteredJobs.length} jobs
                                </span>
                                    <Button variant="ghost" size="sm" className="text-gray-500">
                                        <HelpCircle className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>

                            {/* Job Listings */}
                            <div className="space-y-0 bg-white border border-gray-200 rounded-lg overflow-hidden">
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, index) => (
                                        <JobCardSkeleton key={index} />
                                    ))
                                ) : (
                                    filteredJobs.map((job) => (
                                        <div key={job.id}>
                                            <IndeedJobCard
                                                job={job}
                                                isSelected={selectedJob?.id === job.id}
                                                onClick={() => setSelectedJob(job)}/>

                                            {selectedJob?.id === job.id && (
                                                <div className="lg:hidden border-t border-gray-200">
                                                    <IndeedJobDetails job={selectedJob} onApply={handleApplyClick}/>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>

                            {!isLoading && filteredJobs.length === 0 && (
                                <Card className="p-8 text-center">
                                    <CardContent>
                                        <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
                                        <p className="text-gray-400 text-sm mt-2">Try adjusting your search or
                                            filters.</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Right Column - Job Details */}
                        <div className="hidden lg:block lg:sticky lg:top-24">
                            <IndeedJobDetails job={selectedJob} onApply={handleApplyClick}/>
                        </div>
                    </div>
                </div>

                {/* Application Form Modal */}
                {showApplicationForm && selectedJob && (
                    <JobDetailsForm
                        job={selectedJob}
                        onSubmit={handleApplicationSubmit}
                        onClose={() => setShowApplicationForm(false)}/>
                )}

                {/* Success Dialog */}
                {showSuccessDialog && (
                    <SuccessDialog onClose={() => setShowSuccessDialog(false)}/>
                )}
            </div>
        </>
    );
}
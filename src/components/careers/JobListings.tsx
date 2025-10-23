"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import toast from 'react-hot-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Search, Grid3X3, List } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state
import { useRouter } from 'next/navigation';
import JobCard from './JobCard';

// Updated Job interface to include background image URL
interface Job {
    id: string;
    title: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Internship';
    department: string;
    companyDescription: string;
    roleDescription: string;
    qualifications: string[];
    backgroundImageUrl: string;
}

const JobListings: React.FC = () => {
    const router = useRouter();
    // State management
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [typeFilter, setTypeFilter] = useState<'All' | 'Full-time' | 'Part-time' | 'Internship'>('All');
    const [locationFilter, setLocationFilter] = useState('Location');
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [viewMode, setViewMode] = useState<'table' | 'card'>('card');
    const [isMobile, setIsMobile] = useState(false);

    // Fetch jobs from Firestore on component mount
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const jobsCollection = collection(db, 'careers');
                const q = query(jobsCollection, orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                const jobsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Job[];
                setJobs(jobsData);
            } catch (error) {
                console.error("Error fetching jobs:", error);
                toast.error('Failed to load job listings.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) {
                setViewMode('card');
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);


    const locations = ['Location', ...Array.from(new Set(jobs.map(job => job.location)))];
    const jobTypes: ('All' | Job['type'])[] = ['All', 'Full-time', 'Part-time', 'Internship'];

    const filteredJobs = useMemo(() => {
        let filtered = jobs;
        
        // Filter by job type
        if (typeFilter !== 'All') {
            filtered = filtered.filter(job => job.type === typeFilter);
        }
        
        // Filter by location
        if (locationFilter !== 'Location') {
            filtered = filtered.filter(job => job.location === locationFilter);
        }
        
        // Filter by search query
        if (searchQuery.trim()) {
            filtered = filtered.filter(job => 
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        return filtered;
    }, [jobs, typeFilter, locationFilter, searchQuery]);

    const handleApplyClick = (job: Job) => {
        router.push(`/careers/apply/${job.id}`);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedJob) return;

        setIsSubmitting(true);
        const toastId = toast.loading('Submitting application...');
        const formData = new FormData(e.target as HTMLFormElement);
        formData.append('jobTitle', selectedJob.title);

        try {
            const response = await fetch('/api/apply', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Submission failed.');
            }

            toast.success('Application submitted successfully!', { id: toastId });
            setIsDialogOpen(false);
            setSelectedJob(null);
        } catch (error: any) {
            toast.error(error.message, { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleExport = () => {
        const headers = ['Position', 'Department', 'Location', 'Type'];
        const csvContent = [
            headers.join(','),
            ...filteredJobs.map(job => [job.title, job.department, job.location, job.type].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute('download', 'job_listings_wwa.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section id="job-listings" className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 items-center">
                <div className="flex flex-col lg:flex-row items-center gap-4 mb-6">
                    <div className="flex flex-wrap items-center gap-4.5 p-1 bg-gray-200/80 rounded-lg h-10 w-full lg:w-auto lg:flex-shrink-0">
                        {jobTypes.map(tab => (
                            <Button
                                key={tab}
                                onClick={() => setTypeFilter(tab)}
                                variant={typeFilter === tab ? 'default' : 'ghost'}
                                className={`rounded-md px-2.5 py-1.5 text-sm transition-colors h-8 ${
                                    typeFilter === tab ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600 hover:bg-gray-200/50'
                                }`}
                            >
                                {tab}
                            </Button>
                        ))}
                    </div>
                    <div className="relative w-full lg:w-auto lg:flex-1 lg:max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            type="text"
                            placeholder="Search jobs by title, department, or location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 h-10 w-full bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto lg:flex-shrink-0">
                        <Select value={locationFilter} onValueChange={setLocationFilter}>
                            <SelectTrigger className="h-10 bg-white w-full sm:w-auto lg:w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {locations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
                            </SelectContent>
                        </Select>

                        {!isMobile && (
                            <div className="flex items-center gap-1 bg-gray-200/80 rounded-lg p-1">
                                <Button
                                    variant={viewMode === 'card' ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('card')}
                                    className={`px-3 py-1 h-8 ${
                                        viewMode === 'card' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600 hover:bg-gray-200/50'
                                    }`}
                                >
                                    <Grid3X3 size={16} />
                                </Button>
                                <Button
                                    variant={viewMode === 'table' ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('table')}
                                    className={`px-3 py-1 h-8 ${
                                        viewMode === 'table' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600 hover:bg-gray-200/50'
                                    }`}
                                >
                                    <List size={16} />
                                </Button>
                            </div>
                        )}
                        
                        <Button variant="outline" className="flex items-center gap-2 h-10 px-4 w-full sm:w-auto" onClick={handleExport}>
                            <Upload size={16} />
                            <span>Export</span>
                        </Button>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Open Positions</h2>
                        <p className="text-gray-600">Recent job openings from our company.</p>
                    </div>
                    
                    {isLoading ? (
                        viewMode === 'card' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <Card key={index} className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <Skeleton className="w-10 h-10 rounded-full" />
                                                <div>
                                                    <Skeleton className="h-4 w-24 mb-2" />
                                                    <Skeleton className="h-3 w-16" />
                                                </div>
                                            </div>
                                            <Skeleton className="w-8 h-8" />
                                        </div>
                                        <Skeleton className="h-6 w-3/4 mb-3" />
                                        <div className="flex gap-2 mb-4">
                                            <Skeleton className="h-6 w-16" />
                                            <Skeleton className="h-6 w-20" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-4">
                                                <Skeleton className="h-4 w-16" />
                                                <Skeleton className="h-4 w-20" />
                                            </div>
                                            <Skeleton className="h-8 w-20" />
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card className="shadow-xl rounded-2xl border-gray-200/80">
                                <CardHeader>
                                    <CardTitle>Open Positions</CardTitle>
                                    <CardDescription>Recent job openings from our company.</CardDescription>
                                </CardHeader>
                                <CardContent className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-full md:w-[30%]">Position</TableHead>
                                                <TableHead>Department</TableHead>
                                                <TableHead>Location</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead className="text-right"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {Array.from({ length: 3 }).map((_, index) => (
                                                <TableRow key={index}>
                                                    <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                                                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                                                    <TableCell className="text-right"><Skeleton className="h-8 w-16" /></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        )
                    ) : filteredJobs.length > 0 ? (
                        viewMode === 'card' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredJobs.map(job => (
                                    <JobCard key={job.id} job={job} />
                                ))}
                            </div>
                        ) : (
                            <Card className="shadow-xl rounded-2xl border-gray-200/80">
                                <CardHeader>
                                    <CardTitle>Open Positions</CardTitle>
                                    <CardDescription>Recent job openings from our company.</CardDescription>
                                </CardHeader>
                                <CardContent className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-full md:w-[30%]">Position</TableHead>
                                                <TableHead>Department</TableHead>
                                                <TableHead>Location</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead className="text-right"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredJobs.map(job => (
                                                <TableRow key={job.id} className="hover:bg-gray-50">
                                                    <TableCell className="font-medium">
                                                        <div className="text-gray-800">{job.title}</div>
                                                    </TableCell>
                                                    <TableCell className="text-gray-600">{job.department}</TableCell>
                                                    <TableCell className="text-gray-600">{job.location}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={job.type === 'Full-time' ? 'default' : 'secondary'}
                                                            className="capitalize"
                                                        >
                                                            {job.type}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="outline" size="sm" onClick={() => handleApplyClick(job)}>Apply</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        )
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-500 text-lg mb-2">No open positions match your criteria.</div>
                            <p className="text-gray-400">Try adjusting your filters or check back later for new opportunities.</p>
                        </div>
                    )}
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="lg:max-w-4xl max-h-[90vh] flex flex-col p-0">
                        <DialogHeader className="p-6 pb-2 border-b flex-shrink-0">
                            <DialogTitle className="text-4xl text-left">{selectedJob?.title}</DialogTitle>
                            <DialogDescription className="text-left">
                                Please review the job details and submit your application.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex-1 flex flex-col md:flex-row overflow-y-auto min-h-0">
                            {/* Left Side: Job Description */}
                            <div
                                className="md:w-1/2 p-6 bg-cover bg-left-top relative rounded-xl ml-2 mb-2 mr-2 h-full"
                                style={{ backgroundImage: `url(${selectedJob?.backgroundImageUrl || '/careers/backdrop3.jpg'})` }}
                            >
                                <div className="absolute inset-0 bg-black/50 rounded-xl" />
                                <div className="relative">
                                    <h3 className="text-2xl font-bold mb-4 text-white">About the job</h3>
                                    <div className="space-y-6 text-sm">
                                        <div>
                                            <h4 className="font-semibold text-xl text-gray-100 mb-2">Company Description</h4>
                                            <p className="text-gray-200 text-lg ">{selectedJob?.companyDescription}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-xl text-gray-100 mb-2">Role Description</h4>
                                            <p className="text-gray-200 text-lg">{selectedJob?.roleDescription}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-xl text-gray-100 mb-2">Qualifications</h4>
                                            <ul className="list-disc list-inside space-y-1 text-gray-200 text-lg">
                                                {selectedJob?.qualifications.map((q, i) => <li key={i}>{q}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Application Form */}
                            <form
                                onSubmit={handleFormSubmit}
                                className="md:w-1/2 pl-6 pr-6 pb-6 pt-6 sm:pt-0 md:border-t-0"
                            >
                                <div className="space-y-6">
                                    {/* Personal Information */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
                                        <div>
                                            <Label htmlFor="firstName" className="text-md">First name *</Label>
                                            <Input id="firstName" name="firstName" required className="mt-1"/>
                                        </div>
                                        <div>
                                            <Label htmlFor="lastName" className="text-md">Last name *</Label>
                                            <Input id="lastName" name="lastName" required className="mt-1"/>
                                        </div>
                                        <div>
                                            <Label htmlFor="email" className="text-md">Email *</Label>
                                            <Input id="email" name="email" type="email" required className="mt-1"/>
                                        </div>
                                        <div>
                                            <Label htmlFor="address" className="text-md">Address *</Label>
                                            <Input id="address" name="address" required className="mt-1"/>
                                        </div>
                                        <div>
                                            <Label htmlFor="phone" className="text-md">Phone number</Label>
                                            <Input id="phone" name="phone" type="tel" className="mt-1"/>
                                        </div>
                                    </div>

                                    {/* Profiles */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold border-b pb-2">Your Profiles</h3>
                                        <div>
                                            <Label htmlFor="linkedin" className="text-md">LinkedIn</Label>
                                            <Input id="linkedin" name="linkedin" placeholder="https://linkedin.com/in/..." className="mt-1"/>
                                        </div>
                                    </div>

                                    {/* Resume */}
                                    <div className="space-y-2">
                                        <Label htmlFor="resume" className="text-md">Resume *</Label>
                                        <Input id="resume" name="resume" type="file" required accept=".pdf,.doc,.docx" className="cursor-pointer file:cursor-pointer"/>
                                        <p className="text-xs text-gray-500">10MB size limit. PDF, DOC, DOCX.</p>
                                    </div>

                                    {/* Cover Letter */}
                                    <div className="space-y-2">
                                        <Label htmlFor="coverletter" className="text-md">Message to our Hiring Team</Label>
                                        <Textarea id="coverletter" name="coverletter" required className="min-h-[120px]" placeholder="Let us know about your interest working here."/>
                                    </div>

                                    <div className="mt-8 pt-4 py-4">
                                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    );
};

export default JobListings;
"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, MapPin, Tag } from "lucide-react";
import toast from 'react-hot-toast';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

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

const JobApplicationPage: React.FC = () => {
    const params = useParams();
    const jobId = params?.id as string;
    
    const [job, setJob] = useState<Job | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        phone: '',
        linkedin: '',
        coverletter: '',
        resume: null as File | null
    });

    useEffect(() => {
        const fetchJob = async () => {
            if (!jobId) return;
            
            try {
                const jobDoc = await getDoc(doc(db, 'careers', jobId));
                if (jobDoc.exists()) {
                    setJob({ id: jobDoc.id, ...jobDoc.data() } as Job);
                }
            } catch (error) {
                console.error("Error fetching job:", error);
                toast.error('Failed to load job details.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchJob();
    }, [jobId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({ ...prev, resume: file }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!job) return;

        setIsSubmitting(true);
        const toastId = toast.loading('Submitting application...');
        
        const submitData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) submitData.append(key, value);
        });
        submitData.append('jobTitle', job.title);

        try {
            const response = await fetch('/api/apply', {
                method: 'POST',
                body: submitData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Submission failed.');
            }

            toast.success('Application submitted successfully!', { id: toastId });
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                address: '',
                phone: '',
                linkedin: '',
                coverletter: '',
                resume: null
            });
        } catch (error: any) {
            toast.error(error.message, { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white">
                <div className="container mx-auto px-4 py-8 mt-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-5">
                            <div className="mb-8">
                                <div className="mb-6">
                                    <Skeleton className="h-10 w-64 mb-4" />
                                    <div className="flex items-center gap-3 mb-6">
                                        <Skeleton className="h-6 w-20" />
                                        <Skeleton className="h-6 w-16" />
                                        <Skeleton className="h-6 w-24" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-6">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                                
                                <div>
                                    <Skeleton className="h-6 w-32 mb-4" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-5/6" />
                                </div>
                                
                                <div>
                                    <Skeleton className="h-6 w-28 mb-4" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-4/5" />
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-7">
                            <Card className="sticky top-8">
                                <CardContent className="p-6">
                                    <Skeleton className="h-6 w-80 mb-6" />
                                
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Skeleton className="h-4 w-20 mb-2" />
                                            <Skeleton className="h-10 w-full" />
                                        </div>
                                        <div>
                                            <Skeleton className="h-4 w-20 mb-2" />
                                            <Skeleton className="h-10 w-full" />
                                        </div>
                                        <div>
                                            <Skeleton className="h-4 w-16 mb-2" />
                                            <Skeleton className="h-10 w-full" />
                                        </div>
                                        <div>
                                            <Skeleton className="h-4 w-24 mb-2" />
                                            <Skeleton className="h-10 w-full" />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <Skeleton className="h-4 w-48 mb-2" />
                                        <Skeleton className="h-24 w-full" />
                                    </div>
                                    
                                    <div>
                                        <Skeleton className="h-4 w-16 mb-2" />
                                        <Skeleton className="h-32 w-full" />
                                    </div>
                                    
                                    <div>
                                        <Skeleton className="h-4 w-40 mb-3" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                    </div>
                                    
                                    <Skeleton className="h-10 w-full" />
                                </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h1>
                    <p className="text-gray-600">The job you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8 mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-5">
                        <div className="mb-8">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h1 className="text-4xl font-bold text-black mb-4">{job.title}</h1>
                                    <div className="flex items-center gap-3 mb-6">
                                        <Badge variant="secondary" className="bg-gray-100 text-black border border-gray-300 px-3 py-1">
                                            <Briefcase className="h-3 w-3 mr-1" />
                                            {job.type}
                                        </Badge>
                                        <Badge variant="secondary" className="bg-gray-100 text-black border border-gray-300 px-3 py-1">
                                            <MapPin className="h-3 w-3 mr-1" />
                                            {job.location}
                                        </Badge>
                                        <Badge variant="secondary" className="bg-gray-100 text-black border border-gray-300 px-3 py-1">
                                            <Tag className="h-3 w-3 mr-1" />
                                            {job.department}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="prose prose-lg max-w-none">
                            <div className="text-black leading-relaxed space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold text-black mb-4">Company Description</h3>
                                    <p className="text-lg">{job.companyDescription}</p>
                                </div>
                                
                                <div>
                                    <h3 className="text-xl font-bold text-black mb-4">Role Description</h3>
                                    <p className="text-lg">{job.roleDescription}</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-black mb-4">Qualifications</h3>
                                    <ul className="list-disc list-inside space-y-2 text-lg">
                                        {job.qualifications.map((qual, index) => (
                                            <li key={index}>{qual}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-7">
                        <Card className="sticky top-8 rounded-[24px]">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold text-black mb-6">Fill out the form below to apply for this job</h2>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="firstName" className="text-sm font-medium text-black">
                                            First name *
                                        </Label>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder="First name"
                                            required
                                            className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="lastName" className="text-sm font-medium text-black">
                                            Last name *
                                        </Label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Last name"
                                            required
                                            className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="email" className="text-sm font-medium text-black">
                                            Email *
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Email"
                                            required
                                            className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="address" className="text-sm font-medium text-black">
                                            Address *
                                        </Label>
                                        <Input
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="Address"
                                            required
                                            className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="phone" className="text-sm font-medium text-black">
                                            Phone number
                                        </Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Phone number"
                                            className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="linkedin" className="text-sm font-medium text-black">
                                        LinkedIn
                                    </Label>
                                    <Input
                                        id="linkedin"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleInputChange}
                                        placeholder="https://linkedin.com/in/..."
                                        className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="coverletter" className="text-sm font-medium text-black">
                                        Message to our Hiring Team
                                    </Label>
                                    <Textarea
                                        id="coverletter"
                                        name="coverletter"
                                        value={formData.coverletter}
                                        onChange={handleInputChange}
                                        placeholder="Let us know about your interest working here."
                                        rows={4}
                                        required
                                        className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="resume" className="text-sm font-medium text-black">Resume *</Label>
                                    <Input
                                        id="resume"
                                        name="resume"
                                        type="file"
                                        required
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                        className="mt-1 cursor-pointer file:cursor-pointer"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">10MB size limit. PDF, DOC, DOCX.</p>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-black hover:bg-gray-800 text-white"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobApplicationPage;
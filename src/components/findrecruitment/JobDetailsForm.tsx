"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Job } from "@/types/job";
import { toast } from 'react-hot-toast'; // Import toast for notifications
import { Loader2 } from 'lucide-react'; // Import a loader icon

interface JobDetailsFormProps {
  job: Job;
  onSubmit: () => void;
  onClose: () => void;
}

const JobDetailsForm: React.FC<JobDetailsFormProps> = ({ job, onSubmit, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Updated submission handler to use toasts and send correct data
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading('Submitting application...');

    const formData = new FormData(e.currentTarget);
    // Note: The hidden input now adds the jobTitle, so no extra append is needed.

    try {
      // Using the API route we confirmed works
      const response = await fetch('/api/recruitment', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const res = await response.json();
        throw new Error(res.error || 'Something went wrong. Please try again.');
      }

      toast.success('Application submitted successfully!', { id: toastId });
      onSubmit(); // Signal parent component to show success dialog
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="lg:max-w-4xl max-h-[90vh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-2 border-b flex-shrink-0">
            <DialogTitle className="text-4xl text-left">{job.title} at {job.company}</DialogTitle>
            <DialogDescription className="text-left">
              Please review the job details and submit your application.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 flex flex-col md:flex-row overflow-y-auto min-h-0">
            {/* Left Side: Job Description (Unchanged) */}
            <div
                className="md:w-1/2 p-6 bg-cover bg-left-top relative rounded-xl ml-2 mb-2 mr-2 h-full"
                style={{ backgroundImage: `url('/careers/backdrop3.jpg')` }}
            >
              <div className="absolute inset-0 bg-black/50 rounded-xl" />
              <div className="relative">
                <h3 className="text-2xl font-bold mb-4 text-white">About the Opportunity</h3>
                <div className="space-y-6 text-sm">

                  <div>
                    <h4 className="font-semibold text-xl text-gray-100 mb-2">Role Description</h4>
                    <p className="text-gray-200 text-lg">
                      {job.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-xl text-gray-100 mb-2">Ideal Candidate Profile</h4>
                    {job.responsibilities && job.responsibilities.length > 0 && (
                        <div>
                          <ul className="prose prose-sm max-w-none list-disc pl-5 space-y-2">
                            {job.responsibilities.map((responsibility, index) => (
                                <li key={index} className="text-white leading-relaxed text-lg">
                                  {responsibility}
                                </li>
                            ))}
                          </ul>
                        </div>
                    )}
                    <p className="text-gray-200 text-lg mt-4">
                      If you meet these qualifications and are ready for a new challenge, we encourage you to apply through We Will Australia today.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Application Form */}
            <form
                onSubmit={handleFormSubmit}
                className="md:w-1/2 pl-6 pr-6 pb-6 pt-6 sm:pt-0 md:border-t-0"
            >
              {/* --- FIX APPLIED HERE --- */}
              {/* This hidden input ensures the job title is sent with the form */}
              <input type="hidden" name="jobTitle" value={job.title} />

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
                    {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                    ) : 'Submit Application'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
  );
};

export default JobDetailsForm;
"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'react-hot-toast';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {Briefcase} from "lucide-react";

interface PostJobFormProps {
  onSubmit?: () => void;
}

const PostJobForm: React.FC<PostJobFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    // Job details
    title: '',
    location: '',
    type: '',
    department: '',
    companyDescription: '',
    roleDescription: '',
    qualifications: '',
    backgroundImageUrl: '',
    firstName: '',
    surname: '',
    phone: '',
    email: '',
    companyName: '',
    occupation: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading('Submitting form...');

    // Split qualifications string into an array
    const submissionData = {
      ...formData,
      qualifications: formData.qualifications.split('\n').filter(q => q.trim() !== ''),
    };

    try {
      const response = await fetch('/api/recruitment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      toast.success('Form submitted successfully!', { id: toastId });
      handleClear();
      onSubmit?.();
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      title: '',
      location: '',
      type: '',
      department: '',
      companyDescription: '',
      roleDescription: '',
      qualifications: '',
      backgroundImageUrl: '',
      firstName: '',
      surname: '',
      phone: '',
      email: '',
      companyName: '',
      occupation: '',
    });
  };

  return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* How It Works Section */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Briefcase className="h-6 w-6 text-gray-600" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">1. Fill Out the Form</h3>
                  <p className="text-gray-600 text-sm">Provide all the necessary details about the job opening.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">2. Submit & Review</h3>
                  <p className="text-gray-600 text-sm">Once submitted, your job post will be live and visible to thousands of potential candidates.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">3. Manage Applicants</h3>
                  <p className="text-gray-600 text-sm">Easily track and manage all applications directly from your employer dashboard.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Client Form Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-gray-900">Client Form</CardTitle>
                <p className="text-gray-600 mt-2">
                  Thank you for choosing We Will Australia Recruitment.
                  <br />
                  Please fill out the form to let us know about your staffing needs, and we will get back to you shortly.
                </p>
              </CardHeader>
              <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Job Details Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                    Job Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="title" className="mb-2">Job title <span className="text-red-500">*</span></Label>
                      <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="department" className="mb-2">Department <span className="text-red-500">*</span></Label>
                      <Input id="department" name="department" value={formData.department} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="location" className="mb-2">Job location <span className="text-red-500">*</span></Label>
                      <Input id="location" name="location" value={formData.location} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="type" className="mb-2">Job Type <span className="text-red-500">*</span></Label>
                      <Select name="type" onValueChange={(value) => handleSelectChange('type', value)} value={formData.type} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select one..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Internship">Internship</SelectItem>
                          <SelectItem value="Temporary">Temporary</SelectItem>
                          <SelectItem value="Permanent">Permanent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                        <Label htmlFor="companyDescription" className="mb-2">Company Description <span className="text-red-500">*</span></Label>
                        <Textarea id="companyDescription" name="companyDescription" value={formData.companyDescription} onChange={handleInputChange} required placeholder="What does your company do?" />
                    </div>
                    <div>
                        <Label htmlFor="roleDescription" className="mb-2">Role Description <span className="text-red-500">*</span></Label>
                        <Textarea id="roleDescription" name="roleDescription" value={formData.roleDescription} onChange={handleInputChange} required placeholder="Describe the responsibilities of the role." />
                    </div>
                    <div>
                        <Label htmlFor="qualifications" className="mb-2">Qualifications <span className="text-red-500">*</span></Label>
                        <Textarea id="qualifications" name="qualifications" value={formData.qualifications} onChange={handleInputChange} required placeholder="List required qualifications, one per line." rows={5} />
                    </div>
                  </div>
                </div>

                {/* Your Information Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                    Your Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="mb-2">Name <span className="text-red-500">*</span></Label>
                      <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="surname" className="mb-2">Surname <span className="text-red-500">*</span></Label>
                      <Input id="surname" name="surname" value={formData.surname} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="mb-2">Phone <span className="text-red-500">*</span></Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="email" className="mb-2">Email <span className="text-red-500">*</span></Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="companyName" className="mb-2">Company Name <span className="text-red-500">*</span></Label>
                      <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="occupation" className="mb-2" >Your Occupation <span className="text-red-500">*</span></Label>
                      <Input id="occupation" name="occupation" value={formData.occupation} onChange={handleInputChange} required />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button
                      type="button"
                      variant="outline"
                      onClick={handleClear}
                      className="px-6 py-2"
                  >
                    Clear
                  </Button>
                  <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-black hover:bg-gray-800 text-white px-6 py-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Form'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
  );
};

export default PostJobForm;

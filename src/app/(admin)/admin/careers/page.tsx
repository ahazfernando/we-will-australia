"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, addDoc, doc, updateDoc, deleteDoc, serverTimestamp, orderBy, Timestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Interface for the Job object, matching your Firestore structure
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
    createdAt?: Timestamp;
}

const CareersAdminPage: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentJob, setCurrentJob] = useState<Partial<Job>>({});

    // Fetch jobs in real-time
    useEffect(() => {
        const q = query(collection(db, 'careers'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const jobsData: Job[] = [];
            querySnapshot.forEach((doc) => {
                jobsData.push({ id: doc.id, ...doc.data() } as Job);
            });
            setJobs(jobsData);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleAddNew = () => {
        setIsEditing(false);
        setCurrentJob({
            title: '',
            location: '',
            type: 'Full-time',
            department: '',
            companyDescription: '',
            roleDescription: '',
            qualifications: [],
            backgroundImageUrl: ''
        });
        setIsDialogOpen(true);
    };

    const handleEdit = (job: Job) => {
        setIsEditing(true);
        setCurrentJob(job);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this job posting?")) {
            await deleteDoc(doc(db, "careers", id));
        }
    };

    const handleSave = async () => {
        if (!currentJob.title || !currentJob.department || !currentJob.location) {
            alert("Please fill in all required fields.");
            return;
        }

        // Ensure qualifications are stored as an array
        const qualificationsArray = typeof currentJob.qualifications === 'string'
            ? (currentJob.qualifications as string).split('\n').filter(q => q.trim() !== '')
            : currentJob.qualifications;

        const dataToSave = {
            ...currentJob,
            qualifications: qualificationsArray,
        };

        try {
            if (isEditing && currentJob.id) {
                const jobRef = doc(db, "careers", currentJob.id);
                await updateDoc(jobRef, { ...dataToSave, lastUpdated: serverTimestamp() });
            } else {
                await addDoc(collection(db, "careers"), { ...dataToSave, createdAt: serverTimestamp() });
            }
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Error saving job:", error);
            alert("Failed to save job posting.");
        }
    };

    return (
        <div className="max-w-11/12 mx-auto">
            <div className="flex justify-between items-center mb-6 mt-10">
                <h1 className="text-2xl font-bold">Manage Careers</h1>
                <Button onClick={handleAddNew} className="flex items-center gap-2">
                    <PlusCircle size={18} /> Add New Job
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Open Positions</CardTitle>
                    <CardDescription>Manage all job listings on your website.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Position</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow><TableCell colSpan={5} className="text-center">Loading...</TableCell></TableRow>
                            ) : jobs.map(job => (
                                <TableRow key={job.id}>
                                    <TableCell className="font-medium">{job.title}</TableCell>
                                    <TableCell>{job.department}</TableCell>
                                    <TableCell>{job.location}</TableCell>
                                    <TableCell>{job.type}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(job)}><Edit className="h-4 w-4" /></Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(job.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? 'Edit Job Posting' : 'Create New Job Posting'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
                        <Label htmlFor="title">Job Title</Label>
                        <Input id="title" value={currentJob.title || ''} onChange={e => setCurrentJob({...currentJob, title: e.target.value})} />

                        <Label htmlFor="department">Department</Label>
                        <Input id="department" value={currentJob.department || ''} onChange={e => setCurrentJob({...currentJob, department: e.target.value})} />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" value={currentJob.location || ''} onChange={e => setCurrentJob({...currentJob, location: e.target.value})} />
                            </div>
                            <div>
                                <Label htmlFor="type">Job Type</Label>
                                <Select value={currentJob.type || 'Full-time'} onValueChange={(value) => setCurrentJob({...currentJob, type: value as Job['type']})}>
                                    <SelectTrigger id="type"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Full-time">Full-time</SelectItem>
                                        <SelectItem value="Part-time">Part-time</SelectItem>
                                        <SelectItem value="Internship">Internship</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Label htmlFor="companyDescription">Company Description</Label>
                        <Textarea id="companyDescription" value={currentJob.companyDescription || ''} onChange={e => setCurrentJob({...currentJob, companyDescription: e.target.value})} />

                        <Label htmlFor="roleDescription">Role Description</Label>
                        <Textarea id="roleDescription" value={currentJob.roleDescription || ''} onChange={e => setCurrentJob({...currentJob, roleDescription: e.target.value})} />

                        <Label htmlFor="qualifications">Qualifications (one per line)</Label>
                        <Textarea id="qualifications" value={Array.isArray(currentJob.qualifications) ? currentJob.qualifications.join('\n') : ''} onChange={e => setCurrentJob({...currentJob, qualifications: e.target.value.split('\n')})} />

                        <Label htmlFor="backgroundImageUrl">Background Image URL</Label>
                        <Input id="backgroundImageUrl" value={currentJob.backgroundImageUrl || ''} onChange={e => setCurrentJob({...currentJob, backgroundImageUrl: e.target.value})} placeholder="e.g., /careers/backdrop.jpg" />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <Button onClick={handleSave}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CareersAdminPage;


"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, doc, deleteDoc, orderBy, Timestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Trash2, Eye } from 'lucide-react';

// Define the structure for an inquiry
interface Inquiry {
    id: string;
    inquirerName: string;
    inquirerEmail: string;
    inquirerPhone: string;
    service: string;
    inquiryMessage: string;
    submittedAt: Timestamp;
}

const InquiriesAdminPage: React.FC = () => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

    // Fetch and sort inquiries in real-time
    useEffect(() => {
        const q = query(collection(db, 'inquiries'), orderBy("submittedAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const inquiriesData: Inquiry[] = [];
            querySnapshot.forEach((doc) => {
                inquiriesData.push({ id: doc.id, ...doc.data() } as Inquiry);
            });
            setInquiries(inquiriesData);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleView = (inquiry: Inquiry) => {
        setSelectedInquiry(inquiry);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this inquiry? This action cannot be undone.")) {
            try {
                await deleteDoc(doc(db, "inquiries", id));
            } catch (error) {
                console.error("Error deleting inquiry: ", error);
            }
        }
    };

    // Helper function to format Firestore Timestamp
    const formatDate = (timestamp: Timestamp) => {
        if (!timestamp) return 'No date';
        return timestamp.toDate().toLocaleString('en-AU', {
            dateStyle: 'long',
            timeStyle: 'short',
        });
    };

    return (
        <div className="max-w-11/12 mx-auto">
            <div className="flex justify-between items-center mb-6 mt-10">
                <h1 className="text-2xl font-bold">Manage Inquiries</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Contact Form Submissions</CardTitle>
                    <CardDescription>View and manage all inquiries submitted through the website.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[25%]">Submitter</TableHead>
                                <TableHead className="w-[20%]">Service</TableHead>
                                <TableHead className="w-[40%]">Submitted At</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">Loading inquiries...</TableCell>
                                </TableRow>
                            ) : inquiries.length > 0 ? (
                                inquiries.map(inquiry => (
                                    <TableRow key={inquiry.id}>
                                        <TableCell>
                                            <div className="font-medium">{inquiry.inquirerName}</div>
                                            <div className="text-sm text-muted-foreground">{inquiry.inquirerEmail}</div>
                                        </TableCell>
                                        <TableCell>{inquiry.service}</TableCell>
                                        <TableCell>{formatDate(inquiry.submittedAt)}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" onClick={() => handleView(inquiry)}>
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(inquiry.id)}>
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">No inquiries found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Inquiry from {selectedInquiry?.inquirerName}</DialogTitle>
                        <DialogDescription>
                            Submitted on {selectedInquiry ? formatDate(selectedInquiry.submittedAt) : ''}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedInquiry && (
                        <div className="grid gap-4 py-4 text-sm">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <p className="font-semibold text-gray-600">Service:</p>
                                <p className="col-span-2 text-gray-800">{selectedInquiry.service}</p>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <p className="font-semibold text-gray-600">Email:</p>
                                <p className="col-span-2 text-gray-800">{selectedInquiry.inquirerEmail}</p>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <p className="font-semibold text-gray-600">Phone:</p>
                                <p className="col-span-2 text-gray-800">{selectedInquiry.inquirerPhone}</p>
                            </div>
                            <div className="grid grid-cols-1 gap-2 mt-2">
                                <p className="font-semibold text-gray-600">Message:</p>
                                <div className="p-3 bg-gray-50 rounded-md border text-gray-800 max-h-48 overflow-y-auto">
                                    <p>{selectedInquiry.inquiryMessage}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default InquiriesAdminPage;

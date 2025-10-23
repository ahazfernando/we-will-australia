"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
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
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle, Edit, Trash2, Star } from 'lucide-react';

// Define the structure for a testimonial
interface Testimonial {
    id: string;
    name: string;
    title: string;
    quote: string;
    rating: number;
    image: string;
}

const TestimonialsAdminPage: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState<Partial<Testimonial>>({});

    // Fetch testimonials in real-time
    useEffect(() => {
        const q = query(collection(db, 'testimonials'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const testimonialsData: Testimonial[] = [];
            querySnapshot.forEach((doc) => {
                testimonialsData.push({ id: doc.id, ...doc.data() } as Testimonial);
            });
            setTestimonials(testimonialsData);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleAddNew = () => {
        setIsEditing(false);
        setCurrentTestimonial({ name: '', title: '', quote: '', rating: 5, image: '' });
        setIsDialogOpen(true);
    };

    const handleEdit = (testimonial: Testimonial) => {
        setIsEditing(true);
        setCurrentTestimonial(testimonial);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this testimonial?")) {
            try {
                await deleteDoc(doc(db, "testimonials", id));
            } catch (error) {
                console.error("Error deleting testimonial: ", error);
            }
        }
    };

    const handleSave = async () => {
        if (!currentTestimonial.name || !currentTestimonial.quote) {
            alert("Please fill in at least the name and quote.");
            return;
        }

        try {
            if (isEditing && currentTestimonial.id) {
                // Update existing testimonial
                const testimonialRef = doc(db, "testimonials", currentTestimonial.id);
                await updateDoc(testimonialRef, { ...currentTestimonial, updatedAt: serverTimestamp() });
            } else {
                // Add new testimonial
                await addDoc(collection(db, "testimonials"), { ...currentTestimonial, createdAt: serverTimestamp() });
            }
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Error saving testimonial: ", error);
        }
    };

    return (
        <div className="max-w-11/12 mx-auto">
            <div className="flex justify-between items-center mb-6 mt-10">
                <h1 className="text-2xl font-bold">Manage Testimonials</h1>
                <Button onClick={handleAddNew} className="flex items-center gap-2">
                    <PlusCircle size={18} />
                    Add New Testimonial
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Testimonials</CardTitle>
                    <CardDescription>View, edit, or delete client testimonials.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[25%]">Name & Title</TableHead>
                                <TableHead className="w-[50%]">Quote</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">Loading testimonials...</TableCell>
                                </TableRow>
                            ) : testimonials.length > 0 ? (
                                testimonials.map(testimonial => (
                                    <TableRow key={testimonial.id}>
                                        <TableCell>
                                            <div className="font-medium">{testimonial.name}</div>
                                            <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600">{testimonial.quote}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                {testimonial.rating} <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(testimonial)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(testimonial.id)}>
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">No testimonials found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
                        <DialogDescription>
                            {isEditing ? 'Update the details for this testimonial.' : 'Fill in the details for the new testimonial.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" value={currentTestimonial.name || ''} onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, name: e.target.value })} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">Title</Label>
                            <Input id="title" value={currentTestimonial.title || ''} onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, title: e.target.value })} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="quote" className="text-right">Quote</Label>
                            <Textarea id="quote" value={currentTestimonial.quote || ''} onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, quote: e.target.value })} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="rating" className="text-right">Rating</Label>
                            <Input id="rating" type="number" min="1" max="5" value={currentTestimonial.rating || 5} onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, rating: parseInt(e.target.value) })} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="text-right">Image URL</Label>
                            <Input id="image" value={currentTestimonial.image || ''} onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, image: e.target.value })} className="col-span-3" placeholder="https://..." />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleSave}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TestimonialsAdminPage;

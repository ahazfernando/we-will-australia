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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Edit, Trash2, User } from 'lucide-react';

// Define the structure for a team member
interface TeamMember {
    id: string;
    memberName: string;
    memberPost: string;
    memberQuote: string;
    memberLogo: string; // URL for the image
}

const TeamAdminPage: React.FC = () => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentMember, setCurrentMember] = useState<Partial<TeamMember>>({});

    // Fetch team members in real-time
    useEffect(() => {
        const q = query(collection(db, 'team'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const membersData: TeamMember[] = [];
            querySnapshot.forEach((doc) => {
                membersData.push({ id: doc.id, ...doc.data() } as TeamMember);
            });
            setTeamMembers(membersData);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleAddNew = () => {
        setIsEditing(false);
        setCurrentMember({ memberName: '', memberPost: '', memberQuote: '', memberLogo: '' });
        setIsDialogOpen(true);
    };

    const handleEdit = (member: TeamMember) => {
        setIsEditing(true);
        setCurrentMember(member);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this team member?")) {
            try {
                await deleteDoc(doc(db, "team", id));
            } catch (error) {
                console.error("Error deleting team member: ", error);
            }
        }
    };

    const handleSave = async () => {
        if (!currentMember.memberName || !currentMember.memberPost) {
            alert("Please fill in at least the name and post.");
            return;
        }

        try {
            if (isEditing && currentMember.id) {
                // Update existing member
                const memberRef = doc(db, "team", currentMember.id);
                await updateDoc(memberRef, { ...currentMember, updatedAt: serverTimestamp() });
            } else {
                // Add new member
                await addDoc(collection(db, "team"), { ...currentMember, createdAt: serverTimestamp() });
            }
            setIsDialogOpen(false);
        } catch (error)          {
            console.error("Error saving team member: ", error);
        }
    };

    return (
        <div className="max-w-11/12 mx-auto">
            <div className="flex justify-between items-center mb-6 mt-10">
                <h1 className="text-2xl font-bold">Manage Team Members</h1>
                <Button onClick={handleAddNew} className="flex items-center gap-2">
                    <PlusCircle size={18} />
                    Add New Member
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Team Members</CardTitle>
                    <CardDescription>View, edit, or delete team member profiles.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[30%]">Member</TableHead>
                                <TableHead className="w-[55%]">Description</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">Loading team members...</TableCell>
                                </TableRow>
                            ) : teamMembers.length > 0 ? (
                                teamMembers.map(member => (
                                    <TableRow key={member.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <Avatar>
                                                    <AvatarImage src={member.memberLogo} alt={member.memberName} />
                                                    <AvatarFallback><User size={18} /></AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{member.memberName}</div>
                                                    <div className="text-sm text-muted-foreground">{member.memberPost}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600">{member.memberQuote}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(member)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(member.id)}>
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">No team members found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? 'Edit Team Member' : 'Add New Team Member'}</DialogTitle>
                        <DialogDescription>
                            {isEditing ? 'Update the details for this team member.' : 'Fill in the details for the new team member.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="memberName" className="text-right">Name</Label>
                            <Input id="memberName" value={currentMember.memberName || ''} onChange={(e) => setCurrentMember({ ...currentMember, memberName: e.target.value })} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="memberPost" className="text-right">Post</Label>
                            <Input id="memberPost" value={currentMember.memberPost || ''} onChange={(e) => setCurrentMember({ ...currentMember, memberPost: e.target.value })} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="memberQuote" className="text-right">Quote</Label>
                            <Textarea id="memberQuote" value={currentMember.memberQuote || ''} onChange={(e) => setCurrentMember({ ...currentMember, memberQuote: e.target.value })} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="memberLogo" className="text-right">Logo URL</Label>
                            <Input id="memberLogo" value={currentMember.memberLogo || ''} onChange={(e) => setCurrentMember({ ...currentMember, memberLogo: e.target.value })} className="col-span-3" placeholder="https://..." />
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

export default TeamAdminPage;

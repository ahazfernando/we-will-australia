"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  type: string;
  experienceLevel: string;
  budget: string;
  skills: string[];
  location: string;
  city?: string;
  state?: string;
  responsibilities: string[]; // Added responsibilities field
  viewCount?: number; // Anuka this is the add view count field
  postedTime?: any;
}

const ListingsPage: React.FC = () => {
  const [listings, setListings] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentListing, setCurrentListing] = useState<Partial<Job>>({});

  useEffect(() => {
    const q = query(collection(db, "listings"), orderBy("postedTime", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Job[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Job);
      });
      setListings(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentListing({
      title: "",
      company: "",
      description: "",
      type: "",
      experienceLevel: "",
      budget: "",
      skills: [],
      location: "",
      city: "",
      state: "",
      responsibilities: [], // Initialize new field
      viewCount: 0, // Initialize view count
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (listing: Job) => {
    setIsEditing(true);
    // Ensure responsibilities is an array, defaulting to empty if it's missing
    setCurrentListing({ ...listing, responsibilities: listing.responsibilities || [] });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      await deleteDoc(doc(db, "listings", id));
    }
  };

  const handleSave = async () => {
    if (!currentListing.title || !currentListing.company) {
      alert("Please fill in all required fields (Title, Company).");
      return;
    }

    const dataToSave = {
      ...currentListing,
      skills:
          typeof currentListing.skills === "string"
              ? (currentListing.skills as string).split(",").map((s) => s.trim())
              : currentListing.skills,
      // Responsibilities are already in array format from the state
      postedTime: serverTimestamp(),
    };

    if (isEditing && currentListing.id) {
      const listingRef = doc(db, "listings", currentListing.id);
      await updateDoc(listingRef, dataToSave);
    } else {
      await addDoc(collection(db, "listings"), dataToSave);
    }
    setIsDialogOpen(false);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    if (typeof timestamp.toDate === "function") {
      return timestamp.toDate().toLocaleDateString("en-AU");
    }
    return "N/A";
  };

  return (
      <div className="max-w-11/12 mx-auto pt-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Job Listings</h1>
          <Button onClick={handleAddNew} className="flex items-center gap-2">
            <PlusCircle size={18} /> Add New Listing
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Job Listings</CardTitle>
            <CardDescription>Manage all job listings on your website.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Posted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                ) : listings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        No job listings found.
                      </TableCell>
                    </TableRow>
                ) : (
                    listings.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell className="font-medium">{job.title}</TableCell>
                          <TableCell>{job.company}</TableCell>
                          <TableCell>{job.type}</TableCell>
                          <TableCell>{job.experienceLevel}</TableCell>
                          <TableCell>{formatDate(job.postedTime)}</TableCell>
                          <TableCell className="text-right">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(job)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(job.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit Job Listing" : "Create New Job Listing"}
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
              <Label htmlFor="title" className="mb-2 block">Job Title</Label>
              <Input
                  id="title"
                  value={currentListing.title || ""}
                  onChange={(e) =>
                      setCurrentListing({ ...currentListing, title: e.target.value })
                  }
                  className="mb-4"
              />

              <Label htmlFor="company" className="mb-2 block">Company</Label>
              <Input
                  id="company"
                  value={currentListing.company || ""}
                  onChange={(e) =>
                      setCurrentListing({ ...currentListing, company: e.target.value })
                  }
                  className="mb-4"
              />

              <Label htmlFor="type" className="mb-2 block">Job Type</Label>
              <Select
                  value={currentListing.type || ""}
                  onValueChange={(val) =>
                      setCurrentListing({ ...currentListing, type: val })
                  }
              >
                <SelectTrigger className="mb-4">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-Time">Full-Time</SelectItem>
                  <SelectItem value="Part-Time">Part-Time</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Volunteer">Volunteer</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>

              <Label htmlFor="experienceLevel" className="mb-2 block">Experience Level</Label>
              <Select
                  value={currentListing.experienceLevel || ""}
                  onValueChange={(val) =>
                      setCurrentListing({ ...currentListing, experienceLevel: val })
                  }
              >
                <SelectTrigger className="mb-4">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Entry">Entry</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>

              <Label htmlFor="budget" className="mb-2 block">Budget</Label>
              <Input
                  id="budget"
                  value={currentListing.budget || ""}
                  onChange={(e) =>
                      setCurrentListing({ ...currentListing, budget: e.target.value })
                  }
                  className="mb-4"
              />

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="city" className="mb-2 block">City</Label>
                  <Input
                      id="city"
                      value={currentListing.city || ""}
                      onChange={(e) =>
                          setCurrentListing({ ...currentListing, city: e.target.value })
                      }
                      placeholder="Enter city"
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="mb-2 block">State</Label>
                  <Input
                      id="state"
                      value={currentListing.state || ""}
                      onChange={(e) =>
                          setCurrentListing({ ...currentListing, state: e.target.value })
                      }
                      placeholder="Enter state"
                  />
                </div>
              </div>

              <Label htmlFor="skills" className="mb-2 block">Skills (comma-separated)</Label>
              <Input
                  id="skills"
                  value={
                    Array.isArray(currentListing.skills)
                        ? currentListing.skills.join(", ")
                        : ""
                  }
                  onChange={(e) =>
                      setCurrentListing({
                        ...currentListing,
                        skills: e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                      })
                  }
                  className="mb-4"
              />

              <Label htmlFor="description" className="mb-2 block">Description</Label>
              <Textarea
                  id="description"
                  rows={5}
                  value={currentListing.description || ""}
                  onChange={(e) =>
                      setCurrentListing({
                        ...currentListing,
                        description: e.target.value,
                      })
                  }
                  className="mb-4"
              />

              {/* New Textarea for Responsibilities */}
              <Label htmlFor="responsibilities" className="mb-2 block">Responsibilities (one per line)</Label>
              <Textarea
                  id="responsibilities"
                  rows={5}
                  value={
                    Array.isArray(currentListing.responsibilities)
                        ? currentListing.responsibilities.join("\n")
                        : ""
                  }
                  onChange={(e) =>
                      setCurrentListing({
                        ...currentListing,
                        // Split by newline, trim whitespace, and filter out empty lines
                        responsibilities: e.target.value.split("\n").map(s => s.trim()).filter(Boolean),
                      })
                  }
                  placeholder="- Manage project timelines&#x0a;- Develop new features&#x0a;- Collaborate with the design team"
                  className="mb-4"
              />

              <Label htmlFor="viewCount" className="mb-2 block">View Count</Label>
              <Input
                  id="viewCount"
                  type="number"
                  min="0"
                  value={currentListing.viewCount ?? ""}
                  onChange={(e) =>
                      setCurrentListing({
                        ...currentListing,
                        viewCount: e.target.value === "" ? undefined : parseInt(e.target.value),
                      })
                  }
                  placeholder="Enter number of views"
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSave}>
                {isEditing ? "Update Listing" : "Save Listing"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  );
};

export default ListingsPage;

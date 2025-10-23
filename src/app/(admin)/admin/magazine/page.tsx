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
import { Skeleton } from "@/components/ui/skeleton";
import ImageUpload from "@/components/ui/image-upload";
import { MagazineArticle, MagazineCategory } from '@/types/magazine';

const MagazineAdminPage: React.FC = () => {
    const [articles, setArticles] = useState<MagazineArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentArticle, setCurrentArticle] = useState<Partial<MagazineArticle>>({});
    const [tagsInput, setTagsInput] = useState<string>('');

    const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    useEffect(() => {
        const q = query(collection(db, 'magazine'), orderBy('date', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const articlesData: MagazineArticle[] = [];
            querySnapshot.forEach((doc) => {
                articlesData.push({ id: doc.id, ...doc.data() } as MagazineArticle);
            });
            setArticles(articlesData);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleAddNew = () => {
        setIsEditing(false);
        setCurrentArticle({
            title: '',
            slug: '',
            excerpt: '',
            content: '',
            imageURL: '',
            tags: [],
            category: 'ordinary',
            author: { name: '', avatarURL: '' },
            date: new Date().toISOString().split('T')[0]
        });
        setTagsInput('');
        setIsDialogOpen(true);
    };

    const handleEdit = (article: MagazineArticle) => {
        setIsEditing(true);
        setCurrentArticle({
            ...article,
            date: article.date ? (typeof article.date === 'string' ? article.date : article.date.toDate().toISOString().split('T')[0]) : new Date().toISOString().split('T')[0]
        });
        setTagsInput(Array.isArray(article.tags) ? article.tags.join(', ') : '');
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this article?")) {
            await deleteDoc(doc(db, "magazine", id));
        }
    };

    const handleSave = async () => {
        if (!currentArticle.title || !currentArticle.excerpt || !currentArticle.content) {
            alert("Please fill in all required fields, including Title, Excerpt, and Content.");
            return;
        }

        // Process tags from the input string
        const processedTags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);

        const dataToSave = {
            ...currentArticle,
            slug: currentArticle.slug || slugify(currentArticle.title || ''),
            tags: processedTags,
            category: currentArticle.category || 'ordinary',
            date: currentArticle.date ? Timestamp.fromDate(new Date(currentArticle.date as string)) : serverTimestamp(),
        };

        if (isEditing && currentArticle.id) {
            const postRef = doc(db, "magazine", currentArticle.id);
            await updateDoc(postRef, { ...dataToSave, lastUpdated: serverTimestamp() });
        } else {
            await addDoc(collection(db, "magazine"), { ...dataToSave, createdAt: serverTimestamp() });
        }
        setIsDialogOpen(false);
    };

    const formatDate = (article: MagazineArticle) => {
        const timestamp = article.lastUpdated || article.createdAt || article.date;
        if (timestamp && typeof (timestamp as Timestamp).toDate === 'function') {
            return (timestamp as Timestamp).toDate().toLocaleDateString('en-AU');
        }
        if (typeof timestamp === 'string') {
            return new Date(timestamp).toLocaleDateString('en-AU');
        }
        return 'N/A';
    };

    const getCategoryLabel = (category: MagazineCategory) => {
        switch (category) {
            case 'featured': return 'Featured';
            case 'editor-pick': return "Editor's Pick";
            case 'spotlight': return 'Spotlight';
            default: return 'Ordinary';
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-11/12 mx-auto pt-10">
                <div className="flex justify-between items-center mb-6">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-10 w-32" />
                </div>

                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-80" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Table Header Skeleton */}
                            <div className="flex space-x-4">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-20 ml-auto" />
                            </div>
                            
                            {/* Table Rows Skeleton */}
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div key={index} className="flex space-x-4 py-2">
                                    <Skeleton className="h-4 w-64" />
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-4 w-20" />
                                    <div className="flex space-x-2 ml-auto">
                                        <Skeleton className="h-8 w-8" />
                                        <Skeleton className="h-8 w-8" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-11/12 mx-auto pt-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Magazine Articles</h1>
                <Button onClick={handleAddNew} className="flex items-center gap-2">
                    <PlusCircle size={18} /> Add New Article
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Magazine Articles</CardTitle>
                    <CardDescription>Manage all articles in your magazine.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {articles.map((article) => (
                                <TableRow key={article.id}>
                                    <TableCell className="font-medium">{article.title}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded text-xs ${
                                            article.category === 'featured' ? 'bg-red-100 text-red-800' :
                                            article.category === 'editor-pick' ? 'bg-blue-100 text-blue-800' :
                                            article.category === 'spotlight' ? 'bg-green-100 text-green-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {getCategoryLabel(article.category)}
                                        </span>
                                    </TableCell>
                                    <TableCell>{article.author.name}</TableCell>
                                    <TableCell>{formatDate(article)}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleEdit(article)}
                                            >
                                                <Edit size={16} />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDelete(article.id)}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? 'Edit Magazine Article' : 'Add New Magazine Article'}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={currentArticle.title || ''}
                                onChange={e => setCurrentArticle({...currentArticle, title: e.target.value})}
                                placeholder="Enter article title"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                value={currentArticle.slug || ''}
                                onChange={e => setCurrentArticle({...currentArticle, slug: e.target.value})}
                                placeholder="article-slug"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="excerpt">Excerpt</Label>
                            <Textarea
                                id="excerpt"
                                value={currentArticle.excerpt || ''}
                                onChange={e => setCurrentArticle({...currentArticle, excerpt: e.target.value})}
                                placeholder="Enter article excerpt"
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                value={currentArticle.content || ''}
                                onChange={e => setCurrentArticle({...currentArticle, content: e.target.value})}
                                placeholder="Enter article content (Markdown supported)"
                                rows={10}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    value={currentArticle.category || 'ordinary'}
                                    onValueChange={(value: MagazineCategory) => setCurrentArticle({...currentArticle, category: value})}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ordinary">Ordinary</SelectItem>
                                        <SelectItem value="featured">Featured</SelectItem>
                                        <SelectItem value="editor-pick">Editor's Pick</SelectItem>
                                        <SelectItem value="spotlight">Spotlight</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={currentArticle.date as string || ''}
                                    onChange={e => setCurrentArticle({...currentArticle, date: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags (comma-separated)</Label>
                            <Input
                                id="tags"
                                value={tagsInput}
                                onChange={e => setTagsInput(e.target.value)}
                                placeholder="tag1, tag2, tag3"
                            />
                        </div>

                        <ImageUpload
                            label="Article Image"
                            value={currentArticle.imageURL || ''}
                            onChange={(url) => setCurrentArticle({...currentArticle, imageURL: url})}
                            placeholder="Upload article image or enter URL"
                        />

                        <div className="space-y-2">
                            <Label htmlFor="authorName">Author Name</Label>
                            <Input
                                id="authorName"
                                value={currentArticle.author?.name || ''}
                                onChange={e => setCurrentArticle({ ...currentArticle, author: { name: e.target.value, avatarURL: currentArticle.author?.avatarURL || '' } })}
                                placeholder="Enter author name"
                            />
                        </div>

                        <ImageUpload
                            label="Author Avatar"
                            value={currentArticle.author?.avatarURL || ''}
                            onChange={(url) => setCurrentArticle({ ...currentArticle, author: { name: currentArticle.author?.name || '', avatarURL: url } })}
                            placeholder="Upload author avatar or enter URL"
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <Button onClick={handleSave}>Save Article</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MagazineAdminPage;

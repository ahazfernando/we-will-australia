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
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content?: string;
    imageURL: string;
    tags: string[];
    author: {
        name: string;
        avatarURL: string;
    };
    date?: string | Timestamp;
    createdAt?: Timestamp;
    lastUpdated?: Timestamp;
}

const BlogAdminPage: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentArticle, setCurrentArticle] = useState<Partial<Article>>({});

    const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    useEffect(() => {
        const q = query(collection(db, 'blogs'), orderBy('date', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const articlesData: Article[] = [];
            querySnapshot.forEach((doc) => {
                articlesData.push({ id: doc.id, ...doc.data() } as Article);
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
            author: { name: '', avatarURL: '' },
            date: new Date().toISOString().split('T')[0]
        });
        setIsDialogOpen(true);
    };

    const handleEdit = (article: Article) => {
        setIsEditing(true);
        let displayDate = '';
        if (article.date) {
            if (typeof article.date === 'string') {
                const d = new Date(article.date);
                if (!isNaN(d.getTime())) {
                    displayDate = d.toISOString().split('T')[0];
                }
            } else if (typeof (article.date as Timestamp).toDate === 'function') {
                displayDate = (article.date as Timestamp).toDate().toISOString().split('T')[0];
            }
        }

        // FIX: Do not convert `tags` to a string here. Keep it as a string array.
        // The conversion will be handled directly in the JSX for the input field.
        const articleForEdit = {
            ...article,
            date: displayDate,
        };
        setCurrentArticle(articleForEdit);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this blog post?")) {
            await deleteDoc(doc(db, "blogs", id));
        }
    };

    const handleSave = async () => {
        if (!currentArticle.title || !currentArticle.excerpt || !currentArticle.content) {
            alert("Please fill in all required fields, including Title, Excerpt, and Content.");
            return;
        }

        // FIX: The `tags` property in `currentArticle` is now correctly typed as `string[]`.
        // The complex conversion logic is no longer needed.
        const dataToSave = {
            ...currentArticle,
            slug: currentArticle.slug || slugify(currentArticle.title || ''),
            tags: currentArticle.tags || [], // Ensure it's an array
            date: currentArticle.date ? Timestamp.fromDate(new Date(currentArticle.date as string)) : serverTimestamp(),
        };

        if (isEditing && currentArticle.id) {
            const postRef = doc(db, "blogs", currentArticle.id);
            await updateDoc(postRef, { ...dataToSave, lastUpdated: serverTimestamp() });
        } else {
            await addDoc(collection(db, "blogs"), { ...dataToSave, createdAt: serverTimestamp() });
        }
        setIsDialogOpen(false);
    };

    const formatDate = (article: Article) => {
        const timestamp = article.lastUpdated || article.createdAt || article.date;
        if (timestamp && typeof (timestamp as Timestamp).toDate === 'function') {
            return (timestamp as Timestamp).toDate().toLocaleDateString('en-AU');
        }
        if (typeof timestamp === 'string') {
            return new Date(timestamp).toLocaleDateString('en-AU');
        }
        return 'N/A';
    };

    return (
        <div className="max-w-11/12 mx-auto pt-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Blog Posts</h1>
                <Button onClick={handleAddNew} className="flex items-center gap-2">
                    <PlusCircle size={18} /> Add New Post
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Blog Posts</CardTitle>
                    <CardDescription>Manage all articles on your website.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow><TableCell colSpan={4} className="text-center">Loading...</TableCell></TableRow>
                            ) : articles.map(article => (
                                <TableRow key={article.id}>
                                    <TableCell className="font-medium">{article.title}</TableCell>
                                    <TableCell>{article.author.name}</TableCell>
                                    <TableCell>{formatDate(article)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(article)}><Edit className="h-4 w-4" /></Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(article.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
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
                        <DialogTitle>{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={currentArticle.title || ''} onChange={e => setCurrentArticle({...currentArticle, title: e.target.value, slug: slugify(e.target.value)})} />

                        <Label htmlFor="slug">URL Slug</Label>
                        <Input id="slug" value={currentArticle.slug || ''} onChange={e => setCurrentArticle({...currentArticle, slug: e.target.value})} />

                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea id="excerpt" value={currentArticle.excerpt || ''} onChange={e => setCurrentArticle({...currentArticle, excerpt: e.target.value})} />

                        <Label htmlFor="content">Content</Label>
                        <Textarea id="content" value={currentArticle.content || ''} onChange={e => setCurrentArticle({...currentArticle, content: e.target.value})} rows={10} />

                        <Label htmlFor="tags">Tags (comma-separated)</Label>
                        {/* FIX: Convert the `tags` array to a string for display, and convert the input string back to an array on change. */}
                        <Input
                            id="tags"
                            value={Array.isArray(currentArticle.tags) ? currentArticle.tags.join(', ') : ''}
                            onChange={e => setCurrentArticle({ ...currentArticle, tags: e.target.value.split(',').map((t: string) => t.trim()) })}
                        />

                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input id="imageUrl" value={currentArticle.imageURL || ''} onChange={e => setCurrentArticle({...currentArticle, imageURL: e.target.value})} />

                        <Label htmlFor="authorName">Author Name</Label>
                        {/* FIX: Ensure the entire `author` object is preserved and correctly typed on change. */}
                        <Input
                            id="authorName"
                            value={currentArticle.author?.name || ''}
                            onChange={e => setCurrentArticle({ ...currentArticle, author: { name: e.target.value, avatarURL: currentArticle.author?.avatarURL || '' } })}
                        />

                        <Label htmlFor="authorAvatar">Author Avatar URL</Label>
                        {/* FIX: Ensure the entire `author` object is preserved and correctly typed on change. */}
                        <Input
                            id="authorAvatar"
                            value={currentArticle.author?.avatarURL || ''}
                            onChange={e => setCurrentArticle({ ...currentArticle, author: { name: currentArticle.author?.name || '', avatarURL: e.target.value } })}
                        />

                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" value={currentArticle.date as string || ''} onChange={e => setCurrentArticle({...currentArticle, date: e.target.value})} />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <Button onClick={handleSave}>Save Post</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default BlogAdminPage;
"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase'; // Ensure this path is correct
import { collection, query, onSnapshot, addDoc, serverTimestamp, orderBy, Timestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { List, Mail, Send, Image as ImageIcon } from 'lucide-react';

// Define structures for subscribers and posts
interface Subscriber {
    id: string;
    email: string;
    subscribedAt: Timestamp;
}

interface NewsletterPost {
    id: string;
    title: string;
    subject: string;
    image: string;
    createdAt: Timestamp;
}

const NewsletterAdminPage: React.FC = () => {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [posts, setPosts] = useState<NewsletterPost[]>([]);
    const [isLoading, setIsLoading] = useState({ subs: true, posts: true });

    const [newPost, setNewPost] = useState({ title: '', subject: '', image: '' });

    // Fetch subscribers in real-time
    useEffect(() => {
        const q = query(collection(db, 'newsletter'), orderBy("subscribedAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const subsData: Subscriber[] = [];
            querySnapshot.forEach((doc) => {
                subsData.push({ id: doc.id, ...doc.data() } as Subscriber);
            });
            setSubscribers(subsData);
            setIsLoading(prev => ({ ...prev, subs: false }));
        });
        return () => unsubscribe();
    }, []);

    // Fetch newsletter posts in real-time
    useEffect(() => {
        const q = query(collection(db, 'newsletter_posts'), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const postsData: NewsletterPost[] = [];
            querySnapshot.forEach((doc) => {
                postsData.push({ id: doc.id, ...doc.data() } as NewsletterPost);
            });
            setPosts(postsData);
            setIsLoading(prev => ({ ...prev, posts: false }));
        });
        return () => unsubscribe();
    }, []);

    const handlePostSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPost.title || !newPost.subject) {
            alert("Please fill in at least the title and subject.");
            return;
        }

        try {
            await addDoc(collection(db, "newsletter_posts"), {
                ...newPost,
                createdAt: serverTimestamp()
            });
            setNewPost({ title: '', subject: '', image: '' }); // Reset form
        } catch (error) {
            console.error("Error saving newsletter post: ", error);
        }
    };

    const formatDate = (timestamp: Timestamp) => {
        if (!timestamp) return 'N/A';
        return timestamp.toDate().toLocaleDateString('en-AU');
    };

    return (
        <div className="max-w-11/12 mx-auto">
            <div className="flex justify-between items-center mb-6 mt-10">
                <h1 className="text-2xl font-bold">Manage Newsletter</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Column: Subscribers List */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Mail size={20} />Subscribers</CardTitle>
                        <CardDescription>A list of all users subscribed to the newsletter.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading.subs ? (
                            <p>Loading subscribers...</p>
                        ) : subscribers.length > 0 ? (
                            <div className="space-y-2 max-h-[600px] overflow-y-auto">
                                {subscribers.map(sub => (
                                    <div key={sub.id} className="text-sm p-2 bg-gray-50 rounded-md">
                                        {sub.email}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No subscribers yet.</p>
                        )}
                    </CardContent>
                </Card>

                {/* Right Column: Posts and Form */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Top Right: Previous Posts */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><List size={20} />Newsletter Posts</CardTitle>
                            <CardDescription>A history of all sent newsletters.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading.posts ? (
                                <p>Loading posts...</p>
                            ) : posts.length > 0 ? (
                                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                                    {posts.map(post => (
                                        <div key={post.id} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                                            <img src={post.image || 'https://placehold.co/100x60/f0f0f0/cccccc?text=Image'} alt={post.title} className="w-24 h-16 object-cover rounded-md"/>
                                            <div>
                                                <h4 className="font-semibold">{post.title}</h4>
                                                <p className="text-sm text-gray-600">{post.subject}</p>
                                                <p className="text-xs text-gray-400 mt-1">Sent: {formatDate(post.createdAt)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No newsletter posts have been created yet.</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Bottom Right: New Post Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Send size={20} />Create New Newsletter Post</CardTitle>
                            <CardDescription>Compose and save a new newsletter to be sent out.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handlePostSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" placeholder="e.g., Q3 Company Updates" value={newPost.title} onChange={(e) => setNewPost({...newPost, title: e.target.value})} />
                                </div>
                                <div>
                                    <Label htmlFor="subject">Subject Line</Label>
                                    <Textarea id="subject" placeholder="The subject line for the email" value={newPost.subject} onChange={(e) => setNewPost({...newPost, subject: e.target.value})} />
                                </div>
                                <div>
                                    <Label htmlFor="image">Image URL</Label>
                                    <Input id="image" placeholder="https://..." value={newPost.image} onChange={(e) => setNewPost({...newPost, image: e.target.value})} />
                                </div>
                                <Button type="submit" className="w-full flex items-center gap-2">
                                    Save Post
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default NewsletterAdminPage;

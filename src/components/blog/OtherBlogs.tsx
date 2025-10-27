"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Timestamp } from 'firebase/firestore';
import Image from "next/image";
import { Article } from '@/types/article';


interface OtherBlogsProps {
    articles: Article[];
}

// Safely formats date from Firestore Timestamp or string
const formatCardDate = (article: Article): string | null => {
    // Prefer lastUpdated date if available
    if (article.lastUpdated) {
        const dateValue = article.lastUpdated;
        if (dateValue && typeof (dateValue as Timestamp).toDate === 'function') {
            return `Updated on ${(dateValue as Timestamp).toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;
        }
    }
    // Fallback to createdAt or date
    const dateValue = article.createdAt || article.date;
    if (dateValue && typeof (dateValue as Timestamp).toDate === 'function') {
        return `Published on ${(dateValue as Timestamp).toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;
    }
    if (typeof dateValue === 'string') {
        const d = new Date(dateValue);
        if (!isNaN(d.getTime())) {
            return `Published on ${d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;
        }
    }
    return null;
};

const getTagBgColor = (tag: string): string => {
    switch (tag.toLowerCase()) {
        case 'it solutions':
            return '#EFFBF3';
        case 'recruitment':
            return '#D6EBFF';
        case 'marketing':
            return '#F3E8FF';
        case 'consulting':
            return '#E8F5E8';
        default:
            return '#F1F5F9';
    }
};

const OtherBlogs: React.FC<OtherBlogsProps> = ({ articles }) => {
    return (
        <section className="pb-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map(article => (
                        <Card key={article.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col border-gray-200/80">
                            <div className="aspect-w-16 aspect-h-9">
                                <Link href={`/blog/${encodeURIComponent(article.slug)}`} className="block">
                                    <Image
                                        src={`/blogs/${article.imageURL}`}
                                        alt={article.title}
                                        width={1200}
                                        height={630}
                                        className="w-full h-auto object-cover"
                                    />
                                </Link>
                            </div>
                            <CardContent className="p-6 py-2 flex-grow flex flex-col">
                                <div className="flex items-center gap-2 mb-3 flex-wrap">
                                    {article.isPopular && (
                                        <Badge
                                            className="text-black border-none flex items-center gap-1"
                                            style={{ backgroundColor: '#F1F5F9' }}
                                        >
                                            <Star className="w-3 h-3 fill-current" />
                                            Most Popular
                                        </Badge>
                                    )}
                                    {article.tags.map(tag => (
                                        <Badge
                                            key={tag}
                                            variant="outline"
                                            style={{ backgroundColor: getTagBgColor(tag) }}
                                            className="border-none"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{article.title}</h3>
                                <p className="text-gray-600 mb-6 flex-grow">{article.excerpt}</p>

                                <div className="flex items-center mb-4">
                                    <Avatar className="h-10 w-10 mr-3">
                                        <AvatarImage src={article.author.avatarURL} alt={article.author.name} />
                                        <AvatarFallback>{article.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-gray-800">{article.author.name}</p>
                                        <p className="text-sm text-gray-500">{formatCardDate(article)}</p>
                                    </div>
                                </div>

                                <Link
                                    href={`/blog/${encodeURIComponent(article.slug)}`}
                                    className="text-white rounded-lg hover:opacity-90 transition-opacity px-4 py-2 h-8 text-sm flex items-center justify-center"
                                    style={{
                                        backgroundColor: '#001114'
                                    }}
                                >
                                    Read More
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OtherBlogs;

"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import Image from "next/image";
import { Article } from '@/types/article';


interface MostRecentBlogProps {
    article: Article;
}

// Safely formats date from Firestore Timestamp or string
const formatDate = (article: Article): string => {
    const dateValue = article.lastUpdated || article.createdAt || article.date;
    if (dateValue && typeof (dateValue as Timestamp).toDate === 'function') {
        return (dateValue as Timestamp).toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
    if (typeof dateValue === 'string') {
        const d = new Date(dateValue);
        if (!isNaN(d.getTime())) {
            return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        }
    }
    return 'Date not available';
};

// Determines background color for tags
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

const MostRecentBlog: React.FC<MostRecentBlogProps> = ({ article }) => {
    if (!article) {
        return null; // Don't render if no article is provided
    }

    const formattedDate = formatDate(article);

    return (
        <section className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <a href={`/blog/${article.slug}`} className="block group">
                    {/* Mobile Layout */}
                    <Card className="block md:hidden bg-white p-6 rounded-2xl shadow-sm border-gray-200/80 hover:shadow-lg transition-shadow duration-300">
                        <div className="rounded-xl overflow-hidden mb-6">
                            <Image
                                src={`/blogs/${article.imageURL}`}
                                alt={article.title}
                                width={1200}
                                height={630}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        <div>
                            <div className="flex items-center gap-x-4 gap-y-2 mb-4 flex-wrap">
                                {article.tags.map(tag => (
                                    <Badge
                                        key={tag}
                                        variant="outline"
                                        className="text-sm border-none"
                                        style={{ backgroundColor: getTagBgColor(tag) }}>
                                        {tag}
                                    </Badge>
                                ))}
                                <span className="text-sm text-gray-500">{formattedDate}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                {article.title}
                            </h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {article.excerpt}
                            </p>
                            <div className="inline-flex items-center font-semibold text-blue-600 group-hover:text-blue-800 transition-colors">
                                Read Article <ArrowRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
                        </div>
                    </Card>

                    {/* Desktop Layout */}
                    <Card className="hidden md:block relative bg-white rounded-2xl shadow-lg border-gray-200/80 hover:shadow-xl transition-shadow duration-300 overflow-hidden aspect-[16/9]">
                        <div className="absolute inset-0">
                            <Image
                                src={`/blogs/${article.imageURL}`}
                                alt={article.title}
                                width={1200}
                                height={630}
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                        </div>
                        <div className="relative h-full flex flex-col justify-end p-8 lg:p-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                    {article.tags.map(tag => (
                                        <Badge
                                            key={tag}
                                            variant="outline"
                                            className="text-sm border-none backdrop-blur-sm"
                                            style={{ backgroundColor: getTagBgColor(tag) }}>
                                            {tag}
                                        </Badge>
                                    ))}
                                    <span className="text-sm text-gray-200 bg-black/30 px-2 py-1 rounded backdrop-blur-sm">
                                        {formattedDate}
                                    </span>
                                </div>

                                <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
                                    {article.title}
                                </h2>

                                <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-3xl hidden lg:block">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center justify-between pt-4">
                                    <div className="flex items-center">
                                        <Avatar className="h-12 w-12 mr-4 ring-2 ring-white/30">
                                            <AvatarImage src={article.author.avatarURL} alt={article.author.name} />
                                            <AvatarFallback className="bg-gray-700 text-white">
                                                {article.author.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-white text-base">{article.author.name}</p>
                                            <p className="text-gray-300 text-sm">Author</p>
                                        </div>
                                    </div>

                                    <div className="inline-flex items-center font-semibold text-white bg-white/10 hover:bg-white/20 transition-all px-5 py-3 rounded-lg backdrop-blur-sm group-hover:scale-105 transform duration-300">
                                        Read Article <ArrowRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </a>
            </div>
        </section>
    );
};

export default MostRecentBlog;

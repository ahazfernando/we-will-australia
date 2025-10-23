"use client";

import React, { useState, useEffect, useMemo } from 'react';
import MostRecentBlog from '../../components/blog/MostRecentBlog';
import OtherBlogs from '../../components/blog/OtherBlogs';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Article } from '@/types/article';

const categoryToTags: Record<string, string[]> = {
    'Recruitment': ['recruitment'],
    'Digital Marketing': ['marketing', 'digital marketing'],
    'IT Solutions': ['it solutions', 'technology', 'it'],
    'Business Solutions': ['consulting', 'business', 'strategy', 'business solutions'],
};

const BlogPageClient: React.FC<{ allArticles: Article[] }> = ({ allArticles }) => {
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [category, setCategory] = useState<string>('all');
    const [page, setPage] = useState<number>(1);
    const pageSize = 6;

    const filteredArticles = useMemo(() => {
        const normalizeTag = (tag: string) => tag.trim().toLowerCase();

        let items = category === 'all'
            ? allArticles
            : allArticles.filter(article => {
                const allowedTags = new Set(categoryToTags[category]?.map(normalizeTag) || []);
                return article.tags.some(tag => allowedTags.has(normalizeTag(tag)));
            });

        const parseDate = (article: Article): Date => {
            const dateValue = article.lastUpdated ?? article.createdAt ?? article.date;
            if (dateValue && typeof (dateValue as any).toDate === 'function') {
                return (dateValue as any).toDate();
            }
            if (typeof dateValue === 'string') {
                const d = new Date(dateValue);
                if (!isNaN(d.getTime())) return d;
            }
            return new Date(0);
        };

        items.sort((a, b) => {
            const dateA = parseDate(a).getTime();
            const dateB = parseDate(b).getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

        return items;
    }, [allArticles, sortOrder, category]);

    useEffect(() => {
        setPage(1);
    }, [sortOrder, category]);

    const mostRecent = filteredArticles[0];
    const otherArticles = filteredArticles.slice(1);
    const totalPages = Math.max(1, Math.ceil(otherArticles.length / pageSize));
    const pagedArticles = otherArticles.slice((page - 1) * pageSize, page * pageSize);

    if (!mostRecent) {
        return <div className="text-center py-20">No articles found.</div>;
    }

    return (
        <main>
            <section className="relative pt-32 md:pt-36 pb-2 md:pb-4 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        <Badge variant="outline" className="py-1 px-4 pr-4 flex items-center gap-2 mb-3 bg-gray-100/80 backdrop-blur-sm shadow-sm rounded-[24px]">
                            <span>Our Blog</span>
                            <div className="w-10 h-6 rounded-[20px] bg-[#001114] flex items-center justify-center">
                                <ArrowRight className="h-3 w-3 text-white" />
                            </div>
                        </Badge>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-gray-800 mb-2 gradient-text leading-tight px-2">
                            Professional Insights &<br />Expertise for Business Growth
                        </h1>
                        <p className="text-md text-black max-w-4xl mx-auto mb-2">
                            Discover valuable insights, strategies, and expert advice to help your business thrive in today's competitive landscape
                        </p>
                    </div>
                </div>
            </section>

            <MostRecentBlog article={mostRecent} />

            <section className="bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <div className="hidden md:flex items-center justify-between">
                        <div className="text-sm font-semibold text-gray-800">Filter By</div>
                        <div className="flex items-center gap-3">
                            <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as 'newest' | 'oldest')}>
                                <SelectTrigger className="min-w-44">{`Sort by: ${sortOrder === 'newest' ? 'Newest' : 'Oldest'}`}</SelectTrigger>
                                <SelectContent><SelectItem value="newest">Newest</SelectItem><SelectItem value="oldest">Oldest</SelectItem></SelectContent>
                            </Select>
                            <Select value={category} onValueChange={(v) => setCategory(v as string)}>
                                <SelectTrigger className="min-w-60">{`Category: ${category === 'all' ? 'All' : category}`}</SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="Recruitment">Recruitment</SelectItem>
                                    <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                                    <SelectItem value="IT Solutions">IT Solutions</SelectItem>
                                    <SelectItem value="Business Solutions">Business Solutions</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {/* Add Mobile/Tablet filter UI here if needed */}
                </div>
            </section>

            <OtherBlogs articles={pagedArticles} />

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 py-12 bg-white">
                    <Button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</Button>
                    <span className="text-sm font-medium">Page {page} of {totalPages}</span>
                    <Button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</Button>
                </div>
            )}
        </main>
    );
};

export default BlogPageClient;
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { MagazineArticle, MagazineCategory } from '@/types/magazine';

const MagazinePageClient: React.FC<{ allArticles: MagazineArticle[] }> = ({ allArticles }) => {
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [category, setCategory] = useState<string>('all');
    const [page, setPage] = useState<number>(1);
    const pageSize = 6;

    // Helper function to validate and get image URL
    const getValidImageUrl = (imageURL: string): string => {
        if (!imageURL || imageURL.trim() === '') {
            return '/blogs/blog1.png'; // Fallback image
        }
        
        try {
            new URL(imageURL);
            return imageURL;
        } catch {
            // If it's not a valid URL, treat it as a relative path
            if (imageURL.startsWith('/')) {
                return imageURL;
            }
            return '/blogs/blog1.png'; // Fallback image
        }
    };

    const filteredArticles = useMemo(() => {
        let items = category === 'all'
            ? allArticles
            : allArticles.filter(article => article.category === category);

        const parseDate = (article: MagazineArticle): Date => {
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

    const featuredArticles = allArticles.filter(article => article.category === 'featured').slice(0, 1);
    const editorPicks = allArticles.filter(article => article.category === 'editor-pick').slice(0, 4);
    const spotlightArticles = allArticles.filter(article => article.category === 'spotlight').slice(0, 3);
    const heroArticles = allArticles.slice(0, 5);

    const formatDate = (article: MagazineArticle) => {
        const dateValue = article.lastUpdated ?? article.createdAt ?? article.date;
        if (dateValue && typeof (dateValue as any).toDate === 'function') {
            return (dateValue as any).toDate().toLocaleDateString('en-AU');
        }
        if (typeof dateValue === 'string') {
            return new Date(dateValue).toLocaleDateString('en-AU');
        }
        return 'N/A';
    };

    const getCategoryLabel = (category: MagazineCategory) => {
        switch (category) {
            case 'featured': return 'Featured';
            case 'editor-pick': return "Editor's Pick";
            case 'spotlight': return 'Spotlight';
            default: return 'Article';
        }
    };

    const getCategoryColor = (category: MagazineCategory) => {
        switch (category) {
            case 'featured': return 'bg-red-500';
            case 'editor-pick': return 'bg-blue-500';
            case 'spotlight': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <main>
            <section className="relative pt-32 md:pt-36 pb-2 md:pb-4 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        <Badge variant="outline" className="py-1 px-4 pr-1 flex items-center gap-2 mb-3 bg-gray-100/80 backdrop-blur-sm shadow-sm rounded-[24px]">
                            <span>WWA Community</span>
                            <div className="w-10 h-6 rounded-[20px] bg-[#001114] flex items-center justify-center">
                                <ArrowRight className="h-3 w-3 text-white" />
                            </div>
                        </Badge>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-gray-800 mb-2 gradient-text leading-tight px-2">
                            Community Stories &<br />Professional Insights
                        </h1>
                        <p className="text-md text-black max-w-4xl mx-auto mb-2">
                            Discover inspiring stories, professional insights, and community highlights from our vibrant network
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredArticles.length > 0 ? (
                            <div className="md:col-span-2 lg:col-span-2">
                                <Link href={`/magazine/${encodeURIComponent(featuredArticles[0].slug)}`}>
                                    <div className="relative group cursor-pointer">
                                        <div className="relative h-96 rounded-lg overflow-hidden">
                                            <Image
                                                src={getValidImageUrl(featuredArticles[0].imageURL)}
                                                alt={featuredArticles[0].title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <Badge className={`${getCategoryColor(featuredArticles[0].category)} text-white`}>
                                                    {getCategoryLabel(featuredArticles[0].category)}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <div className="flex items-center text-sm text-gray-600 mb-2">
                                                <User className="w-4 h-4 mr-1" />
                                                <span className="mr-4">Written by: {featuredArticles[0].author.name}</span>
                                                <Calendar className="w-4 h-4 mr-1" />
                                                <span>{formatDate(featuredArticles[0])}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                {featuredArticles[0].title}
                                            </h3>
                                            <p className="text-gray-600 mt-2">{featuredArticles[0].excerpt}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ) : heroArticles.length > 0 && (
                            <div className="md:col-span-2 lg:col-span-2">
                                <Link href={`/magazine/${encodeURIComponent(heroArticles[0].slug)}`}>
                                    <div className="relative group cursor-pointer">
                                        <div className="relative h-96 rounded-lg overflow-hidden">
                                            <Image
                                                src={getValidImageUrl(heroArticles[0].imageURL)}
                                                alt={heroArticles[0].title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <div className="flex items-center text-sm text-gray-600 mb-2">
                                                <User className="w-4 h-4 mr-1" />
                                                <span className="mr-4">Written by: {heroArticles[0].author.name}</span>
                                                <Calendar className="w-4 h-4 mr-1" />
                                                <span>{formatDate(heroArticles[0])}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                {heroArticles[0].title}
                                            </h3>
                                            <p className="text-gray-600 mt-2">{heroArticles[0].excerpt}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}

                        <div className="space-y-6">
                            {heroArticles.slice(1, 5).map((article, index) => (
                                <Link key={article.id} href={`/magazine/${encodeURIComponent(article.slug)}`}>
                                    <div className="relative group cursor-pointer">
                                        <div className="relative h-48 rounded-lg overflow-hidden">
                                            <Image
                                                src={getValidImageUrl(article.imageURL)}
                                                alt={article.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            {article.category !== 'ordinary' && (
                                                <div className="absolute top-2 left-2">
                                                    <Badge className={`${getCategoryColor(article.category)} text-white text-xs`}>
                                                        {getCategoryLabel(article.category)}
                                                    </Badge>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-3">
                                            <div className="flex items-center text-xs text-gray-600 mb-1">
                                                <User className="w-3 h-3 mr-1" />
                                                <span className="mr-3">Written by: {article.author.name}</span>
                                                <Calendar className="w-3 h-3 mr-1" />
                                                <span>{formatDate(article)}</span>
                                            </div>
                                            <h4 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                {article.title}
                                            </h4>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {editorPicks.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-sm font-semibold text-gray-600 mb-2">EXPLORE SOME OF OUR FAVORITE ARTICLES</h2>
                            <h3 className="text-3xl font-bold text-gray-800">Editor's Picks</h3>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <Link href={`/magazine/${encodeURIComponent(editorPicks[0].slug)}`}>
                                    <div className="relative group cursor-pointer">
                                        <div className="relative h-80 rounded-lg overflow-hidden">
                                            <Image
                                                src={editorPicks[0].imageURL}
                                                alt={editorPicks[0].title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <Badge className="bg-blue-500 text-white">Editor's Pick</Badge>
                                            </div>
                                        </div>
                                        <div className="mt-6">
                                            <div className="flex items-center text-sm text-gray-600 mb-3">
                                                <User className="w-4 h-4 mr-1" />
                                                <span className="mr-4">Written by: {editorPicks[0].author.name}</span>
                                                <Calendar className="w-4 h-4 mr-1" />
                                                <span>{formatDate(editorPicks[0])}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-3">
                                                {editorPicks[0].title}
                                            </h3>
                                            <p className="text-gray-600 mb-4">{editorPicks[0].excerpt}</p>
                                            <Button variant="outline" className="group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                READ MORE →
                                            </Button>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="space-y-6">
                                {editorPicks.slice(1, 4).map((article) => (
                                    <Link key={article.id} href={`/magazine/${encodeURIComponent(article.slug)}`}>
                                        <div className="flex gap-4 group cursor-pointer">
                                            <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={getValidImageUrl(article.imageURL)}
                                                    alt={article.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center text-xs text-gray-600 mb-1">
                                                    <User className="w-3 h-3 mr-1" />
                                                    <span className="mr-3">DONALD RAFAEL</span>
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    <span>{formatDate(article)}</span>
                                                </div>
                                                <h4 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                                                    {article.title}
                                                </h4>
                                                <p className="text-xs text-gray-600 line-clamp-2">{article.excerpt}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {spotlightArticles.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-gray-800">SPOTLIGHT</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {spotlightArticles.map((article) => (
                                <Link key={article.id} href={`/magazine/${encodeURIComponent(article.slug)}`}>
                                    <div className="relative group cursor-pointer">
                                        <div className="relative h-48 rounded-lg overflow-hidden">
                                            <Image
                                                src={getValidImageUrl(article.imageURL)}
                                                alt={article.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute top-2 left-2">
                                                <Badge className="bg-green-500 text-white text-xs">Spotlight</Badge>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <div className="flex items-center text-xs text-gray-600 mb-2">
                                                <User className="w-3 h-3 mr-1" />
                                                <span className="mr-3">Written by: {article.author.name}</span>
                                                <Calendar className="w-3 h-3 mr-1" />
                                                <span>{formatDate(article)}</span>
                                            </div>
                                            <h4 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                {article.title}
                                            </h4>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* All Articles Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-800">All Articles</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredArticles.map((article) => (
                            <Link key={article.id} href={`/magazine/${encodeURIComponent(article.slug)}`}>
                                <div className="relative group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="relative h-48">
                                        <Image
                                            src={getValidImageUrl(article.imageURL)}
                                            alt={article.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {article.category !== 'ordinary' && (
                                            <div className="absolute top-3 left-3">
                                                <Badge className={`${getCategoryColor(article.category)} text-white text-xs`}>
                                                    {getCategoryLabel(article.category)}
                                                </Badge>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center text-xs text-gray-600 mb-3">
                                            <User className="w-3 h-3 mr-1" />
                                            <span className="mr-3">Written by: {article.author.name}</span>
                                            <Calendar className="w-3 h-3 mr-1" />
                                            <span>{formatDate(article)}</span>
                                        </div>
                                        <h4 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                                            {article.title}
                                        </h4>
                                        <p className="text-sm text-gray-600 line-clamp-3">{article.excerpt}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default MagazinePageClient;

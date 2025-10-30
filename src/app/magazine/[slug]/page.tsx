import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from "next/image";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {collection, query, where, getDocs, Timestamp} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { MagazineArticle } from '@/types/magazine';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export const revalidate = 0;
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

async function getMagazineArticle(slug: string): Promise<MagazineArticle | null> {
    const articlesRef = collection(db, 'magazine');
    const q = query(articlesRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    const article: MagazineArticle = {
        id: doc.id,
        title: data.title || '',
        excerpt: data.excerpt || '',
        content: data.content || '',
        slug: data.slug || '',
        imageURL: data.imageURL || '',
        tags: data.tags || [],
        category: data.category || 'ordinary',
        author: data.author || { name: 'Unknown', avatarURL: '' },
        date: data.date?.toDate?.().toISOString() || new Date().toISOString(),
        createdAt: data.createdAt?.toDate?.().toISOString() || new Date().toISOString(),
        lastUpdated: data.lastUpdated?.toDate?.().toISOString() || new Date().toISOString(),
    };

    return article;
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { params } = props;
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const article = await getMagazineArticle(decodedSlug);

    if (!article) {
        return {
            title: 'Article Not Found | WWA Community Magazine',
            description: 'The requested article could not be found.',
        };
    }

    return {
        title: `${article.title} | WWA Community Magazine`,
        description: article.excerpt,
        keywords: article.tags,
        alternates: {
            canonical: `https://www.wewillaustralia.com.au/magazine/${decodedSlug}`,
        },
        openGraph: {
            title: `${article.title} | WWA Community Magazine`,
            description: article.excerpt,
            url: `https://www.wewillaustralia.com.au/magazine/${decodedSlug}`,
            images: [{ url: article.imageURL, width: 1200, height: 630, alt: article.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${article.title} | WWA Community Magazine`,
            description: article.excerpt,
            images: [article.imageURL],
        },
    };
}

const MagazineArticlePage = async (props: { params: Promise<{ slug: string }> }) => {
    const { params } = props;
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const article = await getMagazineArticle(decodedSlug);

    if (!article) {
        notFound();
    }

    const getValidImageUrl = (imageURL: string): string => {

        if (!imageURL || imageURL.trim() === '') {
            return '/blogs/blog1.png';
        }

        try {
            new URL(imageURL);
            return imageURL;
        } catch {
            if (imageURL.startsWith('/')) {
                return imageURL;
            }
            return '/blogs/blog1.png';
        }
    };

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

    const getCategoryLabel = (category: string) => {
        switch (category) {
            case 'featured': return 'Featured';
            case 'editor-pick': return "Editor's Pick";
            case 'spotlight': return 'Spotlight';
            default: return 'Article';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'featured': return 'bg-red-50 text-red-800 border border-red-200';
            case 'editor-pick': return 'bg-blue-50 text-blue-800 border border-blue-200';
            case 'spotlight': return 'bg-green-50 text-green-800 border border-green-200';
            default: return 'bg-gray-50 text-gray-800 border border-gray-200';
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <section className="relative pt-32 md:pt-36 pb-8 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12 gap-y-12 lg:gap-8">
                        <div className="col-span-12">
                            {/* Header */}
                            <header className="mb-12 mx-auto text-center max-w-3xl md:max-w-4xl lg:max-w-5xl">
                                <Link 
                                    href="/magazine" 
                                    className="inline-flex items-center text-black hover:text-gray-800 mb-6 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Magazine
                                </Link>
                                
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                    {article.title}
                                </h1>
                                
                                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                                    {article.category !== 'ordinary' && (
                                        <Badge className={getCategoryColor(article.category)}>
                                            {getCategoryLabel(article.category)}
                                        </Badge>
                                    )}
                                    
                                    {article.tags && article.tags.map((tag, index) => (
                                        <Badge key={index} variant="outline" className="px-3 py-1 bg-gray-50 text-gray-800 border border-gray-200">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                
                                {/* <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    {article.excerpt}
                                </p> */}
                                
                                <div className="flex items-center gap-4 text-gray-500 mt-4 justify-center">
                                    <div className="flex items-center">
                                        <User className="w-4 h-4 mr-2" />
                                        <span>Written by: {article.author.name}</span>
                                    </div>
                                    <span>•</span>
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <span>{formatDate(article)}</span>
                                    </div>
                                </div>
                            </header>

                            {/* Hero Image */}
                            <div className="rounded-2xl overflow-hidden mb-12 aspect-video w-full">
                                <Image
                                    src={getValidImageUrl(article.imageURL)}
                                    alt={article.title}
                                    width={1200}
                                    height={630}
                                    className="w-full h-auto object-cover"
                                    priority
                                />
                            </div>

                            {/* Article Content */}
                            <article className="prose lg:prose-xl max-w-none mx-auto">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-6 mt-8 border-b pb-2" {...props} />,
                                        h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mb-4 mt-6" {...props} />,
                                        h3: ({node, ...props}) => <h3 className="text-xl font-semibold mb-3 mt-5" {...props} />,
                                        p: ({node, ...props}) => <p className="leading-relaxed mb-4" {...props} />,
                                        ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                                        ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                                        a: ({node, ...props}) => <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                                        blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4" {...props} />,
                                        pre: ({node, ...props}) => <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm font-mono my-4" {...props} />,
                                        code: ({ node, className, children, ...props }) => {
                                            const match = /language-(\w+)/.exec(className || '');
                                            return !match ? (
                                                <code className="bg-gray-200 text-gray-800 px-1.5 py-1 rounded text-sm font-mono" {...props}>
                                                    {children}
                                                </code>
                                            ) : (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            );
                                        },
                                    }}
                                >
                                    {article.content}
                                </ReactMarkdown>
                            </article>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-8 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12 gap-y-12 lg:gap-8">
                        <div className="col-span-12">
                            <div className="flex items-center p-6 bg-gray-50 rounded-lg max-w-2xl mx-auto">
                                <Avatar className="w-16 h-16 mr-4">
                                    <AvatarImage src={article.author.avatarURL} alt={article.author.name} />
                                    <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                        {article.author.name}
                                    </h3>
                                    <p className="text-gray-600">
                                        Contributing author to WWA Community Magazine
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-8 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12 gap-y-12 lg:gap-8">
                        <div className="col-span-12 text-center">
                            <Link 
                                href="/magazine"
                                className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Magazine
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default MagazineArticlePage;

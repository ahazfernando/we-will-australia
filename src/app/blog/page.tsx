import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";
import { Article } from "@/types/article"; // Assuming your type is in @/types/article

export const metadata: Metadata = {
    title: "Our Blog | Professional Insights for Business Growth",
    description: "Discover valuable insights, strategies, and expert advice from We Will Australia to help your business thrive in today's competitive landscape.",
    keywords: ["business growth", "recruitment", "digital marketing", "IT solutions", "business solutions", "expert advice"],
    alternates: {
        canonical: "https://www.wewillaustralia.com.au/blog",
    },
    openGraph: {
        title: "Our Blog | We Will Australia",
        description: "Discover valuable insights, strategies, and expert advice from We Will Australia to help your business thrive in today's competitive landscape.",
        url: "https://www.wewillaustralia.com.au/blog",
        images: [{ url: "/blogs/blog1.png", width: 1200, height: 630, alt: "We Will Australia Blog" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Our Blog | We Will Australia",
        description: "Discover valuable insights, strategies, and expert advice from We Will Australia to help your business thrive in today's competitive landscape.",
        images: ["/blogs/blog1.png"],
    },
};

async function getArticles(): Promise<Article[]> {
    const articlesQuery = query(collection(db, 'blogs'), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(articlesQuery);

    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        const article: Article = {
            id: doc.id,
            slug: data.slug || '',
            title: data.title || '',
            excerpt: data.excerpt || '',
            imageURL: data.imageURL || '',
            tags: data.tags || [],
            content: data.content,
            author: data.author || { name: 'Unknown', avatarURL: '' },
            date: data.date?.toDate ? data.date.toDate().toISOString() : data.date,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
            lastUpdated: data.lastUpdated?.toDate ? data.lastUpdated.toDate().toISOString() : data.lastUpdated,
        };
        return article;
    });
}

const BlogPage = async () => {
    const articles = await getArticles();
    return <BlogPageClient allArticles={articles} />;
};

export default BlogPage;
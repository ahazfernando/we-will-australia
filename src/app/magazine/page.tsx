import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Metadata } from "next";
import MagazinePageClient from "./MagazinePageClient";
import { MagazineArticle } from "@/types/magazine";

export const metadata: Metadata = {
    title: "WWA Community Magazine | Professional Insights & Stories",
    description: "Discover inspiring stories, professional insights, and community highlights from We Will Australia's magazine featuring featured articles, editor's picks, and spotlight content.",
    keywords: ["community", "magazine", "professional insights", "stories", "editor picks", "spotlight"],
    alternates: {
        canonical: "https://www.wewillaustralia.com.au/magazine",
    },
    openGraph: {
        title: "WWA Community Magazine | We Will Australia",
        description: "Discover inspiring stories, professional insights, and community highlights from We Will Australia's magazine featuring featured articles, editor's picks, and spotlight content.",
        url: "https://www.wewillaustralia.com.au/magazine",
        images: [{ url: "/og.png", width: 1200, height: 630, alt: "WWA Community Magazine" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "WWA Community Magazine | We Will Australia",
        description: "Discover inspiring stories, professional insights, and community highlights from We Will Australia's magazine featuring featured articles, editor's picks, and spotlight content.",
        images: ["/og.png"],
    },
};

async function getMagazineArticles(): Promise<MagazineArticle[]> {
    const articlesQuery = query(collection(db, 'magazine'), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(articlesQuery);

    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        const article: MagazineArticle = {
            id: doc.id,
            slug: data.slug || '',
            title: data.title || '',
            excerpt: data.excerpt || '',
            imageURL: data.imageURL || '',
            tags: data.tags || [],
            content: data.content,
            category: data.category || 'ordinary',
            author: data.author || { name: 'Unknown', avatarURL: '' },
            date: data.date?.toDate ? data.date.toDate().toISOString() : data.date,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
            lastUpdated: data.lastUpdated?.toDate ? data.lastUpdated.toDate().toISOString() : data.lastUpdated,
        };
        return article;
    });
}

const MagazinePage = async () => {
    const articles = await getMagazineArticles();
    return <MagazinePageClient allArticles={articles} />;
};

export default MagazinePage;

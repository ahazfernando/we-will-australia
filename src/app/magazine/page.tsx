import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Metadata } from "next";
import MagazinePageClient from "./MagazinePageClient";
import { MagazineArticle } from "@/types/magazine";

export const revalidate = 0;
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

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
    try {
        // Try ordering by date first, but handle cases where date might be missing
        let articlesQuery;
        try {
            articlesQuery = query(collection(db, 'magazine'), orderBy('date', 'desc'));
        } catch (error) {
            // If orderBy fails (e.g., missing index), fall back to unordered query
            articlesQuery = query(collection(db, 'magazine'));
        }
        
        const querySnapshot = await getDocs(articlesQuery);

        const articles = querySnapshot.docs.map(doc => {
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
                date: data.date?.toDate ? data.date.toDate().toISOString() : (data.date || new Date().toISOString()),
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || new Date().toISOString()),
                lastUpdated: data.lastUpdated?.toDate ? data.lastUpdated.toDate().toISOString() : (data.lastUpdated || new Date().toISOString()),
            };
            return article;
        });

        // Sort articles by date in case Firestore ordering failed or dates are inconsistent
        articles.sort((a, b) => {
            const getDateValue = (article: MagazineArticle): number => {
                const dateValue = article.date || article.createdAt || article.lastUpdated;
                if (!dateValue) return 0;
                if (typeof dateValue === 'string') {
                    return new Date(dateValue).getTime();
                }
                // Handle Timestamp type
                if (dateValue && typeof (dateValue as any).toDate === 'function') {
                    return (dateValue as any).toDate().getTime();
                }
                return 0;
            };
            
            const dateA = getDateValue(a);
            const dateB = getDateValue(b);
            return dateB - dateA; // Newest first
        });

        return articles;
    } catch (error) {
        console.error('Error fetching magazine articles:', error);
        return [];
    }
}

const MagazinePage = async () => {
    const articles = await getMagazineArticles();
    return <MagazinePageClient allArticles={articles} />;
};

export default MagazinePage;

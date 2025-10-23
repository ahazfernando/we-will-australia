import { Timestamp } from 'firebase/firestore';

export type MagazineCategory = 'featured' | 'editor-pick' | 'spotlight' | 'ordinary';

export interface MagazineArticle {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    imageURL: string;
    tags: string[];
    author: {
        name: string;
        avatarURL: string;
    };
    content: string;
    category: MagazineCategory;
    date?: string | Timestamp;
    createdAt?: string | Timestamp;
    lastUpdated?: string | Timestamp;
    isPopular?: boolean;
}

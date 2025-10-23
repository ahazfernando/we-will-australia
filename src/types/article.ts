import { Timestamp } from 'firebase/firestore';

/**
 * A centralized Article interface to ensure type consistency across the application.
 * It accommodates date fields that can be either a string or a Firestore Timestamp.
 */
export interface Article {
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
    date?: string | Timestamp;
    createdAt?: string | Timestamp;
    lastUpdated?: string | Timestamp;
    isPopular?: boolean;
}

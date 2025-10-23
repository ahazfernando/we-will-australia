import HomePageServer from './homepage-server';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "We Will Australia - Your Partner for Growth",
    description: "We Will Australia provides expert business, IT, and marketing solutions to help you achieve your goals. Partner with us for sustainable growth.",
    alternates: {
        canonical: 'https://www.wewillaustralia.com.au',
    },
    openGraph: {
        title: "We Will Australia - Your Partner for Growth",
        description: "We Will Australia provides expert business, IT, and marketing solutions to help you achieve your goals. Partner with us for sustainable growth.",
        url: 'https://www.wewillaustralia.com.au',
        siteName: 'We Will Australia',
        images: [
            {
                url: '/og.png',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en_AU',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "We Will Australia - Your Partner for Growth",
        description: "We Will Australia provides expert business, IT, and marketing solutions to help you achieve your goals. Partner with us for sustainable growth.",
        images: ['/og.png'],
    }
};

export default function Page() {
    return <HomePageServer />;
}
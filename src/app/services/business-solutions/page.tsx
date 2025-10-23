import { Metadata } from 'next';
import BusinessSolutions from './business-solutions';

export const metadata: Metadata = {
    title: "Business Solutions",
    description: "Strategic guidance for sustainable growth. Optimize operations, plan for growth, and improve financial performance with our expert business consulting services.",
    openGraph: {
        title: "Business Solutions | We Will Australia",
        description: "Strategic guidance for sustainable business growth.",
        url: "https://www.wewillaustralia.com.au/services/business-solutions",
        images: [
            {
                url: "/business/ITHero.png",
                width: 1200,
                height: 630,
                alt: "Business Solutions",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Business Solutions | We Will Australia",
        description: "Strategic guidance for sustainable business growth.",
        images: ["/business/ITHero.png"],
    },
    alternates: {
        canonical: "https://www.wewillaustralia.com.au/services/business-solutions",
    },
};

export default function BusinessConsultingPage() {
    return <BusinessSolutions />;
}
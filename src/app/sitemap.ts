import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        // Main Pages
        {
            url: 'https://www.wewillaustralia.com.au',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1.0,
        },
        {
            url: 'https://www.wewillaustralia.com.au/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://www.wewillaustralia.com.au/contact',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
        },
        {
            url: 'https://www.wewillaustralia.com.au/careers',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
        },

        // Service Pages
        {
            url: 'https://www.wewillaustralia.com.au/services/marketing',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: 'https://www.wewillaustralia.com.au/services/recruitment',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: 'https://www.wewillaustralia.com.au/services/it-solutions',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: 'https://www.wewillaustralia.com.au/services/business-solutions',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: 'https://www.wewillaustralia.com.au/blog',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },

        // Blog Pages
        {
            url: 'https://www.wewillaustralia.com.au/blog/how-a-website-can-transform-regional-businesses-on-a-big-scale',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: 'https://www.wewillaustralia.com.au/blog/quality-labour-shortage-in-regional-australia-challenges-and-solutions-for-regional-victoria',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: 'https://www.wewillaustralia.com.au/blog/digital-expansion-regional-australia',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        },
    ]
}

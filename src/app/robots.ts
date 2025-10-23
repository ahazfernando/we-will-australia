import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.wewillaustralia.com.au'
  const isProduction = process.env.NODE_ENV === 'production'

  // Disallow all crawlers in non-production environments
  if (!isProduction) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: [{
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'],
    }],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

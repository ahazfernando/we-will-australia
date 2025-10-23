import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/back-to-top";
import { SpeedInsights } from "@vercel/speed-insights/react";
import {AuthProvider} from "@/context/AuthContext";
import { Analytics } from "@vercel/analytics/next"
import { PerformanceMonitor } from "@/components/ui/performance-monitor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.wewillaustralia.com.au'),
  title: {
    default: "We Will Australia | Marketing, Recruitment, IT & Business Solutions",
    template: "%s | We Will Australia",
  },
  description: "Empowering Victoria's SMEs with tailored Marketing, Recruitment, IT, and Business Solutions. Partner with us for sustainable growth.",

  manifest: '/manifest.json',

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon0.svg', type: 'image/svg+xml' },
      { url: '/icon1.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },

  appleWebApp: {
    title: "WWA",
  },

  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://www.wewillaustralia.com.au",
    title: "We Will Australia | Marketing, Recruitment, IT & Business Solutions",
    description: "Empowering Victoria's SMEs with tailored Marketing, Recruitment, IT, and Business Solutions.",
    images: [
      {
        url: "/home/HeroHomeSection.png",
        width: 1200,
        height: 630,
        alt: "The Melbourne Skyline",
      },
    ],
    siteName: "We Will Australia",
  },
  twitter: {
    card: "summary_large_image",
    title: "We Will Australia | Marketing, Recruitment, IT & Business Solutions",
    description: "Empowering Victoria's SMEs with tailored Marketing, Recruitment, IT, and Business Solutions.",
    images: ["/home/HeroHomeSection.png"],
  },

  alternates: {
    canonical: "https://www.wewillaustralia.com.au",
  },

  category: 'business',
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <AuthProvider>
        <Header />
        <main>{children}</main>
        <Footer />
        <BackToTop />
      </AuthProvider>
      <SpeedInsights />
      <Analytics />
      {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "We Will Australia",
              "url": "https://www.wewillaustralia.com.au",
              "logo": "https://www.wewillaustralia.com.au/home/WWA%20-%20Black%201.png",
              "description": "Empowering Victoria's SMEs with tailored Marketing, Recruitment, IT, and Business Solutions.",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "VIC",
                "addressCountry": "AU"
              },
              "areaServed": {
                "@type": "State",
                "name": "Victoria",
                "containedInPlace": {
                  "@type": "Country",
                  "name": "Australia"
                }
              },
              "sameAs": [
                "https://www.facebook.com/share/16s2cJwbzZ/?mibextid=wwXIfr",
                "https://www.instagram.com/wewillaustralia?igsh=MW95cXpjcjQ2dmFidQ==",
                "https://x.com/wewillaustralia?s=11",
                "https://www.linkedin.com/company/we-will-australia/"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["en"]
              }
            })
          }}
      />
      </body>
      </html>
  );
}
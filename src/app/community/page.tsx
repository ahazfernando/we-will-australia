import CommunityHero from "@/components/community/CommunityHero";
import DiscoverRegional from "@/components/community/DiscoverRegional";
import CommunityConnections from "@/components/community/CommunityConnections";
import NewsletterA from "@/components/home/NewsletterA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
  description: "Join the We Will Australia community and connect with professionals, businesses, and innovators across Australia.",
  openGraph: {
    title: "Community | We Will Australia",
    description: "Join the We Will Australia community and build stronger connections.",
    url: "https://www.wewillaustralia.com.au/community",
    images: [
      {
        url: "/community/tramsmel.jpg",
        width: 1200,
        height: 630,
        alt: "WWA Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Community | We Will Australia",
    description: "Join the We Will Australia community and build stronger connections.",
    images: ["/community/tramsmel.jpg"],
  },
  alternates: {
    canonical: "https://www.wewillaustralia.com.au/community",
  },
};

export default function CommunityPage() {
  return (
    <main>
      <CommunityHero />
      <DiscoverRegional />
      <CommunityConnections />
      <NewsletterA />
    </main>
  );
}


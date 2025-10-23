import { Metadata } from "next";
import ITSolutionsDark from './it-solutions-dark';

export const metadata: Metadata = {
  title: "IT Solutions",
  description: "Innovative IT solutions for modern businesses. Streamline operations, enhance security, and fuel growth with our managed IT, cloud, and cybersecurity services.",
  openGraph: {
    title: "IT Solutions | We Will Australia",
    description: "Innovative IT solutions to streamline and secure your business.",
    url: "https://www.wewillaustralia.com.au/services/it-solutions",
    images: [
      {
        url: "/itconsult/ITHero.png",
        width: 1200,
        height: 630,
        alt: "IT Solutions"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Solutions | We Will Australia",
    description: "Innovative IT solutions to streamline and secure your business.",
    images: ["/itconsult/ITHero.png"]
  },
  alternates: {
    canonical: "https://www.wewillaustralia.com.au/services/it-solutions"
  }
};

export default function ITSolutionsPage() {
  return <ITSolutionsDark />;
}
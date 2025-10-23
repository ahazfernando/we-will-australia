import { Metadata } from "next";
import Marketing from './marketing';

export const metadata: Metadata = {
  title: "Marketing Services",
  description: "Drive results with our strategic marketing services. We build brands, engage audiences, and generate measurable growth with tailored digital and traditional marketing strategies.",
  openGraph: {
    title: "Marketing Services | We Will Australia",
    description: "Strategic marketing that drives results for your business.",
    url: "https://www.wewillaustralia.com.au/services/marketing",
    images: [
      {
        url: "/marketing/MarketingHero.png",
        width: 1200,
        height: 630,
        alt: "Marketing Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Services | We Will Australia",
    description: "Strategic marketing that drives results for your business.",
    images: ["/marketing/MarketingHero.png"],
  },
  alternates: {
    canonical: "https://www.wewillaustralia.com.au/services/marketing",
  },
};

export default function MarketingPage() {
    return <Marketing />;
}
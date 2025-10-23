import { Metadata } from "next";
import RecruitmentDark from './recruitment-dark';

export const metadata: Metadata = {
  title: "Recruitment Services",
  description: "Connecting talent with opportunity. We find exceptional candidates that fit your culture and drive your business forward, from regional workforce to specialized roles.",
  openGraph: {
    title: "Recruitment Services | We Will Australia",
    description: "Connecting talent with opportunity to build your team.",
    url: "https://www.wewillaustralia.com.au/services/recruitment",
    images: [
      {
        url: "/recruitement/RecruitementHero.png",
        width: 1200,
        height: 630,
        alt: "Recruitment Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recruitment Services | We Will Australia",
    description: "Connecting talent with opportunity to build your team.",
    images: ["/recruitement/RecruitementHero.png"],
  },
  alternates: {
    canonical: "https://www.wewillaustralia.com.au/services/recruitment",
  },
};

export default function RecruitmentPage() {
  return <RecruitmentDark />;
}
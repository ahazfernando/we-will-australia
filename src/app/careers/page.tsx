import CareersHeroWhite from "@/components/careers/CareersHeroWhite";
import JobListings from "@/components/careers/JobListings";
import InterviewProcess from "@/components/careers/InterviewProcess";
import WhyJoinUs from "@/components/careers/WhyJoinUs";
import VisionMission from "@/components/about/VisionMission";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Careers at We Will Australia - Join Our Team",
  description: "Explore exciting career opportunities at We Will Australia. We are looking for talented individuals to join our team. Browse our job listings and apply today.",
  openGraph: {
    title: "Careers at We Will Australia",
    description: "Find your next career opportunity with We Will Australia. We have roles in marketing, recruitment, IT, and business solutions.",
    url: "https://www.wewillaustralia.com.au/careers",
    images: [
      {
        url: "/careers/backdrop1.jpg",
        width: 1200,
        height: 630,
        alt: "Careers at We Will Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at We Will Australia",
    description: "Find your next career opportunity with We Will Australia.",
    images: ["/careers/backdrop1.jpg"],
  },
  alternates: {
    canonical: "https://www.wewillaustralia.com.au/careers",
  },
};


export default function CareersPage() {

    return (
        <main className="scroll-smooth">
            <CareersHeroWhite />
            <WhyJoinUs />
            <JobListings />
            {/* <InterviewProcess /> */}
            <VisionMission />
        </main>
    );
}



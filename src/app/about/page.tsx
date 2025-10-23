import AboutUsHero from "@/components/about/AboutUsHero";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import OurStory from "@/components/about/OurStory";
import TeamSection from "@/components/about/TeamSection";
import VisionMission from "@/components/about/VisionMission";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about We Will Australia's mission to connect cities and regions through strategy, talent, and technology. Discover our story, vision, and the values that drive us.",
  openGraph: {
    title: "About Us | We Will Australia",
    description: "Discover the story and vision behind We Will Australia.",
    url: "https://www.wewillaustralia.com.au/about",
    images: [
      {
        url: "/about/about-hero.png",
        width: 1200,
        height: 630,
        alt: "About We Will Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | We Will Australia",
    description: "Discover the story and vision behind We Will Australia.",
    images: ["/about/about-hero.png"],
  },
  alternates: {
    canonical: "https://www.wewillaustralia.com.au/about",
  },
};

export default function AboutPage() {
  return (
    <main>
      <AboutUsHero />
      <WhyChooseUs />
      <OurStory />
      {/*<TeamSection>*/}
      <VisionMission />
    </main>
  );
}

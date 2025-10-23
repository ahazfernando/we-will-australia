import ContactHero from "@/components/contact-us/ContactHero";
import ContactForm from "@/components/contact-us/ContactForm";
import DocumentationCta from "@/components/contact-us/DocumentationCta";
import NewsletterA from "@/components/home/NewsletterA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with We Will Australia to discuss your business needs. Let's talk about how our marketing, recruitment, IT, and business solutions can help you grow.",
  openGraph: {
    title: "Contact Us | We Will Australia",
    description: "Ready to accelerate your growth? Get in touch with our team.",
    url: "https://www.wewillaustralia.com.au/contact",
    images: [
      {
        url: "/contact/contact-hero.png",
        width: 1200,
        height: 630,
        alt: "Contact We Will Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | We Will Australia",
    description: "Ready to accelerate your growth? Get in touch with our team.",
    images: ["/contact/contact-hero.png"],
  },
  alternates: {
    canonical: "https://www.wewillaustralia.com.au/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <main>
        <ContactHero />
        <ContactForm />
        <DocumentationCta />
        <NewsletterA />
      </main>
    </>
  );
}

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import {BsTwitterX} from "react-icons/bs";
import Image from "next/image";

// Twitter X icon component (since it's not in lucide-react)
const TwitterXIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { icon: <Facebook size={20} />, href: "https://www.facebook.com/share/16s2cJwbzZ/?mibextid=wwXIfr" },
  { icon: <Instagram size={20} />, href: "https://www.instagram.com/wewillaustralia?igsh=MW95cXpjcjQ2dmFidQ==" },
  { icon: <BsTwitterX size={19} />, href: "https://x.com/wewillaustralia?s=11" },
  { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/company/we-will-australia/" },
];

const DocumentationCta: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-green-50 via-white to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          <div className="col-span-12">
            <Card className="bg-green-950 shadow-lg border-none hover:shadow-xl transition-shadow rounded-2xl sm:rounded-3xl relative overflow-hidden">
              {/* Image Container - adjusted positioning for mobile visibility */}
              <div className="absolute top-0 -right-20 bottom-0 w-full sm:-right-2 sm:w-1/2 lg:right-0 lg:w-1/2">
                <Image
                  src="/contact/aboutus.png"
                  alt="About us illustration"
                  fill
                  className="object-cover object-left"
                />
              </div>
             
              {/* Black Gradient Overlay - minimal coverage on mobile */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 via-25% to-transparent sm:from-black sm:via-black/80 sm:via-black/60 sm:to-transparent pointer-events-none z-[1]"></div>
             
              <CardContent className="p-3 sm:p-4 md:p-6 relative z-[2]">
                <div className="p-2 sm:p-3 pr-[38%] sm:pr-[45%] lg:pr-[50%]">
                  <h2 className="text-xl leading-tight sm:text-2xl sm:leading-tight md:text-3xl md:leading-tight lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                    Keep in touch <br />
                    with our Social Media Globally
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-white/80 mb-6 sm:mb-8 leading-relaxed">
                    Ready to go global? Connect with us on social media worldwide and never miss an update. Tap, follow, engage let's build!
                  </p>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        className="text-white/70 hover:text-white transition-colors duration-300 p-2 rounded-full hover:bg-white/10"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentationCta;
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import {BsTwitterX} from "react-icons/bs";
import Image from "next/image";

const socialLinks = [
  { icon: <Facebook size={20} />, href: "https://www.facebook.com/share/16s2cJwbzZ/?mibextid=wwXIfr" },
  { icon: <Instagram size={20} />, href: "https://www.instagram.com/wewillaustralia?igsh=MW95cXpjcjQ2dmFidQ==" },
  { icon: <BsTwitterX size={19} />, href: "https://x.com/wewillaustralia?s=11" },
  { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/company/we-will-australia/" },
];

const ITSolutionCta: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-teal-50 via-white to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          <div className="col-span-12">
            <Card className="bg-teal-950 shadow-lg border-none hover:shadow-xl transition-shadow rounded-2xl sm:rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 -right-4 bottom-0 w-3/5 sm:-right-2 sm:w-1/2 lg:right-0 lg:w-1/2">
                <Image
                  src="/itconsult/itconsult.png"
                  alt="Illustration of IT solutions connecting businesses globally."
                  fill
                  className="object-cover object-left"
                />
              </div>
               
              {/* Teal Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-950 via-teal-950/80 via-teal-950/60 to-transparent pointer-events-none z-[1]"></div>
               
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

export default ITSolutionCta;
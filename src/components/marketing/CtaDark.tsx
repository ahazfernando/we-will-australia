import React from "react";
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

const CtaDark: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          <div className="col-span-12">
            <Card className="bg-black/20 backdrop-blur-xl shadow-2xl border border-white/10 hover:shadow-xl transition-shadow rounded-2xl sm:rounded-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/2 via-transparent to-purple-500/3 rounded-2xl"></div>
              
              <div className="absolute top-0 -right-20 bottom-0 w-full sm:-right-2 sm:w-1/2 lg:right-0 lg:w-1/2">
                <Image
                  src="/contact/qa_image.png"
                  alt="Global client work illustration"
                  fill
                  className="object-cover object-left opacity-100"
                />
              </div>
              
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-tl from-[#CEC2EB]/8 via-[#BA64FF]/5 to-transparent rounded-full blur-3xl z-0"></div>
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-gradient-to-tl from-[#EBE8FC]/10 via-[#CEC2EB]/8 to-transparent rounded-full blur-2xl z-0"></div>
              
              
              <CardContent className="p-3 sm:p-4 md:p-6 relative z-10">
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
                            className="text-white/70 hover:text-[#CEC2EB] transition-colors duration-300 p-2 rounded-full hover:bg-[#CEC2EB]/10"
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

export default CtaDark;

"use client";

import React from "react";
import { Rocket, Zap, BarChart3, Settings } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const WhyJoinUs: React.FC = () => {
    const benefits = [
        {
            icon: <Rocket className="h-12 w-12 text-black" />,
            title: "Global Impact",
            description: "Work with renowned clients globally while contributing from Australia's innovative ecosystem"
        },
        {
            icon: <Zap className="h-12 w-12 text-black" />,
            title: "Growth",
            description: "Increase your expertise with cutting-edge technologies and industry best practices"
        },
        {
            icon: <BarChart3 className="h-12 w-12 text-black" />,
            title: "Career Growth",
            description: "We will help you reach your potential through mentorship and growth opportunities"
        },
        {
            icon: <Settings className="h-12 w-12 text-black" />,
            title: "Expert Team",
            description: "Join Australia's leading experts in marketing, IT, recruitment, and business consulting"
        }
    ];

    return (
        <section className="py-20 relative">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/careers/JoinWWA.png"
                    alt="Join WWA Background"
                    fill
                    className="object-cover"
                />
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <div className="mb-12">
                            <Badge
                                variant="outline"
                                className="py-1 px-4 pr-4 flex items-center gap-2 bg-white/80 backdrop-blur-sm shadow-sm h-10 rounded-[24px] mb-4 border-black text-black"
                            >
                                <span>Experience for a Lifetime</span>
                            </Badge>
 
                            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
                                Why Join We Will Australia?
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="space-y-4">
                                    <div>
                                        {benefit.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-black">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-black leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 flex justify-center">
                        <div className="relative">
                            <Image
                                src="/careers/blue.png"
                                alt="Blue"
                                width={500}
                                height={500}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyJoinUs;
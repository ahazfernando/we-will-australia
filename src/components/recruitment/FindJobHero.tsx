import React from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const FindJobHero: React.FC = () => {
    return (
        <section className="relative h-[60vh] md:h-[45vh] -mt-16 pt-16">
            {/* Background Image */}
            <Image
                alt="An image of a modern office setting for the contact us page."
                src="/contact/ellipse.png"
                priority
                fill
                className="object-cover object-center mt-10"
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center pt-20 h-full text-center px-4">
                <Badge
                    variant="outline"
                    className="py-1 px-4 pr-4 flex items-center gap-2 mb-3 bg-white/16 backdrop-blur-sm shadow-sm rounded-[24px] text-white border-white/40"
                >
                    <span>We Connect Profiles</span>
                    <div className="w-10 h-6 rounded-[20px] bg-white flex items-center justify-center">
                        <ArrowRight className="h-3 w-3 text-black" />
                    </div>
                </Badge>
                <h1 className="text-5xl font-semibold mb-2 leading-tight" style={{
                    background: 'linear-gradient(90deg, #3B7ED7 0%, #FFFFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    Let's Talk About Your Business
                </h1>
                <p className="text-md text-white max-w-4xl mx-auto mb-4">
                    Ready to accelerate your growth? Get in touch and discover how we can
                    transform your business
                </p>
            </div>
        </section>
    );
};

export default FindJobHero;

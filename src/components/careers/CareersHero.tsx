"use client"
import React, { useRef} from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Globe } from "@/components/ui/globe";

const CareersHero: React.FC = () => {
    const badgeRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    const handleViewOpenRoles = () => {
        const jobListingsSection = document.getElementById('job-listings');
        if (jobListingsSection) {
            jobListingsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleBookConsultation = () => {
        window.location.href = '/contact';
    };

    return (
        <section className="relative h-screen pt-32">
            {/* Background Video */}
            <div className="absolute inset-0 overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    style={{
                        filter: 'brightness(0.8) contrast(1.1)'
                    }}
                >
                    <source src="/careers/careersbackdrop.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20"></div>

            {/* Content */}
            <div className="relative z-40 flex flex-col items-center pt-1 h-full text-center px-4">
                <Badge
                    ref={badgeRef}
                    variant="outline"
                    className="py-1 px-4 pr-4 flex items-center gap-2 mb-3 bg-gray-100/80 backdrop-blur-sm shadow-sm rounded-[24px]"
                >
                    <span>We are Hiring</span>
                    <div className="w-10 h-6 rounded-[20px] bg-[#001114] flex items-center justify-center">
                        <ArrowRight className="h-3 w-3 text-white" />
                    </div>
                </Badge>
                <h1 
                    ref={titleRef}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-2 leading-tight px-2"
                    style={{
                        color: '#C9DEF4'
                    }}
                >
                Find Your Next Opportunity
                </h1>
                <p ref={descriptionRef} className="text-md max-w-4xl mx-auto mb-4 text-white">
                We're looking for passionate individuals to help us drive growth and make a difference.

                </p>
                <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto px-4 sm:px-0 relative z-50">
                    <button 
                        onClick={handleViewOpenRoles}
                        className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-transparent border border-white text-white hover:bg-white hover:text-black transition-colors w-full sm:w-auto min-w-0 sm:min-w-[180px] rounded-xl cursor-pointer relative z-50"
                        style={{ pointerEvents: 'auto' }}
                    >
                        View Open Roles
                    </button>
                    <button 
                        onClick={handleBookConsultation}
                        className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-white text-black hover:bg-gray-100 transition-colors w-full sm:w-auto min-w-0 sm:min-w-[200px] rounded-xl cursor-pointer relative z-50"
                        style={{ pointerEvents: 'auto' }}
                    >
                        Book a Free Consultation
                    </button>
                </div>
                
                {/* Globe Component - Positioned at bottom with cutoff */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-6xl h-[800px] z-20 overflow-hidden pointer-events-none">
                    <Globe 
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-32 z-20 w-full h-full" 
                        config={{
                            width: 800,
                            height: 800,
                            onRender: () => {},
                            devicePixelRatio: 2,
                            phi: 0,
                            theta: 0.3,
                            dark: 0,
                            diffuse: 2.0,
                            mapSamples: 16000,
                            mapBrightness: 4.0,
                            baseColor: [0.3, 0.5, 1.0],
                            markerColor: [0.6, 0.9, 1],
                            glowColor: [0.8, 1, 1],
                            markers: [
                                { location: [14.5995, 120.9842], size: 0.05 },
                                { location: [19.076, 72.8777], size: 0.12 },
                                { location: [23.8103, 90.4125], size: 0.07 },
                                { location: [30.0444, 31.2357], size: 0.09 },
                                { location: [39.9042, 116.4074], size: 0.1 },
                                { location: [-23.5505, -46.6333], size: 0.12 },
                                { location: [19.4326, -99.1332], size: 0.12 },
                                { location: [40.7128, -74.006], size: 0.12 },
                                { location: [34.6937, 135.5022], size: 0.07 },
                                { location: [41.0082, 28.9784], size: 0.08 },
                            ],
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

export default CareersHero;


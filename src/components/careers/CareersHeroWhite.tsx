"use client"
import React, { useRef} from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const CareersHeroWhite: React.FC = () => {
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
            <div className="absolute inset-0 overflow-hidden bg-gray-900">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    onError={(e) => console.error('Video failed to load:', e)}
                    onLoadStart={() => console.log('Video loading started')}
                    onCanPlay={() => console.log('Video can play')}
                >
                    <source src="/recruitement/WhiteRecruitement.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Content */}
            <div className="relative z-40 flex flex-col items-center pt-1 h-full text-center px-4">
                <Badge
                    ref={badgeRef}
                    variant="outline"
                    className="py-1 px-4 pr-1 flex items-center gap-2 mb-3 bg-gray-100/80 backdrop-blur-sm shadow-sm rounded-[24px]"
                >
                    <span>We are Hiring</span>
                    <div className="w-10 h-6 rounded-[20px] bg-[#1D3986] flex items-center justify-center">
                        <ArrowRight className="h-3 w-3 text-white" />
                    </div>
                </Badge>
                <h1 
                    ref={titleRef}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-2 leading-tight px-2 bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent drop-shadow-lg"
                >
                Find Your Next Opportunity
                </h1>
                <p ref={descriptionRef} className="text-md max-w-4xl mx-auto mb-4 text-black drop-shadow-md">
                We're looking for passionate individuals to help us drive growth and make a difference.

                </p>
                <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto px-4 sm:px-0 relative z-50">
                    <button 
                        onClick={handleViewOpenRoles}
                        className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-transparent border border-[#1D3986] text-[#1D3986] hover:bg-black hover:text-white transition-colors w-full sm:w-auto min-w-0 sm:min-w-[180px] rounded-xl cursor-pointer relative z-50"
                        style={{ pointerEvents: 'auto' }}
                    >
                        View Open Roles
                    </button>
                    <button 
                        onClick={handleBookConsultation}
                        className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-[#1D3986] text-white hover:bg-gray-800 hover:border-gray-800 transition-colors w-full sm:w-auto min-w-0 sm:min-w-[200px] rounded-xl cursor-pointer relative z-50"
                        style={{ pointerEvents: 'auto' }}
                    >
                        Book a Free Consultation
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CareersHeroWhite;

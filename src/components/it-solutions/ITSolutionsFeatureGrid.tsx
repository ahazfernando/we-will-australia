"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

const ITSolutionsFeatureGrid: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-black relative overflow-hidden">
      {/* Background dotted pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Left Column - Two text blocks */}
          <div className="space-y-12">
            {/* Top Left Block */}
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-bold text-white text-left">SEO That Actually Works</h3>
                <ArrowRight className="h-5 w-5 text-white" />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed text-right max-w-xs">
                Dominate search rankings with our proven SEO strategies that deliver real results, not just promises.
              </p>
            </div>
            
            {/* Bottom Left Block */}
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-bold text-white text-left">Lightning Fast Delivery</h3>
                <ArrowRight className="h-5 w-5 text-white" />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed text-right max-w-xs">
                Get your projects delivered on time, every time. We don't just meet deadlines, we beat them.
              </p>
            </div>
          </div>
          
          {/* Center Column - Image */}
          <div className="flex justify-center">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <Image
                src="/itconsult/WWAGREENIT.png"
                alt="IT Solutions"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          {/* Right Column - Two text blocks */}
          <div className="space-y-12">
            {/* Top Right Block */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 mb-3">
                <ArrowLeft className="h-5 w-5 text-white" />
                <h3 className="text-xl font-bold text-white text-right">
                  IT Solutions That Scale
                </h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed text-left max-w-xs">
                Build robust, scalable IT infrastructure that grows with your business and adapts to tomorrow's challenges.
              </p>
            </div>
            
            {/* Bottom Right Block */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 mb-3">
                <ArrowLeft className="h-5 w-5 text-white" />
                <h3 className="text-xl font-bold text-white text-right">
                  Because We Don't Just Code
                </h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed text-left max-w-xs">
                We understand your business goals, create strategic solutions, and deliver technology that drives real growth.
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Central Text */}
        <div className="text-center mt-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Let's build something extraordinary together. From SEO optimization to lightning-fast delivery, we've got you covered.
          </p>
          <Link href="/contact">
            <button className="bg-white text-black hover:bg-gray-100 transition-colors px-3 py-2 text-sm rounded-lg">
              Book a Free Consultation
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ITSolutionsFeatureGrid;

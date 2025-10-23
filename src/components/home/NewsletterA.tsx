"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SparklesCore } from "@/components/ui/sparkles";

const NewsletterA: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Vortex Animation Background */}
          <div className="absolute inset-0 bg-black">
            <SparklesCore
              minSize={0.4}
              maxSize={1}
              particleDensity={100}
              className="w-full h-full"
              particleColor="#ffffff"
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10 p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Side - Text Content */}
              <div className="text-white">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Subscribe to our newsletter
                </h2>
                <p className="text-lg text-white/90 mb-6">
                  Be the first to receive updates, tips, and more
                </p>
              </div>

              {/* Right Side - Form */}
              <div className="flex flex-col space-y-4">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Be the first to get new updates"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-xl px-4 py-3 flex-1"
                    required
                  />
                  <Button
                    type="submit"
                    className="bg-white text-black hover:bg-white/90 rounded-xl px-6 py-3 font-medium"
                  >
                    Subscribe
                  </Button>
                </form>
                <p className="text-sm text-white/70">
                  We Will Keep you updated about what's new from us
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterA;

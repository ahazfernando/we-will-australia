"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AtSign } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Image from "next/image";
import { Vortex } from "../ui/vortex";

const ITSolutionNewsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // email validation function
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      setIsError(true);
      return;
    }

    setIsLoading(true);

    try {
      // Add to 'newsletter' collection
      await addDoc(collection(db, "newsletter"), {
        email: email,
        subscribedAt: serverTimestamp(),
      });

      setMessage("Thank you for subscribing!");
      setIsError(false);
      setEmail("");
    } catch (error) {
      console.error("Error adding document: ", error);
      setMessage("Something went wrong. Please try again.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-teal-950 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center relative overflow-visible md:ml-4">
            {/* Vortex Background Animation */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-60">
              <Vortex
                backgroundColor="transparent"
                particleCount={300}
                baseHue={180}
                className="w-full h-full"
              />
            </div>
            <div className="md:hidden flex flex-col items-center text-center text-white space-y-6 w-full relative z-10">
              <div className="flex-shrink-0">
                <Image
                  src="/folder.png"
                  alt="Newsletter folder"
                  width={192}
                  height={192}
                  className="object-contain"
                />
              </div>
              <div className="w-full max-w-sm">
                <h2 className="text-xl font-bold mb-4">
                  Get the latest IT Solutions and Product insights and trends.
                </h2>

                <div className="mb-6">
                  <form onSubmit={handleSubmit} className="space-y-3 mb-4">
                    <div className="relative">
                      <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="Be the first to get new updates"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-12 h-12 bg-white border-0 rounded-full text-gray-800 placeholder:text-gray-500 w-full"
                        disabled={isLoading}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-white text-black hover:bg-gray-100 h-12 rounded-full font-medium"
                      disabled={isLoading}
                    >
                      {isLoading ? "Subscribing..." : "Subscribe"}
                    </Button>
                  </form>

                  {message && (
                    <div
                      className={`p-3 rounded-lg mb-4 ${isError ? "bg-red-900/30 text-red-200" : "bg-green-900/30 text-green-200"}`}
                    >
                      {message}
                    </div>
                  )}

                  <p className="text-gray-300 text-sm">
                    Stay ahead with the latest updates, insights, and events
                    from We Will Australia.
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden md:block relative z-10">
              <div className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 z-10">
                <Image
                  src="/folder.png"
                  alt="Newsletter folder"
                  width={320}
                  height={320}
                  className="w-64 h-64 md:w-80 md:h-80 object-contain"
                />
              </div>
              <div className="max-w-xl ml-72 md:ml-80 lg:ml-96 text-center md:text-left text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Subscribe to our newsletter for the latest updates and
                  insights.
                </h2>

                <div className="mb-6">
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-0 mb-4"
                  >
                    <div className="relative flex-grow">
                      <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="Be the first to get new updates"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-12 pr-32 h-14 bg-white border-0 rounded-full text-gray-800 placeholder:text-gray-500"
                        disabled={isLoading}
                      />
                      <Button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 h-10 px-6 rounded-full font-medium text-black"
                        disabled={isLoading}
                      >
                        {isLoading ? "Subscribing..." : "Subscribe"}
                      </Button>
                    </div>
                  </form>

                  {message && (
                    <div
                      className={`p-3 rounded-lg mb-4 ${isError ? "bg-red-900/30 text-red-200" : "bg-green-900/30 text-green-200"}`}
                    >
                      {message}
                    </div>
                  )}

                  <p className="text-gray-300 text-sm">
                    Stay ahead with the latest updates, insights, and events
                    from We Will Australia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ITSolutionNewsletter;
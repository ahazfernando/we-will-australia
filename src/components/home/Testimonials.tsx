"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  image: string;
  quote: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = 3;

  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(db, "testimonials"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const testimonialsArr: Testimonial[] = [];
      querySnapshot.forEach((doc) => {
        testimonialsArr.push({ ...doc.data(), id: doc.id } as Testimonial);
      });
      setTestimonials(testimonialsArr);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const pageCount = Math.ceil(testimonials.length / testimonialsPerPage);
  const displayedTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage,
  );

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Hear From Our Clients
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how businesses across Australia have achieved growth
            through our marketing, recruitment, IT, and consulting services.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[300px]">
          {isLoading ? (
            <p className="col-span-full text-center">Loading testimonials...</p>
          ) : (
            displayedTestimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <CardContent className="p-8 relative">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating || 0)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <blockquote className="text-gray-600 italic mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <Avatar className="h-16 w-16 mr-4">
                      <AvatarImage
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "N/A"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-gray-800">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        <div className="flex justify-center mt-12">
          {!isLoading &&
            pageCount > 1 &&
            Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`h-3 w-3 rounded-full mx-1 transition-colors ${
                  currentPage === index
                    ? "bg-blue-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

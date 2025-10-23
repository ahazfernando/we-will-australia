"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isInHero, setIsInHero] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      const scrollY = window.pageYOffset;
      
      if (scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setIsInHero(scrollY < 800);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-black hover:bg-gray-800 text-white shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Back to top"
    >
      {isInHero ? (
        <ChevronDown className="h-6 w-6" />
      ) : (
        <ChevronUp className="h-6 w-6" />
      )}
    </Button>
  );
};

export default BackToTop;

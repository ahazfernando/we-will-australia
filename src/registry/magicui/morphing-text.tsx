"use client";

import React, { useState, useEffect } from "react";

interface MorphingTextProps {
  texts: string[];
  className?: string;
  duration?: number;
}

export function MorphingText({ texts, className = "", duration = 2000 }: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsVisible(true);
      }, 300);
    }, duration);

    return () => clearInterval(interval);
  }, [texts.length, duration]);

  return (
    <span
      className={`transition-all duration-300 ease-in-out ${
        isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-2"
      } ${className}`}
    >
      {texts[currentIndex]}
    </span>
  );
}

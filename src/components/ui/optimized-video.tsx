"use client";

import React, { useState, useRef, useEffect } from 'react';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
}

export default function OptimizedVideo({
  src,
  poster,
  className = '',
  autoplay = false,
  loop = true,
  muted = true,
  playsInline = true,
  preload = 'metadata',
}: OptimizedVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.load();
    }
  }, [isInView]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {isInView ? (
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          poster={poster}
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload={preload}
          onLoadedData={() => setIsLoaded(true)}
          onError={(e) => {
            console.warn('Video failed to load:', e);
            setIsLoaded(true); // Show poster/fallback
          }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div 
          className="bg-gray-200 animate-pulse w-full h-full flex items-center justify-center"
        >
          {poster && (
            <img 
              src={poster} 
              alt="Video poster" 
              className="w-full h-full object-cover opacity-50"
            />
          )}
        </div>
      )}
    </div>
  );
}

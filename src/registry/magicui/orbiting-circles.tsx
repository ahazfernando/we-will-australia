"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface OrbitingCirclesProps {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
}

export function OrbitingCircles({
  className,
  children,
  reverse = false,
  duration = 20,
  delay = 0,
  radius = 50,
  path = true,
  iconSize = 40,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const childrenArray = React.Children.toArray(children);
  
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden",
        className || "h-[500px]"
      )}
      {...props}
    >
      {path && (
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="stroke-border/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            strokeDasharray="4,4"
          />
        </svg>
      )}
      
      <div
        className="absolute flex h-full w-full items-center justify-center"
        style={{
          animation: `spin ${duration / speed}s ${reverse ? 'reverse' : 'normal'} linear infinite`,
          animationDelay: `${delay}s`,
        }}
      >
        {childrenArray.map((child, index) => {
          const angle = (360 / childrenArray.length) * index;
          
          return (
            <div 
              key={index}
              className="absolute" 
              style={{ 
                transform: `rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`,
                transformOrigin: "center"
              }}
            >
              <div 
                style={{ 
                  width: iconSize, 
                  height: iconSize,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {child}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
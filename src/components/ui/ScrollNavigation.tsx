"use client";

import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const ScrollNavigation: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        backgroundColor: 'red',
        padding: '10px'
      }}
    >
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} />
      </button>

      {/* Scroll to Bottom Button */}
      <button
        onClick={scrollToBottom}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label="Scroll to bottom"
      >
        <ChevronDown size={24} />
      </button>
    </div>
  );
};

export default ScrollNavigation;

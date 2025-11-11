"use client";

import * as React from "react";
export interface BitcoinPillProps {
  className?: string;
}
export default function BitcoinPill({
  className = ""
}: BitcoinPillProps) {
  return <div className={`inline-flex items-center justify-center ${className}`}>
      {/* Pill Container - Vertical orientation */}
      <div className="relative w-3 h-7 sm:w-3.5 sm:h-8 bg-gradient-to-br from-orange-300 via-orange-400 to-amber-400 rounded-full border-[0.5px] border-black shadow-[0.5px_0.5px_0px_0px_rgba(0,0,0,1)] transform rotate-12">
        {/* Hatching pattern overlay */}
        <div className="absolute inset-0 rounded-full opacity-20" style={{
        backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.3) 2px,
              rgba(0,0,0,0.3) 3px
            )`
      }} />
        
        {/* Highlight effect */}
        <div className="absolute top-0.5 left-1 w-1.5 h-1 bg-white/30 rounded-full blur-[1px]" />
        
        {/* Bitcoin Symbol */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-[10px] sm:text-xs drop-shadow-[0.5px_0.5px_0.5px_rgba(0,0,0,0.5)]">
            ₿
          </span>
        </div>
        
        {/* Additional hatching for depth */}
        <div className="absolute inset-0 rounded-full opacity-15" style={{
        backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 3px,
              rgba(0,0,0,0.2) 3px,
              rgba(0,0,0,0.2) 4px
            )`
      }} />
      </div>
    </div>;
}
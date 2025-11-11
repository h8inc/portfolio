"use client";

import * as React from "react";
import { Mail, Linkedin, Github, Leaf } from "lucide-react";
import BitcoinPill from "./BitcoinPill";
export interface ProfileWidgetProps {
  name?: string;
  title?: string;
  imageUrl?: string;
  fundingAmount?: string;
  productsShipped?: string;
  foundingCount?: string;
  emailUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}
export default function ProfileWidget({
  name = "MARKIE SHARKIE",
  title = "Versatile designer building 0→1 products. Leading design & shaping AI at Observe in San Mateo, CA.",
  imageUrl = "/assets/portrait_transparent_responsive.svg",
  fundingAmount = "$400M+",
  productsShipped = "15",
  foundingCount = "x3",
  emailUrl = "mailto:hello@atanasterziev.com",
  linkedinUrl = "https://www.linkedin.com/in/atanas-terziev-jr/",
  githubUrl = "https://github.com/h8inc"
}: ProfileWidgetProps) {
  return <div className="w-full flex items-start justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl lg:max-w-3xl">
        {/* Main Card with relative positioning for avatar */}
        <div className="relative bg-[#FAF7F0] rounded-[2.5rem] sm:rounded-[3rem] border-[3px] sm:border-[4px] border-black shadow-2xl overflow-visible">
          
          {/* Profile Image - Positioned at top center, overlapping the card */}
          <div className="absolute -top-24 sm:-top-32 lg:-top-36 left-1/2 -translate-x-1/2 z-20">
            <img src={imageUrl} alt="Illustrated portrait" className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72" />
          </div>

          {/* Top Marquee Section */}
          <div className="bg-white border-b-[3px] sm:border-b-[4px] border-black py-3 sm:py-4 overflow-hidden relative z-10 rounded-t-[2.5rem] sm:rounded-t-[3rem]">
            <div className="flex animate-marquee whitespace-nowrap">
              <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6">
                {[...Array(8)].map((_, i) => <React.Fragment key={i}>
                    <span className="text-xs sm:text-sm md:text-base font-bold tracking-wider text-gray-400" style={{ fontFamily: 'Aeonik Extended' }}>HELLO, I'M NASKO</span>
                    <BitcoinPill />
                    <span className="text-xs sm:text-sm md:text-base font-bold tracking-wider" style={{ fontFamily: 'Aeonik Extended' }}>
                      NASKO TERZIEV JR
                    </span>
                    <BitcoinPill />
                  </React.Fragment>)}
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div className="relative px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-6 sm:pb-8">
            {/* Title Text */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-6 sm:mb-8 lg:mb-10 leading-tight px-2 sm:px-4 font-medium" style={{ fontFamily: 'Aeonik' }}>
              Versatile designer and vibe coder. Building 0→1 products at Tide, remotely.
            </h1>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
              <a href="https://www.figma.com/deck/JrHLya85t4BuUzpQzRCko6/Nasko-Terziev-Portfolio-showcase?node-id=1-42&viewport=-3719%2C-9%2C0.56&t=bzI9ahnv8lNVKVu0-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1" target="_blank" rel="noopener noreferrer" className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 lg:px-7 py-2 sm:py-3 rounded-full border-[2px] sm:border-[3px] border-black font-bold text-xs sm:text-sm lg:text-base shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-[1px] hover:translate-y-[1px] transition-all" style={{ fontFamily: 'Aeonik Extended' }}>
                Work Samples
              </a>
              <span className="text-xl sm:text-2xl font-bold">:</span>
              <a href={emailUrl} className="bg-orange-500 hover:bg-orange-600 text-white p-2 sm:p-3 rounded-full border-[2px] sm:border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-[1px] hover:translate-y-[1px] transition-all" target="_blank" rel="noopener noreferrer">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href={linkedinUrl} className="bg-orange-500 hover:bg-orange-600 text-white p-2 sm:p-3 rounded-full border-[2px] sm:border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-[1px] hover:translate-y-[1px] transition-all" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href={githubUrl} className="bg-orange-500 hover:bg-orange-600 text-white p-2 sm:p-3 rounded-full border-[2px] sm:border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-[1px] hover:translate-y-[1px] transition-all" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 px-2">
              <div className="bg-[#EDEAE4] rounded-xl sm:rounded-2xl p-3 sm:p-6 lg:p-8 flex flex-col justify-center items-center min-h-[100px] sm:min-h-[120px] lg:min-h-[140px]">
                <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2" style={{ fontFamily: 'Aeonik Extended' }}>
                  $25M+
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-700 text-center" style={{ fontFamily: 'Aeonik' }}>generated revenue</div>
              </div>
              <div className="bg-[#EDEAE4] rounded-xl sm:rounded-2xl p-3 sm:p-6 lg:p-8 flex flex-col justify-center items-center min-h-[100px] sm:min-h-[120px] lg:min-h-[140px]">
                <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2" style={{ fontFamily: 'Aeonik Extended' }}>
                  8+
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-700 text-center" style={{ fontFamily: 'Aeonik' }}>
                  Products shipped
                </div>
              </div>
              <div className="bg-[#EDEAE4] rounded-xl sm:rounded-2xl p-3 sm:p-6 lg:p-8 flex flex-col justify-center items-center min-h-[100px] sm:min-h-[120px] lg:min-h-[140px]">
                <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2" style={{ fontFamily: 'Aeonik Extended' }}>
                  x2
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-700 text-center" style={{ fontFamily: 'Aeonik' }}>
                  Founding designer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
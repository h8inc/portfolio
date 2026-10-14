"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { Mail, Linkedin, Github } from "lucide-react";
import { ProfileCardShell } from "../ProfileCardShell";
import { trackOutboundLink, trackEvent } from "../../lib/analytics";
import { typography } from "../../design/typography";
import { buttonStyles, buttonFontFamily } from "../../lib/button-styles";
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
  return <ProfileCardShell imageUrl={imageUrl}>
          {/* Profile Section */}
          <div className="relative px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-6 sm:pb-8">
            {/* Title Text */}
            <h1 className={`${typography.h1.className} text-center mb-6 sm:mb-8 lg:mb-10 leading-tight px-2 sm:px-4`} style={typography.h1.style}>
            Designing a self-custodial financial OS at <a href="https://blockstream.com/" target="_blank" rel="noopener noreferrer" onClick={() => trackOutboundLink('https://blockstream.com/', 'Blockstream Company')} className="underline decoration-1 decoration-gray-400 underline-offset-8 hover:decoration-gray-600 transition-all">Blockstream</a>
            </h1>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
              {/* <a 
                href="https://www.figma.com/deck/JrHLya85t4BuUzpQzRCko6/Nasko-Terziev-Portfolio-showcase?node-id=1-42&viewport=-3719%2C-9%2C0.56&t=bzI9ahnv8lNVKVu0-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1" 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => {
                  trackEvent('work_samples_click', {
                    button_location: 'profile_card',
                    destination: 'figma_portfolio'
                  });
                  trackOutboundLink('https://www.figma.com/deck/JrHLya85t4BuUzpQzRCko6/Nasko-Terziev-Portfolio-showcase?node-id=1-42&viewport=-3719%2C-9%2C0.56&t=bzI9ahnv8lNVKVu0-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1', 'Work Samples');
                }}
                className={buttonStyles.primary}
                style={buttonFontFamily.primary}
              >
                Work Samples
              </a> */}
              <button 
                onClick={() => {
                  const tideSection = document.getElementById('tide-feature-gallery');
                  if (tideSection) {
                    tideSection.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                  // Track async to avoid blocking scroll start
                  setTimeout(() => {
                    trackEvent('work_samples_click', {
                      button_location: 'profile_card',
                      destination: 'tide_feature_gallery'
                    });
                  }, 0);
                }}
                className={buttonStyles.primary}
                style={buttonFontFamily.primary}
              >
                Work
              </button>
              <Link
                to="/about"
                onClick={() => trackEvent('about_click', { location: 'profile_card' })}
                className={buttonStyles.primary}
                style={buttonFontFamily.primary}
              >
                About
              </Link>
              <span className="text-xl sm:text-2xl font-bold">:</span>
              <a 
                href={emailUrl} 
                onClick={() => trackOutboundLink(emailUrl, 'Email')}
                className={`${buttonStyles.primary} p-2 sm:p-3`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href={linkedinUrl} 
                onClick={() => trackOutboundLink(linkedinUrl, 'LinkedIn')}
                className={`${buttonStyles.primary} p-2 sm:p-3`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href={githubUrl} 
                onClick={() => trackOutboundLink(githubUrl, 'GitHub')}
                className={`${buttonStyles.primary} p-2 sm:p-3`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 px-2">
              <div className="bg-[#EDEAE4] rounded-xl sm:rounded-2xl p-3 sm:p-6 lg:p-8 flex flex-col justify-center items-center min-h-[100px] sm:min-h-[120px] lg:min-h-[140px]">
                <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2" style={{ fontFamily: 'Aeonik Extended' }}>
                  $40M+
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
                  x4
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-700 text-center" style={{ fontFamily: 'Aeonik' }}>
                  Founding designer
                </div>
              </div>
            </div>
          </div>
    </ProfileCardShell>;
}

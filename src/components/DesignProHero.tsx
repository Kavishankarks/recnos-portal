"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ShinyText from "./ShinyText";

export default function DesignProHero() {
  return (
    <section className="relative h-screen w-full bg-[#000000] text-white font-sans overflow-hidden flex flex-col justify-between select-none">
      {/* Full-Screen Looping Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-80"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay for optimal text contrast */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

      {/* Main Content Layer */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between pt-28 sm:pt-32 pb-6 md:pb-8">

        {/* Center Hero Section */}
        <div className="my-auto py-8 text-center flex flex-col items-center justify-center space-y-6 md:space-y-8">
          {/* Tagline */}
          <span className="text-white/80 text-xs md:text-sm uppercase tracking-widest font-semibold">
            Engineering The Future With AI &amp; Scalable Software
          </span>

          {/* Main Heading */}
          <h1 className="tracking-tighter leading-[0.85] font-sans flex flex-col items-center">
            <span className="text-white font-medium text-5xl sm:text-7xl md:text-8xl xl:text-9xl block">
              Engineer
            </span>
            <ShinyText
              text="Scalable AI Systems."
              speed={3}
              className="text-5xl sm:text-7xl md:text-8xl xl:text-9xl font-semibold mt-1"
            />
          </h1>

          {/* CTA Button */}
          <div className="pt-4 md:pt-6">
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-3 bg-black hover:bg-gray-900 text-white rounded-full px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium border border-white/20 hover:border-white/40 transition-all duration-300 shadow-xl"
            >
              <span>Book Engineering Consultation</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Bottom Spacer for balanced full-screen layout */}
        <div className="h-4 sm:h-6" />
      </div>
    </section>
  );
}

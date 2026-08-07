"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import ShinyText from "./ShinyText";

export default function DesignProHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "Case Studies", href: "/portfolio" },
    { name: "Why Us", href: "/#why-us" },
    { name: "Tech Stack", href: "/#technologies" },
  ];

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
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-6 md:py-8">
        
        {/* Navigation Bar */}
        <header className="w-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center group-hover:border-[#64CEFB] transition-colors">
              <div className="w-2.5 h-2.5 rounded-full bg-white group-hover:bg-[#64CEFB] transition-colors" />
            </div>
            <span className="font-bold text-white text-xl tracking-wider">
              RECNOS
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 px-6 py-2 rounded-full border border-gray-700 bg-black/40 backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="text-white/80 hover:text-white transition-colors text-sm font-medium flex items-center gap-1"
            >
              Contact us
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full border border-gray-700 bg-black/50 text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-4 right-4 z-50 bg-black/95 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/80 hover:text-white text-base font-medium py-1.5 transition-colors border-b border-white/10"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-white text-base font-medium py-1.5 transition-colors flex items-center justify-between"
            >
              <span>Contact us</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Top Section Below Nav: 2 Column Layout on lg+ */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-start pt-4 md:pt-6">
          <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-xl">
            We deliver transformative AI foundation software, distributed systems, and enterprise-grade digital solutions that empower forward-thinking teams to scale globally.
          </p>
          <p className="text-white/80 text-sm md:text-base font-medium lg:text-right">
            100+ Enterprise Systems &amp; AI Models Deployed !
          </p>
        </div>

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

"use client";

import { useState } from "react";
import { ExternalLink, ArrowRight, FolderGit2 } from "lucide-react";
import Link from "next/link";
import Scroll3DCard from "@/components/Scroll3DCard";
import DesignProHero from "@/components/DesignProHero";
import ShinyText from "@/components/ShinyText";
import Scroll3DScene from "@/components/Scroll3DScene";
import Floating3DOrbs from "@/components/Floating3DOrbs";

const projects = [
  {
    id: 1,
    title: "Rolit AI - Making Content Creation Truly AI-Native",
    category: "AI",
    description:
      "From a feature-rich AI generator to the definitive go-to platform for creators — built on persistent creator memory, multi-agent orchestration, and proprietary style flywheels.",
    tech: ["Python", "Java", "Golang", "React Native", "PostgreSQL", "MongoDB"],
    impact:
      "Persistent creator memory & multi-agent orchestration, purpose-built for creators",
    link: "https://rolit.ai/",
  },
  {
    id: 2,
    title: "PG Marketplace Engine",
    category: "Distributed Systems",
    description:
      "Real-time PG accommodations discovery engine in Bangalore with AI search indexing, interactive maps, and payment integration.",
    tech: ["Java", "React", "PostgreSQL", "AI Search", "Stripe"],
    impact: "1000+ active monthly users",
    link: "https://trovare.in/",
  },
  {
    id: 7,
    title: "Mr. Ads - In-Restaurant Digital Signage Network",
    category: "Marketing",
    description:
      "Digital ad network operating high-definition display hardware in dining venues across Bengaluru with scheduled content rotation.",
    tech: ["Digital Signage", "Next.js", "Node.js", "HLS.js"],
    impact: "High-density venue visibility network",
    link: "https://mr-ads.in/",
  },
  {
    id: 4,
    title: "Synapse - Industrial Training Platform",
    category: "EdTech",
    description:
      "Industrial training & talent development platform connecting institutions with industry experts, featuring AI-generated learning plans, proposal bidding, and hands-on lab environments.",
    tech: ["Java", "Spring Boot", "Vaadin", "TypeScript", "PostgreSQL"],
    impact: "End-to-end industrial training & lab automation",
    link: "https://synapse.recnos.com/",
  },
];

const categories = [
  "All",
  "AI",
  "Distributed Systems",
  "EdTech",
  "Marketing",
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-[#000000] text-white min-h-screen font-sans selection:bg-[#64CEFB] selection:text-black relative">
      {/* 3D WebGL Interactive Particle & Geometry Background */}
      <Scroll3DScene />
      <Floating3DOrbs />

      {/* DesignPro / RECNOS Full-Screen Hero Section */}
      <DesignProHero />

      {/* Case Studies Section */}
      <div id="projects" className="pb-28 px-4 sm:px-8 lg:px-12 relative pt-20 sm:pt-28 bg-[#000000]/80 backdrop-blur-[2px]">
        {/* Subtle Ambient Glow */}
        <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-900/15 blur-[140px] rounded-full z-0" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-black/40 border border-gray-700 text-white/80 backdrop-blur-md">
              <FolderGit2 className="w-3.5 h-3.5" /> Client Case Studies
            </span>
            <h2 className="font-sans font-bold text-4xl sm:text-6xl text-white tracking-tight leading-tight">
              Engineering That{" "}
              <ShinyText text="Scales." speed={3} className="font-bold" />
            </h2>
            <p className="font-sans text-white/80 text-base sm:text-lg leading-relaxed">
              Explore how we help forward-thinking teams launch AI-native software, resilient microservices, and high-converting platforms.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex justify-center">
            <div className="inline-flex flex-wrap justify-center gap-2 p-2 rounded-full border border-gray-700 bg-black/40 backdrop-blur-md max-w-4xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-medium font-sans transition-all duration-300 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-white text-black font-semibold shadow-lg scale-105"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Scroll3DCard key={project.id} depth={15} className="h-full">
                <div className="glass-card p-8 rounded-2xl flex flex-col justify-between h-full min-h-[440px] group border border-white/15 hover:border-[#64CEFB]/60 hover:shadow-[0_12px_40px_rgba(100,206,251,0.2)] transition-all duration-300">
                  <div className="space-y-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold tracking-wider uppercase text-[#64CEFB] bg-[#64CEFB]/10 px-3 py-1 rounded-full border border-[#64CEFB]/30">
                        {project.category}
                      </span>

                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/40 hover:text-white transition-colors p-1"
                          aria-label="Visit external link"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <h3 className="font-sans font-semibold text-xl text-white group-hover:text-[#64CEFB] transition-colors leading-snug min-h-[3.5rem] flex items-center">
                      {project.title}
                    </h3>

                    <p className="font-sans text-sm text-white/70 leading-relaxed flex-1">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2 mt-auto">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full text-xs font-sans bg-white/5 text-white/80 border border-white/15 group-hover:border-white/30 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer - Small Visit Site Box on Bottom Right */}
                  <div className="mt-6 pt-4 border-t border-white/15 flex justify-end">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-[#64CEFB]/15 border border-white/15 hover:border-[#64CEFB]/50 text-white font-sans text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(100,206,251,0.2)]"
                      >
                        <span className="group-hover/btn:text-[#64CEFB] transition-colors">
                          Visit Site
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#64CEFB] group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-white/40 font-sans text-xs font-medium italic">
                        <span>Case Study</span>
                      </div>
                    )}
                  </div>
                </div>
              </Scroll3DCard>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="glass-card rounded-3xl p-10 sm:p-14 text-center space-y-6 relative overflow-hidden border border-white/15 hover:border-[#64CEFB]/60 hover:shadow-[0_12px_40px_rgba(100,206,251,0.25)] transition-all duration-300">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#64CEFB]/10 via-transparent to-indigo-900/15" />
            <h2 className="font-sans font-bold text-3xl sm:text-5xl text-white relative z-10 tracking-tight">
              Have an Ambitious Project in Mind?
            </h2>
            <p className="font-sans text-white/70 text-base max-w-xl mx-auto relative z-10 leading-relaxed">
              Let&apos;s turn your concept into an enterprise-ready platform designed for speed, scale, and intelligence.
            </p>
            <div className="relative z-10 pt-2">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-3 bg-white text-black font-semibold font-sans px-8 py-4 rounded-full hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-2xl"
              >
                <span>Let&apos;s Build It</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



"use client";

import { useState } from "react";
import { ExternalLink, ArrowRight, Sparkles, FolderGit2 } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import Scroll3DCard from "@/components/Scroll3DCard";

const projects = [
  {
    id: 1,
    title: "Rolit AI - Content Creation Platform",
    category: "AI",
    description:
      "AI-native platform built on persistent creator memory, multi-agent orchestration, and style flywheels for high-velocity creation.",
    tech: ["Python", "Java", "Golang", "React Native", "PostgreSQL", "MongoDB"],
    impact: "Persistent memory & multi-agent pipeline",
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
    id: 3,
    title: "FinTech Mobile Banking Ecosystem",
    category: "Mobile",
    description:
      "End-to-end mobile banking application featuring zero-knowledge biometric security and instant transaction processing.",
    tech: ["React Native", "Node.js", "GraphQL"],
    impact: "100,000+ transactions executed",
  },
  {
    id: 4,
    title: "E-Commerce AI SEO Overhaul",
    category: "Web",
    description:
      "Complete platform re-engineering focusing on sub-second Core Web Vitals and dynamic AI search answer engine optimization.",
    tech: ["Next.js", "Vercel", "Sanity CMS", "Tailwind CSS"],
    impact: "300% surge in organic traffic",
  },
  {
    id: 5,
    title: "Cloud Infrastructure Modernization",
    category: "Cloud",
    description:
      "Migration of legacy monoliths to a serverless, event-driven Kubernetes architecture with automated terraform scripts.",
    tech: ["AWS Lambda", "Terraform", "Docker", "Kubernetes"],
    impact: "50% reduction in cloud infrastructure costs",
  },
  {
    id: 6,
    title: "AIOps Monitoring Pipeline",
    category: "DevOps",
    description:
      "Predictive machine learning telemetry system monitoring distributed logs to forecast and mitigate system outages.",
    tech: ["Prometheus", "Grafana", "Python", "PyTorch"],
    impact: "60% reduction in Mean-Time-To-Resolution",
  },
];

const categories = [
  "All",
  "AI",
  "Distributed Systems",
  "Mobile",
  "Web",
  "Cloud",
  "DevOps",
  "Marketing",
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div
      className="bg-[#000000] text-white min-h-screen pb-24 px-6 sm:px-12 relative selection:bg-[#3054ff] selection:text-white"
      style={{ paddingTop: "140px" }}
    >
      {/* Decorative Gradient Background */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-900/15 blur-[140px] rounded-full z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/15 text-[#b4c0ff]">
            <FolderGit2 className="w-3.5 h-3.5" /> Client Case Studies
          </span>
          <h1 className="font-instrument-serif text-5xl sm:text-7xl text-white tracking-tight">
            Engineering That Scales
          </h1>
          <p className="font-instrument-sans text-white/60 text-lg leading-relaxed">
            Explore how we help forward-thinking teams launch AI-native software, resilient microservices, and high-converting platforms.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium font-instrument-sans transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)] scale-105"
                  : "bg-white/5 border border-white/15 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Scroll3DCard key={project.id} depth={15}>
              <div className="glass-card p-8 rounded-2xl flex flex-col justify-between h-full group border border-white/20 hover:border-[#3054ff]/60 hover:shadow-[0_12px_40px_rgba(48,84,255,0.25)] transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-[#b4c0ff] bg-[#3054ff]/20 px-3 py-1 rounded-full border border-[#3054ff]/40">
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

                  <h3 className="font-instrument-sans font-semibold text-xl text-white group-hover:text-[#b4c0ff] transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="font-instrument-sans text-sm text-white/60 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md text-xs font-instrument-sans bg-white/5 text-white/80 border border-white/15"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-8 pt-4 border-t border-white/15 flex items-center justify-between text-xs">
                  <div className="text-[#b4c0ff] font-medium">
                    <span className="text-white/40">Impact: </span>
                    {project.impact}
                  </div>

                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#3054ff] font-semibold hover:text-[#b4c0ff] transition-colors"
                    >
                      Live Site <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-white/30 italic">Case Study</span>
                  )}
                </div>
              </div>
            </Scroll3DCard>
          ))}
        </div>


        {/* CTA Banner */}
        <div className="glass-card rounded-3xl p-12 text-center space-y-6 relative overflow-hidden border border-white/10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#3054ff]/10 via-transparent to-indigo-900/10" />
          <h2 className="font-instrument-serif text-4xl sm:text-5xl text-white relative z-10">
            Have an Ambitious Project in Mind?
          </h2>
          <p className="font-instrument-sans text-white/60 text-base max-w-xl mx-auto relative z-10">
            Let's turn your concept into an enterprise-ready platform designed for speed, scale, and intelligence.
          </p>
          <div className="relative z-10 pt-2">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 bg-white text-black font-semibold font-instrument-sans px-8 py-3.5 rounded-full hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              Let's Build It <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

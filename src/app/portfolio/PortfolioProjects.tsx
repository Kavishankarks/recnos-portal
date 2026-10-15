"use client";

import { useState } from "react";
import { ExternalLink, ArrowRight, FolderGit2 } from "lucide-react";
import Link from "next/link";
import Scroll3DCard from "@/components/Scroll3DCard";
import ShinyText from "@/components/ShinyText";
import Scroll3DScene from "@/components/Scroll3DScene";
import Floating3DOrbs from "@/components/Floating3DOrbs";
import { categories, projects } from "./projects";

export default function PortfolioProjects() {
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

      {/* Case Studies Section.
          This section's own heading is the page's h1 — the full-screen
          DesignProHero was removed because it stacked a second, near-identical
          "Engineer Scalable AI Systems." heading directly above it. */}
      <div id="projects" className="pb-28 px-4 sm:px-8 lg:px-12 relative pt-32 sm:pt-40 bg-[#000000]/80 backdrop-blur-[2px]">
        {/* Subtle Ambient Glow */}
        <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-900/15 blur-[140px] rounded-full z-0" />

        {/*
          Crawlable summary of every case study. The grid below is client
          rendered, so this is the copy a crawler without JavaScript actually
          sees — including the links, which make the four detail pages
          reachable in the raw HTML.
        */}
        <nav aria-label="Case studies" className="sr-only">
          <h2>RECNOS client case studies</h2>
          <p>
            RECNOS is an engineering studio. These four case studies document
            the AI, distributed-systems, and marketing platforms the studio
            has designed, built, and scaled. Each page records the challenge,
            the engineering approach, and the verified outcome.
          </p>
          <ul>
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={`/portfolio/${project.slug}`}>
                  {project.title}
                </Link>
                {" — "}
                {project.description}
              </li>
            ))}
          </ul>
        </nav>

        <div className="max-w-7xl mx-auto relative z-10 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-black/40 border border-gray-700 text-white/80 backdrop-blur-md">
              <FolderGit2 className="w-3.5 h-3.5" /> Client Case Studies
            </span>
            <h1 className="font-sans font-bold text-4xl sm:text-6xl text-white tracking-tight leading-tight">
              Engineering That{" "}
              <ShinyText text="Scales." speed={3} className="font-bold" />
            </h1>
            <p className="font-sans text-white/80 text-base sm:text-lg leading-relaxed">
              Explore how we help forward-thinking teams launch AI-native software, resilient microservices, and high-converting platforms.
            </p>
            <p className="font-sans text-xs text-white/45">
              Last updated: <time dateTime="2026-10-15">15 October 2026</time>
              {" · "}
              <span>
                By{" "}
                <a
                  href="mailto:dev@recnos.com"
                  rel="author"
                  className="underline decoration-white/20 underline-offset-2 hover:text-white/80"
                >
                  The RECNOS Engineering Team
                </a>
              </span>
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
          <div className="space-y-8">
            <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              What Has RECNOS Built?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Scroll3DCard key={project.id} depth={15} className="h-full">
                <div className="glass-card p-7 rounded-2xl flex flex-col justify-between h-full min-h-[360px] group border border-white/15 hover:border-[#64CEFB]/60 hover:shadow-[0_12px_40px_rgba(100,206,251,0.2)] transition-all duration-300">
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
                          aria-label={`Visit ${project.title} (opens in a new tab)`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <h2 className="font-sans font-semibold text-xl text-white group-hover:text-[#64CEFB] transition-colors leading-snug min-h-[3.5rem] flex items-center">
                      <Link href={`/portfolio/${project.slug}`} className="hover:underline decoration-white/30 underline-offset-4">
                        {project.title}
                      </Link>
                    </h2>

                    <p className="font-sans text-sm text-white/70 leading-relaxed flex-1">
                      {project.description}
                    </p>

                    {/* Evidence summary — counts only. The full challenge,
                        approach and engineering detail live on the case study
                        page, so cards stay uniform in height. */}
                    {(project.engineering?.length || project.pages?.length) && (
                      <ul className="space-y-1.5 pt-1 text-left">
                        {project.engineering && project.engineering.length > 0 && (
                          <li className="flex items-center gap-2 text-xs font-sans text-white/55">
                            <span className="w-1 h-1 rounded-full bg-[#64CEFB]/70 shrink-0" />
                            {project.engineering.length} engineering details
                          </li>
                        )}
                        {project.pages && project.pages.length > 0 && (
                          <li className="flex items-center gap-2 text-xs font-sans text-white/55">
                            <span className="w-1 h-1 rounded-full bg-[#64CEFB]/70 shrink-0" />
                            {project.pages.length} routes documented
                          </li>
                        )}
                      </ul>
                    )}

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

                  {/* Card Footer - Read the case study, plus the external site */}
                  <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between gap-3">
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="group/btn inline-flex items-center gap-2 text-white font-sans text-xs font-semibold tracking-wide hover:text-[#64CEFB] transition-colors"
                    >
                      <span>Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#64CEFB] group-hover/btn:translate-x-1 transition-transform" />
                    </Link>

                    {project.link && (
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
                    )}
                  </div>
                </div>
              </Scroll3DCard>
            ))}
            </div>
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

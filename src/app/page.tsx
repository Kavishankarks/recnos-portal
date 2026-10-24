"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Scroll3DCard from "@/components/Scroll3DCard";
import Floating3DOrbs from "@/components/Floating3DOrbs";
import Section3D from "@/components/Section3D";
import VisionSection from "@/components/VisionSection";
import StatsSection from "@/components/StatsSection";
import ScrollProgress from "@/components/ScrollProgress";
import Magnetic from "@/components/Magnetic";
import RevealHeading from "@/components/RevealHeading";
import { motion } from "motion/react";
import { projects } from "./portfolio/projects";
import {
  Sparkles,
  Zap,
  Cpu,
  Search,
  Figma,
  ShieldCheck,
  Layers,
  Video,
  ArrowRight,
  Calendar,
  Mail,
  Phone,
  Layout,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

/**
 * The three case studies shown on the homepage.
 *
 * Chosen to cover the studio's three pillars rather than to pad a grid:
 * Rolit AI (AI agents), Trovare (distributed systems and programmatic SEO),
 * and Mr. Ads (web platform delivery at scale).
 */
const featuredProjects = ["rolit-ai", "pg-marketplace-engine", "mr-ads"]
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is (typeof projects)[number] => Boolean(project));

/**
 * Three primary pillars, plus the services that support them.
 *
 * The eight offerings were previously rendered as eight identical cards, which
 * presented RECNOS as a generalist agency rather than an AI engineering studio.
 * The split below makes the core offering the core offering; every entry still
 * links to its real `/services/<slug>` page.
 */
const primaryPillars = [
  {
    slug: "ai-foundation-models",
    icon: Sparkles,
    title: "AI Engineering",
    description:
      "Agent systems, foundation-model work, persistent memory, and retrieval over your own corpus — shipped as production services, not demos.",
  },
  {
    slug: "web-platforms",
    icon: Layers,
    title: "Custom Software",
    description:
      "Server-rendered web platforms and mobile apps built for Core Web Vitals, structured data, and search visibility from the first release.",
  },
  {
    slug: "distributed-systems",
    icon: Cpu,
    title: "Scalable Platforms",
    description:
      "Distributed backend architecture, microservices, search indexing and caching — designed for production traffic, with the trade-offs documented.",
  },
];

const supportingCapabilities = [
  {
    slug: "devops-aiops",
    icon: ShieldCheck,
    title: "DevOps & AIOps",
    description: "CI/CD, containers, monitoring, AI-assisted operations.",
  },
  {
    slug: "seo-aeo",
    icon: Search,
    title: "SEO & AEO",
    description: "Crawlability, structured data, and AI citation share.",
  },
  {
    slug: "product-design",
    icon: Figma,
    title: "Product Design",
    description: "Design systems, wireframes, Figma prototypes.",
  },
  {
    slug: "marketing",
    icon: TrendingUp,
    title: "Growth Marketing",
    description: "Positioning, channel strategy, campaign execution.",
  },
  {
    slug: "content-production",
    icon: Video,
    title: "Content & Video",
    description: "Daily short-form video and written content.",
  },
];

const technologies = [
  "Java",
  "Python",
  "Go",
  "AI/ML",
  "Node.js",
  "TensorFlow",
  "PyTorch",
  "Kubernetes",
  "Docker",
  "AWS",
  "GCP",
  "Next.js",
  "React Native",
  "Kafka",
  "Redis",
  "PostgreSQL",
  "Terraform",
  "HLS.js",
];

const benefits = [
  {
    title: "Engineering Excellence",
    description:
      "Code review on every change, documented architecture decisions, and maintainability treated as a delivery requirement.",
  },
  {
    title: "Security First",
    description:
      "Authentication, secrets handling, and dependency review are part of our standard build process, not an add-on.",
  },
  {
    title: "Performance",
    description:
      "We profile before we optimise, and we publish the methodology behind any performance number we quote.",
  },
];

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#000000] text-white selection:bg-[#3054ff] selection:text-white relative">
      {/* Immersive overlays */}
      <ScrollProgress />

      {/* 3D Parallax Floating Elements */}
      <Floating3DOrbs />

      {/* Dark Mode Hero Component */}
      <Hero />

      {/* Answer-first intro — gives readers and AI answer engines a direct, quotable summary */}
      <section className="relative border-t border-white/5 bg-white/[0.01] px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-instrument-sans text-base leading-relaxed text-white/80 sm:text-lg">
            RECNOS is an engineering studio that builds AI foundation models,
            distributed systems, and enterprise web and mobile platforms. Teams
            hire RECNOS to design, ship, and scale production software — from
            multi-agent AI products to high-traffic marketplaces — with SEO and
            answer-engine optimization built in from the first commit.
          </p>
          <p className="mt-6 font-instrument-sans text-xs text-white/45">
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
      </section>

      {/* Company Vision — scroll-driven word reveal with 3D parallax */}
      <VisionSection />

      {/* Selected Work — the proof that the positioning above is real.
          The portfolio was previously reachable only through the nav, so a
          visitor reading the homepage saw capability claims with no evidence
          attached. Three projects, each with the figure that supports it. */}
      <section
        id="work"
        className="relative border-t border-white/5 px-4 py-20 sm:px-6 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto mb-12 max-w-3xl space-y-4 text-center sm:mb-16"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[#b4c0ff]">
              <Layers className="h-3.5 w-3.5" /> Selected Work
            </span>
            <RevealHeading
              text="What We Have Shipped"
              as="h2"
              className="font-instrument-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-white"
            />
            <p className="mx-auto max-w-2xl font-instrument-sans text-base leading-relaxed text-white/60 sm:text-lg">
              Four production platforms, each documented with the engineering
              decisions and the figures behind it.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6"
          >
            {featuredProjects.map((project) => (
              <motion.div
                key={project.slug}
                variants={{
                  hidden: { opacity: 0, y: 32, scale: 0.96 },
                  show: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <Scroll3DCard depth={16}>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="glass-card group flex h-full min-h-[300px] flex-col justify-between rounded-2xl p-6 sm:p-7"
                  >
                    <div>
                      <span className="inline-block rounded-full border border-[#3054ff]/25 bg-[#3054ff]/10 px-3 py-1 text-[11px] font-medium text-[#b4c0ff]">
                        {project.category}
                      </span>
                      <h3 className="mt-5 font-instrument-sans text-lg font-semibold text-white transition-colors group-hover:text-[#b4c0ff]">
                        {project.title}
                      </h3>
                      <p className="mt-2.5 font-instrument-sans text-xs leading-relaxed text-white/60">
                        {project.answer}
                      </p>
                    </div>

                    <div className="mt-6 space-y-3 border-t border-white/5 pt-4">
                      <div className="font-instrument-serif text-2xl text-white">
                        {project.impact}
                      </div>
                      <ul className="flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 4).map((tech) => (
                          <li
                            key={tech}
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-white/60"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between text-xs text-white/40 transition-colors group-hover:text-white/80">
                        <span>Read the case study</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </Scroll3DCard>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-10 flex justify-center">
            <Magnetic strength={0.25}>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-instrument-sans text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
              >
                All case studies <ArrowRight className="h-4 w-4" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* Animated count-up stats */}
      <StatsSection />

      {/* Our Expertise Section */}
      <section id="services" className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:py-32">
        {/* Layered Background */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 100%)",
            }}
          />

          {/* Ambient glow blobs */}
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/2 -translate-x-[80%] w-[700px] h-[420px] bg-[#3054ff]/20 blur-[140px] rounded-full"
          />
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-1/2 translate-x-[70%] w-[600px] h-[380px] bg-indigo-500/10 blur-[130px] rounded-full"
          />

          {/* Fade to black at edges */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto mb-12 max-w-3xl space-y-4 text-center sm:mb-16 lg:mb-20"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-[#b4c0ff]">
              <Sparkles className="w-3.5 h-3.5" /> Core Services
            </span>
            <RevealHeading
              text="Three Things We Do Best"
              as="h2"
              className="font-instrument-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-white"
            />
            <p className="mx-auto max-w-2xl font-instrument-sans text-base leading-relaxed text-white/60 sm:text-lg">
              AI engineering, custom software, and scalable platforms. Design,
              marketing and content sit underneath as supporting capabilities.
            </p>
          </motion.div>

          {/* Primary pillars — three, given full width so the core offering
              reads as the core offering. Previously eight equal cards diluted
              it into a generalist services list. */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6"
          >
            {primaryPillars.map((item, index) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === index;
              return (
                <motion.div
                  key={item.title}
                  variants={{
                    hidden: { opacity: 0, y: 32, scale: 0.96 },
                    show: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                >
                  <Scroll3DCard depth={18}>
                    <Link
                      href={`/services/${item.slug}`}
                      onClick={() => setSelectedIndex(isSelected ? null : index)}
                      aria-pressed={isSelected}
                      className={`glass-card group flex h-full min-h-[280px] flex-col justify-between rounded-2xl p-6 text-left sm:p-7 ${
                        isSelected
                          ? "border-[#3054ff]/70 bg-[#3054ff]/[0.08] shadow-[0_0_0_1px_rgba(48,84,255,0.4),0_20px_50px_rgba(48,84,255,0.3)]"
                          : ""
                      }`}
                    >
                      <div>
                        <div
                          className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 mb-5 ${
                            isSelected
                              ? "bg-[#3054ff] border-[#3054ff] text-white"
                              : "bg-[#3054ff]/10 border-[#3054ff]/20 text-[#3054ff] group-hover:bg-[#3054ff] group-hover:text-white"
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3
                          className={`font-instrument-sans font-semibold text-lg mb-2.5 transition-colors ${
                            isSelected
                              ? "text-[#b4c0ff]"
                              : "text-white group-hover:text-[#b4c0ff]"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p className="font-instrument-sans text-xs text-white/60 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div
                        className={`mt-6 pt-3 border-t flex items-center justify-between text-xs transition-colors ${
                          isSelected
                            ? "border-[#3054ff]/30 text-white/90"
                            : "border-white/5 text-white/40 group-hover:text-white/80"
                        }`}
                      >
                        <span>Learn more</span>
                        <ArrowRight
                          className={`w-3.5 h-3.5 transition-transform ${
                            isSelected ? "translate-x-1" : "group-hover:translate-x-1"
                          }`}
                        />
                      </div>
                    </Link>
                  </Scroll3DCard>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Supporting capabilities — the remaining services, kept on the page
              but deliberately smaller so they read as support for the pillars
              rather than as five more equally-weighted offerings. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:mt-12 sm:p-8"
          >
            <h3 className="font-instrument-sans text-sm font-semibold text-white">
              Supporting capabilities
            </h3>
            <p className="mt-2 max-w-2xl font-instrument-sans text-xs leading-relaxed text-white/55">
              Design, growth and content work alongside the three pillars — the
              same team, engaged when a product needs them.
            </p>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {supportingCapabilities.map((capability) => (
                <li key={capability.slug}>
                  <Link
                    href={`/services/${capability.slug}`}
                    className="group flex h-full flex-col gap-1 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-[#3054ff]/40 hover:bg-white/[0.05]"
                  >
                    <span className="font-instrument-sans text-sm font-medium text-white/85 group-hover:text-[#b4c0ff]">
                      {capability.title}
                    </span>
                    <span className="font-instrument-sans text-[11px] leading-relaxed text-white/45">
                      {capability.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Why RECNOS Section */}
      <section className="relative border-y border-white/5 bg-white/[0.01] px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
        <Section3D tilt={7} depth={100} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-5 space-y-6"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#3054ff]/10 text-[#3054ff] border border-[#3054ff]/20">
                <ShieldCheck className="w-3.5 h-3.5" /> Why Choose Us
              </span>
              <RevealHeading
                text="Why Choose RECNOS?"
                as="h2"
                className="font-instrument-serif text-[clamp(2.5rem,4.5vw,3.5rem)] leading-[1.08] text-white"
              />
              <p className="font-instrument-sans text-white/70 text-base leading-relaxed">
                We combine deep technical expertise in AI foundation software and distributed computing with production-grade engineering discipline.
              </p>

              <div className="pt-4">
                <Magnetic>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 bg-white text-black font-semibold font-instrument-sans px-6 py-3 rounded-full hover:bg-white/90 transition-colors active:scale-95"
                  >
                    Build with Us <ArrowRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12 } },
              }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-1 xl:grid-cols-3 xl:gap-6"
            >
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 36, rotateY: -18 },
                    show: { opacity: 1, y: 0, rotateY: 0 },
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="perspective-1000"
                >
                  <Scroll3DCard depth={15}>
                    <div className="glass-card h-full min-h-[220px] space-y-3 rounded-2xl p-6">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm">
                        0{idx + 1}
                      </div>
                      <h3 className="font-instrument-sans font-semibold text-lg text-white">
                        {benefit.title}
                      </h3>
                      <p className="font-instrument-sans text-xs text-white/60 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </Scroll3DCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section3D>
      </section>

      {/* Technologies Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <Section3D tilt={9} depth={130} className="max-w-6xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-3"
          >
            <RevealHeading
              text="Which Technologies Does RECNOS Use?"
              as="h2"
              className="font-instrument-serif text-3xl sm:text-5xl text-white"
            />
            <p className="font-instrument-sans text-white/60 text-base max-w-xl mx-auto">
              Our engineering stack spans high-throughput backend languages, modern AI frameworks, and resilient cloud infrastructure.
            </p>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.035 } },
            }}
            className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto perspective-1000 list-none"
          >
            {technologies.map((tech, i) => (
              <motion.li
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.6, rotateX: 60, y: 20 },
                  show: { opacity: 1, scale: 1, rotateX: 0, y: 0 },
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ scale: 1.12, y: -4 }}
                className="px-4 py-2 rounded-full text-sm font-instrument-sans bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 hover:border-[#3054ff]/40 transition-colors duration-200 cursor-default"
              >
                {tech}
              </motion.li>
            ))}
          </motion.ul>
        </Section3D>
      </section>

      {/* Contact & Calendar Booking Section */}
      <section id="contact" className="py-28 px-6 relative bg-gradient-to-b from-black via-black to-[#050814]">
        <Section3D tilt={6} depth={90} className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden"
          >
            <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 bg-[#3054ff]/20 blur-[100px] rounded-full" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                className="lg:col-span-5 space-y-6"
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20">
                  <Calendar className="w-3.5 h-3.5" /> Book An Engineering Call
                </span>
                <RevealHeading
                  text="How Do You Start a Project with RECNOS?"
                  as="h2"
                  className="font-instrument-serif text-3xl sm:text-5xl text-white leading-tight"
                />
                <p className="font-instrument-sans text-white/70 text-base leading-relaxed">
                  Book a 30-minute engineering consultation — you will speak
                  with an engineer, not a salesperson. We scope the problem,
                  flag the risks we can already see, and tell you honestly
                  whether we are the right team for it.
                </p>

                {/* What happens next — the question a visitor actually has
                    before they hand over a calendar slot. */}
                <ol className="space-y-3 pt-2">
                  {[
                    "You pick a slot and tell us what you are building.",
                    "We review your goals and constraints before the call, so the 30 minutes are spent on the problem.",
                    "You leave with a scope, a rough timeline, and a written next step — whether or not you hire us.",
                  ].map((step, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 font-instrument-sans text-sm text-white/70"
                    >
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-[#3054ff]/30 bg-[#3054ff]/10 text-[11px] font-semibold text-[#b4c0ff]">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <a
                    href="mailto:dev@recnos.com"
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors font-instrument-sans text-sm group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#3054ff] group-hover:text-white transition-all">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-white/40">Email:</div>
                      <div className="font-medium">dev@recnos.com</div>
                    </div>
                  </a>

                  <a
                    href="tel:+917892883611"
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors font-instrument-sans text-sm group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#3054ff] group-hover:text-white transition-all">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-white/40">Mobile:</div>
                      <div className="font-medium">+91 7892883611</div>
                    </div>
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
                className="overflow-hidden rounded-2xl border border-white/15 bg-white p-2 shadow-2xl lg:col-span-7"
              >
                <iframe
                  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0G0XnyW8usBYIMjx0Nz8Iy_6h9foZJudVZi2LpH2XezXViud_Ceu0qYX2OM7HNMVJacMK6Kvta?gv=true"
                  style={{ border: 0, backgroundColor: "#ffffff" }}
                  width="100%"
                  height="580"
                  className="rounded-xl bg-white"
                  title="Schedule an appointment"
                ></iframe>
              </motion.div>
            </div>
          </motion.div>
        </Section3D>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Scroll3DCard from "@/components/Scroll3DCard";
import Floating3DOrbs from "@/components/Floating3DOrbs";
import { motion } from "motion/react";
import {
  Sparkles,
  Zap,
  Cpu,
  Globe,
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

const expertiseList = [
  {
    icon: Sparkles,
    title: "AI Foundation Software",
    description:
      "Building intelligent agent systems and foundation models for enterprise automation.",
  },
  {
    icon: Cpu,
    title: "Distributed Systems",
    description:
      "Scalable backend architectures, microservices, and event-driven systems.",
  },
  {
    icon: Layers,
    title: "DevOps & AIOps",
    description:
      "Automated CI/CD pipelines, monitoring, and AI-driven operations.",
  },
  {
    icon: Globe,
    title: "Mobile & Web",
    description:
      "High-performance iOS/Android apps and SEO-optimized web platforms.",
  },
  {
    icon: Search,
    title: "SEO & AEO",
    description:
      "Search and answer-engine optimization to rank on Google and get cited by AI assistants like ChatGPT and Gemini.",
  },
  {
    icon: Figma,
    title: "Figma & Product Design",
    description:
      "End-to-end UI/UX design systems, wireframes, and high-fidelity prototypes in Figma.",
  },
  {
    icon: TrendingUp,
    title: "Marketing",
    description:
      "Growth strategy, brand positioning, and campaign execution across digital channels.",
  },
  {
    icon: Video,
    title: "Daily Content & Video",
    description:
      "Consistent, high-quality short-form videos and content produced daily to grow your audience.",
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
      "We prioritize code quality, scalability, and long-term maintainability across all architectures.",
  },
  {
    title: "Security First",
    description:
      "Enterprise-grade security integrated into every layer of the software stack.",
  },
  {
    title: "Performance",
    description:
      "Optimized for extreme speed, high reliability, and massive concurrency workloads.",
  },
];

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#000000] text-white selection:bg-[#3054ff] selection:text-white relative">
      {/* 3D Parallax Floating Elements */}
      <Floating3DOrbs />

      {/* Dark Mode Hero Component */}
      <Hero />

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
            <h2 className="font-instrument-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-white">
              Our Expertise
            </h2>
            <p className="mx-auto max-w-2xl font-instrument-sans text-base leading-relaxed text-white/60 sm:text-lg">
              End-to-end engineering capabilities built for foundation models, cloud scale, and enterprise digital transformation.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          >
            {expertiseList.map((item, index) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === index;
              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 32, scale: 0.96 },
                    show: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                >
                  <Scroll3DCard depth={18}>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedIndex(isSelected ? null : index)
                      }
                      aria-pressed={isSelected}
                      className={`glass-card group flex h-full w-full min-h-[260px] flex-col justify-between rounded-2xl p-6 text-left sm:p-7 ${
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
                    </button>
                  </Scroll3DCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why RECNOS Section */}
      <section className="relative border-y border-white/5 bg-white/[0.01] px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#3054ff]/10 text-[#3054ff] border border-[#3054ff]/20">
                <ShieldCheck className="w-3.5 h-3.5" /> Why Choose Us
              </span>
              <h2 className="font-instrument-serif text-[clamp(2.5rem,4.5vw,3.5rem)] leading-[1.08] text-white">
                Why RECNOS?
              </h2>
              <p className="font-instrument-sans text-white/70 text-base leading-relaxed">
                We combine deep technical expertise in AI foundation software and distributed computing with production-grade engineering discipline.
              </p>

              <div className="pt-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-3 bg-white text-black font-semibold font-instrument-sans px-6 py-3 rounded-full hover:bg-white/90 transition-transform hover:scale-105 active:scale-95"
                >
                  Build with Us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-1 xl:grid-cols-3 xl:gap-6">
              {benefits.map((benefit, idx) => (
                <Scroll3DCard key={idx} depth={15}>
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
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <h2 className="font-instrument-serif text-3xl sm:text-5xl text-white">
              Technologies We Use
            </h2>
            <p className="font-instrument-sans text-white/60 text-base max-w-xl mx-auto">
              Our engineering stack spans high-throughput backend languages, modern AI frameworks, and resilient cloud infrastructure.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {technologies.map((tech, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full text-sm font-instrument-sans bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 hover:border-[#3054ff]/40 transition-all duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Calendar Booking Section */}
      <section id="contact" className="py-28 px-6 relative bg-gradient-to-b from-black via-black to-[#050814]">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden">
            <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 bg-[#3054ff]/20 blur-[100px] rounded-full" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
              <div className="lg:col-span-5 space-y-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20">
                  <Calendar className="w-3.5 h-3.5" /> Book A Call
                </span>
                <h2 className="font-instrument-serif text-4xl sm:text-5xl text-white leading-tight">
                  Build with RECNOS
                </h2>
                <p className="font-instrument-sans text-white/70 text-base leading-relaxed">
                  Ready to engineer the future? Let's discuss your project.
                </p>

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
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/15 bg-white p-2 shadow-2xl lg:col-span-7">
                <iframe
                  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0G0XnyW8usBYIMjx0Nz8Iy_6h9foZJudVZi2LpH2XezXViud_Ceu0qYX2OM7HNMVJacMK6Kvta?gv=true"
                  style={{ border: 0, backgroundColor: "#ffffff" }}
                  width="100%"
                  height="580"
                  className="rounded-xl bg-white"
                  title="Schedule an appointment"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

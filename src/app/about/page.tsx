import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "../portfolio/projects";
import { services } from "../services/services";

export const metadata: Metadata = {
  title: "About",
  description:
    "RECNOS is an engineering studio building AI foundation models, distributed systems, and search-visible web platforms. Meet the team, the approach, and the platforms in production.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    url: "https://recnos.com/about",
    siteName: "RECNOS",
    title: "About | RECNOS",
    description:
      "RECNOS is an engineering studio building AI foundation models, distributed systems, and search-visible web platforms.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "About RECNOS — AI and scalable software engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | RECNOS",
    description:
      "RECNOS is an engineering studio building AI foundation models, distributed systems, and search-visible web platforms.",
    images: ["/og.png"],
  },
};

/**
 * Figures mirror `StatsSection`, which states each one is verified against the
 * project it describes. Kept as data here so the page renders them in markup
 * rather than relying on the homepage animation's final frame.
 *
 * These are the reconciled numbers: the Mr. Ads screen count is the sum of the
 * venue breakdown the network publishes, not the unsupported 31,400+ figure
 * this page previously repeated from the homepage.
 */
const stats = [
  { value: "4,555+", label: "Screens across Mr. Ads' 8 venue types" },
  { value: "8", label: "Ad environments covered by Mr. Ads" },
  { value: "500+", label: "Verified PG listings on Trovare" },
  { value: `${projects.length}`, label: "Production platforms in our portfolio" },
];

const principles = [
  {
    title: "AI in the core, not bolted on",
    detail:
      "Embedding AI into the centre of every product we engineer, rather than adding it as a feature afterwards.",
  },
  {
    title: "Architecture with the trade-offs documented",
    detail:
      "Distributed where the load demands it, and written down — including what we chose not to do.",
  },
  {
    title: "A long-term engineering ally",
    detail:
      "From first prototype to global rollout, we stay with the system we built and keep it running.",
  },
];

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://recnos.com/about#aboutpage",
  url: "https://recnos.com/about",
  name: "About RECNOS",
  description:
    "RECNOS is an engineering studio building AI foundation models, distributed systems, and search-visible web platforms.",
  about: { "@id": "https://recnos.com/#organization" },
  isPartOf: { "@id": "https://recnos.com/#website" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://recnos.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: "https://recnos.com/about",
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="bg-[#000000] text-white min-h-screen font-sans selection:bg-[#64CEFB] selection:text-black relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([aboutJsonLd, breadcrumbJsonLd]),
        }}
      />

      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-900/15 blur-[140px] rounded-full z-0" />

      <article className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 pt-32 sm:pt-40 pb-24">
        <nav aria-label="Breadcrumb" className="text-xs text-white/45">
          <Link href="/" className="hover:text-white/80 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">About</span>
        </nav>

        <header className="mt-8 space-y-5">
          <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-[#64CEFB] bg-[#64CEFB]/10 px-3 py-1 rounded-full border border-[#64CEFB]/30">
            About
          </span>

          <h1 className="font-sans font-bold text-3xl sm:text-5xl tracking-tight leading-tight text-white">
            About RECNOS
          </h1>

          <p className="font-sans text-white/85 text-base sm:text-lg leading-relaxed">
            RECNOS is an engineering studio that builds AI foundation models,
            distributed backend systems, and search-visible web and mobile
            platforms for enterprises. We work end to end, from product design
            through to the infrastructure the product runs on.
          </p>
        </header>

        <section className="mt-12">
          <h2 className="font-sans text-xl font-semibold text-white tracking-tight">
            What we are working toward
          </h2>
          <p className="mt-3 font-sans text-white/75 leading-relaxed">
            We envision a world where intelligent software amplifies every human
            ambition — building the AI foundations, resilient systems, and
            digital experiences that power the next generation of enterprises.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-sans text-xl font-semibold text-white tracking-tight">
            How we work
          </h2>
          <ul className="mt-5 space-y-6">
            {principles.map((item) => (
              <li key={item.title} className="border-l-2 border-[#64CEFB]/30 pl-5">
                <h3 className="font-sans text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 font-sans text-sm text-white/70 leading-relaxed">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-sans text-xl font-semibold text-white tracking-tight">
            By the numbers
          </h2>
          <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-t border-white/10 pt-3"
              >
                <dt className="font-sans text-2xl font-bold text-white">
                  {stat.value}
                </dt>
                <dd className="mt-1 font-sans text-sm text-white/65">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12">
          <h2 className="font-sans text-xl font-semibold text-white tracking-tight">
            What we do
          </h2>
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-white/12 bg-white/[0.03] px-5 py-4 transition-colors hover:border-[#64CEFB]/50 hover:bg-[#64CEFB]/[0.06]"
                >
                  <span className="font-sans text-sm font-semibold text-white transition-colors group-hover:text-[#64CEFB]">
                    {service.shortTitle}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/40 transition-all group-hover:translate-x-1 group-hover:text-white/80" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-sans text-xl font-semibold text-white tracking-tight">
            Get in touch
          </h2>
          <p className="mt-3 font-sans text-sm text-white/70 leading-relaxed">
            Email{" "}
            <a
              href="mailto:dev@recnos.com"
              className="text-[#64CEFB] underline decoration-[#64CEFB]/40 underline-offset-2 hover:decoration-[#64CEFB]"
            >
              dev@recnos.com
            </a>{" "}
            or call{" "}
            <a
              href="tel:+917892883611"
              className="text-[#64CEFB] underline decoration-[#64CEFB]/40 underline-offset-2 hover:decoration-[#64CEFB]"
            >
              +91 78928 83611
            </a>
            . See the{" "}
            <Link
              href="/contact"
              className="text-[#64CEFB] underline decoration-[#64CEFB]/40 underline-offset-2 hover:decoration-[#64CEFB]"
            >
              contact page
            </Link>{" "}
            for the full details.
          </p>
        </section>
      </article>
    </div>
  );
}

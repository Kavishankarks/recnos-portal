import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "./services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "RECNOS builds fine-tuning models, distributed backends, DevOps, SEO-ready web platforms, product design, and growth marketing.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    url: "https://recnos.com/services",
    siteName: "RECNOS",
    title: "Services | RECNOS",
    description:
      "RECNOS builds fine-tuning models, distributed backends, DevOps, SEO-ready web platforms, product design, and growth marketing.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RECNOS services — AI, distributed systems, and web engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | RECNOS",
    description:
      "RECNOS builds fine-tuning models, distributed backends, DevOps, SEO-ready web platforms, product design, and growth marketing.",
    images: ["/og.png"],
  },
};

/**
 * `OfferCatalog` rather than a bare `ItemList`: this is a list of services a
 * named organisation provides, which is what `OfferCatalog` describes. Each
 * entry points at its own detail page, and `provider` resolves to the
 * Organization node declared once in the root layout.
 */
const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": "https://recnos.com/services#catalog",
  name: "RECNOS engineering and growth services",
  url: "https://recnos.com/services",
  provider: { "@id": "https://recnos.com/#organization" },
  itemListElement: services.map((service, index) => ({
    "@type": "Offer",
    position: index + 1,
    itemOffered: {
      "@type": "Service",
      name: service.title,
      description: service.metaDescription,
      url: `https://recnos.com/services/${service.slug}`,
      provider: { "@id": "https://recnos.com/#organization" },
    },
  })),
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
      name: "Services",
      item: "https://recnos.com/services",
    },
  ],
};

export default function ServicesPage() {
  return (
    <div className="bg-[#000000] text-white min-h-screen font-sans selection:bg-[#64CEFB] selection:text-black relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([servicesJsonLd, breadcrumbJsonLd]),
        }}
      />

      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-900/15 blur-[140px] rounded-full z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pt-32 sm:pt-40 pb-24">
        <nav aria-label="Breadcrumb" className="text-xs text-white/45">
          <Link href="/" className="hover:text-white/80 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">Services</span>
        </nav>

        <header className="mt-8 space-y-5">
          <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-[#64CEFB] bg-[#64CEFB]/10 px-3 py-1 rounded-full border border-[#64CEFB]/30">
            Capabilities
          </span>

          <h1 className="font-sans font-bold text-3xl sm:text-5xl tracking-tight leading-tight text-white">
            What RECNOS builds
          </h1>

          {/* Answer-first opening: names the studio and its offering so the
              paragraph stands alone for a reader or an answer engine arriving
              without the H1 above. */}
          <p className="font-sans text-white/85 text-base sm:text-lg leading-relaxed">
            RECNOS is an engineering studio that builds fine-tuning models,
            distributed backend systems, and search-visible web platforms for
            enterprises. Eight services cover the path from product design
            through to running production infrastructure.
          </p>
        </header>

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-white/12 bg-white/[0.03] p-6 sm:p-7 transition-colors hover:border-[#64CEFB]/50 hover:bg-[#64CEFB]/[0.06]"
              >
                <div>
                  <h2 className="font-sans text-lg font-semibold text-white transition-colors group-hover:text-[#64CEFB]">
                    {service.title}
                  </h2>
                  <p className="mt-2.5 font-sans text-sm text-white/65 leading-relaxed">
                    {service.summary}
                  </p>
                </div>

                <span className="mt-6 flex items-center gap-2 text-xs font-semibold text-white/50 transition-colors group-hover:text-white/90">
                  Read more
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 border-t border-white/15 pt-8">
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2 text-white/70 hover:text-white font-sans text-sm font-semibold transition-colors"
          >
            Discuss a project
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

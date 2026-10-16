import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { postsByDate } from "./posts";

export const metadata: Metadata = {
  title: "Engineering Notes",
  description:
    "Technical writing from RECNOS on programmatic SEO, geocoding, responsive images, dead code, and rendering — each note drawn from a real codebase audit.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: "https://recnos.com/blog",
    siteName: "RECNOS",
    title: "Engineering Notes | RECNOS",
    description:
      "Technical writing from RECNOS on programmatic SEO, geocoding, responsive images, dead code, and rendering.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RECNOS engineering notes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Notes | RECNOS",
    description:
      "Technical writing from RECNOS on programmatic SEO, geocoding, responsive images, dead code, and rendering.",
    images: ["/og.png"],
  },
};

/**
 * `Blog` with `blogPost` entries. Each post also carries its own `BlogPosting`
 * node on its detail page, linked here by `@id` so the hub describes the set
 * without duplicating each post's full description.
 */
const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://recnos.com/blog#blog",
  name: "RECNOS Engineering Notes",
  description:
    "Technical writing from RECNOS on programmatic SEO, geocoding, responsive images, dead code, and rendering.",
  url: "https://recnos.com/blog",
  inLanguage: "en",
  publisher: { "@id": "https://recnos.com/#organization" },
  isPartOf: { "@id": "https://recnos.com/#website" },
  blogPost: postsByDate.map((post) => ({
    "@type": "BlogPosting",
    "@id": `https://recnos.com/blog/${post.slug}#post`,
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    url: `https://recnos.com/blog/${post.slug}`,
    author: { "@type": "Organization", name: post.author },
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
      name: "Engineering Notes",
      item: "https://recnos.com/blog",
    },
  ],
};

export default function BlogPage() {
  return (
    <div className="bg-[#000000] text-white min-h-screen font-sans selection:bg-[#64CEFB] selection:text-black relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([blogJsonLd, breadcrumbJsonLd]),
        }}
      />

      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-900/15 blur-[140px] rounded-full z-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 pt-32 sm:pt-40 pb-24">
        <nav aria-label="Breadcrumb" className="text-xs text-white/45">
          <Link href="/" className="hover:text-white/80 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">Engineering Notes</span>
        </nav>

        <header className="mt-8 space-y-5">
          <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-[#64CEFB] bg-[#64CEFB]/10 px-3 py-1 rounded-full border border-[#64CEFB]/30">
            Writing
          </span>

          <h1 className="font-sans font-bold text-3xl sm:text-5xl tracking-tight leading-tight text-white">
            Engineering notes
          </h1>

          {/* Answer-first opening, self-contained without the H1 above. */}
          <p className="font-sans text-white/85 text-base sm:text-lg leading-relaxed">
            RECNOS writes up what we find while auditing and building
            production systems. Each note is drawn from source code read line by
            line — including the parts that turned out to be stubs, mocks, or
            dead code.
          </p>
        </header>

        <ul className="mt-14 space-y-5">
          {postsByDate.map((post) => (
            <li key={post.slug}>
              <article className="group rounded-2xl border border-white/12 bg-white/[0.03] p-6 sm:p-7 transition-colors hover:border-[#64CEFB]/50 hover:bg-[#64CEFB]/[0.06]">
                <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-wider">
                  <span className="font-semibold text-[#64CEFB]">
                    {post.topic}
                  </span>
                  <span className="text-white/30">·</span>
                  <time dateTime={post.date} className="text-white/45">
                    {post.dateDisplay}
                  </time>
                </div>

                <h2 className="mt-3 font-sans text-xl font-semibold text-white sm:text-2xl">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors group-hover:text-[#64CEFB]"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-3 font-sans text-sm text-white/65 leading-relaxed">
                  {post.metaDescription}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-white/50 transition-colors group-hover:text-white/90">
                  Read the note
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-16 border-t border-white/15 pt-8">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-white/70 hover:text-white font-sans text-sm font-semibold transition-colors"
          >
            See the case studies these notes come from
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

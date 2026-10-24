import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact RECNOS about AI foundation models, distributed systems, or web platform work. Email dev@recnos.com or call +91 78928 83611.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    url: "https://recnos.com/contact",
    siteName: "RECNOS",
    title: "Contact | RECNOS",
    description:
      "Contact RECNOS about AI foundation models, distributed systems, or web platform work.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Contact RECNOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | RECNOS",
    description:
      "Contact RECNOS about AI foundation models, distributed systems, or web platform work.",
    images: ["/og.png"],
  },
};

const EMAIL = "dev@recnos.com";
const PHONE_DISPLAY = "+91 78928 83611";
const PHONE_HREF = "+917892883611";

/**
 * `ContactPage` with a nested `Organization` carrying the same `@id` used in
 * the root layout, so this page reinforces the existing entity node instead of
 * declaring a second, competing organisation.
 */
const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://recnos.com/contact#contactpage",
  url: "https://recnos.com/contact",
  name: "Contact RECNOS",
  description:
    "Contact RECNOS about AI foundation models, distributed systems, or web platform work.",
  isPartOf: { "@id": "https://recnos.com/#website" },
  about: { "@id": "https://recnos.com/#organization" },
  mainEntity: {
    "@type": "Organization",
    "@id": "https://recnos.com/#organization",
    name: "RECNOS",
    url: "https://recnos.com/",
    email: EMAIL,
    telephone: PHONE_HREF,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: EMAIL,
        telephone: PHONE_HREF,
        availableLanguage: ["English"],
      },
    ],
  },
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
      name: "Contact",
      item: "https://recnos.com/contact",
    },
  ],
};

const channels = [
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    detail: "Best for project briefs, scoping questions, and anything detailed.",
  },
  {
    label: "Phone",
    value: PHONE_DISPLAY,
    href: `tel:${PHONE_HREF}`,
    detail: "For time-sensitive enquiries during business hours.",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-[#000000] text-white min-h-screen font-sans selection:bg-[#64CEFB] selection:text-black relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([contactJsonLd, breadcrumbJsonLd]),
        }}
      />

      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-900/15 blur-[140px] rounded-full z-0" />

      <article className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 lg:px-12 pt-32 sm:pt-40 pb-24">
        <nav aria-label="Breadcrumb" className="text-xs text-white/45">
          <Link href="/" className="hover:text-white/80 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">Contact</span>
        </nav>

        <header className="mt-8 space-y-5">
          <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-[#64CEFB] bg-[#64CEFB]/10 px-3 py-1 rounded-full border border-[#64CEFB]/30">
            Contact
          </span>

          <h1 className="font-sans font-bold text-3xl sm:text-5xl tracking-tight leading-tight text-white">
            Contact RECNOS
          </h1>

          <p className="font-sans text-white/85 text-base sm:text-lg leading-relaxed">
            RECNOS takes on engineering projects in AI foundation models,
            distributed systems, and web platforms. Email{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="text-[#64CEFB] underline decoration-[#64CEFB]/40 underline-offset-2 hover:decoration-[#64CEFB]"
            >
              {EMAIL}
            </a>{" "}
            with a short description of what you are building, or call{" "}
            <a
              href={`tel:${PHONE_HREF}`}
              className="text-[#64CEFB] underline decoration-[#64CEFB]/40 underline-offset-2 hover:decoration-[#64CEFB]"
            >
              {PHONE_DISPLAY}
            </a>
            .
          </p>

          <p className="font-sans text-xs text-white/45">
            Last updated: <time dateTime="2026-10-15">15 October 2026</time>
            {" · "}
            By{" "}
            <a
              href="mailto:dev@recnos.com"
              rel="author"
              className="underline decoration-white/20 underline-offset-2 hover:text-white/80"
            >
              The RECNOS Engineering Team
            </a>
          </p>
        </header>

        <section className="mt-12">
          <h2 className="font-sans text-xl font-semibold text-white tracking-tight">
            How to reach us
          </h2>
          <ul className="mt-5 space-y-4">
            {channels.map((channel) => (
              <li
                key={channel.label}
                className="rounded-2xl border border-white/12 bg-white/[0.03] p-6"
              >
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-white/45">
                  {channel.label}
                </h3>
                <a
                  href={channel.href}
                  className="mt-2 inline-block font-sans text-lg font-semibold text-[#64CEFB] underline decoration-[#64CEFB]/40 underline-offset-2 hover:decoration-[#64CEFB]"
                >
                  {channel.value}
                </a>
                <p className="mt-2 font-sans text-sm text-white/65 leading-relaxed">
                  {channel.detail}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-sans text-xl font-semibold text-white tracking-tight">
            What helps in a first message
          </h2>
          <ul className="mt-5 space-y-3">
            {[
              "What the product does, and who it is for",
              "Which part you need built — the AI layer, the backend, the web platform, or all three",
              "Any hard constraint: a launch date, an existing stack, or a system it has to integrate with",
            ].map((item) => (
              <li
                key={item}
                className="border-l-2 border-[#64CEFB]/30 pl-5 font-sans text-sm text-white/75 leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-14 pt-8 border-t border-white/15">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-white/70 hover:text-white font-sans text-sm font-semibold transition-colors"
          >
            See what we build
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </article>
    </div>
  );
}

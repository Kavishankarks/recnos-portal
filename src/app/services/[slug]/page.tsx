import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getServiceBySlug, services } from "../services";
import { getProjectBySlug } from "../../portfolio/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Pre-render one page per known service. Anything outside this list is not a
 * valid route, so `dynamicParams = false` turns unknown slugs into a real 404
 * instead of a soft-404 that serves the hub page.
 */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service not found" };
  }

  const url = `https://recnos.com/services/${service.slug}`;

  return {
    title: service.title,
    description: service.metaDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      type: "website",
      url,
      siteName: "RECNOS",
      title: `${service.title} | RECNOS`,
      description: service.metaDescription,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${service.title} — RECNOS`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | RECNOS`,
      description: service.metaDescription,
      images: ["/og.png"],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  // Resolve evidence slugs to real case studies. A slug with no matching
  // project is dropped rather than rendered as a broken link.
  const evidence = service.evidence
    .map((s) => getProjectBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://recnos.com/services/${service.slug}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription,
    url: `https://recnos.com/services/${service.slug}`,
    provider: { "@id": "https://recnos.com/#organization" },
    author: { "@type": "Organization", name: service.author },
    dateModified: service.date,
    ...(service.tech.length > 0 ? { keywords: service.tech.join(", ") } : {}),
    isPartOf: { "@id": "https://recnos.com/services#catalog" },
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
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `https://recnos.com/services/${service.slug}`,
      },
    ],
  };

  return (
    <div className="bg-[#000000] text-white min-h-screen font-sans selection:bg-[#64CEFB] selection:text-black relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([serviceJsonLd, breadcrumbJsonLd]),
        }}
      />

      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-900/15 blur-[140px] rounded-full z-0" />

      <article className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 pt-32 sm:pt-40 pb-24">
        <nav aria-label="Breadcrumb" className="text-xs text-white/45">
          <Link href="/" className="hover:text-white/80 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/services"
            className="hover:text-white/80 transition-colors"
          >
            Services
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">{service.shortTitle}</span>
        </nav>

        <header className="mt-8 space-y-5">
          <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-[#64CEFB] bg-[#64CEFB]/10 px-3 py-1 rounded-full border border-[#64CEFB]/30">
            Service
          </span>

          <h1 className="font-sans font-bold text-3xl sm:text-5xl tracking-tight leading-tight text-white">
            {service.title}
          </h1>

          <p className="font-sans text-white/85 text-base sm:text-lg leading-relaxed">
            {service.answer}
          </p>

          <p className="font-sans text-xs text-white/45">
            Last updated:{" "}
            <time dateTime={service.date}>{service.dateDisplay}</time>
            {" · "}
            <span>
              By{" "}
              <a
                href="mailto:dev@recnos.com"
                rel="author"
                className="underline decoration-white/20 underline-offset-2 hover:text-white/80"
              >
                {service.author}
              </a>
            </span>
          </p>
        </header>

        {service.capabilities.length > 0 && (
          <section className="mt-12">
            <h2 className="font-sans text-xl font-semibold text-white tracking-tight">
              What the engagement covers
            </h2>
            <ul className="mt-5 space-y-3">
              {service.capabilities.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-[#64CEFB]/30 pl-5 font-sans text-sm text-white/75 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {evidence.length > 0 && (
          <section className="mt-12">
            <h2 className="font-sans text-xl font-semibold text-white tracking-tight">
              Where we have shipped this
            </h2>
            <ul className="mt-5 space-y-4">
              {evidence.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="group block rounded-2xl border border-white/12 bg-white/[0.03] p-6 transition-colors hover:border-[#64CEFB]/50 hover:bg-[#64CEFB]/[0.06]"
                  >
                    <span className="font-sans text-base font-semibold text-white transition-colors group-hover:text-[#64CEFB]">
                      {project.title}
                    </span>
                    <span className="mt-2 block font-sans text-sm text-white/65 leading-relaxed">
                      {project.description}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white/50 transition-colors group-hover:text-white/90">
                      Read the case study
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {service.tech.length > 0 && (
          <section className="mt-12">
            <h2 className="font-sans text-xl font-semibold text-white tracking-tight">
              Technology
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {service.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs font-sans bg-white/5 text-white/80 border border-white/15"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        )}

        <div className="mt-14 pt-8 border-t border-white/15 flex flex-wrap items-center gap-4">
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/5 hover:bg-[#64CEFB]/15 border border-white/15 hover:border-[#64CEFB]/50 text-white font-sans text-sm font-semibold transition-all duration-300"
          >
            Discuss a project
            <ArrowRight className="w-4 h-4 text-[#64CEFB] transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-white/60 hover:text-white font-sans text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            All services
          </Link>
        </div>
      </article>
    </div>
  );
}

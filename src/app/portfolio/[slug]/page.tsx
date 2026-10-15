import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { getProjectBySlug, projects } from "../projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Pre-render one page per known project. Anything outside this list is not a
 * valid route, so `dynamicParams = false` turns unknown slugs into a real 404
 * instead of a soft-404 that serves the listing page.
 */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Case study not found" };
  }

  const description = project.outcome || project.description;
  const url = `https://recnos.com/portfolio/${project.slug}`;

  return {
    title: project.title,
    description,
    alternates: {
      canonical: `/portfolio/${project.slug}`,
    },
    openGraph: {
      type: "article",
      url,
      siteName: "RECNOS",
      title: `${project.title} | RECNOS`,
      description,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${project.title} — RECNOS case study`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | RECNOS`,
      description,
      images: ["/og.png"],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `https://recnos.com/portfolio/${project.slug}#casestudy`,
    name: project.title,
    about: project.category,
    description: project.outcome || project.description,
    url: `https://recnos.com/portfolio/${project.slug}`,
    keywords: project.tech.join(", "),
    ...(project.source
      ? { citation: { "@type": "CreativeWork", name: project.source.label, url: project.source.url } }
      : {}),
    isPartOf: { "@id": "https://recnos.com/portfolio#casestudies" },
    publisher: { "@id": "https://recnos.com/#organization" },
  };

  return (
    <div className="bg-[#000000] text-white min-h-screen font-sans selection:bg-[#64CEFB] selection:text-black relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Ambient glow, consistent with the listing page */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-900/15 blur-[140px] rounded-full z-0" />

      <article className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 pt-32 sm:pt-40 pb-24">
        {/* Back to the listing */}
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          All case studies
        </Link>

        <header className="mt-8 space-y-5">
          <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-[#64CEFB] bg-[#64CEFB]/10 px-3 py-1 rounded-full border border-[#64CEFB]/30">
            {project.category}
          </span>

          <h1 className="font-sans font-bold text-3xl sm:text-5xl tracking-tight leading-tight text-white">
            {project.title}
          </h1>

          <p className="font-sans text-white/80 text-base sm:text-lg leading-relaxed">
            {project.description}
          </p>

          <p className="font-sans text-xs text-white/45">
            Last updated:{" "}
            <time dateTime="2026-10-15">15 October 2026</time>
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

        {/* Impact */}
        {project.impact && (
          <div className="mt-10 glass-card rounded-2xl border border-white/15 p-6 sm:p-8">
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-white/45">
              Impact
            </h2>
            <p className="mt-2 font-sans text-white/85 text-base sm:text-lg leading-relaxed">
              {project.impact}
            </p>
          </div>
        )}

        {/* Challenge / Approach / Outcome — each rendered only when supplied.
            Left empty rather than padded with capability claims. */}
        <div className="mt-10 space-y-8">
          {project.challenge && (
            <section>
              <h2 className="font-sans text-xl font-semibold text-white tracking-tight">
                Challenge
              </h2>
              <p className="mt-3 font-sans text-white/70 leading-relaxed">
                {project.challenge}
              </p>
            </section>
          )}

          {project.approach && (
            <section>
              <h2 className="font-sans text-xl font-semibold text-white tracking-tight">
                Approach
              </h2>
              <p className="mt-3 font-sans text-white/70 leading-relaxed">
                {project.approach}
              </p>
            </section>
          )}

          {project.outcome && (
            <section>
              <h2 className="font-sans text-xl font-semibold text-white tracking-tight">
                Outcome
              </h2>
              <p className="mt-3 font-sans text-white/70 leading-relaxed">
                {project.outcome}
                {project.source && (
                  <>
                    {" "}
                    <a
                      href={project.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#64CEFB] underline decoration-[#64CEFB]/40 underline-offset-2 hover:decoration-[#64CEFB]"
                    >
                      {project.source.label}
                    </a>
                  </>
                )}
              </p>
            </section>
          )}
        </div>

        {/* Stack — verified versions from the client's source tree */}
        {project.stack && project.stack.length > 0 && (
          <section className="mt-10">
            <h2 className="font-sans text-xl font-semibold text-white tracking-tight">
              Stack
            </h2>
            <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {project.stack.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col gap-0.5 border-t border-white/10 pt-2.5"
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-white/45">
                    {row.label}
                  </dt>
                  <dd className="font-sans text-sm text-white/85">{row.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* Engineering detail — each item is something that exists in the code */}
        {project.engineering && project.engineering.length > 0 && (
          <section className="mt-12">
            <h2 className="font-sans text-xl font-semibold text-white tracking-tight">
              Engineering
            </h2>
            <ul className="mt-5 space-y-6">
              {project.engineering.map((item) => (
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
        )}

        {/* Page inventory */}
        {project.pages && project.pages.length > 0 && (
          <section className="mt-12">
            <h2 className="font-sans text-xl font-semibold text-white tracking-tight">
              Pages
            </h2>
            <p className="mt-2 font-sans text-sm text-white/55">
              {project.pages.length} routes in the shipped product.
            </p>
            <div className="mt-5 overflow-hidden rounded-xl border border-white/12">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.04]">
                    <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/45 w-[38%]">
                      Route
                    </th>
                    <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/45">
                      What it does
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {project.pages.map((page) => (
                    <tr key={page.path} className="border-t border-white/10 align-top">
                      <td className="px-4 py-2.5 font-mono text-xs text-[#64CEFB] break-all">
                        {page.path}
                      </td>
                      <td className="px-4 py-2.5 font-sans text-sm text-white/70 leading-relaxed">
                        {page.summary}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Scope note — what this build does not include */}
        {project.scopeNote && (
          <aside className="mt-12 rounded-2xl border border-white/12 bg-white/[0.03] p-6 sm:p-7">
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-white/45">
              Scope
            </h2>
            <p className="mt-2.5 font-sans text-sm text-white/65 leading-relaxed">
              {project.scopeNote}
            </p>
          </aside>
        )}

        {/* Technology tags */}
        <section className="mt-10">
          <h2 className="font-sans text-xl font-semibold text-white tracking-tight">
            Technology
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-xs font-sans bg-white/5 text-white/80 border border-white/15"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* Outbound link to the live product */}
        {project.link && (
          <div className="mt-12 pt-8 border-t border-white/15 flex flex-wrap items-center gap-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/5 hover:bg-[#64CEFB]/15 border border-white/15 hover:border-[#64CEFB]/50 text-white font-sans text-sm font-semibold transition-all duration-300"
            >
              Visit {project.source?.label ?? "the live site"}
              <ExternalLink className="w-4 h-4 text-[#64CEFB]" />
            </a>

            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 text-white/70 hover:text-white font-sans text-sm font-semibold transition-colors"
            >
              Discuss a similar project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </article>
    </div>
  );
}

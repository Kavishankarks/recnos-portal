import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getPostBySlug, posts, postsByDate } from "../posts";
import { getProjectBySlug } from "../../portfolio/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Pre-render one page per known post. Anything outside this list is not a valid
 * route, so `dynamicParams = false` turns unknown slugs into a real 404 instead
 * of a soft-404 that serves the hub.
 */
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Note not found" };
  }

  const url = `https://recnos.com/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url,
      siteName: "RECNOS",
      title: `${post.title} | RECNOS`,
      description: post.metaDescription,
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${post.title} — RECNOS`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | RECNOS`,
      description: post.metaDescription,
      images: ["/og.png"],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = post.relatedProjects
    .map((s) => getProjectBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  // Next post in reverse-chronological order, wrapping to the newest.
  const index = postsByDate.findIndex((p) => p.slug === post.slug);
  const next = postsByDate[(index + 1) % postsByDate.length];

  const postJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://recnos.com/blog/${post.slug}#post`,
    headline: post.title,
    description: post.metaDescription,
    url: `https://recnos.com/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en",
    articleSection: post.topic,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://recnos.com/",
    },
    publisher: { "@id": "https://recnos.com/#organization" },
    isPartOf: { "@id": "https://recnos.com/blog#blog" },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://recnos.com/blog/${post.slug}`,
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
        name: "Engineering Notes",
        item: "https://recnos.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://recnos.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <div className="bg-[#000000] text-white min-h-screen font-sans selection:bg-[#64CEFB] selection:text-black relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([postJsonLd, breadcrumbJsonLd]),
        }}
      />

      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-900/15 blur-[140px] rounded-full z-0" />

      <article className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 lg:px-12 pt-32 sm:pt-40 pb-24">
        <nav aria-label="Breadcrumb" className="text-xs text-white/45">
          <Link href="/" className="hover:text-white/80 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-white/80 transition-colors">
            Engineering Notes
          </Link>
        </nav>

        <header className="mt-8 space-y-5">
          <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-[#64CEFB] bg-[#64CEFB]/10 px-3 py-1 rounded-full border border-[#64CEFB]/30">
            {post.topic}
          </span>

          <h1 className="font-sans font-bold text-3xl sm:text-5xl tracking-tight leading-tight text-white">
            {post.title}
          </h1>

          {/* Answer-first opening: stands alone for a reader or an answer
              engine arriving without the H1 above. */}
          <p className="font-sans text-white/85 text-base sm:text-lg leading-relaxed">
            {post.takeaway}
          </p>

          <p className="font-sans text-xs text-white/45">
            <time dateTime={post.date}>{post.dateDisplay}</time>
            {" · "}
            <span>{post.author}</span>
          </p>
        </header>

        <div className="mt-12 space-y-10">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-sans text-xl font-semibold text-white tracking-tight sm:text-2xl">
                {section.heading}
              </h2>

              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="font-sans text-white/75 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-5 space-y-2.5">
                  {section.bullets.map((item) => (
                    <li
                      key={item}
                      className="border-l-2 border-[#64CEFB]/30 pl-5 font-sans text-sm text-white/75 leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.code && (
                <pre className="mt-5 overflow-x-auto rounded-xl border border-white/12 bg-white/[0.04] p-5">
                  <code className="font-mono text-xs text-[#64CEFB] leading-relaxed">
                    {section.code}
                  </code>
                </pre>
              )}
            </section>
          ))}
        </div>

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="font-sans text-xl font-semibold text-white tracking-tight">
              The project this came from
            </h2>
            <ul className="mt-5 space-y-4">
              {related.map((project) => (
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
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {next && (
          <nav
            aria-label="Next note"
            className="mt-14 pt-8 border-t border-white/15"
          >
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/45">
              Next note
            </span>
            <Link
              href={`/blog/${next.slug}`}
              className="group mt-2 flex items-center gap-3 font-sans text-base font-semibold text-white transition-colors hover:text-[#64CEFB]"
            >
              {next.title}
              <ArrowRight className="w-4 h-4 shrink-0 text-[#64CEFB] transition-transform group-hover:translate-x-1" />
            </Link>
          </nav>
        )}

        <div className="mt-10">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-white/60 hover:text-white font-sans text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            All engineering notes
          </Link>
        </div>
      </article>
    </div>
  );
}

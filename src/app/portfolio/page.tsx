import PortfolioProjects from "./PortfolioProjects";
import { projects } from "./projects";

/**
 * Render at request time rather than baking a build-time snapshot.
 *
 * The listing is a client component, so anything it reads from a non-static
 * source would be frozen into the HTML at build time. Rendering per request
 * keeps the crawlable markup below in step with the client-side cards.
 */
export const dynamic = "force-dynamic";

/**
 * The case studies in this list are the ones RECNOS publishes on this site, so
 * `url` points at the case study page. It previously pointed at the client's
 * own site, which contradicted the `isPartOf` reference on the detail pages and
 * described an off-site page as a member of an on-site list.
 */
const caseStudiesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://recnos.com/portfolio#casestudies",
  name: "RECNOS client case studies",
  itemListElement: projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: project.title,
    url: `https://recnos.com/portfolio/${project.slug}`,
  })),
};

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudiesJsonLd) }}
      />
      <PortfolioProjects />
    </>
  );
}

/**
 * Single source of truth for portfolio case studies.
 *
 * Shared by the listing page (`/portfolio`) and the detail route
 * (`/portfolio/[slug]`) so a project only has to be described once.
 *
 * `challenge` and `approach` are intentionally empty where the client has not
 * published enough for us to state them. They render only when filled — the
 * cards and detail pages are never padded with capability claims to fill them.
 */

export type ProjectSource = {
  label: string;
  url: string;
};

export type Project = {
  /** URL segment for /portfolio/<slug>. Must be unique and stable. */
  slug: string;
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  impact: string;
  link: string;
  outcome: string;
  source?: ProjectSource;
  challenge: string;
  approach: string;
};

export const projects: Project[] = [
  {
    slug: "rolit-ai",
    id: 1,
    title: "Rolit AI - Making Content Creation Truly AI-Native",
    category: "AI",
    description:
      "From a feature-rich AI generator to the definitive go-to platform for creators — built on persistent creator memory, multi-agent orchestration, and proprietary style flywheels.",
    tech: ["Python", "Java", "Golang", "React Native", "PostgreSQL", "MongoDB"],
    impact:
      "Persistent creator memory & multi-agent orchestration, purpose-built for creators",
    link: "https://rolit.ai/",
    outcome:
      "An autonomous AI agent that manages a brand's full marketing pipeline from research to ready-to-post content, learning voice, style and identity from existing material. Publicly documented at rolit.ai (retrieved 15 Oct 2026).",
    source: { label: "rolit.ai", url: "https://rolit.ai/" },
    challenge: "",
    approach: "",
  },
  {
    slug: "pg-marketplace-engine",
    id: 2,
    title: "PG Marketplace Engine",
    category: "Distributed Systems",
    description:
      "Real-time PG accommodations discovery engine in Bangalore with AI search indexing, interactive maps, and payment integration.",
    tech: ["Java", "React", "PostgreSQL", "AI Search", "Stripe"],
    impact: "1000+ active monthly users",
    link: "https://trovare.in/",
    outcome:
      "Trovare publicly lists 500+ verified PG listings across Bangalore, covering Koramangala, Indiranagar, HSR Layout and Whitefield, with search near IT parks and no-broker direct owner contact. Source: trovare.in (retrieved 15 Oct 2026).",
    source: { label: "trovare.in", url: "https://trovare.in/" },
    challenge: "",
    approach: "",
  },
  {
    slug: "mr-ads",
    id: 7,
    title: "Mr. Ads - In-Restaurant Digital Signage Network",
    category: "Marketing",
    description:
      "Digital ad network operating high-definition display hardware in dining venues across Bengaluru with scheduled content rotation.",
    tech: ["Digital Signage", "Next.js", "Node.js", "HLS.js"],
    impact: "High-density venue visibility network",
    link: "https://mr-ads.in/",
    outcome:
      "The network publicly reports 2,400+ screens in restaurants and bistros, 1,100+ in residential apartments, 310+ gym locations and 180+ hostel clusters — 31,400+ screens live across 8 ad environments, reaching 18M+ monthly. Source: mr-ads.in (retrieved 15 Oct 2026).",
    source: { label: "mr-ads.in", url: "https://mr-ads.in/" },
    challenge: "",
    approach: "",
  },
  {
    slug: "synapse",
    id: 4,
    title: "Synapse - Industrial Training Platform",
    category: "EdTech",
    description:
      "Industrial training & talent development platform connecting institutions with industry experts, featuring AI-generated learning plans, proposal bidding, and hands-on lab environments.",
    tech: ["Java", "Spring Boot", "Vaadin", "TypeScript", "PostgreSQL"],
    impact: "End-to-end industrial training & lab automation",
    link: "https://synapse.recnos.com/",
    challenge: "",
    approach: "",
    outcome: "",
  },
];

export const categories = [
  "All",
  "AI",
  "Distributed Systems",
  "EdTech",
  "Marketing",
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

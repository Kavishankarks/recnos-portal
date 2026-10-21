/**
 * Single source of truth for service offerings.
 *
 * Shared by the `/services` hub, each `/services/<slug>` detail page, and the
 * homepage card grid, so an offering is described once. The homepage imports
 * `services` and renders `title` / `summary`; the detail pages add the fields
 * that only make sense on a page of their own.
 *
 * `evidence` lists the case studies that demonstrate the service. Every entry
 * must be a real slug in `portfolio/projects.ts` — the detail page resolves
 * them and renders nothing for a slug it cannot find, so a typo shows up as a
 * missing card rather than a broken link.
 *
 * `capabilities` are things this studio has actually shipped, not a generic
 * capability list. Where a service has no shipped example yet, the field is
 * left empty and the section is not rendered — the same rule the case studies
 * follow for `challenge` / `approach`.
 */

export type Service = {
  /** URL segment for /services/<slug>. Must be unique and stable. */
  slug: string;
  title: string;
  /** Short label for nav and cards. */
  shortTitle: string;
  /**
   * Self-contained answer to "what is this?", 60 words or fewer, opening the
   * detail page. States the entity rather than completing a headline.
   */
  answer: string;
  /** Card copy on the hub and homepage. One or two sentences. */
  summary: string;
  /** Search-result snippet, 50–160 characters. */
  metaDescription: string;
  /** ISO date of the last substantive edit. Rendered visibly and emitted as
   *  dateModified, matching the convention used on the homepage and blog. */
  date: string;
  /** Human-readable form of `date`. */
  dateDisplay: string;
  /** Attribution shown beside the date and emitted as JSON-LD author. */
  author: string;
  /** What the engagement covers. Rendered as a list. */
  capabilities: string[];
  /** Slugs in portfolio/projects.ts that evidence this service. */
  evidence: string[];
  /** Technology names, aligned with the case-study `tech` vocabulary. */
  tech: string[];
};

export const services: Service[] = [
  {
    slug: "ai-foundation-models",
    title: "AI Foundation Models & Agent Systems",
    shortTitle: "AI Foundation Software",
    answer:
      "RECNOS builds AI foundation models and autonomous agent systems for enterprise automation. Work covers model selection and fine-tuning, multi-agent orchestration, persistent memory, and retrieval over a client's own corpus, delivered as a production service rather than a prototype.",
    summary:
      "Intelligent agent systems and foundation models for enterprise automation.",
    metaDescription:
      "RECNOS builds AI foundation models and autonomous agent systems: multi-agent orchestration, persistent memory, and retrieval over your own data.",
    date: "2026-10-15",
    dateDisplay: "15 October 2026",
    author: "The RECNOS Engineering Team",
    capabilities: [
      "Multi-agent orchestration with explicit task handoff between agents",
      "Persistent memory layers that retain context across sessions",
      "Retrieval over a client's own document corpus",
      "Model selection, evaluation, and fine-tuning against real task data",
      "Human-in-the-loop review before automated output is published",
      "Cost and latency budgeting for inference at production volume",
    ],
    evidence: ["rolit-ai"],
    tech: ["Python", "PyTorch", "TensorFlow", "AI/ML", "Node.js"],
  },
  {
    slug: "distributed-systems",
    title: "Distributed Systems & Backend Architecture",
    shortTitle: "Distributed Systems",
    answer:
      "RECNOS designs and builds distributed backend systems: microservices, event-driven architectures, and the data layers beneath them. Engagements cover schema design, service boundaries, caching, search indexing, and the operational work of running the result under production traffic.",
    summary:
      "Scalable backend architectures, microservices, and event-driven systems.",
    metaDescription:
      "Distributed systems engineering: microservices, event-driven architecture, search indexing, caching, and schema design built for production traffic.",
    date: "2026-10-15",
    dateDisplay: "15 October 2026",
    author: "The RECNOS Engineering Team",
    capabilities: [
      "Microservice decomposition and service-boundary design",
      "Event-driven architecture with asynchronous job processing",
      "Relational schema design and query optimisation",
      "Full-text and faceted search indexing over live inventory",
      "Caching layers and read-path optimisation",
      "Third-party API integration with token refresh and transparent retry",
    ],
    evidence: ["pg-marketplace-engine"],
    tech: ["Java", "Go", "Node.js", "PostgreSQL", "Kubernetes", "Docker"],
  },
  {
    slug: "devops-aiops",
    title: "DevOps & AIOps",
    shortTitle: "DevOps & AIOps",
    answer:
      "RECNOS sets up deployment automation and operational tooling: CI/CD pipelines, containerised environments, monitoring, and AI-assisted operations. The goal is a system a small team can deploy and observe without manual steps or guesswork.",
    summary: "Automated CI/CD pipelines, monitoring, and AI-driven operations.",
    metaDescription:
      "DevOps and AIOps: CI/CD pipelines, containerised deployments, monitoring, and AI-assisted operations for small engineering teams.",
    date: "2026-10-15",
    dateDisplay: "15 October 2026",
    author: "The RECNOS Engineering Team",
    capabilities: [
      "CI/CD pipelines with build, test, and deploy stages",
      "Containerised environments and orchestration",
      "Process management and zero-downtime restarts",
      "Reverse-proxy configuration and TLS certificate automation",
      "Monitoring, logging, and alerting",
      "AI-assisted anomaly detection over operational telemetry",
    ],
    evidence: ["pg-marketplace-engine", "mr-ads"],
    tech: ["Kubernetes", "Docker", "Nginx", "Node.js", "Java"],
  },
  {
    slug: "web-platforms",
    title: "SEO-Optimised Web Platforms",
    shortTitle: "Mobile & Web",
    answer:
      "RECNOS builds server-rendered web platforms and mobile applications. On the web side that means framework-level rendering decisions, structured data, sitemaps, and Core Web Vitals; on mobile it means native and cross-platform apps sharing the same backend.",
    summary:
      "High-performance iOS/Android apps and SEO-optimized web platforms.",
    metaDescription:
      "Server-rendered web platforms and mobile apps built for Core Web Vitals, structured data, and search visibility from the first release.",
    date: "2026-10-15",
    dateDisplay: "15 October 2026",
    author: "The RECNOS Engineering Team",
    capabilities: [
      "Server-rendered and statically prerendered web applications",
      "Framework-level SEO: metadata, canonicals, sitemaps, robots policy",
      "Structured data across multiple schema.org types",
      "Core Web Vitals work on real devices and networks",
      "Server-rendered first page with client-side infinite scroll",
      "Cross-platform mobile apps sharing a common backend",
    ],
    evidence: ["pg-marketplace-engine", "mr-ads"],
    tech: ["Next.js", "React", "Node.js", "PostgreSQL"],
  },
  {
    slug: "seo-aeo",
    title: "SEO & Answer Engine Optimisation",
    shortTitle: "SEO & AEO",
    answer:
      "RECNOS handles technical SEO and answer-engine optimisation: crawlability, structured data, internal linking, and content shaped so both Google and AI assistants can extract and cite it. Work is measured against indexation, rankings, and AI citation share rather than vanity metrics.",
    summary:
      "Search and answer-engine optimization to rank on Google and get cited by AI assistants.",
    metaDescription:
      "Technical SEO and answer-engine optimisation: crawlability, structured data, internal linking, and content built to be cited by AI assistants.",
    date: "2026-10-15",
    dateDisplay: "15 October 2026",
    author: "The RECNOS Engineering Team",
    capabilities: [
      "Crawlability audits: robots policy, sitemaps, canonical tags",
      "Structured data implementation and validation",
      "Programmatic page generation with publication rules",
      "Internal linking architecture and hub-and-spoke structure",
      "Answer-first content shaped for AI assistant extraction",
      "Indexation and ranking measurement over time",
    ],
    evidence: ["pg-marketplace-engine"],
    tech: ["Next.js", "Node.js"],
  },
  {
    slug: "product-design",
    title: "Product & UI/UX Design",
    shortTitle: "Figma & Product Design",
    answer:
      "RECNOS designs interfaces end to end in Figma: design systems, wireframes, and high-fidelity prototypes that hand off cleanly to engineering. Work covers information architecture, interaction design, and the component libraries that keep a product consistent as it grows.",
    summary:
      "End-to-end UI/UX design systems, wireframes, and high-fidelity prototypes in Figma.",
    metaDescription:
      "Product and UI/UX design in Figma: design systems, wireframes, high-fidelity prototypes, and component libraries that hand off to engineering.",
    date: "2026-10-15",
    dateDisplay: "15 October 2026",
    author: "The RECNOS Engineering Team",
    capabilities: [
      "Design systems and reusable component libraries",
      "Wireframes and information architecture",
      "High-fidelity interactive prototypes in Figma",
      "Motion and interaction design",
      "Accessibility-aware interface work",
      "Design-to-engineering handoff and review",
    ],
    evidence: ["mr-ads"],
    tech: ["Figma"],
  },
  {
    slug: "marketing",
    title: "Growth Marketing",
    shortTitle: "Marketing",
    answer:
      "RECNOS runs growth marketing: positioning, channel strategy, and campaign execution. The work connects to the same measurement stack as the product, so campaign performance is read from the same data as acquisition and retention rather than from a separate dashboard.",
    summary:
      "Growth strategy, brand positioning, and campaign execution across digital channels.",
    metaDescription:
      "Growth marketing from RECNOS: brand positioning, channel strategy, and campaign execution measured against acquisition and retention data.",
    date: "2026-10-15",
    dateDisplay: "15 October 2026",
    author: "The RECNOS Engineering Team",
    capabilities: [
      "Brand positioning and messaging",
      "Channel strategy across paid and organic",
      "Campaign execution and creative production",
      "Landing pages built for conversion",
      "Analytics and attribution setup",
      "Content programmes tied to search demand",
    ],
    evidence: ["mr-ads", "rolit-ai"],
    tech: [],
  },
  {
    slug: "content-production",
    title: "Daily Content & Video Production",
    shortTitle: "Daily Content & Video",
    answer:
      "RECNOS produces short-form video and written content on a daily cadence. The pipeline covers scripting, editing, publishing, and the distribution schedule, with an automated workflow where repeatable steps can be handed to an agent.",
    summary:
      "Consistent, high-quality short-form videos and content produced daily to grow your audience.",
    metaDescription:
      "Daily short-form video and content production: scripting, editing, publishing, and distribution on a repeatable schedule.",
    date: "2026-10-15",
    dateDisplay: "15 October 2026",
    author: "The RECNOS Engineering Team",
    capabilities: [
      "Daily short-form video production",
      "Scripting and storyboarding",
      "Editing, captions, and platform-specific formatting",
      "Publishing schedules across channels",
      "Written content alongside video",
      "Automated pipelines for repeatable production steps",
    ],
    evidence: ["rolit-ai"],
    tech: [],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

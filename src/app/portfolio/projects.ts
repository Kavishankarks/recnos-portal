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

/** A verified fact about the build, traced to a file in the client's repo. */
export type EvidenceItem = {
  title: string;
  detail: string;
};

/** One route/page in the shipped product. */
export type PageEntry = {
  path: string;
  summary: string;
};

export type Project = {
  /** URL segment for /portfolio/<slug>. Must be unique and stable. */
  slug: string;
  id: number;
  title: string;
  category: string;
  description: string;
  /**
   * Search-result snippet, 50–160 characters. Kept separate from `outcome`,
   * which is written as a full paragraph for the page body and overruns the
   * length a snippet is allowed.
   */
  metaDescription: string;
  /**
   * Self-contained answer to "what is this?", 60 words or fewer, opening the
   * page above `description`.
   *
   * Distinct from `description`: that field reads as a caption completing the
   * H1 ("Digital ad network operating…"), so it names no subject and answers
   * nothing on its own. This one states the entity. Every figure below is
   * traceable to the project's own `outcome` field and its cited source.
   */
  answer: string;
  tech: string[];
  impact: string;
  link: string;
  outcome: string;
  source?: ProjectSource;
  challenge: string;
  approach: string;
  /** Verified from the client's source tree. Rendered only when present. */
  stack?: { label: string; value: string }[];
  /** What the codebase actually contains, evidenced by file path. */
  engineering?: EvidenceItem[];
  /** The product's page inventory. */
  pages?: PageEntry[];
  /** Deliberate scope notes: what we did not build, so the page stays honest. */
  scopeNote?: string;
};

export const projects: Project[] = [
  {
    slug: "rolit-ai",
    id: 1,
    title: "Rolit AI - Making Content Creation Truly AI-Native",
    category: "AI",
    description:
      "From a feature-rich AI generator to the definitive go-to platform for creators — built on persistent creator memory, multi-agent orchestration, and proprietary style flywheels.",
    metaDescription:
      "How RECNOS built Rolit AI: an autonomous agent managing a brand's full marketing pipeline, on persistent creator memory and multi-agent orchestration.",
    answer:
      "Rolit AI is an autonomous agent that runs a brand's full marketing pipeline, from research through to ready-to-post content. It learns a brand's voice, style and identity from existing material. RECNOS built the platform on persistent creator memory, multi-agent orchestration and proprietary style flywheels.",
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
    metaDescription:
      "How RECNOS built Trovare: a real-time PG marketplace in Bangalore, with programmatic locality pages, geospatial search and Razorpay subscriptions.",
    answer:
      "Trovare is a real-time PG accommodation marketplace in Bangalore. It lists 500+ verified PGs across Koramangala, Indiranagar, HSR Layout and Whitefield, with no-broker owner contact. RECNOS built the platform as two applications on one API: a server-rendered public site with programmatically generated locality pages, and an authenticated owner and administrator app.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Vite", "Razorpay"],
    impact: "1000+ active monthly users",
    link: "https://trovare.in/",
    outcome:
      "Trovare publicly lists 500+ verified PG listings across Bangalore, covering Koramangala, Indiranagar, HSR Layout and Whitefield, with search near IT parks and no-broker direct owner contact. Source: trovare.in (retrieved 15 Oct 2026).",
    source: { label: "trovare.in", url: "https://trovare.in/" },
    challenge:
      "A PG marketplace competes for searches that are intensely local — \"PG in Koramangala\", \"girls PG near Whitefield\" — and there are thousands of such queries, each with too little inventory to justify a hand-written page. The platform also had to serve two very different audiences from one backend: renters browsing anonymously on a phone, and PG owners managing listings, subscriptions and leads behind a login. The hard constraint was publishing locality and intent pages at scale without generating thin, duplicated content that search engines would penalise, and without hand-maintaining a page per neighbourhood.",
    approach:
      "We split the product into two apps against one API: a server-rendered public site for renters, and a separate authenticated application for owners and administrators. The public site is where the interesting work sits. Locality and intent pages are generated programmatically from live inventory rather than authored, with publication rules encoded in the codebase: a page only becomes indexable once it clears a configurable minimum-listing threshold, and a filtered variant such as \"girls PG in Koramangala\" is only published when its result set is a materially distinct subset of the parent locality — otherwise it canonicalises to the parent and is left out of the sitemap entirely. That rule is what lets the site scale to thousands of pages without cannibalising its own rankings. Titles and descriptions use floor-rounded counts so a cached search snippet stays true as inventory changes, while structured data and page body carry the exact figure. Geospatial work runs through a Bangalore bounding box: addresses are geocoded only if they resolve inside it, and nearby-locality suggestions are ranked by haversine distance. On the owner side we built the full account system — one-time-password login, Google sign-in, multi-factor authentication for administrators, password reset, and subscription checkout through Razorpay — behind an HTTP client that transparently refreshes expired tokens and retries the original request once before redirecting to login.",
    stack: [
      { label: "Public site", value: "Next.js 16.3 (App Router, Turbopack)" },
      { label: "Owner app", value: "Vite 7 + React 19 SPA" },
      { label: "Language", value: "TypeScript 5 (strict)" },
      { label: "Styling", value: "Plain CSS, no framework" },
      { label: "Payments", value: "Razorpay subscription checkout" },
      { label: "Hosting", value: "Self-hosted nginx, API on a separate service" },
    ],
    engineering: [
      {
        title: "Programmatic locality and intent pages with publication rules",
        detail:
          "Pages are generated from live inventory for four intents — PG, boys, girls and co-living — across each city and locality. A configurable threshold (default three active listings) gates publication, and a filtered intent page is published only when its count is both above the threshold and genuinely smaller than the parent locality's, so a \"girls PG\" page for a locality that is entirely girls' PGs collapses into the parent instead of competing with it.",
      },
      {
        title: "Snippet-stable counts",
        detail:
          "Titles and descriptions round counts down to a stable bucket — exact below ten, then to the nearest ten, then the nearest hundred — so \"47 PGs\" becomes \"40+\" and a cached search result stays truthful as listings are added and removed. Structured data and body copy keep the precise number.",
      },
      {
        title: "Bounding-box geocoding",
        detail:
          "Address geocoding is constrained to a Bangalore bounding box and rejects city-level partial matches, so an ambiguous address cannot silently place a listing in the wrong part of the city. Results are cached for thirty days. Locality suggestions are ranked by haversine distance from the current listing.",
      },
      {
        title: "Nine structured-data types across the catalogue",
        detail:
          "Search results, listing pages, locality pages, blogs and breadcrumbs each emit appropriate schema — including lodging and apartment-complex markup with per-room pricing offers, FAQ markup on locality pages, and aggregate price ranges on collection pages — so both search engines and AI answer engines can read inventory directly.",
      },
      {
        title: "Sitemaps generated from live inventory",
        detail:
          "A sitemap index fans out into separate city, property and blog sitemaps, each generated on request from the API and filtered by the same publication rules as the pages themselves, so unlisted or below-threshold pages never enter the index.",
      },
      {
        title: "Token refresh with transparent retry",
        detail:
          "The owner application's HTTP client attaches credentials to every request and, on a 401, refreshes the token and replays the original request once before clearing the session and returning the user to login. Error handling normalises server, network and validation failures into a single shape for the UI.",
      },
      {
        title: "Full owner and administrator account system",
        detail:
          "One-time-password login for owners and users, Google sign-in with account linking, multi-factor authentication for administrators, password reset and email verification, plus subscription checkout and payment history. The admin surface covers listing approval, owner management, featured placement and payment reporting.",
      },
      {
        title: "Server-rendered first page with client-side infinite scroll",
        detail:
          "Search and listing pages server-render their first page of results for fast first paint and crawlable content, then continue loading subsequent pages through an intersection observer as the visitor scrolls, rather than paginating through numbered pages.",
      },
    ],
    pages: [
      { path: "/", summary: "Homepage — featured and finest listings, popular localities and tech parks, blog highlights." },
      { path: "/properties", summary: "All-properties grid; first page server-rendered, further pages load on scroll." },
      { path: "/property/pg/[slug]", summary: "Listing detail — rooms and pricing, amenities, food plans, house rules, photos, map, nearby PGs, and generated FAQs." },
      { path: "/search", summary: "Search with budget, gender and sort filters over server-fetched results." },
      { path: "/search/[place]", summary: "Search scoped to a named place, resolved from a curated Bangalore place list." },
      { path: "/pg-in-[city]", summary: "Programmatic city page listing PGs in that city." },
      { path: "/pg-in-[city]/[locality]", summary: "Programmatic locality page, published once it clears the listing threshold." },
      { path: "/boys-pg-in-[city]/[locality]", summary: "Gender-filtered locality page, published only when materially distinct from its parent." },
      { path: "/girls-pg-in-[city]/[locality]", summary: "Gender-filtered locality page, same publication rule." },
      { path: "/coliving-pg-in-[city]/[locality]", summary: "Co-living locality page, same publication rule." },
      { path: "/finestProperties", summary: "Curated finest-properties collection." },
      { path: "/finest_pgs/[id]", summary: "Finest-property detail with image gallery and owner contact." },
      { path: "/blogs", summary: "Blog index across seven categories." },
      { path: "/blogs/[slug]", summary: "Blog article page." },
      { path: "/dashboard", summary: "Owner dashboard — listing status, notifications and overview (authenticated)." },
      { path: "/create_pg", summary: "Multi-step PG listing wizard: details, amenities, photos, pricing, review (authenticated)." },
      { path: "/pg/[id]/leads", summary: "Per-listing lead management (authenticated)." },
      { path: "/subscription", summary: "Subscription plan selection and Razorpay checkout (authenticated)." },
      { path: "/payments", summary: "Owner payment history (authenticated)." },
      { path: "/admin/approval", summary: "Listing approval queue (administrator)." },
      { path: "/admin/pgs", summary: "Listing table with server-side filters (administrator)." },
      { path: "/admin/owners", summary: "Owner management (administrator)." },
      { path: "/admin/payments", summary: "Payment reporting (administrator)." },
      { path: "/admin/featured", summary: "Featured-placement management (administrator)." },
    ],
    scopeNote:
      "Two apps share one API: a server-rendered public site and a separate authenticated owner/administrator application. Listing counts on the site are partly hardcoded in page metadata while the platform's own count endpoint returns live figures — a known inconsistency between the two sources. This work covers the front-end applications and their SEO, search and account systems; the backend API is a separate codebase and is out of scope for this case study.",
  },
  {
    slug: "mr-ads",
    id: 7,
    title: "Mr. Ads - In-Restaurant Digital Signage Network",
    category: "Marketing",
    description:
      "Digital ad network operating high-definition display hardware in dining venues across Bengaluru with scheduled content rotation.",
    metaDescription:
      "How RECNOS built Mr. Ads: a statically-rendered site for a Bengaluru digital signage network, covering eight venue types with no CMS or database.",
    answer:
      "Mr. Ads operates an in-restaurant digital signage network across Bengaluru. The network publishes coverage across eight venue types — 2,400+ screens in restaurants and bistros, 1,100+ in residential apartments, 420+ in corporate tech parks, 310+ in fitness centres, 180+ in PG and student hostels, 85+ mall properties and 60+ play zones, roughly 4,555 screens in total. RECNOS built the network's public site as a statically-rendered Next.js application covering all eight environments.",
    tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS"],
    impact: "High-density venue visibility network",
    link: "https://mr-ads.in/",
    outcome:
      "The network publishes its own venue coverage: 2,400+ screens in restaurants and bistros, 1,100+ in residential apartments, 420+ corporate tech parks, 310+ fitness centres, 180+ PG and student hostels, 85+ mall properties and 60+ play zones, across 8 ad environments. Source: mr-ads.in (retrieved 15 Oct 2026).",
    source: { label: "mr-ads.in", url: "https://mr-ads.in/" },
    challenge:
      "A media network with eight distinct venue types needed a single public site that could present each environment credibly — different screen sizes, different dwell times, different audiences — while giving advertisers a way to build a media plan and reach the sales team. The site also had to stay fast and legible on the phones that prospective advertisers actually browse on, and it had to run without a CMS or a database.",
    approach:
      "We built it as a statically-rendered Next.js App Router site, so every route ships as pre-rendered HTML with no runtime data layer to operate. Venue coverage, screen specifications and pricing bands are modelled as typed data modules rather than hardcoded into markup, which keeps the eight venue environments consistent across pages and makes the figures auditable in one place. The interaction layer is hand-built: a scroll-reveal engine and a number-animation component, both written directly against IntersectionObserver rather than pulled from an animation library, with a prefers-reduced-motion path in both the CSS and the JavaScript so the site degrades properly for visitors who ask for less motion. The media-plan builder on the pricing page collects campaign parameters client-side and hands them to the contact page through URL parameters — a deliberate choice that keeps the flow working with no backend.",
    stack: [
      { label: "Framework", value: "Next.js 15.5 (App Router)" },
      { label: "UI", value: "React 19.0.3 + TypeScript 5" },
      { label: "Styling", value: "Tailwind CSS 3.4" },
      { label: "Rendering", value: "Static pre-render, no runtime data layer" },
      { label: "Animation", value: "Hand-written CSS keyframes + IntersectionObserver" },
      { label: "Hosting", value: "Self-hosted Node on nginx, PM2-managed" },
    ],
    engineering: [
      {
        title: "Scroll-reveal engine written against IntersectionObserver",
        detail:
          "A 173-line reveal component that tracks which edge an element left the viewport by and re-arms with the opposite entry vector, so content animates correctly whether you scroll up or down. Six variants, compound stagger delays, and a reduced-motion short-circuit that skips the animation entirely.",
      },
      {
        title: "Number animation that survives real formatting",
        detail:
          "The count-up component splits a display string into prefix, number and suffix with a regex before animating, so a figure like \"2,400+\" counts up correctly and keeps its comma grouping and trailing plus. Driven by requestAnimationFrame with cubic ease-out, triggered on scroll into view.",
      },
      {
        title: "Motion accessibility handled in two layers",
        detail:
          "A prefers-reduced-motion block in the stylesheet disables fourteen animation classes, and both interactive components independently check the same media query in JavaScript. Visitors who request reduced motion get a static page, not a broken one.",
      },
      {
        title: "Typed content model for eight venue environments",
        detail:
          "Venue coverage, screen specifications, slot durations and pricing bands live in typed data modules consumed by the page components. The eight environments stay consistent across pages, and every published figure can be traced to one file.",
      },
      {
        title: "Font and structured-data setup",
        detail:
          "Self-hosted font loading through next/font with display swap, plus LocalBusiness structured data emitted from the root layout so search engines and answer engines can read the network's name, contact details and service area.",
      },
    ],
    pages: [
      { path: "/", summary: "Homepage — hero with network trust figures, venue presence grid, advantages, digital signage detail, closing call to action." },
      { path: "/locations", summary: "The eight venue environments with placement detail and a network-coverage stat grid." },
      { path: "/solutions", summary: "Service pillars with per-service metrics and feature detail." },
      { path: "/pricing", summary: "Interactive media-plan builder: channel selection, duration and budget bands, handed to contact as URL parameters." },
      { path: "/contact", summary: "Lead form with reference generation and prefill from the media-plan builder." },
      { path: "/digital", summary: "Digital signage service page." },
      { path: "/offline-print", summary: "Offline and print advertising service page." },
      { path: "/print-creative", summary: "Print creative production service page." },
      { path: "/advertising-on-the-move", summary: "Transit and moving-media advertising service page." },
      { path: "/about", summary: "Company background." },
    ],
    scopeNote:
      "This site is a marketing and media-plan surface, not the ad-serving platform. It has no database, no CMS and no API layer by design — the network's display hardware and scheduling run outside this codebase. Venue coverage figures are the network's own published numbers, reproduced here as the client states them; they are the client's figures, not RECNOS measurements.",
  },
];

export const categories = [
  "All",
  "AI",
  "Distributed Systems",
  "Marketing",
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

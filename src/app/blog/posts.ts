/**
 * Single source of truth for engineering notes.
 *
 * These posts are written from the verified technical inventories in
 * `.research/`, which record findings against file paths and line numbers in
 * two client codebases. That shapes the writing: every claim here is something
 * that was read in source, and where the source shows a mock, a stub, or dead
 * code, the post says so rather than describing it as a feature.
 *
 * `takeaway` is the answer-first paragraph rendered directly under the H1. It
 * states the finding in 60 words or fewer so the page stands alone for a reader
 * or an answer engine arriving without the heading above it.
 *
 * `sections` are rendered in order. A `code` block is optional and is used for
 * short, illustrative snippets — never for a whole file.
 */

export type PostSection = {
  heading: string;
  paragraphs: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
  /** Optional short code sample rendered in a `<pre>`. */
  code?: string;
};

export type Post = {
  /** URL segment for /blog/<slug>. Must be unique and stable. */
  slug: string;
  title: string;
  /** Search-result snippet, 50–160 characters. */
  metaDescription: string;
  /** Self-contained answer to "what is this?", 60 words or fewer. */
  takeaway: string;
  /** ISO date, also rendered visibly and emitted as datePublished. */
  date: string;
  /** Human-readable form of `date`. */
  dateDisplay: string;
  author: string;
  /** Short topic label shown as a badge. */
  topic: string;
  /** Slugs in portfolio/projects.ts this note draws on. */
  relatedProjects: string[];
  sections: PostSection[];
};

export const posts: Post[] = [
  {
    slug: "gating-programmatic-pages-on-real-inventory",
    title:
      "Gating Programmatic Pages on Real Inventory, Not Keyword Volume",
    metaDescription:
      "How a Bangalore PG marketplace publishes locality and intent pages only when the underlying listing count justifies them, and canonicalises the rest.",
    takeaway:
      "A programmatic SEO layer generates thousands of locality and intent URLs from a fixed template. Publishing all of them produces thin, near-duplicate pages. This build gates every page on live listing counts and canonicalises the ones that fail, so only pages with distinct inventory become indexable.",
    date: "2026-10-16",
    dateDisplay: "16 October 2026",
    author: "The RECNOS Engineering Team",
    topic: "Technical SEO",
    relatedProjects: ["pg-marketplace-engine"],
    sections: [
      {
        heading: "The problem with a template that scales",
        paragraphs: [
          "A rental marketplace has an obvious programmatic opportunity. For every locality, you can generate a page for the locality itself and for each intent within it — PGs, boys' PGs, girls' PGs, co-living. Multiply by every city and locality and you have thousands of URLs from one component.",
          "The failure mode is well known. Most of those pages have nothing to say. A locality with two listings and a locality with two hundred produce the same page structure, the same boilerplate FAQ, and nearly the same text. Search engines classify the result as thin or duplicate content, and the whole set underperforms — including the pages that were genuinely good.",
          "The usual advice is to publish everything and let the crawler sort it out. This build takes the opposite position: a page is only worth publishing when the data behind it justifies the page.",
        ],
      },
      {
        heading: "A publication threshold, tuned by environment",
        paragraphs: [
          "The gating logic lives in a single module and reduces to one predicate. A locality is published when its active listing count clears a minimum, and that minimum is read from the environment rather than hardcoded — so the threshold can be raised or lowered per deployment without a code change.",
        ],
        code: `const MIN_LISTINGS = Number(process.env.GEO_MIN_LISTINGS ?? 3);

const isLocalityPublished = (l: GeoLocality) =>
  l.active_count >= MIN_LISTINGS;`,
      },
      {
        heading: "Intent pages have a stricter rule",
        paragraphs: [
          "Locality pages only need enough inventory. Intent pages need something more: they must be materially different from the parent locality page they sit under.",
          "The check compares the intent's own count against the locality's total. An intent page becomes indexable only when its subset is smaller than the whole but still clears the minimum. If every listing in a locality is a boys' PG, then a boys' PG page for that locality contains exactly the same inventory as the locality page — so it canonicalises to the parent instead of competing with it.",
        ],
        code: `const isIntentDistinct = (intent: GeoIntent, l: GeoLocality) => {
  const count = INTENTS[intent].count(l);
  return count >= MIN_LISTINGS && count < l.active_count;
};`,
      },
      {
        heading: "Counts that stay true after caching",
        paragraphs: [
          "Displayed counts are a smaller problem with the same shape. A page that says \"37 PGs in Koramangala\" becomes wrong the moment a listing is added or removed, and the wrong number persists in search snippets long after the page itself is regenerated.",
          "The fix is to floor counts into stable buckets: exact below ten, then to the nearest ten, then to the nearest hundred. A bucket changes far less often than the underlying number, so the sentence stays true across a wider window of inventory churn.",
        ],
        bullets: [
          "Exact count below 10",
          "Nearest 10 for counts below 100, rendered as \"40+\"",
          "Nearest 100 above that, rendered as \"500+\"",
        ],
      },
      {
        heading: "Canonicalisation is conditional, not static",
        paragraphs: [
          "The two rules combine into the canonical logic. A published locality page is self-canonical. An intent page is self-canonical only when it passes the distinctness check; otherwise it points at its parent. Nothing is deleted and nothing returns a 404 — the pages still exist for users who navigate to them, they simply do not compete for the same query.",
          "This is the part that matters most. The common failure in programmatic SEO is not generating too many pages, it is telling a search engine that thousands of near-identical pages are all distinct destinations.",
        ],
      },
      {
        heading: "What this approach costs",
        paragraphs: [
          "It is more work than publishing everything, and it is less impressive as a number. A deployment with a low threshold may publish a few hundred pages rather than a few thousand.",
          "The trade is deliberate. Every published page has inventory behind it, the canonical graph is honest, and the crawl budget is spent on pages that can actually rank. As inventory grows, the same predicate publishes more pages automatically — the threshold is the control, and it is a one-line change.",
        ],
      },
    ],
  },
  {
    slug: "geocoding-with-a-bounding-box",
    title: "Geocoding With a Bounding Box So Bad Matches Fail Safely",
    metaDescription:
      "A geocoder that rejects partial matches and out-of-bounds coordinates, returning null instead of a plausible wrong location.",
    takeaway:
      "Geocoding APIs will happily return a result for almost any query, including city-level matches for a neighbourhood and coordinates in the wrong state. This build constrains the lookup to a bounding box and rejects partial matches, so an unresolvable place returns nothing rather than a wrong location.",
    date: "2026-10-16",
    dateDisplay: "16 October 2026",
    author: "The RECNOS Engineering Team",
    topic: "Backend",
    relatedProjects: ["pg-marketplace-engine"],
    sections: [
      {
        heading: "The failure mode is a plausible wrong answer",
        paragraphs: [
          "A geocoder that returns a result for every query is worse than one that sometimes returns nothing. Given an ambiguous locality name, the API returns the most likely match — which may be a different city entirely, or a city-level centroid standing in for a neighbourhood.",
          "Downstream, that coordinate is used to compute distances and find nearby places. A wrong coordinate does not throw an error. It silently produces a list of nearby localities on the other side of the country.",
        ],
      },
      {
        heading: "Constrain the search area",
        paragraphs: [
          "The lookup is bounded to a rectangle around the service area. Coordinates are passed as `bounds`, along with `region` and a country component, so the API ranks results inside the area first.",
          "The result is then checked against the same box in code. A coordinate outside the rectangle is discarded even though the API considered it a valid answer.",
        ],
        code: `const BBOX = { south: 12.7, west: 77.35, north: 13.25, east: 77.85 };`,
      },
      {
        heading: "Reject partial matches at the wrong granularity",
        paragraphs: [
          "The API flags approximate matches with `partial_match`. That flag alone is not enough to reject on — some partial matches are useful. The check that matters is the combination: a partial match whose result types include a locality or an administrative area means the geocoder fell back to a coarser answer than the one requested.",
          "A neighbourhood query that resolves to a city centroid is exactly the case that produces a plausible but wrong coordinate, so it is rejected.",
        ],
      },
      {
        heading: "Return null, never throw",
        paragraphs: [
          "Every failure path returns `null`: no API key, empty input text, a partial match at the wrong granularity, or a coordinate outside the bounding box. No branch throws.",
          "That choice pushes the handling to the caller, which is where the decision belongs. A locality with no coordinate still renders; it simply does not participate in distance sorting, and the sort falls back to list order.",
        ],
      },
      {
        heading: "Cache on the right assumption",
        paragraphs: [
          "Results are cached for 30 days, on the reasoning that a place's coordinates do not move. That is a different assumption from the one you would make for a price or a listing count, and it is worth stating explicitly because it justifies a much longer window than most cached data would get.",
          "The bounding box is a constant in the source rather than configuration. That is correct while the product serves one city, and would need to become per-region data before a second city is added.",
        ],
      },
    ],
  },
  {
    slug: "what-an-seo-audit-of-a-real-codebase-found",
    title: "What a File-by-File SEO Audit of a Real Codebase Found",
    metaDescription:
      "Structured data, conditional canonicals, sitemap index handlers, and dynamic OG images in a production Next.js marketplace.",
    takeaway:
      "An SEO audit that stops at meta tags misses most of what matters. Reading the source of a production Next.js marketplace turned up nine schema types, a sitemap index over three hand-rolled XML handlers, conditional canonicals, and a backend quirk that forced a pagination workaround.",
    date: "2026-10-16",
    dateDisplay: "16 October 2026",
    author: "The RECNOS Engineering Team",
    topic: "Technical SEO",
    relatedProjects: ["pg-marketplace-engine"],
    sections: [
      {
        heading: "Structured data as a set, not a tag",
        paragraphs: [
          "The usual audit checks whether a page has JSON-LD. The more useful question is whether the types chosen describe what the page actually is, and whether they connect to each other.",
          "This build emits nine distinct types across the site. The interesting part is the specificity: a listing page is a `LodgingBusiness` combined with `ApartmentComplex`, carrying a postal address, coordinates, a map link, a price range, and per-room offers with a unit price specification and a monthly lease business function. That is a description of a real rental listing, not a generic `Product`.",
        ],
        bullets: [
          "`WebSite` with a `SearchAction` on the homepage",
          "`ItemList` on listing and search pages",
          "`LodgingBusiness` + `ApartmentComplex` with per-room `Offer` on detail pages",
          "`FAQPage` generated from the same content the page displays",
          "`CollectionPage` with a conditional `AggregateOffer` on geo pages",
          "`BreadcrumbList` on detail pages",
        ],
      },
      {
        heading: "The AggregateOffer is conditional for a reason",
        paragraphs: [
          "A price range in structured data is a claim that listings exist at those prices. The geo collection pages therefore only attach an `AggregateOffer` when the count is above zero and both a low and a high price are actually known.",
          "Omitting the node when the data is absent is the correct behaviour. An empty price range is not neutral — it is a structured-data claim that the page has no inventory, or a fabricated range if it is hardcoded.",
        ],
      },
      {
        heading: "A sitemap index over hand-rolled handlers",
        paragraphs: [
          "Rather than one sitemap, this build serves an index over three route handlers: cities, properties, and blogs. The cities handler filters to published localities and distinct intents, reusing the same predicates that gate the pages themselves — so the sitemap can never advertise a URL the gating logic would canonicalise away.",
          "The properties handler exposed a genuine backend constraint. The API endpoint it reads from does not populate a total page count, so the handler cannot know how many pages exist. It paginates by detecting a short page instead — reading until a page comes back with fewer items than the requested size.",
        ],
        code: `// The backend does not return totalPages, so paginate by
// page-size shortfall rather than by a known total.`,
      },
      {
        heading: "Dynamic OG images carrying live data",
        paragraphs: [
          "Three `opengraph-image` handlers generate 1200×630 PNGs at request time. The listing pages use the listing's own cover photo as the background. The locality pages render the live listing count into the card.",
          "This is a small detail with an outsized effect on click-through. A shared link shows the actual number of PGs in that locality rather than a static brand image, which is the difference between a link that looks generated and one that looks current.",
        ],
      },
      {
        heading: "The audit's most useful output was a list of mocks",
        paragraphs: [
          "The single most valuable section of the audit was not the list of what worked. It was the register of what did not: a submission handler that is a no-op returning success, hardcoded development credentials with a deprecation marker, a placeholder image host in a fallback path, and demo payload files.",
          "None of those are visible from the outside. All of them would be misdescribed by anyone writing up the project from its marketing copy. An audit that only records achievements produces a document that cannot be trusted on the parts that matter.",
        ],
      },
    ],
  },
  {
    slug: "dead-code-in-a-shipped-frontend",
    title: "Dead Code in a Shipped Frontend: What Survives and Why",
    metaDescription:
      "An interactive signage subsystem with no importers, a memoised image component nobody uses, and declared dependencies with zero imports.",
    takeaway:
      "A production frontend contained a 472-line interactive signage board that no route mounts, a carefully built image component with no importers, and three declared dependencies never imported. None of it breaks the build, which is exactly why it survived.",
    date: "2026-10-16",
    dateDisplay: "16 October 2026",
    author: "The RECNOS Engineering Team",
    topic: "Frontend",
    relatedProjects: ["mr-ads"],
    sections: [
      {
        heading: "The largest component in the repo is unreachable",
        paragraphs: [
          "A 472-line client component implements a full signage playlist: a state machine over a campaign array, category filtering with index wrapping, preloading of the next creative, a two-layer crossfade between an active and a pre-buffered layer, and an operator drawer that appends new campaigns to local state.",
          "It is imported by exactly one section component, which is itself imported by nothing. The whole subsystem is unreachable from every route in the application.",
          "This matters for how the project gets described. A write-up based on the file tree would call this a digital signage control plane. Based on the routing graph, it is an interactive demo that no user can reach.",
        ],
      },
      {
        heading: "Real interaction, mock content",
        paragraphs: [
          "The distinction between working code and real data is the one that gets lost. The playlist logic genuinely works — the crossfade, the preloading, the filtering all function client-side.",
          "The content does not. Campaigns are seeded from a constant explicitly named `SAMPLE_CAMPAIGNS`, the brands are fictional, and the images are remote stock URLs. Labels like \"Operator CMS\" and \"Live Dispatch\" are text over local array state: there is no CMS, no backend, no scheduling, and no device registry. Reloading the page discards any campaign an operator adds.",
        ],
      },
      {
        heading: "A carefully built component with no callers",
        paragraphs: [
          "One image component is memo-wrapped, defaults its quality, defaults to lazy loading, falls back to a placeholder on error, and automatically marks external URLs as unoptimized to bypass the image optimiser. It is a thoughtful piece of work.",
          "It has no importers outside itself. Every image in the application goes through `next/image` directly, and the wrapper's fallback and quality defaults are simply not in the render path.",
          "Unused code is not free even when it is correct. It appears in review, it is counted as coverage, and it misleads anyone assessing what the product does.",
        ],
      },
      {
        heading: "Dependencies declared and never imported",
        paragraphs: [
          "Three runtime dependencies are declared and imported nowhere in the source. One of them is still listed in a build-tool chunking configuration, which means the build expects a package the code never uses.",
          "There is also a single undeclared import: a component imports from a bare package that is not in the dependency list and resolves only because another declared package depends on it transitively. That works until the transitive dependency changes, at which point the build breaks for a reason unrelated to the change.",
        ],
        bullets: [
          "A document-generation library: declared, zero imports",
          "A sticky-element library: declared, zero imports",
          "An autocomplete library: declared, zero imports, still referenced in build config",
          "A bare router import: used, undeclared, resolving transitively",
        ],
      },
      {
        heading: "A hardcoded timezone label",
        paragraphs: [
          "The signage clock formats the current time with an `en-US` locale and appends the string \" IST\". It does not convert to India time. It displays the viewer's local time with a timezone label that is wrong for almost every viewer.",
          "This is a one-line bug, but it is the kind that survives precisely because the surrounding feature is unreachable. Nobody sees the clock, so nobody reports it. The fix belongs with the decision about whether the subsystem ships at all.",
        ],
      },
      {
        heading: "Why this accumulates",
        paragraphs: [
          "None of this fails a build or a type check. Unused files compile, unused dependencies install, and unreachable components still type-check. That is why the state persists — there is no signal that anything is wrong.",
          "The countermeasure is a check rather than a cleanup. An import-graph assertion that every component has at least one caller, and a dependency check that every declared package is imported, both turn silent accumulation into a failing build. A one-off deletion fixes today; the check fixes the pattern.",
        ],
      },
    ],
  },
  {
    slug: "client-side-seo-tags-are-invisible",
    title: "Client-Injected SEO Tags Are Absent From the HTML",
    metaDescription:
      "Why react-helmet metadata is missing from server-delivered HTML, and what that means for crawlers and social unfurls.",
    takeaway:
      "A React SPA that sets its meta tags with a client-side head manager delivers HTML with no title, no description, and no Open Graph tags. The tags appear only after JavaScript runs. Anything that reads the response without executing scripts sees an untitled page.",
    date: "2026-10-16",
    dateDisplay: "16 October 2026",
    author: "The RECNOS Engineering Team",
    topic: "Technical SEO",
    relatedProjects: ["pg-marketplace-engine"],
    sections: [
      {
        heading: "The tags are real, just late",
        paragraphs: [
          "A client-side head manager is not broken. It sets the document title, the description, and the Open Graph tags correctly, and a browser running the application sees all of them.",
          "The problem is what arrives over the wire. The server returns a minimal HTML shell with a root element and a script tag. Every meta tag is injected by React after the bundle executes.",
        ],
      },
      {
        heading: "What does not execute JavaScript",
        paragraphs: [
          "Several classes of consumer read the raw response and stop there. For all of them, the page has no title and no description — a link shared to a messaging app previews as a bare URL rather than a card.",
        ],
        bullets: [
          "Social unfurlers, which generate link previews from the initial HTML",
          "Crawlers that fetch the response without rendering it",
          "Any client without JavaScript enabled",
          "Tools that inspect a URL's metadata, including most link checkers",
        ],
      },
      {
        heading: "Rendering crawlers mostly cope, and that is the trap",
        paragraphs: [
          "Major search engines do execute JavaScript, so the tags are eventually seen. This is why the problem goes unnoticed: a site check in a browser-based tool shows everything working.",
          "The costs are less visible than a missing title but real. JavaScript rendering is deferred, sometimes to a second pass, so indexing is slower and less predictable. Anything that fails during rendering — a blocked script, a runtime error, a timeout — leaves the page indexed without its metadata.",
        ],
      },
      {
        heading: "The fix is to move the tags server-side",
        paragraphs: [
          "The reliable fix is to emit the tags in the server response rather than injecting them. In a React SPA that means rendering the head on the server or prerendering the routes, so the title and description are in the HTML the server returns.",
          "The project had both patterns in the same repository: an authenticated application using client-side injection, and a public site on a server-rendering framework emitting its metadata per route. The public surface — the one that needs to be crawled — was the one that had it right.",
        ],
      },
      {
        heading: "How to check it yourself",
        paragraphs: [
          "Fetch the page and look at the response without running scripts. If the title and description are not there, neither are they there for anything that does not execute JavaScript.",
        ],
        code: `curl -s https://example.com/page | grep -i '<title>\\|og:title'`,
      },
    ],
  },
  {
    slug: "responsive-images-and-the-problems-beside-them",
    title: "Responsive Images Done Right, Beside the Problems Next to Them",
    metaDescription:
      "Correct next/image sizing and caching in a production build, alongside dual font loading, a CDN icon dependency, and unoptimised images.",
    takeaway:
      "A production frontend got its responsive images right — explicit sizes, priority hints, preloading of the next slide — while loading fonts through two mechanisms and depending on an external icon CDN. The image work is worth copying; the rest is worth auditing.",
    date: "2026-10-16",
    dateDisplay: "16 October 2026",
    author: "The RECNOS Engineering Team",
    topic: "Performance",
    relatedProjects: ["mr-ads"],
    sections: [
      {
        heading: "The sizing attribute that prevents the wrong download",
        paragraphs: [
          "An image with `fill` and no `sizes` attribute forces the browser to assume the image spans the full viewport. It then downloads the largest candidate in the source set — often a file several times larger than the space it occupies.",
          "This build sets an explicit `sizes` value describing the actual rendered width at three breakpoints, so the browser picks the correct candidate for the viewport.",
        ],
        code: `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"`,
      },
      {
        heading: "Priority hints on the first slide only",
        paragraphs: [
          "The first two slides carry a priority hint, and the rest do not. That is the right shape for a carousel: the initially visible creative should not be lazy-loaded, and the third slide should not compete with it for bandwidth.",
          "The next image is also preloaded manually before the transition begins, so the crossfade does not stall on a network request. The combination — eager for what is visible, preload for what is next, lazy for everything else — is the pattern worth reusing.",
        ],
      },
      {
        heading: "Two font-loading mechanisms in one document",
        paragraphs: [
          "The layout loads two families through the framework's font pipeline, which self-hosts them, generates the `@font-face` rules, and applies `display: swap` with CSS variables. That is the recommended approach and it is implemented correctly.",
          "The same document then adds a raw stylesheet link for four more families from Google's CDN. Two mechanisms means two request paths, two caching stories, and a render-blocking stylesheet that the self-hosted fonts were meant to avoid. Preconnect hints are set for both hosts, which reduces the cost without removing the dependency.",
        ],
      },
      {
        heading: "An icon CDN in the critical path",
        paragraphs: [
          "A third-party icon stylesheet is loaded from a public CDN, and icon classes are used in component markup. This puts a third-party origin in the render path for a handful of glyphs.",
          "The dependency is also a correctness risk. A stylesheet that fails to load leaves empty boxes where icons should be, with no fallback, because the markup relies on classes rather than inline SVG.",
        ],
      },
      {
        heading: "One image bypassing the optimiser",
        paragraphs: [
          "One component uses a plain `img` element where the rest of the codebase uses the framework's image component. That image gets no resizing, no format conversion, and no responsive source set — it is served at its original size to every viewport.",
          "The project's own wrapper component handles external URLs by marking them unoptimized deliberately. The difference is that the wrapper makes that decision explicitly and applies a fallback; the plain element makes it by omission.",
        ],
      },
      {
        heading: "What to take from this",
        paragraphs: [
          "Performance work is rarely uniformly good or bad. The image handling here is careful and specific: correct sizing, deliberate priority, manual preloading, and a cache policy set at both the framework and the reverse-proxy layer.",
          "The remaining issues are all the same kind — a second way of doing something that was already solved, which adds a dependency without adding a capability. Auditing for duplicates tends to find more than auditing for omissions.",
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Newest first, which is the order the hub renders. */
export const postsByDate = [...posts].sort((a, b) =>
  a.date < b.date ? 1 : -1
);

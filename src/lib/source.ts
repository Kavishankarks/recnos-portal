import { defineDocs } from "fumadocs-mdx/macro";
import { llms, loader } from "fumadocs-core/source";

const docs = defineDocs({
  dir: "content/docs",
  docs: {
    // Keeps a plain-markdown rendering of every page for llms.txt and the per-page .md routes.
    postprocess: { includeProcessedMarkdown: true },
  },
});

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});

const SITE_ORIGIN = "https://recnos.com";

/** Agents fetch these files out of context, so site-relative links are made absolute. */
export const absolutize = (markdown: string) => markdown.replace(/\]\(\//g, `](${SITE_ORIGIN}/`);

export const docsLlms = llms(source, {
  renderPage: async (page) => `# ${page.data.title} (${SITE_ORIGIN}${page.url})

${await page.data.getText("processed")}`,
});

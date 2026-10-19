import type { InferPageType } from "fumadocs-core/source";
import type { source } from "@/lib/source";

/** The plain-markdown twin of a docs page, for AI agents and the page actions. */
export function getPageMarkdownUrl(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "content.md"];
  return {
    segments,
    url: `/llms.mdx/docs/${segments.join("/")}`,
  };
}

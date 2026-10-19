import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const config = {
  output: "standalone",
  async rewrites() {
    return [
      // /docs/<page>.md serves the page as plain markdown for AI agents.
      { source: "/docs/:slug*.md", destination: "/llms.mdx/docs/:slug*/content.md" },
    ];
  },
};

const withMDX = createMDX();

export default withMDX(config);

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /**
         * The Synapse case study links out to this host, so crawlers reach it
         * from recnos.com. It is a separate application with no title and no
         * H1, and indexing it puts an untitled page into the same domain as
         * this one.
         */
        disallow: "https://synapse.recnos.com/",
      },
    ],
    sitemap: "https://recnos.com/sitemap.xml",
    host: "https://recnos.com",
  };
}

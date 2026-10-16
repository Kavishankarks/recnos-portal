import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /**
         * The Synapse case study links out to `synapse.recnos.com`, a separate
         * application with no title and no H1. It cannot be excluded from this
         * file: `Disallow` matches a path on the host serving the robots.txt,
         * so a rule here can never reach another subdomain. That host must
         * serve its own `Disallow: /` (or a `noindex`) instead.
         */
      },
    ],
    sitemap: "https://recnos.com/sitemap.xml",
    host: "https://recnos.com",
  };
}

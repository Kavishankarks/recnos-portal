import type { MetadataRoute } from "next";
import { projects } from "./portfolio/projects";

/**
 * Only pages served by this application belong here. A subdomain such as
 * `synapse.recnos.com` is a separate host with its own document root, so
 * listing it in this sitemap claims a URL the app does not serve — and when
 * that host's markup is thinner than this one's, the sitemap is advertising
 * the weakest page on the domain.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-15");

  return [
    {
      url: "https://recnos.com/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://recnos.com/portfolio",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: `https://recnos.com/portfolio/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

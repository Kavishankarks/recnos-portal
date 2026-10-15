import type { MetadataRoute } from "next";
import { projects } from "./portfolio/projects";

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

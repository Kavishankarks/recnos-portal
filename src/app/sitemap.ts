import type { MetadataRoute } from "next";

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
  ];
}

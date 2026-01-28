import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: "https://ai-astraforge.vercel.app",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://ai-astraforge.vercel.app/dashboard",
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}



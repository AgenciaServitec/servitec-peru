import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { SPECIALTIES_DATA } from "@/data-list/specialties";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.servitecperu.com";

  const staticRoutes = ["", "/nosotros", "/contacto", "/servicios"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    })
  );

  const specialtyRoutes = SPECIALTIES_DATA.filter(
    (s) => s.slug !== "contacto"
  ).map((s) => ({
    url: `${baseUrl}/especialidades/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const root = process.cwd();
  const relativePath = "content/servicios";
  const contentPath = root.endsWith("hosting")
    ? path.join(root, relativePath)
    : path.join(root, "apps/hosting", relativePath);

  let serviceRoutes: MetadataRoute.Sitemap = [];

  if (fs.existsSync(contentPath)) {
    serviceRoutes = fs
      .readdirSync(contentPath)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => {
        const slug = f.replace(".mdx", "");
        return {
          url: `${baseUrl}/servicios/${slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.9,
        };
      });
  }

  return [...staticRoutes, ...specialtyRoutes, ...serviceRoutes];
}

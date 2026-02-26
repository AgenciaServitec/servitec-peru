import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.servitecperu.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/", "/api/", "/components/", "/lib/", "/data-list/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

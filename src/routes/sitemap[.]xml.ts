import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { CORE_SERVICES } from "@/data/site";

const BASE_URL = import.meta.env.VITE_SITE_URL || "https://onetechnations.com";
const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window === "undefined" ? "http://127.0.0.1:5000" : "");

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  lastmod?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/services", changefreq: "weekly", priority: "0.9" },
          { path: "/blog", changefreq: "weekly", priority: "0.8" },
          { path: "/contact", changefreq: "monthly", priority: "0.7" },
          ...CORE_SERVICES.map((s) => ({
            path: `/services/${s.slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
        ];

        try {
          const res = await fetch(`${API_BASE}/api/v1/blogs/sitemap`);
          if (res.ok) {
            const json = (await res.json()) as {
              data?: Array<{ slug: string; updated_at?: string; published_at?: string }>;
            };
            for (const post of json.data || []) {
              entries.push({
                path: `/blog/${post.slug}`,
                changefreq: "weekly",
                priority: "0.7",
                lastmod: (post.updated_at || post.published_at || "").toString().slice(0, 10),
              });
            }
          }
        } catch {
          /* sitemap still returns static routes */
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});

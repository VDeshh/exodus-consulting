import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { toolPages } from "@/content/tools";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ["/", "/what-we-do/", ...toolPages.map((t) => `/what-we-do/${t.slug}/`), "/work/", "/work/fennec/", "/work/uniserve/", "/work/palapa-tours/", "/work/current/", "/how-we-work/", "/about/", "/industries/", "/contact/"];
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified: now, changeFrequency: p === "/" ? "weekly" : "monthly", priority: p === "/" ? 1 : p.startsWith("/work/") ? 0.8 : 0.6 }));
}

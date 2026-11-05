import type { MetadataRoute } from "next";
import { site } from "@/content/copy";
// Demo: hidden from search engines until launch is approved. Restore `allow: "/"` at launch.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", disallow: "/" }], sitemap: `${site.url}/sitemap.xml` };
}

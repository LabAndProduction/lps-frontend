import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Per-visitor pages (cart, checkout, account, compare, wishlist, orders) and search are
// kept out of the index in both languages; they also carry a noindex meta tag.
const PRIVATE = ["/cart/", "/checkout/", "/compare/", "/wishlist/", "/dashboard/", "/order/", "/search/"];

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{ userAgent: "*", allow: "/", disallow: [...PRIVATE, ...PRIVATE.map((p) => `/en${p}`)] }],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}

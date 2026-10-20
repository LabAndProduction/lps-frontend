import "../../../content/seoagent-blog"; // SEO Agent: статьи блога в сборке (Cloudflare Workers)
import original from "../sitemap.source";
import { seoWrapSitemap } from "@webnumseoagent/next";
export const dynamic = "force-dynamic";
export async function GET() {
  return new Response(await seoWrapSitemap(original, "index"), { headers: { "content-type": "application/xml; charset=utf-8", "x-seoagent-sitemap": "1" } });
}

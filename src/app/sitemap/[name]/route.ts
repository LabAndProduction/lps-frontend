import "../../../../content/seoagent-blog"; // SEO Agent: статьи блога в сборке (Cloudflare Workers)
import original from "../../sitemap.source";
import { seoWrapSitemap } from "@webnumseoagent/next";
export const dynamic = "force-dynamic";
export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  return new Response(await seoWrapSitemap(original, "child", (await params).name), { headers: { "content-type": "application/xml; charset=utf-8", "x-seoagent-sitemap": "1" } });
}

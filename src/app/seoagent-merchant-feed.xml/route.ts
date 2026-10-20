import { seoMerchantFeedXml } from "@webnumseoagent/next";
export const dynamic = "force-dynamic";
export async function GET() {
  return new Response(await seoMerchantFeedXml("/merchant-feed.xml"), { headers: { "content-type": "application/xml; charset=utf-8", "x-seoagent-merchant": "1" } });
}

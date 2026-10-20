import { SITEMAP_XSL } from "@webnumseoagent/next";
export function GET() {
  return new Response(SITEMAP_XSL, { headers: { "content-type": "text/xsl; charset=utf-8" } });
}

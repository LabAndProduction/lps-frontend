import { seoIndexNowKey } from "@webnumseoagent/next";
export const dynamic = "force-dynamic";
export async function GET() {
  return new Response(await seoIndexNowKey(), { headers: { "content-type": "text/plain; charset=utf-8" } });
}

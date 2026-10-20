import { revalidateTag } from "next/cache";
import { seoClearCache } from "@webnumseoagent/next";

export async function POST(req: Request) {
  const secret = process.env.SEOAGENT_REVALIDATE_SECRET;
  if (!secret || req.headers.get("x-revalidate-secret") !== secret) {
    return new Response("unauthorized", { status: 401 });
  }
  seoClearCache();
  revalidateTag(`seo-${process.env.SEOAGENT_SITE_ID}`);
  return Response.json({ ok: true });
}

import { seoLlmsTxt } from "@webnumseoagent/next";
export const dynamic = "force-dynamic";

// SEO Agent: llms.txt — что за компания и главные страницы/статьи для ИИ-ассистентов (собирает платформа).
export async function GET() {
  const txt = await seoLlmsTxt();
  if (!txt) return new Response("Not found", { status: 404 });
  return new Response(txt, { headers: { "content-type": "text/markdown; charset=utf-8", "cache-control": "public, max-age=3600" } });
}

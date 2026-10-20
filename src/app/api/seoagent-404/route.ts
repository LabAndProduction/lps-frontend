export async function POST(req: Request) {
  const origin = req.headers.get("origin"), host = req.headers.get("host");
  if (origin && host) { try { if (new URL(origin).host !== host) return new Response(null, { status: 204 }); } catch { return new Response(null, { status: 204 }); } }
  const RAW = (process.env.SEOAGENT_API_BASE || "").replace(/\/+$/, "");
  const API = !RAW || /^https?:\/\/(www\.)?seonum\.uz$/i.test(RAW) ? "https://seo.webnum.uz" : RAW;
  const SITE = process.env.SEOAGENT_SITE_ID, TOKEN = process.env.SEOAGENT_TOKEN;
  if (!SITE || !TOKEN) return new Response(null, { status: 204 });
  let path = "";
  try { const b = await req.json(); const v = b && typeof b === "object" ? Reflect.get(b, "path") : null; if (typeof v === "string") path = v; } catch {}
  if (!path) return new Response(null, { status: 204 });
  try { await fetch(`${API}/api/seo/${SITE}/not-found`, { method: "POST", headers: { "content-type": "application/json", "x-seo-agent-key": TOKEN }, body: JSON.stringify({ path }), signal: AbortSignal.timeout(5000) }); } catch {}
  return new Response(null, { status: 204 });
}

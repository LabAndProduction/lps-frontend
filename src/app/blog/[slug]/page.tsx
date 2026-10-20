import { notFound, permanentRedirect } from "next/navigation";
import { seoBlogUrlPrefix } from "@webnumseoagent/next/blog";
export const dynamic = "force-dynamic";

// SEO Agent: локаль-less /blog/[slug] → 308 на /{defaultLocale}/blog/[slug] (спасает бэклинки без префикса локали).
export default async function BlogSlugRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prefix = await seoBlogUrlPrefix();
  if (!prefix) notFound();
  permanentRedirect(`${prefix}/blog/${slug}`);
}

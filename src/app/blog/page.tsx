import { notFound, permanentRedirect } from "next/navigation";
import { seoBlogUrlPrefix } from "@webnumseoagent/next/blog";
export const dynamic = "force-dynamic";

// SEO Agent: локаль-less /blog → 308 на /{defaultLocale}/blog (иначе 404 на мультиязычном сайте).
export default async function BlogIndexRedirect() {
  const prefix = await seoBlogUrlPrefix();
  if (!prefix) notFound();
  permanentRedirect(`${prefix}/blog`);
}

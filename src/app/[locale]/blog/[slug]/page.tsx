import "../../../../../content/seoagent-blog"; // SEO Agent: статьи блога в сборке (Cloudflare Workers)
import { notFound } from "next/navigation";
import { seoBlogPost, seoBlogStaticParams, seoBlogMetadata, SeoBlogArticle } from "@webnumseoagent/next/blog";
export const dynamic = "force-static";
export const dynamicParams = true;

// Статьи пре-рендерятся на сборке; статью, которой нет в готовых страницах (хостинг без кэша страниц —
// OpenNext без incremental cache), страница отрисует на лету из статей в сборке. Неизвестный слаг → 404.
export async function generateStaticParams() {
  return seoBlogStaticParams({ localeParam: "locale" });
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug, locale } = await params;
  const post = await seoBlogPost(slug, { locale });
  if (!post) return {};
  // Свой canonical (адрес этой языковой версии) + hreflang: иначе статья наследует canonical главной из макета.
  return seoBlogMetadata({ post, locale });
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug, locale } = await params;
  const post = await seoBlogPost(slug, { locale });
  if (!post) notFound();
  return <SeoBlogArticle post={post} locale={locale} />;
}

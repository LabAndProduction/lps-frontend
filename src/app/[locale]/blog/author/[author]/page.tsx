import "../../../../../../content/seoagent-blog"; // SEO Agent: статьи блога в сборке (Cloudflare Workers)
import { notFound } from "next/navigation";
import { SeoBlogAuthor, seoBlogAuthorExists, seoBlogAuthorMetadata, seoBlogAuthorParams } from "@webnumseoagent/next/blog";
export const dynamic = "force-static";
export const dynamicParams = true;

// Страница автора: собирается заранее для каждого автора со статьями на каждом языке блога.
export async function generateStaticParams() {
  return seoBlogAuthorParams({ localeParam: "locale" });
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; author: string }> }) {
  const { author, locale } = await params;
  return seoBlogAuthorMetadata({ slug: author, locale });
}

export default async function BlogAuthorPage({ params }: { params: Promise<{ locale: string; author: string }> }) {
  const { author, locale } = await params;
  if (!(await seoBlogAuthorExists(author))) notFound();
  return <SeoBlogAuthor slug={author} locale={locale} basePath={`/${locale}/blog`} />;
}

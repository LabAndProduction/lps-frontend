import "../../../../content/seoagent-blog"; // SEO Agent: статьи блога в сборке (Cloudflare Workers)
import { SeoBlogIndex, seoBlogMetadata, seoBlogLocaleParams } from "@webnumseoagent/next/blog";
export const dynamic = "force-static";

// Список блога собирается заранее на каждом языке блога.
export async function generateStaticParams() {
  return seoBlogLocaleParams("locale");
}

// Свой заголовок, описание и canonical списка блога (иначе наследует их у главной из макета сайта).
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return seoBlogMetadata({ locale });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <SeoBlogIndex locale={locale} basePath={`/${locale}/blog`} />;
}

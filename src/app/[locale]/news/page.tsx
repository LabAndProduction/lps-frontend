import { seoMeta } from "@webnumseoagent/next";
import { Metadata } from "next";
import { getTexts } from "@/api/textsApi";
import PageHeader from "@/components/ui/PageHeader";
import { INewsPageParams } from "@/types/pageParams.types";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { getFullUrl } from "@/utils/getFullUrl";
import { getPublications } from "@/api/publicationsApi";
import NewsCard from "@/components/ui/cards/NewsCard";
import Pagination from "@/components/ui/pagination/Pagination";
import { pageAlternates, samePaths } from "@/lib/seo";
import { getLocaleTs } from "@/utils/getLocaleTs";

export default async function NewsPage({ searchParams }: INewsPageParams) {
    const { page } = await searchParams;

    const news = await getPublications({
        type: 2,
        page: page ? Number(page) : 1,
        quantity: 12,
    });
    const { text } = await getTexts();

    const title = text("Новости");

    return (
        <>
            <PageHeader
                breadcrumbs={{
                    links: [{ href: "/", title: text("Главная") }],
                    current: title,
                }}
                title={title}
            />

            <SectionWrapper>
                <div className="flex flex-col items-center gap-6">
                    <div className="min-[31.25rem]:grid flex flex-col xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-x-4 gap-y-6 w-full">
                        {news.data.map((item) => (
                            <NewsCard key={item.id} item={item} />
                        ))}
                    </div>

                    <Pagination meta={news.meta} />
                </div>
            </SectionWrapper>
        </>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocaleTs();
    const { text } = await getTexts();

    const pageUrl = await getFullUrl(`/news`);
    const imageUrl = await getFullUrl("/images/logo.png", false);

    const title = text("Новости");
    const description = text("Новости");

    return seoMeta({
        route: "/news",
        locale,

        fallback: {
            alternates: pageAlternates(locale, samePaths("/news")),
            title: title,
            description: description,

            openGraph: {
                title: title,
                description: description,
                url: pageUrl,
                images: [
                    {
                        url: imageUrl,
                    },
                ],
                type: "website",
            },
        }
    });
}

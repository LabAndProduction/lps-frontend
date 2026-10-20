import { seoMeta } from "@webnumseoagent/next";
import { Metadata } from "next";
import { getTexts } from "@/api/textsApi";
import PageHeader from "@/components/ui/PageHeader";
import Search from "@/components/pages/search/Search";
import { getProducts } from "@/api/productsApi";
import { ISearchPageParams } from "@/types/pageParams.types";
import { getFullUrl } from "@/utils/getFullUrl";
import { NOINDEX } from "@/lib/seo";

export default async function SearchPage({ searchParams }: ISearchPageParams) {
    const { price, brands, sort, direction, page, keyword } = await searchParams;
    const brandsArr: number[] | null = brands ? brands.split(",").map((el) => Number(el.split("-")[0])) : null;

    const products = await getProducts({
        quantity: 20,
        page: Number(page),
        price_from: price ? Number(price.split("-")[0]) : null,
        price_to: price ? Number(price.split("-")[1]) : null,
        brands: brandsArr,
        order_by: sort ? sort : undefined,
        order_direction: direction ? direction : "desc",
        search: keyword,
    });
    const { text } = await getTexts();
    return (
        <>
            <PageHeader
                breadcrumbs={{
                    links: [{ href: "/", title: text("Главная") }],
                    current: text("Поиск"),
                }}
                title={`${text("Поиск")} (${keyword})`}
            />

            <Search keyword={keyword} price={{ max: 100000000, min: 0 }} products={products} />
        </>
    );
}

export async function generateMetadata({
    params,
    searchParams
}: ISearchPageParams): Promise<Metadata> {
    const { keyword } = await searchParams;
    const { text } = await getTexts();

    const pageUrl = await getFullUrl(`/search/?keyword=${keyword}`);
    const imageUrl = await getFullUrl("/images/logo.png", false);
    return seoMeta({
        route: "/search",
        locale: (await params).locale,

        fallback: {
            robots: NOINDEX,
            title: text("Поиск"),
            description: text("Поиск"),
            keywords: text("Поиск"),
            openGraph: {
                title: text("Поиск"),
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

import { Metadata } from "next";
import { getTexts } from "@/api/textsApi";
import PageHeader from "@/components/ui/PageHeader";
import { IBrandsPageParams } from "@/types/pageParams.types";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { getFullUrl } from "@/utils/getFullUrl";
import Pagination from "@/components/ui/pagination/Pagination";
import { getBrands } from "@/api/brandsApi";
import BrandCard from "@/components/ui/cards/BrandCard";

export default async function BrandsPage({ searchParams }: IBrandsPageParams) {
    const { page } = await searchParams;

    const brands = await getBrands({
        page: page ? Number(page) : 1,
        quantity: 24,
    });
    const { text } = await getTexts();

    const title = text("Бренды");

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
                    <div className="grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-4 gap-3 w-full">
                        {brands.data.map((brand) => (
                            <BrandCard key={brand.id} brand={brand} />
                        ))}
                    </div>

                    <Pagination meta={brands.meta} />
                </div>
            </SectionWrapper>
        </>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const { text } = await getTexts();

    const pageUrl = await getFullUrl(`/pages`);
    const imageUrl = await getFullUrl("/images/logo.png", false);

    const title = text("Новости");
    const description = text("Новости");

    return {
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
    };
}
